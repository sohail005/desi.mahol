import { NextResponse } from "next/server";

const ACTIVE_WINDOW_MS = 30_000;

declare global {
  // eslint-disable-next-line no-var
  var __desiMaholPresence: Map<string, number> | undefined;
}

const sessions = globalThis.__desiMaholPresence ?? new Map<string, number>();
globalThis.__desiMaholPresence = sessions;

function pruneAndCount(): number {
  const now = Date.now();
  for (const [id, lastSeen] of sessions) {
    if (now - lastSeen > ACTIVE_WINDOW_MS) sessions.delete(id);
  }
  return sessions.size;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId : null;
  if (sessionId) sessions.set(sessionId, Date.now());
  return NextResponse.json({ count: pruneAndCount() });
}

export async function GET() {
  return NextResponse.json({ count: pruneAndCount() });
}
