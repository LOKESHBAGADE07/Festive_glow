import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { MaskLines, EASE } from "@/components/Reveal";
import { PRODUCTS } from "@/data/products";
import { DELIVERY_PROMISE } from "@/data/site";

const ProductStage = lazy(() => import("@/components/three/ProductStage"));

export const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
};

export const useStageFlags = () => {
  const [gl, setGl] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setGl(hasWebGL());
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return { gl, mobile };
};

const fade = (reduce, delay) => ({
  initial: reduce ? false : { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function HeroSection() {
  const reduce = useReducedMotion();
  const { gl, mobile } = useStageFlags();
  const avg = (PRODUCTS.reduce((s, p) => s + p.rating, 0) / PRODUCTS.length).toFixed(1);

  return (
    <section data-testid="hero" className="nv-hero-glow nv-jaali relative flex min-h-[78svh] items-center overflow-hidden text-ivory lg:min-h-[82svh]">
      <div className="absolute inset-0 lg:left-[42%]" aria-hidden="true" data-testid="hero-3d-stage">
        {gl && (
          <Suspense fallback={null}>
            <ProductStage active="diya" reduce={!!reduce} offset={mobile ? [0.2, 1.9] : [-0.3, -0.2]} scale={mobile ? 0.55 : 1} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-maroon-deep via-maroon-deep/70 to-transparent lg:via-maroon-deep/20" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <motion.p {...fade(reduce, 0.1)} className="nv-eyebrow mb-5 inline-flex items-center gap-2 text-gold-light">
            <span className="h-px w-8 bg-gold" aria-hidden="true" /> Festive Edit · Five pieces
          </motion.p>
          <MaskLines
            lines={[<>Five pieces.</>, <>One <em className="italic font-light text-gold">glowing</em> home.</>]}
            className="font-serif text-[11vw] font-medium leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            delay={0.2}
          />
          <motion.p {...fade(reduce, 0.55)} className="mt-5 max-w-md text-sm leading-relaxed text-ivory/80 sm:text-base">
            Artisan diyas, cut-work lanterns, warm fairy lights, a marigold toran and one perfect gift box. Made slowly. Chosen to layer.
          </motion.p>
          <motion.div {...fade(reduce, 0.7)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link data-testid="hero-cta-shop" to="/collections/shop-all" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-saffron px-7 text-[13px] font-bold uppercase tracking-widest text-white shadow-lift transition-colors hover:bg-saffron-dark">
              Shop the Five <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link data-testid="hero-cta-bundles" to="/bundles" className="inline-flex h-12 items-center justify-center rounded-full border border-gold/50 px-7 text-[13px] font-semibold text-gold-light transition-colors hover:bg-gold hover:text-maroon-deep">
              Bundles — save up to 20%
            </Link>
          </motion.div>
          <motion.p {...fade(reduce, 0.85)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ivory/70">
            <span data-testid="hero-rating" className="inline-flex items-center gap-1.5 font-semibold text-ivory">
              <Star size={12} className="text-gold" fill="currentColor" /> {avg} rated <span className="font-normal text-ivory/50">(preview)</span>
            </span>
            <span>{DELIVERY_PROMISE.dispatch}</span>
            <span>{DELIVERY_PROMISE.returns}</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
