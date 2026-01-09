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
- Pull requests
- Pushes to main branch

All tests must pass before deployment to GitHub Pages.

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
