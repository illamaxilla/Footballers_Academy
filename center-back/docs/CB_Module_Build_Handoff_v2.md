# The Footballer's Academy — Center Back Module
## Build Handoff v2.0 · Module 2 of 7

**Version:** 2.0 · **Supersedes:** v1.0 (10 July 2026) · **Date:** 19 July 2026
**Build target for this version:** Claude Design prototype (frontend only)
**Owner:** Joseph · **Project:** Center Back Codex / Position-DNA™

---

## 0. What changed in v2.0

v1.0 specified a good assessment. v2.0 keeps all of it and fixes the four things that would have broken in front of a real 15-year-old, then adds the product surfaces around it.

| # | Change | Why |
|---|--------|-----|
| 1 | **Weighted scoring + deterministic tiebreak** (§6) | v1.0's flat +1 scoring produces frequent ties and unconvincing spreads (a 4/3/3/2 split gives a 33% "primary"). The reveal is the product; a weak spread kills it. |
| 2 | **16 outcomes instead of 4** — 4 pure + 12 hybrids (§8) | v1.0 promised "secondary influence" and "hybrid" but only wrote copy for the 4 pure archetypes. Most players will land on a hybrid. That path had no content. |
| 3 | **Three questions rewritten** (Q1D, Q5, Q7) (§5) | Q5 asked the same thing twice in different words, and Ch.2 measured one trait three times. Q7 now probes the partnership — the CB-specific dimension the codex is built on and the assessment was missing entirely. |
| 4 | **Age + consent gate is v1 scope, not later** (§14) | Target user is a minor. Consent language written at launch determines whether the video dataset is legally usable for the AI engine in Phase 3. Get it wrong now and the intelligence layer is built on data you can't use. |
| 5 | **New: development plan engine** (§9), **challenge model** (§10), **readiness score definition** (§11) | Named as ambitions in your brief, previously undefined. "Readiness" without a definition becomes a vanity number. |
| 6 | **New: position pack schema** (§4) | The seven positions are the same application with different data. If content is separated from UI now, positions 3–7 cost days each instead of weeks. This is the single highest-leverage decision in the whole build. |
| 7 | **New: phase gates for the AI engine, living model, GVU and hubs** (§13, §15) | Each has a data prerequisite that only the player app can produce. Sequencing them wrong means building the roof before the walls. |
| 8 | **New: claims register + credibility rules** (§14) | Some numbers in the codex will not survive contact with a technically literate reviewer. Fixing the language protects the work that *is* strong. |

**Unchanged from v1.0:** the four archetypes, their identities, colours, emblems, elite shares, exemplars, all four result cards, the flow, the reveal sequence, the share-card concept, and Chapters 1 and 3 of the assessment (except Q1 option D).

---

## 1. Product scope — the ladder

Five rungs. Each one is only built once the rung below it is generating something the next one needs. **The rung you are on is Rung 0.**

```
RUNG 4  GLOBAL PHYSICAL HUBS
        Requires: a proven curriculum + a paying institution
             ↑
RUNG 3  GLOBAL VIRTUAL UNIVERSITY (GVU) + ATLAS
        Requires: a methodology validated on real players + accredited curriculum
             ↑
RUNG 2  INTELLIGENCE LAYER
        auto-classifier · living model · load & wellbeing flags
        Requires: 10,000+ labelled profiles + longitudinal behaviour data
             ↑
RUNG 1  PLAYER APP (full)
        accounts · plans · progress · video · challenges · readiness
        Requires: evidence the reveal makes people come back
             ↑
RUNG 0  THE REVEAL PROTOTYPE  ← YOU ARE HERE (Claude Design)
        assessment · reveal · result · share card · Week 1 preview
        Requires: nothing. Build it this week.
```

### Gate criteria — do not climb until these are true

| Rung | Gate |
|------|------|
| 0 → 1 | 20 real players (age 13–18) complete the assessment. **≥70% say the result "sounds like me"** and **≥40% share it unprompted.** If it fails, fix the assessment — do not build a backend on top of a reveal nobody believes. |
| 1 → 2 | 10,000 completed profiles with ≥8 weeks of behaviour data, and a written definition of what your model's label *is*. |
| 2 → 3 | A cohort where the methodology demonstrably moved something measurable, plus an accreditation partner. |
| 3 → 4 | A curriculum that sells at scale, and a site that a federation or club will co-fund. |

### What Rung 0 is *not*
No login, no database, no file upload, no AI, no payments, no coach view, no scout view, no marketplace. Claude Design builds a frontend. Everything above needs a server. Trying to fake persistence in the prototype will cost you a week and teach you nothing.

---

## 2. The shared template (unchanged — applies to all seven positions)

**Guiding principle — the reveal is the product.** Every choice serves felt accuracy, emotional payoff, and shareability.

**The flow:** Welcome → Consent gate → Assessment (12 questions in 3 chapters, one at a time, chaptered progress) → Anticipation beat → Cinematic reveal (archetype name big and first, in its colour + emblem → details unfold) → Result + share card → first development step.

**Reusable across positions:** flow, reveal sequence, share-card layout, scoring engine, tiebreak logic, data model, plan engine, challenge model, readiness formula.

**Swapped per position:** archetypes, chapter names, questions, option mappings, visual signatures, result copy, hybrid copy, challenge library, plan content.

---

## 3. Center Back archetypes and visual signatures (unchanged)

| Archetype | Identity | Signature strengths | Elite share | Colour | Emblem |
|-----------|----------|---------------------|-------------|--------|--------|
| **The Colossus** | The Physical Dominator | Aerial & physical dominance, imposing presence | 25–30% | Crimson `#C8102E` | Fortress / tower |
| **The Architect** | The Ball-Playing Defender | Progressive passing, composure, build-up | 20–25% | Electric cyan `#00E5FF` | Compass / blueprint lines |
| **The Sentinel** | The Reading Master | Anticipation, interceptions, positioning | 30–35% | Deep gold `#E8B33A` | Radar / eye |
| **The Libero** | The Modern Sweeper | Coverage, versatility, tactical flexibility | 15–20% | Violet `#8B5CF6` | Sweeping orbit arc |

### Trait dimensions the assessment probes
- **How you defend** — win it physically (Colossus) · read and intercept (Sentinel) · sweep and cover (Libero) · win it clean and go (Architect)
- **On the ball** — launch attacks (Architect) · keep it simple, defend next (Colossus) · see the next phase (Sentinel) · carry into space (Libero)
- **With your partner** *(new in v2.0)* — cover for him (Libero) · fight for him (Colossus) · organise him (Sentinel) · take the ball and reset (Architect)
- **Identity** — enforcer (Colossus) · reader (Sentinel) · builder (Architect) · coverer (Libero)

---

## 4. The position pack — read this before writing any code

Every position is the same application fed different content. Build it that way from line one.

**Rule: no player-facing string, colour, question or challenge is ever typed inside a component.** It all lives in one object, `cbPack`, in its own file. Position 3 is then a copy of that file with different values — an afternoon's work instead of a rebuild.

