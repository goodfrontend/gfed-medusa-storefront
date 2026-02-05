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
