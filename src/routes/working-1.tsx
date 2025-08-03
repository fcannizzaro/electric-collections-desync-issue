import { settingsCollections } from "@/collections/settings";
import { SharedComponent } from "@/components/shared";
import { updateSettings } from "@/server/services/update-settings";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/working-1")({
  component: App,
  ssr: false,
  beforeLoad: () => {
    localStorage.setItem("debug", "*");
    return settingsCollections.preload();
  },
});

function App() {
  const { data } = useLiveQuery((query) =>
    query.from({ t: settingsCollections })
  );

  const settings = data[0];

  const update = (data: { registration: boolean }) => {
    console.log("Click to update settings with data:", data);
    updateSettings({ data });
  };

  return <SharedComponent working settings={settings} onChange={update} />;
}
