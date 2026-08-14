# Architecture

FreshMart is a dependency-free full-stack application. `core.js` contains deterministic catalog and pricing rules, `app.js` owns browser rendering and accessibility state, and `server.js` owns trusted inventory, delivery slots, quotes, checkout, order lookup, and static-file delivery.

```text
Browser UI -> REST service -> source catalog
     |             |       -> ignored runtime orders/inventory
     +-> local cart fallback
```

The browser can load `data/products.json` when hosted statically, which makes the GitHub Pages review build useful. Checkout is enabled only when the local API is reachable. The service validates every product, quantity, delivery slot, promotion, and total before writing an order.

The JSON runtime store keeps the project easy to inspect and reset. A production service would use database transactions, idempotency, authenticated ownership, inventory reservations, and payment-provider tokens.
