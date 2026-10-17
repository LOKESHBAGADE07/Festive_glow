# Noor & Vaani — Design-to-Shopify Handoff

Design prototype: React (FARM) storefront, mobile-first, Indian festive decor & gifting.
Target: Shopify Liquid theme. This document maps everything built to its future Shopify home.

## 1. Design token sheet

| Token | Value | Usage |
|---|---|---|
| --nv-saffron | #E89124 | Primary CTAs, accents, active states |
| --nv-saffron-dark | #B96516 | CTA hover, eyebrow labels |
| --nv-gold | #D6B36A | Secondary accent, dividers on dark |
| --nv-gold-light | #EAD9B4 | Badges, soft gold fills |
| --nv-terracotta | #C85A32 | Wishlist active state |
| --nv-ivory | #FFF9F0 | Page background |
| --nv-white | #FFFFFF | Cards, sheets, inputs |
| --nv-ink | #29251F | Primary text, dark sections |
| --nv-ink-soft | #746C62 | Secondary text |
| --nv-line | #EAE2D7 | Borders |
| --nv-success / --nv-error | #26734D / #B42318 | Status messaging |

- Typography: Playfair Display (headings, 400–700, italic accents), Plus Jakarta Sans (body/UI, 300–800). Eyebrow: 11px, 0.22em tracking, uppercase, saffron-dark.
- Radii: cards 12px (rounded-xl), CTAs & inputs pill, sheets 0.
- Shadows: `card` (0 1px 2px / 0 8px 24px -12px), `lift` (0 2px 4px / 0 20px 40px -16px), both rgba(41,37,31,…).
- Spacing: sections `py-14 lg:py-24`; container `max-w-7xl px-4 sm:px-6 lg:px-8`.
- Breakpoints: 320–375 / 390–430 / 768 / 1024 / 1280–1440 / 1600. Grids: 2 cols mobile → 3–4 desktop.
- Motion: cubic-bezier(0.22,1,0.36,1); masked line reveals 0.9–1s; marquee 55s linear; Lenis smooth scroll (lerp 0.09); all disabled under prefers-reduced-motion.

Tokens live in `src/index.css` (`:root`) and `tailwind.config.js` — port to Shopify as `settings_schema.json` presets + CSS custom properties in `theme.liquid`.

## 2. Component inventory

| Component (src/components) | Purpose | Shopify home |
|---|---|---|
| AnnouncementBar | Configurable festive message, dismissible | `announcement-bar.liquid` section |
| Header | Sticky, blurred, cart/wishlist/search with counts | `header.liquid` + `header-group` |
| MobileMenu | Left drawer nav | header.liquid (mobile drawer block) |
| SearchOverlay | Predictive search dialog + no-results state | predictive-search API + `search-drawer` snippet |
| Footer | Brand, links, policies, newsletter, payment note | `footer.liquid` |
| NewsletterForm | Loading/success/error states; POST /api/newsletter | Shopify customer form (`form 'customer'`) |
| ProductCard | Image hover-zoom, badge, wishlist, quick add, price, preview rating | `snippets/product-card.liquid` |
| RatingPreview | Stars + "Preview" chip (never real data) | review-app snippet |
| QuantityStepper | 1–10 stepper | cart quantity input snippet |
| VariantPicker (in Product) | Swatches + set pills, availability-aware | `variant-radios.liquid` + option_position JS |
| CartLine | Thumbnail, variant, qty, remove | `cart-line` snippet used by drawer + cart page |
| CartDrawer / CartParts | Right drawer, shipping progress, checkout handoff notice | `cart-drawer.liquid` (Shopify section) |
| ShippingProgress | ₹999 demo threshold progress bar | cart shipping-threshold setting |
| FilterPanel (in Collection) | Price/colour/material/stock, URL-param state, chips | Shopify storefront filters (`filter` object) |
| Marquee, Reveal, MaskLines | Motion primitives | theme.js + CSS (no framework needed) |
| Breadcrumbs, FAQAccordion, EmptyState, ErrorBoundary | Utility | `breadcrumbs.liquid`, `accordion`, 404/empty templates |

## 3. Page → Shopify template map

