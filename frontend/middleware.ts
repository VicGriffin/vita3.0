import { authMiddleware } from "@clerk/nextjs/server";

export const runtime = "experimental-edge";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/login",  // Adjusted to match the correct login path
    "/signup", // Adjust if you have a signup page
    "/app/api/webhooks/clerk",
    "/app/api/webhooks/stripe",
  ],

  // Routes that can be accessed by signed-in and signed-out users
  ignoredRoutes: [
    "/api/public",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",  // Match everything except static files
    "/",                             // Home page
    "/(api|trpc)(.*)",               // Match API routes
  ],
};
