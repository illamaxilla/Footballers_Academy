# Command the Defense — Claude Design Build Specification
## Leadership & Communication Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Lethole et al. 2024 (social/communication skills, leadership)  
**Type:** Decision-making + scenario response game  
**Platform:** Web (desktop/mobile) + React  
**Duration:** 5–7 minutes per session  

---

## 1. Executive Summary

**Command the Defense** assesses goalkeeper **leadership, tactical communication, and ability to organize defenders**. Players watch 8–10 defensive scenarios (set plays, dangerous situations) and make tactical decisions by giving instructions to defenders:

- "Push forward!"
- "Drop deep and cover"
- "Mark zonally"
- "Stay tight on your man"
- etc.

System scores based on:
- **Tactical appropriateness** (was the instruction right for the situation?)
- **Clarity** (would defenders understand/execute?)
- **Leadership presence** (confidence level in instruction)
- **Outcome** (video shows what happened after instruction)
- **Consistency** (decision patterns across scenarios)

**Key differentiator:** First goalkeeper game to assess communication/leadership interactively.

---

## 2. Game Flow

```
START → "COMMAND THE DEFENSE: Leadership Test"
   ↓
SCENARIO LOADS
Video: Defensive setup (corner kick, free kick, open play danger)
Audio: Match ambience, anticipation
   ↓
DECISION POINT
Video pauses. Player sees:
┌────────────────────────────────────┐
│ WHAT'S YOUR INSTRUCTION?           │
├────────────────────────────────────┤
│ Tactical options (dropdown):        │
│ ○ Push forward & press             │
│ ○ Drop deep & cover                │
│ ○ Defend zonally                   │
│ ○ Mark man-to-man                  │
│ ○ Goalkeeper's ball—come claim it! │
│                                    │
│ Confidence level:                  │
│ [Whisper] [Speak] [Command loudly] │
│                                    │
│ [CONFIRM INSTRUCTION]              │
└────────────────────────────────────┘
   ↓
VIDEO RESUMES
Shows:
• Defender reactions (do they execute?)
• Play outcome (attack succeeds/fails, chance created/cleared)
   ↓
FEEDBACK
"You commanded: 'Push forward & press'"
"Confidence: Commanding (strong)"
"Defenders responded: 92% (good execution)"
"Outcome: Tackle won, ball cleared"
"Score: 89/100"
   ↓
REPEAT (8–10 scenarios)
```

---

## 3. Scenarios (8–10 Total)

| Scenario | Situation | Optimal Tactic | Difficulty |
|----------|---|---|---|
| **1. Set play (corner)** | Attacking corner coming in | Mark zonally OR man-to-man | Medium |
| **2. Set play (free kick)** | Dangerous free kick position | Organize wall, defend near post | Medium |
| **3. Open play (dangerous pass)** | Opposition breaking through | Drop & cover OR press | Medium-High |
| **4. Counterattack threat** | Fast break against us | Fall back & reorganize | Medium |
| **5. Through-ball danger** | Striker receiving through-ball | Push up & offside OR stay | Hard |
| **6. Aerial threat** | High ball incoming | "Keeper's ball!" OR stay | Easy |
| **7. High press (vs. opponent)** | Opponent possession, pressing us | Quick distribution OR stay solid | Medium |
| **8. Losing possession** | Turnover in defense, regrouping | Reorganize & mark tight | Hard |

---

## 4. Scoring Logic

```javascript
function scoreCommandTactic(playerChoice, scenarioType, confidence) {
  // Get oracle optimal tactic for this scenario
  const optimalTactic = scenarioOracleData[scenarioType];
  // e.g., "mark-zonally" (70%), "man-to-man" (20%), "press" (10%)
  
  const tacticScore = optimalTactic[playerChoice] || 0;
  // Score = % of elite keepers who'd choose this tactic
  
  // Confidence multiplier
  const confidenceMultiplier = {
    'whisper': 0.7,
    'speak': 1.0,
    'command': 1.1
  }[confidence];
  
  // Defender execution (video analysis: did they follow instruction?)
  const executionScore = analyzeDefenderResponse(playerChoice, scenario);
  
  // Outcome adjustment (did it work?)
  const outcomeBonus = (scenario.outcome === 'success') ? 1.0 :
                       (scenario.outcome === 'partial') ? 0.85 :
                       (scenario.outcome === 'failed') ? 0.6 : 0.7;
  
  const commandScore = Math.round(
    (tacticScore * 0.4 + executionScore * 0.35 + 85 * 0.25) *
    confidenceMultiplier * outcomeBonus
  );
  
  return {
    tacticScore,
    executionScore,
    confidence: confidenceMultiplier * 100,
    finalScore: commandScore
  };
}
```

