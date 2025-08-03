import { db, settings } from "./server/db";

await db.insert(settings).values({
  registration: false,
});
