import { Link } from "react-router-dom";
import { Sparkles, Plus } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { inr } from "@/lib/format";

/* PDP upsell — the best-value bundle that contains this product. */
export default function BundleUpsell({ bundles, product }) {
  const { addToCart } = useStore();
  if (!bundles.length) return null;
  const bundle = [...bundles].sort((a, b) => a.price - b.price)[0];
  const others = bundle.products.filter((p) => p.id !== product.id);

  return (
    <div data-testid="bundle-upsell" className="mt-6 rounded-2xl border border-gold/50 bg-gradient-to-br from-[#FFF3E0] to-ivory p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-saffron-dark">
            <Sparkles size={12} /> Complete the set &amp; save {inr(bundle.savings)}
          </p>
          <p className="mt-1.5 font-serif text-lg font-semibold text-ink">{bundle.name}</p>
          <p className="mt-0.5 text-xs text-ink-soft">
            This piece + {others.map((p) => p.name).join(" + ")}
          </p>
        </div>
        <div className="flex -space-x-2">
          {bundle.products.map((p) => (
            <img key={p.id} src={p.images[0].src} alt="" className="nv-photo h-10 w-10 rounded-full border-2 border-white object-cover" />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-baseline gap-2">
          <span data-testid="bundle-upsell-price" className="font-serif text-2xl font-semibold text-ink">{inr(bundle.price)}</span>
          <span className="text-xs text-ink-soft line-through">{inr(bundle.compareAt)}</span>
        </p>
        <div className="flex items-center gap-3">
          <Link to="/bundles" data-testid="bundle-upsell-more" className="text-xs font-bold text-saffron-dark underline underline-offset-4">All bundles</Link>
          <button
            data-testid="bundle-upsell-add"
            onClick={() => addToCart(bundle, bundle.variants[0], 1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ivory transition-colors hover:bg-saffron-dark"
          >
            <Plus size={13} /> Add bundle
          </button>
        </div>
      </div>
    </div>
  );
}
