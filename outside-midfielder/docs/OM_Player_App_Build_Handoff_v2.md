# The Footballer's Academy — Outside Midfielder Player App
### Build Handoff · **v2.0** (supersedes v1.0)

**Position code:** `OM` · **Picker label:** *Left / Right Midfield (LM, RM)*
**Source of truth for content:** The Outside Midfielder Archetype Catalog v1.0 (roster-locked)
**This document adds:** a buildable scoring engine, deterministic reveal rules, the reveal → development-plan bridge, and a phased build order for Claude Design.

---

## 0. Read this first — what changed from v1.0 and why

v1.0 was an excellent *narrative* document. It was not yet a *buildable* one. Everything that made v1.0 good is preserved verbatim below (the questions, the result cards, the Engine-problem framing, the two deliberate deviations). What follows is a list of the gaps v2.0 closes, so you can see the diff.

| # | v1.0 problem | v2.0 fix | Where |
|---|---|---|---|
| 1 | **Scoring had an unexamined bias.** Each archetype appears in a different number of questions (Engine 11, Weaver/Deliverer 10, Sentinel 9, Renegade 8), so a *pure* Renegade could score at most 8/12 while a pure Engine scores 11/12. The reveal would systematically make rarer archetypes look "less pure." | **Normalised scoring** (take-rate per archetype, then rescaled to a spread) so all five bars are comparable. Full formula + runnable code + worked example. | §6 |
| 2 | **Ties and hybrids were undefined.** "tie = hybrid" with no rule for *how* a hybrid is chosen or displayed, and no rule for when a secondary is shown vs. suppressed. With 12 answers across 5 archetypes, near-ties are common. | **Deterministic reveal bands** (hybrid / primary+secondary / primary-only) based on the secondary-to-primary ratio, plus an explicit tiebreak chain. | §6.4 |
| 3 | **The reveal→development bridge was missing.** v1.0 specced a *quiz*. The product is a *development app*. Nothing connected "you are The Engine" to the weeks of tracking that follow. | **A development-plan model** (spine + challenges + readiness) keyed off the archetype, with a clear Phase 1 / Phase 2 line. | §9 |
| 4 | **A leaf document was rewriting the whole system.** v1.0 proposed system-wide taxonomy changes (recolour the Full Back Sentinel everywhere, add a tenth temperament) from inside one position's handoff. | **Separated** "what this module needs to render" (decided, local) from "proposals to escalate to Module 0" (flagged, non-blocking). | §11 |
| 5 | **The counts don't reconcile.** v1.0 says the AM/Winger split "already took it 31 → 36" — the same numbers the catalog attributes to the OM addition — then claims 41. Both can't be right. | **Flagged as unresolved**, placeholder set, and shown to be **non-blocking** because IDs are position-scoped. Must be reconciled in Module 0 before any cross-position work. | §11.1 |
| 6 | **Colour did too much work.** Identity leaned on hues (orange/gold/emerald) that are hard to separate for colour-blind users on a dark canvas — v1.0 even notes bronze reads too close to gold. | **Accessibility rule:** name + emblem always travel with colour; nothing relies on colour alone. | §4.1 |

> **A note on the Formation Dependency Module.** It's genuinely clever IP and you should build it — later. One caution to carry forward: its "validation" (the model reproducing hand-scored fits of 74-vs-75 and 66-vs-65) is not external validation. That model has ~13 free parameters and the build plan is to *fit those parameters to the hand-scores*. A many-knobbed model reproducing the numbers it was tuned on is curve-fitting, not proof it predicts anything new. The arithmetic is correct; the interpretation is the trap. This matters for a much later phase — noted here only so the lesson isn't lost. **It has no bearing on the app you're about to build.**

---

## 1. Scope — what you build in Claude Design *now*, and what waits

This is the most important section for you as a first-time builder, because the single biggest risk isn't the code — it's building the wrong thing first. Your full vision (player app, virtual university, auto-classifier AI, trajectory/injury prediction, physical hubs) is a dozen ventures. They have a **forced order**, not an optional one:

- Trajectory prediction and injury prediction are not features — they are research problems that need *thousands of players tracked over years*. That data doesn't exist yet.
- The only thing that generates that data is **the player app having real users.**
- Therefore the player app isn't one item on the list. It's the keystone the whole pyramid stands on.

So "build the player app first" isn't scaling back the ambition. It *is* the ambition's dependency order.

And within the player app, there's a further order:

