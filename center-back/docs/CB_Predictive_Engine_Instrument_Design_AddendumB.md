# The Predictive Engine — Instrument Audit & Expansion
## Addendum B to Build Handoff v2.0 · What we measure now, what else a screen can measure, and what we should refuse to build

**Date:** 19 July 2026 · **Constraint:** phone, tablet, desktop, uploaded film. No hardware. No in-person testing by us.
**Companion docs:** `Centre_Back_Module_Build_Handoff_v2.md` · `Centre_Back_Research_Gap_Analysis.md`

---

# PART I — AUDIT OF THE CURRENT BATTERY

## 1. What we actually have

| # | Instrument | What it measures | Method | Status |
|---|-----------|------------------|--------|--------|
| 1 | **12 scenario questions** (Handoff §5) | Self-concept: how the player *believes* they defend | Self-report, forced choice | Built (spec) |
| 2 | **Role question** (Gap Analysis §3) | Context: CB4 / CB3O / CB3C | Self-report, factual | Specced |
| 3 | **Maturity band** (Gap Analysis §2) | Growth timing | Self-report anthropometrics → Khamis–Roche | Specced |
| 4 | **Verified Profile T1** (Gap Analysis §5) | Squat jump, ball control, sprint | Phone video | Specced |
| 5 | **Verified Profile T2** | Full test battery | Coach-entered | Specced |
| 6 | **Film tags** (Gap Analysis §8) | Six countable match events | Manual tagging | Specced |

## 2. The problem, stated plainly

**Five of these six measure the same thing in the same way: the player tells us about themselves.** Instruments 4 and 5 are the exception, and they measure the body, not the style.

That means the current archetype engine has three structural weaknesses:

### 2.1 Single-method monoculture
Every archetype signal comes from one method — introspective self-report. Anything that distorts self-report distorts the whole result: social desirability (nobody picks "I go long and hide"), aspiration bleeding into description (Q11 explicitly asks who you *want* to be), limited self-insight (a 14-year-old genuinely may not know how he defends), and the fact that a player's self-image is heavily shaped by what his current coach praises him for.

A measurement built on one method can never detect its own bias. **Adding a second method that measures the same construct differently is the single largest available improvement to accuracy** — and, as it turns out, it's also the best product feature in this document (§9).

### 2.2 The scoring is ipsative, and that has consequences
Because every question forces one choice among four archetypes, the four scores are locked to each other: they always sum to 14. If Colossus goes up, something else must come down.

In plain terms: **the instrument produces a profile, not scores.** It can answer *"which of the four is most me?"* It cannot answer *"am I more of a Colossus than my teammate?"* — because the number depends on what else the player scored, not just on their Colossus-ness. This also means standard reliability statistics don't behave normally on it, so you can't properly measure how good it is.

That's fine for the reveal. It's a real limit on the engine. Fix in §8.3.

### 2.3 There is no ground truth, and there never will be
No test returns *Sentinel*. Archetype is a construct you invented — a good one, but a construct. So "accuracy" has to be defined against something, and the only honest candidate is **coach agreement**. This is unchanged from Handoff §13.1 and it constrains everything below: before measuring how accurate the app is, measure how much two coaches agree with each other. That number is your ceiling.

## 3. Psychometric health check on the 12 items

Six specific weaknesses, all cheap to address.

| Weakness | Why it matters | Fix |
|---|---|---|
| **Aspiration contaminates description** — Q11 asks who you want to play like; Q10 asks which compliment you'd most enjoy | Both are *ideal-self* items scored as if they were *actual-self*. Chapter 3 is weighted 1.5×, so this bias is amplified | Keep them (they're emotionally powerful and drive the reveal), but tag them `aspirational: true`. Compute a second **aspiration profile** alongside the identity profile. The gap between "who I am" and "who I want to be" is a development-plan input, not noise |
| **Social desirability** on Q5/Q6/Q7 | "I play through the press" sounds better than "I go long" to a modern academy player, regardless of what he does | Add the behavioural counterpart (§6.3) — a player can say he plays out and still choose long under a 1.2 s clock |
| **No response-time capture** | Free signal, currently discarded | Record latency per item. Fast + consistent = strong self-concept. Very fast on all 12 = careless responding, flag it |
| **No careless-response detection** | A bored 13-year-old tapping A-A-A-A produces a confident-looking Colossus | Flag: total time under 60 s, or 4+ identical option positions in a row, or Chapter 3 answered in under 8 s |
| **No normative anchor** | See §2.2 | Add an 8-item normative block (§8.3) |
| **Never validated** | We have no idea if it repeats | Run the test-retest study in §11 |

