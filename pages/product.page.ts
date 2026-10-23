import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface ProductInfo {
  name: string;
  price: number;
}

export function parsePrice(text: string): number {
  return Number(text.replace(/[^0-9.]/g, ''));
}

export class ProductPage extends BasePage {
  private readonly catalogueNames: Locator;
  private readonly detailName: Locator;
  private readonly detailPrice: Locator;
  private readonly addToCart: Locator;

  constructor(page: Page) {
    super(page);
    this.catalogueNames = page.getByTestId('product-name');
    this.detailName = page.getByTestId('product-name');
    this.detailPrice = page.getByTestId('unit-price');
    this.addToCart = page.getByTestId('add-to-cart');
  }

  async openHome() {
    await this.page.goto('/');
  }

  /** Opens the nth product of the catalogue (0 = first). */
  async openCatalogueItem(index: number) {
    await this.catalogueNames.nth(index).click();
    await this.addToCart.waitFor();
  }

  /** Name and price as shown on the product detail page. */
  async readDetails(): Promise<ProductInfo> {
    await this.detailName.waitFor();
    const name = ((await this.detailName.textContent()) ?? '').trim();
    const price = parsePrice((await this.detailPrice.textContent()) ?? '');
    return { name, price };
  }

  async addCurrentProductToCart() {
    await this.addToCart.click();
  }

  async openFirstInStockProduct() {
    await this.catalogueNames.first().waitFor();
    const total = await this.catalogueNames.count();

    for (let i = 0; i < total; i++) {
      await this.openCatalogueItem(i);
      await this.detailPrice.waitFor();
      if (await this.addToCart.isEnabled()) {
        return;
      }
      await this.openHome();
      await this.catalogueNames.first().waitFor();
    }
    throw new Error('No in-stock product found in the catalogue');
  }
}
