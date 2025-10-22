import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
  updatedAt: timestamp().defaultNow().notNull(),
};
