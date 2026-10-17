import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { px } from "@/data/img";

const VALUES = [
  { title: "Curation over clutter", text: "A small, considered range instead of an endless catalogue. Every piece earns its place." },
  { title: "Festive warmth, modern calm", text: "Indian celebration colours handled with restraint — warm, not loud." },
  { title: "Honest product information", text: "Materials, dimensions and contents stated plainly. Unconfirmed details are labelled, never guessed." },
  { title: "Built to grow", text: "Diwali is the launch season, not the limit — the range extends into year-round decor and gifting." },
];

export default function About() {
  return (
    <>
      <Seo
        title="Our Story — Noor & Vaani"
        description="Noor & Vaani is a curated Indian home decor and gifting brand — festive warmth with modern minimalism."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Our Story" }]} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="nv-eyebrow mb-2.5 text-saffron-dark">Our Story</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Beautiful things for celebrating at home
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Noor &amp; Vaani began as a simple observation: Indian homes celebrate more often than any store gives them credit for. Diwali, housewarmings, weddings, guests who stay a little longer — each deserves a home that feels warm without effort.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              We start with the festival of lights — diyas, lanterns, rangoli and gifts chosen with a decorator’s eye — and grow steadily into decor and accessories for the whole year. Nothing loud, nothing cluttered. Pieces you’ll reach for every celebration.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              This storefront is currently a design prototype: the catalogue, reviews and policies shown are clearly labelled sample data while the real business details are finalised.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line shadow-lift">
              <img src={px(7037689, 1200)} alt="An artisan block printing fabric by hand in a workshop" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="h-full">
              <div data-testid={`about-value-${i}`} className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="mb-4 inline-block h-1.5 w-1.5 rotate-45 bg-saffron" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-ink">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center lg:mt-24">
          <p className="nv-eyebrow mb-2.5 text-saffron-dark">The Festive Edit</p>
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Start with the lights
          </h2>
          <Link data-testid="about-cta" to="/collections/shop-all" className="mt-7 inline-flex rounded-full bg-saffron px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-saffron-dark">
            Shop the Collection
          </Link>
        </Reveal>
      </div>
    </>
  );
}
