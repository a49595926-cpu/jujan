import { useId } from 'react';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
  className?: string;
}

/**
 * Hand-crafted SVG illustrations for each product. Saffron art is derived
 * from the product's grade + weight so every packaging size gets a fitting
 * visual; rugs use an explicit map. Gives the store a cohesive, premium look
 * without external image deps.
 */
export function ProductArt({ product, className }: Props) {
  const art =
    product.category === 'saffron'
      ? renderSaffron(product)
      : product.category === 'confectionery'
        ? renderGaz(product)
        : RUG_ART[product.id] ?? <DefaultArt />;
  return (
    <div className={className} aria-hidden="true">
      {art}
    </div>
  );
}

const RUG_ART: Record<string, React.ReactNode> = {
  'rug-tabriz-140x200': <RugArt pattern="medallion" />,
  'rug-kashan-200x300': <RugArt pattern="garden" />,
  'rug-qashqai-120x180': <RugArt pattern="tribal" />,
};

function DefaultArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <rect width="400" height="300" fill="#1f1710" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Saffron art — themed by grade, shaped by packaging size.
// ---------------------------------------------------------------------------

type SaffronTypeKey = 'super-negin' | 'sargol' | 'negin' | 'pushal' | 'dast';

interface SaffronTheme {
  lid: string;
  lidDark: string;
  thread: string;
  threadAlt: string;
  label: string;
}

const SAFFRON_THEMES: Record<SaffronTypeKey, SaffronTheme> = {
  'super-negin': { lid: '#7a1410', lidDark: '#4a0a08', thread: '#a8281f', threadAlt: '#f5d27a', label: 'SUPER NEGIN' },
  sargol: { lid: '#c9352f', lidDark: '#7a1f18', thread: '#c9352f', threadAlt: '#c9352f', label: 'SARGOL' },
  negin: { lid: '#8a1f18', lidDark: '#5a1410', thread: '#a8281f', threadAlt: '#c9352f', label: 'NEGIN' },
  pushal: { lid: '#b8651a', lidDark: '#7a4a1f', thread: '#c9352f', threadAlt: '#e8a838', label: 'PUSHAL' },
  dast: { lid: '#6a4520', lidDark: '#4a2e15', thread: '#c9352f', threadAlt: '#d4b05a', label: 'DAST' },
};

function renderSaffron(product: Product): React.ReactNode {
  const parts = product.id.split('-');
  const typeKey = (parts.slice(1, -1).join('-') || 'sargol') as SaffronTypeKey;
  const grams = parseInt(product.weight ?? '5', 10);
  return <SaffronPack typeKey={typeKey} grams={grams} />;
}

// ---------------------------------------------------------------------------
// Persian Confectionery (Gaz) art — themed by product, shaped by packaging.
// ---------------------------------------------------------------------------

type GazVariant = 'classic' | 'rich' | 'premium';

interface GazTheme {
  box: string;
  boxDark: string;
  pistachio: string;
  pistachioLight: string;
  nougat: string;
  ribbon: string;
}

const GAZ_THEMES: Record<GazVariant, GazTheme> = {
  classic: {
    box: '#b8651a',
    boxDark: '#7a4a1f',
    pistachio: '#7ba14a',
    pistachioLight: '#a8c96a',
    nougat: '#f0e4c4',
    ribbon: '#c9352f',
  },
  rich: {
    box: '#8a2820',
    boxDark: '#5a1610',
    pistachio: '#7ba14a',
    pistachioLight: '#a8c96a',
    nougat: '#e8d8b0',
    ribbon: '#e8a838',
  },
  premium: {
    box: '#2a1f14',
    boxDark: '#15100a',
    pistachio: '#7ba14a',
    pistachioLight: '#a8c96a',
    nougat: '#f5ecdc',
    ribbon: '#e8a838',
  },
};

