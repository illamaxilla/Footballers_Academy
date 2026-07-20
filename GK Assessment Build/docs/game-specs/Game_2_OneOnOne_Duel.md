# One-on-One Duel — Claude Design Build Specification
## 1v1 Defending Tactical Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Talent ID research; 1v1 defending as key tactical attribute  
**Type:** Interactive decision + reaction game  
**Platform:** Web (desktop/mobile) + React + Canvas  
**Duration:** 4–6 minutes per session  

---

## 1. Executive Summary

**One-on-One Duel** measures goalkeeper **tactical decision-making and reaction execution in 1v1 situations**. Players watch an attacker approach from 12–15m away with the ball, and at a critical decision point, they choose: **advance and narrow the angle** OR **stay on the goal line and react**.

After they choose, the video continues and the attacker either shoots or attempts to dribble. System scores:

- **Positioning decision quality** (advance vs. stay, angle narrowing)
- **Reaction speed** (how quickly they move after attacker's touch)
- **Footwork efficiency** (foot placement, body alignment)
- **Success rate** (save, goal, or near miss?)
- **Consistency** (same decisions across similar 1v1s?)

**Key differentiator:** Interactive 1v1 game combining positioning, reaction, and tactical decision-making. No other platform gamifies this.

---

## 2. Game Flow

```
START SCREEN
   ↓
"ONE-ON-ONE SCENARIOS"
Select difficulty:
○ Easy (15m, straight approach)
○ Medium (12m, various angles)
○ Hard (10m, dribbling pressure)
   ↓
SCENARIO LOADS
Video: Attacker approaching with ball, keeper's perspective
   ↓
DECISION POINT (-800ms before expected touch)
   
Pause video. Player sees:
┌─────────────────────────────────┐
│ WHAT DO YOU DO?                 │
├─────────────────────────────────┤
│ [🔵 ADVANCE & NARROW ANGLE]     │
│  Come off the line, challenge   │
│  Narrow the attacker's space    │
│                                 │
│ [🔴 STAY & REACT]               │
│  Hold position on goal line     │
│  Make yourself big, react fast  │
└─────────────────────────────────┘
   ↓
PLAYER CHOOSES
   ↓
VIDEO RESUMES
Shows attacker's touch + shot/dribble attempt
   ↓
OUTCOME + FEEDBACK
"You chose: Advance & narrow"
"Attacker's touch: Right foot, right side"
"Your reaction: 420ms dive to bottom-right"
"Result: SAVE"
"Score: 87/100"
[Overlay shows: your position vs. elite position]
   ↓
NEXT SCENARIO or FINISH
(6–8 scenarios total)
```

---

## 3. Visual Design & Interface

### 3.1 Main Game Canvas

**Full-screen video with overlay UI:**

```
┌─────────────────────────────────────────────────────────┐
│  [Video: Attacker running at keeper with ball]          │
│                                                         │
│  Attacker position: 12m from goal, central              │
│  Ball control: Good (close to feet)                     │
│  Running speed: Moderate (3.2 m/s)                      │
│  Next touch expected: In 0.8 seconds                    │
│                                                         │
│  [DECISION POINT: VIDEO PAUSES]                        │
│                                                         │
│                                                         │
│                        ┌────────┐                       │
│                        │ Keeper │ (you)                │
│                        └────────┘                       │
│  ┌──────────────────────  Goal  ──────────────────────┐ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Scenario info (top-left):                             │
│  Distance: 12m                                          │
│  Angle: Central                                         │
│  Attacker pace: Moderate                               │
│  Elite save rate: 68%                                  │
│                                                         │
│                                                         │
│  DECISION BUTTONS (center-bottom):                     │
│  [🔵 ADVANCE & NARROW] [🔴 STAY & REACT]              │
│                                                         │
│  Timer: [████░░░░] 3 seconds to choose                │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Post-Outcome View

**After player chooses and video plays:**

```
┌─────────────────────────────────────────────────────────┐
│  OUTCOME & FEEDBACK                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Your choice:  [🔵 ADVANCE & NARROW]                  │
│  Attacker did: [Shot from 8m, right side]             │
│  Your reaction: [450ms dive, right hand leading]      │
│                                                         │
│  RESULT: ✓ SAVE                                        │
│                                                         │
│  SCORE BREAKDOWN:                                      │
│  • Positioning decision: 82/100 (good choice)         │
│  • Angle narrowing: 85/100 (well-positioned)          │
│  • Reaction speed: 87/100 (quick)                     │
│  • Footwork: 78/100 (could use better placement)      │
│  • Overall: 83/100                                     │
│                                                         │
│  ELITE COMPARISON:                                     │
│  Your positioning vs. elite (overlay):                │
│  [Heatmap: your position in blue, elite avg in green] │
│                                                         │
│  "Your position was spot-on. Elite keepers save       │
│   this 68% of the time; you made it harder for them." │
│                                                         │
│  [NEXT SCENARIO] [REPLAY] [DETAILS]                   │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Mobile Responsiveness

**Landscape (preferred):**
- Video full-width at top 70%
- Decision buttons, info at bottom 30%
- Scenario info, timer in top-left corner

**Portrait:**
- Video at top 50%
- Decision buttons full-width below
- Scenario info right sidebar

---

## 4. Scenario Library (6–8 Total)

Each scenario is a **video of an attacker approaching from different distances, angles, and speeds**.

| Scenario | Distance | Angle | Pace | Elite Strategy | Research |
|----------|:---:|---|---|---|---|
| **1. Central, slow** | 15m | Central | Slow (2.5 m/s) | Advance 80% | Baseline, easy |
| **2. Central, medium** | 12m | Central | Medium (3.5 m/s) | Advance 68% | Standard 1v1 |
| **3. Central, fast** | 10m | Central | Fast (4.2 m/s) | Stay back 62% | High-pressure |
| **4. Right wing** | 12m | Right side | Medium | Advance/narrow right 65% | Angle reading |
| **5. Left wing** | 12m | Left side | Medium | Advance/narrow left 64% | Angle reading |
| **6. Contested (defender nearby)** | 12m | Central | Medium | Stay 58% | Defensive support |
| **7. Dribbling pressure** | 10m | Central | Variable | Stay & react 71% | Footwork + patience |
| **8. Long run (high speed)** | 15m → 8m | Central | Very fast (4.5 m/s) | Stay & quick react 75% | Explosive speed |

**Video specs:**
- Filmed from keeper's perspective (birds-eye or elevated 45° angle)
- MP4, 1280×720, 30fps
- 3–5 seconds: approach + decision point + touch + outcome
- Multiple takes per scenario (show variation in attacker behavior)

---

## 5. Scoring Logic

### 5.1 Decision Quality Score

```javascript
function scorePositioningDecision(playerChoice, scenarioType) {
  // Get oracle distribution for this scenario
  const oracle = scenarioOracleData[scenarioType];
  // e.g., { advanceAndNarrow: 68, stayAndReact: 32 }
  
  const playerScore = (playerChoice === 'advance')
    ? oracle.advanceAndNarrow
    : oracle.stayAndReact;
  // Score = elite percentage who chose this option
  
  return playerScore; // 0–100
}

// Example: Scenario is "central 1v1, 12m"
// Oracle: advance 68%, stay 32%
// If player chose "advance": score = 68/100
// If player chose "stay": score = 32/100 (less common, riskier)
```

### 5.2 Reaction Speed Score

```javascript
function scoreReactionSpeed(timeToReact_ms) {
  // Elite keepers react in ~400–500ms
  const eliteBaseline = 450;
  
  // Faster is better, but too fast = anticipation (risky)
  if (timeToReact_ms < 300) {
    // Too early (guessed direction)
    return Math.max(50, 100 - (300 - timeToReact_ms) / 2);
  } else if (timeToReact_ms <= 600) {
    // Optimal range
    const closenessToElite = Math.abs(timeToReact_ms - eliteBaseline);
    return 100 - (closenessToElite / 200) * 20; // 90–100 range
  } else {
    // Slow (hesitation or poor positioning)
    return Math.max(30, 100 - (timeToReact_ms - 600) / 3);
  }
}
```

### 5.3 Footwork Efficiency Score

```javascript
function scoreFootwork(footPlacement, bodyAlignment, handLeading) {
  // footPlacement: distance from optimal (in cm)
  // bodyAlignment: angle to goal (ideal = perpendicular)
  // handLeading: leading hand correct for direction?
  
  const footScore = Math.max(0, 100 - (footPlacement * 0.8));
  const alignScore = Math.max(0, 100 - (Math.abs(bodyAlignment) / 45 * 100));
  const handScore = (handLeading) ? 100 : 70;
  
  return (footScore * 0.4 + alignScore * 0.4 + handScore * 0.2);
}
```

### 5.4 Overall Scenario Score

```javascript
function scoreScenario(playerChoice, reactionTime, footwork, outcome) {
  const decisionScore = scorePositioningDecision(playerChoice, scenario);
  const reactionScore = scoreReactionSpeed(reactionTime);
  const footworkScore = scoreFootwork(footwork);
  
  // Outcome bonus/penalty
  const outcomeFactor = (outcome === 'save') ? 1.0 : 
                       (outcome === 'miss') ? 0.8 :
                       (outcome === 'goal') ? 0.5 : 0.7;
  
  const scenarioScore = Math.round(
    (decisionScore * 0.4 + reactionScore * 0.35 + footworkScore * 0.25) * outcomeFactor
  );
  
  return {
    decisionScore,
    reactionScore,
    footworkScore,
    outcomeFactor,
    finalScore: scenarioScore
  };
}
```

### 5.5 Session Results

```
OVERALL 1V1 SCORE: 79/100
Percentile: 72nd

SCENARIO BREAKDOWN:
Scenario 1 (Central, slow):   85/100 ✓
Scenario 2 (Central, medium): 82/100 ✓
Scenario 3 (Central, fast):   71/100 ✗ (hesitation)
Scenario 4 (Right wing):      78/100 ✓
Scenario 5 (Left wing):       74/100 ✓
Scenario 6 (Contested):       81/100 ✓
Scenario 7 (Dribbling):       72/100 ✗ (committed too early)

AVERAGE SAVE RATE: 71% (Elite: 68%)
DECISION CONSISTENCY: 76% (elite: 87%)

KEY INSIGHTS:
✓ Strong: Central 1v1s, good angle reading
✗ Weak: High-pressure fast approaches; hesitate & commit late
✗ Weak: Dribbling scenarios; read the ball better

ARCHETYPE SIGNAL:
• Wall: +12 (command, positioning)
• Bastion: +8 (reaction speed, mostly solid)
• Catalyst: -2 (not aggressive enough on advances)

DEVELOPMENT: Practice fast-approach scenarios with better 
commitment timing. Work on reading dribbler's weight shift.
```

---

## 6. Component Structure (React)

```
OneOnOneDuel/
├── OneOnOneDuelGame.jsx
│   ├── VideoPlayer.jsx (attacker approach video)
│   ├── ScenarioInfo.jsx (distance, angle, pace, elite %)
│   ├── DecisionButtons.jsx (Advance & Narrow | Stay & React)
│   ├── Timer.jsx (countdown to decision deadline)
│   └── OutcomeCard.jsx (post-outcome feedback, video replay)
├── ResultsScreen.jsx
│   ├── OverallScore.jsx (79/100, percentile)
│   ├── ScenarioBreakdown.jsx (bar chart per scenario)
│   ├── SaveRateComparison.jsx (your rate vs. elite)
│   ├── ConsistencyChart.jsx (decision consistency trend)
│   ├── ArchetypeSignal.jsx (Wall/Bastion contribution)
│   ├── WeaknessHighlight.jsx (dribbling scenarios, hesitation)
│   └── ActionButtons.jsx (train again, compare, share)
├── hooks/
│   ├── useOneOnOneState.js (game state, scenario progress)
│   ├── useScoringLogic.js (decision, reaction, footwork scoring)
│   └── useVideoSync.js (video pause/play at decision point)
├── data/
│   ├── scenarios.json (8 scenario specs + video URLs)
│   ├── oracleData.json (elite decision distribution per scenario)
│   └── archetypeMapping.json (contribution weights)
└── styles/
    ├── OneOnOneDuel.css (responsive, video-dominant layout)
    └── animations.css (outcome reveal, score card fade-in)
```

---

## 7. Key Implementation Details

### 7.1 Video Sync & Decision Point

**Challenge:** Video must pause at exact moment before attacker's touch, and resume consistently.

**Solution:**
1. Video is pre-cut (3–5 seconds) with **decision point at exact timestamp** (e.g., 1800ms)
2. On video play, system monitors `currentTime`
3. At 1800ms, `pause()` is called
4. Player makes choice
5. Video resumes from 1800ms + 100ms (to show attacker's touch)

**Code example:**
```javascript
useEffect(() => {
  const videoElement = videoRef.current;
  
  const handleTimeUpdate = () => {
    if (videoElement.currentTime >= decisionPoint_ms / 1000 && !isPaused) {
      videoElement.pause();
      setPaused(true);
      showDecisionButtons(true);
    }
  };
  
  videoElement.addEventListener('timeupdate', handleTimeUpdate);
  return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate);
}, [decisionPoint_ms]);
```

### 7.2 Attacker Behavior Variation

**To prevent memorization:** Each scenario type has 2–3 video takes with different attacker touch/shot patterns.

**Example: "Central 1v1, medium pace"**
- Take A: Attacker shoots left side
- Take B: Attacker shoots right side, far post
- Take C: Attacker attempts dribble right before distance closes

System randomly selects which take to show.

### 7.3 Footwork Analysis (Simplified for App)

**Approach:** Instead of frame-by-frame pose detection (expensive), use simplified scoring:

- **Foot placement:** Player estimates keeper's foot position relative to optimal zone
- **Body alignment:** Visual feedback (overlay shows elite keeper position in green, player position in blue)
- **Hand leading:** Ask after outcome: "Which hand led the dive?" (multiple choice)

**Example UI:**
```
After outcome reveal:
"Which hand led your dive?"
○ Right
○ Left
○ Both (two-handed catch)

Player selects → system scores (comparing to attacker direction)
```

---

## 8. User Flows

### 8.1 First-Time User

```
1. Tap "One-on-One Duel"
2. Tutorial: "Master 1v1 situations"
   • Quick video (30 seconds): how to read distance/angle
   • 1 example scenario with walk-through
3. Choose difficulty (easy/medium/hard)
4. Play 6 scenarios (~4 minutes)
5. Results screen with development tips
```

### 8.2 Returning User

```
1. Tap "One-on-One Duel"
2. Select difficulty + quick play
3. 6 scenarios
4. Results (compare to previous sessions)
5. Trend: "Your save rate improved +8% over 3 sessions"
```

---

## 9. Testing Checklist

- [ ] **Video sync:** Decision point pauses at exact timestamp (±50ms)
- [ ] **Scenario loading:** All 8 scenarios load without stutter
- [ ] **Decision buttons:** Both register immediately
- [ ] **Outcome video:** Plays seamlessly after choice
- [ ] **Scoring:** Manual calculation matches algorithm (10 test cases)
- [ ] **Elite comparison overlay:** Shows keeper positions correctly
- [ ] **Scenario variation:** Random take selection works
- [ ] **Mobile video playback:** Smooth on 4G + WiFi
- [ ] **Accessibility:** Colorblind mode, text sizing, screen reader

---

## 10. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Video player styling (pause overlay, play button, progress bar)
- [ ] Scenario info card (distance, angle, pace, elite % in readable hierarchy)
- [ ] Decision buttons (advance/stay, icons, tap states)
- [ ] Outcome reveal animation (fade-in, score card appearance)
- [ ] Elite position overlay (heatmap/gradient showing keeper zones)
- [ ] Results screen (score hierarchy, scenario breakdown chart, weakness card)
- [ ] Typography (large, readable on mobile)
- [ ] Color scheme (decision buttons: blue/red, outcome: green/red)
- [ ] Icons (advance, stay, save, goal, near miss)
- [ ] Responsive layout (landscape optimal, portrait acceptable)

---

## 11. Content Requirements

**Videos:** 8 scenarios × 2–3 takes each = 16–24 video clips (3–5 seconds each)  
**Audio:** Optional decision feedback sounds (chime/buzz)  
**Guidance:** Tutorial copy, outcome feedback text, results interpretation  

---

## 12. Next Steps

1. **Film 1v1 scenarios** (or source from existing academy footage)
2. **Prototype decision UI** in Claude Design (video player + buttons)
3. **Build scoring logic** (test with manual calculations)
4. **Playtest with 5 keepers** (gather feedback on decision clarity, difficulty)
5. **Refine elite positioning overlays**
6. **Integrate with archetype system**
7. **Launch Phase 2**

---

**Status:** Ready for Claude Design handoff. 1v1 video scenarios must be prepared before build.

