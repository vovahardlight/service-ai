import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recentRequests = (requestsByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, message, website } = body as Record<string, unknown>;
  // Quietly accept honeypot submissions without sending them.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true });
  }
  if (
    typeof email !== "string" ||
    !isValidEmail(email.trim()) ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.trim().length > 5000
  ) {
    return NextResponse.json({ error: "Check the email address and message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email.trim(),
        subject: "New website inquiry",
        text: `Reply to: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!delivery.ok) {
      return NextResponse.json({ error: "Email provider rejected the message" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Email provider is unavailable" }, { status: 502 });
  }
}
