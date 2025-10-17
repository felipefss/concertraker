import type { UserCreateSchema } from '../users.schema';

export interface UsersRepository {
  createUser(data: UserCreateSchema['data']): Promise<number>;
}
