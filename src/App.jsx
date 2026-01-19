import Layout from './components/Layout.jsx'
import { PAGE_IDS } from './config/constants.js'

// Import pages directly (no lazy loading) for instant navigation without loading skeleton
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import WritingPage from './pages/WritingPage.jsx'

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

export default function App() {
  const pageId = getPageId()
  const Page = pagesById[pageId] ?? HomePage

  return (
    <Layout currentPage={pageId}>
      <Page />
    </Layout>
  )
}