---

# PART II — THE DESIGN PRINCIPLE

## 4. The filter every new instrument must pass

Before designing anything, four questions. An instrument that fails any one of them doesn't get built, however impressive it sounds.

**1. Does it discriminate *between the four archetypes*?**
Not "does it measure something real." Not "do elite players score higher." Does a Colossus score differently from a Sentinel? A test where all four archetypes score the same is a fitness test, not a profiling instrument — no matter how good the science behind it.

**2. Can a phone measure it without lying?**
Not "can we display something." Can the number survive a mid-range Android in a kitchen with variable frame rates and browser timing jitter?

**3. Does it feel like football?**
A 14-year-old will not complete a Stroop task. He will complete the same task with a striker and a defender on it. Same measurement, one-tenth the drop-off.

**4. Is it robust to maturation?**
Following straight on from the Gap Analysis: any instrument where bigger, older-looking boys score better is re-encoding the selection bias we just built the maturity band to correct. Cognitive and decision instruments are *good* on this axis — that's a major point in their favour.

## 5. The reframe that makes all of this defensible

There's a large literature on cognitive testing in football, and most of it is trying to answer a question we are not asking.

Vestberg et al. (2012) found high-division players outperformed lower-division players on executive function tests, and that test scores correlated with goals and assists two seasons later. That study is famous, and it's also been pushed back on hard: executive function tests appear to be poor predictors of future potential within homogeneous groups; the "threshold hypothesis" suggests no additional benefit beyond a certain level; and there's a substantial critical literature on the whole idea of selecting young athletes on brain tests.

Note also the detail that should stop us dead: **the outcome variable in the headline study was goals and assists.** That is a metric a centre back essentially does not produce. Building a centre-back talent predictor on that foundation would be indefensible.

**So don't.**

> We are not predicting who will succeed. We are describing **how a player defends**. That is a much lower bar evidentially, a much more useful product, and — critically — an honest one.

A go/no-go inhibition task cannot tell you whether a 14-year-old will play professionally. Nobody's can. But it can tell you, from behaviour rather than self-report, whether he is a **stepper or a holder** — and that is precisely the Colossus↔Sentinel axis, measured directly.

Every instrument below is designed to answer *which kind*, never *how good*.

---

# PART III — THE INSTRUMENTS

## 6. Tier A — build these first

Four games. All buildable in a browser, all under two minutes, all unmistakably football, none dependent on hardware. Together they cover all four archetype axes behaviourally.

---

### 6.1 "What Happens Next?" — the Sentinel instrument
**Paradigm:** temporal occlusion. The most established method in sport anticipation research: show an unfolding attack, cut the display at a set moment, ask what happens next. Skilled players consistently outperform less-skilled ones, and — directly relevant here — the defensive version of this paradigm asks players to read the opponent's body information to anticipate intent, which is exactly what a centre back does.

**Player experience**
A 3–5 second attack plays. The screen cuts to black mid-move. Four options appear on a pitch diagram: *pass to the runner · through ball · shot · turn back*. Tap one. Twelve trials. Ninety seconds.

**The manipulation that matters**
Vary the occlusion point across three levels:
- **T1 — early:** before the ball is struck. Only body shape, hips, plant foot, scan direction available.
- **T2 — contact:** at the moment of the pass.
- **T3 — late:** 150 ms after contact, early ball flight visible.

**Output variables**

| Variable | Meaning |
|---|---|
| `accT1`, `accT2`, `accT3` | Accuracy at each occlusion level |
| **`earlyCueAdvantage` = accT1 − accT3** | **The headline.** Reading from pre-cues rather than from ball flight |
| `latency` | Decision speed |
| `confidenceCalibration` | If you ask for a confidence rating: does high confidence track accuracy? |

**Archetype mapping**
High `earlyCueAdvantage` → **Sentinel**. High accT3 with low accT1 → reactive rather than anticipatory, consistent with **Colossus**. Fast latency with lower accuracy → committer. Slow with high accuracy → deliberator.

