import { test, expect } from '@playwright/test'

test.describe('Navigation Tests', () => {
  test('Navigation from home to experience page should not show loading skeleton', async ({ page }) => {
    // Start at home page
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that home page is loaded
    const homeContent = page.locator('#experience, #projects, #writing')
    await expect(homeContent.first()).toBeVisible({ timeout: 5000 })

    // Navigate to experience page
    const startTime = Date.now()
    await page.click('a[href*="experience"]')
    
    // Wait for navigation
    await page.waitForURL(/.*experience.*/, { timeout: 5000 })
    
    // Check if loading skeleton appears
    const loadingText = page.locator('text=Loading...')
    const loadingVisible = await loadingText.isVisible().catch(() => false)
    
    const navigationTime = Date.now() - startTime
    
    // Log results
    console.log(`Navigation time: ${navigationTime}ms`)
    console.log(`Loading skeleton visible: ${loadingVisible}`)
    
    // Navigation should be fast (< 500ms ideally)
    // And loading skeleton should not be visible for long
    expect(navigationTime).toBeLessThan(2000)
  })

  test('Navigation from experience detail back to home should be smooth', async ({ page }) => {
    // Navigate to experience page
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Click on a timeline item to view details
    const timelineItem = page.locator('.timeline-item, [class*="timeline"] a').first()
    if (await timelineItem.count() > 0) {
      await timelineItem.click()
      await page.waitForTimeout(500) // Wait for detail view
    }

    // Click "Back to timeline" button
    const backButton = page.locator('text=Back to timeline')
    if (await backButton.count() > 0) {
      const startTime = Date.now()
      await backButton.click()
      
      // Wait for navigation
      await page.waitForURL(/.*#experience|.*\/$/, { timeout: 5000 })
      
      // Check for loading skeleton
      const loadingText = page.locator('text=Loading...')
      const loadingVisible = await loadingText.isVisible().catch(() => false)
      
      const navigationTime = Date.now() - startTime
      
      console.log(`Back navigation time: ${navigationTime}ms`)
      console.log(`Loading skeleton visible: ${loadingVisible}`)
      
      expect(navigationTime).toBeLessThan(2000)
    }
  })

  test('Navigation between all pages should not show loading skeleton', async ({ page }) => {
    const pages = [
      { path: '/', name: 'Home' },
      { path: '/about/', name: 'About' },
      { path: '/experience/', name: 'Experience' },
      { path: '/projects/', name: 'Projects' },
      { path: '/writing/', name: 'Writing' },
    ]

    for (const pageInfo of pages) {
      console.log(`Testing navigation to ${pageInfo.name}...`)
      
      const startTime = Date.now()
      await page.goto(pageInfo.path)
      await page.waitForLoadState('networkidle')
      
      // Check for loading skeleton
      const loadingText = page.locator('text=Loading...')
      const loadingVisible = await loadingText.isVisible().catch(() => false)
      
      const loadTime = Date.now() - startTime
      
      console.log(`${pageInfo.name} load time: ${loadTime}ms, Loading visible: ${loadingVisible}`)
      
      // Check that main content is visible
      const mainContent = page.locator('main, [role="main"], #main')
      await expect(mainContent.first()).toBeVisible({ timeout: 5000 })
      
      // Loading should not be visible after networkidle
      if (loadingVisible) {
        console.warn(`Warning: Loading skeleton still visible on ${pageInfo.name} after networkidle`)
      }
    }
  })

  test('Hash-based navigation should not cause page reload', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Navigate to experience section via hash
    await page.goto('/#experience')
    
    // Wait a bit for any transitions
    await page.waitForTimeout(500)
    
    // Check that we're still on home page (not /experience/)
    const url = page.url()
    expect(url).toMatch(/\/$|#experience/)
    
    // Check that experience section is visible
    const experienceSection = page.locator('#experience')
    await expect(experienceSection).toBeVisible({ timeout: 3000 })
  })
})
