import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProduct } from '@/data/catalog';
import type { Product, ProductCategory } from '@/types/product';
import { useCart } from '@/context/CartContext';
import type { Product as CartProduct } from '@/data/products';
import { CarpetTemplate } from '@/components/product-detail/CarpetTemplate';
import { TapestryTemplate } from '@/components/product-detail/TapestryTemplate';
import { MinakariTemplate } from '@/components/product-detail/MinakariTemplate';
import { KhatamTemplate } from '@/components/product-detail/KhatamTemplate';
import {
  ProductGallery,
  ProductHeader,
} from '@/components/product-detail/shared';

const TEMPLATE_MAP: Record<
  Exclude<ProductCategory, 'saffron'>,
  (product: Extract<Product, { category: ProductCategory }>) => JSX.Element
> = {
  carpet: (p) => <CarpetTemplate product={p as Extract<Product, { category: 'carpet' }>} />,
  tapestry: (p) => <TapestryTemplate product={p as Extract<Product, { category: 'tapestry' }>} />,
  minakari: (p) => <MinakariTemplate product={p as Extract<Product, { category: 'minakari' }>} />,
  khatam: (p) => <KhatamTemplate product={p as Extract<Product, { category: 'khatam' }>} />,
};

const VALID_CATEGORIES: string[] = ['carpet', 'tapestry', 'minakari', 'khatam'];

const CATEGORY_LABELS: Record<string, string> = {
  carpet: 'Persian Carpet',
  tapestry: 'Tapestry',
  minakari: 'Minakari',
  khatam: 'Khatam Kari',
};

// --- Category thumbnail SVGs ------------------------------------------------
// Small, subtle artwork identifying each craft tradition. Uses the same
// colour palette as the rest of the site (espresso, saffron, crimson, cream).

function CarpetThumb() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <rect x="6" y="10" width="28" height="20" rx="2" fill="#5a1a16" stroke="#e8a838" strokeWidth="0.8" />
      <rect x="9" y="13" width="22" height="14" rx="1" fill="none" stroke="#e8a838" strokeWidth="0.5" opacity="0.5" />
      <path d="M20 16 C 24 18 24 22 20 24 C 16 22 16 18 20 16 Z" fill="#c9352f" fillOpacity="0.6" stroke="#f5d27a" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="2" fill="#f5d27a" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`ft-${i}`} x1={8 + i * 4.8} y1="30" x2={8 + i * 4.8} y2="33" stroke="#e8dcc4" strokeWidth="0.5" />
      ))}
    </svg>
  );
}

function TapestryThumb() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <rect x="8" y="6" width="24" height="28" rx="1" fill="#2a1f14" stroke="#e8a838" strokeWidth="0.8" />
      <rect x="11" y="9" width="18" height="22" rx="0.5" fill="#3d2410" />
      <path d="M20 13 C 23 15 23 19 20 21 C 17 19 17 15 20 13 Z" fill="#c9352f" fillOpacity="0.5" stroke="#e8a838" strokeWidth="0.5" />
      <path d="M20 21 C 23 23 23 27 20 29 C 17 27 17 23 20 21 Z" fill="#c9352f" fillOpacity="0.5" stroke="#e8a838" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="1.5" fill="#f5d27a" />
    </svg>
  );
}

function MinakariThumb() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <circle cx="20" cy="20" r="13" fill="#1a130c" stroke="#e8a838" strokeWidth="0.8" />
      <circle cx="20" cy="20" r="9" fill="none" stroke="#2db39a" strokeWidth="0.6" opacity="0.6" />
      <path d="M20 14 C 23 16 23 18 20 20 C 17 18 17 16 20 14 Z" fill="#c9352f" fillOpacity="0.5" />
      <path d="M20 20 C 23 22 23 24 20 26 C 17 24 17 22 20 20 Z" fill="#c9352f" fillOpacity="0.5" />
      <circle cx="20" cy="20" r="1.5" fill="#f5d27a" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <circle key={i} cx={20 + Math.cos(a) * 11} cy={20 + Math.sin(a) * 11} r="0.8" fill="#e8a838" opacity="0.6" />
        );
      })}
    </svg>
  );
}

function KhatamThumb() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <rect x="6" y="10" width="28" height="20" rx="2" fill="#2a1f14" stroke="#e8a838" strokeWidth="0.8" />
      <g transform="translate(20 20)">
        <path d="M0 -8 L 6 -2 L 0 4 L -6 -2 Z" fill="#e8a838" fillOpacity="0.3" stroke="#e8a838" strokeWidth="0.5" />
        <path d="M0 -4 L 4 0 L 0 4 L -4 0 Z" fill="#c9352f" fillOpacity="0.4" />
        <path d="M0 -8 L 2 -6 L 0 -4 L -2 -6 Z" fill="#f5d27a" fillOpacity="0.5" />
        <path d="M0 4 L 2 6 L 0 8 L -2 6 Z" fill="#f5d27a" fillOpacity="0.5" />
        <path d="M-6 -2 L -4 0 L -6 2 L -8 0 Z" fill="#f5d27a" fillOpacity="0.5" />
        <path d="M6 -2 L 4 0 L 6 2 L 8 0 Z" fill="#f5d27a" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="1" fill="#f5d27a" />
      </g>
    </svg>
  );
}

const CATEGORY_THUMBS: Record<string, () => JSX.Element> = {
  carpet: CarpetThumb,
  tapestry: TapestryThumb,
  minakari: MinakariThumb,
  khatam: KhatamThumb,
};

export function ProductDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  if (!category || !slug || !VALID_CATEGORIES.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  const product = getProduct(category, slug);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      tagline: product.shortDescription,
      description: product.description,
      category: 'rugs',
      priceUsd: product.price,
      origin: product.origin,
      features: [],
      accent: 'gold',
    };
    addItem(cartProduct);
  };

  const renderTemplate = () => {
    const template = TEMPLATE_MAP[product.category as Exclude<ProductCategory, 'saffron'>];
    return template(product);
  };

  const Thumb = CATEGORY_THUMBS[category];

  return (
    <div className="relative min-h-screen bg-espresso-950 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-4 text-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full border border-saffron-500/15 bg-espresso-800/40 px-4 py-2 text-cream-300/60 transition-all duration-300 hover:border-saffron-400/30 hover:bg-espresso-700/50 hover:text-saffron-300 active:scale-[0.97]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="uppercase tracking-[0.15em] text-[11px]">Back</span>
          </button>

          {Thumb && (
            <div className="flex items-center gap-2.5">
              <Thumb />
              <span className="uppercase tracking-[0.15em] text-[11px] text-cream-400/50">
                {CATEGORY_LABELS[category] ?? category}
              </span>
            </div>
          )}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Gallery — left */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              images={product.images.length > 0 ? product.images : [product.thumbnail]}
              alt={product.name}
            />
          </div>

          {/* Info — right */}
          <div className="min-w-0">
            <ProductHeader
              name={product.name}
              shortDescription={product.shortDescription}
              price={product.price}
              currency={product.currency}
              availability={product.availability}
              productCode={product.productCode}
              onAddToCart={handleAddToCart}
            />

            <div className="mt-10 divide-y divide-saffron-500/8">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
