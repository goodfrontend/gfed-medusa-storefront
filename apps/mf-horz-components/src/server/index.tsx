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

app.use(cors());
app.use(compress());

const resolveContext = (c: Context): StorefrontContext => {
  return {
    cartId: getCookie(c, '_medusa_cart_id'),
    customerToken: getCookie(c, '_medusa_jwt'),
    cacheId: getCookie(c, '_medusa_cache_id'),
    cookieHeader: c.req.header('Cookie'),
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
    const html = renderToString(<Component {...data} />);
    return c.html(html);
  } catch (error) {
    console.error(`Error rendering component '${name}':`, error);
    return c.html(`<!-- Error rendering component '${name}' -->`, 500);
  }
});

app.use('/build/*', serveStatic({ root: './' }));

const port = process.env.PORT || 4001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
