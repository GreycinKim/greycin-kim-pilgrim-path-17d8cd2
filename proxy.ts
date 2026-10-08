import { NextResponse, type NextRequest } from "next/server"
import { decryptSession } from "@/lib/session-crypto"

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = await decryptSession(request.cookies.get("session")?.value)
  const signedIn = Boolean(session?.userId)

  if (path.startsWith("/journal") && !signedIn) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (path === "/" && signedIn) {
    return NextResponse.redirect(new URL("/journal", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|maps/|.*\\.(?:jpg|jpeg|png|svg|webp|ico)$).*)",
  ],
}
