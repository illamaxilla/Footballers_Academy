# The Footballer's Academy — Winger Archetype Assessment
### Build Handoff · Module 7 of 8 · **v3.0 — Evidence-Corrected**

**Version:** 3.0 · **Date:** July 12, 2026 · **Supersedes:** v2.0 (instrument fix), v1.0 (original)
**Build in:** the Winger project

> **v2.0 fixed the instrument. v3.0 fixes the numbers.**
>
> Every benchmark in v1.0 and v2.0 came from the Winger Codex — which is built on a **synthetic** population. I've now checked them against the published literature. **Six are wrong, and the most-quoted one is wrong in the direction that damages young players.** All corrections below are cited (§18).
>
> The archetypes survive. The instrument survives. The calibration does not.

---

## 0. Changelog — v2.0 → v3.0

| # | Change | Why |
|---|--------|-----|
| 1 | **Take-on success bands corrected downward by ~10–20 points.** Codex: "50–65% elite." Reality: PL average **36.7%**; elite attackers **45–55%**. | 🔴 The app was telling genuinely elite kids they were below the bar. Product-breaking, and the opposite of its purpose. |
| 2 | **Take-on VOLUME promoted above take-on RATE** as the headline metric. | 🔴 The league's top-volume dribbler also has the *most failed* take-ons. Rate alone misranks players. |
| 3 | **All benchmarks are now AGE-BANDED.** U17 elite max speed is ~30 km/h, not 35. | 🔴 The Speedster bar was unreachable for anyone under 18. |
| 4 | **Physical metrics DOWN-weighted in the evidence vector. The Tape Test is promoted to the primary evidence channel.** | 🔴 **The biggest finding.** GPS data cannot separate Artist / Ghost / Playmaker — see §2.5. |
| 5 | **New Tier 3 metric: accel + decel density (A+D per minute).** This, not distance, is the winger's physical signature. | 🟠 Wingers lead all positions in A+D during transitions. |
| 6 | **Injury numbers replaced with cited figures.** Hamstring recurrence 18%, not 40%. Female ACL ~2–3×, not 4–6×. "Speedster 2.8× baseline" **deleted — no source exists.** | 🔴 Unsourced medical claims in a product used by minors. |
| 7 | **The 2-month post-return window** added to every card. 69% of hamstring recurrences happen there. | 🟢 The single most valuable safety fact in the whole app. |
| 8 | **43-minute phenomenon replaced** with the real, citable peak-period finding (~50% drop in HIR after the most intense period). | 🟠 Same product value. Actually true. |
| 9 | **Fouls drawn** added as an Artist headline metric. | 🟢 A dribble that wins a foul is as valuable as one that beats the man. |
| 10 | **Artificial turf → ACL risk (female players only)** surfaced on the women's layer. | 🟢 Real, actionable, surprising. |
| 11 | **§18 — Evidence base and citations.** | 🔴 Everything is now defensible. |

Everything from v2.0 (equal exposure, Hybrid Gate, Dual-Threat rename, prior-in-scoring, age gating, safeguarding) carries forward unchanged.

---

## 1. The shared template (unchanged — do not fork)

**Guiding principle — the reveal is the product.**

**Flow:** Welcome → Position select → Assessment (12 questions, 3 chapters) → Cinematic reveal → Result + share card → first development step.

**One template-compatible change (from v2.0):** questions carry **5 options**, not 4. The `Question → Option[]` model already accepts any N. No engine change; no fork; no impact on the other seven modules — **though every one of them should be audited for the exposure bug** (§17.1).

---

## 2. Winger archetypes

| Archetype | Identity | Signature strengths | Elite share |
|-----------|----------|---------------------|-------------|
| 🎨 **The Artist** | The Explosive Entertainer | 1v1 dribbling, flair, elite agility | **28%** |
| 👻 **The Ghost** | The Inside Forward | Off-ball movement, clinical finishing, spatial IQ | **26%** |
| ⚡ **The Speedster** | The Pace Merchant | Top-end speed, explosive acceleration, transition threat | **22%** |
| 🎭 **The Playmaker** | The Wide Creator | Vision, elite delivery, technical control | **16%** |
| 👑 **The Hybrid** | The Complete Winger *(rare)* | Goals + assists, adaptability, complete game | **8%** |

