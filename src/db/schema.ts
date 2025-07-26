import { pgTable, serial, varchar, integer, text, timestamp, decimal } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category", { length: 100 }),
  stock: integer("stock").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});