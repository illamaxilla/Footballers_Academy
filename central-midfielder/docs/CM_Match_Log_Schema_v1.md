# The Footballer's Academy — Match Log & Observed Profile
## Data Schema v1.0

**Companion to:** `CM_Assessment_Build_Spec_v2.md` · **Date:** 12 July 2026

---

## 0. What this is, and why it exists

The assessment measures **what a player says they are**. This schema measures **what they actually do**.

Both produce a spread over the same five trait keys — `control`, `creation`, `progression`, `intensity`, `duel`. The gap between the two is the most interesting number this product will ever generate, and it is the only route to an archetype classifier that isn't guesswork.

You cannot collect this data retroactively. The schema goes in now, even though most of what it enables is eighteen months away.

### The four capture tiers

| Tier | What | Who does it | Time | Required? |
|---|---|---|---|---|
| **1** | Match log | The player, after a game | ~45 sec | Yes — everything works from this alone |
| **1b** | Training log | The player, after a session | ~10 sec | Yes — without it, weekly load is meaningless |
| **2** | Test results | Their club, when it already tests them | ~20 sec to enter | Optional |
| **3** | Video tagging | The player or a parent, on uploaded film | ~15 min per window | Optional |

**Design rule: Tier 1 must be sufficient.** Every feature has to work for a kid whose club runs no tests and who has no film. Tiers 2 and 3 sharpen the picture; they never gate it.

---

## 1. The rule that matters most

Session-RPE is the highest-value field in this entire schema, and it is a slider and a number box.

The 2024 scoping review (Sarmento et al., 178 studies) found that internal physiological load does not appear to correlate with external load, and that only nine of the 178 studies measured physiological variables at all — because it's hard to collect during matches. Meanwhile 109 of them measured total distance.

**External load** — distance, sprints, accelerations — needs GPS. You can't collect it. It is also the most over-studied thing in football science.

**Internal load** — what the effort actually cost the player — needs no hardware at all. It is barely studied. And it is the thing that actually relates to adaptation and fatigue.

You are not building a poor man's GPS. You are collecting the measurement the GPS people can't get, from a population (youth) that the literature explicitly excludes, at a scale nobody has ever had.