**Build note — the footage problem, and the answer**
Do not use broadcast clips. Rights aside, they're inconsistent in angle and framing. Two clean options:
- **2D top-down animated reconstructions.** Fully rights-clean, perfectly consistent, occlusion point exact to the frame, and you can generate hundreds. Schematic displays are widely used in this literature. **This is the v1 answer.**
- **Film your own** with a partner academy, one fixed camera behind the defensive line. Better ecological validity, more work, and a good excuse to get into an academy.

**Honest limitation.** Video-based perceptual tests don't perfectly represent on-field performance — movement and gaze behaviour differ between watching a screen and standing on grass. So this is a measure of *how you read a picture of football*, not of how you defend. For style profiling that's acceptable. For a talent claim it wouldn't be. Don't overstate it.

---

### 6.2 "Step or Hold" — the Colossus↔Sentinel discriminator
**Paradigm:** go/no-go. Underneath, this is response inhibition — one of the paradigms already named in your own Phase 2 assessment document, where it was specified as a Go/No-Go tackle task requiring a 128-channel EEG rig. **Keep the paradigm. Drop the scanner. Measure the behaviour instead of the brain.** The behavioural output is the part that matters here, and it needs nothing but a screen.

**Player experience**
A striker receives with his back to goal. You have 800 ms.
- **Heavy first touch** → STEP (tap). The ball is there to be won.
- **Controlled touch, body set** → HOLD (do nothing). Stepping now gets you spun.

Forty trials, 70% go, randomised. Ninety seconds. It feels like a reflex game. It is a validated paradigm wearing a kit.

**Output variables**

| Variable | Meaning |
|---|---|
| `commissionRate` | Stepped when you should have held → **impulsivity / aggression** |
| `omissionRate` | Held when you should have stepped → **passivity / caution** |
| `goRT` | Speed of the decision to engage |
| `postErrorSlowing` | Do you become more cautious after being spun? → error sensitivity |

**Archetype mapping**
High commission → **Colossus** (front-foot, wins it, occasionally gets done). High omission with high accuracy → **Sentinel** (patient, positions instead of engaging). Low both → complete. `postErrorSlowing` is a bonus signal: large values suggest a player whose confidence is dented by mistakes, which is a direct input to the mental-training module.

**Why this one is device-proof**
It's built on **error rates under a fixed deadline**, not on millisecond reaction times. Browser and device timing jitter would wreck a precision RT measure; it barely touches an error-rate measure. Design around the instrument's weakness rather than pretending it isn't there.

**Highest priority of the four.** Cheapest to build, most fun, and it measures the single most important behavioural axis in the whole system.

---

### 6.3 "Play or Safety" — the Architect instrument
**Paradigm:** risk preference under time pressure. Not borrowed from sport science — borrowed from decision research, and better suited to the question than anything in the sports literature.

**Player experience**
You have the ball at the back. Four options illuminate:
- **Line-breaking pass** — high value, high risk
- **Carry into space** — medium value, medium risk
- **Full-back** — low value, low risk
- **Long and safe** — no value, no risk

A presser closes visually. A clock runs. Choose before it reaches you. Twelve trials, ninety seconds.

**The manipulations**
- **Time available:** 2.5 s vs 1.2 s
- **Match context:** 0–0 in the 20th minute vs 1–0 up in the 85th
- **Press intensity:** one presser vs two

**Output variables**

| Variable | Meaning |
|---|---|
| `riskIndex` | Mean risk value of chosen options |
| **`riskElasticity`** | **The headline.** How far risk-taking drops from 2.5 s to 1.2 s — this is *composure*, measured |
| `contextSensitivity` | Does the scoreline change your choice? → game intelligence |
| `carryPreference` | Share of trials where you take it yourself |

**Archetype mapping**
High `riskIndex`, low `riskElasticity` → **Architect** (plays through pressure). High elasticity → **Colossus** (goes long when it gets tight). High `carryPreference` → **Libero**. High `contextSensitivity` with moderate risk → **Sentinel** (right decision for the situation).

**Why it matters most for accuracy**
Chapter 2 of the questionnaire is the block most vulnerable to social desirability — every academy player in 2026 knows he's supposed to want the ball. This instrument catches the player who says he plays out and goes long under a 1.2 s clock. **That gap is the most valuable single datum the whole engine can produce.**

---

### 6.4 "Cover the Space" — the Libero instrument
**Paradigm:** positional judgement, scored by **bias direction rather than by error**.

