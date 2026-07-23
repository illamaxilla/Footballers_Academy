# Addendum A — Evidence Base Review
## Full Back / Wing Back Position Build Handoff v1.0

**Date:** July 19, 2026 · **Scope:** nine positional-analysis papers assessed against the Codex and against app-only constraints
**Constraint assumed:** we cannot be physically present. All data reaches us through (a) film a player or parent can watch, (b) self-report, (c) self-reported results from tests run by someone else, or (d) imported club data.

---

## 0. Headline

**Yes — four genuine gaps, three corrections, and one product unlock.**

The most useful finding isn't a number. It's that the Euro 2024 paper publishes per-match **event counts** — crosses, tackles, recoveries, touches, solo runs — for full backs and wing backs separately. Those are countable by a human watching video. That turns Tier 2 from "we need field tests and a benchmark table we don't have" into "a player can tally twelve numbers while watching their own match back."

No upload. No GPS. No lab. And it sidesteps most of the video-of-minors compliance load that pushed video to V4 in the main handoff (§13).

---

## 1. Verdict per paper

| # | Paper | Verdict | Usable in-app? |
|---|---|---|---|
| 1 | Euro 2024 reference values, 13 positional roles (Chen, Zmijewski & Bradley, *Biol Sport* 2025) | **New — the most valuable of the nine** | ✅ Directly. Event data + peak 1-min values |
| 2 | Formation, ball-in-play & possession on peak demands (2021) | New (peak-period framing) | ⚠️ Context only; needs GPS |
| 3 | Peak kinematic & mechanical demands by position (Yousefian et al., *RQES* 2025) | **New — mechanical MDP** | ⚠️ Informs training design, not measurement |
| 4 | Transition games vs official matches, young pros (Asian-Clemente et al., *J Hum Kinet* 2024) | New — and a warning | ✅ Drill design in the development plan |
| 5 | Transitional play demands (Bortnik et al., *Biol Sport* 2024) | Partly covered — Codex cites this finding already | ⚠️ Reinforces existing content |
| 6 | Positional & temporal peak running demands (2023) | Overlaps #1 and #3 | ❌ Redundant given #1 |
| 7 | Body composition by position (Bongiovanni et al., *JFMK* 2023) | **Corrects the Codex** | ❌ Requires BIA. Keep out of the player app |
| 8 | Macronutrient intake by position (2012) | Marginal | ❌ Don't build on it |
| 9 | Attention by position (*Sci Med Footb* 2022) | **Contradicts the Codex** | ⚠️ Forces a rewrite of the cognitive profile |

Papers 5 and 6 are largely already reflected in `Full-Back-Part-I-Comp.md`, which cites the transitional-sprint finding and the three-at-the-back formation effect. Papers 1, 3, 4, 7 and 9 add something the Codex does not have.

---

## 2. The four genuine gaps

### 2.1 The Codex has no peak-demand layer at all

This is the biggest one, and it's conceptual rather than numerical.

Every physical claim in the Codex is a **match total or a lab maximum**: 11–13 km per match, VO₂max 62–70, Yo-Yo IR2 level, lactate threshold, 10 × 40 m repeated sprints. Sports science largely moved past that framing a decade ago, because match averages systematically under-prepare players for the hardest minute of the game. The current standard is the **most demanding passage** (MDP) — a rolling-average window, usually 1, 3 or 5 minutes, capturing the worst-case period.

Published peak 1-minute high-intensity running, Euro 2024:

| Role | Peak 1-min HIR (m) |
|---|---|
| **Wing back (back three)** | **74.4 ± 22.0** |
| **Full back (back four)** | **69.0 ± 24.0** |
| Attacking midfielder | 63.2 ± 14.7 |
| Central midfielder | 62.4 ± 15.1 |
| Defensive midfielder | 61.3 ± 22.7 |
| Wide midfielder | 61.0 ± 16.7 |
| Forward pair | 58.5 ± 22.9 |
| Outside CB (back three) | 58.1 ± 22.4 |
| Wide forward | 57.0 ± 13.4 |
| Lone forward | 54.8 ± 13.0 |
| Middle CB (back three) | 54.1 ± 16.1 |
| Single pivot | 52.8 ± 20.5 |
| Centre back (back four) | 50.8 ± 17.4 |

