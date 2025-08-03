import { db, settings } from "@/server/db";
import { generateTxId } from "@/util/tx";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

const Schema = z.object({
  registration: z.boolean().optional(),
});

export const updateSettings = createServerFn({ method: "POST" })
  .validator(Schema.partial())
  .handler(({ data }) => {
    return db.transaction(async (tx) => {
      const txid = await generateTxId(tx);
      await tx.update(settings).set(data);
      return txid;
    });
  });
