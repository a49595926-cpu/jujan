import { useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, Loader2, Lock, Send } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import { TELEGRAM_HANDLE, TELEGRAM_URL } from '@/data/products';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const USDT_WALLETS = {
  trc20: 'TMTpRWVQHr1Nkj58Em9UmsAqS75xnaGhEN',
 
};

export function Checkout() {
  const { items, totalUsd, count, clear } = useCart();
  const { ref, isVisible } = useReveal();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', telegram: '', message: '' });

  const usdtAmount = totalUsd.toFixed(2);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setStatus('error');
      setErrorMsg('Your cart is empty. Add a treasure to begin your order.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      telegram: form.telegram.trim() || null,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: i.quantity,
        price: i.product.priceUsd,
      })),
      total_usd: totalUsd,
      message: form.message.trim() || null,
    };

    if (!supabase) {
      setStatus('error');
      setErrorMsg('Order service is not configured. Please message us on Telegram to place your order.');
      return;
    }

    const { error } = await supabase.from('order_inquiries').insert(payload);

    if (error) {
      setStatus('error');
      setErrorMsg('We could not submit your inquiry. Please try again or message us on Telegram.');
      return;
    }

    setStatus('success');
    clear();
    setForm({ name: '', email: '', telegram: '', message: '' });
  };

  return (
    <section id="checkout" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 to-espresso-950" />
      <div className="persian-pattern-dense absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(232,168,56,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Checkout &amp; Orders</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Pay with <span className="text-gold-gradient">USDT</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            Place your order inquiry below. We accept USDT (TRC-20 &amp; ERC-20) for a fast,
            borderless payment. Once you submit, our team confirms availability and shares the
            final wallet address for your transfer.
          </p>
        </div>

       <div className="mt-10 grid w-full min-w-0 gap-4 sm:mt-11 sm:gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* Order summary */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} flex min-w-0 flex-col gap-6`}>
            <div className="rounded-3xl border border-saffron-500/20 bg-espresso-800/50 p-4 backdrop-blur">
         <h3 className="font-serif text-2xl text-cream-50">Order Summary</h3>
              {items.length === 0 ? (
                <p className="mt-3 text-sm text-cream-400">
                  Your cart is empty. Add saffron or a rug from the collection above to begin.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-saffron-500/10">
                  {items.map((i) => (
                    <li key={i.product.id} className="flex items-start justify-between gap-3 py-2">
                      <div className="min-w-0 pr-3">
                        <p className="break-words font-serif text-lg text-cream-50">{i.product.name}</p>
                        <p className="text-xs text-cream-400">
                          {i.product.weight ?? i.product.size} · Qty {i.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 font-serif text-lg text-saffron-300">
                        ${(i.product.priceUsd * i.quantity).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {items.length > 0 && (
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-saffron-500/15 pt-3">
                  <span className="text-sm uppercase tracking-widest text-cream-400">Total</span>
                  <span className="shrink-0 font-serif text-4xl text-gold-gradient">
                    ${totalUsd.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* USDT payment info */}
            <div className="rounded-3xl border border-saffron-500/20 bg-espresso-800/50 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-saffron-500/30 text-saffron-300">
                  <Lock className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                <h3 className="font-serif text-2xl text-cream-50">USDT Payment</h3>
                  <p className="text-xs text-cream-400">Tether — TRC-20 &amp; ERC-20 networks</p>
                </div>
              </div>
              <p className="mt-3 break-words text-sm leading-relaxed text-cream-300">
                Equivalent amount: <span className="font-semibold text-saffron-300">{usdtAmount} USDT</span>
                {' '}(≈ ${usdtAmount} USD). Send only USDT to the networks below. Confirm the exact
                address with us on Telegram before transferring.
              </p>

              <div className="mt-3.5 space-y-2">
                {Object.entries(USDT_WALLETS).map(([network, addr]) => (
                  <div
                    key={network}
                    className="flex items-center justify-between gap-3 rounded-xl border border-saffron-500/15 bg-espresso-900/60 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-saffron-400">{network}</p>
                      <p className="truncate font-mono text-sm text-cream-100">{addr}</p>
                    </div>
                    <button
                      onClick={() => copy(addr, network)}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-saffron-500/25 px-3 py-1.5 text-xs font-medium text-saffron-300 transition-colors hover:bg-saffron-500/10"
                    >
                      {copied === network ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3 flex items-start gap-2 break-words text-xs leading-relaxed text-cream-400">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron-400" />
                <span>Always verify the wallet address with our team before sending funds. Addresses
                shown are examples — the final address is provided after your inquiry is confirmed.</span>
              </p>
            </div>
          </div>

          {/* Inquiry form */}
          <div className={`reveal ${isVisible ? 'is-visible' : ''} [transition-delay:120ms]`}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-saffron-500/20 bg-espresso-800/50 p-4 backdrop-blur sm:p-5"
            >
          <h3 className="font-serif text-2xl text-cream-50">Place Your Inquiry</h3>
              <p className="mt-1 text-sm text-cream-400">
                {count > 0
                  ? `${count} item${count > 1 ? 's' : ''} in your cart · $${totalUsd.toLocaleString()}`
                  : 'Add items to your cart first, then submit your details.'}
              </p>

              <div className="mt-4 space-y-3.5">
                <Field
                  label="Full Name"
                  required
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@example.com"
                />
                <Field
                  label="Telegram (optional)"
                  value={form.telegram}
                  onChange={(v) => setForm((f) => ({ ...f, telegram: v }))}
                  placeholder="@yourhandle"
                />
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-400">
                    Message (optional)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    rows={4}
                    placeholder="Any special requests, shipping notes, or questions..."
                    className="w-full resize-none rounded-xl border border-saffron-500/20 bg-espresso-900/60 px-4 py-3 text-sm text-cream-50 placeholder-cream-500 transition-colors focus:border-saffron-400/60 focus:outline-none focus:ring-1 focus:ring-saffron-400/40"
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="mt-3 flex items-start gap-2 rounded-xl border border-crimson-500/30 bg-crimson-700/15 px-4 py-2 text-sm text-crimson-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {errorMsg}
                </p>
              )}

              {status === 'success' ? (
                <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 px-5 py-3">
                  <p className="flex items-center gap-2 font-serif text-xl text-teal-400">
                    <CheckCircle2 className="h-5 w-5 shrink-0" /> Inquiry received!
                  </p>
                  <p className="mt-1 break-words text-sm text-cream-300">
                    Thank you. Our team will confirm your order and share the final USDT wallet
                    address shortly. For an instant reply, message us on Telegram{' '}
                    <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="break-all font-medium text-saffron-300 underline">
                      {TELEGRAM_HANDLE}
                    </a>.
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-[1.02] active:scale-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" /> Submit Inquiry
                    </>
                  )}
                </button>
              )}

              <p className="mt-3 text-center text-xs text-cream-400">
                By submitting, you agree to be contacted regarding your order. No payment is
                required until availability is confirmed.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-cream-400">
        {label} {required && <span className="text-saffron-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-saffron-500/20 bg-espresso-900/60 px-4 py-3 text-sm text-cream-50 placeholder-cream-500 transition-colors focus:border-saffron-400/60 focus:outline-none focus:ring-1 focus:ring-saffron-400/40"
      />
    </div>
  );
}
