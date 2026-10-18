import { px, us } from "./img";

/*
 * HERO CATALOGUE — a deliberately focused range of five products.
 * Prices, ratings and review counts are preview placeholders. In the Shopify
 * build this file maps 1:1 to product objects (options, variants, images, tags).
 */

const P = (p) => ({
  currency: "INR",
  inStock: true,
  isDemo: true,
  collections: ["shop-all"],
  ...p,
  options: p.options || [],
  variants:
    p.variants ||
    [{ id: "default", options: [], label: "", price: p.price, compareAt: p.compareAt, available: p.inStock !== false, sku: p.sku || p.id.toUpperCase() }],
});

export const PRODUCTS = [
  P({
    id: "p-lantern-set",
    handle: "elegant-brass-diya-lanterns-set-of-4",
    name: "Elegant Brass Diya Lanterns",
    short: "Set of 4",
    kicker: "The Flagship",
    category: "lights",
    collections: ["shop-all", "gifting"],
    benefit: "Four cut-work lanterns that paint every wall with warm, patterned light.",
    bestFor: "Consoles, pooja corners & gifting",
    price: 1899,
    compareAt: 2499,
    badge: "Bestseller",
    highlights: ["Hand-finished cut-work", "Fits tea lights & LED candles", "Gift-boxed"],
    images: [
      { src: px(36168883, 1400), alt: "Gold cut-work brass lantern glowing with candlelight" },
      { src: us("1781947486860-197257ddbb7b", 1400), alt: "Brass diya lantern with a lit candle on a marble surface" },
      { src: px(18688775, 1400), alt: "Vintage brass lantern with a flickering flame" },
      { src: px(7209324, 1400), alt: "Lanterns styled along a table in warm light" },
    ],
    colorTags: ["Antique Brass", "Champagne Gold"],
    material: "Metal with brass-tone finish",
    rating: 4.8,
    reviewCount: 214,
    createdAt: "2025-09-18",
    description:
      "Our most-loved piece. Four table lanterns with a hand-finished cut-work frame that throws soft floral patterns across the room the moment you light them. Cluster them around a rangoli, line a windowsill, or anchor the console — the proportions are designed to layer with the rest of the range.",
    features: [
      "Hand-finished cut-work frame casts patterned light",
      "Works with tea lights, oil diyas or flameless LED candles",
      "Set of four for balanced, layered arrangements",
      "Arrives gift-boxed with a tissue wrap — ready to give",
    ],
    specs: {
      "Material": "Metal with brass-tone finish",
      "Finish options": "Antique Brass / Champagne Gold",
      "Dimensions": "Approx. 15 cm H x 10 cm W each",
      "Package contents": "4 lanterns in a gift box (candles not included)",
      "Care": "Wipe with a soft dry cloth; avoid abrasive cleaners",
      "Safety": "Never leave a flame unattended; LED candles recommended around fabrics",
    },
    options: [
      { name: "Finish", values: [{ label: "Antique Brass", hex: "#8C5A24" }, { label: "Champagne Gold", hex: "#D6B36A" }] },
      { name: "Set", values: [{ label: "Set of 2" }, { label: "Set of 4" }, { label: "Set of 6" }] },
    ],
    variants: [
      { id: "ab-2", options: ["Antique Brass", "Set of 2"], label: "Antique Brass · Set of 2", price: 1049, available: true, sku: "NV-LAN-AB-02" },
      { id: "ab-4", options: ["Antique Brass", "Set of 4"], label: "Antique Brass · Set of 4", price: 1899, compareAt: 2499, available: true, sku: "NV-LAN-AB-04" },
      { id: "ab-6", options: ["Antique Brass", "Set of 6"], label: "Antique Brass · Set of 6", price: 2699, available: false, sku: "NV-LAN-AB-06" },
      { id: "cg-2", options: ["Champagne Gold", "Set of 2"], label: "Champagne Gold · Set of 2", price: 1049, available: true, sku: "NV-LAN-CG-02" },
      { id: "cg-4", options: ["Champagne Gold", "Set of 4"], label: "Champagne Gold · Set of 4", price: 1899, compareAt: 2499, available: true, sku: "NV-LAN-CG-04" },
      { id: "cg-6", options: ["Champagne Gold", "Set of 6"], label: "Champagne Gold · Set of 6", price: 2699, available: false, sku: "NV-LAN-CG-06" },
    ],
    pairsWith: ["p-diyas-6", "p-fairy-lights"],
    faqs: [
      { q: "Can I use real flames?", a: "Yes — tea lights or small oil diyas sit inside the frame. For homes with children or curtains nearby we recommend flameless LED candles." },
      { q: "Will the finish tarnish?", a: "The brass-tone finish is sealed. Wipe with a dry cloth after the season and store in the box provided." },
    ],
    tags: ["Diwali decoration items", "diya lantern set", "festive home decor"],
  }),
  P({
    id: "p-diyas-6",
    handle: "hand-painted-terracotta-diyas-set-of-6",
    name: "Hand-Painted Terracotta Diyas",
    short: "Set of 6",
    kicker: "The Classic",
    category: "lights",
    collections: ["shop-all", "gifting"],
    benefit: "Six artisan-painted clay diyas — the tradition, done beautifully.",
    bestFor: "Thresholds, rangoli & pooja thalis",
    price: 449,
    compareAt: 599,
    badge: "Artisan-made",
    highlights: ["Hand-painted by artisans", "Oil-wick or LED ready", "Gift-boxed"],
    images: [
      { src: us("1603030002297-85e206a2285a", 1400), alt: "Hand-painted diyas arranged on a terracotta surface" },
      { src: us("1635842975205-d6c2f1c0e1fe", 1400), alt: "Two lit painted diyas glowing on a window ledge" },
      { src: px(10182772, 1400), alt: "Traditional diyas casting a warm festive glow" },
      { src: px(39189948, 1400), alt: "Unpainted terracotta diyas stacked at the artisan workshop" },
    ],
    colorTags: ["Terracotta", "Multicolour"],
    material: "Terracotta",
    rating: 4.9,
    reviewCount: 241,
    createdAt: "2025-09-25",
    description:
      "Six terracotta diyas hand-painted with festive rims and motifs, each slightly different because a person — not a machine — made it. Fill with oil and a cotton wick for the traditional glow, or drop in an LED tea light for a worry-free evening. Boxed for gifting.",
    features: [
      "Hand-painted by artisan partners — gentle variation between pieces",
      "Suitable for oil + wick or LED tea lights",
      "Rim design chosen to catch and reflect the flame",
      "Gift-boxed with a tissue wrap",
    ],
    specs: {
      "Material": "Terracotta",
      "Dimensions": "Approx. 6 cm dia each",
      "Package contents": "6 diyas in a gift box (wicks and oil not included)",
      "Care": "Wipe dry after use; avoid soaking painted surfaces",
      "Safety": "Place on a heat-safe surface; never leave flames unattended",
    },
    options: [{ name: "Palette", values: [{ label: "Festive Multicolour", hex: "#C85A32" }, { label: "Ivory & Gold", hex: "#D6B36A" }] }],
    variants: [
      { id: "mc", options: ["Festive Multicolour"], label: "Festive Multicolour · Set of 6", price: 449, compareAt: 599, available: true, sku: "NV-DIYA-MC-06" },
      { id: "ig", options: ["Ivory & Gold"], label: "Ivory & Gold · Set of 6", price: 499, compareAt: 649, available: true, sku: "NV-DIYA-IG-06" },
    ],
    pairsWith: ["p-lantern-set", "p-toran"],
    faqs: [
      { q: "Are they reusable?", a: "Yes. Let the diya cool, wipe out any residue and store in the box. With care they last several seasons." },
      { q: "Are wicks included?", a: "Wicks and oil are not included so the box ships safely. Standard cotton wicks fit perfectly." },
    ],
    tags: ["diya set", "Diwali decoration items"],
  }),
  P({
    id: "p-fairy-lights",
    handle: "decorative-led-fairy-lights-warm-white",
    name: "Warm White LED Fairy Lights",
    short: "10 metres",
    kicker: "The Everyday Glow",
    category: "lights",
    benefit: "Ten metres of fine-wire warmth for shelves, balconies and mirrors.",
    bestFor: "Balconies, mirrors & shelves",
    price: 349,
    compareAt: 499,
    badge: "Most gifted add-on",
    highlights: ["10 m · 100 LEDs", "Bendable copper wire", "Stays cool to touch"],
    images: [
      { src: us("1513538416877-f11f5fb85d83", 1400), alt: "Warm fairy lights coiled and glowing against a dark background" },
      { src: px(5836535, 1400), alt: "Warm bokeh from string lights on a textured wall" },
      { src: us("1511461744085-90a4d1c66be3", 1400), alt: "String lights draped across a window in warm light" },
      { src: px(1791742, 1400), alt: "Fairy lights wrapped around an open book" },
    ],
    colorTags: ["Warm White"],
    material: "Copper wire, LED",
    rating: 4.7,
    reviewCount: 186,
    createdAt: "2025-09-10",
    description:
      "Ten metres of fine copper-wire LEDs in a true warm white — no blue cast, no harsh points of light. Wind it around railings, drape it over a mirror, or fill a glass jar. The wire holds its shape and the LEDs stay cool, so it reads festive without feeling loud.",
    features: [
      "10 m length · 100 warm-white LEDs",
      "Bendable copper wire holds any shape",
      "Low-heat LEDs — safe around textiles",
      "Indoor and sheltered-balcony use",
    ],
    specs: {
      "Length": "10 m",
      "LEDs": "100, warm white (2700K)",
      "Power": "USB (adapter not included) or 3×AA battery pack variant",
      "Package contents": "1 string light",
      "Care": "Coil gently; store away from moisture",
    },
    options: [{ name: "Power", values: [{ label: "USB" }, { label: "Battery" }] }],
    variants: [
      { id: "usb", options: ["USB"], label: "USB · 10 m", price: 349, compareAt: 499, available: true, sku: "NV-FL-USB-10" },
      { id: "bat", options: ["Battery"], label: "Battery · 10 m", price: 399, compareAt: 549, available: true, sku: "NV-FL-BAT-10" },
    ],
    pairsWith: ["p-lantern-set", "p-toran"],
    faqs: [
      { q: "Can I use them outdoors?", a: "They're designed for indoor and sheltered-balcony use. Keep the plug and battery pack away from rain." },
      { q: "Can I cut the wire to size?", a: "No — cutting breaks the circuit. Coil any extra length inside a jar or behind a shelf instead." },
    ],
    tags: ["Diwali decoration lights", "decorative lights for Diwali"],
  }),
  P({
    id: "p-gift-box-classic",
    handle: "curated-diwali-gift-box-classic",
    name: "Curated Diwali Gift Box",
    short: "Classic",
    kicker: "The Gift",
    category: "gifts",
    collections: ["shop-all", "gifting"],
    benefit: "A ready-to-give keepsake box that always lands well — no wrapping needed.",
    bestFor: "Family, friends & colleagues",
    price: 1499,
    compareAt: 1899,
    badge: "Ready to gift",
    highlights: ["Keepsake rigid box", "Hand-tied satin ribbon", "Free gift note"],
    images: [
      { src: us("1592903297149-37fb25202dfa", 1400), alt: "Marbled keepsake gift box tied with a satin ribbon" },
      { src: us("1668127494486-f27a1d2b88f9", 1400), alt: "Ivory gift box with an olive ribbon on a peach background" },
      { src: px(28769885, 1400), alt: "Open gift box styled with sweets and festive treats" },
      { src: us("1695568179701-462c5ea05e41", 1400), alt: "Festive gift tray styled with candles and gold decor" },
    ],
    colorTags: ["Gold", "Ivory"],
    material: "Rigid keepsake box",
    rating: 4.9,
    reviewCount: 203,
    createdAt: "2025-09-20",
    description:
      "Our classic gift box pairs two hand-painted diyas, a 5 m string of fairy lights and a festive candle in a rigid keepsake box with a hand-tied satin ribbon. Add a free handwritten note at checkout and it's ready to hand over — no wrapping, no last-minute scramble.",
    features: [
      "Includes 2 hand-painted diyas, 5 m fairy lights and a festive candle",
      "Rigid keepsake box with a magnetic lid — reusable",
      "Hand-tied satin ribbon and complimentary gift note",
      "Ships directly to the recipient on request",
    ],
    specs: {
      "Package contents": "2 diyas · 5 m fairy lights · 1 festive candle · gift note card",
      "Box dimensions": "Approx. 25 x 20 x 8 cm",
      "Ribbon": "Satin, hand-tied",
      "Gift note": "Add your message at checkout",
    },
    options: [{ name: "Edition", values: [{ label: "Classic" }, { label: "Grand" }] }],
    variants: [
      { id: "classic", options: ["Classic"], label: "Classic edition", price: 1499, compareAt: 1899, available: true, sku: "NV-GIFT-CL" },
      { id: "grand", options: ["Grand"], label: "Grand edition", price: 2499, compareAt: 2999, available: true, sku: "NV-GIFT-GR" },
    ],
    pairsWith: ["p-lantern-set", "p-diyas-6"],
    faqs: [
      { q: "Can you ship directly to the recipient?", a: "Yes — enter their address at checkout and add your note. We never include a price slip." },
      { q: "What's in the Grand edition?", a: "The Grand edition upgrades to four diyas, a 10 m fairy light and two candles in a larger trunk-style box." },
    ],
    tags: ["Diwali gift hampers", "festive gifting ideas"],
  }),
  P({
    id: "p-toran",
    handle: "festive-door-toran-marigold-bloom",
    name: "Festive Door Toran",
    short: "Marigold Bloom",
    kicker: "The Welcome",
    category: "decor",
    benefit: "A marigold welcome at the doorway — reusable season after season.",
    bestFor: "Doorways, windows & backdrops",
    price: 549,
    compareAt: 749,
    badge: "Reusable",
    highlights: ["Fade-resistant blooms", "Packs flat", "Hooks included"],
    images: [
      { src: px(8887264, 1400), alt: "Marigold garlands arranged over a wooden doorway" },
      { src: px(35124359, 1400), alt: "Close-up of vibrant orange marigold garlands" },
      { src: us("1607512566084-a20ed291d623", 1400), alt: "Hanging marigold strands in soft light" },
      { src: us("1699764681875-dd04ce36b1c3", 1400), alt: "Orange marigold blooms in close detail" },
    ],
    colorTags: ["Orange", "Yellow"],
    material: "Fade-resistant fabric blooms",
    rating: 4.8,
    reviewCount: 167,
    createdAt: "2025-09-05",
    description:
      "A door toran in dense marigold tones that reads festive from the street and warm from inside. The fabric blooms won't wilt by evening or stain the frame, and the whole piece packs flat into its sleeve for next year.",
    features: [
      "Dense marigold-style blooms on a flexible cord",
      "Fade-resistant fabric — looks fresh all season",
      "Two adhesive hooks included",
      "Packs flat for storage",
    ],
    specs: {
      "Length": "Approx. 90 cm (standard) / 120 cm (wide)",
      "Material": "Fade-resistant fabric blooms, cotton cord",
      "Package contents": "1 toran + 2 hooks in a storage sleeve",
      "Care": "Shake out dust; store flat",
    },
    options: [{ name: "Width", values: [{ label: "Standard · 90 cm" }, { label: "Wide · 120 cm" }] }],
    variants: [
      { id: "std", options: ["Standard · 90 cm"], label: "Standard · 90 cm", price: 549, compareAt: 749, available: true, sku: "NV-TOR-90" },
      { id: "wide", options: ["Wide · 120 cm"], label: "Wide · 120 cm", price: 699, compareAt: 899, available: true, sku: "NV-TOR-120" },
    ],
    pairsWith: ["p-diyas-6", "p-fairy-lights"],
    faqs: [
      { q: "Will it fit my door?", a: "Standard (90 cm) suits most apartment doors. Choose Wide (120 cm) for double doors or to drape across a window." },
      { q: "Is it real marigold?", a: "No — it's fade-resistant fabric so it lasts for years, not days." },
    ],
    tags: ["festive home decor", "Diwali decoration items"],
  }),
];

