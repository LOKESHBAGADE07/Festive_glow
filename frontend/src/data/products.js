import { px, us } from "./img";

/*
 * DEMONSTRATION CATALOGUE — clearly marked sample data.
 * Prices, ratings, review counts, availability and specs are placeholders for
 * the design prototype. In the Shopify build this file maps 1:1 to real
 * product objects (variants, options, images, tags, collections).
 */

const P = (p) => ({
  currency: "INR",
  inStock: true,
  isDemo: true,
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
    name: "Elegant Brass Diya Lanterns – Set of 4",
    category: "lights",
    benefit: "Create a warm, festive glow in any room.",
    price: 1899,
    compareAt: 2499,
    badge: "Festive Edit",
    images: [
      { src: us("1781947486860-197257ddbb7b", 1200), alt: "Brass diya lantern with a lit candle on a marble surface" },
      { src: us("1561104338-268ec76092b4", 1200), alt: "Close-up of the lantern frame and glass panes" },
      { src: px(7209324, 1200), alt: "A row of lanterns styled along a table in warm light" },
      { src: px(16212190, 1200), alt: "Detail of the cut-work finish on a lantern" },
    ],
    colorTags: ["Gold", "Brass"],
    material: "Metal (final material to be confirmed with supplier)",
    rating: 4.8,
    reviewCount: 214,
    createdAt: "2025-09-18",
    isNew: true,
    description:
      "A set of four table lanterns with a warm, candle-lit glow. Style them along a console, cluster them around a rangoli, or line a windowsill — the cut-work frame throws soft patterns of light across the room. Shown here styled for the festive season; the finish and proportions suit year-round use too.",
    features: [
      "Elegant festive design with cut-work detailing",
      "Suitable for festive home styling — consoles, windowsills, pooja corners",
      "Set of four for layered, balanced arrangements",
      "Thoughtful gifting option for Diwali, housewarmings and weddings",
    ],
    specs: {
      "Material": "To be confirmed — title says brass; verify with supplier before publishing",
      "Finish": "Antique Brass / Champagne Gold (demo options)",
      "Dimensions": "Approx. 15 cm H x 10 cm W each (sample data)",
      "Weight": "Sample data — to be confirmed",
      "Package contents": "4 lanterns (candles not included unless confirmed)",
      "Care": "Wipe with a soft dry cloth; avoid abrasive cleaners",
      "Safety": "Use with tea lights or LED candles; never leave a flame unattended",
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
    tags: ["Diwali decoration items", "diya lantern set", "festive home decor"],
  }),
  P({
    id: "p-fairy-lights",
    handle: "decorative-led-fairy-lights-warm-white",
    name: "Decorative LED Fairy Lights – Warm White, 10m",
    category: "lights",
    benefit: "A soft, warm glow for shelves, balconies and mirrors.",
    price: 349,
    compareAt: 499,
    images: [
      { src: px(6212485, 1200), alt: "Warm white fairy lights glowing with soft bokeh" },
      { src: us("1513538416877-f11f5fb85d83", 1200), alt: "String lights switched on against a dark background" },
    ],
    colorTags: ["Warm White"],
    material: "Copper wire, LED",
    rating: 4.7,
    reviewCount: 186,
    createdAt: "2025-09-10",
    description:
      "Ten metres of fine-wire LED fairy lights in a warm white tone. Bend the wire around railings, drape it across a wall, or fill a glass jar — the LEDs stay cool and the glow reads festive without feeling loud.",
    features: [
      "10 m length with dense LED spacing (sample spec)",
      "Flexible wire holds its shape when wound",
      "Suitable for indoor sheltered use",
      "Plug-powered (power source to be confirmed)",
    ],
    specs: {
      "Length": "10 m (sample spec)",
      "Power source": "To be confirmed — adapter or USB",
      "Light tone": "Warm white",
      "Package contents": "1 string light (adapter included when confirmed)",
      "Care": "Coil gently; store away from moisture",
      "Safety": "Indoor / sheltered outdoor use only (to be confirmed)",
    },
    tags: ["Diwali decoration lights", "decorative lights for Diwali"],
  }),
  P({
    id: "p-diyas-6",
    handle: "hand-painted-terracotta-diyas-set-of-6",
    name: "Hand-Painted Terracotta Diyas – Set of 6",
    category: "lights",
    benefit: "Classic clay diyas in six festive colours.",
    price: 449,
    compareAt: 599,
    badge: "New",
    isNew: true,
    images: [
      { src: us("1740847145862-85f296386a2b", 1200), alt: "Lit terracotta diyas glowing in the dark" },
      { src: px(10182772, 1200), alt: "Traditional diyas casting a warm festive glow" },
    ],
    colorTags: ["Terracotta", "Multicolour"],
    material: "Terracotta",
    rating: 4.9,
    reviewCount: 241,
    createdAt: "2025-09-25",
    description:
      "Six terracotta diyas finished in festive hand-painted rims. Fill with oil and a cotton wick, or place LED tea lights inside for an easier evening. Comes boxed for gifting.",
    features: [
      "Set of six painted terracotta diyas",
      "Suitable for oil + wick or LED tea lights",
      "Gift-boxed packaging (sample)",
      "Hand-painted finish — expect gentle variation between pieces",
    ],
    specs: {
      "Material": "Terracotta",
      "Dimensions": "Approx. 6 cm dia each (sample)",
      "Package contents": "6 diyas in a gift box",
      "Care": "Wipe dry after use; hand-paint may soften if soaked",
      "Safety": "Place on a heat-safe surface; never leave flames unattended",
    },
    tags: ["diya set", "Diwali decoration items"],
  }),
  P({
    id: "p-curtain-lights",
    handle: "cascade-curtain-lights-3m",
    name: "Cascade Curtain Lights – 3m x 3m",
    category: "lights",
    benefit: "A waterfall of light for windows and balconies.",
    price: 649,
    images: [
      { src: us("1611286079235-f4e84fccacba", 1200), alt: "Curtain lights hanging across a bright window" },
      { src: us("1733499625839-267296a7457b", 1200), alt: "Wall of warm curtain lights" },
    ],
    colorTags: ["Warm White"],
    material: "LED, clear cable",
    rating: 4.6,
    reviewCount: 132,
    createdAt: "2025-08-30",
    description:
      "A 3 m x 3 m curtain of warm-white LED strands that hangs across windows, balcony rails or a photo wall. Eight settings (sample) from steady glow to gentle twinkle.",
    features: [
      "3 m x 3 m drop for windows and balconies",
      "Multiple light modes (sample spec)",
      "Lightweight clear cable",
      "Indoor and sheltered outdoor use",
    ],
    specs: {
      "Dimensions": "3 m x 3 m (sample)",
      "Power source": "To be confirmed",
      "Package contents": "1 curtain light + hooks (sample)",
      "Care": "Hang without stretching the strands; store flat",
    },
    tags: ["Diwali decoration lights"],
  }),
  P({
    id: "p-mesh-lantern",
    handle: "golden-mesh-hanging-lantern",
    name: "Golden Mesh Hanging Lantern",
    category: "lights",
    benefit: "A single statement piece with patterned light.",
    price: 899,
    compareAt: 1149,
    images: [
      { src: px(16212190, 1200), alt: "Golden mesh lantern with cut-out patterns" },
      { src: us("1606571108059-9eaaa84d2a78", 1200), alt: "Floral cut-work candle lantern in warm light" },
    ],
    colorTags: ["Gold"],
    material: "Metal",
    rating: 4.7,
    reviewCount: 98,
    createdAt: "2025-08-21",
    description:
      "A pierced metal lantern that throws flower-and-vine patterns across walls. Hang it by the door or group two or three at different heights for an evening courtyard feel.",
    features: [
      "Cut-work metal body with gold-tone finish",
      "Suitable for hanging or tabletop styling",
      "Fits standard tea lights or LED candles",
      "Pattern casts beautifully on plain walls",
    ],
    specs: {
      "Material": "Metal (finish to be confirmed)",
      "Dimensions": "Approx. 22 cm H (sample)",
      "Package contents": "1 lantern + hanging loop",
      "Care": "Wipe with a dry cloth",
      "Safety": "Keep flame away from fabrics; LED candles recommended",
    },
    tags: ["diya lantern set", "festive home decor"],
  }),
  P({
    id: "p-toran",
    handle: "festive-door-toran-marigold-bloom",
    name: "Festive Door Toran – Marigold Bloom",
    category: "decor",
    benefit: "A warm marigold welcome at the doorway.",
    price: 549,
    compareAt: 749,
    images: [
      { src: px(35124359, 1200), alt: "Close-up of vibrant orange marigold garlands" },
      { src: us("1699764681875-dd04ce36b1c3", 1200), alt: "Orange marigold blooms in close detail" },
    ],
    colorTags: ["Orange", "Yellow"],
    material: "Fabric flowers (material to be confirmed)",
    rating: 4.8,
    reviewCount: 167,
    createdAt: "2025-09-05",
    description:
      "A door toran in dense marigold tones, ready to hang across frames and doorways. It reads festive from the street and warm from the inside — and packs away flat for next year.",
    features: [
      "Dense marigold-style blooms on a flexible cord",
      "Suitable for doorways, windows and backdrops",
      "Reusable season after season",
      "Lightweight — hangs with two hooks (not included)",
    ],
    specs: {
      "Length": "Approx. 90 cm (sample)",
      "Material": "To be confirmed — fabric flowers",
      "Package contents": "1 toran",
      "Care": "Store flat in the packaging provided",
    },
    tags: ["festive home decor", "Diwali decoration items"],
  }),
  P({
    id: "p-rangoli-kit",
    handle: "rangoli-decoration-kit-9-piece",
    name: "Rangoli Decoration Kit – 9-Piece Stencil Set",
    category: "decor",
    benefit: "Festive floors in minutes, no freehand skill needed.",
    price: 429,
    images: [
      { src: px(5491495, 1200), alt: "Hands drawing a rangoli pattern with coloured powder" },
      { src: px(8818759, 1200), alt: "Floral rangoli arranged in petals on a wooden floor" },
    ],
    colorTags: ["Multicolour"],
    material: "Plastic stencils, colour powder (contents to be confirmed)",
    rating: 4.5,
    reviewCount: 121,
    createdAt: "2025-08-28",
    description:
      "Nine reusable stencils in mandala and border patterns, with slots for coloured powder. Anchor your doorway with a rangoli everyone thinks took hours.",
    features: [
      "9 reusable stencil designs",
      "Suitable for floors, thresholds and table centres",
      "Works with rangoli powder or flower petals",
      "Flat-pack storage between seasons",
    ],
    specs: {
      "Package contents": "9 stencils (powder included only if confirmed)",
      "Material": "Flexible plastic (sample)",
      "Sizes": "Assorted, largest approx. 30 cm (sample)",
      "Care": "Rinse and dry before storing",
    },
    tags: ["Diwali decoration items"],
  }),
  P({
    id: "p-candle-set",
    handle: "decorative-candle-set-amber-glass-trio",
    name: "Decorative Candle Set – Amber Glass Trio",
    category: "decor",
    benefit: "Three amber jars, three evenings of glow.",
    price: 699,
    images: [
      { src: px(7004676, 1200), alt: "Three scented candles in amber glass jars on a wooden slice" },
      { src: us("1612293905607-b003de9e54fb", 1200), alt: "Lighting an amber glass jar candle with a match" },
    ],
    colorTags: ["Amber"],
    material: "Wax, glass",
    rating: 4.7,
    reviewCount: 154,
    createdAt: "2025-09-01",
    description:
      "A trio of amber-glass jar candles for the coffee table or bath ledge. Scent names are placeholders until confirmed with the supplier — the warm glow, however, is guaranteed by design.",
    features: [
      "Set of three amber glass jar candles",
      "Suitable for coffee tables, shelves and bathroom styling",
      "Reusable jars once finished",
      "Gift-ready as a standalone present",
    ],
    specs: {
      "Contents": "3 candles — scent profiles to be confirmed before publishing",
      "Burn time": "To be confirmed",
      "Dimensions": "Approx. 8 cm H each (sample)",
      "Care": "Trim wick before each use; never leave a burning candle unattended",
    },
    tags: ["festive home decor", "home decor gifts"],
  }),
  P({
    id: "p-ceramic-vase",
    handle: "ivory-ceramic-vase-hand-glazed",
    name: "Ivory Ceramic Vase – Hand-Glazed",
    category: "decor",
    benefit: "A quiet, year-round centrepiece.",
    price: 1299,
    images: [
      { src: us("1612196808214-b8e1d6145a8c", 1200), alt: "White ceramic vase on a wooden table" },
      { src: px(27180805, 1200), alt: "Collection of ceramic vases with dried flowers in soft tones" },
    ],
    colorTags: ["Ivory", "White"],
    material: "Ceramic",
    rating: 4.8,
    reviewCount: 76,
    createdAt: "2025-07-15",
    description:
      "A rounded, hand-glazed vase in warm ivory. It carries marigold stems through the season and dried grasses the rest of the year — the piece that quietly ties a room together.",
    features: [
      "Hand-glazed stoneware-style ceramic",
      "Suitable for fresh or dried stems",
      "Neutral ivory suits festive and everyday styling",
      "Weighted base keeps arrangements steady",
    ],
    specs: {
      "Material": "Ceramic",
      "Dimensions": "Approx. 24 cm H x 12 cm dia (sample)",
      "Care": "Hand wash; avoid sudden temperature changes",
      "Package contents": "1 vase",
    },
    tags: ["festive home decor", "home decor gifts"],
  }),
  P({
    id: "p-gift-box-classic",
    handle: "curated-diwali-gift-box-classic",
    name: "Curated Diwali Gift Box – Classic",
    category: "gifts",
    benefit: "A ready-to-give box that always lands well.",
    price: 1499,
    compareAt: 1899,
    badge: "Giftable",
    images: [
      { src: px(28769885, 1200), alt: "Elegant gift box with baked goods and sweets for gifting" },
      { src: us("1695568179701-462c5ea05e41", 1200), alt: "Festive gift tray styled with candles and gold decor" },
    ],
    colorTags: ["Gold", "Ivory"],
    material: "Assorted (contents to be confirmed)",
    rating: 4.9,
    reviewCount: 203,
    createdAt: "2025-09-20",
    isNew: true,
    description:
      "Our classic gift box pairs festive favourites in a keepsake box with a ribbon-tied lid. Exact assortments are confirmed at launch — this page will carry the final contents, weights and ingredient details.",
    features: [
      "Curated assortment in a keepsake box",
      "Contents, weights and ingredients published once confirmed",
      "Gift note card included (sample)",
      "Suitable for friends, family and colleagues",
    ],
    specs: {
      "Package contents": "To be confirmed — sample box shown",
      "Dimensions": "Approx. 25 x 20 x 8 cm box (sample)",
      "Shelf life": "To be confirmed with supplier",
      "Allergens": "Will be listed on the final product data",
    },
    tags: ["Diwali gift hampers", "festive gifting ideas"],
  }),
  P({
    id: "p-hamper-signature",
    handle: "noor-celebration-hamper-signature",
    name: "Noor Celebration Hamper – Signature",
    category: "gifts",
    benefit: "Our grandest hamper for grandest occasions.",
    price: 2499,
    images: [
      { src: px(17878238, 1200), alt: "Decorative basket hamper filled with gourmet treats" },
      { src: us("1716972525891-66600001e470", 1200), alt: "Gift box styled with flowers and sweets" },
    ],
    colorTags: ["Gold", "Natural"],
    material: "Assorted (contents to be confirmed)",
    rating: 5.0,
    reviewCount: 87,
    createdAt: "2025-09-22",
    isNew: true,
    description:
      "The signature hamper gathers our most celebratory pieces into one presentation — styled for weddings, housewarmings and the Diwali host who has everything. Final contents are confirmed at launch.",
    features: [
      "Largest curated assortment in the range",
      "Presentation basket or trunk box (to be confirmed)",
      "Hand-tied ribbon and gift tag",
      "Corporate and bulk gifting friendly (via Shopify)",
    ],
    specs: {
      "Package contents": "To be confirmed — sample hamper shown",
      "Dimensions": "Approx. 35 x 25 x 15 cm (sample)",
      "Gift note": "Supported at checkout in the Shopify build",
    },
    tags: ["Diwali gift hampers", "festive gifting ideas"],
  }),
  P({
    id: "p-cushion-block-print",
    handle: "block-print-cotton-cushion-covers-set-of-2",
    name: "Block-Print Cotton Cushion Covers – Set of 2",
    category: "apparel",
    benefit: "Instant festive refresh for your sofa.",
    price: 899,
    compareAt: 1099,
    images: [
      { src: us("1575277340591-849c346c4542", 1200), alt: "Stack of colourful block-printed cushion covers" },
      { src: px(57565, 1200), alt: "Detailed traditional Indian block print patterns" },
    ],
    colorTags: ["Indigo", "Multicolour"],
    material: "Cotton",
    rating: 4.6,
    reviewCount: 142,
    createdAt: "2025-08-12",
    description:
      "Two hand-block-printed cotton cushion covers in festive tones. Swap them onto your existing inserts, and the living room reads celebratory by evening.",
    features: [
      "Set of two 45 x 45 cm covers (sample size)",
      "Hand-block-printed cotton",
      "Concealed zip closure",
      "Inserts not included",
    ],
    specs: {
      "Material": "Cotton",
      "Size": "45 x 45 cm (sample)",
      "Care": "Gentle machine wash cold, dry in shade",
      "Package contents": "2 covers",
    },
    tags: ["festive home decor"],
  }),
  P({
    id: "p-cushion-zari",
    handle: "zari-embroidered-silk-cushion-covers-set-of-2",
    name: "Zari-Embroidered Cushion Covers – Set of 2",
    category: "apparel",
    benefit: "A quiet touch of gold for festive evenings.",
    price: 1149,
    images: [
      { src: us("1785064038559-10e0ad8036de", 1200), alt: "Stacked cushions with gold embroidered motifs" },
      { src: px(57565, 1200), alt: "Traditional printed textile patterns in detail" },
    ],
    colorTags: ["Gold", "Ivory"],
    material: "Silk blend",
    rating: 4.8,
    reviewCount: 64,
    createdAt: "2025-09-08",
    isNew: true,
    description:
      "Two cushion covers with fine gold zari-look embroidery on a soft ground. Understated next to brass and marigold — and quietly luxe the rest of the year.",
    features: [
      "Set of two embroidered covers (45 x 45 cm sample)",
      "Gold-tone embroidered motifs",
      "Concealed zip closure",
      "Inserts not included",
    ],
    specs: {
      "Material": "Silk blend (to be confirmed)",
      "Size": "45 x 45 cm (sample)",
      "Care": "Dry clean recommended",
      "Package contents": "2 covers",
    },
    tags: ["festive home decor"],
  }),
  P({
    id: "p-table-runner",
    handle: "ajrakh-print-table-runner",
    name: "Ajrakh-Print Cotton Table Runner",
    category: "apparel",
    benefit: "Dress the table before the guests arrive.",
    price: 749,
    images: [
      { src: us("1444362408440-274ecb6fc730", 1200), alt: "Close-up of two textured patterned textiles" },
      { src: px(7037689, 1200), alt: "Artisan block printing fabric in a workshop" },
    ],
    colorTags: ["Indigo", "Red"],
    material: "Cotton",
    rating: 4.6,
    reviewCount: 58,
    createdAt: "2025-07-28",
    description:
      "A long cotton runner in a traditional print, sized for six-seater tables. Layer it under brass diyas and the meal is halfway styled already.",
    features: [
      "Generous length for 6-seater tables (sample size)",
      "Traditional print on breathable cotton",
      "Layers well with plain linen",
      "Machine washable",
    ],
    specs: {
      "Material": "Cotton",
      "Size": "Approx. 220 x 35 cm (sample)",
      "Care": "Machine wash cold, warm iron",
      "Package contents": "1 table runner",
    },
    tags: ["festive home decor"],
  }),
];

export const findProduct = (handle) => PRODUCTS.find((p) => p.handle === handle);
export const productsByCategory = (cat) =>
  cat && cat !== "shop-all" ? PRODUCTS.filter((p) => p.category === cat) : [...PRODUCTS];

export const resolveVariant = (product, selection) => {
  if (!product.options.length) return product.variants[0];
  return product.variants.find((v) => v.options.every((o, i) => o === selection[i]));
};

export const defaultVariant = (product) =>
  product.variants.find((v) => v.available) || product.variants[0];

export const isOptionAvailable = (product, optionIndex, valueLabel, selection) => {
  if (!product.options.length) return true;
  return product.variants.some((v) => {
    if (!v.available) return false;
    return v.options[optionIndex] === valueLabel &&
      product.options.every((opt, i) => (i === optionIndex ? true : v.options[i] === selection[i]));
  });
};

export const relatedProducts = (product, n = 4) => {
  const same = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const rest = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...rest].slice(0, n);
};