Distribution = what the Phase 1 database was **generated** with and what the Phase 3 classifier **runs on**. The 32/28/22/13/5 in the *Complete System Overview* matches nothing that was built. See §17.2.

**Consumer-facing rarity copy:** *"roughly 1 in 4"* (Artist, Ghost) · *"about 1 in 5"* (Speedster) · *"about 1 in 6"* (Playmaker) · **"fewer than 1 in 12 — the rarest of the five"** (Hybrid).

---

## 2.5 ⚠️ What the evidence actually says — and why it changes the architecture

This section is the reason v3.0 exists. **Read it before touching the scoring engine.**

### Finding A — Wingers are the most physically extreme position in football

| Study | Finding |
|---|---|
| Pettersen et al. 2019 (U17 elite, n=54, 96 match obs) | Wide midfielders covered the **most HIR (1044.2 m)**, **most sprint distance (224.4 m)**, **most accelerations (185.2)**, and hit the **highest max speed (30.3 km/h mean)** of all positions. Centre-backs lowest on every measure. |
| Bradley et al. 2010 (elite adult) | Wide midfielders highest HIR (**3,243 ± 625 m**) > central midfielders > fullbacks > attackers > centre-backs. |
| Plakias et al. 2025 (Turkish 1st Div, n=446–485, optical tracking, PCA) | **Three** latent components: moderate-intensity running, high-intensity running, sprint capacity. **Wingers scored significantly higher than every other position on HIR.** Sprint capacity was most strongly associated with wingers. |
| Bortnik et al. 2024 (Ekstraklasa, 4,249 obs) | In transitional play, **wingers had the highest accelerations + decelerations per minute** of any position. Fullbacks led sprint *distance*; CAMs led total distance. |

### Finding B — ⚠️ **Therefore GPS data CANNOT separate your archetypes**

This is the load-bearing conclusion, and it changes the product.

The physical space is **three-dimensional** (moderate-intensity running, high-intensity running, sprint capacity), and **wingers as a class already sit at the ceiling of two of them.** So:

- A GPS vest tells you **"this is a winger."** It does not tell you **"this is an Artist."**
- **Sprint capacity is the ONE physical axis that genuinely separates → the Speedster.** That's it.
- **Artist vs Ghost vs Playmaker is entirely technical, tactical, and behavioural.** No amount of external-load data will distinguish them.

**Consequences for the build:**

1. **Physical metrics get a lower weight in the evidence vector.** They vote strongly for Speedster, weakly against Playmaker, and are near-silent on Artist/Ghost/Playmaker separation.
2. **The Tape Test (Tier 4) is promoted from "nice-to-have" to the PRIMARY evidence channel.** It is the only tier that can separate three of your five archetypes. Build it first, not last.
3. **Event data (take-ons, shots, key passes, box touches) carries most of the archetype signal.** Prioritise those Tier 3 fields over the GPS ones.

### Finding C — The winger's physical signature is **accel/decel density**, not distance

Wingers lead all positions in A+D per minute during transitions (Bortnik 2024). Fullbacks actually cover *more sprint distance*. So:

- ❌ The Codex's Hybrid marker — *"10–12 km covered"* — **does not distinguish anything.** Every winger runs a lot.
- ✅ The Hybrid marker is **defensive actions and recovery runs** — behavioural, not volumetric.
- ✅ **A+D per minute** is a genuine, new Tier 3 metric worth collecting, and every modern GPS vest reports it.

And it explains the injury profile mechanistically: **the winger gets hurt because he changes speed more than anyone.** Eccentric load. **Deceleration is the half that nobody trains** — and decelerations are what tear ACLs.