**Player experience**
A top-down attack animates for 2 s and freezes. Drag your defender to where you should be. Ten scenarios, ninety seconds.

**The scoring insight**
Don't score distance from "correct." Score **which way you're wrong.** Every scenario is designed to pull in competing directions, and the direction of the pull the player yields to is the archetype:

| Scenario type | Pulls toward | Reads as |
|---|---|---|
| Striker holding, runner beyond | Tight to the man vs drop and cover | Colossus vs Libero |
| Ball wide, cross imminent | Attack the near post vs hold the danger spot | Colossus vs Sentinel |
| Midfield turnover, gap opening | Step to the ball vs fill the gap | Architect vs Libero |
| High line, ball played over | Hold the line vs drop early | Sentinel vs Libero |

**Output variables**

| Variable | Meaning |
|---|---|
| `ballwardBias` | Mean displacement toward the ball (aggression) |
| `depthBias` | Mean displacement toward your own goal (covering) |
| `lineDiscipline` | Variance in your positioning relative to the modelled line |
| `error` | Distance from the coach-panel reference position |

**Archetype mapping**
Positive `ballwardBias` → **Colossus**. Positive `depthBias` → **Libero**. Low `error` with low bias in either direction → **Sentinel**. High `lineDiscipline` variance → a stepper.

**Build requirement:** three or more qualified coaches independently set the reference position for each scenario; use the centroid, and discard any scenario where the coaches themselves disagree by more than a defined margin. **If coaches can't agree where the defender should be, the scenario isn't measuring anything.** That check is not optional.

---

### 6.5 Free signals — capture these tomorrow, they cost nothing

| Signal | Where | Value |
|---|---|---|
| **Per-item response latency** on the existing 12 | Already in the flow | Strong self-concept = fast, consistent answers on Chapter 3 |
| **Answer-change count** | Already in the flow | Hesitation on a specific dimension = genuine ambivalence, worth surfacing |
| **Chapter-3 vs Chapter-1 divergence** | Already computed | Says-vs-situational gap, available with zero new instruments |
| **Time of day / session completion** | Already logged | Careless-responding filter |

Build these into the prototype now. They cost one field each and they're the beginning of a behavioural layer.

---

## 7. Tier B — build second: the film layer

Film is the only instrument here that observes the player *actually playing football*. It's slower and needs a willing tagger, but its ecological validity is in a different class from everything in Tier A.

### 7.1 Scanning — the highest-value film measure in football

**What it is.** Scanning is defined in this literature as an active head movement where the player's face is temporarily directed away from the ball, to gather information about teammates, opponents and space before engaging with the ball. It's counted manually from video in the 10 seconds before the player receives, and expressed as scans per second.

**Why it matters.** Higher scanning frequency before receiving is associated with better on-ball outcomes — faster subsequent passes, more forward passes, more turns, higher likelihood of a successful pass. Elite players scan more than less-skilled players, and U19 players scan more than U17.

**Why it's perfect for us.** It's measured by manual video notation — exactly what a tagging module does. It requires no tracking system, no wearable, no rights-cleared data feed. A parent with a phone on a tripod and a tagging screen can produce it.

**Archetype relevance.** Scanning before receiving is the behavioural definition of the **Architect** ("I've already picked the pass") and the informational half of the **Sentinel**. A centre back who receives with 0.2 scans/sec and one who receives with 0.6 scans/sec are two different footballers, and neither of them knows it about himself.

**Implementation**
- Tagger marks each reception; the app auto-opens a 10 s look-back window; tagger taps once per head turn while scrubbing.
- Output: `scanFrequency` (scans/sec), plus `scanTiming` (how late the final scan is before the ball arrives).
- Ten receptions is enough for a first estimate; thirty is a stable one.

**Honest limitation.** One recent study found no evidence that visual exploratory activity separates super-elite from elite players. Read correctly, that means scanning discriminates well across the range we care about — youth, amateur, academy — and stops discriminating at the very top. For a youth product that's exactly the right sensitivity range. Say so; don't claim it identifies the next Van Dijk.

### 7.2 The revealed archetype signature

From the six film tags already specced (Gap Analysis §8), compute **ratios, not counts.** Ratios are robust to how much footage was tagged and to how good the player's team is.

