# Addendum B — The Assessment Instrument Audit
## Can a phone classify an archetype? · Full Back / Wing Back Build Handoff

**Date:** July 19, 2026 · **Scope:** audit of the existing test battery, then design of phone-native instruments to close the gap
**Constraint:** phone, tablet, desktop. Camera, touchscreen, accelerometer, GPS, microphone. No lab, no force plates, no presence.

---

## 0. The answer, up front

**Yes — and the reason is better than you'd expect.**

Not because a phone can replicate a €2.65M laboratory. It can't, and this document is explicit about what's permanently out of reach.

The reason is that **the classifier doesn't consume 8,942 measurements. It consumes eight.** Phase 3's `FullBackBayesianClassifier` takes exactly eight inputs: VO₂max, distance per match, 20 m sprint, crossing accuracy, tackle success, spatial awareness, decision speed, and fatigue resistance. Everything else in the 4.8-hour battery informs the *prescription* — it doesn't drive the *classification*.

All eight are reachable from a phone at some fidelity. Three of them — spatial awareness, decision speed, fatigue resistance — are reachable at **higher** fidelity than the current battery achieves, because the current battery specifies them as VR tasks nobody has built, while the phone versions are standard experimental paradigms that have existed in sport-science labs for thirty years.

And there's a deeper point in §3 that changes how you should think about the whole product: **archetype lives in preference and trade-off, not in capacity.** Two players with identical VO₂max and sprint times can be a Winger and a Sentinel. What separates them is what they *choose* when there's no time to think. Capacity tests can't tell them apart. Choice tests can — and choice tests are exactly what a touchscreen is good at.

For this specific job, the phone is not a downgrade. It may be the better instrument.

---

## 1. Inventory — what the battery currently contains

### 1.1 The four stations

| Station | Duration | What it measures | Equipment | Phone-reachable? |
|---|---|---|---|---|
| **Quantum-biological baseline** | 95 min | Genomics, microbiome, circadian, mitochondrial, neuroimaging | Sequencing, NIRS, imaging suite | ❌ None of it |
| **Endurance physiology** | 80 min | VO₂max, lactate profile, running economy, RSA, fatigue resistance, substrate use | Metabolic cart, lactate analyser, instrumented treadmill | ⚠️ Estimates only |
| **Biomechanics & power** | 55 min | Sprint mechanics, jump power, COD, crossing biomechanics, landing quality | Motion capture, force plates | ⚠️ Jump yes, rest no |
| **Tactical intelligence** | 60 min | Spatial processing, decision quality, pattern recognition, width management, partnership | "VR-based tasks", "video-based decision tasks" | ✅ **Nearly all of it** |

### 1.2 Position-specific field battery

| Test | Measures | Phone-reachable? |
|---|---|---|
| The FB Gauntlet (70 m sprint → 3-target cross → 70 m recovery → 1v1, ×10) | Integrated position-specific capacity | ⚠️ Partially — timing yes, scoring needs an observer |
| Repeated sprint (12 × 40 m, 25 s recovery) | Power, capacity, fatigue index | ⚠️ Timing yes, needs a pitch and a helper |
| Yo-Yo IR2 | Endurance | ✅ **Fully** — the phone is already the standard instrument |
| Modified 505 with ball | Change of direction | ⚠️ Video timing |
| Cognitive fatigue test (decisions after physical load) | Decision maintenance | ✅ **Fully** |
| 13k threshold test | Endurance surge point | ❌ Needs biomarkers |

### 1.3 The finding that matters

**The tactical intelligence station — 60 of the 290 minutes — is almost entirely phone-portable, and it was never built.**

Look at what the protocol actually specifies:

| Codex measurement | Stated method | Phone equivalent |
|---|---|---|
| Field mapping — recreate player positions from memory | VR | Drag-and-drop on a pitch diagram |
| Distance estimation | VR | Tap-to-estimate on a still |
| Angle perception — optimal crossing angles | VR | Draw the line on a still |
| Peripheral detection | VR | Fixation-controlled flash task |
| Decision speed (baseline 350–550 ms) | Video + VR | Timed video-choice task |
| Decision accuracy by phase | Video + VR | Same task, phase-tagged clips |
| Risk assessment — *"Winger = higher, Sentinel = lower"* | Video + VR | Repeated risk-choice task |
| Option generation (4+ = elite) | Video + VR | Multi-select before committing |
| Anticipation — next pass, next movement | Elite footage | Temporal occlusion |
| Tactical memory — recall team shapes | Elite footage | Recall task |
| Width management | Simulated scenarios | Positional tap task |

Every row on the right is a standard experimental paradigm, buildable in a browser, in under five minutes of a player's time. The VR requirement was never a scientific necessity — it was an assumption about what a rich stimulus needs to be.

**Note the risk-assessment row especially.** The Codex already commits to a directional prediction: Wingers take more risk, Sentinels take less. That's a falsifiable hypothesis generated by your own model, testable with a task a teenager can complete in three minutes. It's the single best candidate for your first validation study (§9).

---

## 2. Feature coverage — what actually drives classification

The eight classifier inputs, scored for phone reachability.

| # | Classifier feature | Best phone route | Fidelity | Notes |
|---|---|---|---|---|
| 1 | `spatial_awareness` | Freeze-frame recall task (B1) | 🟢 **High** | Direct measurement, validated paradigm |
| 2 | `decision_speed` | Timed video-choice task (A1) | 🟢 **High** (relative) | Absolute ms unreliable — see §6.1 |
| 3 | `fatigue_resistance` | Repeat-jump decrement (C2) + decision decrement (A5) | 🟢 **High** | Within-test decrement is device-independent |
| 4 | `tackle_success` | Match tally (D1) | 🟡 Moderate | Low event count; needs 6+ matches |
| 5 | `crossing_accuracy` | Target drill (C5) or tally | 🟡 Moderate | Self-scored; verifiable by video |
| 6 | `sprint_20m` | Slow-motion video timing | 🟡 Moderate | ±0.05 s achievable at 240 fps |
| 7 | `distance_per_match` | GPS import, or phone GPS | 🟡 Moderate | Phone GPS fine for totals, useless for sprints |
| 8 | `vo2max` | Yo-Yo IR2 or Cooper → estimate | 🟠 Low | Estimate, ±10%. Never present as measured |

**Eight for eight, at usable fidelity.** Three at high fidelity, four moderate, one weak.

The weak one is VO₂max, and that's worth sitting with: it's the feature the Codex leans on hardest and the one the phone handles worst. But it's also the feature that *discriminates archetypes least* — the Codex's own distributions put Warrior at 65, Sentinel 64, Winger 63, Architect 62, with a standard deviation of 3. Those distributions overlap almost completely. VO₂max tells you someone is a full back. It barely tells you which kind.

The features that actually separate the four archetypes are crossing accuracy, tackle success, spatial awareness and decision speed — and three of those four are phone-strong.

---

## 3. Why choice tasks beat capacity tests for this job

This is the core argument of the document.

### The problem with measuring capacity

Take two academy full backs with identical measurements: VO₂max 62, 20 m sprint 3.02 s, Yo-Yo IR2 level 20. One is a Winger, one is a Sentinel. Every physiological test in the battery says they're the same player.

They aren't. When the ball goes into the channel ahead of them at 1-1 in the 78th minute, one goes and one holds. That decision — repeated eighty times a match — is the archetype. It is not a capacity. It's a **disposition**: a stable pattern in how someone resolves the attack-or-hold trade-off under time pressure.

The lab battery is superb at measuring what a player *can* do. Archetype is about what they *do*.

### Why self-report can't fix it

The 12-question quiz asks directly about disposition, which is the right target — but it's transparent. A player who wants to be Trent Alexander-Arnold picks the Winger answers. Main handoff §1 already handles this by calling the quiz output *declared*.

What the quiz can't do is catch the gap between self-image and behaviour, which is exactly where the interesting players are — the kid who declares Winger and reliably chooses the safe pass at 400 ms, or the one who declares Sentinel and can't stop stepping into the press.

