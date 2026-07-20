# The Footballer's Academy — Central Midfielder Archetype Assessment
## Build Spec v2.0 · Corrected

**Position 5 of 7 · Date: 12 July 2026**

---

## 0. How to use this file

Paste this whole document into Claude Design as the brief. It is deliberately self-contained: everything needed to build the module — archetypes, questions, copy, scoring logic, data model, visual direction — is in here. Nothing is left as "see the codex."

**What changed from v1.0, and why:**

| Change | Reason |
|---|---|
| 12 questions → **15** | With 5 archetypes and 4 options per question, 12 × 4 = 48 doesn't divide by 5. The old set gave the Conductor 12 chances to score and the Destroyer only 7. The test was rigged. 15 × 4 = 60 → exactly 12 each. |
| Conductor redefined as **tempo**, not completeness | An archetype that is "all the others, but better" is not an archetype. It over-fires, it flatters, and it kills the share loop. The Conductor now owns a specific skill: controlling *when* the game goes fast and slow. |
| Chapter 3 rewritten as **Under Pressure** | The old Chapter 3 asked "which midfielder do you want to play like?" — that hands the player the answer key. Every question is now a costly trade-off. |
| **Dynamo folded into Engine** | The codex says five archetypes (Conductor, Engine, Maestro, Carrier, Destroyer). The Profiling Framework says four and includes a Dynamo. They must not disagree. The Dynamo's identity (relentless high pressing) lives inside the Engine. |
| Engine moves **off orange** | Gold + orange + crimson collapse into one another under red–green colour blindness, which affects roughly 1 in 12 boys. Three of five bars would be unreadable to a large slice of the audience. |
| Scoring normalised by **opportunity** | Safety net. See §5. |

**Also required (outside this build):** add a Destroyer chapter to `Central_Midfielder_Archetype_System__Complete_Profiling_Framework.md`, fold its Dynamo into the Engine, and correct the Conductor's role models in `Central_Midfielder_Youth_Development_Economic_Framework.md` (currently Busquets / Carrick / Jorginho, which describe a deep-lying playmaker, not the Conductor as defined here).

---

## 1. Scope

**What this is:** a self-report questionnaire that profiles a young central midfielder into one of five archetypes, reveals it cinematically, and hands them one concrete thing to do this week.

**In v1:**
- Welcome → 15 questions in 3 chapters → cinematic reveal → result + share card → first development step
- Frontend only. All state in memory. No backend, no login, no database.
- Works on a phone first. Assume a 390px viewport.

**Not in v1 — do not build these, do not hint at them:**
- No video upload, no biometric measurement, no camera
- No prediction of any kind — not trajectory, not injury, not "readiness"
- No accuracy claims, no percentages of any kind on the marketing or result screens ("94% accurate", "validated on X players"). Not one. Those numbers do not exist yet.
- No `localStorage`, `sessionStorage`, or any browser storage API
- No account, no email capture before the result is shown

---

## 2. The five archetypes — canonical definitions

These five, in this form, are now the single source of truth. Each owns **one specific thing**. None is a superset of another. None is "the best."

### The Conductor — *tempo*
Decides *when*. The reference point every pass comes back to. Speeds the game up, slows it down, and makes it run at the pace they choose. Not the player who does everything — the player who decides how fast everything happens.

### The Maestro — *the decisive moment*
Decides *what*. Sees the picture two seconds early and plays the pass that changes it. One ball, one chance, game over.

### The Carrier — *the line*
Decides *where*. Eliminates opponents by travelling. Takes the ball through the line at their feet, and the whole shape has to move.

### The Engine — *volume*
Decides *how much*. Covers more ground than anyone, presses relentlessly, is always there. Absorbs what was previously called the Dynamo: the high presser who forces the mistake.

### The Destroyer — *the stop*
Decides *whether*. Wins the duel, screens the space, and takes the ball off the other team's best player. Not a servant to the creatives — the player who decides where the game is allowed to be played.

### Elite share

Present these as approximate and non-additive; do not display a hard percentage on any screen until you have real data.

