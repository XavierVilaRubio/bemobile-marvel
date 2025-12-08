# E2E Tests

This directory contains end-to-end tests using Playwright.

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug
```

## Test Structure

- `home.spec.ts` - Tests for the home page (character listing, search)
- `character.spec.ts` - Tests for character detail pages
- `favorites.spec.ts` - Tests for favorites functionality
- `navigation.spec.ts` - Tests for navigation between pages

## Configuration

Tests are configured in `playwright.config.ts`. The dev server will automatically start before running tests.

## Writing New Tests

When writing new E2E tests:

1. Use descriptive test names
2. Wait for elements to be visible before interacting
3. Use data-testid attributes when possible for more reliable selectors
4. Clean up state (localStorage, cookies) in beforeEach hooks when needed
5. Use appropriate timeouts for async operations

## CI/CD

In CI environments, tests will:
- Run in headless mode
- Retry failed tests twice
- Generate HTML reports

