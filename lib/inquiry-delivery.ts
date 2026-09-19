import type { Inquiry, InquiryAdapter } from "./inquiry";
import { SubmissionUnavailable } from "./inquiry";

// Server-only module: never imported by the contact form.
export const inquiryAdapter: InquiryAdapter = {
  async submit(inquiry: Inquiry) {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.INQUIRY_FROM;
    const to = process.env.INQUIRY_TO;
    if (process.env.INQUIRY_DELIVERY === "cloudflare") {
      const { env } = await import("cloudflare:workers");
      const bindings = env as unknown as {
        INQUIRY_EMAIL?: { send(message: { from: string; to: string; replyTo: string; subject: string; text: string }): Promise<{ messageId: string }> };
        INQUIRY_DESTINATION?: string;
      };
      if (!bindings.INQUIRY_EMAIL || !bindings.INQUIRY_DESTINATION)
        throw new SubmissionUnavailable("Email binding is not configured");
      const receipt = await bindings.INQUIRY_EMAIL.send({
        from: "contact@ad4growth.com",
        to: bindings.INQUIRY_DESTINATION,
        replyTo: inquiry.email,
        subject: `AD4GROWTH Anfrage · ${inquiry.services.join(" + ")}`,
        text: Object.entries(inquiry).filter(([k]) => k !== "website_confirm")
          .map(([k,v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n\n"),
      });
      if (!receipt?.messageId) throw new Error("Missing email receipt");
      return { reference: receipt.messageId };
    }
    if (!key || !from || !to) throw new SubmissionUnavailable("Email delivery is not configured");
    const reference = crypto.randomUUID();
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": reference },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from, to: [to], reply_to: inquiry.email,
        subject: `AD4GROWTH Anfrage · ${inquiry.services.join(" + ")}`,
        text: Object.entries(inquiry).filter(([k]) => k !== "website_confirm").map(([k,v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n\n"),
      }),
    });
    if (!response.ok) throw new Error("Email provider rejected the inquiry");
    const result = await response.json() as { id?: string };
    if (!result.id) throw new Error("Missing provider receipt");
    return { reference };
  },
};
