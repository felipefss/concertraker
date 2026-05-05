// import { z } from 'zod';
import { createTRPCRouter } from '@/trpc/init';
import { concertsRouter } from './features/concerts/concerts.route';

export const appRouter = createTRPCRouter({
  concerts: concertsRouter,
});

export type AppRouter = typeof appRouter;
