import type { User } from '../../../db/schema/user.sql';
import type { UserCreateSchema } from '../users.schema';

export interface UsersRepository {
  createUser(data: UserCreateSchema['data']): Promise<number>;
  getUserByEmail(email: string): Promise<User | null>;
}
