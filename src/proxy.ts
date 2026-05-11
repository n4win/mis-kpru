import { NextRequest, NextResponse } from "next/server";
// import { logger } from "@/lib/logger";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // logger.info(`Proxy request: ${pathname}`);

  return NextResponse.next();
}
