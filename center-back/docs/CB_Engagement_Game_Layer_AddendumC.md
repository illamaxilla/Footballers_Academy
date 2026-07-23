# The Play Layer — Engagement Design
## Addendum C to Build Handoff v2.0 · Games that keep a 15-year-old opening the app

**Date:** 19 July 2026 · **Constraint:** phone, tablet, desktop. No hardware.
**Companion docs:** `Centre_Back_Module_Build_Handoff_v2.md` · `Centre_Back_Research_Gap_Analysis.md` · `Centre_Back_Predictive_Engine_Instrument_Design.md`

---

# PART I — THE PROBLEM THIS SOLVES

## 1. The churn window

The reveal is a one-time event. It's the best thing in the product and it is spent in ninety seconds.

```
Day 0   Assessment → reveal → "That's exactly me" → share
Day 1   Week 1 of the plan: three sessions, a wall, a partner, a ball
Day 2   ...
Day 3   ...  ← this is where you lose them
Day 7   Week 2 unlocks. Nobody is here.
```

Between *"I found out who I am"* and *"I completed a 12-week training plan"* there is a gap that the product currently has nothing in. The plan is homework. Homework is not a reason to open an app on a Tuesday night.

**The play layer's only job is to fill that gap** — to make the app something a player opens because it's fun, not because he's due a session. Everything below is judged on that, not on measurement quality.

## 2. Three categories, and the rule that keeps them honest

| Category | Purpose | Affects the archetype? | Label in the UI |
|---|---|---|---|
| **Instrument** | Measures something, validated, feeds the engine | Eventually, once validated | "This counts" |
| **Hybrid** | Fun first. Quietly logs a signal we might use later | **No — not until validated** | "Just for fun (we're learning from it)" |
| **Toy** | Pure play. No measurement claim at all | Never | "Just for fun" |

**The rule, and it is not negotiable:**

> **A toy must never pretend to be an instrument.** The moment a fun game says "this changed your archetype," you have spent the credibility the reveal earned. And an instrument must never feel like a test — the moment it does, completion rates collapse.

The good news is that the second half of that rule is free. Every instrument in Addendum B is already a game. The distinction the *player* sees isn't "game vs test" — it's **"this counts" vs "this doesn't."** Be scrupulous about which badge each thing wears, and you can build as many toys as you like without diluting anything.

## 3. Four loops, four different jobs

| Loop | Period | Job | What lives here |
|---|---|---|---|
| **Session** | 2–5 min | "I've got a spare minute" | Speed games, survival modes |
| **Daily** | 30 s | "Did you do today's?" | The Daily Read — one shared scenario |
| **Weekly** | 20 min | Progress you can feel | Plan sessions, House standings, film upload |
| **Seasonal** | 12 weeks | "Have I changed?" | Archetype retest and drift, career arc |

Most football apps build only the weekly loop, which is why they're used for two weeks. **The daily loop is the one that creates a habit, and it's the cheapest of the four to build.**

---

# PART II — THE ORGANISING PRINCIPLES

## 4. Reward each archetype the way its own psychology says it wants to be rewarded

This is the strongest idea in this document, and it's yours already — it's sitting in the Archetype System profiling framework, unused.

The codex gives each archetype a full motivational profile. Read across them and a design brief falls out:

| Archetype | Mastery / Ego | Drive | Self-efficacy comes from | **So the reward should be…** |
|---|---|---|---|---|
| **Colossus** | 65% / **75%** — the only ego-dominant archetype | BAS high, BIS low, fight response | Winning duels, dominating a striker | **Head-to-head. Beat someone.** Duel counts, direct challenges, "you outscored 71% of Colossi today" |
| **Architect** | **80%** / 60% | BAS high, BIS moderate | Progressive passes under pressure, breaking a press | **Craft and evidence.** Pass maps, line-breaks found, technical stat lines that look like a professional's |
| **Sentinel** | **85%** / 50% — most mastery-driven, least ego-driven | BAS moderate-high, BIS moderate | Perfect positioning, making it look effortless | **Precision streaks and personal bests.** Never head-to-head. "9 of 10 read correctly, third week running" |
| **Libero** | 82% / 55% | BAS high, BIS moderate | Coverage, enabling teammates | **Variety and contribution.** Rotate the game type; show what your covering allowed others to do |