---

## 3. Visual signatures

| Archetype | Emoji | Colour | Temperament | Emblem |
|-----------|-------|--------|-------------|--------|
| The Artist | 🎨 | Magenta `#E0218A` | Flair | Flame / spin |
| The Ghost | 👻 | Pale silver `#C8CED6` | Elusiveness | Fading silhouette |
| The Speedster | ⚡ | Electric blue `#0047CC` | Drive | Speed vector |
| The Playmaker | 🎭 | Teal `#14B8A6` | Quiet control | Inward-drift arc |
| The Hybrid | 👑 | Electric cyan `#22D3EE` | Construction | Crown / complete node |

⚠️ **Accessibility (carried from v2.0):** Speedster and Hybrid are adjacent hues — separated here by **luminance** (`#0047CC` deep vs `#22D3EE` bright, ≥3:1). Ghost and Speedster cards render on **dark backgrounds**. **Colour is never the sole channel** — every card carries colour + emoji + emblem + name (WCAG 1.4.1).

---

## 5. The assessment — 12 questions, 3 chapters, 5 options each

**Unchanged from v2.0.** Equal exposure: every archetype in all 12 questions, 12 exposures each, 60 slots. Shuffle option order per session.

### 📖 Chapter 1 — *The Isolation*

**Q1. You get the ball wide, your full-back one-on-one, nobody else near. You…**
- Take him on with skill — I'll beat him. *(Artist)*
- Cut inside onto my stronger foot and look for the shot. *(Ghost)*
- Knock it past him and use pure pace. *(Speedster)*
- Wait, draw him in, and slide the pass to the overlap. *(Playmaker)*
- Check my shoulder first. If the cover's coming, I keep it and we go again. *(Hybrid)*

**Q2. The full-back backs off you, refusing to commit. You…**
- Go at him anyway — I'll find a way past. *(Artist)*
- Drift inside into the space he's abandoned. *(Ghost)*
- Drive straight through the gap he's leaving. *(Speedster)*
- Stand it up and pick out a cross — he's given me the time. *(Playmaker)*
- Hold it. Wait for the overlap. Take the boring option that keeps us on top. *(Hybrid)*

**Q3. There's a foot race for a ball down the line. You…**
- Get there — and beat him again once I do. *(Artist)*
- Let it run and gamble on where it lands. I'll be in the box. *(Ghost)*
- Back myself. Nobody catches me. *(Speedster)*
- Don't chase it. Show for the reset and build it again properly. *(Playmaker)*
- Chase it anyway. Even if I lose it, I've forced them backwards. *(Hybrid)*

**Q4. In training you enjoy most…**
- 1v1 dribbling and take-ons. *(Artist)*
- Finishing — cut-ins, first-time strikes, near post. *(Ghost)*
- Sprint work and explosive acceleration. *(Speedster)*
- Crossing, passing, and final-ball drills. *(Playmaker)*
- The conditioning block. The running. The part nobody likes. *(Hybrid)*

### 📖 Chapter 2 — *The Cut Inside*

**Q5. You've beaten your man and you're in the final third. You…**
- Beat one more, then decide. *(Artist)*
- Cut in and shoot. That's my finish. *(Ghost)*
- Hit the byline at full speed and pull it back. *(Speedster)*
- Slow it down and pick the perfect ball. *(Playmaker)*
- Take the highest-percentage option — even when it isn't mine to finish. *(Hybrid)*

**Q6. The cross comes in from the opposite flank. Where are you?**
- On the edge of the box. If it's cleared, I'm running at them again. *(Artist)*
- Attacking the back post to finish. *(Ghost)*
- Already sprinting to punish the clearance in transition. *(Speedster)*
- Holding my width, so the pitch stays big and we can switch it back. *(Playmaker)*
- Tracking their full-back — because if this breaks down, he's in behind us. *(Hybrid)*