| Route (prototype) | Template | Notes |
|---|---|---|
| / | `templates/index.json` | Hero (image w/ overlay + line reveal), marquee, benefits, categories, trending grid, gift editorial, LED spotlight, inspiration, preview testimonials, newsletter, final CTA — all as section blocks |
| /collections/:handle | `templates/collection.json` | Filters via storefront filtering; sort via `collection.sort_options`; Load More |
| /products/:handle | `templates/product.json` | Gallery w/ zoom, variant picker, sticky ATC, accordions, pin checker (app), reviews (app), related products |
| /cart | `templates/cart.json` | Native cart form; handoff note removed |
| /wishlist | app (Wishlist Plus / GoKwik) or localstorage fallback | — |
| /search | `templates/search.json` | — |
| /pages/about | `templates/page.about.json` | — |
| /pages/contact | `templates/page.contact.json` | Shopify contact form |
| /pages/faq | `templates/page.faq.json` | Accordion sections |
| /pages/track-order | app (Shopify Order API / tracking app) | prototype explains integration |
| /pages/shipping-policy, returns-refunds, privacy-policy, terms-of-service | `templates/page.json` | Draft content included — replace with finalized policies |
| 404 | `templates/404.json` | — |

## 4. Product data → Shopify objects

`src/data/products.js` schema maps 1:1: `handle`→handle, `name`→title, `price/compareAt`→variant price/compare_at_price, `options`+`variants`→options/variants (SKU included), `images[{src,alt}]`→media+alt, `colorTags/material`→tags & metafields, `description/features/specs`→body_html + metafields, `rating/reviewCount`→review app data (prototype values are labelled "Preview"), `createdAt`→published_at, `badge`→metafield or tag.

Demo-data rules carried into the theme:
- Do not publish "brass" material claims until confirmed (product specs say "to be confirmed").
- Never hardcode prices, inventory, review counts, availability — bind to Shopify objects only.
- No fake countdowns, scarcity, or fabricated testimonials anywhere in the design.

## 5. Asset manifest

| Asset | Use | Aspect | Export |
|---|---|---|---|
| Pexels 6213685 | Home hero | 16:9+ | 1800w |
| Pexels 37650548 | Final CTA band | 16:9 | 1600w |
| Pexels 7209324 / 8818759 / 1695568179701 / 1575277340591 (Unsplash) | Category cards | 4:5 | 900w |
| Pexels 17878238 + 28769885 | Gift editorial | 4:5 + 1:1 | 1200w / 800w |
| Pexels 37650548, Unsplash 1513538416877, 1611286079235, 1733499625839 | Lighting & inspiration | 4:5 / 5:4 | 900–1200w |
| Product images (each 2–4) | Cards + PDP gallery | 4:5 | 900–1200w |
| favicon.svg (diya mark) | Browser/tab icon | 1:1 | SVG |

All remote images use CDN params (`w=`, `auto=compress`); in Shopify use `image_url` with `width` + `sizes`/`loading="lazy"` (hero uses fetchpriority=high).

## 6. Interaction specification

- Nav: sticky header, shadow after 8px scroll; search opens dialog (Enter → /search?q=); cart opens drawer; wishlist badge live.
- Collection: filters + sort live in URL (?price=&color=&material=&stock=&sort=) — shareable, back-button safe. Load More (+8). Empty state with reset.
- PDP: scroll-snap gallery (dots on mobile, thumbs + arrows on desktop), zoom dialog, variant selection updates price/SKU/availability, unavailable combos disabled with strikethrough, ATC has loading state + duplicate-click prevention + toast + drawer open, sticky mobile ATC appears when main CTA leaves viewport (never covers it), PIN checker validates 6-digit Indian PIN (sample response).
- Cart: add/merge by product+variant, qty 1–10, remove, subtotal + threshold progress ("unlocked" > ₹999), drawer + page share state, checkout → honest handoff notice (prototype) / Shopify hosted checkout (live).
- Forms: newsletter + contact validate email, show loading/success/error; prototype stores to demo backend (Mongo via /api/newsletter, /api/contact) — swap for Shopify forms.
- Wishlist: heart toggles with toast, persisted in localStorage, wishlist page grid.
- Accessibility: focus-visible rings, skip link, semantic landmarks, one h1/page, aria-pressed/aria-current/aria-live, reduced-motion support, 44px touch targets.

## 7. Requires Shopify / external (not in prototype)

Hosted checkout & payments (UPI/cards/net banking), real inventory & order data, shipping rates & delivery promises, order tracking (Shopify Order API or app), genuine reviews (review app), email service for newsletter (Shopify or Klaviyo), SEO sitemap/canonical on the production domain, analytics/consent pixels.
