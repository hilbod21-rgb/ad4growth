import { inquiryAdapter } from "@/lib/inquiry-delivery";
import {
  inquirySchema,
  SubmissionUnavailable,
} from "@/lib/inquiry";
const attempts = new Map<string, { count: number; reset: number }>();
export const runtime = "nodejs";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== (process.env.SITE_ORIGIN || `${new URL(request.url).protocol}//${request.headers.get("host") || new URL(request.url).host}`))
    return Response.json({ error: "origin" }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 20000)
    return Response.json({ error: "size" }, { status: 413 });
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const validated = inquirySchema.safeParse(data);
  if (!validated.success)
    return Response.json({ error: "validation" }, { status: 422 });
  // Trust this header only when the documented reverse proxy overwrites it.
  const client = process.env.TRUST_PROXY === "1" ? request.headers.get("x-real-ip") || "unknown" : "local";
  const now = Date.now();
  for (const [key, value] of attempts) if (value.reset < now) attempts.delete(key);
  const rate = attempts.get(client) || {count: 0, reset: now + 600000};
  if (rate.count >= 5 || attempts.size > 10000) return Response.json({error:"rate_limit"}, {status:429, headers:{"Retry-After":"600"}});
  rate.count++;
  attempts.set(client, rate);
  try {
    const receipt = await inquiryAdapter.submit(validated.data);
    return Response.json(
      { ok: true, reference: receipt.reference },
      { status: 201 },
    );
  } catch (e) {
    return Response.json(
      {
        error: e instanceof SubmissionUnavailable ? "unconfigured" : "delivery",
      },
      { status: 503 },
    );
  }
}
