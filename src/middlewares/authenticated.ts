import type { MiddlewareHandler } from "hono";
import type { AppVariables } from "../types.js";
import { HTTPException } from "hono/http-exception";

export const authenticated: MiddlewareHandler<AppVariables> = (c, next) => {
  if (!c.get("user")) {
    throw new HTTPException(401, { message: "You are not authenticated" });
  }

  return next();
};
