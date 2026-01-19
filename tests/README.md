# Tests

End-to-end (E2E) tests for the portfolio website using Playwright.

## Test Files

### rendering.spec.js

Tests that all pages render correctly:
- Homepage renders with all sections
- About page renders
- Experience page renders
- Projects page renders
- Writing page renders

**Run:**
```bash
npm run test:render
```

### responsive.spec.js

Tests responsive design across different viewport sizes:
- Mobile (375x667)
- Tablet (768x1024)
- Desktop (1920x1080)

**Run:**
```bash
npm run test:responsive
```

### accessibility.spec.js

Tests accessibility compliance using Axe:
- WCAG 2.1 AA compliance
- ARIA labels present
- Keyboard navigation works
- Screen reader compatibility

**Run:**
```bash
npm run test:accessibility
```

### visibility.spec.js

Tests component visibility and layout:
- Header does not cover page titles
- All page titles are visible and properly positioned
- Main content has correct padding to account for fixed header
- Section spacing is correct
- Card spacing is consistent
- Breadcrumb navigation is visible and positioned correctly
- Fixed header behavior on scroll

**Run:**
```bash
npm run test:visibility
```

### navigation.spec.js

Tests navigation smoothness and routing:
- Navigation from home page to other pages works smoothly
- No loading skeletons appear during navigation
- Hash-based routing works correctly
- Navigation back from detail views works properly
- All pages load without delays

**Run:**
```bash
npm run test:navigation
```

## Running Tests

### Run All Tests

```bash
npm run test
```

### Run Specific Test Suite

```bash
npm run test:render
npm run test:responsive
npm run test:accessibility
npm run test:visibility
npm run test:navigation
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## Test Configuration

Tests are configured in `playwright.config.js`:
- Browser: Chromium, Firefox, WebKit
- Base URL: `http://localhost:5173`
- Timeout: 30 seconds
- Retries: 2

## Performance Testing

Lighthouse CI is used for performance testing:

```bash
npm run test:lighthouse
```

Tests:
- Performance score (target: 90+)
- SEO score (target: 100)
- Accessibility score (target: 100)
- Best Practices score (target: 90+)

Configuration is in `lighthouserc.cjs`.

## CI/CD Integration

Tests run automatically in GitHub Actions on:
- Pull requests (PR checks workflow)
- Pushes to main branch (deploy workflow)

**PR Checks Workflow:**
- Runs lint, build, visibility, navigation, and accessibility tests
- Uploads build artifacts, test results, and Playwright reports (7-day retention)

**Deploy Workflow:**
- Pre-merge checks: lint and build
- Post-deployment tests: rendering, responsive, visibility, navigation, and Lighthouse
- Uploads build artifacts, test results, and Playwright reports (30-day retention)

All tests must pass before deployment to GitHub Pages. Test artifacts are available in the GitHub Actions UI for debugging.

## Writing New Tests

Example test structure:

```javascript
import { test, expect } from '@playwright/test'

test('my test', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

## Best Practices

1. **Descriptive Names**: Use clear test names
2. **Isolation**: Each test should be independent
3. **Assertions**: Use meaningful assertions
4. **Selectors**: Prefer data-testid or accessible selectors
5. **Timeouts**: Adjust timeouts for slow operations

## Related Documentation

- [Playwright Documentation](https://playwright.dev)
- [Axe Accessibility Testing](https://www.deque.com/axe/core-documentation/api-documentation/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
