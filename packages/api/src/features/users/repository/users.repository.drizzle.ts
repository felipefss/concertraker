import { db } from '@/db';
import type { UserData, UsersRepository } from './users.repository';
import { user } from '@/db/schema';

export class UsersDrizzleRepository implements UsersRepository {
  async create({ id, first_name, image_url, last_name }: UserData): Promise<boolean> {
    const resp = await db.insert(user).values({
      clerkId: id,
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
    });

    console.log('create resp', resp);

    return true;
  }
}
