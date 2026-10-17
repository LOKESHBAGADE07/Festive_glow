export const Mark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <rect width="64" height="64" rx="14" fill="#29251F" />
    <path d="M32 11c7.2 8.2 12 13.4 12 20.4a12 12 0 0 1-24 0C20 24.4 24.8 19.2 32 11z" fill="#E89124" />
    <path d="M32 24.5c3.4 4 5.6 6.6 5.6 10a5.6 5.6 0 1 1-11.2 0c0-3.4 2.2-6 5.6-10z" fill="#FFF9F0" />
    <path d="M17 46.5h30c-1.6 4.9-7.7 7.5-15 7.5s-13.4-2.6-15-7.5z" fill="#D6B36A" />
  </svg>
);

export default function Logo({ light = false, size = "md" }) {
  const title = size === "lg" ? "text-2xl sm:text-3xl" : "text-xl";
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={size === "lg" ? 34 : 28} />
      <span className={`font-serif ${title} leading-none tracking-tight ${light ? "text-ivory" : "text-ink"}`}>
        Noor <em className={`not-italic font-sans font-light ${light ? "text-gold" : "text-saffron"}`}>&amp;</em> Vaani
      </span>
    </span>
  );
}
