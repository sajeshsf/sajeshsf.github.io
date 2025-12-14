import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', title: 'Home' },
  { path: '/v2/', title: 'V2 Home' },
  { path: '/v2/about/', title: 'V2 About' },
  { path: '/v2/experience/', title: 'V2 Experience' },
  { path: '/v2/projects/', title: 'V2 Projects' },
  { path: '/v2/writing/', title: 'V2 Writing' },
]

test.describe('Page Rendering Checks', () => {
  for (const page of pages) {
    test(`${page.title} page loads correctly`, async ({ page: browserPage }) => {
      // Set up console error tracking before navigation
      const errors = []
      browserPage.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })
      
      // Navigate to page
      await browserPage.goto(page.path)
      
      // Check page loads (200 status)
      await expect(browserPage).toHaveURL(new RegExp(page.path.replace(/\//g, '\\/')), { timeout: 10000 })
      
      // Wait for page to be fully loaded
      await browserPage.waitForLoadState('networkidle', { timeout: 10000 })
      
      // Verify no console errors
      if (errors.length > 0) {
        console.error('Console errors found:', errors)
      }
      expect(errors.length).toBe(0)
      
      // Check key elements exist
      const mainContent = browserPage.locator('main, [role="main"], #main, .v2-main')
      await expect(mainContent.first()).toBeVisible({ timeout: 5000 })
      
      // Check body is not empty
      const bodyText = await browserPage.locator('body').textContent()
      expect(bodyText?.trim().length).toBeGreaterThan(0)
    })
  }
  
  test('V2 Home page has all sections', async ({ page }) => {
    await page.goto('/v2/')
    await page.waitForLoadState('networkidle')
    
    // Check for main sections
    const sections = ['about', 'experience', 'projects', 'writing']
    for (const section of sections) {
      const sectionElement = page.locator(`#${section}`)
      await expect(sectionElement).toBeVisible({ timeout: 5000 })
    }
  })
  
  test('V2 Navigation works', async ({ page }) => {
    await page.goto('/v2/')
    await page.waitForLoadState('networkidle')
    
    // Check navigation links exist
    const navLinks = page.locator('.v2-nav a')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)
  })
})

