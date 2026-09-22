import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Background layers — smooth, professional gradient overlay */}
      {/* Base vertical wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950 via-espresso-900 to-espresso-950" />
      {/* Subtle Persian pattern */}
      <div className="persian-pattern absolute inset-0 opacity-30" />
      {/* Soft warm accents with gentle, extended falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(232,168,56,0.14),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_78%_82%,rgba(201,53,47,0.10),transparent_75%)]" />
      {/* Smooth vignette that darkens behind the centered text and fades out gracefully */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(14,10,6,0.72),rgba(14,10,6,0.28)_55%,transparent_85%)]" />
      {/* Top anchor gradient so the navbar area reads cleanly */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso-950/80 to-transparent" />
      {/* Bottom fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espresso-950/80 to-transparent" />

      {/* Floating decorative orbs */}
      <div className="animate-float-slow absolute left-[8%] top-[28%] h-72 w-72 rounded-full bg-saffron-500/10 blur-3xl" />
      <div className="animate-float-slow absolute right-[12%] top-[55%] h-96 w-96 rounded-full bg-crimson-600/10 blur-3xl [animation-delay:2s]" />

      {/* Large decorative saffron mark */}
      <SaffronBloom className="pointer-events-none absolute -right-24 top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 opacity-25 lg:block" />

      <div className="relative mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center px-5 pt-24 pb-14 text-center sm:px-8">
        <div className="animate-fade-up flex items-center gap-2 rounded-full border border-saffron-500/30 bg-espresso-800/40 px-5 py-2 backdrop-blur">
          <Sparkles className="h-4 w-4 text-saffron-400" />
          <span className="text-xs uppercase tracking-[0.3em] text-cream-200">
            Sourced direct from Iran
          </span>
        </div>

        <h1 className="animate-fade-up mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] text-cream-50 text-balance [animation-delay:0.1s] sm:text-7xl lg:text-8xl">
          The Treasures of
          <span className="block text-gold-gradient">Ancient Persia</span>
        </h1>

        <p className="animate-fade-up mt-5 max-w-2xl text-base leading-relaxed text-cream-300 text-balance [animation-delay:0.2s] sm:text-xl">
          Premium Iranian saffron, hand-harvested from the Khorasan plateau. Hand-knotted
          Persian rugs woven by master artisans over months of devotion. Delivered worldwide,
          paid in USDT.
        </p>

        <div className="animate-fade-up mt-7 flex w-full max-w-md flex-col items-stretch gap-3 [animation-delay:0.3s] sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#saffron"
            className="group rounded-full bg-gold-gradient px-7 py-3.5 text-center font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-105 active:scale-100 sm:px-8 sm:py-4"
          >
            Explore the Collection
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#heritage"
            className="rounded-full border border-saffron-500/40 px-7 py-3.5 text-center font-medium text-cream-100 transition-colors hover:border-saffron-400/70 hover:bg-saffron-500/10 sm:px-8 sm:py-4"
          >
            Our Heritage
          </a>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-up mt-12 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-saffron-500/15 bg-saffron-500/10 sm:grid-cols-4 sm:mt-14 [animation-delay:0.4s]">
          {STATS.map((s) => (
            <div key={s.label} className="bg-espresso-900/80 px-3 py-3 text-center backdrop-blur sm:px-4 sm:py-4">
             <p className="font-serif text-2xl text-white sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-cream-400 sm:text-[11px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#heritage"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-400 transition-colors hover:text-saffron-300 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

const STATS = [
  { value: '2,500+', label: 'Years of craft' },
  { value: '320+', label: 'Knots per inch' },
  { value: 'Grade A', label: 'Saffron purity' },
  { value: 'USDT', label: 'Crypto accepted' },
];

function SaffronBloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none">
      <g stroke="#e8a838" strokeWidth="1">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x2 = 200 + Math.cos(a) * 190;
          const y2 = 200 + Math.sin(a) * 190;
          return <line key={i} x1="200" y1="200" x2={x2} y2={y2} opacity={0.4} />;
        })}
      </g>
      <circle cx="200" cy="200" r="60" fill="none" stroke="#c9352f" strokeWidth="2" opacity="0.5" />
      <circle cx="200" cy="200" r="40" fill="#c9352f" fillOpacity="0.25" />
      <circle cx="200" cy="200" r="14" fill="#e8a838" />
    </svg>
  );
}
