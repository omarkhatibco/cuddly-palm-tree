import { contextStorage } from "hono/context-storage";

import { createHonoServer } from "react-router-hono-server/node";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
  interface AppLoadContext {
    /**
     * The app version from the build assets
     */

    readonly appVersion: string;
  }
}

export default await createHonoServer({
  getLoadContext(c, { build, mode }) {
    return {
      appVersion: IS_PRODUCTION ? build.assets.version : "dev",
    };
  },
  beforeAll: (app) => {},
});
