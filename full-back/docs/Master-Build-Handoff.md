# The Footballer's Academy — Full Back / Wing Back
## Position Build Handoff · Master Document

**Version:** 1.0 · **Date:** July 18, 2026 · **Position:** 3 of 7
**Build target:** Claude Design (web) → production
**Status:** Ready to build V1

---

## 0. How to use this document

This is the **position-level master build doc**. The Module 3 assessment spec you already have sits *inside* this document as Section 4 — that spec defines the quiz; this document defines the whole product the quiz lives in, and the order to build it.

Read it in this order:

| If you are… | Read |
|---|---|
| Building the first screens today | §2 (canon) → §3 (scope) → §4 (V1 spec) → §9 (design) → §10 (prompts) |
| Deciding what the product *is* | §1 → §3 → §7 → §14 |
| Worried about legal/safety | §13, then §3 before committing to video |
| New to a term used here | §15 glossary |

**One rule for everything below:** nothing ships that we can't stand behind. The Codex is strong enough that we don't need to overclaim — and overclaiming is the fastest way to lose a club.

---

## 1. What we're building

**The player app.** A young full back answers twelve questions, is shown the archetype that matches how they see themselves, and receives a development plan built for that archetype. They then work the plan, log what they do, and watch the gap close between *who they say they are* and *what they can demonstrate*.

That last sentence is the product. Everything else is scaffolding around it.

### The core loop

```
DECLARE ────────────► TRAIN ────────────► DEMONSTRATE ────────────► RE-DECLARE
(12 questions)     (archetype plan)     (log + field tests)      (updated profile)
     │                                          │
     └──────────── the gap between these two is the whole product ─────────┘
```

### Why this framing matters

The Codex contains two completely different instruments that must not be confused:

| | **The quiz** (Module 3) | **The classifier** (Phase 3) |
|---|---|---|
| Input | 12 self-report scenarios | VO₂max, sprint splits, tackle success, crossing accuracy, spatial awareness |
| Measures | Playing *identity* — who you want to be | Playing *capability* — what you actually do |
| Needs | A phone | A lab, a pitch, a coach, and GPS |
| Output | **Declared archetype** | **Demonstrated archetype** |

Both are legitimate. They are not the same thing, and the app must never present the first as if it were the second. A 14-year-old answering "I whip in crosses — that's my weapon" has told us their *ambition*, not their crossing accuracy.

Naming this honestly turns a weakness into the product's engine: **the distance between declared and demonstrated is the development plan.** That's not a compromise — it's better than pretending the quiz is science.

---

## 2. Locked canon

These are decided. Do not vary them across screens, documents, or modules.

### 2.1 The four archetypes

| Archetype | Identity | Colour | Emblem | Elite share |
|---|---|---|---|---|
| **The Warrior** | The Complete Full Back | Orange | Piston / engine | 30–35% |
| **The Winger** | The Attacking Full Back | Magenta | Crossing arrow / whip | 25–30% |
| **The Sentinel** | The Defensive Full Back | Steel blue | Lock / shield | 20–25% |
| **The Architect** | The Inverted Full Back | Electric cyan | Inward pivot arrow | 15–20% |

> ### ⚠️ Conflict to resolve before any build
>
> `Fullback_Codex_Product_Specifications.md` and `Fullback_Codex_Quality_Enhancement_Framework.md` refer to the archetypes as **Warrior / Sentinel / Catalyst / Ghost**. Every other document — the Archetype System framework, Phase 1, Phase 2, Phase 3, the classifier code, the prescription engine, the tactical integration doc, Parts I–V, and the Module 3 assessment — uses **Warrior / Winger / Sentinel / Architect**.
>
> **Ruling: Warrior / Winger / Sentinel / Architect is canon.** Catalyst and Ghost are legacy names from an earlier draft and must be retired.
>
> **Action:** update the two Product Specification documents, including the four archetype books (`The Catalyst's Creation` → `The Winger's Craft`; `The Ghost's Guide` → `The Architect's Blueprint`) and the four community forum channels. This is a 20-minute fix now and a brand problem later.

### 2.2 Terminology

| Use | Never use |
|---|---|
| Declared archetype | "Your archetype" (before evidence) |
| Demonstrated archetype | "Verified" / "Confirmed" |
| Projection | Prediction, forecast, prophecy |
| Readiness (training guidance) | Injury risk, medical readiness |
| Development plan | Prescription, treatment |
| Field test | Assessment (reserve for the lab battery) |

The right-hand column is not stylistic fussiness. "Prescription," "risk," and "prediction" are the words that turn a training app into a regulated medical product. See §13.

### 2.3 Voice

Direct, second person, no filler. The app talks to a 15-year-old who is serious about football, not to their parent and not to a coach. Active voice: "Track your recovery runs this week," not "Recovery runs should be tracked."

Never flatter. The reveal is emotional; the development plan is honest. A player who reads their edge and thinks *yeah, that's my weakness* trusts everything else on the screen.

---

## 3. The scope ladder

You described a very large system: player app, GVU, AI classifier, prophetic layer, injury prediction, cloud infrastructure, physical centres. All of it is coherent. None of it can be built at once, and the sequence matters more than the ambition.

Here is the honest ladder. Each rung is shippable on its own and unlocks the next.

