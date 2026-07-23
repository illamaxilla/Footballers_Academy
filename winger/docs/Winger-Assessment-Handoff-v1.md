# The Footballer's Academy — Winger Archetype Assessment
### Build Handoff · Module 7 of 8

**Version:** 1.0 · **Date:** July 12, 2026 · **Build in:** the Winger project

> ⚠️ **Supersedes the merged "Attacking Midfielder / Winger" handoff**, which left out The Speedster entirely despite it being 22% of elite wingers. This handoff restores the Winger's **own** five archetypes.
> **Consequence:** the system is now **8 positions / 36 archetypes**, not 7 / 31.
> Built on the shared Footballer's Academy template (Goalkeeper module v2). Flow, reveal sequence, scoring engine, share card, and data model are **identical** — only archetypes, questions, visual signatures, and result copy change.
>
> *(NOTE: v1.0 is superseded by v2.0 and v3.0. Retained for reference only. Its 4-option weighted rotation and 32/28/22/13/5 distribution are BOTH replaced — see the newer docs. Build to v3.0.)*

---

## 1. The shared template
**Guiding principle — the reveal is the product.** Every choice serves felt accuracy, emotional payoff, shareability.
**Flow:** Welcome → Position select → Assessment (12 questions in 3 chapters) → Cinematic reveal → Result + share card → first development step.
**Scoring (v1.0):** each answer scores one archetype (+1); convert to % spread; highest = primary, second = secondary, tie = a hybrid.
**Data model:** `Archetype` (id, name, tagline, identity, reflectBack, strengths, exemplars, developmentEdge, firstStep, nextStepCTA, color, emblem, shareCopy) · `Chapter` · `Question` · `Option` (label, archetypeId) · `Result` (primary, secondary, spread).
**v1 scope:** self-report questionnaire, frontend-only, no login until result.
> **Five archetypes → four options per question** (v1.0), rotating which archetype is omitted, weighted to elite share. *(v2.0 replaced this with 5 options / equal exposure.)*

---

## 2. Winger archetypes (v1.0 distribution — superseded)

| Archetype | Identity | Signature strengths | Elite share (v1) |
|-----------|----------|---------------------|-------------|
| The Artist | The Explosive Entertainer | 1v1 dribbling, flair, elite agility | 32% |
| The Ghost | The Inside Forward | Off-ball movement, clinical finishing, spatial IQ | 28% |
| The Speedster | The Pace Merchant | Top-end speed, explosive acceleration, transition threat | 22% |
| The Playmaker | The Wide Creator | Vision, elite delivery, technical control | 13% |
| The Hybrid | The Complete Winger *(rare)* | Goals + assists, adaptability, complete game | 5% |

*(Canon is 28/26/22/16/8 per v2.0/v3.0.)*

## 3. Visual signatures

| Archetype | Colour | Temperament | Emblem |
|-----------|--------|-------------|--------|
| The Artist | Magenta | Flair | Flame / spin |
| The Ghost | Pale silver | Elusiveness | Fading silhouette |
| The Speedster | Electric blue | Drive | Speed vector / motion streak |
| The Playmaker | Teal | Quiet control | Inward-drift arc |
| The Hybrid | Electric cyan | Construction | Star / complete node |

## 4. Trait dimensions
- **How you beat your man** — skill (Artist) · pure pace (Speedster) · movement (Ghost) · clever pass (Playmaker) · whatever the moment needs (Hybrid)
- **Where you end up** — touchline (Artist/Speedster) · box (Ghost) · half-space (Playmaker)
- **What you produce** — take-ons (Artist) · goals (Ghost) · runs in behind (Speedster) · assists (Playmaker) · all of it (Hybrid)
- **Off the ball** — track back (Hybrid) · stay high (Artist/Speedster) · find the pocket (Ghost/Playmaker)

## 5. The assessment — 12 scenario questions, 3 chapters (v1.0 wording)

### 📖 Chapter 1 — *The Isolation*
**Q1.** Ball wide, full-back 1v1, nobody near. → Take him on (Artist) / Knock past, pace (Speedster) / Cut inside, shot (Ghost) / Draw him in, pass the overlap (Playmaker)
**Q2.** Full-back backs off. → Go at him anyway (Artist) / Drive the gap (Speedster) / Drift into the space (Ghost) / Adapt to the moment (Hybrid)
**Q3.** Foot race down the line. → Back myself (Speedster) / Beat him again once there (Artist) / Read the bounce, smarter position (Ghost) / Let it run, pick the second ball (Playmaker)
**Q4.** In training you enjoy most. → 1v1 dribbling (Artist) / Sprint work (Speedster) / Crossing/passing (Playmaker) / Full games, do everything (Hybrid)