**Design consequence:** the same event should be reported four different ways. A player completes a hard week of sessions:

- Colossus: *"You out-trained 78% of Colossi this week."*
- Architect: *"Fourth consecutive week of Ball sessions. Your weaker foot is up 22%."*
- Sentinel: *"11 straight sessions, no misses. Your longest run yet."*
- Libero: *"You've now trained all five pillars this month. Nobody else in your age group has."*

Same data. Four framings. One `archetypeId` lookup in the copy layer. **It costs almost nothing to build and no competitor can copy it, because nobody else knows what motivates a Sentinel differently to a Colossus.**

## 5. Make the invisible visible — each archetype's psychological wound is a feature brief

The codex also documents each archetype's *vulnerabilities*. Read those as a product backlog:

| Archetype | Documented vulnerability | The feature that answers it |
|---|---|---|
| **Sentinel** | *"Invisibility complex — if I'm doing my job right, nobody notices."* Interceptions are less visible than tackles | **The Prevention Report.** After a tagged match: *"Six attacks ended before they became anything. Here they are."* Show the danger that never happened |
| **Libero** | *"Contributions hard to quantify."* Identity diffusion, "master of none" anxiety | **The Coverage Map.** A single number for the thing nobody counts, plus: *"Your line played 4m higher when you were on the pitch"* |
| **Architect** | Criticism for risky passing; needs evidence the risk is worth it | **The Progression Ledger.** Line-breaking passes completed vs attempted, and what happened next |
| **Colossus** | Needs the physical win to restore confidence; ego-exposed after being beaten | **The Duel Record.** Head-to-head totals, and a "next duel" reset prompt after a bad one |

Every one of these is a screen built on data you're already collecting from the film tags. **This is the difference between a football app and a football app that understands defenders.**

## 6. The House system — cohorts, never individuals

All social features run **archetype vs archetype**, not player vs player.

```
        THIS WEEK ON THE DAILY READ

  🛡️ SENTINELS   72% correct   ▓▓▓▓▓▓▓▓░░
  🛡️ LIBEROS     66%           ▓▓▓▓▓▓▓░░░
  🛡️ ARCHITECTS  61%           ▓▓▓▓▓▓░░░░
  🛡️ COLOSSI     58%           ▓▓▓▓▓░░░░░

  You're a Colossus. You got today's right.
  You dragged the average up.
```

Why this is the right structure:

1. **It solves the "spent result" problem.** Your archetype stops being a certificate and becomes a team you play for, every day, indefinitely.
2. **It's safe for minors.** No individual ranking of children — which is already a rule (Handoff §10). Cohort standings give you all the competitive energy with none of the harm.
3. **It's tribal, so it's shareable.** "Sentinels won again" is a thing a 15-year-old posts. "I came 4,412th" is not.
4. **It generates a weekly story for free.** Four contenders, one scoreboard, a new winner every week, with no content team.
5. **It quietly does research for you.** If Sentinels genuinely outperform Colossi on the anticipation game week after week, that is convergent validity showing up as a leaderboard — the archetype label predicting behaviour on an independent task. You'd be running Study 4 from Addendum B by accident, on thousands of players.

Point 5 is worth pausing on. **The most fun feature in the app is also the largest validation study you'll ever run.**

---

# PART III — THE GAMES

Ten designs. Each one: what it is, which loop, which category, why it's actually fun, what it quietly tells us, and what it costs to build.

Build cost is rated **S** (a weekend), **M** (a sprint), **L** (a month plus content).

---

## 7. ⭐ THE DAILY READ — the habit engine
**Loop:** Daily · **Category:** Hybrid · **Cost:** M (reuses the occlusion pipeline) · **Priority: build this first**

**What it is.** One scenario a day. Everyone in the world gets the same one. A three-second attack, cut at the critical frame. Four options. One tap. Thirty seconds, then you're out.

