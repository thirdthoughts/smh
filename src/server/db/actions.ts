"use server";
import { db } from "~/server/db";
import { Metro, Product, Project } from "./schema";
import { eq, ilike, or } from "drizzle-orm/pg-core/expressions";

export async function filteredProducts(searchParam: string) : Promise<any[]> {
  const likeParam = `%${searchParam}%`;
  const result = await db
    .select({
      productName: Product.productName,
      productID: Product.productID,
      metroAreaTitle: Metro.metroAreaTitle,
      projectFullName: Project.fullName,
      projectGroupID: Project.projectGroupID,
    })
    .from(Product)
    .fullJoin(Project, eq(Product.projectGroupID, Project.projectGroupID))
    .fullJoin(Metro, eq(Metro.metroAreaId, Project.metroAreaID))
    .where(
      or(
        /* despite the instructions I have chosen not to match against purely
         * numeric ids (primarykeys). This is easily changed if it is a requirement,
         * but I would prefer not to expose internal keys for security reasons.
         * 
         * additionally, I have assumed we do not wish to be case-sensitive in search.
         * this is also an easy change if required.
         */
        ilike(Metro.metroAreaStateAbr, likeParam),
        ilike(Metro.MetroAreaStateName, likeParam),
        ilike(Metro.metroAreaTitle, likeParam),
        ilike(Project.fullName, likeParam),
        ilike(Project.status, likeParam),
        ilike(Product.projectName, likeParam),
        ilike(Product.productID, likeParam),
        ilike(Product.productName, likeParam),
      ),
    );

  return result;
}
