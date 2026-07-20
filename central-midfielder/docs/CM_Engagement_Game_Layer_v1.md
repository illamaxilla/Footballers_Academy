# The Footballer's Academy — Engagement & Game Layer
## Build Spec v1.0

**Companion to:** `CM_Assessment_Build_Spec_v2.md` · `CM_Match_Log_Schema_v1.md` · `CM_Cognitive_Battery_Spec_v1.md`
**Date:** 12 July 2026 · **Position:** Central Midfielder

---

## 0. The rule that makes this document safe

**Log everything. Score only what has earned it.**

Every game in here records its data from day one. Almost none of them are allowed to touch the archetype classifier. That is not a contradiction — it's the whole design.

The data is free. The *claim* is not.

A game that collects clean, structured behaviour costs you nothing to log. A game that feeds an unvalidated number into the classification of a fifteen-year-old costs you the credibility of the entire product. So every game carries an explicit status, it is enforced in the type system, and it is visible in the UI:

| Status | Feeds the archetype? | Logs data? |
|---|---|---|
| **Instrument** | Yes, at its specified weight | Yes |
| **Silent** | No — but its data is being collected to test whether it *should* | Yes |
| **Trainer** | No. It exists to make you better at the thing. | Yes (as practice volume) |
| **Toy** | No. It exists because it's fun. | Minimal |

And the pathway between them (§6) is, I think, the most valuable idea in this document — because it is the honest version of the "living model" you've been chasing.

---

## 1. The anchor — The Daily Freeze

**Status: Instrument.** This is Task 1 of the cognitive battery, wearing a costume.

### The mechanic

One frozen match situation. Every day. **The same one for everybody, worldwide.**

Four actions. All defensible. No right answer. Ninety seconds of your life.

Then — and this is the whole thing — you see:
- What **you** picked
- What **everyone else** picked, as a live spread
- What **your club's players** picked
- What the **pros** picked, when there's real footage of the same situation

### Why this is the product

It's Wordle-shaped. One a day, no more. Everyone gets the same one, so it's a conversation in the changing room on Saturday. It's shareable without being a brag — *"84% went for the safe ball. I didn't."*

And it is simultaneously the most rigorous instrument you own. The Decision Policy Under Pressure task, drip-fed one trial at a time, forever.

That means it does two impossible-seeming things at once. It's the retention loop **and** it's the thing that quietly builds a behavioural archetype profile with hundreds of trials per player instead of twenty — which is a far better instrument than any twenty-minute test session could ever be, because it's spread across months, moods and levels of tiredness.

### Design rules

- **One per day. It does not stack.** Miss one and it's gone. No "catch up on 6 missed Freezes" — that turns a ritual into a chore.
- **The pressure condition returns.** Roughly a third of Freezes carry the 1.5-second countdown, unannounced. The `pressureShift` keeps accumulating.
- **Option balance holds.** Across every rolling 20 Freezes, each archetype is offered exactly 16 times. Same rule, third document. Generate the schedule; don't eyeball it.
- **You see the crowd's answer only after you've locked yours.** Otherwise you're measuring conformity.
- **Never tell them which answer was "right."** There isn't one. Show what the pro did and let it sit.

### Streaks, without the cruelty

A kid who misses a Freeze because he had a match should not be punished by your app.

- Streaks count **weeks with 4+ Freezes**, not consecutive days.
- A match day logged in the match log **automatically protects the streak.** Playing football is not a failure to engage with an app about football.
- No push notification ever says "your streak is about to end." That's a slot machine, and he's fourteen.

---

## 2. The catalogue

### Short-form daily — the loop

| Game | Status | Mechanic |
|---|---|---|
| **The Daily Freeze** | **Instrument** | See §1. The anchor. |
| **Read the Room** | Silent → `gameReading` | Scene flashes for 500ms. One question: how many were goal-side? Where was the free man? 20 seconds. |
| **Find the Free Man** | Silent → `gameReading` | Static scene, 10-second clock, tap the free man. Speed ladder against yourself. |
| **Press or Hold** | **Instrument** (Task 3) | Ten Go/No-Go trials as a daily. Heavy touch = press. Clean touch = hold. Commission errors only. |

`gameReading` is a **skill** score. It goes up when you get better. It is displayed proudly and separately, and it is structurally incapable of changing your archetype. A great scanner does not become a Conductor by accident.

### Trainers — designed to actually improve you

