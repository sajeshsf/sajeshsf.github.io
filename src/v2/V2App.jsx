import V2Layout from './components/V2Layout.jsx'
import V2HomePage from './pages/V2HomePage.jsx'
import V2AboutPage from './pages/V2AboutPage.jsx'
import V2ExperiencePage from './pages/V2ExperiencePage.jsx'
import V2ProjectsPage from './pages/V2ProjectsPage.jsx'
import V2WritingPage from './pages/V2WritingPage.jsx'

function getPageId() {
  if (typeof document === 'undefined') return 'home'
  return document.body?.dataset?.page || 'home'
}

const pagesById = {
  home: V2HomePage,
  about: V2AboutPage,
  experience: V2ExperiencePage,
  projects: V2ProjectsPage,
  writing: V2WritingPage,
}

export default function V2App() {
  const pageId = getPageId()
  const Page = pagesById[pageId] ?? V2HomePage

  return (
    <V2Layout currentPage={pageId}>
      <Page />
    </V2Layout>
  )
}
