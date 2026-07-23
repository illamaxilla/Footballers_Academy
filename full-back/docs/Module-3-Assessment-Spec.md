# The Footballer's Academy — Full Back / Wing Back Archetype Assessment
### Build Handoff · Module 3 of 7

**Version:** 1.0 · **Date:** July 10, 2026 · **Build in:** the Full Back project

> Built on the shared Footballer's Academy template established with the Goalkeeper module (v2). The flow, reveal sequence, scoring engine, share card, and data model are **identical** — only the archetypes, questions, visual signatures, and result copy below change.

---

## 1. The shared template (identical across all seven positions)

**Guiding principle — the reveal is the product.** Every choice serves felt accuracy, emotional payoff, and shareability.

**The flow:** Welcome → Assessment (12 questions in 3 chapters, one at a time, chaptered progress) → Cinematic reveal (anticipation beat → archetype name big and first, in its colour + emblem → details unfold) → Result + share card → first development step.

**Scoring:** each answer scores one archetype (+1). Convert to a % spread; highest = primary, second = secondary, a tie = a hybrid.

**Data model:** `Archetype` (id, name, tagline, identity, reflectBack, strengths, exemplars, developmentEdge, firstStep, nextStepCTA, color, emblem, shareCopy) · `Chapter` · `Question` · `Option` (label, archetypeId) · `Result` (primary, secondary, spread).

**Reusable vs swapped:** flow, reveal, share-card layout, scoring, and data model never change; archetypes, chapters, questions, mappings, signatures, and result copy are this position's content.

**v1 scope:** self-report questionnaire, frontend-only, no login until the result. Not in v1: video/biometric measurement, prediction, coach/scout/marketplace features.

---

## 2. Full Back / Wing Back archetypes

| Archetype | Identity | Signature strengths | Elite share |
|-----------|----------|---------------------|-------------|
| **The Warrior** | The Complete Full Back | Two-way work rate, endurance, balance | 30–35% |
| **The Winger** | The Attacking Full Back | Crossing, attacking runs, chance creation | 25–30% |
| **The Sentinel** | The Defensive Full Back | 1v1 lockdown, positioning, discipline | 20–25% |
| **The Architect** | The Inverted Full Back | Inside control, tempo, positional intelligence | 15–20% |

## 3. Visual signatures

| Archetype | Colour | Emblem |
|-----------|--------|--------|
| The Warrior | Orange | A piston / engine |
| The Winger | Magenta | A crossing arrow / whip |
| The Sentinel | Steel blue | A lock / shield |
| The Architect | Electric cyan | An inward pivot arrow |

## 4. Trait dimensions the assessment probes

- **Attack vs defend priority** — attack-first (Winger) · defend-first (Sentinel) · balanced (Warrior) · control from inside (Architect)
- **On the ball wide** — whip crosses (Winger) · tuck inside and dictate (Architect) · read it (Warrior)
- **Defensive 1v1** — lock down the winger (Sentinel) · recover through work rate (Warrior)
- **Identity** — overlapper (Winger) · lockdown (Sentinel) · engine (Warrior) · inverted playmaker (Architect)

## 5. The assessment — 12 scenario questions, 3 chapters

### 📖 Chapter 1 — *Going Forward*

**Q1. You get the ball wide with space ahead. You…**
- A) Overlap and whip in a cross — that's my weapon. *(Winger)*
- B) Underlap or tuck inside and keep possession ticking. *(Architect)*
- C) Drive forward but keep one eye on getting back. *(Warrior)*
- D) Play safe and hold my position — attack isn't my priority. *(Sentinel)*

**Q2. Your team is building an attack. Where do you want to be?**
- A) High and wide, stretching their defense. *(Winger)*
- B) Inside, next to midfield, controlling the tempo. *(Architect)*
- C) Supporting up and down wherever I'm needed. *(Warrior)*
- D) Holding back to keep us defensively secure. *(Sentinel)*

**Q3. You reach the byline. You…**
- A) Whip an early cross into the danger zone. *(Winger)*
- B) Cut it back and keep the move alive. *(Architect)*
- C) Cross or recycle depending on the runners — I read it. *(Warrior)*
- D) Get it in and sprint back into position. *(Sentinel)*

**Q4. In training you enjoy most…**
- A) Crossing and final-third attacking patterns. *(Winger)*
- B) Playing out and controlling from inside positions. *(Architect)*
- C) End-to-end, up-and-down conditioning work. *(Warrior)*
- D) 1v1 defending and shutting down wingers. *(Sentinel)*

### 📖 Chapter 2 — *Defending Your Flank*

**Q5. A tricky winger runs at you 1v1. You…**
- A) Lock him down — I back myself every time. *(Sentinel)*
- B) Stay patient, show him inside to my cover. *(Architect)*
- C) Match his run and recover through effort. *(Warrior)*
- D) Contain and delay — I'd rather not get caught upfield. *(Winger)*

**Q6. Your team loses the ball while you're high up the pitch. You…**
- A) Sprint 60 yards back to recover — I always get back. *(Warrior)*
- B) I'm rarely that exposed — I stay disciplined positionally. *(Sentinel)*
- C) Tuck inside to help control the counter centrally. *(Architect)*
- D) Trust my cover — attacking's my job, not chasing back. *(Winger)*

