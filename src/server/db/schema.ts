import {
  pgTableCreator,
  char,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `smh_${name}`);

/* NOTES, ASSUPMTIONS, QUESTIONS - these should be questioned before production deployment.
 *
 * It may be helpful to mark some columns as required/non-nullable
 * 
 * Project.Status is a single character for all sample columns. I have not assumed that this
 * will always be true; some storage savings could be had if it is.
 * 
 */

export const Metro = createTable(
  "Metro",
  {
    metroAreaId: serial("MetroAreaId").primaryKey(),
    metroAreaTitle: varchar("MetroAreaTitle"),
    metroAreaStateAbr: varchar("MetroAreaStateAbr"), 
    MetroAreaStateName: varchar("MetroAreaStateName"),
  },
);

export const Project = createTable(
  "Project",
  {
    projectGroupId: serial("ProjectGroupId").primaryKey(),
    metroAreaID: integer("MetroAreaID").references(() => Metro.metroAreaId),
    fullName: varchar("FullName"),
    status: char("Status", { length: 1}), //NOTE: verify longevity of this choice
  },
);

export const Product = createTable(
  "Product",
  {
    projectName: varchar("ProjectName", {length: 256}),
    productID: varchar("ProductID"),
    projectGroupID: integer("ProjectGroupID").references(() => Project.projectGroupId),
    productName: varchar("ProductName")
  },
);

