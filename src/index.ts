import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { tourismPackages } from "./routes/tourism-packages.js";
import { logger } from "hono/logger";
import { showRoutes } from "hono/dev";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/tourism-packages", tourismPackages);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

showRoutes(app, {
  verbose: true,
});

serve({
  fetch: app.fetch,
  port,
});
