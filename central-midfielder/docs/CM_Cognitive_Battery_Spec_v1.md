# The Footballer's Academy — Digital Cognitive Battery
## Build Spec v1.0

**Companion to:** `CM_Assessment_Build_Spec_v2.md` and `CM_Match_Log_Schema_v1.md`
**Date:** 12 July 2026 · **Position:** Central Midfielder

---

## 0. The three rules this document exists to enforce

**Rule 1 — Nothing timed is ever an absolute score.**
A phone cannot measure absolute reaction time. Display refresh quantises to 16.7ms at 60Hz. Touch sampling, OS scheduling and the browser event loop pile on tens of milliseconds more, and the total varies by device. A kid on a 120Hz iPhone will look faster than a kid on a budget Android, and it will be the phone, not the player.

That offset is roughly constant *within a session*. So every latency measure in this battery is a **within-session contrast** — a difference between two conditions the same player experienced on the same device, minutes apart. The offset cancels in the subtraction. Nothing else is safe.

Accuracy is device-independent. A correct answer is correct on any phone. **Accuracy-based measures port; latency-based ones do not.** They are weighted accordingly throughout.

**Rule 2 — Skill and style are different axes and must never be mixed.**
Some tasks have a right answer. They measure how well you read the game. That is a *skill* score and it is not an archetype.

Some tasks have no right answer — every option is defensible. They measure what you *choose*. That is a *policy*, and policy is what archetype means.

A player can be an excellent Maestro or a poor one. Collapsing skill into archetype turns your classifier into a ranking, which it must never be.

**Rule 3 — Only what earns its way in gets to vote.**
Every task below is tiered by how much evidence supports its link to archetype. Tier C tasks never touch the archetype score, no matter how good the graphics are.

---

## 1. Task tiering

| Tier | Meaning | Feeds archetype? |
|---|---|---|
| **A** | Face-valid. The response options *are* the archetypes. Same logic as the questionnaire, applied to behaviour under load. | Yes, heavily |
| **B** | Plausible mapping, drawn from established paradigms, but the archetype link is a **hypothesis we have not tested**. | Yes, at low weight — and re-weighted from data once the observed profile unlocks |
| **C** | Measures genuine skill. No defensible archetype link. | **Never** |

| Task | Tier | What it produces |
|---|---|---|
| 1. Decision Policy Under Pressure | **A** | Archetype spread + pressure shift |
| 2. Fog-of-War Scan | **B** | Search policy |
| 3. Press Trigger (Go/No-Go) | **B** | Response inhibition |
| 4. Speed–Accuracy Policy | **B** | Impulsive vs controlled |
| 5. Temporal Occlusion | **C** | Anticipation (skill) |
| 6. Flash Recall | **C** | Information per glance (skill) |

Be honest with yourself about Tier B. The mappings are reasonable and they come from real paradigms, but nobody has shown that a kid who commits more Go/No-Go errors is more of a Destroyer. **That is a claim your own data will test.** Until it does, it whispers; it doesn't shout.

---

## 2. Session structure

The full battery is ~23 minutes. No fifteen-year-old will do 23 minutes. **Split it.**

```
Every session:  Device calibration (30s)  →  Task 1 (6 min)  →  one rotating task
```

Task 1 is mandatory every time — it's the only Tier A instrument. One of Tasks 2–6 rotates in as "today's challenge." Sessions stay under 10 minutes and the rotation is the retention loop.

### Device calibration block — 30 seconds, never shown to the player

12 trials: a circle appears after a jittered 700–1800ms delay; tap it.

```ts
interface DeviceProfile {
  sessionId: string;
  refreshHz: number;          // measured via requestAnimationFrame deltas
  baselineRtMedian: number;   // ms
  baselineRtIqr: number;      // ms
  quality: 'good' | 'noisy' | 'reject';
}
```

