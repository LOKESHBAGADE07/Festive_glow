import { Link } from "react-router-dom";
import { BadgeCheck, Quote, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import RatingPreview from "@/components/RatingPreview";
import { PRODUCTS } from "@/data/products";
import { px } from "@/data/img";

const STATS = [
  { value: "4.8", label: "Average rating" },
  { value: "1,000+", label: "Sample reviews" },
  { value: "24h", label: "Dispatch promise" },
  { value: "7-day", label: "Easy returns" },
];

const REVIEWS = [
  { rating: 5, name: "Preview review", product: "p-lantern-set", text: "The cut-work patterns on the wall after dusk — that alone was worth it. Packaging felt like a boutique gift." },
  { rating: 5, name: "Preview review", product: "p-gift-box-classic", text: "Sent the gift box straight to my sister’s new flat with a note. She thought I’d spent hours wrapping it." },
  { rating: 4.5, name: "Preview review", product: "p-diyas-6", text: "Each diya is a little different and that’s the point. Lit all six on the threshold and the whole lane noticed." },
];

export default function SocialProof() {
  return (
    <section data-testid="social-proof" className="nv-grain relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="nv-eyebrow mb-3 text-gold">Loved in real homes</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Warm, considered pieces — <em className="italic text-gold">without</em> the clutter.
              </h2>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-light">
                <BadgeCheck size={13} /> Preview data — real reviews appear after launch
              </span>
              <dl className="mt-10 grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} data-testid={`stat-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                    <dt className="text-xs text-ivory/60">{s.label}</dt>
                    <dd className="mt-1 font-serif text-4xl font-semibold text-ivory">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {REVIEWS.map((r, i) => {
                const p = PRODUCTS.find((x) => x.id === r.product);
                return (
                  <Reveal key={i} delay={i * 0.08} className={i === 2 ? "sm:col-span-2" : ""}>
                    <figure data-testid={`review-card-${i}`} className="flex h-full flex-col rounded-2xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur-sm">
                      <Quote size={18} className="text-gold" aria-hidden="true" />
                      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ivory/90">“{r.text}”</blockquote>
                      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-ivory/10 pt-4">
                        <div>
                          <RatingPreview rating={r.rating} light />
                          <p className="mt-1 text-xs text-ivory/60">{r.name}</p>
                        </div>
                        <Link to={`/products/${p.handle}`} className="flex items-center gap-2 text-xs font-semibold text-gold-light hover:text-gold">
                          <img src={p.images[0].src} alt="" className="nv-photo h-9 w-9 rounded-lg object-cover" loading="lazy" />
                          <span className="hidden sm:inline">{p.name}</span>
                        </Link>
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal className="mt-20 grid items-center gap-8 rounded-[1.75rem] border border-ivory/10 bg-ivory/5 p-6 sm:p-8 lg:grid-cols-12">
          <div className="nv-photo-frame overflow-hidden rounded-2xl lg:col-span-5">
            <img src={px(39189948, 1000)} alt="Terracotta diyas stacked at the artisan workshop" loading="lazy" className="nv-photo aspect-[4/3] w-full object-cover" />
          </div>
          <div className="lg:col-span-7">
            <p className="nv-eyebrow mb-3 text-gold">Made by hand, chosen with care</p>
            <h3 className="font-serif text-2xl font-semibold leading-snug sm:text-3xl">Every diya is painted by a person. Every lantern is finished by hand.</h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base">
              We work with small artisan workshops and pay fairly for slow work. That’s why we make five things well instead of fifty things fast — and why each piece carries small, honest variations.
            </p>
            <Link data-testid="story-cta" to="/pages/about" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-light hover:text-gold">
              Read our story <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
