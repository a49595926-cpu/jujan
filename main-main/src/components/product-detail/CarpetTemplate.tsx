import {
  Ruler,
  Layers,
  Palette,
  MapPin,
  Clock,
  Award,
  Info,
} from 'lucide-react';
import type { CarpetProduct } from '@/types/product';
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

export function CarpetTemplate({ product }: { product: CarpetProduct }) {
  const s = product.specs;

  const dimsStr = formatDimensions(s.dimensions);
  const weightStr =
    s.weight != null ? `${s.weight} ${s.weightUnit ?? 'kg'}` : null;
  const knotDensityStr =
    s.knotDensity != null
      ? `${s.knotDensity} ${s.knotDensityUnit ?? 'KPSI'}`
      : null;

  return (
    <div className="space-y-6">
      <OverviewSection description={product.description} origin={product.origin} />

      {/* Dimensions & Weight */}
      {hasData([dimsStr, weightStr]) && (
        <SpecSection title="Dimensions & Weight" icon={Ruler}>
          {dimsStr && <SpecRow label="Dimensions" value={dimsStr} />}
          {weightStr && <SpecRow label="Weight" value={weightStr} />}
        </SpecSection>
      )}

      {/* Weaving & Materials */}
      {hasData([
        s.material,
        s.weavingTechnique,
        s.knotType,
        knotDensityStr,
        s.pileMaterial,
        s.warpMaterial,
        s.weftMaterial,
      ]) && (
        <SpecSection title="Weaving & Materials" icon={Layers}>
          {s.material && <SpecRow label="Material" value={s.material} />}
          {s.weavingTechnique && (
            <SpecRow label="Weaving Technique" value={s.weavingTechnique} />
          )}
          {s.knotType && <SpecRow label="Knot Type" value={s.knotType} />}
          {knotDensityStr && (
            <SpecRow label="Knot Density" value={knotDensityStr} />
          )}
          {s.pileMaterial && (
            <SpecRow label="Pile Material" value={s.pileMaterial} />
          )}
          {s.warpMaterial && (
            <SpecRow label="Warp Material" value={s.warpMaterial} />
          )}
          {s.weftMaterial && (
            <SpecRow label="Weft Material" value={s.weftMaterial} />
          )}
        </SpecSection>
      )}

      {/* Design */}
      {hasData([
        s.design,
        s.pattern,
        s.dominantColors,
        s.fringe,
        s.borderStyle,
      ]) && (
        <SpecSection title="Design" icon={Palette}>
          {s.design && <SpecRow label="Design" value={s.design} />}
          {s.pattern && <SpecRow label="Pattern" value={s.pattern} />}
          <ListRow label="Dominant Colors" values={s.dominantColors} />
          {s.fringe && <SpecRow label="Fringe" value={s.fringe} />}
          {s.borderStyle && (
            <SpecRow label="Border Style" value={s.borderStyle} />
          )}
        </SpecSection>
      )}

      {/* Origin */}
      {hasData([s.region, s.city, product.origin]) && (
        <SpecSection title="Origin" icon={MapPin}>
          {product.origin && <SpecRow label="Origin" value={product.origin} />}
          {s.region && <SpecRow label="Region" value={s.region} />}
          {s.city && <SpecRow label="City" value={s.city} />}
        </SpecSection>
      )}

      {/* History & Condition */}
      {hasData([
        s.age,
        formatYear(s.yearMade),
        s.condition,
        s.restored,
        s.restorationDetails,
      ]) && (
        <SpecSection title="History & Condition" icon={Clock}>
          {s.age && <SpecRow label="Age" value={s.age} />}
          {s.yearMade != null && (
            <SpecRow label="Year Made" value={formatYear(s.yearMade)} />
          )}
          {s.condition && (
            <SpecRow label="Condition" value={s.condition} />
          )}
          <BooleanRow label="Restored" value={s.restored} />
          {s.restorationDetails && (
            <SpecRow label="Restoration Details" value={s.restorationDetails} />
          )}
        </SpecSection>
      )}

      {/* Artisan / Certification */}
      {hasData([
        s.artist,
        s.weaver,
        s.collection,
        s.certificate,
      ]) && (
        <SpecSection title="Artisan / Certification" icon={Award}>
          {s.artist && <SpecRow label="Artist" value={s.artist} />}
          {s.weaver && <SpecRow label="Weaver" value={s.weaver} />}
          {s.collection && (
            <SpecRow label="Collection" value={s.collection} />
          )}
          {s.certificate && (
            <SpecRow label="Certificate" value={s.certificate} />
          )}
        </SpecSection>
      )}
    </div>
  );
}
