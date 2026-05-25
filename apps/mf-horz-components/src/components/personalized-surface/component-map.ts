import type { ComponentType } from 'react';

import { HeroBanner } from '@gfed-medusa/sf-lib-common/components/personalized-content/components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverComponentMap: Record<string, ComponentType<any>> = {
  HeroBanner,
};