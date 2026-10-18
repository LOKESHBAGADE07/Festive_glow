import { Link } from "react-router-dom";
import { Check, Minus } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { inr } from "@/lib/format";

const ROWS = [
  { label: "Best for", get: (p) => p.bestFor },
  { label: "Price", get: (p) => inr(p.price) },
  { label: "Gift-boxed", get: (p) => p.collections.includes("gifting") },
  { label: "Reusable", get: () => true },
  { label: "Open flame", get: (p) => p.category === "lights" && p.id !== "p-fairy-lights" },
  { label: "Setup time", get: (p) => ({ "p-lantern-set": "2 min", "p-diyas-6": "5 min", "p-fairy-lights": "10 min", "p-gift-box-classic": "None", "p-toran": "3 min" })[p.id] },
];

const Cell = ({ v }) =>
  typeof v === "boolean" ? (
    v ? <Check size={16} className="mx-auto text-success" aria-label="Yes" /> : <Minus size={16} className="mx-auto text-line-dark" aria-label="No" />
  ) : (
    <span>{v}</span>
  );

export default function CompareTable() {
  return (
    <div data-testid="compare-table" className="nv-scroll overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-36 p-4 text-[11px] font-bold uppercase tracking-widest text-ink-soft">Compare</th>
            {PRODUCTS.map((p) => (
              <th key={p.id} scope="col" className="p-4 align-top">
                <Link to={`/products/${p.handle}`} data-testid={`compare-head-${p.handle}`} className="group block">
                  <div className="mb-3 aspect-square w-full overflow-hidden rounded-xl">
                    <img src={p.images[0].src} alt="" className="nv-photo h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-saffron-dark">{p.kicker}</span>
                  <span className="block font-serif text-base font-semibold leading-tight text-ink group-hover:text-saffron-dark">{p.name}</span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0 odd:bg-ivory/60">
              <th scope="row" className="p-4 text-xs font-bold text-ink">{r.label}</th>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center text-xs text-ink-soft sm:text-sm">
                  <Cell v={r.get(p)} />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-4" />
            {PRODUCTS.map((p) => (
              <td key={p.id} className="p-4 text-center">
                <Link data-testid={`compare-cta-${p.handle}`} to={`/products/${p.handle}`} className="inline-flex rounded-full border border-ink px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-ivory">
                  View
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
