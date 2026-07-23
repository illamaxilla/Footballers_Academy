# Defensive Midfielder — Sports-Science Literature Gap Analysis
### Ten sources reviewed against the Position-DNA framework, filtered for a mobile + desktop product

**Date:** July 15, 2026
**Reviewed for:** The Footballer's Academy / Position-DNA DM system
**Constraint lens:** software only (mobile + desktop). No wearables, GPS vests, or lab hardware. **Film analysis is possible.** We cannot be physically present to measure anyone. Optional self-reported in-person test results can *enhance* the output — but must never *gate* it.

---

## The one thing to understand first

Almost none of these papers describe a **feature you're missing**. They describe **data and position-specificity you can embed**, plus a few things you can **turn into real software features** inside your constraints.

For a product with no sensors, the useful question isn't *"what does the research measure?"* — it's *"which of these four channels can **we** reach it through?"*

1. **Embed as benchmark content** — reference numbers baked into the app; nothing is measured.
2. **Administer on-screen** — a task the phone or desktop itself can run (attention, reaction, decision speed).
3. **Optional self-report** — a player or coach runs an in-person test and types the result; the app compares it to norms.
4. **Derive from film** — count events from uploaded video.

If a finding can't be reached by one of those four, it belongs in your written content and the ATLAS tutor — not in a feature.

**The single most important observation:** your existing Phase 2 assessment protocols are written for a **sports-science lab** — GPS trackers, metabolic carts, motion capture, timed field tests with a supervisor. That is the biggest mismatch between your framework and a software product. The value of these papers is that they let you keep the *credibility* of lab-grade thinking while delivering it through the three software-reachable channels above.

---

## Source-by-source

| # | Source | Core DM-relevant finding | In your framework? | Reachable how? | Gap? |
|---|--------|--------------------------|--------------------|----------------|------|
| 1 | **Setting the Benchmark, Part 1** — Bradley, *Biology of Sport* 2024 | DM/CM cover **8–19% more total distance** than any other role; DMs do **71–83% of their high-intensity running out-of-possession** (i.e. defensive work, not attacking sprints); DMs show the **highest match-to-match variability** in high-intensity distance; elite ceiling ~13+ km (Brozović, Skhiri). | Distance referenced only as a generic "10–12 km" range. The out-of-possession split and the variability point are absent. | Embed as benchmark content; yardstick for the optional field-test layer. | **Yes** (data specificity) |
| 2 | **Reference values, 13 roles, UEFA Euro 2024** — Chen, Zmijewski & Bradley, *Biology of Sport* 2025 | Splits **DM into role subsets** (single-pivot vs double-pivot); DMs are among the **highest-volume passers** on the pitch; gives per-role reference values combining physical + technical + tactical data. | Your archetypes are a *style* taxonomy. A *role-context* taxonomy (and mapping the two together) is new. | Embed as benchmark content; informs an archetype ↔ role-context mapping. | **Yes** (role-subset framing + current values) |
| 3 | **Biological maturation × position** — Sweeney, Cumming, MacNamara & Horan, *Biology of Sport* 2023 | Early-maturity selection bias exists for GK, CD, FB, CM, WM, CF — **but NOT for CDM or CAM.** Central defenders are the most biologically advanced. Measured via **Khamis-Roche % of predicted adult height**. | Not operationalised anywhere I can find. Your youth pathway exists but doesn't compute maturity status. | **Optional self-report** (height, weight, DOB, both parents' heights → estimate maturity timing). | **Yes** — strong, buildable, differentiating for youth |
| 4 | **Match vs transition-game running demands** — 2024 | Small-sided / transition games under- or over-represent specific real-match demands for DMFs; informs how closely a drill reproduces match load. | Development plans include drills; this is a science-of-drill-design refinement. | Embed as content (plan design). | Minor (content refinement) |
| 5 | **Physical Demands of Different Positions, FA Premier League** — Bloomfield, Polman & O'Donoghue, *JSSM* 2007 | Foundational motion-analysis of positional movement patterns. | **Already cited** in your DM Codex Enhancement Guide. | Content. | **No** — already in |
| 6 | **Influence of tactical formations** — 2020 | Midfielder running outputs vary meaningfully by formation / system. | Tactical systems are discussed; this is corroborating context. | Embed as content; supports "your numbers depend on your system." | Minor (context) |
| 7 | **Attention by playing position** — *Science and Medicine in Football* 2022 | DMs (and defenders) were **more attentive and less impulsive** than hybrid roles (fullbacks, attacking mids), measured with a **computerised continuous-performance test**. *Caveat:* the broader executive-function literature is mixed on direction. | Cognitive testing is listed but not operationalised as an on-screen test with position context. | **Administer on-screen** — a CPT-style sustained-attention / impulse task is, by definition, a screen task. | **Yes** — the most directly buildable *new feature* here |
| 8 | **Technical/tactical/time-motion, Serie A** — Perrotta, Ungureanu, Cherubini, Brustio & Lupo, *Sports* 2025 | A clean, concrete **taxonomy of trackable technical events** (played balls, successful passes, successful playing patterns, lost balls, possession time, dribbles, crosses, assists, shots); midfielders' high-intensity running correlates with ball possession. | Technical assessment is listed but without a film-codeable event schema. | **Derive from film** / optional self-report from match stats. | **Yes** (event taxonomy for film analysis) |
| 9 | **"What is a Defensive Midfielder?"** — coaching guide | Qualitative role responsibilities: screening, build-up, cover. | Your codex already exceeds this. | Content only. | **No** (qualitative enrichment) |
| 10 | **The Breakdown: DMs with Katie Zelem** — Angel City, 2024 | A professional DM's role explanation; an authentic **women's-football practitioner voice**. | Your Women's Adaptation doc covers the domain; this is a real voice to quote. | Content only. | **No** (qualitative; feeds the women's module + ATLAS) |