| Index | Formula | Archetype |
|---|---|---|
| `physicalIndex` | (aerials contested + ground duels contested) ÷ total defensive actions | **Colossus** |
| `anticipationIndex` | ball recoveries ÷ (ball recoveries + tackles) — *winning it without having to tackle* | **Sentinel** |
| `progressionIndex` | (forward passes ÷ total passes) × forward pass completion | **Architect** |
| `coverageIndex` | (recovery runs + solo runs into attacking third) ÷ 90 min | **Libero** |
| `scanFrequency` | §7.1 | **Architect / Sentinel** |

Normalise against the player's own age-and-level cohort once you have one; against the Euro 2024 reference table (Gap Analysis §3) before that, clearly labelled as senior-international context rather than a target.

`anticipationIndex` is the elegant one. It captures the Sentinel's defining claim — *"you read the whole game, you barely had to tackle"* — as a single ratio from two countable events. That sentence is already sitting in the Sentinel result card. Now it's measurable.

### 7.3 The normative block — fixing the ipsative limitation

Add eight statements rated independently on a 1–5 scale, two per archetype, presented **after** the reveal. Never before: they're duller, and the reveal has to stay clean.

> *Rate how true each of these is of you:*
> · I want to win every physical duel, and I take it personally when I don't. **(Colossus)**
> · I'd rather intercept it than tackle it. **(Sentinel)**
> · I look for a pass that breaks a line every time I get the ball. **(Architect)**
> · I'm usually the one covering the space behind everyone else. **(Libero)**
> · …one more each

Because these are rated independently, the scores aren't locked to each other. That gives you comparable trait scores across players, usable reliability statistics, a convergent-validity check against the forced-choice result, and the ability to spot a player who rates everything high — either a genuinely complete defender, or someone agreeing with all of it, which the response pattern will tell you.

**Keep both instruments.** Forced choice for the reveal, normative for the engine. Not redundancy — two instruments answering two different questions.

### 7.4 Pattern recall — optional, Sentinel-specific

Show a defensive shape for 3 s, blank the screen, ask the player to place the defenders. A long-standing expertise measure: skilled players recall structured patterns of play better than less-skilled ones. Buildable, but it discriminates *skill* more clearly than *style*. Build it fifth, if at all.

---

## 8. Tier C — what we should refuse to build

Saying no here is worth as much as the four games above.

### 8.1 Don't build a multiple-object-tracking / NeuroTracker clone

The most fashionable thing in this space, and it fails both of the first two filters.

**The evidence is weak.** A critical systematic review of NeuroTracker found major limitations in the literature — including a complete absence of preregistered studies — with very weak evidence for the claimed working-memory and sustained-attention benefits; only three studies had examined far transfer to ecologically valid tasks, and two of those found nothing. A separate randomised study found no evidence of near transfer to another object-tracking task, let alone far transfer. And a follow-up study in soccer specifically found no transfer of 3D-MOT training to game performance.

**But this is the argument that settles it even if the evidence improves:** MOT measures generic tracking capacity. **It cannot distinguish a Colossus from a Sentinel.** All four archetypes score along one dimension. It fails filter 1 regardless of how valid it turns out to be.

### 8.2 Don't build a general executive-function battery as a predictor

Covered in §5: poor prediction within homogeneous groups, a plausible threshold effect, an active critical literature, and a headline study whose outcome variable — goals and assists — a centre back doesn't produce. Use the *paradigms* (go/no-go, inhibition) as style instruments dressed as football. Never present a "cognitive score."

### 8.3 Don't build webcam eye tracking

Gaze estimation from a phone or laptop front camera, on arbitrary hardware, in arbitrary lighting, at an unknown viewing distance, isn't accurate enough for the fine area-of-interest questions that make gaze data worth having. The occlusion task in §6.1 gets at the same construct — *what information are you using?* — by manipulating what's available rather than trying to measure where you looked.

### 8.4 Don't headline millisecond reaction time

Browser and device timing variability is real and varies with hardware, OS and load. Group-level effects survive it; individual profiling doesn't. Build the measures around **error rates under fixed deadlines** (§6.2) and treat latency as a secondary, within-player-only signal.

### 8.5 Don't build VR

Out of scope by the stated constraint, and the money is better spent on 200 well-constructed occlusion scenarios than on a headset build.

---

# PART IV — MAKING IT ONE ENGINE