- `quality = 'reject'` if `baselineRtMedian > 600` or `baselineRtIqr > 250`. Discard the session's latency measures; keep the accuracy ones.
- `baselineRtMedian` is never a score. It is never displayed. It exists to subtract.

### Practice effects are real

Store `attemptNumber` and `stimulusSetVersion` on every session. Rotate stimulus sets. **Never compare attempt 1 to attempt 5 without accounting for learning** — improvement on a repeated cognitive task is mostly familiarity with the task, not development of the player.

---

## 3. Task 1 — Decision Policy Under Pressure *(Tier A — build this first)*

The flagship. If you build only one thing, build this.

### Stimulus

Animated top-down pitch, ~4 seconds of build-up, freeze at the decision moment. **Animate, don't film** — for v1 you get full control of the option structure, no licensing, and cheap iteration. Real match video is a v2 upgrade, not a v1 requirement.

Four response options. **All four are defensible. There is no right answer.** This is not a knowledge test.

### Structure — 10 scenario pairs, 20 trials

Each scenario exists in two matched variants, A and B. The player sees one variant with **no time limit** and the other with a **1.5-second countdown ring**. Which variant goes in which condition is counterbalanced across players so variant difficulty can't confound the contrast.

**Critical: both variants of a pair offer the same four archetypes.** The pressure shift is only interpretable if the options were identical in both conditions.

### Option balance — verify before shipping

Each pair omits exactly one archetype. Each archetype is omitted from exactly 2 pairs, so it appears in 8 of 10 pairs — 16 of the 20 trials, and 8 trials in each condition.

| Pairs | Omit |
|---|---|
| 1, 2 | Destroyer |
| 3, 4 | Engine |
| 5, 6 | Conductor |
| 7, 8 | Maestro |
| 9, 10 | Carrier |

20 trials × 4 options = 80 slots ÷ 5 archetypes = **16 each**. ✓

Same rule as the questionnaire. Same failure mode if you break it. Shuffle option order per trial.

### Example scenario

> *You receive on the half-turn. Their midfield is stepping. Your winger is making a run in behind but he's tight to the line. Your centre-back is free behind you.*
>
> — Take a touch, play it back, and reset the shape. *(Conductor)*
> — Clip it first-time in behind for the winger. *(Maestro)*
> — Drive at the man stepping and go past him. *(Carrier)*
> — Lay it off and sprint past for the return. *(Engine)*

Under 1.5 seconds, that is a genuinely different question.

### Scoring

```ts
interface DppResult {
  policyFree: Record<ArchetypeId, number>;      // spread, 10 free trials
  policyPressure: Record<ArchetypeId, number>;  // spread, 10 pressure trials
  pressureShift: Record<ArchetypeId, number>;   // pressure − free, in pp
  freezeRate: number;                            // no-response under pressure
  rtDelta: number;                               // median RT free − pressure (ms)
}
```

Use the **same affinity-normalised scoring engine as the questionnaire** (`picked ÷ offered`, then normalise to a spread). Do not write a second scoring function. One source of truth.

### What `pressureShift` gives you that nothing else can

A questionnaire asks who you think you are. This asks who you are when the clock is on your throat.

- A Conductor whose policy doesn't move under pressure is the real thing. His entire claim is that his rhythm doesn't break.
- A Maestro who goes for the killer ball *more* under pressure is a completely different player from one who retreats to the safe pass.
- A player who shifts hard toward the Destroyer option under pressure is telling you something no self-report will.
- `freezeRate` is data, not a missing value. Store it.

`rtDelta` is a within-session subtraction, so it survives the device problem. **Never display raw RT.**

---

## 4. Task 2 — Fog-of-War Scan *(Tier B)*

### Mechanic

Top-down pitch, fully fogged. The player is the CM. The ball arrives in 3 seconds.

Tap anywhere to **look**: a circle of ~15% pitch radius clears for 400ms, then re-fogs. Six looks maximum. Then choose the pass from four options.