| Phase | What it is | Build where | Needs a backend? |
|---|---|---|---|
| **1 — The Reveal** | Welcome → position confirm → 12-question assessment → cinematic reveal → result card → the first development step → share card | **Claude Design (now)** | **No** — single-session, in-memory |
| **2 — The Plan** | Persisted results, retakes, the full multi-week development plan, challenge logging, a progress/readiness indicator | App with storage + accounts | Yes |
| **3 — The Intelligence** | AI auto-classifier (video → archetype), the Formation Dependency engine, migration ("your team switched to a 4-3-3, here's where you go") | Cloud infra + ML | Yes |
| **4 — The Institution** | GVU, ATLAS tutor, physical hubs, the prophetic/living-model layer, injury prediction | Everything above + years of data | Yes |

**Phase 1 is the entire focus of this handoff.** It is also, not coincidentally, the exact thing v1.0 calls "the product" and the exact thing Claude Design is best at: a polished, emotional, self-contained interactive flow with no backend.

**Build Phase 1 as stateless.** No accounts, no saved progress, no video upload in the first pass. The assessment, reveal, result card, and first step all work within a single session using in-memory state. This sidesteps every storage question and matches what Design does well. Persistence is the *first* thing Phase 2 adds — see §10 for how to shape the result object *now* so Phase 2 isn't blocked later.

---

## 2. The five archetypes (content — unchanged from catalog)

| Archetype | ID | Identity | Signature strengths | Distribution |
|-----------|-----|----------|---------------------|--------------|
| **The Engine** | `OM-001` | The Flank Workhorse | Two-phase endurance, positional discipline, total reliability | 30% |
| **The Weaver** | `OM-004` | The Half-Space Connector | First touch, press resistance, combination play | 22% |
| **The Deliverer** | `OM-002` | The Touchline Craftsman | Elite crossing, set pieces, switch of play | 20% |
| **The Sentinel** | `OM-003` | The Flank Guardian | 1v1 defending, anticipation, compactness | 16% |
| **The Renegade** | `OM-005` | The Caged Flair Player | Dribbling, take-ons, acceleration — the highest ceiling | 12% |

**The distribution is the position's story:** half the position is Engine or Sentinel; the flair player is the exception — the inverse of the Winger. The assessment's tone should feel this: this is a job for a worker, and the reveal should honour that rather than apologise for it.

---

## 3. The assessment — 12 questions, 4 chapters (content — unchanged from v1.0)

The questions are strong and are preserved exactly. Each option scores the bracketed archetype; the player never sees the bracket. **Store the questions as data** (see §10) — do not hardcode them into the UI — so the scorer can compute everything from the same source.

### Chapter I — *The Lane*

**Q1. Your team has the ball on the far side. Where are you?**
- A) Holding my width, ready for the switch. *(Deliverer)*
- B) Drifting inside into the half-space to link the play. *(Weaver)*
- C) Tucked in, keeping the bank of four compact. *(Sentinel)*
- D) Wherever the ball's about to be — I'll get there either way. *(Engine)*

**Q2. Your full-back overlaps outside you. You…**
- A) Come inside and let him have the touchline. *(Weaver)*
- B) Stay wide — that's my crossing angle, and I'm not giving it up. *(Deliverer)*
- C) Keep going myself. I'll take my man on. *(Renegade)*
- D) Read it and take whichever job the move needs. *(Engine)*

**Q3. Ninety minutes on the flank. What's the job?**
- A) Own the whole lane — both ends of it, all game. *(Engine)*
- B) Get into position and put balls into their box. *(Deliverer)*
- C) Make sure nothing comes down my side. Full stop. *(Sentinel)*
- D) Come inside, combine, and make us tick. *(Weaver)*

### Chapter II — *The Duel*

**Q4. Their winger runs at you with the ball. You…**
- A) Lock him down. Nothing gets past me here. *(Sentinel)*
- B) Show him inside and win it back through sheer persistence. *(Engine)*
- C) Delay him and let our shape recover. *(Weaver)*
- D) Win it back so I can go the other way and hurt them. *(Renegade)*

**Q5. You've got their full-back one-on-one in their half. You…**
- A) Take him on. I'll beat him. *(Renegade)*
- B) I don't need to. One yard, and the ball's already gone. *(Deliverer)*
- C) Draw him in, then slip it inside and combine. *(Weaver)*
- D) Beat him if it's on, cross if it isn't — whatever works. *(Engine)*

**Q6. They're doubling up on your flank — full-back and winger, two on one. You…**
- A) Fight it. I'll run both of them into the ground. *(Engine)*
- B) Hold the line and force them backwards. *(Sentinel)*
- C) Drop inside so they can't isolate me. *(Weaver)*
- D) Get my body between them and get the cross away anyway. *(Deliverer)*

### Chapter III — *The Ball*

