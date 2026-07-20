# Outside Midfielder — Assessment Instruments & the Predictive Engine
### Analysis of the current battery, and what a phone/tablet/computer can add to it

**Companion to:** Player App Build Handoff v2.0 · Research Integration & Testing Layer
**Question this answers:** *How good is our current battery at predicting archetype — and what device-native games, interactions, or film can make it genuinely better, inside the limits of a phone/tablet/computer?*
**Date:** July 15, 2026

---

## 1. The reframe you need before analysing anything: three modalities, two different targets

Every instrument that assesses a player belongs to one of **three measurement modalities**, and each has a different failure mode. A good predictive engine triangulates across all three, because no single one is trustworthy alone.

| Modality | What it captures | Failure mode |
|---|---|---|
| **Self-report** (the questionnaire) | What the player *believes / intends / wants* | Aspiration, social desirability, limited self-knowledge, gaming |
| **Capacity tests** (field tests, some cognitive tasks) | What the player *is physically/cognitively able to do* | Capacity ≠ style; noisy when self-administered; strong age effects |
| **Behaviour** (film; behavioural games) | What the player *actually does* | Availability, effort, hard to automate, footage quality |

And there is a second distinction that most sports products get wrong, so I want it on the table before we build anything:

> **Some instruments predict *ceiling* (how good/how far a player will go). Others predict *style* (which archetype he is). These are not the same target, and conflating them corrupts the engine.**

