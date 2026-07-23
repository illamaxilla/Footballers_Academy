# The Footballer's Academy — Attacking Midfielder Archetype Assessment
### Build Handoff · Module 6 of 8 · **VERSION 2.0**

**Supersedes:** AM v1.0 (July 12, 2026) · **Date:** July 12, 2026 · **Build in:** the Attacking Midfielder project
**Archetypes:** Maestro · Maverick · Phantom · Architect · Dynamo
**Ships with:** `am-scoring-engine.ts` — a runnable, self-testing reference implementation

> **You were right to split the module.** The merged AM/Winger handoff spliced two positions and two taxonomies together, and the damage went deeper than naming: it forced a *Wide Play* trait dimension into a model of five **central** players, where it carries no information at all. The AM's own five archetypes are the correct set, and this document builds the engine on them.
>
> **The split also solves a problem I flagged in the merged version.** The codex's 15-formation compatibility matrix is keyed to **Maestro / Maverick / Phantom / Architect / Complete** — this taxonomy, not the merged one. Under the old module, system-fit could only be delivered through a lossy crosswalk. Now it plugs straight in. `Dynamo = Complete` is the only rename needed.
>
> **Nothing is wasted.** The Artist and Wide Playmaker work from the merged handoff is archived as the seed for **Module 7 (Winger)**.

---

## 0. READ THIS FIRST — the one thing that must change before build

### 🔴 The scoring engine manufactures the rarity it claims to model.

§6 of v1.0 sets option exposure deliberately:

| Archetype | Options | Omitted from | Stated elite share |
|---|---|---|---|
| Maestro | **11** | Q8 | 30% |
| Maverick | 10 | Q7, Q11 | 22% |
| Phantom | 10 | Q4, Q12 | 20% |
| Architect | 9 | Q2, Q6, Q9 | 18% |
| **Dynamo** | **8** | Q1, Q3, Q5, Q10 | 10% |

…and instructs: *"Preserve this distribution if you edit the questions — it's what stops the assessment structurally favouring one archetype."*

**It is precisely what causes it.** Two things are being confused:

- **Item exposure** — how many chances a player gets to *express* something.
- **Base rate** — how common that something *is*.

Base rates belong in a **prior**, applied at the end. Putting them in the answer sheet isn't modelling rarity; it's rigging the test.

And here it bites hard, because of a detail nobody would notice by eye: **the Dynamo's nearest neighbour is the Maverick, and the Maverick is offered in all four questions where the Dynamo is omitted.** A real Dynamo is *forced* to hand four free points to the Maverick before the test begins.

### What that costs, measured

5,000 simulated respondents per cell. A "realistic" respondent picks their own archetype with probability *p* when it's on screen; when it isn't, they pick the option **nearest to how they actually think** — as a real person does, not a coin flip.

**How often is the player's true archetype the one shown big and first?**

| Archetype | v1 exposure | p = 0.8 | p = 0.7 | p = 0.6 |
|---|---|---|---|---|
| Maestro | 11 | 99% | 93% | 79% |
| Maverick | 10 | 98% | 89% | 71% |
| Phantom | 10 | 97% | 86% | 67% |
| Architect | 9 | 89% | **68%** ⚠️ | **46%** ❌ |
| **Dynamo** | **8** | **72%** ⚠️ | **49%** ❌ | **26%** ❌ |

Read the Dynamo row. A player who picks "Dynamo" **seven times out of ten** when it's offered is named a Dynamo **49% of the time**. A coin flip. At six-in-ten: 26%.

The recovery rate tracks exposure almost perfectly. The Dynamo is not rare because it's rare — **it's rare because the test hides it.** The scarcity is manufactured by the instrument, and then cited to justify the instrument.

**One honest caveat, so you can trust the rest of this document:** the true archetype almost always still appears as the *secondary* (~99% under both engines). So this is not "the player never sees it." It is worse than that in the way that matters most to *your* product: **the reveal is the product.** The name big and first, in its colour, with the emblem — that is what gets screenshotted, shared, and believed. Getting *that* wrong, for the rarest and most thrilling archetype a player could be handed, is the worst possible place to be wrong.

### 🟠 And the arithmetic can't be fixed by rebalancing

12 questions × 4 options = **48 slots.** 48 ÷ 5 = **9.6.**

There is no balanced allocation. Any distribution you choose is unequal. This is why v1.0 had to reach for a justification — the format left no honest option.

**v2 uses 15 × 4 = 60 slots ÷ 5 = exactly 12 each.** Adds ~45 seconds. Solves it permanently.

### 🟡 The good news, and it's substantial

Unlike the merged AM/Winger module — where the elite shares contradicted each other 3× on one archetype and summed to 122% — **this taxonomy's shares are real:**

| Source | Maestro | Maverick | Phantom | Architect | Dynamo | Sum |
|---|---|---|---|---|---|---|
| Phase 1 (`% of population`) | 30 | 22 | 20 | 18 | 10 | **100** |
| Phase 3 (Bayesian `probability`) | .30 | .22 | .20 | .18 | .10 | **1.00** |
| AM v1.0 handoff (`elite share`) | 30 | 22 | 20 | 18 | 10 | **100** |

Three documents, independently, in perfect agreement, summing to exactly one. **That is a genuine probability distribution.** So the AM module **ships with its prior switched on from day one** (§5.5) — which the merged module could not do.

The numbers were always right. They were just being applied in the wrong place.

---

## 1. Where this module sits — top of a funnel, not the whole product

| Tier | Product | Length | Price | Codex projection |
|---|---|---|---|---|
| **0 — this module** | **The Spark** — free archetype reveal | 15 items · ~4 min | Free | acquisition + share loop |
| 1 | **AM-Creator-DNA™** core assessment | 75 items · ~25 min | €49 | 30,000/yr → €1.47M |
| 2 | Premium Report Bundle (40-page report, film analysis, 12-week plan, consult) | + tests + film | €149 | 5,000/yr → €745K |
| 3 | Academy / Professional club licence | unlimited | €4,999 / €14,999 per yr | €550K |

**The single most important architectural instruction in this document:**

> Build the free 15-item Spark on the **same trait engine, same data model, and same result schema** as the paid 75-item tier. Tier 1 must be *more evidence into the same engine* — not a different product. Build Tier 0 as a standalone quiz with its own scoring and you will throw it away within six months.

Everything in §3 (traits), §5 (engine), §4 (evidence layers) and §12 (data model) is designed so that adding items, test numbers, or film **raises confidence in the same profile** rather than producing a second, unrelated one.

---

## 2. Taxonomy — now correct, and now joinable

### 2.1 Canon

> **Maestro · Maverick · Phantom · Architect · Dynamo**

Sourced from Phase 1, Phase 3, and the Living AM Model. Keep it.

### 2.2 The crosswalk — 1:1, one rename

`Tactical_System_Integration.md` keys its 15-formation fit matrix on exactly these names, with `Complete` in place of `Dynamo`. Add `tacticalKey` to the `Archetype` model and system-fit works with **no lossy mapping**:

| Canonical | `tacticalKey` |
|---|---|
| Maestro | `Maestro` |
| Maverick | `Maverick` |
| Phantom | `Phantom` |
| Architect | `Architect` |
| **Dynamo** | **`Complete`** |

### 2.3 Housekeeping: two stale namings still in the repo

Fix these or someone will build against them by accident:

- **`README.md`** lists *"Maverick, Maestro, Hybrid #10, Ghost, Wide Playmaker"* — a **blend of two taxonomies that never existed as a set**. Correct it to the canon above.
- **`AM-Part-III-Archetypes.md`** (the literary series) uses **seven** types: Explosive Dribbler · Orchestrator · Complete Midfielder · Trequartista · Ghosting Attacker · False 9 · Creative Workhorse. That's fine as prose — but label it clearly as a *narrative* taxonomy so no engineer wires it into a dropdown.

### 2.4 Exemplars — you asked for this in §8. Here's the evidence.

| Archetype | v1.0 proposed | What the codex actually says | Verdict |
|---|---|---|---|
| **Maestro** | Özil, Zidane, Ødegaard | Framework: *"Özil, Zidane, Riquelme, James Rodríguez, Ødegaard"* | ✅ **Confirmed** — exact subset |
| **Maverick** | Ronaldinho, Hazard, Kaká | `AM-Part-III` "Explosive Dribbler": **icon = Maradona**; modern expression = **Ronaldinho** | ⚠️ **Ronaldinho confirmed. Maradona is the codex's own headline icon and is missing.** Hazard is a new proposal — and an excellent one. **Kaká should be cut** (see below) |
| **Phantom** | Müller, Griezmann, Dele Alli | Framework Ghost: *"Müller, Inzaghi, Alli, prime Griezmann"*; `AM-Part-III` Raumdeuter icon = **Müller** | ✅ **Confirmed.** You were right to drop Inzaghi — he's a striker, not an AM |
| **Architect** | David Silva, Gündoğan, Foden | Framework: *"David Silva, Bernardo Silva, Mahrez, Saka, **Foden**"* | ⚠️ **David Silva + Foden confirmed.** Gündoğan is new — and correct; he's the archetypal half-space operator |
| **Dynamo** | De Bruyne, Bruno Fernandes, Wirtz | Framework Hybrid #10: *"**De Bruyne, Bruno Fernandes**, Mount, **Wirtz**"* | ✅ **Exact match** |

**Why cut Kaká.** The codex's own Maverick definition (`AM-Part-III` §2.1) requires: *elite close control at speed · low centre of gravity · a repertoire of feints and stepovers · ability to dribble in **congested central areas***. Kaká was a gliding, straight-line runner — devastating in open space, but he fails three of those four criteria. Ronaldinho, Maradona and Hazard pass all four. Putting Kaká on the Maverick card will cost you felt accuracy with exactly the players who know the game best.

**Recommended:** Maverick = **Ronaldinho · Maradona · Hazard**.

---

## 3. The trait spine — rebuilt for a central-only module

The merged module's matrix had a **Wide Play** axis. All five AM archetypes are central, so in this module that axis carries **zero information**. It's replaced with dimensions the AM codex genuinely discriminates on.

Every value below traces to a **stated per-90 statistic** in the Living AM Model. Nothing is invented.

| Trait | Code | Maestro | Maverick | Phantom | Architect | Dynamo |
|---|---|---|---|---|---|---|
| Vision & Chance Creation | `VIS` | **99** | 80 | 82 | 88 | 86 |
| Passing Precision | `PAS` | 96 | 76 | 92 | **95** | 84 |
| Dribbling / Take-On | `DRB` | 78 | **99** | 70 | 76 | 88 |
| Explosiveness / First Step | `EXP` | 65 | **98** | 76 | 66 | 88 |
| Off-Ball Movement & Timing | `MOV` | 72 | 74 | **99** | 80 | 86 |
| Half-Space & Line-Breaking | `HSP` | 82 | 68 | 90 | **99** | 84 |
| Risk Appetite | `RSK` | 75 | **98** | 70 | 62 | 82 |
| Composure Under Pressure | `CMP` | 80 | 65 | 92 | **96** | 86 |
| Engine (work rate + pressing) | `ENG` | 60 | 72 | 80 | 76 | **99** |
| Goal Threat | `GOL` | 72 | 84 | 90 | 74 | **96** |

**The receipts:**

| Archetype | Living AM Model says | Which becomes |
|---|---|---|
| Maestro | 3.7 chances/90 (highest) · 89% final-third passing · *"sees passing lanes 280ms before others"* · *"doesn't need to run or fight"* | `VIS` 99, `PAS` 96, `ENG` **60 — lowest of the five** |
| Maverick | 4.2 successful dribbles/90 @ 68% · *"31ms faster first step"* · ACTN3-RR, MAOA-warrior · high cortisol reactivity | `DRB` 99, `EXP` 98, `RSK` 98, `CMP` **65 — lowest** |
| Phantom | *"appears in space 73% of possessions"* · 91% pass completion (highest) · GABA producers = *calm decisions* · *"master of the late run"* | `MOV` 99, `CMP` 92, `DRB` **70 — lowest** |
| Architect | 3.1 line-breaking passes/90 · **87% decision accuracy under pressure** · both feet equally effective · consistent across 90 min | `HSP` 99, `CMP` 96, `RSK` **62 — lowest** |
| Dynamo | 8.9 km covered · 0.4 goals/90 · 84% pass accuracy — **the lowest of the five** · 3.1 dribbles | `ENG` 99, `GOL` 96, and *deliberately below-average on every specialist skill* |

That last row matters. **The Dynamo is not "high at everything."** It is *high at running and scoring, and second-best at everything else* — because that's exactly what the codex's own numbers say. Which is what gives it a **shape**, and therefore makes it findable. (An archetype that is genuinely flat-high across all ten traits would centre to a zero vector and become mathematically unclassifiable. The Dynamo escapes that only because the codex was honest about its 84% pass accuracy.)

### 3.1 ⚠️ You must centre these before comparing anything

Every archetype scores 60–99 on everything, because they are all *elite players*. Cosine-compare the raw vectors and **every pair returns ~0.98.** The classifier degrades to noise. It won't crash. It will just be wrong, quietly, forever.

Subtract each trait's mean across the five. You then compare **shape** — how a player deviates from the average AM — not **level**.

**Trait means (precompute once):**
`VIS 87.0 · PAS 88.6 · DRB 82.2 · EXP 78.6 · MOV 82.2 · HSP 84.6 · RSK 77.4 · CMP 83.8 · ENG 77.4 · GOL 83.2`

**Centred vectors — the actual signal:**

| | VIS | PAS | DRB | EXP | MOV | HSP | RSK | CMP | ENG | GOL |
|---|---|---|---|---|---|---|---|---|---|---|
| **Maestro** | **+12.0** | +7.4 | −4.2 | −13.6 | −10.2 | −2.6 | −2.4 | −3.8 | **−17.4** | −11.2 |
| **Maverick** | −7.0 | −12.6 | **+16.8** | **+19.4** | −8.2 | −16.6 | **+20.6** | **−18.8** | −5.4 | +0.8 |
| **Phantom** | −5.0 | +3.4 | −12.2 | −2.6 | **+16.8** | +5.4 | −7.4 | +8.2 | +2.6 | +6.8 |
| **Architect** | +1.0 | +6.4 | −6.2 | −12.6 | −2.2 | **+14.4** | **−15.4** | **+12.2** | −1.4 | −9.2 |
| **Dynamo** | −1.0 | −4.6 | +5.8 | +9.4 | +3.8 | −0.6 | +4.6 | +2.2 | **+21.6** | **+12.8** |

