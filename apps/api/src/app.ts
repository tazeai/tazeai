import { TazeAIServer } from '@tazeai/core/server';
import { type db, schemas } from '@tazeai/database';

export type Variables = {
  db: typeof db;
};

export type Env = {
  Variables: Variables;
};

const app: TazeAIServer = new TazeAIServer({
  prefix: '/v1',
});

app.get('/health', async (c) => {
  const start = Date.now();
  const db = c.get('db');
  const result = await db.select().from(schemas.user).limit(1);
  return c.json({
    status: 'ok',
    result,
    duration: Date.now() - start,
  });
});

app.get('/profile', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json(
      {
        status: 'unauthorized',
      },
      401,
    );
  }
  return c.json({
    status: 'ok',
    user: session.user,
  });
});

export default app;
