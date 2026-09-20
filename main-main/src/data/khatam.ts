export type KhatamType = 'wood' | 'metal' | 'turquoise' | 'copper';

export interface KhatamProduct {
  id: string;
  name: string;
  origin: string;
  material: string;
  technique: string;
  description: string;
  priceUsd: number;
  type: KhatamType;
}

export interface KhatamCollectionData {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  khatams: KhatamProduct[];
}

const woodKhatams: KhatamProduct[] = [
  { id: 'khatam-wood-1', name: 'Isfahan Khatam Box', origin: 'Isfahan, Iran', material: 'Teakwood & camel bone', technique: 'Hand-inlaid geometric stars', description: 'A keepsake box inlaid with a tight starburst of bone, brass, and walnut — a signature of Isfahani masters.', priceUsd: 480, type: 'wood' },
  { id: 'khatam-wood-2', name: 'Royal Pen Holder', origin: 'Isfahan, Iran', material: 'Rosewood & brass wire', technique: 'Six-point star inlay', description: 'A turned rosewood pen holder dressed in a fine mesh of brass triangles and six-point stars.', priceUsd: 360, type: 'wood' },
  { id: 'khatam-wood-3', name: 'Mirror Frame Panel', origin: 'Shiraz, Iran', material: 'Walnut & ebony', technique: 'Diamond lattice inlay', description: 'A wall mirror framed in a diamond lattice of ebony and walnut, each facet polished by hand.', priceUsd: 720, type: 'wood' },
  { id: 'khatam-wood-4', name: 'Backgammon Board', origin: 'Isfahan, Iran', material: 'Sycamore & bone', technique: 'Chevron field inlay', description: 'A folding backgammon board whose field is a chevron of bone and sycamore — a game turned heirloom.', priceUsd: 640, type: 'wood' },
  { id: 'khatam-wood-5', name: 'Khatam Vase Stand', origin: 'Shiraz, Iran', material: 'Poplar & copper', technique: 'Radial star inlay', description: 'A pedestal for a glass vase, ringed with a radial star of copper and pale poplar.', priceUsd: 410, type: 'wood' },
  { id: 'khatam-wood-6', name: 'Jewelry Casket', origin: 'Isfahan, Iran', material: 'Ebony & silver', technique: 'Micro-mosaic inlay', description: 'A small casket of ebony and silver, its lid a micro-mosaic of triangles no wider than a grain of rice.', priceUsd: 590, type: 'wood' },
  { id: 'khatam-wood-7', name: 'Khatam Picture Frame', origin: 'Shiraz, Iran', material: 'Walnut & brass', technique: 'Border band inlay', description: 'A tabletop frame bordered in a continuous band of brass triangles on warm walnut.', priceUsd: 330, type: 'wood' },
];

const metalKhatams: KhatamProduct[] = [
  { id: 'khatam-metal-1', name: 'Brass Khatam Tray', origin: 'Isfahan, Iran', material: 'Hammered brass', technique: 'Etched star pattern', description: 'A round serving tray of hammered brass, etched with an eight-point star field and gilt rim.', priceUsd: 520, type: 'metal' },
  { id: 'khatam-metal-2', name: 'Engraved Vase', origin: 'Shiraz, Iran', material: 'Tinned copper', technique: 'Chased arabesque', description: 'A tall vase of tinned copper chased with a running arabesque of leaves and six-point stars.', priceUsd: 680, type: 'metal' },
  { id: 'khatam-metal-3', name: 'Khatam Candle Stand', origin: 'Isfahan, Iran', material: 'Cast brass', technique: 'Pierced star lattice', description: 'A pair of candle stands whose pierced lattice throws six-point stars of light across the wall.', priceUsd: 460, type: 'metal' },
  { id: 'khatam-metal-4', name: 'Incense Burner', origin: 'Shiraz, Iran', material: 'Bronze & brass', technique: 'Inlaid star band', description: 'A lidded incense burner of bronze banded in brass stars, its pierced crown releasing slow curls of smoke.', priceUsd: 540, type: 'metal' },
  { id: 'khatam-metal-5', name: 'Khatam Bowl Set', origin: 'Isfahan, Iran', material: 'Nickel silver', technique: 'Engine-turned inlay', description: 'A nested set of three bowls in nickel silver, engine-turned with concentric star fields.', priceUsd: 610, type: 'metal' },
  { id: 'khatam-metal-6', name: 'Decorative Panel', origin: 'Shiraz, Iran', material: 'Brass sheet', technique: 'Repoussé star relief', description: 'A wall panel of brass sheet raised in repoussé, a relief of stars and arabesques catching the light.', priceUsd: 780, type: 'metal' },
  { id: 'khatam-metal-7', name: 'Khatam Pen Case', origin: 'Isfahan, Iran', material: 'Brass & enamel', technique: 'Cloisonné star inlay', description: 'A slim pen case of brass with cloisonné cells of crimson and cobalt tracing a field of tiny stars.', priceUsd: 490, type: 'metal' },
];

