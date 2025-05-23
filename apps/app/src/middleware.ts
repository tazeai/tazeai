import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { checkSessionCookie } from "@tazeai/auth/middleware";
import { authConfig } from "@/config/auth";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images|locales|assets|favicon.ico|api/*).*)",
  ],
};

const publicRoutes = [
  authConfig.pages.signIn,
  authConfig.pages.signUp,
  authConfig.pages.forgotPassword,
  authConfig.pages.resetPassword,
  "/",
];

function setRequestId(request: Request) {
  request.headers.set("x-correlation-id", crypto.randomUUID());
}

export default async function middleware(request: NextRequest) {
  // setRequestId(request);
  // const response = NextResponse.next();
  // try {
  //   if (publicRoutes.includes(request.nextUrl.pathname)) {
  //     return response;
  //   }
  //   if (!checkSessionCookie(request)) {
  //     return NextResponse.redirect(new URL(authConfig.pages.signIn, request.url));
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.redirect(new URL(authConfig.pages.signIn, request.url));
  // }
  // return response;
}
