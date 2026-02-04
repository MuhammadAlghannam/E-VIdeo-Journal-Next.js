import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

const publicPages = [
  "/",
  "/featured-videos",
  "/video",
  "/privacy-policy",
  "/contact-us",
  "/about-his",
  "/editorial-board",
];
const authPages = ["/login", "/sign-up", "/reset-password", "/forget-password"];

export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl;

  // ✅ Allow any /video/* as public (covers /video/:id, /video/serial/:id, etc.)
  const isAnyVideoRoute = pathname.startsWith("/video/");

  // 1. If authenticated and on an auth page, redirect to callbackUrl or "/"
  if (req.auth && authPages.includes(pathname)) {
    const cb = searchParams.get("callbackUrl") || "/";
    return NextResponse.redirect(new URL(cb, req.url));
  }

  // 2. If NOT authenticated and not on a public page or auth page or any /video/* route,
  //    redirect to "/login" with a callbackUrl to bring the user back after login
  if (
    !req.auth &&
    !publicPages.includes(pathname) &&
    !authPages.includes(pathname) &&
    !isAnyVideoRoute
  ) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href); // ✅ keep track of previous page
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, allow the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    "/login",
    "/sign-up",
    "/reset-password",
    "/forget-password",
    "/featured-videos",
    "/",
  ],
};
