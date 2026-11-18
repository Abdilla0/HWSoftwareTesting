# Toolshop Playwright suite (SIS 2)

[![Playwright Tests](https://github.com/Abdilla0/HWSoftwareTesting/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Abdilla0/HWSoftwareTesting/actions/workflows/playwright.yml)

Automated tests for https://practicesoftwaretesting.com using Playwright + TypeScript.

> **Submission note:** the CI work lives on the `ci-pipeline` branch
> (pull request [#1](https://github.com/Abdilla0/HWSoftwareTesting/pull/1) is open, not merged).
> Submitting from this branch was agreed with the teacher. Because the workflow is not on
> `main`, the badge above shows no status for `main`.

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
- `playwright.config.ts` baseURL, `testIdAttribute: 'data-test'`, trace on first retry, CI-only settings
- `merge.config.ts` merges the shard reports into one HTML report and one JUnit file
- `.github/workflows/playwright.yml` the CI pipeline

## Decisions

TODO (write in your own words): why only buy-product reuses the saved session,
why emails are generated per run, why there is no waitForTimeout, what you chose not to automate.

## AI appendix (Level 1)

TODO: the prompts you used, what the AI got wrong, and what you corrected.
Example: the registration form gained a required "House number" field that the
first AI draft did not know about. It was found by reading the failure's page snapshot.

The AI prompt log for the CI part is in `mdfile/Prompt_CI.md`.

---

## CI

**CI system:** GitHub Actions. It is built into GitHub, where the repository already
lives, needs no server of its own, is free for public repositories and supports
matrices for sharding.

**Pipeline** (`.github/workflows/playwright.yml`):
- runs on every push and every pull request (no branch filter), plus a manual "Run workflow" button (`workflow_dispatch`);
- `npm ci` with the npm cache (`actions/setup-node` with `cache: npm`), Chromium installed with system dependencies (`npx playwright install --with-deps chromium`);
- the full Playwright suite, with no `--grep` or `--project` filters, split into 4 shards (`--shard=i/4`) running in parallel;
- the `merge-reports` job merges the shards' blob reports into one HTML report and one JUnit file;
- artefacts: `playwright-report` (HTML), `test-results-1` … `test-results-4` (traces, screenshots, videos, JUnit), `junit-report`; kept for 14 days;
- reports and traces are uploaded even when tests fail (`if: ${{ !cancelled() }}`), and `fail-fast: false` stops one failed shard from cancelling the others.

**CI settings** (`playwright.config.ts`, when `CI=true`):

| Setting | Why |
| --- | --- |
| `forbidOnly: true` | a forgotten `test.only` fails the run instead of silently running one test |
| `retries: 2` | an unstable test is marked *flaky* instead of failing the build |
| `workers: 2` | GitHub runners have only 2–4 vCPUs |
| reporters `list`, `blob`, `junit` | console log, a mergeable report per shard, XML results for CI tools |
| `trace: 'on-first-retry'` | records a trace of exactly the attempt that failed |
| `video: 'retain-on-failure'` | keeps a video of failed tests |

`baseURL` is read from the `BASE_URL` variable and falls back to
`https://practicesoftwaretesting.com` (`||` instead of `??`, because GitHub passes an
empty string when the variable is not set). No logins or passwords are hard-coded:
every test registers its own fresh user. The tests target an external site, so there
is no `webServer` block.

**Sharding and the login setup:** `buy-product` depends on the `setup` project
(log in once). Playwright keeps a dependency in the same shard as the test that
needs it, so the login always runs before the purchase. I checked this locally
with `--shard=1/2` and `--shard=2/2`.

### Evidence

| Checklist item | Evidence |
| --- | --- |
| Run for a push to a feature branch | [run #8 (push)](https://github.com/Abdilla0/HWSoftwareTesting/actions/runs/44016423008) |
| Separate run for a pull request | [run #6 (pull_request, PR #1)](https://github.com/Abdilla0/HWSoftwareTesting/actions/runs/44013695882), screenshot `mdfile/screenshots/push-and-pr-runs.png` |
| npm cache restored | `Run actions/setup-node@v4` step of run #8 shows `Cache restored from key: ...` |
| Browser install + test step without filters | steps `Install Playwright browsers` and `Run Playwright tests` (`npx playwright test --shard=N/4`) in run #8 |
| Artefacts and trace | `playwright-report`, `test-results-1…4`, `junit-report` on the run page; a `trace.zip` from `test-results-1` opened in trace.playwright.dev (`mdfile/screenshots/trace.png`) |
| CI config | `playwright.config.ts`; a forgotten `test.only` fails with *"item focused with '.only' is not allowed due to the 'forbidOnly' option"* (`mdfile/screenshots/forbidOnly.png`) |
| 4 parallel shards + Merge reports | run graph of [run #8](https://github.com/Abdilla0/HWSoftwareTesting/actions/runs/44016423008) |

### Runtime

| Configuration | Total run time | Run tests step (slowest shard) | Run |
| --- | --- | --- | --- |
| 1 job, no sharding | 5 min 1 s | 4 min 10 s | [run #7](https://github.com/Abdilla0/HWSoftwareTesting/actions/runs/44015284440) |
| 4 shards + merge | 3 min 58 s | 3 min 7 s | [run #8](https://github.com/Abdilla0/HWSoftwareTesting/actions/runs/44016423008) |

One run per configuration (not a median of 3), triggered by a push to `ci-pipeline`.
The "Run workflow" button is only available once the workflow is on `main`.

**Conclusion:** 4 shards cut the total run time from 5 min 1 s to 3 min 58 s (about 20 %),
not 4×, because every shard spends about a minute on setup (checkout, `npm ci`, browser
install) and one shard (3 min 7 s) took much longer than the others (51–59 s), since in
these runs the tests were waiting for pages blocked by Cloudflare (see below) and were retried twice.

### Known issue: Cloudflare blocks the GitHub runners

The tests pass locally (8/8, three runs in a row), but in GitHub Actions they fail.
The page snapshot (`error-context.md`) and the trace in the `test-results-N` artefacts
show that practicesoftwaretesting.com returns a Cloudflare page instead of the app:

```
Performing security verification
This website uses a security service to protect against malicious bots.
```

GitHub runners are data-centre machines, so Cloudflare treats them as bots. The test
then waits for the login/register button that never appears (`element(s) not found`).
I tried 1 worker instead of 2 to send fewer requests; it was still blocked, so I went back
to 2. This cannot be fixed in the test code, and bypassing another site's security check
is not appropriate. The pipeline itself works: shards, retries, artefacts, traces and the
merged report are all produced. A real project would run CI against its own copy of the app.

During this work Cloudflare sometimes challenged my own computer too, after many runs in a short time.

### Flaky test found and fixed

The registration form auto-fills Street, City and State from the postal code and house
number. That lookup is asynchronous and sometimes happens more than once, so it
overwrote the values the test had typed, and a different test failed on each run.
Because the tests only need *a registered user*, `registerAs()` now waits for the
auto-filled address instead of overwriting it. After the fix, 3 runs in a row passed (8/8).

### Running locally

Bash / Git Bash:

```bash
npm ci
npx playwright install --with-deps chromium
CI=true npx playwright test
```

PowerShell:

```powershell
npm ci
npx playwright install chromium
$env:CI = "true"; npx playwright test; Remove-Item Env:CI
```