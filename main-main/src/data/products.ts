export type ProductCategory = 'saffron' | 'confectionery' | 'rugs' | 'khatamkari' | 'minakari';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  priceUsd: number;
  weight?: string;
  size?: string;
  origin: string;
  grade?: string;
  features: string[];
  accent: 'gold' | 'crimson';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const TELEGRAM_URL = 'https://t.me/PersianTreasures';
export const TELEGRAM_HANDLE = '@PersianTreasures';

// ---------------------------------------------------------------------------
// Saffron collection — 5 grades, each in 5g / 10g / 50g / 100g packaging.
// Prices are per-type (bulk discount at larger sizes) and grounded in real
// retail tiers: Negin (premium) > Sargol > Pushal > Dast (most economical).
// ---------------------------------------------------------------------------

interface SaffronPackaging {
  grams: number;
  packaging: string;
  packagingClause: string;
}

const SAFFRON_PACKAGINGS: SaffronPackaging[] = [
  {
    grams: 5,
    packaging: 'Collector Tin',
    packagingClause:
      "Sealed in a vacuum collector tin to lock in every thread's aroma.",
  },
  {
    grams: 10,
    packaging: 'Amber Glass Jar',
    packagingClause:
      'Packed in an amber glass jar to preserve potency and color.',
  },
  {
    grams: 50,
    packaging: 'Apothecary Canister',
    packagingClause:
      'Supplied in a wide apothecary canister for the dedicated kitchen.',
  },
  {
    grams: 100,
    packaging: 'Master Presentation Box',
    packagingClause:
      'Presented in a master box for chefs, gifting, and bulk use.',
  },
];

export interface SaffronType {
  key: 'super-negin' | 'sargol' | 'negin' | 'pushal' | 'dast';
  label: string;
  character: string;
  grade: string;
  accent: 'gold' | 'crimson';
  typeLead: string;
  typeFeatures: string[];
  prices: Record<number, number>;
}

export const SAFFRON_TYPES: SaffronType[] = [
  {
    key: 'super-negin',
    label: 'Super Negin Saffron',
    character: 'Extra-Long All-Red',
    grade: 'Super Negin — Grade A+',
    accent: 'crimson',
    typeLead:
      'Super Negin is the absolute pinnacle of Persian saffron — the longest, thickest, and most vivid all-red threads available anywhere. Hand-selected from the earliest harvest blooms, each strand is a flawless, extra-long all-red stigma with no yellow style. Its coloring strength and aroma exceed every other grade, making it the ultimate connoisseur choice. Lab-verified to far exceed ISO 3632 Grade A.',
    typeFeatures: ['Extra-long all-red', 'Crocin 290+', 'ISO 3632 Grade A+'],
    prices: { 5: 99, 10: 189, 50: 820, 100: 1490 },
  },
  {
    key: 'negin',
    label: 'Negin Saffron',
    character: 'Long-Cut All-Red',
    grade: 'Negin — Grade A',
    accent: 'crimson',
    typeLead:
      'Negin is the crown jewel of Persian saffron — extra-long, extra-thick all-red threads with no yellow style, drawn only from the choicest blooms. Its rare length and vivid crimson make it the most prized cut among connoisseurs, with coloring and aroma that surpass even Sargol. Lab-verified to exceed ISO 3632 Grade A.',
    typeFeatures: ['Extra-long all-red', 'Crocin 270+', 'ISO 3632 Grade A'],
    prices: { 5: 79, 10: 149, 50: 650, 100: 1190 },
  },
  {
    key: 'sargol',
    label: 'Sargol Saffron',
    character: 'All-Red Grade A',
    grade: 'Sargol — Grade A',
    accent: 'crimson',
    typeLead:
      'Sargol is the finest cut of Persian saffron — pure all-red stigma tips, hand-separated to exclude every trace of the yellow style. Harvested at dawn in Khorasan, its deep crimson threads deliver extraordinary coloring strength, intense aroma, and a flavor that elevates risotto, tea, and desserts. Lab-verified to exceed ISO 3632 Grade A.',
    typeFeatures: ['All-red stigma', 'Crocin 250+', 'ISO 3632 Grade A'],
    prices: { 5: 59, 10: 109, 50: 480, 100: 890 },
  },
  {
    key: 'pushal',
    label: 'Pushal Saffron',
    character: 'Red + Style Balance',
    grade: 'Pushal — Grade A',
    accent: 'gold',
    typeLead:
      'Pushal saffron carries the red stigma with a slender thread of the yellow style, yielding a rounder, sweeter profile with a gentler color. The everyday favorite of Persian households, it is perfect for daily cooking, traditional brews, and recipes that call for a balanced saffron character. Lab-verified Grade A.',
    typeFeatures: ['Red + style balance', 'Crocin 210+', 'ISO 3632 Grade A'],
    prices: { 5: 39, 10: 69, 50: 290, 100: 530 },
  },
  {
    key: 'dast',
    label: 'Dast Saffron',
    character: 'Whole Bunch · Traditional',
    grade: 'Dast — Grade A',
    accent: 'gold',
    typeLead:
      "Dast, or 'bunch' saffron, keeps the whole strand intact — red stigma, yellow style, and root — exactly as it comes from the flower. The most traditional and economical cut, it offers a mellow, full-bodied flavor ideal for slow-cooked stews, rice, and infusions. Lab-verified Grade A.",
    typeFeatures: ['Whole strand intact', 'Crocin 180+', 'ISO 3632 Grade A'],
    prices: { 5: 29, 10: 49, 50: 199, 100: 360 },
  },
];

