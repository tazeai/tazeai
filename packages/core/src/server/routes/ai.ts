import { Hono } from 'hono';
import type { Env } from '../types';
import { ProviderType, ProviderManager } from '@tazeai/ai';

const app = new Hono<Env>();

app.get('/', async (c) => {
  const type = c.req.query('type');
  try {
    const manager = new ProviderManager();
    const result = await manager.generate(type as ProviderType, '请用简洁的语言描述一下 {topic} 的意义。', { topic: '人工智能' });
    return c.json({
      result,
    });
  } catch (error: unknown) {
    return c.json({
      error: (error as Error).message,
    });
  }
});

app.post('/chat', async (c) => {
  const { prompt, inputs } = await c.req.json();
  const manager = new ProviderManager();
  const result = await manager.generate(ProviderType.OPENAI, prompt, inputs ?? {});
  return c.json({
    result,
  });
});

export default app;
