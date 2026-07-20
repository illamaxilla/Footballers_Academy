# 7 New Games for Positioning Master — Master Handoff Summary
## Complete Implementation Guide for Claude Design Build

**Date:** July 2026  
**Status:** Ready for Claude Design  
**Scope:** 7 interactive games, research-backed assessment  

---

## PART 1: GAME MATRIX

### All 7 Games at a Glance

| # | Game | Research Foundation | Assesses | Players | Dev Complexity | Phase |
|---|------|---|---|:---:|:---:|---|
| **1** | **High Pressure Keeper** | Lethole 2024 | Psychological resilience, decisiveness under stress | 10–12 rapid scenarios | Medium | 2 |
| **2** | **One-on-One Duel** | Talent ID, 1v1 tactics | Tactical decision-making, angle narrowing, reaction | 6–8 1v1 scenarios | Medium | 2 |
| **3** | **Aerial Supremacy** | Cross management research | Positioning depth, catch vs. punch, jump timing | 6–8 cross scenarios | Medium | 2 |
| **4** | **Footwork Perfect** | Knoop 2013, motor coordination | Diving technique, foot plant, body alignment, recovery | User video upload + analysis | High | 3 |
| **5** | **Focus Hold** | Sustained attention research | Concentration, vigilance, reaction speed | 1× 90-sec match highlight | Low | 2 |
| **6** | **Command the Defense** | Leadership, communication | Tactical acumen, leadership, clarity, execution | 8–10 defensive scenarios | Medium | 3 |
| **7** | **Eye Spy: Penalty Decoder** | Savelsbergh 2005 | Visual search patterns, cue detection, anticipation | 8 penalty kicks | Medium | 2 |

---

## PART 2: ASSESSMENT DIMENSIONS COVERED

### By Game

```
PSYCHOLOGICAL RESILIENCE
├─ High Pressure Keeper (stress, hesitation, bravery)
├─ Focus Hold (concentration, attention consistency)
└─ Command the Defense (leadership presence, confidence)

TACTICAL DECISION-MAKING
├─ High Pressure Keeper (rapid decisions)
├─ One-on-One Duel (positioning, angle reading)
├─ Aerial Supremacy (depth, action choice)
├─ Command the Defense (tactical appropriateness)
└─ Eye Spy (decision timing, anticipation)

TECHNICAL EXECUTION
├─ One-on-One Duel (reaction, footwork)
├─ Aerial Supremacy (timing, body position)
├─ Footwork Perfect (dive technique, coordination)
└─ Focus Hold (reaction speed)

COGNITIVE SKILLS
├─ Eye Spy (visual search, cue detection)
├─ Focus Hold (sustained attention)
├─ Command the Defense (tactical reading)
└─ High Pressure Keeper (decision consistency)

PHYSICAL PERFORMANCE
├─ Footwork Perfect (explosiveness, recovery)
├─ One-on-One Duel (reaction speed)
└─ Aerial Supremacy (timing, positioning)
```

### Total Coverage

**Dimensions assessed:** 15+ distinct goalkeeper competencies  
**Research papers grounded in:** 8 peer-reviewed studies  
**Total scenarios:** 50–70 unique game moments  
**Unique assessment approaches:** 7 (no duplication of methodology)

---

## PART 3: ARCHETYPE CONTRIBUTION MAPPING

Each game feeds specific archetypes:

| Game | Oracle | Sentinel | Catalyst | Bastion | Wall |
|------|:---:|:---:|:---:|:---:|:---:|
| **High Pressure** | —— | +10 | +5 | +10 | +5 |
| **One-on-One** | +5 | +5 | +5 | +10 | +10 |
| **Aerial** | +5 | +15 | +5 | —— | +10 |
| **Footwork** | —— | —— | —— | +15 | +10 |
| **Focus Hold** | +10 | +10 | —— | —— | —— |
| **Command** | +5 | +20 | +5 | —— | +5 |
| **Eye Spy** | +15 | —— | —— | +5 | —— |

**Result:** All 5 archetypes get multiple signals across the 7 games. No archetype is neglected.

---

## PART 4: IMPLEMENTATION ROADMAP

### Phase 2 (Weeks 10–16): 4 Games

**Launch window:** Weeks 10–16 (after Positioning Master game ships)