Wide defenders top the table, and the gap to a back-four centre back is large. Earlier work in Spanish football put full-back peak-minute HSR at roughly 47 m·min⁻¹, so the finding replicates across competitions even where absolute values shift with tracking system.

**What the composition studies add.** The peak kinematic window breaks down as roughly 60% moderate-speed running, 30% high-speed running, 14% sprinting. The peak *mechanical* window is roughly **35% accelerations and 65% decelerations** — braking dominates. The Codex prescribes eccentric and deceleration work for Warriors and Sentinels but never quantifies why; this does. Decelerating is most of the mechanical cost of playing this position.

**Why it matters commercially:** peak 1-min values align with speed-endurance work durations, which is exactly the kind of thing an academy fitness coach can act on. It's a more credible hook than VO₂max, because they can actually measure it.

### 2.2 Full back and wing back are measurably different positions

The Codex treats "Full Back / Wing Back" as one position with four archetypes inside it. The Euro 2024 data separates them — full backs in a back four (n = 92) versus wing backs in a back three (n = 31) — and the split holds up:

| Metric (per 90) | Full back | Wing back |
|---|---|---|
| Peak 1-min HIR | 69.0 ± 24.0 m | 74.4 ± 22.0 m |
| In the high-volume/high-intensity quadrant | 47.3% | **71.4%** |
| Total passes | 48.3 ± 19.4 | 36.5 ± 12.2 |
| Pass completion | 86.8 ± 8.2% | 78.5 ± 10.1% |
| Total touches | 106.5 ± 36.7 | 85.5 ± 23.0 |
| Crosses | 2.2 ± 2.2 | 2.7 ± 2.9 |
| Dribbles | 1.0 ± 1.4 | 1.5 ± 1.6 |
| Ball recoveries | 4.9 ± 2.3 | 3.7 ± 2.4 |
| Tackles | 1.3 ± 1.4 | 1.5 ± 1.4 |

A wing back is a higher-intensity, lower-possession, more direct role. A full back touches the ball more and passes more accurately. Same archetype, different job.

**Product consequence:** add a `system` field to the `Player` model — back four, back three, or varies. It's one enum now and a schema migration later. It changes which reference set a demonstrated archetype is compared against, and it's a question a 15-year-old can answer accurately.

> **Data model change to main handoff §6.2:**
> ```ts
> interface Player {
>   // ...existing fields
>   defensiveSystem: 'back_four' | 'back_three' | 'varies';
> }
> ```

### 2.3 The quadrant method — a published classification visual

The Euro paper plots total distance against high-intensity distance with crosshairs at the all-position mean, producing four quadrants, then reports what percentage of each position's observations fall in each. Wing backs sit in the upper-right (high volume, high intensity) 71.4% of the time; full backs 47.3%.

This is a peer-reviewed way of showing "what kind of player are you" as a position on a plane rather than a label — and it's trivially buildable as a chart.

**But be careful about the mapping.** Volume × intensity is not the archetype system. Testing the fit honestly:

| Archetype | Attacking output | Defensive output | Possession involvement |
|---|---|---|---|
| Warrior | High | High | Medium |
| Winger | High | Low | Low |
| Sentinel | Low | High | Low |
| Architect | Low | Medium | **High** |

Warrior, Winger and Sentinel separate cleanly on two axes. **Architect does not** — it's defined by touches, pass volume and completion, which is a third dimension. That's a real structural finding about your own model: the four archetypes are three-dimensional, not two-dimensional. Build the plot with a third axis (dot size or a toggle), or the Architect will collapse into the Sentinel corner.

### 2.4 Variability is much larger than the Codex acknowledges

Intra-positional coefficients of variation at Euro 2024:

| Metric | CV |
|---|---|
| Total distance | ~5–10% |
| High-intensity distance | ~20–40% |
| Sprint distance | ~30–70% |

