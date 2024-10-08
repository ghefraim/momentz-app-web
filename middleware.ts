import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - $e (homepage)
     * - public/assets (assets folder)
     * - gallery/[id] (specific event page)
     * - api/ (API calls)
     * - api/* (API calls in subfolders)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|$|assets|error|confirm|gallery|join|api/webhook).*)",
  ],
};