**Q7. Your team loses the ball while you're high up the pitch. You…**
- Stay wide and high. I'm the outlet. *(Artist)*
- Drift inside, ready to receive the moment we turn it over. *(Ghost)*
- Stay on their last defender's shoulder. One turnover and I'm gone. *(Speedster)*
- Drop into the pocket to help build again. *(Playmaker)*
- Sprint sixty yards back and press their full-back. Nobody asked me to. *(Hybrid)*

**Q8. A yard of space opens in the box. You…**
- I'm not in the box. I'm out wide with the ball, about to make it bigger. *(Artist)*
- I'm already in it. I saw it before it opened. *(Ghost)*
- Explode into it before anyone reacts. *(Speedster)*
- Find the runner in it with the perfect pass. *(Playmaker)*
- I'm on the edge, covering — because if we lose it here, we're exposed. *(Hybrid)*

### 📖 Chapter 3 — *Your Signature*

**Q9. Teammates describe you as…**
- The entertainer — I beat people for fun. *(Artist)*
- The finisher — I ghost in and score. *(Ghost)*
- The rocket — nobody lives with my pace. *(Speedster)*
- The brain — the attack goes through me. *(Playmaker)*
- The engine — I do the job nobody else wants. *(Hybrid)*

**Q10. The compliment that means the most…**
- "You destroyed their full-back all game." *(Artist)*
- "You were unmarkable — a hat-trick from nowhere." *(Ghost)*
- "They couldn't get near you. You were just gone." *(Speedster)*
- "Your delivery and vision created everything." *(Playmaker)*
- "You never stopped running. You carried us." *(Hybrid)*

**Q11. Be honest — which part of your game would you be lost without?**
- My close control, and my nerve to try things. *(Artist)*
- My timing and my finishing. *(Ghost)*
- My pace. *(Speedster)*
- My vision and my range of pass. *(Playmaker)*
- My engine. *(Hybrid)*

**Q12. What frustrates you most?**
- A system that won't let me take players on. *(Artist)*
- Not getting the service to finish. *(Ghost)*
- Not being played in behind, where my pace kills teams. *(Speedster)*
- Not getting on the ball enough to create. *(Playmaker)*
- Teammates who don't work. *(Hybrid)*

---

## 6. The four-tier architecture — **reweighted**

| Tier | What | Time | Required? | **Evidence weight (v3.0)** | Max confidence |
|------|------|------|-----------|---------------------------|----------------|
| **1 — Identity** | 12 questions | ~3 min | Yes | — | 50% |
| **2 — Context** | Age, foot × side, level | ~20 sec | Yes | — | 60% |
| **3a — Event data** | Take-ons, goals, key passes, box touches | ~3 min | Optional | **HIGH** — this carries the archetype signal | 78% |
| **3b — Physical** | Sprint, max speed, A+D, agility | ~2 min | Optional | **LOW** — only genuinely separates the Speedster | 80% |
| **4 — Tape** | 20-touch self-coded audit of own film | ~15 min | Optional | **HIGHEST** — the only channel that separates Artist / Ghost / Playmaker | 92% |

> **This is the v3.0 reweighting.** In v2.0, Tier 3 physical and Tier 3 technical carried equal weight. The evidence says they shouldn't. Physical data confirms *"you're a winger"* and identifies *"you're fast."* It cannot tell an Artist from a Ghost. **Build Tier 4 first.**

**The Mirror** (unchanged): Tiers 1–2 measure how you see your game. Tiers 3–4 measure what your game shows. The gap is the most valuable thing the app can tell a player.

---

## 7. Tier 2 — Context (4 taps)

| Field | Options | Drives |
|-------|---------|--------|
| **Age band** | U9 · 9–12 · 13–16 · **16–18** · 18–21 · 22+ | **Output gating AND benchmark selection (new in v3.0)** |
| **Dominant foot** | Left · Right · Both | Foot × Side prior |
| **Side you play most** | Left wing · Right wing · Both · Drift central | Foot × Side prior |
| **Level** | Recreational · School/club · Academy · Semi-pro · Pro | Benchmark band |
| *(optional)* **Gender** | Male · Female · Prefer not to say | Exemplars + ACL layer |

