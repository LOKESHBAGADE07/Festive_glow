import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, MessagesSquare, ArrowRight, ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal, { MaskLines, EASE } from "@/components/Reveal";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES, BENEFITS } from "@/data/site";
import { px, us } from "@/data/img";

const HERO = px(6213685, 1800);
const BENEFIT_ICONS = { Truck, RotateCcw, ShieldCheck, MessagesSquare };
const TRENDING_IDS = ["p-lantern-set", "p-fairy-lights", "p-toran", "p-gift-box-classic", "p-diyas-6", "p-candle-set", "p-cushion-block-print", "p-rangoli-kit"];
const LED_IDS = ["p-lantern-set", "p-fairy-lights", "p-curtain-lights", "p-mesh-lantern"];

const INSPIRATION = [
  { img: px(30742031, 900), label: "Easy festive home styling", to: "/collections/decor" },
  { img: us("1716972525891-66600001e470", 900), label: "Diwali gifting ideas", to: "/collections/gifts" },
  { img: us("1616308913689-cb92c5bea67e", 900), label: "Creating a warm pooja corner", to: "/collections/lights" },
  { img: us("1733499625839-267296a7457b", 900), label: "Small-home decoration ideas", to: "/collections/apparel" },
];

const PREVIEW_REVIEWS = [
  { rating: 5, text: "The packaging felt like unwrapping a gift from a boutique — this is exactly how our living room should glow this time of year." },
  { rating: 4.5, text: "A lovely, calm shopping experience. Everything looked like the photos, and the hamper styling ideas were genuinely useful." },
  { rating: 5, text: "Warm, considered pieces without the clutter. I would love to see how the collection grows beyond the festival." },
];

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const scale = useTransform(scrollY, [0, 700], [1.08, 1.18]);
  return (
    <section data-testid="hero" className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink lg:min-h-[96svh]">
      <motion.div style={reduce ? undefined : { y, scale }} className="absolute inset-0 will-change-transform">
        <img
          src={HERO}
          alt="Lit diyas and marigold flowers in a warm festive setting"
          fetchpriority="high"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#171208]/90 via-[#29251F]/45 to-[#29251F]/15" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-24">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="nv-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-ivory/30 bg-ivory/10 px-4 py-2 text-gold-light backdrop-blur-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-saffron" aria-hidden="true" />
          Festive Decor &amp; Gift Sale
        </motion.p>
        <MaskLines
          lines={[
            <>Illuminate</>,
            <>Your <em className="italic text-gold">Diwali</em></>,
          ]}
          className="max-w-4xl font-serif text-[13.5vw] font-semibold leading-[0.98] tracking-tight text-ivory sm:text-7xl lg:text-8xl"
          delay={0.25}
        />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-ivory/85 sm:text-lg"
        >
          Bring home the warmth of celebration with thoughtfully curated lights, decor, and gifts.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            data-testid="hero-cta-shop"
            to="/collections/shop-all"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lift transition-all hover:bg-saffron-dark"
          >
            Shop Diwali Collection
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            data-testid="hero-cta-gifts"
            to="/collections/gifts"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
          >
            Explore Gift Hampers
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section data-testid="benefits" className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-14">
        {BENEFITS.map((b, i) => {
          const Icon = BENEFIT_ICONS[b.icon];
          return (
            <Reveal key={b.title} delay={i * 0.06} className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory border border-line text-saffron-dark">
                <Icon size={19} />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{b.title}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{b.note}</span>
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <Reveal>
        <p className="nv-eyebrow mb-2.5 text-saffron-dark">{eyebrow}</p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </div>
  );
}

function Categories() {
  return (
    <section data-testid="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <SectionHead eyebrow="Shop by Category" title="Four ways to make it festive">
        <Reveal delay={0.1}>
          <Link to="/collections/shop-all" data-testid="categories-view-all" className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-saffron-dark">
            View all <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </SectionHead>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.handle} delay={i * 0.07} className="h-full">
            <Link
              to={`/collections/${c.handle}`}
              data-testid={`category-card-${c.handle}`}
              className="group relative block h-full overflow-hidden rounded-xl border border-line bg-ink shadow-card transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.image} alt={`${c.name} collection`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ivory sm:text-xl">{c.name}</h3>
                  <p className="mt-0.5 hidden text-xs text-ivory/75 sm:block">{c.short}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur-sm transition-all group-hover:bg-saffron group-hover:text-white">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Trending() {
  const items = TRENDING_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  return (
    <section data-testid="trending" className="border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHead eyebrow="Trending Now" title="The festive favourites">
          <Reveal delay={0.1}>
            <Link to="/collections/shop-all" data-testid="trending-view-all" className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-saffron-dark">
              Shop all products <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </SectionHead>
        <p className="-mt-4 mb-8 text-xs text-ink-soft sm:-mt-6 sm:mb-10">
          Catalogue examples for design preview — not claims about market trends.
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftEditorial() {
  return (
    <section data-testid="gift-hampers" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-2xl border border-line shadow-lift">
            <img src={px(17878238, 1200)} alt="Decorative gift hamper basket with curated treats" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-3 hidden w-44 overflow-hidden rounded-xl border-4 border-ivory shadow-lift sm:block lg:-right-8 lg:w-56">
            <img src={px(28769885, 800)} alt="Elegant gift box tied for gifting" loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="nv-eyebrow mb-2.5 text-saffron-dark">The Gifting Atelier</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Gifts that feel <em className="italic text-saffron-dark">chosen</em>, not just bought
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Our hampers gather warm, considered pieces into presentation-ready boxes — for the host who has everything, the new home, and the festival you plan for weeks ahead.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-7 space-y-3.5">
              {[
                "Curated assortments for every budget",
                "Presentation packaging, ribbon and gift tag",
                "Full contents and ingredient details listed on every product page",
                "Gift notes supported at Shopify checkout when live",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-saffron" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link data-testid="gift-editorial-cta" to="/collections/gifts" className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-ivory transition-colors hover:bg-saffron-dark">
                Explore Gifts &amp; Hampers <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link data-testid="gift-editorial-secondary" to="/products/noor-celebration-hamper-signature" className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink hover:border-saffron hover:text-saffron-dark">
                See the Signature Hamper
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LightingSpotlight() {
  const items = LED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  return (
    <section data-testid="lighting-spotlight" className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="nv-eyebrow mb-2.5 text-gold">LED Lighting</p>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Light, layered the way festivals ask for
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-ivory/70 sm:text-base">
              Fairy lights, curtain lights and lanterns that carry the glow — practical details like length and power source are listed on every product page.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06} className="h-full">
              <ProductCard product={p} dark />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inspiration() {
  return (
    <section data-testid="inspiration" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <SectionHead eyebrow="Festive Inspiration" title="Make Every Corner Feel Festive" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INSPIRATION.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.07} className="h-full">
            <Link
              to={item.to}
              data-testid={`inspiration-card-${i}`}
              className="group relative block h-full overflow-hidden rounded-xl border border-line shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img src={item.img} alt={item.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                <p className="font-serif text-[17px] font-medium leading-snug text-ivory">{item.label}</p>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur-sm transition-colors group-hover:bg-gold group-hover:text-ink">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section data-testid="testimonials" className="border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHead eyebrow="Kind Words" title="What we hope customers say" />
        <Reveal>
          <p data-testid="testimonials-preview-note" className="-mt-4 mb-8 inline-flex rounded-full border border-gold/50 bg-gold/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-saffron-dark sm:-mt-6 sm:mb-10">
            Preview content — sample layout, not real customer reviews
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {PREVIEW_REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <figure data-testid={`preview-review-${i}`} className="flex h-full flex-col rounded-2xl border border-line bg-ivory p-6">
                <div className="mb-4 flex gap-0.5 text-saffron" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s < Math.floor(r.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-ink">“{r.text}”</blockquote>
                <figcaption className="mt-5 text-xs font-semibold text-ink-soft">Preview review</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterPanel() {
  return (
    <section data-testid="newsletter-panel" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-[#FFF3E0] to-ivory px-6 py-12 text-center sm:px-12 lg:py-16">
          <span className="absolute left-6 top-6 hidden h-1.5 w-1.5 rotate-45 bg-gold sm:block" aria-hidden="true" />
          <span className="absolute right-6 top-6 hidden h-1.5 w-1.5 rotate-45 bg-gold sm:block" aria-hidden="true" />
          <span className="absolute bottom-6 left-6 hidden h-1.5 w-1.5 rotate-45 bg-gold sm:block" aria-hidden="true" />
          <span className="absolute bottom-6 right-6 hidden h-1.5 w-1.5 rotate-45 bg-gold sm:block" aria-hidden="true" />
          <p className="nv-eyebrow mb-2.5 text-saffron-dark">The Noor &amp; Vaani Letter</p>
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Decor ideas, gifting inspiration &amp; first access to new drops
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
            One thoughtful email a fortnight. No noise, unsubscribe anytime.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <NewsletterForm source="homepage" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section data-testid="final-cta" className="relative overflow-hidden bg-ink">
      <img src={px(37650548, 1600)} alt="A line of lit diyas on an altar with vibrant flowers" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-ivory sm:text-4xl lg:text-5xl">
            Make every celebration feel special
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ivory/80">
            Thoughtfully chosen decor and gifts — for Diwali, and for every warm corner of the year after it.
          </p>
          <Link data-testid="final-cta-shop" to="/collections/shop-all" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold">
            Shop the Collection <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Noor & Vaani — Illuminate Your Diwali | Festive Decor & Gift Sale"
        description="Shop thoughtfully curated festive decor and gifts — diyas, lanterns, fairy lights, rangoli kits and Diwali gift hampers for every Indian celebration."
      />
      <Hero />
      <Marquee items={["Illuminate Your Diwali", "Festive Decor & Gift Sale", "Curated gift hampers", "Thoughtfully chosen, beautifully made", "Free shipping over ₹999*"]} />
      <Benefits />
      <Categories />
      <Trending />
      <GiftEditorial />
      <LightingSpotlight />
      <Inspiration />
      <Testimonials />
      <NewsletterPanel />
      <FinalCta />
    </>
  );
}
