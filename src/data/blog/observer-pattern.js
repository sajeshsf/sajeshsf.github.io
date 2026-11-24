// The Observer Pattern: Hiding in Plain Sight in .NET (and Everywhere Else)
export default {
  id: 'observer-pattern',
  title: 'The Observer Pattern: Hiding in Plain Sight in .NET',
  category: 'how-tos',
  series: 'design-patterns',
  seriesTitle: 'Design Patterns in Practice',
  date: '2026-11-23',
  url: '/writing/observer-pattern',
  summary:
    'You have almost certainly used the Observer pattern this week without noticing. A look at what it is, where .NET and similar frameworks bake it in, and the traps that come with it.',
  content: `<p>Ask a room of .NET developers whether they have implemented the Observer pattern and only a few hands go up. Ask whether they have written <code>button.Click += OnClick;</code> and every hand goes up. It is the same thing. Observer is probably the most used design pattern in modern frameworks, and most people use it without noticing, because the framework has already written it for them.</p>

<h2>What the pattern is</h2>

<p>The Gang of Four describe Observer as: <em>define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.</em></p>

<p>There are two roles:</p>

<ul>
  <li><strong>Subject</strong> (also called publisher or observable): owns some state or produces events. It keeps a list of interested parties but knows almost nothing about them.</li>
  <li><strong>Observer</strong> (also called subscriber or listener): registers with the subject and gets a callback when something happens.</li>
</ul>

<p>What you get is <strong>loose coupling</strong>. The subject does not need to know who is listening, how many listeners there are, or what they do with the notification. You can add a new listener without touching the subject at all.</p>

<h3>The textbook version</h3>

<p>Here is the classic, hand-rolled form in C#. You will rarely write it this way in .NET, but it shows the moving parts:</p>

<pre><code>public interface ITemperatureObserver
{
    void Update(double celsius);
}

public class WeatherStation
{
    private readonly List&lt;ITemperatureObserver&gt; _observers = new();
    private double _temperature;

    public void Attach(ITemperatureObserver o) =&gt; _observers.Add(o);
    public void Detach(ITemperatureObserver o) =&gt; _observers.Remove(o);

    public double Temperature
    {
        get =&gt; _temperature;
        set
        {
            _temperature = value;
            foreach (var o in _observers) o.Update(value);   // notify
        }
    }
}

public class Display : ITemperatureObserver
{
    public void Update(double celsius) =&gt;
        Console.WriteLine($"Now {celsius:0.0} °C");
}</code></pre>

<p>A list of observers, a way to subscribe and unsubscribe, and a loop that notifies them. That is the whole pattern.</p>

<h2>.NET built it into the language</h2>

<p>Most languages give you Observer as a library. C# put it into the language itself with <strong>delegates</strong> and the <code>event</code> keyword. The same <code>WeatherStation</code>, written the way .NET expects:</p>

<pre><code>public class WeatherStation
{
    public event EventHandler&lt;double&gt;? TemperatureChanged;

    private double _temperature;
    public double Temperature
    {
        get =&gt; _temperature;
        set
        {
            _temperature = value;
            TemperatureChanged?.Invoke(this, value);
        }
    }
}

// Subscribing
station.TemperatureChanged += (sender, c) =&gt; Console.WriteLine($"Now {c} °C");</code></pre>

<p>The observer list is gone, and so are <code>Attach</code> and <code>Detach</code>. A multicast delegate holds the list of subscribers, <code>+=</code> and <code>-=</code> subscribe and unsubscribe, and <code>Invoke</code> is the notify loop. The <code>event</code> keyword adds one more guarantee: outside code can only add or remove handlers. It cannot raise the event or wipe the list. Because this is so natural in C#, people stop seeing it as a pattern. It is just "events".</p>

<h2>Where you are already using it without noticing</h2>

<p>Once you know the shape, you find it all over the .NET ecosystem:</p>

<h3>1. UI events: WinForms, WPF, MAUI, Blazor</h3>
<p><code>Click</code>, <code>TextChanged</code>, <code>Loaded</code>, <code>SelectionChanged</code>. Every UI control is a subject with dozens of events, and every handler you wire up in the designer or in XAML (<code>Click="OnSave"</code>) is an observer.</p>

<h3>2. Data binding: <code>INotifyPropertyChanged</code></h3>
<p>This is the one people miss most often. In MVVM your ViewModel raises <code>PropertyChanged</code>, and the binding engine is the observer that updates the UI. You never write the subscribe call yourself. The framework does it when it reads <code>{Binding Name}</code>.</p>

<pre><code>public class PersonViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    private string _name = "";
    public string Name
    {
        get =&gt; _name;
        set
        {
            if (_name == value) return;
            _name = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
        }
    }
}</code></pre>

<p><code>ObservableCollection&lt;T&gt;</code> and <code>INotifyCollectionChanged</code> do the same for lists. The class even has "Observable" in its name.</p>

<h3>3. <code>IObservable&lt;T&gt;</code> and <code>IObserver&lt;T&gt;</code></h3>
<p>Since .NET Framework 4, the pattern has had first-class interfaces in the <code>System</code> namespace:</p>

<pre><code>public interface IObservable&lt;out T&gt;
{
    IDisposable Subscribe(IObserver&lt;T&gt; observer);
}

public interface IObserver&lt;in T&gt;
{
    void OnNext(T value);
    void OnError(Exception error);
    void OnCompleted();
}</code></pre>

<p>Compared with the textbook version, this adds two useful ideas. A stream can <strong>end</strong> (<code>OnCompleted</code>) or <strong>fail</strong> (<code>OnError</code>), and unsubscribing is just disposing the token that <code>Subscribe</code> returns. <strong>Reactive Extensions (Rx.NET)</strong> builds on these two interfaces and adds LINQ-style operators (<code>Where</code>, <code>Select</code>, <code>Throttle</code>, <code>Buffer</code>) over streams of events.</p>

<h3>4. Configuration reload: <code>IOptionsMonitor&lt;T&gt;</code> and <code>IChangeToken</code></h3>
<p>In ASP.NET Core, when <code>appsettings.json</code> changes on disk, the running app can react without a restart:</p>

<pre><code>public class FeatureFlags
{
    public FeatureFlags(IOptionsMonitor&lt;FlagOptions&gt; monitor)
    {
        monitor.OnChange(opts =&gt; Console.WriteLine($"Flags reloaded: {opts.NewCheckout}"));
    }
}</code></pre>

<p><code>OnChange</code> is a subscribe call and it returns an <code>IDisposable</code>. Underneath, <code>IChangeToken.RegisterChangeCallback</code> is the same pattern again, one layer down, with a <code>FileSystemWatcher</code> (another subject) at the bottom.</p>

<h3>5. Cancellation and app lifetime</h3>
<p><code>CancellationToken.Register(callback)</code> is Observer: the token is the subject, and your callback runs when it is cancelled. <code>IHostApplicationLifetime.ApplicationStopping</code> is exposed as a <code>CancellationToken</code>, so registering for graceful shutdown is subscribing to an event under a different name.</p>

<h3>6. Diagnostics and telemetry</h3>
<p><code>DiagnosticListener</code> is an <code>IObservable&lt;KeyValuePair&lt;string, object?&gt;&gt;</code>, and <code>DiagnosticListener.AllListeners</code> is an observable of listeners. ASP.NET Core, HttpClient and EF Core publish events through it. <code>ActivityListener</code> and OpenTelemetry instrumentation also subscribe to these sources. Every request trace you see in your APM tool reached it through Observer.</p>

<h3>7. Messaging inside the app</h3>
<p>MediatR's <code>INotification</code> with multiple <code>INotificationHandler&lt;T&gt;</code>, the MVVM Toolkit's <code>WeakReferenceMessenger</code>, and domain events in DDD-style code are all Observer, with a mediator in the middle so the subject does not even hold the list itself.</p>

<h2>It is the same story in other frameworks</h2>

<ul>
  <li><strong>Java:</strong> <code>java.util.Observer</code>/<code>Observable</code> shipped in JDK 1.0 and was deprecated in Java 9, but the pattern stayed. Swing's <code>ActionListener</code>, <code>PropertyChangeListener</code>, <code>java.util.concurrent.Flow</code> (Reactive Streams), RxJava and Spring's <code>@EventListener</code> all use it.</li>
  <li><strong>JavaScript / browser:</strong> <code>addEventListener</code> is Observer. So is Node's <code>EventEmitter</code> (<code>on</code>/<code>emit</code>), and so is <code>MutationObserver</code>, <code>IntersectionObserver</code> and <code>ResizeObserver</code>. Those last three put the word in the name.</li>
  <li><strong>Angular:</strong> built on RxJS <code>Observable</code>s. <code>HttpClient</code>, router events, reactive forms and <code>@Output() EventEmitter</code> all use subscriptions.</li>
  <li><strong>Vue, Svelte, SolidJS, Angular Signals:</strong> "reactivity" means each component automatically subscribes to the state it reads and re-renders when that state changes. It is Observer with automatic subscription tracking.</li>
  <li><strong>React:</strong> state libraries like Redux, Zustand and MobX expose a <code>subscribe</code> function, and React's <code>useSyncExternalStore</code> hook exists precisely to subscribe components to an external subject.</li>
  <li><strong>Android / Kotlin:</strong> <code>LiveData</code>, <code>StateFlow</code> and <code>Flow.collect</code>.</li>
</ul>

<p>The names change (event, listener, signal, stream, store, flow, ref), but the shape is always the same: <em>register interest, get called back.</em></p>

<h2>Why it goes unnoticed</h2>

<ul>
  <li><strong>The framework owns the subject.</strong> You only ever write the observer half, the handler, so you never see the subscription list.</li>
  <li><strong>The subscription is implicit.</strong> XAML bindings, Vue templates and signals subscribe for you. Nothing in your code says "subscribe".</li>
  <li><strong>The vocabulary is different.</strong> Tutorials say "handle the click event", not "register a concrete observer with the subject".</li>
  <li><strong>It is in the language.</strong> In C#, <code>+=</code> on an event feels like syntax, not a design decision.</li>
</ul>

<p>Noticing it still matters, because the pattern's failure modes come with it whether or not you call it by name.</p>

<h2>The traps that come with it</h2>

<h3>Memory leaks from forgotten subscriptions</h3>
<p>This is the classic .NET event leak. The subject holds a <strong>strong reference</strong> to every subscriber through its delegate. If a long-lived object (a singleton service, a static event, the main window) holds a handler from a short-lived object (a view, a ViewModel, a dialog), the short-lived object can never be garbage collected.</p>

<pre><code>// Leaks: AppEvents is static, so every ProductView ever created stays alive
public ProductView()
{
    AppEvents.ThemeChanged += OnThemeChanged;
}

// Fix: unsubscribe when the subscriber's life ends
public void Dispose()
{
    AppEvents.ThemeChanged -= OnThemeChanged;
}</code></pre>

<p>Fixes: always pair <code>+=</code> with <code>-=</code>, dispose the <code>IDisposable</code> returned by <code>Subscribe</code>/<code>OnChange</code>, or use weak events (<code>WeakEventManager</code> in WPF, <code>WeakReferenceMessenger</code> in the MVVM Toolkit). The same bug appears in JavaScript as a forgotten <code>removeEventListener</code> and in Angular as a missing <code>unsubscribe</code>.</p>

<h3>One failing observer stops the rest</h3>
<p>When a multicast delegate is invoked and one handler throws, the remaining handlers <strong>do not run</strong>, and the exception propagates back into the subject. If a notification is important, iterate <code>GetInvocationList()</code> and catch per handler, or design observers that do not throw.</p>

<h3>Threading surprises</h3>
<p>Handlers run synchronously on whatever thread raised the event. A <code>FileSystemWatcher</code> or timer event that touches UI controls will throw a cross-thread exception. A slow handler blocks the subject and every observer after it. Marshal to the right context (<code>Dispatcher</code>, <code>SynchronizationContext</code>, Rx's <code>ObserveOn</code>) and keep handlers short.</p>

<h3>Do not rely on ordering</h3>
<p>Delegates happen to invoke in subscription order, but nothing in the pattern's contract promises it. If observer B depends on observer A having run first, the two are coupled and the pattern no longer protects you.</p>

<h3>Cascades and hidden control flow</h3>
<p>An observer that changes state, which notifies another observer, which changes more state, can produce update storms or infinite loops. That is why <code>INotifyPropertyChanged</code> setters check <code>if (_name == value) return;</code>. Event-driven code is also harder to follow in a debugger, because "who calls this?" is answered at runtime, not in the source.</p>

<h2>Observer vs. Publish/Subscribe</h2>

<p>These are often used interchangeably, but there is a useful difference:</p>

<ul>
  <li><strong>Observer:</strong> observers subscribe <em>directly</em> to the subject. They are in the same process, usually synchronous, and the subject holds references to them.</li>
  <li><strong>Pub/Sub:</strong> a <strong>broker</strong> (an event bus, Azure Service Bus, Kafka, RabbitMQ, Redis) sits in the middle. Publishers and subscribers do not know about each other at all, and delivery is often asynchronous and across processes.</li>
</ul>

<p>Pub/Sub is the same idea scaled out across processes. If you understand Observer, you already understand why message brokers exist.</p>

<h2>When to reach for it deliberately</h2>

<ul>
  <li>One change has to fan out to several independent reactions (update UI, write audit log, invalidate cache).</li>
  <li>You want to add new reactions without editing the code that raises the change.</li>
  <li>You are building a reusable component and do not know who will consume its events.</li>
</ul>

<p>And when <em>not</em> to: if there is exactly one consumer and it will always be there, a direct method call is simpler, easier to debug and has no leak risk.</p>

<h2>Takeaway</h2>

<p>The Observer pattern is not something you occasionally reach for out of a design-patterns book. It runs through C# events, data binding, configuration reload, cancellation, diagnostics, and almost every UI framework in every language. The more useful skill is not implementing it, which the framework already did, but <strong>recognising it</strong>: once you see <code>+=</code>, <code>Subscribe</code>, <code>OnChange</code> or <code>addEventListener</code> as "this object now holds a reference to me and will call me later", the leaks, threading bugs and surprise cascades get much easier to predict and avoid.</p>`,
}
