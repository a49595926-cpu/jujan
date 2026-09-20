// ---------------------------------------------------------------------------
// Unified Product Type System
//
// This is the single source of truth for the product data model. Every
// category-specific product type extends `BaseProduct` via a discriminated
// union on the `category` field. New categories can be added by:
//   1. Adding a key to `ProductCategory`
//   2. Defining a category-specific interface extending `BaseProduct`
//   3. Adding it to the `Product` union
//
// All specification fields are optional. Templates must only render fields
// that are present and non-null.
// ---------------------------------------------------------------------------

export type ProductCategory =
  | 'saffron'
  | 'carpet'
  | 'tapestry'
  | 'minakari'
  | 'khatam';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'IRR';

export type Availability = 'in-stock' | 'made-to-order' | 'limited' | 'sold-out' | 'pre-order';

// --- Dimensions ----------------------------------------------------------

export interface Dimensions {
  length?: number | null;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  diameter?: number | null;
  unit?: 'cm' | 'mm' | 'm' | null;
}

export interface FrameDimensions {
  length?: number | null;
  width?: number | null;
  unit?: 'cm' | 'mm' | 'm' | null;
}

// --- Common base fields --------------------------------------------------

export interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  images: string[];
  thumbnail: string;
  price: number;
  currency: Currency;
  availability: Availability;
  productCode: string;
  origin: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Saffron specifications ---------------------------------------------

export interface SaffronSpecs {
  grade?: string | null;
  grams?: number | null;
  packaging?: string | null;
  crocinLevel?: string | null;
  isoGrade?: string | null;
  harvestRegion?: string | null;
  features?: string[] | null;
}

// --- Carpet specifications -----------------------------------------------

export interface CarpetSpecs {
  material?: string | null;
  dimensions?: Dimensions | null;
  weight?: number | null;
  weightUnit?: 'kg' | 'g' | null;
  region?: string | null;
  city?: string | null;
  weavingTechnique?: string | null;
  knotType?: string | null;
  knotDensity?: number | null;
  knotDensityUnit?: 'KPSI' | 'KPSDM' | null;
  pileMaterial?: string | null;
  warpMaterial?: string | null;
  weftMaterial?: string | null;
  design?: string | null;
  dominantColors?: string[] | null;
  pattern?: string | null;
  fringe?: string | null;
  borderStyle?: string | null;
  age?: string | null;
  yearMade?: number | null;
  condition?: string | null;
  restored?: boolean | null;
  restorationDetails?: string | null;
  artist?: string | null;
  weaver?: string | null;
  collection?: string | null;
  certificate?: string | null;
}

// --- Tapestry specifications ---------------------------------------------

export interface TapestrySpecs {
  material?: string | null;
  dimensions?: Dimensions | null;
  weight?: number | null;
  weightUnit?: 'kg' | 'g' | null;
  weavingTechnique?: string | null;
  knotDensity?: number | null;
  knotDensityUnit?: 'KPSI' | 'KPSDM' | null;
  backingMaterial?: string | null;
  design?: string | null;
  subject?: string | null;
  artist?: string | null;
  artistSignature?: string | null;
  yearMade?: number | null;
  region?: string | null;
  city?: string | null;
  framed?: boolean | null;
  frameMaterial?: string | null;
  frameDimensions?: FrameDimensions | null;
  frameCondition?: string | null;
  condition?: string | null;
  restored?: boolean | null;
  restorationDetails?: string | null;
}

// --- Minakari specifications --------------------------------------------

export interface MinakariSpecs {
  itemType?: string | null;
  baseMaterial?: string | null;
  dimensions?: Dimensions | null;
  weight?: number | null;
  weightUnit?: 'kg' | 'g' | null;
  technique?: string | null;
  glazeType?: string | null;
  firingMethod?: string | null;
  handPainted?: boolean | null;
  design?: string | null;
  motif?: string | null;
  dominantColors?: string[] | null;
  artist?: string | null;
  workshop?: string | null;
  region?: string | null;
  city?: string | null;
  yearMade?: number | null;
  use?: string | null;
}

// --- Khatam specifications -----------------------------------------------

export interface KhatamSpecs {
  itemType?: string | null;
  dimensions?: Dimensions | null;
  weight?: number | null;
  weightUnit?: 'kg' | 'g' | null;
  baseMaterial?: string | null;
  woodType?: string | null;
  metalType?: string | null;
  inlayMaterials?: string[] | null;
  khatamTechnique?: string | null;
  khatamPattern?: string | null;
  inlayDensity?: string | null;
  handcrafted?: boolean | null;
  design?: string | null;
  motif?: string | null;
  dominantColors?: string[] | null;
  artist?: string | null;
  workshop?: string | null;
  region?: string | null;
  city?: string | null;
  yearMade?: number | null;
  use?: string | null;
}

// --- Discriminated union of all product types ----------------------------

export interface SaffronProduct extends BaseProduct {
  category: 'saffron';
  specs: SaffronSpecs;
}

export interface CarpetProduct extends BaseProduct {
  category: 'carpet';
  specs: CarpetSpecs;
}

export interface TapestryProduct extends BaseProduct {
  category: 'tapestry';
  specs: TapestrySpecs;
}

export interface MinakariProduct extends BaseProduct {
  category: 'minakari';
  specs: MinakariSpecs;
}

export interface KhatamProduct extends BaseProduct {
  category: 'khatam';
  specs: KhatamSpecs;
}

export type Product =
  | SaffronProduct
  | CarpetProduct
  | TapestryProduct
  | MinakariProduct
  | KhatamProduct;

// --- Category registry for extensibility --------------------------------

export interface CategoryDefinition {
  key: ProductCategory;
  label: string;
  routeSegment: string;
}

export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  { key: 'saffron', label: 'Saffron', routeSegment: 'saffron' },
  { key: 'carpet', label: 'Carpet', routeSegment: 'carpet' },
  { key: 'tapestry', label: 'Tapestry', routeSegment: 'tapestry' },
  { key: 'minakari', label: 'Minakari', routeSegment: 'minakari' },
  { key: 'khatam', label: 'Khatam Kari', routeSegment: 'khatam' },
];

export function getCategoryDefinition(
  category: ProductCategory,
): CategoryDefinition | undefined {
  return CATEGORY_DEFINITIONS.find((c) => c.key === category);
}
