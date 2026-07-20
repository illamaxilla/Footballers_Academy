# High Pressure Keeper — Claude Design Build Specification
## Psychological Resilience Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Lethole et al. 2024 ("Goalkeepers are players too")  
**Type:** Rapid-fire decision game under stress  
**Platform:** Web (desktop/mobile) + React + Canvas  
**Duration:** 5–10 minutes per session  

---

## 1. Executive Summary

**High Pressure Keeper** measures how a goalkeeper's **decision-making quality, consistency, and bravery change under simulated match stress**. Players face 10–12 quick tactical decisions (2–3 seconds each) in an increasingly high-pressure scenario (90th minute, score tied, penalty shootout looming). System tracks:

- Decision quality vs. their baseline
- Response hesitation under pressure
- Consistency (do they second-guess themselves?)
- Bravery index (how often choose aggressive options?)
- Confidence recovery (bounce back after mistakes?)

**Key differentiator:** First goalkeeper app to assess psychological resilience interactively. Coaches love stress-testing talent.

---

## 2. Game Flow

```
START SCREEN
   ↓
"SET THE SCENE: 90th minute, score 1-1.
 Extra time in 10 minutes if this doesn't resolve.
 Penalty shootout possible.
 You're feeling the pressure."
   ↓
STRESS DIAL appears (visual feedback)
   • Stress level: LOW → increases with each scenario
   • Heart rate indicator: 72 BPM → accelerates
   • Pressure score: 0% → 100%
   ↓
RAPID-FIRE SCENARIOS (10 scenarios, 2.5 sec each)
   
   Scenario 1 (Stress 10%):
   Video: "Long-range shot from 25m"
   Choice: Stay on line [ ] | Advance 1m [ ]
   Time remaining: 2.5s countdown
   
   Scenario 2 (Stress 20%):
   Video: "Cross incoming from right wing"
   Choice: Come claim [ ] | Stay on line [ ]
   
   Scenario 3 (Stress 30%):
   Video: "Back pass. Attacker pressing from behind"
   Choice: Quick distribution [ ] | Controlled build [ ]
   
   [... 7 more scenarios, stress increasing ...]
   
   Scenario 10 (Stress 100%):
   Video: "Attacking player 1v1, 12m out"
   Choice: Advance & challenge [ ] | Stay on line & react [ ]
   
   ↓
OUTCOME REVEAL
   Each choice shows: "You chose X. This happened: [video outcome]"
   Live feedback:
   • "Good decision—elite keepers choose this 71% of the time"
   • "Risky—but sometimes it works"
   • "Hesitation cost you 300ms reaction time"
   
   ↓
RESULTS SCREEN
   Scores, breakdown, archetype signal, development edge
```

---

## 3. Visual Design & Interface

### 3.1 Stress Indicator System

**Top-left corner (always visible):**

```
╔════════════════════════════════════╗
║ 90' — EXTRA TIME LOOMING             ║
├────────────────────────────────────┤
║ ❤️ HEART RATE: 72 → 95 BPM          ║
║ [████░░░░░░] 48% Elevation         ║
│                                     │
║ 🎯 PRESSURE LEVEL: 34%              ║
║ [███░░░░░░░░░░░░] Rising           ║
│                                     │
║ ⏱️ TIME REMAINING: 2.5 seconds      ║
║ [█████████░] Counting down         ║
╚════════════════════════════════════╝
```

**Visual cues (subtle, immersive):**
- Screen gradually darkens as stress increases
- Slight screen shake/vibration on mobile (haptic feedback if available)
- Audio: Ambient crowd noise increases in volume as stress rises
- Breathing indicator: Player's breathing rate on screen (visual only, no audio)

### 3.2 Decision Buttons

**Two-choice layout (full width, tap-friendly):**

