// How a Hand-Wound Watch Works
export default {
  id: 'how-hand-wound-watches-work',
  title: 'How a Hand-Wound Watch Works',
  topic: 'movements',
  date: '2026-11-23',
  summary:
    'A tour of the manual-wind mechanical movement: how turning the crown stores energy in a spring, and how that energy is released, one tick at a time, to move the hands.',
  content: `<p>A hand-wound (manual-wind) watch is the purest form of mechanical timekeeping. It has no battery and no self-winding rotor. Every bit of energy that moves the hands comes from your fingers turning the crown. Inside, a few hundred parts turn that energy into steady, countable beats.</p>

<p>Every mechanical movement does the same five jobs: <strong>store</strong> energy, <strong>transmit</strong> it, <strong>regulate</strong> its release, <strong>count</strong> the beats, and <strong>display</strong> the time. Six groups of parts share that work, in this order:</p>

<ol class="horology-flow" aria-label="Path of energy through a hand-wound watch">
  <li><span class="horology-flow__part">Crown &amp; keyless works</span><span class="horology-flow__job">You put energy in</span></li>
  <li><span class="horology-flow__part">Mainspring &amp; barrel</span><span class="horology-flow__job">Stores it</span></li>
  <li><span class="horology-flow__part">Gear train</span><span class="horology-flow__job">Carries it and counts</span></li>
  <li><span class="horology-flow__part">Escapement</span><span class="horology-flow__job">Lets it out in small steps</span></li>
  <li><span class="horology-flow__part">Balance &amp; hairspring</span><span class="horology-flow__job">Sets the rhythm</span></li>
  <li><span class="horology-flow__part">Motion works &amp; hands</span><span class="horology-flow__job">Shows the time</span></li>
</ol>

<h2>1. Winding: the crown and keyless works</h2>

<p>When you turn the crown, you turn the <strong>winding stem</strong>. A small sliding gear on the stem (the <em>clutch</em> or <em>sliding pinion</em>) meshes with the <strong>winding pinion</strong>. That turns the <strong>crown wheel</strong>, which in turn drives the <strong>ratchet wheel</strong> sitting on top of the mainspring barrel. This whole group of parts is called the <em>keyless works</em>. The name dates from the 19th century, when watches stopped needing a separate key to wind them.</p>

<p>A spring-loaded pawl called the <strong>click</strong> rests against the ratchet wheel's teeth. It lets the wheel turn in the winding direction only. Without it, the spring would unwind back through the crown the moment you let go. The soft clicking you hear and feel while winding is this part working.</p>

<h2>2. Storing energy: the mainspring and barrel</h2>

<p>The <strong>mainspring</strong> is a long ribbon of hardened alloy coiled inside a toothed drum called the <strong>barrel</strong>. Its inner end hooks onto the barrel's central arbor (the shaft wound by the ratchet wheel). Its outer end is fixed to the barrel wall. Winding coils the spring tighter around the arbor. As the spring slowly relaxes, it turns the barrel, and the teeth around the barrel's edge drive the rest of the watch.</p>

<p>In a hand-wound watch the outer end is fixed firmly, so when the spring is fully wound the crown simply stops turning. That firm resistance is your signal to stop. (Automatic watches use a "slipping bridle" instead, which lets the fully wound spring slide inside the barrel so the rotor can never overwind it.)</p>

<p>A full wind usually gives a <strong>power reserve</strong> of about 40 to 50 hours. Many modern movements manage 70 hours or more, and some use two or more barrels to run for a week or longer.</p>

<h2>3. Transmitting: the gear train</h2>

<p>The barrel turns slowly and with a lot of force. The <strong>gear train</strong> (or <em>going train</em>) steps that up into faster, gentler rotation through a series of wheels and pinions:</p>

<ul>
  <li><strong>Center wheel</strong>: turns once per hour, and traditionally carries the minute hand.</li>
  <li><strong>Third wheel</strong>: an intermediate step that raises the speed.</li>
  <li><strong>Fourth wheel</strong>: turns once per minute, and usually carries the seconds hand.</li>
  <li><strong>Escape wheel</strong>: the last wheel, with specially shaped teeth that hand energy to the escapement.</li>
</ul>

<p>Left alone, this train would spin freely and the spring would run down in seconds. Something has to hold it back and release it at a precise, steady rate.</p>

<h2>4. Releasing in steps: the escapement</h2>

<p>Almost every modern watch uses the <strong>Swiss lever escapement</strong>. A T-shaped <strong>pallet fork</strong> has two synthetic ruby <em>pallet stones</em>. These take turns locking the escape wheel's teeth. Each time the balance wheel swings past its center, a small <em>impulse pin</em> on the balance knocks the fork sideways. That unlocks the escape wheel for an instant, and the wheel moves forward by half a tooth.</p>

<p>As the tooth slides across the pallet stone, it also pushes the fork, and the fork gives the balance a small push. This is how the watch keeps going: the escapement lets the gear train move forward one small step at a time, and on each step it passes a little energy back to keep the balance swinging. The "tick" you hear is the escape wheel tooth landing on a pallet stone.</p>

<h2>5. Setting the rhythm: the balance and hairspring</h2>

<p>The <strong>balance wheel</strong> and its very fine spiral <strong>hairspring</strong> form the <em>oscillator</em>, the part that actually keeps time. The hairspring pulls the balance back toward center, it overshoots, and the spring pulls it back again, like a pendulum that works in any position. Because a good hairspring swings at nearly the same rate whether the swings are large or small, the watch keeps steady time as the mainspring weakens.</p>

<p>The rate is measured in beats (half-swings) per hour:</p>

<ul>
  <li><strong>18,000 bph</strong> (2.5 Hz): common in vintage watches.</li>
  <li><strong>21,600 bph</strong> (3 Hz): many classic manual-wind calibers.</li>
  <li><strong>28,800 bph</strong> (4 Hz): today's most common rate, with a smoother seconds hand.</li>
  <li><strong>36,000 bph</strong> (5 Hz): "high-beat" movements.</li>
</ul>

<p>Accuracy is adjusted with a <strong>regulator</strong>, which changes the hairspring's effective length, or on higher-end movements with small adjustable weights on the balance rim. A well-regulated mechanical watch typically keeps within a few seconds per day. Chronometer-certified watches are tested to −4/+6 seconds per day.</p>

<h2>6. Counting and showing: the motion works</h2>

<p>The minute hand rides on the <strong>cannon pinion</strong>, which is driven by the center wheel. A small set of gears called the <strong>motion works</strong> (the cannon pinion, the minute wheel, and the hour wheel) slows that rotation by exactly 12:1, so the hour hand goes around once for every twelve turns of the minute hand.</p>

<p>The cannon pinion is fitted to its arbor by friction. That is what lets you set the time without fighting the gear train. When you pull the crown out, the sliding pinion moves away from the winding gears and engages the <strong>setting wheels</strong>. Turning the crown now turns the motion works directly. Many watches also <em>hack</em> (stop the balance) in this position, so you can set the time to the exact second.</p>

<h2>Jewels: why "17 jewels"?</h2>

<p>The spinning arbors run in bearings made of synthetic ruby. Ruby is extremely hard and very smooth, so it barely wears and needs only a tiny amount of oil. About 17 jewels is enough to fit a jewel at every important wear point of a time-only movement: the train bearings, the pallet stones, the impulse pin, and the balance bearings. Higher jewel counts usually point to extra complications rather than better quality.</p>

<h2>Living with a hand-wound watch</h2>

<ul>
  <li><strong>Wind it daily, at the same time.</strong> The mainspring gives its most even force when it is near full wind, so a morning routine keeps timekeeping consistent.</li>
  <li><strong>Wind until you feel resistance, then stop.</strong> It usually takes 20 to 40 turns from empty. Don't force the crown past the stop.</li>
  <li><strong>Take it off your wrist to wind.</strong> This keeps sideways pressure off the winding stem.</li>
  <li><strong>Mind the date.</strong> On watches with a date, avoid changing it between roughly 9 pm and 3 am, when the date-change gears are already engaged.</li>
  <li><strong>Service every 5 to 10 years.</strong> Oils dry out and thicken over time. A service cleans and re-oils the movement, so it lasts for generations.</li>
</ul>

<h2>Why choose manual wind?</h2>

<p>Without a rotor, a hand-wound movement can be thinner, and through a display caseback you can see the whole movement, unobstructed. Well-known examples include the Unitas/ETA 6497–6498 pocket-watch caliber and the Omega calibre 1861 in the Speedmaster Professional. The real appeal, though, is the daily ritual: a minute each morning when you wind the spring that will keep the watch running all day.</p>`,
}
