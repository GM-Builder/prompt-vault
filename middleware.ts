import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoutes = createRouteMatcher([
  "/dashboard-success(.*)",
  "/admin(.*)",
  "/api/admin(.*)",
  "/api/webhooks(.*)"
]);

export default clerkMiddleware(async (authFn, req) => {
  // Izinkan halaman publik tanpa cek auth
  if (isPublicRoutes(req)) {
    return NextResponse.next();
  }

  if (isDashboardRoute(req)) {
    // 1. Dapatkan Authentication object
    const auth = await authFn();
    if (!auth.userId) {
      return auth.redirectToSignIn({ returnBackUrl: req.url });
    }

    // 2. Baca metadata "isPaid" dari Clerk session claims
    const metadata = auth.sessionClaims?.publicMetadata || auth.sessionClaims?.metadata;
    console.log("Session claims:", auth.sessionClaims);
    console.log("Parsed metadata:", metadata);
    const isPaid = (metadata as any)?.isPaid === true;

    // 3. Jika belum bayar, arahkan ke halaman payment
    if (!isPaid) {
      return NextResponse.redirect(new URL("/payment", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