### The Foot × Side prior — now with evidence

| Situation | Meaning | Nudge (pseudo-picks) |
|---|---|---|
| Left foot on the **left**, right foot on the **right** | **Natural side.** Outside, byline, cross. | Artist **+0.6** · Speedster **+0.6** |
| Left foot on the **right**, right foot on the **left** | **Inverted.** Cut in onto the strong foot, shoot. | Ghost **+0.8** · Playmaker **+0.4** |
| Two-footed / drifts central | Free role. | Playmaker **+0.4** · Hybrid **+0.4** |

**New in v3.0 — the inverted-winger take-on adjustment.** Analysts observe that inverted wingers *complete more take-ons*, because cutting inside creates the sudden direction change that beats a defender. So when the player is inverted, **raise their take-on benchmark by ~3 points** before comparison. Otherwise you'll flatter a natural-sided Artist and under-rate an inverted Ghost.

---

## 8. Tier 3 — Performance (optional) — **fully recalibrated**

**UI framing:** *"Got numbers? Add them and we'll check your self-image against your evidence. Skip anything you don't have."*

### 8.1 ⚠️ EVENT DATA — high weight. This is where the archetype signal lives.

#### Take-ons — **the most important correction in this document**

| Band | Success rate | What it means |
|---|---|---|
| Below 35% | 🔴 | Poor situations, or the technique isn't there yet |
| 35–44% | 🟡 | Developing. **The Premier League average is 36.7%** |
| **45–55%** | 🟢 | **ELITE.** This is where top attackers in the big leagues actually live |
| 55–64% | 🔵 | Excellent |
| 65%+ at high volume | 🟣 | World class. Very rare |

> **The Codex said "50–65% is elite" and "Artist 55–70%." That is 10–20 points too high, and it means the app was telling genuinely elite young players they were failing.** Correct it before you ship a single result.

**And lead with VOLUME, not rate.** The Premier League's highest-volume dribbler also records the *most failed take-ons* in the division — and is still one of the best dribblers in the league. A player completing 5 of 10 (50%) creates more chaos than one completing 4 of 6 (67%).

| Metric | What to show |
|---|---|
| **Take-ons ATTEMPTED per 90** | ⭐ **Headline it.** Artist 5–10 · Speedster 4–8 · Ghost 3–6 · Playmaker 2–4 |
| Take-on success % | Secondary. Use the bands above. |
| **Fouls drawn per 90** | ⭐ **New in v3.0.** A dribble that wins a foul is as valuable as one that beats the man. Elite Artists draw 40–60 fouls a season. This is an Artist headline metric. |
| Take-ons in the opposition box, % of total | The intent metric. Elite: 15–25% of all take-ons happen in the box. |

**Copy to ship on the take-on screen:**
> *"The Premier League average take-on success rate is 36.7%. Elite attackers in Europe's top leagues sit between 45% and 55%. If you're above 45%, you're already in elite territory — and the number that matters more is how often you try. The best dribbler in the league also fails more than anyone. Attempting is the job."*

#### Other event metrics

| Field | Archetype bands |
|---|---|
| Goals, last season | Ghost **15–25** · Speedster 12–20 · Artist 10–18 · Hybrid 12–18 · Playmaker 6–12 |
| Assists, last season | Playmaker **10–18** · Hybrid 10–15 · Artist 8–15 · Ghost 5–12 |
| Key passes per 90 | Playmaker **2.5–4.0** |
| Pass completion % | Playmaker **88–93%** |
| Penalty-box touches per 90 | Ghost **5–9** |
| Shot conversion % | Ghost **15–22%** |
| Weak foot (1–5) | 4+ enables Ghost and Hybrid |
| **Defensive actions per 90** | Hybrid **4–6** · Artist 2–4 · ⭐ **This — not distance — is the Hybrid marker** |

