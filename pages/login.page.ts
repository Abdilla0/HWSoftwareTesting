import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { Credentials } from '../data/user.factory';

export class LoginPage extends BasePage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-submit');
    this.error = page.getByTestId('login-error');
  }

  async open() {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
    await expect(this.submit).toBeVisible();
  }

  async signIn(credentials: Credentials) {
    await this.email.fill(credentials.email);
    await this.password.fill(credentials.password);
    // Make sure the values really stayed in the fields (Angular can reset them
    // if the page was still starting up) before we submit.
    await expect(this.email).toHaveValue(credentials.email);
    await expect(this.password).toHaveValue(credentials.password);
    await this.submit.click();
  }
}