| Archetype | Approx. elite share | Home trait |
|---|---|---|
| Conductor | 30–35% | `control` |
| Engine | 25–30% | `intensity` |
| Maestro | 20–25% | `creation` |
| Carrier | 15–20% | `progression` |
| Destroyer | 10–15% | `duel` |

---

## 3. Trait dimensions — the shared schema

Five keys. Every question option is tagged with exactly one.

| Key | What it measures | Trainable as |
|---|---|---|
| `control` | Tempo, rhythm, game management, reading the phase | Receiving under pressure, scanning, first-touch direction, game-state work |
| `creation` | Vision, chance creation, final-pass decision-making | Passing range, third-man patterns, final-third rehearsals |
| `progression` | Carrying, line-breaking, driving | Ball manipulation, 1v1 carrying, press-resistance on the turn |
| `intensity` | Ground covered, work rate, pressing | Aerobic base, repeated sprint ability, press triggers |
| `duel` | Ball-winning, tackling, screening, physical contest | Duel technique, body positioning, timing the challenge |

**Be honest about what this gives you in v1.** The trait spread will closely track the archetype spread, because each archetype is largely *defined* by its trait. It is not an independent second signal today, and you should not present it as one.

Its real job is this: when you eventually log real match events, you will measure the same five keys from behaviour — passes under pressure, key passes, progressive carries, distance covered, duels won. Then you can ask the question no one in your field can currently answer: **do self-reported Destroyers actually win more duels?** That comparison — stated profile vs. observed profile — is the validation loop, and it is the only thing that will ever turn this from a personality quiz into science.

You cannot collect that data retroactively. So the keys go in now, even though today they do almost nothing. Put the field where it will eventually need to live; schema changes are expensive, near-empty fields are cheap.

---

## 4. The assessment

15 questions · 3 chapters of 5 · 4 options each · one archetype omitted per question.

**Rendering rule:** shuffle option order per session. Do not always show them A/B/C/D in the order written here. People disproportionately pick the first plausible option they read, and a fixed order bakes that bias into every result.

### Chapter 1 — On the ball

**Q1.** You receive in central midfield with time, and the game in front of you. Your first instinct:
- Take a touch, lift my head, and set the pace — the game moves at my speed. → `conductor` / `control`
- Look for the one pass that breaks them open. → `maestro` / `creation`
- Drive straight at the line and carry through it. → `carrier` / `progression`
- Move it early and sprint past it to get into the attack. → `engine` / `intensity`

**Q2.** You're 1–0 up with 20 minutes left and the game is getting stretched. You:
- Take the sting out of it — slow the tempo, keep the ball, make them chase. → `conductor` / `control`
- Go for the second. One more pass and it's finished. → `maestro` / `creation`
- Carry us up the pitch every time we win it, so we're never pinned back. → `carrier` / `control`
- Keep running. Press, cover, outwork them for 20 more minutes. → `engine` / `intensity`

**Q3.** You're under heavy pressure in your own half, back to goal. You:
- One touch, out to the free man, before the press lands. → `conductor` / `control`
- Turn out of it and find the pass that hurts them on the turnover. → `maestro` / `creation`
- Ride the challenge and carry out of trouble myself. → `carrier` / `progression`
- Shield it, take the contact, win the foul. → `destroyer` / `duel`

**Q4.** The training drill you'd happily do for an extra hour:
- Passing patterns — finding the ball through the lines. → `maestro` / `creation`
- Carrying through gates under pressure, 1v1s. → `carrier` / `progression`
- Pressing games and box-to-box shuttles. → `engine` / `intensity`
- Duel work — winning the ball cleanly and coming out with it. → `destroyer` / `duel`

**Q5.** It's 0–0 and the game is stuck. Nothing is coming off. You:
- Take charge of the rhythm — get on it constantly, move them side to side until they crack. → `conductor` / `control`
- Try the pass nobody expects, even if it might not come off. → `maestro` / `creation`
- Take it myself and run at them until something breaks. → `carrier` / `progression`
- Win it back high and hard, and force the mistake that gives us the chance. → `destroyer` / `duel`

