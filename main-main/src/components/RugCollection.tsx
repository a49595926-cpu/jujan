import { useRef, useState, useCallback, useId } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Ruler, Layers, Plus } from 'lucide-react';
import { RUG_COLLECTIONS, type Rug, type RugPattern } from '@/data/rugs';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

export function RugCollection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="rugs" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Woven Masterpieces</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Handmade Persian <span className="text-gold-gradient">Rugs</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            Knotted by master weavers in Tabriz, Kashan, and Qom. Each rug is a one-of-a-kind heirloom, dyed with nature's pigments and woven over months of devotion.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {RUG_COLLECTIONS.map((collection) => (
            <SubCollection key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubCollection({ collection }: { collection: typeof RUG_COLLECTIONS[number] }) {
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
        {collection.rugs.map((rug, i) => (
          <div
            key={rug.id}
            data-card
            className="snap-start shrink-0 w-[78vw] max-w-[340px] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(25%-0.9375rem)]"
          >
            <RugCard rug={rug} delay={i * 60} />
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
      aria-label={dir === 'left' ? 'Previous rugs' : 'Next rugs'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-saffron-500/30 bg-espresso-800/60 text-saffron-300 backdrop-blur transition-all duration-300 hover:border-saffron-400/60 hover:text-saffron-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {dir === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}

function RugCard({ rug, delay }: { rug: Rug; delay: number }) {
  const { addItem } = useCart();
  const { ref, isVisible } = useReveal();

  const handleAdd = () => {
    const product: Product = {
      id: rug.id,
      name: rug.name,
      tagline: rug.material,
      description: `${rug.origin} · ${rug.dimensions}`,
      category: 'rugs',
      priceUsd: rug.priceUsd,
      size: rug.dimensions,
      origin: rug.origin,
      features: [rug.material, rug.dimensions],
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
        <RugArt pattern={rug.pattern} />
        <div className="absolute left-4 top-4 rounded-full border border-saffron-500/30 bg-espresso-950/70 px-3 py-1 text-[10px] uppercase tracking-widest text-saffron-300 backdrop-blur">
          {rug.dimensions}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-serif text-2xl leading-tight text-cream-50">{rug.name}</h4>

        <div className="mt-3 space-y-2 text-sm text-cream-300">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-saffron-400" />
            {rug.origin}
          </p>
          <p className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-saffron-400" />
            {rug.dimensions}
          </p>
          <p className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-saffron-400" />
            {rug.material}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-saffron-500/10 pt-4">
          <p className="font-serif text-3xl text-gold-gradient">
            ${rug.priceUsd.toLocaleString()}
            <span className="ml-1 text-sm text-cream-400">USD</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-[1.03] active:scale-100"
          aria-label={`Add ${rug.name} to cart`}
        >
          <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
          Add
        </button>
      </div>
    </article>
  );
}

function RugArt({ pattern }: { pattern: RugPattern }) {
  const rawId = useId().replace(/:/g, '');
  const bgId = `${rawId}-rug-bg`;

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1f14" />
          <stop offset="100%" stopColor="#15100a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${bgId})`} />
      <g transform="translate(200 150)">
        <ellipse cx="0" cy="78" rx="150" ry="12" fill="#000" opacity="0.4" />
        {pattern === 'medallion' && <MedallionRug />}
        {pattern === 'garden' && <GardenRug />}
        {pattern === 'tribal' && <TribalRug />}
      </g>
    </svg>
  );
}

const RUG_W = 280;
const RUG_H = 170;

function RugFrame({ field, border }: { field: string; border: string }) {
  return (
    <>
      <rect x={-RUG_W / 2} y={-RUG_H / 2} width={RUG_W} height={RUG_H} rx="4" fill={border} />
      <rect x={-RUG_W / 2 + 10} y={-RUG_H / 2 + 10} width={RUG_W - 20} height={RUG_H - 20} rx="2" fill={field} />
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={`ft-${i}`}
          x1={-RUG_W / 2 + 6 + i * 9.7}
          y1={RUG_H / 2}
          x2={-RUG_W / 2 + 6 + i * 9.7}
          y2={RUG_H / 2 + 8}
          stroke="#e8dcc4"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={`fb-${i}`}
          x1={-RUG_W / 2 + 6 + i * 9.7}
          y1={-RUG_H / 2}
          x2={-RUG_W / 2 + 6 + i * 9.7}
          y2={-RUG_H / 2 - 8}
          stroke="#e8dcc4"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function MedallionRug() {
  return (
    <g>
      <RugFrame field="#5a1a16" border="#3d2410" />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={-RUG_W / 2 + 18 + i * 16} cy={-RUG_H / 2 + 18} r="2" fill="#e8a838" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={-RUG_W / 2 + 18 + i * 16} cy={RUG_H / 2 - 18} r="2" fill="#e8a838" />
      ))}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sy) => (
          <path
            key={`${sx}-${sy}`}
            d={`M ${sx * 30} ${sy * 30} q ${sx * 20} 0 ${sx * 30} ${-sy * 14} q ${-sx * 14} ${-sy * 10} ${-sx * 26} ${-sy * 4}`}
            fill="none"
            stroke="#e8a838"
            strokeWidth="1"
            opacity="0.6"
          />
        ))
      )}
      <g stroke="#f5d27a" strokeWidth="1.4" fill="none">
        <path d="M0 -55 C 30 -40 40 -10 0 0 C -40 -10 -30 -40 0 -55 Z" fill="#c9352f" fillOpacity="0.5" />
        <path d="M0 55 C 30 40 40 10 0 0 C -40 10 -30 40 0 55 Z" fill="#c9352f" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="12" fill="#e8a838" fillOpacity="0.25" />
        <circle cx="0" cy="0" r="5" fill="#f5d27a" />
      </g>
    </g>
  );
}

