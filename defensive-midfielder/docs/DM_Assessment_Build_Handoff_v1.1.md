# The Footballer's Academy — Defensive Midfielder Archetype Assessment
### Build Handoff · Module 4 of 7

**Version:** 1.1 · **Date:** July 15, 2026 · **Supersedes:** v1.0 (July 10, 2026) · **Build in:** the Defensive Midfielder project

> Built on the shared Footballer's Academy template (established with the Goalkeeper module).
>
> **Read this first.** Five of the six upgrades in this version are **template-level** — they improve the engine for *all seven positions* and should be promoted to the shared template, not forked for DM alone. Only the Chapter 1 content correction (Upgrade 2) is DM-specific. Every change below is tagged **[TEMPLATE]** or **[DM CONTENT]** so you can decide what to retrofit to the Goalkeeper module and carry forward into positions 5–7.

---

## 0. What changed in v1.1 (and why)

| # | Upgrade | Scope | Problem it solves |
|---|---------|-------|-------------------|
| 1 | **DM-DNA spread scoring** | `[TEMPLATE]` | Flat +1 scoring across 12 questions and 4 archetypes produced frequent ties (4-3-3-2, even 3-3-3-3) that felt like coin-flips. Everyone now receives a **primary + secondary spread**, so a near-tie reads as an interesting blend rather than an arbitrary verdict. |
| 2 | **Corrected Chapter 1 Architect options** | `[DM CONTENT]` | The Architect's "how you defend" answers described *delaying / screening / shepherding* — which are **Sentinel** behaviours — so the two archetypes bled together and diluted accuracy. Rewritten around the Architect's real defensive identity: **win the ball *to build*.** |
| 3 | **Shuffle option order at render** | `[TEMPLATE]` | A fixed A=Destroyer, B=Sentinel, C=Architect, D=Warrior mapping was guessable and biased players toward whichever phrasing *slot* they liked. Options now render in a **random order every session**. |
| 4 | **"Why this fits you" evidence at the reveal** | `[TEMPLATE]` | The result asserted an archetype without showing its work. It now names the **2–3 answers that actually drove the result** — the single biggest cheap win for felt accuracy and trust. |
| 5 | **Persist raw answers, not just the result** | `[TEMPLATE]` | v1.0 stored only the computed archetype. Storing every **raw selection** lets you re-score with a better model later, learn which questions truly discriminate, and eventually train the real classifier from real player data. |
| 6 | **Separate aspiration from behaviour** | `[TEMPLATE]` | One question asked who you *want to play like* and scored it as who you *are*. Aspiration is now a **separate signal** that sets the *direction* of the development plan — and the gap between "who you are" and "who you want to become" becomes the emotional hook into the app. |

Everything else — the flow, the reveal choreography, the share-card layout, the four archetypes, and their visual signatures — is unchanged from v1.0.

---

## 1. The shared template

**Guiding principle — the reveal is the product.** Every choice serves felt accuracy, emotional payoff, and shareability.

**The flow:**
Welcome → Assessment (12 questions in 3 chapters, one at a time, chaptered progress) → Cinematic reveal (anticipation beat → archetype name big and first, in its colour + emblem → **DM-DNA spread** → **"why this fits you"** → details unfold) → Result + share card → **aspiration bridge** → first development step.

**Scoring (v1.1):** 11 of the 12 questions score one archetype (+1 each). The 12th is the **aspiration question** — it sets *direction*, not archetype (see §6). Convert scores to a % spread; highest = primary, second = secondary; the gap sets a clarity label; a true tie = a named hybrid.

**Data model (v1.1):**

- `Archetype` — id, name, tagline, identity, reflectBack, strengths, exemplars, developmentEdge, firstStep, nextStepCTA, color, emblem, shareCopy
- `Chapter` — id, title, order
- `Question` — id, chapterId, order, prompt, **isAspiration** *(new)*
- `Option` — id, questionId, label, archetypeId, **evidence** *(new — a short second-person fragment used at the reveal)*
- `Response` *(new — stores raw answers)* — sessionId, questionnaireVersion, timestamp, selections `[{questionId, optionId, archetypeScored}]`, aspirationArchetypeId
- `Result` — sessionId, spread `{archetypeId: percent}`, primaryId, secondaryId, clarityLabel, aspirationArchetypeId, **whyFragments[]** *(new)*

**Reusable vs swapped:** the flow, reveal, share-card layout, **scoring engine, and data model** are shared across all seven positions; archetypes, chapters, questions, mappings, evidence fragments, signatures, and result copy are this position's content.

