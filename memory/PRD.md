# PRD — Noor & Vaani (Indian Festive Decor & Gifting Storefront Prototype)

## Original problem statement
Build a premium, mobile-first Indian e-commerce storefront prototype ("Illuminate Your Diwali – Festive Decor & Gift Sale") for a long-term home decor and gifting brand. Not a static landing page: a coherent multi-page shopping experience (home, collections with working filters/sorting, product detail with variants, cart drawer + page, search, wishlist, supporting pages, 404) with a saffron/gold/ivory/charcoal design system, structured demo product data, honest prototype behaviour (no fake reviews, scarcity, payments), and a documented handoff path to a Shopify Liquid theme.

## User decisions (from ask_human)
- Brand: "Noor & Vaani" (easily replaceable placeholder in src/data/site.js)
- Ratings: shown, clearly labelled "Preview data"
- Wishlist: yes — card hearts + wishlist page
- Newsletter: simulated locally with real loading/success/error states (stored in demo backend)

## Architecture
- Frontend: React (CRA/FARM), Tailwind tokens (index.css + tailwind.config.js), framer-motion reveals, Lenis smooth scroll, vaul drawers, sonner toasts, radix accordion/select/progress.
- Data: src/data/products.js (14 demo products, options/variants/SKUs), site.js (brand, nav, categories, benefits, ₹999 threshold), policies.js (draft policies + FAQs).
- State: StoreContext (cart, wishlist, drawers) persisted to localStorage.
- Backend: FastAPI + Mongo — /api/health, /api/newsletter (POST, validated, deduped), /api/contact (POST). No auth (no credentials needed).
- SEO: static head (title/description/OG/Twitter/Organization JSON-LD), per-route meta via Seo component, robots.txt + llms.txt, no invented canonical/domain.

## Implemented (Oct 2025)
- Full site shell: announcement bar, sticky header, mobile menu, search overlay, footer w/ newsletter.
- Home: kinetic masked-reveal hero w/ parallax, marquee, benefits, category cards, trending grid, gift editorial, LED spotlight (dark), inspiration, preview-labelled testimonials, newsletter panel, final CTA.
- Collections (/collections/shop-all|lights|decor|gifts|apparel): URL-param filters (price, colour, material, stock), sorting (featured/price asc/price desc/newest), chips + reset, load more, empty state.
- Featured PDP (Elegant Brass Diya Lanterns – Set of 4): swipeable gallery + thumbs + zoom, Finish × Set variants with availability (Set of 6 blocked), qty stepper, ATC w/ loading + drawer, wishlist, PIN delivery checker, trust row, accordions (description/features/specs/shipping/FAQ), preview reviews, related products, sticky mobile ATC.
- Cart drawer + cart page (qty, remove, subtotal, threshold progress, checkout handoff notice), wishlist page, search page, About, Contact, FAQ, Track Order, 4 policy pages, 404.
- Docs: /app/docs/SHOPIFY_HANDOFF.md (tokens, component inventory, Liquid template map, asset manifest, interaction spec), /app/docs/TESTING_REPORT.md.

## Backlog (P0)
- Replace demo catalogue with real products (Shopify import).
- Finalize brand name, prices, policies, shipping rules; remove all "Preview/demo" labels.
## P1
- Real review app, order tracking integration, email service for newsletter.
## P2
- Custom domain + full SEO (canonical/sitemap), analytics/consent, wishlist sync w/ accounts.
