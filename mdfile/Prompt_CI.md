# Prompt Log: SIS 2 CI Pipeline

## 1. AI Tool Used

| Item | Value |
| --- | --- |
| Tool | Claude Code (claude.ai web, cloud session with file and shell tools) |
| Model | Claude Opus 5.5 (`claude-opus-5-5`) |
| Effort / thinking setting | medium |
| AI usage level | Level 1: allowed, with prompts and corrections attached |
| Date | 15–18 November 2026 |
| Task | SIS 2 CI pipeline: GitHub Actions workflow for the Playwright suite (4 shards + report merge), CI settings in `playwright.config.ts`, `merge.config.ts`, CI section in the README |

## 2. Input Given to the AI

- `HW.zip`: my previous SIS 2 project (Playwright + TypeScript tests for https://practicesoftwaretesting.com).
- `SIS 2_ CI pipeline for Playwright_ step-by-step guide.pdf`: the assignment guide from the teacher.
- The AI read both, compared the guide with my existing config, and listed what was already done and what was missing.

## 3. How I Used the AI

- I asked the AI to **guide me step by step, not to finish the homework for me**.
- I typed every command and made every file change myself in VS Code on Windows (PowerShell), then pasted the output back.
- The AI could not open the Toolshop website or my GitHub from its environment, so it never ran the tests itself. Every result below comes from my own computer or from my GitHub Actions runs.

## 4. How the Prompts Are Written Here

- Every prompt is copied exactly as I typed it, including spelling mistakes.
- When I pasted terminal output, a file or a screenshot, the content is not repeated. It is shown in square brackets, for example `[attached: ...]`.

---

## 5. Prompts

### Phase 1: Getting started

**Prompt 1** (with `HW.zip` and the PDF attached)

> that my previus homework and i uplod new home work also can you please hep me to solve, it what i want is guide me how to do it not to finish it

*Purpose:* Get a guide for the new assignment based on my own repository, without a finished solution.

**Prompt 2**

> okay i use vs code, now what i need to start with

*Purpose:* Find the first concrete steps in VS Code.

**Prompt 3**

> [attached: terminal output of `git --version`, `node -v` (v22.14.0), `npm ci` and `npx playwright test`: 8 passed in 21.4s]

*Purpose:* Confirm my tools and that the tests pass locally before adding CI.

**Prompt 4**

> wait idnt get it, can you tell me here step bye step i dont wan to look the pdf so i will not confuse

*Purpose:* Get smaller, explained steps (`.gitignore`, `baseURL` from `BASE_URL`, removing the hard-coded password).

**Prompt 5**

> done

**Prompt 6**

> done

*Purpose:* Finished the CI settings in `playwright.config.ts` (`isCI`, `forbidOnly`, `retries`, `workers`, `blob` + `junit` reporters, video) and created `merge.config.ts`.

### Phase 2: Running CI mode locally

**Prompt 7**

> [attached: output of `--shard=1/2` "using 4 workers", then `Copy-Item` error: `blob-report` does not exist]

*Purpose:* Find out why no blob report was created.

**Prompt 8**

> i donr get it

**Prompt 9**

> [attached: my full `playwright.config.ts`]

**Prompt 10**

> [attached: shard output, still "using 4 workers"]

**Prompt 11**

> [attached: `echo $env:CI` printed `true`; `Select-String` found `isCI` only on line 4]

*Purpose:* This showed that my config changes were visible in VS Code but **not saved to disk**.

**Prompt 12**

> C:\myfile\Master\SoftwareTesting\HW\playwright.config.ts

*Purpose:* Confirm I was editing the right file.

**Prompt 13**

> npx playwright test --shard=1/2

**Prompt 14**

> [attached: `Select-String` found 5 `isCI` lines; shard 1 now "using 2 workers"]

**Prompt 15**

> okay

**Prompt 16**

> [attached: output of shard 2 (setup + buy-product ran together), copying both blob zips, `merge-reports` and `show-report`]

*Purpose:* Check that sharding and merging work locally.

**Prompt 17**

> you mena this one
>
> [attached: error "item focused with '.only' is not allowed due to the 'forbidOnly' option"]

*Purpose:* Confirm the `forbidOnly` check works (screenshot saved as `forbidOnly.png`).

### Phase 3: Fixing a flaky test

**Prompt 18**

> wait why its show diff erroe
>
> [attached: 4 test runs; each time a different test failed with `Expected: "1 Abai Avenue"  Received: "Stamm Port"` in `register.page.ts:61`]

*Purpose:* Understand why a different test failed each run.

**Prompt 19**

> its till show error shodl i restrt my vs code

**Prompt 20**

> okay what next

**Prompt 21**

> wait when run couple time 1 9 passed but other shoe different error, its problem wiy my code or website

*Purpose:* Find out if the problem was in my code or in the website.

**Prompt 22**

> look
>
> [attached: 3 runs, still failing at `register.page.ts:61`, the same line as before]

**Prompt 23**

> [attached: `Select-String` showed the fix is saved; new error at `register.page.ts:66`, Street overwritten again after our value]

**Prompt 24**

> can you just give full code please
>
> [attached: my `register.page.ts`]

**Prompt 25**

> i use old one and its work [attached: original `register.page.ts`], but its stil show 1 pas and 1 error

**Prompt 26**

> pkay now 3 of them are passed

*Purpose:* Confirm the new `register.page.ts` is stable (3 runs, 8 passed each).

### Phase 4: Preparing to push

**Prompt 27**

> [attached: `git status` on branch `ci-pipeline`]

*Purpose:* Check that no generated folders (`test-results`, `blob-report`, `reports`) would be committed.

**Prompt 28**

> wait i forgot something didint oush yet can you help me to create, new ppromt md like like previus one

*Purpose:* Create this file.

**Prompt 29**

> give me ready copy

**Prompt 30**

> give em the readme for this one also

*Purpose:* Get the CI section for the README.

### Phase 5: First runs on GitHub

**Prompt 31**

> [attached: screenshot of the branches page, "Check status 0 / 4", "Behind 1 / Ahead 3"] what mean check status and i dont need to pull request rihht to main

**Prompt 32**

> [attached: screenshot: shards 1, 2 and 4 failing, shard 3 in progress]

**Prompt 33**

> [attached: log of shard 1/4: `getByTestId('login-submit')` not found, retried twice]

**Prompt 34**

> [attached: screenshot of the Actions list] i dont undestand

**Prompt 35**

> [attached: screenshots of the run summary and the 10 artifacts, and the file `test-results-1.zip`]

*Purpose:* The AI read `error-context.md` from the artifact: the page was a Cloudflare "Performing security verification" page, not the login page.

**Prompt 36**

> [attached: `git push` rejected (fetch first)]

**Prompt 37**

> [attached: `git push` rejected (non-fast-forward) and `git pull` "You have not concluded your merge"]

**Prompt 38**

> [attached: `git status`: "All conflicts fixed but you are still merging"]

**Prompt 39**

> [attached: screenshot: checks still failing after `workers: 1`]

**Prompt 40**

> here 50s
>
> [attached: shard 4/4 log "using 1 worker", `getByTestId('register-submit')` not found]

*Purpose:* Confirm that 1 worker does not avoid the Cloudflare block.

**Prompt 41**

> [attached: successful `git push` output]

### Phase 6: Pull request and timing

**Prompt 42**

> [attached: screenshot "Open a pull request", "Can't automatically merge"] here right

**Prompt 43**

> yes last time i change the readme on github not on vscode

*Purpose:* Explain the merge conflict: README was edited on GitHub and in VS Code.

**Prompt 44**

> its still show [attached: older shard 4/4 log with "using 1 worker"]

**Prompt 45**

> [attached: `Select-String` output `workers: isCI ? 2 : undefined`]

**Prompt 46**

> so should i do pull request

**Prompt 47**

> [attached: screenshot "Able to merge", PR "Ci pipeline #1" already exists]

**Prompt 48**

> [attached: screenshot of the PR commit list]

**Prompt 49**

> [attached: screenshot of the PR Checks tab: one run "on: push" and one "on: pull_request"]

**Prompt 50**

> wait should i change in fithub or vscode

**Prompt 51**

> [attached: screenshot of the Actions list, run #7 in progress] right now i need to wait this one right

**Prompt 52**

> its also red, lets do it like this the importand things is the system is work because ask my teacher its okay if its difereent branch

### Phase 7: Final checks

**Prompt 53**

> now can we test the system

**Prompt 54**

> no just test in vs code

**Prompt 55**

> [attached: screenshot: typecheck OK, then all local tests failing after ~32 s] wait why its red all now

**Prompt 56**

> i have questions why sometime fail sometime not?

*Purpose:* Understand the three causes of failures: a flaky test (race), Cloudflare, and a slow shared demo site.

**Prompt 57**

> so its normal right

**Prompt 58**

> so i need to just submit this right https://github.com/Abdilla0/HWSoftwareTesting/tree/ci-pipeline

**Prompt 59**

> do we have all this The work is done when every item below is backed by a run link or a line in the README. [the submission checklist from the guide]

**Prompt 60**

> how to do it

**Prompt 61**

> i will not do pull request because my teacher  say i can just submit with ci brach

**Prompt 62**

> [attached: screenshot of the Actions list] which one

**Prompt 63**

> [run links and times: run #7 (1 shard) tests step 4 min 10 s; run #8 (4 shards) steps 59 s, 58 s, 3 min 7 s, 51 s; run #6 (pull_request)]

*Purpose:* Fill the timing table and the evidence links in the README.

**Prompt 64**

> just give me ready copy vs code bc i had alredy the file

*Purpose:* Get the final README and this file as text to paste into VS Code.

---

## 6. What Was Wrong and How It Was Fixed

| # | Problem found | How I found it | Fix |
| --- | --- | --- | --- |
| 1 | `baseURL` was hard-coded | Comparing my config with the guide | `process.env.BASE_URL \|\| 'https://practicesoftwaretesting.com'`. I used `\|\|` instead of `??` because GitHub passes an empty string when the variable is not set |
| 2 | Unused hard-coded password (`existingCustomer`) in `user.factory.ts` | AI search of the code | Deleted it; no test used it |
| 3 | `.gitignore` missing CI folders | Comparing with the guide | Added `reports/`, `all-blob-reports/`, `.act-artifacts/` |
| 4 | CI mode had no effect ("using 4 workers", no `blob-report`) | `Select-String` showed only 1 of 5 `isCI` lines on disk | The file was not saved. Saved it and turned on Auto Save |
| 5 | `test.only` check | Added `test.only` on purpose and ran with `CI=true` | Run failed with the `forbidOnly` error, as expected. Screenshot `forbidOnly.png`, then reverted |
| 6 | **Flaky registration**: a different test failed each run (Street was `"Stamm Port"` instead of `"1 Abai Avenue"`) | Errors in several runs, always in `registerAs` | The site looks up the address from postal code + house number and auto-fills Street/City/State **asynchronously**, sometimes more than once. It overwrote the values typed by the test (a race condition) |
| 7 | First fix attempt (wait for auto-fill, then overwrite, retry with `toPass`) still failed | The error moved to line 66: the site auto-filled again later | Final fix: the tests only need *a registered user*, not a specific street. The test now waits until the auto-filled Street/City/State are not empty and does not overwrite them. 3 runs in a row: 8 passed |
| 8 | All CI runs red: `login-submit` / `register-submit` not found | `error-context.md` in the `test-results-1` artifact showed the Cloudflare page "Performing security verification" | Cloudflare treats GitHub runners as bots. Not fixable in test code; documented in the README. The pipeline itself (shards, retries, artifacts, traces, merge) works |
| 9 | Tried `workers: 1` to send fewer requests | Shard log "using 1 worker", still blocked | Went back to `workers: 2` |
| 10 | `git push` rejected, then a merge conflict in the PR | `git push` hint, "Can't automatically merge" | README had been edited on the GitHub website. Merged `origin/main`, kept the VS Code README (`git checkout --ours README.md`). From then on I edited only in VS Code |
| 11 | No "Run workflow" button for timing | Button missing on the Actions page | It only appears when the workflow is on `main`; used pushes (run #7 with 1 shard, run #8 with 4 shards) instead |

## 7. What I Learned

- A test that passes "sometimes" is not working; it is flaky. Running the suite several times shows it.
- If the error line number does not change after an edit, the file is probably not saved.
- `CI=true` turns on the strict CI settings: `forbidOnly`, `retries: 2`, 2 workers, `blob` + `junit` reporters.
- With project dependencies, Playwright keeps `setup` in the same shard as `buy-product`, which needs the login.
- When CI fails, the artifacts (`error-context.md`, screenshot, trace) show what the page really looked like. Here it proved the failures came from Cloudflare, not from my code.
- Testing against a live public website is unreliable in CI; real projects test their own copy of the app.
- Edit files only in VS Code, not on the GitHub website, or the branches get out of sync.