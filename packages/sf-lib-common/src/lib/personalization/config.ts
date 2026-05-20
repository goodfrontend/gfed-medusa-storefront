export interface SegmentDefinition {
  id: string;
  label: string;
  categoryHandles: string[];
  collectionHandles: string[];
}

export interface SignalDefinition {
  id: string;
  description: string;
  bannerTrigger: string;
}

export interface PersonalizationConfig {
  segments: SegmentDefinition[];
  signals: SignalDefinition[];
  dismissCooldownMs: number;
  bannerAutoDismissMs: number;
  historyMaxLength: number;
  priceThreshold: number;
  pdpHesitationMs: number;
  highScrollThreshold: number;
}

export const PERSONALIZATION_CONFIG: PersonalizationConfig = {
  segments: [
    {
      id: 'mens',
      label: "Men's",
      categoryHandles: ['mens', 'men', 'mens-collection', 'menswear', 'menstwo'],
      collectionHandles: ['mens', 'men', 'mens-collection', 'menswear', 'menstwo'],
    },
    {
      id: 'womens',
      label: "Women's",
      categoryHandles: ['womens', 'women', 'womens-collection', 'womenswear', 'womenstwo'],
      collectionHandles: ['womens', 'women', 'womens-collection', 'womenswear', 'womenstwo'],
    },
  ],
  signals: [
    {
      id: 'pdp-hesitation',
      description: 'User on PDP > 30s with expensive product',
      bannerTrigger: 'pdp-hesitation',
    },
    {
      id: 'high-scroll-no-action',
      description: 'User scrolled 80% without adding to cart',
      bannerTrigger: 'high-scroll-no-action',
    },
  ],
  dismissCooldownMs: 60 * 60 * 1000,
  bannerAutoDismissMs: 30_000,
  historyMaxLength: 20,
  priceThreshold: 80,
  pdpHesitationMs: 30_000,
  highScrollThreshold: 0.8,
};

export function getSegmentIdFromCategory(categoryHandle: string): string | null {
  const normalized = categoryHandle.toLowerCase().replace(/[-_\s]/g, '');
  for (const segment of PERSONALIZATION_CONFIG.segments) {
    if (segment.categoryHandles.includes(normalized)) {
      return segment.id;
    }
  }
  return null;
}

export function getSegmentIdFromCollection(collectionHandle: string | undefined): string | null {
  if (!collectionHandle) return null;
  const normalized = collectionHandle.toLowerCase().replace(/[-_\s]/g, '');
  for (const segment of PERSONALIZATION_CONFIG.segments) {
    if (segment.collectionHandles.includes(normalized)) {
      return segment.id;
    }
  }
  return null;
}

export function getAllSegmentIds(): string[] {
  return PERSONALIZATION_CONFIG.segments.map((s) => s.id);
}

export function getSignalDefinition(signalId: string): SignalDefinition | undefined {
  return PERSONALIZATION_CONFIG.signals.find((s) => s.id === signalId);
}

export function getAllSignalIds(): string[] {
  return PERSONALIZATION_CONFIG.signals.map((s) => s.id);
}