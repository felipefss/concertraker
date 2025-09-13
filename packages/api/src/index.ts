import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { timedLog } from './middlewares/logger';

const app = new Hono();
app.use(logger(timedLog));

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
