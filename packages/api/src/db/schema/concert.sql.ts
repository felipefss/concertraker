import {
  date,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helper';
import { user } from './user.sql';

export const concert = pgTable('concerts', {
  artist: varchar().notNull(),
  date: date(),
  id: serial().primaryKey(),
  location: varchar().notNull(),
  notes: text(),
  venue: varchar(),
  ...timestamps,

  userId: integer()
    .notNull()
    .references(() => user.id),
});

export type Concert = typeof concert.$inferSelect;
