import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the path the user is trying to access
  const path = request.nextUrl.pathname

  // Define which paths are considered public (don't require authentication)
  const isPublicPath =
    path === "/" || path === "/login" || path === "/signup" || path.startsWith("/_next") || path.startsWith("/api")

  // Check if the user is authenticated by looking for the auth token
  const isAuthenticated = request.cookies.has("auth-token")

  // If the user is trying to access a protected route without being authenticated,
  // redirect them to the login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is authenticated and trying to access login/signup pages,
  // redirect them to the dashboard
  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Otherwise, continue with the request
  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