And in the event data, standard deviation frequently equals or exceeds the mean — full-back crosses 2.2 ± 2.2, tackles 1.3 ± 1.4, aerial duels 0.8 ± 1.0.

**This is a governance rule for the app, not a footnote.** A single match tells you almost nothing about a player's sprint output or tackle count. If the app shows "you made 1 tackle — below the reference of 1.3" it is displaying noise as if it were signal, and a young player will believe it.

> **Rule for the main handoff §7:** no demonstrated-archetype output from fewer than **four logged matches**. Display rolling means with a range, never a single-match point value. For any metric where SD ≥ mean, require six matches or suppress the comparison entirely.

Notably, wide defenders had *less* variation in high-intensity and sprint distance (CV 19.6–24.6% and 29.9–43.2%) than centre backs and defensive midfielders. The full back's output is more consistent than most positions — which happens to be a genuinely good marketing line, and it's true.

---

## 3. Three corrections to the Codex

### 3.1 Fullbacks lead intensity, not volume

`Full_Back_Wing_Back_Archetype_System__Complete_Profiling_Framework.md` describes the Warrior's distance coverage as ELITE and "team leader," 11–13+ km.

Euro 2024: central and defensive midfielders covered the most total distance (~11.4–11.9 km); centre backs the least (~9.7–10.1 km). Full backs and wing backs led **high-intensity running, sprint distance, peak 1-min HIR, and top speed** — not total distance.

Your own `Full-Back-Part-I-Comp.md` gets this right (11–13 km *including* 800–1200 m HSR and 200–400 m sprinting). The archetype framework overstates it into a claim the evidence doesn't support.

**Correction:** the full back is not the team's biggest runner. They are the team's most *intense* runner. That's a stronger claim anyway, and it's defensible.

**Bonus finding worth using:** full backs and wing backs produced six of the top ten sprint speeds at the entire tournament (34.8–35.7 km·h⁻¹). The Codex frames this position as endurance-first. The evidence says endurance *and* top-end speed — which reframes the Warrior as an outlier athlete rather than a workhorse.

### 3.2 The cognitive profile is contradicted

This is the uncomfortable one and it's the reason the reading list was worth doing.

The Codex asserts, across the Warrior, Winger and Architect profiles: scanning frequency VERY GOOD to ELITE, 8–14 scans per sequence, decision-making under pressure VERY GOOD, "never stops reading the game."

The 2022 attention study (66 Brazilian first-division professionals, 15 of them fullbacks, measured on a continuous-performance attention system) found the opposite direction: **fullbacks were less attentive than centre backs, defensive midfielders, attacking midfielders and forwards, and sustained impulsive behaviour longer than centre backs and defensive midfielders.** The authors' interpretation is that hybrid attack-and-defend roles — fullbacks and attacking midfielders — pattern differently from specialised defensive roles.

**How much weight to give it.** Not overwhelming: n = 15 fullbacks, one league, and the instrument is a lab-based sustained-attention task rather than football scanning. Sustained vigilance in a monotonous computer test is arguably a different construct from reading a game. It is, however, the only empirical positional data on the point, and it points away from the Codex.

**The honest reframe, which is also more interesting:** a role that demands constant attack-defend switching may *select for* an action-oriented, lower-inhibition profile rather than a patient vigilant one. That's a coherent psychological story, it's consistent with archetype thinking, and it distinguishes the Sentinel (defensive, patient) from the Winger (impulsive, forward-driven) in a way the current all-ELITE ratings cannot.

**Action:** the cognitive sections currently rate nearly every archetype VERY GOOD or ELITE on nearly every dimension. That's not a profile, it's a compliment. Rewrite them with genuine trade-offs, and cite this study for the fullback-versus-specialist contrast.

### 3.3 Body composition targets are asserted, not sourced — and shouldn't be in the app

The Codex states archetype-specific body fat: Warrior 6–9%, Winger 6–10%, Sentinel 8–12%, Architect 7–11%, described as ideal.

The 2023 Serie A/B study (506 professionals, 73 fullbacks, bioelectrical impedance) is the actual normative evidence. It finds fullbacks lighter and less muscular than centre backs, goalkeepers and central forwards, with defensive-line players generally higher on anthropometric measures than middle and offensive lines. It does not validate the Codex's specific percentages, which appear to be asserted.

