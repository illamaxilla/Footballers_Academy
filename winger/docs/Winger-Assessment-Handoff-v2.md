# The Footballer's Academy — Winger Archetype Assessment
### Build Handoff · Module 7 of 8 · **v2.0**

**Version:** 2.0 · **Date:** July 12, 2026 · **Supersedes:** v1.0 · **Build in:** the Winger project

> **Kept from v1.0:** the five archetypes (Artist, Ghost, Speedster, Playmaker, Hybrid — The Speedster restored). Identity names (Explosive Entertainer, Inside Forward, Pace Merchant, Wide Creator, Complete Winger). Chapter titles — *The Isolation*, *The Cut Inside*, *Your Signature*.
> **Changed in v2.0:** the measurement instrument, the scoring engine, and the depth of the result.

---

## 0. Changelog — v1.0 → v2.0

| # | Change | Severity |
|---|--------|----------|
| 1 | **Equal exposure: 12 questions × 5 options.** Every archetype in every question, 12 exposures each. Replaces the weighted 4-option rotation. | 🔴 Blocker (§0.1) |
| 2 | **Rarity moves from the instrument into the scoring** as a Bayesian prior. | 🔴 Blocker |
| 3 | **All 8 Hybrid options rewritten to carry cost**, not glory. | 🔴 Blocker |
| 4 | **Hybrid Gate** added — three conditions to be named Hybrid. | 🔴 Blocker |
| 5 | **"Tie = a hybrid" → "Dual-Threat."** | 🔴 Blocker |
| 6 | **Distribution corrected to 28/26/22/16/8.** | 🔴 Blocker |
| 7 | Restored missing signature answers (Q4 finishing, Q9 Playmaker, Q11 Speedster, Q12 "no service"). | 🟠 Major |
| 8 | Q3 and Q6 unpickable options rewritten. | 🟠 Major |
| 9 | **Tier 2 — Context.** Age, foot × side, level. | 🟠 Major |
| 10 | **Tier 3 — Performance.** Optional self-reported test + match numbers. | 🟢 New |
| 11 | **Tier 4 — The Tape Test.** 20-touch self-coded audit. | 🟢 New |
| 12 | **Confidence score + band.** | 🟢 New |
| 13 | Result cards deepened (rarity, benchmarks, injury, system fit, career arc, evolution). | 🟢 New |
| 14 | **Age gating** + **under-18 content bans.** | 🔴 Safeguarding |
| 15 | **Claims discipline.** | 🔴 Commercial risk |
| 16 | Colour: Speedster/Hybrid confusable; Ghost fails WCAG. Flagged with fix. | 🟠 Major |

### 0.1 Why the exposure weighting had to go
v1.0 weighted option slots to elite share so the rare Hybrid appeared least often. The mechanism fails: **when an archetype isn't on the menu, the player is forced to vote for someone else.** A dead-even Artist/Hybrid player gets declared Artist 62% / Hybrid 29% purely as an artefact of which options were removed. And a perfect Hybrid (picks it all 8 times offered) caps at 8/12 = 67%, beaten by a consistent Artist at 9/11 = 75%.
**The cure is equal exposure.** 12 × 5 = 60 slots = exactly 12 per archetype. Rarity lives in the scoring as a prior. Cost: five tappable rows per screen instead of four (fits above the fold on any phone with labels under ~65 chars).

---

## 1. The shared template (unchanged — do not fork)
**Flow:** Welcome → Position select → Assessment (12 questions, 3 chapters, one at a time, chaptered progress) → Cinematic reveal (anticipation beat → archetype name big and first, in its colour + emblem → details unfold) → Result + share card → first development step.
Reveal sequence, share-card layout, data model identical to the Goalkeeper module (v2). **5 options instead of 4** — the `Question → Option[]` model already accepts any N.
v1 scope: self-report, frontend-only, no login until result. Tiers 3–4 optional, can ship fast-follow.

---

## 2. Winger archetypes

| Archetype | Identity | Signature strengths | Elite share |
|-----------|----------|---------------------|-------------|
| 🎨 **The Artist** | The Explosive Entertainer | 1v1 dribbling, flair, elite agility | **28%** |
| 👻 **The Ghost** | The Inside Forward | Off-ball movement, clinical finishing, spatial IQ | **26%** |
| ⚡ **The Speedster** | The Pace Merchant | Top-end speed, explosive acceleration, transition threat | **22%** |
| 🎭 **The Playmaker** | The Wide Creator | Vision, elite delivery, technical control | **16%** |
| 👑 **The Hybrid** | The Complete Winger *(rare)* | Goals + assists, adaptability, complete game | **8%** |