/* Bundles — "buy together & save". Priced as a single cart line. */
export const BUNDLES = [
  {
    id: "b-glow-starter",
    handle: "glow-starter-bundle",
    name: "The Glow Starter",
    tagline: "Everything a first festive home needs.",
    items: ["p-diyas-6", "p-fairy-lights", "p-toran"],
    price: 1129,
    image: us("1635842975205-d6c2f1c0e1fe", 1200),
    badge: "Most popular",
  },
  {
    id: "b-host-edit",
    handle: "the-host-edit",
    name: "The Host Edit",
    tagline: "For the home that does the hosting.",
    items: ["p-lantern-set", "p-diyas-6", "p-fairy-lights"],
    price: 2249,
    image: px(36168883, 1200),
  },
  {
    id: "b-complete-home",
    handle: "the-complete-home",
    name: "The Complete Home",
    tagline: "All five. Doorway to pooja corner, covered.",
    items: ["p-lantern-set", "p-diyas-6", "p-fairy-lights", "p-toran", "p-gift-box-classic"],
    price: 3799,
    image: px(6213685, 1200),
    badge: "Best value",
  },
].map((b) => {
  const products = b.items.map((id) => PRODUCTS.find((p) => p.id === id));
  const compareAt = products.reduce((s, p) => s + p.price, 0);
  return {
    ...b,
    products,
    compareAt,
    savings: compareAt - b.price,
    isBundle: true,
    images: [{ src: b.image, alt: `${b.name} bundle` }],
    options: [],
    variants: [{ id: "bundle", options: [], label: `${products.length} products`, price: b.price, compareAt, available: true, sku: b.id.toUpperCase() }],
  };
});

