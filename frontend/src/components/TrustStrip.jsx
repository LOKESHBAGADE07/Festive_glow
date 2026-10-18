import { Truck, RotateCcw, ShieldCheck, Banknote, Hand, Gift } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Dispatch in 24h", note: "Free shipping over ₹999" },
  { icon: Banknote, title: "Cash on Delivery", note: "Available across India" },
  { icon: RotateCcw, title: "7-day easy returns", note: "We arrange the pickup" },
  { icon: ShieldCheck, title: "Secure payments", note: "UPI · Cards · Net banking" },
  { icon: Hand, title: "Handmade in India", note: "Small artisan workshops" },
  { icon: Gift, title: "Gift-boxed, always", note: "Free handwritten note" },
];

export default function TrustStrip({ compact = false }) {
  const list = compact ? ITEMS.slice(0, 4) : ITEMS;
  return (
    <section data-testid="trust-strip" className="border-y border-gold/30 bg-ivory">
      <ul className={`mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line px-0 sm:grid-cols-3 ${compact ? "lg:grid-cols-4" : "lg:grid-cols-6"}`}>
        {list.map((b) => (
          <li key={b.title} className="flex items-center gap-3 bg-ivory px-4 py-4">
            <b.icon size={18} className="shrink-0 text-saffron-dark" />
            <span>
              <span className="block text-[13px] font-bold text-ink">{b.title}</span>
              <span className="block text-[11px] text-ink-soft">{b.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
