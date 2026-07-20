# Positioning Master — Integrated Architecture
## Digital Analysis + Game (No Pre-Filmed Clips Required)

**Version:** 1.0  
**Core Insight:** User uploads real footage → system analyzes it → extracts key moments → becomes game scenarios (infinite, self-generating library)  
**Outcome:** Eliminates production overhead, creates data flywheel, keeps both assessment AND training aligned to real performance  

---

## The Elegant Solution: Scenario Extraction

### The Workflow

```
USER UPLOADS MATCH FOOTAGE
(30–120 seconds, any match or training)
        ↓
DIGITAL ANALYSIS (MVP: manual annotation)
  • User marks shot moment
  • System calculates pause frame
  • User marks keeper position
  • System scores against oracle
        ↓
SCENARIO EXTRACTION
  • System crops the clip to the key moment
    (120ms before shot through outcome)
  • Saves as a discrete "game scenario"
  • Tags with: scenario type, ball position, 
    keeper class, outcome, oracle data
        ↓
CLIP STORED IN "SCENARIO LIBRARY"
  • Personal library (user's own replays)
  • Squad library (coach shares with team)
  • Public library (anonymized, opt-in sharing)
        ↓
POSITIONING MASTER GAME DRAWS FROM LIBRARY
  • Player launches the game
  • System picks a random clip from available library
  • User repositions the keeper (hypothetically)
  • Gets scored against their actual positioning
  • Compares to oracle
        ↓
RESULT: Training based on REAL FOOTAGE
```

---

## Part 1: No More Production Work

### Why This Solves the Problem

| Approach | Production Effort | Clip Source | Scalability |
|----------|:---:|---|:---:|
| **Original game (pre-filmed)** | HIGH (film 15 clips) | Generic academy scenarios | Limited (only 15) |
| **Your approach (integrated)** | ZERO (users provide) | Real match footage | Infinite (grows with users) |

**The insight:** Every goalkeeper who uploads footage contributes a new training scenario. You don't film anything — they do. Your library grows with every user who joins.

---

## Part 2: Architecture (High-Level)

### Components

```
┌─────────────────────────────────────────────────────────────┐
│  FOOTBALLER'S ACADEMY — POSITIONING MASTER ECOSYSTEM        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐      ┌──────────────────────┐    │
│  │  Digital Analysis    │      │  Positioning Master  │    │
│  │  (Assessment)        │      │  Game (Training)     │    │
│  ├──────────────────────┤      ├──────────────────────┤    │
│  │ 1. User uploads      │      │ 1. Game displays     │    │
│  │    real footage      │      │    scenario          │    │
│  │                      │      │                      │    │
│  │ 2. System analyzes   │      │ 2. User positions    │    │
│  │    (manual/auto)     │      │    keeper avatar     │    │
│  │                      │      │                      │    │
│  │ 3. User annotates    │      │ 3. System scores     │    │
│  │    positioning       │      │    vs oracle         │    │
│  │                      │      │                      │    │
│  │ 4. System scores     │      │ 4. Reveals actual    │    │
│  │    vs oracle         │      │    positioning       │    │
│  │                      │      │                      │    │
│  │ 5. EXTRACTS          │◄────►│ 5. Compares to       │    │
│  │    SCENARIO          │      │    training attempt  │    │
│  └──────────┬───────────┘      └──────┬───────────────┘    │
│             │                         │                     │
│             ▼                         ▼                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SCENARIO LIBRARY                                    │  │
│  │  (Extracted moments from user uploads)               │  │
│  │                                                      │  │
│  │  ├─ Personal (my own replays)                       │  │
│  │  ├─ Squad (coach shares with team)                  │  │
│  │  └─ Public (anonymized, opt-in)                     │  │
│  │                                                      │  │
│  │  [Grows infinitely as users upload]                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Upload                        Analysis                     Scenario Library
────────────────────────────────────────────────────────────────────────────

User's match             Manual annotation          Extracted moment
footage (2 min)          (3 min work)              (5–7 sec clip)
                              ↓                           ↓
                         Oracle scoring         Added to personal library
                         (instant)              + tagged metadata
                              ↓                           ↓
                         Archetype update      Available for game/replay
                              ↓
                     (Assessment complete)
```