```jsonc
{
  "position": { "id": "cb", "name": "Center Back", "module": 2, "emblem": "🛡️" },

  "theme": {
    "base": "#0B1014", "surface": "#121A20", "line": "#1E2A31",
    "chalk": "#F2F4F1", "chalkDim": "#96A1A6"
  },

  "archetypes": [
    {
      "id": "colossus",
      "name": "The Colossus",
      "tagline": "The Physical Dominator",
      "color": "#C8102E",
      "emblem": "fortress",
      "reflectBack": "…",
      "identity": "…",
      "strengths": ["Aerial dominance", "Physical strength", "Set-piece defending"],
      "exemplars": ["Virgil van Dijk", "Raphaël Varane", "Kalidou Koulibaly"],
      "developmentEdge": "…",
      "firstStep": "…",
      "nextStepCTA": "…",
      "shareCopy": "…",
      "pillarProfile": { "duels": 5, "body": 5, "reading": 3, "ball": 2, "voice": 3 }
    }
    // architect, sentinel, libero
  ],

  "chapters": [
    { "id": "c1", "order": 1, "name": "Your Defending", "weight": 1.0 },
    { "id": "c2", "order": 2, "name": "Your Ball, Your Line", "weight": 1.0 },
    { "id": "c3", "order": 3, "name": "Your Presence", "weight": 1.5 }
  ],

  "questions": [
    {
      "id": "q1", "order": 1, "chapterId": "c1",
      "prompt": "A big striker holds the ball up, back to goal. You…",
      "options": [
        { "id": "q1a", "label": "…", "archetypeId": "colossus" },
        { "id": "q1b", "label": "…", "archetypeId": "sentinel" },
        { "id": "q1c", "label": "…", "archetypeId": "libero" },
        { "id": "q1d", "label": "…", "archetypeId": "architect" }
      ]
    }
    // q2 … q12
  ],

  "hybrids": {
    "colossus>sentinel": { "title": "The Colossus, who reads it first", "line": "…" }
    // 12 ordered pairs
  },

  "pillars": [
    { "id": "duels",   "name": "Duels",   "desc": "Winning the ball, and the man" },
    { "id": "reading", "name": "Reading", "desc": "Seeing it before it happens" },
    { "id": "ball",    "name": "Ball",    "desc": "What you do once you've won it" },
    { "id": "body",    "name": "Body",    "desc": "Jump, sprint, turn, recover" },
    { "id": "voice",   "name": "Voice",   "desc": "Organising everything in front of you" }
  ],

  "challenges": [ /* see §10 */ ],
  "plans": { "colossus": { "weeks": [ /* see §9 */ ] } }
}
```

**Invariants the engine can rely on** (assert these in a test — it will save you hours of confused debugging):
1. Exactly 12 questions.
2. Exactly 4 options per question.
3. Each question maps each of the 4 archetypes exactly once.
4. Every `archetypeId` referenced exists.
5. All 12 ordered hybrid pairs have copy.

---

## 5. The assessment — v1.1

Twelve scenario questions, three chapters, one option per archetype per question. The player never sees the mapping.

**Changes from v1.0 are marked ⚠️. Original wording is preserved in Appendix A so nothing is lost.**

### 📖 Chapter 1 — *Your Defending* (weight 1.0)

**Q1. A big striker holds the ball up, back to goal. You…**
- A) Get tight and bully him off it — I win the physical battle. *(Colossus)*
- B) Hold my distance, read the lay-off, and intercept. *(Sentinel)*
- C) Drop a step to cover the runner in behind. *(Libero)*
- D) ⚠️ Nick it off him clean and get us going forward straight away. *(Architect)*

> ⚠️ **Why changed:** v1.0's "show him one way and win it cleanly" is textbook *positional* defending — it reads as Sentinel, not Architect. The Architect option needs an on-ball motive.

**Q2. A ball is played over the top into the channel. You…**
- A) Use my pace to sweep across and clear it. *(Libero)*
- B) I read it early — already turned and favourite for it. *(Sentinel)*
- C) Muscle the striker off and win the physical race. *(Colossus)*
- D) Get there and calmly play out rather than hoof it. *(Architect)*

**Q3. A cross comes into a crowded box. Your instinct…**
- A) Attack it and clear it with authority. *(Colossus)*
- B) Position early so I'm first to the danger spot. *(Sentinel)*
- C) Track the late runner nobody else has picked up. *(Libero)*
- D) Win it and set it into a teammate to start the counter. *(Architect)*

**Q4. Your team's in a messy scramble on the edge of the box. You…**
- A) Throw my body in — block, clear, whatever it takes. *(Colossus)*
- B) Stay calm, read where it's spilling, and step to it. *(Sentinel)*
- C) Cover the space behind the chaos in case it breaks. *(Libero)*
- D) Win it and immediately pass out of trouble. *(Architect)*

### 📖 Chapter 2 — *Your Ball, Your Line* (weight 1.0) ⚠️ *renamed*

**Q5. ⚠️ You've got the ball at the back with time. What's going through your head?**
- A) Where's the pass that breaks their line — I'm looking to hurt them from here. *(Architect)*
- B) Nothing fancy. My job's the next defensive action, not this pass. *(Colossus)*
- C) There's space in front of me — I'll carry it and make someone come to me. *(Libero)*
- D) I've already picked it. The pass that leaves us organised for what comes next. *(Sentinel)*

> ⚠️ **Why changed:** in v1.0, option B ("recycle to a full-back") and option D ("the calm pass that keeps our shape") were the same action described twice. The player was choosing on vibes and their archetype hinged on it. Now the options differ by **motive**, not by pass length.

**Q6. The opposition presses you hard as you receive. You…**
- A) Take a touch, stay composed, and pass through the press. *(Architect)*
- B) Go long and safe — no risks near my own goal. *(Colossus)*
- C) Drive out of the pressure with the ball at my feet. *(Libero)*
- D) Move it first-time to the free man I've already spotted. *(Sentinel)*

**Q7. ⚠️ Your centre-back partner gets dragged out of position and a gap opens. You…**
- A) Slide across and cover it — I'll hold the line together myself. *(Libero)*
- B) Get across and win the duel before it becomes a chance. *(Colossus)*
- C) Organise it out loud — reset the line before the ball's even played. *(Sentinel)*
- D) Drop into the gap, take the ball, and calm it down from the back. *(Architect)*

> ⚠️ **Why changed:** v1.0's Q7 ("your manager wants centre-backs to start attacks") asked the same underlying question as Q5 and Q6 — *how much do you want the ball?* Three items measuring one trait inflates Architect and Libero for anyone who likes the ball, and inflates Colossus for anyone who doesn't. The replacement probes **the partnership**, the dimension the entire Center Back codex is built on, which v1.0's assessment never touched.

**Q8. In training you enjoy most…**
- A) Playing out and passing patterns from the back. *(Architect)*
- B) Aerial duels and defending crosses. *(Colossus)*
- C) Recovery runs, covering, and 1v1 in space. *(Libero)*
- D) Positioning, angles, and reading attacks. *(Sentinel)*