### 8.2 PHYSICAL — low weight. **Age-banded.** Only genuinely separates the Speedster.

⚠️ **The single biggest calibration error in v1/v2 was applying adult-elite thresholds to teenagers.** In elite U17 football, wide midfielders average **30.3 km/h** max speed, and the *fastest player in the entire study* hit **32.8 km/h**. The Codex demanded >35 km/h. That bar told every Speedster in youth football he wasn't one.

| Metric | **U17 / academy elite** | **Adult elite** | Weight |
|---|---|---|---|
| **Max speed** | ~30 km/h typical · **>32 km/h = top of the youth distribution** | ~32–34 km/h typical · **>35 km/h = exceptional/outlier** | ⭐ **The only physical metric that truly separates the Speedster** |
| 10m sprint | <1.85s good · <1.78s excellent | <1.75s good · <1.70s excellent | Medium |
| **A+D per minute** ⭐ NEW | — (collect and build the norms) | Wingers lead all positions in transitions | Medium — the winger's true physical signature |
| HIR distance | ~1,000 m (U17) | ~3,200 m (adult elite) | **Low — every winger maxes this. It confirms position, not archetype.** |
| Sprint distance | ~225 m (U17) | — | **Low — same reason** |
| Total distance | — | — | ❌ **Drop it.** It distinguishes nothing. |

> **Show the player their percentile *within their age band*, never against an adult bar.** An academy winger at 31 km/h should be told he's near the top of the U17 distribution — because he is.

---

## 9. Tier 4 — The Tape Test — ⭐ **now the primary evidence channel**

**Build this first.** The evidence is unambiguous: it is **the only tier that can separate Artist from Ghost from Playmaker.** GPS can't. Self-report of identity can't. Only observed behaviour can.

**The mechanic.** Player opens a match video (camera roll, or a Veo / Trace / Hudl / YouTube link). The app shows a tally pad. They scrub to each wide/attacking reception and tap **what actually happened.**

**Target: 20 receptions.**

| Tap | Scores |
|-----|--------|
| Beat the man 1v1 | Artist **+2** |
| Attempted the take-on, lost it | Artist **+1** *(intent counts — and the data backs this: volume beats rate)* |
| **Attempted the take-on, won a foul** | Artist **+2** ⭐ NEW — as valuable as beating him |
| Went outside → crossed / reached the byline | Artist **+2** |
| Cut inside → shot | Ghost **+2** |
| Cut inside → laid it off, then arrived in the box | Ghost **+2** |
| Knocked it past him and ran | Speedster **+2** |
| Ran in behind onto a through ball | Speedster **+2** |
| One-two / combined out of it | Playmaker **+2** |
| Switched play / progressive pass | Playmaker **+2** |
| Recycled backwards, kept it simple | *(no archetype — measures caution)* |

**Off-ball counters (same match):**

| Counter | Scores |
|---------|--------|
| Sprints made in behind | Speedster |
| Arrivals in the opposition box | Ghost |
| Pressing actions on the opposition full-back | Hybrid |
| Recovery runs into our own half | Hybrid |

**Why it works:** Tier 1 measures **self-image**. Tier 4 measures **behaviour**. Self-report of identity is notoriously unreliable; self-report of *frequency of observed events* is far more robust. It needs no computer vision, no ML, no server-side video, no cost.

**And it's the validation lever.** If tape profiles predict quiz profiles above chance across your user base, **you have convergent validity — and you can publish it.**

---

## 10. The scoring engine — **v3.0 reweighting**

Everything from v2.0 carries forward (equal exposure, prior in scoring, Hybrid Gate, Dual-Threat rename, 92% cap). **The change is the evidence vector's weights.**

```ts
const CHANNEL_WEIGHT = {
  EVENT:    1.00,   // take-ons, goals, key passes, box touches — carries the signal
  TAPE:     1.25,   // observed behaviour — the ONLY channel that separates A/G/P
  PHYSICAL: 0.40,   // confirms "winger", identifies "fast", separates little else
} as const;
```