function renderGaz(product: Product): React.ReactNode {
  const variant: GazVariant =
    product.id === 'gaz-premium-giftbox-900g'
      ? 'premium'
      : product.id === 'gaz-50pistachio-500g'
        ? 'rich'
        : 'classic';
  const grams = parseInt(product.weight ?? '300', 10);
  return <GazArt variant={variant} grams={grams} />;
}

function GazArt({ variant, grams }: { variant: GazVariant; grams: number }) {
  const rawId = useId().replace(/:/g, '');
  const theme = GAZ_THEMES[variant];
  const bgId = `${rawId}-g-bg`;
  const boxId = `${rawId}-g-box`;

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id={bgId} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#15100a" />
        </radialGradient>
        <linearGradient id={boxId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.box} />
          <stop offset="100%" stopColor={theme.boxDark} />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${bgId})`} />

      {variant === 'premium' ? (
        <GazGiftBox theme={theme} boxId={boxId} grams={grams} />
      ) : (
        <GazBox theme={theme} boxId={boxId} grams={grams} />
      )}
    </svg>
  );
}

function Pistachios({
  cx,
  cy,
  count,
  spread,
  color,
  light,
}: {
  cx: number;
  cy: number;
  count: number;
  spread: number;
  color: string;
  light: string;
}) {
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const r = spread * (0.6 + (i % 3) * 0.18);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.6;
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="5" ry="3.5" fill={i % 2 === 0 ? color : light} opacity="0.92" />
            <line x1={x - 1} y1={y} x2={x + 1} y2={y} stroke="#3d5a22" strokeWidth="0.5" opacity="0.6" />
          </g>
        );
      })}
    </g>
  );
}

function GazBox({
  theme,
  boxId,
  grams,
}: {
  theme: GazTheme;
  boxId: string;
  grams: number;
}) {
  return (
    <g transform="translate(200 158)">
      <ellipse cx="0" cy="74" rx="104" ry="12" fill="#000" opacity="0.45" />
      {/* box body */}
      <rect x="-96" y="-52" width="192" height="124" rx="8" fill={`url(#${boxId})`} stroke="#e8a838" strokeWidth="1.5" />
      {/* lid band */}
      <rect x="-96" y="-52" width="192" height="26" rx="8" fill="#000" opacity="0.18" />
      {/* nougat window */}
      <rect x="-72" y="-20" width="144" height="62" rx="6" fill={theme.nougat} opacity="0.92" />
      {/* nougat squares */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = -66 + (i % 4) * 36;
        const y = -14 + Math.floor(i / 4) * 30;
        return (
          <g key={i}>
            <rect x={x} y={y} width="30" height="24" rx="2" fill={theme.nougat} stroke="#d4c194" strokeWidth="0.6" />
            <Pistachios cx={x + 15} cy={y + 12} count={4} spread={6} color={theme.pistachio} light={theme.pistachioLight} />
          </g>
        );
      })}
      {/* ribbon */}
      <rect x="-96" y="6" width="192" height="8" fill={theme.ribbon} opacity="0.9" />
      {/* label */}
      <text x="0" y="-34" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#f5d27a" fontWeight="600">
        GAZ
      </text>
      <text x="0" y="-18" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#c9b894" letterSpacing="2">
        PERSIAN TREASURES
      </text>
      <text x="0" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#e8a838" letterSpacing="1">
        {grams}g
      </text>
    </g>
  );
}