| Game | Status | What it trains |
|---|---|---|
| **Scan Trainer** | Trainer + Silent | The fog-of-war mechanic (Battery Task 2) as deliberate practice. Progressive: fewer looks allowed, less reveal time, more clutter. |
| **Occlusion Ladder** | Trainer + Silent | Temporal occlusion, but you choose the difficulty. Start at −100ms, work back to −600ms. *"I can call it half a second early now"* is a real, felt improvement. |
| **The Six Seconds** | Trainer | A turnover happens. You have six seconds. Counter-press, drop, or cover? Teaches the moment that separates a Destroyer from a Conductor. |
| **Name the Role** | Trainer | Shown a heatmap and a formation. Which role is this — 6, deep 8, mezzala, carrilero? Teaches the role taxonomy the match log depends on, so the dropdown stops producing garbage. |

That last one earns its place quietly: it makes your **match-log data better**, because a kid who understands what a carrilero is stops picking "not sure."

### The Film Room — the GVU in embryo

| Game | Status | Mechanic |
|---|---|---|
| **Spot the Error** | Trainer | Watch a clip. The midfielder does something wrong. Find the moment. Coach's eye. |
| **Archetype Draft** | Trainer | Build a midfield three from archetype cards. The engine tells you what breaks. *Three Maestros: nobody wins it back.* Teaches system fit. |
| **Rate the Decision** | Trainer + Silent | Watch a real clip. Rate the CM's choice 1–5. Compare against a coach panel. Your **agreement with the panel** over time is a genuine, honest measure of a developing eye. |

`Archetype Draft` is quietly the most strategically valuable thing in this list. It teaches your customer the vocabulary of your product while they play, and it makes the case for the whole system: *no archetype is superior; they're superior in combination.* That's your positioning, delivered as a game rather than a claim.

### Toys — and they're allowed to exist

| Game | Status | |
|---|---|---|
| **Tempo Keeper** | **Toy** | Tap in time, the beat drops out, hold the tempo. Beautiful for the Conductor. **There is no evidence tapping-rhythm transfers to controlling a football match.** It touches nothing. It is there because it's fun and it's on-theme, and that is a sufficient reason. |
| **First Touch** | **Toy** | Ball incoming, pressure from one side, swipe your touch away from it. Trains nothing measurable. Feels great. |
| **Kit Room** | **Toy** | Cosmetics. Archetype colours, emblems, share-card frames, unlocked by streaks and challenges. |

Keeping these explicitly, proudly labelled as toys is what protects the rest. The line only holds if it's *drawn*.

### Off the phone — and this one matters most

| Challenge | Status | Mechanic |
|---|---|---|
| **This Week's Step** | Trainer | The `firstStep` from the player's archetype card, issued as a weekly challenge. *Destroyer: win your duels, then make one clean forward pass every regain. Count them.* Logged in the match log. |
| **The Wall** | Trainer + video | Film yourself. 60 seconds of one-touch passing off a wall. Count them. Beat last week. |
| **Sixty Turns** | Trainer + video | Sixty turns in a minute, alternating shoulder. Bloomfield says you'll do ~726 in a match. Actually train it. |
| **Look Before You Get It** | Trainer | For one whole game: scan before every single reception. Report back. |

**Your app's success metric is not time-in-app.**

It is *sessions per week* and *pitch-actions logged*. A product that keeps a fifteen-year-old on his phone instead of on a pitch has failed at the only thing it exists to do, no matter what the retention chart says. Build the engagement loop to **eject him** — a short daily ritual, and a challenge that only completes outdoors.

---

## 3. Progression

Every threshold below is a **real** one, taken from the statistics, not invented to keep someone hooked.

| Unlock | Requirement | Why that number |
|---|---|---|
| Your archetype | Assessment complete | — |
| Behavioural spread | 20 Daily Freezes | Full option balance achieved: 16 offers per archetype |
| Pressure profile | 30 Freezes | Enough pressure-condition trials to contrast |
| Your rates | 3 matches logged (270 min) | Below this, per-90 rates are noise |
| Your trend | 6 matches logged | — |
| **Stated vs observed** | 900 minutes + 200-player cohort | The point where the comparison stops being a guess |

Because the gates are honest, the progress bar is honest, and a teenager can tell the difference. *"We can't tell you that yet"* is a far stronger thing to say than a confident number you made up — and it's the only version that survives contact with a coach.

---

## 4. Social

