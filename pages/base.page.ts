import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly navCart: Locator;

  constructor(protected readonly page: Page) {
    this.navCart = page.getByTestId('nav-cart');
  }

  async goToCart() {
    await this.navCart.click();
  }
}
