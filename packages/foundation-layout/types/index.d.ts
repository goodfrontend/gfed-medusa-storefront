export interface RenderProps {
  locale?: string;
  user?: Record<string, any>;
  navData?: any[];
  request?: { url: string; headers?: Record<string, string> };
  featureFlags?: Record<string, boolean>;
}

export interface Asset {
  url: string;
  type: 'js' | 'css';
  integrity?: string;
}

export interface RenderResult {
  htmlStream: ReadableStream | string;
  assets: Asset[];
  status?: number;
  headers?: Record<string, string>;
}

export function renderLayout(props: RenderProps): Promise<RenderResult>;
