export type MinaType = 'plates' | 'vases' | 'artwork' | 'royal';

export interface MinaProduct {
  id: string;
  name: string;
  origin: string;
  material: string;
  technique: string;
  description: string;
  priceUsd: number;
  type: MinaType;
}

export interface MinaCollectionData {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  minas: MinaProduct[];
}

const plates: MinaProduct[] = [
  { id: 'mina-plate-1', name: 'Isfahan Mina Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A round copper plate glazed in cobalt and hand-painted with a central Shah Abbasi medallion.', priceUsd: 320, type: 'plates' },
  { id: 'mina-plate-2', name: 'Floral Mina Dish', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A shallow dish blooming with a ring of persian flowers in saffron and crimson enamel.', priceUsd: 280, type: 'plates' },
  { id: 'mina-plate-3', name: 'Bird & Boteh Plate', origin: 'Isfahan, Iran', material: 'Brass & enamel', technique: 'Hand-painted minakari', description: 'A brass plate traced with a boteh field and a pair of perched nightingales in enamel.', priceUsd: 360, type: 'plates' },
  { id: 'mina-plate-4', name: 'Garden of Paradise Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A wide plate depicting a walled paradise garden of cypress and flowering vines.', priceUsd: 440, type: 'plates' },
  { id: 'mina-plate-5', name: 'Hunting Scene Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A pictorial plate of a royal hunting scene, each figure painted in fine enamel lines.', priceUsd: 520, type: 'plates' },
  { id: 'mina-plate-6', name: 'Mihrab Mina Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A plate centred on a mihrab arch with a suspended lamp, glazed in deep blue.', priceUsd: 380, type: 'plates' },
  { id: 'mina-plate-7', name: 'Geometric Star Plate', origin: 'Isfahan, Iran', material: 'Brass & enamel', technique: 'Hand-painted minakari', description: 'A plate of interlocking eight-point stars in turquoise and gold enamel on brass.', priceUsd: 300, type: 'plates' },
  { id: 'mina-plate-8', name: 'Shah Abbas Medallion Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A classic Shah Abbasi medallion plate framed by a tight floral border.', priceUsd: 460, type: 'plates' },
  { id: 'mina-plate-9', name: 'Calligraphy Mina Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A plate banded in nastaliq calligraphy, the enamel glaze catching every stroke.', priceUsd: 500, type: 'plates' },
  { id: 'mina-plate-10', name: 'Tree of Life Plate', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A plate bearing a tree of life, its branches filled with songbirds and blossoms.', priceUsd: 540, type: 'plates' },
];

const vases: MinaProduct[] = [
  { id: 'mina-vase-1', name: 'Cobalt Mina Vase', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A tall neck vase glazed in deep cobalt and wreathed in enamel arabesques.', priceUsd: 620, type: 'vases' },
  { id: 'mina-vase-2', name: 'Bouquet Mina Ewer', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A luted ewer whose body holds a continuous bouquet of persian roses in enamel.', priceUsd: 740, type: 'vases' },
  { id: 'mina-vase-3', name: 'Lattice Mina Vase', origin: 'Isfahan, Iran', material: 'Brass & enamel', technique: 'Hand-painted minakari', description: 'A brass vase painted with a turquoise lattice and gold flower heads.', priceUsd: 580, type: 'vases' },
  { id: 'mina-vase-4', name: 'Bird Vessel', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A globular vessel painted with a flock of nightingales among flowering branches.', priceUsd: 690, type: 'vases' },
  { id: 'mina-vase-5', name: 'Lidded Mina Jar', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A lidded jar of copper glazed in saffron and crowned with an enamel finial.', priceUsd: 760, type: 'vases' },
  { id: 'mina-vase-6', name: 'Tall Minai Flute', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A slender flute vase banded in calligraphy and floral meanders in enamel.', priceUsd: 820, type: 'vases' },
  { id: 'mina-vase-7', name: 'Gourd Mina Vessel', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A rounded gourd vessel painted with a paradise garden in cobalt and gold.', priceUsd: 640, type: 'vases' },
  { id: 'mina-vase-8', name: 'Twin-Handled Mina Vase', origin: 'Isfahan, Iran', material: 'Brass & enamel', technique: 'Kiln-fired enamel', description: 'A twin-handled vase of brass with enamel scrollwork climbing its handles.', priceUsd: 700, type: 'vases' },
  { id: 'mina-vase-9', name: 'Mina Pitcher', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A pouring pitcher glazed in turquoise and traced with a running vine in gold.', priceUsd: 660, type: 'vases' },
  { id: 'mina-vase-10', name: 'Boteh Mina Vase', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A vase scattered with boteh motifs in crimson and saffron over a blue ground.', priceUsd: 720, type: 'vases' },
];

const artwork: MinaProduct[] = [
  { id: 'mina-art-1', name: 'Paradise Garden Panel', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A wall panel depicting a paradise garden of cypress, roses, and a central fountain.', priceUsd: 980, type: 'artwork' },
  { id: 'mina-art-2', name: 'Royal Banquet Scene', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A collectible plaque of a royal banquet, each figure painted in fine enamel lines.', priceUsd: 1240, type: 'artwork' },
  { id: 'mina-art-3', name: 'Calligraphy Plaque', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A rectangular plaque centred on a nastaliq couplet framed in enamel arabesque.', priceUsd: 860, type: 'artwork' },
  { id: 'mina-art-4', name: 'Bird & Blossom Tile', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A square tile of a nightingale perched among blossoms, glazed in cobalt.', priceUsd: 740, type: 'artwork' },
  { id: 'mina-art-5', name: 'Hunting Scene Panel', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A panel of mounted riders in pursuit, the enamel palette drawn from nature.', priceUsd: 1180, type: 'artwork' },
  { id: 'mina-art-6', name: 'Medallion Mina Art', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A circular medallion artwork centred on a Shah Abbasi star in enamel.', priceUsd: 920, type: 'artwork' },
  { id: 'mina-art-7', name: 'Tree of Life Plaque', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Hand-painted minakari', description: 'A vertical plaque of the tree of life, its branches alive with enamel songbirds.', priceUsd: 1040, type: 'artwork' },
  { id: 'mina-art-8', name: 'Floral Mina Canvas', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A copper canvas filled with a continuous field of persian flowers in enamel.', priceUsd: 880, type: 'artwork' },
  { id: 'mina-art-9', name: 'Geometric Mina Panel', origin: 'Isfahan, Iran', material: 'Brass & enamel', technique: 'Hand-painted minakari', description: 'A panel of interlocking stars in turquoise and gold enamel over a brass ground.', priceUsd: 780, type: 'artwork' },
  { id: 'mina-art-10', name: 'Mihrab Mina Art', origin: 'Isfahan, Iran', material: 'Copper & enamel', technique: 'Kiln-fired enamel', description: 'A mihrab-form artwork with a hanging lamp, glazed in deep blue and gold.', priceUsd: 960, type: 'artwork' },
];

const royal: MinaProduct[] = [
  { id: 'mina-royal-1', name: 'Royal Mina Vase', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A museum-grade vase of pure copper painted with 24k gold enamel arabesques by a master.', priceUsd: 3200, type: 'royal' },
  { id: 'mina-royal-2', name: 'Royal Garden Plate', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A grand plate depicting a royal paradise garden in gold and cobalt enamel.', priceUsd: 2800, type: 'royal' },
  { id: 'mina-royal-3', name: 'Royal Hunting Panel', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A large panel of a royal hunt, each figure detailed in gold enamel over cobalt.', priceUsd: 4200, type: 'royal' },
  { id: 'mina-royal-4', name: 'Royal Calligraphy Plaque', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A plaque centred on a royal couplet in gold nastaliq, framed in enamel scrollwork.', priceUsd: 3600, type: 'royal' },
  { id: 'mina-royal-5', name: 'Royal Lidded Ewer', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A lidded ewer painted with a continuous royal procession in gold enamel.', priceUsd: 4800, type: 'royal' },
  { id: 'mina-royal-6', name: 'Royal Bird Vessel', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A globular vessel of nightingales and peonies, the enamel enriched with gold.', priceUsd: 3400, type: 'royal' },
  { id: 'mina-royal-7', name: 'Royal Mihrab Panel', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A mihrab panel with a hanging lamp and gold enamel arabesque, a devotional masterpiece.', priceUsd: 3900, type: 'royal' },
  { id: 'mina-royal-8', name: 'Royal Tree of Life', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A vertical panel of the tree of life, its birds and blossoms traced in gold enamel.', priceUsd: 4400, type: 'royal' },
  { id: 'mina-royal-9', name: 'Royal Floral Lattice', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A lattice of royal flowers in gold and crimson enamel over a deep cobalt ground.', priceUsd: 3100, type: 'royal' },
  { id: 'mina-royal-10', name: 'Royal Banquet Plaque', origin: 'Isfahan, Iran', material: 'Pure copper & 24k gold enamel', technique: 'Master minakari', description: 'A large plaque of a royal banquet, every dish and garment detailed in gold enamel.', priceUsd: 5200, type: 'royal' },
];

export const MINA_COLLECTIONS: MinaCollectionData[] = [
  { id: 'mina-plates', name: 'Mina Plates', eyebrow: 'Enamel on Copper Plates', description: 'Traditional Persian enamel plates featuring intricate patterns and handcrafted artwork.', minas: plates },
  { id: 'mina-vases', name: 'Mina Vases & Vessels', eyebrow: 'Enamel Vessels', description: 'Elegant enamel vases and decorative vessels crafted by Persian artisans.', minas: vases },
  { id: 'mina-artwork', name: 'Mina Artwork', eyebrow: 'Collectible Enamel Art', description: 'Unique enamel paintings and collectible decorative artworks.', minas: artwork },
  { id: 'mina-royal', name: 'Royal Mina Collection', eyebrow: 'Premium Masterpieces', description: 'Exclusive and premium enamel masterpieces with exceptional craftsmanship.', minas: royal },
];