Two separate issues:

1. **Sourcing.** Fix the coach-facing documentation with real cited values. Note that BIA is not a criterion method and the sample is adult, white, male, professional Italian — so the numbers are a reference point, not a target.
2. **Safety.** These figures must not enter the player app. Main handoff §13.3 rule 3 already says no body composition for minors, and this study changes nothing about that. Prescribing single-digit body fat to a fifteen-year-old is the kind of thing that ends a youth product. Keep it in the professional tier or drop it.

---

## 4. Reference tables for the build

Senior international men, 90 minutes plus added time, Euro 2024. **Not youth values — see §6.**

### 4.1 Film-tallyable event reference (per 90)

| Metric | Full back (back four) | Wing back (back three) | Tally difficulty |
|---|---|---|---|
| Total passes | 48.3 ± 19.4 | 36.5 ± 12.2 | Hard — high count |
| Pass completion % | 86.8 ± 8.2 | 78.5 ± 10.1 | Hard |
| Forward passes | 15.6 ± 6.9 | 13.0 ± 6.1 | Medium |
| **Crosses** | **2.2 ± 2.2** | **2.7 ± 2.9** | **Easy** |
| **Dribbles** | **1.0 ± 1.4** | **1.5 ± 1.6** | **Easy** |
| Total touches | 106.5 ± 36.7 | 85.5 ± 23.0 | Hard |
| One-touch plays | 10.9 ± 4.6 | 10.4 ± 4.4 | Medium |
| **Shots** | **0.4 ± 0.7** | **0.4 ± 0.7** | **Easy** |
| **Solo runs, attacking third** | **1.6 ± 1.5** | **1.4 ± 1.2** | **Easy** |
| **Solo runs, key play area** | **0.9 ± 1.2** | **0.6 ± 0.8** | **Medium** |
| **Solo runs, penalty area** | **0.3 ± 0.6** | **0.3 ± 0.7** | **Easy** |
| **Ball recoveries** | **4.9 ± 2.3** | **3.7 ± 2.4** | **Easy** |
| **Tackles** | **1.3 ± 1.4** | **1.5 ± 1.4** | **Easy** |
| **Aerial duels** | **0.8 ± 1.0** | **1.0 ± 1.1** | **Easy** |

The nine bolded rows are the V3 tally set — low counts, unambiguous events, countable by a teenager on a second viewing. Passes, touches and completion percentage are left out of the manual tally: too many events to count reliably, and the error would swamp the signal.

### 4.2 GPS import reference (Tier 3)

| Metric | Full back | Wing back | Notes |
|---|---|---|---|
| Peak 1-min HIR | 69.0 ± 24.0 m | 74.4 ± 22.0 m | ≥20 km·h⁻¹, rolling average |
| Top speed | Among tournament's highest | Among tournament's highest | 6 of the top 10 speeds were FB/WB, 34.8–35.7 km·h⁻¹ |
| Total distance | Mid-table for the team | Mid-table for the team | CM/DM lead at ~11.4–11.9 km |
| Second-half sprint output | Maintained or increased | Maintained or increased | Both roles bucked the general decline |

That last row deserves emphasis: most positions declined in second-half total distance, and full backs and wing backs did **not** decline in sprinting — both nominally increased. Wing backs were one of only three roles with no second-half drop in total distance at all. This is the first real-world evidence for the Codex's central "endurance supremacy" thesis, and it's worth far more than the synthetic validation currently backing that claim.

---

## 5. What this changes in the build

### 5.1 New Tier 2 — the match tally (replaces "field tests only")

Main handoff §7 defined Tier 2 as field tests requiring a benchmark table you don't have. The event data gives a better Tier 2 that ships sooner.

**The feature:** after a match, the player opens a tally screen and counts nine events while watching the game back on their phone — or a parent counts live. Nine tap-counters, no upload, no storage of footage, no moderation, no safeguarding review.

