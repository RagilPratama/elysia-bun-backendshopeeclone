import { pgTable, text, bigint, numeric } from "drizzle-orm/pg-core";

export const shops = pgTable("shops", {
  id: bigint({ mode: "number" }).primaryKey(),
  name: text(),
  rating: numeric(),
  product_count: bigint({ mode: "number" }),
  chat_percentage: bigint({ mode: "number" }),
  location: text(),
});

export type Shops = typeof shops.$inferSelect;
export type InsertShop = typeof shops.$inferInsert;