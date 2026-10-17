import { Link } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { defaultVariant } from "@/data/products";
import { inr } from "@/lib/format";
import RatingPreview from "@/components/RatingPreview";

export default function ProductCard({ product, dark = false }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const variant = defaultVariant(product);
  const saved = inWishlist(product.id);
  const onSale = variant.compareAt && variant.compareAt > variant.price;

  return (
    <article data-testid={`product-card-${product.handle}`} className="group flex h-full flex-col">
      <div className={`relative overflow-hidden rounded-xl border ${dark ? "border-white/10 bg-white/5" : "border-line bg-white"} shadow-card transition-shadow duration-300 group-hover:shadow-lift`}>
        <Link to={`/products/${product.handle}`} data-testid={`product-card-link-${product.handle}`} aria-label={`View ${product.name}`} className="block">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>
        </Link>

        {product.badge && (
          <span data-testid={`product-badge-${product.handle}`} className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ivory backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        <button
          data-testid={`wishlist-toggle-${product.handle}`}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => toggleWishlist(product)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all active:scale-90 ${saved ? "border-terracotta bg-terracotta text-white" : "border-line bg-white/90 text-ink hover:border-terracotta hover:text-terracotta"}`}
        >
          <Heart size={15} fill={saved ? "currentColor" : "none"} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
          <button
            data-testid={`quick-add-${product.handle}`}
            onClick={() => addToCart(product, variant, 1)}
            disabled={!variant.available}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-ink/90 text-xs font-bold uppercase tracking-widest text-ivory backdrop-blur-sm transition-colors hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {variant.available ? (
              <><Loader2 className="hidden" /> Quick Add</>
            ) : (
              "Unavailable"
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-0.5 pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-gold" : "text-saffron-dark"}`}>
            {product.category}
          </span>
        </div>
        <Link to={`/products/${product.handle}`} className="text-sm font-semibold leading-snug text-ink hover:text-saffron-dark">
          {product.name}
        </Link>
        {product.colorTags?.length > 0 && (
          <p className={`text-xs ${dark ? "text-ivory/60" : "text-ink-soft"}`}>
            {product.colorTags.join(" · ")}
          </p>
        )}
        <div className="mt-auto pt-1.5">
          <p className="flex items-baseline gap-2">
            <span data-testid={`product-price-${product.handle}`} className={`text-[15px] font-bold ${dark ? "text-ivory" : "text-ink"}`}>
              {inr(variant.price)}
            </span>
            {onSale && (
              <>
                <span data-testid={`product-compare-at-${product.handle}`} className={`text-xs line-through ${dark ? "text-ivory/50" : "text-ink-soft"}`}>
                  {inr(variant.compareAt)}
                </span>
                <span data-testid={`product-savings-${product.handle}`} className="text-[11px] font-bold text-success">
                  {Math.round(((variant.compareAt - variant.price) / variant.compareAt) * 100)}% off
                </span>
              </>
            )}
          </p>
          <div className="mt-1">
            <RatingPreview rating={product.rating} count={product.reviewCount} light={dark} />
          </div>
        </div>
      </div>
    </article>
  );
}
