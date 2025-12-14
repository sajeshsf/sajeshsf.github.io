import { test, expect } from '@playwright/test'

const viewports = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  mobileLarge: { width: 414, height: 896 }, // iPhone 11 Pro Max
  tablet: { width: 768, height: 1024 }, // iPad
  tabletLandscape: { width: 1024, height: 768 }, // iPad Landscape
  desktop: { width: 1920, height: 1080 }, // Desktop
}

const pages = [
  { path: '/', name: 'Home' },
  { path: '/v2/', name: 'V2 Home' },
  { path: '/v2/about/', name: 'V2 About' },
  { path: '/v2/experience/', name: 'V2 Experience' },
  { path: '/v2/projects/', name: 'V2 Projects' },
  { path: '/v2/writing/', name: 'V2 Writing' },
]

test.describe('Responsive Design Tests', () => {
  for (const [deviceName, viewport] of Object.entries(viewports)) {
    test.describe(`${deviceName} viewport (${viewport.width}x${viewport.height})`, () => {
      for (const page of pages) {
        test(`${page.name} page renders correctly`, async ({ page: browserPage }) => {
          await browserPage.setViewportSize(viewport)
          await browserPage.goto(page.path)
          await browserPage.waitForLoadState('networkidle')
          
          // Check page loads
          await expect(browserPage).toHaveURL(new RegExp(page.path.replace(/\//g, '\\/')), { timeout: 10000 })
          
          // Check main content is visible
          const mainContent = browserPage.locator('main, [role="main"], #main, .v2-main')
          await expect(mainContent.first()).toBeVisible({ timeout: 5000 })
          
          // Check no horizontal scrolling (content fits viewport)
          const bodyWidth = await browserPage.evaluate(() => document.body.scrollWidth)
          const viewportWidth = viewport.width
          expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20) // Allow small margin for scrollbars
          
          // Check text is readable (not too small)
          const textElements = browserPage.locator('p, h1, h2, h3, h4, h5, h6, a, span')
          const firstText = textElements.first()
          if (await firstText.count() > 0) {
            const fontSize = await firstText.evaluate(el => {
              const style = window.getComputedStyle(el)
              return parseFloat(style.fontSize)
            })
            // Minimum readable font size should be at least 12px on mobile
            if (viewport.width < 768) {
              expect(fontSize).toBeGreaterThanOrEqual(12)
            }
          }
        })
        
        test(`${page.name} page navigation is accessible`, async ({ page: browserPage }) => {
          await browserPage.setViewportSize(viewport)
          await browserPage.goto(page.path)
          await browserPage.waitForLoadState('networkidle')
          
          // Check navigation exists
          const nav = browserPage.locator('nav, .v2-nav')
          const navCount = await nav.count()
          
          if (navCount > 0) {
            // Check navigation links are visible or accessible (mobile menu)
            const navLinks = browserPage.locator('nav a, .v2-nav a')
            const linkCount = await navLinks.count()
            
            if (linkCount > 0) {
              // On mobile, check if there's a menu button or if links are visible
              const menuButton = browserPage.locator('button[aria-label*="menu" i], button[aria-label*="nav" i], .menu-button, .nav-toggle')
              const hasMenuButton = await menuButton.count() > 0
              
              if (viewport.width < 768) {
                // On mobile, either menu button should exist OR links should be visible
                const firstLink = navLinks.first()
                const isLinkVisible = await firstLink.isVisible().catch(() => false)
                expect(hasMenuButton || isLinkVisible).toBeTruthy()
              } else {
                // On tablet/desktop, links should be visible
                await expect(navLinks.first()).toBeVisible()
              }
            }
          }
        })
        
        test(`${page.name} page touch targets are adequate`, async ({ page: browserPage }) => {
          await browserPage.setViewportSize(viewport)
          await browserPage.goto(page.path)
          await browserPage.waitForLoadState('networkidle')
          
          // Check all interactive elements have adequate size (minimum 44x44px for touch)
          const interactiveElements = browserPage.locator('a, button, input, select, textarea, [role="button"]')
          const count = await interactiveElements.count()
          
          for (let i = 0; i < Math.min(count, 10); i++) { // Check first 10 elements
            const element = interactiveElements.nth(i)
            const box = await element.boundingBox()
            
            if (box && viewport.width < 768) {
              // On mobile, touch targets should be at least 44x44px (WCAG recommendation)
              expect(box.width).toBeGreaterThanOrEqual(44)
              expect(box.height).toBeGreaterThanOrEqual(44)
            }
          }
        })
      }
      
      test('V2 Home page sections stack correctly on mobile', async ({ page: browserPage }) => {
        await browserPage.setViewportSize(viewport)
        await browserPage.goto('/v2/')
        await browserPage.waitForLoadState('networkidle')
        
        // Check sections exist
        const sections = ['about', 'experience', 'projects', 'writing']
        for (const sectionId of sections) {
          const section = browserPage.locator(`#${sectionId}`)
          await expect(section).toBeVisible({ timeout: 5000 })
        }
        
        // On mobile, check that sections stack vertically (not side by side)
        if (viewport.width < 768) {
          const aboutSection = browserPage.locator('#about')
          const experienceSection = browserPage.locator('#experience')
          
          const aboutBox = await aboutSection.boundingBox()
          const experienceBox = await experienceSection.boundingBox()
          
          if (aboutBox && experienceBox) {
            // Experience should be below About (higher Y position)
            expect(experienceBox.y).toBeGreaterThan(aboutBox.y)
          }
        }
      })
      
      test('V2 Projects grid is responsive', async ({ page: browserPage }) => {
        await browserPage.setViewportSize(viewport)
        await browserPage.goto('/v2/projects/')
        await browserPage.waitForLoadState('networkidle')
        
        const projectGrid = browserPage.locator('.v2-projects-grid')
        const gridCount = await projectGrid.count()
        
        if (gridCount > 0) {
          // Check grid exists and is visible
          await expect(projectGrid.first()).toBeVisible()
          
          // Check project cards are visible
          const projectCards = browserPage.locator('.v2-project-card, .v2-card')
          const cardCount = await projectCards.count()
          
          if (cardCount > 0) {
            // On mobile, cards should stack (check first card fits viewport)
            const firstCard = projectCards.first()
            const cardBox = await firstCard.boundingBox()
            
            if (cardBox && viewport.width < 768) {
              // Card should fit within viewport width
              expect(cardBox.width).toBeLessThanOrEqual(viewport.width - 40) // Allow padding
            }
          }
        }
      })
      
      test('V2 Timeline is responsive', async ({ page: browserPage }) => {
        await browserPage.setViewportSize(viewport)
        await browserPage.goto('/v2/experience/')
        await browserPage.waitForLoadState('networkidle')
        
        const timeline = browserPage.locator('.v2-timeline')
        const timelineCount = await timeline.count()
        
        if (timelineCount > 0) {
          await expect(timeline.first()).toBeVisible()
          
          // Check timeline items are visible
          const timelineItems = browserPage.locator('.v2-timeline__item')
          const itemCount = await timelineItems.count()
          
          if (itemCount > 0) {
            const firstItem = timelineItems.first()
            const itemBox = await firstItem.boundingBox()
            
            if (itemBox) {
              // Timeline items should fit viewport
              expect(itemBox.width).toBeLessThanOrEqual(viewport.width - 40)
            }
          }
        }
      })
    })
  }
  
  test('Mobile menu toggles correctly (if applicable)', async ({ page: browserPage }) => {
    await browserPage.setViewportSize(viewports.mobile)
    await browserPage.goto('/v2/')
    await browserPage.waitForLoadState('networkidle')
    
    // Check for mobile menu button
    const menuButton = browserPage.locator('button[aria-label*="menu" i], button[aria-label*="nav" i], .menu-button, .nav-toggle, [aria-expanded]')
    const buttonCount = await menuButton.count()
    
    if (buttonCount > 0) {
      const button = menuButton.first()
      const isVisible = await button.isVisible()
      
      if (isVisible) {
        // Click menu button
        await button.click()
        
        // Check navigation is now visible/expanded
        const nav = browserPage.locator('nav, .v2-nav')
        await expect(nav.first()).toBeVisible({ timeout: 2000 })
      }
    }
  })
})

