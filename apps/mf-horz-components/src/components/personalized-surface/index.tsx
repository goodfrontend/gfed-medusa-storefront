import type { PersonalizedComponent } from '@gfed-medusa/sf-lib-common/lib/data/personalization';

import { serverComponentMap } from './component-map';
import { resolveProps } from './resolve-props';

interface PersonalizedSurfaceProps {
  components: PersonalizedComponent[];
}

export function PersonalizedSurface({ components }: PersonalizedSurfaceProps) {
  const sorted = [...(components ?? [])].sort((a, b) => a.priority - b.priority);

  if (sorted.length === 0) return null;

  return (
    <>
      {sorted.map((c) => {
        const Component = serverComponentMap[c.component];
        if (!Component) return null;
        return (
          <Component
            key={`${c.component}-${c.contentId ?? c.priority}`}
            {...resolveProps(c.propsOverrides)}
          />
        );
      })}
    </>
  );
}