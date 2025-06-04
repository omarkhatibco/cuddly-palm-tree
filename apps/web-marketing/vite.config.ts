import { reactRouter } from "@react-router/dev/vite";
import lingoCompiler from "lingo.dev/compiler";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() =>
  lingoCompiler.vite({
    sourceRoot: "app",
    targetLocales: ["es", "fr", "de", "ar"],
    models: {
      "*:*": "groq:mistral-saba-24b",
    },
  })({
    server: {
      port: 3004,
    },
    plugins: [reactRouterHonoServer(), reactRouter(), tsconfigPaths()],
    // test: {
    // 	globals: true,
    // 	environment: 'happy-dom',
    // 	setupFiles: ['./vitest.setup.ts'],
    // 	passWithNoTests: true,
    // },
  })
);
