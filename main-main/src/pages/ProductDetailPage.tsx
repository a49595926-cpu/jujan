import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProduct } from '@/data/catalog';
import type { Product, ProductCategory } from '@/types/product';
import { CarpetTemplate } from '@/components/product-detail/CarpetTemplate';
import { TapestryTemplate } from '@/components/product-detail/TapestryTemplate';
import { MinakariTemplate } from '@/components/product-detail/MinakariTemplate';
import { KhatamTemplate } from '@/components/product-detail/KhatamTemplate';
import {
  ProductGallery,
  ProductHeader,
  BackButton,
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

export function ProductDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();

  if (!category || !slug || !VALID_CATEGORIES.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  const product = getProduct(category, slug);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const renderTemplate = () => {
    const template = TEMPLATE_MAP[product.category as Exclude<ProductCategory, 'saffron'>];
    return template(product);
  };

  return (
    <div className="relative min-h-screen bg-espresso-950 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-cream-400 transition-colors hover:text-saffron-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              images={product.images.length > 0 ? product.images : [product.thumbnail]}
              alt={product.name}
            />
          </div>

          <div className="space-y-8">
            <ProductHeader
              name={product.name}
              shortDescription={product.shortDescription}
              price={product.price}
              currency={product.currency}
              availability={product.availability}
              productCode={product.productCode}
            />

            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