You have just instrumented scanning behaviour with tap coordinates — which are perfectly device-independent — and no eye tracker.

### 10 trials, ~4 minutes

### Measures

```ts
interface FowResult {
  looksTaken: number;              // mean, 0–6
  firstLookZone: Record<'forward' | 'lateral' | 'behind' | 'pressure', number>;
  behindCheckRate: number;         // % of trials where they looked behind at all
  reLookRate: number;              // % of looks revisiting an already-seen zone
  commitSpeed: number;             // looks used before deciding
  foundFreeMan: number;            // accuracy — SKILL, scored separately
}
```

### Hypothesised archetype mapping — flagged as a hypothesis

- Many looks · checks behind · low re-look → **Conductor** (builds the whole picture before receiving)
- Few looks · forward first · commits fast → **Carrier** / **Destroyer**
- Looks toward the far, risky option → **Maestro**

`foundFreeMan` is accuracy. It is a **skill** measure and it goes to the game-reading score, not the archetype. Do not let a good scanner become a Conductor by accident.

This is the construct Jordet's scanning research identifies as separating elite midfielders. **Do not build webcam eye-tracking to get it.** Browser gaze estimation runs at several degrees of visual angle in good conditions, and far worse with a kid holding a phone in bed. Nowhere near the resolution to say which player he fixated. This game gets the same construct at 100% reliability.

---

## 5. Task 3 — Press Trigger, Go/No-Go *(Tier B)*

Classic response-inhibition paradigm in football clothing.

### Stimulus — 60 trials, 70% go / 30% no-go, ~2.5 min

A 1.2-second clip of an opponent receiving.

- **GO (press):** heavy touch · isolated · facing his own goal · no support
- **NO-GO (hold shape):** clean touch · well supported · body open · numbers around him

The 70/30 split builds a prepotent tendency to press, which is what makes withholding hard. That's the point.

Inter-stimulus interval jittered 800–1400ms.

### Scoring — commission errors only

```ts
interface PressTriggerResult {
  commissionErrors: number;   // pressed on a NO-GO — THE measure
  omissionErrors: number;     // failed to press on a GO
  commissionRate: number;     // device-independent
  rtDelta: number;            // within-session only, never displayed
}
```

**Score on commission errors.** They are counts, not latencies, so they are device-independent, and they are exactly the construct: *do you jump in?*

- High commission → **Destroyer** / **Engine** lean (aggressive, engages)
- Low commission with low omission → **Conductor** (disciplined, holds)
- High commission *and* high omission → not a style. That's a bad session. Flag it and don't score it.

---

## 6. Task 4 — Speed–Accuracy Policy *(Tier B)*

Where you *choose* to sit on the speed–accuracy curve is a stable policy, and policy is style, not ability. This is the cleanest cognitive discriminator of Conductor from Maestro available on any instrument.

### 40 trials, ~3 min

Simple football decisions with a genuine correct answer (find the free man among four). No deadline. Instruction: *"as fast and as accurate as you can."*

### The measures are all within-subject shapes

```ts
interface SatResult {
  accuracy: number;
  errorRtBias: number;        // median RT on errors − median RT on correct trials
  postErrorSlowing: number;   // RT after an error − RT after a correct
  rtCv: number;               // SD ÷ median — response variability
}
```

Notice that not one of these is an absolute RT.

- **`errorRtBias` negative** — your mistakes are your fastest answers. That's an impulsive policy. Destroyer / Carrier lean.
- **`postErrorSlowing` high** — you make a mistake and you take stock. Controlled policy. Conductor lean.
- **`rtCv` high** — variable, streaky, willing to gamble on some trials and deliberate on others. Maestro lean.

Post-error slowing is a well-established cognitive-control marker and it is a pure within-subject difference. It is the most device-proof measure in this entire battery.

---

## 7. Task 5 — Temporal Occlusion *(Tier C — skill only)*

Real match clip. Cut it before the key event. *Where does the ball go?* Four zones.