Read it and it *is* football. The Maestro is defined as much by what he refuses to do (`ENG −17.4`) as by what he does. The Maverick is the only archetype whose risk appetite and composure point in **opposite directions** — which is the Maverick, exactly. The Architect is his mirror image: lowest risk, highest composure.

**Centred cosine — discriminative, and it reproduces the codex's own claims:**

```
  Maestro   vs Architect   +0.382   ← both patient central creators
  Phantom   vs Architect   +0.396   ← the most confusable pair (both intelligent, composed)
  Maverick  vs Dynamo      +0.211   ← both explosive, direct, high-risk
  Maestro   vs Dynamo      −0.875   ← near-perfect opposites: "never runs" vs 8.9km
  Maverick  vs Architect   −0.882   ← chaos vs geometry. The codex frames them this way.
```

Nobody wrote those relationships in. They fall out of the codex's own per-90 statistics. That's the signal the trait model is sound.

---

## 4. The four evidence layers — what a phone can *actually* do

You asked the right question: *we're an app, we can't be in the room.* So here is a blunt audit.

The engine takes evidence from four layers. **Every layer writes to the same 10 traits.** Each raises the player's **Evidence Level** — which is both an accuracy signal and, not incidentally, the strongest retention mechanic in the product.

| Layer | What it is | Device-possible? | Ships in |
|---|---|---|---|
| **1 · Self-report** | The 15 items (§6) + the Mind module (§7) | ✅ | **v1** |
| **2 · In-app measured tasks** | Timed cognitive tasks — the app *measures*, doesn't ask (§4.2) | ✅ — **this is the unlock** | **v1.5** |
| **3 · Performance Test Card** | Player self-reports real-world test results (§8) | ✅ — your proposal | **v1.5** |
| **4 · Film** | Player uploads clips; structured tagging (§9) | ✅ | **v2 / paid** |

### 4.1 Every archetype's defining marker has exactly one home

This is the clearest possible answer to your constraint. The codex names one headline biological marker per archetype. Here is where each one can honestly be measured:

| Archetype | The codex's defining marker | Where we measure it | Layer |
|---|---|---|---|
| **Maestro** | *"Sees passing lanes **280ms** before others"* | **OPTIONS SEEN** — time-to-first-correct-lane, in milliseconds | **2 · on the phone** ✅ |
| **Architect** | *"**87%** decision accuracy under pressure"* | **THE PANIC CLOCK** — accuracy as the timer shrinks | **2 · on the phone** ✅ |
| **Maverick** | *"**31ms** faster first step"* | 10m sprint | 3 · test card |
| **Dynamo** | *"**8.9 km** covered"* | Yo-Yo IR1 / GPS vest / match data | 3 · test card |
| **Phantom** | *"Appears in space **73%** of possessions"* | Film: off-ball position at the moment of reception | 4 · film |

**Two of the five are measurable on a phone, today.** That is not a consolation prize — the Maestro and the Architect are the two archetypes whose signature is *cognitive*, and cognition is precisely what a screen can measure.

### 4.2 The tasks that survive the trip from lab to phone

`Phase_2`'s Creative Performance Testing battery is partly device-native once translated honestly.

| Codex test | Phone translation | Feeds |
|---|---|---|
| `passing_imagination` — *"options seen"* | **OPTIONS SEEN.** A still frame of a real attack. 20 seconds. Tap every pass you'd consider. Fluency = count · flexibility = distinct categories · originality = rarity vs cohort · **latency = ms to first correct lane** | `VIS`, `PAS` |
| `time_constrained` — *"panic threshold"* | **THE PANIC CLOCK.** The same decision, four times, timer shrinking: 5s → 3s → 1.5s → 0.8s. **The score is not accuracy — it's the slope of your decay.** | `CMP` · the Architect's 87% figure, directly |
| `physical_fatigue` — *"creative degradation curve"* | **THE 85th MINUTE.** Re-run the *identical* decision task at the very end, after ~12 min of cognitive load. Compare to minute one. | `ENG` + **Cognitive Endurance** pillar (§7) |
| spatial awareness / scanning | **SCAN & RECALL.** Freeze-frame 800ms → screen blanks → *"where was the free man?"* Tap the pitch. | `MOV`, `HSP` |
| `pattern_breaking` | **BREAK THE PATTERN.** Watch a repeating pattern three times. Then find the moment it can be broken. | `RSK`, `VIS` |

**You cannot make a player's legs tired through a screen. You *can* make their attention tired** — and the codex's own line is *"scanning frequency is the first casualty of fatigue."* That is what The 85th Minute exploits, and it's honest.

**Deliberately dropped:** first-touch variation and live 1v1 improvisation. They need a ball and a defender. Don't fake them with a tap-timing minigame — a real player will know instantly, and it will poison trust in everything else on the card. They go to Layers 3 and 4, where they belong.

### 4.3 What must be cut, and said out loud

`Phase_2` specifies quantum MEG, creative fMRI, metabolomics, epigenetic panels, cortisol reactivity, EEG flow signatures, and 650fs quantum coherence.

**None of it is reachable through a phone.** Keep it as internal R&D framing. But a hard product rule:

> **The app must never imply it has measured something it has not measured.**
>
> No *"quantum coherence: 87%."* No *"neural connectivity: elite."* No *"your creative genome."* You are charging €49 and speaking to 14-year-olds. A claim you cannot substantiate is a refund, a bad review, and — for a youth-facing product — a credibility hole you don't climb out of.
>
> Everything on the result card must trace to something the player **told you** or the app **measured**. That constraint isn't a limitation. It is the entire moat over a BuzzFeed quiz.

### 4.4 The Evidence ladder

| Level | Requires | Weight | What the player is told |
|---|---|---|---|
| 🥉 **Bronze** | 15 items | 0.40 | *"Add the 4 measured tasks to sharpen your profile."* |
| 🥈 **Silver** | + Mind module + measured tasks | 0.70 | *"Add your test numbers to reach Gold."* |
| 🥇 **Gold** | + Performance Test Card, coach-verified | 0.90 | *"Upload 90 seconds of film to reach Elite."* |
| 💎 **Elite** | + film tagged | 1.00 | — |

This is the honest version of a paywall: you're not hiding the answer, you're offering to make it *truer*.

---

## 5. The scoring engine

### 5.1 Pipeline

```
answers ──► accumulate trait loadings ──► player vector t (10 dims)
                                              │
                                     centre + normalise          t̂
                                              │
      canonical vectors ──► centre + normalise ──► Â_k
                                              │
                                   sim_k = cos(t̂, Â_k)          ← shape, not level
                                              │
                       logit_k = τ·sim_k + log(prior_k)          ← rarity lives HERE
                                              │
                                     softmax ──► % spread
                                              │
             ┌────────────────────────────────┼────────────────────────────┐
       primary / secondary            cos-margin < 0.20              confidence
                                        → HYBRID                   → Evidence badge
```

### 5.2 Why cosine on *centred* vectors, specifically

- **Centred** — because raw vectors are 0.98 similar (§3.1). Non-negotiable.
- **Cosine, not Euclidean** — cosine compares *shape*, ignoring magnitude. This matters enormously: a 14-year-old's absolute levels are far below De Bruyne's, but her **shape** can be identical. Euclidean distance would tell every child they are nobody. Cosine tells her she's a Dynamo who hasn't grown up yet.

That isn't a technical detail. It is the emotional premise of the entire product, expressed as a choice of metric.

### 5.3 Verified behaviour

