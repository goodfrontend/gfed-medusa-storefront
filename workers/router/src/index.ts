import { HORIZONTAL_COMPONENTS, getConfig } from './config';
import { proxyRequest } from './proxy';
import { determineTargetApp, transformPathname } from './routing';
import type { Env } from './types';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const config = getConfig(env);
    const url = new URL(request.url);
    const targetOrigin = determineTargetApp(url, config);
    const targetPathname = transformPathname(url.pathname);

    return proxyRequest(
      targetOrigin,
      targetPathname,
      url,
      request,
      ctx,
      config,
      HORIZONTAL_COMPONENTS
    );
  },
};
