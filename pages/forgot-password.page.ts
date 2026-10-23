import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ForgotPasswordPage extends BasePage {
  private readonly email: Locator;
  private readonly submit: Locator;
  readonly success: Locator;
  readonly emailError: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByTestId('email');
    this.submit = page.getByTestId('forgot-password-submit');
    this.success = page.getByText(/forgot-password\.confirm|reset link|has been sent/i);
    this.emailError = page.getByTestId('email-error');
  }

  async open() {
    await this.page.goto('/auth/forgot-password');
  }

  async requestReset(email: string) {
    await this.email.fill(email);
    await this.submit.click();
  }
}
