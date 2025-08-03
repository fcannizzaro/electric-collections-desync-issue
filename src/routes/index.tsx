import { settingsCollections } from "@/collections/settings";
import { SharedComponent } from "@/components/shared";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
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
    settingsCollections.update(1, (prev) => {
      Object.assign(prev, data);
    });
  };

  return <SharedComponent settings={settings} onChange={update} />;
}
