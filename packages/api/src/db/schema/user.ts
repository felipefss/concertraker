import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable('users', {
    id: serial().primaryKey(),
    clerkId: varchar().notNull().unique(),
    firstName: varchar().notNull(),
    lastName: varchar().notNull(),
    createdAt: timestamp().defaultNow()
});