**Games to build:**
1. **Week 10–11:** High Pressure Keeper (psychological resilience, high ROI)
2. **Week 11–12:** One-on-One Duel (tactical flagship)
3. **Week 12–13:** Aerial Supremacy (common weakness in youth)
4. **Week 13–14:** Focus Hold (quick win, low complexity)

**Why these 4:**
- High user engagement (stress testing, 1v1s, aerial command are compelling)
- Moderate dev complexity (manageable scope)
- Cover distinct assessment dimensions (no overlap)
- Research-backed (coaches care about these)

**Deliverables by end of Phase 2:**
- ✅ 4 new games fully integrated with archetype system
- ✅ 50+ unique game scenarios
- ✅ Squad dashboard updated (coach sees 4 new metrics per player)
- ✅ 200+ players on platform with diversified assessment data

### Phase 3 (Weeks 17–24): 2 Games

**Launch window:** Weeks 17–24

**Games to build:**
1. **Week 17–19:** Footwork Perfect (highest complexity, video analysis)
2. **Week 20–22:** Command the Defense (leadership assessment)

**Why later:**
- Footwork Perfect requires cloud infrastructure (AWS Lambda, MediaPipe)
- Command the Defense benefits from larger player base (coach tools more valuable)

### Phase 4 (Week 25+): 1 Game + Enhancements

**Games to build:**
1. **Eye Spy: Penalty Decoder** (optional eye-tracker integration)

**Why later:**
- MVP works without hardware (gaze marking is manual)
- Optional eye-tracker integration can wait
- Less urgent than core assessment games

---

## PART 5: VIDEO & CONTENT REQUIREMENTS

### By Game

| Game | Videos Needed | Quantity | Specs | Source |
|------|---|:---:|---|---|
| **High Pressure Keeper** | Rapid scenarios | 10 clips | 2–3 sec, keeper perspective | Positioning Master library or film |
| **One-on-One Duel** | 1v1 approaches | 16–24 takes | 3–5 sec, keeper POV | Film 8 scenarios × 2–3 takes |
| **Aerial Supremacy** | Cross scenarios | 16–24 takes | 2–4 sec, keeper POV | Film 8 scenarios × 2–3 takes |
| **Footwork Perfect** | Elite reference | 5–10 clips | Full dive, HD quality | Source professional (Buffon, Neuer, etc.) |
| **Focus Hold** | Match highlights | 3 clips | 90 sec each, keeper POV | Use existing academy/broadcast footage |
| **Command the Defense** | Defensive scenarios | 8–10 clips | 2–3 sec, pause point | Film 8–10 scenarios |
| **Eye Spy** | Penalty kicks | 8 clips | 3–4 sec, keeper POV, clear shooter | Source professional penalties |

**Total production effort:**
- 90–110 video clips total
- Most can be sourced from existing Positioning Master library
- Some filming required (1v1s, aerials, defensive scenarios)
- Elite footage licensing needed for Footwork Perfect comparison

**Estimated production time:** 2–3 weeks (depending on re-use from existing library)

---

## PART 6: TECHNICAL ARCHITECTURE CHANGES

### Required Infrastructure

**New components:**
1. **Cloud video processing** (Phase 3 only)
   - AWS Lambda for Footwork Perfect analysis
   - MediaPipe Pose integration
   - Cost: ~$0.025 per user analysis

2. **Enhanced game state management**
   - Support 7 games × 50+ scenarios
   - Archetype contribution system (re-wire from existing)
   - Historical trend tracking

3. **Coach dashboard expansion**
   - New KPIs per game
   - Squad heatmaps (where do players struggle?)
   - Drill recommendations engine (v1.5)

**Backward compatible:** All changes fit existing architecture. No refactoring needed.

---

## PART 7: CLAUDE DESIGN HANDOFF CHECKLIST

### Files to Review (In Order)

1. ✅ `Game_1_High_Pressure_Keeper_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Stress indicator, decision buttons, results screen

2. ✅ `Game_2_OneOnOne_Duel_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Video player, decision overlay, elite comparison

3. ✅ `Game_3_Aerial_Supremacy_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Positioning slider, action buttons, timing control

4. ✅ `Game_4_Footwork_Perfect_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Recording guide, upload flow, frame-by-frame viewer

5. ✅ `Game_5_Focus_Hold_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Video player, tap detection, attention curve chart

6. ✅ `Game_6_Command_the_Defense_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Tactic dropdown, confidence slider, outcome reveal