## 9. Three profiles, not one score

The instinct will be to blend everything into a single archetype. **Don't.** Keep three profiles and report the relationship between them — that relationship is more interesting than any of them alone.

```
declaredProfile   ← 12 forced-choice items + 8 normative items
                    "How I say I defend"

revealedProfile   ← the four Tier-A games
                    "How I decide when I have 1.2 seconds"

observedProfile   ← film tags + scanning
                    "What I actually did on Saturday"

convergence       ← agreement between them
```

### 9.1 The product feature nobody else has

When declared and revealed disagree, that gap is the most valuable output in the app:

> **You call yourself an Architect.**
> Under a 1.2-second clock you went long on 7 of 12. Your risk elasticity is 0.71 — one of the highest we've measured.
> That isn't a contradiction. It's the exact thing standing between you and the centre backs playing a level above.
> **Weeks 5–8 of your plan are built on it.**

That paragraph is methodologically legitimate (two methods measuring one construct, with the discrepancy carrying real information), emotionally compelling, immediately actionable, and impossible for a competitor with a quiz to copy. It turns a measurement limitation into the product's sharpest moment.

The reverse case is just as good: *"You describe yourself as a Colossus. Your anticipation index is in the top quarter. You've been winning it with your body — you're also reading it better than you think."*

### 9.2 Weighting for the headline archetype (v1)

| Source | Weight in the headline | Rationale |
|---|---|---|
| `declaredProfile` | **100%** | It produces the reveal that has to *feel* true. Self-concept is what the reflect-back must match |
| `revealedProfile` | 0% | Shown separately as "how you played" |
| `observedProfile` | 0% | Shown separately as "what the film says" |

**Deliberate and temporary.** Do not let the games move the archetype until coach-agreement data (§11) says they should. Changing a player's identity label on the basis of an unvalidated tapping game is the same category of error as letting a growth spurt change it.

Re-weight only when the data earns it. The natural v2, once you hold 100+ coach-labelled players, is to fit the weights to maximise agreement with coaches — at which point you have a real classifier and a real claim.

### 9.3 Confidence, honestly displayed

Show **completeness**, not accuracy.

```
Your profile: ●●●●○   4 of 5 sources
✓ Assessment   ✓ Games   ✓ Role & growth   ✓ Film (12 receptions)
○ Coach-verified testing
```

No percentage confidence. No "93% accurate." Accuracy can't be computed without ground truth (§2.3), and inventing a number is exactly what the claims register in Handoff §14.4 exists to prevent.

---

## 10. Instrument specification summary

| ID | Instrument | Method | Time | Primary output | Maps to | Build |
|----|-----------|--------|------|----------------|---------|-------|
| **Q1** | 12 scenario items | Self-report, forced choice | 4 min | `declaredProfile` | All four | Built |
| **Q2** | 8 normative items | Self-report, rated | 1 min | Comparable trait scores | All four | **P1** |
| **G1** | Step or Hold | Go / no-go | 90 s | `commissionRate`, `omissionRate` | Colossus ↔ Sentinel | **P0** |
| **G2** | Play or Safety | Risk under time pressure | 90 s | `riskIndex`, `riskElasticity` | Architect ↔ Colossus | **P0** |
| **G3** | What Happens Next? | Temporal occlusion | 90 s | `earlyCueAdvantage` | Sentinel | **P1** — needs scenario build |
| **G4** | Cover the Space | Positional bias | 90 s | `ballwardBias`, `depthBias` | Libero ↔ Colossus | **P1** — needs coach panel |
| **G5** | Pattern recall | Recall | 60 s | Recall accuracy | Sentinel | P3 |
| **F1** | Scanning | Manual video notation | ~20 min tagging | `scanFrequency` | Architect / Sentinel | **P1** |
| **F2** | Event tags | Manual video notation | ~30 min tagging | 4 ratio indices | All four | **P1** |
| **C1** | Maturity band | Self-report anthropometrics | 60 s | %PAH band | Context only | **P0** |
| **C2** | Role | Self-report | 10 s | CB4 / CB3O / CB3C | Context | **P0** |
| **V1** | Jump + ball control | Phone video | 5 min | Within-player change | Plan, not archetype | P2 |

**Total new player-facing time for the full Tier A set: about six minutes.** A reasonable ask *after* a reveal the player already believes, and a completely unreasonable one before it. Sequence matters: reveal first, always.

