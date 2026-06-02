export interface SignalDefinition {
  id: string;
  description: string;
  bannerTrigger: string;
}

export interface PersonalizationConfig {
  signals: SignalDefinition[];
  dismissCooldownMs: number;
  bannerAutoDismissMs: number;
  historyMaxLength: number;
  priceThreshold: number;
  pdpHesitationMs: number;
  highScrollThreshold: number;
}

export const PERSONALIZATION_CONFIG: PersonalizationConfig = {
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
