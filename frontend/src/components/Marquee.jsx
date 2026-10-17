export default function Marquee({ items, dark = false }) {
  const row = (ariaHidden) => (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-serif text-lg sm:text-xl ${i % 2 ? "italic font-light" : "font-medium"} ${
              dark ? "text-ivory/90" : "text-ink"
            }`}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className={`inline-block h-1.5 w-1.5 rotate-45 ${dark ? "bg-gold" : "bg-saffron"}`}
          />
        </span>
      ))}
    </div>
  );
  return (
    <div data-testid="marquee" className={`nv-marquee overflow-hidden border-y py-4 ${dark ? "border-white/10 bg-ink" : "border-line bg-white"}`}>
      <div className="nv-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
