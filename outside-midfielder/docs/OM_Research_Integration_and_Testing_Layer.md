# Outside Midfielder — Research Integration & the Optional Performance-Testing Layer
### A gap analysis of the external literature, filtered through what a mobile/desktop app can actually use

**Companion to:** Outside Midfielder Player App — Build Handoff v2.0
**Question this document answers:** *Do these papers cover anything the framework doesn't already have — and if so, can our app actually use it?*
**Date:** July 15, 2026

---

## 1. The method, and the one filter that governs everything

I pulled and read all nine sources you listed (plus a handful of adjacent papers the searches surfaced, flagged as such). Then I ran every finding through a single filter, because without it a literature review of this kind is misleading:

> **Almost all of this research measures GPS or optical-tracking data — total distance, high-speed running, sprint counts, accelerations — and our app cannot collect any of it.** That data requires a wearable GPS pod strapped to the player, or a stadium optical-tracking rig (TRACAB, ChyronHego, InStat). We are a phone and a laptop. We are never in the stadium.

So "is this finding new?" is the wrong question on its own. The right question has two parts:

1. **Is it new** relative to what the framework already asserts? and
2. **Is it reachable** through one of our three actual input channels:
   - **(A)** the self-report **questionnaire** (the 12-question assessment),
   - **(B)** **film** the player uploads, and
   - **(C)** optional **self-reported field-test results** the player enters after doing a standard fitness test themselves.

A finding only matters to the product if it's *both* new *and* reachable. Most of these papers are neither — they confirm things you already have, using data you can't gather. But three of them contain something genuinely new, and one of those exposes a real, fixable gap in the app. That's the payoff, and Sections 4–8 build to it.

---

## 2. Source-by-source verdict

"Confirms" = the framework already asserts this. "Channel" = how, if at all, the app could reach it.

| # | Source (year) | What it actually found | New to us? | Reachable? |
|---|---|---|---|---|
| 1 | Mallo et al., *Physical Demands… GPS* (2015) | Match avg ~10.8 km; **wide midfielders cover the most very-high-intensity running (>19.8 km/h)**; centre backs least distance but most accelerations | **Confirms** — this is almost verbatim the framework's core claim | GPS only — **no** |
| 2 | Pettersen & Brenn, *Activity Profiles… Youth* (2019) | **U17 data**: wide mids top HIR, sprinting, accelerations, max speed; **every position shows a significant end-of-match decline** in high-intensity output | Confirms wide-mid dominance; **the decline finding is new *evidence* for an existing design choice** (Chapter IV) | GPS only — **no**, but see §5 |
| 3 | Borghi et al., *GPS variables by formation… U19* (2020) | Across 4-4-2 / 3-5-2 / 4-3-3, wide players always top very-high-speed running; **all positions decline in the 2nd half** | **Confirms** the formation-dependency thesis and the fatigue premise | GPS only — **no** |
| 4 | Bortnik et al., *Transitional play* (2024) | Whole-match averages hide the truth; **wingers post the highest accelerations+decelerations per minute during transitions** | **Confirms** — this is the source of a claim already in your Formation module | GPS only — **no** |
| 5 | Plakias et al., *Latent Components* (2025) | Factor analysis collapses many physical metrics into **three components: moderate-intensity running, high-intensity running, sprint capacity**; wide players excel in the latter two | **Partly new** — methodological support for the Formation module's vector-compression | GPS only — **no** (but see §5) |
| 6 | Lobo-Triviño et al., *Worst-Case Scenario* (2025) | Introduces the **1-minute peak ("worst-case scenario") demand**, and **how often a player exceeds 85% of their own peak** | **New concept** — the framework has no "peak/repeatability" lens | Optical only — **no directly**, but reframes §7 |
| 7 | Herold et al., *Attacking KPIs* (2021) | Surveyed 145 practitioners in 42 countries incl. youth academies; **83% use event data, only 52% use positional data**; validates **twelve attacking KPIs** | **New and important** — exposes a real gap | **Yes — via film (B)** |
| 8 | *Performance Indicators in Football* (Hughes lineage, 2018) | Expert panels define per-position KPIs in **five buckets: physiological, tactical, technical-defensive, technical-attacking, psychological**; wide midfielder is a defined role | Confirms the multi-dimension approach (your 13 dimensions are richer); the 5-bucket scaffold is a **useful cross-check** | **Yes — via film + questionnaire** |
| 9 | *8v8 Soccer Positions Explained* (2016, coaching) | Plain-language outside-midfield responsibilities and skills | **Confirms** — role content the framework already covers exhaustively | n/a — reference only |

