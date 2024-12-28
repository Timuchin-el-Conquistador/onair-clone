import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = [
  /^\/home$/,
  /^\/home(\/[a-zA-Z0-9]+)?$/,
  /^\/plans$/,
  /^\/about-app$/,
  /^\/edit$/,
  /^\/profile$/,
];
const publicRoutes = [/^\/login$/, /^\/signup$/, /^\/$/];
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname

  // Check if the current route matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    route.test(path)
  );

  // Check if the current route matches any public route
  const isPublicRoute = publicRoutes.some((route) =>
    route.test(path)
  );
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/home')
  ) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}