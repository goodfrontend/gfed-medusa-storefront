import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { renderToString } from 'react-dom/server';

import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import { getComponent } from '../config/components';

const app = new Hono();

app.use(cors());

app.get('/api/:name', async (c) => {
  const name = c.req.param('name');
  const component = getComponent(name as string);

  if (!component)
    return c.json({ error: `Component '${name}' not found` }, 404);

  try {
    const data = await component.getData();
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
    const data = await component.getData();
    const Component = component.component;
    const html = renderToString(<Component {...data} />);
    return c.html(html);
  } catch (error) {
    console.error(`Error rendering component '${name}':`, error);
    return c.html(`<!-- Error rendering component '${name}' -->`, 500);
  }
});

app.use('/dist/*', serveStatic({ root: './' }));

const port = 4001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
