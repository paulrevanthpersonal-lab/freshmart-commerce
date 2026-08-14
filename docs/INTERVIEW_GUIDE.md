# Interview guide

## One-minute explanation

FreshMart is an accessible grocery storefront I evolved from an earlier single-file prototype. The portfolio edition separates testable pricing logic from UI state, adds responsive product discovery, persisted cart quantities, delivery mode, promo handling, keyboard behavior, and a distinct editorial visual system.

## Decisions I can explain

- Core pricing and filtering rules have no DOM dependency, so Node can test them quickly.
- The cart persists locally to demonstrate resilient client state without pretending a payment backend exists.
- CSS animations use transform and opacity and respect reduced-motion preferences.
- Checkout is clearly labeled as a demonstration rather than simulating a real transaction.

## Next production steps

An actual commerce release needs authenticated accounts, inventory and pricing APIs, server-side cart validation, a payment provider, analytics consent, image optimization, error monitoring, and end-to-end checkout tests.