**v1 scope:** self-report questionnaire, frontend-only, **no login until the result** — persist the `Response` locally, then attach it to the account on sign-up. *Not* in v1: video/biometric measurement, prediction, coach/scout/marketplace features.

---

## 2. Defensive Midfielder archetypes

| Archetype | Identity | Signature strengths | Elite share |
|-----------|----------|---------------------|-------------|
| **The Destroyer** | The Ball-Winner | Tackling, ball-winning, physical disruption | 25–30% |
| **The Sentinel** | The Positioning Master | Anticipation, interceptions, organization | 30–35% |
| **The Architect** | The Deep-Lying Playmaker | Passing range, vision, tempo control | 20–25% |
| **The Warrior** | The Complete Midfielder | Versatility, work rate, all-phase play | 20–25% |

## 3. Visual signatures

| Archetype | Colour | Emblem |
|-----------|--------|--------|
| The Destroyer | Crimson | An impact burst |
| The Sentinel | Deep gold | A radar / interception lines |
| The Architect | Electric cyan | A metronome / tempo mark |
| The Warrior | Orange | Interlocking gears |

## 4. Trait dimensions the assessment probes

- **How you defend** — win it aggressively *(Destroyer)* · read and intercept to stop the threat *(Sentinel)* · win it as the first act of attack *(Architect)* · screen and cover everywhere *(Warrior)*
- **On the ball** — dictate tempo and progress play *(Architect)* · keep it simple and safe *(Destroyer / Sentinel)* · carry and join in *(Warrior)*
- **Energy** — box-to-box coverage *(Warrior)*
- **Identity** — enforcer *(Destroyer)* · shield / reader *(Sentinel)* · regista *(Architect)* · all-rounder *(Warrior)*

> **Design note.** Chapter 1 measures *observed behaviour under pressure* — how a player actually reacts, not how they describe themselves. That makes it the strongest single signal of current archetype, which is why it carries the tie-break weighting in §6.

---

## 5. The assessment — 12 questions, 3 chapters

> **Build note `[TEMPLATE]`.** The archetype tag and letter beside each option are for **authoring and scoring only**. At render time, **shuffle the options into a random order per question, per session**. Never present the archetypes in a fixed positional order. The `evidence` fragment after each option is the second-person line surfaced at the reveal (see §7).

### 📖 Chapter 1 — *Winning the Ball*  *(observed behaviour — carries the tie-break weight)*

**Q1. The opposition is building through midfield. You…**
- A) Step in aggressively and win it with a tackle. — *Destroyer* · evidence: *"you stepped in and won it with a tackle"*
- B) Read the pass and intercept it before it arrives. — *Sentinel* · evidence: *"you read the pass and cut it out before it arrived"*
- C) Win it cleanly, then turn and launch our attack from the steal. — *Architect* · evidence: *"you won it clean and turned it straight into attack"* — **⟵ changed** (was "screen the space and force them backwards")
- D) Press, track, and cover wherever the danger goes. — *Warrior* · evidence: *"you pressed, tracked, and covered the danger everywhere"*

**Q2. A runner breaks through your midfield line. You…**
- A) Hunt him down and put in a strong challenge. — *Destroyer* · evidence: *"you hunted him down and threw in a strong challenge"*
- B) I anticipated it — already across to cut it out. — *Sentinel* · evidence: *"you'd anticipated it and were already across to cut it out"*
- C) Nick the ball off him and release a forward pass before he can set. — *Architect* · evidence: *"you nicked it off him and sprung us forward"* — **⟵ changed** (was "delay and shepherd him")
- D) Sprint back and cover the space myself. — *Warrior* · evidence: *"you sprinted back and covered the space yourself"*

**Q3. Your team needs to stop a counter-attack. You…**
- A) Make a tactical foul if I have to — stop it at all costs. — *Destroyer* · evidence: *"you stopped it at all costs — tactical foul and all"*
- B) Position early to block the killer pass. — *Sentinel* · evidence: *"you were positioned early to block the killer pass"*
- C) Drop into the passing lane, intercept, and immediately restart our possession. — *Architect* · evidence: *"you turned their counter into our possession"* — **⟵ changed** (was "slow it down and buy time")
- D) Chase back and make the recovery tackle. — *Warrior* · evidence: *"you chased back and made the recovery tackle"*

