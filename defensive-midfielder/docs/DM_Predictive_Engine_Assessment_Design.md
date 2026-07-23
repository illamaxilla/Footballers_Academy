# Defensive Midfielder — Predictive Engine & Digital Assessment Design
### Auditing the current battery, then designing every instrument a screen can actually run

**Date:** July 15, 2026
**Reviewed for:** The Footballer's Academy / Position-DNA DM system
**Constraint lens:** software only — phone, tablet, desktop. No wearables, no lab hardware. Film analysis is possible. We are never physically present. Optional self-reported field-test data may *enhance* the output, never *gate* it.
**Builds on:** the v1.1 Assessment Handoff (self-report questionnaire + DM-DNA spread) and the Sports-Science Literature Gap Analysis.

---

## The principle this whole document runs on

Two hard truths shape everything below.

**First — the honest ceiling.** A phone cannot measure how far a player ran, how hard they tackled, or what they'll become in three years. What a screen *can* do is sample **behaviour and capacity**: how someone chooses under time pressure, how fast and accurately they read a scene, what they say about themselves, and — from film — what they actually do on a pitch. So the deliverable is not a *prediction* of a career or a *measurement* of athleticism. It is **an increasingly well-triangulated representation of current playing-style tendencies, with a confidence level proportional to how much evidence the player supplies.** Naming that ceiling honestly is what lets the product stand in front of a sports scientist.

**Second — no single instrument is a proven predictor.** This matters, and the literature is blunt about it. Multiple-object-tracking scores do not reliably predict competitive performance (Vater, Gray & Holcombe, 2021). Video decision-making tests did not predict in-situ on-field performance in skilled players (in-situ perceptual-cognitive study, 2018). Even elite scanning has a ceiling — it doesn't separate super-elite from elite (2024). The engine's validity therefore cannot rest on any one clever test. It rests on **triangulation**: many independent, individually-imperfect signals that either *converge* (raising confidence) or *conflict* (which is itself insight). Design the engine that way and it's defensible. Design it as "our MOT game predicts you're a Destroyer" and it collapses on contact with an expert.

---

## PART A — Auditing the battery you already have

Your current assessment content spans three documents. Run through the phone/tablet/desktop filter, most of it is not deployable as-is.

