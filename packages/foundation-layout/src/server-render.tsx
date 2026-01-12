import React from 'react';

import { renderToReadableStream, renderToString } from 'react-dom/server';

export type RenderProps = {
  locale?: string;
  user?: Record<string, any>;
  navData?: any[];
  request?: { url: string; headers?: Record<string, string> };
  featureFlags?: Record<string, boolean>;
};

export type Asset = { url: string; type: 'js' | 'css'; integrity?: string };

export type RenderResult = {
  htmlStream: ReadableStream | string;
  assets: Asset[];
  status?: number;
  headers?: Record<string, string>;
};

function LayoutShell(props: {
  children?: React.ReactNode;
  locale?: string;
  navData?: any[];
}) {
  return (
    <html lang={props.locale || 'en'}>
      <body>
        <header>
          <div style={{ padding: 12 }}>Foundation Header</div>
        </header>
        <nav>
          <div style={{ padding: 8 }}>Top navigation (placeholder)</div>
        </nav>
        <main id="mfe-content">{props.children}</main>
        <footer>
          <div style={{ padding: 12 }}>Foundation Footer</div>
        </footer>
      </body>
    </html>
  );
}

export async function renderLayout(props: RenderProps): Promise<RenderResult> {
  try {
    const App = React.createElement(LayoutShell, {
      locale: props.locale,
      navData: props.navData,
    });

    // Prefer streaming when available (Edge / React 18+)
    if (typeof renderToReadableStream === 'function') {
      const stream = await renderToReadableStream(App);
      return {
        htmlStream: stream,
        assets: [{ url: '/foundation-layout/client/main.js', type: 'js' }],
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      };
    }

    // Fallback to string rendering
    const html = '<!doctype html>' + renderToString(App);
    return {
      htmlStream: html,
      assets: [{ url: '/foundation-layout/client/main.js', type: 'js' }],
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    };
  } catch (err) {
    return {
      htmlStream: '<div>Layout render error</div>',
      assets: [],
      status: 500,
    };
  }
}

export default renderLayout;