```
┌─────────────────────────────────────────────────┐
│  WHAT DO YOU DO?                                │
├─────────────────────────────────────────────────┤
│                                                 │
│  [🔵 CHOICE A - DESCRIPTION]                   │
│  (Example: "Advance & claim the cross")        │
│  (Typical elite rate: 68%)                     │
│                                                 │
│  [🔴 CHOICE B - DESCRIPTION]                   │
│  (Example: "Stay on line & wait")              │
│  (Typical elite rate: 32%)                     │
│                                                 │
│  ⏰ 2.5 seconds remaining                       │
│  [████████░░░░░░░░░░░░] Timer bar              │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Color coding:**
- Blue = Conservative, safe choice
- Red = Aggressive, risky choice
- Gold/yellow = Balanced option (if 3-way choice)

### 3.3 Mobile Responsiveness

**Landscape (default):**
- Video on left 50%, decision buttons on right 50%
- Stress indicator top-right
- Timer visible above buttons

**Portrait (alternative):**
- Video full width at top 60%
- Decision buttons full width below
- Stress indicator left side, scrollable

---

## 4. Decision Scenarios (10–12 Total)

Each scenario is a **2–3 second video clip** from a goalkeeper's perspective, paused at a decision point. Player must choose within 2.5 seconds.

### Scenario Library (Research-backed, Tactical)

| Scenario | Video Description | Choice A (Safe) | Choice B (Risky) | Stress Level | Research |
|----------|---|---|---|:---:|---|
| **1. Far-range shot** | Ball 25m out, headed toward goal | Stay on line (71% elite choice) | Advance 1m (29%) | 10% | Positioning model |
| **2. Incoming cross** | Cross from right wing, chest-high | Stay on line (32%) | Come & claim (68%) | 20% | Cross management, aerial command |
| **3. Back pass pressure** | Attacker pressing tight on back pass | Quick distribution (55%) | Controlled build (45%) | 30% | Distribution risk, pressure |
| **4. Loose ball melee** | Multiple players near ball in box | Punch clear (40%) | Come & claim (60%) | 40% | Aerial decision, command |
| **5. 1v1 situation** | Attacker 15m out, running at keeper | Stay on line (42%) | Advance & narrow (58%) | 50% | 1v1 tactics |
| **6. Deflected shot** | Defender deflects attempt toward near post | Reactive dive (50%) | Proactive reposition (50%) | 60% | Reflex vs. anticipation |
| **7. High press** | Opponent pressing hard, few passing lanes | Long clearance (35%) | Short pass (risk) (65%) | 70% | Risk appetite, distribution |
| **8. Cross + attacker** | Cross incoming + attacker 8m out | Claim aggressively (60%) | Stay & cover (40%) | 80% | Aerial command, positioning |
| **9. Penalty area scramble** | Loose ball, multiple players challenging | Punch aggressively (50%) | Stay back & cover (50%) | 90% | Aerial decision under chaos |
| **10. Final moment** | 1v1, 12m out, deep into injury time | Advance & challenge (45%) | Stay & react (55%) | 100% | Pressure + stakes |

**Note:** All scenarios use **standardized video clips** (same attackers/situations, filmed once). Video angle is from keeper's perspective (birds-eye or slightly elevated), consistent with Positioning Master clips.

---

## 5. Scoring Logic

### 5.1 Per-Scenario Scoring

```javascript
function scoreScenario(playerChoice, stressLevel, timeToDecide) {
  // 1. Baseline accuracy (vs. oracle choice distribution)
  const oracleChoiceA_pct = 68; // Elite keepers choose A 68% of the time
  const oracleChoiceB_pct = 32;
  
  const playerScore = (playerChoice === 'A')
    ? oracleChoiceA_pct
    : oracleChoiceB_pct;
  // If player chose A (elite choice), their base score = 68/100
  
  // 2. Adjust for decision speed (hesitation penalty)
  const timeAvailable = 2500; // 2.5 seconds in ms
  const hesitationFactor = 1 - (Math.max(0, timeAvailable - timeToDecide) / timeAvailable * 0.15);
  // Max 15% penalty for using full time (indicates hesitation)
  
  // 3. Adjust for stress impact (consistency under pressure)
  const baselineAccuracy = playerBaseline; // From low-stress games
  const pressureImpact = baselineAccuracy - playerScore;
  const stressResilience = 1 - (pressureImpact / 100) * (stressLevel / 100);
  // Penalty if performance drops under stress
  
  // 4. Bravery bonus (choosing aggressive/risky option)
  const braveryBonus = (playerChoice === 'B') ? 5 : 0;
  // +5 points for choosing the riskier option (if it was viable)
  
  // Final score
  const scenarioScore = Math.round(
    (playerScore * hesitationFactor * stressResilience) + braveryBonus
  );
  
  return {
    score: scenarioScore,
    hesitationPenalty: 1 - hesitationFactor,
    pressureDelta: pressureImpact,
    braveryBonus: braveryBonus
  };
}
```

### 5.2 Session-Level Metrics

**After all 10 scenarios:**

```
┌─────────────────────────────────────────────────┐
│ HIGH PRESSURE KEEPER — RESULTS                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ OVERALL PERFORMANCE                             │
│ ├─ Accuracy Score: 74/100                       │
│ ├─ Percentile: 68th                             │
│ └─ Pressure resilience: 82% (strong)            │
│                                                 │
│ BREAKDOWN                                       │
│ ├─ Low stress (scenarios 1–3): 81/100          │
│ ├─ Medium stress (scenarios 4–7): 75/100       │
│ └─ High stress (scenarios 8–10): 64/100        │
│                                                 │
│ PRESSURE DELTA: -17 points                      │
│ (You scored 17 points lower under stress)      │
│ (Elite average delta: -8 points)                │
│                                                 │
│ HESITATION INDEX: 23%                           │
│ (You hesitated on 23% of decisions)             │
│ (Elite: 12%)                                    │
│                                                 │
│ BRAVERY INDEX: 40%                              │
│ (You chose aggressive options 40% of time)      │
│ (Squad average: 52%)                            │
│ (Buffon: 58% | Neuer: 68%)                      │
│                                                 │
│ CONSISTENCY SCORE: 71%                          │
│ (You varied 29% from your own decisions)        │
│ (Elite: 88% consistency)                        │
│                                                 │
├─────────────────────────────────────────────────┤
│ KEY INSIGHTS                                    │
│                                                 │
│ ✓ STRENGTH: Perform well in low-stress moments │
│             (81/100). Make smart choices early. │
│                                                 │
│ ✗ WEAKNESS: Pressure affects your confidence.  │
│             Under high stress, hesitation       │
│             increases & accuracy drops 17 pts.  │
│                                                 │
│ 🎯 DEVELOPMENT: Mental resilience training.    │
│             Practice decision-making under     │
│             time pressure. Work on confidence  │
│             recovery after mistakes.           │
│                                                 │
│ 🏆 ARCHETYPE SIGNAL                            │
│ • Bastion: ✗ Low consistency under stress      │
│ • Sentinel: ✗ Hesitates when commanding        │
│ • Catalyst: ✓ Takes risks, but inconsistently  │
│ • Oracle: ✗ Strategic acumen fades under stress│
│ • Wall: ✓ Stable, but could be more aggressive │
│                                                 │
├─────────────────────────────────────────────────┤
│ [COMPARE TO LAST SESSION] [SHARE RESULTS]       │
│ [TRAIN AGAIN] [VIEW BREAKDOWN]                  │
└─────────────────────────────────────────────────┘
```

---

## 6. Data Model

### 6.1 Session Data

```javascript
const highPressureSession = {
  sessionID: "hp_20260711_xyz789",
  playerID: "gk_user_456",
  gameType: "high_pressure_keeper",
  startTime: "2026-07-11T14:30:00Z",
  endTime: "2026-07-11T14:37:00Z",
  duration_seconds: 420,
  
  scenarios: [
    {
      scenarioIndex: 0,
      scenarioType: "far-range-shot",
      videoClipID: "far_shot_001",
      oracleChoice: "stay-on-line", // 71% of elite choose this
      oracleDistribution: { a: 71, b: 29 },
      
      playerChoice: "stay-on-line", // Chose A (safe, elite choice)
      timeToDecide_ms: 1800, // Made choice at 1.8 seconds (400ms hesitation)
      stressLevel_at_decision: 10,
      
      score: 68, // Base oracle, minus hesitation penalty
      hesitationPenalty: 0.15,
      braveryBonus: 0,
      finalScore: 58,
      
      feedback: "Good choice—elite keepers stay on line 71% of the time. Quick decision."
    },
    // ... 9 more scenarios
  ],
  
  summary: {
    totalScore: 74,
    percentile: 68,
    pressureResilience: 82,
    pressureDelta: -17, // Dropped 17 points under stress vs. baseline
    hesitationIndex: 23,
    braveryIndex: 40,
    consistencyScore: 71,
    stressProgression: [81, 78, 75, 72, 70, 68, 65, 64, 62, 64] // Scores per scenario
  },
  
  archetypeContribution: {
    bastion: -5, // Low consistency under stress
    sentinel: -3, // Hesitates when commanding
    catalyst: +8, // Takes risks
    oracle: -2, // Strategic acumen fades
    wall: +5 // Stable baseline
  }
};
```

### 6.2 Historical Tracking

```javascript
// Player's session history
const playerHistory = [
  {
    date: "2026-07-04",
    score: 71,
    pressureDelta: -12,
    hesitationIndex: 18,
    braveryIndex: 35
  },
  {
    date: "2026-07-11",
    score: 74,
    pressureDelta: -17,
    hesitationIndex: 23,
    braveryIndex: 40 // Improvement: +5 points, but pressure delta worsened
  }
];

