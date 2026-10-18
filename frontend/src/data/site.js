import { px, us } from "./img";

export const BRAND = {
  name: "Noor & Vaani",
  tagline: "Five pieces. One glowing home.",
  legal: "Noor & Vaani — design prototype, not a live store",
};

export const ANNOUNCEMENT = {
  visible: true,
  message: "Festive Edit live · Free shipping over ₹999 · Orders dispatch within 24 hours",
};

export const FREE_SHIPPING_THRESHOLD = 999;

/* Honest urgency copy — operational facts, not fake scarcity. */
export const DELIVERY_PROMISE = {
  dispatch: "Dispatches within 24 hours",
  delivery: "Delivered in 3–6 days across India",
  returns: "7-day easy returns",
  secure: "Secure checkout · UPI, cards, net banking",
};

/* Welcome offer — demo code issued by the newsletter endpoint. */
export const WELCOME_OFFER = {
  percent: 10,
  code: "GLOW10",
  headline: "Get 10% off your first order",
};

/* WhatsApp help button — set a real number (country code, digits only) before launch. */
export const WHATSAPP = {
  number: "",
  message: "Hi Noor & Vaani — I have a question about your festive range.",
};

export const NAV = [
  { label: "Shop", to: "/collections/shop-all" },
  { label: "Bundles", to: "/bundles" },
  { label: "Gifting", to: "/collections/gifting" },
  { label: "Our Story", to: "/pages/about" },
];

export const COLLECTIONS = [
  {
    handle: "shop-all",
    name: "The Five",
    description: "Our entire range — five pieces chosen to layer together, from the doorway to the pooja corner.",
    image: px(6213685, 900),
  },
  {
    handle: "gifting",
    name: "Gifting",
    description: "The pieces that arrive gift-boxed and ready to hand over — no wrapping required.",
    image: us("1592903297149-37fb25202dfa", 900),
  },
];

export const COLLECTION_MAP = Object.fromEntries(COLLECTIONS.map((c) => [c.handle, c]));

export const BENEFITS = [
  { icon: "Truck", title: "Free shipping over ₹999", note: "Dispatched within 24 hours" },
  { icon: "RotateCcw", title: "7-day easy returns", note: "No questions asked" },
  { icon: "ShieldCheck", title: "Secure checkout", note: "UPI, cards & net banking" },
  { icon: "MessagesSquare", title: "Real human support", note: "WhatsApp & email, 10am–7pm" },
];

export const TRUST_ROW = [
  { title: "Ships in 24h", note: "free over ₹999" },
  { title: "7-day returns", note: "easy & hassle-free" },
  { title: "Secure checkout", note: "UPI · cards · net banking" },
];

export const SOCIALS = [
  { label: "Instagram", icon: "Instagram" },
  { label: "Facebook", icon: "Facebook" },
  { label: "YouTube", icon: "Youtube" },
];

export const PAYMENT_NOTE = "UPI · Cards · Net Banking — payment methods are configured at Shopify checkout";
