import { Hono } from 'hono';
import { createUser } from './users.handler';

const app = new Hono();

app.post('/', ...createUser);

export default app;
