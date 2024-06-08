import {neon} from '@neondatabase/serverless'
const sql = neon(process.env.DATABASE_URL!)

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });