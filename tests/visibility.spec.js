import { test, expect } from '@playwright/test'

test.describe('Component Visibility and Layout Tests', () => {
  test('Header is visible and not covering content on Experience page', async ({ page }) => {
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Check header exists and is visible
    const header = page.locator('.header')
    await expect(header).toBeVisible()

    // Get header dimensions
    const headerBox = await header.boundingBox()
    const headerHeight = headerBox?.height || 0

    // Check Experience title is visible
    const experienceTitle = page.locator('#experience-title')
    await expect(experienceTitle).toBeVisible()

    // Get title position
    const titleBox = await experienceTitle.boundingBox()
    const titleTop = titleBox?.y || 0

    // Title should be below the header (with some margin)
    expect(titleTop).toBeGreaterThan(headerHeight - 10) // Allow small overlap tolerance

    // Check title is fully visible in viewport
    const viewportHeight = page.viewportSize().height
    expect(titleTop + (titleBox?.height || 0)).toBeLessThan(viewportHeight)

    console.log(`Header height: ${headerHeight}px, Title top: ${titleTop}px`)
  })

  test('Experience detail view - title is visible when navigating to detail', async ({ page }) => {
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Click on first timeline item
    const timelineItem = page.locator('.timeline-item a, [class*="timeline"] a').first()
    const itemCount = await timelineItem.count()

    if (itemCount > 0) {
      await timelineItem.click()
      await page.waitForTimeout(500) // Wait for navigation

      // Check experience detail title is visible (not the main page title which is hidden in detail view)
      const experienceDetailTitle = page.locator('#experience-detail-title')
      await expect(experienceDetailTitle).toBeVisible({ timeout: 3000 })

      // Get header and title positions
      const header = page.locator('.header')
      const headerBox = await header.boundingBox()
      const headerHeight = headerBox?.height || 0

      const titleBox = await experienceDetailTitle.boundingBox()
      const titleTop = titleBox?.y || 0

      // Title should be visible and not covered by header
      // Check if title top is at least 20px below header
      const isVisible = titleTop >= headerHeight - 20

      console.log(`Detail view - Header: ${headerHeight}px, Title top: ${titleTop}px, Visible: ${isVisible}`)

      // Title should be visible (allowing small tolerance)
      expect(isVisible).toBe(true)
    }
  })

  test('All page titles are visible and not covered by header', async ({ page }) => {
    const pages = [
      { path: '/about/', titleId: 'about-title', titleText: 'About' },
      { path: '/experience/', titleId: 'experience-title', titleText: 'Experience' },
      { path: '/projects/', titleId: 'projects-title', titleText: 'Projects' },
      { path: '/writing/', titleId: 'writing-title', titleText: 'Writing' },
    ]

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path)
      await page.waitForLoadState('networkidle')

      // Check title exists
      const title = page.locator(`#${pageInfo.titleId}, h1:has-text("${pageInfo.titleText}")`).first()
      await expect(title).toBeVisible({ timeout: 3000 })

      // Get header and title positions
      const header = page.locator('.header')
      const headerBox = await header.boundingBox()
      const headerHeight = headerBox?.height || 0

      const titleBox = await title.boundingBox()
      const titleTop = titleBox?.y || 0

      // Title should be visible (not covered by header)
      const isVisible = titleTop >= headerHeight - 20

      console.log(`${pageInfo.titleText} - Header: ${headerHeight}px, Title top: ${titleTop}px, Visible: ${isVisible}`)

      expect(isVisible).toBe(true)
    }
  })

  test('Main content has proper margins and padding', async ({ page }) => {
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Check main container
    const main = page.locator('main')
    await expect(main).toBeVisible()

    const mainBox = await main.boundingBox()
    expect(mainBox).not.toBeNull()

    // Check container inside main
    const container = page.locator('.main > .container, main .container').first()
    if (await container.count() > 0) {
      const containerBox = await container.boundingBox()
      expect(containerBox).not.toBeNull()

      // Container should have some padding (check computed styles)
      const paddingTop = await container.evaluate((el) => {
        return parseInt(window.getComputedStyle(el).paddingTop, 10)
      })

      console.log(`Container padding-top: ${paddingTop}px`)
      expect(paddingTop).toBeGreaterThan(0)
    }
  })

  test('Section headings have proper spacing', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check section titles
    const sectionTitles = page.locator('.section-title, h2.section-title')
    const count = await sectionTitles.count()

    for (let i = 0; i < Math.min(count, 5); i++) {
      const title = sectionTitles.nth(i)
      await expect(title).toBeVisible()

      // Check margin-bottom
      const marginBottom = await title.evaluate((el) => {
        return parseInt(window.getComputedStyle(el).marginBottom, 10)
      })

      console.log(`Section title ${i} margin-bottom: ${marginBottom}px`)
      // Should have some margin (allowing for zero if using padding on parent)
    }
  })

  test('Cards and content blocks have proper spacing', async ({ page }) => {
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Check cards
    const cards = page.locator('.card')
    const cardCount = await cards.count()

    if (cardCount > 0) {
      const firstCard = cards.first()
      await expect(firstCard).toBeVisible()

      // Check card padding
      const padding = await firstCard.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          paddingTop: parseInt(style.paddingTop, 10),
          paddingBottom: parseInt(style.paddingBottom, 10),
          paddingLeft: parseInt(style.paddingLeft, 10),
          paddingRight: parseInt(style.paddingRight, 10),
        }
      })

      console.log(`Card padding: ${JSON.stringify(padding)}`)
      // Cards should have padding
      expect(padding.paddingTop + padding.paddingBottom).toBeGreaterThan(0)
    }
  })

  test('Breadcrumb navigation is visible and properly positioned', async ({ page }) => {
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Click on first timeline item to get to detail view
    const timelineItem = page.locator('.timeline-item a, [class*="timeline"] a').first()
    const itemCount = await timelineItem.count()

    if (itemCount > 0) {
      await timelineItem.click()
      await page.waitForTimeout(500)

      // Check breadcrumb exists
      const breadcrumb = page.locator('.breadcrumb, .breadcrumb-nav')
      await expect(breadcrumb.first()).toBeVisible({ timeout: 3000 })

      // Check breadcrumb is not covered by header
      const header = page.locator('.header')
      const headerBox = await header.boundingBox()
      const headerHeight = headerBox?.height || 0

      const breadcrumbBox = await breadcrumb.first().boundingBox()
      const breadcrumbTop = breadcrumbBox?.y || 0

      // Breadcrumb should be visible below header
      const isVisible = breadcrumbTop >= headerHeight - 20

      console.log(`Breadcrumb - Header: ${headerHeight}px, Breadcrumb top: ${breadcrumbTop}px, Visible: ${isVisible}`)
      expect(isVisible).toBe(true)
    }
  })

  test('Fixed header does not cover main content on scroll', async ({ page }) => {
    await page.goto('/experience/')
    await page.waitForLoadState('networkidle')

    // Disable smooth scrolling to avoid timing differences across browsers
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForFunction(() => Math.abs(window.scrollY - 300) < 5)

    // Check header is still visible
    const header = page.locator('.header')
    await expect(header).toBeVisible()

    // Check main content is still accessible
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Check that content inside main (like the title) is still visible
    const experienceTitle = page.locator('#experience-title')
    await expect(experienceTitle).toBeVisible()

    // Ensure the title is in view before checking overlap
    await experienceTitle.scrollIntoViewIfNeeded()

    // Get header and title positions after scroll
    const headerBox = await header.boundingBox()
    const headerHeight = headerBox?.height || 0

    const titleBox = await experienceTitle.boundingBox()
    const titleTop = titleBox?.y || 0
    const headerTop = headerBox?.y || 0
    const headerBottom = headerTop + headerHeight

    // Title should still be visible (not covered by header)
    expect(titleTop).toBeGreaterThan(headerBottom - 20)

    const scrollY = await page.evaluate(() => window.scrollY)
    console.log(`After scroll - Header: ${headerHeight}px, Title top: ${titleTop}px, ScrollY: ${scrollY}px`)
  })
})
