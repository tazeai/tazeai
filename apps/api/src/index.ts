import { serve } from '@hono/node-server';
import app from './app';

app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

serve({
  ...app,
  port: 3004,
});
