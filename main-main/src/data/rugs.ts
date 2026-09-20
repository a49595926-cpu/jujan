export type RugPattern = 'medallion' | 'garden' | 'tribal';

export interface Rug {
  id: string;
  name: string;
  origin: string;
  dimensions: string;
  material: string;
  priceUsd: number;
  pattern: RugPattern;
}

export interface RugCollectionData {
  id: string;
  name: string;
  eyebrow: string;
  rugs: Rug[];
}

const PATTERNS: RugPattern[] = ['medallion', 'garden', 'tribal'];

function buildRugs(
  prefix: string,
  city: string,
  names: string[],
): Rug[] {
  const dimensions = [
    '150 × 240 cm',
    '200 × 300 cm',
    '120 × 180 cm',
    '180 × 270 cm',
    '240 × 340 cm',
    '150 × 230 cm',
    '170 × 240 cm',
    '200 × 280 cm',
    '130 × 200 cm',
    '220 × 320 cm',
  ];
  const materials = [
    'Kork wool on cotton',
    'Pure wool on cotton',
    'Hand-spun wool',
    'Silk & wool blend',
    'Kork wool on silk',
  ];
  const basePrices: Record<string, number> = {
    kashan: 3800,
    tabriz: 2400,
    qom: 5200,
  };
  const base = basePrices[prefix] ?? 3000;

  return names.map((name, i) => ({
    id: `rug-${prefix}-${i + 1}`,
    name,
    origin: city,
    dimensions: dimensions[i],
    material: materials[i % materials.length],
    priceUsd: base + i * 350 + (i % 3) * 200,
    pattern: PATTERNS[i % PATTERNS.length],
  }));
}

const kashanNames = [
  'Kashan Garden Carpet',
  'Kashan Medallion Rug',
  'Kashan Floral Vase',
  'Kashan Hunting Scene',
  'Kashan Tree of Life',
  'Kashan Shah Abbas',
  'Kashan Prayer Rug',
  'Kashan Boteh Pattern',
  'Kashan Panel Design',
  'Kashan All-Over Boteh',
];

const tabrizNames = [
  'Tabriz Medallion Rug',
  'Tabriz Garden Carpet',
  'Tabriz Geometric Rug',
  'Tabriz Vase Design',
  'Tabriz Hunting Scene',
  'Tabriz Tree of Life',
  'Tabriz Floral Panel',
  'Tabriz Herati Pattern',
  'Tabriz Silk Inlay Rug',
  'Tabriz Pictorial Carpet',
];

const qomNames = [
  'Qom Silk Medallion',
  'Qom Tree of Life',
  'Qom Floral Vase',
  'Qom Garden Carpet',
  'Qom Prayer Rug',
  'Qom Hunting Scene',
  'Qom Shah Abbas',
  'Qom Boteh Design',
  'Qom Geometric Rug',
  'Qom Pictorial Silk',
];

export const RUG_COLLECTIONS: RugCollectionData[] = [
  {
    id: 'kashan-collection',
    name: 'Kashan Collection',
    eyebrow: 'Khorasan Weaving Tradition',
    rugs: buildRugs('kashan', 'Kashan, Isfahan', kashanNames),
  },
  {
    id: 'tabriz-collection',
    name: 'Tabriz Collection',
    eyebrow: 'East Azerbaijan Master Weavers',
    rugs: buildRugs('tabriz', 'Tabriz, East Azerbaijan', tabrizNames),
  },
  {
    id: 'qom-collection',
    name: 'Qom Collection',
    eyebrow: 'Silk Weaving Heritage',
    rugs: buildRugs('qom', 'Qom, Iran', qomNames),
  },
];
