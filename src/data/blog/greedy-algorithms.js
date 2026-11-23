// Greedy Algorithms
export default {
  id: 'greedy-algorithms',
  title: 'Greedy Algorithms: Best Choice Now',
  category: 'algorithms',
  series: 'algorithm-fundamentals',
  seriesTitle: 'Algorithm Fundamentals',
  seriesOrder: 4,
  date: '2026-11-23',
  url: '/writing/greedy-algorithms',
  summary: 'Algorithms that make the locally best choice at every step, the conditions under which that leads to the global optimum, and the classic examples.',
  stats: '9 min read',
  content: `<h2>Greedy Algorithms</h2>

<p>A greedy algorithm builds a solution step by step, always taking the option that looks <strong>best right now</strong>, and never revisiting earlier decisions. When it works, it is usually simple and fast. The hard part is knowing when it works.</p>

<h3>1. When Does Greedy Work?</h3>

<h4>Greedy choice property</h4>
<p>A globally optimal solution can be reached by making a locally optimal choice at each step. In other words, the best-looking choice now is always part of <em>some</em> optimal solution.</p>

<h4>Optimal substructure</h4>
<p>After making the greedy choice, what remains is a smaller instance of the same problem, and an optimal solution to the whole contains an optimal solution to that smaller problem.</p>

<h4>Proving it: the exchange argument</h4>
<p>The standard proof technique: take any optimal solution that differs from the greedy one, and show you can <strong>swap</strong> one of its choices for the greedy choice without making it worse. Repeating the swap transforms the optimal solution into the greedy one, so greedy must be optimal too.</p>

<h3>2. Classic Greedy Problems</h3>

<h4>2.1 Activity selection / interval scheduling</h4>
<p>Given meetings with start and end times, attend as many non-overlapping meetings as possible. The greedy rule: <strong>always pick the meeting that ends earliest</strong>, since it leaves the most room for the rest.</p>
<pre><code>def max_meetings(intervals):
    intervals.sort(key=lambda m: m[1])   # sort by end time
    count, last_end = 0, float('-inf')
    for start, end in intervals:
        if start &gt;= last_end:
            count += 1
            last_end = end
    return count
# Time: O(n log n) for the sort</code></pre>
<p>Note that "shortest meeting first" or "earliest start first" both fail on some inputs — choosing the right greedy rule matters.</p>

<h4>2.2 Fractional knapsack</h4>
<p>You can take fractions of items. Sort by value-per-weight and take the best ratio first until the bag is full. Greedy is optimal here — but not for the <strong>0/1 knapsack</strong>, where items cannot be split (that one needs dynamic programming).</p>

<h4>2.3 Huffman coding</h4>
<p>To build an optimal prefix-free compression code, repeatedly merge the two least frequent symbols into a new node. Frequent symbols end up with short codes, rare ones with long codes. This is used in ZIP, JPEG and MP3.</p>

<h4>2.4 Minimum spanning trees</h4>
<ul>
  <li><strong>Kruskal's algorithm:</strong> sort edges by weight; add the cheapest edge that does not create a cycle (checked with a union-find structure).</li>
  <li><strong>Prim's algorithm:</strong> grow a tree from a starting node, always adding the cheapest edge that reaches a new node.</li>
</ul>

<h4>2.5 Dijkstra's shortest path</h4>
<p>Repeatedly finalize the unvisited node with the smallest known distance and relax its neighbors. Greedy and correct — as long as there are <strong>no negative edge weights</strong>.</p>
<pre><code>import heapq

def dijkstra(graph, source):
    dist = {source: 0}
    heap = [(0, source)]
    while heap:
        d, node = heapq.heappop(heap)
        if d &gt; dist.get(node, float('inf')):
            continue
        for neighbor, weight in graph[node]:
            nd = d + weight
            if nd &lt; dist.get(neighbor, float('inf')):
                dist[neighbor] = nd
                heapq.heappush(heap, (nd, neighbor))
    return dist</code></pre>

<h3>3. When Greedy Fails</h3>

<h4>Coin change with unusual denominations</h4>
<p>With coins {1, 5, 10, 25}, always taking the largest coin gives the fewest coins. With coins {1, 3, 4} and a target of 6, greedy picks 4 + 1 + 1 (three coins) while the optimum is 3 + 3 (two coins). For arbitrary denominations, use dynamic programming.</p>

<h4>Other failures</h4>
<ul>
  <li><strong>0/1 knapsack:</strong> the best ratio item may waste capacity.</li>
  <li><strong>Longest path in a graph:</strong> locally long edges can lead to dead ends.</li>
  <li><strong>Travelling salesman:</strong> "nearest neighbor" is a decent heuristic but not optimal.</li>
</ul>

<h3>4. Greedy as a Heuristic</h3>
<p>Even when greedy is not optimal, it is often a <strong>good, fast approximation</strong>. For NP-hard problems like set cover, a greedy algorithm comes with provable approximation guarantees, and in practice it is a common first solution in scheduling, load balancing and caching.</p>

<h3>5. Greedy vs. Dynamic Programming</h3>
<table>
  <thead>
    <tr><th></th><th>Greedy</th><th>Dynamic Programming</th></tr>
  </thead>
  <tbody>
    <tr><td>Decisions</td><td>One choice per step, never revisited</td><td>Considers all choices per subproblem</td></tr>
    <tr><td>Speed</td><td>Usually O(n log n) or better</td><td>Often O(n²) or O(n × W)</td></tr>
    <tr><td>Correctness</td><td>Only with the greedy choice property</td><td>Whenever subproblems overlap and combine</td></tr>
    <tr><td>Example</td><td>Fractional knapsack</td><td>0/1 knapsack</td></tr>
  </tbody>
</table>

<h3>Key Takeaways</h3>
<ul>
  <li>Greedy algorithms are simple and fast, but must be proven correct.</li>
  <li>Sorting is usually the first step; the choice of sort key is the whole algorithm.</li>
  <li>Try to break your greedy rule with small counterexamples before trusting it.</li>
  <li>If greedy fails, dynamic programming is often the next tool to reach for.</li>
</ul>`,
}
