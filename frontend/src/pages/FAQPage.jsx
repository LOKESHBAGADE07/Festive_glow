import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
import { FAQS } from "@/data/policies";

export default function FAQPage() {
  return (
    <>
      <Seo title="FAQ — Noor & Vaani" description="Answers about products, delivery, returns and order tracking." />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "FAQ" }]} />
        <div className="mt-8">
          <Reveal>
            <p className="nv-eyebrow mb-2.5 text-saffron-dark">Help Centre</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Frequently asked questions</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Answers below reflect demo configurations and are clearly marked where a detail is still to be confirmed before launch.
            </p>
          </Reveal>
          <div data-testid="faq-page-list" className="mt-8 rounded-2xl border border-line bg-white px-6 py-2 shadow-card">
            <FAQAccordion items={FAQS} testId="faq-page" />
          </div>
          <Reveal className="mt-10 rounded-2xl border border-gold/40 bg-gradient-to-br from-[#FFF3E0] to-ivory p-7 text-center">
            <h2 className="font-serif text-xl font-semibold text-ink">Still have a question?</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
              The contact form reaches the demo backend now and the real support inbox at launch.
            </p>
            <Link data-testid="faq-contact-cta" to="/pages/contact" className="mt-5 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-ivory hover:bg-saffron-dark transition-colors">
              Contact us
            </Link>
          </Reveal>
        </div>
      </div>
    </>
  );
}
