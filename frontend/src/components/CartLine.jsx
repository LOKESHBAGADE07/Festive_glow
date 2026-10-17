import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { inr } from "@/lib/format";
import QuantityStepper from "@/components/QuantityStepper";

export default function CartLine({ item, compact = false }) {
  const { updateQty, removeItem } = useStore();
  return (
    <div data-testid={`cart-line-${item.productId}-${item.variantId}`} className="flex gap-4 py-4">
      <Link to={`/products/${item.handle}`} className="shrink-0" aria-label={`View ${item.title}`}>
        <img src={item.image} alt={item.title} className={`rounded-lg border border-line object-cover ${compact ? "h-20 w-20" : "h-24 w-24"}`} loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/products/${item.handle}`} className="block truncate text-sm font-semibold text-ink hover:text-saffron-dark">
              {item.title}
            </Link>
            {item.variantLabel && (
              <p data-testid={`cart-line-variant-${item.productId}-${item.variantId}`} className="mt-0.5 text-xs text-ink-soft">
                {item.variantLabel}
              </p>
            )}
            <p className="mt-1 text-sm font-bold text-ink">{inr(item.price)}</p>
          </div>
          <button
            data-testid={`cart-remove-${item.productId}-${item.variantId}`}
            aria-label={`Remove ${item.title} from bag`}
            onClick={() => removeItem(item.key)}
            className="rounded-full p-2 text-ink-soft hover:bg-error/10 hover:text-error transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-auto pt-2">
          <QuantityStepper
            value={item.qty}
            onChange={(q) => updateQty(item.key, q)}
            testId={`cart-qty-${item.productId}-${item.variantId}`}
          />
        </div>
      </div>
    </div>
  );
}
