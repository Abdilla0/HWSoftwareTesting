# Description

## What I want to do

Automate five test cases for the Toolshop demo web application
(https://practicesoftwaretesting.com) using **Playwright with TypeScript**, as
required by the SIS 2 brief (Week 6, Software Testing and Debugging, KBTU 2026).

The suite is structured the way the brief asks: page objects, a fixture layer,
a data factory, a log-in-once setup, no locators in spec files, no
`waitForTimeout`, and every test has an assertion that can fail.

## List of test cases to be automated

| # | Test case | Spec file | What it proves |
| --- | --- | --- | --- |
| 1 | Register a new customer | `tests/register.spec.ts` | A unique new account is created and the user lands on the login page |
| 2 | Log in | `tests/login.spec.ts` | Valid credentials reach `/account`; invalid ones show an error and do not |
| 3 | Buy a product | `tests/buy-product.spec.ts` | Add to cart, cart shows the right item and quantity, checkout completes with a success message |
| 4 | Compare two products | `tests/compare-products.spec.ts` | Two different products are opened, name and price captured, the stated comparison is asserted |
| 5 | Reset a password | `tests/reset-password.spec.ts` | A known email shows the confirmation message; an invalid email shows an error and no confirmation |

In total there are 8 test runs: 2 for login, 2 for reset password, 1 each for the
others, plus `tests/auth.setup.ts`, which logs in once and saves the session.

## Technology

- Playwright (`@playwright/test`) and TypeScript
- Browser: Chromium (Desktop Chrome)
- `data-test` attributes are used through `testIdAttribute: 'data-test'` in the config

## Project structure

```
tests/      one spec per test case + auth.setup.ts
pages/      one page object per screen (base, login, register, forgot-password, product, cart, checkout)
fixtures/   pages.fixture.ts (page objects + newUser + registeredUser)
data/       user.factory.ts (unique user per run)
playwright.config.ts
```

## How to run

```bash
npm install
npx playwright install chromium
npx playwright test
```

## What I chose not to automate

- Reading the real password-reset email (the hosted site cannot show it, so test 5 checks only the UI result).
- Favourites, product filters and sorting, contact form, account editing. They are outside the five required cases.
- Cross-browser runs. Only Chromium is configured.

## Link to the repository

TODO: https://github.com/<your-username>/<your-repository>
