import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly productTitles: Locator;
  readonly quantities: Locator;
  private readonly proceed: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitles = page.getByTestId('product-title');
    this.quantities = page.getByTestId('product-quantity');
    this.proceed = page.getByTestId('proceed-1');
  }

  async proceedToCheckout() {
    await this.proceed.click();
  }
}
