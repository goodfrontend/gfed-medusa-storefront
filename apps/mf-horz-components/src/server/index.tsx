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
    cookieHeader: c.req.header('cookie') ?? '',
  };
};

app.get('/api/context', async (c) => {
  const cartId = getCookie(c, '_medusa_cart_id');
  const cacheId = getCookie(c, '_medusa_cache_id');

  return c.json({
    cartId: cartId ?? '',
    cacheId: cacheId ?? '',
  });
});

app.get('/api/cart', async (c) => {
  const cartId = getCookie(c, '_medusa_cart_id');

  if (!cartId) {
    return c.json({ cart: null });
  }

  try {
    const [{ createServerApolloClient, graphqlFetch }, { GET_CART_QUERY }] =
      await Promise.all([
        import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/cart'),
      ]);

    const cookieHeader = c.req.header('cookie') ?? '';
    const apolloClient = createServerApolloClient(cookieHeader);

    const result = await graphqlFetch<any, { id: string }>(
      {
        query: GET_CART_QUERY,
        variables: { id: cartId },
      },
      apolloClient
    );

    return c.json({ cart: result?.cart ?? null });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return c.json({ error: 'Failed to fetch cart' }, 500);
  }
});

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

const port = process.env.PORT || 5001;
console.log(`Server running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