### 10.5b Age-banded benchmark selection

```ts
const MAX_SPEED_BANDS = {
  'U9':    { typical: 0,    elite: 0    },   // do not measure
  '9-12':  { typical: 0,    elite: 0    },   // do not measure
  '13-16': { typical: 28.0, elite: 30.5 },
  '16-18': { typical: 30.3, elite: 32.5 },   // ← Pettersen et al. 2019, U17 elite
  '18-21': { typical: 31.5, elite: 34.0 },
  '22+':   { typical: 32.5, elite: 35.0 },   // >35 = exceptional, not "the bar"
};
// Report PERCENTILE WITHIN BAND, never a pass/fail against an adult threshold.
```

### 10.5c Take-on bands (corrected)

```ts
const TAKE_ON_BANDS = [
  { max: 0.35, label: 'Developing',  tone: 'red'    },
  { max: 0.45, label: 'Progressing', tone: 'amber'  },  // PL average sits at .367
  { max: 0.55, label: 'ELITE',       tone: 'green'  },  // ← where top attackers live
  { max: 0.65, label: 'Excellent',   tone: 'blue'   },
  { max: 1.00, label: 'World class', tone: 'purple' },
];
const INVERTED_TAKE_ON_ADJUSTMENT = 0.03;
// VOLUME IS THE HEADLINE, NOT RATE.
```

---

## 11. Result cards — injury sections rewritten with cited numbers

### 🎨 THE ARTIST — *Keep this body safe*
You accelerate and decelerate more than almost anyone on the pitch — that's the job, and it's also the risk. **Deceleration is the half nobody trains, and it's what tears ACLs.**
- **Hamstring injuries are now 24% of all injuries in men's professional football** — up from 12% two decades ago.
- **Non-negotiable:** Nordic hamstring work (~6% of elite clubs run the full programme), plus deceleration and landing-mechanics training, plus hip strength. 3× a week.
- **New headline metric: fouls drawn.** Elite Artists draw 40–60 fouls a season.

### 👻 THE GHOST — *Keep this body safe*
Cutting inside at speed is a deceleration event, and deceleration is the ACL mechanism. Groin strain from lateral movement. Same hamstring picture: **24% and rising.** Non-negotiable: hip strength, neuromuscular control, deceleration capacity.

### ⚡ THE SPEEDSTER — *Keep this body safe*
- **Hamstring injuries are the single most common injury — 24% of all injuries, doubled in twenty years.**
- **About 18% of hamstring injuries are recurrences. And 69% of those recurrences happen within two months of returning to play.**
- **The most dangerous thing you will ever do is come back too early.** A 25-man squad expects ~8 hamstring injuries a season.
- Non-negotiable: eccentric hamstring work (Nordic curls, min 2× a week), never a rushed warm-up.
- *The Codex claimed "2.8× baseline." No source found. Removed.*

### 🎭 THE PLAYMAKER — *Keep this body safe*
Lower explosive load. Less sprint volume, more moderate-intensity play. Watch the ankles. Proprioceptive work.

### 👑 THE HYBRID — *Keep this body safe*
Your risk isn't a mechanism — it's **volume**. You're always available, so you play more. **Availability is your value proposition. Protect it.** Load management, and the honesty to tell a coach when you're cooked.

---

## 12. Women's football layer — corrected

| Codex claim | The evidence |
|---|---|
| Female ACL risk **4–6×** male | Meta-analysis of 28 studies: **incidence rate ratio 2.2** (95% CI 1.6–3.1). Adolescent soccer: **risk ratio 3.12**. Matched cohorts: no significant difference. |
| — | **UEFA Women's Elite Club Injury Study: ACL ~2% of injuries — but HIGHEST burden. Median 292 days lost.** |
| Prevention "reduces risk 50–70%" | Meta-analysis: **~22% reduction in overall injuries** (11,773 participants). |

