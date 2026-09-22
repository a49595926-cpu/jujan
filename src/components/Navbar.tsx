// TEST SAVE
import { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const LINKS = [
  { label: 'Heritage', href: '#heritage' },
  { label: 'Collections', href: '#collections' },
  { label: 'Checkout', href: '#checkout' },
  { label: 'Contact', href: '#contact' },
];

const COLLECTIONS = [
  { label: 'Saffron', href: '#saffron' },
  { label: 'Rugs', href: '#rugs' },
  { label: 'Persian Tapestry', href: '#tablo-farsh' },
  { label: 'Khatamkari', href: '#khatamkari' },
  { label: 'Minakari', href: '#minakari' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const collectionsRef = useRef<HTMLLIElement>(null);
  const { count, open } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        collectionsRef.current &&
        !collectionsRef.current.contains(event.target as Node)
      ) {
        setCollectionsOpen(false);
      }
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-espresso-950/85 backdrop-blur-xl border-b border-saffron-500/15 py-2'
            : 'bg-transparent py-3.5'
        }`}
      >
        <nav className="mx-auto flex max-w-8xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-saffron-500/40 bg-espresso-800/60 transition-transform duration-500 group-hover:rotate-180">
              <SaffronMark className="h-5 w-5" />
            </span>

            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-serif text-lg font-semibold tracking-wide text-cream-50 sm:text-xl">
                Persian Treasures
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-saffron-400/80">
                Est. Khorasan
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-5 lg:flex -translate-x-16">
            {LINKS.map((l) =>
              l.label === 'Collections' ? (
                <li key={l.href} ref={collectionsRef} className="relative">
                  <button
                    onClick={() => setCollectionsOpen((v) => !v)}
                    className="group relative flex items-center gap-1 text-xs font-medium tracking-wide text-cream-200 transition-colors hover:text-saffron-300 xl:text-sm"
                  >
                    Collections
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        collectionsOpen ? 'rotate-180' : ''
                      }`}
                    />

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
                  </button>

                  {collectionsOpen && (
                    <div className="absolute left-0 top-full mt-4 w-56 rounded-xl border border-saffron-500/20 bg-espresso-900/95 p-2 shadow-xl backdrop-blur-xl">
                      {COLLECTIONS.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setCollectionsOpen(false)}
                          className="block rounded-lg px-4 py-2 text-sm text-cream-200 transition-colors hover:bg-espresso-800 hover:text-saffron-300"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative text-xs font-medium tracking-wide text-cream-200 transition-colors hover:text-saffron-300 xl:text-sm"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={open}
              className="group relative flex items-center gap-2 rounded-full border border-saffron-500/30 bg-espresso-800/40 px-3 py-2 text-sm font-medium text-cream-100 transition-all hover:border-saffron-400/60 hover:bg-espresso-700/60 sm:px-4"
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag className="h-4 w-4 text-saffron-400" />

              <span className="hidden sm:inline">
                Cart
              </span>

              {count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold-gradient px-1 text-[11px] font-bold text-espresso-950">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-saffron-500/30 text-cream-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            mobileOpen ? 'max-h-[80vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="mx-auto max-w-8xl space-y-1 px-5 pb-3.5 pt-3 sm:px-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl border border-saffron-500/10 bg-espresso-900/60 px-5 py-2 font-serif text-lg text-cream-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}

export function SaffronMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4c-2 4-2 8 0 12c2-4 2-8 0-12z" fill="#e8a838" />
      <path d="M16 16c-5 2-8 5-9 9c5-1 8-4 9-9z" fill="#c9352f" />
      <path d="M16 16c5 2 8 5 9 9c-5-1-8-4-9-9z" fill="#c9352f" />
      <path d="M16 10v8" stroke="#7a4a1f" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