Run `am-scoring-engine.ts` and you get exactly this. Every archetype recovers itself, and every margin clears the hybrid threshold:

| Answered as | Result | Margin | Full spread |
|---|---|---|---|
| pure Maestro | **Maestro 79.0%** ✅ | 0.382 | Architect 15.1 · Phantom 3.7 · Maverick 1.7 · Dynamo 0.5 |
| pure Maverick | **Maverick 87.4%** ✅ | 0.648 | Dynamo 5.7 · Maestro 5.4 · Architect 0.9 · Phantom 0.6 |
| pure Phantom | **Phantom 80.2%** ✅ | 0.665 | Architect 9.8 · Maestro 5.0 · Dynamo 2.8 · Maverick 2.2 |
| pure Architect | **Architect 60.3%** ✅ | 0.344 | Phantom 23.9 · Maestro 14.3 · Dynamo 0.8 · Maverick 0.7 |
| **pure Dynamo** | **Dynamo 57.5%** ✅ | 0.497 | Maverick 28.5 · Phantom 7.7 · Architect 3.6 · Maestro 2.8 |

The *second*-place results are the best evidence the model is sound:

- Maestro → 2nd **Architect**. Both patient central creators.
- Maverick → 2nd **Dynamo**. Both explosive, direct, high-risk.
- Phantom → 2nd **Architect**. Both intelligent and composed — the codex's most confusable pair.
- Dynamo → 2nd **Maverick**. Correct — and note this is exactly the leak that *broke* v1.

### 5.4 The engine is a unit test for your questions

When I first wrote the Hybrid options for the *other* module, the engine told me a pure Hybrid #10 was a Ghost. The engine was right; my **copy** was wrong. I'd written the Hybrid as *"a presser who scores"* — which is the Ghost's profile.

> **Standing rule:** every time you add or reword an item, re-run the pure-respondent test. If an archetype stops recovering itself, or its margin drops below 0.20 — **your copy is wrong, not your maths.** It costs one second and it is the cheapest quality gate you will ever have.
>
> The corollary, which keeps proving true: **the fix that is truer to football is also the fix that is better mathematically.** When the engine argues with you, it's usually telling you that you have mis-described a footballer.

### 5.5 The prior — switched ON, from day one

```ts
logit_k = τ · sim_k + Math.log(prior_k)   // posterior ∝ prior × likelihood
```

This is the structure of the codex's own Phase 3 Bayesian classifier. It is the correct place to model rarity — and it is exactly what v1.0 was reaching for when it deleted answer options instead.

```ts
PRIOR = { maestro: 0.30, maverick: 0.22, phantom: 0.20, architect: 0.18, dynamo: 0.10 }
```

**Ship it on.** Three codex documents state it identically and it sums to 1.00. Then, after 500 real completions, compare it against your **empirical** distribution and recalibrate. Leave the hook in from day one (`usePrior` in the engine).

**What "prior on" actually buys you:** it makes the Dynamo *appropriately* harder to earn — which was v1.0's real intent — while still letting a genuine Dynamo be **found**. A pure Dynamo still lands at 57.5%. The v1.0 approach put its thumb on the scale before the player answered a single question. This one puts it there afterwards, transparently, and reversibly.

### 5.6 Hybrid threshold — read off the data, not guessed

Use the **cosine margin**, not the softmax `%`. Percentages depend on `τ`, so a "margin < 8%" rule silently changes meaning every time you tune it.

```
sim_margin < 0.20  →  declare a HYBRID, show both names and both colours
```

| | cosine margin |
|---|---|
| Lowest **pure** respondent (Architect) | **0.344** ← threshold must sit below this |
| ← *safe zone* → | **0.20** |
| Genuine 50/50 blends (Architect+Dynamo, Maestro+Architect, Maverick+Dynamo) | **0.037 – 0.131** ← threshold must sit above these |

**One honest limitation.** Three "blends" don't trip the flag: Maestro+Maverick (0.270), Maestro+Dynamo (0.227), Phantom+Architect (0.349). Two of those are *near-antipodal pairs* — **a Maestro/Dynamo blend isn't really a thing.** A player answering half *"I never need to run"* and half *"I cover 9km"* isn't a coherent hybrid; they're an **inconsistent respondent**. The engine should flag low `consistency`, not a hybrid. Handle it as: `consistency < 0.45` → *"Your answers pulled in two directions. Take it again when you've got five quiet minutes."*

### 5.7 Confidence → the Evidence badge

```ts
confidence = 0.45 * clamp(cos_margin / 0.45)   // separation of 1st from 2nd
           + 0.30 * consistency                // agreement across the archetype's 12 items
           + 0.25 * evidenceWeight             // 0.40 Bronze … 1.00 Elite

  < 0.45  "Provisional"   |   0.45–0.70  "Indicative"   |   > 0.70  "Confident"
```

**Never hide the result behind low confidence.** Show the archetype, then show the honest badge and the route to improve it. Honesty converts better than false certainty — and it is the truth.

---

## 6. The assessment — 15 items, 3 chapters, perfectly balanced

15 × 4 = **60 slots.** Each archetype omitted from exactly **3** questions → appears in exactly **12**. Verified in CI.

Your v1.0 questions were good — sharp, positionally literate, felt-accurate. Most survive. What changes: three new items to reach 60 slots, a rewritten Q3 (its Maverick option leaked), and every option now carries a **trait loading vector** alongside its archetype tag.

**Every option must cost something.** No option may be a description of simply being a good footballer.

### 📖 Chapter 1 — *Between the Lines*

**Q1.** *You receive between the lines, back to goal. First instinct:* — *(no Dynamo)*
- **A)** Turn and find the pass nobody else has seen. → **Maestro** · `VIS 3, PAS 3`
- **B)** Turn and drive straight at the defence. → **Maverick** · `DRB 3, EXP 2, RSK 2`
- **C)** I'd already drifted where nobody was marking me. → **Phantom** · `MOV 3, HSP 1, CMP 1`
- **D)** Set it, spin into the half-space, take it again. → **Architect** · `HSP 3, CMP 2, PAS 1`

**Q2.** *The defence is deep and compact. How do you break it?* — *(no Architect)*
- **A)** Thread the one pass that unlocks it. → **Maestro** · `VIS 3, PAS 3`
- **B)** Dribble into it and force the opening myself. → **Maverick** · `DRB 3, RSK 3`
- **C)** Time a late run into the gap they've stopped watching. → **Phantom** · `MOV 3, GOL 2`
- **D)** Come at it from every angle until it cracks. → **Dynamo** · `ENG 3, GOL 2, EXP 1`

**Q3.** *You are pressed hard the instant you receive. You…* — *(no Maverick)*
- **A)** One touch — the ball's gone before the press lands. → **Maestro** · `PAS 3, VIS 2, CMP 1`
- **B)** I don't get pressed — I'd already moved into a pocket. → **Phantom** · `MOV 3, CMP 2`
- **C)** Half-turn into the half-space and play forward. → **Architect** · `HSP 3, CMP 2, PAS 1`
- **D)** Take the contact, hold it, and outwork them out of it. → **Dynamo** · `ENG 3, EXP 1, CMP 1`

**Q4.** *The training session you would never skip:* — *(no Phantom)*
- **A)** Passing and chance-creation drills. → **Maestro** · `VIS 2, PAS 3`
- **B)** 1v1 dribbling and take-ons. → **Maverick** · `DRB 3, EXP 2, RSK 1`
- **C)** Positional games in tight half-spaces. → **Architect** · `HSP 3, CMP 2, PAS 1`
- **D)** Full-intensity 11v11 where I do a bit of everything. → **Dynamo** · `ENG 3, GOL 1, EXP 1, DRB 1`

