import { Plus } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, defaultVariant } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD } from "@/data/site";
import { inr } from "@/lib/format";

/* "Complete the look" — up to two products not yet in the bag, cheapest first
   when the shopper is below the free-shipping threshold. */
export default function CartUpsell() {
  const { cart, subtotal, addToCart } = useStore();
  const inBag = new Set(cart.map((i) => i.productId));
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const candidates = PRODUCTS.filter((p) => !inBag.has(p.id));
  if (remaining > 0) candidates.sort((a, b) => a.price - b.price);
  const picks = candidates.slice(0, 2);
  if (!picks.length) return null;

  return (
    <div data-testid="cart-upsell" className="border-t border-line bg-ivory px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-saffron-dark">
        {remaining > 0 ? `Add ${inr(remaining)} more for free shipping` : "Complete the look"}
      </p>
      <ul className="mt-3 space-y-2.5">
        {picks.map((p) => {
          const v = defaultVariant(p);
          return (
            <li key={p.id} className="flex items-center gap-3">
              <img src={p.images[0].src} alt="" className="nv-photo h-12 w-12 rounded-lg border border-line object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink">{p.name}</p>
                <p className="text-xs text-ink-soft">{inr(v.price)}</p>
              </div>
              <button
                data-testid={`cart-upsell-add-${p.handle}`}
                onClick={() => addToCart(p, v, 1)}
                aria-label={`Add ${p.name} to bag`}
                className="inline-flex items-center gap-1 rounded-full border border-ink px-3 py-1.5 text-[11px] font-bold text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                <Plus size={12} /> Add
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