function GazGiftBox({
  theme,
  boxId,
  grams,
}: {
  theme: GazTheme;
  boxId: string;
  grams: number;
}) {
  return (
    <g transform="translate(200 156)">
      <ellipse cx="0" cy="78" rx="118" ry="12" fill="#000" opacity="0.45" />
      {/* box */}
      <rect x="-108" y="-58" width="216" height="134" rx="10" fill={`url(#${boxId})`} stroke="#e8a838" strokeWidth="1.8" />
      {/* inner panel */}
      <rect x="-96" y="-46" width="192" height="110" rx="6" fill="none" stroke="#e8a838" strokeWidth="1" opacity="0.6" />
      {/* gold ribbon vertical + horizontal + bow */}
      <rect x="-8" y="-58" width="16" height="134" fill={theme.ribbon} opacity="0.85" />
      <rect x="-108" y="-6" width="216" height="12" fill={theme.ribbon} opacity="0.85" />
      <g transform="translate(0 -6)">
        <path d="M-18 -10 C -26 -18 -22 0 -10 -2 Z" fill={theme.ribbon} />
        <path d="M18 -10 C 26 -18 22 0 10 -2 Z" fill={theme.ribbon} />
        <circle cx="0" cy="-4" r="5" fill={theme.ribbon} />
      </g>
      {/* nougat medallion */}
      <circle cx="0" cy="32" r="24" fill={theme.nougat} opacity="0.9" />
      <Pistachios cx={0} cy={32} count={7} spread={10} color={theme.pistachio} light={theme.pistachioLight} />
      {/* corner pistachio clusters */}
      <Pistachios cx={-78} cy={-30} count={4} spread={8} color={theme.pistachio} light={theme.pistachioLight} />
      <Pistachios cx={78} cy={-30} count={4} spread={8} color={theme.pistachio} light={theme.pistachioLight} />
      <Pistachios cx={-78} cy={66} count={4} spread={8} color={theme.pistachio} light={theme.pistachioLight} />
      <Pistachios cx={78} cy={66} count={4} spread={8} color={theme.pistachio} light={theme.pistachioLight} />
      {/* label */}
      <text x="0" y="14" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#e8a838" fontWeight="700">
        PREMIUM
      </text>
      <text x="0" y="52" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#c9b894" letterSpacing="2">
        GAZ ASSORTMENT
      </text>
    </g>
  );
}

function SaffronPack({ typeKey, grams }: { typeKey: SaffronTypeKey; grams: number }) {
  const rawId = useId().replace(/:/g, '');
  const theme = SAFFRON_THEMES[typeKey] ?? SAFFRON_THEMES.sargol;
  const shape: 'tin' | 'jar' | 'canister' | 'box' =
    grams >= 100 ? 'box' : grams >= 50 ? 'canister' : grams >= 10 ? 'jar' : 'tin';

  const bgId = `${rawId}-bg`;
  const bodyId = `${rawId}-body`;
  const lidId = `${rawId}-lid`;

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <radialGradient id={bgId} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#15100a" />
        </radialGradient>
        <linearGradient id={bodyId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1f14" />
          <stop offset="50%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#1f1710" />
        </linearGradient>
        <linearGradient id={lidId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.lid} />
          <stop offset="100%" stopColor={theme.lidDark} />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${bgId})`} />
      <ScatteredThreads thread={theme.thread} threadAlt={theme.threadAlt} />

      {shape === 'tin' && <Tin theme={theme} bodyId={bodyId} lidId={lidId} grams={grams} />}
      {shape === 'jar' && <Jar theme={theme} lidId={lidId} grams={grams} />}
      {shape === 'canister' && <Canister theme={theme} bodyId={bodyId} lidId={lidId} grams={grams} />}
      {shape === 'box' && <Box theme={theme} bodyId={bodyId} lidId={lidId} grams={grams} />}
    </svg>
  );
}

function ScatteredThreads({ thread, threadAlt }: { thread: string; threadAlt: string }) {
  return (
    <g>
      {Array.from({ length: 26 }).map((_, i) => {
        const x = (i * 37) % 380 + 10;
        const y = (i * 53) % 250 + 25;
        const r = (i % 3) - 1;
        const c = i % 5 === 0 ? threadAlt : thread;
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + 6 + r}
            y2={y + 24 + r * 2}
            stroke={c}
            strokeWidth="1.4"
            opacity={0.16 + (i % 4) * 0.05}
          />
        );
      })}
    </g>
  );
}

function Emblem({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f5d27a" strokeWidth="1.3" />
      <path
        d={`M${cx} ${cy - r - 4}c-2 4 -2 8 0 12c2 -4 2 -8 0 -12z`}
        fill="#f5d27a"
      />
    </>
  );
}

function Tin({
  theme,
  bodyId,
  lidId,
  grams,
}: {
  theme: SaffronTheme;
  bodyId: string;
  lidId: string;
  grams: number;
}) {
  return (
    <g transform="translate(200 165)">
      <ellipse cx="0" cy="62" rx="92" ry="12" fill="#000" opacity="0.45" />
      <rect x="-82" y="-46" width="164" height="104" rx="9" fill={`url(#${bodyId})`} stroke="#e8a838" strokeWidth="1.5" />
      <rect x="-82" y="-46" width="164" height="30" rx="9" fill={`url(#${lidId})`} />
      <rect x="-82" y="-22" width="164" height="8" fill="#000" opacity="0.22" />
      <Emblem cx={0} cy={-31} r={10} />
      <text x="0" y="20" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fill="#f5d27a" fontWeight="600">
        {theme.label}
      </text>
      <text x="0" y="40" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#c9b894" letterSpacing="2.5">
        PERSIAN TREASURES
      </text>
      <text x="0" y="54" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#e8a838" letterSpacing="1">
        {grams}g
      </text>
    </g>
  );
}

