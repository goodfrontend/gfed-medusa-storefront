'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as Apollo from '@apollo/client';
import Medusa from '@medusajs/js-sdk';

declare global {
  interface Window {
    __GFED_GLOBALS__: Record<string, unknown>;
    __MFE_BUNDLE_URL__?: string;
  }
}

if (typeof window !== 'undefined') {
  const globals = {
    React,
    ReactDOM,
    ReactDOMClient,
    Apollo,
    Medusa,
  };

  window.__GFED_GLOBALS__ = Object.freeze(globals);

  if (window.__MFE_BUNDLE_URL__) {
    const script = document.createElement('script');
    script.src = window.__MFE_BUNDLE_URL__;
    document.body.appendChild(script);
  }
}
