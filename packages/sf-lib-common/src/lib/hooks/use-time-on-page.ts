'use client';

import { useEffect, useRef } from 'react';
import { sendAdkClientSignal } from '../personalization/client-signal';
import { SignalType } from '../../types/graphql';

const DEFAULT_THRESHOLDS_SEC = [15, 30, 60, 120, 180] as const;

/**
 * Fires TIME_ON_PAGE analytics signals at configurable time thresholds.
 * Cleans up timers on unmount. Each threshold fires only once per mount.
 *
 * @param pageSurface - A label identifying the page surface (e.g. "pdp", "plp", "home")
 * @param enabled     - Allows conditional activation (default: true)
 * @param thresholds  - Custom time thresholds in seconds (default: [15, 30, 60, 120, 180])
 */
export function useTimeOnPage(
  pageSurface: string,
  enabled = true,
  thresholds: readonly number[] = DEFAULT_THRESHOLDS_SEC
): void {
  const firedRef = useRef<Set<number>>(new Set());
  const thresholdsRef = useRef(thresholds);
  thresholdsRef.current = thresholds;

  useEffect(() => {
    if (!enabled) return;

    const timers = thresholdsRef.current.map((seconds) =>
      setTimeout(() => {
        if (!firedRef.current.has(seconds)) {
          firedRef.current.add(seconds);
          void sendAdkClientSignal(SignalType.TimeOnPage, {
            surface: pageSurface,
            seconds,
          });
        }
      }, seconds * 1000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [pageSurface, enabled]); // thresholds omitted — stabilized via ref
}