**Q7. You're in the final third, ball at your feet. The instinct?**
- A) Hit the cross — I've already seen the striker's run. *(Deliverer)*
- B) Take him on. *(Renegade)*
- C) One-two with the striker and get in behind. *(Weaver)*
- D) Whatever the move needs. I'm not precious about it. *(Engine)*

**Q8. The compliment that would mean the most:**
- A) "That ball was unplayable — you set up three today." *(Deliverer)*
- B) "You ran that flank into the ground. Both ends." *(Engine)*
- C) "Their winger didn't touch it. You killed his game." *(Sentinel)*
- D) "Everything we did went through you and the full-back." *(Weaver)*

**Q9. Free kick on the edge of their box. Who's standing over it?**
- A) Me. Always me. *(Deliverer)*
- B) Me — I'll bend one in or beat the wall myself. *(Renegade)*
- C) Not me. I'll make the run into the box. *(Weaver)*
- D) Not me. I'll drop and cover the counter. *(Sentinel)*

### Chapter IV — *The Eightieth Minute*
*The archetype-separating chapter. Every question is about what you do when there's nothing left. This chapter deliberately over-weights Engine, Sentinel, and Renegade — the three archetypes fatigue actually separates. Preserve that if you edit.*

**Q10. Eightieth minute. You're empty. Their full-back breaks past you down the line. You…**
- A) Run. I always run. Every time, whatever's left. *(Engine)*
- B) Jockey and force him back — I don't need to sprint to stop him. *(Sentinel)*
- C) Let him go, and save what's left to hurt them at the other end. *(Renegade)*
- D) Track him as far as I can, but I'm saving my legs for the next delivery. *(Deliverer)*

**Q11. Eightieth minute, 0–0. Your legs are gone. Your team wins the ball. You…**
- A) Sprint the length of the flank anyway. I get in that box. *(Engine)*
- B) Find one clever short pass and let others do the running. *(Weaver)*
- C) Stay disciplined. We're 0–0. Don't get caught out. *(Sentinel)*
- D) One moment is all I need. Give it to me and I'll win it. *(Renegade)*

**Q12. Eightieth minute. What does your manager trust you to do?**
- A) Keep running. He never has to look at me. *(Engine)*
- B) Hold the flank shut and see the game out. *(Sentinel)*
- C) Produce one ball that wins it. *(Deliverer)*
- D) Produce one moment of magic that wins it. *(Renegade)*

---

## 4. Visual system

| Archetype | Colour (module-local) | Temperament | Emblem |
|-----------|--------|-------------|--------|
| The Engine | **Orange** | Engine — relentless | The unbroken circuit |
| The Weaver | **Electric cyan** | Construction | The woven thread |
| The Deliverer | **Emerald** | Precision / Craft | The drawn bow |
| The Sentinel | **Deep gold** | Defensive Intelligence | The closed gate |
| The Renegade | **Magenta** | Flair | The flame inside a frame |

*(These colours are what this module renders with. Whether they become system-wide — and whether "Precision/Craft" becomes a real tenth temperament — is a Module 0 decision, escalated in §11. The build does not wait on that.)*

### 4.1 Accessibility rule (new — treat as a hard requirement)

Orange, gold, and emerald are genuinely hard to separate for colour-blind users on a dark canvas. So:

> **No piece of the reveal may depend on colour alone to tell the player which archetype they got.** The archetype **name** and its **emblem** always appear together with the colour. The five emblems are deliberately distinct *shapes* (circuit / thread / bow / gate / framed flame) — lean on shape, not just hue. On the spread bar, label each segment with its archetype name or emblem, not colour swatches alone.

This costs nothing and it's far cheaper to bake in now than to retrofit.

---

## 5. The reveal flow (spec for Claude Design)

The flow, in order. Each arrow is a screen/state.

```
Welcome
   → Position confirm ("Left / Right Midfield")
   → Assessment  (12 questions, grouped into 4 chapters,
                  each chapter opens with a title card)
   → Anticipation beat  (a held moment — the pause before the name)
   → Reveal  (archetype NAME first, big, in its colour + emblem;
              then details unfold beneath it)
   → Result card  (identity, reflect-back, strengths, exemplars, spread bar)
   → First development step  (the one concrete action for this week)
   → Share card
```

Design principles carried from v1.0, still binding:

- **The reveal is the product.** Every screen serves felt accuracy, emotional payoff, and shareability.
- **Name first, name big.** On the reveal, the archetype name lands *before* any explanation, in its colour, with its emblem. The explanation unfolds after.
- **The Engine reveal must be the most confident in the position** — big, orange, unapologetic. See §8. If the Engine reveal feels like a consolation prize, the whole module fails. Build and test the Engine reveal *first*.
- **Chapter title cards** mark the four acts. Chapter IV ("The Eightieth Minute") is the emotional peak of the assessment — the questions get quieter and heavier. Let the design reflect that.

State you need to hold during a session (all in-memory for Phase 1): the current question index, the answer chosen per question, and — once computed — the full result object (§10). Nothing is saved between sessions in Phase 1.

---

## 6. The scoring engine (respecified — this is the core v2.0 change)

### 6.1 Why v1.0's scoring is biased

Because 12 questions × 4 options = **48 option-slots**, and 48 ÷ 5 archetypes = **9.6** — not a whole number — you *cannot* give all five archetypes the same number of options. Someone always gets fewer. v1.0's allocation is:

| Archetype | Options (chances to be picked) | Omitted from |
|-----------|---------|--------------|
| The Engine | 11 | Q9 |
| The Weaver | 10 | Q10, Q12 |
| The Deliverer | 10 | Q4, Q11 |
| The Sentinel | 9 | Q2, Q5, Q7 |
| The Renegade | 8 | Q1, Q3, Q6, Q8 |

Now the consequence. Under naïve scoring (count picks, divide by 12), a player whose personality is *pure Renegade* — who picks the Renegade option **every single time it's offered** — still maxes out at **8/12 = 67%**, because four questions never offer it and force him onto something else. A pure Engine reaches **11/12 = 92%**. So a Renegade reveal *always* looks less pure than an Engine reveal, even for a maximally-Renegade kid. For a product whose entire value is felt accuracy, that's a real defect.

**The fix is not to fix the questions.** Weighting options toward the common archetypes (more Engine options because Engine is common) is a legitimate *airtime* choice and you can keep it. Fix the bias in the **scoring** instead, by measuring each archetype as a *take-rate*: of the times you *could* have picked it, how often did you?

### 6.2 The model, in plain English

1. **Count picks** per archetype.
2. **Count opportunities** per archetype — how many questions offered it (11 / 10 / 10 / 9 / 8). *Compute this from the question data, don't hardcode it* — then if you ever edit a question, the scorer stays correct automatically.
3. **Take-rate** = picks ÷ opportunities. A pure Engine and a pure Renegade both score **1.0** — the ceiling is now the same for everyone.
4. **Spread** = rescale the five take-rates so they sum to 100%. This is what the bar shows.
5. **Rank**, then apply the reveal bands (§6.4).

### 6.3 The code (drop-in for Design, and later for real)

```javascript
const ARCHETYPES = ['OM-001','OM-002','OM-003','OM-004','OM-005'];
const DISTRIBUTION = { 'OM-001':30, 'OM-002':20, 'OM-003':16, 'OM-004':22, 'OM-005':12 };

// QUESTIONS: [{ id, chapter, options: [{ label, archetypeId }, ...] }, ...]
// answers:   { q1: 'OM-001', q2: 'OM-004', ... }  // the archetypeId picked per question

function scoreAssessment(questions, answers) {
  const picks         = Object.fromEntries(ARCHETYPES.map(a => [a, 0]));
  const opportunities = Object.fromEntries(ARCHETYPES.map(a => [a, 0]));

  for (const q of questions) {
    // opportunities: this question offers each archetype at most once
    for (const a of new Set(q.options.map(o => o.archetypeId))) opportunities[a] += 1;
    // picks
    const chosen = answers[q.id];
    if (chosen) picks[chosen] += 1;
  }

  const takeRate = {};
  for (const a of ARCHETYPES) {
    takeRate[a] = opportunities[a] > 0 ? picks[a] / opportunities[a] : 0;
  }

  const totalRate = ARCHETYPES.reduce((s, a) => s + takeRate[a], 0);
  const spread = {};
  for (const a of ARCHETYPES) {
    spread[a] = totalRate > 0 ? (takeRate[a] / totalRate) * 100 : 0;
  }

  const ranked = [...ARCHETYPES].sort((a, b) => {
    if (spread[b] !== spread[a]) return spread[b] - spread[a];   // 1. higher spread
    if (picks[b]  !== picks[a])  return picks[b]  - picks[a];    // 2. more raw picks
    return DISTRIBUTION[a] - DISTRIBUTION[b];                    // 3. rarer archetype wins
  });

  const primary   = ranked[0];
  const secondary = ranked[1];
  const ratio     = spread[primary] > 0 ? spread[secondary] / spread[primary] : 0;

  let revealType;
  if      (ratio >= 0.85) revealType = 'hybrid';                 // two names, two emblems
  else if (ratio >= 0.50) revealType = 'primary_with_secondary'; // hero + "strong X tendencies"
  else                    revealType = 'primary_only';           // one hero; bar still shown

  return { picks, opportunities, takeRate, spread, ranked, primary, secondary, ratio, revealType };
}
```