---

## Part 3: Scenario Extraction & Tagging

### 3.1 What Gets Extracted

When a user completes the analysis workflow, the system automatically extracts a "scenario" (a discrete moment) from their uploaded footage:

```javascript
const extractedScenario = {
  // Unique ID for this scenario
  scenarioID: "scenario_20260711_abc123_user456_1",
  
  // Source information
  sourceUploadID: "upload_20260711_abc123",
  playerID: "gk_user_456",
  extractionDate: "2026-07-11T14:35:00Z",
  sourceMatch: "Training vs. U19 academy, July 11",
  
  // Video data
  video: {
    filename: "extracted_scenario_abc123_1.mp4",
    startFrame_ms: 1200, // Start at pause frame
    endFrame_ms: 3500,   // End after outcome is clear
    duration_ms: 2300,
    resolution: "1920x1080",
    framerate: 60
  },
  
  // Positioning & Oracle data
  positioning: {
    class: "retrieved_centered",
    keeperDepth_m: 3.2,
    keeperLaterality: "centered",
    ballPosition: { x: 300, y: 120 },
    ballZone: "central",
    ballDistance_m: 22
  },
  
  // Scenario classification
  scenario: {
    type: "central-far",
    ballZone: "central",
    ballDistance_category: "far",
    isCross: false,
    defenseBalance: "balanced"
  },
  
  // Actual outcome (ground truth)
  actualOutcome: {
    result: "save",
    keeperPositioningScore: 89,
    oracleGoalProbability: 0.58
  },
  
  // Metadata for the game
  gameMetadata: {
    scenarioType: "central-far",
    difficulty: "easy",
    oracleOptimalClass: "retrieved_centered",
    oracleOptimalGP: 0.58,
    oracleAvgGP: 0.65,
    educationalValue: "HIGH", // Elite-level positioning
    tags: ["elite-positioning", "central-far", "retrieved"]
  },
  
  // Sharing preferences
  sharing: {
    isPrivate: false, // Owner can toggle
    isAnonymized: true,
    canBeUsedInPublicLibrary: true,
    createdAt: "2026-07-11T14:35:00Z"
  }
};
```

### 3.2 Tagging Strategy

Each extracted scenario gets automatically tagged for discoverability:

| Tag Type | Examples | Purpose |
|----------|----------|---------|
| **Scenario** | central-far, side-near-cross, central-near-cross | Filter by attack type |
| **Difficulty** | easy, medium, hard | Difficulty progression |
| **Outcome** | save, goal, blocked | Learning focus |
| **Quality** | elite-positioning, needs-work, average | Pedagogical value |
| **Archetype** | oracle, sentinel, catalyst, wall, bastion | Which archetype benefits |
| **Skill** | anticipation, claim, reflexes, decision-making | Which skill improves |

**Example tags for a single scenario:**
```
["central-far", "easy", "save", "elite-positioning", 
 "oracle", "anticipation", "consistency"]
```

---

## Part 4: Scenario Library Architecture

### 4.1 Three-Tier Library

Every extracted scenario can live in one or more libraries:

#### Personal Library (Private)
- Only the keeper who uploaded the footage can see it
- Use case: "Replay my own shots to see if I can reposition better"
- Features:
  - Filter by date, scenario type, outcome
  - Compare hypothetical vs. actual positioning
  - Track improvement over time

#### Squad Library (Shared)
- Visible to coach + all players on the team
- Coach decides which clips to share (privacy controls)
- Use case: "Here's footage from our last 3 games; train on these scenarios"
- Features:
  - Coach tags clips as "must-train" or "reference"
  - Squad heatmap (weak scenarios highlighted)
  - Drill recommendations auto-generated

