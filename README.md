# Playwright Automation Project

This repository contains Playwright automation tests for an e-commerce website. The project is organized using the Page Object Model (POM) and includes UI tests, locator definitions, reusable constants, and test reports.

## Prerequisites
- Node.js
- npm

## Installation
```bash
npm install
npx playwright install
```

## Running Tests
Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/signupPage.spec.ts
```

## Viewing Reports
Open the HTML report after a test run:
```bash
npx playwright show-report
```

## Project Structure
- tests/ - contains test specifications
- pages/ - page object classes
- locators/ - element locators
- constants/ - reusable constants and selectors
- utils/ - helper and environment utilities

## Notes
- Test reports are generated under the playwright-report folder.
- Make sure dependencies are installed before running tests.