### Why timed choice tasks can

Give someone two seconds and they answer with their disposition. Give them ten and they answer with their self-image. **The gap between those two answers is a measurement**, and it's not one anybody currently makes.

This is the single most valuable instrument in the design below (A2), and it's cheap: the same clips, run twice, with different time limits.

### What this means strategically

The phone can't measure mitochondrial efficiency. It also doesn't need to. For classification specifically, the phone measures the right things and the lab measures things that don't discriminate. **You are not building a compromised version of the lab. You are building a different instrument that happens to be better suited to this particular question.**

That's a defensible commercial position, and it's true.

---

## 4. The proposed battery — twelve instruments

Grouped by mechanism. Each entry states what it feeds, what the archetype signal should be, and how hard it is to build.

---

### GROUP A — Choice & decision (touchscreen)

#### A1 · The Fork *(temporal occlusion)*
The foundation instrument.

A clip plays from the full back's viewpoint and freezes at the decision moment. Four options. Tap one.

- **Format:** 20 trials, ~4 min · **Feeds:** `decision_speed`, `decision_accuracy`
- **Records:** response time, choice, choice consistency across similar scenarios
- **Archetype signal:** the attack-hold ratio is the primary axis. Winger overlaps; Sentinel holds; Architect tucks; Warrior varies with context
- **Validity:** temporal occlusion is the standard paradigm in sport expertise research — well-precedented, not novel
- **Build:** 🟡 Medium. The task is easy; the **clip library is the real cost** (see §6.3)

#### A2 · Two Seconds *(speed–accuracy trade-off)* ⭐
The sharpest discriminator in the battery, and nobody is doing it.

The same scenario set, run twice. Round one: unlimited time. Round two (different day, parallel form): a two-second forced response.

- **Format:** 12 trials each round, ~5 min total · **Feeds:** a new construct — *decisiveness*
- **Records:** accuracy under each condition; **the decrement between them**; whether the *direction* of choice shifts under pressure
- **Archetype signal (hypothesis):** Winger loses the least accuracy and shifts toward attacking options; Architect loses the most (deliberative); Sentinel is conservative under both and shifts further toward safety; Warrior is stable
- **Why it's strong:** it can't be gamed. You cannot fake your own 400 ms behaviour while also faking your unlimited-time behaviour in a different direction
- **Build:** 🟢 Easy once A1 exists — same clips, different timer

#### A3 · The Ledger *(risk tolerance)*
Repeated binary choices under varying game state.

*"Recycle to the centre back — 90% retained, no progress. Or drive the line — 45% chance of a chance created, 55% chance you're caught upfield."* Game state varies: 0-0 in the 20th; 1-0 down in the 80th; 2-0 up in the 60th.

- **Format:** 16 trials, ~3 min · **Feeds:** risk tolerance, context sensitivity
- **Archetype signal:** the Codex already predicts Winger high, Sentinel low. **Context sensitivity is the more interesting output** — a Warrior should shift risk with game state; a Winger should stay high regardless
- **Build:** 🟢 Easy. Text and diagram only, no footage, no licensing
- **Priority:** build this first. Cheapest instrument, most directly tests an existing claim

#### A4 · Hold or Go *(inhibitory control)*
A winger runs at you. Press when he commits; hold when he feints.

- **Format:** 40 trials, ~2 min · **Feeds:** impulsivity, response bias
- **Records:** hit rate, false-alarm rate, response bias, consistency over time-on-task
- **Archetype signal:** Sentinel — low false alarms, patient. Winger — fast, higher false alarms. This directly operationalises the 2022 attention finding in Addendum A §3.2, where fullbacks were *less* attentive and *more* impulsive than specialised defenders
- **Build:** 🟢 Easy. Schematic animation is sufficient and arguably better than footage

#### A5 · Tired Minds *(decision under fatigue)* ⭐
The app instructs 45 seconds of physical work — shuttle runs, jumping jacks, whatever the space allows — then immediately runs A1.