### Chapter 2 — Off the ball

**Q6.** The opposition is building from the back. You:
- Hold the shape and own the space in front of our back four. Nothing comes through me. → `conductor` / `control`
- Stay high and ready — the second we win it, I'm the one driving at them. → `carrier` / `progression`
- Press. Press again. Keep pressing until they crack. → `engine` / `intensity`
- Pick my moment and take the ball off their best player. → `destroyer` / `duel`

**Q7.** You've just lost the ball and their counter is on. You:
- Read where it's going and get in front of it before it develops. → `conductor` / `control`
- Hold my shape and stay available — I'm the one who turns the recovery into an attack. → `maestro` / `creation`
- Sprint sixty yards back. I'll get there. → `engine` / `intensity`
- Stop it right now. Take the tactical foul and the yellow. → `destroyer` / `duel`

**Q8.** Your manager tells you the opposition's best player is their number 10, and dealing with him is your job. You:
- Sit in his shadow and take away the space he wants. He never gets to receive. → `conductor` / `control`
- Forget him. The best way to stop him is for us to have the ball — and I'll be the one carrying it. → `carrier` / `progression`
- Follow him everywhere. All game. He doesn't get a metre. → `engine` / `intensity`
- Get tight, win the first duel, and set the tone. → `destroyer` / `duel`

**Q9.** You're defending a corner, standing on the edge of the box. You:
- Organise it. I'm pointing, talking, making sure everyone's where they should be. → `conductor` / `control`
- Stay just outside, ready to take the clearance and start the counter. → `maestro` / `creation`
- Track the runner. Whoever moves, I'm with him. → `engine` / `intensity`
- Attack the first ball. It's mine. → `destroyer` / `duel`

**Q10.** You're 1–0 down with ten minutes left and you are exhausted. You:
- Demand the ball every single time. I'll create something on empty legs. → `maestro` / `creation`
- Pick it up deep and drive at them. I'll get us up the pitch myself. → `carrier` / `progression`
- Find another lung. Press, run, chase every ball for ten more minutes. → `engine` / `intensity`
- Win one back, high and hard. One turnover and we're level. → `destroyer` / `duel`

### Chapter 3 — Under pressure

**Q11.** Your coach says you can work on exactly one thing this season, and nothing else. You pick:
- My range and my vision. I want to see and hit passes nobody else can. → `maestro` / `creation`
- My carrying. I want to be able to take the ball through anyone. → `carrier` / `progression`
- My engine. I want to still be running when everyone else has stopped. → `engine` / `intensity`
- My duels. I want to win every 50-50 on the pitch. → `destroyer` / `duel`

**Q12.** After a 0–0 where you played well, the thing that would still annoy you on the drive home:
- The game never settled into my rhythm. It was chaos and I couldn't control it. → `conductor` / `control`
- I never got the chance to play the pass that would have won it. → `maestro` / `creation`
- The system pinned me back. I was never allowed to drive forward. → `carrier` / `progression`
- I wasn't in enough of it. I should have covered more ground. → `engine` / `intensity`

**Q13.** Two scouts are watching and you can only show them one thing. You show them:
- That I ran the game. Every phase went through me, at my tempo. → `conductor` / `control`
- That I can pick the ball up and carry it through a whole team. → `carrier` / `progression`
- That I covered more ground than anyone on the pitch. → `engine` / `intensity`
- That I won everything, and nothing got past me. → `destroyer` / `duel`

**Q14.** Your team has a brilliant creative teammate who needs total freedom. Making that work means you:
- Set the tempo around him — feed him at the right moment, in the right rhythm. → `conductor` / `control`
- Match him. Two creators are better than one, and I want that freedom too. → `maestro` / `creation`
- Carry the ball to him. I get us up the pitch, he finishes the job. → `carrier` / `progression`
- Do his defending for him. He creates; I make sure it costs us nothing. → `destroyer` / `duel`

**Q15.** The moment from a game you'd rewatch first:
- The fifteen minutes where the whole game moved at exactly the speed I wanted. → `conductor` / `control`
- The pass that split them open. → `maestro` / `creation`
- The 88th minute, still sprinting back. → `engine` / `intensity`
- The tackle that stopped the game dead. → `destroyer` / `duel`

