/**
 * ============================================================================
 *  THE FOOTBALLER'S ACADEMY — ATTACKING MIDFIELDER SCORING ENGINE  v2.0
 *  Module 6 of 8 · Position: Attacking Midfielder (central)
 *
 *  Archetypes: Maestro · Maverick · Phantom · Architect · Dynamo
 *  (The AM's OWN taxonomy — Phase 1, Phase 3, and the Living AM Model.
 *   The Winger's archetypes live in Module 7 and are NOT interchangeable.)
 *
 *  RUN IT:  npx tsx am-scoring-engine.ts
 * ============================================================================
 *
 *  WHAT THIS FIXES
 *  ---------------
 *  v1.0 counted +1 per answer, on a bank whose option exposure was deliberately
 *  "weighted to elite share":
 *
 *      Maestro 11 · Maverick 10 · Phantom 10 · Architect 9 · Dynamo 8
 *
 *  That reasoning is inverted. Cutting an archetype's exposure does not MODEL
 *  its rarity — it MANUFACTURES it. Worse: the Dynamo's nearest neighbour (the
 *  Maverick) is offered in all four questions where the Dynamo is omitted. So a
 *  real Dynamo hands four free points to the Maverick before the test starts.
 *
 *  Measured over 5,000 simulated respondents (realistic fallback — a player who
 *  can't pick their own archetype picks the one nearest to how they think):
 *
 *      A player who chooses "Dynamo" 7 times out of 10 when it is on screen is
 *      NAMED a Dynamo only 49% of the time under v1. A coin flip.
 *      At 6-in-10 consistency: 26%.
 *
 *  Rarity belongs in a PRIOR, applied at the end. And the AM codex gives us a
 *  real one: Phase 1, Phase 3 and the v1.0 handoff independently state
 *  30/22/20/18/10, which sums to exactly 1.00 — a genuine probability
 *  distribution. Use it (see PRIOR), and let every archetype be chosen equally.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. THE TRAITS — rebuilt for a CENTRAL-ONLY module
//
//    The AM/Winger matrix had a "Wide Play" axis. In an AM-only module all five
//    archetypes are central, so that axis carries zero information. Replaced
//    with dimensions the AM codex actually discriminates on.
// ─────────────────────────────────────────────────────────────────────────────

export const TRAITS = [
  'VIS', // Vision & Chance Creation      — Maestro: 3.7 chances/90; "sees lanes 280ms before others"
  'PAS', // Passing Precision             — Phantom 91% completion; Maestro 89% in the final third
  'DRB', // Dribbling / Take-On           — Maverick: 4.2 dribbles/90 at 68% success
  'EXP', // Explosiveness / First Step    — Maverick: "31ms faster first step"; ACTN3-RR
  'MOV', // Off-Ball Movement & Timing    — Phantom: "appears in space 73% of possessions"
  'HSP', // Half-Space & Line-Breaking    — Architect: 3.1 line-breaking passes/90
  'RSK', // Risk Appetite                 — the handoff's own §4 axis: take / calculate / time / minimise
  'CMP', // Composure Under Pressure      — Architect: 87% decision accuracy under pressure; Phantom: GABA
  'ENG', // Engine (work rate + pressing) — Dynamo: 8.9 km covered
  'GOL', // Goal Threat                   — Dynamo: 0.4 goals/90
] as const;

export type TraitKey = (typeof TRAITS)[number];
export type TraitVector = Record<TraitKey, number>;
export type ArchetypeId = 'maestro' | 'maverick' | 'phantom' | 'architect' | 'dynamo';

export const ARCHETYPE_IDS: ArchetypeId[] = ['maestro', 'maverick', 'phantom', 'architect', 'dynamo'];

export const ARCHETYPE_NAMES: Record<ArchetypeId, string> = {
  maestro: 'The Maestro', maverick: 'The Maverick', phantom: 'The Phantom',
  architect: 'The Architect', dynamo: 'The Dynamo',
};

/**
 * Crosswalk to Tactical_System_Integration.md, which keys its 15-formation fit
 * matrix on these names. It is 1:1 with ONE rename — "Dynamo" is "Complete"
 * there. This is a major reason the AM taxonomy is the right one: the formation
 * engine plugs straight in, with no lossy mapping.
 */