- **Format:** 45 s work + 10 trials, ~3 min · **Feeds:** `fatigue_resistance` (cognitive)
- **Records:** decision accuracy and speed versus the player's rested baseline
- **Archetype signal:** Warrior should show the smallest decrement. The Codex sets <15% decline as elite
- **Why it matters:** the Codex identifies decision-making under fatigue as a defining full-back quality and specifies a lab protocol for it. This is that protocol, on a phone, for free
- **Build:** 🟡 Medium. Needs safety gating — no minimum-age exemption, no readiness-red days, no pain flag (main handoff §8.4)

---

### GROUP B — Perception & memory (touchscreen)

#### B1 · Freeze Frame *(spatial recall)*
A match still appears for four seconds, then blanks. Place six players on an empty pitch.

- **Format:** 10 trials, ~4 min · **Feeds:** `spatial_awareness` — a direct classifier feature
- **Records:** mean placement error in metres (pitch-normalised), error by player role
- **Critical design note:** include **unstructured control trials** — randomly scattered players in configurations that never occur in football. Skilled players outperform novices on structured displays but *not* on random ones. Without the control condition you are measuring visual memory, not football perception, and the score will be worthless. This is the most common way this task is built wrong
- **Build:** 🟡 Medium

#### B2 · Off-Ball *(scanning breadth)*
A clip plays. Afterwards: *"Where was the opposition's left winger when the ball was played?"*

- **Format:** 12 trials, ~4 min · **Feeds:** attentional breadth
- **Archetype signal:** Architect and Warrior should outperform; Winger should be ball-focused
- **Build:** 🟡 Medium. Requires clips with verifiable off-ball ground truth

#### B3 · Where Would You Be? *(width management)*
A static scenario on a pitch diagram. Tap your position. Ten scenarios spanning build-up, sustained attack, defensive transition, low block.

- **Format:** 10 trials, ~3 min · **Feeds:** `width_management`, positional preference
- **Archetype signal:** the cleanest **Architect** discriminator in the touchscreen set — Architects tap inside during build-up; Wingers tap high and wide; Sentinels tap deep. This partly solves the third-axis problem identified in Addendum A §2.3
- **Build:** 🟢 Easy. Diagram only, no footage

---

### GROUP C — Physical (sensor)

#### C1 · Jump *(countermovement jump)*
Flight-time method — the phone's slow-motion camera records the jump; height derives from time in the air (`h = g·t²/8`).

- **Format:** 3 attempts, ~2 min · **Feeds:** lower-body power
- **Validity:** the flight-time video method is well established against force platforms in published validation work. Report height, not force — force estimates from flight time are a step too far
- **Build:** 🟡 Medium. Frame-accurate take-off and landing detection is the hard part; a manual scrub-to-frame fallback works and is more honest than a flaky auto-detector

#### C2 · Ten Jumps *(fatigue index)*
Ten consecutive maximal jumps. Measure the decrement from best to last.

- **Format:** ~1 min · **Feeds:** `fatigue_resistance` (neuromuscular)
- **Archetype signal:** Warrior lowest decrement; Winger highest peak, steeper decline
- **Why it's good:** decrement is a **ratio within a single session on a single device**. Every source of measurement error that would corrupt an absolute value cancels out. This is the most trustworthy physical number the phone can produce

#### C3 · Yo-Yo IR2 *(the phone as the instrument)*
The app plays the audio and records the level reached.

- **Format:** variable · **Feeds:** `vo2max` estimate, endurance
- **Note:** this is not a phone approximation of a lab test. Audio-paced shuttle running **is** the standard field protocol, and the phone is the correct instrument for it. Present it that way

#### C4 · The Stop *(deceleration)* ⭐
Sprint 15 m, then stop as fast as possible. Measure stopping distance.

- **Format:** 3 attempts, ~3 min · **Feeds:** braking capacity
- **Why it's new:** Addendum A §2.1 found that roughly **65% of the mechanical peak period is deceleration**, and there is no widely used field test for it. This one needs two cones and a tape measure
- **Archetype signal:** Sentinel and Warrior should stop shortest relative to entry speed
- **Build:** 🟢 Easy (tape-measure self-report) or 🟡 Medium (video-verified)