### 📖 Chapter 3 — *Your Presence* (weight 1.5)

**Q9. Teammates describe you as…**
- A) A rock — nothing gets past me physically. *(Colossus)*
- B) The calm reader who's always in the right spot. *(Sentinel)*
- C) The one who starts our attacks from the back. *(Architect)*
- D) The sweeper who cleans up everything behind us. *(Libero)*

**Q10. The compliment that means the most…**
- A) "You dominated their striker all game." *(Colossus)*
- B) "You read the whole game — barely had to tackle." *(Sentinel)*
- C) "Half our attacks started with your pass." *(Architect)*
- D) "You covered every gap — we were never exposed." *(Libero)*

**Q11. Which defender do you most want to play like?**
- A) A commanding, unbeatable physical presence. *(Colossus)*
- B) A calm reader who intercepts everything. *(Sentinel)*
- C) A ball-playing defender who builds attacks. *(Architect)*
- D) A versatile sweeper who covers the whole back line. *(Libero)*

**Q12. What frustrates you most in a match?**
- A) A striker getting the better of me in a duel. *(Colossus)*
- B) Getting dragged out of position and having to scramble. *(Sentinel)*
- C) Being told to just clear it instead of playing. *(Architect)*
- D) A gap opening behind us I couldn't cover in time. *(Libero)*

---

## 6. Scoring engine v2

### The problem with v1.0
Flat +1 per answer, 12 questions, 4 archetypes. Every player's scores sum to 12. A common outcome is 4/3/3/2 — which renders as a **33% "primary"**, and first-place ties are frequent. A reveal that says *"You are 33% Colossus, or possibly Sentinel"* is not a reveal.

### The fix — three parts

**1. Chapter weighting.** Chapter 3 asks who the player *believes they are*. That is the strongest signal of self-concept, and self-concept is what the reflect-back has to match. Weight it higher.

| Chapter | Items | Weight per item | Max contribution |
|---------|-------|-----------------|------------------|
| 1 — Your Defending | 4 | 1.0 | 4.0 |
| 2 — Your Ball, Your Line | 4 | 1.0 | 4.0 |
| 3 — Your Presence | 4 | 1.5 | 6.0 |
| **Total** | **12** | | **14.0** |

Non-integer weights also break most ties for free.

**2. Spread.** `share_i = score_i / 14 × 100`, rounded to whole numbers, largest-remainder adjusted so the four shares sum to exactly 100.

**3. Deterministic tiebreak cascade.** The same answers must always give the same result — a shareable result that changes on a re-run destroys trust.

```
if tie for first:
  1. higher Chapter 3 subtotal wins
  2. else: the archetype chosen in Q11 (aspiration) wins
  3. else: the archetype chosen in Q9 (how teammates see you) wins
  4. else: rarity order — Libero > Architect > Colossus > Sentinel
```

Step 4 resolves toward the **more distinctive** identity rather than the modal one. It is a deliberate product choice, not a statistical one: a distinctive result is more useful for development and far more shareable. Flag it for A/B testing later.

### Primary vs hybrid

```
dominance = primaryShare − secondaryShare

dominance ≥ 12  →  PURE result   (e.g. "The Colossus")
dominance <  12  →  HYBRID result (e.g. "The Colossus, who reads it first")
```

Roughly: a pure result needs the primary to be ahead by about 1.7 weighted answers. Tune the threshold after 100 real completions — you want **55–70% pure**. Too many hybrids and the archetypes feel mushy; too few and the result feels generic.

### Reference implementation

```js
const CHAPTER_WEIGHT = { c1: 1.0, c2: 1.0, c3: 1.5 };
const RARITY_ORDER = ["libero", "architect", "colossus", "sentinel"];
const PURE_THRESHOLD = 12;

export function score(answers, pack) {
  // answers: { q1: "q1a", q2: "q2c", ... }
  const raw = Object.fromEntries(pack.archetypes.map(a => [a.id, 0]));
  const c3   = Object.fromEntries(pack.archetypes.map(a => [a.id, 0]));

  for (const q of pack.questions) {
    const opt = q.options.find(o => o.id === answers[q.id]);
    if (!opt) continue;
    const w = CHAPTER_WEIGHT[q.chapterId];
    raw[opt.archetypeId] += w;
    if (q.chapterId === "c3") c3[opt.archetypeId] += w;
  }

  const total = Object.values(raw).reduce((a, b) => a + b, 0); // 14
  const spread = largestRemainder(raw, total);                 // sums to exactly 100

  const ranked = Object.keys(raw).sort((a, b) =>
    raw[b] - raw[a] ||
    c3[b]  - c3[a]  ||
    aspirationRank(a, b, answers, pack) ||
    selfImageRank(a, b, answers, pack) ||
    RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b)
  );

  const [primary, secondary] = ranked;
  const dominance = spread[primary] - spread[secondary];

  return {
    primary, secondary, spread, dominance,
    isPure: dominance >= PURE_THRESHOLD,
    hybridKey: `${primary}>${secondary}`
  };
}
```

### Presentation rules
- **The archetype name is the hero. The percentage is never the hero.** Name first, big, in colour. Spread appears afterwards, small, in the mono utility face, as a four-bar readout.
- Never render a bare "You are 36% Colossus." Render the four-bar spread with the primary labelled.
- Never show a "confidence" or "accuracy" figure. You have no ground truth to be accurate against (see §13).

---

## 7. Result cards — the four pure archetypes (unchanged from v1.0)

---

#### 🛡️ THE COLOSSUS — *The Physical Dominator* · crimson
**Reflect-back:** "You want to win every duel and dominate the striker physically — nothing gets past you."
**This is you:** The immovable object. You dominate the air, win the physical battles, and thrive in the chaos strikers hate. When it's a fight, you win it.
**Strengths:** Aerial dominance · Physical strength · Set-piece defending
**You play like:** Virgil van Dijk, Raphaël Varane, Kalidou Koulibaly
**Your edge:** Ball-playing — growing your comfort on the ball keeps you dominant in the modern build-from-the-back game.
**First step this week:** Win your aerial and physical duels first, then challenge yourself to play one composed pass out instead of clearing every time.
**Next-step button:** *Your Colossus path starts with dominating your duels →*
**Share:** "I'm The Colossus 🛡️ — nothing gets past me. Which defender are you?"

---

#### 🛡️ THE ARCHITECT — *The Ball-Playing Defender* · electric cyan
**Reflect-back:** "You want the ball at your feet and attacks starting from you — a defender who builds."
**This is you:** The one who turns defending into attacking. Composed under pressure, you break lines with your passing and start moves from deep. Defending is only half your game.
**Strengths:** Progressive passing · Composure on the ball · Reading passing lanes
**You play like:** Mats Hummels, Leonardo Bonucci, John Stones
**Your edge:** The defensive fundamentals — duels and aerials — so your ball-playing is never a liability under pressure.
**First step this week:** Look to play one line-breaking pass every time you receive — but never at the cost of your defensive position.
**Next-step button:** *Your Architect path starts with playing out from the back →*
**Share:** "I'm The Architect 🛡️ — I start the attack from the back. Which defender are you?"

