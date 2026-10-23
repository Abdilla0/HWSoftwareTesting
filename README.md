# Toolshop Playwright suite (SIS 2)

Automated tests for https://practicesoftwaretesting.com using Playwright + TypeScript.

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
| buy-product.spec.ts | add to cart, cart shows right item + quantity, checkout completes |
| compare-products.spec.ts | two products captured; stated price comparison asserted |
| reset-password.spec.ts | known email shows confirmation; invalid email shows an error |

## Structure

- `pages/` one page object per screen; locators live only here
- `fixtures/pages.fixture.ts` gives every test its page objects and a fresh `newUser`
- `data/user.factory.ts` unique user per run (timestamp + random number in the email)
- `tests/auth.setup.ts` logs in once through the UI; the `authenticated` project reuses the session
- `playwright.config.ts` baseURL, `testIdAttribute: 'data-test'`, trace on first retry, retries in CI only

## Decisions

TODO (write in your own words): why only buy-product reuses the saved session,
why emails are generated per run, why there is no waitForTimeout, what you chose not to automate.

## AI appendix (Level 1)

TODO: the prompts you used, what the AI got wrong, and what you corrected.
Example: the registration form gained a required "House number" field that the
first AI draft did not know about. It was found by reading the failure's page snapshot.
