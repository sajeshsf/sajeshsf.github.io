// The Strangler Fig Pattern: Replacing Legacy Systems Without a Big-Bang Rewrite
export default {
  id: 'strangler-fig-pattern',
  title: 'The Strangler Fig Pattern: Modernizing Legacy Systems Incrementally',
  category: 'how-tos',
  date: '2026-11-22',
  url: '/writing/strangler-fig-pattern',
  summary:
    'How to replace a legacy system piece by piece behind a routing facade, instead of betting everything on a big-bang rewrite.',
  stats: '8 min read',
  content: `<h2>The Strangler Fig Pattern</h2>

<p>The strangler fig is a vine that starts life in the canopy of a host tree. It sends roots down to the ground, wraps the trunk, and over many years grows its own structure around it. Eventually the host dies and decays, and what remains is a self-supporting fig standing exactly where the old tree used to be.</p>

<p>Martin Fowler borrowed this image in 2004 to describe a way of modernizing software: rather than rewriting a legacy system in one go, you <strong>grow a new system around the edges of the old one</strong>, move functionality across a slice at a time, and retire the old system once nothing depends on it.</p>

<h3>Why not just rewrite it?</h3>

<p>Big-bang rewrites are attractive on a whiteboard and painful in practice:</p>
<ul>
  <li><strong>No value until the end.</strong> Months or years of work ship nothing to users until the cutover.</li>
  <li><strong>A moving target.</strong> The old system keeps changing while you rebuild it, so the rewrite is always behind.</li>
  <li><strong>Hidden behaviour.</strong> Legacy code encodes years of edge cases and undocumented business rules that only surface after the switch.</li>
  <li><strong>All-or-nothing risk.</strong> The cutover is a single, high-stakes event that is hard to roll back.</li>
</ul>

<p>The strangler fig trades that single large risk for many small, reversible ones.</p>

<h3>How it works</h3>

<p>The core idea is a <strong>facade</strong> (often a reverse proxy, API gateway, or routing layer) that sits in front of the legacy system. All traffic goes through it. At first it forwards everything to the old system; over time it routes more and more requests to new services.</p>

<ol>
  <li><strong>Intercept.</strong> Put the facade in front of the legacy system without changing behaviour. This step alone gives you a seam to work with.</li>
  <li><strong>Pick a slice.</strong> Choose one capability with clear boundaries, such as a single endpoint, screen, or business workflow.</li>
  <li><strong>Build the replacement.</strong> Implement that slice in the new system, with its own tests and, ideally, its own data.</li>
  <li><strong>Redirect.</strong> Change the facade so requests for that slice go to the new service. Keep the old path available for rollback.</li>
  <li><strong>Retire.</strong> Once the new path is proven in production, delete the corresponding legacy code.</li>
  <li><strong>Repeat</strong> until the legacy system has nothing left to do, then switch it off.</li>
</ol>

<p>A routing rule in the facade can be as simple as this:</p>

<pre><code># nginx: route migrated paths to the new service, everything else to legacy
location /api/orders/ {
    proxy_pass http://orders-service;
}

location / {
    proxy_pass http://legacy-monolith;
}</code></pre>

<h3>Choosing what to migrate first</h3>

<ul>
  <li><strong>Start small and low-risk</strong> to prove the facade, deployment pipeline, and monitoring before tackling anything critical.</li>
  <li><strong>Favour high-change areas.</strong> Code the team touches every sprint gives the fastest return on being modernized.</li>
  <li><strong>Follow natural seams.</strong> Bounded contexts, separate URL paths, or distinct user journeys are easier to carve out than tangled shared logic.</li>
  <li><strong>Leave the stable core for later.</strong> Parts that rarely change and work well may never need to move at all.</li>
</ul>

<h3>Dealing with data</h3>

<p>Routing requests is usually the easy part; shared data is where migrations get hard. Common approaches:</p>
<ul>
  <li><strong>Shared database, temporarily.</strong> The new service reads and writes the legacy schema at first. Fast to start, but it couples the two systems, so treat it as a stepping stone.</li>
  <li><strong>Data synchronization.</strong> Use change data capture or events to keep a new data store in sync with the old one while both are live.</li>
  <li><strong>Anti-corruption layer.</strong> Translate between the legacy model and the new domain model so old concepts do not leak into the new code.</li>
  <li><strong>Clear ownership.</strong> For each piece of data, be explicit about which system is the source of truth at every stage of the migration.</li>
</ul>

<h3>Techniques that make it safer</h3>

<ul>
  <li><strong>Feature flags</strong> to switch a slice between old and new paths instantly, per user or per percentage of traffic.</li>
  <li><strong>Shadow traffic (parallel run).</strong> Send real requests to both systems, serve the legacy response, and compare the results before switching over.</li>
  <li><strong>Canary releases</strong> that move a small share of traffic first and widen gradually as metrics stay healthy.</li>
  <li><strong>Characterization tests</strong> that capture what the legacy system actually does today, so you can verify the replacement matches it.</li>
  <li><strong>Observability on both sides</strong>, with shared dashboards for latency, error rates, and business metrics.</li>
</ul>

<h3>Pitfalls to watch for</h3>

<ul>
  <li><strong>The migration that never ends.</strong> Without deadlines and a clear definition of done, you end up maintaining two systems indefinitely. Track the share of traffic and code still on the legacy side.</li>
  <li><strong>Forgetting to delete.</strong> Redirecting traffic is only half the job. Legacy code that is no longer used still costs time and attention until it is removed.</li>
  <li><strong>The facade becomes a bottleneck.</strong> Keep it thin. Routing logic belongs there; business logic does not.</li>
  <li><strong>Slices that are too big.</strong> If a slice takes months, it is a mini big-bang rewrite. Split it further.</li>
  <li><strong>Distributed monolith.</strong> Carving out services that still call each other synchronously for everything just moves the coupling onto the network.</li>
</ul>

<h3>When it is a good fit</h3>

<ul>
  <li>The legacy system is too large or too critical to replace in one release.</li>
  <li>Requests can be intercepted and routed (HTTP APIs, message queues, UI routes).</li>
  <li>The business needs to keep shipping features during the modernization.</li>
</ul>

<h3>When it is not</h3>

<ul>
  <li>The system is small enough that a careful rewrite is quicker and cheaper.</li>
  <li>There is no practical way to intercept calls, for example in a tightly coupled desktop application or embedded firmware with no seam to route through.</li>
  <li>The goal is to change the underlying platform wholesale, where incremental coexistence is not technically possible.</li>
</ul>

<h3>The takeaway</h3>

<p>The strangler fig pattern turns modernization from a single bet into a series of small, measurable steps. Each step delivers value, can be rolled back, and teaches you something about the old system before you depend on the new one. Like the fig itself, the replacement grows slowly, but by the time the old structure is gone, the new one is already standing on its own.</p>

<h3>Further reading</h3>
<ul>
  <li><a href="https://martinfowler.com/bliki/StranglerFigApplication.html" target="_blank" rel="noopener noreferrer">Martin Fowler: Strangler Fig Application</a></li>
  <li><a href="https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig" target="_blank" rel="noopener noreferrer">Microsoft Azure Architecture Center: Strangler Fig pattern</a></li>
</ul>`,
}
