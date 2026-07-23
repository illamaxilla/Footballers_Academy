# The Footballer's Academy — AM Assessment
## Instrument Audit & Battery Expansion

**Date:** July 12, 2026 · **Scope:** Module 6 (Attacking Midfielder) · **Companion to:** `AM_Assessment_Build_Handoff_v2.md`

**The question:** what does the current battery actually measure, where does it fail, and what else can a phone, a tablet or a laptop honestly do?

---

## PART 1 — THE AUDIT

### 1.1 What we have

| Layer | Instrument | Status |
|---|---|---|
| **1 · Self-report** | 15 scenario items · 10 Mind items (Five Pillars) | spec'd, engine built |
| **2 · In-app measured** | Options Seen · The Panic Clock · The 85th Minute · Scan & Recall · Break the Pattern | spec'd, not built |
| **3 · Test Card** | 9 self-reported physical/output tests | spec'd |
| **4 · Film** | 7 manual tags | spec'd |

### 1.2 The diagnosis — we ask most about what matters least

For each of the 10 traits I computed two numbers:

- **Probe weight** — the share of the questionnaire's total trait loading that lands on it.
- **Discriminative power** — the spread of that trait's canonical values across the five archetypes. A trait where all five score alike (`PAS`: 76–96) cannot separate anyone. A trait where they diverge (`ENG`: 60–99) does most of the work.

| Trait | Probe weight | Discriminative power | Ratio | |
|---|---|---|---|---|
| `EXP` Explosiveness | 6.3% | **11.4%** | **0.55** | ❌ under-probed |
| `RSK` Risk appetite | 8.1% | **12.5%** | **0.65** | ❌ under-probed |
| `ENG` Engine | 10.1% | **13.5%** | **0.75** | ❌ under-probed |
| `CMP` Composure | 9.3% | 10.7% | 0.86 | ok |
| `HSP` Half-space | 11.0% | 10.7% | 1.03 | ok |
| `DRB` Dribbling | 10.7% | 10.0% | 1.07 | ok |
| `MOV` Movement | 10.7% | 9.3% | 1.15 | ok |
| `GOL` Goal threat | 10.1% | 8.3% | 1.22 | ok |
| `VIS` Vision | 9.9% | 6.6% | 1.50 | ok |
| `PAS` Passing | **13.7%** | 6.9% | **1.98** | ↑ over-weighted |

**The three traits carrying the most power (`ENG` + `RSK` + `EXP` = 37.4% of all discriminative signal) are the three we ask about least.**

And that is not a coincidence. They are precisely the three that **self-report cannot measure**:

- **`ENG`** — nobody has ever described themselves as lazy. Ask a hundred players if they press and a hundred say yes.
- **`RSK`** — risk self-report is close to worthless. Everyone believes they are a *calculated* risk-taker. The Maverick and the Architect both answer *"I know when to take it."*
- **`EXP`** — you cannot introspect your own first step. It is a physical fact you have no access to.

Meanwhile `PAS` — the trait that separates these five archetypes *least* — is the easiest thing in football to ask about, so the questionnaire is full of it.

> **This is the core finding.** The self-report layer is systematically strongest exactly where self-report is unnecessary, and weakest exactly where behavioural and physical measurement is essential. The expansion below is not decoration. It is the load-bearing part of the instrument.

### 1.3 Coverage holes, by trait

| Trait | L1 self-report | L2 in-app | L3 test card | L4 film | Verdict |
|---|---|---|---|---|---|
| `VIS` | ✅ | ✅ Options Seen | ~ chances/90 | ~ | covered |
| `PAS` | ✅✅ | ~ | ✅ | ✅ | covered |
| `DRB` | ✅ | ❌ **none** | ✅ | ✅ | no measurement |
| `EXP` | ~ | ❌ **none** | ✅ 10m sprint | ~ | **self-report only** |
| `MOV` | ✅ | ✅ Scan & Recall | ❌ | ✅ | covered |
| `HSP` | ✅ | ~ | ❌ | ✅ | film-dependent |
| `RSK` | ~ one item | ~ | ❌ | ~ | **🔴 asked, never measured** |
| `CMP` | ✅ Mind | ✅ Panic Clock | ❌ | ❌ | covered |
| `ENG` | ✅ | ~ proxy | ✅ Yo-Yo | ✅ | covered |
| `GOL` | ✅ | ❌ **none** | ✅ | ✅ | no in-app |

