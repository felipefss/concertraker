import type { Concert } from '@/db/schema/concert.sql';

export type ConcertCreateInput = Omit<
  Concert,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ConcertUpdateInput = Partial<Omit<ConcertCreateInput, 'userId'>> &
  Pick<Concert, 'id'>;

export interface ConcertsRepository {
  createConcert: (concert: ConcertCreateInput) => Promise<number>;
  getConcerts: (userId: number) => Promise<Concert[]>;
  getConcert: (userId: number, id: number) => Promise<Concert | undefined>;
  updateConcert: (concert: ConcertUpdateInput) => Promise<boolean>;
  deleteConcert: (userId: number, id: number) => Promise<void>;
}
