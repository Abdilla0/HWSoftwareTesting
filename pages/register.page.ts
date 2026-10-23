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

    // Street / city / state are auto-filled from postal code + house number.
    // We fill them AFTER, so our values are the ones that stay.
    await this.street.fill(user.street);
    await this.city.fill(user.city);
    await this.state.fill(user.state);

    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);

    await expect(this.houseNumber).toHaveValue(user.houseNumber);
    await expect(this.street).toHaveValue(user.street);
    await this.submit.click();
  }
}