**Lead with the 292 days, not the ratio.** Mechanism: rapid deceleration, cutting, pressing.

### ⭐ Artificial turf finding
Systematic review: **increased ACL risk on artificial turf for female soccer players — but not male.** Surface it if a female user reports playing primarily on turf.

### Exemplars — ⚠️ still unverified
Confident: **Salma Paralluelo → Speedster**, **Marta (peak) → Artist**, **Lauren James → Artist**. Not confident on the rest. Do not ship placeholders.

---

## 13. Age gating & safeguarding — hard rules

| Age band | What the app shows |
|---|---|
| **Under 13** | **No archetype label.** No benchmarks. No injury content. No physical measurement. Show a *leaning* + youth message: *"At your age the job isn't to pick a type. It's to be fearless, master both feet, and attempt more dribbles than anyone."* |
| **13–16** | Archetype as **"emerging."** Benchmarks against the youth band only. Re-test every 6 months. |
| **16–18** | Full card. **Youth benchmark band.** Never adult-elite thresholds. |
| **18+** | Full card, adult bands. |

### Under-18 content bans — enforced at component level
- ❌ No supplementation protocols. ❌ No body composition/weight/body-fat inputs. ❌ No genetic testing. ❌ No adult-elite physical thresholds shown to minors. ❌ No "elite or bust" framing.
- ✅ Always: *"If anything hurts, see a physio. This is training guidance, not medical advice."*

---

## 14. Claims discipline
- "96% / 93% accuracy" → **Do not publish.** Use *confidence* (capped 92%).
- Quantum coherence / motor superposition → **No quantum language in consumer copy.**
- "10,000 profiles analysed" → say **"modelled."**
- **43-minute phenomenon** → replaced: **After a winger's most intense period, high-intensity output falls ~half — for everyone.** (Bradley et al. ~51–53% drop after peak 5-min period.)
- "2.8× baseline" → **Deleted.**
- "50–65% elite" → **Corrected to 45–55%.**
- ">35 km/h" → **Age-banded.**

---

## 16. Build checklist — v3.0 priorities

**🔴 Before anything ships:** Take-on bands corrected (45–55%). Volume headlined above rate. All benchmarks age-banded. "2.8× baseline" removed. 2-month post-return window on every card. 12×5 options, equal exposure (unit test: exactly 12 exposures per archetype). Hybrid Gate · Dual-Threat rename · prior in scoring · confidence capped 92%. Under-18 bans enforced at component level.

**🟠 Build order:** Tier 4 (Tape) before Tier 3b (physical). Channel weights TAPE 1.25 · EVENT 1.00 · PHYSICAL 0.40. Fouls drawn added. A+D per minute added; total distance dropped.

**🟢 New:** Artificial-turf ACL prompt (female). "Peak minute" feature in Tape Test. Citations appendix in-app.

---

## 18. Evidence base (key cites)
- Pettersen et al. 2019 — U17 elite; wide mids highest HIR/sprint/accel; max speed 30.3 km/h mean, 32.8 fastest.
- Bradley et al. 2010 — wide mids highest HIR (3,243±625 m); HIR drops ~51–53% after peak 5-min.
- Plakias et al. 2025 — three latent components; wingers highest HIR; sprint capacity most associated.
- Bortnik et al. 2024 — wingers highest accel+decel per minute in transitions.
- Opta/The Analyst 2025/26 — PL average take-on success 36.7%.
- Ekstrand et al. 2023 — hamstring 24% of injuries; 18% recurrence; 69% of recurrences within 2 months.
- Waldén et al. — female:male ACL IRR 2.2 (1.6–3.1).
- D'Ambrosi et al. 2026 — adolescent RR 3.12; UEFA WECIS ACL 2%, median 292 days.
- Turf review — increased ACL risk on artificial turf for female (not male) players.

*Same template, same reveal. The Winger's own archetypes — with a working instrument, and numbers that are true. Position 7 of 8.*