**The pattern is stark.** Six of nine (1, 2, 3, 4, 8, 9) confirm what you already have. One (5) is a methodological nod to the Formation module. Two (6, 7) contain something genuinely new — and only one (7) is directly reachable by the app today.

---

## 3. Two adjacent papers the search surfaced (not on your list, but worth knowing)

- **Plakias et al., data-driven midfielder clustering** — uses K-means clustering plus PCA on twelve KPIs to derive four midfielder archetypes from event data. This is essentially a working prototype of your Phase 3 auto-classifier, on adjacent positions. It's evidence the data-driven archetype approach is viable, and a methodology reference for when you build the classifier. Not needed now.
- **Aerobic fitness vs. performance-index study (InStat)** — found that lab **VO₂max is *not* a good discriminator between playing positions**, and that aerobic fitness did **not** correlate with a match performance index. This is an important *caution* for the testing layer in §7: do not treat a single fitness number as if it predicts on-pitch quality. Football-specific *intermittent* capacity matters more than a lab VO₂max, and no field test predicts performance on its own.

---

## 4. What the research confirms (you already have it) — and why that's still worth something

The framework's physical claims are not opinions; they're the settled finding of this literature. Wide midfielders really do cover the most very-high-intensity running of any position; the second-half decline really is universal; formation really does reshape the demand. You already assert all of this.

The value of the confirmation isn't new features — it's a **citation spine**. Your positioning includes a "Research Institute," and right now the framework's benchmark numbers (the per-archetype total distances, the "lowest second-half decline" for the Engine, the very-high-intensity claims) are stated without sources. Papers 1–4 are the peer-reviewed backing for those exact numbers. **Action: attach these citations to the framework's physical benchmarks.** It costs nothing and it converts assertions into evidence, which is the whole difference between a quiz and a Research Institute. It does **not** change the app.

---

## 5. What's genuinely new in the research

Three things, in ascending order of usefulness to the product.

### 5.1 The factor structure (relevant to the Formation module, not the player app)

Plakias et al. (2025) show that the many physical metrics people track collapse into **three underlying components**: moderate-intensity running, high-intensity running, and sprint capacity. This is empirical support for the *idea* behind your Formation module — that you can compress physical performance into a few axes rather than tracking dozens of correlated metrics. But note the difference: their three axes are purely physical (all about running speeds), whereas the Formation module's five vectors (Volume, Intensity, Defensive Share, Isolation, Licence) are mostly *tactical*. So the paper validates the *move*, not the *specific axes* — and it hints that the Formation module's physical side (its Volume and Intensity vectors) might be more faithfully represented by three empirical components than by two invented ones. **This is a Phase 3 note for the engine, not a player-app change.** File it against the Formation module.

### 5.2 The fatigue / worst-case-scenario lens (strengthens your best chapter)

Two findings converge here. Papers 2 and 3 establish empirically that **every position declines at the end of a match** — which is the evidentiary ground under your entire "Eightieth Minute" chapter. The framework *designed* that chapter on the intuition that fatigue is the cleanest archetype separator; this research shows the intuition is correct and measurable. That's worth citing directly on Chapter IV.

Paper 6 goes further and introduces a lens the framework doesn't have: the **worst-case scenario** — not how much you run on average, but **how hard your single hardest minute is, and how often you get near it** (they measure how frequently a player exceeds 85% of their own peak). This is a *repeatability* concept. It maps onto exactly the thing Chapter IV is trying to read: not "can you run," but "can you produce a near-maximal effort *again*, late, when you're empty." You can't measure a player's worst-case minute from a phone — but the concept is the rationale for recommending a **repeated-sprint field test** in §7, which is the closest self-reportable proxy that exists.

### 5.3 Event data beats positional data in practice — the one that exposes a gap

This is the most useful finding in the entire set, and it's from Herold et al. (2021). Surveying 145 practitioners across 42 countries — explicitly including youth academy level — they found that **83% use event data while only 52% use positional (GPS/tracking) data**, and they validated a set of **twelve attacking KPIs**.