export const findProduct = (handle) => PRODUCTS.find((p) => p.handle === handle);
export const findBundle = (handle) => BUNDLES.find((b) => b.handle === handle);
export const byId = (id) => PRODUCTS.find((p) => p.id === id);

export const productsByCollection = (handle) =>
  handle && handle !== "shop-all" ? PRODUCTS.filter((p) => p.collections.includes(handle)) : [...PRODUCTS];

export const resolveVariant = (product, selection) => {
  if (!product.options.length) return product.variants[0];
  return product.variants.find((v) => v.options.every((o, i) => o === selection[i]));
};

export const defaultVariant = (product) =>
  product.variants.find((v) => v.available && v.price === product.price) ||
  product.variants.find((v) => v.available) ||
  product.variants[0];

export const isOptionAvailable = (product, optionIndex, valueLabel, selection) => {
  if (!product.options.length) return true;
  return product.variants.some((v) => {
    if (!v.available) return false;
    return v.options[optionIndex] === valueLabel &&
      product.options.every((opt, i) => (i === optionIndex ? true : v.options[i] === selection[i]));
  });
};

export const relatedProducts = (product, n = 4) => {
  const pairs = (product.pairsWith || []).map(byId);
  const rest = PRODUCTS.filter((p) => p.id !== product.id && !pairs.includes(p));
  return [...pairs, ...rest].slice(0, n);
};

export const bundlesFor = (product) => BUNDLES.filter((b) => b.items.includes(product.id));
