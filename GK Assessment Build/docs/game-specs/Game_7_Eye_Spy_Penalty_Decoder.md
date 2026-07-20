# Eye Spy: Penalty Decoder — Claude Design Build Specification
## Visual Search Patterns & Cue Detection Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Savelsbergh et al. 2005, 2002 (visual search, anticipation, eye-tracking)  
**Type:** Video prediction + gaze-pattern assessment game  
**Platform:** Web (desktop/mobile) + React  
**Duration:** 4–6 minutes per session  

---

## 1. Executive Summary

**Eye Spy: Penalty Decoder** measures goalkeeper **visual search efficiency and cue detection during penalty kicks**. Players watch penalty kicks and try to predict direction, while the system analyzes WHERE they're focusing their attention.

**Research insight:** Elite keepers fixate on the **non-kicking leg and kicking leg** of the shooter (predictive cues). Novices waste time looking at **trunk, arms, hips** (non-predictive).

System scores based on:
- **Prediction accuracy** (did you guess the right direction?)
- **Cue efficiency** (where were you looking? Right areas?)
- **Decision timing** (did you commit early or wait?)
- **Visual search consistency** (do you use the same pattern each time?)

**Key implementation:** MVP uses post-video gaze-marking (player marks focus areas AFTER watching). Future: integrate optional eye-tracker hardware.

---

## 2. Game Flow (MVP Version)

```
START → "EYE SPY: Penalty Decoder"
   ↓
INSTRUCTIONS
"Watch penalty kicks and predict direction.
 After each kick, mark WHERE you looked."
   ↓
SCENARIO LOADS
Video: Penalty kick from keeper's perspective
   • Shooter runs up
   • Takes shot
   • Ball goes left/right/center
   ↓
VIDEO PLAYS (3–4 seconds)
   ↓
PREDICTION PROMPT
"Which direction did the ball go?"
Options: [Left] [Center] [Right]
Player chooses
   ↓
GAZE MARKING (POST-VIDEO)
Video pauses at key moment (shooter's foot contact)
Player sees stillframe of shooter
"Where did you look during this penalty?
 Mark the areas you focused on."

Interactive image with clickable zones:
┌──────────────────────────────┐
│ Shooter's body               │
├──────────────────────────────┤
│ [Trunk]      [Arms/shoulders]│
│  (30%)          (10%)        │
│                              │
│ [Hips]      [Kicking leg]   │
│  (20%)          (30%)        │
│              [Non-kicking]   │
│              [leg] (10%)     │
│                              │
│ Question: "Which areas did   │
│ you focus on? (Select all)"  │
│                              │
│ ☑ Kicking leg               │
│ ☐ Non-kicking leg           │
│ ☑ Trunk                     │
│ ☐ Arms                      │
│ ☐ Hips                      │
│                              │
│ [CONFIRM GAZE MARKING]       │
└──────────────────────────────┘
   ↓
FEEDBACK + COMPARISON
"You predicted: LEFT (correct!) ✓
 Prediction accuracy: 67/100

 Your gaze pattern:
 - Focused: Kicking leg (30%), Trunk (35%), Arms (20%)
 - Elite gaze pattern: Kicking leg (45%), Non-kicking leg (35%)

 Efficiency: You spent 35% on trunk (low-value cue).
 Elite keepers spend only 15% on trunk.

 Cue quality score: 62/100
 Decision timing: Good (committed early)"
   ↓
REPEAT (8 penalties total)
```

---

## 3. Penalty Library (8 Total)

| Scenario | Distance | Angle | Shooter Type | Difficulty |
|----------|:---:|---|---|---|
| **1. Straight, central** | 12m | Directly in front | Right-footer | Easy |
| **2. Straight, central** | 12m | Directly in front | Left-footer | Easy |
| **3. From left side** | 12m | Right side angle | Right-footer | Medium |
| **4. From right side** | 12m | Left side angle | Left-footer | Medium |
| **5. Difficult angle (far post)** | 12m | 30° angle | Right-footer (left-footed shot) | Hard |
| **6. Weak-footed shooter** | 12m | Central | Right-footer, taking left | Hard |
| **7. Run-up disguise** | 12m | Central | Right-footer (tries to disguise) | Hard |
| **8. High pressure** | 12m | Central | Left-footer (late-game situation) | Hard |

---

