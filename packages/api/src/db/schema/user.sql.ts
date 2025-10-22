import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helper';

export const user = pgTable('users', {
  clerkId: varchar().notNull().unique(),
  firstName: varchar().notNull(),
  id: serial().primaryKey(),
  imageUrl: varchar(),
  lastName: varchar().notNull(),
  ...timestamps,
});

export type User = typeof user.$inferSelect;
