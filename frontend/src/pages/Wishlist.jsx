import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <Seo title="Wishlist — Noor & Vaani" description="Pieces you've saved for later." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Wishlist" }]} />
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Wishlist</h1>
        {items.length > 0 && (
          <p className="mt-2 text-sm text-ink-soft">Saved in this browser — sign-in synced wishlists arrive with the Shopify build.</p>
        )}
        <div className="mt-8">
          {items.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Nothing saved yet"
              description="Tap the heart on any product to keep it here for later."
              action={
                <Link data-testid="wishlist-empty-cta" to="/collections/shop-all" className="rounded-full bg-saffron px-7 py-3.5 text-sm font-bold text-white hover:bg-saffron-dark transition-colors">
                  Discover the collection
                </Link>
              }
            />
          ) : (
            <div data-testid="wishlist-grid" className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {items.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.05} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
