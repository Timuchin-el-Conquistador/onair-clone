import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./utils/session";
import { cookies } from "next/headers";
import { validateToken } from "./utils/session";

//all routes
const routes = [
  /^\/dashboard$/,
  /^\/embed$/,
  /^\/embed\/([a-zA-Z0-9\-]+)$/,
  /^\/([a-zA-Z0-9\-]+)$/,
  /^\/calls$/,
  /^\/calls\/([a-zA-Z0-9\-]+)$/,
  /^\/calls\/([a-zA-Z0-9\-]+)\/recording$/,
  /^\/calls\/([a-zA-Z0-9\-]+)\/voicemail$/,
  /^\/session\/([a-zA-Z0-9\-]+)\/([a-zA-Z0-9\-]+)$/,
  /^\/settings$/,
  /^\/integrations$/,
  /^\/integrations\/new$/,
  /^\/integrations\/new\/mobile$/,
  /^\/integrations\/new\/shopify$/,
  /^\/integrations\/update$/,
  /^\/integrations\/update\/([a-zA-Z0-9\-]+)$/,
  /^\/pages\/new$/,
  /^\/pages\/edit\/([a-zA-Z0-9\-]+)$/,
  /^\/billing$/,
  /^\/billing\/choose_plan$/,
  /^\/users\/sign_out$/,
  /^\/subscription\/failed$/,
  /^\/subscription\/success$/,
  /^\/users$/,
  /^\/users\/sign_in$/,
  /^\/users\/confirmation$/,
  /^\/users\/password\/edit$/,
  /^\/users\/password\/new$/,
  /^\/users\/sign_up$/,
  /^\/$/,
];
// protected
const protectedRoutes = [
  /^\/dashboard$/,
  /^\/embed$/,
  /^\/embed\/([a-zA-Z0-9\-]+)$/,
  /^\/calls$/,
  /^\/calls\/([a-zA-Z0-9\-]+)$/,
  /^\/calls\/([a-zA-Z0-9\-]+)\/recording$/,
  /^\/calls\/([a-zA-Z0-9\-]+)\/voicemail$/,
  /^\/settings$/,
  /^\/integrations$/,
  /^\/integrations\/new$/,
  /^\/integrations\/new\/mobile$/,
  /^\/integrations\/new\/shopify$/,
  /^\/integrations\/update$/,
  /^\/integrations\/update\/([a-zA-Z0-9\-]+)$/,
  /^\/pages\/new$/,
  /^\/pages\/edit\/([a-zA-Z0-9\-]+)$/,
  /^\/billing$/,
  /^\/billing\/choose_plan$/,
  /^\/users\/sign_out$/,
  /^\/subscription\/failed$/,
  /^\/subscription\/success$/,
];
//public
const publicRoutes = [
  /^\/users$/,
  /^\/users\/sign_in$/,
  /^\/users\/confirmation$/,
  /^\/users\/password\/edit$/,
  /^\/users\/password\/new$/,
  /^\/users\/sign_up$/,
  /^\/$/,
];

//to show these routesuser must have activesubscription
const requireActiveSubscriptionRoutes = [
  /^\/dashboard$/,
  /^\/embed$/,
  /^\/embed\/([a-zA-Z0-9\-]+)$/,
  /^\/calls$/,
  /^\/calls\/([a-zA-Z0-9\-]+)$/,
  /^\/calls\/([a-zA-Z0-9\-]+)\/recording$/,
  /^\/calls\/([a-zA-Z0-9\-]+)\/voicemail$/,
  /^\/integrations$/,
  /^\/integrations\/new$/,
  /^\/integrations\/new\/mobile$/,
  /^\/integrations\/new\/shopify$/,
  /^\/integrations\/update$/,
  /^\/integrations\/update\/([a-zA-Z0-9\-]+)$/,
  /^\/pages\/new$/,
  /^\/pages\/edit\/([a-zA-Z0-9\-]+)$/,
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
 // const token = req.nextUrl.searchParams.get("token");
  const shopifyToken = req.nextUrl.searchParams.get("shopify_token");
  /*if (token) {
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
      // Redirect to login on invalid token
      return NextResponse.redirect(new URL("/users/sign_in", req.nextUrl));
    }
  }*/
  if (shopifyToken) {
    try {
      // Validate and extract user data from the token (replace with your actual token validation logic)
      //const shop = await validateToken(shopifyToken); // Your function to validate the token
      //    if (shop) {
      // Encrypt and set the session cookie
      const response = NextResponse.next();
      //const session = await encrypt(shop);
      response.cookies.set("shopify", shopifyToken);

      // Redirect to the dashboard or default authenticated page
      return response;
      //     }
    } catch (error) {
      // Redirect to login on invalid token
      return NextResponse.redirect(new URL("/users/sign_in", req.nextUrl));
    }
  }

  // Check if the current route matches any public route
  const isPublicRoute = publicRoutes.some((route) => route.test(path));

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Check if the current route matches any protected route

  const isProtectedRoute = protectedRoutes.some((route) => route.test(path));

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/users/sign_in", req.nextUrl));
  }

  const isSubscriptionStatusActive =
    session?.subscriptionStatus == "active" ||
    session?.subscriptionStatus == "trialing";
  // 5. Redirect to /billing if the user is not authenticated

  //check if the current route matches any route requiring subscription
  const isRouteRequireActiveSubscription = requireActiveSubscriptionRoutes.some(
    (route) => route.test(path)
  );

  if (isRouteRequireActiveSubscription && !isSubscriptionStatusActive) {
    return NextResponse.redirect(new URL("/billing", req.nextUrl));
  }
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Skip middleware for static assets like images, fonts, or API requests
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.match(/\.(png|jpg|jpeg|svg|css|js|ico)$/)
  ) {
    return NextResponse.next();
  }

  //check if rout eexist
  const isRouteExist = routes.some((route) => route.test(path));
  if (!isRouteExist) {
    return NextResponse.rewrite(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
