import { Check, Plus } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductArt } from '@/components/ProductArt';
import { useReveal } from '@/hooks/useReveal';

interface Props {
  products: Product[];
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  compact?: boolean;
}

export function ProductCollection({ products, id, eyebrow, title, highlight, intro, compact }: Props) {
  const { ref, isVisible } = useReveal();

  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${compact ? 'pt-6 pb-16 sm:pt-8 sm:pb-22' : 'py-16 sm:py-22'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            {title} <span className="text-gold-gradient">{highlight}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">{intro}</p>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-4 sm:mt-11 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const { addItem } = useCart();
  const { ref, isVisible } = useReveal();

  const accentRing =
    product.accent === 'crimson'
      ? 'hover:border-crimson-500/40'
      : 'hover:border-saffron-400/50';

  return (
    <article
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} group relative flex h-full flex-col overflow-hidden rounded-3xl border border-saffron-500/15 bg-espresso-800/50 transition-all duration-500 hover:-translate-y-1.5 ${accentRing} hover:shadow-gold-lg`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Art */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-saffron-500/10">
        <ProductArt
          product={product}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full border border-saffron-500/30 bg-espresso-950/70 px-3 py-1 text-[10px] uppercase tracking-widest text-saffron-300 backdrop-blur">
          {product.grade ?? product.size}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-2xl leading-tight text-cream-50">{product.name}</h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-wider text-saffron-400/90">
          {product.tagline}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-300">{product.description}</p>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-cream-300">
              <Check className="h-3.5 w-3.5 text-saffron-400" strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex items-end justify-between border-t border-saffron-500/10 pt-3.5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-cream-400">From {product.origin}</p>
            <p className="font-serif text-3xl text-gold-gradient">
              ${product.priceUsd.toLocaleString()}
              <span className="ml-1 text-sm text-cream-400">USD</span>
            </p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="group/btn flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-105 active:scale-100"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