#### C5 · Ten Crosses *(crossing accuracy)*
Phone on a tripod or propped against a bag. Ten crosses at three target zones. Self-scored, video-verifiable.

- **Format:** ~6 min · **Feeds:** `crossing_accuracy` — a direct classifier feature
- **Note:** self-scoring inflates. Treat unverified scores as a lower-confidence tier, and let a coach or parent confirm from the video for full weight

---

### GROUP D — Film-derived

#### D1 · Match tally
Specified in Addendum A §5.1. Nine countable events, reference values from Euro 2024. Feeds `tackle_success` and the attack/defend axes.

#### D2 · Positional sampling ⭐
The app pauses match video at twenty pre-set timestamps and asks: *tap where you were.*

- **Format:** ~5 min per match · **Feeds:** average position, positional spread, width profile
- **Why it's clever:** continuous player tracking from a single sideline camera is genuinely hard. Sampling twenty points is easy, and twenty points is enough to estimate a mean position and a variance. Crude, and sufficient
- **Archetype signal:** this is the **Architect axis** — Addendum A §2.3 concluded the four archetypes are three-dimensional and the tally alone can only resolve three of them. Mean lateral position resolves the fourth. An Architect's mean position sits measurably narrower than a Winger's
- **Build:** 🟢 Easy. A pitch diagram and a tap

#### D3 · Technique capture *(pose estimation)*
On-device pose models can extract joint positions from phone video in real time. Applied to a crossing or sprint clip, this yields contact time, stride frequency, plant-foot position, trunk lean.

- **Feeds:** technique feedback only
- **Hard limit:** single-camera 2D pose estimation is not accurate enough for joint-angle or injury-risk judgements. It may be used for **coaching cues** — "your plant foot is closing your hips" — and never for a risk score. Main handoff §13.3 rule 1 applies without exception
- **Build:** 🔴 Hard. Defer to V4+

---

## 5. Feeding the engine

### 5.1 Instrument → construct → archetype

Each instrument produces z-scores on constructs; constructs form an archetype signature.

| Construct | Instruments |
|---|---|
| Attacking disposition | A1, A2, A3, B3, D1, D2 |
| Defensive disposition | A1, A4, D1 |
| Possession involvement | B3, D1, D2 |
| Decisiveness | A2 |
| Risk tolerance | A3 |
| Inhibitory control | A4 |
| Spatial perception | B1, B2 |
| Fatigue resistance | A5, C2, C3 |
| Power & speed | C1, C4 |
| Technical output | C5, D1 |

### 5.2 Archetype signature — **hypothesis, not finding**

Everything below is a prediction to be tested. Label it as such in the code, and do not ship any of it as fact.

| Construct | Warrior | Winger | Sentinel | Architect |
|---|---|---|---|---|
| Attacking disposition | High | **Very high** | Low | Medium |
| Defensive disposition | High | Low | **Very high** | Medium |
| Possession involvement | Medium | Low | Low | **Very high** |
| Decisiveness (A2) | High | **Very high** | Medium | **Low** |
| Risk tolerance | Medium | **High** | **Low** | Medium |
| Context-sensitivity of risk | **High** | Low | Low | Medium |
| Inhibitory control | Medium | **Low** | **High** | Medium |
| Spatial perception | High | Medium | High | **Very high** |
| Fatigue resistance | **Very high** | Medium | High | Medium |

The bolded cells are where the discrimination lives. Note that **Decisiveness and Possession involvement carry most of the Architect signal** — which is precisely the axis the current 12-question quiz and the match tally both fail to resolve.

### 5.3 Confidence

Confidence should rise with instrument coverage *and* with instrument reliability, not with the count of measurements taken:

```
confidence = Σ(instrumentWeight × testRetestReliability) / Σ(maxWeight)
```

An instrument with unknown test-retest reliability gets a weight of zero until it's measured. That is not conservatism — an unreliable instrument makes the classification worse, not better, because it adds variance while looking like information.

### 5.4 The honest limit