**Q4. In training you enjoy most…**
- A) Tackling, duels, and pressing drills. — *Destroyer* · evidence: *"you love the tackling, duels and pressing drills"*
- B) Positioning and reading-the-game work. — *Sentinel* · evidence: *"you love the positioning and reading-the-game work"*
- C) Passing patterns and dictating tempo. — *Architect* · evidence: *"you love passing patterns and dictating tempo"* *(unchanged — already authentic)*
- D) Box-to-box conditioning and all-phase games. — *Warrior* · evidence: *"you love box-to-box conditioning and all-phase games"*

### 📖 Chapter 2 — *On the Ball*

**Q5. You win possession in front of your defense. You…**
- A) Give it simple and safe — my job's the dirty work. — *Destroyer* · evidence: *"you kept it simple and safe — the dirty work's your job"*
- B) Pick the calm pass that keeps our shape. — *Sentinel* · evidence: *"you picked the calm pass that kept our shape"*
- C) Turn and spray a progressive pass to switch play. — *Architect* · evidence: *"you turned and sprayed a progressive pass to switch play"*
- D) Drive forward and join the attack. — *Warrior* · evidence: *"you drove forward and joined the attack"*

**Q6. Your team wants to control the tempo. You…**
- A) Keep it simple and let the creators create. — *Destroyer* · evidence: *"you kept it simple and let the creators create"*
- B) Sit in front of the back four and recycle safely. — *Sentinel* · evidence: *"you sat in front of the back four and recycled safely"*
- C) Dictate it myself — every attack goes through me. — *Architect* · evidence: *"you dictated it yourself — every attack went through you"*
- D) Get everywhere to give options across the pitch. — *Warrior* · evidence: *"you got everywhere to give options across the pitch"*

**Q7. Under pressure deep in your own half, you…**
- A) Clear it — no risks in front of my own goal. — *Destroyer* · evidence: *"you cleared it — no risks in front of your own goal"*
- B) Move it first-time to the free man. — *Sentinel* · evidence: *"you moved it first-time to the free man"*
- C) Take a touch, ride the press, and pass through it. — *Architect* · evidence: *"you rode the press and passed straight through it"*
- D) Carry it out of trouble with determination. — *Warrior* · evidence: *"you carried it out of trouble yourself"*

**Q8. Your manager's main instruction for you…**
- A) Break up everything and protect the back four. — *Destroyer* · evidence: *"your job was to break up everything and protect the back four"*
- B) Read the game and be the defensive brain. — *Sentinel* · evidence: *"your job was to read the game and be the defensive brain"*
- C) Dictate our play — be the deep playmaker. — *Architect* · evidence: *"your job was to dictate play as the deep playmaker"*
- D) Cover every blade of grass and do a bit of everything. — *Warrior* · evidence: *"your job was to cover every blade of grass"*

### 📖 Chapter 3 — *Your Identity*

**Q9. Teammates describe you as…**
- A) The enforcer — I win the ball back for us. — *Destroyer* · evidence: *"your teammates call you the enforcer"*
- B) The shield — always in the right spot, reading danger. — *Sentinel* · evidence: *"your teammates call you the shield"*
- C) The metronome — everything flows through my passing. — *Architect* · evidence: *"your teammates call you the metronome"*
- D) The engine — box to box, all game. — *Warrior* · evidence: *"your teammates call you the engine"*

**Q10. The compliment that means the most…**
- A) "You won every battle in midfield." — *Destroyer* · evidence: *"the compliment you treasure is winning every midfield battle"*
- B) "You read the whole game and killed their attacks." — *Sentinel* · evidence: *"the compliment you treasure is reading the whole game"*
- C) "You dictated the tempo — we played through you." — *Architect* · evidence: *"the compliment you treasure is dictating the tempo"*
- D) "You were everywhere — attack and defense both." — *Warrior* · evidence: *"the compliment you treasure is being everywhere"*

**Q11. `[ASPIRATION — does NOT score an archetype; sets development direction]` Which midfielder do you most want to *become*?**
- A) A ball-winning enforcer. — sets aspiration → *Destroyer*
- B) A positional master who intercepts everything. — sets aspiration → *Sentinel*
- C) A deep-lying playmaker who dictates the game. — sets aspiration → *Architect*
- D) A complete box-to-box midfielder. — sets aspiration → *Warrior*

> This is the emotional capstone of the assessment: it asks the player to look forward, not inward. Its answer feeds the **aspiration bridge** (§7) and sets the *direction* of the development plan — never the archetype score.

