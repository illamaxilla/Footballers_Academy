# Addendum C — The Engagement Layer
## Games, play and the things that keep them coming back · Full Back / Wing Back Build Handoff

**Date:** July 19, 2026 · **Scope:** interactive and gamified design within phone/tablet/desktop limits
**Relationship to Addendum B:** B designs instruments that must be *valid*. C designs experiences that must be *wanted*. These are different jobs and they pull against each other.

---

## 0. The problem this solves

The product as currently specified has a cliff in it.

```
Day 1     Quiz → reveal → archetype → 12-week plan       ← peak emotional moment
Day 2     …
Day 3     …
Day 47    …
Day 84    Retest                                          ← next moment
```

Twelve weeks is a long time to hold a fifteen-year-old on the strength of one reveal. The reveal is a spike, not a habit — and everything valuable downstream (the demonstrated archetype, the dataset that unlocks the classifier, the club conversations) depends on people still being there in week nine.

**Engagement isn't decoration on this product. It's the mechanism by which the data arrives.**

---

## 1. The tension, and how to resolve it

### 1.1 Good measurement and good games are opposites

| A valid instrument | A good game |
|---|---|
| Fixed trial count | Play as long as you like |
| No feedback during trials | Constant feedback |
| Identical every time | Escalating difficulty |
| Boring on purpose | Surprising on purpose |
| One attempt counts | Retry until you win |
| Cold start | Warm-up, then flow |

These aren't stylistic differences. Feedback mid-task changes strategy, which means the second half of a session measures something different from the first half. Retries create practice effects. Escalating difficulty means no two players faced the same test.

**"Gamify the assessment" is therefore a trap.** Do it naively and you end up with a middle layer where you believe you're measuring archetype and you're actually measuring how much someone likes playing games on their phone.

### 1.2 The resolution: a membrane, not a blend

Two tiers, with a hard line between them, and **the player always knows which side they're on.**

```
┌─────────────────────────────────────────────────────┐
│  MEASURED                                           │
│  Cold, fixed, no feedback, spaced 14+ days          │
│  Feeds the archetype engine                         │
│  Badge in UI: ●  COUNTS                             │
└─────────────────────────────────────────────────────┘
                        ║  membrane
┌─────────────────────────────────────────────────────┐
│  UNMEASURED                                         │
│  Endless, responsive, noisy, whenever you want      │
│  Feeds retention, learning, identity                │
│  Badge in UI: ○  JUST FOR FUN                       │
└─────────────────────────────────────────────────────┘
```

Ambiguity here corrodes trust. If a player believes a game is shaping their archetype and later discovers it isn't, they stop believing the parts that are true. Label everything.

### 1.3 The pattern that makes both work: **Calibrate, then Arcade**

The best resolution is sequential rather than simultaneous.

1. **Calibrate.** The instrument runs cold. Fixed trials, no score shown, no feedback, no retries. Ninety seconds. The engine gets clean data.
2. **Then Arcade.** The *same task* immediately unlocks in endless mode — score, combo multiplier, escalating speed, retry forever, leaderboard against your own past. Arcade data is discarded entirely.

The player experiences one thing: a short serious bit, then the fun bit. The engine experiences one clean measurement per session. Neither is compromised.

This works for A1, A3, A4 and B1 from Addendum B with no loss of validity.

### 1.4 A convergence worth noticing

Addendum B §6.4 requires at least 14 days between administrations of the timed instruments, because practice effects would otherwise contaminate the measurement.

That constraint sounds like an engagement problem — you can only measure monthly. It isn't. **Monthly measured blocks are also the right engagement rhythm**: frequent enough to show change, rare enough to feel significant. If the archetype could be remeasured daily it would mean nothing.

The validity requirement and the design requirement agree. Build to it rather than around it.

---

## 2. What actually engages this user

Worth being specific rather than reaching for badges and streaks by default. A 14–18 year old serious about football is driven by:

