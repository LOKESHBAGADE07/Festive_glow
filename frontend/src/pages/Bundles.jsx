import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import BundleCard from "@/components/BundleCard";
import FAQAccordion from "@/components/FAQAccordion";
import { BUNDLES } from "@/data/products";
import { DELIVERY_PROMISE } from "@/data/site";
import { inr } from "@/lib/format";

const WHY = [
  "Save 15–20% versus buying each piece separately",
  "One gift-ready delivery — everything arrives together",
  "Pairings chosen so the pieces layer, not compete",
  "Same 7-day easy returns on the whole bundle",
];

const BUNDLE_FAQ = [
  { q: "Can I change a product inside a bundle?", a: "Bundles are fixed pairings priced as one item. Add individual pieces to your bag separately if you'd like a different mix." },
  { q: "Which variants are included?", a: "Bundles ship in our signature finishes: Antique Brass lanterns, Festive Multicolour diyas, USB fairy lights, the standard toran and the Classic gift box." },
  { q: "Do bundles count toward free shipping?", a: "Yes — every bundle is above the ₹999 threshold, so shipping is free." },
];

export default function Bundles() {
  const maxSave = Math.max(...BUNDLES.map((b) => b.savings));
  return (
    <>
      <Seo title="Bundles — Noor & Vaani" description="Buy the festive essentials together and save up to 20%. Three curated bundles, one gift-ready delivery." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Shop", to: "/collections/shop-all" }, { label: "Bundles" }]} />
        <header className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="nv-eyebrow mb-3 text-saffron-dark">Buy together &amp; save</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">Three bundles. One decision.</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              We paired the five so you don’t have to. Pick the bundle that fits your home and save up to <strong className="text-ink">{inr(maxSave)}</strong>.
            </p>
          </div>
          <ul className="grid gap-2 lg:col-span-5">
            {WHY.map((w) => (
              <li key={w} className="flex items-start gap-2.5 text-sm text-ink">
                <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" /> {w}
              </li>
            ))}
          </ul>
        </header>

        <div data-testid="bundles-grid" className="mt-12 grid gap-6 lg:grid-cols-3">
          {BUNDLES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08} className="h-full">
              <BundleCard bundle={b} featured={!!b.badge} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          {DELIVERY_PROMISE.dispatch} · {DELIVERY_PROMISE.delivery} · {DELIVERY_PROMISE.returns}
        </p>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="nv-eyebrow mb-3 text-saffron-dark">Bundle questions</p>
            <h2 className="font-serif text-3xl font-semibold text-ink">Good to know</h2>
            <Link data-testid="bundles-shop-all" to="/collections/shop-all" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-saffron-dark">
              Prefer to pick individually? Shop the Five <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="rounded-2xl border border-line bg-white px-6 lg:col-span-7">
            <FAQAccordion items={BUNDLE_FAQ} testId="bundle-faq" />
          </div>
        </div>
      </div>
    </>
  );
}