| Rung | What ships | Needs | Realistic effort |
|---|---|---|---|
| **V1** | Assessment → reveal → result → archetype development plan (read-only) | Nothing you don't have | Days in Claude Design |
| **V2** | Accounts, plan tracking, streaks, weekly challenges, Readiness score | Backend + auth + database | Weeks |
| **V3** | Field-test entry, demonstrated archetype, match logging, progress charts | Youth benchmark table (**research task — you don't have this yet**) | Months |
| **V4** | Video upload + coach review | Legal work, moderation, storage, safeguarding policy | Months + budget |
| **V5** | Trained classifier replacing rules-based scoring | ~500 real players, expert-labelled | Years, or a club partnership |
| **V6** | Projections layer | 2–3 seasons of longitudinal data on a tracked cohort | Years |
| **Separate business** | GVU, coach certification, physical hubs | Curriculum, accreditation, capital | Not a software decision |

### Where the pain will be

The three things most likely to stall you, in order:

1. **V4 (video).** Uploading video of minors is the single heaviest compliance load in the whole product. It needs a safeguarding policy, moderation, retention rules, and consent from a parent — not the player. Recommend: **do not put video in V1 or V2.** It feels central to the vision; it is the wrong first hill.
2. **V3's benchmark table.** "Is this 14-year-old's Yo-Yo score good?" is a question your documents don't answer. The Codex benchmarks are senior elite (VO₂max 64–72, 11–13 km per match). A 14-year-old playing 70 minutes does not cover 12 km, and telling them they're failing against a senior professional standard is both wrong and demoralising. You need an age-and-maturation-scaled table before Readiness can mean anything at youth level.
3. **V5's data.** Covered in §11.

### What I'd cut from V1 and why

| Cut | Reason | Where it goes |
|---|---|---|
| Login before the result | Kills completion rate. Module 3 already gets this right | After reveal, V1 |
| Video upload | §13 | V4 |
| Readiness score | Needs 28 days of logged data to mean anything | V2 |
| Peer comparison / percentiles | You have no peers in the database yet | V3 |
| Career projection | You have no longitudinal data | V6 |
| Coach/club dashboard | Different customer, different product | Separate track |

---

## 4. V1 build spec — The Archetype Assessment

This section supersedes nothing in Module 3; it wraps it in the screens, states, and acceptance criteria needed to actually build it.

### 4.1 Screen flow

```
[1] WELCOME ──► [2] QUESTION ×12 ──► [3] ANTICIPATION ──► [4] REVEAL
                     (3 chapters)         (~2.5s)              │
                                                               ▼
                    [7] PLAN ◄── [6] SAVE / ACCOUNT ◄── [5] RESULT + SHARE
```

### 4.2 Screen specs

---

#### [1] Welcome

**Job:** get them to question 1 in under five seconds.

- Headline: **Which full back are you?**
- Sub: Twelve questions. Two minutes. No right answers.
- Primary action: `Start`
- No sign-up. No email. No explanation of methodology.

**States:** default only.

---

#### [2] Question (×12)

**Job:** one decision at a time, no backtracking anxiety.

- Chapter eyebrow: `CHAPTER 1 · GOING FORWARD` (chapters per Module 3 §5)
- Progress: chaptered — twelve segments in three groups of four. Filled segments use chalk, not colour (colour is reserved for the reveal).
- Question text, then four options as full-width tappable cards.
- One question per screen. Advance on tap — no separate "Next" button.
- `Back` available, top-left, quiet.

**States:** default · option hover/focus · option selected (brief 150ms hold before advancing, so the tap registers) · back-navigated (previous answer shown selected).

**Content:** Module 3 §5, verbatim. Twelve questions, three chapters, four options each, each option mapped to exactly one archetype.

> **Build note — shuffle the option order.** In Module 3 the archetype order within each question is fixed in patterns (Q1–Q4 run Winger/Architect/Warrior/Sentinel almost every time). A player who spots the pattern answers positionally rather than honestly. Randomise option order per question at render time, keeping the label↔archetype mapping intact. This is a five-line change and it materially improves the instrument.

---

#### [3] Anticipation

**Job:** create the beat before the reveal. This is the only place in V1 that earns real motion.

- Duration: 2.5 seconds, fixed. Not tied to a fake loading bar — nothing is loading.
- Copy: a single line, e.g. `Reading your game…`
- Visual: the Corridor (§9.4) draws itself top to bottom in chalk.
- Respect `prefers-reduced-motion`: skip to 400ms fade.

---

#### [4] Reveal

**Job:** the payoff. Name first, big, in colour.

Sequence:
1. Screen floods with the archetype colour along the Corridor (600ms).
2. Emblem draws (400ms).
3. **THE WARRIOR** — display face, largest type in the app (300ms, delayed).
4. Tagline: *The Complete Full Back* (200ms, delayed).
5. Everything else fades up together.

Name before detail, always. The player should know their archetype before they've read a word of explanation.

---

#### [5] Result + share

**Job:** make them feel seen, then give them one thing to do.

Content blocks in order (all from Module 3 §7):

1. **Reflect-back** — the "you want to…" line. Largest body text on the screen. This is the sentence that makes them feel understood; give it room.
2. **This is you** — the identity paragraph.
3. **Spread** — the four archetypes as percentages. Primary in colour, others in chalk-dim. If primary and secondary are within 8 points, label it a **hybrid** and say so explicitly: *Warrior–Architect hybrid.*
4. **Strengths** — three items.
5. **You play like** — three exemplars.
6. **Your edge** — the development gap. Framed as opportunity, never as failure.
7. **First step this week** — one action.
8. **Share card** — see below.
9. Primary action: the next-step CTA from the archetype card.

**Share card spec:** 1080×1350 (4:5, Instagram-native). Archetype colour field, emblem, archetype name in display face, share line from Module 3, small wordmark. No player data, no percentages — the card is an identity statement, not a report. Generate client-side; offer download and native share.

**Edge case — flat spread.** If no archetype exceeds 30%, don't fake a result. Show the top two as a genuine hybrid and add: *You're not settled into one identity yet — that's normal, and it's an advantage at your age.* This is true for most under-15s and it protects the instrument's credibility.

---

#### [6] Save / account

**Job:** capture the result without blocking it.

Appears **after** the result is visible, not before. Copy: `Save your profile to get your development plan.` Email + password, or a magic link. Age gate here (§13), not earlier.

Skippable — a player who leaves without an account still saw their reveal, still has the share card, and can come back.

---

#### [7] Development plan

See §5.

### 4.3 Scoring

Per Module 3 §6: +1 per answer to the mapped archetype; convert the four totals to percentages; highest = primary, second = secondary.

```
scores = { WARRIOR: 0, WINGER: 0, SENTINEL: 0, ARCHITECT: 0 }
for each answer: scores[answer.archetypeId] += 1
spread[a] = round(scores[a] / 12 * 100)

primary   = argmax(spread)
secondary = second highest
hybrid    = (spread[primary] - spread[secondary]) <= 8
```

Note: the twelve questions distribute three per archetype across the option set, so a maximally consistent player scores 12/0/0/0 and a perfectly balanced one scores 3/3/3/3 (25% each). The flat-spread rule above catches that case.

### 4.4 V1 acceptance criteria

Build is done when all of these are true:

- [ ] A player can go from landing to reveal without an account
- [ ] All twelve questions match Module 3 §5 word for word
- [ ] Option order is randomised per render; mappings are intact
- [ ] Every one of the four archetypes is reachable by a plausible answer set (test all four)
- [ ] The hybrid case renders correctly (test a 4/4/2/2 answer set)
- [ ] The flat-spread case renders correctly (test 3/3/3/3)
- [ ] Reveal shows the archetype name before any descriptive text
- [ ] Share card downloads at 1080×1350 and is legible at thumbnail size
- [ ] Full keyboard navigation with visible focus rings
- [ ] `prefers-reduced-motion` is respected on the anticipation and reveal
- [ ] All text meets WCAG AA contrast (4.5:1 body, 3:1 large) against its background
- [ ] Works at 360px width
- [ ] Back navigation preserves previous answers

---

## 5. The development plan (V1: read-only)

The player's reward for finishing. In V1 this is static content per archetype — no tracking, no logging. It exists so the reveal leads somewhere.

### 5.1 Structure

The prescription engine in Phase 3 outputs ten domains (endurance, speed/power, technical, tactical, recovery, nutrition, periodization, partnership, monitoring, philosophy). That's a professional club's structure and it will overwhelm a 15-year-old. Compress to **four pillars**:

| Pillar | Answers the question | Source in Codex |
|---|---|---|
| **Engine** | Can I last? | `_prescribe_endurance`, `_prescribe_speed_power` |
| **Weapon** | What am I best at? | `_prescribe_technical` |
| **Brain** | Where should I be? | `_prescribe_tactical` |
| **Habits** | Am I recovering? | `_prescribe_recovery`, `_define_monitoring` |

### 5.2 Shape

**12 weeks, three blocks of four.** Each week: three focus sessions + one challenge. Each session: one pillar, one aim, three to five drills, 30–45 minutes.

Block 1 — build the base. Block 2 — add the archetype's signature work. Block 3 — apply under pressure and fatigue.

### 5.3 Archetype plan briefs

Each plan's *centre* is the archetype's strength; each plan's *edge work* is the line already written in the Module 3 result card. They must agree — the player reads the edge on the result screen and then sees it appear in the plan. That continuity is what makes the plan feel personal.

---

#### Warrior — *"Balanced excellence through volume and variety"*

- **Centre:** two-way work rate, endurance, recovering every position
- **Engine:** highest volume of the four plans. Repeated-sprint work, aerobic base, recovery-run mechanics
- **Weapon:** deliberately choose one — delivery *or* 1v1 defending — and overload it. The Warrior's risk is being good at everything and elite at nothing
- **Brain:** transition decisions — when to commit forward, when to hold
- **Edge (from result card):** develop a standout weapon
- **Signature challenge:** *Both Boxes* — in one match, record a defensive action in your own box and a touch in theirs

---

#### Winger — *"Attack-first with defensive competency"*

- **Centre:** crossing, overlapping runs, chance creation
- **Engine:** speed-endurance over pure volume. Repeated high-intensity efforts with short recovery — the physical basis of getting forward *and* getting back
- **Weapon:** delivery. Volume crossing from varied angles, both feet, moving and static, then under fatigue
- **Brain:** recovery positioning — the single thing that separates a Winger who plays from one who gets subbed
- **Edge (from result card):** defensive positioning and recovery
- **Signature challenge:** *First Back* — after every attacking run you make, be the first player to recover your defensive position

---

#### Sentinel — *"Defensive excellence with tactical discipline"*

- **Centre:** 1v1 lockdown, positioning, flank security
- **Engine:** strength and deceleration over volume. Eccentric work, change of direction, contact tolerance
- **Weapon:** 1v1 defending — body position, showing inside, timing the challenge
- **Brain:** positioning and cover — reading danger before it arrives
- **Edge (from result card):** attacking output
- **Signature challenge:** *Nothing Past Me* — a full match without being beaten on the outside

---

#### Architect — *"Tactical sophistication and technical mastery"*

- **Centre:** inside control, tempo, positional intelligence
- **Engine:** the lowest volume of the four, the highest agility and repeated-effort quality. Enough physicality to defend the flank when the system asks
- **Weapon:** passing range and receiving under pressure — both feet, tight areas, progressive passes
- **Brain:** when to invert, when to hold width. Positional timing
- **Edge (from result card):** wide defending fundamentals
- **Signature challenge:** *Inside Ten* — ten touches in a central midfield position in one match

---

### 5.4 Youth adaptation — non-negotiable

Every plan is age-gated. From the Youth Development Pathway:

| Age | What the plan may contain |
|---|---|
| **U11** | Play, ball mastery, multi-directional movement. **No position specialisation, no load prescription.** The app should tell an under-11 to go and play, and mean it |
| **11–13** | Position concepts introduced. Bodyweight strength only. Pre-PHV monitoring |
| **14–16** | The critical endurance window opens. Full four-pillar plan applies |
| **17–21** | Archetype-specific refinement; professional habits |

If age is unknown, default to the 11–13 plan. Never default upward.

---

## 6. Data model

*New to this? A data model is just the list of things your app stores and how they relate. Getting it roughly right now saves painful rebuilds later — it's the one piece of V1 worth over-thinking, because screens are cheap to change and data structures are not.*

### 6.1 V1 (no backend — everything in memory)

```ts
type ArchetypeId = 'WARRIOR' | 'WINGER' | 'SENTINEL' | 'ARCHITECT';

interface Archetype {
  id: ArchetypeId;
  name: string;              // "The Warrior"
  tagline: string;           // "The Complete Full Back"
  identity: string;          // the "This is you" paragraph
  reflectBack: string;       // the "You want to..." line
  strengths: string[];       // 3
  exemplars: string[];       // 3
  developmentEdge: string;
  firstStep: string;
  nextStepCTA: string;
  color: string;             // CSS var reference
  emblem: string;            // SVG id
  shareCopy: string;
}

interface Chapter  { id: string; number: 1|2|3; title: string; }
interface Question { id: string; chapterId: string; text: string; options: Option[]; }
interface Option   { id: string; label: string; archetypeId: ArchetypeId; }

interface Result {
  primary: ArchetypeId;
  secondary: ArchetypeId;
  spread: Record<ArchetypeId, number>;   // percentages, sum 100
  isHybrid: boolean;
  isFlat: boolean;                       // no archetype above 30%
  completedAt: string;                   // ISO date
}
```

### 6.2 V2+ (backend) — shape it now, build it later

Designing these now costs nothing and means V1's `Result` slots straight in.

```ts
interface Player {
  id: string;
  displayName: string;
  dateOfBirth: string;        // drives every age gate — never store age
  dominantFoot: 'left' | 'right' | 'both';
  side: 'left' | 'right' | 'both';
  defensiveSystem: 'back_four' | 'back_three' | 'varies';  // Addendum A §2.2
  currentLevel: 'grassroots' | 'academy' | 'semi_pro' | 'pro';
  guardianEmail?: string;     // required under 16 — see §13
  consentStatus: 'pending' | 'granted' | 'expired';
  createdAt: string;
}

interface Assessment {                  // one per quiz sitting; never overwrite
  id: string;
  playerId: string;
  type: 'declared' | 'demonstrated';
  result: Result;
  evidenceTier: 1 | 2 | 3;              // see §7
  confidence: number;                   // 0–1
  takenAt: string;
}

interface DevelopmentPlan {
  id: string;
  playerId: string;
  archetypeId: ArchetypeId;
  ageBand: 'U11' | '11_13' | '14_16' | '17_21';
  startedAt: string;
  weeks: PlanWeek[];                    // 12
}

interface PlanWeek {
  weekNumber: number;                   // 1–12
  block: 1 | 2 | 3;
  sessions: PlanSession[];              // 3
  challengeId: string;                  // 1
}

interface PlanSession {
  id: string;
  pillar: 'engine' | 'weapon' | 'brain' | 'habits';
  aim: string;
  drills: Drill[];
  durationMin: number;
}

interface SessionLog {                  // player-reported completion
  id: string;
  playerId: string;
  sessionId: string;
  completedAt: string;
  rpe: number;                          // 1–10 Borg CR10
  durationMin: number;
  note?: string;
}

interface WellnessEntry {               // daily, four items 1–5
  id: string;
  playerId: string;
  date: string;                         // one per player per day
  sleepQuality: number;
  soreness: number;                     // reverse-scored
  energy: number;
  mood: number;
  painFlag: boolean;                    // pain ≠ soreness — see §8.4
}

interface FieldTest {                   // V3
  id: string;
  playerId: string;
  testId: string;                       // 'yoyo_ir2' | 'sprint_20m' | 'cmj' | ...
  value: number;
  unit: string;
  conditions?: string;
  verifiedBy?: 'self' | 'coach' | 'club';
  takenAt: string;
}
```

**Two rules worth holding to:**

1. **Assessments are append-only.** Never update a player's archetype in place. Store every assessment and derive "current" from the latest. The history *is* the product in V3 — a player watching their spread shift from Winger toward Warrior over two seasons is the most compelling thing this app can show them.
2. **Store date of birth, never age.** Age changes; birth date doesn't. Every age gate derives from it.

---

## 7. The evidence tier model

This is the architectural idea that reconciles a phone app with a $5.5M assessment lab. Rather than pretending the quiz is science, be explicit about how much evidence sits behind any claim.

| Tier | Evidence | Available to | Output | Confidence |
|---|---|---|---|---|
| **1** | 12-question self-report | Everyone, free, instantly | **Declared archetype** | Low — stated as identity, not capability |
| **2** | + field tests (Yo-Yo IR2, 20m sprint, CMJ, crossing accuracy, 1v1 success) | Anyone with a pitch, cones, a stopwatch and a phone | **Demonstrated archetype** | Moderate — the app's real value proposition |
| **3** | + club data (GPS distance, high-intensity metres, sprint count, match events) | Academy and pro partners | **Verified archetype** | High |
| **Lab** | The Phase 2 battery — 8,347 measurement points, VO₂max, lactate, biomechanics | Research and elite partnerships only | Full biological profile | Highest |

### How this appears in the UI

Every archetype claim carries its tier visibly. Not buried in a tooltip — on the card.

```
┌─────────────────────────────────────┐
│  THE WARRIOR                        │
│  The Complete Full Back             │
│                                     │
│  ◉○○  DECLARED                      │
│  Based on how you see your game.    │
│  Add field tests to demonstrate it. │
└─────────────────────────────────────┘
```

Three consequences, all good:

1. **It's honest** — nobody can accuse you of dressing a quiz up as science.
2. **It's a progression mechanic** — filling in the tier dots is intrinsically motivating, and it's free to build.
3. **It's your commercial ladder** — Tier 1 free, Tier 2 subscription, Tier 3 club licence. The product architecture and the pricing architecture are the same shape.

### The one hard rule

**Tier 2 cannot ship without age-scaled benchmarks.** A Yo-Yo IR2 score is meaningless without knowing what's good *for a 14-year-old at this stage of maturation*. Your existing benchmarks are senior elite. Deriving a youth table is a research task — published normative data, maturation adjustment (years from peak height velocity, not chronological age), then validation. Until it exists, Tier 2 shows raw values and personal trend only, with no comparison and no "demonstrated archetype."

---

## 8. Readiness score (V2)

You asked for readiness scores. Here is a definition that is buildable, defensible, and doesn't claim to be medical.

### 8.1 Wellness (daily, 0–100)

Four questions, each 1–5, thirty seconds to answer:

| Item | Scale |
|---|---|
| Sleep quality last night | 1 = terrible → 5 = excellent |
| Muscle soreness | 1 = very sore → 5 = none |
| Energy | 1 = empty → 5 = full |
| Mood / motivation | 1 = flat → 5 = buzzing |

```
raw      = sleep + soreness + energy + mood      // 4–20
wellness = ((raw - 4) / 16) * 100                // 0–100
```

### 8.2 Load

Session load uses **session-RPE**, the standard field method — no wearable required:

```
sessionLoad = rpe (1–10) × durationMinutes       // arbitrary units (AU)
acuteLoad   = sum of AU over the last 7 days
chronicLoad = sum of AU over the last 28 days ÷ 4
acwr        = acuteLoad / chronicLoad            // acute:chronic workload ratio
```

### 8.3 Readiness

```
loadModifier =
  acwr <  0.80          → 0.95     // undertrained, not unsafe
  acwr in [0.80, 1.30]  → 1.00     // the sweet spot
  acwr in (1.30, 1.50]  → 0.85     // ramping fast
  acwr >  1.50          → 0.70     // spike — flag it

readiness = round(wellness × loadModifier)
```

**Before 28 days of data exist**, `chronicLoad` is unreliable. Set `loadModifier = 1.00` and label the score `BUILDING BASELINE — day 12 of 28`. Do not fake precision on day three.

| Band | Score | Message |
|---|---|---|
| 🟢 Green | 80–100 | Good to go. Train as planned. |
| 🟡 Amber | 60–79 | Train, but ease off the top end today. |
| 🔴 Red | < 60 | Reduce load. Prioritise sleep and food. |

### 8.4 Safety rules — non-negotiable

1. **Red never says "you are injured."** It says "reduce load."
2. **Pain is not soreness.** Add one yes/no item: *Are you in pain (not just sore)?* If yes, break the flow entirely — no score, no session. Show: *Pain is different from soreness. Speak to your coach, physio, or a parent before you train.* This costs one boolean and it is the most important line in the app.
3. **Readiness never blocks anything.** It informs; the player and their coach decide.
4. **No readiness score under 13.** A twelve-year-old does not need a daily wellness number. It risks introducing exactly the anxious self-monitoring you don't want in a child athlete.

### 8.5 Archetype-specific readiness (V3)

Once Tier 2 exists, add a second score: *readiness for your archetype's demands*, comparing the player's trend against their archetype's profile — endurance-weighted for Warrior, speed-endurance for Winger, strength and deceleration for Sentinel, technical volume for Architect. This is the position-specific hook that no generic training app has. It requires §7's benchmark table first.

---

## 9. Design system

### 9.1 Direction — "The Corridor"

The full back's world is a *lane*. One flank, touchline to touchline, up and back, all match. The Codex's central claim is about distance covered — 11 to 13 kilometres in that corridor.

So the interface has a spine: a vertical chalk line running the full height of every screen, offset left. Progress moves along it. On the reveal, it floods with the archetype's colour. It's the flank the player owns, and it's the one thing the app will be remembered by.

Everything else stays quiet. Spend the boldness here.

### 9.2 Colour

Base is grass under floodlight — near-black with a green cast, not neutral black. This isn't decoration: the four archetype colours are locked by the brief and are highly saturated, and they need a base that lets all four sit at equal weight.

```css
--pitch:        #0B1410;   /* base */
--pitch-raised: #14201A;   /* cards, option surfaces */
--pitch-line:   #1E2C25;   /* dividers, inactive segments */
--chalk:        #F2F5F0;   /* primary text, the Corridor */
--chalk-dim:    #8A9690;   /* secondary text, labels */

--warrior:      #FF6B1A;   /* orange */
--winger:       #E5197F;   /* magenta */
--sentinel:     #5B9BD5;   /* steel blue — brightened for AA on dark */
--architect:    #22D3EE;   /* electric cyan */
```

**Rules:** archetype colour appears *only* after the reveal. During the assessment everything is chalk and pitch — the colour arriving is the payoff. Sentinel's steel blue is brightened from the spec value to clear 4.5:1 on `--pitch`; check any archetype colour used for text, not just fills.

### 9.3 Type

| Role | Face | Use |
|---|---|---|
| Display | **Archivo** (600–900, condensed widths) | Archetype names, screen headlines. Industrial grotesque — stadium signage, not editorial serif |
| Body | **IBM Plex Sans** (400/500) | Questions, options, plan text |
| Data | **IBM Plex Mono** (400/500) | Scores, distances, percentages, tier labels, timers |

The mono face for every number is a deliberate choice: this system's identity is measurement, so measurements should look measured. All three are on Google Fonts.

```
Display XL   64/60   Archivo 900, -0.02em   → archetype name on reveal
Display L    40/44   Archivo 800, -0.01em   → screen headlines
Body L       20/30   Plex Sans 400          → reflect-back line, question text
Body M       16/26   Plex Sans 400          → options, plan copy
Label        12/16   Plex Mono 500, 0.12em, uppercase → chapter eyebrows, tier labels
Data         32/32   Plex Mono 500          → readiness, percentages
```

### 9.4 Layout & the signature

- Single column, max 560px, left-aligned to the Corridor.
- The Corridor: 1px `--chalk` vertical rule at 24px from the left edge (16px on mobile), full viewport height, 40% opacity. Content sits to its right.
- Progress renders **on** the Corridor as twelve filled segments in three chaptered groups — not as a separate progress bar. The structure encodes the content: three chapters, four questions each.
- On reveal, the Corridor animates to 100% opacity in the archetype colour and thickens to 3px.
- Radius: 4px. Anything softer fights the chalk-line language.
- Spacing scale: 4 / 8 / 16 / 24 / 40 / 64.

### 9.5 Motion

One orchestrated moment — the reveal (§4.2). Everywhere else: 150ms ease-out on interactive states, nothing more. Every motion rule respects `prefers-reduced-motion`.

### 9.6 Quality floor

Responsive to 360px · visible keyboard focus on every interactive element · WCAG AA contrast throughout · reduced motion respected · no text below 12px · tap targets ≥ 44×44px.

---

## 10. Building it in Claude Design

Build in this order. Each step is independently checkable, which matters when you're learning — you'll know exactly which step broke something.

| Step | Build | Check |
|---|---|---|
| 1 | Design system + welcome screen | Corridor renders, type scale is right, works at 360px |
| 2 | Question screen, hard-coded to Q1 | Options tappable, focus visible |
| 3 | All twelve questions + chaptered progress + back nav | Can reach the end; back preserves answers |
| 4 | Scoring + result data | Console-log the spread; hand-test all four archetypes |
| 5 | Anticipation + reveal | Name appears before detail; reduced motion works |
| 6 | Result screen, all eight blocks | Hybrid and flat-spread cases render |
| 7 | Share card | Downloads at 1080×1350, legible small |
| 8 | Development plan (static) | Correct plan per archetype; age gate works |

### Prompt 1 — foundation

> Build the first screen of a football archetype assessment web app called The Footballer's Academy, for the full back position.
>
> **Design system.** Dark base `#0B1410` (grass under floodlight), cards `#14201A`, text `#F2F5F0`, secondary text `#8A9690`. Type: Archivo (display, weights 800–900, tight tracking), IBM Plex Sans (body), IBM Plex Mono (all numbers and uppercase labels, 0.12em letter-spacing). Border radius 4px. Spacing scale 4/8/16/24/40/64. Single column, max-width 560px.
>
> **Signature element — the Corridor.** A 1px vertical rule in `#F2F5F0` at 40% opacity, positioned 24px from the left edge (16px on mobile), running the full viewport height. All content sits to its right, left-aligned to it. This represents the flank a full back owns.
>
> **Welcome screen.** Headline "Which full back are you?" in Archivo 800 at 40px. Sub-line "Twelve questions. Two minutes. No right answers." in Plex Sans 20px, `#8A9690`. One button, "Start", chalk-white background, dark text.
>
> Responsive down to 360px. Visible keyboard focus rings. No other content.

### Prompt 2 — the assessment

> Add the assessment flow. Twelve questions across three chapters, one question per screen.
>
> **Progress lives on the Corridor**, not in a separate bar: twelve small segments along the vertical rule, grouped 4-4-4 with a gap between chapters. Completed segments are solid `#F2F5F0`; the rest are `#1E2C25`.
>
> **Each question screen:** chapter eyebrow in Plex Mono uppercase 12px `#8A9690` (e.g. "CHAPTER 1 · GOING FORWARD"), question in Plex Sans 20px, then four full-width option cards on `#14201A` with 4px radius and 16px padding. Tapping an option holds the selected state for 150ms, then advances. A quiet "Back" link top-left.
>
> Each option maps to one archetype: WARRIOR, WINGER, SENTINEL or ARCHITECT. **Randomise the display order of the four options on each render**, keeping each label bound to its own archetype. Store answers in state so Back restores the previous selection.
>
> [paste the twelve questions from Module 3 §5 here]

### Prompt 3 — reveal and result

> Add scoring and the reveal.
>
> **Scoring:** +1 to the mapped archetype per answer; convert to percentages of 12. Primary is highest, secondary is second. If primary minus secondary ≤ 8, flag as hybrid. If no archetype exceeds 30%, flag as flat.
>
> **Anticipation screen:** 2.5 seconds. The Corridor draws itself top to bottom. One line of text: "Reading your game…". If `prefers-reduced-motion` is set, replace with a 400ms fade.
>
> **Reveal, in this exact order:** the Corridor floods with the archetype colour and thickens to 3px (600ms) → emblem draws (400ms) → archetype name in Archivo 900 at 64px, in the archetype colour (300ms) → tagline (200ms) → everything else fades up. The name must appear before any descriptive text.
>
> Archetype colours: Warrior `#FF6B1A`, Winger `#E5197F`, Sentinel `#5B9BD5`, Architect `#22D3EE`. These appear nowhere before this moment.
>
> **Result screen blocks, in order:** reflect-back line (Plex Sans 20px, the largest body text on the screen), identity paragraph, the four-archetype percentage spread with the primary in colour and the rest in `#8A9690`, three strengths, three exemplars, the development edge, the first step, and a CTA button. If hybrid, title it e.g. "Warrior–Architect hybrid". If flat, show the top two and add: "You're not settled into one identity yet — that's normal, and it's an advantage at your age."
>
> Under the archetype name add a tier indicator: three dots with only the first filled, and the label "DECLARED" in Plex Mono uppercase 12px, with "Based on how you see your game." beneath it.
>
> [paste the four result cards from Module 3 §7 here]

### Prompt 4 — share card

> Add a share card generated on the result screen. 1080×1350 (4:5). Full-bleed archetype colour, the emblem centred, the archetype name in Archivo 900 reversed out, the tagline beneath it, the share line from the archetype's card, and a small "The Footballer's Academy" wordmark bottom-left. No percentages and no player data. Render to canvas, offer a download button and the native share sheet where available. Check it's legible at 200px wide.

---

## 11. The bigger modules — what each actually needs

You named five ambitions beyond the player app. Each is achievable. Each is gated on something specific, and knowing the gate is more useful than a timeline.

### 11.1 AI archetype classifier

**Gate: real labelled data.**

Phase 3 reports 93% primary-archetype accuracy. Read how that number was produced: the synthetic database was generated *from* the archetype distributions, and then the classifier — which uses those same distributions as its priors — was asked to recover the labels. That measures internal consistency of the model, which is real and worth having. It does not measure whether the archetypes exist in real players or whether the classifier can find them.

This isn't a flaw in the work; it's the correct way to build and debug a classifier before you have data. It just can't be quoted as a validation result. If a club's head of recruitment asks "validated against what?", the answer has to be honest, and right now the honest answer is "simulation."

**What you need to close it:**

- ~500 real players with both trait measurements *and* an archetype label from an expert coach
- Independent labels from at least two coaches per player, with inter-rater agreement reported (if two good coaches disagree on which players are Warriors, the categories need refining before any model does)
- A held-out test set the model never sees during development

**In the meantime:** the rules-based scoring in §4.3 isn't a placeholder. For a self-report instrument it's the *correct* method — transparent, explainable, and no worse than a model trained on data you don't have. Ship it without apology.

**Realistic route:** one academy partnership gets you a labelled cohort faster than any amount of building.

### 11.2 The projection layer ("prophetic")

**Gate: longitudinal data.**

The Prophetic Engine's structure is genuinely good — multi-horizon, uncertainty-quantified, continuously learning. But every prediction model needs the same thing: the same players measured repeatedly over time, so the model can learn what an early pattern turned into. You currently have zero longitudinal records, and there is no shortcut. Two to three seasons of a tracked cohort is the minimum.

**Ship-safe interim.** Everything below is buildable now and defensible:

- Call it **Projection**, never prediction or prophecy
- Show **ranges**, never point values: "players on this trajectory typically add 8–15% to their Yo-Yo score over 12 weeks"
- Show **scenarios**, not fate: "if you complete 80% of sessions…" / "if you complete 40%…"
- State the basis on the same screen: *Based on your last 12 weeks. Not a forecast of your career.*
- Publish accuracy only once measured against real outcomes, and publish it in the app, not just in the pitch deck

The 96% / 84% / 76% accuracy figures should not appear in any player-facing surface or any club-facing claim until they're measured on real data. Attach them to a market, and they become a warranty.

### 11.3 Injury prediction

**Gate: legal advice, before a line of code.**

This is the highest-exposure feature in your entire roadmap. Software that claims to predict or diagnose injury can fall under medical device regulation — EU MDR, UK MDR, or FDA depending on market and claim. Framing decides it: a "training load management" tool is generally software; an "injury risk predictor" generally isn't. The 14-day advance-warning claim in the Global Implementation Roadmap is squarely on the wrong side of that line as written.

Then consider the human case. A 15-year-old is told their hamstring risk is low, plays, and tears it. Or is told it's high, sits out a trial, and doesn't get signed. Both outcomes are foreseeable and both land on you.

**Recommendation:** build load management, not injury prediction. §8's ACWR flag already gives you the useful part — "your load spiked this week" — with none of the exposure. Get specialist regulatory advice in your target market before going further. This is the one item on the roadmap where I'd say: don't proceed on your own judgement.

### 11.4 The Global Virtual University

**Gate: it's a different company.**

Worth saying plainly — there is no GVU or ATLAS material in the Full Back project knowledge. It sits outside this position's documentation, which suggests it's a cross-project ambition rather than something the fullback work currently supports.

An educational institution with colleges, faculty, accreditation and physical hubs is not an adjacent feature of a player app. It has different customers, different revenue mechanics, different regulation, and a different team. Building it alongside V1 would starve both.

**But there is a real wedge here, and it's already in your documents:** the **Elite Coach Certification** (60 hours, five modules) from the Strategic Synopsis. That is education, it's B2B, it sells at a price that funds development, and it needs no accreditation to launch. It's the GVU's first course. Build that, sell it, and let it tell you whether the full institution has demand — rather than betting the roadmap on the assumption that it does.

**ATLAS (the AI tutor)** is the one GVU component that's genuinely near-term: an assistant that answers questions grounded in the Codex. Scoped as "a tutor that knows the Full Back Codex," it's a V3-class feature. Scoped as "the teaching intelligence of a global university," it isn't.

### 11.5 Physical hubs

**Gate: capital.**

Your own Phase 2 costing is $5.5M setup and $620K annual operating per site. That's a capital-raise decision, not a product decision. Nothing in the software roadmap depends on it. Park it until there's revenue that argues for it.

---

## 12. Sequencing summary

If you build in this order, every stage funds or de-risks the next:

```
V1  Assessment + reveal + static plan        →  proves people want it
V2  Accounts, tracking, readiness            →  proves they come back
    Coach Certification (parallel, B2B)      →  first real revenue
V3  Field tests + demonstrated archetype     →  the actual differentiator
    Academy partnership                      →  the labelled dataset
V4  Video (only with legal work done)
V5  Trained classifier                       →  needs V3's dataset
V6  Projections                              →  needs 2–3 seasons of V3
```

The critical path to everything ambitious runs through **V3 and an academy partnership**. Every AI feature you want is downstream of having real data about real players, and no amount of building substitutes for it. That's the single most useful thing to know about this roadmap.

---

## 13. Compliance & safety gates

Your own product spec targets ages 12+. That makes this a children's product, and children's products have rules that are cheap to design in and ruinous to retrofit.

### 13.1 By stage

| Stage | Required before ship |
|---|---|
| **V1** | Privacy policy · cookie/analytics consent · no personal data collected before the result · medical disclaimer on the development plan |
| **V2** | Age gate at signup · verifiable parental consent under 16 (GDPR-K; under 13 for COPPA in the US) · data export and deletion · no behavioural advertising to minors, ever |
| **V3** | Clear statement that field tests are self-reported · no health claims from test results |
| **V4** | Safeguarding policy · video moderation · retention and deletion schedule · separate explicit consent for video of a minor · DBS-equivalent checks for any adult reviewing footage |

### 13.2 The age question — decide this first

**Setting the floor at 13+ rather than 12+ removes COPPA from your build entirely.** One year of audience, in exchange for a materially simpler product. GDPR-K still applies in the EU (the consent age is 13–16 depending on member state), but COPPA's requirements — verifiable parental consent, no behavioural profiling, specific notice mechanics — are the heavier lift.

Your own Youth Development Pathway argues the same way from the football side: under-11s shouldn't be specialising, and the app's honest advice to a twelve-year-old is "go and play." A 13+ floor aligns the compliance decision with the development philosophy. That's a strong position to hold.

### 13.3 Standing rules

1. **No diagnosis, ever.** No screen says injured, at risk, or overtrained. Readiness informs; it doesn't assess health.
2. **Pain breaks the flow.** §8.4.
3. **Body composition and weight are out of scope.** Do not collect weight, body fat, or any physique metric from a minor, and do not display targets. Nothing in this product needs them, and the harm potential in an adolescent-athlete population is real.
4. **No leaderboards ranking children by physical output.** Archetype communities, yes. Streaks, yes. A ranked table of who ran furthest, no.
5. **Every plan carries a disclaimer:** *This is general training guidance, not medical or physiotherapy advice. Check with your coach before starting, and stop if something hurts.*

---

## 14. Open decisions — yours to make

Seven questions the build can't answer for you. My recommendation is in the last column; the reasoning is in the section referenced.

| # | Decision | Options | Recommendation |
|---|---|---|---|
| 1 | Who is V1 for? | Player · Coach · Club | **Player.** Your own framing calls it the consumer-facing heart. But note: club licences (§ Global Roadmap, $90K–$900K) and a $9.99 consumer subscription are different companies. Pick one for now (§3) |
| 2 | Minimum age | 12+ · 13+ · 16+ | **13+** (§13.2) |
| 3 | Video in the first year? | Yes · No | **No** (§3, §13) |
| 4 | Platform | Web app · Native iOS/Android | **Web first.** It's what Claude Design produces, it's instantly shareable, and the share card does more for you than an app-store listing |
| 5 | Free tier boundary | Everything free · Tier 1 free, Tier 2 paid · Paid only | **Tier 1 free, Tier 2 paid** (§7) — the product architecture already draws this line |
| 6 | First revenue | Consumer subs · Coach Certification · Club pilot | **Coach Certification** (§11.4). It's built from content you already have and it doesn't wait on V3 |
| 7 | Position order | Full Back next · another of the seven | Whichever position gives you a **partner academy** fastest. That relationship is on the critical path to every AI feature (§12) |

---

## 15. Glossary

Terms used above, in plain language.

| Term | Meaning |
|---|---|
| **Acceptance criteria** | A checklist that defines "done." If every box ticks, the build is finished — no debate |
| **ACWR** | Acute:chronic workload ratio. This week's training load divided by your recent average. Sudden spikes are the thing to watch |
| **Append-only** | You add new records, never overwrite old ones. Keeps history intact |
| **Backend** | The part that runs on a server — accounts, database, anything shared between devices. V1 has none |
| **COPPA / GDPR-K** | US and EU rules for collecting data from children |
| **Component** | A reusable piece of interface — a button, an option card — built once and used everywhere |
| **CSS variable** | A named value like `--pitch` for a colour. Change it once, it changes everywhere |
| **Frontend** | What runs in the browser — everything the user sees and touches |
| **Held-out test set** | Data deliberately withheld while building a model, so you can test it on examples it has never seen |
| **Inter-rater agreement** | Whether two experts independently reach the same judgement. Low agreement means the categories need work, not the model |
| **Longitudinal data** | The same subjects measured repeatedly over time. Required for any prediction |
| **MVP / V1** | The smallest version that's genuinely useful to someone |
| **prefers-reduced-motion** | A device setting saying "I don't want animation." Respecting it is both accessibility and courtesy |
| **RPE** | Rate of perceived exertion, 1–10. How hard a session felt. Free, and surprisingly accurate |
| **Schema / data model** | The list of things your app stores and how they relate |
| **State** | What the app is currently holding in memory — which question you're on, what you've answered |
| **Synthetic data** | Data generated by a model rather than measured from reality. Useful for building; can't validate |
| **Token (design)** | A named design value — a colour, a size, a spacing step — used everywhere instead of hard-coded numbers |
| **WCAG AA** | The accessibility standard for contrast and usability. 4.5:1 for body text |

---

## Appendix A — Documents this build draws on

| Document | Used for |
|---|---|
| `THE_FULL_BACK_CODEX_-_Complete_Archetype_System.md` | Archetype canon |
| `Full_Back_Wing_Back_Archetype_System__Complete_Profiling_Framework.md` | The 13 dimensions, developmental markers, tactical fit |
| `Full_Back_Phase_3__Complete_Implementation_System.txt` | Classifier, prescription engine, monitoring targets |
| `Full_Back_Wing_Back_Phase_2__Complete_Quantum-Biological_Assessment_System.md` | Test battery, evidence tiers, lab costing |
| `Full_Back__Youth_Development___Economic_Framework.md` | Age gates, §5.4 |
| `Full_Back__The_Complete_Prophetic_Engine_-_Final_Integration.txt` | Projection layer, §11.2 |
| `Fullback_Codex_Product_Specifications.md` | Product portfolio, pricing — **⚠ contains legacy archetype names, see §2.1** |
| `Fullback_Codex_Strategic_Synopsis.md` | Coach Certification, revenue targets |
| `Full_Back_Global_Implementation_Roadmap.md` | Club pricing tiers, platform features |
| Module 3 handoff (v1.0, 10 July 2026) | Questions, result cards, flow — §4 |

---

## Appendix B — Position parity checklist

For the remaining six positions, this document is the template. Everything below is shared; only the content in the middle column changes.

| Element | Shared or swapped |
|---|---|
| Flow, reveal sequence, share-card layout | **Shared** |
| Scoring engine, data model, evidence tiers | **Shared** |
| Design system, the Corridor | **Shared** (motif may vary by position — the Corridor is the full back's) |
| Readiness formula | **Shared** |
| Compliance gates | **Shared** |
| Archetypes, colours, emblems | Swapped |
| Twelve questions, three chapters | Swapped |
| Result cards, plan briefs | Swapped |
| Age-scaled benchmarks | Swapped |

---

**End of Full Back / Wing Back Position Build Handoff v1.0**

*Position 3 of 7 · Build V1 first. Everything else is downstream of real players using it.*
