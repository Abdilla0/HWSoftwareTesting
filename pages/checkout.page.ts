import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  private readonly proceedFromSignIn: Locator;
  private readonly proceedFromAddress: Locator;
  private readonly paymentMethod: Locator;
  private readonly cardNumber: Locator;
  private readonly expiry: Locator;
  private readonly cvv: Locator;
  private readonly cardHolder: Locator;
  private readonly confirm: Locator;
  readonly paymentSuccess: Locator;
  private readonly houseNumber: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedFromSignIn = page.getByTestId('proceed-2');
    this.proceedFromAddress = page.getByTestId('proceed-3');
    this.paymentMethod = page.getByTestId('payment-method');
    this.cardNumber = page.getByTestId('credit_card_number');
    this.expiry = page.getByTestId('expiration_date');
    this.cvv = page.getByTestId('cvv');
    this.cardHolder = page.getByTestId('card_holder_name');
    this.confirm = page.getByTestId('finish');
    this.paymentSuccess = page.getByTestId('payment-success-message');
    this.houseNumber = page.getByLabel('House number');
  }

  /**
   * Steps 2-3 of checkout. The seeded customer already has a saved address,
   * so we only press "Proceed" on the sign-in and address steps, then pay.
   */
    async completeOrder() {
    await this.proceedFromSignIn.click();

    await this.houseNumber.fill('42');
    await this.proceedFromAddress.click();

    await this.paymentMethod.selectOption('credit-card');
    await this.cardNumber.fill('1111-1111-1111-1111');
    await this.expiry.fill(nextYearExpiry());
    await this.cvv.fill('123');
    await this.cardHolder.fill('Test Student');
    await this.confirm.click();
  }
}

function nextYearExpiry(): string {
  const year = new Date().getFullYear() + 1;
  return `12/${year}`;
}