The 10,000-profile population was generated at 28/26/22/16/8, and the Bayesian classifier runs on 28/26/22/16/8. (The *Complete System Overview* states 32/28/22/13/5 — that matches nothing built; adopt 28/26/22/16/8.)

**Consumer rarity copy:** *"roughly 1 in 4"* (Artist, Ghost) · *"about 1 in 5"* (Speedster) · *"about 1 in 6"* (Playmaker) · **"fewer than 1 in 12. The rarest of the five."** (Hybrid).

---

## 3. Visual signatures

| Archetype | Emoji | Colour | Temperament | Emblem |
|-----------|-------|--------|-------------|--------|
| The Artist | 🎨 | Magenta `#E0218A` | Flair | Flame / spin |
| The Ghost | 👻 | Pale silver `#C8CED6` | Elusiveness | Fading silhouette |
| The Speedster | ⚡ | Electric blue `#0047CC` (deep) | Drive | Speed vector / motion streak |
| The Playmaker | 🎭 | Teal `#14B8A6` | Quiet control | Inward-drift arc |
| The Hybrid | 👑 | Electric cyan `#22D3EE` (bright) | Construction | Star / complete node |

**Accessibility:** Separate Speedster/Hybrid by **luminance** (`#0047CC` vs `#22D3EE`, ≥3:1) not hue. Pale silver & cyan fail WCAG AA as text on white → Ghost & Speedster cards render on **dark backgrounds**. **Colour is never the only channel** — every card carries colour + emblem + emoji + name.

---

## 4. Trait dimensions the assessment probes
- **How you beat your man** — skill (Artist) · pure pace (Speedster) · movement (Ghost) · the clever pass (Playmaker) · whatever the team needs (Hybrid)
- **Where you end up** — touchline (Artist/Speedster) · box (Ghost) · half-space (Playmaker) · wherever the shape breaks (Hybrid)
- **What you produce** — take-ons (Artist) · goals (Ghost) · runs in behind (Speedster) · assists (Playmaker) · availability (Hybrid)
- **Off the ball** — stay high as outlet (Artist/Speedster) · find the pocket (Ghost/Playmaker) · do the running nobody thanks you for (Hybrid)
- **What you'd never give up** — the loss-framed item (Q11) is the highest-signal question type.

---

## 5. The assessment — 12 questions, 3 chapters, **5 options each**
Exposure exactly equal: every archetype in all 12 questions, 60 slots, 12 per archetype. Options listed in fixed archetype order for editing; **shuffle option order per session** in the app.

*(Questions Q1–Q12 are identical to the v3.0 doc — see Winger-Assessment-Handoff-v3.md §5.)*

> **Design note — Q11** is loss-framed (*what would you be lost without?*) not aspiration. People claim every strength; they only defend one thing to the death. Highest-signal question in the set.
> **Design note — the Hybrid rewrite.** Every Hybrid option describes the **burden** (the sixty-yard sprint back, the conditioning block, the boring pass, giving up the finish, covering when everyone attacks). Only a genuine Hybrid picks that. That is how you get 8% naturally instead of engineering it.

---

## 6. The four-tier architecture

| Tier | What it is | Time | Required? | Max confidence |
|------|-----------|------|-----------|----------------|
| **1 — Identity** | The 12 questions | ~3 min | Yes | 50% |
| **2 — Context** | Age, **foot × side**, level | ~20 sec | Yes | 60% |
| **3 — Performance** | Self-reported test + match numbers | ~4 min | **Optional** | 80% |
| **4 — Tape** | 20-touch self-coded audit of own film | ~15 min | **Optional** | 92% |

**The Mirror:** Tiers 1–2 measure how you see your game. Tiers 3–4 measure what your game shows. Where they disagree is the most valuable thing the app can tell a player.

---

## 7. Tier 2 — Context (4 taps)

