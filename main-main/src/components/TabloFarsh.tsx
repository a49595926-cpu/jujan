import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Lock, Ruler, BadgeCheck, Plus } from 'lucide-react';
import { TABLO_COLLECTIONS, type TabloFarsh, type TabloGrade } from '@/data/tablos';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

const gradeStyles: Record<TabloGrade, { ring: string; text: string; bg: string; label: string }> = {
  A: { ring: 'border-saffron-400/60', text: 'text-saffron-200', bg: 'bg-saffron-500/15', label: 'Grade A' },
  B: { ring: 'border-saffron-500/40', text: 'text-saffron-300', bg: 'bg-saffron-500/10', label: 'Grade B' },
  C: { ring: 'border-cream-400/30', text: 'text-cream-300', bg: 'bg-cream-500/10', label: 'Grade C' },
};

export function TabloFarsh() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="tablo-farsh" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Pictorial Carpets</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Persian <span className="text-gold-gradient">Tapestry</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            Picture carpets — woven paintings where master weavers translate gardens, hunting scenes, and royal motifs into knot-count artistry. Each piece is offered as a private viewing; request access to reveal the full-resolution artwork.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {TABLO_COLLECTIONS.map((collection) => (
            <TabloRail key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TabloRail({ collection }: { collection: typeof TABLO_COLLECTIONS[number] }) {
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
        {collection.tablos.map((tablo, i) => (
          <div
            key={tablo.id}
            data-card
            className="snap-start shrink-0 w-[78vw] max-w-[340px] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(25%-0.9375rem)]"
          >
            <TabloCard tablo={tablo} delay={i * 60} isRoyal={collection.id === 'tablo-royal'} />
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
      aria-label={dir === 'left' ? 'Previous Tablo Farsh' : 'Next Tablo Farsh'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-saffron-500/30 bg-espresso-800/60 text-saffron-300 backdrop-blur transition-all duration-300 hover:border-saffron-400/60 hover:text-saffron-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {dir === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}

function TabloCard({ tablo, delay, isRoyal }: { tablo: TabloFarsh; delay: number; isRoyal: boolean }) {
  const { addItem } = useCart();
  const { ref, isVisible } = useReveal();
  const g = gradeStyles[tablo.grade];

  const handleAdd = () => {
    const product: Product = {
      id: tablo.id,
      name: tablo.name,
      tagline: tablo.size,
      description: tablo.description,
      category: 'rugs',
      priceUsd: tablo.priceUsd,
      size: tablo.size,
      origin: 'Persian Tapestry',
      grade: `Grade ${tablo.grade}`,
      features: [tablo.size, `Grade ${tablo.grade}`],
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
      {/* Blurred image preview */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-saffron-500/10">
        <img
          src={tablo.image}
          alt={tablo.alt}
          loading="lazy"
          className="h-full w-full scale-110 object-cover blur-2xl transition-transform duration-700 group-hover:scale-125"
        />
        {/* Overlay layer on the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/60 to-espresso-950/20" />
        <div className="absolute inset-0 bg-espresso-950/30 backdrop-blur-[2px]" />

        {/* Grade badge */}
        <div className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full border ${g.ring} ${g.bg} px-3 py-1 text-[10px] uppercase tracking-widest ${g.text} backdrop-blur`}>
          <BadgeCheck className="h-3 w-3" />
          {g.label}
        </div>

        {/* Lock indicator */}
        <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-saffron-500/30 bg-espresso-950/70 text-saffron-300 backdrop-blur">
          <Lock className="h-4 w-4" />
        </div>

        {/* Preview-only watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rotate-[-8deg] border border-saffron-400/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-saffron-200/70">
            Private Preview
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-serif text-2xl leading-tight text-cream-50">{tablo.name}</h4>

        <div className="mt-3 space-y-2 text-sm text-cream-300">
          <p className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-saffron-400" />
            {tablo.size}
          </p>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-300">{tablo.description}</p>

        <div className="mt-4 flex items-end justify-between border-t border-saffron-500/10 pt-4">
          <p className="font-serif text-3xl text-gold-gradient">
            ${tablo.priceUsd.toLocaleString()}
            <span className="ml-1 text-sm text-cream-400">USD</span>
          </p>
        </div>

        {isRoyal ? (
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-saffron-400/40 bg-saffron-500/10 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-saffron-200 transition-all duration-300 hover:border-saffron-300/60 hover:bg-saffron-500/20 hover:text-saffron-100"
          >
            <Lock className="h-4 w-4" />
            Request Access
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-[1.03] active:scale-100"
            aria-label={`Add ${tablo.name} to cart`}
          >
            <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
            Add
          </button>
        )}
      </div>
    </article>
  );
}

