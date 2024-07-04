import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/actions/auth-actions";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
