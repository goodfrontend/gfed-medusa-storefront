'use client';

import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { PERSONALIZATION_CONFIG } from '@gfed-medusa/sf-lib-common/lib/personalization/config';

interface ContextualBannerData {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  trigger: string;
  minPrice?: number;
  priority: number;
}

const SIGNAL_COOKIE = '_jg_segment';
const isProd = process.env.NODE_ENV === 'production';

const cookieOptions: Cookies.CookieAttributes = isProd
  ? { path: '/', sameSite: 'none', secure: true, domain: '.justgood.win' }
  : { path: '/', sameSite: 'lax' };

function getSegmentData(): Record<string, unknown> {
  const value = Cookies.get(SIGNAL_COOKIE);
  if (!value) return {};
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return {};
  }
}

function getActiveDismissedTrigger(): string | null {
  try {
    const data = getSegmentData();
    const dismissed = data?.signals?.dismissed;

    if (!dismissed || typeof dismissed !== 'object') return null;

    const dismissCooldownMs = PERSONALIZATION_CONFIG.dismissCooldownMs;
    const now = Date.now();

    for (const [trigger, timestamp] of Object.entries(dismissed)) {
      if (typeof timestamp === 'number' && now - timestamp < dismissCooldownMs) {
        return trigger;
      }
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function cleanupExpiredDismissals(data: Record<string, unknown>): void {
  if (!data.signals || typeof data.signals !== 'object') return;

  const dismissed = (data.signals as Record<string, unknown>).dismissed;
  if (!dismissed || typeof dismissed !== 'object') return;

  const dismissCooldownMs = PERSONALIZATION_CONFIG.dismissCooldownMs;
  const now = Date.now();
  const updatedDismissed: Record<string, number> = {};

  for (const [trigger, timestamp] of Object.entries(dismissed)) {
    if (typeof timestamp === 'number' && now - timestamp < dismissCooldownMs) {
      updatedDismissed[trigger] = timestamp;
    }
  }

  (data.signals as Record<string, unknown>).dismissed = updatedDismissed;
}

function dismissBanner(trigger: string) {
  try {
    let data = getSegmentData();
    if (Object.keys(data).length === 0) {
      data = { signals: {} };
    }

    if (!data.signals || typeof data.signals !== 'object') {
      data.signals = {};
    }

    let dismissed: Record<string, number> = {};
    const existing = (data.signals as Record<string, unknown>).dismissed;
    if (existing && typeof existing === 'object' && !('trigger' in existing)) {
      dismissed = existing as Record<string, number>;
    }
    dismissed[trigger] = Date.now();
    (data.signals as Record<string, unknown>).dismissed = dismissed;

    delete (data.signals as Record<string, unknown>)[trigger];

    Cookies.set(
      SIGNAL_COOKIE,
      encodeURIComponent(JSON.stringify(data)),
      { ...cookieOptions, expires: 7 }
    );
  } catch {
    // Ignore errors
  }

  const el = document.getElementById('contextual-banner');
  if (el) el.remove();
}

function isTriggerDismissed(
  signals: Record<string, unknown>,
  trigger: string
): boolean {
  const dismissed = signals.dismissed;
  if (!dismissed || typeof dismissed !== 'object') return false;

  const timestamp = (dismissed as Record<string, number>)[trigger];
  if (typeof timestamp !== 'number') return false;

  const dismissCooldownMs = PERSONALIZATION_CONFIG.dismissCooldownMs;
  return Date.now() - timestamp < dismissCooldownMs;
}

function findMatchingBanner(
  banners: ContextualBannerData[],
  signals: Record<string, unknown>,
  dismissedTrigger: string | null
): ContextualBannerData | null {
  const matchingBanners: ContextualBannerData[] = [];

  for (const banner of banners) {
    if (isTriggerDismissed(signals, banner.trigger)) continue;

    const signalValue = signals[banner.trigger];
    if (!signalValue) continue;

    if (banner.minPrice) {
      const price =
        typeof signalValue === 'object' && signalValue !== null
          ? (signalValue as Record<string, unknown>).price
          : signalValue;

      if (typeof price !== 'number' || price < banner.minPrice) {
        continue;
      }
    }

    matchingBanners.push(banner);
  }

  if (matchingBanners.length === 0) return null;

  matchingBanners.sort((a, b) => b.priority - a.priority);
  return matchingBanners[0];
}

export function ContextualBanner() {
  const [bannerData, setBannerData] = useState<ContextualBannerData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleDismiss = useCallback((trigger: string) => {
    dismissBanner(trigger);
    setBannerData(null);
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const dismissedTrigger = getActiveDismissedTrigger();

    const getSignalsAndFetch = async () => {
      let data = getSegmentData();

      if (Object.keys(data).length === 0) {
        return;
      }

      if (!data.signals || typeof data.signals !== 'object') {
        data.signals = {};
      }

      cleanupExpiredDismissals(data);

      const signals = (data.signals as Record<string, unknown>) ?? {};

      if (Object.keys(signals).length === 0) {
        return;
      }

      try {
        const response = await fetch('/api/horz/contextual-banners');
        if (!response.ok) return;

        const banners: ContextualBannerData[] = await response.json();
        const matchingBanner = findMatchingBanner(banners, signals, dismissedTrigger);

        if (matchingBanner) {
          setBannerData(matchingBanner);
          setIsVisible(true);
        }
      } catch {
        // Ignore fetch errors
      }
    };

    getSignalsAndFetch();

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, PERSONALIZATION_CONFIG.bannerAutoDismissMs);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !bannerData) {
    return null;
  }

  return (
    <div
      id="contextual-banner"
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 99999,
        maxWidth: '520px',
        minWidth: '360px',
        background: '#fff',
        boxShadow:
          '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        borderRadius: '0.5rem',
        padding: '20px',
        border: '1px solid #e5e7eb',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <button
        onClick={() => handleDismiss(bannerData.trigger)}
        aria-label="Dismiss banner"
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          color: '#6b7280',
          padding: '4px 8px',
          lineHeight: '1',
          borderRadius: '4px',
          transition: 'background-color 0.2s, color 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.color = '#374151';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#6b7280';
        }}
      >
        ×
      </button>
      <h3
        style={{
          fontWeight: 600,
          fontSize: '18px',
          margin: '0',
          color: '#111827',
        }}
      >
        {bannerData.title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '8px 0',
        }}
      >
        {bannerData.description}
      </p>
      <a
        href={bannerData.ctaHref}
        onClick={() => handleDismiss(bannerData.trigger)}
        style={{
          fontSize: '14px',
          color: '#2563eb',
          textDecoration: 'none',
        }}
      >
        {bannerData.ctaLabel} →
      </a>
    </div>
  );
}