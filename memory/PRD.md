# PRD — Noor & Vaani (Five-Product Festive Storefront Prototype)

## Original problem statement
Build a premium, mobile-first Indian e-commerce storefront prototype for a long-term home decor and gifting brand: coherent multi-page shopping experience (home, collections with filters/sorting, PDP with variants, cart drawer + page, search, wishlist, supporting pages, 404), saffron/gold/ivory/charcoal design system, honest prototype behaviour (no fake reviews/scarcity/payments), documented Shopify Liquid handoff.

**v2 directive (latest):** make it more professional, product photography consistent, apply conversion strategies, and **centre the whole store on 4–5 hero products — not a variety store** — with Three.js, trending tech and best-in-class UI/UX.

## User decisions
- Brand: "Noor & Vaani" (replaceable in `src/data/site.js`)
- Ratings shown, labelled "Preview"; wishlist yes; newsletter simulated locally (stored in demo Mongo)
- **Hero products (confirmed):** Hand-Painted Terracotta Diyas (Set of 6) · Elegant Brass Diya Lanterns (Set of 4) · Warm White LED Fairy Lights (10 m) · Curated Diwali Gift Box · Festive Door Toran (Marigold Bloom)
- **3D hero:** interactive 3D diya + ambient gold particle field (both), reacts to pointer and scroll
- Conversion set: sticky ATC, bundle upsell (PDP + cart), free-shipping progress, trust badges, honest urgency (ships in 24h), 10% welcome code (demo GLOW10), delivery/returns near every buy button, WhatsApp-style help button, dedicated PDPs for all 5, product-led homepage funnel, nav = Shop / Bundles / Gifting / Our Story

## Architecture
- Frontend: React 19 CRA, Tailwind tokens, framer-motion, Lenis, **three + @react-three/fiber** (drei not installable on Node 20 — helpers hand-rolled in `Hero3D.jsx`), vaul/radix/sonner.
- Data: `src/data/products.js` — `PRODUCTS` (5, with options/variants, highlights, bestFor, pairsWith, faqs) + `BUNDLES` (3, single cart line, auto-computed savings); `site.js` — NAV, COLLECTIONS (shop-all, gifting), DELIVERY_PROMISE, WELCOME_OFFER, WHATSAPP; `policies.js` — FAQs/policies.
- State: `StoreContext` (cart incl. bundle lines with `url`/`isBundle`, wishlist, drawers) → localStorage.
- Backend: FastAPI + Mongo — `/api/health`, `/api/newsletter` (validated, deduped, returns `welcome_code` GLOW10 and `id`), `/api/contact`. Tests: `backend/tests/test_api.py` (4 passing).
- Routes: `/`, `/collections/:handle` (shop-all | gifting; legacy handles fall back to all), `/bundles` (+ `/collections/bundles`), `/products/:handle`, `/cart`, `/wishlist`, `/search`, `/pages/*`, 404.

## Implemented
### Oct 2025 — v1 prototype (variety catalogue, 14 products) — superseded
### v2 — Five-product refocus (this iteration)
- New catalogue of 5 hero products with consistent warm-graded photography (`.nv-photo`), 4 images each, variants, highlights, product FAQs.
- Homepage funnel: Three.js hero (lazy, WebGL-guarded, mobile-positioned) → marquee → benefits → "Meet the five" editorial showcase (parallax, ATC + details per product) → compare table → 3 bundles → social proof (preview-labelled) + artisan story → gifting → FAQ → 10% offer → final CTA.
- Bundles page + BundleCard; bundle upsell on PDP; cart drawer upsell ("Add ₹X more for free shipping" / "Complete the look").
- PDP upgrades: kicker, highlights, delivery/returns promise row, bundle upsell, product-specific FAQs, "Pairs well with".
- Newsletter → welcome code with copy button; backend returns `welcome_code`.
- WhatsApp-style help FAB (falls back to contact page until a number is set).
- Simplified nav, mobile menu & footer list the five products; About/FAQ/SEO meta rewritten around the five.
- Tested: `/app/test_reports/iteration_1.json` — all backend + frontend flows pass, 0 console errors.

## Backlog
### P0 (before launch)
- Replace stock photography with owned product shots (keep `.nv-photo` grade); confirm materials/specs/prices.
- Confirm operational promises (24h dispatch, 3–6 days, 7-day returns) and set `WHATSAPP.number`.
- Shopify build per `/app/docs/SHOPIFY_HANDOFF.md` §0.
### P1
- Real reviews app, order tracking, ESP for newsletter (code `GLOW10` as real discount), analytics + consent.
### P2
- Product video / 360 on PDP, gift-note field in cart, UGC gallery, custom domain + sitemap/canonical.
