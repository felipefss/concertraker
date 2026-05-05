import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { getConcerts } from './concerts.service';

export const concertsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx: { db, userId } }) => {
    return getConcerts(db, userId);
  }),
});
