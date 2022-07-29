import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useLoaderData
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser, logout } from "./session.server";
import Header from "./components/header";

export const links = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export const action = async({request}) => {
  console.log("logout...")
  const formData = await request.formData();
  const action = formData.get("action");
  console.log(`Action to execute ${action}`)

  return logout(request)
}

export async function loader({ request }) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const { user } = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />

        <Links />
      </head>

      <body className="h-full">
      <Header user={user} />

        <Outlet />
        <ScrollRestoration />

        <Scripts />

        <LiveReload />

      </body>
    </html>
  );
}
