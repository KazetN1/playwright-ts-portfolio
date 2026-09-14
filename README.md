# Playwright + TypeScript Portfolio
This is a personal project that I am building to develop my test automation skills using Playwright and TypeScript. The tests are cross-browser (Chromium, Firefox, and WebKit). The project is still in development. More UI and API tests will be added as I continue learning and expanding the test suite.

The tests are written against the [Expand Testing](https://practice.expandtesting.com/) practice application.

## Current test coverage
The project currently contains login tests covering:
- successful login
- invalid username
- invalid password

## Project setup
The project currently uses:
- Playwright
- TypeScript
- Page Object Model
- GitHub Actions

## Running the tests
Install the dependencies:
```bash
npm ci
npx playwright install
```

Run all tests:
```bash
npx playwright test
```

Open the HTML report:
```bash
npx playwright show-report
```