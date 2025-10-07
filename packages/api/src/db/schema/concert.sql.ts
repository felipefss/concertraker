import { date, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { user } from './user.sql';
import { timestamps } from '../columns.helper';

export const concert = pgTable('concerts', {
  id: serial().primaryKey(),
  artist: varchar().notNull(),
  venue: varchar(),
  location: varchar().notNull(),
  date: date(),
  notes: text(),
  ...timestamps,

  userId: integer()
    .notNull()
    .references(() => user.id),
});

export type Concert = typeof concert.$inferSelect;