**Q12. What frustrates you most?**
- A) Losing a midfield battle or a duel. — *Destroyer* · evidence: *"nothing frustrates you like losing a duel"*
- B) Getting pulled out of position and exposing the defense. — *Sentinel* · evidence: *"nothing frustrates you like being pulled out of position"*
- C) A system that won't let me get on the ball and dictate. — *Architect* · evidence: *"nothing frustrates you like not being allowed on the ball"*
- D) Feeling like I didn't influence both ends of the pitch. — *Warrior* · evidence: *"nothing frustrates you like not influencing both ends"*

**Scoring questions:** Q1–Q10 and Q12 (**11 total**). **Aspiration question:** Q11 (no score).

---

## 6. Scoring — the DM-DNA spread

**Step 1 — Tally.** Across the 11 scoring questions, add +1 to the archetype of each selected option. Maximum 11 points, distributed across the four archetypes.

**Step 2 — Spread.** Convert to percentages:
`percent(archetype) = round( points ÷ 11 × 100 )`
The four percentages form the **DM-DNA spread** (they sum to ~100). Render as a **single horizontal bar** of four segments, each in its archetype colour, largest segment = primary. This bar is the visual centrepiece of the reveal — every player leaves with a unique DNA fingerprint, not a bucket.

**Step 3 — Primary & secondary.** Primary = archetype with the most points. Secondary = second-most.

**Step 4 — Clarity label** (sets the headline tone at the reveal), based on the **gap between primary and secondary, in questions:**

| Gap | Label | Framing |
|-----|-------|---------|
| ≥ 3 | **"Defined [Primary]"** | A clear, dominant identity. |
| 1–2 | **"[Primary], shading [Secondary]"** | A clear primary with a real secondary colour. |
| 0 (tie) | **"[Primary]–[Secondary] Hybrid"** | A genuine blend — frame as **rare and valuable**: the flexible, hard-to-mark profile. Never present it as "inconclusive." |

**Step 5 — Tie-break** (only when two or more archetypes share the top score). Resolve in order:
1. **Chapter 1 weighting.** The tied archetype with more Chapter 1 points wins primary. *(Chapter 1 is observed behaviour under pressure — a stronger signal of who a player is than how they describe themselves.)*
2. If still tied, the archetype that first appeared as a selected answer earliest in the questionnaire leads.
The losing tied archetype becomes secondary; the result is labelled a **Hybrid**.

**Step 6 — Aspiration.** Read `aspirationArchetypeId` from Q11. It never touches the spread; it feeds the aspiration bridge (§7) and the development plan's direction.

**Step 7 — "Why this fits you" fragments.** Collect every question where the player selected the option scoring their **primary** archetype. Choose up to **3**, prioritising **Chapter 1 → Chapter 2 → Chapter 3** (behaviour is the most convincing evidence). Store their `evidence` fragments in `Result.whyFragments`.
*Edge case:* if the primary has fewer than 3 matching selections (possible in a very flat spread), top up from the next-highest archetype's selected options so the reveal always shows **at least 2** fragments.

---

## 7. Result — reveal sequence & cards

### Reveal build order (the result screen)

1. **Anticipation beat** — a brief hold before anything resolves.
2. **Archetype name**, large, in its colour, with its emblem. Nothing else on screen yet — let it land.
3. **DM-DNA spread** bar animates in beneath the name; the clarity label sits beside or above it.
4. **"Why this fits you"** — compose from `whyFragments`:
   *"You're The [Primary] because [frag 1], [frag 2], and [frag 3]."*
5. **Card details unfold** — reflect-back → this-is-you → strengths → you-play-like → your-edge → first step.
6. **Aspiration bridge** (below).
7. **Share card + next-step CTA.**

### Aspiration bridge (from primary vs `aspirationArchetype`)

- **Different** → *"You play as a **[Primary]** today — but you want to become a **[Aspiration]**. Your path is the bridge between them."* → CTA into the **[Aspiration]-directed** plan.
- **Same** → *"You want to become a **[Aspiration]** — and that's exactly who you already are. Now let's make it elite."* → CTA into the **[Primary] mastery** plan.
- **Aspiration = your secondary** → *"You're a **[Primary]** shading **[Secondary]** — and the **[Secondary]** is who you want to become. You're already on the path."* → CTA.

> The aspiration bridge is the seam where the assessment hands off into the app's core loop. The tension between *who you are* and *who you want to be* is the reason a player taps "start my path."

