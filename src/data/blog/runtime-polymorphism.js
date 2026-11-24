// Runtime Polymorphism: How Virtual Dispatch Works
export default {
  id: 'runtime-polymorphism',
  title: 'Runtime Polymorphism: How Virtual Dispatch Works',
  category: 'how-tos',
  date: '2026-11-23',
  url: '/writing/runtime-polymorphism',
  summary: 'What runtime polymorphism is, how virtual functions and vtables make it work in C++, what it costs, and when to reach for it.',
  content: `<h2>Runtime Polymorphism: How Virtual Dispatch Works</h2>

<p>Polymorphism means "many forms": one interface, many implementations. <strong>Runtime polymorphism</strong> (also called dynamic dispatch or late binding) is the flavor where the decision about <em>which</em> implementation runs is made while the program is running, based on the actual type of the object, not the type of the variable that refers to it.</p>

<p>It is the mechanism that lets you write code against an abstraction today and plug in implementations that do not exist yet.</p>

<h3>A Minimal Example</h3>

<p>In C++, runtime polymorphism is opt-in through the <code>virtual</code> keyword:</p>

<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;

class Sensor {
public:
    virtual ~Sensor() = default;
    virtual double read() const = 0;          // pure virtual: no default
    virtual const char* name() const { return "sensor"; }
};

class Thermometer : public Sensor {
public:
    double read() const override { return 21.5; }
    const char* name() const override { return "thermometer"; }
};

class Barometer : public Sensor {
public:
    double read() const override { return 1013.2; }
};

int main() {
    std::vector&lt;std::unique_ptr&lt;Sensor&gt;&gt; sensors;
    sensors.push_back(std::make_unique&lt;Thermometer&gt;());
    sensors.push_back(std::make_unique&lt;Barometer&gt;());

    for (const auto&amp; s : sensors) {
        std::cout &lt;&lt; s-&gt;name() &lt;&lt; ": " &lt;&lt; s-&gt;read() &lt;&lt; "\\n";
    }
}</code></pre>

<p>Output:</p>

<pre><code>thermometer: 21.5
sensor: 1013.2</code></pre>

<p>The loop only knows about <code>Sensor</code>. Each call to <code>read()</code> still lands in the right derived class. <code>Barometer</code> did not override <code>name()</code>, so it inherits the base version.</p>

<h3>The Three Ingredients</h3>

<ul>
  <li><strong>Inheritance (or an interface):</strong> a common base type that declares the operations.</li>
  <li><strong>Overriding:</strong> derived types supply their own implementation with the same signature.</li>
  <li><strong>Indirection:</strong> calls go through a pointer or reference to the base. Calling through a plain value does not dispatch dynamically.</li>
</ul>

<h3>Under the Hood: vtables</h3>

<p>Most C++ compilers implement virtual dispatch with a <strong>virtual table (vtable)</strong>:</p>

<ul>
  <li>Every class with at least one virtual function gets one static table of function pointers, one slot per virtual function.</li>
  <li>Every object of such a class carries a hidden pointer, the <strong>vptr</strong>, to its class's table. The constructor sets it.</li>
  <li>A virtual call like <code>s-&gt;read()</code> compiles to: load the vptr from the object, load the function pointer from the <code>read</code> slot, call it.</li>
</ul>

<pre><code>Thermometer object        Thermometer vtable
+-----------+             +--------------------------+
| vptr  ----+-----------&gt; | ~Thermometer()           |
| (fields)  |             | Thermometer::read()      |
+-----------+             | Thermometer::name()      |
                          +--------------------------+

Barometer object          Barometer vtable
+-----------+             +--------------------------+
| vptr  ----+-----------&gt; | ~Barometer()             |
| (fields)  |             | Barometer::read()        |
+-----------+             | Sensor::name()           |  &lt;- inherited
                          +--------------------------+</code></pre>

<p>The calling code is identical for both objects. Only the table it reaches differs, and that is the whole trick.</p>

<h3>Rules That Prevent Bugs</h3>

<ul>
  <li><strong>Make the base destructor virtual.</strong> Deleting a derived object through a base pointer without a virtual destructor is undefined behavior; usually the derived destructor simply never runs and resources leak.</li>
  <li><strong>Always write <code>override</code>.</strong> If the signature drifts (a missing <code>const</code>, a different parameter type), the compiler errors out instead of silently creating a new, unrelated function.</li>
  <li><strong>Use <code>final</code></strong> on classes or functions that must not be overridden further. It documents intent and lets the compiler devirtualize calls.</li>
  <li><strong>Beware object slicing.</strong> Copying a derived object into a base <em>value</em> (<code>Sensor s = thermometer;</code>) cuts off the derived part. Abstract bases with pure virtual functions make this a compile error, which is one more reason to use them.</li>
  <li><strong>Do not call virtual functions from constructors or destructors</strong> expecting derived behavior. During base construction the object is still a base, so the base version runs.</li>
</ul>

<h3>What It Costs</h3>

<ul>
  <li><strong>Memory:</strong> one vptr per object (typically 8 bytes on 64-bit) plus one table per class.</li>
  <li><strong>Time:</strong> an extra memory load and an indirect branch per call. On its own that is small; the bigger effect is that the compiler usually cannot <strong>inline</strong> through a virtual call, which blocks further optimization in tight loops.</li>
  <li><strong>Cache behavior:</strong> a container of base pointers scatters objects across the heap, and mixed types make indirect branches harder to predict.</li>
</ul>

<p>For most application code these costs are noise. In hot inner loops, interrupt handlers, or memory-constrained embedded targets, they are worth measuring.</p>

<h3>Runtime vs. Compile-Time Polymorphism</h3>

<p>C++ also offers <strong>compile-time (static) polymorphism</strong> through templates, overloading, and patterns like CRTP. The compiler picks the implementation during compilation, so there is no vtable and calls can be inlined.</p>

<pre><code>template &lt;typename S&gt;
double sample(const S&amp; sensor) {
    return sensor.read();   // resolved at compile time, no virtual needed
}</code></pre>

<ul>
  <li><strong>Choose runtime polymorphism</strong> when the concrete type is only known at runtime: plugins, configuration-driven behavior, heterogeneous collections, or stable binary interfaces across library boundaries.</li>
  <li><strong>Choose compile-time polymorphism</strong> when types are known at build time and performance matters, accepting larger binaries and harder-to-read errors.</li>
  <li><strong>Consider <code>std::variant</code> + <code>std::visit</code></strong> when the set of types is closed and known up front. It gives value semantics and no heap allocation.</li>
</ul>

<h3>Other Languages</h3>

<ul>
  <li><strong>Java and C#:</strong> instance methods are virtual by default in Java (opt out with <code>final</code>); C# requires <code>virtual</code>/<code>override</code> like C++. Interfaces are the idiomatic abstraction in both.</li>
  <li><strong>Python and JavaScript:</strong> every method call is looked up at runtime on the object, so polymorphism is implicit ("duck typing"). No base class is required, just the right method name.</li>
  <li><strong>Rust:</strong> traits provide both styles. Generics (<code>impl Trait</code>) are static; <code>dyn Trait</code> trait objects use a vtable carried in a fat pointer next to the data pointer.</li>
  <li><strong>Go:</strong> interfaces are satisfied implicitly, and an interface value pairs a type descriptor (with its method table) with a data pointer.</li>
</ul>

<h3>Key Takeaways</h3>

<ul>
  <li>Runtime polymorphism lets code depend on an interface while the actual behavior is chosen by the object's real type at runtime.</li>
  <li>In C++ it requires <code>virtual</code> functions called through pointers or references, and is usually implemented with vtables.</li>
  <li>Use a virtual destructor in polymorphic bases, mark overrides with <code>override</code>, and avoid slicing.</li>
  <li>The overhead is small but real; reach for templates or <code>std::variant</code> when the types are known ahead of time and performance is critical.</li>
</ul>`,
}
