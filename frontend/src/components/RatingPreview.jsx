import { Star, StarHalf } from "lucide-react";

/* Ratings shown are preview data only — never presented as real reviews. */
export default function RatingPreview({ rating, count, light = false }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3 && rating - full < 0.8;
  const round = rating - full >= 0.8;
  return (
    <div data-testid="rating-preview" className="flex items-center gap-1.5" title="Preview data — sample rating, not real reviews">
      <span className="flex text-saffron" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <Star key={i} size={13} fill="currentColor" strokeWidth={0} />;
          if (i === full && (half || round))
            return round ? (
              <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
            ) : (
              <StarHalf key={i} size={13} fill="currentColor" strokeWidth={0} />
            );
          return <Star key={i} size={13} className="text-line-dark" fill="currentColor" strokeWidth={0} />;
        })}
      </span>
      <span className={`text-xs font-semibold ${light ? "text-ivory" : "text-ink"}`}>{rating.toFixed(1)}</span>
      <span className="rounded-full border border-gold/50 bg-gold/10 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-saffron-dark">
        Preview
      </span>
      {typeof count === "number" && (
        <span className={`text-xs ${light ? "text-ivory/70" : "text-ink-soft"}`}>({count})</span>
      )}
    </div>
  );
}
