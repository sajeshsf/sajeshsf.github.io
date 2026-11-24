// Big O Notation: Measuring Algorithm Efficiency
export default {
  id: 'big-o-notation',
  title: 'Big O Notation: Measuring Algorithm Efficiency',
  category: 'algorithms',
  series: 'algorithm-fundamentals',
  seriesTitle: 'Algorithm Fundamentals',
  seriesOrder: 1,
  date: '2026-11-23',
  url: '/writing/big-o-notation',
  summary: 'The shared vocabulary for how algorithms scale: common complexity classes, how to analyze code, and the traps to avoid.',
  stats: '8 min read',
  content: `<h2>Big O Notation</h2>

<p>Big O notation describes how the running time (or memory use) of an algorithm grows as the input grows. It ignores machine speed, language, and constant factors, and focuses on the <strong>shape of growth</strong>. It is the vocabulary every other post in this series uses to compare approaches.</p>

<h3>1. The Core Idea</h3>

<h4>What Big O measures</h4>
<p>If an algorithm takes <code>3n² + 5n + 20</code> steps for an input of size <code>n</code>, then for large <code>n</code> the <code>n²</code> term dominates everything else. We drop constants and lower-order terms and say the algorithm is <strong>O(n²)</strong>.</p>

<h4>Big O, Big Omega, Big Theta</h4>
<ul>
  <li><strong>O (Big O)</strong> — an upper bound: grows <em>no faster</em> than this.</li>
  <li><strong>Ω (Big Omega)</strong> — a lower bound: grows <em>at least</em> this fast.</li>
  <li><strong>Θ (Big Theta)</strong> — a tight bound: both upper and lower.</li>
</ul>
<p>In everyday engineering conversation, "Big O" is usually used to mean the tight bound for the worst case.</p>

<h4>Best, average and worst case</h4>
<p>The same algorithm can behave differently depending on the input. Linear search finds an item at index 0 in one step (best case) but scans everything when the item is missing (worst case). Unless stated otherwise, assume Big O refers to the <strong>worst case</strong>.</p>

<h3>2. Common Complexity Classes</h3>

<table>
  <thead>
    <tr><th>Notation</th><th>Name</th><th>Example</th><th>n = 1,000,000</th></tr>
  </thead>
  <tbody>
    <tr><td>O(1)</td><td>Constant</td><td>Array index, hash map lookup</td><td>1</td></tr>
    <tr><td>O(log n)</td><td>Logarithmic</td><td>Binary search</td><td>~20</td></tr>
    <tr><td>O(n)</td><td>Linear</td><td>Scan a list</td><td>1,000,000</td></tr>
    <tr><td>O(n log n)</td><td>Linearithmic</td><td>Merge sort, heap sort</td><td>~20,000,000</td></tr>
    <tr><td>O(n²)</td><td>Quadratic</td><td>Nested loops, bubble sort</td><td>10¹²</td></tr>
    <tr><td>O(2ⁿ)</td><td>Exponential</td><td>All subsets</td><td>Infeasible</td></tr>
    <tr><td>O(n!)</td><td>Factorial</td><td>All permutations</td><td>Infeasible</td></tr>
  </tbody>
</table>

<p>A useful rule of thumb: a modern machine does roughly 10<sup>8</sup> simple operations per second. So an O(n²) algorithm is fine for <code>n = 1,000</code> but hopeless for <code>n = 1,000,000</code>.</p>

<h3>3. Analyzing Code</h3>

<h4>Sequential steps add</h4>
<pre><code>for x in items:      # O(n)
    print(x)
for y in items:      # O(n)
    print(y)
# Total: O(n + n) = O(n)</code></pre>

<h4>Nested steps multiply</h4>
<pre><code>for x in items:          # n times
    for y in items:      # n times each
        print(x, y)
# Total: O(n * n) = O(n²)</code></pre>

<h4>Halving gives a logarithm</h4>
<pre><code>while n &gt; 1:
    n = n // 2
# Runs log₂(n) times: O(log n)</code></pre>

<h4>Different inputs, different variables</h4>
<p>If a function loops over list <code>a</code> and then list <code>b</code>, it is <strong>O(a + b)</strong>, not O(n). If it loops over <code>b</code> inside a loop over <code>a</code>, it is <strong>O(a × b)</strong>.</p>

<h4>Recursion</h4>
<p>For recursive code, count the number of calls and the work per call. A function that calls itself twice per level, n levels deep, makes about 2ⁿ calls. Divide-and-conquer recursions are usually solved with the <strong>Master Theorem</strong> (see the Divide and Conquer post).</p>

<h3>4. Space Complexity</h3>
<p>Big O applies to memory too. Creating a copy of the input is O(n) extra space; using a few counters is O(1). Recursion uses stack space proportional to the recursion depth, so a recursive binary search is O(log n) space while the iterative one is O(1).</p>

<h3>5. Amortized Analysis</h3>
<p>Some operations are usually cheap and occasionally expensive. Appending to a dynamic array is O(1) most of the time, but O(n) when the array must grow and copy itself. Because the capacity doubles each time, the expensive copies are rare enough that the <strong>average cost per append is O(1) amortized</strong>.</p>

<h3>6. Common Pitfalls</h3>
<ul>
  <li><strong>Hidden loops:</strong> <code>x in list</code>, <code>list.index()</code>, string concatenation in a loop and slicing are all O(n) operations.</li>
  <li><strong>Constants still matter in practice:</strong> an O(n) algorithm with a huge constant can lose to an O(n log n) one for realistic input sizes.</li>
  <li><strong>Average vs. worst case:</strong> hash maps are O(1) on average but O(n) in the worst case; quicksort is O(n log n) on average but O(n²) in the worst case.</li>
  <li><strong>Big O is about growth, not speed:</strong> it tells you how an algorithm scales, not how many milliseconds it takes.</li>
</ul>

<h3>Key Takeaways</h3>
<ul>
  <li>Drop constants and lower-order terms; keep the dominant term.</li>
  <li>Sequential work adds, nested work multiplies, halving gives log n.</li>
  <li>Always consider both time and space.</li>
  <li>Use input size limits to work backwards to the complexity you need.</li>
</ul>`,
}