// Trend: Accuracy improving (+3), but consistency under stress declining (-5 delta)
// Development: Work on mental resilience
```

---

## 7. Component Structure (React)

```
HighPressureKeeper/
├── HighPressureGame.jsx
│   ├── StressIndicator.jsx (top-left, always visible)
│   ├── VideoPlayer.jsx (video clip display)
│   ├── DecisionButtons.jsx (Choice A / Choice B, full-width)
│   ├── Timer.jsx (countdown + progress bar)
│   └── FeedbackOverlay.jsx (post-choice reveal, brief)
├── ResultsScreen.jsx
│   ├── ScoreCard.jsx (overall score, percentile)
│   ├── BreakdownChart.jsx (stress-level performance curve)
│   ├── ArchetypeSignal.jsx (which archetypes benefit)
│   ├── InsightCard.jsx (strength, weakness, development)
│   └── ActionButtons.jsx (compare, share, train again)
├── hooks/
│   ├── useHighPressureState.js (session state mgmt)
│   ├── useStressProgression.js (stress level calculation)
│   └── useScoringLogic.js (scoring per scenario)
├── data/
│   ├── scenarios.json (10 scenario descriptions + video URLs)
│   ├── oracleDistribution.json (elite choice %s per scenario)
│   └── archetypeMapping.json (contribution weights)
└── styles/
    ├── HighPressureKeeper.css (responsive, dark theme with stress color shifts)
    └── animations.css (screen shake, heart rate pulse, stress dial animations)
