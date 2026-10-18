import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const StoreContext = createContext(null);
const load = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("nv_cart_v1", []));
  const [wishlist, setWishlist] = useState(() => load("nv_wishlist_v1", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("nv_cart_v1", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("nv_wishlist_v1", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, variant, qty = 1) => {
    if (!product || !variant) return;
    if (!variant.available) {
      toast.error("This variant is currently unavailable.", { id: "nv-oos" });
      return;
    }
    const key = `${product.id}:${variant.id}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(i.qty + qty, 10) } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          handle: product.handle,
          url: product.isBundle ? "/bundles" : `/products/${product.handle}`,
          isBundle: !!product.isBundle,
          title: product.name,
          variantId: variant.id,
          variantLabel: variant.label,
          price: variant.price,
          compareAt: variant.compareAt,
          image: product.images[0]?.src,
          qty,
        },
      ];
    });
    toast.success("Added to your bag.", { id: "nv-atc" });
    setCartOpen(true);
  };

  const updateQty = (key, qty) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, 10) } : i))
    );

  const removeItem = (key) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
    toast("Item removed from your bag.", { id: "nv-remove" });
  };

  const toggleWishlist = (product) => {
    const has = wishlist.includes(product.id);
    setWishlist((prev) =>
      has ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
    if (has) toast("Removed from wishlist.", { id: "nv-wl-r" });
    else toast.success("Saved to wishlist.", { id: "nv-wl-a" });
  };

  const inWishlist = (id) => wishlist.includes(id);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        cart, cartCount, subtotal, addToCart, updateQty, removeItem,
        wishlist, toggleWishlist, inWishlist,
        cartOpen, setCartOpen, searchOpen, setSearchOpen, menuOpen, setMenuOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