### 📖 Chapter 2 — *The Cut Inside*
**Q5.** Beaten your man, final third. → Beat one more (Artist) / Byline, pull back (Speedster) / Cut in, shoot (Ghost) / Slow it, perfect ball (Playmaker)
**Q6.** Cross from opposite flank — where? → Back post to finish (Ghost) / Gamble second ball, run again (Artist) / Sprint to punish clearance (Speedster) / Wherever needed (Hybrid)
**Q7.** Team loses it, you're high. → Track back, both ends (Hybrid) / Drift inside to receive (Ghost) / Stay wide, outlet (Artist) / Drop into the pocket (Playmaker)
**Q8.** A yard opens in the box. → Already in it (Ghost) / Explode into it (Speedster) / Find the runner (Playmaker) / Take it, made the chance too (Hybrid)

### 📖 Chapter 3 — *Your Signature*
**Q9.** Teammates describe you as. → Entertainer (Artist) / Rocket (Speedster) / Finisher (Ghost) / Complete winger (Hybrid)
**Q10.** The compliment that means most. → "Destroyed their full-back" (Artist) / "You were just gone" (Speedster) / "Unmarkable — a hat-trick" (Ghost) / "Delivery and vision created everything" (Playmaker)
**Q11.** Which winger do you most want to play like? → Explosive dribbler (Artist) / Inside forward, 20 a season (Ghost) / Wide creator (Playmaker) / Complete winger, no weaknesses (Hybrid) *(v2.0 replaced this with a loss-framed item.)*
**Q12.** What frustrates you most? → System won't let me take players on (Artist) / Not played in behind (Speedster) / Not on the ball to create (Playmaker) / Couldn't contribute in every phase (Hybrid)

## 6. Scoring & balance (v1.0 — superseded)
+1 per answer, % spread, primary = highest, tie = hybrid. Option balance across 48 slots weighted to elite share:

| Archetype | Options | Omitted from |
|-----------|---------|--------------|
| The Artist | 11 | Q8 |
| The Ghost | 10 | Q4, Q12 |
| The Speedster | 10 | Q7, Q11 |
| The Playmaker | 9 | Q2, Q6, Q9 |
| The Hybrid | 8 | Q1, Q3, Q5, Q10 |

*(v2.0 §0.1 documents why this weighting was wrong — forced substitution inflates high-exposure archetypes. Replaced with equal exposure.)*

## 7. Result cards (v1.0 copy)

**⚽ THE ARTIST — *The Explosive Entertainer* · magenta.** Reflect-back: "You want the ball at your feet, a defender in front of you, and the freedom to beat him." You play like Neymar Jr., Vinícius Jr., Franck Ribéry. Edge: decision-making and end product. First step: take your man on every time you get it wide; count take-ons, then how many produced a chance. Share: "I'm The Artist ⚽."

**⚽ THE GHOST — *The Inside Forward* · pale silver.** Reflect-back: "You'd rather find the space nobody's watching and finish." You play like Mohamed Salah, Son Heung-min, Sadio Mané. Edge: 1v1 dribbling from standing. First step: time one run into the channel every attack. Share: "I'm The Ghost ⚽."

**⚽ THE SPEEDSTER — *The Pace Merchant* · electric blue.** Reflect-back: "You want the ball in front of you and grass to run into." You play like Gareth Bale (prime), Kylian Mbappé (wide), Adama Traoré. Edge: technical variety and end product. First step: ask to be played in behind; count how often you're first to it. Share: "I'm The Speedster ⚽."

**⚽ THE PLAYMAKER — *The Wide Creator* · teal.** Reflect-back: "You'd rather drift inside, take a breath, and pick the perfect ball." You play like Riyad Mahrez, Bernardo Silva, Bukayo Saka. Edge: directness and goal threat. First step: drift into the half-space and look for the line-breaking pass; count key passes. Share: "I'm The Playmaker ⚽."

**⚽ THE HYBRID — *The Complete Winger* · electric cyan.** Reflect-back: "You refuse to be one thing." You play like Lionel Messi (wide), Cristiano Ronaldo (early), Raheem Sterling. Edge: a signature weapon — lean into your single best quality. First step: in one game aim for all four (take-on, chance created, shot, defensive recovery). Share: "I'm The Hybrid ⚽."

---

*Same template, same reveal — the Winger's own archetypes, restored, with The Speedster back where he belongs. Position 7 of 8.*
