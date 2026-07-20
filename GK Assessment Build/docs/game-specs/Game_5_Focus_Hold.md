# Focus Hold — Claude Design Build Specification
## Concentration & Sustained Attention Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Sustained attention research; goalkeeper game-reading requirements  
**Type:** Vigilance/reaction game  
**Platform:** Web (desktop/mobile) + React + Canvas  
**Duration:** 3–5 minutes per session  

---

## 1. Executive Summary

**Focus Hold** measures goalkeeper **sustained attention and concentration**. Players watch a 90-second match highlight (keeper's perspective) with mostly low-action play. At 5 random moments, a **KEY EVENT** occurs (shot at goal, dangerous pass, tackle). Players must press a button/tap when they see it.

System scores based on:
- **Reaction speed** (how quickly they catch each event)
- **Detection rate** (did they catch all 5?)
- **False positives** (did they tap when there was no event?)
- **Consistency** (attention dip at specific match moments?)

**Key differentiator:** Assesses psychological resilience (concentration under boredom—elite keepers maintain focus during low-action periods).

---

## 2. Game Flow

```
START → "FOCUS HOLD: Match Vigilance Test" → Difficulty selector
   ↓
SCENARIO LOADS: 90-second match highlight
   • Mostly normal play (passing, positioning, low action)
   • At 5 random moments: KEY EVENT (shot, dangerous pass, tackle)
   
PLAYER WATCHES & LISTENS
   • Video plays full-screen
   • Audio: Match ambience, commentary
   • Task: Press SPACEBAR (desktop) or TAP SCREEN (mobile) 
     when you see a key event
   
EVENTS (5 total, randomly distributed):
   1. Shot at goal (clear attempt)
   2. Dangerous through-ball
   3. Tackle/collision near goal
   4. Aerial duel
   5. Counterattack opportunity
   
REAL-TIME FEEDBACK
   Each tap registers immediately:
   • ✓ Correct detection (event happened) → score +20
   • ✗ False positive (no event at that moment) → score -5
   • Missed event (event happened, no tap) → score 0
   
RESULTS SCREEN
   • Total catches: 4/5 (80%)
   • False positives: 1 (false alarms)
   • Reaction time: 580ms avg (elite: 450ms)
   • Attention curve: [Graph showing concentration dips]
```

---

## 3. Visual Design & Interface

### 3.1 Main Game Screen

```
┌──────────────────────────────────────────┐
│ [Video: 90-second match highlight]       │
│                                          │
│ [Keeper's perspective, overhead angle]   │
│                                          │
│ Normal play: passing, positioning, etc   │
│                                          │
│ Overlay (top-right):                     │
│ • Timer: [██████░░░░] 45 seconds left   │
│ • Events caught: 2/5                    │
│ • False alarms: 0                       │
│                                          │
│ Large tap target (center-bottom):        │
│ ┌──────────────────────┐                 │
│ │  TAP/PRESS SPACEBAR  │                 │
│ │   FOR KEY EVENT      │                 │
│ └──────────────────────┘                 │
└──────────────────────────────────────────┘
```

### 3.2 Results Screen

```
FOCUS HOLD — CONCENTRATION SCORE: 78/100
Percentile: 71st

DETECTION RATE: 80% (4/5 caught)
Missed: 1 event (at 3:20 mark — mid-video dip)

REACTION TIME:
• Average: 580ms
• Fastest: 320ms (event 1)
• Slowest: 850ms (event 5 — fatigue?)
• Elite average: 450ms

FALSE POSITIVES: 1
(You tapped at 2:15 when no event occurred)
Suggests: Over-eager, or misread situation

ATTENTION CURVE:
[Graph: Concentration over 90 seconds]
0–30s: High (92/100) — Alert start
30–60s: Medium-high (78/100) — Mid-video dip
60–90s: Medium (71/100) — Fatigue visible

KEY INSIGHT:
Your concentration drops after 30 seconds of normal play.
Elite keepers: maintain 85%+ for full 90 seconds.
Development: Practice mental focus during inactive periods.

ARCHETYPE SIGNAL:
• Oracle: +8 (reading the game, awareness)
• Sentinel: +5 (commanding presence requires focus)
• Wall: -3 (reactive players can afford attention lapses)
```

---

## 4. Scenario Library (3 Scenarios, Varying Patterns)

| Scenario | Duration | Low-Action % | Event Types | Difficulty |
|----------|:---:|:---:|---|---|
| **1. Balanced match** | 90s | 70% | Mixed | Easy |
| **2. Dominant possession** | 90s | 85% | Rare threats | Medium |
| **3. High pressure play** | 90s | 55% | Frequent threats | Hard |

---

## 5. Scoring Logic

```javascript
function scoreFocusHold(detections, falsePositives, reactions) {
  // Detection accuracy (0–100)
  const detectionRate = detections.caught / detections.total * 100;
  
  // Reaction speed (vs. elite 450ms)
  const avgReactionTime = average(reactions.map(r => r.time_ms));
  const reactionScore = Math.max(20, 100 - Math.abs(avgReactionTime - 450) / 5);
  
  // False positive penalty
  const fpPenalty = falsePositives * 10;
  
  // Concentration consistency (variance over time)
  const attentionVariance = stdDev(reactions.map(r => r.time_ms));
  const consistencyScore = 100 - (attentionVariance / 100);
  
  const overallScore = Math.round(
    (detectionRate * 0.35 + reactionScore * 0.35 + consistencyScore * 0.30) - fpPenalty
  );
  
  return {
    detectionRate,
    reactionScore,
    consistencyScore,
    fpPenalty,
    finalScore: Math.max(0, overallScore)
  };
}
```

---

## 6. Component Structure (React)

```
FocusHold/
├── FocusHoldGame.jsx
│   ├── VideoPlayer.jsx (90-sec match highlight)
│   ├── TapDetector.jsx (spacebar/tap listener, visual feedback)
│   ├── OverlayStats.jsx (timer, catches, false alarms)
│   └── FeedbackOverlay.jsx (instant ✓/✗ on tap)
├── ResultsScreen.jsx
│   ├── ConcentrationScore.jsx (78/100)
│   ├── DetectionStats.jsx (4/5 caught)
│   ├── ReactionTimeCard.jsx (avg, fastest, slowest)
│   ├── AttentionCurveChart.jsx (concentration over time)
│   ├── ArchetypeSignal.jsx (Oracle/Sentinel contribution)
│   └── ActionButtons.jsx (try again, compare)
├── hooks/
│   ├── useFocusHoldState.js (game state)
│   ├── useTapDetector.js (spacebar + touch listeners)
│   ├── useVideoSync.js (event timing sync)
│   └── useScoringLogic.js (scoring functions)
├── data/
│   ├── scenarios.json (3 match highlights + event timings)
│   └── archetypeMapping.json
└── styles/
    ├── FocusHold.css
    └── animations.css (tap feedback)
```

---

## 7. Key Implementation Details

### 7.1 Event Timing

**Challenge:** Events must be synchronized with video playback.

**Solution:**
1. Video metadata file contains event timestamps:
   ```json
   {
     "scenario": "balanced-match",
     "events": [
       { "time_ms": 15000, "type": "shot" },
       { "time_ms": 32500, "type": "dangerous-pass" },
       { "time_ms": 48000, "type": "tackle" },
       { "time_ms": 71000, "type": "aerial" },
       { "time_ms": 85000, "type": "counterattack" }
     ]
   }
   ```

2. On video play, system monitors `currentTime` and compares to event timestamps (±200ms window).

3. Tap registers as "correct" if within ±200ms of actual event time.

### 7.2 Tap/Spacebar Input

```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.code === 'Space') {
      registerTap(videoRef.current.currentTime * 1000); // Convert to ms
    }
  };
  
  const handleTouchTap = (e) => {
    if (e.target === tapZoneRef.current) {
      registerTap(videoRef.current.currentTime * 1000);
    }
  };
  
  document.addEventListener('keydown', handleKeyPress);
  tapZoneRef.current?.addEventListener('touchstart', handleTouchTap);
  
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
}, []);

function registerTap(tapTime_ms) {
  const closestEvent = findClosestEvent(tapTime_ms);
  
  if (closestEvent && Math.abs(tapTime_ms - closestEvent.time) <= 200) {
    // Correct detection
    score += 20;
    showFeedback('✓ Caught!');
  } else {
    // False positive
    score -= 5;
    showFeedback('✗ False alarm');
  }
}
```

### 7.3 Attention Curve Calculation

```javascript
function calculateAttentionCurve(reactions) {
  // Divide 90-second video into 6 chunks (15-second intervals)
  const chunks = [
    reactions.filter(r => r.time_ms < 15000),
    reactions.filter(r => r.time_ms >= 15000 && r.time_ms < 30000),
    // ... etc
  ];
  
  // For each chunk, calculate avg reaction time
  const attentionPerChunk = chunks.map(chunk => {
    const avgTime = average(chunk.map(r => r.time_ms));
    // Convert to attention score (faster reaction = higher attention)
    return 100 - (avgTime - 450) / 10; // Normalized against elite 450ms
  });
  
  return attentionPerChunk; // [92, 78, 71, 65, 68, 72]
}
```

---

## 8. Testing Checklist

- [ ] **Video sync:** Event timestamps align with actual video moments (±100ms)
- [ ] **Tap detection:** Spacebar & touch both register correctly
- [ ] **Scoring:** Correct detections vs. false positives calculated accurately
- [ ] **Attention curve:** Graph renders correctly with 6 time intervals
- [ ] **Mobile tap zone:** Easy to tap on small screens
- [ ] **Performance:** Video plays smoothly (no stuttering)
- [ ] **Accessibility:** Spacebar alternative for mobile users

---

## 9. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Video player (full-screen, play/pause controls)
- [ ] Overlay stats (timer, catches/total, false alarms)
- [ ] Large tap zone (prominent, high-contrast button)
- [ ] Tap feedback animation (✓ green flash for correct, ✗ red for false)
- [ ] Results screen (score prominent, stats below)
- [ ] Attention curve chart (simple line graph, colored by attention level)
- [ ] Typography (large, readable)
- [ ] Color scheme (green for correct, red for false, neutral for normal play)

---

## 10. Content Requirements

**Videos:** 3 match highlights (90 seconds each, keeper's perspective)  
**Audio:** Match ambience, commentary (existing footage acceptable)  
**Event metadata:** JSON files with timestamps for each scenario  

---

**Status:** Ready for Claude Design. Match highlight videos with event timing data needed.

