import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
        <li>
          <Link to="/" className="hover:text-saffron-dark transition-colors">Home</Link>
        </li>
        {trail.map((t, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-line-dark" aria-hidden="true" />
            {t.to ? (
              <Link to={t.to} className="hover:text-saffron-dark transition-colors">{t.label}</Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
