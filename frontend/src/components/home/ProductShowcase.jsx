import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Truck, RotateCcw } from "lucide-react";
import Reveal from "@/components/Reveal";
import RatingPreview from "@/components/RatingPreview";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, defaultVariant } from "@/data/products";
import { DELIVERY_PROMISE } from "@/data/site";
import { inr } from "@/lib/format";

function ShowcaseItem({ product, index }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { addToCart } = useStore();
  const [adding, setAdding] = useState(false);
  const variant = defaultVariant(product);
  const flip = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const pct = variant.compareAt ? Math.round(((variant.compareAt - variant.price) / variant.compareAt) * 100) : 0;

  const add = () => {
    if (adding) return;
    setAdding(true);
    setTimeout(() => { addToCart(product, variant, 1); setAdding(false); }, 400);
  };

  return (
    <article
      ref={ref}
      data-testid={`showcase-${product.handle}`}
      className="grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24"
    >
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Reveal>
          <Link to={`/products/${product.handle}`} className="group block" data-testid={`showcase-image-link-${product.handle}`}>
            <div className="nv-photo-frame relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-secondary sm:aspect-[5/4] lg:aspect-[4/5]">
              <motion.img
                src={product.images[0].src}
                alt={product.images[0].alt}
                loading={index === 0 ? "eager" : "lazy"}
                style={reduce ? undefined : { y: imgY }}
                className="nv-photo absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute left-5 top-5 rounded-full bg-ivory/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink backdrop-blur-sm">
                {product.badge}
              </span>
              <div className="absolute bottom-5 left-5 hidden gap-2 sm:flex">
                {product.images.slice(1, 4).map((im, i) => (
                  <img key={i} src={im.src} alt="" loading="lazy" className="nv-photo h-14 w-14 rounded-xl border border-ivory/60 object-cover shadow-card" />
                ))}
              </div>
            </div>
          </Link>
        </Reveal>
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal delay={0.1}>
          <p className="nv-index flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-saffron-dark">
            <span className="font-serif text-2xl italic tracking-normal text-gold">0{index + 1}</span>
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            {product.kicker}
          </p>
          <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {product.name}
            <span className="block text-xl font-normal italic text-ink-soft sm:text-2xl">{product.short}</span>
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">{product.benefit}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {product.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink">
                <Check size={12} className="text-success" aria-hidden="true" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-1">
            <span data-testid={`showcase-price-${product.handle}`} className="font-serif text-4xl font-semibold text-ink">{inr(variant.price)}</span>
            {variant.compareAt && (
              <>
                <span className="pb-1 text-base text-ink-soft line-through">{inr(variant.compareAt)}</span>
                <span className="mb-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success">Save {pct}%</span>
              </>
            )}
          </div>
          <div className="mt-1">
            <RatingPreview rating={product.rating} count={product.reviewCount} />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              data-testid={`showcase-add-${product.handle}`}
              onClick={add}
              disabled={adding}
              className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-bold uppercase tracking-widest text-ivory shadow-card transition-all hover:bg-saffron-dark active:scale-[0.98] disabled:opacity-70"
            >
              {adding ? <><Loader2 size={15} className="animate-spin" /> Adding…</> : `Add to Cart · ${inr(variant.price)}`}
            </button>
            <Link
              data-testid={`showcase-view-${product.handle}`}
              to={`/products/${product.handle}`}
              className="group inline-flex h-13 items-center justify-center gap-1.5 rounded-full border border-ink/20 px-6 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Details <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5"><Truck size={12} className="text-saffron-dark" /> {DELIVERY_PROMISE.dispatch}</span>
            <span className="inline-flex items-center gap-1.5"><RotateCcw size={12} className="text-saffron-dark" /> {DELIVERY_PROMISE.returns}</span>
          </p>
        </Reveal>
      </div>
    </article>
  );
}

export default function ProductShowcase() {
  return (
    <section id="the-five" data-testid="showcase" className="relative bg-ivory">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <Reveal className="max-w-2xl">
          <p className="nv-eyebrow mb-3 text-saffron-dark">Meet the five</p>
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            We said no to a hundred products so we could say <em className="italic text-saffron-dark">yes</em> to these.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Each one is chosen to layer with the others — so whether you buy one or all five, your home comes together without feeling staged.
          </p>
        </Reveal>
        <div className="mt-6 divide-y divide-line">
          {PRODUCTS.map((p, i) => (
            <ShowcaseItem key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
