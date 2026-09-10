import {
  inquiryAdapter,
  inquirySchema,
  SubmissionUnavailable,
} from "@/lib/inquiry";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
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
  // Add a rate-limit and bot-verification adapter before enabling delivery.
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