### Balance proof — verify this before you ship

Each archetype is omitted from exactly 3 questions, and therefore appears in exactly 12.

| Archetype | Omitted from | Appears in |
|---|---|---|
| Conductor | Q4, Q10, Q11 | **12** |
| Maestro | Q6, Q8, Q13 | **12** |
| Carrier | Q7, Q9, Q15 | **12** |
| Engine | Q3, Q5, Q14 | **12** |
| Destroyer | Q1, Q2, Q12 | **12** |

Total option slots: 15 × 4 = 60 = 5 × 12. ✓

If you edit a question, re-run this table. The scoring engine below also checks it for you at runtime.

---

## 5. Scoring engine

```js
const ARCHETYPES = ['conductor', 'maestro', 'carrier', 'engine', 'destroyer'];
const TRAITS = ['control', 'creation', 'progression', 'intensity', 'duel'];

const zeroed = (keys) => Object.fromEntries(keys.map(k => [k, 0]));

// How many times was each archetype even OFFERED?
// Derived from the question data — never hardcoded. If you rewrite a
// question tomorrow, this stays correct on its own.
function countOffers(questions) {
  const offered = zeroed(ARCHETYPES);
  for (const q of questions) {
    for (const opt of q.options) offered[opt.archetypeId] += 1;
  }
  return offered;
}

// Run this once at startup. It should print nothing.
function checkBalance(questions) {
  const offered = countOffers(questions);
  const counts = Object.values(offered);
  const balanced = Math.min(...counts) === Math.max(...counts);
  if (!balanced) {
    console.warn('Question set is unbalanced:', offered,
      '— scoring will still normalise, but rebalance if you can.');
  }
  return balanced;
}

function scoreAssessment(questions, answers) {
  const offered = countOffers(questions);
  const picked = zeroed(ARCHETYPES);
  const traits = zeroed(TRAITS);

  for (const q of questions) {
    const chosenId = answers[q.id];
    if (!chosenId) continue;
    const opt = q.options.find(o => o.id === chosenId);
    if (!opt) continue;
    picked[opt.archetypeId] += 1;
    traits[opt.traitDimension] += 1;
  }

  // Affinity: of the times this archetype was offered, how often did you take it?
  const affinity = {};
  for (const a of ARCHETYPES) {
    affinity[a] = offered[a] === 0 ? 0 : picked[a] / offered[a];
  }

  const totalAffinity = Object.values(affinity).reduce((s, v) => s + v, 0);
  const spread = {};
  for (const a of ARCHETYPES) {
    spread[a] = totalAffinity === 0 ? 0
      : Math.round((affinity[a] / totalAffinity) * 100);
  }

  const answered = Object.values(picked).reduce((s, v) => s + v, 0);
  const traitSpread = {};
  for (const t of TRAITS) {
    traitSpread[t] = answered === 0 ? 0 : Math.round((traits[t] / answered) * 100);
  }

  const ranked = [...ARCHETYPES].sort((a, b) => spread[b] - spread[a]);
  const primary = ranked[0];
  const secondary = ranked[1];
  const gap = spread[primary] - spread[secondary];

  return {
    offered, picked, spread, traitSpread,
    primary,
    secondary,
    isHybrid: gap <= 8,           // ≈ within one pick on the balanced 15-Q set
    clarity: spread[primary],     // <30 means they're genuinely unsettled
    shadeKey: `${primary}-${secondary}`
  };
}
```

**Why normalise when the question set is already perfectly balanced?**

You're right that it's redundant *today*. With 12 offers each, dividing by 12 changes nothing about the ranking. Keep it anyway — it's a safety net. The day you edit a question and accidentally give the Conductor thirteen slots and the Destroyer eleven, raw counting breaks silently and nobody notices for six months. Normalised scoring corrects itself and `checkBalance` shouts at you in the console.

This is the habit worth taking from this whole file: **write code that stays correct when the data changes under it.**

