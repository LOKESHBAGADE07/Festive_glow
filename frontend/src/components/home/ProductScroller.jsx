import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import RatingPreview from "@/components/RatingPreview";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, defaultVariant } from "@/data/products";
import { DELIVERY_PROMISE } from "@/data/site";
import { inr } from "@/lib/format";
import { useStageFlags } from "@/components/home/HeroSection";

const ProductStage = lazy(() => import("@/components/three/ProductStage"));

function Panel({ product, index, onActive }) {
  const ref = useRef(null);
  const { addToCart } = useStore();
  const [adding, setAdding] = useState(false);
  const variant = defaultVariant(product);
  const pct = variant.compareAt ? Math.round(((variant.compareAt - variant.price) / variant.compareAt) * 100) : 0;

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onActive(product.model); }, { rootMargin: "-45% 0px -45% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onActive, product.model]);

  const add = () => {
    if (adding) return;
    setAdding(true);
    setTimeout(() => { addToCart(product, variant, 1); setAdding(false); }, 350);
  };

  return (
    <article ref={ref} data-testid={`showcase-${product.handle}`} className="flex min-h-[70svh] flex-col justify-center py-10 lg:min-h-[78svh]">
      <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
        <span className="font-serif text-xl italic font-light tracking-normal text-gold-light">0{index + 1}</span>
        <span className="h-px w-6 bg-gold/60" aria-hidden="true" /> {product.kicker}
      </p>
      <h3 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-ivory sm:text-4xl">
        {product.name} <span className="font-light italic text-ivory/60">· {product.short}</span>
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/75">{product.benefit}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {product.highlights.map((h) => (
          <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1 text-xs text-ivory/90">
            <Check size={11} className="text-gold" aria-hidden="true" /> {h}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span data-testid={`showcase-price-${product.handle}`} className="font-serif text-3xl font-medium text-ivory">{inr(variant.price)}</span>
        {variant.compareAt && (
          <>
            <span className="pb-1 text-sm text-ivory/50 line-through">{inr(variant.compareAt)}</span>
            <span className="mb-1 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-gold-light">{pct}% off</span>
          </>
        )}
      </div>
      <div className="mt-1"><RatingPreview rating={product.rating} count={product.reviewCount} light /></div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button data-testid={`showcase-add-${product.handle}`} onClick={add} disabled={adding} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-saffron px-7 text-[13px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-saffron-dark disabled:opacity-70">
          {adding ? <><Loader2 size={14} className="animate-spin" /> Adding…</> : "Add to Cart"}
        </button>
        <Link data-testid={`showcase-view-${product.handle}`} to={`/products/${product.handle}`} className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-ivory/25 px-6 text-[13px] font-semibold text-ivory transition-colors hover:border-gold hover:text-gold-light">
          View details <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <p className="mt-4 text-[11px] text-ivory/55">{DELIVERY_PROMISE.dispatch} · {DELIVERY_PROMISE.returns} · Gift-boxed</p>
      <div className="mt-6 flex gap-2 lg:hidden">
        {product.images.map((im, i) => (
          <img key={i} src={im.src} alt={im.alt} loading="lazy" className="h-20 w-20 rounded-xl border border-ivory/15 object-cover" />
        ))}
      </div>
    </article>
  );
}

export default function ProductScroller() {
  const [active, setActive] = useState("lantern");
  const reduce = useReducedMotion();
  const { gl, mobile } = useStageFlags();

  return (
    <section id="the-five" data-testid="showcase" className="nv-jaali relative bg-maroon-deep text-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="pt-14 lg:pt-20">
          <p className="nv-eyebrow text-gold">Meet the five</p>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Everything a festive home needs. Nothing it doesn’t.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="sticky top-16 z-10 h-[34svh] lg:top-0 lg:col-span-6 lg:h-screen" data-testid="showcase-stage">
            <div className="absolute inset-0 -mx-4 bg-gradient-to-b from-maroon-deep via-transparent to-maroon-deep lg:hidden" aria-hidden="true" />
            {gl ? (
              <Suspense fallback={null}>
                <ProductStage active={active} reduce={!!reduce} offset={mobile ? [0, 0.1] : [0, -0.1]} scale={mobile ? 0.62 : 1.05} />
              </Suspense>
            ) : (
              <img src={PRODUCTS.find((p) => p.model === active)?.images[0].src} alt="" className="h-full w-full rounded-2xl object-cover" />
            )}
          </div>
          <div className="lg:col-span-6">
            {PRODUCTS.map((p, i) => (
              <Panel key={p.id} product={p} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