---

# PART V — PROVING IT WORKS

## 11. The validation plan

Six studies. All of them runnable with the app and a few hundred players. None needs a lab.

### Study 1 — Test–retest reliability *(do this first, it's the cheapest and the most damning if it fails)*
100 players retake the full assessment at 14 days.
**Targets:** primary-archetype agreement **κ ≥ 0.6**; spread correlation **r ≥ 0.7**.
**If it fails,** nothing else matters — an instrument that gives a player a different identity two weeks later is not measuring an identity. Fix the items before building a single game.

### Study 2 — The coach-agreement ceiling
Two coaches independently assign an archetype to each of 100 players they know well, without seeing each other's answers or the app result.
**Output:** inter-coach κ. **This is the ceiling for every claim you will ever make.** If two coaches agree at κ = 0.55, an app that agrees with coaches at κ = 0.50 is performing at 91% of the human ceiling — which is a strong, defensible, honest claim. Without this number, "accuracy" is meaningless.

### Study 3 — Convergent validity
Correlate `declaredProfile` against `revealedProfile` on each of the four dimensions.
**Expect r ≈ 0.3–0.5.** That's the healthy range. If it comes back at 0.9, one instrument is redundant — drop it. If it comes back at 0.0, one of them is broken.

### Study 4 — Discriminant validity
`commissionRate` from Step or Hold should correlate more strongly with the Colossus dimension than with the Architect dimension.
**If a game correlates with everything equally, it's measuring effort or engagement, not style.** Kill it.

### Study 5 — Maturation invariance *(the one that protects the brand)*
Compare archetype distribution across pre-, circa- and post-PHV bands.
**Target:** no meaningful difference. If Colossus is three times more common among post-PHV players, the instrument is measuring body size wearing an archetype's name — the exact failure the Gap Analysis was written to prevent. Run this before any public launch and re-run it every quarter.

### Study 6 — Careless responding
Establish the completion-time distribution and set the flag threshold empirically rather than guessing.

### The reporting standard
Publish these numbers internally, and eventually externally. A product that says *"our archetype agrees with an experienced coach 71% of the time, against a coach-to-coach ceiling of 78%"* is far more credible — and far more sellable to a club — than one claiming 93% accuracy against nothing.

---

## 12. What "accurate" can honestly mean here

Given the instruments available, here's the ceiling, stated plainly so nobody over-promises later:

| Claim | Can we support it? |
|---|---|
| "This describes how you say you defend" | ✅ Directly, by construction |
| "This describes how you decide under time pressure" | ✅ With Tier A |
| "This describes what you did in your last three matches" | ✅ With Tier B, within tagging error |
| "This matches what an experienced coach would say" | ⚠️ Measurable via Study 2. Expect good, not perfect |
| "This is your true archetype" | ❌ No such thing exists to be accurate about |
| "This predicts your ceiling" | ❌ No. See Handoff §13.2 |
| "This identifies elite potential" | ❌ No, and the literature on doing so is not encouraging |

The honest positioning, which is also the better marketing:

> **We don't tell you how good you are. We tell you what kind of defender you are — from what you say, from how you decide, and from what you actually did. And we show you where those three disagree.**

---

## 13. Build order

**Now, in the Claude Design prototype**
1. Response latency + careless-response flags on the existing 12 items (one field each, zero risk)
2. Role question and maturity band — both P0 from the Gap Analysis

**Next sprint — the two games with the best signal-to-effort ratio**
3. **G1 Step or Hold.** Simplest to build, most fun, measures the most important axis. Start here.
4. **G2 Play or Safety.** Catches the social-desirability gap in Chapter 2 — the single most contaminated block in the questionnaire.
5. **Q2 normative block.** One screen. Unlocks real statistics.

**Then**
6. Run **Study 1** on whoever you have. Do not build further until test–retest passes.
7. **G4 Cover the Space** — needs the coach panel to set reference positions, so start recruiting the panel now.
8. **F1 Scanning** and **F2 event tags** in the film module.
9. **G3 What Happens Next?** — highest content cost (scenario construction), so schedule it once the animation pipeline from G4 exists and can be reused.

**Never**
10. MOT clone. Cognitive score. Eye tracking. VR.

---

## 14. Position pack additions

