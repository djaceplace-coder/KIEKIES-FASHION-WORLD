// @ts-nocheck
// Note: @ts-nocheck is used here because this workspace is currently configured for Vite/Express.
// This Next.js App Router code is provided exactly as requested for your Vercel deployment.

import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

// Schema for the incoming Google Sheets row data
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

export async function POST(request: Request) {
  try {
    // 1. Validate the incoming Bearer token to secure the route
    const authHeader = request.headers.get('x-sync-secret');
    if (authHeader !== process.env.SYNC_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing sync secret' },
        { status: 401 }
      );
    }

    // 2. Initialize Supabase Admin Client (Bypasses RLS)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Server misconfiguration: Supabase credentials missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 3. Parse Payload
    const body = await request.json();
    const items: SheetProduct[] = body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid payload: "items" array is required' },
        { status: 400 }
      );
    }

    // Map incoming items to explicitly set their status to active
    const activeItems = items.map((item) => ({
      ...item,
      status: 'active',
    }));

    // 4. UPSERT incoming records into the products table matching on 'sku'
    const { error: upsertError } = await supabase
      .from('products')
      .upsert(activeItems, { onConflict: 'sku' });

    if (upsertError) {
      console.error('Supabase Upsert Error:', upsertError);
      throw new Error(`Failed to upsert products: ${upsertError.message}`);
    }

    // 5. Soft-delete (archive) missing SKUs
    // Extract all incoming SKUs to form our "active" list
    const incomingSkus = activeItems.map((i) => i.sku);
    
    // Use PostgREST syntax for NOT IN with a formatted string
    const notInQuery = `(${incomingSkus.map(sku => `"${sku}"`).join(',')})`;

    const { error: archiveError } = await supabase
      .from('products')
      .update({ status: 'archived' })
      .not('sku', 'in', notInQuery);

    if (archiveError) {
      console.error('Supabase Archive Error:', archiveError);
      throw new Error(`Failed to archive missing SKUs: ${archiveError.message}`);
    }

    // 6. Trigger Next.js Cache Revalidation
    revalidateTag('catalog');

    return NextResponse.json(
      {
        success: true,
        message: `Successfully upserted ${activeItems.length} products. Missing SKUs archived.`,
        revalidated: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Webhook sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
