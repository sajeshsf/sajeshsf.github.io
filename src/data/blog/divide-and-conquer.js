// Divide and Conquer
export default {
  id: 'divide-and-conquer',
  title: 'Divide and Conquer: Split, Solve, Combine',
  category: 'algorithms',
  series: 'algorithm-fundamentals',
  seriesTitle: 'Algorithm Fundamentals',
  seriesOrder: 5,
  date: '2026-11-23',
  url: '/writing/divide-and-conquer',
  summary: 'Break a problem into independent subproblems, solve them recursively and combine the answers. Includes the Master Theorem and classic examples.',
  stats: '9 min read',
  content: `<h2>Divide and Conquer</h2>

<p>Divide and conquer solves a problem by breaking it into smaller, <strong>independent</strong> subproblems of the same type, solving each recursively, and combining their results. Many of the fastest known algorithms follow this pattern.</p>

<h3>1. The Three Steps</h3>
<ol>
  <li><strong>Divide:</strong> split the problem into smaller subproblems (often two halves).</li>
  <li><strong>Conquer:</strong> solve each subproblem recursively; tiny subproblems are solved directly (the base case).</li>
  <li><strong>Combine:</strong> merge the sub-solutions into a solution for the original problem.</li>
</ol>

<pre><code>def divide_and_conquer(problem):
    if is_small(problem):
        return solve_directly(problem)
    parts = split(problem)
    solutions = [divide_and_conquer(p) for p in parts]
    return combine(solutions)</code></pre>

<h3>2. Analyzing Running Time</h3>

<h4>Recurrence relations</h4>
<p>The running time is naturally described by a recurrence. If a problem of size n splits into <code>a</code> subproblems of size <code>n/b</code>, with <code>f(n)</code> work to divide and combine:</p>
<pre><code>T(n) = a · T(n / b) + f(n)</code></pre>

<h4>The Master Theorem</h4>
<p>Compare <code>f(n)</code> with <code>n^(log_b a)</code>, the total work done at the leaves:</p>
<ul>
  <li><strong>Leaves dominate:</strong> if f(n) grows slower, T(n) = Θ(n^(log_b a)).</li>
  <li><strong>Balanced:</strong> if f(n) = Θ(n^(log_b a)), T(n) = Θ(n^(log_b a) · log n).</li>
  <li><strong>Root dominates:</strong> if f(n) grows faster (and is regular), T(n) = Θ(f(n)).</li>
</ul>

<table>
  <thead>
    <tr><th>Algorithm</th><th>Recurrence</th><th>Result</th></tr>
  </thead>
  <tbody>
    <tr><td>Binary search</td><td>T(n) = T(n/2) + O(1)</td><td>O(log n)</td></tr>
    <tr><td>Merge sort</td><td>T(n) = 2T(n/2) + O(n)</td><td>O(n log n)</td></tr>
    <tr><td>Karatsuba multiplication</td><td>T(n) = 3T(n/2) + O(n)</td><td>O(n^1.585)</td></tr>
    <tr><td>Strassen matrix multiplication</td><td>T(n) = 7T(n/2) + O(n²)</td><td>O(n^2.807)</td></tr>
  </tbody>
</table>

<h3>3. Classic Examples</h3>

<h4>3.1 Merge sort and quicksort</h4>
<p>Merge sort does trivial division and real work in the <em>combine</em> step (merging). Quicksort does the real work in the <em>divide</em> step (partitioning) and needs no combine step at all. See the Sorting and Searching post for code.</p>

<h4>3.2 Binary search</h4>
<p>The simplest case: divide into halves, but only one half needs to be conquered.</p>

<h4>3.3 Fast exponentiation</h4>
<p>Compute <code>xⁿ</code> in O(log n) multiplications instead of O(n) by squaring:</p>
<pre><code>def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    return half * half if n % 2 == 0 else half * half * x</code></pre>

<h4>3.4 Maximum subarray (crossing sum)</h4>
<p>The best subarray lies entirely in the left half, entirely in the right half, or crosses the middle. Solve the two halves recursively and compute the crossing case in O(n), for O(n log n) total. (Kadane's algorithm does it in O(n), but this is a great illustration of the pattern.)</p>

<h4>3.5 Closest pair of points</h4>
<p>Sort points by x, split at the median, solve each side, then check only points within a narrow strip around the dividing line. This gives O(n log n) instead of the brute force O(n²).</p>

<h4>3.6 Counting inversions</h4>
<p>Count pairs (i, j) with i &lt; j and a[i] &gt; a[j] by piggybacking on merge sort: whenever an element from the right half is merged before elements of the left half, all those remaining left elements form inversions with it.</p>

<h4>3.7 Beyond algorithms textbooks</h4>
<ul>
  <li><strong>Fast Fourier Transform (FFT):</strong> O(n log n) signal processing and polynomial multiplication.</li>
  <li><strong>MapReduce and parallel computing:</strong> split data across machines, process independently, combine results.</li>
  <li><strong>Git bisect:</strong> binary search over commit history to find the change that introduced a bug.</li>
</ul>

<h3>4. Practical Considerations</h3>
<ul>
  <li><strong>Recursion overhead:</strong> for small inputs, switch to a simple algorithm (e.g. insertion sort below ~16 elements).</li>
  <li><strong>Stack depth:</strong> unbalanced splits can cause deep recursion and stack overflow.</li>
  <li><strong>Parallelism:</strong> independent subproblems are a natural fit for multiple cores.</li>
  <li><strong>Cache efficiency:</strong> working on small chunks keeps data in fast memory.</li>
</ul>

<h3>5. Divide and Conquer vs. Dynamic Programming</h3>
<p>Both break problems into subproblems. The difference is whether those subproblems <strong>overlap</strong>. In merge sort, the left and right halves never share work, so plain recursion is efficient. In Fibonacci, <code>fib(n-1)</code> and <code>fib(n-2)</code> both recompute <code>fib(n-3)</code> and below; storing those results is what dynamic programming is about.</p>

<h3>Key Takeaways</h3>
<ul>
  <li>Divide, conquer, combine — and always define the base case.</li>
  <li>Write the recurrence and apply the Master Theorem to get the complexity.</li>
  <li>The cleverness is usually in the combine step.</li>
  <li>If subproblems overlap, switch to dynamic programming.</li>
</ul>`,
}