| Instrument (current) | Source doc | What it measures | Device-viable? | Verdict |
|----------------------|-----------|------------------|----------------|---------|
| **12-question scenario quiz** → DM-DNA spread | v1.1 Handoff | Stated style preference | **Native** ✅ | Your only truly deployable instrument today. Keep as Layer A. |
| Pressing-trigger recognition (VR + EEG) | Phase 2 | Recognition speed, decision quality | ❌ (VR headset, EEG) | Convert the *idea* to a screen occlusion task (Part B, #6). |
| Distribution-under-pressure, Zone 14 control | Phase 2 | Tactical execution on the ball | ❌ (motion capture, pitch) | Reachable only via **film** (Part B, film layer). |
| 47-minute phenomenon, dual-task processing | Phase 2 | Temporal decline, multitasking | ❌ (EEG, lab) | Dual-task partially portable as a screen task; the "47-min" claim is not measurable on a phone — retire or reframe. |
| Pressing power, duel force, coverage endurance, metabolic profile | Phase 2 | Physical output | ❌ (force plates, GPS, metabolic cart) | Reachable only via **optional self-reported field tests** (per Gap Analysis, Gap 4). |
| Genetic SNP panel (COMT, BDNF, ACTN3…) | Phase 2 | Biological predisposition | ❌ (genetic array) | Out of scope for a software product. Do not build around it. |
| 3D mental rotation, N-back, Stroop, pattern-recognition | Youth Pathway | Spatial reasoning, working memory, inhibition, reading | **Native in principle** ✅ | Already specified as *thresholds* — but never *built as games*. This is the bridge: you've named the science, not shipped the instrument. |
| Scanning frequency, heat maps, interception rate in SSGs | Youth Pathway | On-ball reading, positioning | ❌ live / ✅ via **film** | Move from "small-sided game observation" to uploaded-film analysis (Part B). |
| Khamis-Roche predicted adult height | Youth Pathway | Maturity timing | ✅ via **self-report** | Referenced but not operationalised as an app flow (see Gap Analysis, Gap 2). |
| Connor-Davidson resilience, growth mindset, achievement motivation | Youth Pathway | Psychological traits | **Native** ✅ (self-report) | Already the seed of a trait battery — formalise it (Part B, Layer B). |

**The pattern:** your framework already *names* almost every right construct — inhibition, working memory, scanning, spatial reasoning, resilience, maturity. What it lacks is the translation from *lab protocol* or *threshold* into *a thing that runs on a phone*. Part B does that translation and adds the instruments that most directly separate your four archetypes.

---

## PART B — The instruments a screen can actually run

Organised as five layers of increasing objectivity and data cost. The engine (Part C) fuses them.

### Layer A — Self-report scenario quiz *(have it)*
The v1.1 questionnaire. Stated preference. Fast, universal, but gameable and aspiration-biased. This is the floor every player starts on.

### Layer B — Self-report trait battery *(low build, high triangulation)*

A short validated-style inventory measuring stable dispositions rather than football scenarios — so it triangulates the quiz from a different angle. Six dimensions, each mapped to an archetype pull:

- **Risk propensity** → Destroyer (high) vs Sentinel (low)
- **Competitiveness / controlled aggression** → Destroyer
- **Conscientiousness / discipline / patience** → Sentinel
- **Openness / creativity / composure under press** → Architect
- **Work ethic / grit / versatility** → Warrior
- **Decision style (decisive-direct vs deliberate-safe vs expansive-progressive)** → colours all four

You already use Connor-Davidson resilience, growth-mindset and achievement-motivation scales in the youth doc, and reference the Big Five in your master prompt. This layer just formalises them into one instrument.
*Honesty caveat:* still self-report. Share the aspiration-bias flag — this is *who I think I am*, weighed against the objective layers below.

### Layer C — On-screen performance games *(the objective core)*

These are the new heart of the engine: behaviour the device captures directly, not self-perception. Each entry: the established paradigm it's built on, what it captures, which archetype it separates, and its honest limit.

**C1 · Choice reaction / processing speed.** Respond to cued targets; measure reaction time and accuracy. Captures raw processing speed. *Archetype signal:* weak alone — treat as a covariate that contextualises every other timed task. *Feasibility:* high. *Caveat:* touchscreen/display latency varies by device — calibrate, and never compare raw milliseconds across hardware.

**C2 · Go / No-Go (response inhibition).** Respond to "go" cues, withhold on "no-go" cues; **commission errors** (responding when you shouldn't) index impulsivity. *Archetype signal:* strong — separates the **Destroyer** (more impulsive, more commission errors, faster-but-riskier) from the **Sentinel** (the most restrained, lowest commission rate). Grounded directly in the finding that defensive midfielders are *less impulsive* than hybrid roles (Science & Medicine in Football, 2022). *Feasibility:* high.

**C3 · Multiple-object tracking (MOT).** Track N target dots among identical distractors as they move; find the player's tracking-speed threshold (the NeuroTracker paradigm). Captures dynamic attention, peripheral focus, distractor suppression. *Archetype signal:* moderate — high trackers cluster toward **Sentinel/Warrior** awareness, but it is weakly style-specific. *Feasibility:* high (runs on tablets today). *Caveat — important:* MOT does **not** reliably predict match performance (Vater et al., 2021; multiple no-transfer studies). Use strictly as a capacity signal, never as an archetype verdict.

**C4 · Working memory (N-back / Corsi span).** Hold and update a stream of items, or reproduce a growing spatial sequence. *Archetype signal:* **Architect** (holding multiple passing options live) and **Sentinel** (tracking multiple threats). Already in your youth battery — build it as a game. *Feasibility:* high.

**C5 · Visual search — "find the free man."** A static tactical frame appears; under a time limit, tap the best available pass or the free teammate. Captures search speed + choice quality. *Archetype signal:* strong for the **Architect** — fast passing-lane detection plus a bias toward the progressive option — versus players who default to the safe/backward choice. Grounds in visual-search-and-expertise work (Williams & Davids). *Feasibility:* high; needs a frame library (content cost).

**C6 · Temporal-occlusion decision task — *the style probe*.** The single most archetype-relevant screen instrument. A short clip plays and freezes at a decision moment; the player picks the next action from **style-tagged options** — *win it aggressively / keep it safe / play the progressive line-breaker / drive and cover*. You capture **revealed style preference** (which flavour they gravitate to under time pressure), decision time, and — optionally — anticipation accuracy (predicting what the ball-carrier does). The temporal-occlusion paradigm is well-established and trainable (temporal-occlusion meta-analysis, *Sports Medicine* 2024). *Archetype signal:* strongest of any single screen test — it reads style directly, and it does so under time pressure where the self-report quiz can't reach. *Feasibility:* high; requires a curated, archetype-tagged clip library (the main content investment — but reusable across all seven positions). *Caveat:* occlusion tests don't predict on-field *performance* (in-situ study, 2018) — but here you're reading *revealed preference*, not forecasting performance, which is a fair use of the paradigm.

**C7 · Pattern recall.** A game snapshot (a formation, a moment of structured play) flashes for ~3–5 s, then blanks; the player reproduces the players' positions. Captures structural game memory — a hallmark of expert perception. *Archetype signal:* **Sentinel/Architect** (both read game structure). *Feasibility:* high.

**C8 · Spatial mental rotation.** Already in your youth doc. Rotate/match spatial configurations. *Archetype signal:* weak — keep as a covariate, not a discriminator. *Feasibility:* high.

**C9 · Rhythm / tempo hold *(experimental — label it so)*.** Maintain a target passing cadence against a fading metronome; measure timing variance. A speculative probe for the **Architect's** "metronome" quality. *Feasibility:* high to build, but **low evidence** — ship it flagged as experimental and let the data tell you if it discriminates anything. Do not weight it in the engine until validated.

### Layer D — Optional self-reported field tests *(physical layer)*
Covered fully in the Gap Analysis (Gap 4): Yo-Yo IR1 / 30-15 IFT, 10 m & 30 m sprints, 505 agility, countermovement jump, anthropometrics + Khamis-Roche maturity. Player or coach runs them on a pitch and types results; the app scores against age/position norms. *Never* lets a slow sprint demote an archetype — athleticism is a separate layer from style.

### Layer E — Film analysis *(highest ecological validity, highest data cost)*

Behaviour from real play. You already plan video upload — this defines *what to extract*. Manual/coach-tagged first; pose-estimation and computer vision progressively automate it.

**E1 · Scanning frequency — the crown jewel of film analysis.** Count exploratory head movements in the ~10 s before the player receives the ball (Jordet's operational definition: scans per second). Higher scan frequency predicts faster subsequent passes, more forward passes, and more successful passes (Jordet et al., 2013, 2020; McGuckian et al., 2018) — and **midfielders scan more than other positions** (Jordet et al., 2020). *Archetype signal:* strong — the high-scanning, information-first profile is the **Architect** (scanning feeds progressive passing) and the **Sentinel** (scanning feeds threat-reading); the **Destroyer's** game leans less on pre-receiving scanning. Extractable via head-orientation from pose estimation. *Caveat:* needs decent footage angle and resolution — far-pitch and busy backgrounds degrade head-movement detection (Jordet et al., 2020) — and scanning has a skill ceiling (no super-elite vs elite difference, 2024). A powerful *style* signal, not a talent oracle.

**E2 · Body orientation on receiving.** Open (forward-facing) vs closed (safety-first) hips/shoulders at the moment of reception, from pose estimation. *Archetype signal:* **Architect/Warrior** (open, ready to progress) vs **Destroyer/Sentinel** (secure-first). *Feasibility:* medium.

**E3 · Action-event coding.** Adopt the Serie A technical taxonomy (Perrotta et al., 2025) as the DM film schema: passes attempted/completed, progressions ("successful playing patterns"), possessions lost, retention time, plus the defensive events your archetypes hinge on — tackles, interceptions, recoveries, duels won. *Archetype signal:* the most direct fingerprint — Destroyer (duels/tackles/recoveries), Sentinel (interceptions), Architect (passing volume/progressions), Warrior (a distributed profile across all events). *Feasibility:* medium manual (player/coach tags clips) → hard to fully automate.

**E4 · Positional footprint.** Average position, coverage area, and distance from the centre-backs, derived from a fixed wide-angle clip. *Archetype signal:* Warrior (large area covered) vs Architect (central-deep) vs Sentinel (disciplined screening zone). *Feasibility:* medium-hard — needs pitch homography/tracking and good footage.

---

## The analytical centrepiece — which instrument separates which archetype

No instrument reads all four archetypes. The engine works because different instruments illuminate different corners. Read this as *"where does each archetype light up brightest?"*

| Instrument | Destroyer | Sentinel | Architect | Warrior |
|-----------|:---------:|:--------:|:---------:|:-------:|
| A · Scenario quiz | ● | ● | ● | ● |
| B · Trait battery | risk / aggression | discipline / patience | openness / composure | grit / versatility |
| C2 · Go/No-Go | **more impulsive** | **most restrained** | — | — |
| C3 · MOT | — | high | — | high |
| C4 · Working memory | — | ● | **●** | — |
| C5 · Visual search | — | — | **fast + progressive** | — |
| C6 · Occlusion style-probe | **"win it"** | **"keep it safe"** | **"progressive"** | **"drive & cover"** |
| C7 · Pattern recall | — | ● | ● | — |
| E1 · Scanning frequency | low | high | **highest** | mid |
| E2 · Body orientation | closed | closed | **open** | open |
| E3 · Action events | duels / tackles | interceptions | passing / progressions | distributed |
| E4 · Positional footprint | central-deep | disciplined screen | central-deep | **largest area** |

Two things fall out of this table. The **occlusion style-probe (C6)** and **action-event coding (E3)** are the only two instruments that cleanly separate all four archetypes at once — they are your highest-value builds. And the **Warrior** is defined less by any single spike than by a *flat, broad* profile — no dominant corner. That's diagnostic in itself: when nothing spikes and everything is competent, that *is* the Warrior signature (and it dovetails with the DM-DNA "Hybrid" logic from v1.1).

---

## PART C — The predictive engine architecture

The engine's job is to fuse these layers into the DM-DNA spread from v1.1, plus a **confidence meter**, plus the surfacing of tension between stated and revealed style.

**1. Each layer emits a partial signal.** Every completed instrument outputs its own four-way archetype vote (or a covariate). Layer A is always present; B–E are optional.

**2. Weight by objectivity, not just by your existing formula.** Your ArchetypeClassifier already weights psychological 0.35 / tactical 0.30 / physical 0.20 / technical 0.15. Extend that with an *evidence-quality* weight: revealed-behaviour layers (C6, E1, E3) should be able to **upweight or correct** the self-report layers (A, B), because behaviour under pressure and on film is harder to fake than a questionnaire.

**3. Confidence rises with convergence.** Output a confidence meter that climbs as (a) more layers are completed and (b) more of them agree. A player who has only done the quiz gets a real result at *low* confidence; a player who has done the quiz, the occlusion probe, and uploaded film that all point the same way gets *high* confidence. This is exactly the "accurate representation within the limits of the instrument" the product should promise — accuracy scaled to evidence.

**4. Conflict is a feature, not an error.** When the objective layers disagree with the self-report, surface it as insight — and route it straight into the v1.1 **aspiration bridge**: *"You describe yourself as an Architect, but under time pressure you consistently choose the safe pass and your scanning is low — you may be a Sentinel who wants to become an Architect."* That's not a failure of the engine; it's the single most valuable thing it can tell a young player, and it's the seam where assessment becomes a development plan.

**5. Output the spread, never a bare label.** The result stays the four-colour DM-DNA bar plus the confidence meter plus which layers contributed — so the player sees *why* the engine believes what it believes (the "why this fits you" principle from v1.1, now backed by objective evidence).

---

## What "accurate representation" can and cannot mean here

Hold this line, in the product copy and with buyers:

- **It can** give a well-triangulated read of *current style tendencies*, at a stated confidence level, that gets sharper as the player adds objective layers.
- **It can** reveal the gap between how a player sees themselves and how they behave under pressure and on film.
- **It cannot** measure physical match output (distance, intensity) — that needs wearables you don't have; the field-test layer is a self-reported proxy only.
- **It cannot** *predict a career trajectory or an injury.* No screen can, and any claim that it does is the thing that will sink your credibility with the exact professional audience you're selling to. Prediction, if it ever comes, is earned from real longitudinal outcome data collected *after* launch — not asserted before it.

Framed this way, the engine is both genuinely differentiated (no consumer football app triangulates style across self-report, on-screen behaviour, and film) and honestly bounded.

---

## Recommended build order

1. **Ship Layer A** (done) and add **C6 — the occlusion style-probe** and **C5 — visual search.** These are the two cheapest high-signal objective instruments, and C6 alone separates all four archetypes. Biggest jump in engine quality per unit of build.
2. **Add Layer B** (trait battery — small build, formalises what you already have) and **C2 — Go/No-Go** (the impulsivity axis that separates Destroyer from Sentinel).
3. **Add the rest of Layer C** (MOT, working memory, pattern recall) as a "cognitive profile" module — flag the weak/experimental ones (C8, C9) as covariates, not discriminators.
4. **Open Layer E with manual event coding (E3)** using the Serie A taxonomy, then **scanning (E1)** semi-automated via pose estimation. Highest validity, highest cost — do it once the objective screen layers are proven.
5. **Layer D (field tests)** slots in per the Gap Analysis, strictly optional.
6. **Throughout:** build the confidence meter and the stated-vs-revealed tension surfacing from day one — they're what make the honesty defensible and the insight valuable.

---

## Sources

1. *Are there differences in the attention of elite football players concerning playing positions?* (2022). **Science and Medicine in Football, 6(4).** doi:10.1080/24733938.2021.1994151 — DMs more attentive, less impulsive than hybrid roles (grounds C2).
2. Vater, C., Gray, R., & Holcombe, A. O. (2021). *A critical systematic review of the NeuroTracker perceptual-cognitive training tool.* **Psychonomic Bulletin & Review, 28(5), 1458–1483.** doi:10.3758/s13423-021-01892-2 — MOT's mixed predictive validity (caveat for C3).
3. *3D-MOT / NeuroTracker home-based training in soccer players* (2021–2024) — perceptual-cognitive capacity, no reliable transfer to game performance (caveat for C3).
4. Jordet, G., et al. (2013); McGuckian, T. B., et al. (2018, *Front. Psychol.* 9:2520); Jordet, G., et al. (2020, *Front. Psychol.* 11:553813) — scanning frequency, its performance links, and the positional finding that midfielders scan more (grounds E1).
5. *No evidence that visual exploratory activity distinguishes super-elite from elite football players* (2024). **Science and Medicine in Football.** doi:10.1080/24733938.2024.2325139 — scanning's ceiling (caveat for E1).
6. *Temporal-occlusion training meta-analysis* (2024). **Sports Medicine.** doi:10.1007/s40279-024-02073-6 — the occlusion paradigm's evidence base (grounds C6).
7. *Perceptual-cognitive skill and the in-situ performance of soccer players* (2018). PMC6159770 — video decision-making tests did **not** predict on-field performance (caveat for C6).
8. Perrotta, R., Ungureanu, A. N., Cherubini, D., Brustio, P. R., & Lupo, C. (2025). *Technical, Tactical, and Time–Motion Match Profiles… Serie A.* **Sports, 13(2), 28.** doi:10.3390/sports13020028 — the film event taxonomy (grounds E3).
9. Williams, A. M., & Davids, K. (1998). *Visual search strategy, selective attention, and expertise in soccer.* **Res. Q. Exerc. Sport, 69, 111–128.** — grounds C5/C7.

*Note: several instruments (C6, E1, E3) require a curated, archetype-tagged clip or footage library — the main content investment, but one reusable across all seven position modules.*