#### Public Library (Opt-In, Anonymized)
- Players can opt-in to share anonymized clips
- Used by other players, available to all free users
- Use case: "Train on real footage from professional/elite academy matches"
- Features:
  - Filtered by difficulty, scenario type, archetype
  - Player identity removed (clip ID only)
  - Upload source: anonymized ("Elite U18 academy" instead of player name)

### 4.2 Library Growth Visualization

```
Day 1:  Library size: 0 (no users yet)

Week 1: 10 users sign up → 50 clips uploaded
        → 50 scenarios extracted
        → Library: 50 scenarios

Week 2: 50 users → 200 clips
        → 200 scenarios
        → Library: 250 scenarios

Month 1: 500 users → 2000 clips
         → 2000 scenarios
         → Library: 2,250 scenarios

Month 3: 2000 users → 8000 clips
         → 8000 scenarios
         → Library: 10,250 scenarios

Year 1: 50,000 users → 200,000 clips
        → 200,000 scenarios
        → Library: 200,000+ scenarios
```

By Year 1, you have a library of **200,000 real goalkeeper scenarios** — far more than any generic platform can offer.

---

## Part 5: Positioning Master Game (Revised)

### 5.1 How the Game Draws Scenarios

**OLD (Pre-Filmed):**
```
Game starts → loads one of 15 pre-filmed clips → user repositions → scores
```

**NEW (Scenario Extraction):**
```
Game starts → loads from scenario library → user repositions → scores vs actual + oracle
```

### 5.2 Game Flow (Integrated)

```
┌────────────────────────────────────┐
│ POSITIONING MASTER GAME            │
├────────────────────────────────────┤
│                                    │
│ SELECT DIFFICULTY:                 │
│ ○ Easy (central-far, side-far)    │
│ ○ Medium (central-near)            │
│ ○ Hard (side-near, crosses)       │
│ ◉ Mixed (all scenarios)            │
│                                    │
│ [START]                            │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│ GAME LOADS SCENARIO                │
│ (randomly selected from library)   │
├────────────────────────────────────┤
│                                    │
│ [Video plays: actual match footage]│
│                                    │
│ Pauses at: -120ms from shot       │
│                                    │
│ "Position the keeper"              │
│ [Draggable avatar on canvas]       │
│                                    │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│ USER REPOSITIONS                   │
│ (tries a different positioning)    │
├────────────────────────────────────┤
│                                    │
│ User drags keeper to optimal       │
│ position (their guess)             │
│                                    │
│ [Release keeper avatar]            │
│                                    │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│ FEEDBACK                           │
├────────────────────────────────────┤
│                                    │
│ Your positioning: advanced_centered│
│ Your score: 94/100                 │
│                                    │
│ What actually happened:            │
│ [Reveal actual keeper position]    │
│                                    │
│ "Your actual positioning was       │
│  retrieved_centered (89/100)"      │
│                                    │
│ "If you'd stayed on the line       │
│  like you actually did, you'd have │
│  0.58 GP. Your repositioning would│
│  give 0.52 GP."                    │
│                                    │
│ Oracle comparison:                 │
│ • Elite: 0.58 GP (retrieved_center)│
│ • You were: 0.58 GP               │
│ • Your idea: 0.52 GP              │
│                                    │
│ "You positioned optimally in real │
│  footage. In this game, you found │
│  an even better positioning!"      │
│                                    │
│ [NEXT] [REPLAY] [SHARE]           │
└────────────────────────────────────┘
```

### 5.3 Three Game Modes

#### Mode 1: "Beat the Keeper" (Training)
User tries to reposition better than they actually did.
```
"In your last game, you positioned here (actual).
 Can you find a better positioning? 
 (You have unlimited tries)"

User wins if their hypothetical positioning scores 
higher than their actual positioning.
```

