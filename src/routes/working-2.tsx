import { settingsCollections2 } from "@/collections/settings-2";
import { SharedComponent } from "@/components/shared";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/working-2")({
  component: App,
  ssr: false,
  beforeLoad: () => {
    localStorage.setItem("debug", "*");
    return settingsCollections2.preload();
  },
});

function App() {
  const { data } = useLiveQuery((query) =>
    query.from({ t: settingsCollections2 })
  );

  const settings = data[0];

  const update = (data: { registration: boolean }) => {
    console.log("Click to update settings with data:", data);
    settingsCollections2.update(1, (prev) => {
      Object.assign(prev, data);
    });
  };

  return <SharedComponent working settings={settings} onChange={update} />;
}