**Q7. Defending a cross into your box, you…**
- A) Mark tight and win my duel at the back post. *(Sentinel)*
- B) Read it and step to intercept the delivery. *(Architect)*
- C) Track my runner and battle for it. *(Warrior)*
- D) Clear my zone and look to spring the counter. *(Winger)*

**Q8. Your manager's priority for you is…**
- A) Lock down your flank defensively above all. *(Sentinel)*
- B) Control the game from an inverted position. *(Architect)*
- C) Give everything in both boxes, all game. *(Warrior)*
- D) Provide the attacking threat and assists. *(Winger)*

### 📖 Chapter 3 — *Your Identity*

**Q9. Teammates describe you as…**
- A) The engine — up and down all game, never stops. *(Warrior)*
- B) The one who locks down their best attacker. *(Sentinel)*
- C) The creator — my crosses and assists win games. *(Winger)*
- D) The extra midfielder who controls the tempo. *(Architect)*

**Q10. The compliment that means the most…**
- A) "You covered every blade of grass today." *(Warrior)*
- B) "Their winger didn't get a kick against you." *(Sentinel)*
- C) "Your delivery was unplayable — two assists." *(Winger)*
- D) "You basically played in midfield and ran the game." *(Architect)*

**Q11. Which full-back do you most want to play like?**
- A) A relentless two-way engine. *(Warrior)*
- B) A lockdown defensive specialist. *(Sentinel)*
- C) An attacking weapon with elite crossing. *(Winger)*
- D) An inverted full-back who controls the game. *(Architect)*

**Q12. What frustrates you most?**
- A) Not being able to get forward and join the attack. *(Winger)*
- B) Getting beaten in a 1v1 on my flank. *(Sentinel)*
- C) A system that doesn't let me get on the ball centrally. *(Architect)*
- D) Feeling like I didn't contribute enough at both ends. *(Warrior)*

## 6. Scoring

Apply the shared rule: +1 per answer to the bracketed archetype, convert to a % spread, primary/secondary/hybrid.

## 7. Result cards

---

#### ⚽ THE WARRIOR — *The Complete Full Back* · orange
**Reflect-back:** "You want to give everything at both ends and never stop running — the complete two-way full-back."
**This is you:** The engine. You attack and defend in equal measure and cover more ground than anyone. When the game demands everything, you deliver it.
**Strengths:** Two-way work rate · Endurance · Reliability in both boxes
**You play like:** Andrew Robertson, Jordi Alba, Alphonso Davies
**Your edge:** A standout weapon — sharpen either your delivery or your 1v1 defending so you're not just complete, but elite at one thing.
**First step this week:** Track your up-and-down runs in one session — support every attack and recover for every defensive moment.
**Next-step button:** *Your Warrior path starts with owning both boxes →*
**Share:** "I'm The Warrior ⚽ — I give everything at both ends. Which full-back are you?"

---

#### ⚽ THE WINGER — *The Attacking Full Back* · magenta
**Reflect-back:** "You want to get forward, whip in crosses, and create — an attacker who starts at full-back."
**This is you:** The wide weapon. Your delivery and overlapping runs are a constant threat, and you'd rather create a goal than just prevent one.
**Strengths:** Crossing & delivery · Attacking runs · Chance creation
**You play like:** Trent Alexander-Arnold, Dani Alves, Marcelo
**Your edge:** Defensive positioning and recovery, so your attacking never leaves your flank exposed.
**First step this week:** Get to the byline and deliver as often as you can — then be first to recover every time you lose it.
**Next-step button:** *Your Winger path starts with owning the final third →*
**Share:** "I'm The Winger ⚽ — my delivery wins games. Which full-back are you?"

---

#### ⚽ THE SENTINEL — *The Defensive Full Back* · steel blue
**Reflect-back:** "You want to lock down your flank and shut out their best attacker — defence first, always."
**This is you:** The lockdown specialist. You win your 1v1s, hold your position, and make life miserable for wingers. Solid, disciplined, dependable.
**Strengths:** 1v1 defending · Positioning & discipline · Flank security
**You play like:** César Azpilicueta, Kyle Walker, Aaron Wan-Bissaka
**Your edge:** Attacking output, so you offer a threat going forward as well as security at the back.
**First step this week:** Win every 1v1 on your flank — force their winger inside to your cover and never get beaten on the outside.
**Next-step button:** *Your Sentinel path starts with locking down your flank →*
**Share:** "I'm The Sentinel ⚽ — nobody beats me on my flank. Which full-back are you?"

---

#### ⚽ THE ARCHITECT — *The Inverted Full Back* · electric cyan
**Reflect-back:** "You want to tuck inside, control the tempo, and dictate — an extra midfielder from full-back."
**This is you:** The modern inverted full-back. You step into midfield, control possession, and dictate the game from unexpected angles. A defender with a playmaker's brain.
**Strengths:** On-the-ball control · Positional intelligence · Tempo dictation
**You play like:** Philipp Lahm, Joshua Kimmich, Oleksandr Zinchenko
**Your edge:** Wide defending fundamentals, so you're solid when the game asks you to be an orthodox full-back.
**First step this week:** When your team has the ball, tuck inside to give a passing option in midfield — see how much more you touch the ball.
**Next-step button:** *Your Architect path starts with controlling from inside →*
**Share:** "I'm The Architect ⚽ — a full-back who runs the midfield. Which full-back are you?"

---

*Same template, same reveal — Full Back content plugged in. Position 3 of 7.*