#### Mode 2: "Match the Elite" (Benchmark)
User tries to match elite keeper positioning from the oracle.
```
"Elite keepers in this scenario position like this (oracle optimal).
 Can you match it?
 
 Your actual: 89/100 vs oracle
 Your guess: ___ / 100 vs oracle"
```

#### Mode 3: "Scenario Challenge" (Progression)
Random scenarios, increasing difficulty, cumulative score.
```
Trial 1 (Easy):   Central-far
Trial 2 (Easy):   Side-far
Trial 3 (Med):    Central-near cross
Trial 4 (Med):    Central-near no-cross
Trial 5 (Hard):   Side-near cross
Trial 6 (Hard):   Side-near no-cross
...

Score progression: 0 → 100 → 200 → 300...
Streak counter: 5 consecutive perfect scores

Leaderboard: Your rank among all players
```

---

## Part 6: The Complete User Journey

### Scenario A: Individual Player

```
MONDAY (After a match):
  1. Player records 60-second clip from their game (uses phone on pole)
  2. Opens Footballer's Academy app
  3. Taps "Analyze → Upload Video"
  4. System validates video (1920×1080, 60fps, etc.)
  5. Player annotates (marks shot, keeper position, outcome) [3 min work]
  6. System scores: "89/100 positioning in central-near cross"
  7. Archetype updates: Oracle +8
  8. System automatically extracts scenario
  
WEDNESDAY (Training day):
  1. Player wants to practice positioning
  2. Taps "Positioning Master Game"
  3. Selects "Hard" difficulty
  4. Game loads a random scenario (from squad or public library)
  5. Maybe it's someone else's clip from their game
     OR it's their own footage from Monday
  6. Player repositions and gets scored
  7. Sees comparison: "Your actual positioning: 89/100. Your game guess: 94/100."
  
FRIDAY (Before next match):
  1. Player wants to build confidence
  2. Plays "Scenario Challenge" mode (10 random clips)
  3. Scores 87/100 avg (good form)
  4. Watches leaderboard: 78th percentile (improving!)
  
SUNDAY (Next match):
  1. Player plays match
  2. Feeling confident from training
  3. Records clips
  4. Uploads footage
  5. Repeat cycle
```

### Scenario B: Coach with Squad

```
MONDAY (After squad match):
  1. Goalkeeper films 5 different moments from the match
  2. Uploads all 5 clips
  3. Annotates each (marks shots, positions, outcomes)
  4. System scores each, extracts 5 scenarios
  5. Coach receives notification: "5 new clips from [GK name]"

TUESDAY (Analysis):
  1. Coach reviews the 5 clips in squad dashboard
  2. Notices: "3/5 clips show weakness in side-near crosses"
  3. GK's positioning: 0.76 GP (oracle avg 0.72, elite 0.42)
  4. Coach flags the scenario as "WEAKNESS"
  5. Automatically schedules a drill

WEDNESDAY (Training):
  1. Coach shares 3 "weakness" clips with the squad
  2. Tells players: "These are scenarios we struggled with"
  3. In Positioning Master, players see these in "Squad Library"
  4. Squad plays these 3 scenarios multiple times
  5. Each player gets scored vs actual keeper positioning
  
THURSDAY (Drill):
  1. Coach runs 20-minute "Side-Near Crosses" drill
  2. Focuses on: advanced positioning + centralization
  3. Records some moments from drill
  4. Uploads as new scenarios

FRIDAY (Leaderboard):
  1. Coach sees squad positioning improvement
  2. Average score on side-near crosses: 58 → 68
  3. Notes: "Good progress. Keep drilling."

NEXT MONDAY:
  1. Match day. Squad has trained specifically on weak scenarios.
  2. In the match, side-near cross situation occurs.
  3. GK applies positioning from the drills.
  4. SAVE (different outcome than last week!)
  5. Uploads footage.
  6. System recognizes improvement: "Positioning improved by 15 points in this scenario."
```

