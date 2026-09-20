import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Layers, Hammer, Plus } from 'lucide-react';
import { KHATAM_COLLECTIONS, type KhatamProduct, type KhatamType } from '@/data/khatam';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

export function KhatamCollection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="khatamkari" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Persian Inlay Art</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Persian <span className="text-gold-gradient">Khatamkari</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            Masterpieces of Persian Inlay Art — assembled from thousands of hand-cut triangles of wood, bone, brass, and turquoise by master craftsmen of Isfahan and Shiraz.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {KHATAM_COLLECTIONS.map((collection) => (
            <SubCollection key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubCollection({ collection }: { collection: typeof KHATAM_COLLECTIONS[number] }) {
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
        {collection.khatams.map((khatam, i) => (
          <div
            key={khatam.id}
            data-card
            className="snap-start shrink-0 w-[78vw] max-w-[340px] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(25%-0.9375rem)]"
          >
            <KhatamCard khatam={khatam} delay={i * 60} />
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

function KhatamCard({ khatam, delay }: { khatam: KhatamProduct; delay: number }) {
  const { addItem } = useCart();
  const { ref, isVisible } = useReveal();

  const handleAdd = () => {
    const product: Product = {
      id: khatam.id,
      name: khatam.name,
      tagline: khatam.material,
      description: `${khatam.origin} · ${khatam.technique}`,
      category: 'khatamkari',
      priceUsd: khatam.priceUsd,
      origin: khatam.origin,
      features: [khatam.material, khatam.technique],
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
        <KhatamArt type={khatam.type} />
        <div className="absolute left-4 top-4 rounded-full border border-saffron-500/30 bg-espresso-950/70 px-3 py-1 text-[10px] uppercase tracking-widest text-saffron-300 backdrop-blur">
          {khatam.technique}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-serif text-2xl leading-tight text-cream-50">{khatam.name}</h4>

        <p className="mt-3 text-sm leading-relaxed text-cream-300">{khatam.description}</p>

        <div className="mt-4 space-y-2 text-sm text-cream-300">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-saffron-400" />
            {khatam.origin}
          </p>
          <p className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-saffron-400" />
            {khatam.material}
          </p>
          <p className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-saffron-400" />
            {khatam.technique}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-saffron-500/10 pt-4">
          <p className="font-serif text-3xl text-gold-gradient">
            ${khatam.priceUsd.toLocaleString()}
            <span className="ml-1 text-sm text-cream-400">USD</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-[1.03] active:scale-100"
          aria-label={`Add ${khatam.name} to cart`}
        >
          <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
          Add
        </button>
      </div>
    </article>
  );
}

function KhatamArt({ type }: { type: KhatamType }) {
  switch (type) {
    case 'wood':
      return <WoodArt />;
    case 'metal':
      return <MetalArt />;
    case 'turquoise':
      return <TurquoiseArt />;
    case 'copper':
      return <CopperArt />;
  }
}

function WoodArt() {
  const stars = Array.from({ length: 7 }).map((_, i) => {
    const angle = (i / 7) * Math.PI * 2;
    const cx = 200 + Math.cos(angle) * 70;
    const cy = 150 + Math.sin(angle) * 50;
    return { cx, cy, r: 22, key: i };
  });
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <linearGradient id="khatam-wood-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#15100a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#khatam-wood-bg)" />
      <g transform="translate(200 150)">
        <ellipse cx="0" cy="78" rx="150" ry="12" fill="#000" opacity="0.4" />
      </g>
      {stars.map((s) => (
        <g key={s.key} transform={`translate(${s.cx} ${s.cy})`}>
          {Array.from({ length: 6 }).map((_, j) => (
            <polygon
              key={j}
              points="0,-22 6,-7 22,-7 10,3 14,20 0,9 -14,20 -10,3 -22,-7 -6,-7"
              transform={`rotate(${j * 30})`}
              fill={j % 2 === 0 ? '#e8dcc4' : '#5a3e26'}
              opacity="0.85"
            />
          ))}
          <circle r="3" fill="#e8a838" />
        </g>
      ))}
    </svg>
  );
}

function MetalArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="khatam-metal-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#15100a" />
        </radialGradient>
        <linearGradient id="khatam-metal-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a85a" />
          <stop offset="100%" stopColor="#7a5a2a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#khatam-metal-bg)" />
      <g transform="translate(200 160)">
        <ellipse cx="0" cy="70" rx="120" ry="12" fill="#000" opacity="0.45" />
        <ellipse cx="0" cy="0" rx="110" ry="64" fill="url(#khatam-metal-tray)" stroke="#e8a838" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="92" ry="52" fill="none" stroke="#f5d27a" strokeWidth="1" opacity="0.6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 20}
              y1={Math.sin(a) * 20}
              x2={Math.cos(a) * 88}
              y2={Math.sin(a) * 48}
              stroke="#f5d27a"
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <circle key={i} cx={Math.cos(a) * 70} cy={Math.sin(a) * 38} r="3" fill="#e8a838" />
          );
        })}
        <circle r="14" fill="none" stroke="#f5d27a" strokeWidth="1.2" />
        <polygon points="0,-12 3,-4 12,-4 5,2 8,12 0,6 -8,12 -5,2 -12,-4 -3,-4" fill="#f5d27a" />
      </g>
    </svg>
  );
}

function TurquoiseArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="khatam-turq-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#1a2a2a" />
          <stop offset="100%" stopColor="#0a1515" />
        </radialGradient>
        <linearGradient id="khatam-turq-vase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8651a" />
          <stop offset="100%" stopColor="#5a2e10" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#khatam-turq-bg)" />
      <g transform="translate(200 160)">
        <ellipse cx="0" cy="86" rx="70" ry="10" fill="#000" opacity="0.5" />
        <path d="M-44 -70 Q -52 -40 -48 0 Q -50 60 -40 84 L 40 84 Q 50 60 48 0 Q 52 -40 44 -70 Z" fill="url(#khatam-turq-vase)" stroke="#e8a838" strokeWidth="1.5" />
        <ellipse cx="0" cy="-70" rx="44" ry="8" fill="#5a2e10" stroke="#e8a838" strokeWidth="1" />
        {Array.from({ length: 36 }).map((_, i) => {
          const x = -42 + (i % 9) * 10.5;
          const y = -52 + Math.floor(i / 9) * 30;
          const shades = ['#2db39a', '#3fc4b0', '#1f8a78', '#4fd4c0'];
          return <circle key={i} cx={x} cy={y} r="3.5" fill={shades[i % 4]} opacity="0.9" />;
        })}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = -36 + (i % 6) * 14.4;
          const y = 6 + Math.floor(i / 6) * 22;
          const shades = ['#2db39a', '#1f8a78', '#3fc4b0'];
          return <circle key={i} cx={x} cy={y} r="3" fill={shades[i % 3]} opacity="0.85" />;
        })}
      </g>
    </svg>
  );
}

function CopperArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id="khatam-copper-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3a2210" />
          <stop offset="100%" stopColor="#150a05" />
        </radialGradient>
        <linearGradient id="khatam-copper-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4793a" />
          <stop offset="100%" stopColor="#7a3a14" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#khatam-copper-bg)" />
      <g transform="translate(200 160)">
        <ellipse cx="0" cy="72" rx="120" ry="12" fill="#000" opacity="0.45" />
        <circle r="100" fill="url(#khatam-copper-tray)" stroke="#e8a838" strokeWidth="2" />
        <circle r="84" fill="none" stroke="#f5d27a" strokeWidth="1" opacity="0.6" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <circle key={i} cx={Math.cos(a) * 72} cy={Math.sin(a) * 72} r="2.5" fill="#f5d27a" />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          return (
            <path
              key={i}
              d={`M ${Math.cos(a) * 30} ${Math.sin(a) * 30} q ${Math.cos(a + 0.4) * 14} ${Math.sin(a + 0.4) * 14} ${Math.cos(a + 0.8) * 28} ${Math.sin(a + 0.8) * 28}`}
              fill="none"
              stroke="#f5d27a"
              strokeWidth="1"
              opacity="0.7"
            />
          );
        })}
        <circle r="22" fill="none" stroke="#f5d27a" strokeWidth="1.2" />
        <polygon points="0,-18 5,-6 18,-6 7,3 11,18 0,9 -11,18 -7,3 -18,-6 -5,-6" fill="#f5d27a" />
      </g>
    </svg>
  );
}
