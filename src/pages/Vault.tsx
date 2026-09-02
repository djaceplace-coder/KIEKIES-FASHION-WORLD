import React, { useState } from 'react';
import { Lock, Mail, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Vault() {
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    
    setIsSubmitting(true);
    try {
      await fetch('/api/vault/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, contact })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to join the vault. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-violet/20 border border-brand-violet/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(122,90,248,0.3)]">
            <Lock className="w-6 h-6 text-brand-violet" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">The VIP Vault</h1>
          <p className="text-silk-cream/60 font-medium text-lg">
            Unlock 1-hour early access to our exclusive Milan & London drops before they sell out.
          </p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1C1A20] border border-brand-violet/30 p-8 rounded-squircle text-center shadow-2xl"
          >
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wider text-white">Access Granted</h3>
            <p className="text-silk-cream/60 text-sm">
              You are now on the VIP list. Watch your {method === 'email' ? 'inbox' : 'messages'} for the secret access code on drop day.
            </p>
          </motion.div>
        ) : (
          <div className="bg-[#1C1A20] border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl backdrop-blur-xl">
            <div className="flex bg-black/50 rounded-full p-1 mb-8">
              <button
                onClick={() => setMethod('email')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 ${method === 'email' ? 'bg-brand-violet text-white shadow-md' : 'text-white/50 hover:text-white'}`}
              >
                <Mail className="w-4 h-4" /> Email
              </button>
              <button
                onClick={() => setMethod('sms')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 ${method === 'sms' ? 'bg-brand-violet text-white shadow-md' : 'text-white/50 hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" /> SMS
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type={method === 'email' ? 'email' : 'tel'} 
                  placeholder={method === 'email' ? 'Enter your email address' : '+234 Phone Number'} 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-brand-violet transition-colors"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-obsidian font-black uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-violet hover:text-white transition-colors active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Unlocking...' : 'Unlock Access'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-center text-[10px] text-white/40 mt-6 uppercase tracking-widest">
              By joining, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
