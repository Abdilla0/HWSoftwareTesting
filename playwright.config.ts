import { defineConfig, devices } from '@playwright/test';

const AUTH_FILE = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // 4. retry in CI only
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://practicesoftwaretesting.com', // 1. relative goto()
    testIdAttribute: 'data-test', // 2. getByTestId maps here
    trace: 'on-first-retry', // 3. a recording when it fails
    screenshot: 'only-on-failure',
    navigationTimeout: 30_000,
  },
  projects: [
    // Logs in ONCE through the UI and saves the session.
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    // Tests that must start logged out.
    {
      name: 'anonymous',
      testMatch: [/register\.spec\.ts/, /login\.spec\.ts/, /reset-password\.spec\.ts/, /compare-products\.spec\.ts/],
      use: { ...devices['Desktop Chrome'] },
    },

    // Tests that only need "a signed-in customer" reuse the saved session.
    {
      name: 'authenticated',
      testMatch: /buy-product\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
    },
  ],
});
