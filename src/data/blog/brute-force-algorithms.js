// Brute Force Algorithms
export default {
  id: 'brute-force-algorithms',
  title: 'Brute Force: Trying Every Possibility',
  category: 'algorithms',
  series: 'algorithm-fundamentals',
  seriesTitle: 'Algorithm Fundamentals',
  seriesOrder: 3,
  date: '2026-11-23',
  url: '/writing/brute-force-algorithms',
  summary: 'The simplest problem-solving strategy: enumerate every candidate and check it. When it works, when it does not, and how to make it smarter.',
  stats: '7 min read',
  content: `<h2>Brute Force</h2>

<p>A brute force algorithm solves a problem by systematically trying <strong>every possible candidate</strong> and checking whether it satisfies the requirements. It makes no clever assumptions, which makes it simple, obviously correct — and often slow.</p>

<h3>1. Why Brute Force Matters</h3>
<ul>
  <li><strong>Correctness baseline:</strong> it is the easiest solution to get right, so it is the perfect reference to test optimized solutions against.</li>
  <li><strong>Good enough for small inputs:</strong> if <code>n</code> is 20, trying all 2²⁰ ≈ 1 million subsets is instant.</li>
  <li><strong>Starting point for optimization:</strong> most efficient algorithms come from noticing which work the brute force solution repeats or wastes.</li>
</ul>

<h3>2. Common Patterns</h3>

<h4>2.1 Nested loops over pairs or triples</h4>
<p>Find two numbers in a list that sum to a target by checking every pair:</p>
<pre><code>def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return i, j
    return None
# Time: O(n²), Space: O(1)</code></pre>

<h4>2.2 Generating all subsets — O(2ⁿ)</h4>
<p>Each element is either in or out, giving 2ⁿ subsets. Bitmasks are a compact way to enumerate them:</p>
<pre><code>def all_subsets(items):
    n = len(items)
    for mask in range(1 &lt;&lt; n):
        yield [items[i] for i in range(n) if mask &amp; (1 &lt;&lt; i)]</code></pre>

<h4>2.3 Generating all permutations — O(n!)</h4>
<p>Useful for ordering problems like the travelling salesman problem (TSP). Feasible only for roughly n ≤ 10.</p>
<pre><code>from itertools import permutations

def shortest_tour(cities, dist):
    best = float('inf')
    for order in permutations(cities[1:]):
        route = [cities[0], *order, cities[0]]
        cost = sum(dist[a][b] for a, b in zip(route, route[1:]))
        best = min(best, cost)
    return best</code></pre>

<h4>2.4 String matching</h4>
<p>The naive pattern search slides the pattern across the text and compares at every position: O(n × m). Smarter algorithms (KMP, Rabin-Karp, Boyer-Moore) avoid re-checking characters, but the naive version is often fast enough for short patterns.</p>

<h3>3. Making Brute Force Smarter</h3>

<h4>3.1 Backtracking</h4>
<p>Build a solution step by step and <strong>abandon a partial candidate as soon as it cannot lead to a valid solution</strong>. The worst case is still exponential, but huge parts of the search space are skipped. Classic examples: N-Queens, Sudoku, generating valid combinations.</p>
<pre><code>def solve_n_queens(n):
    cols, diag1, diag2, count = set(), set(), set(), 0

    def place(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for c in range(n):
            if c in cols or row - c in diag1 or row + c in diag2:
                continue          # prune: this square is attacked
            cols.add(c); diag1.add(row - c); diag2.add(row + c)
            place(row + 1)
            cols.remove(c); diag1.remove(row - c); diag2.remove(row + c)

    place(0)
    return count</code></pre>

<h4>3.2 Branch and bound</h4>
<p>For optimization problems, keep the best solution found so far and skip any branch whose <em>best possible</em> outcome cannot beat it.</p>

<h4>3.3 Meet in the middle</h4>
<p>Split the input into two halves, brute force each half (2<sup>n/2</sup> each), then combine the results with sorting or hashing. This turns O(2ⁿ) into roughly O(2<sup>n/2</sup>) — the difference between impossible and instant for n = 40.</p>

<h4>3.4 Reducing the search space</h4>
<p>Often only some candidates need checking. To test whether <code>n</code> is prime you only need to try divisors up to √n, turning O(n) into O(√n).</p>

<h3>4. From Brute Force to Better Algorithms</h3>
<table>
  <thead>
    <tr><th>Observation about the brute force</th><th>Leads to</th></tr>
  </thead>
  <tbody>
    <tr><td>Repeatedly searching for a value</td><td>Hash map or sorting + binary search</td></tr>
    <tr><td>Solving the same subproblem many times</td><td>Dynamic programming</td></tr>
    <tr><td>A locally best choice is always safe</td><td>Greedy algorithm</td></tr>
    <tr><td>The problem splits into independent halves</td><td>Divide and conquer</td></tr>
  </tbody>
</table>

<h3>Key Takeaways</h3>
<ul>
  <li>Always write down the brute force idea first — it clarifies the problem.</li>
  <li>Check input limits: n ≤ 10 tolerates O(n!), n ≤ 20 tolerates O(2ⁿ), n ≤ 500 tolerates O(n³).</li>
  <li>Prune aggressively with backtracking and bounds.</li>
  <li>Keep the brute force around to verify faster solutions on random tests.</li>
</ul>`,
}
