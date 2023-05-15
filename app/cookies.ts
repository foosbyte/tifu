import { createCookie } from "@remix-run/node";

export const colorScheme = createCookie("color-scheme", {
  maxAge: 60 * 60 * 24 * 365,
});
