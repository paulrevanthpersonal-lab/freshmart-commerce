(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.FreshMartCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const money = value => `$${Number(value).toFixed(2)}`;
  const filterProducts = (products, query, category) => products.filter(product => {
    const categoryMatch = category === "All" || product.category === category;
    const queryMatch = product.name.toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatch && queryMatch;
  });
  const sortProducts = (products, sort) => [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return a.rank - b.rank;
  });
  const calculateTotals = (lines, discounted = false) => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const discount = discounted ? subtotal * 0.10 : 0;
    const tax = (subtotal - discount) * 0.08;
    return { subtotal, discount, tax, total: subtotal - discount + tax };
  };
  return { money, filterProducts, sortProducts, calculateTotals };
});
