import { createCollection } from "@tanstack/react-db";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { z } from "zod";
import { updateSettings } from "@/server/services/update-settings";

const SettingsSchema = z.object({
  id: z.number(),
  registration: z.boolean().default(false),
});

export const settingsCollections = createCollection(
  electricCollectionOptions({
    id: "settings",
    shapeOptions: {
      url: `${import.meta.env.VITE_SERVER_URL}/api/shapes/setting`,
      params: {
        table: "setting",
      },
    },
    schema: SettingsSchema,
    getKey: (item) => item.id,
    onUpdate: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      console.log("Invoke update-settings with changes:", changes);
      const txid = await updateSettings({ data: changes });
      console.log("Settings updated, txid:", txid);
      return { txid };
    },
  })
);
