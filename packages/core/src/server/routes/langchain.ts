import { LangChain, type ProviderType } from '@tazeai/ai';
import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import type { Env } from '../types';

const app = new Hono<Env>();

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
  const type = c.req.query('type');
  return streamSSE(
    c,
    async (stream) => {
      try {
        const manager = new LangChain();
        const llm = manager.getProvider(type as ProviderType, data.model);
        if (!llm) {
          throw new Error('Model not found');
        }
        const result = await llm.stream(data.messages);
        for await (const chunk of result) {
          await stream.writeSSE({
            data: JSON.stringify(chunk),
          });
        }
      } catch (error: unknown) {
        await stream.writeSSE({
          data: JSON.stringify({
            error:
              'An error occurred while processing your request:' +
              (error as Error).message,
          }),
        });
      } finally {
        stream.close();
      }
    },
    (error: Error) => {
      console.error('error', error);
      return Promise.resolve();
    }
  );
});

export default app;
