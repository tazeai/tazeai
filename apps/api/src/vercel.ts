import { handle } from '@hono/node-server/vercel';
import app from './app';

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handle(app);
