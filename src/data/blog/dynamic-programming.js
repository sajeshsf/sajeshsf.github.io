// Dynamic Programming
export default {
  id: 'dynamic-programming',
  title: 'Dynamic Programming: Remember, Don’t Recompute',
  category: 'algorithms',
  series: 'algorithm-fundamentals',
  seriesTitle: 'Algorithm Fundamentals',
  seriesOrder: 6,
  date: '2026-11-23',
  url: '/writing/dynamic-programming',
  summary: 'Solve problems with overlapping subproblems by storing answers. Memoization vs. tabulation, a step-by-step recipe, and the classic problem patterns.',
  stats: '12 min read',
  content: `<h2>Dynamic Programming</h2>

<p>Dynamic programming (DP) solves a problem by breaking it into subproblems, solving each subproblem <strong>once</strong>, and storing the answer so it never has to be recomputed. It turns many exponential brute force solutions into polynomial ones.</p>

<h3>1. When to Use DP</h3>

<h4>Overlapping subproblems</h4>
<p>The same smaller problems come up again and again. A naive recursive Fibonacci recomputes <code>fib(2)</code> an exponential number of times.</p>

<h4>Optimal substructure</h4>
<p>The optimal answer to the problem can be built from optimal answers to its subproblems. The shortest path from A to C through B contains the shortest path from A to B.</p>

<h4>Signals in a problem statement</h4>
<ul>
  <li>"Count the number of ways…"</li>
  <li>"Find the minimum / maximum cost…"</li>
  <li>"Is it possible to…" over choices that interact.</li>
  <li>Greedy almost works, but a counterexample breaks it.</li>
</ul>

<h3>2. Two Ways to Implement DP</h3>

<h4>2.1 Top-down: memoization</h4>
<p>Write the natural recursive solution and cache the result of each call.</p>
<pre><code>from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n &lt; 2:
        return n
    return fib(n - 1) + fib(n - 2)
# O(2ⁿ) without the cache, O(n) with it</code></pre>

<h4>2.2 Bottom-up: tabulation</h4>
<p>Fill a table iteratively from the smallest subproblems up to the full problem.</p>
<pre><code>def fib(n):
    if n &lt; 2:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
# O(n) time, O(1) space</code></pre>

<h4>2.3 Which to choose?</h4>
<table>
  <thead>
    <tr><th></th><th>Memoization (top-down)</th><th>Tabulation (bottom-up)</th></tr>
  </thead>
  <tbody>
    <tr><td>Ease of writing</td><td>Follows the recursion directly</td><td>Needs a computed fill order</td></tr>
    <tr><td>Subproblems solved</td><td>Only the ones actually needed</td><td>All of them</td></tr>
    <tr><td>Overhead</td><td>Function calls, recursion depth limits</td><td>Tight loops, no stack risk</td></tr>
    <tr><td>Space optimization</td><td>Harder</td><td>Easy to keep only the last row(s)</td></tr>
  </tbody>
</table>

<h3>3. A Recipe for DP Problems</h3>
<ol>
  <li><strong>Define the state:</strong> what does <code>dp[i]</code> (or <code>dp[i][j]</code>) mean, in words?</li>
  <li><strong>Write the recurrence:</strong> how is a state computed from smaller states?</li>
  <li><strong>Set base cases:</strong> the smallest states with known answers.</li>
  <li><strong>Choose the order:</strong> make sure every state's dependencies are computed first.</li>
  <li><strong>Locate the answer:</strong> <code>dp[n]</code>, <code>dp[n][m]</code>, or the max over a row?</li>
  <li><strong>Optimize space</strong> if each row only depends on the previous one.</li>
</ol>

<h3>4. Classic Patterns</h3>

<h4>4.1 One-dimensional: climbing stairs and house robber</h4>
<p>Each state depends on a few previous states. In the "house robber" problem, you cannot rob two adjacent houses:</p>
<pre><code>def rob(houses):
    take, skip = 0, 0
    for value in houses:
        take, skip = skip + value, max(take, skip)
    return max(take, skip)</code></pre>

<h4>4.2 Coin change (unbounded choices)</h4>
<p>The minimum number of coins to make an amount — the problem greedy fails on.</p>
<pre><code>def coin_change(coins, amount):
    dp = [0] + [float('inf')] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c &lt;= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
# coin_change([1, 3, 4], 6) == 2   (3 + 3)</code></pre>

<h4>4.3 0/1 knapsack</h4>
<p>Each item can be taken at most once. <code>dp[w]</code> is the best value with capacity <code>w</code>; iterate capacity backwards so each item is used once.</p>
<pre><code>def knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for wt, val in zip(weights, values):
        for w in range(capacity, wt - 1, -1):
            dp[w] = max(dp[w], dp[w - wt] + val)
    return dp[capacity]
# O(n × W) time, O(W) space</code></pre>

<h4>4.4 Two sequences: longest common subsequence</h4>
<p><code>dp[i][j]</code> is the LCS length of the first <code>i</code> characters of one string and the first <code>j</code> of the other. The same shape solves <strong>edit distance</strong>, which powers spell checkers and <code>diff</code>.</p>
<pre><code>def lcs(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[len(a)][len(b)]</code></pre>

<h4>4.5 Grid paths</h4>
<p>Count paths or find the minimum-cost path in a grid where you can move right or down: <code>dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])</code>.</p>

<h4>4.6 Longest increasing subsequence</h4>
<p><code>dp[i]</code> is the length of the longest increasing subsequence ending at index <code>i</code>. The straightforward DP is O(n²); combining it with binary search gives O(n log n).</p>

<h4>4.7 Intervals</h4>
<p>Problems like matrix-chain multiplication or "burst balloons" define <code>dp[i][j]</code> over a range and try every split point inside it, typically O(n³).</p>

<h4>4.8 Other families</h4>
<ul>
  <li><strong>DP on trees:</strong> compute each node's answer from its children (e.g. maximum independent set in a tree).</li>
  <li><strong>Bitmask DP:</strong> the state includes a set of visited items; solves TSP in O(n² · 2ⁿ) instead of O(n!).</li>
  <li><strong>Graph DP:</strong> Bellman-Ford and Floyd-Warshall shortest paths are dynamic programs.</li>
</ul>

<h3>5. Common Mistakes</h3>
<ul>
  <li>A vague state definition — if you cannot say what <code>dp[i]</code> means in one sentence, the recurrence will be wrong.</li>
  <li>Missing or wrong base cases, and off-by-one indexing between strings and the table.</li>
  <li>Iterating in the wrong direction (e.g. forwards in 0/1 knapsack reuses items).</li>
  <li>A state that is missing information, so subproblems are not truly independent of how you reached them.</li>
</ul>

<h3>6. How DP Relates to the Other Strategies</h3>
<ul>
  <li><strong>Brute force</strong> explores every choice; DP explores every choice but shares the work.</li>
  <li><strong>Divide and conquer</strong> splits into independent subproblems; DP handles overlapping ones.</li>
  <li><strong>Greedy</strong> commits to one choice; DP keeps all options open until the end.</li>
</ul>

<h3>Key Takeaways</h3>
<ul>
  <li>Look for overlapping subproblems and optimal substructure.</li>
  <li>Start from the brute force recursion, then add memoization.</li>
  <li>Define the state precisely; the recurrence follows from it.</li>
  <li>Convert to bottom-up and compress space when performance matters.</li>
</ul>`,
}
