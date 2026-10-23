import { test, expect } from '../fixtures/pages.fixture';

// Runs in the "authenticated" project: the session comes from auth.setup.ts.
test('a signed-in customer can buy a product', async ({ productPage, cartPage, checkoutPage }) => {
  await productPage.openHome();
  await productPage.openFirstInStockProduct();
  const product = await productPage.readDetails();
  await productPage.addCurrentProductToCart();

  await productPage.goToCart();
  await expect(cartPage.productTitles).toHaveCount(1);
  await expect(cartPage.productTitles.first()).toContainText(product.name);
  await expect(cartPage.quantities.first()).toHaveValue('1');

  await cartPage.proceedToCheckout();
  await checkoutPage.completeOrder();

  await expect(checkoutPage.paymentSuccess).toBeVisible();
});
