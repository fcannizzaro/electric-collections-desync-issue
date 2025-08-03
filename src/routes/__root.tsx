import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => <div>Not Found</div>,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const links = [
    {
      link: "/",
      label: "with collection.update",
    },
    {
      link: "/working-1",
      label: "w/o collection.update",
    },
    {
      link: "/working-2",
      label: "with collection.update but no txid",
    },
  ];

  const router = useRouterState();

  const path = router.location.pathname;

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="grid place-items-center bg-gray-100 min-h-dvh">
          <div className="space-y-4">
            <div className="flex gap-4">
              {links.map((link) => (
                <Link
                  to={link.link}
                  key={link.link}
                  className={
                    path === link.link
                      ? "bg-blue-500 text-white p-2"
                      : "bg-gray-200 p-2"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {children}
            <p>
              Start with both instances checkboxes <u>unchecked</u>.
              <ol className="pt-2">
                <li>(Instance 1) Check the checkbox.</li>
                <li className="opacity-40">
                  (Instance 2) The checkbox should be checked
                </li>
                <li>(Instance 2) Uncheck the checkbox</li>
                <li className="opacity-40">
                  (Instance 1) The checkbox should be unchecked
                </li>
                <li>(Instance 2) Check the checkbox</li>
                <li className="flex gap-1">
                  <span className="opacity-40">
                    (Instance 1) The checkbox should be{" "}
                  </span>
                  <span className="text-green-500 font-bold">
                    checked (working)
                  </span>
                  <span className="opacity-40">or</span>
                  <span className="text-red-500 font-bold">
                    unchecked (not working)
                  </span>
                </li>
              </ol>
            </p>
          </div>
        </div>
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
