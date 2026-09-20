import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Layers, Hammer, Plus } from 'lucide-react';
import { MINA_COLLECTIONS, type MinaProduct, type MinaType } from '@/data/minakari';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

export function MinakariCollection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="minakari" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Persian Enamel Art</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Persian <span className="text-gold-gradient">Minakari</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            Handcrafted Persian enamel art, created with vibrant colors, traditional motifs, and generations of artistic mastery.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {MINA_COLLECTIONS.map((collection) => (
            <SubCollection key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubCollection({ collection }: { collection: typeof MINA_COLLECTIONS[number] }) {
  const { ref, isVisible } = useReveal();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.getBoundingClientRect().width ?? 320;
    const gap = 20;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-saffron-400/90">{collection.eyebrow}</p>
          <h3 className="mt-2 font-serif text-3xl leading-tight text-cream-50 sm:text-4xl">
            {collection.name}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-cream-300">{collection.description}</p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <NavArrow dir="left" disabled={atStart} onClick={() => scrollByCards(-1)} />
          <NavArrow dir="right" disabled={atEnd} onClick={() => scrollByCards(1)} />
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth [touch-action:pan-x] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {collection.minas.map((mina, i) => (
          <div
            key={mina.id}
            data-card
            className="snap-start shrink-0 w-[78vw] max-w-[340px] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(25%-0.9375rem)]"
          >
            <MinaCard mina={mina} delay={i * 60} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        <NavArrow dir="left" disabled={atStart} onClick={() => scrollByCards(-1)} />
        <NavArrow dir="right" disabled={atEnd} onClick={() => scrollByCards(1)} />
      </div>
    </div>
  );
}

function NavArrow({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous items' : 'Next items'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-saffron-500/30 bg-espresso-800/60 text-saffron-300 backdrop-blur transition-all duration-300 hover:border-saffron-400/60 hover:text-saffron-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {dir === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}

function MinaCard({ mina, delay }: { mina: MinaProduct; delay: number }) {
  const { addItem } = useCart();
  const { ref, isVisible } = useReveal();

  const handleAdd = () => {
    const product: Product = {
      id: mina.id,
      name: mina.name,
      tagline: mina.material,
      description: `${mina.origin} · ${mina.technique}`,
      category: 'minakari',
      priceUsd: mina.priceUsd,
      origin: mina.origin,
      features: [mina.material, mina.technique],
      accent: 'gold',
    };
    addItem(product);
  };

  return (
    <article
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} group relative flex h-full flex-col overflow-hidden rounded-3xl border border-saffron-500/15 bg-espresso-800/50 transition-all duration-500 hover:-translate-y-1.5 hover:border-saffron-400/50 hover:shadow-gold-lg`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-saffron-500/10">
        <MinaArt type={mina.type} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-serif text-2xl leading-tight text-cream-50">{mina.name}</h4>

        <p className="mt-3 text-sm leading-relaxed text-cream-300">{mina.description}</p>

        <div className="mt-4 space-y-2 text-sm text-cream-300">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-saffron-400" />
            {mina.origin}
          </p>
          <p className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-saffron-400" />
            {mina.material}
          </p>
          <p className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-saffron-400" />
            {mina.technique}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-saffron-500/10 pt-4">
          <p className="font-serif text-3xl text-gold-gradient">
            ${mina.priceUsd.toLocaleString()}
            <span className="ml-1 text-sm text-cream-400">USD</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-[1.03] active:scale-100"
          aria-label={`Add ${mina.name} to cart`}
        >
          <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
          Add
        </button>
      </div>
    </article>
  );
}

function MinaArt({ type }: { type: MinaType }) {
  switch (type) {
    case 'plates':
      return <PlateArt />;
    case 'vases':
      return <VaseArt />;
    case 'artwork':
      return <ArtworkArt />;
    case 'royal':
      return <RoyalArt />;
  }
}

function PlateArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="mina-plate-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#1a2a4a" />
          <stop offset="100%" stopColor="#0a1020" />
        </radialGradient>
        <radialGradient id="mina-plate-surface" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2a4a8a" />
          <stop offset="100%" stopColor="#1a2a5a" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mina-plate-bg)" />
      <g transform="translate(200 150)">
        <ellipse cx="0" cy="80" rx="120" ry="12" fill="#000" opacity="0.4" />
        <circle r="100" fill="url(#mina-plate-surface)" stroke="#e8a838" strokeWidth="2" />
        <circle r="84" fill="none" stroke="#f5d27a" strokeWidth="1" opacity="0.6" />
        <circle r="70" fill="none" stroke="#f5d27a" strokeWidth="0.8" opacity="0.5" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <line key={i} x1={Math.cos(a) * 30} y1={Math.sin(a) * 30} x2={Math.cos(a) * 68} y2={Math.sin(a) * 68} stroke="#f5d27a" strokeWidth="0.8" opacity="0.5" />
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 76} cy={Math.sin(a) * 76} r="2.5" fill="#e8a838" />;
        })}
        <circle r="22" fill="#c9352f" fillOpacity="0.5" stroke="#f5d27a" strokeWidth="1.2" />
        <polygon points="0,-18 5,-6 18,-6 7,3 11,18 0,9 -11,18 -7,3 -18,-6 -5,-6" fill="#f5d27a" />
        <circle r="3" fill="#fff7e6" />
      </g>
    </svg>
  );
}

function VaseArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="mina-vase-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#2a1a3a" />
          <stop offset="100%" stopColor="#10081a" />
        </radialGradient>
        <linearGradient id="mina-vase-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4a8a" />
          <stop offset="100%" stopColor="#1a2a5a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mina-vase-bg)" />
      <g transform="translate(200 165)">
        <ellipse cx="0" cy="84" rx="64" ry="10" fill="#000" opacity="0.45" />
        <path d="M-40 -70 Q -54 -40 -50 0 Q -54 60 -42 82 L 42 82 Q 54 60 50 0 Q 54 -40 40 -70 Z" fill="url(#mina-vase-body)" stroke="#e8a838" strokeWidth="1.5" />
        <ellipse cx="0" cy="-70" rx="40" ry="7" fill="#1a2a5a" stroke="#e8a838" strokeWidth="1" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            const x = -36 + c * 14.4 + (r % 2) * 7.2;
            const y = -50 + r * 26;
            const shades = ['#f5d27a', '#e8a838', '#c9352f', '#2db39a'];
            return <circle key={`${r}-${c}`} cx={x} cy={y} r="3" fill={shades[(r + c) % 4]} opacity="0.85" />;
          })
        )}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <path key={i} d={`M ${Math.cos(a) * 18} ${Math.sin(a) * 18 + 30} q 6 6 12 0`} fill="none" stroke="#f5d27a" strokeWidth="0.8" opacity="0.6" />
          );
        })}
      </g>
    </svg>
  );
}

function ArtworkArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="mina-art-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#15100a" />
        </radialGradient>
        <linearGradient id="mina-art-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4a8a" />
          <stop offset="100%" stopColor="#1a2a5a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mina-art-bg)" />
      <g transform="translate(200 150)">
        <ellipse cx="0" cy="78" rx="120" ry="12" fill="#000" opacity="0.4" />
        <rect x="-104" y="-72" width="208" height="144" rx="6" fill="url(#mina-art-panel)" stroke="#e8a838" strokeWidth="2" />
        <rect x="-94" y="-62" width="188" height="124" rx="3" fill="none" stroke="#f5d27a" strokeWidth="0.8" opacity="0.5" />
        {Array.from({ length: 8 }).map((_, i) => {
          const x = -80 + i * 22.8;
          return (
            <g key={i}>
              <path d={`M ${x} -40 q 8 14 16 0`} fill="none" stroke="#f5d27a" strokeWidth="0.8" opacity="0.6" />
              <circle cx={x + 8} cy={-44} r="2.5" fill="#e8a838" />
            </g>
          );
        })}
        <path d="M0 -30 C 20 -10 20 20 0 30 C -20 20 -20 -10 0 -30 Z" fill="#c9352f" fillOpacity="0.6" stroke="#f5d27a" strokeWidth="1" />
        <circle r="6" fill="#f5d27a" />
        {[-1, 1].map((sx) => (
          <path key={sx} d={`M ${sx * 40} 0 q ${sx * 16} -10 ${sx * 30} 0`} fill="none" stroke="#2db39a" strokeWidth="1" opacity="0.7" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = -90 + i * 13.8;
          return <circle key={i} cx={x} cy={56} r="2" fill="#e8a838" opacity="0.7" />;
        })}
      </g>
    </svg>
  );
}

function RoyalArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="mina-royal-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#15100a" />
        </radialGradient>
        <linearGradient id="mina-royal-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4a8a" />
          <stop offset="100%" stopColor="#1a2a5a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mina-royal-bg)" />
      <g transform="translate(200 160)">
        <ellipse cx="0" cy="86" rx="66" ry="10" fill="#000" opacity="0.5" />
        <path d="M-42 -70 Q -56 -40 -52 0 Q -56 60 -44 84 L 44 84 Q 56 60 52 0 Q 56 -40 42 -70 Z" fill="url(#mina-royal-body)" stroke="#e8a838" strokeWidth="2" />
        <ellipse cx="0" cy="-70" rx="42" ry="8" fill="#1a2a5a" stroke="#e8a838" strokeWidth="1.5" />
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            const x = -36 + c * 14.4 + (r % 2) * 7.2;
            const y = -52 + r * 26;
            const shades = ['#f5d27a', '#e8a838', '#c9352f', '#2db39a', '#fff7e6'];
            return <circle key={`${r}-${c}`} cx={x} cy={y} r="3.2" fill={shades[(r + c) % 5]} opacity="0.95" />;
          })
        )}
        <path d="M0 -30 C 22 -10 22 20 0 32 C -22 20 -22 -10 0 -30 Z" fill="#c9352f" fillOpacity="0.7" stroke="#f5d27a" strokeWidth="1.2" />
        <circle r="7" fill="#f5d27a" />
        <circle r="3" fill="#fff7e6" />
        {[-1, 1].map((sx) => (
          <g key={sx} transform={`translate(${sx * 48} 40)`}>
            <path d="M0 0 q 8 -10 16 0 q -8 6 -16 0" fill="none" stroke="#f5d27a" strokeWidth="1" opacity="0.8" />
          </g>
        ))}
      </g>
    </svg>
  );
}
