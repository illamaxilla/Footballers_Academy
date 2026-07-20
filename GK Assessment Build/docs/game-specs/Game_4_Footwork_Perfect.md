# Footwork Perfect — Claude Design Build Specification
## Diving Technique & Motor Coordination Assessment Game

**Game Version:** 1.0  
**Status:** Ready for Claude Design build  
**Research Foundation:** Knoop et al. 2013; Rebelo-Gonçalves 2016 (GK-specific motor coordination)  
**Type:** Video upload + pose analysis + feedback game  
**Platform:** Web (desktop/mobile) + React + Cloud video processing (AWS/GCP)  
**Duration:** 8–12 minutes per session (including video upload + analysis)  

---

## 1. Executive Summary

**Footwork Perfect** measures goalkeeper **diving technique and motor coordination through video analysis**. Players upload a short video of themselves performing 5 diving saves (different directions). System analyzes:

- **Foot plant explosiveness** (how quickly do they get off the ground?)
- **Body position alignment** (are they square to goal? Compact?)
- **Hand placement** (leading hand correct? Two-handed catch mechanics?)
- **Recovery speed** (how fast back on feet?)
- **Consistency** (do all dives follow the same technical pattern?)

System then scores each dive, compares to elite video, and provides frame-by-frame feedback on areas to improve.

**Key differentiator:** First interactive platform to assess GK footwork technique objectively. No other app does frame-by-frame dive analysis.

---

## 2. User Journey

```
START SCREEN
   ↓
INSTRUCTIONS
"Record 5 dive saves for analysis"
Recommended:
• Clear, well-lit space (side angle or face-on)
• Phone on tripod or fixed position
• Perform 5 dives: left, right, center, dive + recovery, reactive dive
• Duration: 2-3 minutes total
   ↓
VIDEO RECORDING TIPS
• Angle: Side (lateral dive) or face-on (keeper's view)
• Distance: 4–5m from keeper
• Audio: Not necessary
• Resolution: 1080p minimum (1280×720 acceptable)
   ↓
UPLOAD VIDEO
[Drag & drop or tap to select file]
Video size limit: 100MB
Accepted formats: MP4, MOV, H.264
   ↓
VIDEO VALIDATION
System checks:
• Resolution ≥ 1280×720 ✓
• Duration 2–5 minutes ✓
• Keeper clearly visible ✓
• Upload proceeds or asks for re-recording
   ↓
SCENE DETECTION
AI analyzes:
1. Identifies individual dive attempts (frame ranges)
2. Extracts 5–8 representative dives
3. Estimates dive direction (left/right/center)
4. Creates timestamps: [Dive 1: 0:05–0:08] etc.
   ↓
MANUAL CONFIRMATION
Player reviews scene detection:
"System found 6 dives. Confirm or adjust?"
[✓ Dive 1 - Left dive, 0:05]
[✓ Dive 2 - Right dive, 0:12]
[✓ Dive 3 - Reactive, 0:18]
[✓ Dive 4 - Left dive, 0:25]
[✓ Dive 5 - Recovery focus, 0:32]
[Skip/edit as needed]
   ↓
POSE ANALYSIS
Cloud processing (AWS Lambda + MediaPipe Pose):
• Extracts joint positions (ankles, knees, hips, shoulders, hands)
• Per-frame analysis (30fps = 90–180 frames per dive)
• Calculates metrics:
  - Foot plant speed (frame 0 → max height)
  - Body angle relative to goal
  - Hand positions during flight/landing
  - Recovery frame count
   ↓
COMPARISON TO ELITE
System loads elite keeper pose data (Buffon, Neuer, ter Stegen, etc.):
• Frame-by-frame comparison
• Variance analysis (how different from elite?)
• Individual metric comparison
   ↓
RESULTS SCREEN
   ↓
DETAILED FEEDBACK
Frame-by-frame annotations showing:
• Foot plant position, timing
• Body alignment at peak of dive
• Hand placement & contact
• Recovery movement
```

---

## 3. Visual Design & Interface

### 3.1 Upload & Recording Guidance

