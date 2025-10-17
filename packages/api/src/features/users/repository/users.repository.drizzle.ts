import { db } from '@/db';
import { user } from '@/db/schema';

import type { UserCreateSchema } from '../users.schema';
import type { UsersRepository } from './users.repository';

export class UsersDrizzleRepository implements UsersRepository {
  async createUser({
    id,
    first_name,
    image_url,
    last_name,
  }: UserCreateSchema['data']): Promise<number> {
    const resp = await db
      .insert(user)
      .values({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
      })
      .returning({ insertedId: user.id });

    if (!resp[0]) {
      throw new Error('Failed to create user');
    }

    return resp[0].insertedId;
  }
}
