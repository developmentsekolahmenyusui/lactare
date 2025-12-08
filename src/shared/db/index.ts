import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Env, getEnv } from "../lib/env";

const pool = new Pool({
  connectionString: getEnv(Env.DATABASE_URL),
});

export const db = drizzle({ client: pool });

export type DB = typeof db;