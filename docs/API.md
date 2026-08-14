# API contract

## Catalog and fulfillment

- `GET /api/products` returns the 40-product inventory and accepts search, category, and sort queries.
- `GET /api/delivery-slots` returns valid delivery and pickup windows.
- `POST /api/quote` validates product IDs, quantities, inventory, fulfillment, promotion, tax, and total without writing an order.

## Orders

- `POST /api/orders` repeats quote validation, creates a test order, decrements runtime inventory, and returns a confirmation number.
- `GET /api/orders/:id` returns the stored order status for a valid confirmation number.

Runtime state is written to `data/runtime.json`, which is intentionally ignored by Git. The service does not accept card or bank information.
