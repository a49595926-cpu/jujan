export type TabloGrade = 'A' | 'B' | 'C';

export interface TabloFarsh {
  id: string;
  name: string;
  size: string;
  grade: TabloGrade;
  priceUsd: number;
  description: string;
  image: string;
  alt: string;
}

export interface TabloCollectionData {
  id: string;
  name: string;
  eyebrow: string;
  tablos: TabloFarsh[];
}

const IMG = {
  rug1: 'https://images.pexels.com/photos/28379961/pexels-photo-28379961.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug2: 'https://images.pexels.com/photos/34887532/pexels-photo-34887532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug3: 'https://images.pexels.com/photos/17113034/pexels-photo-17113034.png?auto=compress&cs=tinysrgb&h=650&w=940',
  rug4: 'https://images.pexels.com/photos/32536660/pexels-photo-32536660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug5: 'https://images.pexels.com/photos/11676365/pexels-photo-11676365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug6: 'https://images.pexels.com/photos/31917723/pexels-photo-31917723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug7: 'https://images.pexels.com/photos/34084601/pexels-photo-34084601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug8: 'https://images.pexels.com/photos/33299495/pexels-photo-33299495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug9: 'https://images.pexels.com/photos/33868697/pexels-photo-33868697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug10: 'https://images.pexels.com/photos/10409984/pexels-photo-10409984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug11: 'https://images.pexels.com/photos/8931783/pexels-photo-8931783.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rug12: 'https://images.pexels.com/photos/33693673/pexels-photo-33693673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const royalTablos: TabloFarsh[] = [
  { id: 'tf-royal-1', name: 'Royal Shah Abbasi Medallion', size: '300 × 200 cm', grade: 'A', priceUsd: 18500, description: 'A museum-grade Tablo Farsh bearing the Shah Abbasi medallion, woven in pure Kork wool with silk inlays.', image: IMG.rug1, alt: 'Royal Shah Abbasi medallion Persian carpet' },
  { id: 'tf-royal-2', name: 'Royal Garden of Paradise', size: '340 × 240 cm', grade: 'A', priceUsd: 22000, description: 'A court-inspired garden carpet depicting cypress trees and flowering shrubs across four quadrants.', image: IMG.rug2, alt: 'Royal garden of paradise Persian carpet' },
  { id: 'tf-royal-3', name: 'Royal Vase Composition', size: '280 × 190 cm', grade: 'A', priceUsd: 16800, description: 'An ornate vase design with cascading blossoms, reserved for the finest royal commissions.', image: IMG.rug3, alt: 'Royal vase composition Persian carpet' },
  { id: 'tf-royal-4', name: 'Royal Hunting Scene', size: '320 × 220 cm', grade: 'A', priceUsd: 24500, description: 'A pictorial hunting scene with mounted riders and prey, a motif once woven for Qajar palaces.', image: IMG.rug4, alt: 'Royal hunting scene Persian carpet' },
  { id: 'tf-royal-5', name: 'Royal Tree of Life', size: '300 × 210 cm', grade: 'A', priceUsd: 19200, description: 'The Tree of Life rendered in luminous natural dyes, symbolising eternal renewal.', image: IMG.rug5, alt: 'Royal tree of life Persian carpet' },
  { id: 'tf-royal-6', name: 'Royal Floral Lattice', size: '260 × 180 cm', grade: 'A', priceUsd: 15400, description: 'A tight floral lattice with saffron and indigo accents, woven at an exceptional 900 KPI.', image: IMG.rug6, alt: 'Royal floral lattice Persian carpet' },
  { id: 'tf-royal-7', name: 'Royal Mihrab Panel', size: '290 × 200 cm', grade: 'A', priceUsd: 17700, description: 'A prayer-niche panel with suspended lamps, a devotional masterpiece of the royal workshop.', image: IMG.rug7, alt: 'Royal mihrab panel Persian carpet' },
];

