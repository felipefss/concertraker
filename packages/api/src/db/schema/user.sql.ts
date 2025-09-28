import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helper';

export const user = pgTable('users', {
  id: serial().primaryKey(),
  clerkId: varchar().notNull().unique(),
  firstName: varchar().notNull(),
  lastName: varchar().notNull(),
  ...timestamps,
});
