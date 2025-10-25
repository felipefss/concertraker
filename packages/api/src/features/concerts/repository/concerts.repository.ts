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
  getConcert: (id: string) => Promise<Concert | null>;
  updateConcert: (concert: ConcertUpdateInput) => Promise<boolean>;
  deleteConcert: (id: string) => Promise<void>;
}
