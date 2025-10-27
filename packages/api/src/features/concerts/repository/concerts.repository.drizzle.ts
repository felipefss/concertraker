import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { type Concert, concert } from '@/db/schema/concert.sql';
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
      where: (concert, { eq }) => eq(concert.userId, userId),
    });
  }

  async getConcert(userId: number, id: number): Promise<Concert | undefined> {
    return await db.query.concert.findFirst({
      where: (concert, { eq, and }) =>
        and(eq(concert.userId, userId), eq(concert.id, id)),
    });
  }

  async updateConcert(concert: ConcertUpdateInput): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async deleteConcert(userId: number, id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