Then the reveal that makes it work:

```
   THE DAILY READ · #147

   You said:  through ball to the runner   ✓

   Sentinels     71% correct
   Liberos       64%
   Architects    58%
   Colossi       52%

   Your streak: 12 🛡️
   [ Share ]
```

**Why it's fun.** It's the Wordle shape, and that shape works because of four things it has and most apps don't: it's *finite* (you cannot binge it, so it can't disappoint you), it's *shared* (everyone had the same problem, so it's talkable), it's *fast* (30 seconds beats every excuse), and the *result is interesting even when you're wrong* — because you learn what your archetype tends to see.

**Quiet signal.** Every day, a free occlusion trial on a known scenario, from a known archetype, at a known age. After a year, that's the largest anticipation dataset in youth football, gathered thirty seconds at a time.

**Design notes.**
- **One per day. Hard stop.** Scarcity is what makes it a habit rather than a time-sink. Do not add "play more."
- Streaks forgive one miss per fortnight (Handoff §10) — no streak-shaming a kid who had exams.
- Publish the answer with a one-line coaching explanation. The explanation is the product; the guess is the hook.
- Share card renders the House splits, not the player's identity. Shares an *archetype*, not a child.

---

## 8. HOLD THE LINE — the one everyone will play
**Loop:** Session · **Category:** Hybrid · **Cost:** S

**What it is.** Top-down. Your back four holds a line. The attack builds. **Tap to step up.** Too early and the ball goes over the top behind you. Too late and the striker is onside and through. The window is about 400 ms and it narrows every level.

**Why it's fun.** Pure timing games are the most replayable format on a phone, and this one is *unmistakably a centre back's job*. Nobody else in football makes this decision. Twenty levels, one thumb, instant restart.

**Quiet signal.** `lineTimingBias` — do you systematically step early (aggressive, Colossus/Architect) or late (cautious, Sentinel/Libero)? And `timingVariance`, which is line discipline.

**Design note.** Add a two-line coaching card every five levels: *"Step when the passer's head goes down — not when the ball moves. By then it's late."* The game is the delivery mechanism for the codex.

---

## 9. THE WALL — survival mode
**Loop:** Session · **Category:** Toy · **Cost:** M

**What it is.** Endless waves of attacks. Each one needs a decision — step, hold, cover, clear, or play. One goal conceded and the run ends. How many can you stop?

**Why it's fun.** "One more go." It's the only format here with no ceiling, so it absorbs the player who wants to keep playing after the Daily Read is done. Clean sheets are the centre back's currency, and this is a game entirely made of them.

**Quiet signal.** Decision distribution under escalating pressure. As the waves speed up, does the player collapse toward safe options? That's `riskElasticity` from Addendum B §6.3, measured for free in a game people play voluntarily.

**Design note.** The score is *attacks stopped*, never *goals conceded*. Count what you did, not what you failed to do. That distinction matters more for defenders than for any other position, and it matters most for teenagers.

---

## 10. ⭐ THE PARTNERSHIP — the one nobody else can build
**Loop:** Weekly + social · **Category:** Hybrid · **Cost:** M · **The standout**

**What it is.** Asynchronous **co-operative** two-player. You invite your actual centre-back partner (or a friend, or a random matched player). You both get the same scenario, separately, without seeing each other's answer.

You are the two centre backs.

```
   THE PARTNERSHIP · Round 4

   Striker drops deep. Runner goes in behind.

   You chose:      Step to the striker
   Marcus chose:   Drop and cover the runner

   ✓ COMPLEMENTARY.  One steps, one covers.
     Nothing gets through.

   Chemistry: 7/10 rounds in sync
```

Both step → the runner is through. Both drop → the striker turns and shoots. **You only score when your choices complement each other.**

**Why it's fun.** Co-operative asynchronous play is rare and it's sticky, because the pull isn't a leaderboard — it's *a person waiting on you*. And it is the only game here that is genuinely social without being competitive, which suits the position: centre backs are half of a pair, and no product has ever treated them that way.

**Why it's strategically the most important game in this document.** Partnership is the single most distinctive piece of IP in the Center Back Codex — the compatibility matrix, the pairing logic, the whole partnership thesis. Right now it exists only as text in a document. This turns it into something two teenagers do on a Tuesday night. It's also inherently viral: **every game requires the player to recruit another player.**

**Quiet signal.** `complementarityRate` per archetype pairing. Across thousands of pairs, this tests the codex's own compatibility matrix empirically — do Colossus + Architect pairs really out-perform Colossus + Colossus? You'd find out. **That is a publishable finding and it's your IP being validated by your own users at zero cost.**

**Design note.** Chemistry accrues over rounds and never resets on a loss. Partnerships in football are built over a hundred games — the mechanic should say so.

---

## 11. READ THE STRIKER — speed rounds
**Loop:** Session · **Category:** Hybrid · **Cost:** S (with the animation pipeline)

**What it is.** A frozen attacker. Which way is he going? Left or right. You have 700 ms. Twenty in a row, accelerating. The cues are real ones — hips, plant foot, shoulder, where his eyes are.

**Why it's fun.** It's a reflex game with a genuine skill ceiling. Players will grind it because the improvement is felt, not just displayed.

**Quiet signal.** Spatial-occlusion data — which body cues does this player actually use? Show the same frames with the hips blurred, then with the upper body blurred, and you learn where their information is coming from.

**Design note.** Because it's grindable, it **cannot** feed the archetype (practice effects — see §17). It can teach, and it can inform, and it can be enormous fun. It can't score.

---

## 12. BUILD YOUR BACK LINE — the strategy game
**Loop:** Weekly · **Category:** Toy · **Cost:** M

**What it is.** You're given a formation and a hand of fictional defender cards, each with an archetype and a profile. Pick your back three or four. The app simulates a match and reports what happened — using the codex's actual partnership compatibility logic.

> *You picked two Colossi. You won 19 aerials. You also conceded twice on the counter — nobody covered the space behind.*

**Why it's fun.** Drafting and team-building is one of the most durable formats in existence, and this is a small, honest, no-cost-to-play version of it. Fictional cards only — no real player likenesses, no gambling mechanics, no purchases.

**Quiet signal.** Which pairings does the player intuitively reach for? Weak signal, but interesting.

**Why it earns its place.** It's the most efficient teaching device in the whole product. A player who has drafted twenty back lines *understands* the compatibility matrix — the single most valuable idea in the codex — without having read a word of it. This is your IP delivered as play.

---

## 13. REWIND — find the mistake
**Loop:** Session · **Category:** Toy · **Cost:** M

**What it is.** A goal is conceded. Scrub the timeline back and tap the exact moment it went wrong — and say whose it was. Scored on how close you get to the coaches' consensus frame.

**Why it's fun.** It's a detective puzzle, and it's the single most shareable format here: *"Found it in 2.3 seconds."* It's also the argument every football fan has already been having their entire life, with a scoreboard attached.

**Quiet signal.** Does the player locate errors at the moment of the *tackle*, or at the moment of the *positioning* three seconds earlier? That distinction is the Colossus↔Sentinel axis, and it's visible in a timestamp.

**Design note.** Use anonymised animations, not broadcast clips — rights, and it means never publicly blaming a real named player, least of all a young one.

---

## 14. THE SHOUT — the Voice pillar, finally
**Loop:** Session · **Category:** Hybrid · **Cost:** M

**What it is.** A scenario plays. You have to make the call — **out loud** — into the phone. "Step!" "Hold!" "Away!" "Man on!" "Time!" Browser speech recognition scores whether you said the right thing, and how fast.

**Why it's fun.** It's physical, slightly embarrassing, and completely unlike anything else in the app — which is exactly why it will get shared. And it is genuinely useful: young centre backs are told constantly to organise and communicate, and are almost never given a way to practise it alone.

**Why it matters structurally.** Voice is one of your five pillars and currently the only one with no instrument at all. Leadership and communication run through the entire codex — 184 communications per match in the profiling data — and nothing in the product touches it. This does.

**Quiet signal.** `callLatency` and `callAccuracy`. Also, simply: does this player shout at all? Some won't. That's information, and it's a training target.

**Design notes.**
- Must degrade gracefully to tap-the-call when the mic is denied, unsupported, or the player is on a bus.
- Audio is processed for the word and **discarded immediately**. Never stored, never uploaded. This is a minor's voice — state the rule in the code and in the privacy copy.

---

## 15. SPOT YOUR ACTIONS — turn the work into the game
**Loop:** Weekly · **Category:** Instrument, disguised · **Cost:** M

**What it is.** Film tagging (Gap Analysis §8) is *labour*. Nobody wants to tag a match. So don't ask them to tag — ask them to **spot themselves**.

Your match plays back. Tap every time you do something. The app catches what you tapped and turns it into a report card.

> *You tapped 22 actions. We found 6 ball recoveries, 3 aerials, 19 forward passes at 78%.*
> *Your anticipation index is 0.71 — you won it without tackling in most of your defensive actions. That's a Sentinel number.*

**Why it's fun.** Watching yourself play is intrinsically compelling to every player who has ever existed. The tapping is barely noticed because the reward — seeing your own game turned into a professional-looking stat line — is immediate.

**Why it matters.** This is the highest-value data in the entire product (Addendum B §7), and it was going to be the hardest to collect. Framing it as play is the difference between a feature nobody uses and the engine's best input.

---

## 16. THE SEASON — the long arc
**Loop:** Seasonal · **Category:** Toy · **Cost:** L

**What it is.** A light narrative career. You're a 15-year-old centre back. Each week brings a handful of decisions — a training choice, a match moment, a conversation with a coach, a partner who's struggling. Your archetype changes which options you're offered and how they land.

**Why it's fun.** It's the format that makes people care, and it's cheap to produce relative to its depth: text, a few illustrations, branching.

**Why it earns its place.** It's a stealth delivery system for the entire development pathway in the codex — the physical courage window, growth spurts, partnership building, error recovery, the 80–90% who won't make it. Content that would never be read as a chapter gets absorbed as a story. It's also the mobile seed of the "Defensive Fortress" career-mode concept already in your product portfolio, at roughly 1% of the cost.

---

## Also considered, ranked below the ten

| Idea | Verdict |
|---|---|
| **Set-Piece Sort** — drag markers into zonal/man assignments | Good puzzle, narrow. Build as a mode inside The Wall |
| **Shape Shift** — hold the back four's shape as the ball moves | Satisfying, but overlaps Hold the Line |
| **Guess the Archetype** — watch a clip, name the defender's type | Fun, and it generates human labels on film. Build once you have film |
| **Juggle counter** — count keepy-uppies by camera | Fun, but it's a technical test wearing a hat, and it belongs in the plan, not the play layer |
| **Name the Defender** — identify elite CBs from a style description | Fine as a text quiz. Never with photographs of real players |

---

# PART IV — THE RULES

## 17. Protecting the instruments from the toys

A real technical problem, easy to miss and expensive to discover late.

**Practice effects.** If a player plays *Read the Striker* two hundred times, his occlusion score is no longer comparable to his score on day one — or to anyone else's. The fun version and the measuring version of the same paradigm cannot share a scenario pool.

**The fix — three separate pools, enforced in the schema:**

| Pool | Used by | Rule |
|---|---|---|
| `open` | All toys and hybrids | Unlimited replay, freely repeated |
| `sealed` | Instruments (Addendum B G1–G4) | Each scenario served **once per player, ever** |
| `retest` | The 12-week archetype retest | Never served before the retest |

Budget for this in content: a sealed pool of 60 scenarios and a retest pool of 40, on top of however many the open pool needs. It's a content cost, not an engineering one, but it must be decided before the first scenario is authored or you'll be re-shooting.

**And the corollary:** anything that can be ground for a high score can never move the archetype. That's not a limitation to apologise for — it's what lets the fun games be genuinely fun, with no stakes attached.

## 18. Gamification that's safe for a 15-year-old

The standard toolkit contains several mechanics that work and that we should refuse to use.

### Never
- **Loot boxes, gacha, or any randomised reward with a purchase attached.** Not for minors, not ever, in any jurisdiction.
- **Streak-shaming.** No "you lost your 40-day streak." A streak that punishes an injury or an exam week teaches a player to lie to the app.
- **Artificial scarcity timers designed to create anxiety.** "Play in the next 12 minutes or lose your bonus" is a mechanic aimed at a child's cortisol.
- **Pay-to-continue on a failed run.** The Wall ends when it ends.
- **Individual leaderboards of minors.** Cohorts only (§6).
- **Guilt-framed notifications.** "Your Colossus is getting weaker" is manipulation. Three informational prompts a week, maximum (Handoff §10).
- **Any mechanic that makes not playing feel like a loss.** The test: if the feature works by creating discomfort, cut it.

### Instead
- **Identity over points.** "You're a Sentinel and Sentinels topped the Daily Read" beats any XP number ever designed.
- **Cohorts over individuals.** Same competitive energy, none of the exposure.
- **Forgiveness built in.** Streak shields, no red states, no falling-number animations.
- **Intrinsic over extrinsic.** The strongest retention mechanic available here is **noticing change in yourself** — which is §19, and it's free.
- **A visible ceiling.** One Daily Read a day. Finish it and you're done. An app a teenager can *finish* is an app a parent lets them keep.

## 19. The strongest retention mechanic is already built: archetype drift

At 12 weeks, invite the player to retake the assessment. Then show them the movement.

```
   WEEK 0            WEEK 12

   Colossus  41%  →  Colossus  36%
   Sentinel  28%  →  Architect 31%   ▲
   Architect 19%  →  Sentinel  22%
   Libero    12%  →  Libero    11%

   You've been training your edge.
   It's showing.
```

This is the best feature in the play layer and it needs no new instrument at all.

- **Intrinsically motivating.** People will do a great deal of work to watch themselves change.
- **It validates the plan.** The 12 weeks did something, and here's the receipt.
- **It's honest.** Players genuinely do change, especially through a growth spurt (Gap Analysis §2), and an archetype that can never move would be a worse model of reality.
- **It gives you longitudinal data** — the exact thing Handoff §13.2 says you can't claim anything without.
- **It creates a reason to come back in three months**, which nothing else in the product does.

**Design note.** Use the sealed `retest` pool. Frame movement as evidence of work, never as instability: *"You've been training your edge"* — never *"your result has changed."*

## 20. The honesty rule, in the interface

Every game carries one of two badges. Small, consistent, never buried.

```
🛡️ THIS COUNTS          — instruments; the result feeds your profile
🎮 JUST FOR FUN         — everything else
```

For hybrids: **"Just for fun — we're learning from it."** With a one-tap explanation of what's logged and why, and a switch to turn it off that doesn't degrade the game.

This costs one line of copy per game and buys the thing the whole product runs on. A player who discovers that the fun games were quietly re-scoring him will not trust the reveal — and the reveal is the business.

---

# PART V — BUILDING IT

## 21. One scenario engine, ten games

The single most important architectural decision here: **eight of the ten games are the same renderer with different rules.**

```
                 SCENARIO ENGINE
     top-down pitch · animated actors · timeline
     freeze / occlude / replay · tap & drag input
                        │
   ┌────────┬───────┬───┴────┬────────┬─────────┐
   │        │       │        │        │         │
 Daily    Hold    The      Read     Rewind   Partnership
 Read     Line    Wall     Striker
   │        │       │        │        │         │
   └────────┴───────┴────────┴────────┴─────────┘
                  same engine
        + Cover the Space and What Happens Next?
          from Addendum B — same engine again
```

Build the engine once, properly, and each additional game is a rules file plus scenarios. Skip this and you'll build ten games and be unable to afford the eleventh — or position 3.

**What the engine needs**
- Scenario as **data**: actors, paths, timings, ball, occlusion points, options, correct answer, coach explanation
- Deterministic playback (same scenario, same render, every device)
- Freeze / occlude / scrub / replay
- Tap, drag and timed-tap input
- 60 fps on a mid-range Android from four years ago — that's the real target device, not a new iPhone
- Scenario authoring in JSON, so a coach can write scenarios without touching code

**That last point is the whole content strategy.** If a coach can author a scenario, your Daily Read never runs dry and every future position inherits the pipeline.

## 22. Cost vs value

| Game | Cost | Engagement value | Data value | Build |
|---|---|---|---|---|
| **The Daily Read** | M | ●●●●● | ●●●● | **1st** |
| **Hold the Line** | S | ●●●● | ●●○ | **2nd** |
| **The Partnership** | M | ●●●●● | ●●●●● | **3rd** |
| **Spot Your Actions** | M | ●●● | ●●●●● | **4th** |
| **The Wall** | M | ●●●● | ●●○ | 5th |
| **Read the Striker** | S | ●●● | ●●○ | 6th |
| **The Shout** | M | ●●● | ●●● | 7th |
| **Rewind** | M | ●●● | ●●○ | 8th |
| **Build Your Back Line** | M | ●●● | ● | 9th |
| **The Season** | L | ●●●● | ● | 10th |

**Start with the Daily Read and Hold the Line.** One creates the habit; the other is the thing players will open when they've done the Daily Read and want more. Together they're roughly one sprint on top of the scenario engine, and they change the shape of the retention curve more than the other eight combined.

**Then The Partnership**, because it's the only feature here that recruits new users by itself.

## 23. Schema additions

```jsonc
{
  "games": [
    {
      "id": "daily-read",
      "category": "hybrid",              // instrument | hybrid | toy
      "badge": "fun_learning",           // counts | fun | fun_learning
      "loop": "daily",
      "scenarioPool": "open",            // open | sealed | retest
      "affectsArchetype": false,         // NEVER true without validation
      "logs": ["choice", "latency", "scenarioId"],
      "cohortCompare": true,
      "replayable": false,
      "dailyLimit": 1
    }
  ],
  "rewardCopy": {
    "weekComplete": {
      "colossus":  "You out-trained {pct}% of Colossi this week.",
      "architect": "Fourth week running on the ball. Weaker foot up {n}%.",
      "sentinel":  "{n} straight sessions, no misses. Your longest run yet.",
      "libero":    "All five pillars this month. Nobody else in your age group."
    }
  },
  "houseStandings": { "metric": "dailyReadAccuracy", "period": "week" }
}
```

Same rule as everywhere else in the pack: **games are data, not code.** Position 3 gets the same ten games with different scenarios and different reward copy.

## 24. How we'll know it worked

The play layer is judged on retention, not on measurement. Set these before launch so nobody moves the goalposts afterwards.

| Metric | Why | Target |
|---|---|---|
| **D7 retention** | Does anyone come back after the reveal? | > 30% |
| **D30 retention** | Is it a habit or a novelty? | > 15% |
| **Daily Read completion** | The core habit | > 50% of D7-retained users, 4+ days a week |
| **Sessions per week** | Is it a place they go? | > 3 |
| **Share rate** | Does it spread by itself? | > 10% of results shared |
| **Partnership invites sent** | The only self-recruiting feature | > 15% of active users |
| **Plan session completion** | **The one that actually matters** | > 40% of Week 1 completed |

That last row is the real test. **If the games go up and plan completion doesn't, we've built a nice toy and failed at the job.** The play layer exists to carry players to the training, not to replace it. Watch that number above all the others, and if it decouples, cut games until it reconnects.

---

## 25. What I'd do first

1. **Scenario engine.** One week. Everything depends on it and nothing else can start.
2. **The Daily Read.** One shared scenario a day, House splits, streak with a shield, share card. This is the habit.
3. **Hold the Line.** A weekend's work. The one they'll actually grind.
4. **Archetype-specific reward copy.** Four strings per event. Nearly free, and no competitor can copy it.
5. **The Partnership.** The only feature that brings its own users.
6. **The badge system** (§20) before any of them ship. Retrofitting honesty is much harder than building it in.

Everything else can wait for evidence that players are coming back at all.

---

*Addendum C to Centre Back Module Build Handoff v2.0 · The Footballer's Academy · Position 2 of 7*
