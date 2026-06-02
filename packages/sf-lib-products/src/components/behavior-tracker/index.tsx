'use client';

import { useEffect, useRef } from 'react';

import { sendClientSignal } from '@gfed-medusa/sf-lib-common/lib/personalization/client-signal';
import { SignalType } from '@gfed-medusa/sf-lib-common/types/graphql';

import { useTimeOnPage } from '@gfed-medusa/sf-lib-common/lib/hooks/use-time-on-page';
import { Product } from '@/types/graphql';

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

export interface BehaviorTrackerProps {
  product: Product;
}

export function BehaviorTracker({ product }: BehaviorTrackerProps) {
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const firedDepthRef = useRef<Set<number>>(new Set());
  const exitIntentFiredRef = useRef(false);

  useTimeOnPage('pdp', Boolean(product?.id));

  useEffect(() => {
    if (!product?.id) return;

    const collectionHandle = product.collection?.handle;
    const productPrice = getCheapestVariantPrice(product);
    void sendClientSignal(SignalType.ProductView, {
      productId: product.id,
      productName: product.title,
      productHandle: product.handle,
      category: collectionHandle,
      price: productPrice,
    });

    const handleScroll = throttle(() => {
      const scrollPct = Math.round(getScrollPercentage() * 100);
      const depthThresholds = [25, 50, 75, 90];
      for (const threshold of depthThresholds) {
        if (scrollPct >= threshold && !firedDepthRef.current.has(threshold)) {
          firedDepthRef.current.add(threshold);
          void sendClientSignal(SignalType.ScrollDepth, {
            depth: threshold,
            page: window.location.pathname,
          });
        }
      }
    }, 500);

    scrollHandlerRef.current = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollHandlerRef.current !== null) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
    };
  }, [product]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentFiredRef.current) {
        exitIntentFiredRef.current = true;
        void sendClientSignal(SignalType.ExitIntent, {
          page: window.location.pathname,
        });
      }
    };
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    return () => document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return null;
}

export default BehaviorTracker;
