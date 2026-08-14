const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../assets/core.js");
const products = [{ name: "Apple", category: "Produce", price: 2, rank: 2 }, { name: "Milk", category: "Dairy", price: 4, rank: 1 }];
test("filters by query and category", () => assert.equal(core.filterProducts(products, "app", "Produce").length, 1));
test("sorts without mutating source", () => { const sorted = core.sortProducts(products, "price-desc"); assert.equal(sorted[0].name, "Milk"); assert.equal(products[0].name, "Apple"); });
test("calculates discount before tax", () => { const total = core.calculateTotals([{ price: 10, quantity: 2 }], true); assert.deepEqual(total, { subtotal: 20, discount: 2, tax: 1.44, total: 19.44 }); });