---

#### 🛡️ THE SENTINEL — *The Reading Master* · deep gold
**Reflect-back:** "You read the danger before it happens and cut it out — you rarely need to dive into tackles."
**This is you:** The chess-player. You anticipate, position perfectly, and snuff out danger before it becomes a chance. You defend with your brain, not your body.
**Strengths:** Anticipation & interceptions · Positioning · Game reading
**You play like:** Thiago Silva, Marquinhos, Jérôme Boateng
**Your edge:** Physical presence and duels, so you can dominate when reading alone isn't enough.
**First step this week:** Before each attack, predict where the ball's going and step to intercept — count how many you cut out before a shot.
**Next-step button:** *Your Sentinel path starts with reading the game →*
**Share:** "I'm The Sentinel 🛡️ — I read danger before it happens. Which defender are you?"

---

#### 🛡️ THE LIBERO — *The Modern Sweeper* · violet
**Reflect-back:** "You want to cover every gap and free the players around you — the safety net behind the line."
**This is you:** The coverer. Fast, versatile, tactically sharp, you sweep up everything behind the defence and give your teammates freedom to push. You clean up what others miss.
**Strengths:** Coverage & recovery pace · Versatility · Tactical flexibility
**You play like:** David Alaba, Alessandro Bastoni, Manuel Akanji
**Your edge:** Aerial and duel strength, so you're complete in the box as well as in space.
**First step this week:** Focus on your covering position — always be ready to sweep the ball in behind. Notice how much higher your back line can push because of you.
**Next-step button:** *Your Libero path starts with covering the space →*
**Share:** "I'm The Libero 🛡️ — I cover everything behind the line. Which defender are you?"

---

## 8. Hybrid results — 12 new outcomes

When `dominance < 12`, the reveal shows the primary's colour, emblem and card, with the hybrid title replacing the tagline and one extra line inserted under the reflect-back. Everything else in the card stays as-is.

| Key | Title | Inserted line |
|-----|-------|---------------|
| `colossus>architect` | The Colossus, who can play | "You win the fight first — but you don't just clear it. There's a footballer inside the wall." |
| `colossus>sentinel` | The Colossus, who reads it first | "You'd win the duel anyway. You just prefer to make sure there isn't one." |
| `colossus>libero` | The Colossus, who covers ground | "Big, and quick with it. Strikers who beat you physically still don't get away from you." |
| `architect>colossus` | The Architect, who wins the fight | "You want the ball — and you've earned the right to have it. Nobody bullies you off it." |
| `architect>sentinel` | The Architect, who sees it early | "You're not just comfortable in possession. You knew the pass before you got the ball." |
| `architect>libero` | The Architect, who carries it out | "When the pass isn't on, you don't panic — you take it forward yourself." |
| `sentinel>colossus` | The Sentinel, who can dominate | "You read it first. And when reading isn't enough, you're more than happy to win it the hard way." |
| `sentinel>architect` | The Sentinel, who starts the attack | "You cut it out before it happens — and the moment you have it, you're already building." |
| `sentinel>libero` | The Sentinel, who sweeps behind | "You see it coming and you're already moving. Very little gets in behind your line." |
| `libero>colossus` | The Libero, who wins his duels | "You cover everything — and you're not soft when you get there." |
| `libero>architect` | The Libero, who builds from deep | "You clean up behind, then step out and start it again. The whole team plays higher because of you." |
| `libero>sentinel` | The Libero, who reads it early | "You cover the space before you need to. Half the danger never arrives." |

**Share copy for hybrids:** `"I'm {hybridTitle} 🛡️ — which defender are you?"`

**Development plan for hybrids:** 70% of the primary's plan, 30% swapped for the secondary's strength sessions (see §9).

---

## 9. The development plan engine

### Structure
A plan is **12 weeks**, in **three 4-week blocks**, with **3 sessions per week**. Each session has one **primary pillar** (the archetype's strength) or one **edge pillar** (the archetype's stated weakness — already written into every result card as "Your edge").

The ratio shifts across the blocks. This is the whole pedagogical idea, and it operationalises copy you already wrote:

| Block | Weeks | Strength sessions | Edge sessions | Framing to the player |
|-------|-------|-------------------|---------------|----------------------|
| I — Own it | 1–4 | 2 per week | 1 per week | "Become undeniable at what you already are." |
| II — Stretch it | 5–8 | 2 | 1, at a higher tier | "Now the thing you avoid." |
| III — Complete it | 9–12 | 1–2 | 1–2 | "Play the whole position." |

### Pillar profiles (drives session selection)

| Archetype | Strength pillars | Edge pillar | Support |
|-----------|------------------|-------------|---------|
| Colossus | Duels, Body | **Ball** | Voice |
| Architect | Ball, Reading | **Duels** | Voice |
| Sentinel | Reading, Voice | **Duels** | Ball |
| Libero | Body, Reading | **Voice** | Duels |

### Generation rule (pure result)
```
for week in 1..12:
  block = ceil(week / 4)
  sessions = [strengthA, strengthB, edge]         // block I
           | [strengthA, strengthB, edge@tier+1]  // block II
           | [strengthA, edge, edge@tier+2]       // block III
  pick challenges matching (pillar, tier) not used in the last 3 weeks
```

### Generation rule (hybrid result)
Weeks 1–12 as above for the primary, then **replace one strength session every other week** with a strength session from the secondary's profile. Roughly 70/30. The player sees this named on the plan: *"Week 4 · Colossus week, with one Sentinel session."*

### Week 1, fully written (this is all the prototype needs)

**COLOSSUS · Week 1 — Own the contact**
| # | Session | Pillar | Min | Kit | Done when |
|---|---------|--------|-----|-----|-----------|
| 1 | **Own the Contact** — shoulder-to-shoulder over 5m to a cone with a partner, 10 each side. *No arms to head or neck. No jumping into contact.* | Duels | 15 | Partner, 2 cones | You arrive first and stay on your feet 7/10 |
| 2 | **The Standing Jump** — 3×5 two-footed max jumps to a marker, then 3×5 with a one-step approach. Log your best reach. *No heading.* | Body | 12 | Wall/marker | 30 jumps logged, best reach recorded |
| 3 | **Ten Clean Passes** *(your edge)* — against a wall, 10 consecutive first-time passes with your weaker foot from 8m. Miss = restart the count. | Ball | 10 | Ball, wall | 10 in a row, twice |