- **Freeze Duel.** Head-to-head on today's Freeze. You don't win by being *right* — there is no right. You win by predicting **what your opponent will pick.** Reading a teammate is the actual skill, and it's a much better game.
- **The Changing Room.** Your club's spread on today's Freeze. *Four Conductors and no Destroyer — who's winning it back on Saturday?*
- **Club vs Club.** Weekly `gameReading` ladder. Skill only. **Never rank by archetype.** The moment a leaderboard implies the Conductor is the best archetype to be, your whole system collapses back into the bug we started with.

---

## 5. Guardrails — non-negotiable, because they're children

- No streak mechanic that punishes a missed day. Weekly targets only.
- A logged match **protects the streak automatically**.
- No notification engineered around loss aversion. No "you're about to lose…"
- No infinite scroll. No variable-ratio rewards. No loot boxes. Cosmetics unlock on a fixed, visible schedule.
- No leaderboard ranks a player by archetype. Skill ladders only.
- No public display of another player's profile without explicit consent.
- Any game logging video of a minor sits behind the same consent, retention and deletion architecture as the match film — **decided before the first upload, not after.**
- Time-in-app is not a KPI and never appears on a dashboard where anyone can optimise for it.

---

## 6. The promotion pathway — how a toy earns its way in

This is the mechanism you were reaching for when you wrote the prophetic engine. It's real, and it's this.

A **Silent** game logs its data and scores nothing. Once the observed profile unlocks — 900 player-minutes across a 200-player cohort — you can finally ask the only question that matters:

> *Does this game's output actually predict what the player does on a Saturday?*

```ts
interface PromotionReview {
  gameId: string;
  reviewedAt: string;
  cohortN: number;
  // correlation between the game's output and the OBSERVED profile,
  // per archetype — not the stated one. Never validate against a questionnaire.
  correlationByArchetype: Record<ArchetypeId, number>;
  decision: 'promote_tier_b' | 'hold_silent' | 'demote_to_trainer';
  proposedWeights?: Record<ArchetypeId, number>;
}
```

- **Correlates for some archetypes** → promote to Tier B with a weight *only for those archetypes*. Scan Trainer might earn a real vote on Conductor and none at all on Destroyer. That's fine. That's correct.
- **Correlates for nothing** → it stays a Trainer forever, and it keeps being fun, and it costs you nothing.
- **A promoted game later stops correlating** → demote it. Instruments can lose their vote.

Two rules that make this rigorous instead of decorative:

**Validate against observed behaviour, never against the questionnaire.** A game that predicts what a kid *says* about himself has predicted nothing — it's just measured the same self-image twice. Only the match log and the video are ground truth.

**Every promotion bumps `weightsVersion`,** and classifications produced under different weights are not comparable. Say so, in the app, out loud.

This is what a living model actually is. Not femtoseconds. **A set of instruments that earn and lose their vote based on whether they turn out to predict anything.** It gets smarter as the data grows, it is fully explainable, and every claim it makes is one you can defend in front of a sports scientist.

---

## 7. Build order

1. **The Daily Freeze.** Nothing else matters if this doesn't land. It's the retention loop and the primary instrument in one object.
2. **This Week's Step.** Ties the archetype to something that happens on grass. Cheap.
3. **Read the Room** and **Find the Free Man.** Twenty-second dailies that fill the days.
4. **Scan Trainer** and **Occlusion Ladder.** The first real trainers.
5. **Freeze Duel** and **The Changing Room.** Social, once there are enough players in one club for it to be worth anything.
6. **Archetype Draft.** The Trojan horse for the whole methodology.
7. Everything else, in whatever order is fun.

---

## 8. Checklist

- [ ] Every game carries a `status` field: `instrument | silent | trainer | toy`
- [ ] `status` is enforced in the type system — a `trainer` or `toy` **cannot** reach the classifier, even by accident
- [ ] Daily Freeze holds option balance across every rolling 20
- [ ] Crowd spread is revealed only after the player locks in
- [ ] Streaks are weekly; a logged match protects the streak
- [ ] No leaderboard ranks by archetype
- [ ] `gameReading` is displayed separately from archetype, always
- [ ] Silent games log from day one; promotion requires a `PromotionReview` against **observed** behaviour
- [ ] `weightsVersion` bumps on every promotion
- [ ] Time-in-app is not tracked as a success metric

---

*Position-DNA™ · Central Midfielder · Engagement & Game Layer v1.0*