**Q5.** *Twenty-five yards out, ball at your feet, defence set. You…* — *(no Maestro)*
- **A)** Take your man on and go. → **Maverick** · `DRB 3, EXP 2, RSK 2`
- **B)** Slip a shoulder and get in behind. → **Phantom** · `MOV 3, GOL 2`
- **C)** Shift into the half-space and break the line with a pass. → **Architect** · `HSP 3, PAS 3`
- **D)** Get into the box and make it a shooting chance. → **Dynamo** · `GOL 3, ENG 2`

### 📖 Chapter 2 — *The Final Third*

**Q6.** *Your team wins the ball in transition. You…* — *(no Dynamo)*
- **A)** Play the first pass forward — fast and decisive. → **Maestro** · `VIS 3, PAS 3`
- **B)** Carry it at them and break the line yourself. → **Maverick** · `DRB 3, EXP 3, RSK 1`
- **C)** Sprint into the space ahead to get on the end of it. → **Phantom** · `MOV 3, GOL 2`
- **D)** Find the half-space the counter is about to run through. → **Architect** · `HSP 3, PAS 2, CMP 1`

**Q7.** *Your team loses the ball. You…* — *(no Maverick)*
- **A)** Hold between the lines, ready to create the second we regain it. → **Maestro** · `VIS 2, PAS 2`
- **B)** Drift into the pocket where the next ball will land. → **Phantom** · `MOV 3, CMP 1`
- **C)** Drop into the half-space to give an outlet. → **Architect** · `HSP 3, PAS 2, CMP 1`
- **D)** Press. Immediately. Hunt it back. → **Dynamo** · `ENG 3, EXP 1`

**Q8.** *The chance falls to you in the box. You…* — *(no Maestro)*
- **A)** Beat the last man and finish it myself. → **Maverick** · `DRB 3, RSK 2, GOL 1`
- **B)** I'm already there, unmarked — simple finish. → **Phantom** · `MOV 3, GOL 3`
- **C)** Take the shot from the half-space I engineered. → **Architect** · `HSP 3, CMP 2, GOL 1`
- **D)** Score it — and I'd have created two others by now anyway. → **Dynamo** · `GOL 3, ENG 2, VIS 1`

**Q9.** *0–0. 80th minute. Your legs are gone. What's still working?* — *(no Architect)* **[NEW]**
- **A)** My head. I'll still see the pass. → **Maestro** · `VIS 3, PAS 2`
- **B)** My feet. I'll still take him on. → **Maverick** · `DRB 3, EXP 2`
- **C)** My timing. One run is all I need. → **Phantom** · `MOV 3, GOL 2`
- **D)** My engine. I'll still be running at 95. → **Dynamo** · `ENG 3, EXP 1, CMP 1`

**Q10.** *You've tried the killer ball three times. Three times it's been cut out. Next time:* — *(no Phantom)* **[NEW]**
- **A)** Try it again. It only takes one. → **Maestro** · `VIS 3, PAS 2, RSK 2`
- **B)** Forget the pass. I'll go and take them on. → **Maverick** · `DRB 3, RSK 3`
- **C)** Simplify. Take the half-space. Wait for the picture to change. → **Architect** · `HSP 3, CMP 3, PAS 1`
- **D)** Change how I hurt them — press, arrive late, score instead. → **Dynamo** · `ENG 3, GOL 2`

### 📖 Chapter 3 — *Your Signature*

**Q11.** *Teammates describe you as…* — *(no Dynamo)*
- **A)** The creator — my passes make the goals. → **Maestro** · `VIS 3, PAS 3`
- **B)** The wildcard — I make chaos happen. → **Maverick** · `DRB 3, RSK 3`
- **C)** The ghost — I appear from nowhere. → **Phantom** · `MOV 3, GOL 2`
- **D)** The one who quietly controls it from the half-space. → **Architect** · `HSP 3, CMP 2, PAS 1`

**Q12.** *The compliment that lands hardest:* — *(no Maestro)*
- **A)** "You took them all on and beat them." → **Maverick** · `DRB 3, EXP 2, RSK 1`
- **B)** "You were unmarkable — where did you even come from?" → **Phantom** · `MOV 3, GOL 2`
- **C)** "You owned the half-spaces and broke their lines all game." → **Architect** · `HSP 3, PAS 3`
- **D)** "You covered every blade of grass — and scored." → **Dynamo** · `ENG 3, GOL 2`

**Q13.** *Your relationship with risk:* — *(no Architect)* **[NEW — this is the codex's own §4 axis, and it was unprobed]**
- **A)** I calculate it. The right risk, at the right moment. → **Maestro** · `VIS 3, RSK 2, CMP 1`
- **B)** I take it. Always. That's how you break a game open. → **Maverick** · `RSK 3, DRB 2, EXP 1`
- **C)** I time it. I don't take risks — I take chances nobody's watching. → **Phantom** · `MOV 3, CMP 2`
- **D)** I outlast it. Influence enough phases and one of them lands. → **Dynamo** · `ENG 3, GOL 1, CMP 1`

**Q14.** *What frustrates you most?* — *(no Phantom)*
- **A)** Not getting on the ball to create. → **Maestro** · `VIS 3, PAS 2`
- **B)** A system that won't let me take players on. → **Maverick** · `DRB 3, RSK 2`
- **C)** Being pushed out of the half-space. → **Architect** · `HSP 3, PAS 1, CMP 1`
- **D)** A game where I couldn't influence every phase. → **Dynamo** · `ENG 3, GOL 1, EXP 1`

**Q15.** *1–0 up. Ten minutes left. You…* — *(no Maverick)*
- **A)** Drop, get on it, control the tempo. Dictate the ending. → **Maestro** · `VIS 2, PAS 3, CMP 1`
- **B)** Stay high. One more run, one more goal, game over. → **Phantom** · `MOV 3, GOL 2`
- **C)** Keep it in the half-space. Kill the game with position. → **Architect** · `HSP 3, CMP 3, PAS 1`
- **D)** Front-foot press. Don't let them breathe. → **Dynamo** · `ENG 3, EXP 1`

### 6.1 Context items (asked, never scored as archetype)

Placed **before** the reveal, framed as *"so we can tune your plan."*

| Field | Options | Unlocks |
|---|---|---|
| **Formation** | 4-2-3-1 · 4-3-3 · 3-4-2-1 · 3-2-4-1 · 4-4-2 · Not sure | **System Fit % + the Misuse Flag** (§10.4) — the best feature in the product |
| **Age band** | U12 · 13–15 · 16–18 · 19–23 · 24+ | Age-appropriate first step; safeguarding gate; the Golden Window message (§13) |
| **Level** | School/Sunday · Club · Academy · Semi-pro · Pro | Benchmark banding on the Test Card (§8) |

---

## 7. The Mind module — the Beautiful Burden, finally in the product

**This is the gap that matters most.** The philosophical spine of the entire AM codex — *the Beautiful Burden*, the mental cost of being the one who has to make something happen — appears **nowhere** in v1.0. The assessment tells a player *what they are* and says nothing about *what it's costing them*.

And note: `Mental_Training` is an **Attacking Midfielder document**. It was written for exactly these five. This module has more right to it than any other position will.

