import { Hono } from 'hono';

import { ConcertsHandler } from './concerts.handler';
import { ConcertsDrizzleRepository } from './repository/concerts.repository.drizzle';

const app = new Hono();

const concertsRepository = new ConcertsDrizzleRepository();
const concertsHandler = new ConcertsHandler(concertsRepository);

app.get('/:id?', ...concertsHandler.getConcerts());

app.post('/', ...concertsHandler.createConcert());

app.put('/', ...concertsHandler.updateConcert());

app.delete('/:id', ...concertsHandler.deleteConcert());

export default app;
