# Quant Finance from Scratch

A learning-in-public blog series. One concept per post, added as I learn it.

Live: `/writing/#quant-finance-00-roadmap`

## Add a new post (3 steps)

1. **Copy the template**

   ```bash
   cd src/data/blog/quant-finance
   cp _template.js 01-time-value-of-money.js
   ```

2. **Fill it in** — `id`, `seriesOrder`, `title`, `date`, `url`, `summary`, `content`.
   - `id` must be unique; the post lives at `/writing/#<id>`.
   - `seriesOrder` sets the position in the series (`0` is the roadmap).

3. **Register it** in [`index.js`](./index.js):

   ```js
   import timeValueOfMoney from './01-time-value-of-money.js'

   export const quantFinancePosts = [
     roadmap,
     timeValueOfMoney,
   ]
   ```

That's it. The post automatically gets the **📈 Quant Finance** category, a
"Part N of M" label, a series table of contents, and previous/next links.

Preview locally with `npm run dev` and open `http://localhost:5173/writing/#<id>`.

## Writing math

Posts in this series render LaTeX with KaTeX (enabled by `math: true` in
[`series.js`](./series.js)).

| Kind    | Write                         |
| ------- | ----------------------------- |
| Inline  | `$\\sigma^2$` or `\\(\\sigma^2\\)` |
| Display | `$$ ... $$` or `\\[ ... \\]`     |

`content` is a JS template string, so **double every backslash**:
`\\frac{a}{b}`, `\\sigma`, `\\mathbb{E}`. Math inside `<pre>`/`<code>` is left alone.

Because `$` starts math, avoid bare dollar signs for money in prose —
write "USD 100" or put the amount in `<code>`.

## Code blocks

```html
<pre><code>import numpy as np
print(np.log(1.05))
</code></pre>
```

Escape `<`, `>` and `&` inside code as `&lt;`, `&gt;`, `&amp;`.

## Files

| File            | Purpose                                         |
| --------------- | ----------------------------------------------- |
| `series.js`     | Shared category / series id / title / math flag |
| `index.js`      | List of published posts in the series           |
| `_template.js`  | Starting point for a new post (not published)   |
| `00-roadmap.js` | Part 0 — motivation and topic roadmap           |