**`clarity`** is the primary's share. If it comes back under 30, that player genuinely hasn't settled into an archetype yet. Don't force a label on them and don't hide the reveal — show the archetype, then add one quiet line under it: *"You're still forming. At your age that's not a weakness — it's the window."* For a 13-year-old that's more truthful and more motivating than false precision.

---

## 6. Result content

### Card structure (every archetype has all of these)

`id · name · tagline · reflectBack · identity · strengths[3] · exemplars[3] · developmentEdge · firstStep · nextStepCTA · color · emblem · shareCopy`

---

#### THE CONDUCTOR — *tempo* · deep gold · metronome

- **Reflect back:** "You don't want to be everywhere. You want the game to run at your speed."
- **This is you:** You decide *when*. The reference point every pass comes back to. You slow it down when it's frantic and speed it up when they're comfortable, and the whole team plays at the pace you choose. Not the player who does everything — the player who sets the rhythm everyone else plays to.
- **Strengths:** Tempo control · Press resistance · Reading the phase
- **You play like:** Toni Kroos, Luka Modrić, Ilkay Gündoğan
- **Your edge:** You can control a game for ninety minutes and still not decide it. Control without a decisive moment is a draw. Find the one pass, one run, one shot that turns your rhythm into a result.
- **First step this week:** In one game, deliberately change the tempo twice — once to slow it down when your team is rattled, once to speed it up when they've gone flat. Notice whether the team follows you.
- **Next step:** *Your Conductor path starts with owning the tempo →*
- **Share:** "I'm The Conductor ⚽ — the game runs at my speed. Which midfielder are you?"

---

#### THE MAESTRO — *the decisive moment* · violet · key

- **Reflect back:** "You're not trying to control the game. You're waiting for the one moment that ends it."
- **This is you:** You decide *what*. You see the picture two seconds before anyone else and play the pass that changes it. One ball, one chance, done. Everyone else builds the attack. You finish the thought.
- **Strengths:** Vision · Passing range · Chance creation
- **You play like:** Kevin De Bruyne, David Silva, Cesc Fàbregas
- **Your edge:** When the ball isn't near you, you disappear. A creator who's a passenger out of possession is a luxury, and at some level, luxuries get left out. Learn to be useful in the twenty minutes a game where nothing is coming to you.
- **First step this week:** Every time you receive, look up *before* your first touch and find one option nobody else has seen. Count how many times you actually play it.
- **Next step:** *Your Maestro path starts with seeing it first →*
- **Share:** "I'm The Maestro ⚽ — I see the pass before it exists. Which midfielder are you?"

---

#### THE CARRIER — *the line* · electric blue · chevron

- **Reflect back:** "You don't want to pass through them. You want to go through them."
- **This is you:** You decide *where*. You eliminate opponents by travelling — ball at your feet, straight at the line, and their whole shape has to move to deal with you. A pass can be tracked. A carry has to be stopped.
- **Strengths:** Progressive carrying · Close control under pressure · Line-breaking
- **You play like:** Yaya Touré, Frenkie de Jong, Nicolò Barella
- **Your edge:** Carrying isn't producing. You break the line, and then the move dies, and the highlight reel looks better than the scoreline. Add the pass or the shot at the end of the carry, or the carry was just a nice run.
- **First step this week:** Count your progressive carries in one game — every time you take the ball forward past an opponent. Then count how many ended in a shot or a chance. That second number is your real one.
- **Next step:** *Your Carrier path starts with breaking the line →*
- **Share:** "I'm The Carrier ⚽ — I take it through them. Which midfielder are you?"

---

#### THE ENGINE — *volume* · teal · piston

