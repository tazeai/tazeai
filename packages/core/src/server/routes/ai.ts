import { Hono } from 'hono';
import type { Env } from '../types';
import ai, { ProviderType } from '@tazeai/ai';

const app = new Hono<Env>();

app.get('/', async (c) => {
  const type = c.req.query('type');
  console.log('type', type);
  const result = await ai(type as ProviderType);

  return c.json({
    result,
  });
});

export default app;
