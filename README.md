# FreshMart Commerce

An accessible full-stack grocery storefront evolved from my original FreshMart browser prototype, with a 40-item catalog, inventory-aware checkout, delivery-slot validation, persisted test orders, and a responsive shopping experience.

**[Open the live demo](https://paulrevanthpersonal-lab.github.io/freshmart-commerce/)**

![FreshMart desktop storefront](docs/screenshots/storefront-desktop.png)

## 1. Product overview

FreshMart lets shoppers search and filter 40 grocery and household products, choose fulfillment mode and delivery time, manage cart quantities, apply a reviewer promotion, and place a server-validated test order.

## 2. Original-work lineage

This repository is a structured evolution of my earlier single-file FreshMart project. The catalog and cart concept are retained; architecture, accessibility, testing, documentation, and visual design were expanded for portfolio presentation.

## 3. User experience

The visual system uses an editorial market aesthetic rather than a generic dashboard. Desktop and mobile layouts preserve product discoverability and make the basket reachable without losing catalog context.

## 4. Capabilities

- Search, category filters, and four sort modes
- Persistent cart with quantity controls
- Delivery/pickup state and transparent tax calculation
- Server-owned inventory, delivery slots, order totals, and order status
- Reviewer promotion `FRESH10` and explicit non-payment checkout
- Keyboard shortcut, Escape handling, focus return, and live announcements

## 5. Architecture

Pure pricing rules live in `assets/core.js`, browser behavior lives in `assets/app.js`, and `server.js` owns inventory, quotes, checkout, order persistence, and static delivery. See [architecture notes](docs/ARCHITECTURE.md) and the [API contract](docs/API.md).

## 6. Technology

Semantic HTML, modern CSS, vanilla JavaScript, Node.js HTTP APIs, JSON persistence, localStorage fallback, Node's built-in test runner, browser screenshots, and GitHub Actions.

## 7. Performance approach

The project has no third-party runtime dependencies. Motion is limited to compositor-friendly transform/opacity changes and product rendering is incremental. Actual frame rate depends on the browser and device; the UI does not claim a universal 120 FPS guarantee.

## 8. Accessibility

Keyboard behavior, semantic structure, live status messages, reduced motion, and labeled quantity controls are documented in [ACCESSIBILITY.md](docs/ACCESSIBILITY.md).

## 9. Quick start

```bash
npm start
# open http://localhost:4180
```

The GitHub Pages build remains usable as a read-only storefront with local cart state. Run the Node service for validated checkout and persisted orders.

## 10. Testing

```bash
npm run check
npm test
```

Unit tests cover the 40-record catalog, search/category filtering, stable sorting, promotions, and totals. The integration test starts the service, creates an order, and retrieves its status.

## 11. Automated screenshots

```bash
./scripts/capture_screenshots.sh
```

Desktop and mobile captures are written to `docs/screenshots/`.

## 12. Repository map

```text
assets/        styles, UI controller, testable rules
data/          40-product catalog and delivery slots
docs/          architecture, accessibility, interview notes, screenshots
scripts/       repeatable visual capture
tests/         unit and API integration tests
index.html     accessible application shell
server.js      catalog, quote, checkout, order, and static-file service
```

## 13. Data and privacy

The browser keeps cart state locally. The local service writes test orders and inventory changes to an ignored runtime file. There are no trackers, payment calls, or third-party product APIs.

## 14. Security boundary

The included server revalidates product IDs, stock, fulfillment selection, promotions, and totals. It never collects payment details. A production release would add authenticated customers, a transactional database, idempotency keys, rate limiting, payment-provider tokenization, and operational monitoring.

## 15. Browser support

The interface targets current Chrome, Edge, Firefox, and Safari. It degrades to standard scrolling and controls when backdrop filtering is unavailable.

## 16. Interview discussion

The [interview guide](docs/INTERVIEW_GUIDE.md) explains architectural decisions, trade-offs, and credible production next steps.

## 17. Roadmap

- Authenticated accounts and order history
- PostgreSQL transactions and idempotent checkout
- Automated accessibility and browser tests
- Payment-provider sandbox integration

## 18. License

[MIT](LICENSE)