function GardenRug() {
  return (
    <g>
      <RugFrame field="#1f3d24" border="#3d2410" />
      {[-1, 0, 1].map((cx) =>
        [-1, 0, 1].map((cy) => (
          <rect
            key={`${cx}-${cy}`}
            x={cx * 40 - 18}
            y={cy * 40 - 18}
            width="36"
            height="36"
            rx="2"
            fill="none"
            stroke="#e8a838"
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))
      )}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sy) => (
          <g key={`${sx}-${sy}`} transform={`translate(${sx * 80} ${sy * 50})`}>
            <path d="M0 14 L -6 -10 L 0 -16 L 6 -10 Z" fill="#2db39a" opacity="0.7" />
            <line x1="0" y1="14" x2="0" y2="20" stroke="#5a3e26" strokeWidth="1.5" />
          </g>
        ))
      )}
      <circle cx="0" cy="0" r="10" fill="#f5d27a" opacity="0.3" />
      <circle cx="0" cy="0" r="6" fill="#f5d27a" opacity="0.5" />
      <circle cx="0" cy="0" r="2.5" fill="#fff7e6" />
      {[-60, -20, 20, 60].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 56 : -56} r="3" fill="#c9352f" />
      ))}
    </g>
  );
}

function TribalRug() {
  return (
    <g>
      <RugFrame field="#3d2410" border="#2a1f14" />
      {[-80, -40, 0, 40, 80].map((x, i) => (
        <g key={i}>
          <path d={`M ${x} -28 L ${x + 16} 0 L ${x} 28 L ${x - 16} 0 Z`} fill="#c9352f" fillOpacity="0.65" stroke="#e8a838" strokeWidth="0.8" />
          <circle cx={x} cy="0" r="3" fill="#f5d27a" />
        </g>
      ))}
      {[-100, -60, -20, 20, 60, 100].map((x, i) => (
        <path
          key={i}
          d={`M ${x} -54 q 8 -10 16 0 q -8 6 -16 0`}
          fill="none"
          stroke="#e8a838"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      {[-100, -60, -20, 20, 60, 100].map((x, i) => (
        <path
          key={`b-${i}`}
          d={`M ${x} 54 q 8 10 16 0 q -8 -6 -16 0`}
          fill="none"
          stroke="#e8a838"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      <polyline points="-130,-64 -110,-58 -90,-64 -70,-58 -50,-64 -30,-58 -10,-64 10,-58 30,-64 50,-58 70,-64 90,-58 110,-64 130,-58" fill="none" stroke="#e8a838" strokeWidth="1" opacity="0.6" />
      <polyline points="-130,64 -110,58 -90,64 -70,58 -50,64 -30,58 -10,64 10,58 30,64 50,58 70,64 90,58 110,64 130,58" fill="none" stroke="#e8a838" strokeWidth="1" opacity="0.6" />
    </g>
  );
}
