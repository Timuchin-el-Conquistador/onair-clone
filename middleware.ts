import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./utils/session";
import { cookies } from "next/headers";
import { validateToken } from "./utils/session";

// 1. Specify protected and public routes
const protectedRoutes = [
  /^\/dashboard$/,
  // /^(\/[a-zA-Z0-9]+)?$/,
  /^\/calls$/,
  /^\/calls\/([a-zA-Z0-9]+)$/,
  // /^\/session\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)$/,
  /^\/settings$/,
  /^\/integrations$/,
  /^\/pages\/new$/,
  /^\/pages\/edit\/([a-zA-Z0-9]+)$/,
  /^\/billing$/,
  /^\/users\/sign_out$/,
];

const requireActiveSubscriptionRoutes = [
  /^\/dashboard$/,
  /^\/calls$/,
  /^\/calls\/([a-zA-Z0-9]+)$/,
  /^\/integrations$/,
  /^\/pages\/new$/,
  /^\/pages\/edit\/([a-zA-Z0-9]+)$/,
];

const publicRoutes = [/^\/users\/sign_in$/, /^\/users\/sign_up$/, /^\/$/];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const token = req.nextUrl.searchParams.get("token");

  if (token) {
    try {
      // Validate and extract user data from the token (replace with your actual token validation logic)
      const userData = await validateToken(token); // Your function to validate the token
      if (userData) {
        // Encrypt and set the session cookie
        const response = NextResponse.next();
        const session = await encrypt(userData);
        response.cookies.set("session", session);

        // Redirect to the dashboard or default authenticated page
        return response;
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      // Redirect to login on invalid token
      return NextResponse.redirect(new URL("/users/sign_in", req.nextUrl));
    }
  }
  // Check if the current route matches any protected route

  const isProtectedRoute = protectedRoutes.some((route) => route.test(path));

  // Check if the current route matches any public route
  const isPublicRoute = publicRoutes.some((route) => route.test(path));

  //check if the current route matches any route requiring subscription
  const isRouteRequireActiveSubscription = requireActiveSubscriptionRoutes.some(
    (route) => route.test(path)
  );

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/users/sign_in", req.nextUrl));
  }


  const isAccountActive =  session?.accountStatus == 'active'

  // 5. Redirect to /billing if the user is not authenticated
  if (isRouteRequireActiveSubscription && !isAccountActive) {
    return NextResponse.redirect(new URL("/billing", req.nextUrl));
  }
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.id &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
