import { date, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";

export const concert = pgTable('concerts', {
    id: serial().primaryKey(),
    artist: varchar().notNull(),
    venue: varchar(),
    location: varchar().notNull(),
    date: date(),
    notes: text(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    userId: serial().notNull().references(() => user.id)
})