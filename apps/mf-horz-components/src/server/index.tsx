import 'dotenv/config';
import { Context, Hono } from 'hono';
import { compress } from 'hono/compress';
import { getCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { renderToString } from 'react-dom/server';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import { getComponent } from '../config/components';

const app = new Hono();

// TODO(fcasibu): whitelist origin
app.use(cors());
app.use(compress());

const resolveContext = (c: Context): StorefrontContext => {
  return {
    cartId: getCookie(c, '_medusa_cart_id') ?? '',
    cacheId: getCookie(c, '_medusa_cache_id') ?? '',
    customerToken: '',
    cookieHeader: '',
  };
};

app.get('/api/:name', async (c) => {
  const name = c.req.param('name');
  const component = getComponent(name as string);

  if (!component)
    return c.json({ error: `Component '${name}' not found` }, 404);

  try {
    const ctx = resolveContext(c);
    const data = await component.getData(ctx);
    c.header(
      'Cache-Control',
      's-maxage=3600, max-age=2400, stale-while-revalidate=1800'
    );
    return c.json(data);
  } catch (error) {
    console.error(`Error fetching data for component '${name}':`, error);
    return c.json({ error: 'Failed to fetch component data' }, 500);
  }
});

app.get('/fragment/:name', async (c) => {
  const name = c.req.param('name');
  const component = getComponent(name);

  if (!component) {
    return c.html(`<!-- Component '${name}' not found -->`, 404);
  }

  try {
    const ctx = resolveContext(c);
    const data = await component.getData(ctx);
    const Component = component.component;
    const html = renderToString(<Component {...data} ctx={ctx} />);
    c.header(
      'Cache-Control',
      's-maxage=3600, max-age=2400, stale-while-revalidate=1800'
    );
    return c.html(html);
  } catch (error) {
    console.error(`Error rendering component '${name}':`, error);
    return c.html(`<!-- Error rendering component '${name}' -->`, 500);
  }
});

app.use('/build/*', async (c, next) => {
  await next();

  if (c.res.status >= 200 && c.res.status < 300) {
    const path = c.req.path;

    if (path.endsWith('.js') || path.endsWith('.css')) {
      c.res.headers.set(
        'Cache-Control',
        's-maxage=3600, max-age=2400, stale-while-revalidate=1800'
      );
    }
  }
});

app.use('/build/*', serveStatic({ root: './' }));

const port = process.env.PORT || 5001;
console.log(`Server running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