function Jar({ theme, lidId, grams }: { theme: SaffronTheme; lidId: string; grams: number }) {
  return (
    <g transform="translate(200 162)">
      <ellipse cx="0" cy="68" rx="74" ry="11" fill="#000" opacity="0.45" />
      <rect x="-56" y="-40" width="112" height="108" rx="16" fill="#1a130c" stroke="#e8a838" strokeWidth="1.5" />
      <rect x="-22" y="-54" width="44" height="14" rx="2" fill={theme.lidDark} />
      <rect x="-30" y="-66" width="60" height="16" rx="4" fill={`url(#${lidId})`} stroke="#e8a838" strokeWidth="1" />
      {/* saffron pile inside */}
      <path d="M-48 6 Q -24 22 0 16 Q 24 22 48 6 L 48 60 Q 24 66 0 62 Q -24 66 -48 60 Z" fill={theme.thread} opacity="0.72" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = -42 + i * 10.5;
        return (
          <line key={i} x1={x} y1={2} x2={x + 2} y2={28} stroke={i % 3 === 0 ? theme.threadAlt : theme.thread} strokeWidth="1.2" opacity="0.85" />
        );
      })}
      <line x1="-44" y1="-30" x2="-44" y2="30" stroke="#fff7e6" strokeWidth="2" opacity="0.1" />
      <text x="0" y="-18" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="16" fill="#f5d27a" fontWeight="600">
        {theme.label}
      </text>
      <text x="0" y="-4" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#c9b894" letterSpacing="2.5">
        PERSIAN TREASURES · {grams}g
      </text>
    </g>
  );
}

function Canister({
  theme,
  bodyId,
  lidId,
  grams,
}: {
  theme: SaffronTheme;
  bodyId: string;
  lidId: string;
  grams: number;
}) {
  return (
    <g transform="translate(200 160)">
      <ellipse cx="0" cy="80" rx="72" ry="11" fill="#000" opacity="0.45" />
      <rect x="-62" y="-68" width="124" height="146" rx="14" fill={`url(#${bodyId})`} stroke="#e8a838" strokeWidth="1.5" />
      <rect x="-62" y="-68" width="124" height="28" rx="14" fill={`url(#${lidId})`} />
      <rect x="-62" y="-44" width="124" height="6" fill="#000" opacity="0.22" />
      <line x1="-62" y1="14" x2="62" y2="14" stroke="#e8a838" strokeWidth="0.8" opacity="0.5" />
      <Emblem cx={0} cy={-54} r={9} />
      <text x="0" y="40" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="#f5d27a" fontWeight="600">
        {theme.label}
      </text>
      <text x="0" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#c9b894" letterSpacing="2.5">
        PERSIAN TREASURES
      </text>
      <text x="0" y="72" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#e8a838" letterSpacing="1">
        {grams}g
      </text>
    </g>
  );
}

