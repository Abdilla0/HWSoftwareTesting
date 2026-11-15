import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../data/user.factory';

export class RegisterPage extends BasePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly dob: Locator;
  private readonly country: Locator;
  private readonly postalCode: Locator;
  private readonly houseNumber: Locator;
  private readonly street: Locator;
  private readonly city: Locator;
  private readonly state: Locator;
  private readonly phone: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.dob = page.getByTestId('dob');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByLabel('House number');
    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.phone = page.getByTestId('phone');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('register-submit');
  }

  async open() {
    await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' });
    await expect(this.submit).toBeVisible();
  }

  async registerAs(user: User) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);
    await this.country.selectOption(user.country);
    await this.postalCode.fill(user.postalCode);
    await this.houseNumber.fill(user.houseNumber);

    // The site looks up the address from postal code + house number and
    // auto-fills street/city/state, sometimes more than once, at unpredictable
    // times. Typing our own values races with those lookups (flaky test).
    // The tests only need a registered user, not a specific street, so we
    // accept the auto-filled address and just wait until it is there.
    await expect(this.street).not.toHaveValue('');
    await expect(this.city).not.toHaveValue('');
    await expect(this.state).not.toHaveValue('');

    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);

    await expect(this.houseNumber).toHaveValue(user.houseNumber);
    await expect(this.street).not.toHaveValue('');
    await this.submit.click();
  }
}