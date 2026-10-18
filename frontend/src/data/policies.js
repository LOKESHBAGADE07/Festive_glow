/* Sample policy content — replace with finalized business policies before launch.
   No company address, phone, tax registration or payment-provider relationships
   are invented here. */

export const FAQS = [
  {
    q: "How quickly will my order arrive?",
    a: "Orders dispatch within 24 hours (Mon–Sat) and typically arrive in 3–6 days across India. You'll get a tracking link by email and WhatsApp the moment it ships.",
  },
  {
    q: "What if it doesn't suit my home?",
    a: "You have 7 days from delivery for an easy return — unused, in the original box. We arrange the pickup and refund to your original payment method. No questions asked.",
  },
  {
    q: "Are the lanterns and diyas safe with a real flame?",
    a: "Yes — both are designed for tea lights or oil wicks. Place them on a heat-safe surface and never leave a flame unattended. Around curtains or children we recommend flameless LED candles, which fit perfectly too.",
  },
  {
    q: "Can I send a product directly as a gift?",
    a: "Absolutely. Every piece arrives gift-boxed with tissue wrap. Enter the recipient's address at checkout, add a free handwritten note, and we'll leave out the price slip.",
  },
  {
    q: "Do you offer bundle or bulk discounts?",
    a: "Our three bundles save 15–20% versus buying separately. For corporate or wedding orders of 20+ pieces, message us on WhatsApp for a custom quote.",
  },
  {
    q: "How do I care for the pieces between seasons?",
    a: "A soft dry cloth is all the lanterns and diyas need. Coil the fairy lights loosely, shake dust off the toran and store everything flat in the boxes provided.",
  },
];

export const POLICIES = {
  "shipping-policy": {
    title: "Shipping Policy",
    intro:
      "This is draft shipping policy content for the design prototype. Nothing here is a confirmed operational promise — shipping partners, charges and timelines will be configured in Shopify before launch.",
    sections: [
      { heading: "Shipping charges", body: ["Free shipping applies to orders over ₹999 in this prototype. This threshold is a configurable demo value, not a finalized business policy."] },
      { heading: "Delivery estimates", body: ["The prototype shows a sample range of 3–7 days across India. Confirmed timelines, partners (e.g. Shopify Shipping or a 3PL) and serviceable PIN codes will be published before launch."] },
      { heading: "Order processing", body: ["Orders are expected to be dispatched within 1–2 business days once the store is live. The prototype does not process real orders."] },
      { heading: "International shipping", body: ["Not configured in the prototype. The Shopify build will define serviceable regions and rates."] },
    ],
  },
  "returns-refunds": {
    title: "Returns & Refunds",
    intro:
      "This is draft returns content for the design prototype. The final returns window, exclusions and refund method will be a confirmed business policy before launch.",
    sections: [
      { heading: "Return window", body: ["The prototype suggests a simple, customer-friendly returns process. The exact window (e.g. 7, 15 or 30 days) is a configurable business decision shown here as a placeholder."] },
      { heading: "Eligibility", body: ["Items are expected to be unused, in original packaging with tags. Certain categories (e.g. candles, personal items) may be excluded for hygiene reasons — final exclusions will be listed before launch."] },
      { heading: "Refunds", body: ["Refunds will be processed to the original payment method through Shopify once the live store launches. The prototype does not collect payments or process refunds."] },
      { heading: "Damaged items", body: ["If an item arrives damaged, the returns policy will cover a replacement or refund. Real claims will be handled through Shopify's order system."] },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "Draft privacy content for the design prototype. This prototype stores only newsletter and contact-form submissions in a demo database and does not run analytics beyond the platform's own tooling.",
    sections: [
      { heading: "What we collect in the prototype", body: ["Email address if you subscribe to the newsletter, and the name, email and message if you use the contact form. Both are stored in the demo backend only."] },
      { heading: "What the Shopify build will collect", body: ["Order details, shipping addresses and payment tokens handled by Shopify's hosted checkout under Shopify's own privacy and PCI compliance. The prototype never collects payment information."] },
      { heading: "Consent", body: ["Newsletter signup includes explicit consent messaging. You will be able to unsubscribe from any email in the live store."] },
      { heading: "Contact", body: ["Privacy questions will be answered through the contact page once a support email is configured. No address or phone number is invented in this prototype."] },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    intro:
      "Draft terms for the design prototype. These are placeholders pending review — they do not constitute approved legal terms and no legal approval is claimed.",
    sections: [
      { heading: "The store", body: ["Noor & Vaani is presented here as a design prototype. Product listings, prices and availability are demonstration data and do not constitute an offer to sell."] },
      { heading: "Orders and payment", body: ["In the live Shopify store, checkout will be handled by Shopify's hosted checkout. The prototype does not capture payments or place orders."] },
      { heading: "Product information", body: ["Products will be described accurately before launch, including materials and ingredients. Where a detail is unconfirmed (e.g. the 'brass' in a demo title), it will be verified or corrected first."] },
      { heading: "Liability", body: ["Full terms of sale, dispute resolution and governing law will be drafted with appropriate counsel before the store goes live."] },
    ],
  },
};
