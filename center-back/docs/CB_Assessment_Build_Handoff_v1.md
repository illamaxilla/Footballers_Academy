# The Footballer's Academy — Center Back Archetype Assessment
### Build Handoff · Module 2 of 7

**Version:** 1.0 · **Date:** July 10, 2026 · **Build in:** the Center Back project

> Built on the shared Footballer's Academy template established with the Goalkeeper module (v2). The flow, reveal sequence, scoring engine, share card, and data model are **identical** — only the archetypes, questions, visual signatures, and result copy below change. See the Goalkeeper handoff for the full template rationale.

---

## 1. The shared template (identical across all seven positions)

**Guiding principle — the reveal is the product.** Every choice serves felt accuracy, emotional payoff, and shareability.

**The flow:** Welcome → Assessment (12 questions in 3 chapters, one at a time, chaptered progress) → Cinematic reveal (anticipation beat → archetype name big and first, in its colour + emblem → details unfold) → Result + share card → first development step.

**Scoring:** each answer scores one archetype (+1). Convert to a % spread; highest = primary, second = secondary influence, a tie = a hybrid.

**Data model:** `Archetype` (id, name, tagline, identity, reflectBack, strengths, exemplars, developmentEdge, firstStep, nextStepCTA, color, emblem, shareCopy) · `Chapter` (id, order, name) · `Question` (id, order, chapterId, prompt, options) · `Option` (id, label, archetypeId) · `Result` (primary, secondary, spread).

**Reusable vs swapped:** the flow, reveal sequence, share-card layout, scoring, and data model never change; the archetypes, chapter names, questions, mappings, visual signatures, and result copy are this position's content (below).

**v1 scope:** a self-report questionnaire, buildable frontend-only, no login until the result. Not in v1: video/biometric measurement, career prediction, coach/scout/marketplace features. The entry point lives or dies on whether the result feels accurate and worth sharing.

---

## 2. Center Back archetypes

| Archetype | Identity | Signature strengths | Elite share |
|-----------|----------|---------------------|-------------|
| **The Colossus** | The Physical Dominator | Aerial & physical dominance, imposing presence | 25–30% |
| **The Architect** | The Ball-Playing Defender | Progressive passing, composure, build-up | 20–25% |
| **The Sentinel** | The Reading Master | Anticipation, interceptions, positioning | 30–35% |
| **The Libero** | The Modern Sweeper | Coverage, versatility, tactical flexibility | 15–20% |

## 3. Visual signatures

| Archetype | Colour | Emblem |
|-----------|--------|--------|
| The Colossus | Crimson | A fortress / tower |
| The Architect | Electric cyan | A compass / blueprint lines |
| The Sentinel | Deep gold | A radar / eye |
| The Libero | Violet | A sweeping orbit arc |

## 4. Trait dimensions the assessment probes

- **How you defend** — win it physically (Colossus) · read and intercept (Sentinel) · sweep and cover (Libero) · step out and win it cleanly (Architect)
- **On the ball** — launch attacks (Architect) · keep it safe and solid (Colossus/Sentinel) · carry into space (Libero)
- **Under a high line** — recovery pace and sweeping (Libero) · holding and organizing (Colossus/Sentinel)
- **Identity** — enforcer (Colossus) · reader (Sentinel) · builder (Architect) · coverer (Libero)

## 5. The assessment — 12 scenario questions, 3 chapters

Each option scores the bracketed archetype (the player never sees it). One option per archetype per question keeps the pool balanced.

### 📖 Chapter 1 — *Your Defending*

**Q1. A big striker holds the ball up, back to goal. You…**
- A) Get tight and bully him off it — I win the physical battle. *(Colossus)*
- B) Hold my distance, read the lay-off, and intercept. *(Sentinel)*
- C) Drop a step to cover the runner in behind. *(Libero)*
- D) Show him one way and win it cleanly. *(Architect)*

**Q2. A ball is played over the top into the channel. You…**
- A) Use my pace to sweep across and clear it. *(Libero)*
- B) I read it early — already turned and favourite for it. *(Sentinel)*
- C) Muscle the striker off and win the physical race. *(Colossus)*
- D) Get there and calmly play out rather than hoof it. *(Architect)*

**Q3. A cross comes into a crowded box. Your instinct…**
- A) Attack it and head it clear with authority. *(Colossus)*
- B) Position early so I'm first to the danger spot. *(Sentinel)*
- C) Track the late runner nobody else has picked up. *(Libero)*
- D) Head it into a teammate to start the counter. *(Architect)*

**Q4. Your team's in a messy scramble on the edge of the box. You…**
- A) Throw my body in — block, head, clear, whatever it takes. *(Colossus)*
- B) Stay calm, read where it's spilling, and step to it. *(Sentinel)*
- C) Cover the space behind the chaos in case it breaks. *(Libero)*
- D) Win it and immediately pass out of trouble. *(Architect)*

### 📖 Chapter 2 — *Your Build-Up*

**Q5. You've got the ball at the back with time. You most want to…**
- A) Step forward and drive a line-breaking pass in. *(Architect)*
- B) Keep it simple and safe — recycle to a full-back. *(Colossus)*
- C) Carry it forward into midfield myself. *(Libero)*
- D) Play the calm pass that keeps our shape intact. *(Sentinel)*

**Q6. The opposition presses you hard as you receive. You…**
- A) Take a touch, stay composed, and pass through the press. *(Architect)*
- B) Go long and safe — no risks near my own goal. *(Colossus)*
- C) Drive out of the pressure with the ball at my feet. *(Libero)*
- D) Move it first-time to the free man I've already spotted. *(Sentinel)*

**Q7. Your manager wants centre-backs to start attacks. That's…**
- A) Exactly my game — I love being the first passer. *(Architect)*
- B) Fine, but my job is defending first and foremost. *(Colossus)*
- C) Great — I'll step into midfield and create an overload. *(Libero)*
- D) Good — I'll pick the smart, low-risk progressive pass. *(Sentinel)*

**Q8. In training you enjoy most…**
- A) Playing out and passing patterns from the back. *(Architect)*
- B) Aerial duels and defending crosses. *(Colossus)*
- C) Recovery runs, covering, and 1v1 in space. *(Libero)*
- D) Positioning, angles, and reading attacks. *(Sentinel)*

### 📖 Chapter 3 — *Your Presence*

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

## 6. Scoring

Apply the shared rule: +1 to the bracketed archetype per answer, convert to a % spread, primary = highest, secondary = second, tie = hybrid.

## 7. Result cards

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
**This is you:** The coverer. Fast, versatile, tactically sharp, you sweep up everything behind the defense and give your teammates freedom to push. You clean up what others miss.
**Strengths:** Coverage & recovery pace · Versatility · Tactical flexibility
**You play like:** David Alaba, Alessandro Bastoni, Manuel Akanji
**Your edge:** Aerial and duel strength, so you're complete in the box as well as in space.
**First step this week:** Focus on your covering position — always be ready to sweep the ball in behind. Notice how much higher your back line can push because of you.
**Next-step button:** *Your Libero path starts with covering the space →*
**Share:** "I'm The Libero 🛡️ — I cover everything behind the line. Which defender are you?"

---

*Same template, same reveal — Center Back content plugged in. Positions 2 of 7.*
