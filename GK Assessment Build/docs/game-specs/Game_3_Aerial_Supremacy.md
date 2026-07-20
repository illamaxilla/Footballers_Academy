# Aerial Supremacy — Claude Design Build Specification
## High-Ball Claiming & Aerial Command Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Lethole et al. 2024 (defending in crosses, aerial command); Goalkeeper tactical skills  
**Type:** Decision + timing interactive game  
**Platform:** Web (desktop/mobile) + React + Canvas + Physics simulation  
**Duration:** 5–7 minutes per session  

---

## 1. Executive Summary

**Aerial Supremacy** measures goalkeeper **decision-making and timing in cross/high-ball scenarios**. Players watch incoming crosses from various angles and heights, and at a decision point (-400ms before expected ball arrival), they choose:

1. **Positioning decision:** Come off the line (2m, 4m, 6m) OR stay on goal line?
2. **Action decision:** Catch, punch, or let it pass?
3. **Timing:** When to jump (±200ms window)?

System scores based on:
- **Positioning depth** (did you advance to the optimal point?)
- **Action choice** (was catch vs. punch right for this cross?)
- **Jump timing** (too early = airborne too long; too late = can't reach)
- **Claim success rate** (claiming vs. punch vs. miss)
- **Aerial command score** (consistency, confidence, leadership presence)

**Key differentiator:** First interactive game to assess high-ball claiming systematically. Coaches rate this as top weakness in youth keepers.

---

## 2. Game Flow

```
START SCREEN
   ↓
"AERIAL SUPREMACY"
Choose difficulty:
○ Easy (high crosses, stationary)
○ Medium (medium-height crosses, contested)
○ Hard (low crosses, aggressive attackers)
   ↓
SCENARIO LOADS
Video: Cross coming in, keeper's perspective (elevated/side angle)
   ↓
POSITIONING DECISION POINT (-400ms before ball arrival)
   
Pause video. Player sees:
┌──────────────────────────────────────┐
│ CROSS INCOMING FROM RIGHT WING       │
│ Height: Medium (8 feet)              │
│ Distance: 12m from goal              │
│ Attackers: 2 nearby                  │
├──────────────────────────────────────┤
│ HOW FAR OFF THE LINE?                │
│ [DEPTH SLIDER: Stay|2m|4m|6m ]      │
│                                      │
│ WHAT DO YOU DO?                      │
│ ○ Catch        (claim ball)          │
│ ○ Punch        (clear area)          │
│ ○ Let it pass  (defender handles)    │
│                                      │
│ WHEN TO JUMP?                        │
│ [Early] [Perfect timing] [Late]      │
│         [═══●═══] slider             │
│                                      │
│ Timer: [████░░░░] 3 seconds          │
└──────────────────────────────────────┘
   ↓
PLAYER MAKES CHOICES
(Depth positioning, action, jump timing)
   ↓
VIDEO RESUMES + OUTCOME SHOWN
Shows:
• Your keeper position overlay (blue)
• Elite keeper position overlay (green)
• Ball trajectory
• Your jump moment
• Outcome (claim, punch, miss, goal)
   ↓
FEEDBACK + SCORE
"You positioned: 4m off line (good)"
"You chose: Punch (correct for this cross)"
"Your jump: 150ms late (slight delay)"
"Result: Punched clear"
"Score: 84/100"
   ↓
NEXT SCENARIO or FINISH
(6–8 scenarios total)
```

---

## 3. Visual Design & Interface

### 3.1 Cross Scenario Visualization

**During decision point (paused):**

```
┌─────────────────────────────────────────────────────┐
│ [Video: Cross in flight, from keeper's perspective] │
│                                                     │
│  Cross info (top-left):                            │
│  • Height: Medium (8 ft)                           │
│  • Distance from goal: 12m                         │
│  • Attackers near ball: 2                          │
│  • Expected arrival: 0.4 seconds                   │
│  • Elite claim rate: 73%                           │
│                                                     │
│                                                     │
│  POSITIONING CHOICE:                               │
│  Stay on line    2m    4m    6m advance           │
│  [Step] [Step]  [●Step] [Step] [Step]             │
│   (4m chosen)                                      │
│                                                     │
│  ACTION CHOICE:                                    │
│  ○ Catch   ○ Punch   ○ Let it pass                 │
│  (Punch selected - recommended for contested)     │
│                                                    │
│  JUMP TIMING:                                     │
│  Early |====◐====|====◑====| Late                 │
│         (Perfect timing centered)                 │
│                                                    │
│  [CONFIRM CHOICES] or [ADJUST]                   │
└─────────────────────────────────────────────────────┘
```

### 3.2 Outcome Reveal

**After video plays:**

```
┌─────────────────────────────────────────────────────┐
│ OUTCOME & FEEDBACK                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ YOUR DECISIONS:                                     │
│ • Positioning: 4m off line                         │
│ • Action: Punch                                    │
│ • Jump timing: Optimal (±50ms)                     │
│                                                     │
│ RESULT: ✓ PUNCHED CLEAR                            │
│                                                     │
│ SCORE BREAKDOWN:                                   │
│ • Positioning depth: 88/100                        │
│ • Action choice: 92/100 (perfect for contested)   │
│ • Timing: 95/100 (excellent jump moment)          │
│ • Aerial authority: 85/100 (commanding presence)  │
│ • Overall: 90/100                                  │
│                                                     │
│ ELITE COMPARISON:                                  │
│ [Heatmap: Your position (blue) vs Elite (green)]  │
│ "You advanced the perfect distance. Elite keepers │
│  claim this scenario 73% of the time; you made it │
│  look easy."                                       │
│                                                    │
│ [NEXT SCENARIO] [REPLAY] [DETAILS]                │
└─────────────────────────────────────────────────────┘
```

### 3.3 Mobile Responsiveness

**Landscape:**
- Video at top 60%
- Positioning/action/timing controls below
- Info sidebar on right (cross details, elite rate)

**Portrait:**
- Video at top 50%
- Controls stacked vertically below

---

## 4. Scenario Library (6–8 Total)

| Scenario | Cross Type | Height | Distance | Attackers | Elite Strategy | Research |
|----------|---|:---:|:---:|:---:|---|---|
| **1. High, unchallenged** | Inswinger from right | High (10 ft) | 14m | 0 nearby | Claim 88% | Easy baseline |
| **2. High, contested** | Inswinger from right | High (10 ft) | 12m | 2 near | Punch 65% | Medium, pressure |
| **3. Medium, attacker challenge** | Driven cross | Medium (8 ft) | 10m | 3 near | Punch/claim 50/50 | Contested |
| **4. Low, flat cross** | Quick low cross | Low (6 ft) | 8m | 1 near | Claim 72% (risky) | Difficult |
| **5. Far post, high** | Looped cross | High (11 ft) | 16m from goal line | 0 | Let it pass 68% (defender) | Tactical reading |
| **6. Central, chaos** | Clearance punch up high | Variable | 6m | 3+ near | Punch decisively 80% | High-pressure melee |
| **7. Set play (corner)** | In-swinging corner | Medium-high (9 ft) | 8m | 3+ near | Punch/claim based on angle | Set-play specific |
| **8. Late arrival** | Far-post cross | High (10 ft) | 18m from goal line | 0 | Come 6m to cut out | Reading + advance |

**Video specs:**
- Filmed from keeper's perspective (elevated 45° or birds-eye angle)
- MP4, 1280×720, 30fps
- 2–4 seconds: cross arrival + keeper action + outcome
- Ball trajectory clearly visible (use contrast/overlay if needed)

---

## 5. Scoring Logic

### 5.1 Positioning Depth Score

```javascript
function scorePositioningDepth(playerDepth_m, scenarioType) {
  // Oracle optimal depth for this scenario
  const oracleOptimal_m = scenarioOptimalDepth[scenarioType];
  // e.g., high unchallenged cross = 4m advance (oracle)
  
  const depthError_m = Math.abs(playerDepth_m - oracleOptimal_m);
  
  // Scoring: closer to optimal = higher score
  if (depthError_m <= 0.5) {
    return 100; // Perfect depth
  } else if (depthError_m <= 1.5) {
    return 85 - (depthError_m * 15); // 70–85 range
  } else if (depthError_m <= 3) {
    return Math.max(40, 70 - (depthError_m * 10)); // 40–70 range
  } else {
    return Math.max(20, 40 - (depthError_m * 5)); // 20–40 range (way off)
  }
}
```

### 5.2 Action Choice Score

```javascript
function scoreActionChoice(playerAction, scenarioType, attackerCount) {
  // Oracle distribution for this scenario
  const oracle = scenarioOracleAction[scenarioType];
  // e.g., { claim: 65, punch: 30, letPass: 5 }
  
  const oracleRate = oracle[playerAction];
  // If player chose most common action: higher score
  
  // Bonus: if choice was "risky but correct" (less common but right for situation)
  const riskBonus = (oracleRate < 50 && playerAction !== 'claim') ? 10 : 0;
  
  return oracleRate + riskBonus;
}
```

### 5.3 Jump Timing Score

```javascript
function scoreJumpTiming(playerTiming_ms, optimalTiming_ms, ballArrival_ms) {
  // Optimal jump timing: player should be airborne when ball arrives
  const error_ms = Math.abs(playerTiming_ms - optimalTiming_ms);
  
  // Elite keepers have ±50ms tolerance
  if (error_ms <= 50) {
    return 100;
  } else if (error_ms <= 150) {
    return 100 - (error_ms - 50) / 100 * 20; // 80–100 range
  } else if (error_ms <= 300) {
    return Math.max(40, 80 - (error_ms - 150) / 150 * 40); // 40–80 range
  } else {
    return Math.max(20, 40 - (error_ms - 300) / 200 * 20); // 20–40 range (very late)
  }
}
```

### 5.4 Aerial Authority Score

```javascript
function scoreAerialAuthority(claimSuccess, decisionConfidence, assertiveness) {
  // Claim success: did keeper actually claim the ball?
  const claimScore = (claimSuccess) ? 100 : 50;
  
  // Decision confidence: did they commit fully or hesitate?
  // (measured by decisiveness of movement, not error)
  const confidenceScore = decisionConfidence * 100; // 0–1 scale
  
  // Assertiveness: did they command the box? (verbal cues, leadership)
  const assertivenessScore = assertiveness * 100; // 0–1 scale (optional vocal cues)
  
  return (claimScore * 0.5 + confidenceScore * 0.3 + assertivenessScore * 0.2);
}
```

### 5.5 Overall Scenario Score

```javascript
function scoreAerialScenario(playerChoices, outcome) {
  const depthScore = scorePositioningDepth(playerChoices.depth, scenario);
  const actionScore = scoreActionChoice(playerChoices.action, scenario);
  const timingScore = scoreJumpTiming(playerChoices.jumpTiming, scenario.optimalTiming);
  const authorityScore = scoreAerialAuthority(outcome.claimed, confidence);
  
  // Outcome multiplier
  const outcomeMultiplier = (outcome === 'claimed') ? 1.0 :
                           (outcome === 'punched') ? 0.85 :
                           (outcome === 'miss') ? 0.6 :
                           (outcome === 'goal') ? 0.3 : 0.7;
  
  const scenarioScore = Math.round(
    (depthScore * 0.25 + actionScore * 0.30 + timingScore * 0.25 + authorityScore * 0.20)
    * outcomeMultiplier
  );
  
  return {
    depthScore,
    actionScore,
    timingScore,
    authorityScore,
    finalScore: scenarioScore
  };
}
```

### 5.6 Session Results

```
AERIAL SUPREMACY SCORE: 81/100
Percentile: 74th

SCENARIO BREAKDOWN:
Scenario 1 (High, unchallenged):    89/100 ✓ (confident claim)
Scenario 2 (High, contested):       78/100 ✓ (good punch)
Scenario 3 (Medium, attacker):      72/100 ✗ (hesitant, too deep)
Scenario 4 (Low, flat cross):       85/100 ✓ (perfect timing)
Scenario 5 (Far post, high):        74/100 ✗ (stayed too close)
Scenario 6 (Central, chaos):        81/100 ✓ (commanding punch)
Scenario 7 (Corner, in-swinging):   79/100 ✓
Scenario 8 (Late arrival):          68/100 ✗ (didn't advance enough)

AVERAGE CLAIM RATE: 64% (Elite: 71%)
POSITIONING CONSISTENCY: 73% (Elite: 85%)
AERIAL AUTHORITY: 78/100

KEY INSIGHTS:
✓ STRENGTH: High balls, good timing, confident claims
✗ WEAKNESS: Contested/low crosses; hesitate & position too deep
✗ WEAKNESS: Far-post scenarios; don't advance enough to cut out

ARCHETYPE SIGNAL:
• Sentinel: +15 (commanding, claiming, aerial authority)
• Wall: +10 (positioning consistency, solid timing)
• Bastion: +5 (good reflexes on timed actions)
• Catalyst: -2 (not aggressive enough in contested situations)
• Oracle: -3 (tactical reading of when NOT to come)

DEVELOPMENT: Work on contested-ball scenarios. Advance earlier 
on low crosses. Practice punch technique under pressure.
```

---

## 6. Component Structure (React)

```
AerialSupremacy/
├── AerialSupremacyGame.jsx
│   ├── VideoPlayer.jsx (cross in flight)
│   ├── ScenarioInfo.jsx (cross type, height, distance, attackers, elite %)
│   ├── DepthSlider.jsx (stay → 2m → 4m → 6m)
│   ├── ActionButtons.jsx (Claim | Punch | Let it pass)
│   ├── TimingSlider.jsx (Early | Perfect | Late)
│   ├── Timer.jsx (countdown to decision)
│   └── OutcomeCard.jsx (outcome reveal, score)
├── ResultsScreen.jsx
│   ├── OverallScore.jsx (81/100, percentile, claim rate)
│   ├── ScenarioBreakdown.jsx (bar chart)
│   ├── PositioningHeatmap.jsx (your depth vs. elite)
│   ├── ActionDistribution.jsx (claim vs. punch vs. let pass)
│   ├── AerialAuthorityGauge.jsx (visual gauge)
│   ├── ArchetypeSignal.jsx (Sentinel, Wall contribution)
│   └── ActionButtons.jsx (train again, compare, share)
├── hooks/
│   ├── useAerialState.js (game state, scenario progress)
│   ├── useScoringLogic.js (all scoring functions)
│   └── useVideoSync.js (ball arrival timing)
├── data/
│   ├── scenarios.json (8 cross scenarios)
│   ├── oracleData.json (positioning depth, action distribution)
│   └── archetypeMapping.json (contribution weights)
└── styles/
    ├── AerialSupremacy.css (responsive, video-dominant)
    └── animations.css (outcome reveal, timing feedback)
```

---

## 7. Key Implementation Details

### 7.1 Positioning Depth Slider

**UX Challenge:** How to let player choose depth (stay, 2m, 4m, 6m) intuitively?

**Solution:**
- Slider shows visual representation: keeper position moves on small pitch diagram
- Labels: "Stay on line" | "2m" | "4m" | "6m (Come far out)"
- On selection, visual overlay shows where keeper will be positioned in video

**Code example:**
```javascript
const depthOptions = [
  { label: 'Stay', value: 0, x: 95 },  // 95% across pitch (on goal line)
  { label: '2m', value: 2, x: 75 },    // Advance 2m
  { label: '4m', value: 4, x: 55 },    // Advance 4m
  { label: '6m', value: 6, x: 35 }     // Advance 6m
];

// When slider moves, update keeper position overlay on video
const keeperPositionOverlay = {
  x: depthOptions[selectedDepth].x,
  y: 50, // Center of goal
  radius: 30,
  color: 'rgba(100, 150, 255, 0.5)', // Blue, semi-transparent
  label: 'Your position'
};
```

### 7.2 Jump Timing Slider

**Challenge:** Player needs to choose jump timing (early, perfect, late) intuitively.

**Solution:**
- Slider with audio/visual feedback
- As player adjusts slider, show small animation of keeper jumping at that moment
- Visual shows: "Ball arrives in 0.4s. You jump at..." [slider shows timing]
- Play brief sound effect if timing is optimal

### 7.3 Ball Arrival Calculation

**Challenge:** How does system know when ball arrives?

**Solution:**
1. Ball trajectory is pre-calculated in video (distance × speed = arrival time)
2. Video is encoded with timing metadata: `ballArrivalTime_ms: 2400`
3. System compares player's jump timing to ball arrival
4. Scoring based on ±50ms optimal window

---

## 8. User Flows

### 8.1 First-Time User

```
1. Tap "Aerial Supremacy"
2. Tutorial: "Master high balls"
   • 30-second video showing positioning, action, timing
   • 1 guided scenario with explanations
3. Choose difficulty (easy/medium/hard)
4. Play 6 scenarios (~5 minutes)
5. Results with coaching feedback
```

### 8.2 Returning User

```
1. Tap "Aerial Supremacy"
2. Quick play (skip tutorial)
3. 6 scenarios
4. Results (compare to trend)
5. "Your claim rate improved to 64% (was 58%)"
```

---

## 9. Testing Checklist

- [ ] **Depth slider:** Smooth, responsive, visual overlay accurate
- [ ] **Action buttons:** All three options register correctly
- [ ] **Timing slider:** Audio feedback works (optimal tone)
- [ ] **Video sync:** Ball arrival timing matches expected (±100ms)
- [ ] **Outcome overlay:** Your position (blue) vs. elite (green) displays correctly
- [ ] **Scoring:** Manual calculations match algorithm
- [ ] **Claim success detection:** Video outcome analysis works
- [ ] **Mobile controls:** Sliders work on touch (not just mouse)
- [ ] **Accessibility:** Colorblind mode (different icons for actions)

---

## 10. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Video player (cross in flight, high-contrast ball trajectory)
- [ ] Scenario info card (cross type, height, distance, elite rate)
- [ ] Depth slider styling (visual keeper position indicator, labels)
- [ ] Action button group (Claim/Punch/Let Pass, icons, tap states)
- [ ] Timing slider (audio feedback on perfect timing, visual jump preview)
- [ ] Outcome reveal (fade-in, heatmap of your vs. elite position)
- [ ] Results screen (claim rate, action distribution pie chart, authority gauge)
- [ ] Typography (large, clear on mobile)
- [ ] Color scheme (blue keeper, green elite, red outcome)
- [ ] Icons (claim, punch, pass, ball, whistle)

---

## 11. Content Requirements

**Videos:** 8 cross scenarios × 2 takes = 16 video clips (2–4 seconds each)  
**Audio:** Ball arrival chime (optional), punch/claim sound effects  
**Guidance text:** Tutorial, scenario info, outcome feedback  

---

## 12. Next Steps

1. **Film/source cross scenarios** (8 variations)
2. **Calculate ball arrival timing** for each scenario
3. **Design depth + timing controls** in Claude Design
4. **Build scoring logic** (test with manual trials)
5. **Playtest with 5 keepers** (gather feedback on control clarity)
6. **Refine claim success detection**
7. **Integrate with archetype system**
8. **Launch Phase 2**

---

**Status:** Ready for Claude Design handoff. Cross scenario videos with clear ball trajectory must be prepared.

