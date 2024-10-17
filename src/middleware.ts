import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("next-auth.session-token")?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/signIn")) {
    return Response.redirect(new URL("/signIn", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|recovery|create-account).*)",
  ],
};
