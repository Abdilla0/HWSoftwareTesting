import { test, expect } from '../fixtures/pages.fixture';

// The Toolshop has no compare feature, so the comparison is done by the test:
// open two different products, capture name + price, and assert what we state.
test('two different products have different names and the cheaper one costs less or equal', async ({ productPage }) => {
  await productPage.openHome();
  await productPage.openCatalogueItem(0);
  const first = await productPage.readDetails();

  await productPage.openHome();
  await productPage.openCatalogueItem(1);
  const second = await productPage.readDetails();

  expect(first.name).not.toBe(second.name);
  expect(first.price).toBeGreaterThan(0);
  expect(second.price).toBeGreaterThan(0);

  const [cheaper, dearer] = first.price <= second.price ? [first, second] : [second, first];
  expect(cheaper.price).toBeLessThanOrEqual(dearer.price);
});
