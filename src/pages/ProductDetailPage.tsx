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

  return (
    <div className="relative min-h-screen bg-espresso-950 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-3 text-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cream-400/50 transition-colors hover:text-saffron-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="uppercase tracking-[0.15em] text-[11px]">Back</span>
          </button>
          <span className="text-cream-400/20">·</span>
          <span className="uppercase tracking-[0.15em] text-[11px] text-cream-400/50">
            {CATEGORY_LABELS[category] ?? category}
          </span>
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