## 4. Scoring Logic

```javascript
function scoreEyeSpy(prediction, gazePattern, decisionTiming) {
  // 1. Prediction accuracy
  const predictionScore = (prediction.correct) ? 100 : 50;
  
  // 2. Gaze pattern quality (vs. elite)
  const eliteGaze = {
    kickingLeg: 0.45,
    nonKickingLeg: 0.35,
    trunk: 0.15,
    arms: 0.03,
    hips: 0.02
  };
  
  const playerGaze = normalizeGazePattern(gazePattern);
  
  // Calculate efficiency (chi-square or cosine similarity)
  const gazeEfficiency = cosineSimilarity(playerGaze, eliteGaze) * 100;
  // Returns 0–100, where 100 = identical to elite
  
  // 3. Decision timing
  const timingScore = (decisionTiming === 'early') ? 90 :
                     (decisionTiming === 'perfect') ? 100 :
                     (decisionTiming === 'late') ? 70 : 50;
  
  const scenarioScore = Math.round(
    (predictionScore * 0.35 + gazeEfficiency * 0.40 + timingScore * 0.25)
  );
  
  return {
    predictionScore,
    gazeEfficiency,
    timingScore,
    finalScore: scenarioScore
  };
}
```

---

## 5. Component Structure (React)

```
EyeSpy/
├── EyeSpyGame.jsx
│   ├── VideoPlayer.jsx (penalty kick, 3–4 sec)
│   ├── PredictionButtons.jsx (Left/Center/Right)
│   ├── GazeMarking.jsx (post-video gaze-area selection)
│   ├── DecisionTimingGauge.jsx (early/perfect/late)
│   └── FeedbackCard.jsx (prediction + gaze comparison)
├── ResultsScreen.jsx
│   ├── PenaltyDecoder Score.jsx (72/100)
│   ├── PredictionAccuracy.jsx (67% correct)
│   ├── GazeEfficiency.jsx (your pattern vs. elite heatmap)
│   ├── CueQuality.jsx (where you spent attention)
│   ├── ArchetypeSignal.jsx (Oracle +12)
│   └── ActionButtons.jsx
├── hooks/
│   ├── useEyeSpyState.js
│   ├── useGazePattern.js (pattern normalization)
│   ├── useScoringLogic.js
│   └── useVideoSync.js
├── data/
│   ├── penalties.json (8 penalty videos + metadata)
│   ├── eliteGazeData.json (elite gaze distributions)
│   └── archetypeMapping.json
└── styles/
    ├── EyeSpy.css
    └── animations.css (gaze heatmap fade-in)
```

---

## 6. Results Example

```
EYE SPY: PENALTY DECODER — SCORE: 72/100
Percentile: 65th

PENALTY PREDICTION ACCURACY: 67% (5/8 correct)
Correct: Penalties 1, 2, 4, 6, 8
Missed: Penalties 3 (guessed left, was right), 5 (guessed center, was left), 7 (guessed right, was center)

GAZE PATTERN ANALYSIS:

Your gaze distribution:
• Kicking leg: 32% (elite: 45%) → -13 points
• Non-kicking leg: 18% (elite: 35%) → -17 points
• Trunk: 28% (elite: 15%) → +13 points (wasted)
• Arms: 15% (elite: 3%) → +12 points (wasted)
• Hips: 7% (elite: 2%) → +5 points (wasted)

Gaze efficiency score: 58/100
You focus on the WRONG cues (trunk, arms) 43% of the time.
Elite keepers focus on legs 80% of the time.

CUE QUALITY BREAKDOWN:
🔴 Trunk fixation: 28% (elite: 15%)
   "You spend too much time on the shooter's torso.
    This is a low-value cue—the legs reveal direction."

🟡 Kicking leg focus: 32% (elite: 45%)
   "You look at the kicking leg, but not enough.
    Elite keepers lock onto it earlier in the run-up."

🟡 Non-kicking leg: 18% (elite: 35%)
   "Missing critical cue. Elite keepers read weight shift
    from the non-kicking leg (reveals direction bias)."

🟢 Arms: 15% (acceptable)
   "Some arm attention is normal (visual noise),
    but keep it under 5% ideally."

DECISION TIMING:
Committed early: 5 penalties (good)
Committed late: 3 penalties (hesitation visible)

Average reaction: 480ms (elite: 400ms)

ARCHETYPE SIGNAL:
• Oracle: +12 (visual search, cue reading)
• Bastion: -3 (relies on reflexes, not anticipation)
• Catalyst: -1 (isn't reading pre-shot cues)

DEVELOPMENT:
1. Train visual search: Focus on legs, not trunk
2. Read the non-kicking leg earlier (reveals weight shift)
3. Practice with eye-tracking data (optional upgrade)
4. Work on early commitment (reduce hesitation)

ELITE COMPARISON VIDEO:
[Watch side-by-side: your gaze pattern vs. Buffon's,
 overlaid on same penalty]
```