---

## PART 2 — THE REFRAME

This single line from `AM-Part-II-Technical` (Jordet's scanning research) invalidates a chunk of the current Layer-2 design:

> *"Elite midfielders make passing decisions 0.2–0.5 seconds faster than average players — **not because they think faster, but because they've already scanned and know the answer before receiving the ball.**"*

**We have been planning to measure the wrong construct.**

A reaction-time test measures how fast you process what's in front of you. But the research says processing speed is *not* the differentiator. The differentiator is **pre-loaded information** — the mental map you built from glances *before* the ball arrived. Xavi wasn't quick. Xavi already knew.

### 2.1 What this means for task design

> **Measure the CHOICE to gather information, and the QUALITY of what was encoded. Not the speed of the response.**

The concrete numbers from the research, which become our benchmarks:

| Finding | Number | Source |
|---|---|---|
| Elite CM scan rate, build-up | **0.6–0.8 scans/sec** (6–8 glances in the 10s before receiving) | Jordet, PL + UCL match analysis |
| Average player scan rate | **0.3–0.4 scans/sec** | same |
| Xavi, at peak | **~0.8/sec** — the upper extreme observed | same |
| Scan **duration** | **0.3–0.4 seconds** — a glance, not a look | mobile eye-tracking, 4 Norwegian PL midfielders |
| Fixation rate | only **3%** of scans involve an actual fixation | same |
| Information per scan | **4–6 players** registered | same |
| Elite decision time | **0.4–0.6s** (average: 0.9–1.2s) | decision-making research |

The scan-duration figure (**350ms**) is the design gift. It tells us exactly how long to flash the pitch.

### 2.2 The second design principle: measure differences and slopes, not absolutes

Touchscreen input latency varies **50–100ms** across devices, browsers and refresh rates. So:

| | Verdict |
|---|---|
| ✅ **Within-person difference scores** (minute 1 vs minute 12) | Valid. Device latency is a constant that cancels. |
| ✅ **Within-person slopes** (accuracy as the timer shrinks) | Valid. Same reason. |
| ✅ **Choices** (how many times did you look? how long did you hold?) | Valid. Not timing-dependent at all. |
| ⚠️ **Between-person decision latency** | Usable — but only as a percentile, because the elite/average gap (500ms+) dwarfs device noise. |
| ❌ **"You saw the lane in 280ms"** | **Not defensible.** We cannot resolve that on consumer hardware. Say *"faster than 88% of players your age"* instead — which is honest, and lands harder anyway. |

---

## PART 3 — THE EXPANDED BATTERY

Seven new instruments. Each one closes a specific hole and each one is grounded either in the codex or in a validated research paradigm.

---

### 🔵 NEW 1 — **THE SHOULDER CHECK** ⭐ *the flagship*

**This is the task the whole product should be built around.** It is Jordet's research, made playable.

**Mechanic.** The ball is travelling toward you. You have a four-second window. The pitch is **hidden**. You may tap "check your shoulder" as often as you like — each check reveals the full pitch for exactly **350ms** (the real elite scan duration), then hides it again. When the ball arrives, the screen shows only *you* and *the ball*. Everyone else is gone.

**Now play the pass. From memory.**

**What it measures:**

| Measure | How | Benchmark |
|---|---|---|
| **Scan rate** — *a free choice, not an ability* | checks ÷ seconds | elite **0.6–0.8/s** · average **0.3–0.4/s** · Xavi **0.8** |
| **Encoding capacity** | correctly recalled positions per glance | elite register **4–6 players per scan** |
| **Decision quality from memory** | did you find the free man? | — |

**Traits:** `MOV` `HSP` `VIS` `PAS`

**Why it discriminates archetypes:** the Maverick plays with his head down and goes at people — he'll scan least. The Architect and the Phantom live on positional information — they'll scan most. The Maestro must know before he receives. **That's a real trait signal self-report can never give you**, because every single player will *tell* you they check their shoulder.

**Why it's honest:** it measures a *behaviour* and a *recall*. No reaction times. Device-robust.

**And it produces a number a coach understands in one second:** *"Your scan rate is 0.42/sec. Elite midfielders sit at 0.6–0.8."*

---

### 🔴 NEW 2 — **THE HOLD** ⭐ *closes the biggest hole*

`RSK` is the Maverick's defining marker (98) and the Architect's defining low (62) — **the single largest discriminator in the entire model** — and right now we measure it by asking. This fixes that.

Adapted from the **Balloon Analogue Risk Task** (Lejuez et al.), the standard behavioural measure of risk propensity.

**Mechanic.** You're on the ball. A meter fills as you hold. The longer you hold, the better the pass that opens up — and the closer the defender gets.

| Hold | Pass available | Reward | Risk |
|---|---|---|---|
| 1s | safe sideways ball | +1 | ~0% |
| 2s | progressive pass | +3 | rising |
| 3s | line-breaking pass | +6 | rising |
| 4s | **the killer ball** | +10 | high |

Get dispossessed at any point → **0**, and sometimes they counter and score.

Run ~20 trials with hidden, varying risk curves. **And show the game state:** `0–0` · `1–0 up, 5 minutes left` · `0–1 down, 5 minutes left`.

**What it measures — three constructs, all behaviourally:**

| Measure | How | Maps to |
|---|---|---|
| **Risk propensity** | mean hold time | `RSK` — measured, not claimed |
| **Risk *intelligence*** | do you shorten your hold at 1–0 up, and lengthen it at 0–1 down? | **the Risk Intelligence pillar** — the codex's own definition is *"calibrating risk to game context."* Elite band: **73% appropriate risk decisions** |
| **Post-error behaviour** ⭐ | after you're dispossessed, does your *next* hold collapse? | **Creative Confidence** (elite: **92% retained after failure**) and **Criticism Hypersensitivity** |

> **That last row is the most important thing in this document.**
>
> The Mind module currently *asks*: *"One mistake early and I go quiet for the rest of the game."* Every player who does this will say they don't.
>
> The Hold doesn't ask. **It makes them fail, and watches what they do next.** Post-error slowing is a well-established behavioural signature, and here it maps exactly onto the codex's own Beautiful Burden material.

**Traits:** `RSK` `CMP` + two of the Five Pillars, measured rather than self-reported.

**Build cost: low.** Pure canvas, no content pipeline, no video. **Build this first.**

---

### 🟣 NEW 3 — **THE CHUNK TEST** *(expertise, and it can't be gamed)*

The codex explicitly invokes this research in `AM-Part-II-Technical` §4.3:

> *"A chess grandmaster sees 'queen's gambit opening' where a novice sees individual piece positions. Similarly, an elite midfielder sees '3v2 overload on the left' where average players see individual teammates and opponents."*

That's Chase & Simon's chunking paradigm — and it has a definitive test, which nobody has ported to football.

**Mechanic.**
1. Show a **structured** attacking scene for 3 seconds → blank → drag player tokens to reconstruct where everyone was.
2. Then show a **scrambled** scene — the same players, in random, football-meaningless positions → same task.

**The score is the difference between the two.**

**Why this is the cleverest test in the battery:** expert recall advantage appears **only on structured positions**. Grandmasters are no better than novices at remembering randomly-scattered chess pieces. So:

| Structured | Scrambled | Interpretation |
|---|---|---|
| high | high | You just have a good visual memory. **No football chunking.** |
| **high** | **low** | **Real football schemas.** This is the elite signature. |
| low | low | Neither. |

It **separates football pattern recognition from general memory** — and it is essentially **impossible to game**, because you cannot fake being good at structured scenes *only*.

**Traits:** `VIS` `HSP`

---

### 🟠 NEW 4 — **THE FREEZE** *(anticipation)*

The temporal-occlusion paradigm (Williams & Ward) — the most validated expertise measure in sports science.

**Mechanic.** A clip of a real attack plays, then **freezes** before the outcome. *Where does the ball go?* Tap the pitch.

Vary the occlusion point: **−400ms** (very hard) → **−250ms** → **−100ms** → **at the moment of contact** (trivial).

**The output is a single, beautiful number: the earliest occlusion point at which you're still accurate.** Elite players extract information from *earlier* cues — the hips, the standing foot, the shoulder drop — before the ball is even struck.

**Traits:** `MOV` `VIS`

---

### 🟢 NEW 5 — **THE xG DILEMMA** *(closes `GOL`)*

**Mechanic.** A situation in the final third. Three options: **shoot · pass · carry.** Vary your own xG (0.08 → 0.35) against a teammate's xG (0.05 → 0.60).

| Measure | Maps to |
|---|---|
| **Shot appetite** — how often you take it on yourself | `GOL` — the Phantom and the Dynamo shoot; the Maestro and the Architect release |
| **Shot *selection*** — do you shoot when you actually should? | `VIS` + Risk Intelligence |
| **Carry appetite** | `DRB` — the Maverick's disposition |

**Be honest about the limit:** this measures **disposition, not finishing ability.** But the archetype *is* a disposition. What we want to know is whether you *look for* your own shot — and that is exactly what this measures.

---

### 🟡 NEW 6 — **THE JUMP** *(closes `EXP` — with a genuinely validated instrument)*

`EXP` is the worst-covered trait in the model (ratio 0.55) and the Maverick's second-defining marker (98, `explosive_power_index: 8.9`). Right now it depends entirely on a self-reported sprint time.

**There is a lab-grade alternative that runs on the phone already in their pocket.**

Countermovement jump, filmed at 240fps slow-motion, flight time → jump height. **Balsalobre-Fernández et al. (2015)** validated exactly this (the *My Jump* method) against a force plate: **r = 0.995.** That is not a proxy. That is the measurement.

| | |
|---|---|
| **Protocol** | Phone propped at ankle height, 240fps slow-mo, 3 jumps, best of 3. The app counts frames between take-off and landing. |
| **Maps to** | `EXP` — and it is the standard field proxy for lower-limb explosive power |
| **Caveat to print on the card** | ±2–3cm from framing and frame-rate variation. Report a range, not a decimal. |

This moves `EXP` from Layer 3 (a number they typed in) to **Layer 2 (a number we measured)**.

---

### ⚪ NEW 7 — **THE 90-MINUTE DRIFT** *(the rigorous version of The 85th Minute)*

Run the **identical** occlusion task at minute 1 of the session and again at minute 12, after the cognitive load of everything else.

**The score is the difference.** Codex band: elite retain **87%** of early-game decision quality.

Device-robust by construction (a difference score cancels the device's constant latency). And it is the honest translation of the codex's *"physical fatigue → creative degradation curve"*: **you cannot tire a player's legs through a screen, but you can absolutely tire their attention** — and the codex's own line is that *"scanning frequency is the first casualty of fatigue."*

---

## PART 4 — FOUR STRUCTURAL UPGRADES

These aren't tasks. They change what kind of instrument this is.

---

### ⭐⭐⭐ UPGRADE A — **POST-MATCH CHECK-INS** *(the biggest idea in this document)*

**The deepest weakness of the entire product is that it is a one-shot questionnaire.** Self-report about what you *would* do is a story you tell about yourself. Ten minutes, once, and we decide who you are.

**Fix: after every match, three taps. Thirty seconds.**

> *"What did you actually do most today?"* · *"How many times did you try the killer ball?"* · *"Last twenty minutes — still sharp, or gone?"*

After 8–10 matches you no longer have a personality quiz. You have a **behavioural time series**.

**And it hands you an 11th trait, for free: `VAR` — match-to-match variance.**

This matters enormously, because the codex says variance *is* the AM's defining problem:

- The **Architect** is defined by *"consistent performance across 90 minutes"* — low variance is his signature.
- The **Maverick** is cortisol-reactive and streaky — high variance is his.
- The Mental Training doc's whole **Inconsistency Anxiety** section rests on it: *"even De Bruyne runs a 6-to-9."*

**You cannot measure variance from a single questionnaire. It is definitionally impossible.** Check-ins make it free.

And — not incidentally — this is the retention engine. A reason to open the app every week, by design, that isn't a nag.

---

### ⭐⭐ UPGRADE B — **COACH CORROBORATION (360°)**

The player sends a link. The coach answers **six items**. Two minutes.

- It gives you an **independent rater** — which is exactly what the codex's own validation framework demands (`inter-rater κ > 0.85`) and which the product currently has *no way of producing*.
- It costs almost nothing to build.
- It's a viral loop: the coach discovers the product.

**And it should be weighted intelligently, not uniformly.** A coach sees things the player can't, and the player knows things the coach can't:

| Trait | Weight toward |
|---|---|
| `ENG` `DRB` `MOV` `GOL` `HSP` | **the coach** — these are observable from the touchline |
| `RSK` `CMP` and the Mind pillars | **the player** — these are internal states nobody else can see |

That is a defensible, principled weighting scheme, and it is the sort of thing an academy director will ask about before signing a €14,999 licence.

---

### ⭐ UPGRADE C — **ADAPTIVE ITEM SELECTION**

Right now we serve a fixed 15 items. But by item 6 the engine usually already knows it's down to two candidates — and then serves nine more questions, most of which can't tell those two apart.

**Instead: choose each next item to maximally separate the current top two.**

Greedy and simple — no IRT needed. For each remaining question, compute how much its options would separate the current #1 and #2 in trait space; serve the best one.

If it's **Maestro vs Architect**, serve the items loaded on `RSK` and `ENG` (where they differ most: `RSK` 75 vs 62, `ENG` 60 vs 76) and skip the ones loaded on `PAS` (96 vs 95 — worthless).

**~40 lines of code.** Same accuracy in fewer items, or materially better accuracy in the same fifteen.

---

### ⭐⭐⭐ UPGRADE D — **THE SCENE ENGINE** *(the architectural move that makes all this affordable)*

Look at what The Shoulder Check, The Chunk Test, The Freeze, Options Seen and The xG Dilemma all need:

**A library of football scenes.** That — not the code — is the real cost. Author them five times and this expansion is unaffordable.

**So author them once.**

```ts
interface Scene {
  id: string;
  players: { team: 'us'|'them'; x: number; y: number; role: string }[];  // 22 positions
  ball: { x: number; y: number; carrier: number };
  defensiveShape: 'low-block' | 'mid-block' | 'high-line' | 'transition';
  groundTruth: {
    bestPass: number;          // → Options Seen, Shoulder Check
    allViableLanes: number[];  // → Options Seen (fluency scoring)
    freeMan: number;           // → Shoulder Check (recall target)
    xgShoot: number;           // → xG Dilemma
    xgBestPass: number;        // → xG Dilemma
    outcome: 'goal'|'chance'|'lost'; // → The Freeze
  };
  scrambled?: Scene;           // → The Chunk Test (auto-generate: same players, random positions)
}
```

**One data structure. Forty scenes. Five tasks.** The scrambled variant for the Chunk Test can be generated *automatically* from any scene. The occlusion points for The Freeze are just timestamps.

> **This is the single most valuable engineering recommendation in this analysis.** Without it, each new task carries its own content pipeline and the battery never ships. With it, every task after the first is a *skin* on an asset you already own.

---

## PART 5 — FILM: WHAT'S ACTUALLY AUTOMATABLE

### 5.1 Ship the manual version first — it's better than it sounds

**v1 — the player tags their own clip.** *"Watch it back. Tap every time you check your shoulder."* Ninety seconds.

This looks like a cop-out. It isn't. **It is simultaneously a measurement and a training intervention** — because Jordet's own coaching method, and Beast Mode Soccer's, is literally coaches shouting *"Check your shoulder!"* The act of counting your own scans is how you learn to scan. The task teaches while it measures.

### 5.2 v2 — automated scanning count

MediaPipe Pose / MoveNet runs in-browser at 30fps. Track head yaw from the nose / ear / shoulder landmarks → count head turns above a threshold → **scans per second**, automatically, from a phone video.

**Honest constraints, state them up front:** the player must be reasonably large in frame. Broadcast wide shots will fail. The guidance to the user is *"film from the stand, zoomed in on yourself, 60–90 seconds."*

### 5.3 What film gives you that nothing else can

Every one of these checks a **specific per-90 number the codex already published**:

| Tag | Codex benchmark it verifies |
|---|---|
| Position at the moment of reception | **Phantom: "appears in space 73% of possessions"** |
| Line-breaking passes | **Architect: 3.1 per 90** |
| Take-ons attempted / completed | **Maverick: 4.2 per 90 at 68%** |
| Received with a defender within 2m | **Iniesta: only 31%** — evidence of pre-reception separation. A `MOV` gold standard. |
| Pressing actions after loss | **Dynamo: 8.9 km** |

---

## PART 6 — THE REJECTION LIST

What **not** to build, and why. This list is as valuable as the one above.

| ❌ | Why not |
|---|---|
| **Webcam eye-tracking for scanning** | WebGazer-class accuracy is ~4° of visual angle *with* calibration, and collapses with head movement and poor lighting. **It cannot resolve scanning behaviour.** It is the single most tempting feature here — measuring the eyes of a player whose defining trait is where they look — and it is the one most certain to produce numbers that are quietly fiction. |
| **Tap-based "dribbling" minigames** | A footballer will know in three seconds that it isn't dribbling. It measures thumb dexterity. And it won't just be ignored — **it will retroactively poison every other number on the card.** `DRB` stays in self-report and film. That's the honest answer. |
| **Absolute reaction-time leaderboards** | Device input lag varies 50–100ms. You would be ranking phones. |
| **Phone-accelerometer sprint *speed*** | Poor validity. (Distance and load: acceptable. Peak speed: no.) |
| **Anything biological** | No camera-based HRV in motion. No cortisol. No "quantum coherence." Not on this hardware, not from this data. |

### The one to *collect* but not score: chronotype

The codex assigns each archetype a circadian peak (Maestro **15:30**, Maverick **20:00** at testosterone peak, Architect *"consistent across 90 minutes"*, Dynamo *"multiple peaks"*). The **rMEQ** is five validated items.

**But that claim — that chronotype discriminates archetype — is a hypothesis, not a finding.** So: collect it, **do not score on it in v1**, and test it against the pilot cohort. If it discriminates, you've earned a free trait dimension. If not, drop it silently and nobody was ever misled.

Either way it produces a lovely, cheap, personal line on the result card: *"Your creative peak is late afternoon. Do your hardest technical work between 15:00 and 16:30."*

---

## PART 7 — COVERAGE, AFTER

| Trait | Before | After | Closed by |
|---|---|---|---|
| `EXP` | ❌ self-report only | ✅ **measured** | **The Jump** (r = 0.995 vs force plate) |
| `RSK` | 🔴 asked, never measured | ✅ **measured behaviourally** | **The Hold** |
| `ENG` | ~ thin | ✅ measured + longitudinal | **Post-match check-ins** · The 90-Minute Drift · film |
| `GOL` | ~ no in-app | ✅ | **The xG Dilemma** |
| `MOV` | ✅ | ✅✅ **gold standard** | **The Shoulder Check** · The Freeze · film |
| `HSP` | ~ film-dependent | ✅ | The Shoulder Check · The Chunk Test |
| `VIS` | ✅ | ✅✅ | The Chunk Test · The Freeze |
| `DRB` | ✅ | ✅ *(disposition only — and we say so)* | The xG Dilemma (carry appetite) · film |
| `CMP` | ✅ | ✅✅ | The Panic Clock · The Hold (post-error) |
| `PAS` | ✅✅ over-weighted | rebalanced | — |
| **`VAR`** *(new)* | — | ✅ | **Post-match check-ins** — impossible any other way |

**Plus three of the Five Psychological Pillars move from self-report to behavioural measurement:**

| Pillar | Was | Becomes |
|---|---|---|
| Risk Intelligence | *"I know when to try the difficult ball"* | **The Hold** — do you actually adjust to the scoreline? |
| Creative Confidence | *"After a failure I'll try the next one just as freely"* | **The Hold** — post-error hold time. We make you fail and watch. |
| Cognitive Endurance | *"I still see the same pictures late on"* | **The 90-Minute Drift** — minute 1 vs minute 12, same task |

---

## PART 8 — BUILD ORDER *(value per unit of cost)*

| # | Build | Why here | Cost |
|---|---|---|---|
| **1** | **The Hold** | Closes the biggest hole (`RSK`) *and* converts three Mind pillars from self-report to behaviour. Pure canvas — **no content pipeline at all.** | ~3 days |
| **2** | **Post-match check-ins** | Biggest structural gain in the product. Trivial to build. Unlocks `VAR`. Is the retention engine. | ~2 days |
| **3** | **Coach 360** | Free validity, free virality, and the thing academy directors ask for. | ~2 days |
| **4** | **Adaptive item selection** | ~40 lines for a real accuracy gain. | ~1 day |
| **5** | 🏗️ **THE SCENE ENGINE** | The unlock. Nothing below ships affordably without it. | ~1 week |
| **6** | **The Shoulder Check** | The flagship. Jordet's research, playable. Needs scenes. | ~1 week |
| **7** | **The Chunk Test** | Near-free once the Scene Engine exists (scrambling is automatic). | ~2 days |
| **8** | **The xG Dilemma** | Near-free once the Scene Engine exists. | ~2 days |
| **9** | **The Freeze** | Needs a clip library + rights. Content is the cost, not code. | ~2 weeks |
| **10** | **The Jump** | Needs slow-mo capture + frame analysis. | ~1 week |
| **11** | **Film — manual scan tagging** | Cheap, and it teaches while it measures. | ~3 days |
| **12** | **Film — automated scan count** | Hard. Ship the manual version and see if anyone uses it first. | ~3 weeks |

**Items 1–4 need no football content whatsoever.** They can be built this month, and they close the three biggest holes in the model.

---

## PART 9 — THE HONESTY LEDGER

Print this on the wall. Every number the app shows must survive it.

| Instrument | What it measures | What it does **NOT** measure | What we may claim |
|---|---|---|---|
| The Shoulder Check | scanning *behaviour*, spatial encoding | actual pitch vision under physical pressure | *"Your scan rate is 0.42/sec. Elite is 0.6–0.8."* |
| The Hold | risk propensity, risk calibration, post-error recovery | courage in a tackle | *"You take more risk when behind. That's calibration — most players don't."* |
| The Chunk Test | football-specific pattern recognition | general intelligence | *"Structured recall 7/10, scrambled 3/10. Those are real football schemas."* |
| The Freeze | anticipation from advance cues | reaction speed | *"You read it 250ms before contact."* |
| The xG Dilemma | shot / pass / carry **disposition** | **finishing ability** | *"You look for your own shot more than 80% of #10s."* |
| The Jump | lower-limb explosive power | first-step acceleration *with a ball* | *"Your CMJ is 42–45cm."* (a range — never a decimal) |
| The 90-Min Drift | *cognitive* endurance | *physical* endurance | *"You held 84% of your early sharpness."* |
| Check-ins | behaviour over time, **variance** | anything on any single day | *"Your floor is rising. Your ceiling hasn't moved."* |
| Coach 360 | observable behaviour | internal states | *"Your coach sees more work rate than you give yourself credit for."* |

**The rule that governs all of it:**

> Everything on the result card traces to something the player **told us**, something the app **measured**, or something a **coach confirmed**. Nothing else appears. Ever.
>
> That constraint is not a limitation. It is the only thing separating this from a personality quiz with a football skin — and it is the entire reason a club would pay for it.

---

*Companion to `AM_Assessment_Build_Handoff_v2.md` · Module 6 of 8*
