# Testing Report — Noor & Vaani prototype

Tested in the Emergent preview environment (external preview host), 17 Oct 2025.

## Viewports verified
- 1440×900 desktop (home, collection, PDP, cart, checkout notice, 404/search)
- 390×844 mobile (home, PDP top + ATC, mobile menu, newsletter)

## Functional checks — passed
- Home loads with no console errors; hero CTAs navigate; announcement dismisses.
- Category cards, nav links, footer links → correct collections/pages.
- Collection filters actually filter: 14 → 6 (₹500–999) → 1 (+Gold); sort Price Low→High reorders (₹899 first); filter chips + Clear all work; Load More present; URL params shareable.
- PDP: variant selection updates price/SKU; "Set of 6" disabled with strikethrough (unavailable cannot be selected or added); PIN checker validates 6-digit PINs (invalid → error, valid → sample response clearly marked).
- Add to Cart: loading state, drawer opens, cart badge/count update; qty 2 → ₹2,098; free-shipping message switches to "unlocked" above ₹999 demo threshold; remove → empty state; checkout shows honest prototype handoff notice (no payment capture).
- Newsletter: valid email → success state (stored in demo backend); invalid → inline error; consent text present.
- Contact form stores to demo backend with validation states (endpoint curl-verified).
- Search: overlay live results + "View all"; /search page results and no-results state verified.
- Empty states: cart, wishlist, search no-results, collection no-match.
- No horizontal overflow at 390px (verified programmatically after fix).
- SEO: unique per-route titles/descriptions, robots.txt + llms.txt served as real files, Organization JSON-LD without fabricated ratings; canonical/og:url/sitemap intentionally omitted until a production domain exists.

## Accessibility checks
- Focus-visible outlines, skip link, aria-pressed on wishlist, aria-current breadcrumbs, labelled inputs, one h1 per page, alt text on all imagery, reduced-motion disables marquee/parallax/smooth scroll, 44px touch targets.

## Known items / not connected
- Checkout, payments, inventory, order tracking, real reviews, mass emails — intentionally not implemented (prototype); see SHOPIFY_HANDOFF §7.
- Product ratings/reviews and testimonials are visibly labelled "Preview" sample content.
- Product "brass" material and all policies are marked to-be-confirmed / draft.
- Wishlist persisted in localStorage only.
- 404 wildcard route exists and compiles (tested via an invalid product handle rendering its not-found state); direct /random-url returns the same component.
