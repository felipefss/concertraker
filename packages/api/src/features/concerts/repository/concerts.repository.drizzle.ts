import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../../../db';
import { type Concert, concert } from '../../../db/schema/concert.sql';
import type {
  ConcertCreateInput,
  ConcertsRepository,
  ConcertUpdateInput,
} from './concerts.repository';

export class ConcertsDrizzleRepository implements ConcertsRepository {
  async createConcert(concertInput: ConcertCreateInput): Promise<number> {
    const resp = await db
      .insert(concert)
      .values({
        ...concertInput,
      })
      .returning({ insertedId: concert.id });

    if (!resp[0]) {
      throw new Error('Failed to create concert');
    }

    return resp[0].insertedId;
  }

  async getConcerts(userId: number): Promise<Concert[]> {
    return await db.query.concert.findMany({
      orderBy: (concert, { asc }) => asc(concert.date),
      where: (concert, { eq, and, isNull }) =>
        and(eq(concert.userId, userId), isNull(concert.deletedAt)),
    });
  }

  async getConcert(userId: number, id: number): Promise<Concert | undefined> {
    return await db.query.concert.findFirst({
      where: (concert, { eq, and, isNull }) =>
        and(
          eq(concert.userId, userId),
          eq(concert.id, id),
          isNull(concert.deletedAt),
        ),
    });
  }

  async updateConcert({
    artist,
    date,
    id,
    location,
    notes,
    venue,
    userId,
  }: ConcertUpdateInput): Promise<void> {
    await db
      .update(concert)
      .set({
        artist,
        date,
        location,
        notes,
        updatedAt: new Date(),
        venue,
      })
      .where(
        and(
          eq(concert.id, id),
          eq(concert.userId, userId),
          isNull(concert.deletedAt),
        ),
      );
  }

  async deleteConcert(userId: number, id: number): Promise<void> {
    await db
      .update(concert)
      .set({
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(concert.id, id),
          eq(concert.userId, userId),
          isNull(concert.deletedAt),
        ),
      );
  }
}
