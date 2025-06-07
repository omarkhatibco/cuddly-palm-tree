import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import { LingoProvider, LocaleSwitcher } from "lingo.dev/react/client";
import { loadDictionary } from "lingo.dev/react/react-router";

import type { Route } from "./+types/root";

export async function loader(args: Route.LoaderFunctionArgs) {
  return {
    lingoDictionary: await loadDictionary(args.request),
  };
}

// export const headers: Route.HeadersFunction = () => ({
// 	'Cache-Control': 'public,max-age=120, stale-while-revalidate=600',
// })

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lingoDictionary } = useLoaderData<typeof loader>();

  console.log(lingoDictionary);

  return (
    <LingoProvider dictionary={lingoDictionary}>
      <html lang="en" dir="ltr" suppressHydrationWarning>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <header>
            <nav>
              <LocaleSwitcher locales={["en", "es", "fr", "de"]} />
            </nav>
          </header>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </LingoProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
