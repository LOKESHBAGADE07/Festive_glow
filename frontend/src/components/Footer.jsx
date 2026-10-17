import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import { CATEGORIES, PAYMENT_NOTE, SOCIALS } from "@/data/site";

const HELP_LINKS = [
  { label: "About Us", to: "/pages/about" },
  { label: "Contact", to: "/pages/contact" },
  { label: "FAQ", to: "/pages/faq" },
  { label: "Track Order", to: "/pages/track-order" },
];

const POLICY_LINKS = [
  { label: "Shipping Policy", to: "/pages/shipping-policy" },
  { label: "Returns & Refunds", to: "/pages/returns-refunds" },
  { label: "Privacy Policy", to: "/pages/privacy-policy" },
  { label: "Terms of Service", to: "/pages/terms-of-service" },
];

const SOCIAL_ICONS = { Instagram, Facebook, Youtube };

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Beautifully curated home decor and meaningful gifts — festive Indian warmth, modern minimalism.
            </p>
            <ul className="mt-5 flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <li key={s.label}>
                    <button
                      data-testid={`footer-social-${s.label.toLowerCase()}`}
                      aria-label={`${s.label} — configure the link in site settings`}
                      title="Configure this link in site settings"
                      className="rounded-full border border-line p-2.5 text-ink-soft hover:border-saffron hover:text-saffron-dark transition-colors"
                    >
                      <Icon size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-soft">
              <MapPin size={13} /> India — business address to be configured
            </p>
          </div>

          <nav aria-label="Shop" className="lg:col-span-2">
            <p className="nv-eyebrow mb-4 text-ink">Shop</p>
            <ul className="space-y-2.5">
              <li><Link data-testid="footer-shop-all" to="/collections/shop-all" className="text-sm text-ink-soft hover:text-saffron-dark">Shop All</Link></li>
              {CATEGORIES.map((c) => (
                <li key={c.handle}>
                  <Link data-testid={`footer-collection-${c.handle}`} to={`/collections/${c.handle}`} className="text-sm text-ink-soft hover:text-saffron-dark">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help" className="lg:col-span-2">
            <p className="nv-eyebrow mb-4 text-ink">Help</p>
            <ul className="space-y-2.5">
              {HELP_LINKS.map((l) => (
                <li key={l.to}>
                  <Link data-testid={`footer-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`} to={l.to} className="text-sm text-ink-soft hover:text-saffron-dark">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Policies" className="lg:col-span-2">
            <p className="nv-eyebrow mb-4 text-ink">Policies</p>
            <ul className="space-y-2.5">
              {POLICY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link data-testid={`footer-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`} to={l.to} className="text-sm text-ink-soft hover:text-saffron-dark">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="nv-eyebrow mb-4 text-ink">Stay in touch</p>
            <NewsletterForm compact source="footer" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} Noor & Vaani · Design prototype — not a live store. Prices, reviews and policies are demo data.
          </p>
          <p className="text-xs text-ink-soft">{PAYMENT_NOTE}</p>
        </div>
      </div>
    </footer>
  );
}
