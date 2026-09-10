"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { copy } from "@/lib/content/copy";
import type { Locale } from "@/lib/config";
export function FAQ({ lang }: { lang: Locale }) {
  const c = copy(lang);
  return (
    <section className="section wrap faq">
      <div>
        <p className="eyebrow">08 / FAQ</p>
        <h2>{c.faqTitle}</h2>
      </div>
      <Accordion type="single" collapsible>
        {c.faq.map(([q, a], i) => (
          <AccordionItem value={String(i)} key={q}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