Ten items (2 per pillar), 1–5 scale. ~90 seconds. Sits between the last question and the reveal: *"Two more. These are about the part nobody sees."*

### 7.1 The Five Pillars (verbatim from `Mental_Training`)

| Pillar | What it is | Codex elite band |
|---|---|---|
| **Risk Intelligence** | Calibrating risk to game context | 73% appropriate risk decisions |
| **Creative Confidence** | Belief surviving failure | 92% confidence retained after failure |
| **Cognitive Endurance** | Decision quality when the tank's empty | 87% of early-game quality retained late |
| **Pressure Composure** | Executing with a man on you | 84% composure under pressure |
| **Flow State Access** | Getting into the zone — and back into it | 61% of match time in flow |

### 7.2 The items

| # | Pillar | Item (1 = never · 5 = always) | Reverse |
|---|---|---|---|
| M1 | Risk Intelligence | I know exactly when to try the difficult ball and when to keep it simple. | |
| M2 | Risk Intelligence | I force the risky pass even when it's clearly not on. | ↩︎ |
| M3 | Creative Confidence | After a creative attempt fails, I'll try the next one just as freely. | |
| M4 | Creative Confidence | One mistake early and I go quiet for the rest of the game. | ↩︎ |
| M5 | Cognitive Endurance | In the last 20 minutes I still see the same pictures I saw in the first 20. | |
| M6 | Cognitive Endurance | When I'm tired, I stop checking my shoulder. | ↩︎ |
| M7 | Pressure Composure | With a defender tight to me, my touch and my decision hold up. | |
| M8 | Pressure Composure | Big games make me play *safer* than I want to. | ↩︎ |
| M9 | Flow Access | There are games where it all slows down and I barely have to think. | |
| M10 | Flow Access | Once something knocks me out of my rhythm, I can't get it back. | ↩︎ |

### 7.3 The Burden Signals — handle with real care

`Mental_Training` Part III names three position-specific challenges. Map them from the pillar scores as **gentle, non-clinical flags**. Show **at most one**.

| Signal | Trigger | What the card says |
|---|---|---|
| **Creative Burden** | Creative Confidence low **and** Pressure Composure low | *"You may be carrying more of this than you should. The best 10s learn they're one part of a creative system — not the whole of it."* |
| **Criticism Sensitivity** | M4 high | *"You take one mistake harder than the game deserves. That's common in creators — your failures are simply more visible than everyone else's."* |
| **Inconsistency Anxiety** | Flow Access low **and** Cognitive Endurance low | *"Every creative player varies. The codex's own figure: even De Bruyne runs a 6-to-9. The work isn't raising your ceiling — it's raising your floor."* |

### 7.4 🛡️ Hard rules — non-negotiable

You are putting a psychological self-report into a consumer app whose core user is **13–18 years old**. Get this wrong and it is the only thing anyone will remember about the product.

1. **No clinical language. No diagnosis. Ever.** Not "anxiety," not "low emotional stability," not a personality score out of 100. These are *football skills that grow*.
2. **Every low pillar ships with its first step, on the same screen.** Never state a deficit without an action. The codex has a full protocol per pillar — use it.
3. **Never show a ceiling, and never show a prediction of a young person's future to that young person.** `Phase_2` describes 79%-accurate five-year trajectory forecasts. **Do not ship that to a child.** This is a firm line. It is also the fastest available route to a scandal.
4. **Under-16:** parent/guardian consent gate · share card off by default · no leaderboards · no public spread.
5. **A quiet, permanent support route** on the result screen: *"If football is making you feel worse, not better, talk to someone."* One line. Never alarming, always there. The codex's own content plan includes *"Creative Player Mental Health: Breaking the Silence."* Live up to it.

---

## 8. The Performance Test Card — your self-reported in-person data

Exactly what you proposed, specified. The player runs real tests at their own training and enters the numbers. **Optional. Never gates the result. Only ever enhances it.**

### 8.1 Design rules

1. **No equipment beyond cones, tape and a phone.** If it needs a lab, it isn't on this card.
2. **Every entry carries a provenance flag** — self-timed / coach-timed / electronically timed. This drives the Evidence ladder (§4.4).
3. **Feeds only the physical and output traits** — `EXP`, `ENG`, `DRB`, `GOL`, `PAS`. It **must not** overwrite the cognitive or psychological ones. A fast kid is not thereby a Maverick.
4. **Weighted, not substituted.** ~30% of self-report weight at Silver, ~45% at Gold. It nudges the shape; it never rewrites it.

### 8.2 The battery — with the AM's own benchmarks

| Test | Feeds | Codex benchmark (Living AM Model, per 90) |
|---|---|---|
| **10m sprint** | `EXP` | The Maverick's defining marker: *"31ms faster first step"* |
| **5-10-5 agility** | `DRB`, `EXP` | Close control at speed, congested-area dribbling |
| **Take-ons: successes in 10 attempts** | `DRB`, `RSK` | **Maverick: 68% take-on success · 4.2 successful dribbles/90** |
| **Wall passes in 60s, both feet** | `PAS` | **Architect: "both feet equally effective"** (bilateral coordination 0.92) |
| **Weak-foot ratio** (20 passes each foot) | `PAS`, `CMP` | Architect again — this is his signature, and it's trivially self-testable |
| **Yo-Yo IR1 level** | `ENG` | **Dynamo: 8.9 km covered** |
| **Chances created / 90** (this season) | `VIS` | **Maestro: 3.7** |
| **Key passes / 90** | `PAS`, `VIS` | **Phantom: 2.8** · Pass completion — Phantom **91%**, Maestro **89%** (final third), Dynamo **84%** |
| **Goals / 90** | `GOL` | **Dynamo: 0.4** |

Note how clean this is: **every one of the five archetypes has at least one benchmark a player can self-report and check themselves against.** That's not true of the merged module, whose benchmarks were half-missing.

### 8.3 What it unlocks

- **Archetype-specific testing priorities.** Once the app knows you're a Maverick it says: *"For you, the numbers that matter are take-on success rate and 10m sprint. Everything else is secondary."* Show them **their** three tests, not all nine.
- **A benchmark line on the radar.** The player's shape plotted against their archetype's elite band. The most motivating single image the product can produce.
- **Retest cadence.** Every 8–12 weeks. Deltas over time. *"Your take-on success is up from 41% to 55% since March."* That's the retention engine.

### 8.4 ⚠️ Do not fake precision

A hand-timed 10m sprint carries ±0.15s of error — which is *most of the gap* between elite and average. So: never display a self-timed number to two decimal places, never rank players against each other on self-reported data, and print the provenance on the card. An honest range beats a precise lie.

---

## 9. Film (v2 / paid tier)

Player uploads 60–90 seconds. **v1 of this feature is structured tagging, not computer vision.** Do not promise automatic analysis you haven't built.

| Tagged event | Feeds | Why it matters |
|---|---|---|
| **Position at the moment of reception** | `MOV`, `HSP` | **The Phantom's defining marker: "appears in space 73% of possessions."** Only film can measure it. |
| Scans before receiving | `VIS`, `MOV` | The codex's headline cognitive metric |
| Body orientation on receipt (open / closed) | `HSP`, `PAS` | The single biggest tell of an Architect vs a Maverick |
| Line-breaking passes | `HSP`, `PAS` | Architect: 3.1/90 |
| Take-ons attempted vs completed | `DRB`, `RSK` | Maverick: 4.2 @ 68% |
| Box arrivals | `GOL`, `MOV` | Phantom + Dynamo |
| Pressing actions after loss | `ENG` | Dynamo: 8.9km |

