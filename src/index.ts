import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { tourismPackages } from "./routes/tourism-packages.js";
import { logger } from "hono/logger";
import { showRoutes } from "hono/dev";
import { cors } from "hono/cors";
import { auth } from "./auth.js";

const app = new Hono();

app.use(logger());

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Hello traveler");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

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
