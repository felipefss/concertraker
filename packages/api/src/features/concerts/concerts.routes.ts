import { Hono } from 'hono';

import { ConcertsHandler } from './concerts.handler';
import { ConcertsDrizzleRepository } from './repository/concerts.repository.drizzle';

const app = new Hono();

const concertsRepository = new ConcertsDrizzleRepository();
const concertsHandler = new ConcertsHandler(concertsRepository);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/', ...concertsHandler.createConcert());

app.put('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.delete('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

export default app;
