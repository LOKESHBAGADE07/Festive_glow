import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import Logo from "@/components/Logo";
import { useStore } from "@/context/StoreContext";
import { NAV } from "@/data/site";

export default function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, setMenuOpen } = useStore();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-40 border-b border-line bg-ivory/85 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-card" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <div className="flex items-center gap-2">
          <button
            data-testid="mobile-menu-open"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 rounded-full p-2.5 text-ink hover:bg-secondary lg:hidden"
          >
            <Menu size={20} />
          </button>
          <Link to="/" data-testid="header-logo-link" aria-label="Noor & Vaani home">
            <Logo />
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  data-testid={`nav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  data-active={pathname === item.to}
                  className="nv-link text-[13px] font-semibold tracking-wide text-ink hover:text-saffron-dark transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            data-testid="header-search-btn"
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2.5 text-ink hover:bg-secondary transition-colors"
          >
            <Search size={20} />
          </button>
          <Link
            to="/wishlist"
            data-testid="header-wishlist-link"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="relative rounded-full p-2.5 text-ink hover:bg-secondary transition-colors"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span data-testid="wishlist-count-badge" className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            data-testid="header-cart-btn"
            aria-label={`Shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
            className="relative rounded-full p-2.5 text-ink hover:bg-secondary transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span data-testid="cart-count-badge" className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