| Field | Options | Drives |
|-------|---------|--------|
| **Age band** | U9 · 9–12 · 13–16 · 17–21 · 22+ | Output gating (§13) |
| **Dominant foot** | Left · Right · Both | Foot × Side prior |
| **Side you play most** | Left wing · Right wing · Both · Drift central | Foot × Side prior |
| **Level** | Recreational · School/club · Academy · Semi-pro · Pro | Benchmark band |
| *(optional)* **Gender** | Male · Female · Prefer not to say | Exemplars + ACL protocol |

### The Foot × Side prior

| Situation | Meaning | Nudge |
|-----------|---------|-------|
| Left foot on **left**, or right foot on **right** | **Natural side.** Outside, byline, cross. | Artist **+0.6** · Speedster **+0.6** |
| Left foot on **right**, or right foot on **left** | **Inverted.** Cut in, shoot. | Ghost **+0.8** · Playmaker **+0.4** |
| Two-footed / drifts central | Free role. | Playmaker **+0.4** · Hybrid **+0.4** |

Max nudge is worth less than one question. It sharpens a close call; it can never override 12 clear answers.

---

## 8. Tier 3 — Performance (optional, self-reported)
*(Note: v3.0 recalibrated these bands — take-on 45–55% elite not 50–65%, all physical age-banded, physical down-weighted. Use v3.0 numbers. v2.0 bands kept below for reference.)*

**8.1 Physical:** 10m sprint <1.70 Speedster-elite (v3: age-band it) · max speed >35 (v3: age-band it) · Illinois agility <13.8 elite · sprints/match Speedster 15–25 · distance Hybrid 10–12 (v3: dropped).
**8.2 Technical:** Take-ons attempted/match — Artist 5–10, Speedster 4–8, Ghost 3–6, Playmaker 2–4. Goals — Ghost 15–25. Assists — Playmaker 10–18. Key passes — Playmaker 2.5–4.0. Pass completion — Playmaker 88–93%. Weak foot 4+ enables Ghost/Hybrid. Defensive actions — Hybrid 4–6.

Tier 3 does **not** overwrite the identity result — it builds a **second, independent evidence vector**. Both are shown.

---

## 9. Tier 4 — The Tape Test (optional, ~15 min)
Player opens a match video (camera roll or Veo/Trace/Hudl/YouTube link). App shows a tally pad. They scrub to each wide/attacking reception and tap what actually happened. Target: **20 receptions.**

| Tap | Scores |
|-----|--------|
| Beat the man 1v1 | Artist **+2** |
| Attempted take-on, lost it | Artist **+1** *(intent counts)* |
| Went outside → crossed / byline | Artist **+2** |
| Cut inside → shot | Ghost **+2** |
| Cut inside → laid it off, arrived in box | Ghost **+2** |
| Knocked it past and ran | Speedster **+2** |
| Ran in behind onto a through ball | Speedster **+2** |
| One-two / combined out | Playmaker **+2** |
| Switched play / progressive pass | Playmaker **+2** |
| Recycled backwards, kept it simple | *(no archetype — caution)* |

Off-ball counters: sprints in behind → Speedster · box arrivals → Ghost · pressing the FB → Hybrid · recovery runs → Hybrid.

---

## 10. The scoring engine (reference implementation)