**Session-RPE (Foster's method):**

```
internalLoad (AU) = rpe × minutesPlayed
```

Where `rpe` is the Borg CR-10 rating (0–10), taken **roughly 30 minutes after the session ends** — not immediately. Taken at the whistle, the rating is contaminated by the last five minutes. Thirty minutes later, you get a rating of the whole session.

Ninety minutes at RPE 7 = 630 AU. That's it. That's the whole calculation.

---

## 2. Types

```ts
type TraitId = 'control' | 'creation' | 'progression' | 'intensity' | 'duel';
type ArchetypeId = 'conductor' | 'maestro' | 'carrier' | 'engine' | 'destroyer';

// Roles, in analyst language. See §3 for what the player actually sees.
type RoleId =
  | 'holding_6'      // anchor in front of the back four
  | 'deep_8'         // deeper of the two, connects through passing
  | 'box_to_box_8'   // the classic; covers both boxes
  | 'ball_winner_8'  // presses and tackles, higher than a 6
  | 'mezzala'        // attacking CM drifting into the half-space
  | 'carrilero'      // shuttles between centre and the wide channel
  | 'free_8'         // roams, no fixed position
  | 'attacking_8'    // plays high, arrives in the box
  | 'unknown';       // REQUIRED. See §3.

// For counts a player cannot reliably remember.
type Band = 'none' | 'one_two' | 'three_five' | 'six_plus';
```

### Role is a separate axis from archetype

Your five archetypes describe what kind of player someone **is**. The role describes what job they were **given this week**. They are orthogonal.

A Destroyer deployed as a `ball_winner_8` and the same Destroyer deployed as a `carrilero` produce completely different numbers. Benchmark him without knowing which, and you're comparing a mezzala's output to a holding midfielder's and calling the difference talent.

One dropdown. Free. It makes every downstream number interpretable, and it's what makes you credible to actual coaches — who think in roles, not archetypes.

---

## 3. Match log

```ts
interface MatchLog {
  id: string;
  playerId: string;
  schemaVersion: string;        // 'matchlog-1.0'
  date: string;                 // ISO 8601

  // --- Required. ~20 seconds. ---
  minutesPlayed: number;        // integer, 1–120
  role: RoleId;
  formation: string;            // '4-3-3' | '4-2-3-1' | '3-5-2' | ... | 'unknown'
  competition: 'league' | 'cup' | 'friendly' | 'training_game' | 'other';

  // --- Internal load. ~10 seconds. The important one. ---
  rpe: number;                  // 0–10, Borg CR-10, taken ~30 min post-match

  // --- Context. ~15 seconds. ---
  venue: 'home' | 'away' | 'neutral';
  result: 'win' | 'draw' | 'loss';
  goalsFor: number;
  goalsAgainst: number;
  possessionShare: 'mostly_us' | 'even' | 'mostly_them' | 'unknown';

  // --- Events they genuinely know. Exact counts. ---
  exact: {
    goals: number;
    assists: number;
    shots: number;
    yellowCards: number;
    redCards: number;
  };

  // --- Events they don't. Bands. See below. ---
  banded: {
    keyPasses: Band;
    takeOnsCompleted: Band;
    progressiveCarries: Band;
    duelsWon: Band;
    interceptionsAndRecoveries: Band;
    turnoversInOwnHalf: Band;
  };

  // --- Subjective. Labelled as such in the UI. ---
  feltInvolvement: number;      // 0–10: "how much did the game go through you?"
  fadedIn: 'never' | '0-15' | '15-30' | '30-45'
         | '45-60' | '60-75' | '75-90' | null;

  notes?: string;
}
```

### Why bands, not counts

A fifteen-year-old cannot tell you how many passes he completed. He can tell you he scored, and roughly how many tackles he won.

Asking for a precision you can't get doesn't give you missing data — it gives you **confidently wrong data**, which is far worse, because you can't see it. Bands are honest about the resolution you actually have.

Ask for exact numbers only where the player genuinely knows them: goals, assists, shots, cards, minutes, result.

### `unknown` is a required option

If the role dropdown has no escape hatch, players who don't know their role will pick something anyway, and you will have fabricated data in your database forever.

**Always let people say "I don't know." Missing data you can see. Fake data you cannot.**

### What the player actually sees

Never show `carrilero` to a fifteen-year-old.

| UI label | `RoleId` |
|---|---|
| Sitting in front of the back four | `holding_6` |
| Deeper of the two, starting the attacks | `deep_8` |
| Box to box — I covered both ends | `box_to_box_8` |
| Breaking things up, pressing, tackling | `ball_winner_8` |
| Pushing forward into the half-space | `mezzala` |
| Shuttling out to the wide channel | `carrilero` |
| Free role — I went where I wanted | `free_8` |
| Playing high, arriving in the box | `attacking_8` |
| Not sure | `unknown` |

---

## 4. Training log

Without this, weekly load is a number about one day. Weekly load has to include everything.

```ts
interface TrainingLog {
  id: string;
  playerId: string;
  schemaVersion: string;        // 'traininglog-1.0'
  date: string;

  type: 'team' | 'individual' | 'gym' | 'match_prep' | 'recovery';
  durationMinutes: number;      // integer, 1–240
  rpe: number;                  // 0–10, same scale, same ~30-min rule
}
```

Ten seconds. Two fields. This is the one people skip and it's the one that makes the load number real.

---

## 5. Derived values — compute, never store

```ts
const BAND_MIDPOINT: Record<Band, number> = {
  none: 0,
  one_two: 1.5,
  three_five: 4,
  six_plus: 7,          // open-ended; deliberately conservative
};

// Session-RPE
function internalLoad(session: { rpe: number; minutes: number }): number {
  return session.rpe * session.minutes;
}

// Per-90 rate across MULTIPLE matches. Read this one carefully.
function ratePer90(logs: MatchLog[], count: (m: MatchLog) => number): number {
  const totalCount = logs.reduce((s, m) => s + count(m), 0);
  const totalMinutes = logs.reduce((s, m) => s + m.minutesPlayed, 0);
  if (totalMinutes === 0) return 0;
  return (totalCount / totalMinutes) * 90;
}
```

**Never average per-90s.** This is the classic beginner error and it will quietly wreck every number in your app:

```
WRONG:  mean of (carries ÷ minutes × 90) for each match
RIGHT:  (Σ carries ÷ Σ minutes) × 90
```

A kid who plays 12 minutes and wins one tackle has "7.5 tackles per 90." Average that with his real games and you've corrupted the whole rate. Sum the counts, sum the minutes, then divide. Once.

**Nothing derived is stored.** `internalLoad` is `rpe × minutes` — compute it on read. The moment you store a derived value, you have two numbers that can disagree, and one day they will. Same principle as `offered` in the assessment scoring engine: put the truth in one place.

---

## 6. Load monitoring — and what it is not

```ts
function weeklyLoad(sessions: Session[], endDate: Date): number {
  // Σ internalLoad over the trailing 7 days — matches AND training.
}

function baselineLoad(sessions: Session[], endDate: Date): number | null {
  // Mean of the 4 preceding COMPLETE 7-day windows.
  // Returns null if fewer than 4 complete weeks exist. Show nothing.
}

function loadChange(weekly: number, baseline: number | null): number | null {
  if (baseline === null || baseline === 0) return null;
  return (weekly - baseline) / baseline;
}
```

Flag when `loadChange > 0.5`. The message is descriptive:

> "You did 3,200 load points this week. Your normal is 2,100. That's 52% up."

That is a true statement about what happened. It is **not** a prediction of what will happen.

### Why not ACWR

You'll find the acute:chronic workload ratio everywhere in football, usually with a "sweet spot" of 0.8–1.3 and an implied injury risk. Don't build it.

ACWR has been heavily criticised on methodological grounds — mathematical coupling between the numerator and denominator among them — and the original injury-prediction claims have not held up well. Building a red "high injury risk" zone into a product aimed at children, on the back of a contested metric, is exactly the mistake I'd hate to watch you make.

Week-on-week change against a rolling baseline gives you the same useful signal — *you did a lot more than usual* — with none of the false authority. Describe. Don't predict.

---

## 7. Validation rules

| Field | Rule |
|---|---|
| `minutesPlayed` | Integer, 1–120. Reject 0 (if they didn't play, don't log a match). Reject >120. |
| `rpe` | 0–10, half-steps allowed. Required whenever `minutesPlayed > 0`. |
| `durationMinutes` | Integer, 1–240. |
| `role` | Must be a valid `RoleId`. `unknown` is always offered. |
| Per-90 display, single match | Only when `minutesPlayed >= 30`. Below that: raw counts only, no rate. |
| Displayed rate | Requires ≥ 270 cumulative minutes (≈3 full matches). |
| Displayed trend | Requires ≥ 6 logged matches. |
| Baseline load | Requires ≥ 4 complete 7-day windows. |
| Band-derived rates | Show as a **range**, never a point. The precision isn't there. |

---

## 8. The observed profile — and why it's locked

This is where the schema pays off, and it is also where you must not rush.

To convert match events into an observed trait spread, you have to make each trait's rate comparable to the others. Passes and tackles are not on the same scale. Making them comparable requires a **reference population** — a cohort of comparable players to percentile against.

You don't have one yet. Until you do, any "the data says you're actually a Destroyer" is a fabrication.

### The gate

```ts
interface ObservedProfileStatus {
  playerMinutesLogged: number;
  cohortSize: number;              // players in the same age band with ≥900 min
  unlocked: boolean;
}
```

Unlock when **both** are true:
- The player has ≥ 900 minutes logged (≈10 full matches)
- The cohort has ≥ 200 players in the same age band, each with ≥ 900 minutes

### Turn the gate into the product

These are real statistical thresholds, not manufactured ones — which means the progress bar toward them is **honest**. That's the difference between gamification and manipulation, and kids can smell the difference.

| Milestone | What unlocks |
|---|---|
| Assessment complete | *"This is what you say you are."* |
| 3 matches (270 min) | Your rates |
| 6 matches | Your trend |
| 10 matches + cohort ready | **"This is what you actually do."** Stated vs observed. |

Tell them why it's locked, in plain terms: *"We'll compare what you say you are to what you actually do — but not until we've seen enough of your football to say anything real. 4 of 10 games logged."*

### The trait mapping

```ts
const TRAIT_SOURCES: Record<TraitId, string[]> = {
  creation:    ['keyPasses', 'assists'],
  progression: ['progressiveCarries', 'takeOnsCompleted'],
  duel:        ['duelsWon', 'interceptionsAndRecoveries'],
  intensity:   ['internalLoad per 90', 'minutesPlayed'],
  control:     ['feltInvolvement', 'turnoversInOwnHalf (inverse)'],  // WEAK
};
```

**Be honest about `control`.** It is the trait Tier 1 measures worst. You cannot self-report pass completion or retention under pressure. `feltInvolvement` is a subjective rating, not a count, and it must be labelled that way in the UI.

Control is the trait that needs video. Which is the next section.

---

## 9. Video tagging (Tier 3)

Manually tagging a full ninety minutes is brutal and nobody will do it twice. **Sample, don't census.** Tag a 10-minute window.

```ts
interface VideoTagSession {
  id: string;
  playerId: string;
  matchLogId: string;             // must link to a MatchLog
  schemaVersion: string;          // 'videotag-1.0'

  windowStartMinute: number;      // 0–90
  windowDurationMinutes: number;  // default 10

  receipts: Receipt[];            // one per time the player receives the ball
  turns: number;                  // total, in the window
  duelsContested: number;
  duelsWon: number;
}

interface Receipt {
  id: string;
  minute: number;
  scansBefore: number;            // shoulder checks in the ~5s before the ball arrives
  orientation: 'open' | 'half' | 'closed';
  pressure: 'none' | 'near' | 'immediate';   // >5m / 2–5m / <2m
  outcome: 'retained' | 'progressed' | 'lost' | 'shot' | 'key_pass';
}
```

### Tag what nobody else tags

Everybody counts passes and tackles. Almost nobody counts **scans, receiving orientation, and turns** — and those are what actually separate midfielders.

Bloomfield's movement analysis found that players perform roughly 726 turns per match, around 609 of them between 0° and 90°; that less than half of purposeful movement is directly forward; and that players spend only about 40% of the match in purposeful movement at all. Football, for a central midfielder, is a turning problem, not a sprinting one.

That same study found players are involved in roughly 111 on-ball actions per match — **with no significant difference between positions.** Everyone touches the ball about as often as everyone else. Your archetype is not about how much of the ball you get. It's about what you do with those touches, and what you do in the other 89% of the match.

Scanning is visible on film, it discriminates elite from sub-elite, it's already in your codex, and no consumer product measures it.

### Sampling error is real — say so

A 10-minute window is 11% of a match. One window gives you a noisy estimate. Extrapolate honestly:

```
ratePer90 = (count ÷ windowDurationMinutes) × 90
```

…and display it with a confidence caveat until the player has several windows across several matches. Multiple windows, ideally from different phases of different games, converge on something real. One window does not.

### The second validation loop — this is free and it's a paper

When a player has **both** a self-reported band and a video-tagged exact count for the same match, you can measure how wrong self-report is.

Over a few hundred players you learn:
- Do players systematically over-report their duels? (They will.)
- Does the bias vary by archetype? (Do Destroyers inflate tackles more than Maestros inflate key passes? Almost certainly.)
- Can you learn a correction factor and apply it retroactively to every self-report in the database?

That is a genuinely novel finding, it costs you nothing — it falls straight out of this schema — and it makes every self-reported number in your product better. Store both. Never overwrite one with the other.

---

## 10. Test results (Tier 2)

```ts
type TestId =
  | 'yoyo_ir1_distance_m'          // metres — THE aerobic field test in football
  | 'ifi_30_15_final_velocity_kmh' // km/h — alternative to Yo-Yo
  | 'sprint_10m_s'                 // seconds
  | 'sprint_30m_s'                 // seconds
  | 'cod_505_s'                    // seconds — change of direction
  | 'cmj_height_cm'                // centimetres — countermovement jump
  | 'height_cm'
  | 'body_mass_kg';

interface TestResult {
  id: string;
  playerId: string;
  schemaVersion: string;           // 'test-1.0'
  date: string;
  test: TestId;
  value: number;
  administeredBy: 'club' | 'school' | 'self' | 'other';
  notes?: string;
}
```

**Rules:**

1. **Never ask a player to go and get tested.** Only capture what already happened. The moment your app tells a fifteen-year-old to go and run a Yo-Yo test unsupervised, you own the consequences.
2. **Ask for Yo-Yo IR1 distance, not VO2max.** Nobody has a VO2max number. Every academy runs a Yo-Yo. Your codex asks for the thing that doesn't exist and ignores the thing that does.
3. **`administeredBy` matters enormously.** A self-timed 30m sprint on a phone stopwatch is worthless data. Flag it, weight it down, and consider not displaying it at all.
4. **The 5-0-5 is your opportunity.** Change of direction is the actual physical demand of the position, per Bloomfield, and almost nobody tests it in youth. If you get this at scale, you'll have something no one else has.

---

## 11. Growth and maturation — the honest antidote to prediction

```ts
interface GrowthRecord {
  id: string;
  playerId: string;
  date: string;
  heightCm: number;
  bodyMassKg: number;
  // optional, enables maturity-offset estimation
  sittingHeightCm?: number;
  motherHeightCm?: number;
  fatherHeightCm?: number;
}
```

Serial height measurements give you growth velocity, and from that an estimate of where a player sits relative to **peak height velocity (PHV)**.

This is the single most important context for interpreting any physical number in youth football. A fourteen-year-old who has already gone through PHV will out-run and out-muscle a pre-PHV fourteen-year-old, and it tells you **nothing** about either boy's ceiling. Failing to account for this is the best-documented failure mode of academy systems worldwide.

**Use it only to contextualise. Never to predict.** The message to a pre-PHV player:

> "Your physical numbers are going to change enormously over the next eighteen months. Don't read anything into them yet. Here's what you *can* build right now."

Notice what that does. It is the exact opposite of a prophetic engine, and it is far more valuable — because it's true. At fourteen, we specifically *cannot* predict, and here is the biological reason why. That's a stronger product story than any fake forecast, and it protects the late developer who would otherwise get written off.

**Implementation note:** the standard maturity-offset equations (Mirwald et al.; Khamis-Roche for predicted adult height) carry meaningful error, particularly at the extremes of the distribution. Pull the equations from source, implement the published error bands, and display the estimate as a range. Do not let a point estimate imply a certainty the method doesn't have.

---

## 12. Reference bands — provenance or nothing

```ts
interface ReferenceBand {
  metric: string;
  population: 'elite_adult' | 'elite_u17' | 'our_cohort' | 'unknown';
  source: string;                  // full citation
  n?: number;
  mean?: number;
  range?: [number, number];
}
```

**Hard rule: if there is no band with a real, citable source, show no band.** Show the player their own trend instead. Never fabricate a target. This is the rule that keeps the "94% accuracy" problem from happening again.

### Seed set — everything below is real and sourced

**Sarmento et al. 2024, *Sports Medicine* 54:2841–2864** — systematic scoping review, 178 studies, adult male, Tier 3–5:

| Metric | Value |
|---|---|
| CM total distance | 11,012 m (studies ranged 9,202–12,261) — **highest of any position** |
| CM sprint distance | 224 m — **fourth of five**; only centre backs are lower |
| Wide midfielder sprint distance | 330 m |
| Forward / wide defender sprint distance | 280 m / 273 m |
| Centre back sprint distance | 180 m |
| CM high-speed running | 191 m **less** than wide midfielders |
| Passing volume | Defenders and CMs make the most passes |
| Heart rate | **Midfielders run at the highest %HRmax of any position** |
| Speed thresholds (standard) | High-intensity running >14.4 km/h · High-speed running 19.8–25.1 km/h · Sprint >25.1 km/h |

**Pettersen & Brenn 2019, *Sports Med Int Open* 3(1)** — 54 U17 players, 96 match observations:

| Metric | Value |
|---|---|
| Max speed range across positions | 28.6 km/h (centre backs) to 30.3 km/h (wide midfielders) |
| Within-match decline | All positions drop significantly in HIR, sprinting and accelerations |
| Sprint decline | ~48% from the peak 5-minute period to the final 5 minutes |
| Sharpest drop | The 5 minutes immediately **after** the peak period, and the last 5 minutes |

**Bloomfield, Polman & O'Donoghue 2007, *J Sports Sci Med* 6:63–70:**

| Metric | Value |
|---|---|
| Purposeful movement | ~40.6% of the match |
| Turns | ~726 per match; ~609 of them 0–90° |
| Directly forward movement | 48.7% of purposeful movement |
| On-ball actions | ~111 per match — **no significant difference between positions** |

### Corrections to your codex — make these before anything ships

| Codex claim | Reality |
|---|---|
| Engine top speed **35–38 km/h** | Not a real number. U17 max is 28.6–30.3. Elite adult wingers reach ~32–35. **Delete.** |
| Engine sprints **50–90/match, "highest"** | CMs have the *lowest* sprint distance of the outfield attacking positions. **Delete.** |
| VO2max **66–74 ml/kg/min** | Nobody has this number. Replace with Yo-Yo IR1 distance. |
| "&gt;98% short passing accuracy by age 16" | Invented. Nobody passes at 98%. **Delete.** |
| High-intensity running defined as >19.8 km/h | That's the *high-speed running* threshold. HI running is >14.4 km/h. |

**The correction that makes your system better:** the Engine is not a sprinter. The Engine is the player operating at the highest sustained internal intensity on the pitch. That's truer, it's more interesting, and it's exactly what session-RPE measures.

### What we still don't know

The U17 study reports centre backs and wide midfielders — the extremes — but not central-midfield-specific figures in its abstract. **We do not have U17 CM norms.** Pull the full text, and until then, mark that band `unknown` rather than borrowing the adult number.

That gap is not a problem. It's the opportunity. Nobody has it. You can generate it.

---

## 13. What v1 must not do

- No injury prediction. No injury risk score. No ACWR danger zone. No red warnings about a child's body.
- No trajectory or career prediction.
- No composite "readiness score" that isn't grounded in something measurable.
- No stated-vs-observed comparison before the thresholds in §8 are met.
- No accuracy claims, no validation percentages, no "94%".
- **No daily mood or stress tracking.** Sleep, soreness and energy are fine — they're physical and they're standard. A consumer app doing implicit psychological monitoring of minors, with no clinician behind it and no support pathway, is a different thing entirely. Don't.
- No video of minors stored anywhere until you have designed consent, retention, access control and deletion. That is an architecture decision, not a feature flag, and it has to happen before the first upload, not after.

---

## 14. Build checklist

- [ ] `rpe` and `minutesPlayed` are required on every match log
- [ ] Training sessions are logged separately — weekly load includes them
- [ ] `role` dropdown offers `unknown`, in player language, not analyst language
- [ ] Bands, not counts, for anything a player can't reliably remember
- [ ] Rates use `Σ counts ÷ Σ minutes × 90` — never the mean of per-match rates
- [ ] Nothing derived is stored; `internalLoad` is computed on read
- [ ] Per-90 suppressed below 30 minutes in a single match
- [ ] No displayed rate below 270 cumulative minutes; no trend below 6 matches
- [ ] Load baseline suppressed below 4 complete weeks
- [ ] Observed profile locked until 900 player-minutes **and** a 200-player cohort
- [ ] Every reference band carries `population` and `source`; no source, no band
- [ ] Self-report and video counts stored side by side, never overwritten
- [ ] `schemaVersion` stamped on every record

---

*Position-DNA™ · Central Midfielder · Match Log & Observed Profile v1.0*
