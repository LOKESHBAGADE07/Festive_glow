import { Link } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { inr } from "@/lib/format";

/* Bundle card — adds the bundle as one priced cart line. */
export default function BundleCard({ bundle, featured = false }) {
  const { addToCart } = useStore();
  const pct = Math.round((bundle.savings / bundle.compareAt) * 100);

  return (
    <article
      data-testid={`bundle-card-${bundle.handle}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-shadow duration-300 hover:shadow-lift ${featured ? "border-gold/60 ring-1 ring-gold/30" : "border-line"}`}
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img src={bundle.image} alt={`${bundle.name} bundle`} loading="lazy" className="nv-photo h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
        {bundle.badge && (
          <span data-testid={`bundle-badge-${bundle.handle}`} className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
            <Sparkles size={11} /> {bundle.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-success px-3 py-1 text-[11px] font-bold text-white">Save {pct}%</span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-2xl font-semibold text-ivory">{bundle.name}</h3>
          <p className="text-sm text-ivory/80">{bundle.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <ul className="flex flex-wrap gap-2">
          {bundle.products.map((p, i) => (
            <li key={p.id} className="flex items-center gap-1.5 text-xs text-ink">
              {i > 0 && <Plus size={10} className="text-ink-soft" aria-hidden="true" />}
              <Link to={`/products/${p.handle}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-2.5 py-1 hover:border-saffron">
                <img src={p.images[0].src} alt="" className="h-5 w-5 rounded-full object-cover" />
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-ink-soft">Bought separately <span className="line-through">{inr(bundle.compareAt)}</span></p>
            <p className="flex items-baseline gap-2">
              <span data-testid={`bundle-price-${bundle.handle}`} className="font-serif text-3xl font-semibold text-ink">{inr(bundle.price)}</span>
              <span data-testid={`bundle-savings-${bundle.handle}`} className="text-xs font-bold text-success">you save {inr(bundle.savings)}</span>
            </p>
          </div>
          <button
            data-testid={`bundle-add-${bundle.handle}`}
            onClick={() => addToCart(bundle, bundle.variants[0], 1)}
            className="rounded-full bg-saffron px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-saffron-dark active:scale-[0.98]"
          >
            Add bundle
          </button>
        </div>
      </div>
    </article>
  );
}
