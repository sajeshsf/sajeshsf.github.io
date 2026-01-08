import { lazy, Suspense } from 'react'
import Layout from './components/Layout.jsx'
import { PAGE_IDS } from './config/constants.js'

// Code splitting: Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const WritingPage = lazy(() => import('./pages/WritingPage.jsx'))

function getPageId() {
  if (typeof document === 'undefined') return PAGE_IDS.HOME
  return document.body?.dataset?.page || PAGE_IDS.HOME
}

const pagesById = {
  [PAGE_IDS.HOME]: HomePage,
  [PAGE_IDS.ABOUT]: AboutPage,
  [PAGE_IDS.EXPERIENCE]: ExperiencePage,
  [PAGE_IDS.PROJECTS]: ProjectsPage,
  [PAGE_IDS.WRITING]: WritingPage,
}

// Loading fallback component
function PageLoader() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
      <p className="text-muted">Loading...</p>
    </div>
  )
}

export default function App() {
  const pageId = getPageId()
  const Page = pagesById[pageId] ?? HomePage

  return (
    <Layout currentPage={pageId}>
      <Suspense fallback={<PageLoader />}>
        <Page />
      </Suspense>
    </Layout>
  )
}