function Box({
  theme,
  bodyId,
  lidId,
  grams,
}: {
  theme: SaffronTheme;
  bodyId: string;
  lidId: string;
  grams: number;
}) {
  return (
    <g transform="translate(200 158)">
      <ellipse cx="0" cy="76" rx="112" ry="12" fill="#000" opacity="0.45" />
      <rect x="-104" y="-44" width="208" height="118" rx="8" fill={`url(#${bodyId})`} stroke="#e8a838" strokeWidth="1.5" />
      <rect x="-108" y="-60" width="216" height="22" rx="6" fill={`url(#${lidId})`} stroke="#e8a838" strokeWidth="1" />
      <line x1="-108" y1="-38" x2="108" y2="-38" stroke="#000" opacity="0.25" strokeWidth="2" />
      <circle cx="0" cy="-38" r="6" fill="#f5d27a" />
      <rect x="-96" y="-26" width="192" height="94" rx="4" fill="none" stroke="#e8a838" strokeWidth="0.8" opacity="0.5" />
      <circle cx="0" cy="6" r="16" fill="none" stroke="#f5d27a" strokeWidth="1.3" opacity="0.6" />
      <path d="M0 -6c-3 6 -3 12 0 18c3 -6 3 -12 0 -18z" fill="#f5d27a" />
      <text x="0" y="42" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="#f5d27a" fontWeight="600">
        {theme.label}
      </text>
      <text x="0" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#c9b894" letterSpacing="2.5">
        PERSIAN TREASURES · {grams}g
      </text>
    </g>
  );
}

// ---------------------------------------------------------------------------
// Rug art — unchanged.
// ---------------------------------------------------------------------------

function RugArt({ pattern }: { pattern: 'medallion' | 'garden' | 'tribal' }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <linearGradient id="rugBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1f14" />
          <stop offset="100%" stopColor="#15100a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#rugBg)" />
      <g transform="translate(200 150)">
        <ellipse cx="0" cy="78" rx="150" ry="12" fill="#000" opacity="0.4" />
        {pattern === 'medallion' && <MedallionRug />}
        {pattern === 'garden' && <GardenRug />}
        {pattern === 'tribal' && <TribalRug />}
      </g>
    </svg>
  );
}

const RUG_W = 280;
const RUG_H = 170;

function RugFrame({ field, border }: { field: string; border: string }) {
  return (
    <>
      <rect x={-RUG_W / 2} y={-RUG_H / 2} width={RUG_W} height={RUG_H} rx="4" fill={border} />
      <rect x={-RUG_W / 2 + 10} y={-RUG_H / 2 + 10} width={RUG_W - 20} height={RUG_H - 20} rx="2" fill={field} />
      {/* fringe */}
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={`ft-${i}`}
          x1={-RUG_W / 2 + 6 + i * 9.7}
          y1={RUG_H / 2}
          x2={-RUG_W / 2 + 6 + i * 9.7}
          y2={RUG_H / 2 + 8}
          stroke="#e8dcc4"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={`fb-${i}`}
          x1={-RUG_W / 2 + 6 + i * 9.7}
          y1={-RUG_H / 2}
          x2={-RUG_W / 2 + 6 + i * 9.7}
          y2={-RUG_H / 2 - 8}
          stroke="#e8dcc4"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function MedallionRug() {
  return (
    <g>
      <RugFrame field="#5a1a16" border="#3d2410" />
      {/* border pattern */}
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={-RUG_W / 2 + 18 + i * 16} cy={-RUG_H / 2 + 18} r="2" fill="#e8a838" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={-RUG_W / 2 + 18 + i * 16} cy={RUG_H / 2 - 18} r="2" fill="#e8a838" />
      ))}
      {/* corner arabesques */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sy) => (
          <path
            key={`${sx}-${sy}`}
            d={`M ${sx * 30} ${sy * 30} q ${sx * 20} 0 ${sx * 30} ${-sy * 14} q ${-sx * 14} ${-sy * 10} ${-sx * 26} ${-sy * 4}`}
            fill="none"
            stroke="#e8a838"
            strokeWidth="1"
            opacity="0.6"
          />
        ))
      )}
      {/* central medallion */}
      <g stroke="#f5d27a" strokeWidth="1.4" fill="none">
        <path d="M0 -55 C 30 -40 40 -10 0 0 C -40 -10 -30 -40 0 -55 Z" fill="#c9352f" fillOpacity="0.5" />
        <path d="M0 55 C 30 40 40 10 0 0 C -40 10 -30 40 0 55 Z" fill="#c9352f" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="12" fill="#e8a838" fillOpacity="0.25" />
        <circle cx="0" cy="0" r="5" fill="#f5d27a" />
      </g>
    </g>
  );
}

