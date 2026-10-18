import { Link } from "react-router-dom";
import { X, Heart, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useStore } from "@/context/StoreContext";
import { NAV, SOCIALS } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import Logo from "@/components/Logo";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStore();
  const close = () => setMenuOpen(false);
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="left" className="w-[86vw] max-w-sm border-line bg-ivory p-0 [&>button]:hidden">
        <SheetHeader className="border-b border-line p-5 pb-4 text-left">
          <SheetTitle asChild>
            <div className="flex items-center justify-between">
              <Link to="/" onClick={close} aria-label="Noor & Vaani home" data-testid="mobile-menu-logo">
                <Logo />
              </Link>
              <button data-testid="mobile-menu-close" aria-label="Close menu" onClick={close} className="rounded-full p-2 hover:bg-secondary">
                <X size={18} />
              </button>
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex h-[calc(100%-140px)] flex-col justify-between p-5">
          <div>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    onClick={close}
                    className="block rounded-lg px-3 py-3 font-serif text-xl text-ink hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="nv-eyebrow mt-6 mb-2 px-3 text-ink-soft">The Five</p>
            <ul className="space-y-0.5">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.handle}`}
                    data-testid={`mobile-menu-product-${p.handle}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-secondary"
                  >
                    <img src={p.images[0].src} alt="" className="nv-photo h-8 w-8 rounded-md object-cover" />
                    <span className="min-w-0 truncate">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line pt-4">
            <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <button
                    data-testid={`mobile-social-${s.label.toLowerCase()}`}
                    onClick={close}
                    className="text-ink-soft underline decoration-line underline-offset-4"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/wishlist" onClick={close} data-testid="mobile-menu-wishlist" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <Heart size={16} /> Wishlist
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