---

## 5. Component Structure (React)

```
CommandTheDefense/
├── CommandGame.jsx
│   ├── VideoPlayer.jsx (defensive scenario)
│   ├── TacticSelector.jsx (dropdown menu of options)
│   ├── ConfidenceSlider.jsx (whisper/speak/command)
│   ├── Timer.jsx (decision countdown)
│   └── OutcomeFeedback.jsx (what happened after instruction)
├── ResultsScreen.jsx
│   ├── LeadershipScore.jsx (78/100)
│   ├── TacticAccuracyCard.jsx (decisions vs. optimal)
│   ├── CommunicationClarity.jsx (defender execution rate)
│   ├── ConfidenceProfile.jsx (distribution of confidence levels used)
│   ├── ArchetypeSignal.jsx (Sentinel +15)
│   └── ActionButtons.jsx
├── hooks/
│   ├── useCommandState.js
│   ├── useScoringLogic.js
│   └── useVideoSync.js
├── data/
│   ├── scenarios.json
│   ├── oracleData.json (optimal tactics per scenario)
│   └── archetypeMapping.json
└── styles/
    ├── CommandTheDefense.css
    └── animations.css
```

---

## 6. Results Example

```
COMMAND THE DEFENSE — LEADERSHIP SCORE: 78/100
Percentile: 68th

SCENARIO BREAKDOWN:
Scenario 1 (Corner): 85/100 ✓ (correct tactic, good clarity)
Scenario 2 (Free kick): 72/100 ✗ (hesitant, defenders confused)
Scenario 3 (Dangerous pass): 80/100 ✓
Scenario 4 (Counterattack): 75/100 ✓
Scenario 5 (Through-ball): 68/100 ✗ (risky call, worked)
Scenario 6 (Aerial): 92/100 ✓ (decisive, clear)
Scenario 7 (Possession): 76/100 ✓
Scenario 8 (Turnover): 74/100 ✗ (slow decision)

TACTICAL ACCURACY: 72%
Your choices matched elite 72% of the time

COMMUNICATION CLARITY: 85%
Defenders executed your instructions 85% of the time
(Elite: 92%)

CONFIDENCE DISTRIBUTION:
Whisper: 12% (too conservative)
Speak: 65% (balanced)
Command: 23% (assertive)

ARCHETYPE SIGNAL:
• Sentinel: +15 (commanding, organizing defense)
• Oracle: +8 (tactical awareness)
• Catalyst: +3 (aggressive decision-making)
• Wall: -2 (command less important for reflexive style)

DEVELOPMENT: Increase confidence in high-pressure moments. 
Work on free-kick positioning clarity.
```

---

## 7. Testing Checklist

- [ ] **Scenario videos:** Load correctly, pause at decision point
- [ ] **Tactic selector:** Dropdown works, options clear
- [ ] **Confidence slider:** Visual feedback
- [ ] **Defender execution:** Analysis accuracy (did they follow instruction?)
- [ ] **Outcome analysis:** Correct detection of scenario success/failure
- [ ] **Scoring:** Matches oracle data expectations

---

## 8. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Video player (defensive scenario, clear positioning)
- [ ] Tactic dropdown (readable options, clear icons)
- [ ] Confidence slider (visual progression: quiet → confident)
- [ ] Results screen (leadership score prominent, clarity + execution bars)
- [ ] Archetype signal (Sentinel focus)

---

**Status:** Ready for Claude Design. Defensive scenario videos needed.