---

## The genuine gaps, grouped by what it takes to build them

### Gap 1 — On-screen cognitive profiling *(the one genuinely new feature)*

Build a short, on-device attention / impulse-control task — a continuous-performance-style test: the player responds to target cues and withholds on non-targets, and you capture **sustained attention, reaction time, and commission errors** (responding when they shouldn't — an impulsivity proxy). This runs entirely on the phone or desktop; no hardware, no supervisor.

Position it as an optional **"Mind" module** that adds a cognitive dimension to the DM-DNA spread. The evidence base (Source 7) shows DMs skew attentive and low-impulsive — which fits the Sentinel especially — so the result enriches the archetype picture rather than duplicating it.

*Honesty caveat:* a phone task is **not** a validated clinical instrument, and the wider executive-function literature is genuinely mixed on which positions score highest on which cognitive traits. Present the output as a **profile colour and a personal trend**, never as a pass/fail gate or a diagnosis. Sold that way, it's still a real differentiator — no consumer football app profiles cognition against position.

### Gap 2 — Maturation status via optional self-report *(the youth differentiator)*

Collect four things a parent or player can supply: **date of birth** (which also gives you relative-age quartile for free), **height**, **weight**, and **both biological parents' heights**. From these, estimate **% of predicted adult height (Khamis-Roche)** to place the player as early-, on-time-, or late-maturing.

Two payoffs:
- **Context for every physical self-report.** *"You're pre-peak-height-velocity — don't chase a Destroyer's duel numbers yet; your job now is technique and reading the game."*
- **A message no rival app sends.** Source 3 found the DM/CDM position carries **no early-maturity selection bias** — so it is a genuine survival pathway for talented late developers who get squeezed out elsewhere. This connects directly to the established **bio-banding** literature (Cumming and colleagues) and slots straight into your ages 12–18 module.

*Honesty caveat:* Khamis-Roche is an **estimate with real error bars**, and self-reported parental height is imperfect. Show maturity **bands**, not a false-precision number.

### Gap 3 — Position reference values as embedded benchmark content *(the credibility layer)*

Bake the World Cup 2022 and Euro 2024 role reference values (Sources 1–2) into the app **as context, not as something you measure**: the total-distance rank, the out-of-possession high-intensity split, the high passing volume, the high match-to-match variability.

Three uses:
- **Enrich each archetype card** with a real, grounded line — *"Real DMs cover more ground than almost any role, but most of their sprinting is defensive work, not attacking runs."*
- **Give the optional field tests a yardstick** (Gap 4).
- **Replace invented numbers.** Your README's "880fs spatial coherence" and "microbiome predicts Saturday performance" claims can be swapped for these real, citable figures. **This is the single highest-leverage credibility move available to you** — real data a professional buyer can verify, retiring exactly the claims that audience would bounce off.

*Honesty caveat:* these are elite **men's** tournament figures from GPS/optical tracking. Never present a World Cup number as a *target* a youth or amateur should hit — use it as directional context only. For the women's module, use the **women's** World Cup figures from the same "Setting the Benchmark" series.

### Gap 4 — Optional in-person field-test layer *(your "enhance the output" tier, made concrete)*

This is precisely the optional self-reported testing you described. A small battery a player or coach runs on a pitch with a phone timer and a few cones, then types in — and the app scores each against age/position norms and folds it into a richer, **optional** "verified" profile sitting on top of the questionnaire:

- **Aerobic capacity** — Yo-Yo Intermittent Recovery Level 1, or 30-15 IFT. *(Endurance is the DM's statistical signature, per Sources 1–2.)*
- **Repeated sprint / acceleration** — 10 m and 30 m sprint times.
- **Change of direction** — 505 or Illinois agility test.
- **Lower-body power** — countermovement jump (phone flight-time apps exist) or standing broad jump.
- **Anthropometrics** — height and weight *(feeds Gap 2)*.

*Honesty caveat:* self-timed field tests are **noisy** — label results as indicative, not precise. And a slow sprint must **never demote** a player's archetype: archetype is *style*, athleticism is a *separate layer*. The whole point is that this enhances, and does not gate, the result.

### Gap 5 — Film-derived technical event taxonomy *(leverages your existing video plan)*

You already plan video upload. Adopt Source 8's clean event taxonomy as your **film-coding schema** for the DM: passes attempted/completed, successful playing patterns (progressions), possessions lost, ball-retention time, plus the defensive events your archetypes hinge on (tackles, interceptions, recoveries, duels won). Whether coded manually at first (the player or coach tags clips) or semi-automatically later, a shared, literature-grounded schema makes the film feature **credible** and the resulting data **comparable across players**.

---

## What's already covered — don't rebuild it

- The physical-demand *topic*, and the Bloomfield 2007 citation (present in your Enhancement Guide).
- Tactical-system context (present).
- Video analysis as a concept (present in your app spec).
- Readiness / acute-chronic workload self-report monitoring (present).
- Qualitative DM role knowledge — your codex already goes well beyond the two coaching sources here.

---

## The credibility opportunity hiding in this list

Eight of these ten are **current, peer-reviewed** sources — several co-authored by Paul Bradley, whose "Setting the Benchmark" work was produced **with FIFA's approval** and is about as close to an industry-standard reference as this field has. That is exactly the evidence base your "Specialist Authority" positioning needs: every figure you cite from them is a claim a Legia- or FIFA-adjacent sports scientist can look up and verify.

Using them to **replace** the speculative "quantum / microbiome / 880fs" language isn't a downgrade. It's the upgrade that finally lets your genuinely strong archetype methodology stand in front of the precise audience you're trying to sell it to.

---

## Recommended order

1. **Gap 3 — embed reference values.** Pure content, immediate credibility, and it feeds everything below. Do this first.
2. **Gap 2 — maturation self-report.** Small build, high differentiation, directly serves the youth module.
3. **Gap 4 — optional field-test layer.** Your "enhance the output" tier; modest build on top of the questionnaire.
4. **Gap 1 — on-screen cognition.** The one truly new feature; the most build effort — tackle it once the core loop is solid.
5. **Gap 5 — film schema.** Adopt the taxonomy now as your standard, even before any automation exists.

---

## Sources

1. Bradley, P. S. (2024). *'Setting the Benchmark' Part 1: The Contextualised Physical Demands of Positional Roles in the FIFA World Cup Qatar 2022.* **Biology of Sport, 41(1), 261–270.** doi:10.5114/biolsport.2024.131090
2. Chen, S., Zmijewski, P., & Bradley, P. S. (2025). *Establishing reference values for the match running performances of thirteen specific positional roles at UEFA Euro 2024.* **Biology of Sport, 42(3), 257–268.** doi:10.5114/biolsport.2025.148535
3. Sweeney, L., Cumming, S. P., MacNamara, Á., & Horan, D. (2023). *The selection advantages associated with advanced biological maturation vary according to playing position in national-level youth soccer.* **Biology of Sport, 40(3), 715–722.** doi:10.5114/biolsport.2023.119983 · PMID 37398961
4. *Analysis of Differences in Running Demands between Official Matches and Transition Games of Young Professional Soccer Players according to the Playing Position* (2024). Retrieved via PubMed.
5. Bloomfield, J., Polman, R., & O'Donoghue, P. (2007). *Physical Demands of Different Positions in FA Premier League Soccer.* **Journal of Sports Science & Medicine, 6(1), 63–70.**
6. *Influence of Different Tactical Formations [on midfielder running outputs]* (2020). Retrieved via PubMed.
7. *Are there differences in the attention of elite football players concerning playing positions?* (2022). **Science and Medicine in Football, 6(4).** doi:10.1080/24733938.2021.1994151
8. Perrotta, R., Ungureanu, A. N., Cherubini, D., Brustio, P. R., & Lupo, C. (2025). *Technical, Tactical, and Time–Motion Match Profiles of the Forwards, Midfielders, and Defenders of a Men's Football Serie A Team.* **Sports, 13(2), 28.** doi:10.3390/sports13020028
9. *What is a Defensive Midfielder? (And How to Play One)* — SoccerCoachingPro coaching guide.
10. *The Breakdown: Defensive Midfielders with Katie Zelem* (2024) — Angel City FC club interview.

*Note: full findings for Sources 4 and 6 were characterised from their published titles/abstracts and your supplied notes; if either becomes central to a feature, pull the full text before quoting any figure.*
