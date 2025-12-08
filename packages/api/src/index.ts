import { Hono } from 'hono';
import { logger } from 'hono/logger';
import concerts from '@/features/concerts';
import users from '@/features/users';
import { timedLog } from './middlewares/logger';

const app = new Hono().basePath('/api');
app.use(logger(timedLog));

app.route('/users', users);
app.route('/concerts', concerts);

export default app;
