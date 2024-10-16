import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  console.log(token);

  const signInURL = new URL("/", request.url);
  const financeDashboard = new URL("/finance-dashboard", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }
    return NextResponse.redirect(signInURL);
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(financeDashboard);
  }
}

export const config = {
  matcher: ["/", "/finance-dashboard"],
};