This battery improves **representation**. It does not, on its own, improve **prediction**.

Prediction needs labelled outcomes — players whose eventual archetype, or whose eventual career, is known. Main handoff §11.1 covers this and nothing here changes it. What this battery does is generate the structured, multi-instrument dataset that makes validation *possible* later. Build it for that reason, and describe it that way to clubs.

---

## 6. Engineering constraints that will bite

### 6.1 Touch latency — the one that ruins millisecond claims

Consumer touchscreen input latency runs roughly 50–120 ms and varies by device, refresh rate, browser and thermal state. The Codex's target of "<400 ms under pressure" cannot be verified on a phone, because the measurement error is a substantial fraction of the quantity.

**Rules:**
1. **Never report absolute response times against an elite threshold.** Report percentile within your own population.
2. **Run a per-device calibration** — a 20-trial simple visual-motor task (tap when the dot appears) at the start of any timed session. Subtract that baseline. What remains is decision time, not decision-plus-hardware time.
3. **Compare within-subject only**, same device where possible. Flag a device change in the record.
4. **Prefer decrements to absolutes.** A2's trade-off and A5's fatigue decrement are ratios — hardware latency cancels. This is why they're the strongest instruments in the set.

### 6.2 Screen size distorts spatial tasks

A tap on a 6-inch phone and a 13-inch tablet are different motor acts. Normalise all spatial responses to pitch coordinates, not pixels, and record device class so you can check for a size effect later.

### 6.3 The clip library is a licensing problem, not a production problem ⚠️

**You cannot build a decision-task library from broadcast footage.** Premier League, UEFA and domestic-league match footage is licensed, aggressively enforced, and not covered by any research or educational exemption you'd be able to rely on commercially.

Three legitimate routes:

| Route | Cost | Fidelity | Verdict |
|---|---|---|---|
| **Schematic / animated 2D** | Low | Moderate | **Start here.** Well-precedented in published perceptual-cognitive research, zero licensing, fully controllable, and A3, A4 and B3 need nothing else |
| Film original footage | Medium | High | An academy partnership solves footage and labelled data at once (main handoff §12) |
| License clips | High | High | Only worth it at scale |

Schematic animation is not a compromise here. It gives you exact control over the variables you're manipulating, which broadcast footage never does — with a real clip you can't be sure whether the player responded to the winger's body shape or to the commentary graphic in the corner.

### 6.4 Practice effects

Performance on all of these improves with repetition, independent of ability. Consequences:

- Build **parallel forms** — at least three per instrument, matched for difficulty
- Never let a player retake the same form
- Enforce a cool-down between administrations (14 days minimum for A1/A2/B1)
- The first administration is the measurement. Later ones measure change, and change is confounded with familiarity until you've quantified the practice curve

### 6.5 Supervision and gaming

An ambitious parent can sit beside a 14-year-old and coach the answers. You cannot prevent this. You can:

- Flag response patterns that are implausibly consistent
- Use A2's two-second condition, which is much harder to coach externally
- Frame the output as the player's own, and say plainly in the UI that a coached result helps nobody

### 6.6 Accessibility

Timed tasks and colour-coded pitch diagrams both exclude people. Provide an untimed practice mode, never encode meaning in colour alone, and keep the whole battery optional — a player who completes only the quiz still gets a full declared result and a full development plan.

---

## 7. What the phone cannot do

State these plainly rather than engineering around them:

| Out of reach | Why |
|---|---|
| VO₂max (measured) | Requires gas analysis. Estimate only, ±10%, always labelled |
| Lactate, blood markers, hormones | Invasive |
| Ground reaction force, loading rate | Requires force plates. Flight-time jump height is the ceiling |
| 3D joint kinematics, knee valgus | Single-camera 2D is not accurate enough. **Never** for injury risk |
| Sprint *speed* from phone GPS | Consumer GPS samples too slowly to capture a two-second effort. Distance totals yes; sprints no |
| Heart rate during exercise via camera | Camera PPG degrades badly under motion. Chest strap or nothing |
| Anything in the quantum-biological station | Genomics, microbiome, mitochondrial function — none of it |

