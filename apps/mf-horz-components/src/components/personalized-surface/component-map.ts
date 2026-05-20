import type { ComponentType } from 'react';

import {
  HeroBanner,
  ProductCarousel,
  TrustBar,
  CategoryGrid,
  SocialProofBanner,
  ReviewCarousel,
  UpsellBlock,
  EmailCapture,
  UrgencyBanner,
} from '@gfed-medusa/sf-lib-common/components/personalized-content/components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverComponentMap: Record<string, ComponentType<any>> = {
  HeroBanner,
  ProductCarousel,
  TrustBar,
  CategoryGrid,
  SocialProofBanner,
  ReviewCarousel,
  UpsellBlock,
  EmailCapture,
  UrgencyBanner,
};