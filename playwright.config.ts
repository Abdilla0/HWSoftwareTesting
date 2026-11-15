import { defineConfig, devices } from '@playwright/test';

const AUTH_FILE = 'playwright/.auth/user.json';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: isCI,                // a forgotten test.only fails CI
  retries: isCI ? 2 : 0,           // a flaky test is retried in CI only
  workers: isCI ? 1 : undefined,   // 1 worker in CI: fewer requests, less Cloudflare blocking
  reporter: isCI
    ? [
        ['list'],
        ['blob'],                                            // for merging shards
        ['junit', { outputFile: 'reports/junit.xml' }],      // standard XML results
      ]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com', // 1. relative goto()
    testIdAttribute: 'data-test', // 2. getByTestId maps here
    trace: 'on-first-retry', // 3. a recording when it fails
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