| Driver | How it shows up | Product implication |
|---|---|---|
| **Identity** | They already care intensely about what kind of player they are | The archetype is the hook. Everything should reference it |
| **Visible mastery** | Small, frequent evidence of getting better | Show trend lines early, even on thin data — with ranges |
| **Football knowledge** | They consume enormous amounts of football content already | Teaching *is* entertainment here. Lean into it |
| **Comparison** | To pros, to their past self, to chosen peers | To pros: always. To past self: always. To strangers: carefully — see §5 |
| **Being seen** | The reflect-back line is the emotional core of the whole product | Repeat that quality elsewhere, not just at the reveal |
| **Belonging** | Tribalism is native to football | Archetype communities, not global rankings |

Notably absent: abstract points, generic achievements, and anything that could as easily be a language-learning app. This audience will notice.

---

## 3. The designs

Three tiers. Fifteen designs. Build maybe seven.

---

### TIER 1 — Instruments in game clothing *(measured, then arcade)*

These already exist as instruments in Addendum B. This is what they wear.

---

#### 1.1 · **HOLD OR GO** — arcade mode
*From Addendum B A4 (inhibitory control)*

**Calibrate:** 40 trials, cold, ~2 min. Winger runs at you — press when he commits, hold when he feints.

**Arcade:** endless. Speed escalates every 10 successes. A false alarm ends the run. Combo multiplier for consecutive correct holds — which is the right thing to reward, because *not* diving in is the harder skill and the one the Sentinel is built on.

- **Why it works:** it's a reaction game, which is the most immediately satisfying format on a touchscreen, and the football framing is exact — this genuinely is the full back's core defensive decision
- **Content cost:** 🟢 Low. Schematic animation, procedurally varied
- **Verdict:** **build first.** Cheapest and most immediately fun

---

#### 1.2 · **THE FORK** — daily and arcade
*From Addendum B A1 (temporal occlusion)*

**Calibrate:** 20 clips, cold, monthly.

**Arcade:** unlimited scenarios, shows the "expert" answer afterwards with a one-line reason. This is where the teaching happens.

- **Why it works:** every football fan already plays this game while watching. Making it explicit is the whole product
- **Content cost:** 🔴 **High.** Scenarios are the expensive thing. See §6
- **Verdict:** core, but budget for it

---

#### 1.3 · **THE LEDGER** — as a season
*From Addendum B A3 (risk tolerance)*

**Calibrate:** 16 forced choices, cold.

**Play mode:** the same choices strung into a narrative season. Your risk decisions accumulate into results — chances created, goals conceded, a league position. Play it out over 38 fictional matches.

- **Why it works:** it turns an abstract preference measurement into consequence. And the consequence teaches the actual lesson — that risk tolerance has a cost curve, and the right level depends on game state
- **Content cost:** 🟢 Low. Text and diagrams, no footage
- **Verdict:** **build first.** Best value-per-hour in the whole document

---

#### 1.4 · **FREEZE FRAME** — memory ladder
*From Addendum B B1 (spatial recall)*

**Calibrate:** 10 trials with unstructured controls, cold.

**Arcade:** exposure time shortens each round — 4s, 3s, 2s, 1.5s. How far can you get?

- **Content cost:** 🟡 Medium
- **Note:** the arcade version must keep the unstructured control trials or players will learn that guessing "standard shape" beats actually looking

---

### TIER 2 — Play that teaches *(unmeasured, high value)*

These don't feed the archetype engine. They do something arguably more valuable: they make the player understand the system they're inside, which makes every other output land harder.

---

#### 2.1 · **MYTH OR FACT** ⭐
*Turns Addendum A into a product feature*

Daily card. One claim. True or false.

> *"Full backs cover more ground than any other position."*
> **FALSE.** Central midfielders do — about 11.4–11.9 km at Euro 2024. Full backs led high-intensity running, sprint distance and top speed instead. Six of the ten fastest sprints at the tournament came from full backs and wing backs.

- **Why it works:** it's the single cheapest way to make the research an asset rather than a back-office document. It corrects the misconceptions this player definitely holds. And it's inherently shareable — "did you know" is the most-forwarded content format in football
- **Content cost:** 🟢 Low. You already have ~40 of these sitting in Addendum A and the Codex
- **Verdict:** **build first.** Highest ratio of engagement to effort in the document

