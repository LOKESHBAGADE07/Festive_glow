import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import { inr } from "@/lib/format";

const POPULAR = ["Fairy lights", "Gift hamper", "Diya lantern", "Toran", "Candles"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const query = q.trim().toLowerCase();
  const results = query
    ? PRODUCTS.filter((p) =>
        [p.name, p.category, ...(p.tags || []), p.material].join(" ").toLowerCase().includes(query)
      ).slice(0, 6)
    : [];

  const submit = (term) => {
    const t = (term ?? q).trim();
    if (!t) return;
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(t)}`);
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="top-[12%] max-w-xl translate-y-0 gap-0 rounded-2xl border-line bg-ivory p-0 shadow-lift [&>button]:hidden">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <form
          data-testid="search-overlay-form"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-center gap-3 border-b border-line px-5 py-4"
        >
          <Search size={18} className="shrink-0 text-ink-soft" />
          <input
            data-testid="search-overlay-input"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lights, decor, gifts…"
            className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-soft/70"
            aria-label="Search products"
          />
          <button
            type="button"
            data-testid="search-overlay-close"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="rounded-full p-1.5 text-ink-soft hover:bg-secondary"
          >
            <X size={16} />
          </button>
        </form>

        <div className="max-h-[55vh] overflow-y-auto p-5">
          {!query && (
            <div data-testid="search-empty-state">
              <p className="nv-eyebrow mb-3 text-ink-soft">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((t) => (
                  <button
                    key={t}
                    data-testid={`search-suggestion-${t.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    onClick={() => submit(t)}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink hover:border-saffron hover:text-saffron-dark transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div data-testid="search-no-results" className="py-8 text-center">
              <p className="font-serif text-lg text-ink">No matches for “{q}”</p>
              <p className="mt-1 text-sm text-ink-soft">
                Try “lights”, “gift”, “diya” or “cushion”.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-line">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.handle}`}
                    data-testid={`search-result-${p.handle}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 py-3 group"
                  >
                    <img src={p.images[0].src} alt="" className="h-14 w-14 rounded-lg border border-line object-cover" loading="lazy" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink group-hover:text-saffron-dark">{p.name}</span>
                      <span className="text-xs text-ink-soft capitalize">{p.category}</span>
                    </span>
                    <span className="text-sm font-semibold text-ink">{inr(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 && (
            <button
              data-testid="search-view-all"
              onClick={() => submit()}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-dark hover:gap-2.5 transition-all"
            >
              View all results <ArrowUpRight size={15} />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
