'use client';

import { useEffect, useRef } from 'react';

import {
  PERSONALIZATION_CONFIG,
  getSegmentIdFromCollection,
} from '@gfed-medusa/sf-lib-common/lib/personalization/config';
import {
  getSegmentCookie,
  setSegmentCookie,
} from '@gfed-medusa/sf-lib-common/lib/personalization/behavior-tracker';
import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { Product } from '@/types/graphql';

const PDP_HESITATION_MS = PERSONALIZATION_CONFIG.pdpHesitationMs;
const HIGH_SCROLL_THRESHOLD = PERSONALIZATION_CONFIG.highScrollThreshold;
const PRICE_THRESHOLD = PERSONALIZATION_CONFIG.priceThreshold;

function getScrollPercentage(): number {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
}

function getCheapestVariantPrice(product: Product): number | null {
  const variants = product.variants;
  if (!variants || variants.length === 0) return null;

  let cheapest: number | null = null;

  for (const variant of variants) {
    const priceObj = variant.price;
    if (priceObj && typeof priceObj.amount === 'number') {
      if (cheapest === null || priceObj.amount < cheapest) {
        cheapest = priceObj.amount;
      }
    }
  }

  return cheapest;
}

function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

function emitSignal(type: string, payload?: unknown) {
  const data = getSegmentCookie();

  if (!data.signals || typeof data.signals !== 'object') {
    data.signals = {};
  }

  (data.signals as Record<string, unknown>)[type] = payload ?? true;

  setSegmentCookie(data);
}

const REPEAT_CATEGORY_THRESHOLD = 3;

function trackRepeatedCategoryView(segment: string) {
  try {
    const data = getSegmentCookie();

    if (!data.signals || typeof data.signals !== 'object') {
      data.signals = {};
    }

    const categoryCounts = (data.signals as Record<string, unknown>)['repeated-category-view'] as Record<string, number> ?? {};
    const currentCount = categoryCounts[segment] ?? 0;
    const newCount = currentCount + 1;

    categoryCounts[segment] = newCount;
    (data.signals as Record<string, unknown>)['repeated-category-view'] = categoryCounts;

    if (newCount >= REPEAT_CATEGORY_THRESHOLD) {
      emitSignal('repeated-category-view', { segment, count: newCount });
    }

    setSegmentCookie(data);
  } catch {
    // Ignore
  }
}

function addHistoryToCookie(segment: string): void {
  try {
    const data = getSegmentCookie();

    if (!data.history || !Array.isArray(data.history)) {
      data.history = [];
    }

    const history = [...(data.history as string[]), segment].slice(
      -PERSONALIZATION_CONFIG.historyMaxLength
    );
    data.history = history;

    setSegmentCookie(data);
  } catch {
  }
}

export interface BehaviorTrackerProps {
  product: Product;
}

export function BehaviorTracker({ product }: BehaviorTrackerProps) {
  const { cartId } = useStorefrontContext();
  const hesitationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const scrollTrackedRef = useRef(false);
  const historyTrackedRef = useRef(false);

  useEffect(() => {
    if (!product?.id) return;

    const collectionHandle = product.collection?.handle;
    const segment = getSegmentIdFromCollection(collectionHandle);

    if (segment) {
      addHistoryToCookie(segment);
      trackRepeatedCategoryView(segment);
    }

    const productPrice = getCheapestVariantPrice(product);
    const hasCart = Boolean(cartId);

    if (productPrice && productPrice >= PRICE_THRESHOLD && !hasCart) {
      hesitationTimeoutRef.current = setTimeout(() => {
        emitSignal('pdp-hesitation', {
          productId: product.id,
          price: productPrice,
        });
      }, PDP_HESITATION_MS);
    }

    const handleScroll = throttle(() => {
      if (scrollTrackedRef.current) return;
      if (getScrollPercentage() >= HIGH_SCROLL_THRESHOLD && !hasCart) {
        scrollTrackedRef.current = true;
        emitSignal('high-scroll-no-action', {
          productId: product.id,
          scrollDepth: HIGH_SCROLL_THRESHOLD,
        });
      }
    }, 500);

    scrollHandlerRef.current = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (hesitationTimeoutRef.current !== null) {
        clearTimeout(hesitationTimeoutRef.current);
        hesitationTimeoutRef.current = null;
      }
      if (scrollHandlerRef.current !== null) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
      scrollTrackedRef.current = false;
    };
  }, [product, cartId]);

  return null;
}

export default BehaviorTracker;
