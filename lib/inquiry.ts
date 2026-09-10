import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email().max(254),
  company: z.string().max(160).optional(),
  website: z.union([z.literal(""), z.string().url()]).optional(),
  language: z.enum(["de", "en", "uk", "ru"]),
  services: z
    .array(z.enum(["google_ads", "chatgpt_ads"]))
    .min(1)
    .max(2)
    .refine((v) => new Set(v).size === v.length),
  offer: z.string().max(2000).optional(),
  market: z.string().max(200).optional(),
  budget: z.string().max(50).optional(),
  googleActive: z.string().max(10).optional(),
  chatgptActive: z.string().max(10).optional(),
  conversion: z.string().max(50).optional(),
  message: z.string().trim().min(10).max(5000),
  communication: z.string().max(30).optional(),
  handle: z.string().max(150).optional(),
  website_confirm: z.string().max(0),
});
export type Inquiry = z.infer<typeof inquirySchema>;
export class SubmissionUnavailable extends Error {}
export interface InquiryAdapter {
  submit(inquiry: Inquiry): Promise<{ reference: string }>;
}
// Replace this adapter with an authenticated mail/CRM provider on the server.
// No personal data is logged or persisted by the unconfigured adapter.
export const inquiryAdapter: InquiryAdapter = {
  async submit() {
    throw new SubmissionUnavailable("Delivery adapter is not configured");
  },
};
