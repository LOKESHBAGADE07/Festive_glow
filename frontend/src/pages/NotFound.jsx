import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — Noor & Vaani" description="The page you're looking for doesn't exist." />
      <div data-testid="not-found-page" className="flex min-h-[70vh] items-center justify-center px-4 py-20 text-center">
        <div>
          <p className="nv-eyebrow mb-3 text-saffron-dark">404</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">This corner isn’t lit</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            The page you’re looking for has moved or never existed. Let’s guide you back to the glow.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link data-testid="not-found-home" to="/" className="rounded-full bg-saffron px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-saffron-dark">
              Back to home
            </Link>
            <Link data-testid="not-found-shop" to="/collections/shop-all" className="rounded-full border border-ink px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-ivory">
              Shop all products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
