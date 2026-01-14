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