- **Reflect back:** "You want to be in every single moment of the game, and you're prepared to run until it hurts."
- **This is you:** You decide *how much*. You cover more ground than anyone, you press until they break, and you're in both boxes in the same minute. Other players have a good twenty minutes. You have ninety.
- **Strengths:** Endurance · Pressing intensity · Box-to-box coverage
- **You play like:** Federico Valverde, Arturo Vidal, Georginio Wijnaldum
- **Your edge:** You're always there and rarely decisive. Work rate gets you into every team at one level and out of every team at the next. Pick one signature quality — a pass, a shot, a duel — and make it elite, so the running comes with an end product.
- **First step this week:** Pick one game. Get into the opposition box and your own box in the same attacking sequence, three separate times. Then ask what you actually *did* when you got there.
- **Next step:** *Your Engine path starts with covering every blade →*
- **Share:** "I'm The Engine ⚽ — ninety minutes, every blade of grass. Which midfielder are you?"

---

#### THE DESTROYER — *the stop* · crimson · shield

- **Reflect back:** "You've worked out that the fastest way to win the ball is to go and take it."
- **This is you:** You decide *whether*. You take the ball off the other team's best player and you decide where the game is allowed to be played. This is not the dirty work that lets someone else shine — Kanté won a league, a Champions League and a World Cup as the most important player on the pitch.
- **Strengths:** Ball-winning · Duels and timing · Screening the space
- **You play like:** N'Golo Kanté, Declan Rice, Wilfred Ndidi
- **Your edge:** You win it and you give it away. A turnover you can't use is just a delay. The gap between a good ball-winner and an elite one is entirely in the six seconds *after* the tackle.
- **First step this week:** Win your duels first — then track what happens next. Every regain, make one clean, simple, forward pass. Count how many survive.
- **Next step:** *Your Destroyer path starts with the six seconds after the tackle →*
- **Share:** "I'm The Destroyer ⚽ — I decide where this game gets played. Which midfielder are you?"

---

### Hybrid shades

Show when `isHybrid` is true. One line, under the primary name, in the secondary's colour. Key on `shadeKey` (`primary-secondary`).

| Key | Line |
|---|---|
| `conductor-maestro` | Rhythm with a knife in it. You control the game — and when the picture opens, you're the one who sees it. |
| `conductor-carrier` | Control that suddenly accelerates. You set the tempo, then break it yourself when you see the line. |
| `conductor-engine` | You run the game, and you run all game. Tempo backed by lungs. |
| `conductor-destroyer` | You control where the game is played — and if they won't come to your rhythm, you take it off them. |
| `maestro-conductor` | You build the moment before you strike. You create, but you want the game at your speed first. |
| `maestro-carrier` | You'd rather pass through them — but if the pass isn't on, you'll take it through them yourself. |
| `maestro-engine` | A creator who does the running. Rare, and the reason managers trust you. |
| `maestro-destroyer` | Silk with a fist in it. You make the game, and you're not afraid of the ugly part. |
| `carrier-conductor` | You drive — but you know when to slow it down and let the game breathe. |
| `carrier-maestro` | You carry until the picture opens, then you play the pass. Progression that ends in a chance. |
| `carrier-engine` | Relentless progression. You cover the ground, and you cover it with the ball. |
| `carrier-destroyer` | Turnover to final third in one movement. You win it, and you go. |
| `engine-conductor` | Volume with a brain. You cover everything, and you're thinking the whole time. |
| `engine-maestro` | Work rate that produces. You outrun them, and you can hurt them too. |
| `engine-carrier` | You get everywhere — and you're happiest getting there with the ball. |
| `engine-destroyer` | Relentless and ruthless. You press them into the mistake and take what's left. |
| `destroyer-conductor` | The ball-winner who can play. You win it, and you know exactly what to do with it. |
| `destroyer-maestro` | The turnover is your assist. You take it off them, and then you hurt them. |
| `destroyer-carrier` | From tackle to final third without stopping. You win it and you drive. |
| `destroyer-engine` | Nothing gets past, and nothing gets away. You win everything, everywhere, all game. |

---

## 7. Visual direction

### The thesis

Before you're profiled, the app has no colour. It is pitch and chalk — a game at night, under floodlights, before anyone has said your name. **The reveal is the moment colour enters the product, and it is *your* colour.** From that point on, your archetype's hue owns the interface: the buttons, the progress rings, the plan.

That is the signature. Spend the boldness there and keep everything around it disciplined.

### Tokens

