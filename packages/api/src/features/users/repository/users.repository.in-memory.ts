import type { User } from '@/db/schema/user.sql';
import type { UserData, UsersRepository } from './users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = [];

  async create(data: UserData): Promise<number> {
    const id = this.users.length + 1;

    const user = {
      id,
      clerkId: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      imageUrl: data.image_url,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } satisfies User;

    this.users.push(user);
    return id;
  }
}