**ARCHITECT · Week 1 — Open your body**
| # | Session | Pillar | Min | Kit | Done when |
|---|---------|--------|-----|-----|-----------|
| 1 | **Open Your Body** — receive off a wall, first touch across your body into space, then pass a target 10m away. 20 reps each side. | Ball | 12 | Ball, wall, target | 15/20 with a single touch |
| 2 | **Scan and Say** — before every wall pass, look over both shoulders and say out loud what you saw. 30 reps. | Reading | 10 | Ball, wall | 30 reps, no pass without a scan |
| 3 | **Win It First** *(your edge)* — 1v1 defending in a 10×10 grid, 8 reps. | Duels | 15 | Partner, 4 cones | 5 clean wins, no fouls |

**SENTINEL · Week 1 — See it before it happens**
| # | Session | Pillar | Min | Kit | Done when |
|---|---------|--------|-----|-----|-----------|
| 1 | **Predict the Pass** — watch 15 minutes of any match. Before every pass into the final third, call out loud where it's going. Log hits and misses. | Reading | 20 | A screen | 30 calls logged |
| 2 | **Call the Line** — at your next team session, be the voice that sets the defensive line. Count how many times. | Voice | 1 session | — | 20 calls made |
| 3 | **Front Foot** *(your edge)* — 10 reps stepping in to intercept a firm pass into a partner's feet. | Duels | 12 | Partner, ball | 6 clean interceptions, no contact through the player |

**LIBERO · Week 1 — Cover everything**
| # | Session | Pillar | Min | Kit | Done when |
|---|---------|--------|-----|-----|-----------|
| 1 | **Turn and Go** — 8 × 20m recovery sprints starting from a backwards jog, turning on a partner's call. | Body | 12 | Partner, 2 cones | 8 reps, best time logged |
| 2 | **Cover the Gap** — watch a match, pause 10 times while your team defends, say where the covering defender should be. | Reading | 15 | A screen | 10 pauses called |
| 3 | **Hold the Duel** *(your edge — talking)* — 1v1 in a channel, force the attacker wide, and **call your decision out loud before you make it.** 10 reps. | Voice | 15 | Partner, 4 cones | 7 forced outside, every one called first |

### Plan copy rules
- Sessions are named like drills a coach would shout, not like modules.
- Every session has a **countable** success criterion. "Improve your positioning" is not a session.
- Never more than 3 sessions a week in v1. The failure mode for a teenager's training app is a plan they abandon in week 2 because it assumed they had no school, no team training, and no life.

---

## 10. The challenge model

Challenges are the atoms. Plans are just ordered selections of them.

```jsonc
{
  "id": "cb-duels-001",
  "title": "Own the Contact",
  "pillar": "duels",
  "tier": 1,                                  // 1 foundation · 2 developing · 3 elite
  "archetypeAffinity": ["colossus", "libero"],
  "minAge": 11,
  "durationMin": 15,
  "equipment": ["partner", "cones:2"],
  "space": "10m × 10m",
  "instructions": ["…", "…"],
  "successCriteria": { "type": "count", "target": 7, "of": 10, "label": "duels won" },
  "evidence": "self_report",                  // self_report | count | video (Rung 1+)
  "xp": 40,
  "safety": ["No contact to head or neck", "No jumping into contact"],
  "restrictions": ["no_heading_under_12"]
}
```

### Tiers
- **T1 Foundation** — alone or with one partner, garden or park, no equipment beyond a ball.
- **T2 Developing** — needs a partner or a wall and a defined space; measurable output.
- **T3 Elite** — needs a team session or a coach to observe; video evidence unlocks at Rung 1.

Unlock rule: complete 4 of 6 sessions at a tier within a pillar to unlock the next tier in that pillar. Tiers are per-pillar, so a Colossus can be T3 in Duels and T1 in Ball. **That asymmetry is the point** — the plan should visibly show the player where they are unfinished.

### XP and streaks — designed to be safe for teenagers
- XP per completed session, scaled by tier (T1 = 40, T2 = 70, T3 = 120). No XP for opening the app.
- **Streaks forgive one miss per fortnight automatically.** No "you lost your 40-day streak" screens. A streak that punishes an injury or an exam week is a product that teaches players to lie to it.
- **No individual leaderboards for under-16s.** Anonymous archetype-cohort percentiles only, opt-in, and never framed as a ranking of players against each other.
- No push notification guilt loops ("Your Colossus is getting weaker"). Prompts are informational and capped at 3 per week.

### Youth heading — a hard constraint, not a preference
The Colossus archetype is aerially led, and the obvious naive product has twelve-year-olds heading a ball repeatedly. Several federations restrict or prohibit heading in training for younger age groups, and the specific rules differ by country and change over time.

**Build requirement:** `restrictions` is enforced by a per-territory config, not hardcoded. Default the whole aerial family to **non-heading variants** (jump timing, approach steps, body position, attacking the ball with hands) for any user under 12, and confirm current guidance with the player's own federation before launch in each market. Ship the config even in the prototype, even though the prototype has no users — because if it isn't in the schema now it will not be retrofitted later.

---

## 11. The readiness score — a definition

Right now "readiness" is a word. Without a definition it becomes a vanity number, and worse, a number a fifteen-year-old will interpret as *how good am I*. Define it narrowly and label it honestly.

### What it is
**Training readiness: how prepared you are right now.** Not talent. Not potential. Not a prediction. Not a medical measure.

### The formula (0–100, recalculated weekly)

| Component | Weight | Measure |
|-----------|--------|---------|
| **Consistency** | 40% | Sessions completed ÷ sessions planned, last 14 days. Planned rest counts as complete. |
| **Balance** | 25% | How evenly the five pillars were trained, last 28 days. Rewards working the edge, not just the strength. |
| **Recovery** | 20% | Three one-tap check-ins (sleep, soreness, energy), last 7 days. Missing check-ins reduce confidence, not score. |
| **Progression** | 15% | Personal bests and tier advances, last 28 days. |

```js
readiness = 0.40*consistency + 0.25*balance + 0.20*recovery + 0.15*progression
```

### Display rules
- One ring, four segments, always with the label: **"Training readiness — how prepared you are, not how good you are."**
- **Weekly cadence, not per-session.** A number that moves every time you open the app is a slot machine.
- No red states, no falling-number animations, no "declining" language. If readiness drops, the app shows the single action that raises it.
- Balance is the component to surface most: *"You've done 9 Duels sessions and 1 Ball session. Your edge is Ball."* That sentence is the entire value of the archetype system delivered in one line.

### What must never be built into this number
Anything about injury risk, career potential, or comparison to elite benchmarks. See §14.

---

## 12. The Rung 0 build — screens, states, and design direction

### 12.1 Screen list