```
┌──────────────────────────────────────┐
│  MATCH TALLY                         │
│  vs Riverside · 19 July · 70 min     │
│                                      │
│  ATTACKING                           │
│  Crosses                    [–] 3 [+]│
│  Dribbles past a player     [–] 1 [+]│
│  Runs into the final third  [–] 2 [+]│
│  Runs into the box          [–] 0 [+]│
│  Shots                      [–] 0 [+]│
│                                      │
│  DEFENDING                           │
│  Ball recoveries            [–] 6 [+]│
│  Tackles won                [–] 2 [+]│
│  Aerial duels               [–] 1 [+]│
│  Beaten 1v1                 [–] 1 [+]│
│                                      │
│  ◉◉○  4 of 4 matches logged          │
│  Your demonstrated profile is ready. │
└──────────────────────────────────────┘
```

`Beaten 1v1` is not in the Euro dataset — no reference value exists — but it's the single most meaningful defensive event for this position and it's unambiguous to count. Track it as a personal trend only, with no benchmark comparison. Honest, and still useful.

**Normalise everything per 90 minutes** before comparison, since youth matches run 60–80 minutes:

```
per90 = (count / minutesPlayed) * 90
```

**Demonstrated archetype from the tally:**

```
attackScore  = z(crosses) + z(dribbles) + z(finalThirdRuns) + z(boxRuns)
defendScore  = z(recoveries) + z(tackles) + z(aerialDuels)
involvement  = z(touchProxy)          // Tier 3 only, needs real touch data

WARRIOR   → attackScore high, defendScore high
WINGER    → attackScore high, defendScore low
SENTINEL  → attackScore low,  defendScore high
ARCHITECT → requires involvement axis — cannot be identified from the tally alone
```

**State that limitation in the UI.** The tally can demonstrate three of the four archetypes. The Architect needs possession volume, which needs Tier 3 data. A player whose declared archetype is Architect should be told plainly: *your profile needs match data we can't count by eye — your tier stays at Declared until your club can share touch and pass data.* That's better than guessing, and it makes the Tier 3 club integration something players ask their coaches for.

### 5.2 New field test — the peak minute

Since MDP is the gap and the reference value is published, build the test that mirrors it. A stopwatch, two cones and 60 seconds.

**The Peak Minute:** cones 20 m apart, one minute, count shuttles at maximum sustainable effort, convert to metres. Compare to the player's own previous attempts. Adult full-back peak-minute *high-intensity* distance is ~69 m within a much larger total, so the raw number is not comparable — this measures the same *quality*, not the same value. Frame it as a personal benchmark, and say so.

This gives you a position-specific field test that no competitor has, derived from current literature, requiring equipment any player already owns.

### 5.3 Development plan changes

Two evidence-based adjustments to main handoff §5:

1. **Weight deceleration higher across all four plans.** Braking is ~65% of the mechanical peak. The Codex treats it as a Sentinel and Warrior concern; it's a full-back concern.
2. **Small-sided and transition games do not deliver position-specific loading.** The young-professionals study found transition games exceeded official match loads *and homogenised them across positions* — everyone gets a similar stimulus regardless of role. If a session's aim is position-specific, it needs isolated or patterned work, not a generic transition game. Worth stating explicitly in the plan, because "just play small-sided games" is the default advice everywhere and it's wrong for this purpose. (The same study did find full backs performing more high-intensity decelerations than central midfielders in those games — consistent with point 1.)

### 5.4 Readiness

No change. None of these papers measure anything a phone can capture daily. Main handoff §8 stands.

---

## 6. What's missing from this reading list

The nine papers are all **senior elite men**. The Tier 2 blocker identified in the main handoff — age-scaled benchmarks — is not solved by any of them. Comparing a 15-year-old to Euro 2024 remains wrong.

Four things to add:

1. **Youth reference values.** Directly relevant and not on the list:
   - *Assessing External Peak Physical Demands in Under-19 and Professional Male Football* (2025) — compares U19 to senior peak demands by position and finds surprisingly few significant differences, which is important: U19 peak demands may be closer to professional than the Codex's youth pathway assumes.
   - *Who Runs the Most? Positional Demands in a 4-3-3 Formation Among Elite Youth Footballers* (2025) — U19 GPS across 26 matches; side defenders top sprint distance, HSR and sprint frequency.
   - *Relative intensities and compositions of multifactorial peak kinematic and mechanical MDP in elite youth soccer* — youth MDP composition.

