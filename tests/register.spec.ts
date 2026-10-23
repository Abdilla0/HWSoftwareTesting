import { test, expect } from '../fixtures/pages.fixture';

test('a new customer can register and is taken to the login page', async ({ registerPage, newUser, page }) => {
  await registerPage.open();
  await registerPage.registerAs(newUser);

  await expect(page).toHaveURL(/\/auth\/login/);
});