Seven of the ten traits, **measured** rather than claimed. That is what the €149 tier is actually selling.

---

## 10. The reveal and the result card

The v1.0 reveal is good. **Keep it exactly:** anticipation beat → archetype name big and first, in its colour and emblem → details unfold. Do not touch it.

What changes is what unfolds *after* the name.

### 10.1 Keep — with two corrections

Result cards, colours (violet / magenta / pale silver / electric cyan / orange), emblems, reflect-backs, first steps, share copy: all stand. Two fixes:

- **Maverick exemplars** → Ronaldinho · **Maradona** · Hazard. (Drop Kaká — §2.4.)
- **Architect** → confirm Gündoğan; David Silva and Foden are codex-backed.

### 10.2 NEW — The trait radar

Ten axes. The player's shape, filled, in their archetype's colour. Their archetype's canonical shape behind it, as a thin outline.

This is the hero asset. It makes the share card work, it makes the result feel *measured* rather than *guessed*, and it costs you nothing — the codex already published the numbers.

### 10.3 NEW — The Mind profile

Five pillars, five bars, honest bands (`developing / competent / proficient / elite`). Plus **at most one** Burden Signal (§7.3) with its first step. You're giving a player something to work on — not a diagnosis.

### 10.4 NEW — System Fit, and the Misuse Flag ⭐

**This is now trivially buildable**, because the formation matrix is keyed to this exact taxonomy. It's a lookup.

