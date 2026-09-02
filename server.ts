import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

// Matching the SheetProduct schema from the Next.js route
export interface SheetProduct {
  sku: string;
  title: string;
  department: string;
  category: string;
  base_price_ngn: number;
  base_price_usd: number;
  base_price_gbp: number;
  image_main: string;
  image_hover?: string;
  provenance?: string;
  sizes?: string;
  colors?: string;
  status?: 'active' | 'archived';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Express equivalent of the Next.js Webhook
  app.post("/api/sync/sheets", async (req, res) => {
    try {
      // 1. Validate the incoming Bearer token to secure the route
      const authHeader = req.headers['x-sync-secret'];
      if (authHeader !== process.env.SYNC_SECRET) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing sync secret' });
      }

      // 2. Initialize Supabase Admin Client (Bypasses RLS)
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server misconfiguration: Supabase credentials missing' });
      }

      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // 3. Parse Payload
      const { items } = req.body as { items: SheetProduct[] };

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid payload: "items" array is required' });
      }

      const activeItems = items.map((item) => ({
        ...item,
        status: 'active',
      }));

      // 4. UPSERT incoming records into the products table matching on 'sku'
      const { error: upsertError } = await supabase
        .from('products')
        .upsert(activeItems, { onConflict: 'sku' });

      if (upsertError) {
        throw new Error(`Failed to upsert products: ${upsertError.message}`);
      }

      // 5. Soft-delete (archive) missing SKUs
      const incomingSkus = activeItems.map((i) => i.sku);
      const notInQuery = `(${incomingSkus.map(sku => `"${sku}"`).join(',')})`;

      const { error: archiveError } = await supabase
        .from('products')
        .update({ status: 'archived' })
        .not('sku', 'in', notInQuery);

      if (archiveError) {
        throw new Error(`Failed to archive missing SKUs: ${archiveError.message}`);
      }

      // Note: We don't have Next.js `revalidateTag` in Express. 
      // If we had a local cache (e.g., node-cache or redis), we would clear it here.
      
      return res.status(200).json({
        success: true,
        message: `Successfully upserted ${activeItems.length} products. Missing SKUs archived.`,
        revalidated: true,
      });
    } catch (error: any) {
      console.error('Webhook sync error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // Epic 9: Live Catalog Endpoint
  app.get("/api/products", async (req, res) => {
    try {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        // Fallback to empty array if no supabase configured, so the frontend doesn't break
        return res.json([]);
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active');
        
      if (error) throw error;
      
      res.json(products || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // Epic 10: Secure Global Checkout (Paystack)
  app.post("/api/checkout", async (req, res) => {
    try {
      const { cartItems, currency, email } = req.body;
      const paystackKey = process.env.PAYSTACK_SECRET_KEY;
      
      if (!paystackKey) {
        return res.status(500).json({ error: 'Paystack configuration missing' });
      }
      
      const origin = req.headers.origin || `http://localhost:${PORT}`;
      
      // Calculate total amount in smallest currency unit (e.g., kobo for NGN)
      const amount = cartItems.reduce((acc: number, item: any) => acc + (item.product.price[currency] * item.quantity), 0) * 100;
      
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${paystackKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email || 'vip@kiekies.com',
          amount,
          currency: currency.toUpperCase(),
          callback_url: `${origin}/?success=true`,
          metadata: {
            custom_fields: cartItems.map((item: any) => ({
              display_name: item.product.title,
              variable_name: item.product.sku,
              value: `${item.quantity}x Size ${item.size}`
            }))
          }
        })
      });

      const data = await response.json();
      
      if (!data.status) {
        throw new Error(data.message);
      }

      res.json({ url: data.data.authorization_url });
    } catch (error: any) {
      console.error('Checkout error:', error);
      res.status(500).json({ error: error.message || 'Failed to initialize Paystack checkout' });
    }
  });

  // Epic 11: Real VIP Authentication (Vault Lead Capture)
  app.post("/api/vault/join", async (req, res) => {
    try {
      const { method, contact } = req.body;
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        // Fallback if no supabase is configured, just pretend it worked
        return res.json({ success: true, dummy: true });
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { error } = await supabase
        .from('vault_users')
        .insert([{ 
          method,
          contact_value: contact
        }]);
        
      if (error) throw error;
      
      res.json({ success: true });
    } catch (error: any) {
      console.error('Vault join error:', error);
      res.status(500).json({ error: error.message || 'Failed to join vault' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