| # | Screen | Contents | Done when |
|---|--------|----------|-----------|
| 1 | **Welcome** | One line of hook copy, the emblem, "Find your archetype", "12 questions · 4 minutes" | Renders on a 390px phone with no scroll |
| 2 | **Age & consent** | Date-of-birth entry; under-16 sees a guardian-consent step; plain-English one-screen summary of what's stored | Under-16 path cannot reach Q1 without the consent step |
| 3–14 | **Questions ×12** | One question per screen, 4 options as full-width tappable cards, chapter name as eyebrow, the Line as progress | Back button preserves the previous answer; no answer can be skipped |
| — | **Chapter interstitials ×3** | Chapter number, name, one line, 1.5s auto-advance with a skip | Appears before Q1, Q5, Q9 |
| 15 | **Anticipation beat** | 2.5s. The Line holds and thickens. No spinner, no percentage. | Cannot be skipped; feels like a held breath, not a load |
| 16 | **Reveal** | Colour floods from the Line → emblem → **name, big, first** → tagline or hybrid title → reflect-back | Name is legible for a full beat before anything else appears |
| 17 | **Result card** | Identity, strengths, exemplars, your edge, first step, the four-bar spread in mono | Fits one scroll on mobile |
| 18 | **Share card** | 1080×1350 view: emblem, name, one-line share copy, spread bars, wordmark | Screenshots cleanly with no UI chrome in frame |
| 19 | **Week 1 preview** | The three Week 1 sessions for this archetype, weeks 2–12 shown locked | Locked weeks are visible and named — the locked plan is the sales pitch |
| 20 | **Save your result** | Email capture (mock in v1) | Explains what happens next in one sentence |

### 12.2 State (all in React state — no storage APIs)

```js
{
  step: "welcome" | "consent" | "question" | "interstitial" | "reveal" | "result" | "share" | "plan",
  questionIndex: 0..11,
  answers: { q1: "q1a", ... },
  birthYear: number | null,
  guardianConsent: boolean,
  result: null | { primary, secondary, spread, dominance, isPure, hybridKey }
}
```

Do not use `localStorage` or `sessionStorage`. They are not supported in this environment and the artifact will fail. A refresh restarting the assessment is correct behaviour for a prototype.

### 12.3 Design direction

The brief already fixes the four archetype colours. The free axis is the shell — spend it deliberately.

**Concept: the last line.** The world of a centre back is a floodlit pitch at night, a chalk line, and a job that is invisible when it's done well.

**Palette** — the shell carries *no* accent colour at all.

| Token | Hex | Use |
|-------|-----|-----|
| `--pitch` | `#0B1014` | Base. Near-black with a green-blue cast — floodlit turf in shadow, not pure black. |
| `--surface` | `#121A20` | Cards, option tiles |
| `--line` | `#1E2A31` | Hairlines, dividers |
| `--chalk` | `#F2F4F1` | All type through the assessment |
| `--chalk-dim` | `#96A1A6` | Eyebrows, captions, the spread labels |
| *archetype* | per §3 | **Appears nowhere until the reveal** |

**The palette is the reward.** Twelve questions in chalk on dark, with zero colour anywhere. Then the reveal floods in crimson, cyan, gold or violet. This is the one place the design spends everything it has saved.

**Type** — three roles:
- **Display:** a wide or expanded grotesque, heavy weight, tight tracking, uppercase for archetype names — scoreboard authority. (Archivo Expanded / Archivo Black.)
- **Body:** a neutral, highly legible sans at 17px minimum — these are teenagers reading on a phone in a car park. (Inter Tight / IBM Plex Sans.)
- **Utility:** monospace, small, uppercase, wide tracking — for the spread, chapter numbers, and session counts. Mono makes the spread read as a *measurement* rather than a marketing figure. (IBM Plex Mono.)

**Signature: The Line.** One 1px chalk rule at a fixed height on every screen.
- On the welcome screen it is the horizon.
- During the assessment it is the progress bar, filling left to right, broken into three chapter segments.
- At the anticipation beat it thickens and holds.
- At the reveal it **breaks and floods** into the archetype colour, and the archetype name rises out of it.

One idea, executed on every screen. Everything else stays quiet.

**Quality floor:** responsive to 360px, visible keyboard focus rings, `prefers-reduced-motion` respected (the flood becomes a fade), tap targets ≥ 44px, contrast ≥ 4.5:1 for body text.

### 12.4 Copy rules
- British English in all player-facing copy (matching the existing cards: "favourite", "colour", "defence").
- Second person, present tense, a coach's voice: plain verbs, no jargon, no hype.
- The button that says "See your archetype" leads to a screen that says "Your archetype". Same word, whole journey.
- No exclamation marks in result copy. The reveal earns its weight by being certain, not loud.

---

## 13. The intelligence layer — Rung 2

Three separate ambitions, three very different levels of difficulty. Treat them separately.

### 13.1 Auto-classifier (achievable — but define the label first)

**The problem nobody names:** there is no ground truth for "archetype". No lab test returns *Sentinel*. It is a construct you invented, and a useful one — but a model cannot be "93% accurate" against a thing with no independent measurement.

So decide, in writing, what the model's label actually is. The honest options:

| Label choice | Ground truth source | Feasible? | What it's good for |
|--------------|--------------------|-----------|--------------------|
| Predict **self-reported** archetype from behaviour | The player's own quiz result | **Yes — start here** | Shortening the quiz, detecting drift, re-profiling without re-asking |
| Predict **coach-assigned** archetype | A coach labels the player | Yes, with recruitment effort | The most defensible commercial claim |
| Predict **"true"** archetype | Does not exist | No | Nothing. Do not claim this. |

**Data prerequisite:** ~10,000 completed profiles with ≥8 weeks of behaviour, plus a labelled subset with coach agreement. Measure inter-rater agreement between two coaches on the same player before you build anything — if two coaches disagree on the archetype, no model can do better than that ceiling, and knowing that number is worth more than a year of modelling.

**This is why Rung 0 matters:** the assessment is not just the funnel. It is the labelling machine that makes Rung 2 possible at all.

### 13.2 The living model — describe, don't prophesy

"Prophetic" is the wrong ambition and a real liability. Adolescent trajectory is dominated by maturation timing — two 14-year-olds with identical ability can be three years apart biologically — and youth-selection prediction has a long, well-documented record of getting this wrong. Telling a 14-year-old that a model projects a ceiling is both likely to be inaccurate and capable of doing genuine harm to a kid who was going to grow six inches.

**Reframe it, keep the ambition, lose the risk:**

| Don't ship | Ship instead |
|-----------|--------------|
| "Projected ceiling: Championship level" | "Here's what's changed in 12 weeks: Ball sessions up 4×, weaker foot accuracy 60% → 80%." |
| "Your trajectory is declining" | "You've trained Duels 9 times and Ball once. Your edge is Ball." |
| "You are 68% likely to make an academy" | "Players who kept this up for 8 weeks moved up a tier in that pillar." |

The living model becomes an engine for *the next best action*, not a prophecy. It is more useful, it is defensible, and it is the thing that actually retains a user. Keep any genuinely predictive output internal until it's validated against outcomes you have observed yourself.

### 13.3 Injury — flags, not predictions

Injury prediction is a health claim. In several markets it can attract medical-device or health-claim scrutiny, and individual-level injury prediction models in sport science generally perform poorly. **Do not ship a number that says a player is at X% risk of injury.**