| Formation | Maestro | Maverick | Phantom | Architect | Dynamo |
|---|---|---|---|---|---|
| **4-2-3-1** (double pivot, #10) | **97** | 82 | 85 | 94 | **96** |
| **4-3-3** (single pivot, #8) | 85 | 70 | 93 | **95** | 87 |
| **3-4-3 / 3-4-2-1** | 75 | 83 | 86 | 91 | 93 |
| **3-2-4-1** (fluid / positional) | 72 | 68 | **98** | **97** | 96 |
| *Effective range across all 15 systems* | *72–97* | ***68–88*** | *78–98* | *82–97* | *85–96* |

Then the feature nobody else has:

> ### You're a Maestro in a 3-2-4-1.
>
> Your archetype's fit in this system is **72%**. In a **4-2-3-1**, it's **97%**.
>
> That 25-point gap is why you feel like you're fighting the game instead of playing it. Constant rotation denies you the one thing you need: **a stable position to see from.**
>
> **What to do about it:** [three specific actions, from the codex's Maestro system-switching protocol]

Every player who has ever been asked to play a role that isn't theirs — which is *most academy kids* — will feel seen by that screen, and will send it to someone. The codex explicitly lists *"system incompatibility frustration"* as a crisis warning sign. This is the assessment naming it out loud.

**Two honest, archetype-specific truths that fall straight out of the table:**

- **The Maverick has the lowest ceiling of the five (68–88%).** He is the most system-dependent archetype in the position. That's not a criticism — it's the single most useful thing you can tell a Maverick, and no other product will.
- **The Dynamo fits everywhere (85–96%).** Uniquely, it has no bad system. Tell them.

### 10.5 NEW — Your next evolution

`Phase_2`'s output spec has a third field — `transition_potential` — that v1.0 doesn't use. The codex publishes natural progressions and age-related evolution (*Youth: often explosive types · Prime: complete and pure creators · Veteran: intelligence over athleticism*).

Gate it by age band. A 15-year-old Maverick told *"the next version of you is a Dynamo, and here is how"* is the strongest possible reason to open the app again next week.

### 10.6 NEW — Partnership Chemistry

Straight from the codex's dual-#10 table (`Tactical_System_Integration`, Formation 4):

| Pairing | Fit | The codex's own line |
|---|---|---|
| **Maestro + Phantom** | **95%** | *"Maestro creates, Phantom exploits the space created"* |
| Maestro + Architect | 93% | *"Two visionaries overwhelming defences"* |
| Architect + Maverick | 88% | *"Architect's passing + Maverick's chaos = unpredictable"* |
| Dynamo + anyone | 85%+ | *"Adapts to partner's style perfectly"* |

*"Send this to a teammate. Find out what you'd be together."* One completed assessment recruits another **and** produces a second shareable artefact. Build it in v1.5.

---

## 11. Data model

```ts
type TraitKey = 'VIS'|'PAS'|'DRB'|'EXP'|'MOV'|'HSP'|'RSK'|'CMP'|'ENG'|'GOL';
type TraitVector = Record<TraitKey, number>;
type ArchetypeId = 'maestro'|'maverick'|'phantom'|'architect'|'dynamo';

interface Archetype {
  id: ArchetypeId;                             // position-scoped (Module 7's ids are separate)
  name: string; tagline: string; identity: string; reflectBack: string;
  strengths: string[]; exemplars: string[];
  developmentEdge: string; firstStep: string; nextStepCTA: string;
  color: string; emblem: string; shareCopy: string;

  tacticalKey: 'Maestro'|'Maverick'|'Phantom'|'Architect'|'Complete'; // ← §2.2. REQUIRED.
  canonical: TraitVector;                      // the 0-100 row from §3
  prior: number;                               // 0.30 / 0.22 / 0.20 / 0.18 / 0.10
  systemFit: Record<string, number>;           // formation -> 0..100, via tacticalKey
  transitionsTo: ArchetypeId | null;
  testPriorities: TraitKey[];                  // which tests matter for THIS archetype (§8.3)
}

interface Option   { label: string; archetypeId: ArchetypeId; traits: Partial<TraitVector>; }
interface Question { id: string; chapter: 1|2|3; prompt: string; options: [Option,Option,Option,Option]; }

type Pillar = 'riskIntelligence'|'creativeConfidence'|'cognitiveEndurance'|'pressureComposure'|'flowAccess';
interface MindResponse { pillar: Pillar; value: 1|2|3|4|5; reverse: boolean; }

interface Context { formation: string; ageBand: string; level: string; }

interface TestCardEntry {
  test: string; value: number; unit: string;
  provenance: 'self'|'coach'|'electronic';     // ← drives evidence weight (§8.1)
  recordedAt: string;
}

interface Result {
  primary: ArchetypeId;
  secondary: ArchetypeId;
  isHybrid: boolean;                           // cos-margin < 0.20 (§5.6)
  spread: Record<ArchetypeId, number>;         // % — sums to 100
  similarities: Record<ArchetypeId, number>;   // raw cosines — keep for debugging
  playerTraits: TraitVector;                   // → the radar (§10.2)
  mind: Record<Pillar, { score: number; band: 'developing'|'competent'|'proficient'|'elite' }>;
  burdenSignal: 'creativeBurden'|'criticismSensitivity'|'inconsistencyAnxiety'|null;  // max ONE
  systemFit: { formation: string; fit: number; bestFormation: string; bestFit: number };
  misuseFlag: boolean;                         // §10.4
  transitionPotential: ArchetypeId | null;
  consistency: number;                         // < 0.45 → "answers pulled in two directions"
  confidence: number;
  evidenceLevel: 'bronze'|'silver'|'gold'|'elite';
  completedAt: string;
}
```

**Note the shape of `Result`:** it is identical whether the player did 15 items or 75 items plus film. That is the point (§1).

---

## 12. Age, sex, and safeguarding

### 12.1 Age changes the answer, not just the copy

The codex's **Creative Golden Window** is ages **13.5–15.5** (*"creative decision-making can be enhanced by up to 280%"*). A player inside that window and one outside it must not receive the same first step.

| Band | What changes |
|---|---|
| **U12** | Archetype shown as a **tendency**, never a label. No transition path. No ceiling. Play-first language. |
| **13–15** | **"You are inside the Golden Window."** The single most motivating true thing you can tell this user. Emphasise breadth over specialisation. |
| **16–18** | Specialisation begins. Full development path. Test Card unlocked. |
| **19–23** | Full product. System Fit and the Misuse Flag are most actionable here. |
| **24+** | Veteran reframe: intelligence over athleticism. |

### 12.2 Sex — a whole codex document exists and the assessment ignores it

`Womens_Football_Adaptation` covers female creative physiology, cycle-based periodization, the ACL epidemic, iron, and RED-S. v1.0 has **no sex field** and hands a woman a plan built on male physiology.

**v1 minimum:** ask (optional, skippable). Use it *only* to select the correct benchmark bands on the Test Card and the correct injury-prevention note. **Do not** change the archetype logic — the trait model is identical. Anything cycle-related: opt-in only, light touch, never in shareable output.

### 12.3 The lines that do not move

- No career-trajectory prediction shown to a young person. Ever.
- No ceiling. No *"you will not make it."*
- No clinical language.
- U16: consent gate, share off by default, no ranking.
- A quiet support route on every result screen.

---

## 13. Validation — what makes this worth €49

`Phase_2` specifies test–retest **ICC > 0.88**, inter-rater **κ > 0.85**, concurrent validity **r = 0.84** against assists + key passes. v1.0 has **no validation plan at all.** For a product with €5k–15k club licences, *"we wrote twelve questions"* is not a defensible position in a room with an academy director.

| Step | What | Target |
|---|---|---|
| **1 · Pure-respondent test** | The CI check in §5.3 | 5/5 recover, all margins > 0.20. **Blocks merge.** |
| **2 · Test–retest** | 60 players, retake at 14 days | ICC > 0.75 on the trait vector; ≥80% same primary |
| **3 · Face validity** | 15 coaches: *does this match the player you know?* | ≥70% agreement |
| **4 · Concurrent validity** | 100 players with real season stats | `VIS` correlates with chances created · `GOL` with goals · `ENG` with distance |
| **5 · Empirical prior** | First 500 completions → the real distribution | Compare against 30/22/20/18/10. **If your live Dynamo rate is far below 10%, the instrument is still hiding it.** |
| **6 · Consistency watch** | Rate of `consistency < 0.45` | High rate = items are ambiguous, not players |

Publish steps 2–4 as a one-page methodology note. **It's a sales asset**, not a compliance chore — it is exactly what no competitor quiz can produce.

---

## 14. Build order

| Sprint | Ship | Why here |
|---|---|---|
| **1** | Trait engine · 15 items · centring · cosine · prior · hybrid rule · **pure-respondent test in CI** | The engine *is* the product. Get it right and the rest is content. |
| **2** | Reveal · radar · result card · share card | The reveal is the emotional payoff. The radar makes it shareable. |
| **3** | Context items → **System Fit + Misuse Flag + Next Evolution** | Highest perceived value per line of code in the entire build. It's a lookup table. |
| **4** | Mind module · Burden Signals · safeguarding gates | The differentiator. **Do not ship it before §7.4 is implemented and reviewed.** |
| **5** | Measured tasks — Options Seen · Panic Clock · 85th Minute · Scan & Recall | The unlock. Turns a quiz into an instrument. |
| **6** | Performance Test Card · Evidence ladder · retest cadence | The retention engine. |
| **7** | Partnership Chemistry | The viral loop. |
| **8** | Film tagging | The €149 tier. |

**Cut from v1 without hesitation:** film, partnership chemistry, chronotype, anything biological.

---

## 15. Decisions I need from you

1. **Maverick exemplars** — confirm **Ronaldinho · Maradona · Hazard**, cutting Kaká? (Maradona is the codex's own headline icon for this archetype and is currently missing. Kaká fails three of the codex's four stated Maverick criteria — §2.4.)
2. **Architect** — confirm Gündoğan? David Silva and Foden are codex-backed.
3. **Mind module in v1 or v2?** Biggest differentiator *and* biggest safeguarding surface. My recommendation: **v1 — but not one day before §7.4's rules are built and reviewed.**
4. **Age gate** — hard-gate under-13, or allow with parental consent?
5. **Free tier length** — 15 items, or 15 + 10 Mind items inline (~5 min total, still inside the drop-off cliff)?
6. **`README.md`** — it lists a sixth, never-existent archetype set. Fix to canon?
7. **Module 7 (Winger)** — the archived Artist / Wide Playmaker work is ready to seed it. Want me to build that module next, on the same engine?

---

## Appendix A — Verified engine output

Reproduce with `npx tsx am-scoring-engine.ts`. Not aspirational. This is the output.

```
──────────────────────────────────────────────────────────────────────────────
1. EXPOSURE BALANCE   (v1.0 shipped 11/10/10/9/8 — that WAS the bug)
──────────────────────────────────────────────────────────────────────────────
   { maestro: 12, maverick: 12, phantom: 12, architect: 12, dynamo: 12 } ✅ 12 each

──────────────────────────────────────────────────────────────────────────────
2. PURE-RESPONDENT RECOVERY   (5/5, and every margin > 0.2)
──────────────────────────────────────────────────────────────────────────────
   pure The Maestro    → The Maestro    margin 0.382  ✅
        Maestro 79.0% · Architect 15.1% · Phantom 3.7% · Maverick 1.7% · Dynamo 0.5%
   pure The Maverick   → The Maverick   margin 0.648  ✅
        Maverick 87.4% · Dynamo 5.7% · Maestro 5.4% · Architect 0.9% · Phantom 0.6%
   pure The Phantom    → The Phantom    margin 0.665  ✅
        Phantom 80.2% · Architect 9.8% · Maestro 5.0% · Dynamo 2.8% · Maverick 2.2%
   pure The Architect  → The Architect  margin 0.344  ✅
        Architect 60.3% · Phantom 23.9% · Maestro 14.3% · Dynamo 0.8% · Maverick 0.7%
   pure The Dynamo     → The Dynamo     margin 0.497  ✅
        Dynamo 57.5% · Maverick 28.5% · Phantom 7.7% · Architect 3.6% · Maestro 2.8%

──────────────────────────────────────────────────────────────────────────────
3. HYBRID DETECTION   (cosine margin < 0.2)
──────────────────────────────────────────────────────────────────────────────
   The Architect + The Dynamo 50/50                margin 0.037 → HYBRID ✅
   The Maestro + The Architect 50/50               margin 0.061 → HYBRID ✅
   The Maverick + The Dynamo 50/50                 margin 0.078 → HYBRID ✅
   The Phantom + The Dynamo 50/50                  margin 0.131 → HYBRID ✅

──────────────────────────────────────────────────────────────────────────────
✅ ALL CHECKS PASS — safe to merge.
──────────────────────────────────────────────────────────────────────────────
```

---

*Version 2.0 — same reveal, the AM's own five archetypes, the codex finally plugged in, and an engine that can actually find a Dynamo. Position 6 of 8.*
