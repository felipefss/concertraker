import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { timedLog } from './middlewares/logger';
import users from '@/features/users';

const app = new Hono();
app.use(logger(timedLog));

app.route('/users', users);

export default app;
