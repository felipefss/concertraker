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
    return await db.select().from(concert).where(eq(concert.userId, userId));
  }

  async getConcert(_id: string): Promise<Concert | null> {
    throw new Error('Method not implemented.');
  }

  async updateConcert(concert: ConcertUpdateInput): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async deleteConcert(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
