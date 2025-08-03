import { env } from "@/env";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/shapes/$table").methods({
  GET: async ({ request, params }) => {
    const url = new URL(request.url);
    const originUrl = new URL(`${env.ELECTRIC_HOST}/v1/shape`);

    url.searchParams.forEach((value, key) => {
      if ([`live`, `handle`, `offset`, `cursor`].includes(key)) {
        originUrl.searchParams.set(key, value);
      }
    });

    originUrl.searchParams.set("table", params.table);

    const response = await fetch(originUrl);

    const headers = new Headers(response.headers);
    headers.delete(`content-encoding`);
    headers.delete(`content-length`);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
});