```ts
type Archetype = 'ARTIST' | 'GHOST' | 'SPEEDSTER' | 'PLAYMAKER' | 'HYBRID';
type Vector = Record<Archetype, number>;
const ARCHETYPES: Archetype[] = ['ARTIST','GHOST','SPEEDSTER','PLAYMAKER','HYBRID'];

// 10.1 THE PRIOR — rarity lives HERE, not in the question set
const PRIOR: Vector = { ARTIST:0.28, GHOST:0.26, SPEEDSTER:0.22, PLAYMAKER:0.16, HYBRID:0.08 };
const PRIOR_STRENGTH = 3;   // pseudo-picks; ~quarter of one question

// 10.2 TIER 1 — IDENTITY (12 questions, one option per archetype each)
function rawFromAnswers(answers: Archetype[]): Vector {
  const raw: Vector = { ARTIST:0,GHOST:0,SPEEDSTER:0,PLAYMAKER:0,HYBRID:0 };
  for (const a of answers) raw[a] += 1;
  return raw;                                   // always sums to 12
}

// 10.3 TIER 2 — CONTEXT (Foot × Side), in pseudo-picks
type Foot='LEFT'|'RIGHT'|'BOTH'; type Side='LEFT'|'RIGHT'|'BOTH'|'CENTRAL';
function contextNudge(foot: Foot, side: Side): Vector {
  const n: Vector = { ARTIST:0,GHOST:0,SPEEDSTER:0,PLAYMAKER:0,HYBRID:0 };
  const natural  = (foot==='LEFT'&&side==='LEFT')||(foot==='RIGHT'&&side==='RIGHT');
  const inverted = (foot==='LEFT'&&side==='RIGHT')||(foot==='RIGHT'&&side==='LEFT');
  if (natural)  { n.ARTIST+=0.6; n.SPEEDSTER+=0.6; }
  if (inverted) { n.GHOST+=0.8; n.PLAYMAKER+=0.4; }
  else if (!natural) { n.PLAYMAKER+=0.4; n.HYBRID+=0.4; }
  return n;
}

// 10.4 IDENTITY PROFILE (Tier 1 + Tier 2)
function identityProfile(raw: Vector, nudge: Vector): Vector {
  const s: Vector = { ARTIST:0,GHOST:0,SPEEDSTER:0,PLAYMAKER:0,HYBRID:0 }; let total=0;
  for (const k of ARCHETYPES){ s[k]=raw[k]+nudge[k]+PRIOR_STRENGTH*PRIOR[k]; total+=s[k]; }
  for (const k of ARCHETYPES) s[k]/=total;      // normalise
  return s;
}

// 10.5 EVIDENCE PROFILE (Tier 3 + Tier 4) — second, independent read
// (v3.0: apply CHANNEL_WEIGHT EVENT 1.00 / TAPE 1.25 / PHYSICAL 0.40)
interface Metric { value:number; votes: Partial<Vector>; }
function evidenceProfile(metrics: Metric[], tape: Partial<Vector>, tapeEvents:number): Vector|null {
  const MIN_SIGNALS=4;
  const e: Vector = { ARTIST:0,GHOST:0,SPEEDSTER:0,PLAYMAKER:0,HYBRID:0 }; let signals=0;
  for (const m of metrics) for (const k of ARCHETYPES) if (m.votes[k]){ e[k]+=m.votes[k]!; signals++; }
  for (const k of ARCHETYPES) e[k]+=(tape[k]??0);
  if (tapeEvents>=20) signals+=4;
  if (signals<MIN_SIGNALS) return null;         // not enough — stay silent
  const total=ARCHETYPES.reduce((s,k)=>s+e[k],0)||1;
  for (const k of ARCHETYPES) e[k]/=total;
  return e;
}

// 10.6 THE BLEND — evidence weight rises with completeness, caps at 0.6
function evidenceWeight(t3Fields:number, tapeEvents:number):number {
  const fromT3=Math.min(0.30,t3Fields*0.05);
  const fromTape=Math.min(0.30,(tapeEvents/20)*0.30);
  return Math.min(0.60, fromT3+fromTape);
}
function finalProfile(identity: Vector, evidence: Vector|null, w:number): Vector {
  if (!evidence||w===0) return identity;
  const f: Vector = { ARTIST:0,GHOST:0,SPEEDSTER:0,PLAYMAKER:0,HYBRID:0 };
  for (const k of ARCHETYPES) f[k]=(1-w)*identity[k]+w*evidence[k];
  return f;
}

// 10.7 THE HYBRID GATE — three bars to be named Hybrid
//   (a) chose the unglamorous option repeatedly (raw.HYBRID >= 4);
//   (b) no real specialisation (top two non-Hybrids within 8 points);
//   (c) if evidence exists, Hybrid is in its top 2.
function hybridPasses(raw: Vector, final: Vector, evidence: Vector|null): boolean {
  if (raw.HYBRID < 4) return false;                                      // (a)
  const nonH=ARCHETYPES.filter(k=>k!=='HYBRID').sort((a,b)=>final[b]-final[a]);
  if ((final[nonH[0]]-final[nonH[1]]) > 0.08) return false;              // (b)
  if (evidence){ const r=[...ARCHETYPES].sort((a,b)=>evidence[b]-evidence[a]);
    if (r.indexOf('HYBRID')>1) return false; }                           // (c)
  return true;
}
// If more than ~1 in 12 users comes out Hybrid, the instrument is broken. Track it.

// 10.8 RESULT
type Band='Indicative'|'Sharpened'|'Verified'|'Evidence-backed';
function score(answers:Archetype[], foot:Foot, side:Side, metrics:Metric[], tape:Partial<Vector>, tapeEvents:number) {
  const raw=rawFromAnswers(answers);
  const identity=identityProfile(raw, contextNudge(foot,side));
  const evidence=evidenceProfile(metrics, tape, tapeEvents);
  const w=evidenceWeight(metrics.length, tapeEvents);
  const final=finalProfile(identity, evidence, w);
  let ranked=[...ARCHETYPES].sort((a,b)=>final[b]-final[a]);
  if (ranked[0]==='HYBRID' && !hybridPasses(raw,final,evidence)) ranked=[...ranked.slice(1),'HYBRID'];
  const primary=ranked[0], secondary=ranked[1];
  const isDualThreat=(final[primary]-final[secondary]) < 0.05;   // NOT "hybrid"
  const mirrorGap = evidence
    ? ARCHETYPES.reduce((s,k)=>s+Math.abs(identity[k]-evidence[k]),0)/2 : 0;
  let c=0.45;                       // Tier 1
  c+=0.10;                          // Tier 2 (always)
  if (metrics.length>=4) c+=0.20;   // Tier 3
  if (tapeEvents>=20) c+=0.15;      // Tier 4
  c+=Math.min(0.15,(final[primary]-final[secondary])*1.5);  // separation
  c-=0.20*mirrorGap;                                         // disagreement penalty
  const confidence=Math.max(0.30, Math.min(0.92, c));        // HARD CAP AT 92%
  const band: Band = confidence>=0.85?'Evidence-backed':confidence>=0.70?'Verified':confidence>=0.50?'Sharpened':'Indicative';
  return { primary, secondary, isDualThreat, spread:final, identity, evidence, mirrorGap, confidence, band };
}
```

