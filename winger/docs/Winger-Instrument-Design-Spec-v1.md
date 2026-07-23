# The Footballer's Academy — Winger Assessment Battery
### Instrument Design Spec · v1.0 · Companion to Module 7 v3.0

**Date:** July 12, 2026
**Purpose:** Diagnose what the current battery actually measures, then specify the instruments that would close the gaps — within the hard limits of a phone, tablet, or laptop.

---

## Part 1 — Diagnosis

### 1.1 What each existing instrument really measures

| Tier | Construct | Validity | Fakeable? | Effort | Completion (est.) |
|------|-----------|----------|-----------|--------|-------------------|
| **1 — Identity** (12 questions) | Self-image / aspiration | Low–moderate | **Highly** | 3 min | ~95% |
| **2 — Context** (age, foot, side) | Hard fact | High | Low | 20 sec | ~95% |
| **3a — Event data** | Recalled output | Moderate (memory error + self-serving bias) | **Yes** | 3 min | ~25% |
| **3b — Physical** | Recalled test results | Moderate | **Yes** | 2 min | ~15% |
| **4 — Tape Test** | Observed behaviour, self-coded | **High** | Moderate (they still code it) | 15 min | ~5% |

**The completion column is the quiet disaster.** Your highest-validity instrument has your lowest completion rate. That inverse relationship is the central design problem of the whole battery — and every new instrument below is judged against it.

### 1.2 The seven gaps

**Gap 1 — Nothing measures a decision.** ⭐ *The big one.*
Every tier is retrospective. Tier 1 asks what you'd do; Tier 3 asks what you did; Tier 4 asks what you did on tape. All reports. But the archetype **is** a decision:

> Ball arrives. Defender closes. Artist **engages**. Ghost **avoids and hunts space**. Speedster **outruns**. Playmaker **passes around**. Hybrid **reads what the team needs**.

That's a perceptual-cognitive signature made under time pressure with incomplete information. You are measuring its downstream residue, never the thing itself.

**Gap 2 — No measure of decision *speed*.**
The Speedster decides fast and simple. The Playmaker decides slowly and complexly. That speed–accuracy tradeoff is a real, measurable, near-unfakeable axis — and it may be the single best Hybrid detector, because *fast AND accurate* is exactly what the Hybrid is, and you cannot simply choose to be both.

**Gap 3 — No measure of information sampling (scanning).**
Scanning behaviour before receiving is among the most robust perceptual predictors in football research. You can't count head turns on a phone — but you can measure the *analogue*: how much information does the player gather before committing, and **what do they look at first**?

**Gap 4 — No measure of risk tolerance under failure.**
The Artist's documented vulnerability is confidence volatility — three bad games and he stops attempting. That is directly, causally testable, and you're asking about it instead.

**Gap 5 — The Tape Test requires film.** Grassroots players, younger kids, and most of the world don't have it. You need a film-free route to behavioural data.

**Gap 6 — Self-coding the tape is still filtered through self-perception.** A player who believes he's an Artist will code ambiguous events as take-ons. Reduce the coder's degrees of freedom.

**Gap 7 — The phone is a measurement instrument and you're using it as a form.**
Available and unused: 120Hz touch sampling · 60–240fps camera · accelerometer + gyroscope · millisecond-accurate stimulus timing · on-device pose estimation (MediaPipe runs at 30fps on a mid-range phone, free).

### 1.3 The separability problem (from the evidence review)

| Instrument | Artist | Ghost | Speedster | Playmaker | Hybrid |
|---|---|---|---|---|---|
| Tier 1 — self-report | Weak | Weak | Weak | Weak | Weak |
| Tier 3a — event data | **Strong** | **Strong** | Weak | **Strong** | **Strong** |
| Tier 3b — physical / GPS | **Blind** | **Blind** | **Strong** | **Blind** | **Blind** |
| Tier 4 — tape | **Strong** | **Strong** | **Strong** | **Strong** | **Strong** |

Because wingers as a *class* sit at the ceiling of high-intensity running and sprint capacity (Plakias 2025), **GPS tells you "this is a winger," not "this is an Artist."** Only sprint capacity separates anything — the Speedster.