```

---

## 8. Key Implementation Details

### 8.1 Stress Progression Algorithm

```javascript
function calculateStressLevel(scenarioIndex, sessionDuration) {
  // Linear progression: 0% → 100% stress over 10 scenarios
  const baseStress = (scenarioIndex / 9) * 100;
  
  // Bonus stress from time pressure (if player hesitates)
  const timePressureBonus = (playerTimeTaken / availableTime) * 10;
  
  // Bonus stress from mistakes (wrong choice on last scenario)
  const mistakeBonus = (playerChoiceWasWrong) ? 15 : 0;
  
  return Math.min(100, baseStress + timePressureBonus + mistakeBonus);
}
```

### 8.2 Video Playback

**Autoplay each scenario video** (2 seconds), then **pause at decision point**. Player sees video, then makes choice. After choice, brief outcome video plays (0.5–1 second) showing result.

**Video format:**
- MP4, H.264, 1280×720, 30fps
- Clips sourced from Positioning Master scenario library (or filmed new)
- Keeper's perspective (birds-eye or elevated angle)

### 8.3 Audio Design

- **Ambient:** Crowd noise, gradually increasing in volume as stress rises
- **Decision feedback:** Subtle chime (correct) or soft buzz (incorrect)
- **Heart rate:** Optional pulsing audio effect (subtle, not intrusive)
- **Mute option:** Always available in settings

### 8.4 Accessibility

- **Colorblind mode:** Blue/Red choices also labeled with icons (shield/lightning)
- **Text sizing:** Adjustable font size
- **Screen reader:** All UI elements labeled
- **Haptic feedback:** Optional vibration on decision (mobile)

---

## 9. User Flows

### 9.1 First-Time User

```
1. Tap "High Pressure Keeper" from game menu
2. Intro screen: "Test your composure under match stress"
   • 1-minute tutorial video (showing 2 example scenarios)
