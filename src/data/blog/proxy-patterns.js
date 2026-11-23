// Proxy Patterns: Putting Something in Between
// Note: content is a template literal — avoid backticks and "${" inside it,
// and HTML-escape "<", ">" and "&" in code samples.
export default {
  id: 'proxy-patterns',
  title: 'Proxy Patterns: Putting Something in Between',
  category: 'how-tos',
  date: '2026-11-23',
  summary:
    'The Proxy design pattern and its variants (virtual, protection, remote, caching, logging), plus the same idea at the architecture level: reverse proxies, API gateways, and sidecars.',
  content: `<h2>Proxy Patterns: Putting Something in Between</h2>

<p>A proxy is an object that stands in for another object and controls access to it. The caller talks to the proxy exactly as it would talk to the real thing, and the proxy decides what happens next: forward the call, delay it, check permissions, serve a cached answer, or record it.</p>

<p>The idea is small, but it shows up everywhere, from a single class in your codebase to the load balancer in front of your whole platform. This post walks through the classic design pattern, its common variants, and the same idea applied to system architecture.</p>

<h3>The Core Idea</h3>

<p>Three pieces make up the pattern:</p>

<ul>
  <li><strong>Subject:</strong> the interface the client depends on.</li>
  <li><strong>Real Subject:</strong> the object that does the actual work.</li>
  <li><strong>Proxy:</strong> implements the same interface, holds a reference to the real subject, and adds behaviour around each call.</li>
</ul>

<p>Because the proxy and the real subject share an interface, the client cannot tell them apart. That is the whole trick: you add behaviour without changing the client or the real subject.</p>

<pre><code>interface ImageStore {
  getImage(id: string): Promise&lt;Image&gt;
}

class S3ImageStore implements ImageStore {
  async getImage(id: string) {
    return downloadFromS3(id)        // slow, costs money
  }
}

class CachingImageStore implements ImageStore {
  private cache = new Map&lt;string, Image&gt;()

  constructor(private inner: ImageStore) {}

  async getImage(id: string) {
    if (!this.cache.has(id)) {
      this.cache.set(id, await this.inner.getImage(id))
    }
    return this.cache.get(id)!
  }
}

// The client only knows about ImageStore
const store: ImageStore = new CachingImageStore(new S3ImageStore())</code></pre>

<h3>Common Variants</h3>

<p>The structure is always the same; what changes is the reason the proxy exists.</p>

<ul>
  <li><strong>Virtual proxy (lazy loading):</strong> postpones creating an expensive object until it is first used. Think of an ORM that returns a placeholder for a related record and only queries the database when you touch a field.</li>
  <li><strong>Protection proxy:</strong> checks whether the caller is allowed to perform an operation before forwarding it. Useful when access rules should not leak into business logic.</li>
  <li><strong>Remote proxy:</strong> makes an object in another process or machine look local. gRPC stubs, WCF clients, and generated REST SDKs are all remote proxies.</li>
  <li><strong>Caching proxy:</strong> returns stored results for repeated requests, as in the example above.</li>
  <li><strong>Logging / metrics proxy:</strong> records calls, arguments, timings, and failures without touching the real implementation.</li>
  <li><strong>Smart reference:</strong> does bookkeeping on access, such as reference counting, locking, or releasing a resource once nobody holds it. C++ <code>std::shared_ptr</code> is the textbook example.</li>
</ul>

<h3>Language Support</h3>

<p>Many languages let you build proxies without writing a forwarding method for every member:</p>

<ul>
  <li><strong>JavaScript:</strong> the built-in <code>Proxy</code> object intercepts property reads, writes, and calls. Vue's reactivity system is built on it.</li>
  <li><strong>C# / .NET:</strong> <code>DispatchProxy</code> and libraries like Castle DynamicProxy generate proxies at runtime; mocking frameworks such as Moq rely on them.</li>
  <li><strong>Java:</strong> <code>java.lang.reflect.Proxy</code> and bytecode tools power Spring's <code>@Transactional</code> and Hibernate's lazy loading.</li>
  <li><strong>Python:</strong> <code>__getattr__</code> lets a wrapper forward any attribute it does not define itself.</li>
</ul>

<pre><code>// JavaScript: log every method call on any object
function withLogging(target) {
  return new Proxy(target, {
    get(obj, prop) {
      const value = Reflect.get(obj, prop)
      if (typeof value !== 'function') return value
      return (...args) =&gt; {
        console.log('call', String(prop), args)
        return value.apply(obj, args)
      }
    },
  })
}</code></pre>

<h3>Proxy vs. Decorator vs. Adapter vs. Facade</h3>

<p>These four look alike in a class diagram. The difference is intent:</p>

<ul>
  <li><strong>Proxy</strong> keeps the same interface and <em>controls access</em> to the real object. It often manages the real object's lifecycle itself.</li>
  <li><strong>Decorator</strong> keeps the same interface and <em>adds features</em>. Decorators are designed to be stacked, and the client usually builds the chain.</li>
  <li><strong>Adapter</strong> <em>changes the interface</em> so an existing class fits what the client expects.</li>
  <li><strong>Facade</strong> <em>simplifies</em> a whole subsystem behind a new, smaller interface.</li>
</ul>

<p>In practice the line between proxy and decorator is blurry (a caching wrapper can be called either). Pick the name that best tells the next reader why the wrapper exists.</p>

<h3>The Same Idea at Architecture Scale</h3>

<p>Zoom out from classes to services and the pattern repeats, with network hops instead of method calls:</p>

<ul>
  <li><strong>Forward proxy:</strong> sits in front of clients and talks to the internet on their behalf. Used for corporate egress control, content filtering, and anonymity.</li>
  <li><strong>Reverse proxy:</strong> sits in front of servers. Nginx, HAProxy, Envoy, and cloud load balancers terminate TLS, spread traffic across instances, compress responses, and hide the internal topology.</li>
  <li><strong>API gateway:</strong> a reverse proxy with opinions. It adds authentication, rate limiting, request transformation, and routing to many backend services behind one public endpoint.</li>
  <li><strong>Sidecar proxy:</strong> a proxy deployed next to every service instance, as in a service mesh (Istio, Linkerd). The application talks to localhost; the sidecar handles mTLS, retries, timeouts, and telemetry.</li>
  <li><strong>CDN:</strong> a globally distributed caching reverse proxy.</li>
  <li><strong>Device or edge gateway:</strong> in IoT systems, a local gateway often proxies constrained devices to the cloud, buffering data during outages and translating protocols such as Modbus or BLE into MQTT or HTTPS.</li>
</ul>

<h3>When to Use It</h3>

<ul>
  <li>You need a cross-cutting concern (caching, auth, logging, retries) and do not want it inside business logic.</li>
  <li>The real object is expensive to create, remote, or shared, and its access needs managing.</li>
  <li>You want to swap behaviour per environment, such as a recording proxy in tests and a caching proxy in production.</li>
</ul>

<h3>Pitfalls</h3>

<ul>
  <li><strong>Hidden cost:</strong> a remote proxy makes a network call look like a cheap method call. Chatty code that loops over a remote proxy can be painfully slow.</li>
  <li><strong>Stale data:</strong> caching proxies need a clear invalidation story, or you will serve outdated results.</li>
  <li><strong>Identity and equality:</strong> a proxy is not the same object as the real subject. Equality checks, type checks, and <code>this</code> binding can behave unexpectedly.</li>
  <li><strong>Debugging through layers:</strong> stacks of generated proxies make stack traces long and confusing. Keep the chain short and name things clearly.</li>
  <li><strong>Single point of failure:</strong> at architecture scale, a reverse proxy or gateway that goes down takes everything behind it down too. Run it redundantly.</li>
</ul>

<h3>Takeaway</h3>

<p>A proxy lets you put something in between the caller and the work, without either side noticing. Whether it is a ten-line caching wrapper or a fleet of Envoy sidecars, the questions are the same: what behaviour belongs in the middle, what does it cost, and how will you know when it misbehaves?</p>`,
}