---

#### 2.2 · **NAME THE ARCHETYPE**
Show a real professional's factual profile — crosses per 90, tackles, touches, average position, role description — and ask which of the four they are.

- **Why it works:** it teaches the taxonomy using players they already have opinions about, and arguing about it is the point
- **Content constraint:** use **real, verifiable statistics and factual role descriptions only.** No invented quotes, no fictional scenarios involving named players. Your exemplar lists in Module 3 are already the right source
- **Content cost:** 🟡 Medium. Stat sourcing and licensing needs checking per data provider
- **Verdict:** strong, second wave

---

#### 2.3 · **BUILD THE BACK LINE** ⭐
Drag four archetype cards into a formation. The app scores the fit — and explains why.

This runs on rules you already wrote. `Full_Back_Wing_Back_Archetype_System` specifies partnership pairings and system fit in detail: Warrior + Warrior as the most common elite pairing; Architect + Warrior as modern asymmetry; Architect + Architect requiring wide forwards; Sentinel poor in a possession 4-3-3; Winger exposed in a high press.

- **Why it works:** it's a puzzle with a real answer key, it teaches the compatibility model, and it turns the archetype system from a personality label into a *system* the player can reason about
- **Content cost:** 🟢 **Very low.** The rules exist. This is an interface on top of a document you already have
- **Verdict:** **build first**

---

#### 2.4 · **SPOT THE OVERLAP**
Clip plays. Tap the exact moment the full back should start their run. Compare to what happened.

- **Why it works:** overlap timing is listed as ELITE in the Warrior and Winger profiles but is never operationalised anywhere. This makes an abstract quality tangible
- **Content cost:** 🔴 High — needs footage with a defensible "correct" answer
- **Verdict:** later. Could graduate into a measured instrument once the answer key is credible

---

#### 2.5 · **THE PUNDIT**
Watch a clip — yours or a pro's — and tap moments you'd rate good or poor. Then see how a coach rated the same clip.

- **Why it works:** it builds self-analysis, which the Youth Development Pathway explicitly targets at ages 14–16 ("video analysis introduction, self-analysis capability"). It also produces something genuinely useful: the gap between how a player rates decisions and how a coach does
- **Content cost:** 🟡 Medium, and needs coach time for the answer key
- **Verdict:** strong for the academy tier

---

### TIER 3 — Pure play *(unmeasured, retention only)*

---

#### 3.1 · **THE DAILY FORK** ⭐
One scenario. Thirty seconds. Then: *62% of full backs overlapped. 21% held. You're with the majority.*

- **Why it works:** the smallest possible daily habit, and the social reveal afterwards is the hook. It's the app's equivalent of the daily word puzzle — a single tiny thing that gives you a reason to open it and something to say about it
- **Content cost:** 🔴 **The real constraint.** 365 scenarios a year. See §6
- **Verdict:** the most valuable retention mechanic here, and the one most likely to fail on content supply

---

#### 3.2 · **BEAT YOUR GHOST** ⭐
Every arcade mode records your best run. You replay against it — a ghost line, a live delta, a moment where you pull ahead or fall behind.

- **Why it works:** it delivers everything competition delivers with none of the harm. You're racing a fifteen-year-old who no longer exists. There's no one to be worse than, and no children ranked against each other (main handoff §13.3 rule 4)
- **Content cost:** 🟢 Very low — it's a feature of the arcade modes, not new content
- **Verdict:** **build first.** Highest ethics-to-effect ratio in the document

---

#### 3.3 · **DUELS**
Challenge a specific friend. Both play the same parallel form, asynchronously. Result is private to the two of you.

- **Why it works:** competition between two people who chose each other is a completely different thing from a global ranking of minors. Opt-in, symmetric, no audience
- **Verdict:** second wave, and only with the privacy model settled

---

#### 3.4 · **YOUR SEASON** ⭐
The long arc. Your archetype spread, plotted across every assessment you've ever taken.

