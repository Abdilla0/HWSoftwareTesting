# Toolshop Playwright suite (SIS 2)

Automated tests for https://practicesoftwaretesting.com using Playwright and TypeScript.

## How to run

```bash
npm install
npx playwright install chromium
npx playwright test            # all tests
npx playwright test --ui       # UI mode
npx playwright show-report
```

## What is covered

| Spec | Proves |
| --- | --- |
| register.spec.ts | a unique new account is created and the user lands on the login page |
| login.spec.ts | valid credentials reach /account; invalid ones show an error and do not |
| buy-product.spec.ts | an in-stock product is added, the cart shows the right item and quantity, checkout completes with a success message |
| compare-products.spec.ts | two different products are opened, name and price captured, the stated price comparison is asserted |
| reset-password.spec.ts | a known email shows the confirmation; an invalid email shows an error and no confirmation |

## Structure

- `tests/` one spec per test case, plus `auth.setup.ts` which logs in once through the UI
- `pages/` one page object per screen; locators live only here, never in a spec
- `fixtures/pages.fixture.ts` gives every test its page objects, a fresh `newUser`, and a `registeredUser` (an account created through the UI before the test starts)
- `data/user.factory.ts` creates a unique user for every run (timestamp and random number in the email)
- `playwright.config.ts` baseURL, `testIdAttribute: 'data-test'`, trace on first retry, retries in CI only, 3 workers

## Decisions

- **Each test creates its own account (`registeredUser`).** The seeded demo account
  stopped working ("Invalid email or password") and the brief says tests must be
  independent and create the data they need. It also stops tests from depending on a
  shared account that other people may change on this public site.
- **A new unique email on every run.** A hard-coded new account would fail on the second
  run with "email already exists". The email uses a timestamp and a random number.
- **Log in once, but only for the buy test.** `auth.setup.ts` logs in through the UI and
  saves the session; the `authenticated` project reuses it. Register, login and reset
  password start logged out, because login or account creation is their subject.
- **No `waitForTimeout` anywhere.** Waiting is done by Playwright's auto-waiting and
  web-first assertions (`toBeVisible`, `toHaveURL`, `toHaveValue`), which retry until they
  are true.
- **No locators in spec files.** Specs call business actions such as `signIn()` and
  `registerAs()`; the page objects contain the `data-test` locators.
- **Buy test picks an in-stock product.** The first product in the catalogue can be out of
  stock, so the page object opens products until it finds one whose "Add to cart" is enabled.
- **Compare test.** The Toolshop has no compare feature, so the test does the comparison
  itself: it captures name and price of two different products and asserts that the names
  differ and that the product I call "cheaper" costs less than or the same as the other.
- **Reset password.** The hosted site cannot show an email, so the test checks only what is
  visible on screen. The site shows the untranslated text `page.forgot-password.confirm`,
  which I would report as a bug. The locator matches that text or a normal sentence, so it
  keeps working if the site is fixed.
- **Retries only in CI, 3 workers.** Locally I want to see real failures. Three workers
  avoid timeouts on the shared site.
- **Not automated:** reading the reset email, favourites, filters and sorting, the contact
  form, account editing, and browsers other than Chromium.

## AI appendix (Level 1)

I used Claude (Claude Sonnet 5.5) in the Claude chat. The full