const turquoiseKhatams: KhatamProduct[] = [
  { id: 'khatam-turq-1', name: 'Turquoise Vase', origin: 'Isfahan, Iran', material: 'Copper & Neyshabur turquoise', technique: 'Firouzeh-kubi inlay', description: 'A copper vase set with hand-cut Neyshabur turquoise in a tight mosaic — the celebrated firouzeh-kubi craft.', priceUsd: 980, type: 'turquoise' },
  { id: 'khatam-turq-2', name: 'Turquoise Bowl', origin: 'Isfahan, Iran', material: 'Hammered copper & turquoise', technique: 'Mosaic stone inlay', description: 'A shallow bowl whose rim is paved in turquoise cabochons, each stone selected for even blue.', priceUsd: 760, type: 'turquoise' },
  { id: 'khatam-turq-3', name: 'Turquoise Mirror Frame', origin: 'Isfahan, Iran', material: 'Copper & turquoise', technique: 'Continuous stone inlay', description: 'A mirror frame wrapped in a continuous ribbon of turquoise, the copper ground peeking between stones.', priceUsd: 1120, type: 'turquoise' },
  { id: 'khatam-turq-4', name: 'Turquoise Jewelry Box', origin: 'Isfahan, Iran', material: 'Brass & turquoise', technique: 'Recessed stone inlay', description: 'A hinged box of brass with a recessed lid paved in turquoise — a jewel of a container.', priceUsd: 860, type: 'turquoise' },
  { id: 'khatam-turq-5', name: 'Turquoise Pendant Plate', origin: 'Isfahan, Iran', material: 'Copper & turquoise', technique: 'Radiant stone inlay', description: 'A wall plate set with a radiant sun of turquoise, the stones graduating from deep to sky blue.', priceUsd: 1040, type: 'turquoise' },
  { id: 'khatam-turq-6', name: 'Turquoise Cup Set', origin: 'Isfahan, Iran', material: 'Copper & turquoise', technique: 'Banded stone inlay', description: 'A pair of cups banded in turquoise at rim and foot, polished to a soft sheen for display.', priceUsd: 920, type: 'turquoise' },
  { id: 'khatam-turq-7', name: 'Turquoise Candleholder', origin: 'Isfahan, Iran', material: 'Brass & turquoise', technique: 'Spire stone inlay', description: 'A slim candleholder whose spire is encrusted with turquoise, glowing against candlelight.', priceUsd: 690, type: 'turquoise' },
];

const copperKhatams: KhatamProduct[] = [
  { id: 'khatam-copper-1', name: 'Engraved Copper Tray', origin: 'Isfahan, Iran', material: 'Hammered copper', technique: 'Hand-engraved tezhip', description: 'A wide tray of hammered copper engraved with tezhip scrollwork and a central eight-point star.', priceUsd: 420, type: 'copper' },
  { id: 'khatam-copper-2', name: 'Copper Samovar', origin: 'Isfahan, Iran', material: 'Tinned copper', technique: 'Chased floral relief', description: 'A tinned copper samovar chased with floral relief along body and spout — a functional sculpture.', priceUsd: 1280, type: 'copper' },
  { id: 'khatam-copper-3', name: 'Copper Pitcher', origin: 'Shiraz, Iran', material: 'Pure copper', technique: 'Hammered dimple finish', description: 'A pitcher of pure copper finished in a hand-hammered dimple pattern that catches every light.', priceUsd: 540, type: 'copper' },
  { id: 'khatam-copper-4', name: 'Copper Wall Sconce', origin: 'Isfahan, Iran', material: 'Brass-lined copper', technique: 'Pierced arabesque', description: 'A pierced wall sconce of copper lined in brass, casting arabesque shadows when lit.', priceUsd: 480, type: 'copper' },
  { id: 'khatam-copper-5', name: 'Copper Bowl Set', origin: 'Shiraz, Iran', material: 'Copper & tin lining', technique: 'Engine-turned engraving', description: 'A nested set of three bowls engine-turned with concentric guilloche and a tin-lined interior.', priceUsd: 590, type: 'copper' },
  { id: 'khatam-copper-6', name: 'Copper Sugar Pot', origin: 'Isfahan, Iran', material: 'Copper & brass', technique: 'Bimetal engraving', description: 'A lidded sugar pot of copper with a brass finial, the body engraved with a running vine.', priceUsd: 380, type: 'copper' },
  { id: 'khatam-copper-7', name: 'Copper Hanging Lantern', origin: 'Isfahan, Iran', material: 'Copper & glass', technique: 'Pierced star lattice', description: 'A hanging lantern of pierced copper around amber glass, throwing a field of stars across the room.', priceUsd: 760, type: 'copper' },
];

export const KHATAM_COLLECTIONS: KhatamCollectionData[] = [
  { id: 'khatam-wood', name: 'Wood Khatam', eyebrow: 'Traditional Inlay on Fine Wood', description: 'Traditional Persian Khatamkari crafted on fine wood surfaces.', khatams: woodKhatams },
  { id: 'khatam-metal', name: 'Metal Khatam', eyebrow: 'Inlay on Decorative Metal', description: 'Intricate Khatam patterns applied to metal and decorative objects.', khatams: metalKhatams },
  { id: 'khatam-turquoise', name: 'Turquoise Inlay', eyebrow: 'Firouzeh-kubi Masterpieces', description: 'Persian copper masterpieces decorated with natural turquoise stones.', khatams: turquoiseKhatams },
  { id: 'khatam-copper', name: 'Copper Masterpieces', eyebrow: 'Handcrafted Engraved Copper', description: 'Handcrafted Persian copper art with engraved and detailed metalwork.', khatams: copperKhatams },
];
