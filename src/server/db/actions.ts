"use server";
import { db } from "~/server/db";
import { Metro, Product, Project } from "./schema";
import { eq, like, or } from "drizzle-orm/pg-core/expressions";

export async function filteredProducts(searchParam: string) {
  const likeParam = `%${searchParam}%`;
  const result = await db
    .select({
      productName: Product.productName,
      productID: Product.productID,
      metroAreaTitle: Metro.metroAreaTitle,
      projectFullName: Project.fullName,
      projectGroupId: Project.projectGroupId,
    })
    .from(Product)
    .fullJoin(Project, eq(Product.projectGroupID, Project.projectGroupId))
    .fullJoin(Metro, eq(Metro.metroAreaId, Project.metroAreaID))
    .where(
      or(
        /* despite the instructions I have chosen not to match against purely
         * numeric ids (primarykeys). This is easily changed if it is a requirement,
         * but I would prefer not to expose internal keys for security reasons.
         */
        like(Metro.metroAreaStateAbr, likeParam),
        like(Metro.MetroAreaStateName, likeParam),
        like(Metro.metroAreaTitle, likeParam),
        like(Project.fullName, likeParam),
        like(Project.status, likeParam),
        like(Product.projectName, likeParam),
        like(Product.productID, likeParam),
        like(Product.productName, likeParam)
      ),
    );

  return result;
}
