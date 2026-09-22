import {
  Ruler,
  Layers,
  Palette,
  Image as ImageIcon,
  Frame,
  MapPin,
  Clock,
} from 'lucide-react';
import type { TapestryProduct } from '@/types/product';
import {
  hasData,
  SpecSection,
  SpecRow,
  BooleanRow,
  ListRow,
  OverviewSection,
  formatDimensions,
  formatFrameDimensions,
  formatYear,
} from './shared';

export function TapestryTemplate({ product }: { product: TapestryProduct }) {
  const s = product.specs;

  const dimsStr = formatDimensions(s.dimensions);
  const weightStr =
    s.weight != null ? `${s.weight} ${s.weightUnit ?? 'kg'}` : null;
  const knotDensityStr =
    s.knotDensity != null
      ? `${s.knotDensity} ${s.knotDensityUnit ?? 'KPSI'}`
      : null;
  const frameDimsStr = formatFrameDimensions(s.frameDimensions);

  return (
    <div>
      <OverviewSection description={product.description} origin={product.origin} />

      {/* Dimensions & Materials */}
      {hasData([dimsStr, weightStr, s.material]) && (
        <SpecSection title="Dimensions & Materials" icon={Ruler}>
          {dimsStr && <SpecRow label="Dimensions" value={dimsStr} />}
          {weightStr && <SpecRow label="Weight" value={weightStr} />}
          {s.material && <SpecRow label="Material" value={s.material} />}
        </SpecSection>
      )}

      {/* Weaving Technique */}
      {hasData([
        s.weavingTechnique,
        knotDensityStr,
        s.backingMaterial,
      ]) && (
        <SpecSection title="Weaving Technique" icon={Layers}>
          {s.weavingTechnique && (
            <SpecRow label="Weaving Technique" value={s.weavingTechnique} />
          )}
          {knotDensityStr && (
            <SpecRow label="Knot Density" value={knotDensityStr} />
          )}
          {s.backingMaterial && (
            <SpecRow label="Backing Material" value={s.backingMaterial} />
          )}
        </SpecSection>
      )}

      {/* Artwork */}
      {hasData([
        s.design,
        s.subject,
        s.artist,
        s.artistSignature,
        formatYear(s.yearMade),
      ]) && (
        <SpecSection title="Artwork" icon={ImageIcon}>
          {s.design && <SpecRow label="Design" value={s.design} />}
          {s.subject && <SpecRow label="Subject" value={s.subject} />}
          {s.artist && <SpecRow label="Artist" value={s.artist} />}
          {s.artistSignature && (
            <SpecRow label="Artist Signature" value={s.artistSignature} />
          )}
          {s.yearMade != null && (
            <SpecRow label="Year Made" value={formatYear(s.yearMade)} />
          )}
        </SpecSection>
      )}

      {/* Frame */}
      {hasData([
        s.framed,
        s.frameMaterial,
        frameDimsStr,
        s.frameCondition,
      ]) && (
        <SpecSection title="Frame" icon={Frame}>
          <BooleanRow label="Framed" value={s.framed} />
          {s.frameMaterial && (
            <SpecRow label="Frame Material" value={s.frameMaterial} />
          )}
          {frameDimsStr && (
            <SpecRow label="Frame Dimensions" value={frameDimsStr} />
          )}
          {s.frameCondition && (
            <SpecRow label="Frame Condition" value={s.frameCondition} />
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

      {/* Condition */}
      {hasData([
        s.condition,
        s.restored,
        s.restorationDetails,
      ]) && (
        <SpecSection title="Condition" icon={Clock}>
          {s.condition && (
            <SpecRow label="Condition" value={s.condition} />
          )}
          <BooleanRow label="Restored" value={s.restored} />
          {s.restorationDetails && (
            <SpecRow label="Restoration Details" value={s.restorationDetails} />
          )}
        </SpecSection>
      )}
    </div>
  );
}
