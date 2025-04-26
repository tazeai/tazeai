import { Hono } from 'hono';
import type { Env } from '../types';
import { ProviderType, ProviderManager } from '@tazeai/ai';
import { streamSSE, streamText } from 'hono/streaming';

const app = new Hono<Env>();
// body {
//   model: 'gpt-4o-mini',
//   max_tokens: 16384,
//   temperature: 0.1,
//   messages: [ { role: 'user', content: 'haloll111111111111111111' } ],
//   stream: true
// }
app.post('/completions', async (c) => {
  const data: {
    model: string;
    prompt: string;
    max_tokens?: number;
    stream?: boolean;
    temperature?: number;
    messages: {
      role: string;
      content: string;
    }[];
  } = await c.req.json();
  console.log('data', data);
  const type = c.req.query('type') || 'deepseek';
  try {
    const manager = new ProviderManager();
    return streamSSE(c, async (stream) => {
      // const prompt = await manager.prompt('请用简洁的语言描述一下 {topic} 的意义。', { topic: '人工智能' });
      const llm = manager.getProvider(type as ProviderType, data.model);
      if (!llm) {
        throw new Error('Model not found');
      }
      const result = await llm.stream(data.messages);
      for await (const chunk of result) {
        console.log('chunk', chunk);
        await stream.writeSSE({
          data: JSON.stringify({
            type: 'data',
            data: chunk.content,
          }),
        });
      }
    });
    // return c.json({
    //   result,
    // });
  } catch (error: unknown) {
    return c.json({
      error: (error as Error).message,
    });
  }
});

export default app;