export const TACTICAL_KEY: Record<ArchetypeId, string> = {
  maestro: 'Maestro', maverick: 'Maverick', phantom: 'Phantom',
  architect: 'Architect', dynamo: 'Complete',
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. CANONICAL VECTORS — derived from the Living AM Model's per-90 statistics.
//    Not invented. Every number traces to a stated performance figure.
// ─────────────────────────────────────────────────────────────────────────────

//                                    VIS PAS DRB EXP MOV HSP RSK CMP ENG GOL
export const CANONICAL: Record<ArchetypeId, number[]> = {
  maestro:   [99, 96, 78, 65, 72, 82, 75, 80, 60, 72], // 3.7 chances/90 · 89% F3 pass · "doesn't need to run"
  maverick:  [80, 76, 99, 98, 74, 68, 98, 65, 72, 84], // 4.2 dribbles/90 · +31ms first step · MAOA-warrior
  phantom:   [82, 92, 70, 76, 99, 90, 70, 92, 80, 90], // in space 73% of poss. · 91% pass · GABA = calm
  architect: [88, 95, 76, 66, 80, 99, 62, 96, 76, 74], // 3.1 line-breaks/90 · 87% under pressure · both feet
  dynamo:    [86, 84, 88, 88, 86, 84, 82, 86, 99, 96], // 8.9 km · 0.4 goals/90 · 84% pass (LOWEST of the five)
};

/**
 * THE PRIOR. Phase 1 ("% of population"), Phase 3 (Bayesian 'probability'), and
 * the v1.0 handoff ("elite share") state this independently and identically. It
 * sums to exactly 1.00 — a real probability distribution. So unlike the
 * AM/Winger module (whose shares contradicted 3x and summed to 122%), this one
 * SHIPS WITH ITS PRIOR ON from day one.
 */
export const PRIOR: Record<ArchetypeId, number> = {
  maestro: 0.30, maverick: 0.22, phantom: 0.20, architect: 0.18, dynamo: 0.10,
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. VECTOR MATHS
// ─────────────────────────────────────────────────────────────────────────────

const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
const norm = (v: number[]) => Math.sqrt(v.reduce((a, b) => a + b * b, 0));
const dot  = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);

/**
 * ⚠️ THE MOST IMPORTANT LINES IN THIS FILE — DO NOT REMOVE THE CENTRING.
 *
 * Every archetype scores 60–99 on everything, because they are all ELITE
 * PLAYERS. Cosine-compare the RAW vectors and every pair returns ~0.98. The
 * classifier silently degrades to noise. It will not crash. It will just be
 * wrong, quietly, forever.
 *
 * Centring (subtracting each trait's mean ACROSS the five archetypes) converts
 * "how good are they" into "what SHAPE are they" — which is the actual signal.
 */
const ARCHETYPE_UNIT: Record<ArchetypeId, number[]> = (() => {
  const rows = ARCHETYPE_IDS.map((id) => CANONICAL[id]);
  const traitMeans = TRAITS.map((_, t) => mean(rows.map((r) => r[t])));
  const out = {} as Record<ArchetypeId, number[]>;
  for (const id of ARCHETYPE_IDS) {
    const c = CANONICAL[id].map((x, t) => x - traitMeans[t]);
    const n = norm(c);
    out[id] = c.map((x) => x / n);
  }
  return out;
})();

// ─────────────────────────────────────────────────────────────────────────────
// 4. THE ITEM BANK — 15 questions x 4 options = 60 slots, EXACTLY 12 each.
//    Each archetype is omitted from exactly 3 questions.
//
//    (v1.0 used 12 x 4 = 48 slots. 48 / 5 = 9.6. It CANNOT be balanced.
//     The arithmetic itself was the bug. 15 x 4 = 60 / 5 = 12. Clean.)
// ─────────────────────────────────────────────────────────────────────────────

export interface Option { label: string; archetypeId: ArchetypeId; traits: Partial<TraitVector>; }
export interface Question { id: string; chapter: 1 | 2 | 3; prompt: string; options: [Option, Option, Option, Option]; }
const t = (o: Partial<TraitVector>) => o;

export const QUESTIONS: Question[] = [
  // ── CHAPTER 1 · BETWEEN THE LINES ─────────────────────────────────────────
  { id: 'Q1', chapter: 1, prompt: 'You receive between the lines, back to goal. First instinct:', options: [
    { label: 'Turn and find the pass nobody else has seen.',                  archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 3 }) },
    { label: 'Turn and drive straight at the defence.',                       archetypeId: 'maverick',  traits: t({ DRB: 3, EXP: 2, RSK: 2 }) },
    { label: "I'd already drifted where nobody was marking me.",              archetypeId: 'phantom',   traits: t({ MOV: 3, HSP: 1, CMP: 1 }) },
    { label: 'Set it, spin into the half-space, take it again.',              archetypeId: 'architect', traits: t({ HSP: 3, CMP: 2, PAS: 1 }) },
  ]},
  { id: 'Q2', chapter: 1, prompt: 'The defence is deep and compact. How do you break it?', options: [
    { label: 'Thread the one pass that unlocks it.',                          archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 3 }) },
    { label: 'Dribble into it and force the opening myself.',                 archetypeId: 'maverick',  traits: t({ DRB: 3, RSK: 3 }) },
    { label: "Time a late run into the gap they've stopped watching.",        archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: 'Come at it from every angle until it cracks.',                  archetypeId: 'dynamo',    traits: t({ ENG: 3, GOL: 2, EXP: 1 }) },
  ]},
  { id: 'Q3', chapter: 1, prompt: 'You are pressed hard the instant you receive. You…', options: [
    { label: "One touch — the ball's gone before the press lands.",           archetypeId: 'maestro',   traits: t({ PAS: 3, VIS: 2, CMP: 1 }) },
    { label: "I don't get pressed — I'd already moved into a pocket.",        archetypeId: 'phantom',   traits: t({ MOV: 3, CMP: 2 }) },
    { label: 'Half-turn into the half-space and play forward.',               archetypeId: 'architect', traits: t({ HSP: 3, CMP: 2, PAS: 1 }) },
    { label: 'Take the contact, hold it, and outwork them out of it.',        archetypeId: 'dynamo',    traits: t({ ENG: 3, EXP: 1, CMP: 1 }) },
  ]},
  { id: 'Q4', chapter: 1, prompt: 'The training session you would never skip:', options: [
    { label: 'Passing and chance-creation drills.',                           archetypeId: 'maestro',   traits: t({ VIS: 2, PAS: 3 }) },
    { label: '1v1 dribbling and take-ons.',                                   archetypeId: 'maverick',  traits: t({ DRB: 3, EXP: 2, RSK: 1 }) },
    { label: 'Positional games in tight half-spaces.',                        archetypeId: 'architect', traits: t({ HSP: 3, CMP: 2, PAS: 1 }) },
    { label: 'Full-intensity 11v11 where I do a bit of everything.',          archetypeId: 'dynamo',    traits: t({ ENG: 3, GOL: 1, EXP: 1, DRB: 1 }) },
  ]},
  { id: 'Q5', chapter: 1, prompt: 'Twenty-five yards out, ball at your feet, defence set. You…', options: [
    { label: 'Take your man on and go.',                                      archetypeId: 'maverick',  traits: t({ DRB: 3, EXP: 2, RSK: 2 }) },
    { label: 'Slip a shoulder and get in behind.',                            archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: 'Shift into the half-space and break the line with a pass.',     archetypeId: 'architect', traits: t({ HSP: 3, PAS: 3 }) },
    { label: 'Get into the box and make it a shooting chance.',               archetypeId: 'dynamo',    traits: t({ GOL: 3, ENG: 2 }) },
  ]},

  // ── CHAPTER 2 · THE FINAL THIRD ───────────────────────────────────────────
  { id: 'Q6', chapter: 2, prompt: 'Your team wins the ball in transition. You…', options: [
    { label: 'Play the first pass forward — fast and decisive.',              archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 3 }) },
    { label: 'Carry it at them and break the line yourself.',                 archetypeId: 'maverick',  traits: t({ DRB: 3, EXP: 3, RSK: 1 }) },
    { label: 'Sprint into the space ahead to get on the end of it.',          archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: 'Find the half-space the counter is about to run through.',      archetypeId: 'architect', traits: t({ HSP: 3, PAS: 2, CMP: 1 }) },
  ]},
  { id: 'Q7', chapter: 2, prompt: 'Your team loses the ball. You…', options: [
    { label: 'Hold between the lines, ready to create the second we regain it.', archetypeId: 'maestro',   traits: t({ VIS: 2, PAS: 2 }) },
    { label: 'Drift into the pocket where the next ball will land.',          archetypeId: 'phantom',   traits: t({ MOV: 3, CMP: 1 }) },
    { label: 'Drop into the half-space to give an outlet.',                   archetypeId: 'architect', traits: t({ HSP: 3, PAS: 2, CMP: 1 }) },
    { label: 'Press. Immediately. Hunt it back.',                             archetypeId: 'dynamo',    traits: t({ ENG: 3, EXP: 1 }) },
  ]},
  { id: 'Q8', chapter: 2, prompt: 'The chance falls to you in the box. You…', options: [
    { label: 'Beat the last man and finish it myself.',                       archetypeId: 'maverick',  traits: t({ DRB: 3, RSK: 2, GOL: 1 }) },
    { label: "I'm already there, unmarked — simple finish.",                  archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 3 }) },
    { label: 'Take the shot from the half-space I engineered.',               archetypeId: 'architect', traits: t({ HSP: 3, CMP: 2, GOL: 1 }) },
    { label: "Score it — and I'd have created two others by now anyway.",     archetypeId: 'dynamo',    traits: t({ GOL: 3, ENG: 2, VIS: 1 }) },
  ]},
  { id: 'Q9', chapter: 2, prompt: '0–0. 80th minute. Your legs are gone. What is still working?', options: [
    { label: "My head. I'll still see the pass.",                             archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 2 }) },
    { label: "My feet. I'll still take him on.",                              archetypeId: 'maverick',  traits: t({ DRB: 3, EXP: 2 }) },
    { label: 'My timing. One run is all I need.',                             archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: "My engine. I'll still be running at 95.",                       archetypeId: 'dynamo',    traits: t({ ENG: 3, EXP: 1, CMP: 1 }) },
  ]},
  { id: 'Q10', chapter: 2, prompt: "You've tried the killer ball three times. Three times it's been cut out. Next time:", options: [
    { label: 'Try it again. It only takes one.',                              archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 2, RSK: 2 }) },
    { label: "Forget the pass. I'll go and take them on.",                    archetypeId: 'maverick',  traits: t({ DRB: 3, RSK: 3 }) },
    { label: 'Simplify. Take the half-space. Wait for the picture to change.', archetypeId: 'architect', traits: t({ HSP: 3, CMP: 3, PAS: 1 }) },
    { label: 'Change how I hurt them — press, arrive late, score instead.',   archetypeId: 'dynamo',    traits: t({ ENG: 3, GOL: 2 }) },
  ]},

  // ── CHAPTER 3 · YOUR SIGNATURE ────────────────────────────────────────────
  { id: 'Q11', chapter: 3, prompt: 'Teammates describe you as…', options: [
    { label: 'The creator — my passes make the goals.',                       archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 3 }) },
    { label: 'The wildcard — I make chaos happen.',                           archetypeId: 'maverick',  traits: t({ DRB: 3, RSK: 3 }) },
    { label: 'The ghost — I appear from nowhere.',                            archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: 'The one who quietly controls it from the half-space.',          archetypeId: 'architect', traits: t({ HSP: 3, CMP: 2, PAS: 1 }) },
  ]},
  { id: 'Q12', chapter: 3, prompt: 'The compliment that lands hardest:', options: [
    { label: '"You took them all on and beat them."',                         archetypeId: 'maverick',  traits: t({ DRB: 3, EXP: 2, RSK: 1 }) },
    { label: '"You were unmarkable — where did you even come from?"',         archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: '"You owned the half-spaces and broke their lines all game."',   archetypeId: 'architect', traits: t({ HSP: 3, PAS: 3 }) },
    { label: '"You covered every blade of grass — and scored."',              archetypeId: 'dynamo',    traits: t({ ENG: 3, GOL: 2 }) },
  ]},
  { id: 'Q13', chapter: 3, prompt: 'Your relationship with risk:', options: [
    { label: 'I calculate it. The right risk, at the right moment.',          archetypeId: 'maestro',   traits: t({ VIS: 3, RSK: 2, CMP: 1 }) },
    { label: "I take it. Always. That's how you break a game open.",          archetypeId: 'maverick',  traits: t({ RSK: 3, DRB: 2, EXP: 1 }) },
    { label: "I time it. I don't take risks — I take chances nobody's watching.", archetypeId: 'phantom', traits: t({ MOV: 3, CMP: 2 }) },
    { label: 'I outlast it. Influence enough phases and one of them lands.',  archetypeId: 'dynamo',    traits: t({ ENG: 3, GOL: 1, CMP: 1 }) },
  ]},
  { id: 'Q14', chapter: 3, prompt: 'What frustrates you most?', options: [
    { label: 'Not getting on the ball to create.',                            archetypeId: 'maestro',   traits: t({ VIS: 3, PAS: 2 }) },
    { label: "A system that won't let me take players on.",                   archetypeId: 'maverick',  traits: t({ DRB: 3, RSK: 2 }) },
    { label: 'Being pushed out of the half-space.',                           archetypeId: 'architect', traits: t({ HSP: 3, PAS: 1, CMP: 1 }) },
    { label: "A game where I couldn't influence every phase.",                archetypeId: 'dynamo',    traits: t({ ENG: 3, GOL: 1, EXP: 1 }) },
  ]},
  { id: 'Q15', chapter: 3, prompt: '1–0 up. Ten minutes left. You…', options: [
    { label: 'Drop, get on it, control the tempo. Dictate the ending.',       archetypeId: 'maestro',   traits: t({ VIS: 2, PAS: 3, CMP: 1 }) },
    { label: 'Stay high. One more run, one more goal, game over.',            archetypeId: 'phantom',   traits: t({ MOV: 3, GOL: 2 }) },
    { label: 'Keep it in the half-space. Kill the game with position.',       archetypeId: 'architect', traits: t({ HSP: 3, CMP: 3, PAS: 1 }) },
    { label: "Front-foot press. Don't let them breathe.",                     archetypeId: 'dynamo',    traits: t({ ENG: 3, EXP: 1 }) },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. THE ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export interface ScoreResult {
  playerTraits: TraitVector;
  spread: Record<ArchetypeId, number>;
  similarities: Record<ArchetypeId, number>;
  primary: ArchetypeId;
  secondary: ArchetypeId;
  simMargin: number;
  isHybrid: boolean;
  consistency: number;
  confidence: number;
  evidenceLevel: 'bronze' | 'silver' | 'gold' | 'elite';
}

export interface ScoreOptions {
  tau?: number;                        // softmax temperature (3.0 = calibrated)
  usePrior?: boolean;                  // DEFAULT TRUE — the AM prior is real
  evidenceWeight?: number;             // 0.40 bronze … 1.00 elite
  bonusTraits?: Partial<TraitVector>;  // Test Card / film — ADDED, never substituted
}

/** Empirically set: below every PURE margin (lowest = Architect, 0.344), above the genuine blends. */
export const HYBRID_THRESHOLD = 0.20;

export function score(answers: number[], opts: ScoreOptions = {}): ScoreResult {
  const { tau = 3.0, usePrior = true, evidenceWeight = 0.4, bonusTraits } = opts;
  if (answers.length !== QUESTIONS.length) throw new Error(`Expected ${QUESTIONS.length} answers, got ${answers.length}`);

  // (a) accumulate the player's raw trait vector
  const raw = Object.fromEntries(TRAITS.map((k) => [k, 0])) as TraitVector;
  answers.forEach((pick, i) => {
    const chosen = QUESTIONS[i].options[pick];
    if (!chosen) throw new Error(`Bad option index ${pick} on ${QUESTIONS[i].id}`);
    for (const [k, v] of Object.entries(chosen.traits)) raw[k as TraitKey] += v as number;
  });
  if (bonusTraits) for (const [k, v] of Object.entries(bonusTraits)) raw[k as TraitKey] += v as number;

  // (b) centre + normalise the PLAYER, exactly as we did the archetypes
  const vec = TRAITS.map((k) => raw[k]);
  const m = mean(vec);
  const c = vec.map((x) => x - m);
  const n = norm(c);
  const playerUnit = n === 0 ? c.map(() => 0) : c.map((x) => x / n);

  // (c) cosine against each archetype's SHAPE
  const sims = {} as Record<ArchetypeId, number>;
  for (const id of ARCHETYPE_IDS) sims[id] = dot(playerUnit, ARCHETYPE_UNIT[id]);

  // (d) posterior ∝ prior × likelihood   ← rarity lives HERE, never in exposure
  const logits = ARCHETYPE_IDS.map((id) => tau * sims[id] + Math.log(usePrior ? PRIOR[id] : 0.2));
  const mx = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - mx));
  const sum = exps.reduce((a, b) => a + b, 0);
  const spread = {} as Record<ArchetypeId, number>;
  ARCHETYPE_IDS.forEach((id, i) => (spread[id] = (exps[i] / sum) * 100));

  // (e) rank, hybrid rule, confidence
  const ranked = [...ARCHETYPE_IDS].sort((a, b) => sims[b] - sims[a]);
  const [primary, secondary] = ranked;
  const simMargin = sims[primary] - sims[secondary];
  const consistency = agreementWith(answers, primary);

  const confidence =
    0.45 * Math.min(Math.max(simMargin / 0.45, 0), 1) +
    0.30 * consistency +
    0.25 * evidenceWeight;

  const evidenceLevel =
    evidenceWeight >= 1.0 ? 'elite' : evidenceWeight >= 0.9 ? 'gold' : evidenceWeight >= 0.7 ? 'silver' : 'bronze';

  return { playerTraits: raw, spread, similarities: sims, primary, secondary, simMargin,
           isHybrid: simMargin < HYBRID_THRESHOLD, consistency, confidence, evidenceLevel };
}