Why this matters so much for us: **event data is precisely what film gives you, and positional data is precisely what we can't collect.** The thing the field values most is the thing our app *can* reach, and the thing we can't reach is the thing practitioners use less. The research is, unintentionally, telling us our constraint is not the disadvantage it looks like. It also means there's a validated, field-endorsed vocabulary of countable attacking actions we should be extracting from film — and right now the app has no systematic layer for that. That's the gap. Section 8 fills it.

---

## 6. The two gaps this review exposes in the app

1. **No film-derived event-KPI layer.** The archetype cards mention outputs (crosses, combinations, take-ons) as prose, but there's no defined set of countable, film-visible events per archetype. Paper 7 says this is exactly what practitioners use. *Fixable — Section 8.*
2. **No physical-readiness overlay.** The framework says, repeatedly, that physical qualities separate these archetypes (the Renegade's lungs above all), but the app has no way for a player to find out where *they* stand physically. We can't measure it in person — but we can let them self-report a standard field test and map it to their archetype's demands. This is the exact enhancement you flagged. *Fixable — Section 7.*

Both are **Phase 2 enhancements** in the build order from the v2 handoff — they enrich the development plan after the reveal, and neither belongs in the first Design build.

---

## 7. Recommendation A — the optional self-report performance-testing layer

This is the thing you asked about directly: *"we can add some self-reporting data derived from in-person performance testing (optional, to enhance the results output)."* The research is what tells us **which** tests are worth asking for, because it tells us which physical qualities actually define this position.

### 7.1 The design principle that keeps it honest

Three rules, and they're not optional:

- **Testing never changes the archetype.** Identity comes from the questionnaire. This mirrors the Formation module's own core rule — *who you are is stable; the physical overlay is context.* A Renegade with poor endurance is still a Renegade; he's a Renegade with a named, measured gap. Letting a fitness score reclassify someone would be both wrong and demoralising.
- **It is an overlay on the *development plan*, not a *score*.** It answers "where do I stand against what my archetype demands, and what do I train?" — not "how good am I."
- **No invented composite number.** The literature is explicit that no single fitness metric predicts on-pitch performance (the VO₂max/InStat finding in §3). So we do **not** compute a precise "readiness: 73." We show each tested quality against age norms where they exist, and we headline the *one* quality the player's archetype lives or dies on. This is consistent with the v2 handoff's rule against fake-precise readiness numbers.

And a data-quality caveat to surface in the UI: these are **self-administered, unsupervised** results. Treat them as directional, show ranges rather than false precision, and never present a self-timed sprint as if it were laboratory-accurate.

### 7.2 The field-test battery — mapped to the qualities the research identifies

Every test here is well-established, self-administrable with a phone plus cones (or a measured distance), and maps to a quality the papers above flagged for wide players. Keep the **core** short; the **extended** set is genuinely optional.

**Core battery (3 tests):**

| Test | Measures | Why the research points here | Which archetypes it most illuminates |
|---|---|---|---|
| **Yo-Yo Intermittent Recovery Test, Level 1** | Intermittent high-intensity-running endurance (score = metres completed) | Papers 1–5 all identify sustained high-intensity running as *the* defining physical demand of the wide role; has published youth norms | **Renegade** (this is the make-or-break edge) and **Engine** (his signature) |
| **Repeated-Sprint Ability** (e.g. 6–7 × 30 m, ~25 s recovery) | Best sprint, mean sprint, and **% decrement (fatigue index)** | Direct proxy for the worst-case-scenario/repeatability lens (paper 6) and the end-of-match decline (papers 2–3) — the fatigue index *is* the number Chapter IV is trying to read | **Renegade**, **Engine**, **Sentinel** — the three fatigue separates |
| **10 m / 30 m linear sprint** | Acceleration (0–10 m) and near-max velocity (final 10 m) | Sprint capacity is the third latent component in paper 5 and a wide-player strength; acceleration is the Renegade's calling card | **Renegade** (acceleration), **Deliverer**/**Sentinel** as context |

**Extended battery (optional):**

| Test | Measures | Maps to |
|---|---|---|
| **505 change-of-direction test** | Deceleration + 180° turn speed | The Sentinel's signature (the framework credits him "elite deceleration and change of direction") |
| **Countermovement jump** (phone flight-time apps exist) | Lower-limb explosive power | Acceleration/explosiveness — a supporting read for the Renegade |

### 7.3 What the overlay outputs, per archetype

The overlay is archetype-aware. It headlines the quality that archetype most depends on, and it deliberately *de-emphasises* physical testing for the archetype the research says doesn't need it:

- **Renegade →** endurance is the headline, full stop. The Yo-Yo and the RSA fatigue index are shown first and largest. This operationalises the framework's single most important developmental message ("the Renegade who builds an Engine's lungs becomes one of the best players in the world") — turning a slogan into a number and a target.
- **Engine →** the overlay confirms his signature (endurance) and then points at the *edge* the card already names: acquiring one elite weapon. His physical tests should read strong; the development steer is technical.
- **Sentinel →** change-of-direction and repeated-effort discipline lead; the edge remains attacking output.
- **Weaver →** physical tests are shown but explicitly framed as *not* his separator — his edge is end product and his game is cognitive/technical. Honest, and on-brand.
- **Deliverer →** the overlay should say the quiet part out loud: *his weapon doesn't age and isn't a fitness test.* Physical results are informational; his development is crossing volume and the 1v1. Under-weighting his physical tests is the correct, evidence-consistent choice.

This is the enhancement doing real work: the *same* self-reported numbers mean different things depending on who you are, and the overlay reflects that instead of ranking everyone on one fitness ladder.

---

## 8. Recommendation B — the film-derived event-KPI layer

Paper 7's finding (83% use event data) is the mandate for this. Film gives you countable events; here is the archetype-specific set to extract, each one visible on video and each one an expression of that archetype's identity. This formalises the prose already on the result cards into a defined KPI layer.

| Archetype | Film-visible KPIs to extract | The card metric it operationalises |
|---|---|---|
| **Engine** | Tracking/recovery runs completed; box arrivals in attack; **both-ends actions in a single possession** | "Track every run AND get in the box — count both" |
| **Deliverer** | Crosses attempted/completed; **deliveries reaching the danger zone**; switches of play; set-piece deliveries | "Count how many deliveries actually reached the danger zone" |
| **Sentinel** | 1v1 defensive duels won; interceptions; tackles; **the opponent's suppressed touches on your flank** | "Look at *his* stat line, not yours" |
| **Weaver** | Combinations/one-twos with the full-back; half-space receptions; progressive passes received | "Count your combinations with him — 8 good, 15 elite" |
| **Renegade** | Take-ons attempted/completed; dribbles past a man — **paired with** tracking-back and recovery actions (to verify the bargain) | "Do the defensive job for 90, *and then* take him on" |

### 8.1 The honest phasing of "film analysis"

"Film analysis is possible" is true, but *automatic* event extraction from a wide-angle phone video of a youth match is a hard computer-vision problem, and promising it in v1 would repeat the over-reach the v2 handoff warns against. So phase it:

- **Phase 2 (manual/assisted):** the player or a coach **tags** these events while watching the upload, or enters counts afterward. The app's job is to give them the right archetype-specific checklist (the table above) and turn the tags into the overlay. This is buildable and immediately useful.
- **Phase 3 (automated):** computer-vision event detection, once you have infrastructure and a labelled dataset — and the adjacent clustering paper in §3 shows the modelling end is viable when the data exists.

The event data serves the *development plan and readiness overlay*, exactly like the field tests — it does not reclassify the player.

---

## 9. How this fits the build you're about to start

Nothing here changes Phase 1. The first Claude Design build remains the stateless questionnaire → reveal → result card → first step. This document adds two **Phase 2** enhancements and one **Phase 3** note:

| Phase | Addition from this review |
|---|---|
| **1 — The Reveal** *(building now)* | No change. Optionally, attach the paper 1–4 citations to any physical claims shown. |
| **2 — The Plan** | The **self-report testing overlay** (§7) and the **manual/assisted film event-KPI layer** (§8), both feeding the development plan and a qualitative readiness view — never the archetype. |
| **3 — The Intelligence** | Represent the Formation module's physical vectors using the empirical **three-component** structure (§5.1); build **automated** film event-detection (§8.1); the clustering paper (§3) is a methodology reference for the auto-classifier. |

---

## 10. What *not* to do (the honest limits)

- **Don't imply the app measures GPS metrics.** It doesn't and can't. Every "distance covered / sprint / acceleration" number in the literature is stadium data. If the app ever shows such a number, it must be clearly a self-reported field-test result, not a claim of tracking.
- **Don't let a fitness score reclassify a player.** Identity is from the questionnaire. The research (VO₂max/InStat) actively warns against treating fitness as a proxy for quality.
- **Don't compute a single composite "readiness" number with invented weights.** Same discipline as the v2 handoff §9.2 and the Formation module caution — show component reads against norms, headline the archetype's key quality, and wait for real cohort data before any weighted index.
- **Don't over-promise automated film analysis in early phases.** Manual/assisted tagging first; computer vision when the infrastructure and labelled data exist.

---

## 11. Bottom line

**Do these papers cover anything you don't have?** On the physical demands of the position — **no.** They confirm the framework, often word-for-word, and their real gift is a citation spine for a Research Institute that currently cites nothing. Genuinely new are only two things: the **worst-case-scenario / repeatability lens** (which strengthens the fatigue chapter and justifies a repeated-sprint field test), and the finding that **practitioners rely on event data over positional data** — which, happily, points straight at the one input channel we actually own.

That last finding reframes your whole constraint. You can't be in the stadium, so you can't collect the GPS data these papers are built on. But the field's most-used data is **event data from film**, and your optional-testing idea covers the physical side that film can't see. Between uploaded film (event KPIs) and optional self-reported field tests (physical readiness), the app can assemble a genuinely useful picture of a young wide player — without ever owning a single GPS pod. The two recommendations in §7 and §8 are how you turn that into product.

---

## References

1. Mallo J, Mena E, Nevado F, Paredes V. *Physical Demands of Top-Class Soccer Friendly Matches in Relation to a Playing Position Using GPS Technology.* J Hum Kinet. 2015;47:179–188. https://pmc.ncbi.nlm.nih.gov/articles/PMC4633253/
2. Pettersen SA, Brenn T. *Activity Profiles by Position in Youth Elite Soccer Players in Official Matches.* Sports Med Int Open. 2019;3(1):E19–E24. https://pubmed.ncbi.nlm.nih.gov/31143839/
3. Borghi S, Colombo D, La Torre A, Banfi G, Bonato M, Vitale JA. *Differences in GPS variables according to playing formations and playing positions in U19 male soccer players.* Res Sports Med. 2020. https://pubmed.ncbi.nlm.nih.gov/32880481/
4. Bortnik L, et al. *Physical match demands across different playing positions during transitional play and high-pressure activities in elite soccer.* Biol Sport. 2024;41(2):73–82. https://pmc.ncbi.nlm.nih.gov/articles/PMC10955741/
5. Plakias S, Tsaopoulos D, Tsatalas T, Giakas G. *Uncovering the Latent Components of Physical Performance in Professional Soccer: Evidence from the Turkish First Division.* J Funct Morphol Kinesiol. 2025;10(4):434. https://pmc.ncbi.nlm.nih.gov/articles/PMC12641997/
6. Lobo-Triviño D, et al. *Analyzing Positional and Temporal Variations in Worst-Case Scenario Demands in Professional Spanish Soccer.* J Funct Morphol Kinesiol. 2025;10(2):172. https://pmc.ncbi.nlm.nih.gov/articles/PMC12101334/
7. Herold M, Kempe M, Bauer P, Meyer T. *Attacking Key Performance Indicators in Soccer: Current Practice and Perceptions from the Elite to Youth Academy Level.* J Sports Sci Med. 2021;20(1):158–169. https://doi.org/10.52082/jssm.2021.158
8. *Performance Indicators in Football.* Sport Performance Analysis (2018), drawing on Hughes MD et al., *Moneyball and soccer.* https://www.sportperformanceanalysis.com/article/performance-indicators-in-football
9. *8v8 Soccer Positions Explained — Wings / Outside Midfielder* (2016, coaching article).

*Adjacent (not on the original list): Plakias et al., data-driven midfielder role clustering (K-means + PCA); and the aerobic-fitness vs. InStat performance-index study — cited in §3 as a methodology reference and a caution, respectively.*
