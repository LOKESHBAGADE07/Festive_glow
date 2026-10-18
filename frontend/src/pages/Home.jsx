import { Link } from "react-router-dom";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, MessagesSquare, Gift } from "lucide-react";
import Seo from "@/components/Seo";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import CompareTable from "@/components/CompareTable";
import BundleCard from "@/components/BundleCard";
import FAQAccordion from "@/components/FAQAccordion";
import NewsletterForm from "@/components/NewsletterForm";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import SocialProof from "@/components/home/SocialProof";
import { BUNDLES } from "@/data/products";
import { BENEFITS, WELCOME_OFFER } from "@/data/site";
import { FAQS } from "@/data/policies";
import { us } from "@/data/img";

const BENEFIT_ICONS = { Truck, RotateCcw, ShieldCheck, MessagesSquare };
const MARQUEE = ["Dispatches in 24 hours", "Free shipping over ₹999", "7-day easy returns", "Artisan-made", "Gift-boxed, always", "Five pieces, no filler"];

function SectionHead({ eyebrow, title, copy, align = "left", dark = false }) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`nv-eyebrow mb-3 ${dark ? "text-gold" : "text-saffron-dark"}`}>{eyebrow}</p>
      <h2 className={`font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${dark ? "text-ivory" : "text-ink"}`}>{title}</h2>
      {copy && <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dark ? "text-ivory/75" : "text-ink-soft"}`}>{copy}</p>}
    </Reveal>
  );
}

function Benefits() {
  return (
    <section data-testid="benefits" className="border-y border-line bg-white">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line lg:grid-cols-4">
        {BENEFITS.map((b, i) => {
          const Icon = BENEFIT_ICONS[b.icon];
          return (
            <li key={b.title} className={`flex items-start gap-3 px-4 py-6 sm:px-6 lg:px-8 ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron-dark"><Icon size={18} /></span>
              <div>
                <p className="text-sm font-bold text-ink">{b.title}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{b.note}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Compare() {
  return (
    <section data-testid="compare-section" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead eyebrow="Which one is for you?" title="Not sure where to start? Compare the five." copy="Every piece works alone. Together they cover the doorway, the console and the pooja corner." />
          <Reveal delay={0.1}>
            <Link data-testid="compare-bundle-link" to="/bundles" className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-ivory">
              Still unsure? Start with a bundle <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <Reveal className="mt-12" delay={0.1}>
          <CompareTable />
        </Reveal>
      </div>
    </section>
  );
}

function Bundles() {
  return (
    <section data-testid="bundles-section" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead eyebrow="Buy together & save" title="Three bundles. One decision." copy="We've done the pairing for you. Every bundle saves 15–20% versus buying separately — and arrives in one gift-ready delivery." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {BUNDLES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08} className="h-full">
              <BundleCard bundle={b} featured={!!b.badge} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gifting() {
  return (
    <section data-testid="gifting-section" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <Reveal className="lg:col-span-6">
          <div className="nv-photo-frame relative overflow-hidden rounded-[1.75rem]">
            <img src={us("1592903297149-37fb25202dfa", 1400)} alt="Marbled keepsake gift box tied with a satin ribbon" loading="lazy" className="nv-photo aspect-[4/5] w-full object-cover sm:aspect-[5/4]" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink backdrop-blur-sm"><Gift size={12} /> Free gift note</span>
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <SectionHead eyebrow="Gifting, solved" title="Arrives wrapped. Lands well. Every time." copy="Every piece ships gift-boxed with tissue wrap and a free handwritten note. Send it straight to them — we leave out the price slip." />
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link data-testid="gifting-cta" to="/collections/gifting" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-bold uppercase tracking-widest text-ivory transition-colors hover:bg-saffron-dark">
              Shop gifting <ArrowRight size={15} />
            </Link>
            <Link data-testid="gifting-box-cta" to="/products/curated-diwali-gift-box-classic" className="inline-flex h-13 items-center justify-center rounded-full border border-ink/20 px-7 text-sm font-semibold text-ink transition-colors hover:border-ink">
              See the gift box
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section data-testid="faq-section" className="bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Before you decide" title="The questions everyone asks." copy="Delivery, returns, safety, gifting — answered honestly." />
          <Reveal delay={0.1}>
            <Link data-testid="faq-all-link" to="/pages/faq" className="mt-6 inline-flex text-sm font-bold text-saffron-dark underline underline-offset-4">See all FAQs</Link>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="rounded-2xl border border-line bg-white px-6 lg:col-span-7">
          <FAQAccordion items={FAQS.slice(0, 5)} testId="home-faq" />
        </Reveal>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section data-testid="offer-section" className="nv-grain relative overflow-hidden bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-6">
          <SectionHead dark eyebrow="Welcome offer" title={WELCOME_OFFER.headline} copy="Join the list and we'll send your code instantly — plus early access to the next edit before it's public." />
        </div>
        <Reveal delay={0.1} className="rounded-2xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur-sm lg:col-span-6 [&_input]:bg-ivory [&_p]:text-ivory/60">
          <NewsletterForm source="home-offer" />
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section data-testid="final-cta" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <p className="nv-eyebrow mb-3 text-saffron-dark">Ready when you are</p>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Light the house. <em className="italic text-saffron-dark">Keep it lit.</em>
          </h2>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link data-testid="final-cta-shop" to="/collections/shop-all" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-saffron px-9 text-sm font-bold uppercase tracking-widest text-white shadow-lift transition-colors hover:bg-saffron-dark">
              Shop the Five <ArrowRight size={16} />
            </Link>
            <Link data-testid="final-cta-bundles" to="/bundles" className="inline-flex h-13 items-center justify-center rounded-full border border-ink px-9 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-ivory">
              See bundles
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Noor & Vaani — Five pieces. One glowing home."
        description="Artisan diyas, brass cut-work lanterns, warm fairy lights, a marigold toran and one perfect gift box. Five festive essentials, dispatched in 24 hours."
      />
      <HeroSection />
      <Marquee items={MARQUEE} />
      <Benefits />
      <ProductShowcase />
      <Compare />
      <Bundles />
      <SocialProof />
      <Gifting />
      <Faq />
      <Offer />
      <FinalCta />
    </>
  );
}
