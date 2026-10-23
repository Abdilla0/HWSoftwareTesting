# Prompt Log

## 1. AI Tool Used

| Item | Value |
| --- | --- |
| Tool | Claude (claude.ai chat interface, with file and shell tools) |
| Model | Claude Sonnet 5.5 |
| Effort / thinking setting | TODO: write your setting, or "default" |
| AI usage level | Level 1: allowed, with prompts and corrections attached |
| Date | 23 October 2026 |
| Task | SIS 2: five automated test cases for https://practicesoftwaretesting.com with Playwright and TypeScript |

## 2. Input Given to the AI

- `Week_6_Masters_ST.pptx` (Week 6, Software Testing and Debugging), attached to the first prompt.
- The AI used slides 19-30 (configuration, project structure, page object, fixtures, log in once, test data, SIS 2 brief, grading rules) as the specification.

## 3. How the Prompts Are Written Here

- Every prompt is copied exactly as I typed it, including spelling mistakes.
- When I pasted terminal output, an `error-context.md` file or a screenshot, the content is not repeated. It is shown in square brackets, for example `[attached: ...]`.

---

## 4. Prompts

### Phase 1: Getting the project started

**Prompt 1** (with the .pptx attached)

> can you finish help me to finish my home work just tell me whta code i need to write and in whish folder what else i need to change and make sure everything is work

*Purpose:* Ask the AI to build the homework from the slides.

**Prompt 2**

> dont give me finish one i want you to tel mee step by step to do here

*Purpose:* I wanted to understand every step, so I asked for guided steps instead of a finished project.

**Prompt 3**

> for this one i say yess for all Answer the questions like this:
>
> * Language: TypeScript
> * Tests folder: tests
> * GitHub Actions: No
> * Install browsers: Yes

*Purpose:* Clarify how to answer the Playwright installer questions.

### Phase 2: Fixing setup problems

**Prompt 4**

> in step 2 Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.

*Purpose:* Fix a TypeScript error in `playwright.config.ts`.

**Prompt 5**

> [attached: terminal output of `npx tsc --noEmit` saying "This is not the tsc command you are looking for"]

*Purpose:* Fix the missing TypeScript compiler.

**Prompt 6**

> okay next

**Prompt 7**

> can you show me folder structure

*Purpose:* Check that my files are in the right places.

**Prompt 8**

> what pages do

*Purpose:* Understand the purpose of the `pages/` folder (page objects).

**Prompt 9**

> you are foolow the slide from what my teacher said right?

*Purpose:* Check that the code follows the teacher's slides.

**Prompt 10**

> okay lest continue

**Prompt 11**

> can you please give all the 3 code all them now i need recheck

**Prompt 12**

> i mean login register also

*Purpose:* Get every file in full so I could compare it with mine.

**Prompt 13**

> i need fix this, i have problem with that can you help me to fix
>
> [attached: screenshots of the VS Code folder tree and `pages.fixture.ts` with import errors]

*Purpose:* Fix the `fixtures` folder that was inside `.github`.

**Prompt 14**

> now here
>
> [attached: screenshot of `login.spec.ts` with a red import line]

### Phase 3: Running the tests and fixing failures

**Prompt 15**

> okay now lets start test in this part

**Prompt 16**

> [attached: terminal output of `login.spec.ts`: valid login stays on /auth/login]

**Prompt 17**

> [attached: terminal output of `register.spec.ts`: stays on /auth/register]

**Prompt 18**

> [attached: `error-context.md` of the register test, showing "House number is required"]

**Prompt 19**

> here
>
> [attached: `user.factory.ts` with `houseNumber` added only to the interface]

**Prompt 20**

> [attached: terminal output of the register test after the house number fix, still failing]

### Phase 4: Rebuilding the full version

**Prompt 21**

> maybe lest just start from begining can you just send me full version finish homework

*Purpose:* I was lost after many small errors, so I asked for a complete corrected project.

**Prompt 22**

> [attached: terminal output of `npm install` failing with `ENOENT package.json` in the wrong folder]

**Prompt 23**

> [attached: results of the first full run of the rebuilt project: 4 passed, 3 failed]

**Prompt 24**

> [attached: `error-context.md` of the valid login test, showing "Invalid email or password"]

**Prompt 25**

> [attached: `error-context.md` of the reset password test]

**Prompt 26**

> sorry i was apply b options and it show
>
> [attached: results after the registered-user fixture, buy test failing at the billing address]

**Prompt 27**

> [attached: `error-context.md` of the buy test, showing the billing address form with an empty House number]

**Prompt 28**

> [attached: results of the buy test timeout]

**Prompt 29**

> here
>
> [attached: `error-context.md` of the buy test, showing the first product is "Out of stock"]

**Prompt 30**

> [attached: results of the buy test failing at the payment fields `credit-card-number`]

**Prompt 31**

> nice it passed

### Phase 5: Final problems and documents

**Prompt 32**

> [attached: results of the full run: setup timeout and reset password confirmation not found]

**Prompt 33**

> can you give me the what i need to do in reser pasword?

**Prompt 34**

> it show only
>
> [attached: screenshot of the Forgot Password page showing the message "page.forgot-password.confirm"]

**Prompt 35**

> [attached: results of the full run: three login tests failing because the login page object opened /auth/register]
,kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkx

---

## 5. Important Note

The AI could not open the Toolshop website from its own environment, so it never ran the tests itself. Every test result in this project comes from me running the tests on my own computer and giving the output back to the AI. Details of what was wrong and how I corrected it are in `Review.md`.