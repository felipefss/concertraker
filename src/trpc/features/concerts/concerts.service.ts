import type { DB } from '@/db';

export const getConcerts = async (db: DB, userId: number) =>
  await db.query.concert.findMany({
    orderBy: (concert, { asc }) => asc(concert.date),
    where: (concert, { eq, and, isNull }) =>
      and(eq(concert.userId, userId), isNull(concert.deletedAt)),
  });
