/* ============================================================================
 * THE FOOTBALLER'S ACADEMY — AM SCENE ENGINE  v1.0
 * Module 6 · Attacking Midfielder · Upgrade D from the Battery-Expansion audit
 *
 * "One data structure. Forty scenes. Five tasks." — author scenes ONCE, then
 * every task (The Shoulder Check, The Chunk Test, The Freeze, Options Seen,
 * The xG Dilemma) is a skin on this asset.
 *
 * Coordinates are normalised 0..1. WE attack LEFT -> RIGHT (their goal at x=1).
 *   x: 0 = our goal line, 1 = their goal line
 *   y: 0 = top touchline, 1 = bottom touchline
 *
 * players[]  — every token on screen. team 'us' | 'them'. index-addressable.
 * ball.carrier — index into players[] holding the ball (always an 'us' AM-ish).
 * groundTruth — the authored answer key each task reads:
 *   bestPass       -> index of the single highest-value pass  (Shoulder Check, Options)
 *   allViableLanes -> indices of every reasonable option        (Options fluency)
 *   freeMan        -> index of the genuinely unmarked runner    (Shoulder Check recall)
 *   xgShoot        -> xG if the carrier shoots now              (xG Dilemma)
 *   xgBestPass     -> xG of the chance the best pass creates    (xG Dilemma)
 *   outcome        -> 'goal' | 'chance' | 'lost'                (The Freeze)
 *
 * Exposed as window.AMScenes and module.exports.
 * ==========================================================================*/