### 10.9 Why confidence is hard-capped at 92%
The Codex reports 93–96% accuracy against *synthetic* labels — circular. Must not appear in the app. Use the confidence score, call it *confidence*.

---

## 11. Result cards
Each carries: **Reflect-back → This is you → Rarity → Strengths → Numbers to chase → You play like → Your edge → Keep this body safe → Your systems → Your arc → First step → Share.**

### 🎨 THE ARTIST — *The Explosive Entertainer* · magenta
**Rarity:** ~1 in 4. **Reflect-back:** *"You want the ball at your feet, a defender in front of you, and the freedom to beat him."* **You play like:** Neymar Jr · Vinícius Júnior · Franck Ribéry · Eden Hazard · Allan Saint-Maximin. **Edge:** confidence is volatile — three bad games and you stop attempting. Fix = a failure quota: 6–8 take-ons a match, non-negotiable. **Systems:** 4-3-3 (88/100); never alongside another Artist. **Arc:** peak 23–28; evolves → Ghost or Playmaker. **Share:** "I'm The Artist 🎨 — I beat defenders for fun."

### 👻 THE GHOST — *The Inside Forward* · pale silver (dark card)
**Rarity:** ~1 in 4. **Reflect-back:** *"You'd rather find the space nobody's watching and finish than beat three men."* **You play like:** Mohamed Salah · Son Heung-min · Sadio Mané · Leroy Sané. **Edge:** invisible games will eat you alive — track space created, not just touches. **Systems:** 4-3-3 paradise (95/100); never with another Ghost. **Arc:** peak 24–29; highest peak transfer value. **Share:** "I'm The Ghost 👻 — I appear from nowhere and score."

### ⚡ THE SPEEDSTER — *The Pace Merchant* · electric blue (dark card)
**Rarity:** ~1 in 5. **Reflect-back:** *"You want the ball in front of you and grass to run into."* **You play like:** Gareth Bale (prime) · Kylian Mbappé (wide) · Adama Traoré · Alphonso Davies. **Edge:** a deep block makes you ordinary; your weapon declines at 28–29 — add a second weapon before you need it. Ten minutes of ball mastery daily. **Systems:** 3-4-3 (89/100), counter-attacking. **Arc:** peak 23–27, narrowest window. **Share:** "I'm The Speedster ⚡ — nobody lives with my pace."

### 🎭 THE PLAYMAKER — *The Wide Creator* · teal
**Rarity:** ~1 in 6. **Reflect-back:** *"You'd rather drift inside, take a breath, and pick the perfect ball."* **You play like:** Riyad Mahrez · Bernardo Silva · Bukayo Saka · David Silva. **Edge:** positional freedom is earned; add 8+ goals or get called a luxury player. **Systems:** 3-4-3 (91/100); highest system-dependency. **Arc:** peak 26–32, best longevity; late → central midfielder. **Share:** "I'm The Playmaker 🎭 — the attack runs through me."

