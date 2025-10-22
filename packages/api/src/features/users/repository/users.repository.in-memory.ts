import type { User } from '@/db/schema/user.sql';
import type { UserCreateSchema } from '../users.schema';
import type { UsersRepository } from './users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = [];

  async createUser(data: UserCreateSchema['data']): Promise<number> {
    const id = this.users.length + 1;

    const user = {
      clerkId: data.id,
      createdAt: new Date(),
      deletedAt: null,
      firstName: data.first_name,
      id,
      imageUrl: data.image_url ?? null,
      lastName: data.last_name,
      updatedAt: new Date(),
    } satisfies User;

    this.users.push(user);
    return id;
  }
}