What is defensible, useful, and safe:
- **Load awareness:** "That's six hard days in a row. Here's a lighter session."
- **Wellbeing check-ins:** three taps a day, shown as a trend to the player and, with consent, to a guardian or coach.
- **Return-to-play education:** general information plus a clear instruction to follow the guidance of a qualified clinician.
- **Escalation copy:** persistent pain routes to "speak to a physio or doctor" — never to a training modification generated by the app.

I'm not a lawyer and this isn't legal advice — but this specific line, health claims about minors, is one to put in front of a real regulatory lawyer before launch, not after.

### 13.4 Infrastructure — the honest version
At Rung 1 you need: auth, a database, object storage for video, and a CDN. That is a weekend of setup on a managed stack (Supabase or similar behind a Next.js app on Vercel — both of which you already have connected). Multi-cloud, federated learning and quantum simulation are Rung 3+ vocabulary, and putting them in a Rung 1 plan will cost you credibility with the first technical person who reads it. Build the smallest thing that stores a player's plan and their progress.

---

## 14. Safeguarding, data, and claims

This section is the one that protects everything else. A player app for minors gets judged on these before it gets judged on its archetypes.

### 14.1 Minors — build these in at Rung 0
- **Age gate before Q1.** Date of birth, not a checkbox.
- **Guardian consent flow for under-16s** (the threshold varies by country — 13 to 16 — so make it a per-territory config, not a constant).
- **The guardian owns the media.** Any video uploaded by a minor belongs to the guardian account: they can view, revoke, and delete it.
- **Nothing public by default.** No public profiles, no discoverable usernames, no player-to-player messaging in v1. The share card shares an *archetype*, not a child.
- **Strip EXIF and location** from every upload. No facial recognition, ever.
- **Retention limits with an actual delete.** "Delete my account" deletes the video, not just the row.

### 14.2 The consent language decides whether Rung 2 is possible
If the consent a 14-year-old's parent signs in month one doesn't cover *"using this video to improve and train our models"*, then in year three you will have a large, valuable, legally unusable dataset. Write that clause now, in plain language, with a genuine opt-out that doesn't degrade the product. This costs one paragraph today and is unfixable retroactively.

### 14.3 Body image — a hard line
The codex contains bodyweight-scaled macro prescriptions and body-composition assessment. Appropriate for a supervised professional. **Not appropriate in a consumer app used by teenagers.**

**Never in the player app for under-18s:** calorie targets, weight goals, body-fat percentage, "ideal" body composition, before/after body photos, or any comparison of a player's body to an elite benchmark.
**Instead:** general fuelling and sleep education, and "talk to a qualified professional" for anything individual. This is not over-caution — sports apps that give teenagers body-composition targets are a well-recognised risk vector, and the reputational and human cost of getting it wrong is not recoverable.

### 14.4 The claims register

Some figures in the codex will not survive a technically literate reader, and that matters because they sit next to work that is genuinely good. Two specific ones:

| Claim | Problem | Suggested fix |
|-------|---------|---------------|
| **"340 femtosecond anticipation window"** | A femtosecond is 10⁻¹⁵ s — the timescale of molecular vibration. Human neural processing runs on milliseconds, ten orders of magnitude slower. As stated, this is physically impossible, and any sports scientist will stop reading there. | **Change the unit, keep the insight: "the 340-millisecond anticipation window."** That is plausible, matches the real expertise literature on anticipating from pre-movement cues, and is a genuinely strong, ownable idea. |
| **"Partnership quantum entanglement"** | Entanglement is a property of isolated quantum systems; it does not apply to two humans on a pitch. | Keep it as an explicitly-labelled **metaphor**, or rename to **"partnership synchrony."** The underlying observation — pairs who play together develop shared anticipation — is real and well-studied as joint action and shared mental models. |

**And a process, not just two fixes.** Keep one table:

| Claim | Where it's used | Source | Status |
|-------|-----------------|--------|--------|
| 93% archetype accuracy | Deck, app | — | ❌ unsourced — remove from external material |
| 81% injury reduction | Deck | — | ❌ unsourced |
| 43% performance amplification | Deck | — | ❌ unsourced |
| €25–63M value per CB | Deck | — | ⚠️ model output — label it a projection |

**Rule: no number appears in player-facing or investor-facing material without a row in this table.** Internally, keep them as hypotheses — they're fine as things you intend to prove. The strongest version of this project is one where the framework is compelling *and* every number behind it is real, because then nobody has a reason to discount the framework.

---

## 15. GVU, ATLAS, and the hubs — where they actually sit

All three are Rung 3+. That doesn't mean ignore them; it means find the version of each that can exist *now*, generate revenue or evidence, and become the seed.

| Ambition | The version you can't build yet | **The version you can build in 2026** | Why it works now |
|----------|--------------------------------|----------------------------------|------------------|
| **GVU** — academic colleges, accreditation | A university | **The Elite CB Certification** — 60 hours, 7 modules, already outlined in the codex. Sell it to coaches. | Sells to adults with budgets, needs no accreditation, and produces your first cohort of instructors, your first curriculum, and your first proof that the methodology teaches. Every real institution started as one course. |
| **ATLAS** — AI tutor | An AI tutor for minors | **A retrieval-grounded Q&A over the codex documents you already own** (740KB+ across 16 documents), for coaches, not children first. | The corpus already exists. Grounded retrieval over your own documents is buildable in weeks and is the honest version of an AI tutor — it answers from your methodology instead of improvising. Adults first means you learn the failure modes before a 13-year-old asks it about a knee injury. |
| **Physical hubs** | Global centres | **One partner club or academy running the 12-week plan with 20 players** | Produces the only thing you cannot buy: evidence, on real players, with names attached. This is the asset every later rung is priced on. |

**ATLAS guardrails, whenever it ships:** never medical advice, never nutrition prescriptions to minors, never body-composition guidance to minors, always cites which codex document an answer came from, and always escalates pain, injury and mental-health topics to a human. An AI tutor that says "I don't know — ask your physio" is more valuable than one that always answers.

---

## 16. Risk register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Result doesn't feel accurate → no shares → no funnel | Medium | **Fatal** | The 20-player gate at §1. Test before building anything on top. |
| Scope creep from Rung 0 into Rung 2 | **High** | High | The ladder. Nothing above Rung 1 gets a line of code until its gate passes. |
| Minors' data / consent handled late | Medium | **Fatal** | §14.1–14.2, built at Rung 0. |
| Unsourced claims discredit strong work | **High** | High | §14.4 claims register before any external material goes out. |
| Injury/trajectory prediction attracts regulatory attention | Medium | High | §13.2–13.3. Flags, never predictions. Lawyer before launch. |
| Content typed into components → positions 3–7 each cost a rebuild | **High** | High | §4 position pack. This is decided in the first hour of the build. |
| Building alone at this scale stalls | Medium | High | Rung 0 is genuinely solo-buildable. Rung 1 is not — plan for one developer at that gate. |
| Seven positions half-finished instead of one finished | Medium | High | Finish CB end-to-end through Rung 1 before starting position 3. |

---

## 17. Open decisions — yours to make

