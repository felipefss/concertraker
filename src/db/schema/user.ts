import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: serial().primaryKey(),
  username: text().unique().notNull(),
  name: text(),
  password: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
