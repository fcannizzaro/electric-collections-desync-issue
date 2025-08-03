import { env } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { boolean, pgTable, serial } from "drizzle-orm/pg-core";
import pg from "pg";

export const settings = pgTable("setting", {
  id: serial().primaryKey(),
  registration: boolean().default(false).notNull(),
});

const client = new pg.Pool({
  connectionString: env.POSTGRES_URL,
});

export const db = drizzle(client, {
  schema: {
    settings,
  },
});

export type DB = typeof db;
