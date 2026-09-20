import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SAFFRON_TYPES, type SaffronType, type Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCollection';
import { useReveal } from '@/hooks/useReveal';

function productsForType(type: SaffronType): Product[] {
  const grams = [5, 10, 50, 100];
  const packagings: Record<number, { packaging: string; packagingClause: string }> = {
    5: {
      packaging: 'Collector Tin',
      packagingClause: "Sealed in a vacuum collector tin to lock in every thread's aroma.",
    },
    10: {
      packaging: 'Amber Glass Jar',
      packagingClause: 'Packed in an amber glass jar to preserve potency and color.',
    },
    50: {
      packaging: 'Apothecary Canister',
      packagingClause: 'Supplied in a wide apothecary canister for the dedicated kitchen.',
    },
    100: {
      packaging: 'Master Presentation Box',
      packagingClause: 'Presented in a master box for chefs, gifting, and bulk use.',
    },
  };
  return grams.map((g) => {
    const pack = packagings[g];
    return {
      id: `saffron-${type.key}-${g}g`,
      name: `${type.label} — ${g}g`,
      tagline: `${type.character} · ${pack.packaging}`,
      description: `${type.typeLead} ${pack.packagingClause}`,
      category: 'saffron' as const,
      priceUsd: type.prices[g],
      weight: `${g} grams`,
      origin: 'Khorasan, Iran',
      grade: type.grade,
      features: [...type.typeFeatures, pack.packaging],
      accent: type.accent,
    };
  });
}

export function SaffronCollections() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="saffron" ref={ref} className="relative overflow-hidden py-16 sm:py-22">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950 via-espresso-900 to-espresso-950" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
       <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">The Golden Spice</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            Premium Persian <span className="text-gold-gradient">Saffron</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            Five grades of hand-harvested saffron from the sun-drenched fields of Khorasan — the historic homeland of the world's finest saffron for more than three millennia. From the connoisseur's Super Negin to the traditional Dast bunch, each cut is available in 5g, 10g, 50g, and 100g packaging.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {SAFFRON_TYPES.map((type) => (
            <SaffronRail key={type.key} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SaffronRail({ type }: { type: SaffronType }) {
  const { ref, isVisible } = useReveal();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const products = productsForType(type);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.getBoundingClientRect().width ?? 280;
    const gap = 20;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-saffron-400/90">{type.character}</p>
          <h3 className="mt-2 font-serif text-3xl leading-tight text-cream-50 sm:text-4xl">
            {type.label}
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
        {products.map((product, i) => (
          <div
            key={product.id}
            data-card
            className="snap-start shrink-0 w-[78vw] max-w-[300px] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(25%-0.9375rem)]"
          >
            <ProductCard product={product} delay={i * 60} />
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
      aria-label={dir === 'left' ? 'Previous saffron' : 'Next saffron'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-saffron-500/30 bg-espresso-800/60 text-saffron-300 backdrop-blur transition-all duration-300 hover:border-saffron-400/60 hover:text-saffron-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {dir === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}