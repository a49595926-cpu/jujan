import { ArrowUpRight, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { TELEGRAM_HANDLE, TELEGRAM_URL } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import { SaffronMark } from '@/components/Navbar';

export function Contact() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950 to-espresso-900" />
      <div className="persian-pattern absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(45,179,154,0.1),transparent_55%)]" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Contact Us</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Let's start a <span className="text-gold-gradient">conversation</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-300 text-balance sm:text-lg">
            Questions about a rug's provenance, a saffron grade, or a bulk order? We reply
            fastest on Telegram. Reach out — we'd love to hear from you.
          </p>
        </div>

        <div className="mt-11 grid gap-4 lg:grid-cols-3">
          {/* Telegram card — primary */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={`reveal ${isVisible ? 'is-visible' : ''} group relative col-span-1 overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-espresso-800/60 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-400/60 hover:shadow-gold-lg lg:col-span-1`}
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-500/15 blur-3xl transition-opacity duration-500 group-hover:bg-teal-500/25" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-500/15 text-teal-400 transition-transform duration-500 group-hover:scale-110">
                <Send className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <h3 className="mt-3.5 font-serif text-3xl text-cream-50">Telegram</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-300">
                The fastest way to reach us. Message for orders, quotes, and instant support.
              </p>
              <p className="mt-3 font-mono text-lg text-teal-400">{TELEGRAM_HANDLE}</p>
              <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-cream-50 transition-colors group-hover:text-teal-400">
                Open chat
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>

          {/* Email card */}
          <div
            className={`reveal ${isVisible ? 'is-visible' : ''} rounded-3xl border border-saffron-500/20 bg-espresso-800/50 p-5 [transition-delay:90ms]`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-saffron-500/15 text-saffron-300">
              <Mail className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <h3 className="mt-3.5 font-serif text-3xl text-cream-50">Email</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-cream-300">
              For detailed inquiries, wholesale, and press. We reply within 24 hours.
            </p>
            <a
              href="mailto:hello@persiantreasures.shop"
              className="mt-3 inline-block font-mono text-lg text-saffron-300 transition-colors hover:text-saffron-200"
            >
              hello@persiantreasures.shop
            </a>
          </div>

          {/* Origin card */}
          <div
            className={`reveal ${isVisible ? 'is-visible' : ''} rounded-3xl border border-saffron-500/20 bg-espresso-800/50 p-5 [transition-delay:180ms]`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-crimson-500/15 text-crimson-400">
              <MapPin className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <h3 className="mt-3.5 font-serif text-3xl text-cream-50">Our Origin</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-cream-300">
              Sourced from the saffron fields of Khorasan and the weaving houses of Tabriz, Kashan
              and the Zagros.
            </p>
            <p className="mt-3 font-serif text-xl text-cream-100">Iran · Worldwide Shipping</p>
          </div>
        </div>

        {/* Telegram call-to-action banner */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mt-7 flex flex-col items-center justify-between gap-3.5 rounded-3xl border border-teal-500/25 bg-espresso-900/70 p-5 backdrop-blur sm:flex-row sm:p-6`}>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-400">
              <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-serif text-2xl text-cream-50">Prefer to talk first?</p>
              <p className="text-sm text-cream-300">Message us on Telegram — we usually reply within minutes.</p>
            </div>
          </div>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-105 active:scale-100"
          >
            <Send className="h-5 w-5" /> Chat on Telegram
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-saffron-500/15 bg-espresso-950">
      <div className="persian-pattern absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-8xl px-5 py-10 sm:px-8">
        <div className="grid gap-7 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-saffron-500/40 bg-espresso-800/60">
                <SaffronMark className="h-6 w-6" />
              </span>
              <div>
                <p className="font-serif text-2xl text-cream-50">Persian Treasures</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-saffron-400/80">
                  Saffron &amp; Rugs · Est. Khorasan
                </p>
              </div>
            </div>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-cream-300">
              Bringing the finest Iranian saffron and hand-knotted Persian rugs to collectors and
              connoisseurs worldwide. Authentic, lab-verified, and paid in USDT.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-saffron-400">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { label: 'Heritage', href: '#heritage' },
                { label: 'Saffron', href: '#saffron' },
                { label: 'Confectionery', href: '#confectionery' },
                { label: 'Rugs', href: '#rugs' },
                { label: 'Checkout', href: '#checkout' },
                { label: 'Contact', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream-300 transition-colors hover:text-saffron-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-saffron-400">Connect</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-cream-300 transition-colors hover:text-teal-400">
                  Telegram {TELEGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a href="mailto:hello@persiantreasures.shop" className="text-cream-300 transition-colors hover:text-saffron-300">
                  hello@persiantreasures.shop
                </a>
              </li>
              <li className="text-cream-300">USDT (TRC-20 / ERC-20) accepted</li>
              <li className="text-cream-300">Worldwide insured shipping</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-saffron-500/10 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream-400">
            © {new Date().getFullYear()} Persian Treasures. All rights reserved.
          </p>
          <p className="text-xs text-cream-400">
            Crafted with devotion to Persian heritage.
          </p>
        </div>
      </div>
    </footer>
  );
}