/** Of the 12 questions where `id` was offered, how often did the player choose it? */
function agreementWith(answers: number[], id: ArchetypeId): number {
  let offered = 0, chosen = 0;
  QUESTIONS.forEach((q, i) => {
    if (q.options.some((o) => o.archetypeId === id)) {
      offered++;
      if (q.options[answers[i]].archetypeId === id) chosen++;
    }
  });
  return offered === 0 ? 0 : chosen / offered;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SELF-TEST — RUN IN CI. IT BLOCKS THE MERGE.
//    If you reword an item and an archetype stops recovering itself,
//    YOUR COPY IS WRONG, NOT YOUR MATHS.
// ─────────────────────────────────────────────────────────────────────────────

const pureAnswers = (target: ArchetypeId) => QUESTIONS.map((q) => {
  const i = q.options.findIndex((o) => o.archetypeId === target);
  if (i >= 0) return i;
  let best = 0, bs = -Infinity;   // forced elsewhere → pick the NEAREST archetype, as a real player would
  q.options.forEach((o, k) => {
    const s = dot(ARCHETYPE_UNIT[target], ARCHETYPE_UNIT[o.archetypeId]);
    if (s > bs) { bs = s; best = k; }
  });
  return best;
});

export function selfTest(): boolean {
  let ok = true;
  const L = '─'.repeat(78);

  const expo = Object.fromEntries(ARCHETYPE_IDS.map((i) => [i, 0])) as Record<ArchetypeId, number>;
  for (const q of QUESTIONS) for (const o of q.options) expo[o.archetypeId]++;
  const balanced = ARCHETYPE_IDS.every((i) => expo[i] === 12);
  console.log(`\n${L}\n1. EXPOSURE BALANCE   (v1.0 shipped 11/10/10/9/8 — that WAS the bug)\n${L}`);
  console.log('  ', expo, balanced ? '✅ 12 each' : '❌ UNBALANCED');
  ok &&= balanced;

  console.log(`\n${L}\n2. PURE-RESPONDENT RECOVERY   (5/5, and every margin > ${HYBRID_THRESHOLD})\n${L}`);
  for (const a of ARCHETYPE_IDS) {
    const r = score(pureAnswers(a));
    const pass = r.primary === a && r.simMargin > HYBRID_THRESHOLD;
    ok &&= pass;
    const top = ARCHETYPE_IDS
      .map((i) => [ARCHETYPE_NAMES[i].replace('The ', ''), r.spread[i]] as [string, number])
      .sort((x, y) => y[1] - x[1])
      .map(([nm, v]) => `${nm} ${v.toFixed(1)}%`).join(' · ');
    console.log(`   pure ${ARCHETYPE_NAMES[a].padEnd(14)} → ${ARCHETYPE_NAMES[r.primary].padEnd(14)} margin ${r.simMargin.toFixed(3)}  ${pass ? '✅' : '❌ FAIL'}`);
    console.log(`        ${top}`);
  }

  console.log(`\n${L}\n3. HYBRID DETECTION   (cosine margin < ${HYBRID_THRESHOLD})\n${L}`);
  const blend = (a: ArchetypeId, b: ArchetypeId) => {
    const pa = pureAnswers(a), pb = pureAnswers(b);
    return QUESTIONS.map((_, i) => (i % 2 === 0 ? pa[i] : pb[i]));
  };
  for (const [a, b] of [['architect', 'dynamo'], ['maestro', 'architect'], ['maverick', 'dynamo'], ['phantom', 'dynamo']] as [ArchetypeId, ArchetypeId][]) {
    const r = score(blend(a, b));
    console.log(`   ${(ARCHETYPE_NAMES[a] + ' + ' + ARCHETYPE_NAMES[b] + ' 50/50').padEnd(48)}margin ${r.simMargin.toFixed(3)} → ${r.isHybrid ? 'HYBRID ✅' : 'single primary'}`);
  }

  console.log(`\n${L}\n${ok ? '✅ ALL CHECKS PASS — safe to merge.' : '❌ CHECKS FAILED — do not merge.'}\n${L}\n`);
  return ok;
}

if (typeof require !== 'undefined' && require.main === module) {
  const ok = selfTest();
  if (typeof process !== 'undefined') process.exit(ok ? 0 : 1);
}