The last row is worth acknowledging directly: **the entire biological layer of the Codex is unreachable from a consumer device, permanently.** That layer belongs to the lab tier and the research partnerships, not to the player app. Designing as though it might eventually arrive on a phone will distort every decision downstream.

---

## 8. Build sequence

Not all twelve. In this order:

| Wave | Instruments | Why | Effort |
|---|---|---|---|
| **1** | A3 Ledger · B3 Where Would You Be? · A4 Hold or Go | Zero footage, zero licensing, high archetype signal, all three testable in a week | Days |
| **2** | C2 Ten Jumps · C3 Yo-Yo IR2 · C4 The Stop | Sensor and audio only; C2's decrement is your most trustworthy physical number | Days |
| **3** | A1 The Fork · **A2 Two Seconds** | Needs the schematic clip library. A2 is the highest-value instrument in the battery | Weeks |
| **4** | B1 Freeze Frame · B2 Off-Ball · D2 Positional sampling | Completes spatial coverage and the Architect axis | Weeks |
| **5** | C1 Jump · C5 Ten Crosses · D1 Match tally | Needs camera work and verification flows | Weeks |
| **Later** | D3 Technique capture | Hard, and the lowest value per unit of risk | V4+ |

**Session design:** a teenager will not sit through twelve instruments. Structure it as a **12-minute core** (A3 + B3 + A4 + A1) with the rest as optional modules unlocked over the first month. Completion rate matters more than coverage — an instrument nobody finishes measures nothing.

---

## 9. The validation study you can actually run

This is small enough to run yourself and it would put you ahead of every competitor, none of whom have run one.

**Question:** do the phone instruments discriminate coach-assigned archetype?

| | |
|---|---|
| **Sample** | 60 academy full backs, ages 15–18, ideally across two clubs |
| **Ground truth** | Each player independently labelled by two coaches who know them well, using the four archetype descriptions. **Report inter-rater agreement first** — if two good coaches disagree on who's a Warrior, the categories need work before any instrument is blamed |
| **Instruments** | Wave 1 and Wave 2 (six instruments, ~15 min) |
| **Reliability** | Every player repeats the full set at 7 days. Anything with test-retest below r = 0.7 is dropped, not fixed |
| **Primary analysis** | Does A3 risk tolerance separate coach-labelled Wingers from Sentinels? That's the Codex's own prediction — a clean, pre-registered, falsifiable test |
| **Secondary** | Does A2's decrement separate Architects from Wingers? Does the declared archetype from the quiz agree with coach labels — and where does it diverge? |
| **Cost** | Coach time and a spreadsheet |

The divergence analysis is quietly the most commercially valuable output. If the quiz agrees with coaches 70% of the time and the instruments push that to 85%, you have a number to sell. If the quiz agrees 45% of the time, you've learned something far more important than any feature you could have shipped instead.

---

## 10. Summary

| | |
|---|---|
| **Current battery** | 4.8 hours, 8,942 measurements, €2.65M of equipment, nine specialists |
| **What the classifier consumes** | 8 features |
| **Phone-reachable** | 8 of 8 — three at high fidelity, four moderate, one weak (VO₂max, which discriminates least anyway) |
| **Already phone-portable but never built** | The entire 60-minute tactical intelligence station |
| **Proposed** | 12 instruments, ~35 min total, 12-minute core |
| **Strongest three** | A2 Two Seconds · A5 Tired Minds · C2 Ten Jumps — all decrement-based, all immune to hardware error |
| **Biggest landmine** | Clip licensing. Go schematic first (§6.3) |
| **Biggest constraint** | Touch latency. Never report absolute milliseconds (§6.1) |
| **What this does** | Improves representation and builds the dataset |
| **What it doesn't** | Validate prediction. That still needs labelled outcomes |

---

**End of Addendum B.** Extends main handoff §7 (evidence tiers) and Addendum A §5. No change to §8 readiness or §13 compliance, both of which apply unchanged — with particular attention to A5, which involves instructing a minor to exercise and must respect the readiness and pain gates without exception.
