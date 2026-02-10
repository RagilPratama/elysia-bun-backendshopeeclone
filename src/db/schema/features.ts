import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const features = pgTable("features", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  subtitle: varchar({ length: 255 }).notNull(),
  amount: varchar({ length: 100 }),
  icon: varchar({ length: 255 }).notNull(),
});

export type Feature = typeof features.$inferSelect;
export type InsertFeature = typeof features.$inferInsert;