**Consequence:** the entire Artist/Ghost/Playmaker distinction currently rests on one instrument with a 5% completion rate. That is the fragility to fix.

---

## Part 2 — The new instruments

Eleven proposals. Each specifies: what it measures, how it works on a phone, what it outputs, what it can't do, and how hard it is.

---

### 🥇 NEW-1 · "The Isolation" — temporal-occlusion decision task
**Measures:** decision preference, decision speed, decision consistency
**Fixes:** Gaps 1, 2, 5 · **Effort:** M · **Completion (est.):** 70%

**Mechanic.** Show a 3–5 second clip of a winger receiving wide with a defender closing — over-the-shoulder or broadcast angle, real footage or animated. **Occlude the video at the moment of the touch.** Five buttons appear. The player taps what they'd do.

- Go outside and beat him → **Artist**
- Cut inside → **Ghost**
- Knock it past and run → **Speedster**
- Combine / lay it off → **Playmaker**
- Keep it, reset → **Hybrid**

**20 clips.** Systematically vary the scenario:

| Variable | Levels | What it exposes |
|---|---|---|
| Defender | Tight and committed · Backing off · Recovering | Artist thrives tight; Speedster needs him committed |
| Space behind | Grass · Deep block | The Speedster's whole game evaporates against a deep block |
| Numbers | Isolated 1v1 · Overload · Outnumbered | The Playmaker emerges in overloads |
| Score | 3–0 up · 0–0 · 1–0 down, 85th min | Risk tolerance under context |
| Position on pitch | Own half · Halfway · Final third | Risk gradient |

**Three signals from one tap:**
1. **Choice** → archetype vote *(weight: high)*
2. **Reaction time** → Speedster fast (<900ms), Playmaker slow (>1600ms) *(weight: medium)*
3. **Consistency across scenarios** → high consistency = conviction/specialist · high variance = situational reading = **Hybrid signature** *(weight: medium)*

**Why it's better than Tier 1.** Under 1.5 seconds of time pressure there is no glamorous option — only an honest one. Social desirability needs deliberation, and you've removed it. This is the standard validated paradigm for measuring sport decision-making (temporal occlusion), and it discriminates expertise reliably.

**What it can't do.** Video decision-making ≠ pitch decision-making. The paradigm is proven to separate expertise *levels*; whether it separates *styles* is an open empirical question. **Ships as CANDIDATE** (Part 3).

**Build note.** The hardest part is the clip library. Start with 20 animated top-down scenarios — cheaper, more controllable, and it removes broadcast-footage licensing entirely.

---

