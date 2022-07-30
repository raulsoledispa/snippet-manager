import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getSession, logout } from "./session.server";
import HeaderComponent from "./components/header.component";

// eslint-disable-next-line no-unused-vars
import Prism from "prismjs";
import jsStyles from "prismjs/components/prism-javascript";
import defaultThemeStyles from "prism-themes/themes/prism-vs.css";
import jsonStyles from "prismjs/components/prism-json";
import customEditorStyles from "~/styles/editor.css";
import buttonStyles from "~/styles/button.css";

export const links = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    {
      rel: "stylesheet",
      href: jsStyles,
    },
    {
      rel: "stylesheet",
      href: defaultThemeStyles,
    },
    {
      rel: "stylesheet",
      href: jsonStyles,
    },
    {
      rel: "stylesheet",
      href: customEditorStyles,
    },
    {
      rel: "stylesheet",
      href: buttonStyles,
    },
  ];
};

export const meta = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export const action = async ({ request }) => {
  return logout(request);
};

export async function loader({ request }) {
  const {
    data: { userId },
  } = await getSession(request);
  return json({
    user: userId,
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
        <HeaderComponent user={user} />

        <Outlet />
        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}