Main handoff §6.2 already requires assessments to be append-only, so **this data exists for free.** A player watching their spread drift from 41% Winger / 29% Warrior toward 38% Warrior / 33% Winger across two seasons is the most compelling thing this app can possibly show anyone.

- **Why it works:** it's the payoff for everything else. It's also the single best screenshot for the parent, the coach, and the club
- **Content cost:** 🟢 Very low. Pure visualisation of existing data
- **Verdict:** **build early**, even though it's empty at first — the empty state is a promise. *"Come back after your next assessment and this line will start to move."*

---

#### 3.5 · **THE WEEKLY CHALLENGE**
Already specified in main handoff §5.3 — *Both Boxes*, *First Back*, *Nothing Past Me*, *Inside Ten*. Archetype-specific, self-reported, one per week.

- **Why it works:** it's the only mechanic that reaches out of the phone and into an actual match, which is where the product claims to matter
- **Verdict:** already in scope. Make it the spine of the weekly rhythm

---

## 4. The rhythm

Engagement design is mostly a question of cadence.

| Cadence | Duration | What | Purpose |
|---|---|---|---|
| **Daily** | 30–60 s | The Daily Fork · Myth or Fact | The habit. Two taps, something to say |
| **Weekly** | 5–10 min | The Weekly Challenge · one arcade session · match tally after a game | The loop that connects app to pitch |
| **Monthly** | 12–15 min | A measured block — Calibrate across 3–4 instruments | The moment that counts. Rare enough to matter |
| **Seasonal** | — | Your Season · archetype re-declaration | The payoff |

The monthly cadence is set by measurement validity, not by preference (§1.4). Build the calendar around it.

**One rule about notifications:** at most one per day, and it should be the Daily Fork. Anything more and this becomes another app that gets muted.

---

## 5. What we won't build

This section matters more than the designs. Almost every engagement mechanic that works well on adults becomes a harm when the user is fifteen and the subject is their own body and ability.

### 5.1 No randomised rewards

No loot boxes, no card packs, no variable-ratio unlocks. Randomised rewards plus any purchase mechanic is a gambling structure, and several jurisdictions now regulate it as such where minors are involved. **All unlocks deterministic:** do the thing, get the thing.

### 5.2 Streaks must be forgiving

A streak mechanic on an audience of young athletes creates two problems: anxiety when it breaks, and — worse — pressure to train when they shouldn't.

**The rule that matters:**

> A streak is never broken by a rest day, a red readiness score, or a pain flag. Those days **protect** the streak.

This is a one-line change and it's the difference between a mechanic that supports an athlete and one that quietly rewards overtraining. Main handoff §8.4 says readiness never blocks anything; this is the mirror — engagement must never override it. If the app ever creates a reason to train through pain, that's a product failure regardless of what the retention chart says.

Also: weekly targets rather than daily, and two free "freezes" a month. The goal is a habit, not a hostage.

### 5.3 No ranking children by physical output

Already main handoff §13.3 rule 4, restated because engagement design is exactly where it would get violated. Archetype communities, yes. Duels between friends, yes. Beat Your Ghost, yes. A global table of who ran furthest or jumped highest, no.

### 5.4 No engineered FOMO

No countdown timers on content, no "expiring" rewards, no notifications timed to late evening. One notification a day, in the afternoon.

### 5.5 Nothing about bodies

No physique comparison, no weight, no body composition, no appearance-linked reward. Main handoff §13.3 rule 3 applies to the engagement layer without exception.

### 5.6 Honest labelling

Every screen states whether it counts. If unmeasured play still generates data you'll analyse — and it will, engagement data is commercially valuable — say so in the privacy policy in language a teenager can read.

---

## 6. The content problem

This is where engagement layers die, and it's worth costing honestly before committing.

