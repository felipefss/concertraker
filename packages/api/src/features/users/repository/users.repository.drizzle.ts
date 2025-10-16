import { db } from '@/db';
import { user } from '@/db/schema';

import type { UserData, UsersRepository } from './users.repository';

export class UsersDrizzleRepository implements UsersRepository {
  async createUser({
    id,
    first_name,
    image_url,
    last_name,
  }: UserData): Promise<number> {
    const resp = await db
      .insert(user)
      .values({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
      })
      .returning({ insertedId: user.id });

    return resp[0]?.insertedId ?? -1;
  }
}
