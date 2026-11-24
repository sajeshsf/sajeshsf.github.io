// TEMPLATE — copy this file to start a new post in the series.
// This file is NOT imported anywhere, so it never shows up on the site.
//
//   1. cp _template.js 01-time-value-of-money.js
//   2. Fill in id / seriesOrder / title / date / summary / content
//   3. Register it in ./index.js (import + add to the array)
//
// Math: write LaTeX inside the content string.
//   Inline:  $E[X] = \\mu$          or  \\(E[X] = \\mu\\)
//   Display: $$\\sigma^2 = E[(X-\\mu)^2]$$   or  \\[ ... \\]
// Because content is a JS template string, every backslash must be doubled
// (\\frac, \\sigma, \\cdot ...). A literal dollar sign is written \\$.
import { quantSeries } from './series.js'

export default {
  ...quantSeries,
  id: 'quant-finance-NN-short-slug',   // unique, used in the URL: /writing/#<id>
  seriesOrder: 99,                      // position in the series (0, 1, 2, ...)
  title: 'Concept Name',
  date: 'YYYY-MM-DD',
  url: '/writing/#quant-finance-NN-short-slug',
  summary: 'One-sentence summary shown on the writing grid.',
  stats: 'Notes',
  content: `<h2>What is it?</h2>

<p>Plain-English explanation of the concept.</p>

<h3>Why it matters</h3>

<ul>
  <li>Where this shows up in practice.</li>
</ul>

<h3>The math</h3>

<p>Inline math like $r_t = \\ln(P_t / P_{t-1})$ sits in a sentence.</p>

$$
\\mathbb{E}[X] = \\sum_i x_i \\, p_i
$$

<h3>In code</h3>

<pre><code>import numpy as np

prices = np.array([100, 101, 99.5, 102])
log_returns = np.diff(np.log(prices))
print(log_returns)
</code></pre>

<h3>Key takeaways</h3>

<ul>
  <li>Takeaway one.</li>
  <li>Takeaway two.</li>
</ul>

<h3>Questions I still have</h3>

<ul>
  <li>Open question to revisit later.</li>
</ul>`,
}
