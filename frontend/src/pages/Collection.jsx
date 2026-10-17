import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, PackageSearch } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { productsByCategory, PRODUCTS } from "@/data/products";
import { CATEGORY_MAP } from "@/data/site";

const PRICE_BUCKETS = [
  { id: "under-500", label: "Under ₹500", test: (p) => p.price < 500 },
  { id: "500-999", label: "₹500 – ₹999", test: (p) => p.price >= 500 && p.price <= 999 },
  { id: "1000-1999", label: "₹1,000 – ₹1,999", test: (p) => p.price >= 1000 && p.price <= 1999 },
  { id: "2000-plus", label: "₹2,000 & above", test: (p) => p.price >= 2000 },
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
];

const PAGE_SIZE = 8;

function FilterPanel({ base, params, toggle, reset, activeCount }) {
  const colors = useMemo(() => [...new Set(base.flatMap((p) => p.colorTags || []))].sort(), [base]);
  const materials = useMemo(() => [...new Set(base.map((p) => p.material))].sort(), [base]);
  const priceSel = (params.get("price") || "").split(",").filter(Boolean);
  const colorSel = (params.get("color") || "").split(",").filter(Boolean);
  const materialSel = (params.get("material") || "").split(",").filter(Boolean);
  const stockSel = params.get("stock") === "1";

  const group = (title, testId, children) => (
    <div className="border-b border-line py-5 last:border-0">
      <p className="nv-eyebrow mb-3.5 text-ink">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );

  return (
    <div data-testid="filter-panel" className="pb-2">
      <div className="flex items-center justify-between pb-1">
        <p className="font-serif text-lg font-semibold text-ink">Filters</p>
        {activeCount > 0 && (
          <button data-testid="filter-panel-reset" onClick={reset} className="text-xs font-bold text-saffron-dark underline underline-offset-4">
            Reset all ({activeCount})
          </button>
        )}
      </div>
      <div className="border-b border-line py-5">
        <p className="nv-eyebrow mb-3.5 text-ink">Price</p>
        <div className="space-y-2.5">
          {PRICE_BUCKETS.map((b) => (
            <label key={b.id} data-testid={`filter-price-${b.id}`} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
              <Checkbox checked={priceSel.includes(b.id)} onCheckedChange={() => toggle("price", b.id)} />
              {b.label}
            </label>
          ))}
        </div>
      </div>
      <div className="border-b border-line py-5">
        <p className="nv-eyebrow mb-3.5 text-ink">Availability</p>
        <label data-testid="filter-stock" className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
          <Checkbox checked={stockSel} onCheckedChange={() => toggle("stock", "1")} />
          In stock only
        </label>
      </div>
      {colors.length > 0 && (
        <div className="border-b border-line py-5">
          <p className="nv-eyebrow mb-3.5 text-ink">Colour</p>
          <div className="space-y-2.5">
            {colors.map((c) => (
              <label key={c} data-testid={`filter-color-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                <Checkbox checked={colorSel.includes(c)} onCheckedChange={() => toggle("color", c)} />
                {c}
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="py-5">
        <p className="nv-eyebrow mb-3.5 text-ink">Material</p>
        <div className="space-y-2.5">
          {materials.map((m) => (
            <label key={m} data-testid={`filter-material-${m.toLowerCase().replace(/[^a-z]+/g, "-").slice(0, 24)}`} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
              <Checkbox checked={materialSel.includes(m)} onCheckedChange={() => toggle("material", m)} />
              <span className="min-w-0 truncate">{m}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Collection() {
  const { handle = "shop-all" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const cat = CATEGORY_MAP[handle] || CATEGORY_MAP["shop-all"];
  const base = useMemo(() => productsByCategory(handle), [handle]);

  const activeCount =
    (searchParams.get("price")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("color")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("material")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("stock") === "1" ? 1 : 0);

  const toggle = (key, value) => {
    const next = new URLSearchParams(searchParams);
    const cur = (next.get(key) || "").split(",").filter(Boolean);
    const updated = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    if (updated.length) next.set(key, updated.join(","));
    else next.delete(key);
    setSearchParams(next, { preventScrollReset: true });
    setVisible(PAGE_SIZE);
  };

  const reset = () => {
    const next = new URLSearchParams(searchParams);
    ["price", "color", "material", "stock"].forEach((k) => next.delete(k));
    setSearchParams(next, { preventScrollReset: true });
    setVisible(PAGE_SIZE);
  };

  const setSort = (v) => {
    const next = new URLSearchParams(searchParams);
    if (v === "featured") next.delete("sort");
    else next.set("sort", v);
    setSearchParams(next, { preventScrollReset: true });
  };

  const filtered = useMemo(() => {
    const priceSel = (searchParams.get("price") || "").split(",").filter(Boolean);
    const colorSel = (searchParams.get("color") || "").split(",").filter(Boolean);
    const materialSel = (searchParams.get("material") || "").split(",").filter(Boolean);
    const stockOnly = searchParams.get("stock") === "1";
    const sort = searchParams.get("sort") || "featured";

    let list = base.filter((p) => {
      if (priceSel.length && !priceSel.some((id) => PRICE_BUCKETS.find((b) => b.id === id)?.test(p))) return false;
      if (colorSel.length && !(p.colorTags || []).some((c) => colorSel.includes(c))) return false;
      if (materialSel.length && !materialSel.includes(p.material)) return false;
      if (stockOnly && !p.inStock) return false;
      return true;
    });

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest") list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return list;
  }, [base, searchParams]);

  const shown = filtered.slice(0, visible);
  const chips = [
    ...(searchParams.get("price") || "").split(",").filter(Boolean).map((id) => ({ key: `price:${id}`, label: PRICE_BUCKETS.find((b) => b.id === id)?.label, clear: () => toggle("price", id) })),
    ...(searchParams.get("color") || "").split(",").filter(Boolean).map((c) => ({ key: `color:${c}`, label: c, clear: () => toggle("color", c) })),
    ...(searchParams.get("material") || "").split(",").filter(Boolean).map((m) => ({ key: `material:${m}`, label: m, clear: () => toggle("material", m) })),
    ...(searchParams.get("stock") === "1" ? [{ key: "stock:1", label: "In stock", clear: () => toggle("stock", "1") }] : []),
  ];

  return (
    <>
      <Seo
        title={`${cat.name} — Noor & Vaani`}
        description={cat.description || `${cat.name} collection of curated festive decor and gifts.`}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Breadcrumbs trail={[{ label: "Shop", to: "/collections/shop-all" }, { label: cat.name }]} />
        <header className="mt-6 mb-8 max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">{cat.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{cat.description}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <FilterPanel base={base} params={searchParams} toggle={toggle} reset={reset} activeCount={activeCount} />
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  data-testid="filter-open-btn"
                  onClick={() => setFilterOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-saffron lg:hidden"
                >
                  <SlidersHorizontal size={15} /> Filters
                  {activeCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-bold text-white">{activeCount}</span>
                  )}
                </button>
                <p data-testid="collection-result-count" className="text-xs text-ink-soft">
                  Showing {shown.length} of {filtered.length} products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs font-semibold text-ink-soft">Sort</label>
                <Select value={searchParams.get("sort") || "featured"} onValueChange={setSort}>
                  <SelectTrigger data-testid="sort-select" id="sort-select" className="h-10 w-[180px] rounded-full border-line bg-white text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-line bg-white">
                    {SORTS.map((s) => (
                      <SelectItem key={s.id} data-testid={`sort-option-${s.id}`} value={s.id}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {chips.length > 0 && (
              <div data-testid="filter-chips" className="mb-5 flex flex-wrap items-center gap-2">
                {chips.map((c) => (
                  <button key={c.key} data-testid={`filter-chip-${c.key.replace(/[^a-z0-9]+/gi, "-")}`} onClick={c.clear} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ivory hover:bg-error transition-colors">
                    {c.label} <X size={12} />
                  </button>
                ))}
                <button data-testid="filter-chips-reset" onClick={reset} className="text-xs font-bold text-saffron-dark underline underline-offset-4">Clear all</button>
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState
                icon={PackageSearch}
                title="No products match these filters"
                description="Try widening the price range or clearing a colour or material selection."
                action={
                  <button data-testid="collection-empty-reset" onClick={reset} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ivory hover:bg-saffron-dark transition-colors">
                    Reset filters
                  </button>
                }
              />
            ) : (
              <>
                <div data-testid="collection-grid" className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                  {shown.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 4) * 0.05} className="h-full">
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
                {visible < filtered.length && (
                  <div className="mt-12 text-center">
                    <button
                      data-testid="load-more-btn"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-full border border-ink px-8 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-ivory"
                    >
                      Load more ({filtered.length - visible} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto border-line bg-ivory p-5 [&>button]:hidden">
          <SheetHeader className="p-0 pb-2 text-left">
            <SheetTitle className="sr-only">Filters</SheetTitle>
            <SheetDescription className="sr-only">Filter products in this collection</SheetDescription>
          </SheetHeader>
          <FilterPanel base={base} params={searchParams} toggle={toggle} reset={reset} activeCount={activeCount} />
          <button data-testid="filter-drawer-done" onClick={() => setFilterOpen(false)} className="mt-2 w-full rounded-full bg-saffron py-3.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-saffron-dark">
            Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </button>
        </SheetContent>
      </Sheet>
    </>
  );
}
