# UI QA Report

Audit of the integrated site (all feature branches merged) at 375 px, 768 px and 1280 px on `/`, `/writing/`, a post detail page, `/experience/` and `/projects/`. Every finding marked **Fixed** was confirmed in Chromium with `getComputedStyle` before the fix and re-checked after it. The layout (grids, columns, section order, component structure) is unchanged.

Status: **Fixed** = fixed in this branch · **Open** = listed only, not changed.

## 1. Cascade, font size and font family

| ID | Status | Where | Observed | Expected / fix |
|----|--------|-------|----------|----------------|
| F1 | Fixed | Hero title (`.hero-title`) | `.main h1` (specificity 0,1,1) overrode the class (0,1,0). The title rendered in **Roboto 700 at 32–48 px** | Oswald 600, uppercase, `clamp(3rem, 8vw, 6.5rem)` (now 48–102 px). Fix: the base `h1`/`h2` rules now use `:where(.main)`, so heading classes win. |
| F2 | Fixed | Section titles (About / Experience / Projects / Writing) | `.main h2` overrode them: **20–24 px, weight 600** | `clamp(2.5rem, 5vw, 4rem)` at 700 (now 40–64 px), in Oswald to match the brand and hero display font. |
| F3 | Fixed | Hero subtitle | `.main p` overrode it: colour `--text-secondary`, margin-bottom 0 | `--text-primary` with a 2 rem bottom margin. The selector is now `.hero .hero-subtitle`. |
| F4 | Fixed | Timeline role titles, project card titles, detail `h1`/`h2` (`.timeline-heading`, `.project-title`, `.detail-header`, `.detail-subheader`) | All were overridden by `.main h1/h2` and drew at the generic heading sizes | They now use their own sizes (1.1 rem, 1.1 rem, 2 rem, 1.5 rem). This is the same root fix as F1. |
| F5 | Fixed | Roboto weight 600 (h2, `.card h3`, `.subtitle-card`, writing `h2/h3/strong`) | Only weights 300/400/500/700 were loaded, so 600 rendered as 700 and the 600-vs-700 hierarchy collapsed | `@fontsource/roboto/600.css` is now imported. |
| F6 | Fixed | Post detail header (`/writing/#…`) | `<header class="detail-header">` gave the whole header 2 rem bold. The classes `m-0`, `mt-md`, `mt-lg`, `font-size-0-95` and `font-size-1-05` don't exist, so the category and date lines drew at **30 px bold** | The category and date are now 15–17 px regular. The header no longer uses the class, and the undefined utilities were replaced with existing ones. |
| F7 | Fixed | Fonts were loaded twice | `@fontsource` was imported in both `src/index.css` and `src/main.jsx` | Fonts are now imported only in `main.jsx`. |
| F8 | Open | `.main p` (0,1,1) beats `.text-muted` and the `margin-*` utilities on `<p>` | Every `p.text-muted` shows `--text-secondary` instead of `--text-muted`, and `margin-top-sm` / `margin-bottom-sm` on paragraphs have no effect | Changing this would dim a lot of body copy, so it is a design decision. Either drop `.text-muted`'s colour or use `:where(.main) p`. |
| F9 | Open | Font-size sprawl | 0.85 / 0.9 / 0.95 / 1 / 1.05 / 1.1 rem are all in use, and `.text-muted` adds a compounding `0.95em` | Collapse these to a 4-step type scale. |

## 2. Colour mismatches

| ID | Status | Where | Observed | Fix |
|----|--------|-------|----------|-----|
| C1 | Fixed | Writing cards, "green" (Internet Finds) accent bar | Hard-coded `#4fd4ff`, which is the same cyan as "blue" | New token `--accent-green: #34d399`. |
| C2 | Fixed | `travel-food-experiences` category | The merge changed the mapping to `travel` only, so this category fell back to blue | Both travel categories now map to purple. |
| C3 | Fixed | `ExpandableText` fade | The gradient started from `rgba(26,26,26,0)` (grey from the old theme), which left a muddy band | It now starts from `transparent`. |
| C4 | Fixed | Duplicate `.fade-overlay` | A second rule faded to `--bg-primary` and overrode the card-coloured fade | The duplicate is removed. |
| C5 | Fixed | `<meta name="theme-color">` (5 HTML entry points) | `#03050f`, while the page background is `#000000` | Now `#000000`. |
| C6 | Fixed | `.section-title::after` underline | Solid `--border-bright`, while the other accents (scroll progress) use the cyan→purple gradient | Shared `--accent-gradient` token. |

