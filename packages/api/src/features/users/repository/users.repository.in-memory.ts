import type { User } from '../../../db/schema/user.sql';
import type { UserCreateSchema } from '../users.schema';
import type { UsersRepository } from './users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = [];

  createUser(data: UserCreateSchema['data']): Promise<number> {
    return new Promise((resolve) => {
      const id = this.users.length + 1;

      const user = {
        clerkId: data.id,
        createdAt: new Date(),
        deletedAt: null,
        email: data.email_addresses[0]?.email_address,
        firstName: data.first_name,
        id,
        imageUrl: data.image_url ?? null,
        lastName: data.last_name,
        updatedAt: new Date(),
      } satisfies User;

      this.users.push(user);
      resolve(id);
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.email === email);

      resolve(user ?? null);
    });
  }
}
