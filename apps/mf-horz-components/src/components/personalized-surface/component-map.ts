import type { ComponentType } from 'react';
import { FeaturedCategoryRail, HeroBanner } from '@gfed-medusa/sf-lib-common/components/personalized-content/components';

import { PersonalizedBanner } from '../personalized-banner';

export const serverComponentMap: Record<string, ComponentType<any>> = {
  HeroBanner,
  FeaturedCategoryRail,
  PersonalizedBanner,
};