```
┌─────────────────────────────────────────────────────┐
│ FOOTWORK PERFECT — RECORDING GUIDE                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ WHAT TO RECORD:                                     │
│ You performing 5–6 diving saves                     │
│                                                     │
│ SETUP (Optimal):                                    │
│ ┌──────────────────────────────────────┐           │
│ │         Phone (side angle)           │           │
│ │              ↓                       │           │
│ │      [4–5m away from keeper]        │           │
│ │              ↓                       │           │
│ │        [Keeper diving] ←→ Goal      │           │
│ │            (you)                    │           │
│ └──────────────────────────────────────┘           │
│                                                     │
│ LIGHTING: Natural light preferred. Avoid shadows.  │
│ RESOLUTION: 1080p (or 720p minimum)                │
│ DURATION: 2–4 minutes total                        │
│                                                    │
│ DIVES TO INCLUDE:                                  │
│ ☐ Left-side dive (extended)                       │
│ ☐ Right-side dive (extended)                      │
│ ☐ Center dive (forward)                           │
│ ☐ Dive + full recovery (get back up quickly)      │
│ ☐ Reactive dive (quick, explosive)                │
│                                                    │
│ [START RECORDING] [UPLOAD VIDEO]                  │
└─────────────────────────────────────────────────────┘
```

### 3.2 Scene Detection & Confirmation

```
┌─────────────────────────────────────────────────────┐
│ VIDEO ANALYSIS IN PROGRESS...                       │
│ [████████░░░░░░░░░░] 40% Complete                  │
├─────────────────────────────────────────────────────┤
│ Analyzing video for dive attempts...               │
│ • Detecting keeper position                        │
│ • Identifying dive moments                         │
│ • Extracting pose data                             │
│                                                    │
│ Estimated time: 2 minutes remaining                │
└─────────────────────────────────────────────────────┘

[After completion]

┌─────────────────────────────────────────────────────┐
│ ANALYSIS COMPLETE                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Found 6 dives. Select 5 to analyze:               │
│                                                    │
│ [✓] DIVE 1: Left-side dive (0:05–0:08)            │
│     Confidence: 98%                                │
│                                                    │
│ [✓] DIVE 2: Right-side dive (0:12–0:15)           │
│     Confidence: 95%                                │
│                                                    │
│ [✓] DIVE 3: Reactive dive (0:18–0:20)             │
│     Confidence: 91%                                │
│                                                    │
│ [✓] DIVE 4: Extended left dive (0:25–0:28)        │
│     Confidence: 97%                                │
│                                                    │
│ [✓] DIVE 5: Recovery + re-position (0:32–0:35)    │
│     Confidence: 94%                                │
│                                                    │
│ [✗] DIVE 6: Partial (too close to edge)          │
│     Confidence: 67% (skip this one)                │
│                                                    │
│ [CONFIRM & ANALYZE] [EDIT SELECTIONS]             │
└─────────────────────────────────────────────────────┘
```

### 3.3 Detailed Results Screen