### 👑 THE HYBRID — *The Complete Winger* · electric cyan
**Rarity:** fewer than 1 in 12. **Reflect-back:** *"You refuse to be one thing."* **You play like:** Lionel Messi (wide) · Cristiano Ronaldo (early) · Raheem Sterling (peak) · Kingsley Coman · Serge Gnabry. **Edge:** danger of good-at-everything, elite-at-nothing — **pick a spike**, build it to elite. **Systems:** all; highest value in wing-back systems; lowest system-dependency. **Arc:** peak 25–30; highest/most stable value. **Share:** "I'm The Hybrid 👑 — fewer than 1 in 12 get this."

### The Dual-Threat card (top two within 5 points)
**Headline:** *"You're a Dual-Threat: The Artist–Ghost."* Split card, both emblems/colours/strength lists, one merged development edge. *"Elite wingers are usually a spike plus a shadow."* → drives Tier 3/4. (This is why "tie = a hybrid" was renamed — with an archetype literally called The Hybrid, that rule was ambiguous.)

---

## 12. Women's football layer (optional gender field)
1. **Exemplars swap** — verify before shipping. Confident: Salma Paralluelo → Speedster, Marta (peak) → Artist, Lauren James → Artist. Do not ship placeholders.
2. **ACL prevention mandatory** on Artist/Ghost cards. *(v3.0 corrected the numbers — female ACL ~2–3× not 4–6×; prevention ~22% reduction not 50–70%; lead with median 292 days lost.)*

---

## 13. Age gating & safeguarding (hard rules)

| Age band | What the app shows |
|----------|-------------------|
| **Under 13** | **No archetype label.** Show *"Your early leaning: 🎨 Artist energy"* as flavour + youth message. No benchmarks/injury/career arc. |
| **13–16** | Archetype **"emerging."** Full card framed as direction not destiny. Re-test every 6 months. |
| **17+** | Full card. |

**Under-18 content bans (component level):** ❌ no supplementation protocols ❌ no body composition/weight/body-fat inputs ❌ no genetic testing ❌ no "elite or bust" framing ✅ always the physio disclaimer. Enforce via age/gender fields gating what renders.

---

## 14. Claims discipline
"96%/93% accuracy" → don't publish; use confidence (cap 92%). Quantum coherence/motor superposition → no quantum language in consumer copy. Microbiome r=0.73 → don't state as fact. "10,000 profiles" → say "modelled." 43-minute phenomenon → keep as a *training tip to test*, not fact.

---

## 15. Re-assessment and drift
Prompt a re-test every 6 months or after 5 logged matches. Store every result. Show a **drift chart**. Celebrate the drift.

---

## 16. Build checklist (definition of done)
**Tier 1&2:** 12×5 options, one per archetype, order shuffled per session · **unit test: exactly 12 exposures per archetype** · Foot×Side prior · scoring per §10 (prior, Hybrid Gate, Dual-Threat) · confidence capped 92% · 5 reveal cards + 1 Dual-Threat · Ghost/Speedster dark cards, Speedster/Hybrid luminance ≥3:1 · colour never sole channel · age gating (U13 = leaning) · under-18 bans at component level · **analytics: track Hybrid rate (>~10% = broken)**.
**Tier 3 (fast follow):** optional performance form · benchmark comparison · The Mirror side-by-side · take-on-is-elite line.
**Tier 4:** tally pad (camera roll or URL) · 20-reception progress ring · off-ball counters · confidence rises visibly.
**Longitudinal:** result history · drift chart · 6-month re-test prompt.

---

## 17. Open items
1. Audit the other seven modules for the exposure bug (highest priority — template problem).
2. Reconcile the distribution (28/26/22/16/8 is canon).
3. Reconcile Saka (Playmaker) and Coman (Hybrid).
4. Kill or harvest the orphan framework (Roadrunner/Safecracker/Raider/Gamebreaker).
5. Women's exemplars — verify before ship.
6. GPS vest integrations (STATSports/Catapult/Playermaker) — v2 scope.

*Same template, same reveal. The Winger's own archetypes — with a working instrument underneath them. Position 7 of 8.*