```
--pitch        #0E1A14   page background — deep green-black, grass under floodlights
--surface      #16241D   cards
--chalk        #E8E6DF   primary text, pitch markings — warm white, not pure white
--chalk-muted  #7E8B84   secondary text
--line         #24352C   hairline borders

Archetype accents (the only saturated colour on screen):
--conductor    #D9A521   deep gold
--maestro      #7C5CE0   violet
--carrier      #2E9BE8   electric blue
--engine       #1FB588   teal
--destroyer    #E0413C   crimson
```

### Type

- **Display** (archetype name, chapter titles): **Anton**. Condensed, heavy, uppercase — this is the shirt-back vernacular, and it's the reason the reveal will feel like a name going up rather than a quiz result.
- **Body:** **Karla**. A grotesque with enough humanist character to not read as a default.
- **Data** (spread percentages): **IBM Plex Mono**. Numbers should look like measurements.

### Colour is never load-bearing

Roughly one in twelve boys has a red–green colour deficiency, and your audience is overwhelmingly teenage boys. On the five-bar spread chart, **every bar carries its colour, its emblem, its name, and a distinct fill pattern** (solid / diagonal hatch / dots / cross-hatch / horizontal rule). A player who can't tell gold from crimson must still be able to read the chart perfectly.

The palette above already moves the Engine off orange for this reason — gold, orange and crimson collapse into one another under deuteranopia and three of your five bars would have been unreadable.

**Verify it, don't trust me:** Chrome DevTools → open the command menu (Cmd/Ctrl + Shift + P) → "Show Rendering" → *Emulate vision deficiencies*. Cycle through protanopia, deuteranopia, and achromatopsia and look at your own spread chart. It's free, it takes thirty seconds, and it will change your palette.

### Emblems

One idea each, legible at 40px, single-colour, no detail that vanishes at small sizes.

| Archetype | Emblem | Why |
|---|---|---|
| Conductor | Metronome | The identity *is* tempo |
| Maestro | Key | Unlocks them |
| Carrier | Chevron breaking a horizontal line | The line, and the going-through-it |
| Engine | Piston | Perpetual motion |
| Destroyer | Shield | Nothing gets past |

### Motion

One orchestrated moment — the reveal — and nothing else. Scattered micro-animations are the fastest way to make this look AI-generated. Honour `prefers-reduced-motion`: if it's set, the reveal still happens, just without the choreography.

---

## 8. The flow

```
Welcome  →  Chapter 1 (Q1–5)  →  Chapter 2 (Q6–10)  →  Chapter 3 (Q11–15)
         →  The anticipation beat
         →  The reveal
         →  Result + spread + share card
         →  First step
```

### Questions

One question per screen. Chaptered progress — a player should always know they're on question 3 of 5 in chapter 2 of 3, not "question 8 of 15." Chapters make a long test feel short.

### The anticipation beat — this is the most important screen in the product

**Do not fake-load.** Do not spin a progress ring for three seconds while pretending to compute. Teenagers clock it instantly and it reads as manipulation, and it is.

Instead, the beat is built entirely from **their own answers, replayed back to them**. A tactics board — a chalk-line pitch, top-down, on the `--pitch` background. One at a time, five of the choices they actually made are drawn onto it as chalk marks and stated as facts, each held for about 700ms:

> *You chose to shield it and take the contact.*
> *You chose to stop the counter and take the yellow.*
> *You chose to win it high and force the mistake.*
> *You chose the duel over the pass.*
> *You chose the tackle that stopped the game dead.*

Then, in the same beat, the reflect-back line — the last thing before the name:

> *You've worked out that the fastest way to win the ball is to go and take it.*

**Then** the name lands: full-bleed, Anton, huge, in the archetype's colour, with the emblem. The chalk board floods with it.

That's an anticipation beat made of earned content. It costs you nothing to build, and it is the difference between a horoscope and a moment of recognition.

**Selecting which five answers to replay:** take the player's picks that scored their *primary* archetype, in question order, and use the first five. If they have fewer than five, top up with picks that scored their secondary.

### The result

