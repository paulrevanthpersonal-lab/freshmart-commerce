# Interview guide

## One-minute explanation

FreshMart is the full-stack evolution of my earlier single-file grocery prototype. It separates pricing rules from UI state, serves 40 product records, validates stock and delivery slots on the server, persists test orders, and keeps the shopping flow accessible on desktop and mobile.

## Decisions I can explain

- Core pricing and filtering rules have no DOM dependency, so Node can test them quickly.
- The cart persists locally, while checkout is revalidated by the service so browser values are never trusted.
- CSS animations use transform and opacity and respect reduced-motion preferences.
- Checkout creates a real local order record but deliberately never collects payment details.

## Next production steps

An actual commerce release needs authenticated accounts, a transactional database, inventory reservations, payment-provider tokenization, consented analytics, image optimization, rate limiting, error monitoring, and end-to-end checkout tests.
