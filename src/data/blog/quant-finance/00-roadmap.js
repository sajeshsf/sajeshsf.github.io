// Quant Finance from Scratch — Part 0: Why and the Roadmap
import { quantSeries } from './series.js'

export default {
  ...quantSeries,
  id: 'quant-finance-00-roadmap',
  seriesOrder: 0,
  title: 'Quant Finance from Scratch: Why and the Roadmap',
  date: '2026-11-23',
  url: '/writing/#quant-finance-00-roadmap',
  summary: 'Kicking off a learning-in-public series on quantitative finance — the motivation, the ground rules, and the rough map of topics ahead.',
  stats: 'Series intro',
  content: `<h2>Why this series</h2>

<p>I am learning quantitative finance from first principles, and I am writing it down as I go. Each post in this series covers <strong>one concept</strong>: what it is, why it matters, the math behind it, and a small piece of code that makes it concrete.</p>

<p>Writing forces clarity. If I cannot explain a concept simply, I have not understood it yet.</p>

<h3>Ground rules</h3>

<ul>
  <li><strong>One concept per post.</strong> Small, focused, and linkable.</li>
  <li><strong>Intuition first, then math.</strong> Every formula should answer a question I actually had.</li>
  <li><strong>Code it.</strong> If it can be simulated or computed, there will be a short Python snippet.</li>
  <li><strong>Notes, not advice.</strong> This is a learning journal, not investment advice.</li>
</ul>

<h3>A taste of what is coming</h3>

<p>Here is the kind of thing this series builds toward — the compound growth of money over time:</p>

$$
FV = PV \\cdot \\left(1 + \\frac{r}{n}\\right)^{n t}
\\quad\\xrightarrow{\\;n \\to \\infty\\;}\\quad
FV = PV \\cdot e^{r t}
$$

<p>By the end, formulas like the Black–Scholes price of a call option, $C = S_0 N(d_1) - K e^{-rT} N(d_2)$, should feel obvious rather than magical.</p>

<h2>The roadmap</h2>

<p>This is the rough path I plan to follow. It will change as I learn — topics get added to the series one post at a time.</p>

<h3>1. Foundations</h3>
<ul>
  <li>Time value of money, compounding, and discounting</li>
  <li>Returns: simple vs. log returns</li>
  <li>Probability refresher: random variables, expectation, variance</li>
  <li>Distributions that show up everywhere: normal, log-normal, fat tails</li>
</ul>

<h3>2. Markets and instruments</h3>
<ul>
  <li>How markets work: order books, bid/ask, liquidity</li>
  <li>Equities, bonds, and yield curves</li>
  <li>Derivatives: forwards, futures, options</li>
</ul>

<h3>3. Portfolio theory and risk</h3>
<ul>
  <li>Risk and return, diversification, correlation</li>
  <li>Mean–variance optimisation and the efficient frontier</li>
  <li>CAPM, beta, and factor models</li>
  <li>Risk measures: volatility, Value at Risk, Expected Shortfall</li>
</ul>

<h3>4. Stochastic calculus and pricing</h3>
<ul>
  <li>Random walks and Brownian motion</li>
  <li>Itô's lemma and geometric Brownian motion</li>
  <li>No-arbitrage and risk-neutral pricing</li>
  <li>Binomial trees and Black–Scholes</li>
  <li>The Greeks and hedging</li>
  <li>Monte Carlo pricing</li>
</ul>

<h3>5. Time series and statistical modelling</h3>
<ul>
  <li>Stationarity, autocorrelation, ARMA</li>
  <li>Volatility models: GARCH</li>
  <li>Cointegration and pairs trading</li>
</ul>

<h3>6. Systematic trading</h3>
<ul>
  <li>Building a backtester (and the ways backtests lie)</li>
  <li>Momentum, mean reversion, and other classic signals</li>
  <li>Transaction costs, slippage, and position sizing</li>
  <li>Machine learning in finance — where it helps and where it does not</li>
</ul>

<h3>Resources I am leaning on</h3>
<ul>
  <li><em>Options, Futures, and Other Derivatives</em> — John C. Hull</li>
  <li><em>Paul Wilmott Introduces Quantitative Finance</em> — Paul Wilmott</li>
  <li><em>Stochastic Calculus for Finance I &amp; II</em> — Steven Shreve</li>
  <li><em>Advances in Financial Machine Learning</em> — Marcos López de Prado</li>
</ul>

<p>Next up: the time value of money.</p>`,
}
