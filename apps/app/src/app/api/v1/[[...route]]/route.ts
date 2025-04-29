import { TazeAIServer, vercel } from '@tazeai/core/server';

const server = new TazeAIServer({
  prefix: '/api/v1',
});

const handler = vercel(server);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;

// export const config = { api: { bodyParser: false } };

// export const runtime = 'edge';
