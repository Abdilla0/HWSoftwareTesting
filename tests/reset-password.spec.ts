import { test, expect } from '../fixtures/pages.fixture';

test('a known email gets the reset confirmation', async ({ forgotPasswordPage, registeredUser }) => {
  await forgotPasswordPage.open();
  await forgotPasswordPage.requestReset(registeredUser.email);

  await expect(forgotPasswordPage.success).toBeVisible();
});

test('an invalid email shows an error and no confirmation', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.open();
  await forgotPasswordPage.requestReset('not-an-email');

  await expect(forgotPasswordPage.emailError).toBeVisible();
  await expect(forgotPasswordPage.success).toBeHidden();
});