import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useStore } from "@/context/StoreContext";
import CartLine from "@/components/CartLine";
import { inr } from "@/lib/format";
import { ShippingProgress, CheckoutNotice } from "@/components/CartParts";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, cartCount, subtotal } = useStore();
  const [noticeOpen, setNoticeOpen] = useState(false);

  return (
    <>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="flex w-[92vw] max-w-md flex-col border-line bg-ivory p-0 [&>button]:hidden">
          <SheetHeader className="border-b border-line p-5 pb-4 text-left">
            <SheetTitle className="flex items-center justify-between font-serif text-xl text-ink">
              Your Bag
              <span data-testid="cart-drawer-count" className="font-sans text-sm font-semibold text-ink-soft">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </SheetTitle>
            <SheetDescription className="sr-only">Shopping bag contents</SheetDescription>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center" data-testid="cart-drawer-empty">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag size={24} className="text-ink-soft" />
              </span>
              <div>
                <p className="font-serif text-xl text-ink">Your bag is empty</p>
                <p className="mt-1 text-sm text-ink-soft">Fill it with things that glow.</p>
              </div>
              <Link
                to="/collections/shop-all"
                data-testid="cart-drawer-empty-cta"
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-saffron px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-saffron-dark"
              >
                Shop the Festive Edit
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 divide-y divide-line overflow-y-auto px-5">
                {cart.map((item) => (
                  <CartLine key={item.key} item={item} compact />
                ))}
              </div>
              <div className="space-y-3 border-t border-line bg-white p-5">
                <ShippingProgress subtotal={subtotal} />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-soft">Subtotal</span>
                  <span data-testid="cart-drawer-subtotal" className="font-serif text-xl font-semibold text-ink">{inr(subtotal)}</span>
                </div>
                <p className="text-[11px] text-ink-soft">Shipping, taxes and discounts are calculated at Shopify checkout when live.</p>
                <button
                  data-testid="cart-drawer-checkout"
                  onClick={() => { setCartOpen(false); setNoticeOpen(true); }}
                  className="w-full rounded-full bg-saffron py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-saffron-dark"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/cart"
                  data-testid="cart-drawer-view-cart"
                  onClick={() => setCartOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-ink py-3 text-sm font-semibold text-ink hover:bg-secondary transition-colors"
                >
                  View Cart <ArrowRight size={15} />
                </Link>
                <Link to="/collections/shop-all" data-testid="cart-drawer-continue" onClick={() => setCartOpen(false)} className="block text-center text-xs font-semibold text-ink-soft underline underline-offset-4">
                  Continue shopping
                </Link>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      <CheckoutNotice open={noticeOpen} onOpenChange={setNoticeOpen} />
    </>
  );
}
