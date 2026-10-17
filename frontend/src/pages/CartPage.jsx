import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartLine from "@/components/CartLine";
import EmptyState from "@/components/EmptyState";
import { ShippingProgress, CheckoutNotice } from "@/components/CartParts";
import { useStore } from "@/context/StoreContext";
import { inr } from "@/lib/format";

export default function CartPage() {
  const { cart, cartCount, subtotal } = useStore();
  const [noticeOpen, setNoticeOpen] = useState(false);

  return (
    <>
      <Seo title="Your Cart — Noor & Vaani" description="Review your bag — quantities, variants and a demo free-shipping threshold." />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Cart" }]} />
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Your Bag {cartCount > 0 && <span className="text-lg font-normal text-ink-soft">· {cartCount} {cartCount === 1 ? "item" : "items"}</span>}
        </h1>

        {cart.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={ShoppingBag}
              title="Your bag is empty"
              description="Browse the festive edit — lights, decor and gifts chosen to make celebrations feel special."
              action={
                <Link data-testid="cart-empty-cta" to="/collections/shop-all" className="rounded-full bg-saffron px-7 py-3.5 text-sm font-bold text-white hover:bg-saffron-dark transition-colors">
                  Shop the Festive Edit
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div data-testid="cart-page-lines" className="divide-y divide-line border-y border-line">
              {cart.map((item) => (
                <CartLine key={item.key} item={item} />
              ))}
            </div>
            <aside data-testid="cart-summary" className="h-fit space-y-4 rounded-2xl border border-line bg-white p-6 shadow-card lg:sticky lg:top-28">
              <ShippingProgress subtotal={subtotal} />
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm text-ink-soft">Subtotal</span>
                <span data-testid="cart-page-subtotal" className="font-serif text-2xl font-semibold text-ink">{inr(subtotal)}</span>
              </div>
              <p className="text-xs leading-relaxed text-ink-soft">
                Shipping, taxes and discounts are calculated at Shopify checkout when the store is live. The free-shipping threshold shown is a demo setting.
              </p>
              <button
                data-testid="cart-page-checkout"
                onClick={() => setNoticeOpen(true)}
                className="w-full rounded-full bg-saffron py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-saffron-dark"
              >
                Proceed to Checkout
              </button>
              <Link data-testid="cart-page-continue" to="/collections/shop-all" className="block text-center text-sm font-semibold text-ink-soft underline underline-offset-4 hover:text-saffron-dark">
                Continue shopping
              </Link>
              <p className="rounded-lg bg-ivory p-3 text-[11px] leading-relaxed text-ink-soft">
                <strong className="text-ink">Prototype note:</strong> this store does not process payments or place real orders. Checkout will be handled by Shopify’s hosted checkout in the live build.
              </p>
            </aside>
          </div>
        )}
      </div>
      <CheckoutNotice open={noticeOpen} onOpenChange={setNoticeOpen} />
    </>
  );
}
