import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Loader2, MapPin, ShieldCheck, Truck, RotateCcw, ZoomIn, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuantityStepper from "@/components/QuantityStepper";
import RatingPreview from "@/components/RatingPreview";
import FAQAccordion from "@/components/FAQAccordion";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useStore } from "@/context/StoreContext";
import { findProduct, resolveVariant, isOptionAvailable, relatedProducts, PRODUCTS } from "@/data/products";
import { FAQS, POLICIES } from "@/data/policies";
import { TRUST_ROW } from "@/data/site";
import { inr, isValidPin } from "@/lib/format";

const SHIPPING_POLICY = POLICIES["shipping-policy"];

function Gallery({ product }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const trackRef = useRef(null);

  const goTo = (i) => {
    const next = (i + product.images.length) % product.images.length;
    setIndex(next);
    const track = trackRef.current;
    if (track) track.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div data-testid="product-gallery">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div
          ref={trackRef}
          className="nv-gallery flex overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
        >
          {product.images.map((img, i) => (
            <div key={i} className="relative aspect-[4/5] w-full shrink-0 sm:aspect-square lg:aspect-[4/5]">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" draggable="false" />
              <button
                data-testid={`gallery-zoom-${i}`}
                aria-label={`Enlarge image ${i + 1}`}
                onClick={() => setZoom(true)}
                className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-ivory backdrop-blur-sm transition-colors hover:bg-ink"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          ))}
        </div>
        <button data-testid="gallery-prev" aria-label="Previous image" onClick={() => goTo(index - 1)} className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-ink shadow-card hover:bg-white sm:block">
          <ChevronLeft size={16} />
        </button>
        <button data-testid="gallery-next" aria-label="Next image" onClick={() => goTo(index + 1)} className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-ink shadow-card hover:bg-white sm:block">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
        {product.images.map((_, i) => (
          <button
            key={i}
            data-testid={`gallery-dot-${i}`}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-saffron" : "w-1.5 bg-line-dark"}`}
          />
        ))}
      </div>

      <div className="mt-3 hidden gap-3 lg:flex">
        {product.images.map((img, i) => (
          <button
            key={i}
            data-testid={`gallery-thumb-${i}`}
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}`}
            className={`overflow-hidden rounded-lg border-2 transition-all ${i === index ? "border-saffron" : "border-line opacity-70 hover:opacity-100"}`}
          >
            <img src={img.src} alt="" className="h-20 w-20 object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-4xl border-line bg-ink p-2 [&>button]:rounded-full [&>button]:bg-ivory/90 [&>button]:text-ink">
          <DialogTitle className="sr-only">Enlarged product image</DialogTitle>
          <img src={product.images[index]?.src} alt={product.images[index]?.alt} className="max-h-[80vh] w-full rounded-xl object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function VariantPicker({ product, selection, setSelection, variant }) {
  if (!product.options.length) return null;
  return (
    <div className="space-y-5" data-testid="variant-picker">
      {product.options.map((opt, oi) => (
        <div key={opt.name}>
          <p className="mb-2.5 text-sm">
            <span className="font-bold text-ink">{opt.name}:</span>{" "}
            <span data-testid={`variant-selected-${opt.name.toLowerCase()}`} className="text-ink-soft">{selection[oi]}</span>
          </p>
          <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={opt.name}>
            {opt.values.map((v) => {
              const selected = selection[oi] === v.label;
              const available = isOptionAvailable(product, oi, v.label, selection);
              return (
                <button
                  key={v.label}
                  role="radio"
                  aria-checked={selected}
                  data-testid={`variant-option-${opt.name.toLowerCase()}-${v.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  onClick={() => {
                    const next = [...selection];
                    next[oi] = v.label;
                    setSelection(next);
                  }}
                  disabled={!available}
                  title={available ? v.label : `${v.label} — currently unavailable`}
                  className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                    selected
                      ? "border-ink bg-ink text-ivory"
                      : "border-line bg-white text-ink hover:border-saffron"
                  } ${!available ? "cursor-not-allowed opacity-40 line-through" : ""}`}
                >
                  {v.hex && (
                    <span className="h-4 w-4 rounded-full border border-black/10" style={{ background: v.hex }} aria-hidden="true" />
                  )}
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!variant.available && (
        <p data-testid="variant-unavailable-note" className="rounded-lg bg-error/10 px-3.5 py-2.5 text-xs font-semibold text-error">
          This combination is currently unavailable — please choose another.
        </p>
      )}
    </div>
  );
}

function PinChecker() {
  const [pin, setPin] = useState("");
  const [state, setState] = useState(null);
  return (
    <div data-testid="pin-checker" className="rounded-xl border border-line bg-white p-4">
      <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-ink">
        <MapPin size={15} className="text-saffron-dark" /> Check delivery
      </p>
      <div className="flex gap-2">
        <input
          data-testid="pincode-check-input"
          value={pin}
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setState(null); }}
          placeholder="Enter 6-digit PIN code"
          inputMode="numeric"
          aria-label="PIN code"
          className="min-w-0 flex-1 rounded-full border border-line bg-ivory px-4 py-2.5 text-sm outline-none focus:border-saffron"
        />
        <button data-testid="pincode-check-btn" onClick={() => setState(isValidPin(pin) ? "ok" : "invalid")} className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ivory hover:bg-saffron-dark transition-colors">
          Check
        </button>
      </div>
      {state === "invalid" && (
        <p data-testid="pincode-error" role="alert" className="mt-2 text-xs font-semibold text-error">Please enter a valid 6-digit Indian PIN code.</p>
      )}
      {state === "ok" && (
        <p data-testid="pincode-success" className="mt-2 text-xs leading-relaxed text-ink-soft">
          <span className="font-bold text-success">Deliverable to {pin}</span> — sample estimate: 3–7 days. Final timelines will be configured in Shopify before launch.
        </p>
      )}
    </div>
  );
}

function ReviewsPreview({ product }) {
  return (
    <div data-testid="reviews-section" className="mt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="nv-eyebrow mb-2 text-saffron-dark">Customer Reviews</p>
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">What buyers think</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-saffron-dark">
          <BadgeCheck size={13} /> Preview data — no real reviews yet
        </span>
      </div>
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-6">
        <div className="text-center">
          <p className="font-serif text-4xl font-semibold text-ink">{product.rating.toFixed(1)}</p>
          <RatingPreview rating={product.rating} />
        </div>
        <div className="h-12 w-px bg-line" aria-hidden="true" />
        <p className="max-w-md text-sm text-ink-soft">
          Based on <span className="font-bold text-ink">{product.reviewCount} sample reviews</span>. This store hasn’t launched yet — real reviews will appear here once a review app is connected in Shopify.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { rating: 5, text: "Exactly the warm glow we wanted on the console — the cut-work patterns look lovely after dusk.", label: "Preview review" },
          { rating: 4.5, text: "Well made and carefully packed. Would love more finish options when the full range launches.", label: "Preview review" },
          { rating: 5, text: "Gifted a set to my sister for her new home. The packaging made it feel very premium.", label: "Preview review" },
        ].map((r, i) => (
          <figure key={i} data-testid={`preview-product-review-${i}`} className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
            <div className="mb-3 flex gap-0.5 text-saffron" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s < Math.floor(r.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-ink">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-xs font-semibold text-ink-soft">{r.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Product() {
  const { handle } = useParams();
  const product = findProduct(handle);
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [selection, setSelection] = useState(() => {
    if (!product || !product.options.length) return [];
    const first = product.variants.find((v) => v.available);
    return first ? [...first.options] : product.options.map((o) => o.values[0].label);
  });
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const atcRef = useRef(null);

  useEffect(() => {
    const el = atcRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { rootMargin: "-60px 0px 0px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <EmptyState
          icon={BadgeCheck}
          title="Product not found"
          description="This item may have moved or is not in the demo catalogue."
          action={<Link data-testid="product-not-found-cta" to="/collections/shop-all" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ivory">Browse all products</Link>}
        />
      </div>
    );
  }

  const variant = resolveVariant(product, selection);
  const saved = inWishlist(product.id);
  const onSale = variant.compareAt && variant.compareAt > variant.price;
  const savings = onSale ? variant.compareAt - variant.price : 0;

  const handleAdd = () => {
    if (adding || !variant.available) return;
    setAdding(true);
    setTimeout(() => {
      addToCart(product, variant, qty);
      setAdding(false);
    }, 450);
  };

  const trustIcons = [Truck, RotateCcw, ShieldCheck];
  const specs = Object.entries(product.specs || {});
  const related = relatedProducts(product, 4);

  return (
    <>
      <Seo
        title={`${product.name} — Noor & Vaani`}
        description={product.benefit}
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Breadcrumbs trail={[{ label: product.category, to: `/collections/${product.category}` }, { label: product.name }]} />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Gallery product={product} />

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              {product.badge && (
                <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ivory">{product.badge}</span>
              )}
              <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">SKU {variant.sku}</span>
            </div>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>
            <div className="mt-3">
              <RatingPreview rating={product.rating} count={product.reviewCount} />
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3" data-testid="product-price-block">
              <span data-testid="product-detail-price" className="font-serif text-4xl font-semibold text-ink">{inr(variant.price)}</span>
              {onSale && (
                <>
                  <span data-testid="product-detail-compare" className="text-lg text-ink-soft line-through">{inr(variant.compareAt)}</span>
                  <span data-testid="product-detail-savings" className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                    Save {inr(savings)}
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-[11px] text-ink-soft">Demo price — final pricing set in Shopify before launch.</p>

            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{product.benefit}</p>

            <div className="mt-7">
              <VariantPicker product={product} selection={selection} setSelection={setSelection} variant={variant} />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4" ref={atcRef}>
              <QuantityStepper value={qty} onChange={setQty} testId="product-qty" />
              <button
                data-testid="add-to-cart-btn"
                onClick={handleAdd}
                disabled={adding || !variant.available}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-saffron px-8 text-sm font-bold uppercase tracking-widest text-white shadow-card transition-all hover:bg-saffron-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-line-dark disabled:text-ink-soft disabled:shadow-none min-w-[220px]"
              >
                {adding ? (
                  <><Loader2 size={16} className="animate-spin" /> Adding…</>
                ) : variant.available ? (
                  "Add to Cart"
                ) : (
                  "Currently Unavailable"
                )}
              </button>
              <button
                data-testid="product-wishlist-btn"
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={saved}
                onClick={() => toggleWishlist(product)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all active:scale-90 ${saved ? "border-terracotta bg-terracotta text-white" : "border-line bg-white text-ink hover:border-terracotta hover:text-terracotta"}`}
              >
                <Heart size={18} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-6">
              <PinChecker />
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {TRUST_ROW.map((t, i) => {
                const Icon = trustIcons[i];
                return (
                  <li key={t.title} className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3.5 py-3">
                    <Icon size={16} className="shrink-0 text-saffron-dark" />
                    <span>
                      <span className="block text-xs font-bold text-ink">{t.title}</span>
                      <span className="block text-[10px] text-ink-soft">{t.note}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="sr-only">Product information</h2>
            <Accordion type="single" collapsible defaultValue="desc" className="w-full">
              <AccordionItem value="desc" className="border-line">
                <AccordionTrigger data-testid="accordion-description" className="text-left font-serif text-lg font-semibold text-ink hover:no-underline hover:text-saffron-dark">Product Description</AccordionTrigger>
                <AccordionContent data-testid="accordion-description-content" className="text-sm leading-relaxed text-ink-soft">{product.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="features" className="border-line">
                <AccordionTrigger data-testid="accordion-features" className="text-left font-serif text-lg font-semibold text-ink hover:no-underline hover:text-saffron-dark">Key Features</AccordionTrigger>
                <AccordionContent data-testid="accordion-features-content">
                  <ul className="space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-saffron" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs" className="border-line">
                <AccordionTrigger data-testid="accordion-specs" className="text-left font-serif text-lg font-semibold text-ink hover:no-underline hover:text-saffron-dark">Specifications</AccordionTrigger>
                <AccordionContent data-testid="accordion-specs-content">
                  <dl className="divide-y divide-line">
                    {specs.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[130px_1fr] gap-3 py-2.5 text-sm">
                        <dt className="font-semibold text-ink">{k}</dt>
                        <dd className="text-ink-soft">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-line">
                <AccordionTrigger data-testid="accordion-shipping" className="text-left font-serif text-lg font-semibold text-ink hover:no-underline hover:text-saffron-dark">Shipping &amp; Returns</AccordionTrigger>
                <AccordionContent data-testid="accordion-shipping-content" className="space-y-3 text-sm leading-relaxed text-ink-soft">
                  <p>{SHIPPING_POLICY.sections[1].body[0]}</p>
                  <p>{POLICIES["returns-refunds"].sections[0].body[0]}</p>
                  <p className="flex flex-wrap gap-4">
                    <Link to="/pages/shipping-policy" className="font-semibold text-saffron-dark underline underline-offset-4">Shipping Policy</Link>
                    <Link to="/pages/returns-refunds" className="font-semibold text-saffron-dark underline underline-offset-4">Returns &amp; Refunds</Link>
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq" className="border-line">
                <AccordionTrigger data-testid="accordion-faq" className="text-left font-serif text-lg font-semibold text-ink hover:no-underline hover:text-saffron-dark">Frequently Asked Questions</AccordionTrigger>
                <AccordionContent data-testid="accordion-faq-content" className="pl-1">
                  <FAQAccordion items={FAQS} testId="product-faq" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-[#FFF3E0] to-ivory p-7 sm:p-9">
            <p className="nv-eyebrow mb-3 text-saffron-dark">Why you’ll love it</p>
            <p className="font-serif text-2xl font-medium leading-snug text-ink">
              {product.benefit}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Every piece in the festive edit is chosen to layer — lights beside candles, textiles beside brass — so your home comes together without feeling staged.
            </p>
            <Link data-testid="pdp-shop-collection" to={`/collections/${product.category}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-saffron-dark underline underline-offset-4">
              Continue to the {product.category} collection
            </Link>
          </div>
        </div>

        <ReviewsPreview product={product} />

        <div className="mt-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="nv-eyebrow mb-2 text-saffron-dark">You may also like</p>
              <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Related Products</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky mobile Add-to-Cart bar — appears only after the main CTA leaves view */}
      <div
        data-testid="sticky-atc-bar"
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 p-3 shadow-lift backdrop-blur-md transition-transform duration-300 lg:hidden ${showSticky ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <img src={product.images[0].src} alt="" className="h-11 w-11 rounded-lg border border-line object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-ink">{product.name}</p>
            <p className="text-sm font-semibold text-ink">{inr(variant.price)}</p>
          </div>
          <button
            data-testid="sticky-add-to-cart-btn"
            onClick={handleAdd}
            disabled={adding || !variant.available}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-saffron px-6 text-xs font-bold uppercase tracking-widest text-white transition-colors disabled:bg-line-dark disabled:text-ink-soft"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : variant.available ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </>
  );
}