const signatureTablos: TabloFarsh[] = [
  { id: 'tf-sig-1', name: 'Signature Tabriz Medallion', size: '250 × 170 cm', grade: 'B', priceUsd: 8200, description: 'A balanced Tabriz medallion on a deep ivory field, signed by a master weaver.', image: IMG.rug8, alt: 'Signature Tabriz medallion Persian carpet' },
  { id: 'tf-sig-2', name: 'Signature Herati All-Over', size: '240 × 160 cm', grade: 'B', priceUsd: 7400, description: 'The classic Herati repeat with fish and rosette motifs, refined for contemporary interiors.', image: IMG.rug9, alt: 'Signature Herati all-over Persian carpet' },
  { id: 'tf-sig-3', name: 'Signature Boteh Garden', size: '270 × 180 cm', grade: 'B', priceUsd: 8900, description: 'A flowing boteh (paisley) garden in muted rose and sage, a collector favourite.', image: IMG.rug10, alt: 'Signature boteh garden Persian carpet' },
  { id: 'tf-sig-4', name: 'Signature Geometric Panel', size: '220 × 150 cm', grade: 'B', priceUsd: 6800, description: 'A geometric panel design with stepped polygons, inspired by Caucasian weaving traditions.', image: IMG.rug11, alt: 'Signature geometric panel Persian carpet' },
  { id: 'tf-sig-5', name: 'Signature Floral Vase', size: '260 × 175 cm', grade: 'B', priceUsd: 7900, description: 'A central vase with outward-reaching blooms, woven in hand-spun wool on cotton.', image: IMG.rug12, alt: 'Signature floral vase Persian carpet' },
  { id: 'tf-sig-6', name: 'Signature Mina Khani', size: '250 × 170 cm', grade: 'B', priceUsd: 7600, description: 'The Mina Khani (flower-vine) pattern repeated across the field in harmonious colour.', image: IMG.rug1, alt: 'Signature Mina Khani Persian carpet' },
  { id: 'tf-sig-7', name: 'Signature Pictorial Scene', size: '230 × 160 cm', grade: 'B', priceUsd: 8400, description: 'A small pictorial scene of a Persian garden pavilion, finely knotted in soft wool.', image: IMG.rug2, alt: 'Signature pictorial scene Persian carpet' },
];

const classicTablos: TabloFarsh[] = [
  { id: 'tf-cls-1', name: 'Classic Kashan Medallion', size: '200 × 140 cm', grade: 'C', priceUsd: 3200, description: 'A traditional Kashan medallion in rich crimson, an enduring classic for any interior.', image: IMG.rug3, alt: 'Classic Kashan medallion Persian carpet' },
  { id: 'tf-cls-2', name: 'Classic Afshan Floral', size: '190 × 130 cm', grade: 'C', priceUsd: 2800, description: 'An all-over Afshan floral scatter design, light and versatile for modern homes.', image: IMG.rug4, alt: 'Classic Afshan floral Persian carpet' },
  { id: 'tf-cls-3', name: 'Classic Geometric Tribal', size: '210 × 145 cm', grade: 'C', priceUsd: 3400, description: 'A bold geometric tribal pattern with strong diagonal movement and warm earth tones.', image: IMG.rug5, alt: 'Classic geometric tribal Persian carpet' },
  { id: 'tf-cls-4', name: 'Classic Tree Panel', size: '180 × 120 cm', grade: 'C', priceUsd: 2600, description: 'A compact tree-of-life panel, a timeless motif woven in pure highland wool.', image: IMG.rug6, alt: 'Classic tree panel Persian carpet' },
  { id: 'tf-cls-5', name: 'Classic Prayer Design', size: '200 × 135 cm', grade: 'C', priceUsd: 3000, description: 'A traditional prayer rug design with a graceful mihrab and hanging lamp.', image: IMG.rug7, alt: 'Classic prayer design Persian carpet' },
  { id: 'tf-cls-6', name: 'Classic Herati Border', size: '220 × 150 cm', grade: 'C', priceUsd: 3600, description: 'A Herati field framed by a triple border, a staple of Persian village weaving.', image: IMG.rug8, alt: 'Classic Herati border Persian carpet' },
  { id: 'tf-cls-7', name: 'Classic All-Over Boteh', size: '190 × 130 cm', grade: 'C', priceUsd: 2700, description: 'An all-over boteh pattern in soft blue and gold, a refined everyday heirloom.', image: IMG.rug9, alt: 'Classic all-over boteh Persian carpet' },
];

export const TABLO_COLLECTIONS: TabloCollectionData[] = [
  { id: 'tablo-royal', name: 'Royal Collection', eyebrow: 'Museum-Grade Masterpieces', tablos: royalTablos },
  { id: 'tablo-signature', name: 'Signature Collection', eyebrow: 'Master-Weaver Signed', tablos: signatureTablos },
  { id: 'tablo-classic', name: 'Classic Collection', eyebrow: 'Timeless Persian Heritage', tablos: classicTablos },
];