3. Start game (10 scenarios, ~7 minutes)
4. Results screen with development recommendations
5. Option to train again or return to dashboard
```

### 9.2 Returning User

```
1. Tap "High Pressure Keeper"
2. Quick play (skip tutorial)
3. 10 scenarios
4. Results (with comparison to previous session)
5. Trend graph (pressure delta over time)
```

### 9.3 Coach/Academy Dashboard

```
Coach sees:
• Squad leaderboard (High Pressure Keeper scores)
• Hesitation index across squad (who folds under pressure?)
• Bravery index (who takes risks? who's too conservative?)
• Recommendation: "Lucas (51) & Emma (54) need mental resilience training"
```

---

## 10. Testing Checklist

- [ ] **Scenario videos:** All 10 load correctly, autoplay, pause at decision point
- [ ] **Decision buttons:** Both choices register immediately on tap
- [ ] **Timer:** Countdown accurate (±100ms tolerance)
- [ ] **Stress dial:** Visual feedback responsive to progression
- [ ] **Scoring logic:** Manual calculation matches algorithm (10 test cases)
- [ ] **Results screen:** All metrics display correctly
- [ ] **Archetype signal:** Contribution weights sum to expected totals
- [ ] **Mobile responsiveness:** Portrait & landscape, all text readable
- [ ] **Accessibility:** Colorblind mode, text sizing, screen reader compatibility
- [ ] **Audio:** Ambient crowd noise, decision feedback, mute toggle works
- [ ] **Performance:** <3 second load per scenario, no stuttering

---

## 11. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Stress indicator design (visual spec for dial, heart rate, pressure gauge)
- [ ] Decision button styling (blue/red, icon choices, hover states)
- [ ] Timer progress bar animation
- [ ] Results screen layout (cards, charts, insights)
- [ ] Color theme (dark mode, stress progression color shifts: green → yellow → red)
- [ ] Typography (hierarchy: title, subtitle, metric labels, feedback text)
- [ ] Spacing & alignment (mobile-first, full-width, touch-friendly)
- [ ] Icons (bravery, consistency, pressure, feedback)
- [ ] Animations (screen shake on high stress, heart rate pulse, fade-ins)
- [ ] Responsive breakpoints (mobile 320px, tablet 768px, desktop 1200px)

---

## 12. Content Requirements

**Scenarios:** 10 video clips (2–3 seconds each, from Positioning Master library or newly filmed)  
**Audio:** Ambient crowd noise file (30–90 seconds, loops)  
**Guidance text:** UI copy for intro, scenarios, results, feedback  
**Archetype framework:** Updated with Bastion/Sentinel/Catalyst/Oracle/Wall weights  

---

## 13. Next Steps

1. **Confirm scenario videos** (use existing Positioning Master library or film new)
2. **Design stress indicator** visual (dial, heart rate, pressure gauge)
3. **Prototype in Claude Design** (flow, decision buttons, results screen)
4. **Playtest with 5 keepers** (gather feedback on stress progression, decision clarity)
5. **Refine scoring logic** based on playtest data
6. **Integrate with archetype system** (wire score contributions to player profile)
7. **Launch Phase 2**

---

**Status:** Ready for Claude Design handoff. Scenario videos and audio assets must be secured before build begins.

