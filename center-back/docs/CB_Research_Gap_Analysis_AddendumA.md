# Centre Back Assessment — Research Gap Analysis
## Addendum A to Build Handoff v2.0 · What the literature adds, and what we can actually build

**Date:** 19 July 2026 · **Scope:** 9 papers supplied + 3 added · **Constraint:** mobile + desktop only, no in-person testing by us
**Companion doc:** `Centre_Back_Module_Build_Handoff_v2.md`

---

## 0. How to read this

I checked every paper against three questions:

1. **Does it contain something the Center Back codex doesn't already have?**
2. **Can we act on it with a phone, a laptop, uploaded film, and optional self-reported test results?**
3. **If yes to both — what exactly changes in the build?**

Papers that only confirm what the codex already asserts are marked *corroborating*. They're still valuable — they turn assertions into sourced claims, which matters for the claims register (Handoff §14.4) — but they don't change the product.

**Verification status.** Seven of the nine were read at abstract level or deeper; the Euro 2024 paper was read in full including its results tables. Two (*Quantifying and modelling game speed outputs*, 2022; *Position-specific physical and technical demands*, 2021) I have treated as corroborating rather than additive, because their reported direction matches several papers I did verify directly. Verify them yourself before citing either in external material.

---

## 1. Verdict — the one-page scorecard

| # | Paper | New to us? | Buildable on phone/desktop? | Priority |
|---|-------|-----------|----------------------------|----------|
| 1 | **Towlson et al. 2017** — Relative age, maturation & physical biases on position allocation | **Yes — the biggest single gap** | **Yes** — self-reported height, weight, age, parents' heights | **P0** |
| 2 | **Chen, Zmijewski & Bradley 2025** — Euro 2024 reference values, 13 roles | **Yes — twice over** (CB is three roles; measured event benchmarks) | **Yes** — one extra question + a reference table | **P0** |
| 3 | **Forcher et al. 2022** — Formation influence ("centre backs work hardest in a back three") | Partly — codex has tactical-system integration, but no demand consequence | **Yes** — same question as #2 | **P1** |
| 4 | **Bortnik et al. 2024** — Transitional play demands | **Yes** — the accel/decel exception | **Yes** — reshapes the challenge library | **P1** |
| 5 | **Rebelo et al. 2013** — U19 anthropometrics, fitness & skills by level and position | Partly — codex has benchmark values, but not *level-discriminating* ones | **Yes** — defines the optional test battery precisely | **P1** |
| 6 | **Ade, Fitzpatrick & Bradley 2016** — High-intensity efforts & movement patterns | **Yes** — movement-pattern specificity | Partly — drill design yes, measurement no | **P2** |
| 7 | **Morgans et al. 2022** — Academy vs senior, Scottish Premiership | **Yes** — youth/senior comparability | Partly — informs age-banding of benchmarks | **P2** |
| 8 | *Game speed outputs, 2022* | No — corroborating | Limited | P3 |
| 9 | *Position-specific demands, 2021* | No — corroborating | Limited | P3 |

**Three papers you were missing** (added in §9): the FAI maturation-by-position study, the Khamis–Roche method paper, and the smartphone jump-validity work. The first changes the product; the other two are the mechanisms that let us build it.

### The headline

> **Eight of the nine papers are about physical and running demands — the axis your archetype system deliberately under-weights, and the axis a phone can least measure.** That sounds like bad news. It isn't. Two things fall out of them that materially improve the product, and one of them is arguably the most important design decision in the whole youth app.

And a bonus, buried in the variance statistics: **individual variation between centre backs dwarfs the differences between positions.** At Euro 2024, intra-positional coefficient of variation for centre backs was roughly 30–36% for high-intensity distance and 49–69% for sprint distance. Two centre backs at the same tournament, same role, differ from each other far more than the average centre back differs from the average defensive midfielder. The physical literature's own error bars are an argument for exactly what your codex is built on: **individualise by style, not by position label.**

---

## 2. P0 · The finding that changes the product: maturation bias

### What the research says

Towlson et al. (2017) assessed 465 elite-youth players across U13–U18 in English development centres. At U13–14, **central defenders and goalkeepers were taller, heavier, and more advanced maturers than every other outfield position** — and central defenders were also *relatively older* within the selection year than lateral defenders and central midfielders. Position-specific *fitness* differences didn't emerge until U15–16 and U17–18. Their conclusion is blunt: relative age, maturation and body size bias allocation into the key defensive roles from an early stage, and position allocation should be treated as **plastic** until players are fully mature.