> **Exemplar note (non-blocking).** The "you play like…" names anchor felt accuracy, but they date over time and the youngest users may not know Makélélé, Pirlo, or Yaya Touré. Keep them current, and consider a five-word "why" beside each name so it still lands. Not required for v1.

---

#### ⚽ THE DESTROYER — *The Ball-Winner* · crimson
**Reflect-back:** "You want to win the ball back and dominate the midfield battle — the enforcer."
**This is you:** The enforcer. Aggressive, physical, relentless, you break up attacks and win possession for your team. Where there's a battle, you're winning it.
**Strengths:** Tackling & ball-winning · Physical duels · Disruption
**You play like:** Casemiro, N'Golo Kanté, Claude Makélélé
**Your edge:** Passing and composure on the ball, so winning it turns cleanly into keeping it.
**First step this week:** Win your duels and tackles first — then make a clean, simple pass every time you win it back.
**Next-step button:** *Your Destroyer path starts with winning the midfield battle →*
**Share:** "I'm The Destroyer ⚽ — I win the ball back. Which midfielder are you?"

---

#### ⚽ THE SENTINEL — *The Positioning Master* · deep gold
**Reflect-back:** "You read the game and cut out danger before it builds — you defend with your brain."
**This is you:** The shield. You anticipate, position perfectly, and snuff out attacks before they become chances. You rarely need to tackle because you're already there.
**Strengths:** Anticipation & interceptions · Positioning · Defensive organization
**You play like:** Sergio Busquets, Rodri, Fabinho
**Your edge:** Physical presence in duels, so you can win it when reading alone isn't enough.
**First step this week:** Before each opposition attack, predict the pass and step to intercept — count how many you cut out.
**Next-step button:** *Your Sentinel path starts with reading the game →*
**Share:** "I'm The Sentinel ⚽ — I read danger before it builds. Which midfielder are you?"

---

#### ⚽ THE ARCHITECT — *The Deep-Lying Playmaker* · electric cyan
**Reflect-back:** "You want the ball and to dictate the tempo — the regista everything flows through."
**This is you:** The metronome. From deep, you control the game with your passing range, vision, and tempo. Every attack starts with you.
**Strengths:** Passing range & vision · Tempo control · Progressive distribution
**You play like:** Andrea Pirlo, Xabi Alonso, Toni Kroos
**Your edge:** The defensive side — screening and duels — so you can dictate without being a target to bypass.
**First step this week:** Get on the ball as often as you can and look for one progressive, line-breaking pass every possession.
**Next-step button:** *Your Architect path starts with dictating the tempo →*
**Share:** "I'm The Architect ⚽ — the game flows through me. Which midfielder are you?"

---

#### ⚽ THE WARRIOR — *The Complete Midfielder* · orange
**Reflect-back:** "You want to do everything and cover every area — the complete box-to-box midfielder."
**This is you:** The all-rounder. You defend, carry, pass, and cover — everywhere, all game. No single label fits because you do all of it at a high level.
**Strengths:** Versatility · Work rate & endurance · All-phase contribution
**You play like:** Declan Rice, Aurélien Tchouaméni, Yaya Touré
**Your edge:** One standout weapon — sharpen your ball-winning or your passing so you're elite at something, not just good at everything.
**First step this week:** In one session, deliberately contribute in every phase — win it, carry it, pass it, cover — and notice how often you're involved.
**Next-step button:** *Your Warrior path starts with covering every phase →*
**Share:** "I'm The Warrior ⚽ — I do everything in midfield. Which midfielder are you?"

---

## 8. Handoff checklist for the build

- [ ] Wire the 11 scoring questions to the DM-DNA spread (§6), not a single-winner tally.
- [ ] Implement the clarity label + tie-break (Chapter 1 weighting).
- [ ] Shuffle option order per question, per session `[TEMPLATE]`.
- [ ] Add the `evidence` fragment to every `Option` and compose "why this fits you" at the reveal.
- [ ] Pull Q11 out of scoring; wire it to the aspiration bridge.
- [ ] Persist the full `Response` (raw selections + version + timestamp) locally, attach to account on sign-up `[TEMPLATE]`.
- [ ] Confirm the reveal build order: name → DNA bar → why → card → aspiration bridge → share.
- [ ] **Decision for you:** promote Upgrades 1, 3, 4, 5, 6 to the shared template and retrofit the Goalkeeper module, so all seven positions stay at parity.

---

*Same template, sharper engine — Defensive Midfielder content plugged in. Position 4 of 7.*
