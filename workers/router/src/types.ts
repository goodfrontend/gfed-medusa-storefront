export interface Env {
  URL_HOME: string;
  URL_PRODUCTS: string;
  URL_ACCOUNT: string;
  URL_CHECKOUT: string;
  URL_HORIZONTAL: string;
}

export interface AppConfig {
  HOME: string;
  PRODUCTS: string;
  ACCOUNT: string;
  CHECKOUT: string;
  HORIZONTAL_SERVICE: string;
}

export interface HorizontalComponentConfig {
  name: string;
  elementTag: string;
  dataVariable: string;
  /**
   * Whether this component's SSR payload can be cached at the edge.
   * Components with per-user data (e.g. cart) should set this to `false`.
   * Defaults to `true` when not specified.
   */
  cacheable?: boolean;
  /**
   * How to inject the SSR content into the host element.
   * - `'replace'` (default): replaces the element's inner content via `setInnerContent`.
   * - `'prepend'`: prepends the shadow DOM template, preserving existing children
   *   (e.g. slotted child web components like `<mfe-cart>`).
   */
  injectionMode?: 'replace' | 'prepend';
}

export interface ComponentResources {
  html: string;
  data: string;
  config: HorizontalComponentConfig;
}

export type HorizontalManifest = Record<
  string,
  {
    file: string;
    name: string;
  }
>;
