import { clerkMiddleware } from '@clerk/express';
import express from 'express';
import { clerkAuth } from '@/middlewares/auth/clerkAuth';
import { ConcertsHandler } from './concerts.handler';
import { ConcertsDrizzleRepository } from './repository/concerts.repository.drizzle';

const concertsRepository = new ConcertsDrizzleRepository();
const concertsHandler = new ConcertsHandler(concertsRepository);
const router = express.Router();

router.use(clerkMiddleware());

router.get(
  '/{:id}',
  clerkAuth,
  concertsHandler.getConcerts.bind(concertsHandler),
);

router.post(
  '/',
  clerkAuth,
  concertsHandler.createConcert.bind(concertsHandler),
);

router.put('/', clerkAuth, concertsHandler.updateConcert.bind(concertsHandler));

router.delete(
  '/{:id}',
  clerkAuth,
  concertsHandler.deleteConcert.bind(concertsHandler),
);

export default router;
