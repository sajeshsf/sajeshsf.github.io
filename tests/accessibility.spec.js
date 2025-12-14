import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = [
  { path: '/', name: 'Home' },
  { path: '/v2/', name: 'V2 Home' },
  { path: '/v2/about/', name: 'V2 About' },
  { path: '/v2/experience/', name: 'V2 Experience' },
  { path: '/v2/projects/', name: 'V2 Projects' },
  { path: '/v2/writing/', name: 'V2 Writing' },
]

test.describe('Accessibility Tests', () => {
  for (const page of pages) {
    test(`${page.name} page should be accessible`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path)
      await browserPage.waitForLoadState('networkidle')
      
      // Run accessibility scan
      const accessibilityScanResults = await new AxeBuilder({ page: browserPage })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
        .analyze()
      
      // Check for violations
      expect(accessibilityScanResults.violations).toEqual([])
      
      // Log incomplete tests (warnings, not failures)
      if (accessibilityScanResults.incomplete.length > 0) {
        console.log(`Incomplete accessibility checks for ${page.name}:`, 
          accessibilityScanResults.incomplete.map(i => i.id))
      }
    })
    
    test(`${page.name} page should have proper heading structure`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path)
      await browserPage.waitForLoadState('networkidle')
      
      // Check for at least one h1
      const h1Count = await browserPage.locator('h1').count()
      expect(h1Count).toBeGreaterThan(0)
      
      // Check for proper heading hierarchy (no skipping levels)
      const headings = await browserPage.locator('h1, h2, h3, h4, h5, h6').all()
      let previousLevel = 0
      
      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName.toLowerCase())
        const level = parseInt(tagName.charAt(1))
        
        // Allow h1 to appear anywhere, but other headings should not skip levels
        if (previousLevel > 0 && level > previousLevel + 1) {
          throw new Error(`Heading hierarchy violation: ${tagName} appears after h${previousLevel}`)
        }
        
        previousLevel = level
      }
    })
    
    test(`${page.name} page should have proper ARIA labels`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path)
      await browserPage.waitForLoadState('networkidle')
      
      // Check navigation has aria-label
      const nav = browserPage.locator('nav')
      const navCount = await nav.count()
      
      if (navCount > 0) {
        for (let i = 0; i < navCount; i++) {
          const navElement = nav.nth(i)
          const ariaLabel = await navElement.getAttribute('aria-label')
          const hasLabel = ariaLabel || await navElement.getAttribute('aria-labelledby')
          
          // Navigation should have accessible name
          if (!hasLabel) {
            console.warn(`Navigation element at index ${i} on ${page.name} lacks aria-label or aria-labelledby`)
          }
        }
      }
    })
  }
})