Executive-function tests are the clearest example. Vestberg et al. showed working memory and design-fluency scores correlate with the *number of goals* young players go on to score — that is a **ceiling** signal (better cognition → more success), not a **style** signal (it doesn't tell you Renegade vs. Sentinel). If you feed a raw "high EF" score into archetype classification, you'll just push good players toward the flashier archetypes, which is wrong. So throughout this document I separate the two: some instruments belong in the **archetype classifier**, others belong in the **readiness/ceiling overlay**, and a few contribute to both but only through specific *sub-components*.

Keep this split in mind. It's the difference between a real predictive engine and a personality quiz wearing a lab coat.

---

## 2. Analysis of the battery we have

Three instruments exist today (one built, two specced). Here is what each actually predicts, and where it's weak.

### 2.1 Instrument 1 — the 12-question situational questionnaire *(the classifier)*

**What it measures:** self-reported disposition — how the player sees his role and what he'd choose in game situations. This is the whole classifier right now.

**Its real strengths** (and they're genuine): it's fast, scalable, emotionally engaging (the reveal is the product), and — most cleverly — it is *designed to suppress aspiration bias*. Every kid at left mid thinks he's a Renegade; by making the items situational rather than aspirational, and by making Chapter IV about *"who are you at minute eighty"* rather than *"who do you want to be,"* the questionnaire gets closer to disposition than a naïve "which player do you admire?" quiz ever could. The normalised scoring I specced in the v2 handoff makes it internally fair across archetypes on top of that.

**Its limitations** — and this is the point of the whole document:

1. **It is a single instrument in a single modality.** Everything rests on one self-report. There is no behavioural or capacity corroboration anywhere.
2. **Self-knowledge ceiling.** A 13-year-old often cannot accurately report how he plays. He answers who he *thinks* he is.
3. **Residual aspiration and gaming.** Chapter IV helps, but the options are still legible — a player who wants "Renegade" can steer toward the flashy choice. Self-report is always gameable when the respondent can guess what's being measured.
4. **It measures intention, not behaviour or capacity.** It cannot see what the player actually does on the pitch, and it cannot see what he's physically or cognitively capable of.
5. **Crucially, it cannot detect the gap between self-concept and reality** — which, as §5 argues, is the single most valuable thing this product could tell a young player.

**Verdict:** an excellent *disposition prior*. It should remain the spine of the classifier. But a prior is not a prediction, and one instrument is not an engine.

### 2.2 Instrument 2 — optional self-report field tests *(capacity overlay)*

**What it measures:** physical capacity — intermittent endurance (Yo-Yo), repeated-sprint/fatigue resistance (RSA), acceleration and speed (sprints), from the Research Integration doc.

**Its role in prediction:** capacity *constrains* style without *determining* it. A genuinely slow player cannot really be a Renegade; a player with elite endurance and modest acceleration is more plausibly an Engine than a Renegade. So field tests act as a **plausibility filter** on the questionnaire's output — not a classifier.

**Its limitations:** self-administered and therefore noisy; capacity is not style (you can have Renegade athleticism and play like an Engine); strong age effects; and — from the research — a lab-style fitness number like VO₂max doesn't even discriminate between positions, so it must never be treated as a quality score.

**Verdict:** belongs in the **readiness/ceiling overlay** and as a soft plausibility constraint on the classifier — never as a classifier itself.

### 2.3 Instrument 3 — film event-KPIs *(behavioural output)*

**What it measures:** actual behaviour and output — crosses reaching the danger zone, take-ons, combinations with the full-back, tracking-back (the Renegade bargain), from the Research Integration doc.

**Its role in prediction:** this is the closest thing to behavioural ground truth, and it aligns with the finding that 83% of practitioners use event data. It's the strongest classification signal available *when footage exists*.

**Its limitations:** not every young player has film; amateur footage is wide-angle and low-resolution; manual tagging is effortful; automated extraction is a hard computer-vision problem (Phase 3).

**Verdict:** the best behavioural signal, but optional and effortful. Great when present; can't be the backbone because it isn't always there.

### 2.4 The gap this battery leaves

Look at what the three instruments have in common: the questionnaire is **pure self-report**, the field tests are **optional and physical-only**, and film is **optional and effortful**. There is **no device-native behavioural instrument** — nothing that (a) runs on the phone with no external footage or fitness test, (b) is harder to game than the questionnaire, and (c) probes the dimensions that actually *define* these archetypes.

And here is the sharp version of the gap. **The archetypes are, more than anything, cognitive-perceptual constructs.** Read the catalog's own trait lists:

- **Weaver** — "elite scanning frequency," reads pressure before it arrives.
- **Sentinel** — reads the 2v1 "before it forms"; elite anticipation of the overlap.
- **Deliverer** — reads the striker's run "before the striker commits."
- **Renegade** — "elite processing at speed," elite deception; low conscientiousness/impulse control is his defining vulnerability.
- **Engine** — "elite dual-phase attention switching… without a mental gear-crunch."

Every one of those is a cognitive-perceptual ability — and the questionnaire can only *ask about them*, it cannot *measure them*. That is the hole in the battery, and it is exactly the hole a phone is good at filling, because cognitive-perceptual tasks are screen-native.

---

## 3. What a phone/tablet/computer can actually add — grounded in the science

Everything below is chosen against two tests: is there real evidence it measures something that matters, and can a consumer device actually collect it? I've ordered these by value.

### 3.1 Screen-based cognitive-perceptual games (the big opportunity)

These are the highest-value additions because they measure — behaviourally — the traits the questionnaire can only self-report, and they're harder to game because the player can't easily fake a reaction or an anticipation.

| Game | Cognitive construct | Archetype it helps separate | Classifier or ceiling? | Grounding |
|---|---|---|---|---|
| **Decision game** *(flagship)* — a game situation appears; player chooses dribble / cross / combine / track-back / drive-into-space under a shrinking time window; log **choice distribution + latency** | Decision-making under time pressure; behavioural default | **All five** — the choice fingerprint maps 1:1 (dribble→Renegade, cross→Deliverer, combine→Weaver, track/hold→Sentinel, "get there"→Engine) | **Classifier** | Perceptual-cognitive decision research; the behavioural twin of the questionnaire |
| **Scanning task** — a scene flashes, then occludes; player reports peripheral info (how many defenders, where's the free man, was there an overlap) | Visual exploratory activity / scanning | **Weaver** (his signature) | Classifier (Weaver axis) | Jordet/Aksum/McGuckian: scanning predicts on-ball performance, differs by role (midfielders scan most), and is even detectable from film |
| **Anticipation / occlusion task** — a developing attack plays, freezes before the outcome; player predicts what happens next | Perceptual anticipation | **Sentinel** (reads the 2v1 early) and **Deliverer** (reads the run early) | Classifier (defensive/reading axis) | Perceptual anticipation is a core mechanism of in-game decision-making in the EF/game-intelligence literature; temporal occlusion is the standard method |
| **Go / No-Go (inhibition)** — commit on "go" cues, withhold on "no-go" (e.g., dive into the tackle vs. hold and jockey) | Inhibitory control | **Sentinel vs. Renegade** (high inhibition = disciplined; low = impulsive) | Classifier (discipline axis) + ceiling | Stop-signal/inhibition differentiates elite youth players (Vestberg lineage) |
| **Attention-switching task** — alternate between an "attack" rule-set and a "defend" rule-set on cue; measure the **switch cost** | Cognitive flexibility / task-switching | **Engine** (low switch cost = his defining dual-phase trait) | Classifier (Engine axis) | Cognitive flexibility (Trail-Making-type tasks) differentiates elite players; the Engine's trait is literally attention-switching |

Two of these deserve a note.

**The decision game is the flagship** because it is the *behavioural* version of the questionnaire. The questionnaire asks "what would you do?" at leisure; the decision game forces the choice under a shrinking clock, and **under time pressure the true default comes out.** A player's aggregate distribution of choices is a behavioural fingerprint that maps directly onto the archetypes and is far harder to fake than a leisurely quiz answer — provided you keep the mapping opaque. This one instrument does more to de-bias the classifier than anything else on the list.

**The attention-switching task matters out of proportion to its size** because the Engine is otherwise hard to *positively* identify — he's the "whatever the move needs" default, so he tends to be what's left over. A task that *positively* detects his signature trait (low cost when switching between attack and defend modes) turns the Engine from a residual category into a directly-measured one.

### 3.2 The fatigue-slope layer — Chapter IV, in cognitive form (the crown jewel, higher effort)

The framework's central chapter is built on one idea: **fatigue is the cleanest archetype separator.** You can't make a player run in-app — but you *can* measure how his decision-making **degrades under load**, which is the same idea in a form a phone can capture. Two ways to do it:

1. Run the decision game as a long, escalating block and measure the **slope of decline** in accuracy and speed. Engine and Sentinel hold; the Renegade degrades. That slope *is* the Chapter IV signal.
2. Deliver a 60-second decision task **immediately after** the optional field test, when the player is physically tired, and compare it to a fresh baseline.

This is the most on-brand instrument in the whole set: it operationalises the exact thesis of the assessment's best chapter, and it converts "who are you at minute eighty" from a self-report question into a measured behaviour. Grounding: scanning and running intensity both measurably decline late in matches (a fatigue effect), so decline-under-load is a real phenomenon, not a gimmick. Flag it as Phase 3 (it needs the decision game built and validated first), but it's the direction the whole engine should point.

### 3.3 Enhanced film — from *counting events* to *classifying style*

The Research Integration doc used film to **count** events (for the development plan). Film can do more than count — it can **classify**, by reading *how* a player occupies the pitch. These are the film signals that separate archetypes the questionnaire struggles with:

| Film signal | What it reveals | Archetype axis |
|---|---|---|
| **Scanning frequency** (head-turns per possession, via pose estimation) | Visual exploration before receiving | **Weaver** (and a direct in-the-wild version of the §3.1 scanning task) |
| **Body orientation & first-touch direction** | Receives open and takes first touch forward/inside (Weaver/Renegade) vs. holds width and sets up the cross (Deliverer) | Weaver / Deliverer split |
| **Spatial occupation / work-rate proxy** (rough player-tracking heatmap) | Holds width (Deliverer), tucks in (Sentinel/Weaver), covers both ends (Engine) | Engine / Sentinel / Deliverer |
| **Defensive-tracking depth** | How far and how often he tracks back | Renegade bargain vs. Engine |

The important unlock: **scanning is film-derivable.** Recent work detects visual exploratory activity from broadcast/camera footage via pose estimation — no eye-tracker required. So scanning appears *twice* in this engine: as an in-app task (§3.1) and as a film metric, which is a rare case where the same construct is measurable two independent ways and the two can be cross-validated. Honest phasing, same as before: manual/assisted tagging now, pose-estimation and CV later.

### 3.4 Lower-priority additions (include, but don't over-weight)

- **Camera-based ball-mastery** (kick-ups, tight-space touches counted via computer vision) — a *technical capacity* proxy. Correlates with level more than with style, so it's a **ceiling** signal, not a classifier. Nice engagement, modest predictive value.
- **Behavioural meta-signals** (free, passive) — questionnaire **response latencies** (fast/confident vs. deliberate — a soft impulsivity/confidence read that corroborates the Renegade-vs-Sentinel axis); **retake behaviour** (does he retake to chase a flashier result — an aspiration tell); which gamified challenges he chooses. Cheap corroboration, but noisy; use only as tie-breakers, never as primary evidence.
- **Simple reaction-time tests** — tempting but weak, because consumer touchscreen and display latency vary by tens of milliseconds *between devices*, so absolute reaction times aren't comparable across a userbase. If used at all, use only *within-player relative* differences (e.g., fresh vs. fatigued), never absolute values.

---

## 4. The engine architecture: how the instruments combine

The point of adding instruments is not to pile up scores — it's to **triangulate**. Here's the structure.

```
DISPOSITION PRIOR                BEHAVIOURAL EVIDENCE            CAPACITY / PLAUSIBILITY
Questionnaire (§2.1)     +   Decision game, scanning,      +   Field tests (§2.2),
                             anticipation, inhibition,          ball-mastery
                             switch-cost (§3.1);
                             film as classifier (§3.3)
        │                            │                                  │
        └──────────── weighted by (reliability × relevance) ───────────┘
                                     │
                     ARCHETYPE + CONFIDENCE SCORE
                                     │
                     ┌───────────────┴───────────────┐
             single coherent signal          instruments disagree
                     │                               │
              high-confidence reveal      ►►  SURFACE THE GAP  ◄◄
                                             (see §5 — this is the product)
```

Rules that keep it honest:

- **The questionnaire stays the prior; behaviour updates it.** Cognitive games and film move the estimate; they don't silently overrule the player's self-concept. (A player should never be told a game "corrected" who he is — see §5 for the right framing.)
- **Weight each instrument by its reliability × relevance.** A noisy self-timed sprint gets little weight; a clean decision-game choice-distribution gets a lot; a single occlusion trial gets little, a block of forty gets more.
- **Field tests constrain plausibility; they don't classify.** They can lower confidence in an implausible label (a "Renegade" who tests slow and endurance-heavy) without assigning a new one.
- **Output a confidence score, not just a label.** Low confidence is information, and it's the trigger for §5.

---

## 5. The thesis: the disagreement *is* the product

Here is the payoff, and it's the most important paragraph in this document.

A single quiz can only ever tell a player **who he thinks he is.** A multi-instrument engine can tell him **who he thinks he is *versus* how he actually behaves and what he can actually do** — and the *gap between those two* is the single most valuable thing this product could ever surface, because **it is the framework's own central developmental message.** The whole catalog turns on it: the kid who's convinced he's a Renegade but whose behaviour and body say Engine; the real Renegade whose ceiling depends entirely on building the endurance he doesn't yet have. A quiz cannot see that gap. An engine that triangulates self-report against behaviour and capacity can — and surfacing it, kindly and concretely, is worth more than any refinement to the archetype label itself.

So the goal of adding instruments is **not** "a more accurate single answer." It's the ability to say: *"You answer like a Renegade. Under time pressure you also choose the take-on — that's real. But your endurance test and your tracking-back on film say the thing standing between you and that ceiling is your lungs. That's not a smaller destiny. Giggs had exactly this gap and closed it."* That sentence is impossible from a quiz and native to an engine. Build toward being able to say it.

---

## 6. The discipline (what will wreck this if you ignore it)

- **Ceiling ≠ style.** Don't feed raw EF/scanning *level* into the classifier; it predicts how good, not which archetype. Use overall cognitive level as a **ceiling overlay**, and use only specific *sub-components / patterns* (choice distribution, inhibition, switch cost) for style. This is the most common way products like this go wrong.
- **We have no ground truth yet, so we cannot claim "predictive accuracy."** There is no lab test that outputs "Renegade" — the archetype is a latent construct the framework defines. Until you collect a criterion (expert **coach labels**, or a player's **actual match role over a season**), the engine measures **convergence between instruments**, not validated prediction. Say that honestly, and start collecting coach labels early so that one day you *can* calibrate. (This is the same discipline as the Formation module: don't dress internal consistency up as external validation.)
- **Age-norm every cognitive task.** Inhibition and working memory keep developing into the mid-teens; processing speed matures around twelve. Without age norms you'll read a 12-year-old's developmentally-normal poor impulse control as "Renegade impulsivity." Every cognitive score must be compared to age-matched norms, not raw.
- **Consumer devices are noisy instruments.** Touchscreen and display latency vary across devices; the environment is uncontrolled; there's no supervision; motivation confounds everything. Prefer *pattern* and *within-player relative* measures over absolute values, and never show more precision than the instrument earns.
- **Keep the mapping opaque and the load light.** Cognitive games resist gaming only if the player can't tell what maps to what — so don't reveal the scoring. And a fifteen-year-old will not complete eight tasks: keep the core short, make the rest optional, progressive, and genuinely game-like.

---

## 7. How this phases onto the build

| Phase | Instruments live |
|---|---|
| **1 — The Reveal** *(building now)* | Questionnaire only. **No change.** Passively capture response latencies for later use. |
| **2 — The Plan & first behavioural signal** | Add the **decision game** (flagship classifier), **one scanning task**, **one anticipation task**; the **field-test overlay**; **manual/assisted film event-tagging**. Engine outputs archetype **+ confidence**, and surfaces disagreement qualitatively (§5). Begin collecting **coach labels** as a future criterion. |
| **3 — The Intelligence** | Add **inhibition** and **switch-cost** tasks; the **fatigue-slope** layer (§3.2); **pose-estimation film** (scanning, orientation, occupation) and **automated event detection**; and the **weighted, confidence-scored engine calibrated against the coach-label/match-role criterion** you've been collecting since Phase 2. |

Nothing here changes the first Design build. The decision game is the first thing to prototype *after* the reveal ships — it's the highest-value new instrument and the one that starts turning a quiz into an engine.

---

## 8. Bottom line

Your current battery is one strong self-report instrument plus two optional overlays, and it has a specific, fixable hole: **nothing measures behaviour on the device, even though the archetypes are fundamentally cognitive-perceptual.** A phone is unusually good at filling exactly that hole. The highest-value additions are **screen-based cognitive-perceptual games** — a decision game above all, plus scanning, anticipation, inhibition, and attention-switching — each measuring a trait the questionnaire can only ask about, each grounded in real football-cognition research. **Enhanced film** turns from an event-counter into a style-classifier (and scanning becomes measurable two independent ways). And the real prize isn't a more accurate label — it's an engine that can finally see the **gap between who a player thinks he is and how he actually behaves**, which is the framework's own deepest message and something no quiz can ever deliver. Build it in that order, age-norm everything, keep the mapping hidden, and start collecting coach labels now so that one day you can prove the engine works instead of merely asserting it.

---

## References (new to this document)

- Aksum KM, Brotangen L, Bjørndal CT, Magnaguagno L, Jordet G. *Scanning activity of elite football players in 11 vs. 11 match play.* PLOS ONE. 2021;16(8):e0244118. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0244118
- McGuckian TB, Cole MH, Chalkley D, Jordet G, Pepping GJ. *Constraints on visual exploration of youth football players during 11v11 match-play.* J Sports Sci. 2020;38(6):658–668.
- McGuckian TB, Cole MH, Pepping GJ. *A systematic review of the technology-based assessment of visual perception and exploration behaviour in association football.* J Sports Sci. 2018;36(8):861–880.
- Vestberg T, Gustafson R, Maurex L, Ingvar M, Petrovic P. *Executive functions predict the success of top-soccer players.* PLoS ONE. 2012;7(4):e34731. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0034731
- Vestberg T, Reinebo G, Maurex L, Ingvar M, Petrovic P. *Core executive functions are associated with success in young elite soccer players.* PLoS ONE. 2017;12(2):e0170845. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0170845
- *A scoping review of empirical research on executive functions and game intelligence in soccer.* Front Psychol. 2025. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1536174/full
- Camera-based scanning detection: *Quantifying Visual Exploratory Behavior in Soccer with Pose-Enhanced Positional Data* (2026, arXiv); Maas TR, *Monitoring of Visual Exploratory Activity in Professional Football Using a Camera-Based Detection Algorithm* (MSc thesis, TU Eindhoven, 2025).

*Prior physical-demand and KPI references are listed in the Research Integration & Testing Layer document.*
