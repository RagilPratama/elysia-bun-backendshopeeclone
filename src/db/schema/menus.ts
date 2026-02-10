import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const menus = pgTable("menus", {
  id: serial().primaryKey(),
  icon: varchar({ length: 255 }).notNull(),
  icon_color: varchar({ length: 1000 }),
  bg_color: varchar({ length: 1000 }),
  route: varchar({ length: 1000 }),
});

export type Menu = typeof menus.$inferSelect;
export type InsertMenu = typeof menus.$inferInsert;
