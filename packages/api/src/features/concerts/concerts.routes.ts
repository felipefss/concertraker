import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { ConcertsHandler } from './concerts.handler';
import { ConcertsDrizzleRepository } from './repository/concerts.repository.drizzle';

const app = new Hono();

const concertsRepository = new ConcertsDrizzleRepository();
const concertsHandler = new ConcertsHandler(concertsRepository);

app.use('/*', cors());

app.get('/:id?', ...concertsHandler.getConcerts());

app.post('/', ...concertsHandler.createConcert());

app.put('/', ...concertsHandler.updateConcert());

app.delete('/:id', ...concertsHandler.deleteConcert());

export default app;
