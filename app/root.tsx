import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import React from "react";
import { AppBar } from "./components/app-bar";
import { Bottomnav } from "./components/bottom-nav";
import { globalStyles } from "./components/global-css";
import {
  ScrollContainerInner,
  ScrollContainerOuter,
} from "./components/scroll-container";
import { colorScheme } from "./cookies";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({ request }) => {
  const systemColorScheme = request.headers.get("Sec-CH-Prefers-Color-Scheme");
  const userColorScheme = await colorScheme.parse(
    request.headers.get("cookie")
  );

  return { colorScheme: userColorScheme ?? systemColorScheme };
};

export default function App() {
  const { colorScheme } = useLoaderData<typeof loader>();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorScheme || prefersDarkMode ? "dark" : "light",
        },
      }),
    [colorScheme, prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <CssBaseline />
          {globalStyles}
        </head>
        <body>
          <AppBar />
          <ScrollContainerOuter>
            <ScrollContainerInner>
              <Outlet />
            </ScrollContainerInner>
            <Bottomnav />
          </ScrollContainerOuter>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </ThemeProvider>
  );
}