const saffronProducts: Product[] = SAFFRON_TYPES.flatMap((type) =>
  SAFFRON_PACKAGINGS.map((pack): Product => ({
    id: `saffron-${type.key}-${pack.grams}g`,
    name: `${type.label} — ${pack.grams}g`,
    tagline: `${type.character} · ${pack.packaging}`,
    description: `${type.typeLead} ${pack.packagingClause}`,
    category: 'saffron',
    priceUsd: type.prices[pack.grams],
    weight: `${pack.grams} grams`,
    origin: 'Khorasan, Iran',
    grade: type.grade,
    features: [...type.typeFeatures, pack.packaging],
    accent: type.accent,
  }))
);

// ---------------------------------------------------------------------------
// Persian Confectionery — authentic Gaz (pistachio nougat).
// Gaz is a traditional Iranian nougat made from manna (gaz-angabin), egg
// white, sugar, and pistachios. These are produced in Bojnourd & Boldaji,
// the regions famed for the finest Gaz in Iran.
// ---------------------------------------------------------------------------

const gazProducts: Product[] = [
  {
    id: 'gaz-40pistachio-300g',
    name: 'Gaz-e-Bojnourd — 40% Pistachio',
    tagline: 'Traditional Nougat · 300g Box',
    description:
      'Classic Gaz-e-Bojnourd nougat with 40% premium Akbari pistachios folded into a soft manna-and-egg-white base. Cut into bite-sized squares, each layer revealing whole green kernels. The authentic taste of Iranian celebrations.',
    category: 'confectionery',
    priceUsd: 24,
    weight: '300 grams',
    origin: 'Bojnourd, North Khorasan',
    grade: '40% Pistachio',
    features: ['40% Akbari pistachios', 'Manna (gaz-angabin) base', 'Soft, melt-in-mouth texture', '12 pieces'],
    accent: 'gold',
  },
  {
    id: 'gaz-50pistachio-500g',
    name: 'Boldaji Gaz — 50% Pistachio',
    tagline: 'Rich Nougat · 500g Box',
    description:
      'Boldaji Gaz from the highlands of Chaharmahal, where the finest gaz-angabin manna is gathered. A higher pistachio ratio delivers an intensely nutty, caramel-toned nougat with a satisfyingly tender bite. A connoisseur favorite.',
    category: 'confectionery',
    priceUsd: 42,
    weight: '500 grams',
    origin: 'Boldaji, Chaharmahal',
    grade: '50% Pistachio',
    features: ['50% Akbari pistachios', 'Highland gaz-angabin manna', 'Tender, caramel notes', '20 pieces'],
    accent: 'crimson',
  },
  {
    id: 'gaz-premium-giftbox-900g',
    name: 'Special Premium Gaz Gift Box',
    tagline: 'Curated Assortment · 900g',
    description:
      'Our flagship presentation — a hand-finished gift box of assorted Gaz: 40% and 50% pistachio cuts alongside saffron-infused and rosewater varieties. Each piece is individually wrapped. The definitive Persian gift for connoisseurs.',
    category: 'confectionery',
    priceUsd: 79,
    weight: '900 grams',
    origin: 'Bojnourd & Boldaji',
    grade: 'Premium Assortment',
    features: ['Assorted cuts', 'Saffron & rosewater varieties', 'Individually wrapped', '36 pieces', 'Gift-ready box'],
    accent: 'gold',
  },
];

// ---------------------------------------------------------------------------
// Handmade Persian rugs — unchanged.
// ---------------------------------------------------------------------------

const rugProducts: Product[] = [
  {
    id: 'rug-tabriz-140x200',
    name: 'Tabriz Medallion Rug',
    tagline: 'Hand-knotted 140 × 200 cm',
    description:
      'A museum-quality Tabriz rug with a central medallion on a deep crimson field. Knotted at 320 knots per square inch over four months by a master weaver in East Azerbaijan. Pure wool on a cotton foundation.',
    category: 'rugs',
    priceUsd: 2400,
    size: '140 × 200 cm',
    origin: 'Tabriz, East Azerbaijan',
    features: ['320 KPSI', 'Pure wool pile', 'Cotton foundation', 'Natural dyes', '4 months to weave'],
    accent: 'crimson',
  },
  {
    id: 'rug-kashan-200x300',
    name: 'Kashan Garden Rug',
    tagline: 'Hand-knotted 200 × 300 cm',
    description:
      'A grand Kashan garden rug depicting a formal Persian paradise garden. Intricate arabesques, cypress trees, and flowing water motifs in rich saffron and indigo tones. A heirloom centerpiece.',
    category: 'rugs',
    priceUsd: 4200,
    size: '200 × 300 cm',
    origin: 'Kashan, Isfahan',
    features: ['400 KPSI', 'Kork wool pile', 'Cotton foundation', 'Natural dyes', '7 months to weave'],
    accent: 'gold',
  },
  {
    id: 'rug-qashqai-120x180',
    name: 'Qashqai Nomadic Rug',
    tagline: 'Hand-knotted 120 × 180 cm',
    description:
      'A vibrant tribal rug woven by Qashqai nomads of the Zagros mountains. Geometric diamond medallions, stylized animal motifs, and a bold palette of madder red and saffron yellow. Each rug tells a story.',
    category: 'rugs',
    priceUsd: 1450,
    size: '120 × 180 cm',
    origin: 'Zagros Mountains, Fars',
    features: ['180 KPSI', 'Hand-spun wool', 'Nomadic weaving', 'Natural dyes', 'One of a kind'],
    accent: 'gold',
  },
];

export const PRODUCTS: Product[] = [...saffronProducts, ...gazProducts, ...rugProducts];
