# Architecture

FreshMart is a dependency-free browser application. `core.js` contains deterministic catalog and pricing rules, while `app.js` owns DOM rendering, browser events, accessibility state, and local persistence. This boundary keeps business rules testable without a browser.

```text
catalog data -> pure filter/sort/pricing rules -> view renderer
                                               -> localStorage cart
                                               -> accessible drawer state
```

The static architecture is deliberate: reviewers can run the complete product from any simple web server, and the same interface can later consume inventory and checkout APIs.
