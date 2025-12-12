import type { Concert } from '../../../db/schema/concert.sql';
import type {
  ConcertCreateInput,
  ConcertsRepository,
  ConcertUpdateInput,
} from './concerts.repository';

export class ConcertsInMemoryRepository implements ConcertsRepository {
  private concerts: Concert[] = [];

  // implement all missing methods implemented from ConcertsRepository
  createConcert(data: ConcertCreateInput): Promise<number> {
    return new Promise((resolve) => {
      const id = this.concerts.length + 1;
      const now = new Date();

      const concert = {
        artist: data.artist,
        createdAt: now,
        date: data.date,
        deletedAt: null,
        id,
        location: data.location,
        notes: data.notes,
        updatedAt: now,
        userId: data.userId,
        venue: data.venue,
      } satisfies Concert;

      this.concerts.push(concert);

      resolve(id);
    });
  }

  getConcerts(userId: number): Promise<Concert[]> {
    return new Promise((resolve) => {
      const concerts = this.concerts.filter(
        (concert) => concert.userId === userId,
      );

      resolve(concerts);
    });
  }

  getConcert(userId: number, id: number): Promise<Concert | undefined> {
    return new Promise((resolve) => {
      const concert = this.concerts.find(
        (concert) => concert.userId === userId && concert.id === id,
      );
      console.log('Concert memory', this.concerts);

      resolve(concert);
    });
  }

  updateConcert(concert: ConcertUpdateInput): Promise<void> {
    return new Promise((resolve) => {
      const index = this.concerts.findIndex((c) => c.id === concert.id);

      if (index === -1) {
        throw new Error('Concert not found');
      }

      this.concerts[index] = {
        artist: concert.artist,
        // biome-ignore lint/style/noNonNullAssertion: <At this point, the object will exist>
        createdAt: this.concerts[index]!.createdAt,
        date: concert.date,
        deletedAt: null,
        id: concert.id,
        location: concert.location,
        notes: concert.notes,
        updatedAt: new Date(),
        userId: concert.userId,
        venue: concert.venue,
      };

      resolve();
    });
  }

  deleteConcert(userId: number, id: number): Promise<void> {
    return new Promise((resolve) => {
      const index = this.concerts.findIndex(
        (c) => c.userId === userId && c.id === id,
      );

      this.concerts.splice(index, 1);

      resolve();
    });
  }
}