| Design | Content unit | Year-one volume | Rough authoring cost |
|---|---|---|---|
| The Daily Fork | One scenario | **365** | ~120 hours |
| Myth or Fact | One claim + explanation | 200 | ~30 hours (≈40 already exist) |
| The Ledger season | One decision node | 60 | ~20 hours |
| Build the Back Line | One puzzle | 40 | ~10 hours (rules already written) |
| Hold or Go | Procedural | 0 | Generated |
| The Fork (calibrated) | One clip + 4 options | 60 (3 parallel forms × 20) | ~60 hours + production |
| Name the Archetype | One player profile | 100 | ~25 hours + data licensing |

**The Daily Fork is the problem.** 365 hand-authored scenarios is not a side project.

Three ways to survive it:

1. **Parametric variation.** One scenario skeleton × game state (score, minute, opponent shape) × your own archetype = 8–12 meaningfully different presentations from one authored asset. Cuts 365 down to roughly 40 originals.
2. **Rotation.** A 90-day cycle. Nobody remembers a 30-second decision from three months ago, and if they do, their answer changing is interesting data.
3. **Community submission.** Coaches submit scenarios; the community votes. Cheap, engaging in itself, and it seeds the academy relationships you need anyway. Needs moderation.

Use all three. And note that Addendum B §6.3 already ruled out broadcast footage on licensing grounds — everything here should be **schematic and animated**, which also happens to make parametric variation trivial. Redrawing a diagram with a different scoreline costs nothing; refilming a clip costs everything.

---

## 7. Build order

| Wave | Build | Why | Effort |
|---|---|---|---|
| **1** | Myth or Fact · Build the Back Line · Beat Your Ghost · Your Season (empty state) | Zero-to-low content cost, all four run on material you already have | Days |
| **2** | Hold or Go (calibrate + arcade) · The Ledger season | First real games. Procedural or text-only, so no content cliff | 1–2 weeks |
| **3** | The Daily Fork (with parametric variation) · Weekly Challenge tracking | The habit layer. Only start once the content pipeline is proven | Weeks |
| **4** | The Fork calibrated · Freeze Frame ladder · Name the Archetype | Needs the scenario library and stat licensing | Months |
| **5** | Duels · The Pundit · Spot the Overlap | Social and coach-dependent | Later |

Wave 1 is a weekend of work against content that already exists in your project folder, and it turns a static result screen into something with a reason to reopen. That's the highest-leverage thing on this list.

---

## 8. Measuring the engagement layer

Track these, and be willing to cut a design that fails them:

| Metric | Target | Kill signal |
|---|---|---|
| Day-7 return rate | > 40% | < 20% — the reveal isn't converting to habit |
| Day-30 return rate | > 20% | < 10% |
| Measured blocks completed per player per quarter | ≥ 2 | < 1 — the engine is starving |
| Daily Fork completion when opened | > 80% | < 50% — too long or too hard |
| Arcade sessions per measured block | 2–5 | 0 means the games aren't fun; > 15 means they've replaced the point |
| Weekly Challenge self-reported completion | > 30% | < 10% — challenges are wrong for the level |

**The one that matters most is "measured blocks per quarter."** Everything in this document exists to make that number go up. A design that produces enormous arcade engagement and no measured blocks has failed, however good the retention chart looks.

---

## 9. Summary

| | |
|---|---|
| **The problem** | A 12-week gap between the reveal and the next moment |
| **The tension** | Valid instruments are boring by design; games are not |
| **The resolution** | Two tiers with a hard membrane. **Calibrate, then Arcade** |
| **The convergence** | Measurement hygiene needs monthly spacing — which is also the right engagement rhythm |
| **Build first** | Myth or Fact · Build the Back Line · Beat Your Ghost · Your Season |
| **Best game** | The Ledger as a season — cheap, teaches the real lesson |
| **Best habit** | The Daily Fork — and the hardest to supply |
| **Best payoff** | Your Season — free, because assessments are already append-only |
| **Biggest risk** | Content supply, not engineering |
| **The rule that can't bend** | A streak is never broken by rest, red readiness, or pain |

---

**End of Addendum C.** Extends main handoff §5 and §13. Depends on Addendum B for all measured instruments. No changes to the scoring engine — by design, most of this doesn't touch it.
