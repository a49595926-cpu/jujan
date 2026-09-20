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
    <div className="rounded-2xl border border-saffron-500/15 bg-espresso-800/50 p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-saffron-500/30 bg-saffron-500/10 text-saffron-300">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h3 className="font-serif text-2xl text-cream-50">{title}</h3>
      </div>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {children}
      </dl>
    </div>
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
    <div className="flex flex-col gap-0.5 border-b border-saffron-500/8 pb-3 sm:border-b-0 sm:pb-0">
      <dt className="text-xs uppercase tracking-wider text-cream-400">{label}</dt>
      <dd className="text-sm text-cream-100">{value}</dd>
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
    <div className="flex flex-col gap-0.5 border-b border-saffron-500/8 pb-3 sm:border-b-0 sm:pb-0">
      <dt className="text-xs uppercase tracking-wider text-cream-400">{label}</dt>
      <dd className="flex items-center gap-1.5 text-sm text-cream-100">
        {value ? (
          <Check className="h-4 w-4 text-teal-400" />
        ) : (
          <X className="h-4 w-4 text-cream-400" />
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
    <div className="flex flex-col gap-0.5 border-b border-saffron-500/8 pb-3 sm:border-b-0 sm:pb-0 sm:col-span-2">
      <dt className="text-xs uppercase tracking-wider text-cream-400">{label}</dt>
      <dd className="flex flex-wrap gap-2">
        {values.map((v, i) => (
          <span
            key={i}
            className="rounded-full border border-saffron-500/20 bg-saffron-500/8 px-3 py-1 text-sm text-cream-100"
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
      <div className="aspect-[4/3] rounded-2xl border border-saffron-500/15 bg-espresso-800/50" />
    );
  }

  const hasMultiple = images.length > 1;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-saffron-500/20 bg-espresso-800/50">
        <img
          src={images[activeIdx]}
          alt={alt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/40 via-transparent to-transparent" />
      </div>

      {hasMultiple && (
        <div className="flex gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                i === activeIdx
                  ? 'border-saffron-400/60 opacity-100'
                  : 'border-saffron-500/15 opacity-60 hover:border-saffron-400/40 hover:opacity-90'
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
}

export function ProductHeader({
  name,
  shortDescription,
  price,
  currency,
  availability,
  productCode,
}: ProductHeaderProps) {
  const availabilityStyles: Record<string, string> = {
    'in-stock': 'border-teal-400/40 bg-teal-500/10 text-teal-400',
    'made-to-order': 'border-saffron-400/40 bg-saffron-500/10 text-saffron-300',
    'limited': 'border-crimson-400/40 bg-crimson-500/10 text-crimson-400',
    'sold-out': 'border-cream-400/30 bg-cream-500/10 text-cream-400',
    'pre-order': 'border-saffron-400/40 bg-saffron-500/10 text-saffron-300',
  };

  const availabilityLabel = availability.replace(/-/g, ' ');

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${
            availabilityStyles[availability] ?? availabilityStyles['in-stock']
          }`}
        >
          {availabilityLabel}
        </span>
        {productCode && (
          <span className="text-xs uppercase tracking-wider text-cream-400">
            {productCode}
          </span>
        )}
      </div>

      <h1 className="mt-4 font-serif text-4xl leading-tight text-cream-50 sm:text-5xl">
        {name}
      </h1>

      {shortDescription && (
        <p className="mt-3 text-lg leading-relaxed text-cream-300 text-balance">
          {shortDescription}
        </p>
      )}

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-4xl text-gold-gradient">
          {formatPrice(price, currency)}
        </span>
        <span className="text-sm text-cream-400">{currency}</span>
      </div>
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
    <div className="rounded-2xl border border-saffron-500/15 bg-espresso-800/50 p-6 sm:p-8">
      <h3 className="mb-4 font-serif text-2xl text-cream-50">Overview</h3>
      {description && (
        <p className="text-base leading-relaxed text-cream-200">{description}</p>
      )}
      {origin && (
        <p className="mt-4 text-sm text-cream-400">
          <span className="uppercase tracking-wider">Origin:</span>{' '}
          <span className="text-cream-200">{origin}</span>
        </p>
      )}
    </div>
  );
}

// --- BackButton ------------------------------------------------------------

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-cream-400 transition-colors hover:text-saffron-300"
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-saffron-500/30 bg-espresso-950/70 text-saffron-300 backdrop-blur transition-all duration-300 hover:border-saffron-400/60 hover:text-saffron-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {dir === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
