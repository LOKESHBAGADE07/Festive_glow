import { px, us } from "./img";

export const BRAND = {
  name: "Noor & Vaani",
  tagline: "Curated decor & thoughtful gifts",
  // Placeholder — replace with the real registered business details before launch.
  legal: "Noor & Vaani — design prototype, not a live store",
};

// Announcement bar — message, background and visibility are configurable here.
export const ANNOUNCEMENT = {
  visible: true,
  message: "Celebrate the season with thoughtfully curated festive decor.",
};

// Demo shipping threshold. Change here and every progress bar/message updates.
export const FREE_SHIPPING_THRESHOLD = 999;

export const NAV = [
  { label: "Shop All", to: "/collections/shop-all" },
  { label: "Lights", to: "/collections/lights" },
  { label: "Decor", to: "/collections/decor" },
  { label: "Gifts", to: "/collections/gifts" },
  { label: "Apparel", to: "/collections/apparel" },
  { label: "Our Story", to: "/pages/about" },
];

export const CATEGORIES = [
  {
    handle: "lights",
    name: "Lights",
    short: "Fairy lights, lanterns & diyas",
    description:
      "Warm fairy lights, brass lanterns and hand-painted diyas to give every corner a festive glow.",
    image: px(7209324, 900),
  },
  {
    handle: "decor",
    name: "Decor",
    short: "Torans, rangoli & candles",
    description:
      "Door torans, rangoli kits, candles and objects that style your home for the season — and beyond it.",
    image: px(8818759, 900),
  },
  {
    handle: "gifts",
    name: "Gifts & Hampers",
    short: "Curated boxes for every occasion",
    description:
      "Curated gift boxes and hampers for Diwali, housewarmings, weddings and every celebration in between.",
    image: us("1695568179701-462c5ea05e41", 900),
  },
  {
    handle: "apparel",
    name: "Apparel & Accessories",
    short: "Cushions, runners & textiles",
    description:
      "Block-printed cushions, table runners and soft furnishings that bring festive warmth home.",
    image: us("1575277340591-849c346c4542", 900),
  },
];

export const CATEGORY_MAP = Object.fromEntries([
  ...CATEGORIES.map((c) => [c.handle, c]),
  ["shop-all", { handle: "shop-all", name: "Shop All", description: "Every product in the demo catalogue — lights, decor, gifts and textiles." }],
]);

// Proposed store policies (demo values — configure before launch).
export const BENEFITS = [
  { icon: "Truck", title: "Free shipping over ₹999", note: "Demo threshold — configurable" },
  { icon: "RotateCcw", title: "Easy returns", note: "As per the returns policy" },
  { icon: "ShieldCheck", title: "Secure checkout", note: "UPI, cards & net banking at checkout" },
  { icon: "MessagesSquare", title: "Customer support", note: "Support hours set at launch" },
];

export const TRUST_ROW = [
  { title: "Free Shipping", note: "on orders over ₹999 (demo)" },
  { title: "Returns", note: "as per our returns policy" },
  { title: "Secure Checkout", note: "via Shopify when live" },
];

export const SOCIALS = [
  { label: "Instagram", icon: "Instagram" },
  { label: "Facebook", icon: "Facebook" },
  { label: "YouTube", icon: "Youtube" },
];

export const PAYMENT_NOTE = "UPI · Cards · Net Banking — payment methods are configured at Shopify checkout";