### 🥈 NEW-2 · "The Nerve Test" — risk tolerance under engineered failure
**Measures:** confidence volatility, attempt persistence
**Fixes:** Gap 4 · **Effort:** M · **Completion (est.):** 80% (it's a game)

**Mechanic.** A rapid swipe-based 1v1: a defender shifts, the player swipes left/right/through at the right moment to beat him. 30 rounds.

**The rounds are rigged.** Rounds 1–8 succeed at ~55%. **Rounds 9–12 are forced failures.** Rounds 13–30 return to ~55%.

**What you measure — the recovery curve:**

| Signal | What it means |
|---|---|
| Attempt rate in rounds 13–20 vs 1–8 | Did failure make him stop trying? |
| Shift toward the safe option after failure | The classic Artist collapse |
| Swipe aggression (velocity, distance) before vs after | Physical timidity |
| Rounds to return to baseline attempt rate | **The Resilience Index** |

**Output copy:**
> *"After four failed take-ons your attempt rate dropped 61%, and it took you nine rounds to get back. The Premier League average take-on success rate is 36.7% — meaning elite wingers fail almost two times in three and go again immediately. That gap is the Artist's career risk, and it's the most trainable thing about you."*

**Why nobody else will build this.** It's a causal manipulation, not a questionnaire. It measures the exact vulnerability the Codex documents for the Artist — and it does it in 90 seconds, in a game the player will *want* to replay.

⚠️ **Safeguarding.** Engineered failure with minors needs care. **Never frame the rigged block as the player's fault.** Debrief immediately and explicitly: *"Those four were rigged — nobody could have beaten them. We wanted to see what you'd do next."* Under-13s: skip this instrument entirely.

---

### 🥉 NEW-3 · Tape Test v2 — forced binary coding
**Measures:** observed behaviour, with the self-flattery removed
**Fixes:** Gap 6 · **Effort:** S · **Highest value-per-hour in this document**

**The problem with v1.** The player picks from ten labels per reception. A kid who believes he's an Artist codes ambiguous events as take-ons. He isn't lying — perception is motivated.

**The fix.** Replace label-picking with **binaries he can see on the screen.**

For each reception, in sequence:
1. *Did you touch the ball?* → Y / N
2. *Was a defender within two yards?* → Y / N
3. *Did you try to go past him?* → Y / N
4. *Did you get past him?* → Y / N
5. *Where did the ball end up?* → Forward / Sideways / Backward / Lost
6. *Where were you when it left your foot?* → Touchline / Half-space / Box / Deep

**The archetype is derived, never selected.**

| Pattern | Archetype |
|---|---|
| High (3) + touchline + forward | Artist |
| Low (3) + box + high box-presence | Ghost |
| High (3) with defender NOT within 2 yards (ran at space, not the man) | Speedster |
| Low (3) + half-space + high forward-pass rate | Playmaker |
| Even spread + high deep-recovery count | Hybrid |

Same effort for the user. A fraction of the bias. **Do this one first.**

---

### NEW-4 · Video sprint timing (rear camera)
**Measures:** 10m / 20m split, max velocity — objectively
**Fixes:** Gap 7, and the self-report problem in Tier 3b · **Effort:** M

**Mechanic.** Two cones, 20m apart. Phone propped at the finish line (or a friend films). Player sprints through. The app does frame-by-frame detection of the start and finish frames.

At 240fps that's **±4ms** — versus a human with a stopwatch, whose reaction time alone introduces **±150–200ms** of error. **This is not a gimmick. It is objectively more accurate than the instrument your current Tier 3 assumes.**

And it converts Tier 3b from self-report into **measurement**, which is the whole point.

**Constraint.** Needs 25m of space and a phone that shoots slow-mo (iPhone 8+, most mid-range Android from 2019). Degrade gracefully to 60fps (±17ms — still 10× better than a stopwatch).

---

### NEW-5 · Fog-of-war scanning task
**Measures:** information sampling breadth, and **first fixation**
**Fixes:** Gap 3 · **Effort:** M

**Mechanic.** A top-down pitch scene, fully fogged. The player drags a finger to reveal a small circle at a time — a torch in the dark. When they know what to do, they tap **Decide.**

**Measured:**

| Signal | Diagnostic value |
|---|---|
| **First area revealed** | ⭐ The defender → **Artist** (opponent-oriented) · Space behind → **Speedster** · The far post / box → **Ghost** · Teammates and the wider picture → **Playmaker** · Own half / the press → **Hybrid** |
| Number of areas checked before deciding | Scanning breadth |
| Time to decide | Speed–accuracy position |
| Whether they re-check | Reassurance-seeking vs conviction |

**First fixation is the prize.** It's near-impossible to fake because it happens before the player has framed the task as a test of anything.

---

### NEW-6 · Coach / teammate 360 link
**Measures:** external validity — for free
**Fixes:** the fact that *everything else is self-report* · **Effort:** S

One tap sends a link. The coach or a teammate answers **five** questions about the player (a compressed version of the same instrument). Inter-rater agreement becomes a confidence input.

**And the disagreement is the product.** *"You see yourself as an Artist. Your coach sees a Speedster. Here's what that gap means — and here's what to ask him on Tuesday."*

That is the most valuable single output in the app, it costs nothing to compute, and it's a viral loop by construction.

**Bonus variant — "Ask the man you beat."** Three questions to a defender who's marked you. Genuinely diagnostic. Enormously shareable.

---

### NEW-7 · Speed–accuracy tradeoff task
**Measures:** the player's position on the speed/accuracy curve
**Fixes:** Gap 2 · **Effort:** S

Rapid-fire pattern recognition (e.g. "is this shape a passing lane or a trap?"), 40 trials, scored on both speed and accuracy with a live tradeoff.

| Profile | Archetype |
|---|---|
| Fast, moderate accuracy | Speedster |
| Slow, high accuracy | Playmaker |
| **Fast AND high accuracy** | ⭐ **Hybrid** — you cannot simply *choose* to be both. This is the best Hybrid detector in the battery. |
| Slow, moderate accuracy | Developing |

Twenty seconds to run. Very hard to fake.

---

### NEW-8 · Post-match 60-second log
**Measures:** longitudinal behaviour · **Fixes:** Gap 5 (no film needed) · **Effort:** S

After each match, six taps:
Take-ons tried? (0 / 1–3 / 4–7 / 8+) · Goals? · Assists? · Times in the box? · Tracked back? · Fouls won?

Over ten matches this becomes a genuine behavioural dataset — **without film, without a coach, without a GPS vest.** And it's the retention loop.

**Variant — intent vs outcome.** *Before* the match: "What's one thing you'll try today?" *After*: "Did you?" The gap between intention and behaviour **is** the Artist's volatility, measured longitudinally in the wild.

---

### NEW-9 · Phone-in-pocket countermovement jump
**Measures:** lower-body explosive power · **Effort:** M

Phone in a pocket or armband; the accelerometer computes flight time → jump height. CMJ is the standard lower-body power test and it correlates with sprint acceleration.

Useful mainly as a Speedster corroborator. **Modest value** — the physical channel already has low archetype weight (§Part 1.3). Build after the decision tasks.

---

### NEW-10 · Pose-estimation landing screen (ACL)
**Measures:** knee valgus on landing · **Effort:** L · ⚠️ **Handle with care**

MediaPipe/BlazePose runs on-device at 30fps, free. Film a drop-jump from the front; the model estimates knee-over-toe alignment and detects valgus collapse. This is the core of validated clinical landing screens.

**Why it matters here.** The evidence review found: female ACL risk ~2–3× male; ACL is only ~2% of injuries in elite women's football but carries **the highest burden of any injury — a median of 292 days lost**; and the mechanism is **rapid deceleration and cutting**, which is precisely what a winger does more than anyone.

**A phone-based landing screen for female wingers is a genuinely novel, genuinely important feature, and nobody in this market has it.**

⚠️ **Non-negotiable framing.** This is a **screen**, not a diagnosis. Never say "you are at risk of an ACL tear." Say: *"Your landing mechanics show some knee collapse — here are three exercises, and it's worth showing this to a physio."* Never for under-16s. Never as a gate on anything.

---

### NEW-11 · Semi-automated film tracking
**Measures:** automates the Tape Test's off-ball counters · **Effort:** L

Player uploads a clip and taps themselves once. On-device tracking follows them and auto-counts sprints, accelerations, decelerations, direction changes, and produces a rough heat map.

**Why it matters:** it turns a 15-minute manual task into a 2-minute one. **That's the difference between 5% and 40% completion on your highest-validity instrument.** The single biggest lever on data quality in the whole product — but it's also the most expensive thing here. Build it once the cheaper instruments have proven the model.

---

## Part 3 — The Signal Graduation Pipeline

**This is the architectural idea that makes it safe to ship all of the above tomorrow.**

None of these instruments is validated *for playing style*. Temporal occlusion is proven to separate expertise **levels** (elite vs sub-elite). Whether it separates **styles** is an open question, and anyone who claims otherwise is guessing.

So don't ship them as measures. Ship them as **games that emit candidate signals**, and let them earn their weight.

| State | Weight in the archetype engine | Shown to the user as | Promotion criterion |
|---|---|---|---|
| 🔵 **Candidate** | **0.0** | A game with a score | Just collect the data |
| 🟡 **Provisional** | **0.3** | A game with a score + "this may say something about your style" | Correlates with tape behaviour at **r > 0.3**, n > 200 users |
| 🟢 **Promoted** | **Full** | A measure, folded into the result | **r > 0.5**, replicated on a held-out sample |

**The Tape Test is your ground truth.** Everything graduates against it. (Which is a third reason to fix and automate it first — NEW-3 and NEW-11.)

### What this buys you

1. **You can ship everything immediately** without any unvalidated signal corrupting a single result.
2. **Within one season you will know which instruments actually work** — empirically, on your own users.
3. **That result is your real IP.** Not the quantum biology. A published, replicated finding that *a 90-second occlusion task predicts on-pitch winger behaviour* is the thing that gets a professional club to take your call. "96% accuracy against synthetic labels" is the thing that gets you laughed out of the room.
4. **It's honest.** You can say exactly what you know and exactly what you're testing, and that posture is a competitive advantage in a market full of people who can't.

---

## Part 4 — Build order

| Order | Instrument | Why now | Effort |
|---|---|---|---|
| **1** | **NEW-3** — Tape Test binary coding | Removes bias from your ground truth. Everything else graduates against it. Cheapest fix in the document. | S |
| **2** | **NEW-1** — The Isolation | Closes the biggest gap. Defeats social desirability. Three signals per tap. | M |
| **3** | **NEW-6** — Coach 360 link | Free external validity. Viral loop. | S |
| **4** | **NEW-8** — Post-match log | Longitudinal behaviour without film. Retention. | S |
| **5** | **NEW-2** — The Nerve Test | Measures the Artist's #1 vulnerability causally. Nobody else has it. | M |
| **6** | **NEW-7** — Speed–accuracy | The best Hybrid detector. Twenty seconds. | S |
| **7** | **NEW-4** — Video sprint timing | Converts Tier 3b from report to measurement. | M |
| **8** | **NEW-5** — Fog-of-war scanning | Novel; first-fixation is near-unfakeable. | M |
| **9** | **NEW-11** — Semi-automated tracking | Biggest lever on completion — but expensive. | L |
| **10** | **NEW-10** — ACL landing screen | High value for female players. Needs medical-grade framing. | L |
| **11** | **NEW-9** — Phone CMJ | Physical channel has low archetype weight. Nice-to-have. | M |

**Everything from 1 to 8 is achievable with a video player, five buttons, a swipe handler, a timer, and a camera.** No ML, no server-side video, no hardware. That's the whole point.

---

## Part 5 — Two things I would NOT build

**❌ A swipe-dribbling skill game as a *measure*.**
It measures thumb dexterity. Its correlation with foot dexterity is unknown and plausibly near zero. **Ship it as a game if it's fun. Never let it touch the archetype engine.** The temptation to treat "he's good at the dribble game" as evidence will be strong. Resist it.

**❌ Any physiological or biometric inference from the phone.**
Camera-based heart rate, "stress detection," "focus scoring" — all of it is unreliable in the field, and all of it is a regulatory and safeguarding minefield in a product used by minors. There is nothing here you need badly enough to justify the risk.

---

## Part 6 — Open questions worth resolving

1. **Clip library:** animated top-down scenarios (cheap, controllable, licence-free) or real broadcast footage (higher fidelity, expensive, licensing)? **Recommend: animated for v1.** You can control every variable, and you avoid every rights conversation.
2. **How many Isolation trials?** 20 is a guess. Run a pilot: measure at what trial count the archetype estimate stabilises, then cut to that number. Every trial you cut raises completion.
3. **Does reaction time actually differ by archetype?** Unknown. It's the single most testable hypothesis in this document and the pilot answers it in a week.
4. **Under-13 flow:** which instruments are appropriate at all? Current recommendation — Isolation yes (it's just a game), Nerve Test **no** (engineered failure), Landing Screen **no**, physical measurement **no**.
5. **Where does the Tape Test ground truth come from for players with no film?** The post-match log (NEW-8) is the fallback, but it's self-report again. Coach 360 (NEW-6) may be the better anchor for that population.

---

*The phone is a measurement instrument. Stop using it as a form.*
