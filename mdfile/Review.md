# Review

## What the AI produced

From the lecture deck, the AI generated a complete Playwright + TypeScript project:
config, a data factory, seven page objects, a fixtures file, a log-in-once setup,
five spec files (8 test runs in total) and a README skeleton.
It followed the structure from the slides (pages, fixtures, data, no locators in specs).

Important limit: the AI could **not open the Toolshop website**, so it could not
run anything against it. The `data-test` names and the page flow were its best
guesses. That is why the first version did not work, and why I had to review and
correct it by running it myself.

## How I reviewed it

1. I asked for the code step by step instead of all at once, so I understood each file.
2. I ran every spec on my own computer with `npx playwright test --reporter=list`.
3. For each failure I read the Playwright error and the `error-context.md` file,
   which describes the page at the moment of the failure, and gave them back to the AI.
4. I used `npx tsc --noEmit` to check types, and checked that the code has no
   `waitForTimeout` and no locators in spec files.

## What was wrong and how it was fixed

| # | Problem found | How I found it | Fix |
| --- | --- | --- | --- |
| 1 | `tsc` was not installed, and `process` had no type | Error in terminal and editor | Installed `typescript` and `@types/node`, added `tsconfig.json` |
| 2 | The `fixtures` folder was created inside `.github` | VS Code folder tree, 26 import errors | Moved it to the project root |
| 3 | `npm install` failed in the wrong folder | `ENOENT package.json` | Ran it in the folder that contains `package.json` |
| 4 | Registration did not submit | `error-context.md` showed `alert: House number is required` | The form has a new required House number field; added `houseNumber` to the user data and the register page object, filled before street/city/state |
| 5 | Valid login failed | `error-context.md` showed "Invalid email or password" | The seeded demo account no longer works. Added a `registeredUser` fixture that registers a fresh user first, and used it in login, setup and reset-password |
| 6 | Buy test could not add to cart | Page snapshot showed "Out of stock" and a disabled button on the first product | Added `openFirstInStockProduct()` that skips products that cannot be bought |
| 7 | Checkout "Proceed" stayed disabled | Billing step had an empty House number | Filled the house number, and fixed the order of the lines (fill first, then click) |
| 8 | Payment fields not found | `waiting for getByTestId('credit-card-number')` | Corrected the `data-test` names of the payment fields to match the page |
| 9 | Reset confirmation not found | Screenshot of the page | The site shows the untranslated text `page.forgot-password.confirm`; the locator now matches that text or a normal sentence |
| 10 | Timeouts when 6 workers ran together | `page.goto` timeout on the shared site | Set `workers: 3`, used `waitUntil: 'domcontentloaded'` and rely on a web-first assertion for the form |
| 11 | Login page object opened the register page | Error showed `goto('/auth/register')` inside `login.page.ts` | Corrected the path to `/auth/login` (my copy-paste mistake) |

## Decisions and why

- **Each test creates its own account** (`registeredUser`), because the seeded account
  stopped working and because the brief says tests must be independent and create their own data.
- **Unique email on every run** (timestamp + random number), so a second run does not fail with "email already exists".
- **Log in once** in `auth.setup.ts` and reuse the session only for the buy test (`authenticated` project).
  The register, login and reset tests start logged out, because login is their subject.
- **No `waitForTimeout`.** Waiting is done by Playwright's auto-wait and web-first assertions (`toBeVisible`, `toHaveURL`, `toHaveValue`).
- **No locators in spec files.** Locators live only in page objects. Specs import `test` from the fixture file.
- **Compare test:** the Toolshop has no compare feature, so the test performs the comparison itself:
  it captures name and price of two different products and asserts they differ and that the cheaper one costs less or equal.
- **Reset password:** the hosted site cannot show an email, so the test checks the on-screen result only.
  The message on the site is an untranslated key (`page.forgot-password.confirm`), which I consider a bug of the application.
- **Retries only in CI** (config), as in the slide: locally I want to see real failures.

## What I did not accept from the AI

- The first answer was a complete project. I asked for step-by-step guidance instead, to understand it.
- Guessed `data-test` names were never trusted until they passed on the real site.

## Final result

TODO: after your final run, paste the summary line, for example `9 passed`, and the date.
Also write whether you ran it twice (`--repeat-each=2`) and on a clean clone.
