import { clerkMiddleware } from '@clerk/express';
import express from 'express';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { ConcertsHandler } from './concerts.handler';
import { ConcertsDrizzleRepository } from './repository/concerts.repository.drizzle';

// const app = new Hono();

const concertsRepository = new ConcertsDrizzleRepository();
const concertsHandler = new ConcertsHandler(concertsRepository);
const router = express.Router();

router.use(clerkMiddleware());

// app.use('/*', cors());

// app.get('/:id?', ...concertsHandler.getConcerts());
router.get('/:id?', concertsHandler.getConcerts);

// app.post('/', ...concertsHandler.createConcert());

// app.put('/', ...concertsHandler.updateConcert());

// app.delete('/:id', ...concertsHandler.deleteConcert());

export default router;