### 6.4 The reveal bands (this is the tie/hybrid/secondary rule)

The old "tie = hybrid" was undefined. Here is the deterministic replacement, using the ratio `r = secondary ÷ primary`:

| Band | Condition | What the reveal shows |
|---|---|---|
| **Hybrid** | `r ≥ 0.85` | Two archetypes, both names, both emblems, both colours. "You're an Engine-Weaver." |
| **Primary + secondary** | `0.50 ≤ r < 0.85` | One hero archetype, secondary named beneath: "…with strong Weaver tendencies." |
| **Primary only** | `r < 0.50` | One hero archetype. Secondary is not named (it's noise), but the full five-bar spread is still shown for transparency. |

Why a **ratio**, not a percentage-point gap: after normalisation the percentages shift around, so an absolute gap ("within 5 points") is fragile. The ratio is stable and reads naturally — "the second archetype is 85% as strong as the first" is exactly the intuition you want.

**Tiebreak chain** (already in the code, spelled out): higher spread → if exactly equal, more raw picks → if still equal, the **rarer** archetype wins (lower distribution %). The last rule is a deliberate UX choice: on a genuine coin-flip, the rarer, more distinctive reveal is the better and no-less-accurate one.

### 6.5 Worked example (verify your build against this)

Say a player's picks land as: **Engine 5, Weaver 3, Deliverer 2, Sentinel 1, Renegade 1** (sums to 12).

**Naïve (÷12):** Engine 41.7, Weaver 25.0, Deliverer 16.7, Sentinel 8.3, Renegade 8.3. *(Sentinel and Renegade tie.)*

**Normalised:** take-rates are 5/11, 3/10, 2/10, 1/9, 1/8 = 0.4545, 0.300, 0.200, 0.1111, 0.1250; they sum to 1.1906; rescaled:

| Archetype | Spread |
|---|---|
| Engine | **38.2%** |
| Weaver | **25.2%** |
| Deliverer | **16.8%** |
| **Renegade** | **10.5%** |
| Sentinel | **9.3%** |

Two things to notice, both correct: Engine drops (41.7 → 38.2) and Renegade rises above Sentinel. Under naïve scoring they were tied at 8.3%; normalisation breaks the tie *in the Renegade's favour*, because **one Renegade pick out of 8 chances is a stronger signal than one Sentinel pick out of 9.** That is the fairness property working. Here `r = 25.2 / 38.2 = 0.66` → **Primary + secondary**: "The Engine, with strong Weaver tendencies."

### 6.6 What normalisation does and doesn't fix (be honest about this)

It fully removes the *denominator* bias: everyone's ceiling is now 1.0. It does **not** fully erase the structural floor for rare archetypes, because a pure-Renegade player is still *forced* onto other options in his four Renegade-less questions, and those picks genuinely accrue to other archetypes. A pure Renegade ends up around **72% Renegade** rather than the naïve **67%** — better, primary is safe, but not 100%. The only way to erase it completely would be equal option counts, which is arithmetically impossible (48 ÷ 5). Normalisation is the best available fix, and it materially improves every rare-archetype reveal. Ship it, and understand its limit.

*(Nice emergent property: a near-*flat* spread tends to resolve toward the Engine anyway, because the "whatever the move needs" option is an Engine option in most questions — so the genuinely versatile player accumulates Engine picks. A flat spread *is* basically the Engine. You don't need a special "utility" result in Phase 1.)*

---

## 7. Result cards (content — unchanged from v1.0)

Rendered on the result screen after the reveal. Each card's fields map to the data model in §10.

---

#### ⚽ THE ENGINE — *The Flank Workhorse* · orange
**Reflect-back:** "You don't need the credit. You need the flank to hold — and it holds because you're still running when everyone else has stopped."
**This is you:** You own the entire lane. You track their full-back to your own corner flag and arrive in their box four seconds later. You are not the best crosser or the best dribbler — you are **the one the manager never has to worry about**, and that is the rarest currency in football. Fans forget your name. Managers build teams around you. **You win things.**
**Strengths:** Elite two-phase endurance · Positional discipline · Total reliability
**You play like:** Park Ji-sung, James Milner, Dirk Kuyt
**Your edge:** One standout weapon — a delivery or a duel you're genuinely elite at — so you're not only trusted, but decisive.
**First step this week:** Next game, track *every* opposition run down your flank **and** get into their box on *every* attack. Count both numbers. Nobody else in your team will do both.
**Share:** "I'm The Engine ⚽ — I own the whole flank. Both ends. Which outside midfielder are you?"

---

#### ⚽ THE DELIVERER — *The Touchline Craftsman* · emerald
**Reflect-back:** "You don't need to beat him. You need one yard — and one yard is always there."
**This is you:** The craftsman. You don't go past defenders, you go *around* the problem. Hug the touchline, manufacture half a yard, and put the ball on a striker's head from forty metres. Your weapon isn't your body — it's the flight of the ball. **And it doesn't age.**
**Strengths:** Elite crossing & set-piece delivery · Elite switch of play · Reading the striker's run before he commits
**You play like:** David Beckham, Ashley Young, Dwight McNeil
**Your edge:** The 1v1 — solving it and defending it — so a system can't neutralise you simply by denying you space.
**First step this week:** Take 50 crosses from your exact match position, to a target. Then in your next game, count how many of your deliveries actually reached the danger zone. That number, not the assists, is your scorecard.
**Share:** "I'm The Deliverer ⚽ — I don't beat you, I go around you. Which outside midfielder are you?"

---

#### ⚽ THE SENTINEL — *The Flank Guardian* · deep gold
**Reflect-back:** "Nothing comes down your side. That's the whole job — and you're genuinely at peace with that."
**This is you:** The flank guardian. You're not out there to cross. You're out there to make sure their best attacker has a miserable ninety minutes. Your stat line looks like nothing — **and *their* stat line is the reason why.** You're the only player on the pitch measured by what *didn't* happen.
**Strengths:** Elite 1v1 defending · Elite anticipation of the overlap · Compactness and tactical obedience
**You play like:** Blaise Matuidi, Koke, Saúl Ñíguez
**Your edge:** Attacking output — so a manager never has to trade a flank of the pitch to use you.
**First step this week:** Pick their most dangerous wide attacker. Make his game a nightmare. Then look at *his* stat line, not yours.
**Share:** "I'm The Sentinel ⚽ — nothing comes down my side. Which outside midfielder are you?"

---

#### ⚽ THE WEAVER — *The Half-Space Connector* · electric cyan
**Reflect-back:** "The touchline is a wall to you. You'd rather play in the gap beside it — and let someone else run outside."
**This is you:** The connector. You refuse to stay wide. You drift into the half-space, receive on the half-turn, and combine — and by vacating the touchline you turn a flat bank of four into something far more dangerous than a flat bank of four. **You're the reason your full-back has a career.**
**Strengths:** Elite first touch & press resistance · Elite half-space occupation · Short combination passing
**You play like:** Steven Pienaar, Robert Pirès, Bernardo Silva
**Your edge:** End product — so all that connection finishes in goals, not just in beautiful moves.
**First step this week:** Before the game, agree one rule with your full-back: when you come inside, he goes outside. Then count your combinations with him. Eight is good. Fifteen is elite.
**Share:** "I'm The Weaver ⚽ — I play in the gap. Which outside midfielder are you?"

---

#### ⚽ THE RENEGADE — *The Caged Flair Player* · magenta
**Reflect-back:** "They put you back here to defend. Fine — you'll defend. And then you'll take him on anyway."
**This is you:** A winger's soul in a midfielder's job. You're the most gifted player on the pitch, and they've put you in the bank of four because they need a body there — so you have to do the running **and** the magic. A winger is *allowed* to be a luxury. You are not allowed anything. **You earn your freedom every single week.** And you have the highest ceiling of anyone in this position.
**Strengths:** Elite dribbling & take-ons · Elite acceleration and disguise · Match-winning moments
**You play like:** Ryan Giggs, Marc Overmars, Damien Duff
**Your edge — and read this twice:** **Your lungs.** This is the whole story of your career. The Renegade who builds an Engine's endurance becomes one of the best players in the world. The one who doesn't gets exposed at minute seventy and moved somewhere else. Nothing else you develop matters as much as this.
**First step this week:** Do the defensive job for the full ninety — every tracking run, every recovery — **and then** take him on. That's the bargain. Giggs took it and won thirteen titles.
**Share:** "I'm The Renegade ⚽ — I do the running AND the magic. Which outside midfielder are you?"

---

## 8. The Engine problem (carried from v1.0 — still the make-or-break)

The Engine is 30% of this position and the plainest name on the list. Nearly a third of players will land on a result whose *surface* meaning is "you're a hard worker." If that doesn't feel like a status, your biggest cohort gets the weakest payoff and the share rate collapses. The solution is not to dress the Engine up — it's to tell him the truth, which is better than the flattery. Three moves, all built into the card:

1. **Lead with trust, not effort.** "The one the manager never has to worry about" is a *status*. "Hard worker" is a consolation prize. Same player, different frame.
2. **Name the trade, then land the win.** *"Fans forget your name. Managers build teams around you. You win things."* Concession first, so the payoff reads as earned, not defensive.
3. **Exemplars whose careers are the argument.** Park Ji-sung was picked for the biggest nights in Europe ahead of superstars. Milner out-medals more famous players. It's the record, not spin.

**Build and test the Engine reveal before anything else in the module.**

---

## 9. The bridge: reveal → development plan (new)

This is the section that turns a quiz into a product. The reveal tells a player *who they are*. The plan tells them *what to do about it for the next several weeks*. The seam between them is where retention lives.

**The organising idea — carried straight from the catalog — is that each archetype has one weakness worth attacking above all others**, and sharpening that one thing is the whole plan. The catalog already names them:

| Archetype | Sharpen (already elite) | **Attack (the one edge)** |
|---|---|---|
| Engine | Endurance, discipline, reliability | Acquire **one elite weapon** (a delivery or a duel) |
| Deliverer | Crossing, set pieces, switch of play | The **1v1** (solving and defending it) |
| Sentinel | 1v1 defending, anticipation, compactness | **Attacking output** |
| Weaver | First touch, press resistance, combination | **End product** (goals, not just moves) |
| Renegade | Dribbling, take-ons, acceleration | **Endurance** — "your lungs." Nothing matters more. |

### 9.1 Phase 1 (build now): the first step, made real

In Phase 1 you render exactly **one** challenge — the "first step this week" already written on each card — as a real, checkable thing. Every first step already has a *measurable target*, which is what makes this work:

- Engine: *count opposition runs tracked AND box arrivals — both numbers.*
- Deliverer: *50 crosses to a target; then count deliveries that reached the danger zone.*
- Sentinel: *pick their most dangerous attacker; check HIS stat line after.*
- Weaver: *the "I go in, you go out" rule; count combinations (8 good / 15 elite).*
- Renegade: *full defensive job for 90, then take him on.*

Represent it as data (§10, `Challenge`), show it on the result screen, and let the player tick "done" *in-session*. No persistence yet — the tick resets when the session ends. That's fine for Phase 1; it proves the loop.

### 9.2 Phase 2 (design now, build later): the full plan + readiness

- **A plan** is an ordered list of `Challenge`s per archetype: the first step, then progressively harder challenges that keep sharpening the signature and attacking the edge. Only the first is written; the rest are Phase 2 content work.
- **Logging** turns a ticked challenge into a stored `ChallengeLog` with the player's actual numbers against the target.
- **Readiness** is a 0–100 indicator built from (a) how much of the plan is complete and (b) how the logged numbers compare to targets.

> **Do not ship a hard readiness *number* in Phase 1, and do not invent its weights.** How much each challenge should count toward readiness is exactly the kind of thing that needs calibrating against real cohort data once you have users — the same discipline the Formation module needs. Shipping a precise-looking "readiness: 73" with made-up weights is a false promise. In Phase 1, if you want a progress feel, show a plain **count** ("1 of 5 challenges done") — honest, and it needs no calibration.

---

## 10. Data model (shaped so Phase 2 isn't blocked)

Store questions and archetypes as **data**, not markup. The Phase 1 additions to the v1.0 model are marked ✅; Phase 2 entities are marked ⏳ (define their shape now, build later).

```
Archetype   { id, name, tagline, identity, reflectBack, strengths[],
              exemplars[], developmentEdge, firstStep, nextStepCTA,
              color, emblem, shareCopy,
              spine: { sharpen[], attack } }              ✅ spine added

Chapter     { id, order, positionId, title }
Question    { id, chapterId, order, prompt, options[] }
Option      { label, archetypeId }

Result      { primary, secondary, revealType,             ✅ persist the WHOLE thing
              spread: { OM-001..OM-005 },                 ✅ all five, not just the winner
              ratio, answers, createdAt }

Challenge   { id, archetypeId, title, targetMetric,       ✅ first step per archetype
              targetValue, unit, reinforces }             (Phase 1 uses only the first)

Plan          { archetypeId, challengeIds[] }             ⏳ Phase 2
ChallengeLog  { challengeId, value, completedAt }         ⏳ Phase 2
Readiness     { score, components, snapshotAt }           ⏳ Phase 2 — weights need calibration
```

**The one thing to get right in Phase 1:** build the `Result` object with the full `spread` (all five archetypes), the `revealType`, and the `answers`. Even though Phase 1 doesn't save it anywhere, shaping it this way now means the moment Phase 2 adds storage, retakes, progress-over-time, and the plan can all key off it with no rework.

---

## 11. Deviations, and decisions to escalate

### 11.0 Deviations from the shared template (both deliberate — carried from v1.0)

- **Four chapters, not three.** Twelve questions, grouped 4×3, because *The Eightieth Minute* deserves its own act — fatigue is the cleanest separator in this position. The data model already supports it (`Chapter` has `order` and `positionId`; nothing hardcodes three). Update the shared template's chapter count to "3–4, per position."
- **Zero self-image questions.** Every kid at left mid thinks he's a Renegade; ask him who he wants to play like and he'll say Giggs. Aspiration would corrupt the result for the one position where aspiration is the confound. So all twelve questions are situational, and Chapter IV asks not *who do you want to be* but *who are you at minute eighty*. That may be worth stealing for other positions.

### 11.1 ⚠️ Unresolved — reconcile in Module 0 before any cross-position work

**The archetype count and this module's number do not reconcile.** The catalog calls this "Module 8" and says the five OM archetypes take the system **31 → 36**. v1.0 calls it "Module 9 of 9" and argues the AM/Winger split *already* took it 31 → 36 — the same numbers — making the true total **41**. Those can't both be true, and the leaf documents are quietly contradicting each other. The root cause: everything defers to a "Module 0 master index" that doesn't appear to exist in finished form.

**Placeholder for this build:** Module 9, and don't print a system-wide archetype total anywhere in the app. **Why it doesn't block you:** archetype IDs are position-scoped (`OM-001`…`OM-005`), so nothing collides and nothing breaks regardless of the final number. **Action:** make the Module 0 master index real and authoritative, then let *it* settle the count. Until it exists, treat every cross-position number as provisional.

### 11.2 Proposals to escalate to Module 0 (do NOT block this build)

These are system-wide changes v1.0 proposed from inside this module. They're plausibly right, but a single position's handoff is the wrong place to redefine the shared taxonomy — so they're flagged for Module 0, not actioned here. This module renders with the §4 colours locally; if Module 0 later disagrees, Module 0 wins.

| # | Proposal | Note |
|---|---|---|
| 1 | Add **Precision / Craft** as a tenth temperament (emerald) for the Deliverer | Real finding if the Module 0 grid has no craft slot. Confirm against the actual grid. |
| 2 | Recolour the **Renegade** magenta (Flair), not crimson (Force) | Consistent with the catalog's own "Artist family" language. |
| 3 | Recolour the **Full Back Sentinel** deep gold, retiring steel blue | Makes the Sentinel one coherent colour on every line of the pitch. A genuinely nice systemic result — and precisely why it belongs in Module 0, not here. |
| 4 | Revisit whether **FB-002 The Winger** (delivery specialist) is a Craft archetype in the wrong family | Flag only; don't block. |

---

## 12. Build order for Claude Design (start here)

A concrete, first-timer-friendly sequence. Build vertically — one working slice end-to-end — before making any of it pretty.

1. **Put the content in as data.** The five `Archetype` objects, the 12 `Question`s with their options, the `firstStep`/`Challenge` per archetype. Just the data, no screens yet.
2. **Build the scorer** (§6.3) and test it against the worked example in §6.5 — same inputs must give Engine 38.2 / Weaver 25.2 / Deliverer 16.8 / Renegade 10.5 / Sentinel 9.3, `revealType = primary_with_secondary`. If it doesn't match, fix the scorer before building any UI on top of it.
3. **Wire the question flow** — one question on screen, four options, next/back, grouped into the four chapters with title cards. Hold answers in memory.
4. **Build the reveal — Engine first.** Anticipation beat → name big in orange with the circuit emblem → details unfold. Get the Engine reveal feeling like a *status* (§8) before you build the other four. This is the test that matters most.
5. **Build the result card and spread bar.** Render all five archetypes on the bar with names/emblems, not colour alone (§4.1). Show the reveal band (§6.4) correctly for hybrids and secondaries.
6. **Add the first development step** as a checkable in-session item (§9.1).
7. **Add the share card.**
8. *Only now* polish: motion, type, the Chapter IV mood shift.

Then stop. Persistence, retakes, the full plan, readiness, video, and everything in Phases 3–4 are the next conversation — and several of them can't be built until this one has real users producing data.

---

*Same template, same reveal — now with a scoring engine that's fair to all five archetypes, deterministic reveal rules, and a bridge from the reveal into the development plan that is the actual product. Position 9 of 9.*
