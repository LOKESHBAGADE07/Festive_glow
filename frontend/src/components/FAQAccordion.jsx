import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQAccordion({ items, testId = "faq" }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-line">
          <AccordionTrigger
            data-testid={`${testId}-trigger-${i}`}
            className="py-4 text-left text-[15px] font-semibold text-ink hover:no-underline hover:text-saffron-dark"
          >
            {item.q}
          </AccordionTrigger>
          <AccordionContent data-testid={`${testId}-content-${i}`} className="text-sm leading-relaxed text-ink-soft">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