function GardenRug() {
  return (
    <g>
      <RugFrame field="#1f3d24" border="#3d2410" />
      {/* garden grid */}
      {[-1, 0, 1].map((cx) =>
        [-1, 0, 1].map((cy) => (
          <rect
            key={`${cx}-${cy}`}
            x={cx * 40 - 18}
            y={cy * 40 - 18}
            width="36"
            height="36"
            rx="2"
            fill="none"
            stroke="#e8a838"
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))
      )}
      {/* trees */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sy) => (
          <g key={`${sx}-${sy}`} transform={`translate(${sx * 80} ${sy * 50})`}>
            <path d="M0 14 L -6 -10 L 0 -16 L 6 -10 Z" fill="#2db39a" opacity="0.7" />
            <line x1="0" y1="14" x2="0" y2="20" stroke="#5a3e26" strokeWidth="1.5" />
          </g>
        ))
      )}
      {/* central fountain */}
      <circle cx="0" cy="0" r="10" fill="#f5d27a" opacity="0.3" />
      <circle cx="0" cy="0" r="6" fill="#f5d27a" opacity="0.5" />
      <circle cx="0" cy="0" r="2.5" fill="#fff7e6" />
      {/* flowers */}
      {[-60, -20, 20, 60].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 56 : -56} r="3" fill="#c9352f" />
      ))}
    </g>
  );
}

function TribalRug() {
  return (
    <g>
      <RugFrame field="#3d2410" border="#2a1f14" />
      {/* diamond row */}
      {[-80, -40, 0, 40, 80].map((x, i) => (
        <g key={i}>
          <path d={`M ${x} -28 L ${x + 16} 0 L ${x} 28 L ${x - 16} 0 Z`} fill="#c9352f" fillOpacity="0.65" stroke="#e8a838" strokeWidth="0.8" />
          <circle cx={x} cy="0" r="3" fill="#f5d27a" />
        </g>
      ))}
      {/* animals / hooks */}
      {[-100, -60, -20, 20, 60, 100].map((x, i) => (
        <path
          key={i}
          d={`M ${x} -54 q 8 -10 16 0 q -8 6 -16 0`}
          fill="none"
          stroke="#e8a838"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      {[-100, -60, -20, 20, 60, 100].map((x, i) => (
        <path
          key={`b-${i}`}
          d={`M ${x} 54 q 8 10 16 0 q -8 -6 -16 0`}
          fill="none"
          stroke="#e8a838"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      {/* zigzag borders */}
      <polyline points="-130,-64 -110,-58 -90,-64 -70,-58 -50,-64 -30,-58 -10,-64 10,-58 30,-64 50,-58 70,-64 90,-58 110,-64 130,-58" fill="none" stroke="#e8a838" strokeWidth="1" opacity="0.6" />
      <polyline points="-130,64 -110,58 -90,64 -70,58 -50,64 -30,58 -10,64 10,58 30,64 50,58 70,64 90,58 110,64 130,58" fill="none" stroke="#e8a838" strokeWidth="1" opacity="0.6" />
    </g>
  );
}