2. **Maturation, not chronological age.** Nothing here addresses peak height velocity. Two 14-year-olds can be four years apart biologically, and a benchmark table keyed to birth date will systematically mislabel early and late developers. This is the actual research task, and it's separate from finding youth reference values.

3. **The women's game.** You have a women's adaptation document and zero women's papers on this list. The Spanish women's national team comparison across U17, U20 and senior World Cups (GPS, positional, by age category) is the closest analogue to what you need.

4. **Ju et al. (2023), contextualised high-intensity running by specialised tactical role** (*Biol Sport* 40:291–301). This is the English Premier League work that first separated full backs from wing backs and is cited throughout the Euro 2024 paper. Arguably more foundational to your position than several papers on the list.

---

## 7. Recommended actions, in order

| # | Action | Effort | Why now |
|---|---|---|---|
| 1 | Add `defensiveSystem` to the `Player` model | Minutes | Free now, schema migration later |
| 2 | Add the four-match minimum and range-display rule to §7 | Minutes | Prevents shipping noise as insight |
| 3 | Spec the match tally as the new Tier 2 | Days | Unlocks demonstrated archetype without video, GPS or benchmarks |
| 4 | Correct the three Codex claims (§3 above) | ~Half a day | Each is a credibility risk with a knowledgeable buyer |
| 5 | Add an MDP layer to the coach-facing documentation | Days | Biggest conceptual gap; published values exist |
| 6 | Commission the youth + maturation research (§6) | Weeks | Still the blocker on any youth benchmark |

Item 4 is the one I'd not delay. An academy head of performance will know that midfielders cover more ground than full backs, and will know the peak-period literature. A single overstated claim in the first meeting costs more than it saves.

---

## 8. Sources

1. Chen S, Zmijewski P, Bradley PS. Establishing reference values for the match running performances of thirteen specific positional roles at UEFA Euro 2024. *Biology of Sport*. 2025;42(3):257–268. doi:10.5114/biolsport.2025.148535 (open access, CC BY)
2. Yousefian F, Zafar A, Fransson D, Brito J, Travassos B. Peak kinematic and mechanical demands according to playing positions in professional male soccer. *Research Quarterly for Exercise and Sport*. 2025;96(3):475–485.
3. Asian-Clemente JA, Rabano-Muñoz A, Suarez-Arrones L, Requena B. Analysis of differences in running demands between official matches and transition games of young professional soccer players according to the playing position. *Journal of Human Kinetics*. 2024;92:121–131.
4. Bortnik L, Bruce-Low S, Burger J, et al. Physical match demands across different playing positions during transitional play and high-pressure activities in elite soccer. *Biology of Sport*. 2024;41(2):73–82.
5. Bongiovanni T, Rossi A, Genovesi F, et al. How do football playing positions differ in body composition? A first insight into white Italian Serie A and Serie B players. *Journal of Functional Morphology and Kinesiology*. 2023;8(2):80.
6. Professional football players from defensive playing positions are more attentive and less impulsive. *Science and Medicine in Football*. 2022;6(4).
7. Martín-García A, Casamichana D, Díaz AG, Cos F, Gabbett TJ. Positional differences in the most demanding passages of play in football competition. *Journal of Sports Science and Medicine*. 2018;17:563–570.
8. Ju W, Doran D, Hawkins R, Evans M, Laws A, Bradley PS. Contextualised high-intensity running profiles of elite football players with reference to general and specialised tactical roles. *Biology of Sport*. 2023;40:291–301. — *recommended addition*
9. Forcher L, Forcher L, Jekauc D, et al. Center backs work hardest when playing in a back three. *PLoS One*. 2022;17:e0265501. — *context for the FB/WB split*

---

**End of Addendum A.** Amends main handoff §5, §6.2, §7. §8 unchanged.