1. **Pure/hybrid threshold.** Start at 12 points, tune to 55–70% pure after 100 completions. Do you want it more decisive (fewer hybrids) or more nuanced?
2. **Tiebreak rarity order.** Currently resolves toward the rarest archetype. Accept, or resolve toward the most common?
3. **Is the free result the whole result, or the top half?** This determines the business model more than pricing does.
4. **Who pays — player, parent, or club?** Changes the app, not just the checkout.
5. **Age floor.** 13 is the pragmatic minimum for a self-report app. Below that you're building a parent/coach product.
6. **Where the Week 2–12 wall sits** — email, account, or payment.
7. **Which single position after CB?** Goalkeeper is done, CB is in progress. Position 3 should be the one with the biggest audience, not the one with the best documents.
8. **The name.** "The Footballer's Academy", "Position-DNA", "CB-DNA" and "Center Back Codex" are all in play across your documents. Pick one for the player-facing product before the share card ships — every share carries the wordmark.

---

## 18. Build order — the next five days

**Day 1 — content, not code.**
Write `cbPack.js` completely: 4 archetypes, 12 questions, 12 hybrids, 5 pillars, 12 Week-1 challenges. No components. When this file is right, the app is mostly done.

**Day 2 — the engine.**
`score()` from §6, plus the five invariant assertions from §4. Test it by hand with three answer sets: one obviously Colossus, one obviously split, one deliberately contradictory. Check the third one still returns something that reads as sane.

**Day 3 — the flow, ugly.**
Welcome → consent → 12 questions → result, in plain unstyled HTML. No animation, no colour. Prove the flow works before making it beautiful. Most first-time builders do this in the opposite order and then can't change anything.

**Day 4 — the reveal.**
The Line, the anticipation beat, the colour flood, the type. This is the day that decides whether the product works. Spend it all here.

**Day 5 — share card, Week 1 preview, and send it to five real players.**
Not five friends who'll be nice about it. Five centre backs aged 13–18. Watch their faces at the reveal — you'll know within two seconds whether it landed.

---

## Appendix A — v1.0 wording of the three changed items

Preserved so nothing is lost, and so you can A/B the originals if you disagree with the changes.

**Q1 D (original):** "Show him one way and win it cleanly. *(Architect)*"

**Q5 (original):** "You've got the ball at the back with time. You most want to…"
- A) Step forward and drive a line-breaking pass in. *(Architect)*
- B) Keep it simple and safe — recycle to a full-back. *(Colossus)*
- C) Carry it forward into midfield myself. *(Libero)*
- D) Play the calm pass that keeps our shape intact. *(Sentinel)*

**Q7 (original):** "Your manager wants centre-backs to start attacks. That's…"
- A) Exactly my game — I love being the first passer. *(Architect)*
- B) Fine, but my job is defending first and foremost. *(Colossus)*
- C) Great — I'll step into midfield and create an overload. *(Libero)*
- D) Good — I'll pick the smart, low-risk progressive pass. *(Sentinel)*

**Chapter 2 (original name):** "Your Build-Up"

---

## Appendix B — acceptance checklist for the Rung 0 build

**Content**
- [ ] 12 questions, 4 options each, each archetype mapped exactly once per question
- [ ] All 12 ordered hybrid pairs have a title and a line
- [ ] All 4 result cards complete; 12 Week-1 challenges written with countable success criteria
- [ ] No player-facing string typed inside a component

**Engine**
- [ ] Chapter 3 weighted 1.5; shares sum to exactly 100
- [ ] Same answers always produce the same result
- [ ] Tiebreak cascade runs in order and never returns a tie
- [ ] `dominance` computed; pure/hybrid branch renders correctly

**Experience**
- [ ] No colour anywhere before the reveal
- [ ] Archetype name is the first and largest thing on the reveal
- [ ] Anticipation beat holds ~2.5s with no spinner
- [ ] The Line is present on every screen and behaves as specified
- [ ] Back button preserves answers

**Safeguarding**
- [ ] Age gate before Q1; under-16 guardian step cannot be bypassed
- [ ] Plain-English data summary on the consent screen
- [ ] No body-composition, weight or calorie content anywhere
- [ ] Heading restrictions present in the challenge schema

**Quality floor**
- [ ] Works at 360px; tap targets ≥ 44px; body text ≥ 4.5:1 contrast
- [ ] Visible keyboard focus; `prefers-reduced-motion` honoured
- [ ] No `localStorage` / `sessionStorage` anywhere

---

## Appendix C — paste-ready brief for Claude Design

> Build a mobile-first web prototype: a football archetype assessment for centre backs, called **The Footballer's Academy**.
>
> **Flow:** Welcome → age/consent gate → 12 questions (one per screen, 3 chapters of 4, with a chapter interstitial before each) → a 2.5-second anticipation beat → a cinematic reveal → result card → share card → a preview of Week 1 of the development plan with weeks 2–12 locked.
>
> **Architecture:** put ALL content — archetypes, questions, options, hybrid copy, challenges, colours — in a single exported object called `cbPack` in its own file. No player-facing text inside any component. State lives in React `useState`. Do not use localStorage or sessionStorage.
>
> **Scoring:** each option maps to one of four archetypes (Colossus, Architect, Sentinel, Libero). Chapter 1 and 2 answers score 1.0, Chapter 3 answers score 1.5, total 14. Convert to whole-number percentages summing to 100. Highest = primary, second = secondary. If `primary% − secondary% >= 12`, show the pure archetype; otherwise show the hybrid variant. Break ties by: higher Chapter 3 subtotal, then the Q11 answer, then the Q9 answer, then this fixed order — Libero, Architect, Colossus, Sentinel.
>
> **Design:** base `#0B1014` (near-black with a green-blue cast), surfaces `#121A20`, hairlines `#1E2A31`, type `#F2F4F1`, dim `#96A1A6`. **No accent colour appears anywhere until the reveal** — the whole assessment is chalk on dark. The archetype colours are Colossus `#C8102E`, Architect `#00E5FF`, Sentinel `#E8B33A`, Libero `#8B5CF6`.
>
> Type: a heavy expanded grotesque for archetype names (uppercase, tight tracking), a neutral sans at 17px+ for body, and a monospace for percentages and chapter numbers.
>
> **Signature element — "The Line":** a 1px chalk rule at a fixed height on every screen. On the welcome screen it's a horizon. During the assessment it's the progress bar, filling left to right in three chapter segments. At the anticipation beat it thickens and holds. At the reveal it breaks and floods into the archetype colour, and the archetype name rises out of it. This is the one memorable device — keep everything else quiet.
>
> **On the reveal, the archetype name appears first, big, and alone for a full beat** before the tagline, emblem and details unfold. Never lead with a percentage.
>
> Responsive to 360px, tap targets 44px minimum, visible keyboard focus, and honour `prefers-reduced-motion` by replacing the flood with a fade.

---

*The Footballer's Academy · Center Back Module · Handoff v2.0 · Position 2 of 7*