### 12 distinct clips, ~4 min

Four clips occluded at each of three points before the action: **−600ms, −300ms, −100ms.** Randomise which clip gets which point. **Never show the same clip twice** — they'll learn it and you'll be measuring memory.

```ts
interface OcclusionResult {
  accuracyByOcclusion: { minus600: number; minus300: number; minus100: number };
  anticipationEarliness: number;   // acc(−600) ÷ acc(−100)
}
```

Experts read the situation earlier. `anticipationEarliness` is more sensitive than raw accuracy because it isolates *how early*, not *how often*.

### This does NOT feed the archetype

It measures expertise. It separates good from bad, not Conductor from Maestro. It feeds a separate, honest `gameReading` score — which is genuinely valuable, because it gives the player a skill axis that improves with work and is independent of who they are.

---

## 8. Task 6 — Flash Recall *(Tier C — skill only)*

Scene flashed for 500ms (±16ms jitter at 60Hz — 3% error, acceptable). Then one question:

- How many opponents were goal-side of you?
- Tap where the free man was.
- Was the press on, or were they set?

### 12 trials, ~3 min

```ts
interface FlashRecallResult {
  accuracy: number;
  spatialErrorPx: number;   // for the "tap where" items
}
```

Information extracted per glance — the cognitive substrate of scanning. Feeds `gameReading`. **Not an archetype.**

---

## 9. The weighting matrix

Each instrument produces a spread. Each instrument gets a **per-archetype weight**, not a global one. This is the whole point.

### Instrument → archetype weights (priors)

| Instrument | Conductor | Maestro | Carrier | Engine | Destroyer |
|---|---|---|---|---|---|
| Questionnaire | 0.30 | 0.30 | 0.30 | 0.30 | 0.30 |
| Cognitive battery | 0.35 | 0.35 | 0.10 | **0.00** | 0.10 |
| Match log | 0.05 | 0.20 | 0.25 | **0.50** | **0.40** |
| Video tagging | 0.30 | 0.15 | **0.35** | 0.05 | 0.15 |
| Physical tests | **0.00** | **0.00** | 0.00 | 0.15 | 0.05 |
| **Column total** | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 |

Read the Engine column. The cognitive battery gets **zero vote**. A screen cannot see work rate, and pretending it can is how you rebuild the Conductor bias with better graphics.

Read the Conductor column. The physical tests get zero vote, and the match log almost none — because a player cannot self-report retention under pressure. Conductor is seen by the questionnaire, the battery, and video, and by nothing else.

### Within the cognitive battery

| Task | Weight |
|---|---|
| Decision Policy Under Pressure | **0.60** |
| Fog-of-War Scan | 0.15 |
| Press Trigger | 0.15 |
| Speed–Accuracy Policy | 0.10 |
| Temporal Occlusion | 0.00 |
| Flash Recall | 0.00 |
| **Total** | 1.00 |

The one Tier A task carries most of the load. That is correct and it should stay that way until the Tier B mappings have been tested against real behaviour.

### Renormalise when instruments are missing

Most players will have no video and no test results. Do not treat a missing instrument as a zero score.

```ts
function combineSpreads(
  available: Partial<Record<InstrumentId, Record<ArchetypeId, number>>>,
  weights: Record<InstrumentId, Record<ArchetypeId, number>>
): Record<ArchetypeId, number> {

  const combined = {} as Record<ArchetypeId, number>;

  for (const a of ARCHETYPES) {
    // Sum the weights of only the instruments we actually have.
    const present = (Object.keys(available) as InstrumentId[]);
    const wSum = present.reduce((s, i) => s + weights[i][a], 0);

    if (wSum === 0) { combined[a] = 0; continue; }

    // Renormalise this archetype's column over the instruments present.
    combined[a] = present.reduce(
      (s, i) => s + (weights[i][a] / wSum) * available[i]![a], 0
    );
  }

  // Normalise the result to a spread summing to 100.
  const total = Object.values(combined).reduce((s, v) => s + v, 0);
  for (const a of ARCHETYPES) {
    combined[a] = total === 0 ? 0 : Math.round((combined[a] / total) * 100);
  }
  return combined;
}
```