```jsonc
{
  "instruments": {
    "q1": { "type": "forced_choice", "items": 12, "weight": 1.0 },
    "q2": { "type": "normative", "items": 8, "scale": 5 },
    "g1": {
      "type": "go_nogo", "trials": 40, "goRatio": 0.7, "deadlineMs": 800,
      "outputs": ["commissionRate", "omissionRate", "goRT", "postErrorSlowing"],
      "maps": { "commissionRate": "colossus", "omissionRate": "sentinel" }
    },
    "g2": {
      "type": "risk_choice", "trials": 12,
      "timeConditions": [2500, 1200],
      "options": [
        { "id": "linebreak", "risk": 3, "value": 3 },
        { "id": "carry",     "risk": 2, "value": 2 },
        { "id": "fullback",  "risk": 1, "value": 1 },
        { "id": "long",      "risk": 0, "value": 0 }
      ],
      "outputs": ["riskIndex", "riskElasticity", "contextSensitivity", "carryPreference"]
    },
    "g3": { "type": "temporal_occlusion", "trials": 12, "occlusionPoints": ["early","contact","late"] },
    "g4": { "type": "position_drag", "trials": 10, "referenceSource": "coach_panel_centroid" }
  },
  "profiles": ["declared", "revealed", "observed"],
  "headlineSource": "declared",
  "convergenceCopy": { "architect>colossus": "…" }
}
```

Same principle as the rest of the pack: **every instrument is data, not code.** Position 3 gets the same four games with different scenarios and different mappings — one content file, not one rebuild.

---

## 15. Testing minors — the rules

Cognitive assessment of children carries obligations that a fitness test doesn't.

- **No cognitive scores, ever.** Not shown to the player, the parent, or the coach. A child is never told a number representing their brain.
- **No diagnostic or clinical language.** No "inhibition deficit," no "attention score," no "cognitive profile." These are football words for football behaviours: *stepper*, *holder*, *builder*, *coverer*.
- **Style framing only, never deficit framing.** "You're a stepper — you back yourself to win it" is an identity. "High impulsivity" is a diagnosis. Say the first; never say the second.
- **No ranking children against each other on any cognitive measure.** Cohort context only, anonymous, and only if it's genuinely useful.
- **A game must be playable without being scored.** Let a player replay for fun with scoring off. It keeps the instrument clean (practice effects are real) and it keeps the app feeling like a game rather than a test.
- **Everything optional, after the reveal.** A player who only ever does the 12 questions still gets a complete, satisfying product.

---

## 16. Sources

| Topic | Reference |
|---|---|
| Temporal occlusion paradigm; expert anticipation from early cues | Abernethy & Russell 1987; Williams et al.; systematic reviews of video-based training in football (Front. Hum. Neurosci. 2022; PMC11505547) |
| Limits of video-based tests vs in-situ performance | Perceptual-cognitive skill and in-situ performance (PMC6159770) |
| Scanning / visual exploratory activity: definition, method, association with performance | Jordet 2005; Jordet et al. 2013, 2020; McGuckian et al. 2018–2020; Aksum et al. 2021 (*J Sports Sci* 39:21) |
| Scanning does not separate super-elite from elite | *Sci Med Football*, doi:10.1080/24733938.2024.2325139 |
| Executive function and football success (original) | Vestberg T, Gustafson R, Maurex L, Ingvar M, Petrovic P. *PLoS One* 2012;7(4):e34731. PMID 22496850 |
| Critique: threshold effect, weak prediction in homogeneous groups | Beavan et al. 2020; Sakamoto et al. 2018; *Intelligence* 2025 (S0160289625000716) |
| Critique: selecting talent via brain tests | *Sport, Ethics and Philosophy*, doi:10.1080/17511321.2019.1631880 |
| NeuroTracker / 3D-MOT — critical systematic review | *Psychon Bull Rev* 2021, doi:10.3758/s13423-021-01892-2 (PMC8500884) |
| 3D-MOT — no near or far transfer | *Front Psychol* 2020;11:196 (PMC7028766) |
| 3D-MOT — no transfer to soccer game performance | Follow-up study, 2024 |
| Go/no-go and inhibition as CB-relevant paradigms | Named in your own `Center_Back_Phase_2` assessment document — paradigm retained, apparatus discarded |

---

*Addendum B to Centre Back Module Build Handoff v2.0 · The Footballer's Academy · Position 2 of 7*
