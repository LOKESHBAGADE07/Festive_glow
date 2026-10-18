import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Star } from "lucide-react";
import { MaskLines, EASE } from "@/components/Reveal";
import { PRODUCTS } from "@/data/products";
import { DELIVERY_PROMISE } from "@/data/site";

const Hero3D = lazy(() => import("@/components/Hero3D"));

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
};

const fade = (reduce, delay) => ({
  initial: reduce ? false : { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function HeroSection() {
  const reduce = useReducedMotion();
  const [gl, setGl] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 700], [0, 1]);
  const textY = useTransform(scrollY, [0, 700], [0, 90]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const avg = (PRODUCTS.reduce((s, p) => s + p.rating, 0) / PRODUCTS.length).toFixed(1);
  const reviews = PRODUCTS.reduce((s, p) => s + p.reviewCount, 0);

  useEffect(() => {
    setGl(hasWebGL());
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section data-testid="hero" className="nv-hero-glow nv-grain relative flex min-h-[96svh] items-center overflow-hidden text-ivory">
      {/* 3D stage */}
      <div className="absolute inset-0 lg:left-[38%]" aria-hidden="true" data-testid="hero-3d-stage">
        {gl && (
          <Suspense fallback={null}>
            <Hero3D scroll={progress} reduce={!!reduce} mobile={mobile} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#171208] via-[#171208]/70 to-transparent lg:via-[#171208]/30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#171208] to-transparent" aria-hidden="true" />

      <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="max-w-2xl">
          <motion.p {...fade(reduce, 0.1)} className="nv-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 text-gold-light backdrop-blur-sm">
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-saffron nv-pulse" aria-hidden="true" />
            The Festive Edit · 5 pieces, no filler
          </motion.p>

          <MaskLines
            lines={[<>Five pieces.</>, <>One <em className="italic text-gold">glowing</em> home.</>]}
            className="font-serif text-[12.5vw] font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]"
            delay={0.25}
          />

          <motion.p {...fade(reduce, 0.65)} className="mt-7 max-w-lg text-[15px] leading-relaxed text-ivory/80 sm:text-lg">
            We make only what a festive home truly needs — artisan diyas, cut-work lanterns, warm fairy lights, a marigold toran and one perfect gift box. Chosen to layer. Built to last beyond the season.
          </motion.p>

          <motion.div {...fade(reduce, 0.8)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              data-testid="hero-cta-shop"
              to="/collections/shop-all"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-saffron px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lift transition-all hover:bg-saffron-dark active:scale-[0.98]"
            >
              Shop the Five <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              data-testid="hero-cta-bundles"
              to="/bundles"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-ivory/30 bg-ivory/5 px-8 py-4 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-ivory hover:text-ink"
            >
              Build a bundle &amp; save up to 20%
            </Link>
          </motion.div>

          <motion.div {...fade(reduce, 0.95)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ivory/70">
            <span data-testid="hero-rating" className="inline-flex items-center gap-1.5 font-semibold text-ivory">
              <span className="flex text-gold" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}</span>
              {avg} · {reviews.toLocaleString("en-IN")} reviews <span className="font-normal text-ivory/50">(preview data)</span>
            </span>
            <span className="hidden h-3 w-px bg-ivory/20 sm:block" aria-hidden="true" />
            <span>{DELIVERY_PROMISE.dispatch}</span>
            <span className="hidden h-3 w-px bg-ivory/20 sm:block" aria-hidden="true" />
            <span>{DELIVERY_PROMISE.returns}</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#the-five"
        data-testid="hero-scroll-cue"
        {...fade(reduce, 1.3)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-ivory/50 hover:text-ivory sm:flex"
      >
        Meet the five <ArrowDown size={14} className="nv-float" />
      </motion.a>
    </section>
  );
}
