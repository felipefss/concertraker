import { clerkMiddleware } from '@clerk/express';
import express from 'express';
import { clerkAuth } from '@/middlewares/auth/clerkAuth';
import { ConcertsHandler } from './concerts.handler';
import { ConcertsDrizzleRepository } from './repository/concerts.repository.drizzle';

// const app = new Hono();

const concertsRepository = new ConcertsDrizzleRepository();
const concertsHandler = new ConcertsHandler(concertsRepository);
const router = express.Router();

router.use(clerkMiddleware());

router.get(
  '/{:id}',
  clerkAuth,
  concertsHandler.getConcerts.bind(concertsHandler),
);

// app.post('/', ...concertsHandler.createConcert());
router.post(
  '/',
  clerkAuth,
  concertsHandler.createConcert.bind(concertsHandler),
);

// app.put('/', ...concertsHandler.updateConcert());

// app.delete('/:id', ...concertsHandler.deleteConcert());

export default router;
