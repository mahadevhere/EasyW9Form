'use client';

import { useEffect } from 'react';

export default function VersionCheck() {
  const APP_VERSION = '1.2.0';
  useEffect(() => {
    const storedVersion = sessionStorage.getItem('app_version');
    if (storedVersion !== APP_VERSION) {
      sessionStorage.clear();
      sessionStorage.setItem('app_version', APP_VERSION);
    }
  }, []);

  return null;
}
