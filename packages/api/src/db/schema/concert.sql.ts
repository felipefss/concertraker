import { date, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
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

  userId: serial()
    .notNull()
    .references(() => user.id),
});
