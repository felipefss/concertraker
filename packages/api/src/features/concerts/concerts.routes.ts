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

// app.use('/*', cors());

// app.get('/:id?', ...concertsHandler.getConcerts());
router.get(
  '/{:id}',
  clerkAuth,
  concertsHandler.getConcerts.bind(concertsHandler),
);

// app.post('/', ...concertsHandler.createConcert());

// app.put('/', ...concertsHandler.updateConcert());

// app.delete('/:id', ...concertsHandler.deleteConcert());

export default router;