---

## 7. Gaze Heatmap Visualization

**Post-game, optional eye-tracking display:**

```
YOUR GAZE PATTERN (Heatmap):
┌──────────────────────────────┐
│ Shooter's body (stillframe)   │
│                              │
│ [🔵 High]  [🟡 Medium]       │
│ [🔴 Very high]  [⚪ None]    │
│                              │
│ Actual heatmap overlay:       │
│                              │
│ Trunk: 🔴 28% (bright red)   │
│ Kicking leg: 🟡 32% (yellow) │
│ Non-kicking: ⚪ 18% (dim)    │
│ Arms: 🔴 15% (red)           │
│ Hips: ⚪ 7% (very dim)       │
│                              │
│ ELITE GAZE PATTERN (overlay): │
│ Kicking leg: 🟢 45% (bright) │
│ Non-kicking: 🟢 35% (bright) │
│ Trunk: ⚪ 15% (dim)          │
│ Arms: ⚪ 3% (very dim)       │
│ Hips: ⚪ 2% (very dim)       │
└──────────────────────────────┘

"Elite keepers light up the LEGS (green).
 You light up the TRUNK (red).
 This is why you miss penalties—wrong focus."
```

---

## 8. Future Enhancement: Eye-Tracker Integration (Phase 4)

**If user has Tobii Eye Tracker or similar:**

```
1. User enables eye-tracking hardware
2. System calibrates (quick 5-point calibration)
3. User watches penalty video (gaze tracked in real-time)
4. Automatic gaze recording (no post-video marking needed)
5. Results show:
   • Real eye movement heat map
   • Gaze fixation duration per area
   • Saccade patterns (eye movement speed)
   • Pupil dilation (arousal/stress level)

Real-time feedback: "You're looking at the trunk again—
 shift to the kicking leg NOW!"
```

**Note:** MVP version uses manual marking (no hardware required). Eye-tracker version optional upgrade.

---

## 9. Testing Checklist

- [ ] **Penalty videos:** Load correctly, play to completion
- [ ] **Prediction buttons:** Register correctly
- [ ] **Gaze marking interface:** Clickable areas register selections
- [ ] **Gaze efficiency calculation:** Cosine similarity accurate
- [ ] **Elite comparison heatmap:** Displays correctly
- [ ] **Scoring:** Matches algorithm expectations

---

## 10. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Video player (penalty kick, shooter clearly visible)
- [ ] Prediction buttons (Left/Center/Right, clear styling)
- [ ] Gaze marking interface (clickable shooter zones, clear icons)
- [ ] Gaze heatmap visualization (color gradient, legend)
- [ ] Elite comparison overlay (heatmap comparison)
- [ ] Results screen (prediction %, gaze efficiency %, breakdown cards)
- [ ] Archetype signal (Oracle focus)

---

## 11. Content Requirements

**Penalty videos:** 8 penalty kicks (from keeper's perspective, high-quality, 3–4 seconds each)  
**Elite gaze data:** Reference data for 3–5 elite keepers (Buffon, Neuer, etc.)  
**Guidance text:** Cue explanation, visual search tips, development feedback  

---

## 12. Next Steps

1. **Source penalty kick videos** (8 high-quality clips from professional matches or training)
2. **Calibrate elite gaze patterns** (analyze coach feedback on what elite keepers look at)
3. **Design gaze marking interface** in Claude Design
4. **Build prediction + gaze scoring** logic
5. **Playtest with 10 keepers** (validate gaze marking accuracy)
6. **Optional: Explore eye-tracker APIs** for Phase 4 integration
7. **Launch Phase 2**

---

**Status:** Ready for Claude Design. Penalty kick videos and elite reference data needed.

