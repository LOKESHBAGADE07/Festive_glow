import { useState } from "react";
import { PackageSearch } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { isValidPin } from "@/lib/format";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState(null); // "ok" | "invalid-pin" | "invalid-order"

  const submit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return setState("invalid-order");
    if (!isValidPin(pin)) return setState("invalid-pin");
    setState("ok");
  };

  return (
    <>
      <Seo title="Track Order — Noor & Vaani" description="Order tracking — integration planned with the live store's order system." />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Track Order" }]} />
        <div className="mt-8">
          <Reveal>
            <p className="nv-eyebrow mb-2.5 text-saffron-dark">Track Order</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Where’s my order?</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              This page is a <strong className="text-ink">placeholder for a real integration</strong>. In the Shopify build, tracking connects to the store’s order system or a tracking app — this prototype cannot look up actual orders.
            </p>
          </Reveal>

          <form data-testid="track-order-form" onSubmit={submit} noValidate className="mt-8 space-y-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <div>
              <label htmlFor="track-order-id" className="nv-eyebrow mb-2 block text-ink">Order number</label>
              <input
                data-testid="track-order-id-input"
                id="track-order-id"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value); setState(null); }}
                placeholder="e.g. NV-10234"
                className="w-full rounded-xl border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron"
              />
            </div>
            <div>
              <label htmlFor="track-order-pin" className="nv-eyebrow mb-2 block text-ink">Shipping PIN code</label>
              <input
                data-testid="track-order-pin-input"
                id="track-order-pin"
                value={pin}
                onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setState(null); }}
                placeholder="6-digit PIN"
                inputMode="numeric"
                className="w-full rounded-xl border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron"
              />
            </div>
            {state === "invalid-order" && (
              <p data-testid="track-order-error-id" role="alert" className="text-xs font-semibold text-error">Please enter your order number.</p>
            )}
            {state === "invalid-pin" && (
              <p data-testid="track-order-error-pin" role="alert" className="text-xs font-semibold text-error">Please enter a valid 6-digit Indian PIN code.</p>
            )}
            {state === "ok" && (
              <div data-testid="track-order-sample" className="rounded-xl border border-gold/50 bg-gold/10 p-4">
                <p className="text-sm font-bold text-ink">Sample response for “{orderId.trim()}”</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  This prototype has no live order data. Once Shopify is connected, this panel will show dispatch status, courier and expected delivery for real orders.
                </p>
              </div>
            )}
            <button data-testid="track-order-submit" type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-ivory transition-colors hover:bg-saffron-dark">
              <PackageSearch size={15} /> Track order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