A second study (Finnegan/Sweeney et al., Ireland's national pathway, U13–U16, n=159) put a number on it by position. Using percentage of predicted adult height, a selection bias favouring early maturers was present for most positions — and it was **largest by a wide margin for central defenders (D = 1.65)**.

### Why this matters more to you than to anyone else

You are building a youth centre-back product. The literature says the centre-back position is *the* position where being physically ahead of your peers most distorts who gets selected — and your codex currently amplifies that. Two things in the corpus point the wrong way:

- **"Physical courage" is named as the #1 identification criterion for youth centre backs.** Physical courage in a 12-year-old is very hard to separate from being bigger than everyone else. A late maturer who's 14 months behind biologically isn't lacking courage; he's lacking 15 cm and 12 kg.
- **The Colossus archetype is defined by physical dominance.** For a 13-year-old, "physically dominant" is substantially a statement about maturation timing, not about identity.

Run the app as currently specified on a squad of 13-year-olds and it will hand "Colossus" to the early maturers and something else to the late ones. Two years later, half of those labels will have inverted. That is a product that is confidently wrong about children — the worst possible outcome for a brand built on accuracy.

### The fix — and it's fully buildable on a phone

Estimate maturity status, and use it as **context on the result**, not as an input to the archetype.

**Method: Khamis–Roche percentage of predicted adult height (%PAH).** Chosen because it needs no equipment at all.

| Input | Source | Notes |
|-------|--------|-------|
| Decimal age | DOB (already collected at the consent gate) | free |
| Standing height | Self-report | ask for a recent measurement |
| Body mass | Self-report | see the safeguarding rule below |
| Mid-parent height | Self-report of both birth parents' heights | apply the standard over-estimation correction — self-reported parental height is known to run high |

**Output bands** (the convention used in the bio-banding literature):

| Band | %PAH | What the player is told |
|------|------|------------------------|
| Pre-PHV | ≤ 87% | "You haven't hit your growth spurt yet. Everything about your physical game will change." |
| Circa-PHV | 88–95% | "You're in it right now. Expect co-ordination to feel off — that's normal and it passes." |
| Post-PHV | > 95% | "You're most of the way to your adult size. What you build now is what you'll play with." |

**Accuracy, stated honestly:** median error is around 2 cm for males aged 4–18, and self-reported parental heights widen that. This is a *band*, not a measurement. Never display a predicted adult height in centimetres to a teenager — display the band and what it means for training.

**Why not the Mirwald maturity-offset equation?** It needs sitting height, measured on a box against a wall, and sitting-height error is the dominant error term in that equation. Asking a 14-year-old to self-report sitting height accurately is not realistic. Khamis–Roche avoids it entirely.

### How maturity band changes the output

Three specific behaviours, all cheap to build:

1. **Archetype is never adjusted by maturity.** Archetype is a style construct from self-report. Nothing physical touches it. (If it did, the app would be re-encoding the exact bias the research warns about.)
2. **The development plan is adjusted.** Circa-PHV → reduce plyometric and heavy-landing volume, increase co-ordination and movement-quality work, and say why. Pre-PHV → technical and reading emphasis, and an explicit note that physical dominance is not the measure yet.
3. **The reflect-back copy gets one extra line for pre- and circa-PHV players.** Something like: *"You're not done growing. Your archetype describes how you think about defending — not how big you are. Both of those can change; one of them is going to."*

That single line is the most protective thing in the entire product, and it costs nothing.

### Safeguarding rule (extends Handoff §14.3)
Height and weight are collected **solely** to compute the maturity band. Never displayed back as a judgement. **No BMI, no body-fat estimate, no "ideal weight", no comparison of the player's body to an elite benchmark, ever.** The maturity band is framed as information about timing, not about adequacy.

---

## 3. P0 · Centre back is not one role — it's three

### What the research says

Chen, Zmijewski & Bradley (2025) analysed all 51 matches at UEFA Euro 2024 using optical tracking, and split defenders into five specialised roles — three of which are centre backs:

- **CB4** — centre back in a four-defender formation (n = 122 observations)
- **CB3O** — *outside* centre back in a back three (n = 55)
- **CB3C** — *middle* centre back in a back three (n = 31)

These behave measurably differently. Outside centre backs in a back three were more likely to cover greater volume than centre backs in a four, and carry ball-progression responsibility in build-up — the authors point to Calafiori and Rodríguez as the archetype of that evolving role. Forcher et al. (2022) found the same thing from the opposite direction in the Bundesliga: **centre backs recorded their highest sprinting distances when playing in a back three** (3-4-3, 3-5-2) compared with every other formation.

### What your codex has, and what it's missing

The codex has a rich Tactical System Integration document with archetype-by-formation compatibility scores. What it doesn't have is the **player-facing consequence**: the app never asks what system the player plays in, so every result and every plan is formation-blind.

### The build change — one question, large payoff

Add to the profile (not the assessment — it's a fact, not a preference):

> **Where do you play?**
> · Centre back in a back four
> · Outside centre back in a back three
> · Middle centre back in a back three
> · It changes / I'm not sure

This single answer then drives:

| Downstream | Effect |
|-----------|--------|
| **Benchmarks** | Different reference column (see §4 table) |
| **Plan emphasis** | CB3O → more ball-carrying, ball progression, wide recovery running. CB3C → more aerial and organisation work. CB4 → duel and partnership work. |
| **Archetype fit copy** | "You're a Libero playing as the middle of a three — that's the role your archetype was made for." Or: "You're an Architect in a back four; the outside slot in a three would suit you." **This is a genuinely valuable, sellable insight and no consumer app does it.** |
| **Partnership module** | Back three has two partners, not one. The whole partnership framework currently assumes a pair. |

### Reference values — Centre Back, UEFA Euro 2024

Per full match (90 min + added time), mean ± SD. Source: Chen et al. 2025, *Biology of Sport* 42(3):257–268.

| Metric | CB4 (back four) | CB3O (outside of three) | CB3C (middle of three) |
|--------|-----------------|------------------------|-----------------------|
| Total passes | 61.7 ± 24.3 | 51.2 ± 21.0 | 52.3 ± 21.5 |
| Pass completion | 91.3 ± 7.0% | 87.6 ± 7.4% | 91.3 ± 6.4% |
| Forward passes | 19.9 ± 9.8 | 19.9 ± 9.8 | 16.7 ± 7.0 |
| Forward pass completion | 79.5 ± 13.5% | 77.1 ± 15.0% | 81.3 ± 12.7% |
| Total ball touches | 121.3 ± 44.4 | 105.4 ± 37.4 | 102.1 ± 40.0 |
| One-touch play | 11.9 ± 4.8 | 11.4 ± 5.3 | 10.8 ± 4.3 |
| **Ball recoveries** | 5.6 ± 2.7 | 5.1 ± 2.3 | **6.4 ± 2.7** |
| Tackles | 1.1 ± 1.1 | 1.4 ± 1.1 | 1.0 ± 0.9 |
| **Aerial duels** | 1.5 ± 1.4 | 1.8 ± 1.5 | **2.0 ± 1.8** |
| Solo runs into attacking third | 0.8 ± 1.2 | **1.1 ± 1.5** | 0.3 ± 0.5 |
| Peak 1-min high-intensity distance | 50.8 ± 17.4 m | 58.1 ± 22.4 m | 54.1 ± 16.1 m |
| Total distance (approx, all CB roles) | ~9.7–10.1 km | | |

Two things jump out and both are product-relevant:

- **Ball recovery is the centre back's defining volume metric.** All three CB roles recovered the ball more often than wing backs, central midfielders, attacking midfielders, wide forwards and both forward types. If you want one number that says "this is what a centre back does more than anyone else," it's this one — and it's countable from film.
- **The middle centre back of a three is the recovery and aerial hub** (highest recoveries, most aerials, fewest attacking-third runs), while the **outside centre back of a three is the progressor** (most attacking-third solo runs of the three CB roles, highest peak 1-min intensity). Those are two different jobs sharing one position name.

### Two mandatory caveats on this table

1. **Sample sizes are small for the back-three roles** (n = 31 and 55 player-observations). Treat CB3C and CB3O columns as indicative.
2. **Never show these as targets to a youth player.** These are senior international men at a major tournament. The correct UI is a *band* with the label "what this looks like at the top of the men's international game" — context, not a goal. See §6.

---

## 4. P1 · The centre back's physical signature is not distance

### What the research says

Four papers converge on the same picture, and it's worth stating plainly because it's counter-intuitive:

- **Centre backs cover the least ground of any outfield position.** At Euro 2024, total distance was lowest for centre backs (~9.7–10.1 km) and highest for central and defensive midfielders (~11.4–11.9 km). High-intensity (≥20 km·h⁻¹) and sprinting (≥25 km·h⁻¹) distances were lower for all centre back roles than for wide defenders, attacking midfielders and forward pairs. Morgans et al. (2022) found the same in the Scottish Premiership: centre backs covered 1,297 m less total, 350 m less high-intensity and 167 m less sprint distance than wide midfielders.
- **But there is one exception, and it's the interesting one.** Bortnik et al. (2024), analysing 10 Ekstraklasa matches with 10 Hz GPS and 4,249 positional observations, found centre backs had the lowest physical outputs of every position **except for accelerations and decelerations during defensive transitions**.
- **And the movement shape is distinctive.** Ade, Fitzpatrick & Bradley (2016) coded the movement patterns around high-intensity efforts in the Premier League and found **centre backs completed more 0–90° turns than full backs, central midfielders and wide midfielders**, and a greater proportion of 0–90° turns after efforts than full backs. Centre backs also finished most of their efforts in the middle third, and out of possession did comparatively more tracking of opposition runners.

### Translation

> A centre back's physical game is **not volume, and not top speed. It's braking, turning and re-accelerating in short spaces, under defensive transition, over and over.**

### What this changes in the build

**The Body pillar in the challenge library (Handoff §10) is currently wrong for this position.** Week 1 for the Libero has 20 m recovery sprints; that's fine but it's a fraction of the picture. The pillar should be rebuilt around four movement families:

| Family | Why | Example challenge |
|--------|-----|-------------------|
| **Decelerate & re-accelerate** | The one metric where CBs are *not* lowest | 10 × sprint 15 m → hard stop in a 2 m box → sprint back 10 m |
| **0–90° turns under a call** | The signature CB movement pattern | Partner calls left/right at random; turn and go, 12 reps |
| **Repeated short efforts, not long runs** | CB peak 1-min HI ≈ 50–58 m — that's a *short* burst, not a shuttle set | 6 × 20 s max-effort mixed movement, 60 s rest |
| **Jump and land** | Aerials are low-frequency but high-consequence | Jump-landing quality work, age-gated for heading (Handoff §10) |

**And the counter-message matters as much as the training.** A 15-year-old centre back who sees a teammate's GPS watch showing 11 km while he covered 9 km will conclude he's lazy or unfit. He isn't — he's playing the position correctly. Build that into the copy: *"Centre backs cover the least ground in the team. That's the job, not a weakness. What you're measured on is what happens in the eight seconds after we lose the ball."*

That reframe is the kind of thing that makes a young player feel understood, which is the whole retention thesis of the app.

---

## 5. P1 · The optional test battery — exactly two tests matter most

### What the research says

Rebelo et al. (2013) compared 95 elite and 85 non-elite U19 players across five positions on 5 m and 30 m sprints, agility, squat jump, countermovement jump, strength, Yo-Yo IE2, ball control and dribbling.

For **central defenders specifically**, two tests separated elite from non-elite with large effects (d > 1.2):

1. **Squat jump**
2. **Ball control**

Stature and body mass also discriminated elite from non-elite among centre backs and goalkeepers (d > 0.6) — which, read alongside Towlson 2017, is at least partly the same maturation/selection story rather than a pure performance story. Agility and Yo-Yo IE2 separated elite from non-elite across *all* positions, so they're general markers rather than CB-specific ones.

### Why this is genuinely useful

You don't need a twenty-test battery. For a centre back, the literature points at **one power test and one technical test**. That is a battery a 15-year-old will actually complete, and it maps cleanly onto two of your five pillars (Body and Ball).

### The "Verified Profile" module — three tiers

Optional throughout. It never gates the archetype result; it enriches the plan and the benchmarks.

| Tier | What | How it's captured | Confidence |
|------|------|-------------------|-----------|
| **T0 — Declared** | Age, height, weight, parents' heights, role (§3), level, sessions/week, preferred foot | Self-report at profile setup | Low, sufficient for maturity band |
| **T1 — Phone-measured** | **Squat jump / CMJ** via slow-motion video flight time; **ball control** count in 30 s via video; 10 m/30 m sprint via two cones and a fixed camera | In-app camera, guided | Medium — good for tracking *change*, weak for absolute comparison |
| **T2 — Coach-verified** | Results from a real testing session: timing-gate sprints, jump mat or force-plate CMJ, Yo-Yo IR1/IE2, 505 agility, standing reach + max reach | Player or coach enters values; coach code marks it verified | High |

**On the phone-measured jump.** Smartphone slow-motion flight-time measurement is a validated approach — apps in this family show strong agreement with force platforms for jump height (r ≥ 0.93 in one comparison, near-perfect Bland–Altman agreement for jump height in another), though systematic bias exists: one study found phone-derived flight times ran 3–6% shorter than force-plate values. The honest implication for the product:

> **Use it for within-player change over time. Do not use it for cross-player leaderboards or absolute comparison against published elite values.** Different phones, different frame rates, different camera positions. A player's jump going from 34 cm to 39 cm on the same phone is real information. That same 39 cm compared to another kid's phone is not.

Also: standardise the capture or the number is noise. Fixed camera height, 2 m distance, feet in frame, 240 fps if available, three attempts, take the best. Show the protocol as a 15-second animation before the first attempt.

### Design rule: verified data never re-classifies the archetype

Say it in the code comments and in the product. A slow 30 m does not turn a Colossus into a Sentinel. Archetype is *how you think about defending*. Physical data changes:
- the **plan** (which pillar gets the extra session)
- the **context** (which benchmark band is shown)
- the **progress** view (personal bests over time)

Nothing else. If physical inputs could move the archetype, the app would relabel every player at their growth spurt — and would re-encode the maturation bias from §2 straight back into the product.

---

## 6. The benchmark audit — your numbers vs measured tournament data

This is uncomfortable but it's the most commercially useful section here.

Several per-match figures in the codex differ substantially from the Euro 2024 measured values. Definitions vary between data providers, and UEFA hasn't published operational definitions for its event metrics (the paper's authors flag that themselves as a limitation), and international tournament football differs from league football. So this is not "the codex is wrong." It is: **every benchmark in the app needs a source and a definition attached to it, and some of these need revisiting before a player sees them.**

| Metric | Codex value | Euro 2024 measured (CB4) | Assessment |
|--------|-------------|--------------------------|-----------|
| Aerial duels / match | "4–7" (Colossus); **"12–18"** (CB in 4-4-2) | **1.5 ± 1.4** | ⚠️ **Largest gap.** Even with generous definitional differences, 12–18 contested aerials per match is not supportable. Fix before launch. |
| Tackles / match | 1.0–3.0 | 1.1 ± 1.1 | ✅ Consistent |
| Total distance | 9–10.5 km | ~9.7–10.1 km | ✅ Consistent |
| Distance, Libero | "10.5–12 km — highest in position" | CBs lowest in the team | ⚠️ Direction is fine within CB archetypes; the wording reads as "highest on the pitch," which is the opposite of the finding |
| Passes / match | 40–60 | 61.7 ± 24.3 | ⚠️ Codex low |
| Touches / match | 50–75 | 121.3 ± 44.4 | ⚠️ Codex substantially low |
| Pass completion | 85–92% | 91.3 ± 7.0% | ✅ Consistent |
| Progressive passes | 2–6 | forward passes 19.9 ± 9.8 | ℹ️ Different definitions — "forward pass" ≠ "progressive pass." Label which you mean. |
| Interceptions / match | 4–7 (Sentinel, "highest") | not reported; **ball recoveries 5.6 ± 2.7** | ℹ️ Plausible if you mean recoveries. Rename the metric to match a source. |
| Clearances / match | 5–10 | not reported | ❓ Unsourced |

**Actions:**
1. Fix the aerial duel figure before any player-facing surface ships. A young centre back told that elite CBs win 4–7 aerials a match, who then counts two in his own game, will conclude he's failing at the thing his archetype is named for.
2. Add a `source` and `definition` field to every benchmark object in the position pack. If a benchmark has no source, it doesn't render.
3. Present all benchmarks as **bands with variance shown**, never point targets — the tournament CVs for CB sprint distance were 49–69%, which means the "average" is close to meaningless as an individual goal.

---

## 7. What these papers do *not* cover — and why that's good news

Worth being explicit, because reading nine physical-demands papers can make it feel like the codex has been outflanked. It hasn't. None of these papers address:

- **Playing style or archetype.** No paper here profiles *kinds* of centre back. Your four-archetype system has no competitor in this literature.
- **Decision-making, anticipation and reading.** The Sentinel's entire domain is untouched by these nine papers.
- **Psychology, leadership, communication.** The Voice pillar is absent from all of them.
- **The centre-back partnership.** Nothing here on pairing, chemistry, or complementary roles — your strongest differentiator, and the newest thing in the whole project.
- **Longitudinal development pathways.** These are cross-sectional match-demand snapshots. Your ages 8–21 pathway is a different kind of asset entirely.
- **The women's game.** Every one of the nine is a male sample. Your Women's Football Adaptation document cannot inherit these benchmarks. Flag that explicitly wherever they're used.

**So the honest positioning is:** this literature is the **floor** — the sourced, defensible physical facts that stop a sports scientist dismissing the product. Your codex is the **building**. Bolt the floor underneath it; don't mistake it for the building.

---

## 8. Technology reality — what a phone can and can't do

The hard constraint from your brief: film analysis is possible, but we can't be physically present. Here's the honest capability map.

| Metric | Can we get it? | How | Confidence |
|--------|---------------|-----|-----------|
| Maturity band (%PAH) | ✅ **Yes** | Self-report: age, height, weight, parents' heights | Medium — band-level, ~2 cm median error |
| Role (CB4/CB3O/CB3C) | ✅ **Yes** | One profile question | High |
| Vertical jump | ✅ Yes | Slow-motion video, flight-time method | Medium — good for change, poor for absolute |
| Ball control / juggling count | ✅ Yes | Video, counted | Medium-high |
| 10 m / 30 m sprint | ⚠️ Partly | Two cones, fixed camera, frame counting | Low-medium — camera angle and start method dominate the error |
| Ball recoveries, aerials, duels, forward passes | ✅ **Yes, from film** | Manual/assisted tagging (see below) | Medium-high — depends on the tagger |
| Total distance, high-intensity distance, sprint distance | ❌ **Not from a phone in a pocket** | Consumer phone GNSS is not adequate for high-speed running metrics | — |
| Same, via a wearable | ⚠️ Import only | Player enters or imports a summary from a GPS vest or sports watch | Medium — device-dependent, non-comparable across brands |
| Accelerations / decelerations | ❌ Not reliably | Needs 10 Hz+ trunk-mounted units, as in Bortnik et al. | — |
| 0–90° turns | ❌ Not as a metric | Use it as a **drill design principle** and a coaching cue, not a measurement | — |

**The rule that follows:** anything we can't measure becomes **coaching content**, not a number. The Ade 2016 turning finding doesn't become a "turn score" — it becomes the reason a drill exists. That's still the finding doing real work in the product; it just isn't pretending to be data.

### Film analysis — a realistic v1

Not automatic tracking. **Assisted tagging**: the player (or a parent, or a coach) uploads a clip or a full match and taps a button when an event happens. Six taggable events, chosen because each is countable by a non-expert and each has a published reference value:

| Tag | Why this one | Euro 2024 reference (CB4) |
|-----|-------------|--------------------------|
| Ball recovery | The centre back's defining volume metric | 5.6 ± 2.7 |
| Aerial duel (contested / won) | Core to Colossus, and currently mis-benchmarked in the codex | 1.5 ± 1.4 |
| Ground duel (contested / won) | Core to Colossus and Libero | tackles 1.1 ± 1.1 |
| Forward pass (attempted / completed) | Core to Architect; a genuinely checkable, motivating number | 19.9 ± 9.8 @ 79.5% |
| Solo run into the attacking third | The Libero / progressor signature; separates CB3O from CB3C | 0.8 ± 1.2 |
| Recovery run tracking a runner | Core to Sentinel and Libero; no published count, so track it against the player's own history | — |

Later, this same tagged data becomes the labelled training set for the auto-classifier (Handoff §13.1). **The tagging feature is not just a feature — it's the data collection strategy.** Which is the same argument as the assessment being the labelling machine: build the thing that generates your future dataset first.

---

## 9. Three papers that weren't on your list, and should be

| Paper | Why you need it |
|-------|----------------|
| **Sweeney, Cumming et al. (2023)** — *The selection advantages associated with advanced biological maturation vary according to playing position in national-level youth soccer.* Science and Medicine in Football / PMC10286617 | 159 players, U13–U16, Football Association of Ireland pathway. Quantifies maturation selection bias by position — **largest for central defenders (D = 1.65)**. This is the single most directly relevant paper to a youth centre-back product that exists, and it wasn't in the set. |
| **Khamis & Roche (1994)** — *Predicting adult stature without using skeletal age.* Pediatrics 94(4):504–507 | The method itself. You need it to implement §2, and you need to cite it when someone asks how the maturity band is calculated. |
| **Balsalobre-Fernández et al., and the Jumpo/My Jump validation literature** (e.g. PeerJ 2023; Sensors 2024, PMC11679296) | The evidence base for measuring a jump with a phone. Needed to justify the T1 tier in §5, and to state its limits honestly. |

---

## 10. Concrete changes to Handoff v2.0

Edits by section, so this can be actioned directly.

| Handoff § | Change | Priority |
|-----------|--------|----------|
| **§4 Position pack** | Add `roles` (CB4/CB3O/CB3C), `benchmarks` (per role, each with `source` + `definition` + `population` fields), `maturityBands`, and `tests` to the schema | P0 |
| **§4 Invariants** | Add: every benchmark object must have a non-empty `source`, or it doesn't render | P0 |
| **§5 Assessment** | Unchanged. **Do not add physical questions to the 12.** The assessment stays a style instrument; physical data lives in the profile. | — |
| **§9 Plan engine** | Add a maturity modifier: circa-PHV → reduce plyometric/landing volume, raise co-ordination work, explain why. Add a role modifier per §3. | P0 |
| **§9 Week 1 content** | Rebuild the Body pillar around decelerate/re-accelerate, 0–90° turns, short repeated efforts, jump-and-land (§4) | P1 |
| **§10 Challenge schema** | Add `maturityBands` (which bands a challenge is appropriate for) alongside the existing `restrictions` | P0 |
| **§11 Readiness score** | Unchanged formula. Add a rule: no benchmark comparison is shown to a pre-PHV player without the band context. | P1 |
| **§12 Screens** | New profile screens: role question; optional Verified Profile (T0/T1/T2). Both **after** the reveal — nothing physical touches the first-run experience. | P1 |
| **§13.1 Auto-classifier** | Note that film tags (§8) are a second labelling channel alongside the self-report result | P2 |
| **§14.3 Body image** | Extend: height/weight collected for maturity band only; never displayed as judgement; no BMI, body fat, or weight targets | P0 |
| **§14.4 Claims register** | Add the aerial-duel figure and the Libero distance claim as items to resolve before launch (§6) | P0 |
| **Women's adaptation** | Add a standing note: all nine papers are male samples; none of these benchmarks transfer | P1 |

### One new profile question (not part of the 12)

> **Where do you play?**
> · Centre back in a back four · Outside centre back in a back three · Middle centre back in a back three · It changes / not sure

### Three new profile fields (optional, skippable, after the reveal)

> Your height · Your weight · Your birth parents' heights
> *Why we ask: it lets us tell you where you are in your growth, which changes what training is right for you now. We never show this to anyone else and we never use it to judge your body.*

That last line is not decoration. It's the difference between a parent letting a 14-year-old use the app and a parent deleting it.

---

## 11. Reading list with full citations

For the claims register. Every one is a real, checkable source.

| # | Citation | ID |
|---|----------|-----|
| 1 | Towlson C, Cobley S, Midgley AW, Garrett A, Parkin G, Lovell R. Relative Age, Maturation and Physical Biases on Position Allocation in Elite-Youth Soccer. *Int J Sports Med.* 2017;38(3):201–209. | PMID 28219108 · doi:10.1055/s-0042-119029 |
| 2 | Chen S, Zmijewski P, Bradley PS. Establishing reference values for the match running performances of thirteen specific positional roles at UEFA Euro 2024. *Biol Sport.* 2025;42(3):257–268. | PMID 40657008 · doi:10.5114/biolsport.2025.148535 |
| 3 | Forcher L, Forcher L, Jekauc D, Woll A, Gross T, Altmann S. Center backs work hardest when playing in a back three: The influence of tactical formation on physical and technical match performance in professional soccer. *PLoS One.* 2022;17(3):e0265501. | PMID 35298531 · doi:10.1371/journal.pone.0265501 |
| 4 | Bortnik L, Bruce-Low S, Burger J, Alexander J, Harper D, Morgans R, Carling C, McDaid K, Rhodes D. Physical match demands across different playing positions during transitional play and high-pressure activities in elite soccer. *Biol Sport.* 2024;41(2):73–82. | doi:10.5114/biolsport.2024.131815 |
| 5 | Rebelo A, Brito J, Maia J, Coelho-e-Silva MJ, Figueiredo AJ, Bangsbo J, Malina RM, Seabra A. Anthropometric characteristics, physical fitness and technical performance of under-19 soccer players by competitive level and field position. *Int J Sports Med.* 2013;34(4):312–317. | PMID 23059558 · doi:10.1055/s-0032-1323729 |
| 6 | Ade J, Fitzpatrick J, Bradley PS. High-intensity efforts in elite soccer matches and associated movement patterns, technical skills and tactical actions. Information for position-specific training drills. *J Sports Sci.* 2016;34(24):2205–2214. | PMID 27537056 · doi:10.1080/02640414.2016.1217343 |
| 7 | Morgans R, Bezuglov E, Orme P, Burns K, Rhodes D, Babraj J, Di Michele R, Oliveira RFS. The Physical Demands of Match-Play in Academy and Senior Soccer Players from the Scottish Premiership. *Sports.* 2022;10(10):150. | doi:10.3390/sports10100150 |
| 8 | *Quantifying and modelling the game speed outputs of professional soccer players* (2022) | **Not independently verified — corroborating only** |
| 9 | *Position-specific physical and technical demands during match-play in professional soccer* (2021) | **Not independently verified — corroborating only** |
| +1 | Sweeney L, Cumming SP, et al. The selection advantages associated with advanced biological maturation vary according to playing position in national-level youth soccer. | PMC10286617 |
| +2 | Khamis HJ, Roche AF. Predicting adult stature without using skeletal age: the Khamis-Roche method. *Pediatrics.* 1994;94(4):504–507. | — |
| +3 | Smartphone jump-measurement validation literature (Jumpo 2 / My Jump 2 / My Jump Lab) | PeerJ 2023 (PMC9884043) · Sensors 2024 (PMC11679296) |

---

## 12. Honest limitations of this analysis

State these internally so nobody over-claims later.

1. **These are senior elite men.** Euro 2024, Bundesliga, Premier League, Ekstraklasa, Scottish Premiership. The product's user is a 13–18 year old, mostly non-elite. Rebelo 2013 (U19) and Towlson 2017 (U13–18) are the only genuinely youth-relevant papers in the set.
2. **Morgans et al. found no significant physical differences between the first team and U-18s at that club** — encouraging for using senior *shape* as a directional reference for older youth, but it's one club, 16 youth players, and it says nothing about U-14s.
3. **Small samples for the back-three centre back roles** (n = 31 and 55 observations). Directional, not definitive.
4. **Event definitions are inconsistent across providers**, and UEFA hasn't published operational definitions for the Euro 2024 metrics — the authors say so themselves. Which is exactly why every benchmark in the app needs its definition stored alongside its value.
5. **Cross-sectional, not longitudinal.** Nothing here tracks a player over time, so nothing here supports a trajectory claim. That constraint sits directly on top of Handoff §13.2.
6. **No women's data.** None of it transfers.
7. **I read seven of the nine directly and one in full.** Papers 8 and 9 are marked corroborating and should be read before citing.

---

## 13. What I'd do next

1. **Add the maturity band.** Highest value per hour of work in the entire project. Four self-reported numbers, one equation, three bands, one extra line of copy on the result. It protects late-maturing players from a wrong label, protects the brand from being confidently wrong about children, and is a real, defensible differentiator no consumer football app has.
2. **Add the role question.** One tap, and it makes the benchmarks, the plan and the archetype-fit copy meaningfully sharper.
3. **Fix the aerial duel benchmark** and put `source` on every number before anything ships.
4. **Rebuild the Body pillar** around braking, turning and short repeated efforts.
5. **Spec the film-tagging module** with the six events in §8 — it's the second data channel for the classifier, and it's the feature a coach would actually pay for.
6. **Leave the 12 assessment questions alone.** Nothing in this literature suggests changing them. The assessment measures style; everything here is physical context that sits around it.

---

*Addendum A to Centre Back Module Build Handoff v2.0 · The Footballer's Academy · Position 2 of 7*