---

## Part 7: Implementation Phases

### Phase 1: MVP (Weeks 1–3)
**Launch:** Digital Analysis + Scenario Extraction

What's built:
- [ ] Upload UI (video validation)
- [ ] Annotation interface (manual marking)
- [ ] Oracle scoring
- [ ] Scenario extraction (automatic)
- [ ] Personal scenario library (user's own clips)

What's NOT in MVP:
- Game (comes in Phase 2)
- Squad/public library (comes in Phase 3)
- Auto-detection AI (comes in Phase 4)

**Launch:** Players can upload, analyze, and see results. They build a personal library of real scenarios.

### Phase 2: Game Launch (Weeks 4–6)
**Add:** Positioning Master Game (draws from personal library)

What's built:
- [ ] Game UI (difficulty selection, game modes)
- [ ] Scenario loader (pulls from personal library)
- [ ] Canvas + dragging (reposition keeper)
- [ ] Comparison screen (actual vs. guess)
- [ ] Scoring integration

**Launch:** Players can now train on their own footage via the game.

### Phase 3: Squad Sharing (Weeks 7–9)
**Add:** Squad Library + Coach Dashboard

What's built:
- [ ] Squad library (coach can share with team)
- [ ] Coach dashboard (see squad trends, tag scenarios)
- [ ] Drill recommendations (auto-generate based on weakness)
- [ ] Privacy controls (coach decides what to share)

**Launch:** Coaches can now see squad data and use it for targeted training.

### Phase 4: AI Enhancements (Weeks 10+)
**Add:** Semi-Auto & Full-Auto Analysis

What's built:
- [ ] Ball detection (YOLOv8)
- [ ] Shot moment detection (optical flow)
- [ ] Keeper pose detection (MediaPipe)
- [ ] Outcome detection (auto)

**Launch:** Annotation becomes optional; most clips auto-analyzed.

### Phase 5: Public Library & Research (Months 4+)
**Add:** Public Library + Analytics

What's built:
- [ ] Public library (anonymized, opt-in sharing)
- [ ] Difficulty sorting (easy/medium/hard)
- [ ] Archetype filtering ("Train like an Oracle")
- [ ] Analytics (squad/individual trends)
- [ ] Research data (anonymized for studies)

---

## Part 8: Data Model (Integrated)

### Upload → Analysis → Scenario → Game → Feedback

```javascript
// 1. USER UPLOADS FOOTAGE
const uploadedClip = {
  uploadID: "upload_20260711_abc123",
  playerID: "gk_user_456",
  filename: "match_clip_1.mp4",
  duration_ms: 2850,
  uploadDate: "2026-07-11T14:00:00Z"
};

// 2. USER ANNOTATES (Digital Analysis)
const annotation = {
  uploadID: "upload_20260711_abc123",
  shotMarker_ms: 2700,
  pauseFrame_ms: 2580,
  keeperPosition: {
    depth_m: 3.2,
    laterality: "centered",
    centralization: "facing_ball",
    class: "retrieved_centered"
  },
  scenario: "central-far",
  outcome: "save",
  oracleScore: 89,
  archetype_impact: {
    oracle: +8,
    sentinel: +0,
    catalyst: +0,
    bastion: +1,
    wall: +1
  }
};

// 3. SYSTEM EXTRACTS SCENARIO
const extractedScenario = {
  scenarioID: "scenario_20260711_abc123_1",
  sourceUploadID: "upload_20260711_abc123",
  sourcePlayerID: "gk_user_456",
  video: {
    filename: "extracted_scenario_abc123_1.mp4",
    startFrame_ms: 1200,
    endFrame_ms: 3500,
    duration_ms: 2300
  },
  positioning: annotation.keeperPosition,
  scenario: annotation.scenario,
  actualOutcome: annotation.outcome,
  oracleData: {
    actualPositioningScore: 89,
    actualGP: 0.58,
    optimalGP: 0.58,
    avgGP: 0.65
  },
  sharing: {
    inPersonalLibrary: true,
    inSquadLibrary: false,
    inPublicLibrary: false
  }
};

// 4. GAME LOADS SCENARIO
const gameInstance = {
  gameID: "game_session_20260712_def456",
  playerID: "gk_user_789",
  scenarioID: "scenario_20260711_abc123_1", // Loaded from library
  mode: "beat-the-keeper",
  
  // User makes a guess
  userGuessPosition: {
    depth_m: 4.0,  // Advanced instead of retrieved
    laterality: "centered",
    centralization: "facing_ball",
    class: "advanced_centered"
  },
  userGuessScore: 94,
  userGuessGP: 0.52,
  
  // Comparison
  comparison: {
    actualPositioningScore: 89,
    userGuessScore: 94,
    userWon: true,
    improvementPotential: "Your guess would reduce GP from 0.58 to 0.52 — excellent!"
  }
};

// 5. FEEDBACK & ARCHETYPE UPDATE
const feedback = {
  gameID: "game_session_20260712_def456",
  positioningDelta: +5,
  educationalValue: "HIGH",
  archetypeContribution: {
    oracle: +5,
    catalyst: +3,
    bastion: +1
  }
};
```

---

## Part 9: Why This Model Is Powerful

### For Players
✅ **Real data:** Assessment based on actual performance, not hypothetical  
✅ **Instant feedback:** Upload → analyze → get coached in minutes  
✅ **Personalized training:** Game scenarios from their own footage  
✅ **Infinite content:** Every upload adds new scenarios to train on  
✅ **Peer learning:** Play scenarios from squad-mates' matches  

### For Coaches
✅ **Squad insights:** See positioning weaknesses across the team  
✅ **Targeted training:** Auto-generated drill recommendations  
✅ **Objective metrics:** Positioning IQ scores, not subjective feedback  
✅ **Progress tracking:** Over-time improvements visible in data  
✅ **Knowledge base:** 200K+ real scenarios within a year  

### For The Platform
✅ **No production costs:** Users provide all content  
✅ **Data flywheel:** More users → more clips → better training → more engagement  
✅ **Defensible moat:** 200K scenarios can't be replicated by competitors  
✅ **Research value:** Anonymized data is gold for sports science  
✅ **Revenue model:** Premium features (coach tools, analytics) naturally emerge  

### Competitive Advantage
| Competitor | Approach | Scenarios | Accuracy |
|---|---|:---:|:---:|
| Wyscout | Manual tagging, generic analysis | <100 | Subjective |
| Hudl | Video review, coach notes | <500 | Subjective |
| Opta Sports | Automated event tagging | <1000 | Rule-based |
| **Positioning Master** | **User uploads + oracle-grounded** | **200K+ real** | **Oracle-validated** |

**You are the first platform to: (1) give keepers real-time oracle-based positioning feedback, (2) extract infinite training scenarios from user footage, (3) feed this into a gamified training loop, (4) scale without production overhead.**

---

## Part 10: Technical Architecture (Simplified)

### Stack Recommendation

**Frontend:**
- React or Next.js (web app)
- React-based video player (react-player)
- Canvas (for keeper positioning game)
- Recharts (for progress visualization)

**Backend:**
- Node.js + Express OR Python Flask
- AWS Lambda (for video processing, scaling)
- PostgreSQL (annotations, archetype scores)
- Redis (caching, leaderboard)

**Storage:**
- AWS S3 (video clips)
- AWS EBS or GCP Cloud Storage (temporary frames)

**Computer Vision (v1.5+):**
- OpenCV (Python, ball detection)
- YOLOv8 (Python, ball + pose detection)
- MediaPipe (Python, keeper pose estimation)
- TensorFlow Lite (mobile, if needed)

**Infrastructure:**
- Docker (containerization)
- GitHub Actions (CI/CD)
- AWS RDS (managed database)
- CloudFlare (CDN for video)

**Total estimated cost (Year 1):**
- Development: $60–100k (team of 2–3)
- Infrastructure: $500–1000/month
- Storage (1 million clips @ 2MB): $20k/year
- Video processing (optical flow, detection): $100–200/month

---

## Part 11: Launch Roadmap (Realistic)

### Month 1: MVP (Digital Analysis only)
```
Week 1–2: Build upload + annotation UI
Week 3:   Scoring + archetype integration
         → LAUNCH: Players upload, annotate, get scored
         → Scenarios extracted automatically
         → Personal library grows
```

**Metrics to track:**
- Upload volume (target: 50 clips/week from 10 beta users)
- Annotation completion rate (target: 80%)
- Scenario library size (target: 50 scenarios by end of month)

### Month 2: Game Launch
```
Week 1–2: Build Positioning Master Game UI
Week 3:   Scenario loader + game modes
         → LAUNCH: Players can train on extracted scenarios
         → Game draws from personal + (soon) squad libraries
```

**Metrics:**
- Game session volume (target: 100+ sessions/week)
- Average game score (target: 75+/100)
- Replay rate (target: 30% of players replay a scenario)

### Month 3: Squad Sharing
```
Week 1–2: Coach dashboard + squad library
Week 3:   Privacy controls + sharing features
         → LAUNCH: Coaches can share scenarios with teams
         → Squad dashboard shows trends
```

**Metrics:**
- Coaches invited (target: 20)
- Scenarios shared (target: 200+ per coach)
- Squad player engagement (target: 80%+ of squad plays)

### Months 4+: AI & Public Library
```
Ongoing: Ball detection, shot detection, keeper pose detection
Ongoing: Public library, anonymization, research features
```

---

## Part 12: Key Decisions for Kofi

1. **Confirm:** This integrated model (digital analysis source → game scenarios) is the direction?

2. **Privacy:** At what point do clips move from Personal → Squad → Public?
   - Personal: Always private, only player sees
   - Squad: Coach decides if/when to share with team
   - Public: Player explicitly opts-in, anonymized, data-sharing consent

3. **Competition:** Should players see how they scored vs. squad-mates on the same scenario?
   - Example: "Lucas scored 89 on this clip. You scored 76."
   - Motivates improvement but could feel competitive/demotivating

4. **AI Timeline:** When do you want semi-auto analysis?
   - MVP with manual annotation: Ship faster, higher accuracy initially
   - v1.5 with ball+shot detection: 2–3 weeks later, faster for users
   - v2.0 with keeper pose detection: 4–6 weeks later, nearly hands-off

5. **Coach Tools:** Are coach dashboards critical for v1 or can they come in Phase 3?
   - v1 focus: Individual players uploading and training
   - Phase 3: Coach tools (squad dashboards, drill recommendations)

---

## Summary: Why This Works

**Instead of:**
```
Building 15 pre-filmed generic clips
(production overhead, limited scalability)
```

**You're doing:**
```
Building the infrastructure for users to create infinite real scenarios
(zero production overhead, exponential scalability)
```

**The game stays fun and engaging, but it draws from real footage — which is more educational, more personalized, and more powerful.**

Every user who joins makes the platform better for every other user (more scenarios to train on).

This is a genuine defensible moat: By Month 12, you have 200K+ real goalkeeper scenarios. A competitor can't replicate that overnight.

---

## Next Action: Build Confirmation

Shall I now create:

1. **Detailed React component spec** for the upload + annotation interface?
2. **Database schema** (PostgreSQL) for uploads, annotations, scenarios, games?
3. **API specification** (OpenAPI/Swagger) for all endpoints?
4. **Wireframes** (Figma-style mockups) for MVP flows?
5. **Sample code** (Node.js + React) to bootstrap the build?

Which would be most useful to move forward?

