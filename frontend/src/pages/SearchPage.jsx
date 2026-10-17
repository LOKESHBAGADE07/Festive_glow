import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import { PRODUCTS } from "@/data/products";

const SUGGESTIONS = ["Fairy lights", "Gift hamper", "Diya lantern", "Toran", "Candles", "Cushion"];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();
  const query = q.toLowerCase();

  const results = query
    ? PRODUCTS.filter((p) =>
        [p.name, p.category, ...(p.tags || []), p.material].join(" ").toLowerCase().includes(query)
      )
    : [];

  return (
    <>
      <Seo title={`Search${q ? `: ${q}` : ""} — Noor & Vaani`} description="Search the festive catalogue — lights, decor, gifts and textiles." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {q ? <>Results for “{q}”</> : "Search the store"}
        </h1>
        <form
          data-testid="search-page-form"
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex max-w-xl items-center gap-3 rounded-full border border-line bg-white px-5 py-3.5 shadow-card focus-within:border-saffron"
        >
          <input
            data-testid="search-page-input"
            value={q}
            onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {}, { preventScrollReset: true })}
            placeholder="Search lights, decor, gifts…"
            aria-label="Search products"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft/70"
          />
        </form>

        {!q && (
          <div className="mt-10" data-testid="search-page-empty">
            <p className="nv-eyebrow mb-3 text-ink-soft">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((t) => (
                <button
                  key={t}
                  data-testid={`search-page-suggestion-${t.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  onClick={() => setSearchParams({ q: t }, { preventScrollReset: true })}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink hover:border-saffron hover:text-saffron-dark transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && results.length === 0 && (
          <div className="mt-10">
            <EmptyState
              icon={SearchX}
              title={`No matches for “${q}”`}
              description="Try a broader term — or explore the collections below."
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.slice(0, 4).map((t) => (
                    <button key={t} data-testid={`no-results-suggestion-${t.toLowerCase().replace(/[^a-z]+/g, "-")}`} onClick={() => setSearchParams({ q: t }, { preventScrollReset: true })} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-saffron">
                      {t}
                    </button>
                  ))}
                </div>
              }
            />
          </div>
        )}

        {results.length > 0 && (
          <>
            <p data-testid="search-page-count" className="mt-8 text-xs text-ink-soft">
              {results.length} {results.length === 1 ? "product" : "products"} found
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.05} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
