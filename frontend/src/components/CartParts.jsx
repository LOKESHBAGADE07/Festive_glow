import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { FREE_SHIPPING_THRESHOLD } from "@/data/site";
import { inr } from "@/lib/format";

export function ShippingProgress({ subtotal }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  return (
    <div data-testid="shipping-progress" className="rounded-xl border border-line bg-ivory p-4">
      <p className="mb-2 text-xs font-medium text-ink">
        {remaining > 0 ? (
          <>You’re <span data-testid="shipping-remaining" className="font-bold text-saffron-dark">{inr(remaining)}</span> away from free shipping</>
        ) : (
          <span data-testid="shipping-unlocked" className="font-bold text-success">You’ve unlocked free shipping on this order</span>
        )}
        <span className="text-ink-soft"> · demo threshold {inr(FREE_SHIPPING_THRESHOLD)}</span>
      </p>
      <Progress data-testid="shipping-progress-bar" value={pct} className="h-1.5 bg-line" />
    </div>
  );
}

export function CheckoutNotice({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[86vw] max-w-sm border-line bg-ivory p-6 [&>button]:hidden">
        <SheetHeader className="p-0 text-left">
          <SheetTitle className="font-serif text-xl text-ink">Checkout handoff</SheetTitle>
          <SheetDescription className="sr-only">Prototype checkout explanation</SheetDescription>
        </SheetHeader>
        <div data-testid="checkout-notice" className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
          <p>
            This is a <strong className="text-ink">design prototype</strong> — it doesn’t place real orders or collect payment details.
          </p>
          <p>
            In the Shopify build, this button hands your bag to <strong className="text-ink">Shopify’s hosted checkout</strong>, where payment (UPI, cards, net banking), taxes, shipping rates and order confirmation are handled natively.
          </p>
          <p>Cart contents here are saved in your browser and live only inside this prototype.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* Trigger-less wrapper used inside the drawer's nested Sheet. */
export function CheckoutNoticeControlled() {
  const [open, setOpen] = useState(false);
  return <CheckoutNotice open={open} onOpenChange={setOpen} />;
}
