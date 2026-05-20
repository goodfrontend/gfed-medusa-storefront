'use client';

import { useEffect } from 'react';

import { getDeviceId } from '@/lib/personalization/device-id';

export function DeviceIdSetter() {
  useEffect(() => {
    getDeviceId();
  }, []);

  return null;
}
