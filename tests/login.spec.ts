import { test, expect } from '../fixtures/pages.fixture';

test('valid credentials open the account page', async ({ loginPage, registeredUser, page }) => {
  await loginPage.open();
  await loginPage.signIn(registeredUser);

  await expect(page).toHaveURL(/\/account/);
});

test('invalid credentials show an error and do not log in', async ({ loginPage, registeredUser, page }) => {
  await loginPage.open();
  await loginPage.signIn({ email: registeredUser.email, password: 'wrong-password' });

  await expect(loginPage.error).toBeVisible();
  await expect(page).not.toHaveURL(/\/account/);
});