(function (root) {
  'use strict';

  // ---- roles are labels only; geometry is what matters ----
  var SCENES = [
    {
      id: 'S01',
      name: 'The overload switch',
      defensiveShape: 'mid-block',
      brief: 'They have shifted to your right. The free man is the switch to the far side.',
      players: [
        { team: 'us',   x: 0.07, y: 0.50, role: 'GK' },   // 0
        { team: 'us',   x: 0.26, y: 0.32, role: 'CB' },   // 1
        { team: 'us',   x: 0.26, y: 0.68, role: 'CB' },   // 2
        { team: 'us',   x: 0.44, y: 0.52, role: 'DM' },   // 3
        { team: 'us',   x: 0.55, y: 0.30, role: 'CM' },   // 4
        { team: 'us',   x: 0.60, y: 0.54, role: 'AM' },   // 5  carrier
        { team: 'us',   x: 0.74, y: 0.20, role: 'RW' },   // 6
        { team: 'us',   x: 0.80, y: 0.52, role: 'ST' },   // 7
        { team: 'us',   x: 0.70, y: 0.86, role: 'LW' },   // 8  free man (far switch)
        { team: 'them', x: 0.96, y: 0.50, role: 'GK' },   // 9
        { team: 'them', x: 0.80, y: 0.34, role: 'CB' },   // 10
        { team: 'them', x: 0.80, y: 0.66, role: 'CB' },   // 11
        { team: 'them', x: 0.66, y: 0.30, role: 'RB' },   // 12
        { team: 'them', x: 0.64, y: 0.52, role: 'DM' },   // 13
        { team: 'them', x: 0.58, y: 0.36, role: 'CM' },   // 14
        { team: 'them', x: 0.72, y: 0.60, role: 'CM' }    // 15
      ],
      ball: { carrier: 5 },
      groundTruth: { bestPass: 8, allViableLanes: [4, 6, 8, 3], freeMan: 8, xgShoot: 0.04, xgBestPass: 0.22, outcome: 'chance' }
    },
    {
      id: 'S02',
      name: 'Between the lines',
      defensiveShape: 'low-block',
      brief: 'Deep block. The striker has pinned both centre-backs — the run in behind is on.',
      players: [
        { team: 'us',   x: 0.08, y: 0.50, role: 'GK' },
        { team: 'us',   x: 0.30, y: 0.28, role: 'RB' },
        { team: 'us',   x: 0.30, y: 0.72, role: 'LB' },
        { team: 'us',   x: 0.46, y: 0.44, role: 'CM' },
        { team: 'us',   x: 0.58, y: 0.52, role: 'AM' },   // 4 carrier
        { team: 'us',   x: 0.72, y: 0.30, role: 'RW' },   // 5 free man (channel)
        { team: 'us',   x: 0.78, y: 0.54, role: 'ST' },   // 6
        { team: 'us',   x: 0.72, y: 0.74, role: 'LW' },   // 7
        { team: 'them', x: 0.95, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.84, y: 0.40, role: 'CB' },
        { team: 'them', x: 0.84, y: 0.60, role: 'CB' },
        { team: 'them', x: 0.78, y: 0.24, role: 'RB' },
        { team: 'them', x: 0.78, y: 0.78, role: 'LB' },
        { team: 'them', x: 0.68, y: 0.44, role: 'DM' },
        { team: 'them', x: 0.66, y: 0.60, role: 'CM' }
      ],
      ball: { carrier: 4 },
      groundTruth: { bestPass: 5, allViableLanes: [5, 6, 3], freeMan: 5, xgShoot: 0.06, xgBestPass: 0.28, outcome: 'chance' }
    },
    {
      id: 'S03',
      name: 'The counter',
      defensiveShape: 'transition',
      brief: 'You won it and broke. Numbers up — the early ball springs the striker clean.',
      players: [
        { team: 'us',   x: 0.40, y: 0.52, role: 'AM' },   // 0 carrier
        { team: 'us',   x: 0.52, y: 0.22, role: 'RW' },   // 1
        { team: 'us',   x: 0.66, y: 0.48, role: 'ST' },   // 2 free man (clean through)
        { team: 'us',   x: 0.50, y: 0.80, role: 'LW' },   // 3
        { team: 'us',   x: 0.30, y: 0.56, role: 'CM' },   // 4
        { team: 'them', x: 0.94, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.74, y: 0.40, role: 'CB' },
        { team: 'them', x: 0.70, y: 0.64, role: 'CB' },
        { team: 'them', x: 0.48, y: 0.60, role: 'DM' }
      ],
      ball: { carrier: 0 },
      groundTruth: { bestPass: 2, allViableLanes: [1, 2, 3], freeMan: 2, xgShoot: 0.05, xgBestPass: 0.34, outcome: 'goal' }
    },
    {
      id: 'S04',
      name: 'Pinned on the touchline',
      defensiveShape: 'high-line',
      brief: 'Pressed near the line. The simple inside ball to the pivot resets and beats the press.',
      players: [
        { team: 'us',   x: 0.10, y: 0.50, role: 'GK' },
        { team: 'us',   x: 0.28, y: 0.34, role: 'CB' },
        { team: 'us',   x: 0.34, y: 0.86, role: 'LB' },   // 2 carrier (pinned wide)
        { team: 'us',   x: 0.30, y: 0.56, role: 'DM' },   // 3 free man (inside reset)
        { team: 'us',   x: 0.50, y: 0.66, role: 'CM' },   // 4
        { team: 'us',   x: 0.58, y: 0.40, role: 'AM' },   // 5
        { team: 'us',   x: 0.66, y: 0.80, role: 'LW' },   // 6
        { team: 'them', x: 0.40, y: 0.80, role: 'RB' },   // presses carrier
        { team: 'them', x: 0.52, y: 0.60, role: 'CM' },
        { team: 'them', x: 0.60, y: 0.40, role: 'DM' },
        { team: 'them', x: 0.72, y: 0.70, role: 'CB' }
      ],
      ball: { carrier: 2 },
      groundTruth: { bestPass: 3, allViableLanes: [3, 1, 4], freeMan: 3, xgShoot: 0.01, xgBestPass: 0.09, outcome: 'chance' }
    },
    {
      id: 'S05',
      name: 'Half-space seam',
      defensiveShape: 'mid-block',
      brief: 'Their block is narrow and even. The seam is the disguised ball into the right half-space.',
      players: [
        { team: 'us',   x: 0.08, y: 0.50, role: 'GK' },
        { team: 'us',   x: 0.28, y: 0.30, role: 'CB' },
        { team: 'us',   x: 0.28, y: 0.70, role: 'CB' },
        { team: 'us',   x: 0.42, y: 0.50, role: 'DM' },
        { team: 'us',   x: 0.56, y: 0.56, role: 'AM' },   // 4 carrier
        { team: 'us',   x: 0.68, y: 0.34, role: 'RW' },   // 5 free man (half-space seam)
        { team: 'us',   x: 0.80, y: 0.56, role: 'ST' },   // 6
        { team: 'us',   x: 0.66, y: 0.80, role: 'LW' },   // 7
        { team: 'them', x: 0.95, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.82, y: 0.42, role: 'CB' },
        { team: 'them', x: 0.82, y: 0.58, role: 'CB' },
        { team: 'them', x: 0.70, y: 0.50, role: 'DM' },
        { team: 'them', x: 0.62, y: 0.42, role: 'CM' },
        { team: 'them', x: 0.64, y: 0.66, role: 'CM' }
      ],
      ball: { carrier: 4 },
      groundTruth: { bestPass: 5, allViableLanes: [5, 3, 7], freeMan: 5, xgShoot: 0.05, xgBestPass: 0.19, outcome: 'chance' }
    },
    {
      id: 'S06',
      name: 'Overlap decoy',
      defensiveShape: 'mid-block',
      brief: 'The overlap drags their full-back — the cut-back to the arriving midfielder is the goal.',
      players: [
        { team: 'us',   x: 0.30, y: 0.60, role: 'CM' },
        { team: 'us',   x: 0.72, y: 0.82, role: 'AM' },   // 1 carrier (wide, deep)
        { team: 'us',   x: 0.86, y: 0.74, role: 'LB' },   // 2 overlap decoy
        { team: 'us',   x: 0.78, y: 0.50, role: 'ST' },   // 3
        { team: 'us',   x: 0.62, y: 0.50, role: 'CM' },   // 4 free man (arriving, cut-back)
        { team: 'us',   x: 0.74, y: 0.24, role: 'RW' },   // 5
        { team: 'them', x: 0.94, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.86, y: 0.60, role: 'RB' },   // pulled by overlap
        { team: 'them', x: 0.82, y: 0.44, role: 'CB' },
        { team: 'them', x: 0.80, y: 0.60, role: 'CB' },
        { team: 'them', x: 0.68, y: 0.40, role: 'DM' }
      ],
      ball: { carrier: 1 },
      groundTruth: { bestPass: 4, allViableLanes: [4, 2, 3], freeMan: 4, xgShoot: 0.03, xgBestPass: 0.31, outcome: 'goal' }
    },
    {
      id: 'S07',
      name: 'Third-man run',
      defensiveShape: 'low-block',
      brief: 'The set to the striker frees the third-man run — but the safe option is the return.',
      players: [
        { team: 'us',   x: 0.10, y: 0.50, role: 'GK' },
        { team: 'us',   x: 0.34, y: 0.30, role: 'RB' },
        { team: 'us',   x: 0.46, y: 0.58, role: 'CM' },   // 2 free man (safe return)
        { team: 'us',   x: 0.58, y: 0.50, role: 'AM' },   // 3 carrier
        { team: 'us',   x: 0.74, y: 0.52, role: 'ST' },   // 4 wall/set
        { team: 'us',   x: 0.78, y: 0.30, role: 'RW' },   // 5 third-man run (bestPass)
        { team: 'us',   x: 0.70, y: 0.78, role: 'LW' },   // 6
        { team: 'them', x: 0.95, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.84, y: 0.42, role: 'CB' },
        { team: 'them', x: 0.84, y: 0.58, role: 'CB' },
        { team: 'them', x: 0.80, y: 0.26, role: 'RB' },
        { team: 'them', x: 0.70, y: 0.48, role: 'DM' },
        { team: 'them', x: 0.66, y: 0.62, role: 'CM' }
      ],
      ball: { carrier: 3 },
      groundTruth: { bestPass: 5, allViableLanes: [2, 4, 5], freeMan: 2, xgShoot: 0.05, xgBestPass: 0.24, outcome: 'chance' }
    },
    {
      id: 'S08',
      name: 'Isolated one-v-one',
      defensiveShape: 'high-line',
      brief: 'High line, space in behind. The winger is isolated 1v1 with grass to run into.',
      players: [
        { team: 'us',   x: 0.24, y: 0.50, role: 'CB' },
        { team: 'us',   x: 0.40, y: 0.40, role: 'DM' },
        { team: 'us',   x: 0.52, y: 0.56, role: 'AM' },   // 2 carrier
        { team: 'us',   x: 0.60, y: 0.18, role: 'RW' },   // 3 free man (isolated 1v1)
        { team: 'us',   x: 0.66, y: 0.52, role: 'ST' },   // 4
        { team: 'us',   x: 0.58, y: 0.82, role: 'LW' },   // 5
        { team: 'them', x: 0.92, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.70, y: 0.22, role: 'LB' },   // isolated defender
        { team: 'them', x: 0.72, y: 0.48, role: 'CB' },
        { team: 'them', x: 0.72, y: 0.66, role: 'CB' },
        { team: 'them', x: 0.60, y: 0.52, role: 'DM' }
      ],
      ball: { carrier: 2 },
      groundTruth: { bestPass: 3, allViableLanes: [3, 4, 1], freeMan: 3, xgShoot: 0.04, xgBestPass: 0.16, outcome: 'chance' }
    },
    {
      id: 'S09',
      name: 'Recycle to switch',
      defensiveShape: 'mid-block',
      brief: 'No forward ball on. The disciplined play is to recycle to the pivot and switch fields.',
      players: [
        { team: 'us',   x: 0.10, y: 0.50, role: 'GK' },
        { team: 'us',   x: 0.30, y: 0.30, role: 'CB' },
        { team: 'us',   x: 0.30, y: 0.70, role: 'CB' },
        { team: 'us',   x: 0.44, y: 0.48, role: 'DM' },   // 3 free man (recycle)
        { team: 'us',   x: 0.60, y: 0.66, role: 'AM' },   // 4 carrier (crowded)
        { team: 'us',   x: 0.74, y: 0.40, role: 'RW' },   // 5
        { team: 'us',   x: 0.80, y: 0.58, role: 'ST' },   // 6
        { team: 'them', x: 0.95, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.82, y: 0.44, role: 'CB' },
        { team: 'them', x: 0.82, y: 0.58, role: 'CB' },
        { team: 'them', x: 0.68, y: 0.60, role: 'DM' },
        { team: 'them', x: 0.66, y: 0.72, role: 'CM' },
        { team: 'them', x: 0.72, y: 0.50, role: 'CM' }
      ],
      ball: { carrier: 4 },
      groundTruth: { bestPass: 3, allViableLanes: [3, 1], freeMan: 3, xgShoot: 0.02, xgBestPass: 0.05, outcome: 'lost' }
    },
    {
      id: 'S10',
      name: 'Zone-14 shot',
      defensiveShape: 'low-block',
      brief: 'Top of the D, sight of goal, screen slipped. This one you take yourself.',
      players: [
        { team: 'us',   x: 0.40, y: 0.44, role: 'CM' },
        { team: 'us',   x: 0.66, y: 0.52, role: 'AM' },   // 1 carrier (zone 14)
        { team: 'us',   x: 0.80, y: 0.30, role: 'RW' },   // 2
        { team: 'us',   x: 0.82, y: 0.60, role: 'ST' },   // 3 free man (tap-in option)
        { team: 'us',   x: 0.70, y: 0.80, role: 'LW' },   // 4
        { team: 'them', x: 0.95, y: 0.50, role: 'GK' },
        { team: 'them', x: 0.84, y: 0.40, role: 'CB' },
        { team: 'them', x: 0.84, y: 0.60, role: 'CB' },
        { team: 'them', x: 0.78, y: 0.24, role: 'RB' },
        { team: 'them', x: 0.76, y: 0.52, role: 'DM' }
      ],
      ball: { carrier: 1 },
      groundTruth: { bestPass: 3, allViableLanes: [3, 2], freeMan: 3, xgShoot: 0.19, xgBestPass: 0.24, outcome: 'chance' }
    }
  ];

  // ---- deterministic RNG so scrambles are stable per scene ----
  function hashStr(s) { var h = 2166136261 >>> 0; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  /* The Chunk Test's whole validity rests on this: SAME players, but random,
   * football-meaningless positions. Structure destroyed; identity kept. Expert
   * recall advantage appears only on the structured original. */
  function scramble(scene, salt) {
    var rnd = mulberry32(hashStr(scene.id + '|' + (salt || 'scr')));
    var players = scene.players.map(function (p) {
      return { team: p.team, role: p.role, x: 0.08 + rnd() * 0.84, y: 0.10 + rnd() * 0.80 };
    });
    return {
      id: scene.id + '-scrambled',
      name: scene.name + ' (scrambled)',
      defensiveShape: 'scrambled',
      brief: 'Same players, meaningless positions. Football schemas give you no help here.',
      players: players,
      ball: { carrier: scene.ball.carrier },
      groundTruth: null,           // no tactical truth in a scrambled scene
      scrambledFrom: scene.id
    };
  }

  // ---- accessors ----
  function getScene(id) { for (var i = 0; i < SCENES.length; i++) if (SCENES[i].id === id) return SCENES[i]; return null; }
  function byShape(shape) { return SCENES.filter(function (s) { return s.defensiveShape === shape; }); }
  function carrierOf(scene) { return scene.players[scene.ball.carrier]; }
  function teammatesOf(scene) { return scene.players.filter(function (p, i) { return p.team === 'us' && i !== scene.ball.carrier; }); }

  // lightweight integrity check — every ground-truth index must exist & be a teammate
  function validate() {
    var errs = [];
    SCENES.forEach(function (s) {
      var g = s.groundTruth; if (!g) return;
      var idxs = [g.bestPass, g.freeMan].concat(g.allViableLanes || []);
      idxs.forEach(function (ix) {
        var p = s.players[ix];
        if (!p) errs.push(s.id + ': index ' + ix + ' out of range');
        else if (p.team !== 'us') errs.push(s.id + ': index ' + ix + ' is not a teammate');
        else if (ix === s.ball.carrier) errs.push(s.id + ': index ' + ix + ' is the carrier');
      });
      if ((g.allViableLanes || []).indexOf(g.bestPass) < 0) errs.push(s.id + ': bestPass not in allViableLanes');
    });
    return errs;
  }

  var API = { SCENES: SCENES, scramble: scramble, getScene: getScene, byShape: byShape, carrierOf: carrierOf, teammatesOf: teammatesOf, validate: validate, VERSION: 'am-scenes-1.0' };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.AMScenes = API;
})(typeof window !== 'undefined' ? window : this);
