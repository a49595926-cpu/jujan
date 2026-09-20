import {
  Ruler,
  Hammer,
  Palette,
  MapPin,
  Sparkles,
} from 'lucide-react';
import type { MinakariProduct } from '@/types/product';
import {
  hasData,
  SpecSection,
  SpecRow,
  BooleanRow,
  ListRow,
  OverviewSection,
  formatDimensions,
  formatYear,
} from './shared';

export function MinakariTemplate({ product }: { product: MinakariProduct }) {
  const s = product.specs;

  const dimsStr = formatDimensions(s.dimensions);
  const weightStr =
    s.weight != null ? `${s.weight} ${s.weightUnit ?? 'g'}` : null;

  return (
    <div className="space-y-6">
      <OverviewSection description={product.description} origin={product.origin} />

      {/* Dimensions & Materials */}
      {hasData([dimsStr, weightStr, s.baseMaterial]) && (
        <SpecSection title="Dimensions & Materials" icon={Ruler}>
          {dimsStr && <SpecRow label="Dimensions" value={dimsStr} />}
          {weightStr && <SpecRow label="Weight" value={weightStr} />}
          {s.baseMaterial && (
            <SpecRow label="Base Material" value={s.baseMaterial} />
          )}
        </SpecSection>
      )}

      {/* Craftsmanship */}
      {hasData([
        s.technique,
        s.glazeType,
        s.firingMethod,
        s.handPainted,
      ]) && (
        <SpecSection title="Craftsmanship" icon={Hammer}>
          {s.technique && <SpecRow label="Technique" value={s.technique} />}
          {s.glazeType && <SpecRow label="Glaze Type" value={s.glazeType} />}
          {s.firingMethod && (
            <SpecRow label="Firing Method" value={s.firingMethod} />
          )}
          <BooleanRow label="Hand Painted" value={s.handPainted} />
        </SpecSection>
      )}

      {/* Design */}
      {hasData([s.design, s.motif, s.dominantColors]) && (
        <SpecSection title="Design" icon={Palette}>
          {s.design && <SpecRow label="Design" value={s.design} />}
          {s.motif && <SpecRow label="Motif" value={s.motif} />}
          <ListRow label="Dominant Colors" values={s.dominantColors} />
        </SpecSection>
      )}

      {/* Artisan & Origin */}
      {hasData([
        s.artist,
        s.workshop,
        s.region,
        s.city,
        formatYear(s.yearMade),
        product.origin,
      ]) && (
        <SpecSection title="Artisan & Origin" icon={MapPin}>
          {s.artist && <SpecRow label="Artist" value={s.artist} />}
          {s.workshop && <SpecRow label="Workshop" value={s.workshop} />}
          {product.origin && <SpecRow label="Origin" value={product.origin} />}
          {s.region && <SpecRow label="Region" value={s.region} />}
          {s.city && <SpecRow label="City" value={s.city} />}
          {s.yearMade != null && (
            <SpecRow label="Year Made" value={formatYear(s.yearMade)} />
          )}
        </SpecSection>
      )}

      {/* Intended Use */}
      {hasData([s.use, s.itemType]) && (
        <SpecSection title="Intended Use" icon={Sparkles}>
          {s.itemType && <SpecRow label="Item Type" value={s.itemType} />}
          {s.use && <SpecRow label="Use" value={s.use} />}
        </SpecSection>
      )}
    </div>
  );
}