```
┌──────────────────────────────────────────────────────┐
│ FOOTWORK PERFECT — RESULTS                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│ OVERALL TECHNIQUE SCORE: 73/100                     │
│ Percentile: 62nd                                    │
│                                                      │
│ BREAKDOWN BY METRIC:                                │
│                                                      │
│ 📊 Foot Plant Explosiveness                         │
│    Your score: 68/100                               │
│    Elite avg: 86/100                                │
│    [████░░░░░░░░░░░░] Gap: -18 points               │
│    ↳ "You take 250ms to reach peak height.         │
│       Elite keepers do it in 180ms. Work on         │
│       explosive first push."                        │
│                                                      │
│ 📊 Body Alignment                                   │
│    Your score: 71/100                               │
│    Elite avg: 88/100                                │
│    [███████░░░░░░░░░] Gap: -17 points               │
│    ↳ "You're slightly rotated (8° off square).     │
│       Should be perpendicular to goal. Work on      │
│       core stability during takeoff."               │
│                                                      │
│ 📊 Hand Placement                                   │
│    Your score: 81/100                               │
│    Elite avg: 90/100                                │
│    [████████░░░░░░░░] Gap: -9 points                │
│    ↳ "Good leading hand. Occasionally use both     │
│       hands on closer shots for extra stability."   │
│                                                      │
│ 📊 Recovery Speed                                   │
│    Your score: 76/100                               │
│    Elite avg: 91/100                                │
│    [███████░░░░░░░░░] Gap: -15 points               │
│    ↳ "Getting up from the ground: 2.1 seconds.    │
│       Elite avg: 1.4 seconds. Strengthen legs."    │
│                                                      │
│ 📊 Consistency                                      │
│    Your score: 65/100                               │
│    Elite avg: 87/100                                │
│    [██████░░░░░░░░░░░] Gap: -22 points              │
│    ↳ "Right-side dives (85) vs. left dives (62).  │
│       Your left-side technique needs work."         │
│                                                      │
│ DIVE-BY-DIVE BREAKDOWN:                             │
│                                                      │
│ Dive 1 (Left): 68/100 ✗ (foot plant slow, tight)   │
│ Dive 2 (Right): 82/100 ✓ (strong, consistent)      │
│ Dive 3 (Reactive): 75/100 ✓ (good urgency)         │
│ Dive 4 (Extended): 71/100 ✗ (body angle off)       │
│ Dive 5 (Recovery): 72/100 ✗ (slow getting up)      │
│                                                      │
│ ELITE COMPARISON (Frame-by-frame):                  │
│ [Watch video overlay comparing your dives to       │
│  elite keeper side-by-side at key moments]         │
│                                                      │
│ [PLAY COMPARISON VIDEO] [VIEW FRAME-BY-FRAME]      │
│ [ARCHETYPE SIGNAL] [SHARE RESULTS]                 │
└──────────────────────────────────────────────────────┘
```

### 3.4 Frame-by-Frame Analysis Detail

```
┌──────────────────────────────────────────────────────┐
│ DIVE 1 (LEFT DIVE) — FRAME-BY-FRAME ANALYSIS       │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Frame 0: Starting position                          │
│ [Image: Keeper ready, feet shoulder-width]          │
│ Analysis: ✓ Good starting balance                   │
│                                                      │
│ Frame 3 (90ms): Takeoff                             │
│ [Image: Both feet pushing off ground]               │
│ Analysis: ✗ Left foot late by 2 frames              │
│           (Should be simultaneous)                  │
│                                                      │
│ Frame 5 (150ms): Peak height                        │
│ [Image: Keeper fully extended, horizontal]          │
│ Analysis: ✗ Body rotated 9° (should be 0°)         │
│           ✓ Hands ready, left leading              │
│                                                      │
│ Frame 7 (210ms): Contact (if making save)           │
│ [Image: Ball contact on gloves]                     │
│ Analysis: ✓ Hand position good                      │
│           ✗ Body twist could reduce power          │
│                                                      │
│ Frame 10+ (300ms): Landing                          │
│ [Image: Keeper on ground after dive]                │
│ Analysis: ✗ Landing is hard (arms not absorbing)   │
│           ✗ Right leg slow to reset                │
│                                                      │
│ FRAME-BY-FRAME SCORE: 68/100                        │
│ KEY ISSUES: Foot plant timing, body alignment       │
│ DRILLS: Mirror work on left-side dives              │
│ REFERENCE: Buffon left dive (same scenario)         │
└──────────────────────────────────────────────────────┘
```

---

## 4. Scoring Logic

### 4.1 Foot Plant Explosiveness

```javascript
function scoreFootPlantExplosiveness(frames) {
  // Measure time from frame 0 (start) to max height frame
  const plantTime_ms = (maxHeightFrame - startFrame) * (1000 / 30); // Convert to ms at 30fps
  
  // Elite baseline: 180–200ms for explosive push
  const eliteRange = [180, 200];
  const error_ms = Math.min(
    Math.abs(plantTime_ms - eliteRange[0]),
    Math.abs(plantTime_ms - eliteRange[1])
  );
  
  if (error_ms <= 20) return 100; // Perfect
  else if (error_ms <= 50) return 85 - (error_ms - 20) / 30 * 15; // 70–85
  else if (error_ms <= 100) return Math.max(40, 70 - (error_ms - 50) / 50 * 30); // 40–70
  else return Math.max(20, 40 - (error_ms - 100) / 100 * 20); // 20–40 (slow)
}
```

