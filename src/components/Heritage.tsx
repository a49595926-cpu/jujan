import { Award, FlaskConical, Globe as Globe2, HandHeart } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const PILLARS = [
  {
    icon: HandHeart,
    title: 'Hand-Harvested',
    text: 'Each saffron flower is picked at dawn by hand. 150,000 blooms yield a single kilogram of Sargol threads.',
  },
  {
    icon: Award,
    title: 'Master Weavers',
    text: 'Our rugs are knotted by artisans carrying generations of craft. A single Tabriz rug can take four months to complete.',
  },
  {
    icon: FlaskConical,
    title: 'Lab-Verified',
    text: 'Every saffron batch is lab-tested for crocin, safranal and picrocrocin — exceeding ISO 3632 Grade A standards.',
  },
  {
    icon: Globe2,
    title: 'Worldwide Delivery',
    text: 'Vacuum-sealed and insured shipping from Iran to your doorstep, anywhere on the globe.',
  },
];

export function Heritage() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="heritage" ref={ref} className="relative overflow-hidden pt-16 pb-6 sm:pt-22 sm:pb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950 to-espresso-900" />
      <div className="persian-pattern absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8">
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}>
          <p className="text-xs uppercase tracking-[0.32em] text-saffron-400">Our Heritage</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream-50 sm:text-6xl">
            A legacy woven in
            <span className="text-gold-gradient"> gold &amp; crimson</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-300 text-balance">
            For over two and a half millennia, Persian artisans have perfected two of the world's
            most coveted treasures — the saffron thread and the knotted rug. Persian Treasures
            brings them directly to you, with the same integrity they were created with.
          </p>
        </div>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              className={`reveal ${isVisible ? 'is-visible' : ''} group relative overflow-hidden rounded-2xl border border-saffron-500/15 bg-espresso-800/50 p-5 transition-all duration-500 hover:border-saffron-400/40 hover:bg-espresso-700/40`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-saffron-500/5 blur-2xl transition-opacity duration-500 group-hover:bg-saffron-500/15" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron-500/30 bg-espresso-900/50 text-saffron-300 transition-colors group-hover:border-saffron-400/60 group-hover:text-saffron-200">
                  <p.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-3.5 font-serif text-2xl text-cream-50">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-300">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