1. Archetype name + emblem + tagline
2. Shade line (if `isHybrid`)
3. "This is you" paragraph
4. The five-bar spread — all five, ordered high to low, colour + emblem + name + pattern
5. Strengths, exemplars
6. **Your edge** — do not soften this and do not bury it. A profile with no uncomfortable truth in it is a horoscope.
7. First step this week
8. Share card
9. Next-step CTA

### The share card

Downloadable/screenshottable image. Archetype colour, emblem, name, the one-line `shareCopy`, and the question that drives the loop: *"Which midfielder are you?"*

The share loop only works if a group of teammates gets **different results**. That's the entire commercial reason the scoring in §4–5 had to be fixed.

---

## 9. Data model

```ts
type ArchetypeId = 'conductor' | 'maestro' | 'carrier' | 'engine' | 'destroyer';
type TraitId = 'control' | 'creation' | 'progression' | 'intensity' | 'duel';

interface Archetype {
  id: ArchetypeId;
  name: string;              // "The Conductor"
  tagline: string;           // "tempo"
  reflectBack: string;
  identity: string;          // the "this is you" paragraph
  strengths: string[];       // exactly 3
  exemplars: string[];       // exactly 3
  developmentEdge: string;   // the real, uncomfortable one
  firstStep: string;
  nextStepCTA: string;
  color: string;             // hex
  emblem: string;            // asset key
  shareCopy: string;
  homeTrait: TraitId;
}

interface Chapter { id: string; number: 1 | 2 | 3; title: string; }

interface Question {
  id: string;                // "q1"
  chapterId: string;
  order: number;
  prompt: string;
  options: Option[];         // exactly 4
}

interface Option {
  id: string;                // "q1a"
  questionId: string;
  label: string;
  archetypeId: ArchetypeId;
  traitDimension: TraitId;
}

interface Assessment {
  version: string;           // "cm-2.0" — REQUIRED. See below.
  positionId: 'cm';
  archetypes: Archetype[];
  chapters: Chapter[];
  questions: Question[];     // 15
}

interface Result {
  assessmentVersion: string; // which question set produced this
  takenAt: string;           // ISO timestamp
  answers: Record<string, string>;   // questionId -> optionId
  offered: Record<ArchetypeId, number>;
  picked: Record<ArchetypeId, number>;
  spread: Record<ArchetypeId, number>;      // sums to ~100
  traitSpread: Record<TraitId, number>;
  primary: ArchetypeId;
  secondary: ArchetypeId;
  isHybrid: boolean;
  clarity: number;
  shadeKey: string;
}
```

**`version` is not optional.** The moment you retune a question, every result taken before that point was produced by a different instrument. Without the version stamp you can never compare a player's result in January to the same player's result in June — which means progress tracking, the entire point of the player app, is impossible. It costs one string now and it cannot be added retroactively.

### Defined now, built later

Do not build this in v1. Define the keys now so that when you do, the two datasets already speak the same language.

```ts
interface MatchLog {
  id: string;
  playerId: string;
  date: string;
  minutes: number;
  observed: Record<TraitId, number>;  // the SAME five keys as traitDimension
}
```

Stated profile from the questionnaire. Observed profile from real matches. The gap between them is the most interesting number this product will ever produce, and it's the only route to an archetype classifier that isn't guesswork.

---

## 10. Build checklist

- [ ] `checkBalance()` runs at startup and prints nothing
- [ ] Option order shuffles per session
- [ ] Every option carries an `archetypeId` **and** a `traitDimension`
- [ ] `version: 'cm-2.0'` is stamped on every `Result`
- [ ] The spread chart is readable in greyscale and under deuteranopia
- [ ] The anticipation beat replays the player's *real* answers — no fake loading
- [ ] `developmentEdge` is displayed prominently, not buried
- [ ] No browser storage APIs anywhere
- [ ] No accuracy claim, statistic, or percentage appears on any screen except the player's own spread
- [ ] Works on a 390px viewport
- [ ] `prefers-reduced-motion` honoured
- [ ] Keyboard focus is visible on every option

---

*Position-DNA™ · Central Midfielder · Assessment Build Spec v2.0*