Same principle as `offered` in the questionnaire engine, and as `Σ counts ÷ Σ minutes`: **derive the denominator from what you actually have, never hardcode it.** It is the third time this rule has appeared in three specs. That's not a coincidence — it's the rule.

### These weights are guesses

Every number in that matrix is my judgement, not a measurement. They are **priors**, and they are wrong in ways you cannot currently see.

They get replaced the moment the observed profile unlocks (900 player-minutes, 200-player cohort). Then you can ask, for each instrument and each archetype, *how well does this instrument's vote actually predict what the player does on a pitch?* — and set the weight to the answer.

`weightsVersion` is stamped on every classification. When the weights change, old classifications are not comparable to new ones.

---

## 10. Output — agreement, not confidence

```ts
interface Classification {
  schemaVersion: string;
  weightsVersion: string;
  computedAt: string;

  perInstrument: Partial<Record<InstrumentId, Record<ArchetypeId, number>>>;
  combined: Record<ArchetypeId, number>;

  primary: ArchetypeId;
  secondary: ArchetypeId;

  agreement: number;          // 0–1: do the instruments say the same thing?
  disagreements: string[];    // human-readable
  instrumentsUsed: InstrumentId[];

  gameReading: number | null; // SKILL. Separate. Never an archetype.
}
```

**The headline is not the label. It's the agreement.**

> *"Your questionnaire says Maestro. Your decisions under pressure say Maestro. Your matches say Engine."*

That sentence is the most valuable thing this product can produce. A single confident label is a horoscope. A disagreement is the start of a real conversation with a coach — *you want to be the creator, and under pressure you still are, but on a Saturday you're doing the running instead. Why?*

It also means you never have to claim 94% of anything, because you are not claiming a single answer.

Compute `agreement` as the mean pairwise similarity between instrument spreads. Report it plainly. Low agreement is not a failure of the system — it is a finding about the player.

---

## 11. What must not be built

- **No absolute reaction time, anywhere, ever displayed.** It is a property of the phone.
- **No "Football IQ" score.** A single cognitive number is a horoscope with a decimal point.
- **No webcam eye-tracking.** The resolution isn't there.
- **No Tier C task feeding the archetype.** Not once. Not "just a little."
- **No cross-session comparison** without `attemptNumber` and `stimulusSetVersion`.
- **No talent identification claims.** This battery classifies disposition. It does not predict who makes it.
- **No toy touches the score.** A tempo-tapping rhythm game is a beautiful thematic touch for the Conductor. There is no evidence that tapping in time transfers to controlling the tempo of a football match. Build it. Let it be fun. **Keep it out of the classifier.** The temptation to feed in anything measurable, just because the sensor exists, is exactly how you end up back at hippocampal coherence.

---

## 12. Build checklist

- [ ] Calibration block runs first, every session; `quality: 'reject'` discards latency measures
- [ ] Every latency measure is a within-session difference; no raw RT is stored as a score
- [ ] DPP option balance verified: 16 offers per archetype across 20 trials
- [ ] Both variants of a DPP pair offer the same four archetypes
- [ ] DPP uses the questionnaire's affinity scoring engine — not a second implementation
- [ ] Occlusion clips never repeat within a stimulus set
- [ ] Tier C results are stored in `gameReading` and are structurally incapable of reaching `combined`
- [ ] Weights renormalise over instruments actually present
- [ ] `weightsVersion`, `attemptNumber`, `stimulusSetVersion` stamped on every record
- [ ] `agreement` and `disagreements` are the headline output; the label is secondary
- [ ] Full battery is never presented in one sitting

---

*Position-DNA™ · Central Midfielder · Digital Cognitive Battery v1.0*
