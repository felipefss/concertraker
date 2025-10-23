import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { user } from '@/db/schema';
import type { User } from '@/db/schema/user.sql';
import type { UserCreateSchema } from '../users.schema';
import type { UsersRepository } from './users.repository';

export class UsersDrizzleRepository implements UsersRepository {
  async createUser({
    id,
    first_name,
    image_url,
    last_name,
    email_addresses,
  }: UserCreateSchema['data']): Promise<number> {
    const resp = await db
      .insert(user)
      .values({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        imageUrl: image_url,
        lastName: last_name,
      })
      .returning({ insertedId: user.id });

    if (!resp[0]) {
      throw new Error('Failed to create user');
    }

    return resp[0].insertedId;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const res = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (res) {
      return res;
    }

    return null;
  }
}