### 4.2 Body Alignment Score

```javascript
function scoreBodyAlignment(frames) {
  // Calculate keeper's body angle relative to goal line at peak height
  // Ideal: perpendicular to goal (0° error)
  
  const shoulderAngle_degrees = calculateAngle(
    leftShoulder_position,
    rightShoulder_position,
    goalLine
  );
  
  const bodyAngle_error = Math.abs(shoulderAngle_degrees - 90); // 90° = perpendicular
  
  if (bodyAngle_error <= 5) return 100; // Excellent
  else if (bodyAngle_error <= 15) return 90 - (bodyAngle_error - 5) / 10 * 20; // 70–90
  else if (bodyAngle_error <= 30) return Math.max(40, 70 - (bodyAngle_error - 15) / 15 * 30); // 40–70
  else return Math.max(20, 40 - (bodyAngle_error - 30) / 30 * 20); // 20–40 (rotated)
}
```

### 4.3 Hand Placement Score

```javascript
function scoreHandPlacement(frames, diveDirection) {
  // Check if leading hand is correct for dive direction
  // Also check if using one or two hands
  
  const leadingHand = (diveDirection === 'left') ? 'left' : 
                      (diveDirection === 'right') ? 'right' : 
                      'either';
  
  const actualLeadingHand = determineLeadingHand(frames);
  
  let score = 100;
  
  // Correct leading hand
  if (actualLeadingHand !== leadingHand) score -= 20;
  
  // Check for two-handed catching (preferred for stability)
  if (isTwoHandedCatch(frames)) score = Math.max(score - 10, 85); // Bonus
  else score -= 5; // Minor penalty for one-handed
  
  return Math.max(50, score);
}
```

### 4.4 Recovery Speed Score

```javascript
function scoreRecoverySpeed(frames) {
  // Time from landing to full vertical position (feet under body, ready to move)
  // Elite: 1.2–1.5 seconds
  
  const landingFrame = findLandingFrame(frames);
  const readyFrame = findFullReadyFrame(frames);
  
  const recoveryTime_s = (readyFrame - landingFrame) / 30; // Convert to seconds
  
  const eliteRange = [1.2, 1.5];
  const error_s = Math.min(
    Math.abs(recoveryTime_s - eliteRange[0]),
    Math.abs(recoveryTime_s - eliteRange[1])
  );
  
  if (error_s <= 0.1) return 100;
  else if (error_s <= 0.3) return 85 - (error_s - 0.1) / 0.2 * 15; // 70–85
  else if (error_s <= 0.6) return Math.max(40, 70 - (error_s - 0.3) / 0.3 * 30); // 40–70
  else return Math.max(20, 40 - (error_s - 0.6) / 0.6 * 20); // 20–40 (very slow)
}
```

### 4.5 Consistency Score

```javascript
function scoreConsistency(allDives) {
  // Calculate variance in technique across all dives
  const plantTimes = allDives.map(d => d.plantTime);
  const alignments = allDives.map(d => d.alignment);
  const handPlacement = allDives.map(d => d.handScore);
  
  const plantVariance = standardDeviation(plantTimes);
  const alignVariance = standardDeviation(alignments);
  const handVariance = standardDeviation(handPlacement);
  
  // Elite consistency: low variance across all metrics
  const eliteVariance = 20; // Low variance
  
  const totalVariance = plantVariance + alignVariance + handVariance;
  const varianceRatio = totalVariance / eliteVariance;
  
  // Scoring: lower variance = higher score
  if (varianceRatio < 1.2) return 100; // Excellent consistency
  else if (varianceRatio < 1.5) return 85; // Good
  else if (varianceRatio < 2.0) return 65; // Inconsistent
  else return Math.max(30, 50 - varianceRatio * 5); // Poor (highly variable)
}
```