7. ✅ `Game_7_Eye_Spy_Penalty_Decoder_Claude_Design_Spec.md`
   - Status: Complete
   - Design focus: Penalty video, prediction buttons, gaze heatmap

### Design Workflow

```
Week 1–2:
├─ Review all 7 specs
├─ Ask clarification questions (if any)
└─ Begin High Pressure Keeper wireframes

Week 2–4:
├─ Prototype High Pressure Keeper (stress indicator, buttons, results)
├─ Simultaneously start One-on-One Duel wireframes
└─ Test interactive elements with sample data

Week 4–6:
├─ Finalize High Pressure Keeper design
├─ Build One-on-One Duel + Aerial Supremacy prototypes
├─ Gather feedback from sample keepers
└─ Iterate based on feedback

Week 6–8:
├─ Finalize One-on-One + Aerial designs
├─ Focus Hold simple prototype (quick win)
├─ Design system documentation (shared styles, components)
└─ Handoff to engineering

Week 8–10:
├─ Engineering begins Phase 2 build
├─ Concurrently, design starts Phase 3 (Footwork, Command)
└─ QA begins testing on Phase 2 games
```

---

## PART 8: CONTENT CALENDAR

### Video Sourcing Timeline

**Week 1–2 (Parallel with design):**
- Audit existing Positioning Master library
- Identify which videos can be re-used
- List gaps (additional filming needed)

**Week 2–4:**
- Film High Pressure scenarios (10 clips) — use academy players, quick turnaround
- Film One-on-One approach videos (16 takes) — coordinate with training
- Film Aerial cross scenarios (16 takes) — same session as 1v1
- Secure focus hold match highlights (source from existing footage)

**Week 4–6:**
- Film Command the Defense scenarios (8–10 clips)
- Source penalty kicks for Eye Spy (8 professional clips)
- License elite keeper footage for Footwork Perfect comparison

**Week 6–8:**
- Post-production: edit, optimize, encode
- Add timestamps, metadata to each video
- QA: verify timing, clarity, keeper visibility

---

## PART 9: PLAYER COMMUNICATION STRATEGY

### Launch Messaging

**Phase 2 (Week 16):**
```
"Introducing 4 new Positioning Master assessment games:

🔥 HIGH PRESSURE KEEPER
   Test your composure. 10 rapid-fire decisions under match stress.
   
⚔️ ONE-ON-ONE DUEL
   Master 1v1 situations. Advance or stay back? Your choice.
   
✈️ AERIAL SUPREMACY
   Claim the crosses. Positioning, action, timing—all scored.
   
🧠 FOCUS HOLD
   Concentration test. Catch 5 key events in a 90-second highlight.

Your Positioning Master assessment is now 11 games + digital analysis.
Deeper insight into your goalkeeper profile. Launch now!"
```

**Phase 3 (Week 22):**
```
"Phase 3: Technical Mastery + Leadership

📹 FOOTWORK PERFECT (NEW)
   Upload your dives. AI analyzes technique against elite keepers.
   
🗣️ COMMAND THE DEFENSE (NEW)
   Assess your leadership. How clearly do you communicate?

Full suite: 13 games + video analysis covering 20+ competencies."
```

---

## PART 10: SUCCESS METRICS

### Per Game (Target by Month 3)

| Game | Target Plays/User | Avg Score | Percentile Spread | Archetype Signal Clarity |
|------|:---:|:---:|:---:|:---:|
| High Pressure | 8+ | 72/100 | 40–85 (healthy spread) | Oracle: 85%, Bastion: 78% |
| One-on-One | 6+ | 75/100 | 45–90 | Wall: 82%, Sentinel: 79% |
| Aerial | 6+ | 71/100 | 40–85 | Sentinel: 80%, Wall: 77% |
| Footwork | 4+ | 68/100 | 35–80 | Bastion: 84%, Wall: 81% |
| Focus Hold | 8+ | 74/100 | 50–90 | Oracle: 79%, Sentinel: 76% |
| Command | 5+ | 69/100 | 40–82 | Sentinel: 86%, Oracle: 78% |
| Eye Spy | 8+ | 70/100 | 40–85 | Oracle: 85%, Bastion: 72% |

