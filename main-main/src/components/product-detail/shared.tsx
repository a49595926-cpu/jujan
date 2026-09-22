import { useState, type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { Dimensions, FrameDimensions } from '@/types/product';

// --- Helpers ---------------------------------------------------------------

export function hasValue(v: unknown): v is null | undefined | '' {
  return v === null || v === undefined || v === '';
}

export function hasData(fields: (unknown)[]): boolean {
  return fields.some((f) => !hasValue(f));
}

export function formatDimensions(d: Dimensions | null | undefined): string | null {
  if (!d) return null;
  const unit = d.unit ?? 'cm';
  const parts: string[] = [];
  if (d.length != null) parts.push(`Length: ${d.length} ${unit}`);
  if (d.width != null) parts.push(`Width: ${d.width} ${unit}`);
  if (d.height != null) parts.push(`Height: ${d.height} ${unit}`);
  if (d.depth != null) parts.push(`Depth: ${d.depth} ${unit}`);
  if (d.diameter != null) parts.push(`Diameter: ${d.diameter} ${unit}`);
  if (parts.length === 0) return null;
  return parts.join(' · ');
}

export function formatFrameDimensions(d: FrameDimensions | null | undefined): string | null {
  if (!d) return null;
  const unit = d.unit ?? 'cm';
  const parts: string[] = [];
  if (d.length != null) parts.push(`${d.length} ${unit}`);
  if (d.width != null) parts.push(`${d.width} ${unit}`);
  if (parts.length === 0) return null;
  return parts.join(' × ');
}

export function formatBoolean(v: boolean | null | undefined): string | null {
  if (v === null || v === undefined) return null;
  return v ? 'Yes' : 'No';
}

export function formatYear(year: number | null | undefined): string | null {
  if (year === null || year === undefined) return null;
  return String(year);
}

export function formatPrice(price: number, currency: string): string {
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '';
  return `${symbol}${price.toLocaleString()}`;
}

// --- SpecSection -----------------------------------------------------------

export interface SpecSectionProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export function SpecSection({ title, icon: Icon, children }: SpecSectionProps) {
  return (
    <section className="py-7 first:pt-6">
      <div className="mb-5 flex items-center gap-2.5">
        {Icon && (
          <Icon className="h-4 w-4 text-saffron-400/50" />
        )}
        <h3 className="font-serif text-lg tracking-tight text-cream-50">{title}</h3>
      </div>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {children}
      </dl>
    </section>
  );
}

// --- SpecRow ---------------------------------------------------------------

export interface SpecRowProps {
  label: string;
  value: string | null | undefined;
}

export function SpecRow({ label, value }: SpecRowProps) {
  if (hasValue(value)) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-cream-400/50">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-cream-100">{value}</dd>
    </div>
  );
}

// --- BooleanRow ------------------------------------------------------------

export interface BooleanRowProps {
  label: string;
  value: boolean | null | undefined;
}

export function BooleanRow({ label, value }: BooleanRowProps) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-cream-400/50">{label}</dt>
      <dd className="flex items-center gap-1.5 text-[15px] text-cream-100">
        {value ? (
          <Check className="h-3.5 w-3.5 text-teal-400" />
        ) : (
          <X className="h-3.5 w-3.5 text-cream-400" />
        )}
        {value ? 'Yes' : 'No'}
      </dd>
    </div>
  );
}

// --- ListRow ---------------------------------------------------------------

export interface ListRowProps {
  label: string;
  values: string[] | null | undefined;
}

export function ListRow({ label, values }: ListRowProps) {
  if (!values || values.length === 0) return null;
  return (
    <div className="flex flex-col gap-1 sm:col-span-2">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-cream-400/50">{label}</dt>
      <dd className="flex flex-wrap gap-2">
        {values.map((v, i) => (
          <span
            key={i}
            className="rounded-full border border-saffron-500/12 bg-saffron-500/5 px-3 py-1 text-xs text-cream-200"
          >
            {v}
          </span>
        ))}
      </dd>
    </div>
  );
}

// --- ProductGallery --------------------------------------------------------

export interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-espresso-800/40 ring-1 ring-saffron-500/8">
        <div className="persian-pattern absolute inset-0 opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-lg italic text-cream-400/40">{alt}</p>
        </div>
      </div>
    );
  }

  const hasMultiple = images.length > 1;

  return (
    <div className="space-y-3">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-espresso-800/40 ring-1 ring-saffron-500/8">
        <img
          src={images[activeIdx]}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      {hasMultiple && (
        <div className="flex gap-2.5 overflow-x-auto scroll-smooth [touch-action:pan-x] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg ring-1 transition-all duration-300 ${
                i === activeIdx
                  ? 'ring-saffron-400/40 opacity-100'
                  : 'ring-saffron-500/8 opacity-50 hover:opacity-80 hover:ring-saffron-400/25'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt={`${alt} — view ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- ProductHeader ---------------------------------------------------------

export interface ProductHeaderProps {
  name: string;
  shortDescription: string;
  price: number;
  currency: string;
  availability: string;
  productCode: string;
  onAddToCart: () => void;
}

export function ProductHeader({
  name,
  shortDescription,
  price,
  currency,
  availability,
  productCode,
  onAddToCart,
}: ProductHeaderProps) {
  const availabilityStyles: Record<string, string> = {
    'in-stock': 'border-teal-400/25 text-teal-400',
    'made-to-order': 'border-saffron-400/25 text-saffron-300',
    'limited': 'border-crimson-400/25 text-crimson-400',
    'sold-out': 'border-cream-400/15 text-cream-400',
    'pre-order': 'border-saffron-400/25 text-saffron-300',
  };

  const availabilityLabel = availability.replace(/-/g, ' ');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
            availabilityStyles[availability] ?? availabilityStyles['in-stock']
          }`}
        >
          {availabilityLabel}
        </span>
        {productCode && (
          <span className="text-[11px] uppercase tracking-[0.18em] text-cream-400/40">
            {productCode}
          </span>
        )}
      </div>

      <h1 className="font-serif text-4xl leading-[1.1] text-cream-50 sm:text-[2.75rem]">
        {name}
      </h1>

      {shortDescription && (
        <p className="text-lg leading-relaxed text-cream-300/80 text-balance">
          {shortDescription}
        </p>
      )}

      <div className="flex items-baseline gap-2 pt-1">
        <span className="font-serif text-3xl text-saffron-300">
          {formatPrice(price, currency)}
        </span>
        <span className="text-sm text-cream-400/50">{currency}</span>
      </div>

      <button
        onClick={onAddToCart}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-espresso-950 shadow-gold transition-all duration-300 hover:brightness-105 active:scale-[0.98] sm:w-auto sm:min-w-[260px]"
        aria-label={`Add ${name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
}

// --- OverviewSection -------------------------------------------------------

export interface OverviewSectionProps {
  description: string;
  origin: string;
}

export function OverviewSection({ description, origin }: OverviewSectionProps) {
  if (hasValue(description) && hasValue(origin)) return null;

  return (
    <section className="py-7 first:pt-6">
      <div className="mb-4 flex items-center gap-2.5">
        <h3 className="font-serif text-lg tracking-tight text-cream-50">The Story</h3>
      </div>
      {description && (
        <p className="text-[17px] leading-[1.8] text-cream-200/85">{description}</p>
      )}
      {origin && (
        <p className="mt-5 flex items-center gap-2 text-sm text-cream-400/60">
          <span className="h-1 w-1 rounded-full bg-saffron-400/50" />
          <span className="uppercase tracking-[0.2em] text-[10px]">Origin</span>
          <span className="text-cream-200">{origin}</span>
        </p>
      )}
    </section>
  );
}

// --- BackButton ------------------------------------------------------------

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-cream-400/60 transition-colors hover:text-saffron-300"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </button>
  );
}

// --- NavArrow (reused from collection components) --------------------------

export function GalleryNavArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous image' : 'Next image'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-saffron-500/20 bg-espresso-950/70 text-saffron-300 backdrop-blur transition-all duration-300 hover:border-saffron-400/50 hover:text-saffron-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {dir === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