### 4.6 Overall Technique Score

```javascript
function scoreOverallTechnique(allDives) {
  const scores = allDives.map(dive => scoreIndividualDive(dive));
  
  const footPlantAvg = average(scores.map(s => s.footPlant));
  const alignmentAvg = average(scores.map(s => s.alignment));
  const handAvg = average(scores.map(s => s.hand));
  const recoveryAvg = average(scores.map(s => s.recovery));
  const consistency = scoreConsistency(allDives);
  
  const overallScore = Math.round(
    (footPlantAvg * 0.25 + alignmentAvg * 0.25 + handAvg * 0.20 + 
     recoveryAvg * 0.20 + consistency * 0.10)
  );
  
  return {
    overallScore,
    footPlant: footPlantAvg,
    alignment: alignmentAvg,
    hand: handAvg,
    recovery: recoveryAvg,
    consistency
  };
}
```

---

## 5. Component Structure (React)

```
FootworkPerfect/
├── FootworkPerfectGame.jsx
│   ├── RecordingGuide.jsx (setup instructions, tips)
│   ├── VideoUpload.jsx (drag-drop, file validation)
│   ├── VideoAnalysisProgress.jsx (pose detection in progress)
│   ├── SceneDetectionReview.jsx (confirm 5 dives)
│   └── ResultsScreen.jsx (comprehensive results)
├── ResultsScreen.jsx
│   ├── OverallTechniqueScore.jsx (73/100)
│   ├── MetricCard.jsx (foot plant, alignment, hand, recovery, consistency)
│   ├── DiveByDiveBreakdown.jsx (individual dive scores)
│   ├── FrameByFrameViewer.jsx (click-through dive analysis)
│   ├── EliteComparisonVideo.jsx (side-by-side overlay)
│   ├── ArchetypeSignal.jsx (Bastion/Wall contribution)
│   └── ActionButtons.jsx (share, compare, re-record)
├── hooks/
│   ├── useVideoUpload.js (file validation, upload to AWS)
│   ├── usePoseAnalysis.js (cloud processing status)
│   └── useScoringLogic.js (all scoring functions)
├── data/
│   ├── eliteKeeperData.json (elite pose data for comparison)
│   └── archetypeMapping.json (Bastion/Wall weights)
└── styles/
    ├── FootworkPerfect.css (video-focused, scrollable results)
    └── animations.css (progress bars, frame-by-frame carousel)
```

---

## 6. Cloud Processing Pipeline

### 6.1 AWS Lambda + MediaPipe Pose

**Flow:**
1. User uploads video → stored in S3 bucket
2. Lambda function triggered on S3 upload event
3. Lambda extracts frames at 30fps
4. MediaPipe Pose processes each frame → extracts joint positions
5. Results stored in DynamoDB (joint positions + timestamps)
6. Frontend polls for completion status

**Code (simplified):**
```python
# AWS Lambda function
import cv2
import mediapipe as mp

def lambda_handler(event, context):
    s3_key = event['Records'][0]['s3']['object']['key']
    
    # Download video from S3
    video = download_from_s3(s3_key)
    
    # Process with MediaPipe
    pose = mp.solutions.pose.Pose()
    cap = cv2.VideoCapture(video)
    
    frames_data = []
    frame_index = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        
        results = pose.process(frame)
        
        if results.pose_landmarks:
            joint_positions = extract_landmarks(results.pose_landmarks)
            frames_data.append({
                'frame': frame_index,
                'timestamp_ms': frame_index * (1000 / 30),
                'joints': joint_positions
            })
        
        frame_index += 1
    
    # Save to DynamoDB
    save_to_dynamodb(s3_key, frames_data)
    
    return {
        'statusCode': 200,
        'body': 'Processing complete'
    }
```

### 6.2 Cost & Performance

