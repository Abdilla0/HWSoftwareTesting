import { test as setup, expect } from '../fixtures/pages.fixture';

// Runs once: creates an account, logs in through the UI, saves the session.
setup('authenticate', async ({ loginPage, registeredUser, page }) => {
  await loginPage.open();
  await loginPage.signIn(registeredUser);
  await expect(page).toHaveURL(/\/account/);
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});