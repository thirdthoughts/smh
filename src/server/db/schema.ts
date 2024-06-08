// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration


import {
  pgTableCreator,
  char,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `smh_${name}`);

export const posts = createTable(
  "Metro",
  {
    metroAreaId: serial("MetroAreaId").primaryKey(),
    metroAreaTitle: varchar("MetroAreaTitle", { length: 256 }).notNull(),
    metroAreaStateAbr: char("MetroAreaStateAbr", { length: 2 }).notNull(),
    MetroAreaStateName: varchar("MetroAreaStateName", { length: 256 }).notNull(),
  },
);