## 3. Margins and spacing (listed only)

| ID | Where | Observation | Suggested fix |
|----|-------|-------------|---------------|
| M1 | `.container` | `width: min(1200px, 100% − 2rem)` plus `padding-inline: 1rem` gives a double gutter. `.main > .container` then resets inline padding to 0, so sub-page content edges don't line up with the header and footer. | Pick one gutter mechanism. |
| M2 | Fixed header offset | The header height is hard-coded as `+100px` / `scroll-margin-top: 100px`, but the measured header is 95 px. Mobile `.main` adds a further `--spacing-xl`. | Add a `--header-height` token. |
| M3 | Timeline vs. projects | The inline `margin: 0` on the timeline `<ul>` removes `.timeline`'s top margin, while the projects grid keeps `--spacing-lg`, so the gap under the section titles is uneven. | Remove the inline margin. |
| M4 | Post breadcrumb | The icon gap is doubled (0.5 rem gap + 0.5 rem span margin). The Home/About/… links are padded but "Back to Writing" is not, so their baselines don't line up. "Back to Writing" links to `/#writing`, not `/writing/`. | Use a single gap and consistent padding. |
| M5 | `ExpandableText` "Read more" | 0.5 rem gap + 0.25 rem extra margin on the arrow. | Use the gap only. |
| M6 | Utility scale | `margin-top-lg` is 1 rem while `--spacing-lg` is 1.5 rem. `margin-bottom-xl` equals `margin-bottom-2xl`. `margin-bottom-0` is used but not defined. | Align the utilities with the tokens. |

## 4. Overlap, z-index and motion (listed only)

| ID | Where | Observation |
|----|-------|-------------|
| O1 | `.hero-scroll-indicator` | It is `position: fixed`. After scrolling it is hidden only by the hero's opacity, so an invisible 44 px link stays clickable over content at the bottom centre. |
| O2 | `.hero-scroll-indicator` | The `fadeInUp` animation (fill-mode `both`) replaces `translateX(-50%)`. The measured left edge is at x = 640 of 1280, so the indicator sits half its width (29 px) right of centre. |
| O3 | Hamburger → X | `translate(6px, ±6px)` on an 18 px box laid out with `space-around` makes the X asymmetric. |
| O4 | `.rotating-tagline` | `min-width: 200px; text-align: left` inside the centred hero, so the line shifts each time the tagline changes. |
| O5 | `.hero` | `height: 100vh` on mobile hides content under the browser chrome. `100svh` would fix this. |

## 5. Inconsistencies

| ID | Status | Where | Observed | Fix |
|----|--------|-------|----------|-----|
| I1 | Fixed | "Show all / Show less" buttons | There were three implementations: timeline (inline styles on `.expand-button`), projects (`.expand-button-base`, with no hover state) and `ExpandableText` | Timeline and projects now share `.expand-button-base`, which gained hover and focus styles. `ExpandableText` is currently unused. |
| I2 | Fixed | Hover lift and shadow | `.card` −2 px, `.project-card` −4 px, `.card-div` −4 px with a lighter shadow, timeline +4 px on the x axis | Shared `--hover-lift` (2 px) and `--shadow-hover` tokens. Each card keeps its direction. |
| I3 | Fixed | Corner radius | Timeline cards used `--radius-md`; every other card uses `--radius-lg` | Timeline cards now use `--radius-lg`. |
| I4 | Fixed | Header social icons | 36 px on desktop, 44 px everywhere else | 44 px everywhere. |
| I5 | Fixed | Duplicate or conflicting rules | `.project-link` (colour), `.expand-button:hover` (colour), `.projects-fade-overlay`, legacy `.expand-*-button:hover`, `.writing-grid-container`, `.writing-meta`, `.transition-transform`, `.list-style-disc`, and the form-control font block | The duplicates are removed. |
| I6 | Fixed | Series label on the home writing cards | Styled inline | Now uses a `.post-series` class. |
| I7 | Open | Writing cards | The same post is drawn as `.card` on the home page and as `.card-div` with a 4 px category bar on `/writing/` | Pick one card style. That is a design decision. |