**System-level metrics:**
- Archetype distribution: All 5 archetypes represent 15–25% of player base (healthy balance)
- Correlation: Archetype signal correlates 0.65–0.78 with coach feedback
- Engagement: 65%+ of players play 3+ new games within first month

---

## PART 11: COACHING & ACADEMY BENEFITS

### For Individual Players

✓ 11 interactive games covering 20+ competencies  
✓ Personalized development edge (specific weakness identified per game)  
✓ Comparison to elite keepers on every dimension  
✓ Archetype-specific training recommendations  

### For Coaches

✓ Squad heatmaps (which players weak in 1v1s? Aerial claiming? Communication?)  
✓ Talent identification data (6–8 new KPIs per goalkeeper)  
✓ Drill recommendations (auto-generated based on squad weakness)  
✓ Progress tracking over time  

### For Academies

✓ Benchmarking: Compare your squad to other academies  
✓ Curriculum alignment: Map games to development age groups  
✓ Early identification: Visual search + footwork assessments catch talent young  

---

## PART 12: COMPETITIVE DIFFERENTIATION

### After Phase 2 + Phase 3 Launch

**What Positioning Master offers that competitors don't:**

| Feature | Wyscout | Hudl | Opta | Positioning Master |
|---------|:---:|:---:|:---:|:---:|
| Video analysis | ✓ | ✓ | ✓ | ✓ |
| Goalkeeper-specific | — | — | — | ✓ |
| Interactive games (# of games) | — | — | — | **13** |
| Archetype profiling | — | — | — | ✓ |
| Psychological assessment | — | — | — | ✓ |
| Technique analysis (frame-by-frame) | — | — | — | ✓ |
| Leadership scoring | — | — | — | ✓ |
| Visual search assessment | — | — | — | ✓ |
| Oracle-based positioning scoring | — | — | — | ✓ |

**Market positioning:**
"The only AI-powered, comprehensive goalkeeper assessment platform grounded in sports science."

---

## PART 13: BUDGET & TIMELINE SUMMARY

### Phase 2 (4 games, 6 weeks)

**Design:** 180 hours (Claude Design prototyping)  
**Engineering:** 240 hours (React components, game logic, integration)  
**Video production:** 40 hours (filming, editing, encoding)  
**QA:** 60 hours (testing, playtest gathering)  

**Total:** 520 hours (~$35–45k, depending on team rates)  
**Timeline:** 6 weeks (July–August 2026)

### Phase 3 (2 games, 6 weeks)

**Design:** 120 hours  
**Engineering:** 200 hours (includes AWS Lambda setup)  
**Video:** 20 hours  
**QA:** 40 hours  

**Total:** 380 hours (~$25–35k)  
**Timeline:** 6 weeks (September–October 2026)

---

## PART 14: IMMEDIATE NEXT STEPS

### For Design (This Week)

1. ✅ **Review all 7 specs** (1–2 hours each)
2. ⬜ **Request clarifications** on any ambiguous requirements
3. ⬜ **Prioritize High Pressure Keeper** for first prototype
4. ⬜ **Schedule kickoff** with engineering (week 2)

### For Video Production (Next Week)

1. ⬜ **Audit existing Positioning Master library** (what can we re-use?)
2. ⬜ **Create filming schedule** (book academy facilities, recruit players)
3. ⬜ **License/secure elite footage** (Buffon, Neuer, etc. for Footwork Perfect)
4. ⬜ **Set up storage** (S3 bucket for videos, metadata tagging)

### For Product/Engineering (Next Week)

1. ⬜ **Confirm archetype contribution weights** (finalize mapping)
2. ⬜ **Plan cloud infrastructure** (AWS Lambda for Phase 3)
3. ⬜ **Set up testing framework** (automated scoring validation)
4. ⬜ **Begin High Pressure Keeper sprint** (Week 2)

---

## CONCLUSION

**You now have a complete, research-backed roadmap to add 7 new assessment games to Positioning Master.**

Each game is grounded in peer-reviewed research. Each has detailed design specs ready for Claude Design. Each contributes to a comprehensive goalkeeper profiling system.

**By end of Phase 3 (October 2026):**
- 13 interactive assessment games
- 20+ goalkeeper competencies measured
- 5 archetypes with multiple signals per archetype
- No competitor has this breadth or depth

**Result:** A market-leading goalkeeper development platform with defensible differentiation.

---

**Ready to start? Confirm Phase 2 games, and let's build.**

