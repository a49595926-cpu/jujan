import type {
  Product,
  CarpetProduct,
  TapestryProduct,
  MinakariProduct,
  KhatamProduct,
  Dimensions,
  Currency,
  Availability,
} from '@/types/product';
import { RUG_COLLECTIONS } from '@/data/rugs';
import { TABLO_COLLECTIONS } from '@/data/tablos';
import { MINA_COLLECTIONS } from '@/data/minakari';
import { KHATAM_COLLECTIONS } from '@/data/khatam';

// --- Slug helpers ----------------------------------------------------------

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Dimension parsing -----------------------------------------------------

function parseDimensions(size: string): Dimensions | null {
  if (!size) return null;

  const match = size.match(/(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)\s*(cm|m|mm)?/i);
  if (!match) return null;

  const [, lengthStr, widthStr, unitStr] = match;
  const unit = (unitStr ?? 'cm').toLowerCase() as 'cm' | 'm' | 'mm';

  return {
    length: parseFloat(lengthStr),
    width: parseFloat(widthStr),
    unit,
  };
}

// --- Common base factory ---------------------------------------------------

function baseProduct(
  id: string,
  name: string,
  category: Product['category'],
  description: string,
  price: number,
  origin: string,
  images: string[],
  productCode: string,
  featured = false,
): Pick<
  Product,
  | 'id'
  | 'slug'
  | 'name'
  | 'category'
  | 'shortDescription'
  | 'description'
  | 'images'
  | 'thumbnail'
  | 'price'
  | 'currency'
  | 'availability'
  | 'productCode'
  | 'origin'
  | 'featured'
  | 'createdAt'
  | 'updatedAt'
> {
  return {
    id,
    slug: slugify(name),
    name,
    category,
    shortDescription: description.split('.')[0] + '.',
    description,
    images,
    thumbnail: images[0] ?? '',
    price,
    currency: 'USD' as Currency,
    availability: 'in-stock' as Availability,
    productCode,
    origin,
    featured,
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date('2025-01-01').toISOString(),
  };
}

// --- Carpet (from rugs.ts) -------------------------------------------------

function buildCarpets(): CarpetProduct[] {
  const products: CarpetProduct[] = [];

  for (const collection of RUG_COLLECTIONS) {
    for (const rug of collection.rugs) {
      const dims = parseDimensions(rug.dimensions);
      const [region, city] = rug.origin.split(',').map((s) => s.trim());

      products.push({
        ...baseProduct(
          rug.id,
          rug.name,
          'carpet',
          `A ${rug.name.toLowerCase()} from ${rug.origin}. ${rug.material}.`,
          rug.priceUsd,
          rug.origin,
          [],
          rug.id.toUpperCase(),
        ),
        category: 'carpet',
        specs: {
          material: rug.material,
          dimensions: dims,
          region: region ?? null,
          city: city ?? null,
          pattern: rug.pattern,
          collection: collection.name,
        },
      });
    }
  }

  return products;
}

// --- Tapestry (from tablos.ts) ---------------------------------------------

function buildTapestries(): TapestryProduct[] {
  const products: TapestryProduct[] = [];

  for (const collection of TABLO_COLLECTIONS) {
    for (const tablo of collection.tablos) {
      const dims = parseDimensions(tablo.size);
      const gradeLabel = `Grade ${tablo.grade}`;

      products.push({
        ...baseProduct(
          tablo.id,
          tablo.name,
          'tapestry',
          tablo.description,
          tablo.priceUsd,
          'Persian Tapestry',
          [tablo.image],
          tablo.id.toUpperCase(),
        ),
        category: 'tapestry',
        specs: {
          dimensions: dims,
          condition: gradeLabel,
        },
      });
    }
  }

  return products;
}

// --- Minakari (from minakari.ts) -------------------------------------------

function buildMinakaris(): MinakariProduct[] {
  const products: MinakariProduct[] = [];

  for (const collection of MINA_COLLECTIONS) {
    for (const mina of collection.minas) {
      const [region, city] = mina.origin.split(',').map((s) => s.trim());

      products.push({
        ...baseProduct(
          mina.id,
          mina.name,
          'minakari',
          mina.description,
          mina.priceUsd,
          mina.origin,
          [],
          mina.id.toUpperCase(),
        ),
        category: 'minakari',
        specs: {
          itemType: mina.type,
          baseMaterial: mina.material,
          technique: mina.technique,
          region: region ?? null,
          city: city ?? null,
        },
      });
    }
  }

  return products;
}

// --- Khatam (from khatam.ts) -----------------------------------------------

function buildKhatams(): KhatamProduct[] {
  const products: KhatamProduct[] = [];

  for (const collection of KHATAM_COLLECTIONS) {
    for (const khatam of collection.khatams) {
      const [region, city] = khatam.origin.split(',').map((s) => s.trim());

      products.push({
        ...baseProduct(
          khatam.id,
          khatam.name,
          'khatam',
          khatam.description,
          khatam.priceUsd,
          khatam.origin,
          [],
          khatam.id.toUpperCase(),
        ),
        category: 'khatam',
        specs: {
          itemType: khatam.type,
          baseMaterial: khatam.material,
          khatamTechnique: khatam.technique,
          region: region ?? null,
          city: city ?? null,
        },
      });
    }
  }

  return products;
}

// --- Catalog ---------------------------------------------------------------

const carpets = buildCarpets();
const tapestries = buildTapestries();
const minakaris = buildMinakaris();
const khatams = buildKhatams();

export const CATALOG: Product[] = [
  ...carpets,
  ...tapestries,
  ...minakaris,
  ...khatams,
];

const CATALOG_BY_SLUG = new Map<string, Product>();
for (const product of CATALOG) {
  CATALOG_BY_SLUG.set(product.slug, product);
}

export function getProductBySlug(slug: string): Product | undefined {
  return CATALOG_BY_SLUG.get(slug);
}

export function getProduct(category: string, slug: string): Product | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;
  if (product.category !== category) return undefined;
  return product;
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return CATALOG.filter((p) => p.category === category);
}
