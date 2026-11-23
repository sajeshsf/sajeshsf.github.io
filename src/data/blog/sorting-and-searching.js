// Sorting and Searching Algorithms
export default {
  id: 'sorting-and-searching',
  title: 'Sorting and Searching Algorithms',
  category: 'algorithms',
  series: 'algorithm-fundamentals',
  seriesTitle: 'Algorithm Fundamentals',
  seriesOrder: 2,
  date: '2026-11-23',
  url: '/writing/sorting-and-searching',
  summary: 'The classic sorting algorithms, how they compare, and the searching techniques that make sorted data so valuable.',
  stats: '12 min read',
  content: `<h2>Sorting and Searching</h2>

<p>Sorting and searching are the most frequently used building blocks in software. Many harder problems become easy once the data is sorted, and many "clever" solutions are really a well-chosen search.</p>

<h3>Part 1: Sorting</h3>

<h4>Key properties of a sorting algorithm</h4>
<ul>
  <li><strong>Time complexity:</strong> best, average and worst case.</li>
  <li><strong>Space complexity:</strong> does it sort <em>in place</em> or need extra memory?</li>
  <li><strong>Stability:</strong> does it keep equal elements in their original order? This matters when sorting records by one field after another.</li>
  <li><strong>Adaptivity:</strong> is it faster on nearly-sorted input?</li>
</ul>

<h4>1.1 Simple sorts — O(n²)</h4>

<p><strong>Bubble sort</strong> repeatedly swaps adjacent elements that are out of order. Easy to understand, rarely used in practice.</p>

<p><strong>Selection sort</strong> repeatedly finds the minimum of the unsorted part and moves it to the front. It makes the fewest swaps (n − 1), which helps only when writes are very expensive.</p>

<p><strong>Insertion sort</strong> builds the sorted list one item at a time, sliding each new item left into place. It is O(n) on nearly-sorted data and very fast for small arrays, which is why real-world libraries use it for small sub-arrays.</p>

<pre><code>def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j &gt;= 0 and a[j] &gt; key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a</code></pre>

<h4>1.2 Efficient sorts — O(n log n)</h4>

<p><strong>Merge sort</strong> splits the array in half, sorts each half recursively and merges the results. Always O(n log n), stable, but needs O(n) extra memory. Great for linked lists and external (on-disk) sorting.</p>

<pre><code>def merge_sort(a):
    if len(a) &lt;= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    result, i, j = [], 0, 0
    while i &lt; len(left) and j &lt; len(right):
        if left[i] &lt;= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]</code></pre>

<p><strong>Quicksort</strong> picks a pivot, partitions the array into "smaller than pivot" and "larger than pivot", then recurses on each side. In place and usually the fastest in practice, but O(n²) in the worst case (e.g. already-sorted input with a naive pivot). Random or median-of-three pivots make the worst case very unlikely.</p>

<p><strong>Heap sort</strong> builds a max-heap and repeatedly extracts the maximum. Guaranteed O(n log n) and in place, but not stable and less cache-friendly than quicksort.</p>

<h4>1.3 Non-comparison sorts — O(n + k)</h4>
<p>Any sort that only compares elements needs at least O(n log n) comparisons. Sorts that exploit the structure of the keys can beat that:</p>
<ul>
  <li><strong>Counting sort:</strong> counts occurrences of each value; ideal for small integer ranges.</li>
  <li><strong>Radix sort:</strong> sorts digit by digit using a stable sort; good for fixed-length integers or strings.</li>
  <li><strong>Bucket sort:</strong> distributes values into buckets, sorts each; good for uniformly distributed data.</li>
</ul>

<h4>1.4 Comparison at a glance</h4>
<table>
  <thead>
    <tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr>
  </thead>
  <tbody>
    <tr><td>Bubble</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr>
    <tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>No</td></tr>
    <tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr>
    <tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>Yes</td></tr>
    <tr><td>Quick</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>No</td></tr>
    <tr><td>Heap</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>No</td></tr>
    <tr><td>Counting</td><td>O(n + k)</td><td>O(n + k)</td><td>O(n + k)</td><td>O(k)</td><td>Yes</td></tr>
  </tbody>
</table>

<h4>1.5 What libraries actually use</h4>
<p>Python's <code>sorted()</code> and Java's object sort use <strong>Timsort</strong>, a hybrid of merge sort and insertion sort that is very fast on real-world, partially-ordered data. C++'s <code>std::sort</code> uses <strong>Introsort</strong>: quicksort that switches to heap sort if recursion gets too deep, and insertion sort for small ranges. In practice, use the library sort — and know its guarantees.</p>

<h3>Part 2: Searching</h3>

<h4>2.1 Linear search — O(n)</h4>
<p>Check each element in turn. Works on any data, sorted or not, and is the right choice for small or one-off searches.</p>

<h4>2.2 Binary search — O(log n)</h4>
<p>On sorted data, compare with the middle element and discard half of the remaining range each step. A million elements need only about 20 comparisons.</p>

<pre><code>def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo &lt;= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            return mid
        if a[mid] &lt; target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1</code></pre>

<p><strong>Common bugs:</strong> off-by-one errors in the loop condition (<code>&lt;</code> vs <code>&lt;=</code>), infinite loops when <code>lo = mid</code>, and integer overflow from <code>(lo + hi) / 2</code> in fixed-width languages (use <code>lo + (hi - lo) / 2</code>).</p>

<h4>2.3 Binary search variations</h4>
<ul>
  <li><strong>Lower / upper bound:</strong> find the first position where an element is ≥ (or &gt;) the target — useful for counting occurrences or insertion points.</li>
  <li><strong>Search on the answer:</strong> if a yes/no condition is monotonic ("can we ship all packages in D days?"), binary search over possible answers instead of over an array.</li>
  <li><strong>Rotated sorted arrays:</strong> one half is always sorted; decide which half to keep based on it.</li>
</ul>

<h4>2.4 Hash-based search — O(1) average</h4>
<p>Hash maps and sets trade memory for constant-time average lookups. They do not keep order, so they cannot answer range queries like "all values between 10 and 20".</p>

<h4>2.5 Tree-based search — O(log n)</h4>
<p>Balanced binary search trees (red-black, AVL) and B-trees keep data ordered while supporting O(log n) insert, delete and lookup — and they support range queries. Database indexes are typically B-trees.</p>

<h4>2.6 Graph search</h4>
<p><strong>Breadth-first search (BFS)</strong> explores level by level and finds shortest paths in unweighted graphs. <strong>Depth-first search (DFS)</strong> goes deep first and is the basis for cycle detection, topological sort and connected components. Both run in O(V + E).</p>

<h3>Choosing the Right Tool</h3>
<ul>
  <li>Searching once in unsorted data? Linear search.</li>
  <li>Searching many times? Sort once (O(n log n)), then binary search each time (O(log n)) — or build a hash set.</li>
  <li>Need ordering or range queries? Sorted array or balanced tree.</li>
  <li>Need only membership or key lookups? Hash map.</li>
</ul>`,
}