**Estimated costs (per analysis):**
- S3 storage: $0.023 (1 video × 100MB)
- Lambda compute: $0.0002 (1 second of video processing ≈ 30 seconds compute)
- DynamoDB: $0.001 (data storage)
- **Total per analysis: ~$0.025 (2.5 cents)**

**Performance:**
- Upload: 1–5 MB/s (depends on connection)
- Processing: ~30 seconds (1 minute video takes 30 seconds to process)
- Results delivery: <2 seconds (retrieve from DynamoDB)

---

## 7. User Flows

### 7.1 First-Time User

```
1. Tap "Footwork Perfect"
2. Read recording guide (30 seconds)
3. Record 5 diving saves (2–3 minutes of video)
4. Upload video (1–2 minutes, depending on size)
5. Wait for analysis (2–5 minutes)
6. Review results (detailed breakdown)
7. Compare to elite keepers (watch overlay)
```

### 7.2 Returning User

```
1. Tap "Footwork Perfect"
2. Upload new video (quick re-record or use previous)
3. Analysis runs
4. Results (compare to previous session)
5. "Your foot plant improved: 68 → 73"
```

---

## 8. Testing Checklist

- [ ] **Video upload:** File validation works (format, resolution, size)
- [ ] **Scene detection:** Correctly identifies 5–6 dive attempts
- [ ] **Pose extraction:** Joint positions accurate (check against manual frames)
- [ ] **Scoring logic:** All metrics calculate correctly
- [ ] **Elite comparison:** Overlay aligns correctly with uploaded video
- [ ] **Cloud processing:** Lambda completes <5 minutes for 2-minute video
- [ ] **Mobile upload:** Works on 4G/WiFi
- [ ] **Results display:** All metrics render, scrollable on mobile
- [ ] **Frame-by-frame:** Click-through carousel works smoothly

---

## 9. Design Handoff Checklist

✅ **For Claude Design:**

- [ ] Recording guide card (clear illustrations, numbered steps)
- [ ] Upload area (drag-drop, file size indicator, progress bar)
- [ ] Analysis progress screen (spinner, estimated time remaining)
- [ ] Scene detection review (thumbnails of detected dives, checkboxes)
- [ ] Overall technique score (large, prominent at top of results)
- [ ] Metric cards (5 metric components, comparison bars)
- [ ] Dive-by-dive breakdown (individual scores, color-coded)
- [ ] Frame-by-frame carousel (click arrows to advance frames)
- [ ] Elite comparison video player (side-by-side layout)
- [ ] Archetype signal (Bastion/Wall contribution)
- [ ] Typography (readable at mobile resolution)
- [ ] Color scheme (score gradient: red → yellow → green)

---

## 10. Content Requirements

**Elite keeper pose data:** Video clips of 3–5 elite keepers (Buffon, Neuer, ter Stegen, Courtois) performing dives (licensed or own recordings)  
**Guidance text:** Recording tips, metric explanations, development recommendations  
**Tutorial video:** 30-second recording guide (how to set up camera, what to film)  

---

## 11. Privacy & Data Handling

**Sensitive consideration:** User uploads video of themselves.

**Data handling:**
- Video stored in private S3 bucket (not shared)
- Pose data (joint positions only) stored in DynamoDB
- User can delete video anytime (deletes from S3 + DynamoDB)
- Pose data never used for training ML models (unless explicit opt-in)
- GDPR compliant: no facial recognition, no identity matching

---

## 12. Next Steps

1. **Secure elite keeper footage** (3–5 benchmark videos)
2. **Test pose detection accuracy** (verify joint extraction on sample dives)
3. **Design recording guide** in Claude Design (clear, simple illustrations)
4. **Build upload + validation** flow (client-side video validation)
5. **Deploy Lambda + MediaPipe** (AWS infrastructure setup)
6. **Playtest with 10 keepers** (gather feedback on scoring accuracy, results clarity)
7. **Refine scoring logic** based on playtest data
8. **Integrate with archetype system**
9. **Launch Phase 3**

---

**Status:** Ready for Claude Design handoff. Elite keeper footage and pose detection testing needed before build.

