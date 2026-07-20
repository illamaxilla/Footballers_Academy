/* ============================================================================
 * THE FOOTBALLER'S ACADEMY — SHARED PITCH RENDERER  (fa-pitch.js)  v1.0
 *
 * One renderer, every game. Draws the "chalk on navy" pitch, labelled tokens,
 * red opponent chevrons, and the glowing ball from the AM module — but with
 * ASPECT-AWARE FITTING so the field fills the panel instead of sitting in a
 * padded square. Coordinates stay normalised 0..1 (see scenes.js), so no scene
 * data changes.
 *
 *   x: 0 = our goal line, 1 = their goal line   (WE attack low-x -> high-x)
 *   y: 0 = top touchline,  1 = bottom touchline
 *
 * USAGE (inside a game's _draw):
 *   const fit = FAPitch.fit(W, H, { crop:'attacking-half', orient:'auto' });
 *   FAPitch.pitch(ctx, fit);                       // gradient + markings
 *   FAPitch.passLane(ctx, fit, from, to, {best:true, accent});
 *   FAPitch.token(ctx, fit, p.x, p.y, { role:p.role, kind:'carrier', accent });
 *   FAPitch.chevron(ctx, fit, p.x, p.y, { role:p.role });
 *   FAPitch.ball(ctx, fit, bx, by, { flight:true });
 *   const [sx,sy] = fit.px(nx, ny);  // map a scene point to screen px
 *   const hit = fit.inv(clientX, clientY);  // map a tap back to 0..1 scene coords
 *
 * Exposed as window.FAPitch and module.exports.
 * ==========================================================================*/
(function (root) {
  'use strict';

  var L = 105, WD = 68;            // pitch metres (length x width)
  var ASPECT = L / WD;             // ~1.544

  // crop windows in normalised full-pitch coords [x0,x1,y0,y1]
  var CROPS = {
    'full':            [0.00, 1.00, 0.00, 1.00],
    'defending-half':  [0.00, 0.54, 0.00, 1.00],
    'attacking-half':  [0.46, 1.00, 0.00, 1.00],
    'defensive-third': [0.00, 0.36, 0.00, 1.00],
    'middle-third':    [0.32, 0.68, 0.00, 1.00],
    'final-third':     [0.60, 1.00, 0.00, 1.00],
    'box':             [0.74, 1.00, 0.08, 0.92],
    // goalkeeper cams — include a little BEHIND the goal line so the net shows
    'gk':              [0.62, 1.055, 0.00, 1.00],
    'gk-close':        [0.80, 1.065, 0.12, 0.88],
    'gk-18':           [0.84, 1.065, 0.19, 0.81],
    'gk-6yard':        [0.905, 1.06, 0.32, 0.68],
    'gk-spot':         [0.875, 1.065, 0.28, 0.72]
  };

  var COL = {
    line:    'rgba(90,150,190,.14)',
    lineDim: 'rgba(90,150,190,.08)',
    us:      '#3aa8c4',
    usLabel: '#04121a',
    them:    '#FF5A6E',
    themLbl: 'rgba(255,150,160,.72)',
    free:    '#3BE07A',
    ball:    '#ffffff'
  };

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---- FIT: choose orientation + scale so the crop fills the panel ---------*/
  function fit(W, H, opts) {
    opts = opts || {};
    var crop = opts.cropRect || CROPS[opts.crop] || CROPS.full;
    var cx0 = crop[0], cx1 = crop[1], cy0 = crop[2], cy1 = crop[3];
    var spanX = cx1 - cx0, spanY = cy1 - cy0;
    var inset = (opts.inset != null ? opts.inset : 0.045) * Math.min(W, H);
    var aw = Math.max(1, W - 2 * inset), ah = Math.max(1, H - 2 * inset);

    // content metres for each orientation
    var lenM = spanX * L, widM = spanY * WD;
    // EW: length horizontal.  NS: length vertical.
    var sEW = Math.min(aw / lenM, ah / widM);
    var sNS = Math.min(aw / widM, ah / lenM);

    var orient = opts.orient;
    if (!orient || orient === 'auto') orient = (sNS > sEW * 1.02) ? 'ns' : 'ew';
    var scale = orient === 'ns' ? sNS : sEW;

    var drawW, drawH;
    if (orient === 'ew') { drawW = lenM * scale; drawH = widM * scale; }
    else                 { drawW = widM * scale; drawH = lenM * scale; }
    var ox = (W - drawW) / 2, oy = (H - drawH) / 2;

    var attackDir = opts.attackDir || 'ltr'; // ltr = we attack toward high-x

    function px(nx, ny) {
      var u = (nx - cx0) / spanX;         // along length (0..1)
      var v = (ny - cy0) / spanY;         // across width (0..1)
      if (orient === 'ew') {
        if (attackDir === 'rtl') u = 1 - u;
        return [ox + u * drawW, oy + v * drawH];
      } else {
        // attack upward: high-x -> top (smaller screenY)
        var up = (attackDir === 'rtl') ? u : (1 - u);
        return [ox + v * drawW, oy + up * drawH];
      }
    }
    // inverse: screen (relative to canvas box) -> normalised scene coords
    function inv(sx, sy) {
      var u, v;
      if (orient === 'ew') {
        u = (sx - ox) / drawW; v = (sy - oy) / drawH;
        if (attackDir === 'rtl') u = 1 - u;
      } else {
        v = (sx - ox) / drawW;
        var up = (sy - oy) / drawH;
        u = (attackDir === 'rtl') ? up : (1 - up);
      }
      return [cx0 + u * spanX, cy0 + v * spanY];
    }

    var minDraw = Math.min(drawW, drawH);
    return {
      px: px, inv: inv, scale: scale, orient: orient,
      ox: ox, oy: oy, drawW: drawW, drawH: drawH, W: W, H: H,
      crop: [cx0, cx1, cy0, cy1],
      r:     clamp(scale * 1.7, 11, 30),       // token radius
      ballR: clamp(scale * 0.62, 5, 12),       // ball radius
      font:  clamp(scale * 0.9, 8, 15),        // label font px
      m:     function (metres) { return metres * scale; } // metres -> px helper
    };
  }

  /* ---- PITCH: gradient fill + minimalist markings (clipped to crop) --------*/
  function pitch(ctx, f, o) {
    o = o || {};
    var W = f.W, H = f.H;
    if (o.fillPanel !== false) {
      var g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#0d1c2e'); g.addColorStop(0.55, '#091324'); g.addColorStop(1, '#050c17');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    ctx.save();
    // clip to the drawn field so partial-crop markings don't bleed past the edge
    ctx.beginPath(); ctx.rect(f.ox, f.oy, f.drawW, f.drawH); ctx.clip();

    ctx.strokeStyle = COL.line; ctx.lineWidth = Math.max(1, f.m(0.16));
    ctx.lineJoin = 'round';
    var line = function (ax, ay, bx, by) { var A = f.px(ax, ay), B = f.px(bx, by); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); };
    var rect = function (ax, ay, bx, by) { var A = f.px(ax, ay), B = f.px(bx, by); ctx.beginPath(); ctx.rect(Math.min(A[0], B[0]), Math.min(A[1], B[1]), Math.abs(B[0] - A[0]), Math.abs(B[1] - A[1])); ctx.stroke(); };
    // orientation-correct arc: sample the arc in the pitch's own metre-space
    // (offset from centre in metres, x along length / y across width) and map
    // each point through f.px so rotation + attackDir are handled automatically.
    var arc = function (cx, cy, rm, a0, a1) {
      var N = 48, P;
      ctx.beginPath();
      for (var i = 0; i <= N; i++) {
        var th = a0 + (a1 - a0) * (i / N);
        var nx = cx + (rm * Math.cos(th)) / L;   // metres -> normalised along length
        var ny = cy + (rm * Math.sin(th)) / WD;  // metres -> normalised across width
        P = f.px(nx, ny);
        if (i === 0) ctx.moveTo(P[0], P[1]); else ctx.lineTo(P[0], P[1]);
      }
      ctx.stroke();
    };
    var dot = function (cx, cy) { var C = f.px(cx, cy); ctx.beginPath(); ctx.arc(C[0], C[1], Math.max(1.4, f.m(0.35)), 0, 7); ctx.fillStyle = COL.line; ctx.fill(); };

    // outer boundary
    rect(0, 0, 1, 1);
    // halfway line + centre circle + spot
    line(0.5, 0, 0.5, 1); arc(0.5, 0.5, 9.15, 0, 7); dot(0.5, 0.5);
    // penalty boxes (16.5m deep, 40.3m wide) + 6-yard + spot + D-arc
    var pbW0 = 0.5 - (40.3 / WD) / 2, pbW1 = 0.5 + (40.3 / WD) / 2;
    var sbW0 = 0.5 - (18.32 / WD) / 2, sbW1 = 0.5 + (18.32 / WD) / 2;
    var pd = 16.5 / L, sd = 5.5 / L, spot = 11 / L;
    // our end (x0)
    rect(0, pbW0, pd, pbW1); rect(0, sbW0, sd, sbW1); dot(spot, 0.5);
    arc(spot, 0.5, 9.15, -0.93, 0.93);
    // their end (x1)
    rect(1, pbW0, 1 - pd, pbW1); rect(1, sbW0, 1 - sd, sbW1); dot(1 - spot, 0.5);
    arc(1 - spot, 0.5, 9.15, Math.PI - 0.93, Math.PI + 0.93);
    // goals (net + bright posts) at both ends — visible when the crop shows behind the line
    goal(ctx, f, 0); goal(ctx, f, 1);
    ctx.restore();
  }

  /* ---- GOAL (top-down net + bright frame) ---------------------------------*/
  function goal(ctx, f, end) {
    var gw = 7.32 / WD, y0 = 0.5 - gw / 2, y1 = 0.5 + gw / 2;
    var backX = end + (end === 0 ? -1 : 1) * (2.4 / L);
    var P0 = f.px(end, y0), P1 = f.px(end, y1), B0 = f.px(backX, y0), B1 = f.px(backX, y1);
    ctx.save();
    // net fill
    ctx.fillStyle = 'rgba(150,185,215,.05)';
    ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.lineTo(B0[0], B0[1]); ctx.lineTo(B1[0], B1[1]); ctx.lineTo(P1[0], P1[1]); ctx.closePath(); ctx.fill();
    // net hatch
    ctx.strokeStyle = 'rgba(150,185,215,.13)'; ctx.lineWidth = 1;
    var lerp = function (a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
    for (var k = 1; k < 6; k++) { var t = k / 6, a = lerp(P0, P1, t), b = lerp(B0, B1, t); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
    for (var m = 1; m < 3; m++) { var s = m / 3, c = lerp(P0, B0, s), d = lerp(P1, B1, s); ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke(); }
    // bright frame: posts (side netting) + back bar + goal-line mouth
    ctx.strokeStyle = 'rgba(232,242,252,.85)'; ctx.lineWidth = Math.max(2.2, f.m(0.16)); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.lineTo(B0[0], B0[1]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(P1[0], P1[1]); ctx.lineTo(B1[0], B1[1]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(B0[0], B0[1]); ctx.lineTo(B1[0], B1[1]); ctx.stroke();
    ctx.lineCap = 'butt'; ctx.restore();
  }

  /* ---- PASS LANE (dashed) or BEST PASS (solid, glowing, arrowhead) ---------*/
  function passLane(ctx, f, from, to, o) {
    o = o || {}; var A = f.px(from.x, from.y), B = f.px(to.x, to.y);
    ctx.save();
    if (o.best) {
      var acc = o.accent || '#A78BFA';
      ctx.strokeStyle = acc; ctx.lineWidth = Math.max(2.4, f.m(0.09));
      ctx.shadowColor = acc; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.shadowBlur = 0;
      var ang = Math.atan2(B[1] - A[1], B[0] - A[0]), hl = Math.max(9, f.m(0.7));
      var tip = [B[0] - Math.cos(ang) * f.r, B[1] - Math.sin(ang) * f.r];
      ctx.fillStyle = acc; ctx.beginPath();
      ctx.moveTo(tip[0], tip[1]);
      ctx.lineTo(tip[0] - Math.cos(ang - 0.5) * hl, tip[1] - Math.sin(ang - 0.5) * hl);
      ctx.lineTo(tip[0] - Math.cos(ang + 0.5) * hl, tip[1] - Math.sin(ang + 0.5) * hl);
      ctx.closePath(); ctx.fill();
    } else {
      ctx.strokeStyle = o.color || 'rgba(159,176,197,.35)';
      ctx.lineWidth = Math.max(1.4, f.m(0.05)); ctx.setLineDash([5, 6]);
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
  }

  /* ---- TOKEN (labelled disc, our team) ------------------------------------*/
  function token(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1], r = o.r || f.r;
    var acc = o.accent || '#A78BFA';
    var fill = o.kind === 'carrier' ? acc : (o.fill || COL.us);
    var ringOn = o.best || o.kind === 'best';
    ctx.save(); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    // free-man halo (independent of disc styling)
    if (o.free || o.kind === 'free') {
      var pulse = o.pulse == null ? 0 : o.pulse;
      ctx.strokeStyle = COL.free; ctx.globalAlpha = (0.4 + 0.5 * pulse) * (o.alpha == null ? 1 : o.alpha);
      ctx.lineWidth = Math.max(2, f.m(0.09)); ctx.beginPath(); ctx.arc(x, y, r + 5 + pulse * 4, 0, 7); ctx.stroke();
      ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    }
    // drop shadow
    ctx.fillStyle = 'rgba(0,0,0,.34)'; ctx.beginPath(); ctx.ellipse(x, y + r * 0.85, r * 0.9, r * 0.3, 0, 0, 7); ctx.fill();
    // disc
    if (o.kind === 'keeper') { var kg = ctx.createLinearGradient(x, y - r * 1.14, x, y + r * 0.86); kg.addColorStop(0, '#EAFBFF'); kg.addColorStop(1, '#8fd8e6'); ctx.fillStyle = kg; }
    else ctx.fillStyle = fill;
    ctx.strokeStyle = ringOn ? acc : 'rgba(255,255,255,.24)';
    ctx.lineWidth = ringOn ? Math.max(2.2, f.m(0.09)) : Math.max(1.2, f.m(0.05));
    ctx.beginPath(); ctx.arc(x, y - r * 0.14, r, 0, 7); ctx.fill(); ctx.stroke();
    // label
    if (o.role) {
      ctx.fillStyle = o.kind === 'carrier' ? '#160a2e' : (o.kind === 'keeper' ? '#06202a' : COL.usLabel);
      ctx.font = "800 " + (o.font || f.font) + "px 'IBM Plex Mono'";
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(o.role, x, y - r * 0.14); ctx.textBaseline = 'alphabetic';
    }
    // body orientation notch (which way the player faces)
    if (o.facing != null) {
      var fx = x + Math.cos(o.facing) * r, fy = (y - r * 0.14) + Math.sin(o.facing) * r;
      ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.beginPath(); ctx.arc(fx, fy, Math.max(2, f.m(0.13)), 0, 7); ctx.fill();
    }
    ctx.restore();
    return [x, y - r * 0.14];
  }

  /* ---- CHEVRON (opponent, points at OUR goal) -----------------------------*/
  function chevron(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1];
    var r = o.r || Math.max(9, f.r * 0.85);
    // point toward our goal: in EW that's toward low screen-x; in NS toward bottom.
    var ang = f.orient === 'ew' ? (f.attackDir === 'rtl' ? 0 : Math.PI)
                                : (f.attackDir === 'rtl' ? Math.PI / 2 : -Math.PI / 2);
    ctx.save(); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = o.color || COL.them;
    ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r * 0.55, -r * 0.85); ctx.lineTo(r * 0.15, 0); ctx.lineTo(r * 0.55, r * 0.85); ctx.closePath(); ctx.fill();
    ctx.restore();
    if (o.role) {
      ctx.save(); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
      ctx.fillStyle = COL.themLbl; ctx.font = "600 " + (o.font || f.font * 0.92) + "px 'IBM Plex Mono'";
      ctx.textAlign = 'center'; ctx.fillText(o.role, x, y + r + (o.font || f.font) + 2); ctx.restore();
    }
  }

  /* ---- BALL (white radial dot; glows in flight) — the AM look --------------*/
  function ball(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1], r = o.r || f.ballR;
    ctx.save();
    // motion trail (fading discs behind the ball, along -dir)
    if (o.trail && o.dir) {
      var d = o.dir, mag = Math.hypot(d[0], d[1]) || 1, ux = d[0] / mag, uy = d[1] / mag;
      for (var t = 4; t >= 1; t--) {
        var tx = x - ux * r * 1.5 * t, ty = y - uy * r * 1.5 * t;
        ctx.globalAlpha = 0.16 * (5 - t) / 4;
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(tx, ty, r * (1 - t * 0.13), 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    if (o.flight) { ctx.shadowColor = 'rgba(255,255,255,.85)'; ctx.shadowBlur = 12; }
    var g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.15, x, y, r);
    g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#c7d2dc');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.restore();
  }

  /* ---- TRAJECTORY (ground/driven/lofted/shot) -----------------------------
   * kind: 'ground' dashed | 'driven' solid+arrow | 'lofted' curved arc |
   *       'shot' bold+glow. progress 0..1 animates a live ball along the path;
   *       ghost:true drops a lead-ball target ring at the end (where a run meets it). */
  function trajectory(ctx, f, from, to, o) {
    o = o || {};
    var A = f.px(from.x, from.y), B = f.px(to.x, to.y);
    var kind = o.kind || 'ground';
    var col = o.color || (kind === 'shot' ? '#FFB020' : (o.accent || '#A78BFA'));
    var ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    var lift = kind === 'lofted' ? Math.hypot(B[0] - A[0], B[1] - A[1]) * 0.22 : 0;
    // control point for a quadratic arc (lofted lifts perpendicular)
    var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
    var cx = mx - Math.sin(ang) * 0 + 0, cy = my - lift;
    function at(tt) {
      if (kind === 'lofted') {
        var u = 1 - tt;
        return [u * u * A[0] + 2 * u * tt * cx + tt * tt * B[0], u * u * A[1] + 2 * u * tt * cy + tt * tt * B[1]];
      }
      return [A[0] + (B[0] - A[0]) * tt, A[1] + (B[1] - A[1]) * tt];
    }
    ctx.save();
    ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (kind === 'ground') { ctx.lineWidth = Math.max(1.6, f.m(0.06)); ctx.setLineDash([5, 6]); ctx.globalAlpha = 0.7; }
    else if (kind === 'driven') { ctx.lineWidth = Math.max(2.4, f.m(0.09)); ctx.shadowColor = col; ctx.shadowBlur = 8; }
    else if (kind === 'lofted') { ctx.lineWidth = Math.max(2, f.m(0.07)); ctx.setLineDash([2, 7]); ctx.globalAlpha = 0.85; }
    else if (kind === 'shot') { ctx.lineWidth = Math.max(3, f.m(0.12)); ctx.shadowColor = col; ctx.shadowBlur = 12; }
    ctx.beginPath(); ctx.moveTo(A[0], A[1]);
    if (kind === 'lofted') ctx.quadraticCurveTo(cx, cy, B[0], B[1]); else ctx.lineTo(B[0], B[1]);
    ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    // arrowhead for driven/shot
    if (kind === 'driven' || kind === 'shot') {
      var hl = Math.max(9, f.m(0.7)), tip = at(1), ea = kind === 'lofted' ? ang : ang;
      ctx.fillStyle = col; ctx.beginPath();
      ctx.moveTo(tip[0], tip[1]);
      ctx.lineTo(tip[0] - Math.cos(ea - 0.5) * hl, tip[1] - Math.sin(ea - 0.5) * hl);
      ctx.lineTo(tip[0] - Math.cos(ea + 0.5) * hl, tip[1] - Math.sin(ea + 0.5) * hl);
      ctx.closePath(); ctx.fill();
    }
    // lead-ball ghost target (dashed ring where the run should meet the ball)
    if (o.ghost) {
      var gp = at(1);
      ctx.strokeStyle = col; ctx.globalAlpha = 0.8; ctx.lineWidth = Math.max(1.4, f.m(0.05));
      ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(gp[0], gp[1], f.ballR * 1.7, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
    // live ball riding the path
    if (o.progress != null) { var p = at(Math.max(0, Math.min(1, o.progress))); ball(ctx, { px: function () { return p; }, ballR: f.ballR }, 0, 0, { flight: true, r: o.ballR }); }
    return at;
  }

  /* ---- ENGAGE RING (pulsing tap / selected target) ------------------------*/
  function engage(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1];
    var base = o.r || f.r + 6, pulse = o.pulse == null ? 0 : o.pulse;
    var col = o.color || o.accent || '#A78BFA';
    ctx.save();
    ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, f.m(0.08));
    ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(x, y, base, 0, 7); ctx.stroke();
    // expanding echo
    ctx.globalAlpha = 0.5 * (1 - pulse); ctx.beginPath(); ctx.arc(x, y, base + pulse * 12, 0, 7); ctx.stroke();
    // corner ticks for a "targeted" read
    if (o.ticks !== false) {
      ctx.globalAlpha = 0.95; ctx.lineWidth = Math.max(2, f.m(0.09));
      var tk = base * 0.5;
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) {
        var ox = x + s[0] * (base + 5), oy = y + s[1] * (base + 5);
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox - s[0] * tk, oy); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - s[1] * tk); ctx.stroke();
      });
    }
    ctx.restore();
  }

  /* ---- DIRECTION ARROW (choice / movement cue) ----------------------------*/
  function arrow(ctx, f, nx, ny, angle, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1];
    var len = o.len || f.r * 2.2, col = o.color || o.accent || '#A78BFA';
    var ex = x + Math.cos(angle) * len, ey = y + Math.sin(angle) * len, hl = Math.max(9, f.m(0.7));
    ctx.save();
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(2.4, f.m(0.1)); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.glow) { ctx.shadowColor = col; ctx.shadowBlur = 9; }
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke(); ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.moveTo(ex, ey);
    ctx.lineTo(ex - Math.cos(angle - 0.5) * hl, ey - Math.sin(angle - 0.5) * hl);
    ctx.lineTo(ex - Math.cos(angle + 0.5) * hl, ey - Math.sin(angle + 0.5) * hl);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  /* ---- SPACE / ZONE MARKER (where to move; heat blob + crosshair) ---------*/
  function zone(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1];
    var rad = o.r || f.r * 2.2, col = o.color || COL.free;
    ctx.save();
    var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, hexA(col, 0.34)); g.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    // crosshair
    ctx.strokeStyle = col; ctx.globalAlpha = 0.85; ctx.lineWidth = Math.max(1.4, f.m(0.05));
    var c = rad * 0.42;
    ctx.beginPath(); ctx.moveTo(x - c, y); ctx.lineTo(x + c, y); ctx.moveTo(x, y - c); ctx.lineTo(x, y + c); ctx.stroke();
    ctx.restore();
  }

  /* ---- BADGE (decision chip pinned above a token: SHOOT / PASS / HOLD) ----*/
  function badge(ctx, f, nx, ny, text, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1] - (o.dy || f.r + 14);
    var col = o.color || o.accent || '#A78BFA';
    var fs = o.font || Math.max(9, f.font * 0.95);
    ctx.save(); ctx.font = "800 " + fs + "px 'IBM Plex Mono'";
    var tw = ctx.measureText(text).width, padX = fs * 0.7, w = tw + padX * 2, h = fs + fs * 0.7;
    var rx = x - w / 2, ry = y - h / 2, rr = h / 2;
    // pill
    ctx.fillStyle = o.solid ? col : 'rgba(6,10,18,.9)';
    ctx.strokeStyle = col; ctx.lineWidth = 1.5;
    roundRect(ctx, rx, ry, w, h, rr); ctx.fill(); ctx.stroke();
    // pointer to the token
    ctx.fillStyle = o.solid ? col : 'rgba(6,10,18,.9)';
    ctx.beginPath(); ctx.moveTo(x - 4, ry + h); ctx.lineTo(x + 4, ry + h); ctx.lineTo(x, ry + h + 5); ctx.closePath(); ctx.fill();
    // text
    ctx.fillStyle = o.solid ? '#06101a' : col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y); ctx.textBaseline = 'alphabetic';
    ctx.restore();
  }

  /* ---- TIMING GAUGE (linear bar with a moving needle + sweet-spot band) ----*/
  function gauge(ctx, f, x, y, w, o) {
    o = o || {}; var h = o.h || 12, col = o.color || o.accent || '#A78BFA';
    ctx.save();
    ctx.fillStyle = 'rgba(10,16,28,.85)'; ctx.strokeStyle = 'rgba(120,140,166,.4)'; ctx.lineWidth = 1;
    roundRect(ctx, x, y, w, h, h / 2); ctx.fill(); ctx.stroke();
    // sweet-spot band
    var s0 = (o.band ? o.band[0] : 0.62), s1 = (o.band ? o.band[1] : 0.82);
    ctx.fillStyle = hexA(COL.free, 0.55); roundRect(ctx, x + w * s0, y, w * (s1 - s0), h, h / 3); ctx.fill();
    // needle
    var p = Math.max(0, Math.min(1, o.progress == null ? 0.5 : o.progress));
    ctx.fillStyle = '#EAF2FB'; ctx.strokeStyle = col; ctx.lineWidth = 2;
    var nx2 = x + w * p; ctx.beginPath(); ctx.moveTo(nx2, y - 3); ctx.lineTo(nx2, y + h + 3); ctx.stroke();
    ctx.beginPath(); ctx.arc(nx2, y + h / 2, h * 0.42, 0, 7); ctx.fill();
    ctx.restore();
  }

  /* ---- SPACE & PRESSURE ---------------------------------------------------*/
  // Cover shadow: the lane/wedge a defender cuts off (toward our goal, or toward a point)
  function coverShadow(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1];
    var ang;
    if (o.toward) { var T = f.px(o.toward.x, o.toward.y); ang = Math.atan2(T[1] - y, T[0] - x); }
    else { ang = f.orient === 'ew' ? (f.attackDir === 'rtl' ? 0 : Math.PI) : (f.attackDir === 'rtl' ? Math.PI / 2 : -Math.PI / 2); }
    var reach = f.m((o.reach != null ? o.reach : 0.22) * L);
    var spread = o.spread != null ? o.spread : 0.5, col = o.color || COL.them;
    ctx.save();
    var g = ctx.createRadialGradient(x, y, 0, x, y, reach);
    g.addColorStop(0, hexA(col, o.strength != null ? o.strength : 0.3)); g.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, reach, ang - spread, ang + spread); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  // Pressure: tightening red rings around a pressed player (intensity 0..1)
  function pressure(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1] - (o.dy || 0);
    var inten = o.intensity == null ? 0.6 : o.intensity, col = o.color || COL.them, base = (o.r || f.r) + 4;
    ctx.save();
    for (var i = 0; i < 3; i++) {
      ctx.strokeStyle = hexA(col, (0.55 - i * 0.15) * (0.4 + 0.6 * inten));
      ctx.lineWidth = Math.max(1.5, f.m(0.06));
      ctx.beginPath(); ctx.arc(x, y, base + i * (8 - inten * 4), 0, 7); ctx.stroke();
    }
    ctx.restore();
  }
  // Blocked lane: dashed red pass with an interception X at the block point
  function laneBlocked(ctx, f, from, to, o) {
    o = o || {}; var A = f.px(from.x, from.y), B = f.px(to.x, to.y);
    var t = o.at == null ? 0.5 : o.at, mx = A[0] + (B[0] - A[0]) * t, my = A[1] + (B[1] - A[1]) * t;
    ctx.save();
    ctx.strokeStyle = hexA(COL.them, 0.7); ctx.lineWidth = Math.max(1.6, f.m(0.06)); ctx.setLineDash([5, 6]);
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
    var s = Math.max(6, f.m(0.55));
    ctx.strokeStyle = COL.them; ctx.lineWidth = Math.max(2.4, f.m(0.1)); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(mx - s, my - s); ctx.lineTo(mx + s, my + s); ctx.moveTo(mx + s, my - s); ctx.lineTo(mx - s, my + s); ctx.stroke();
    ctx.lineCap = 'butt'; ctx.restore();
  }

  /* ---- RUN (off-ball movement path — chevrons, optional curve) ------------*/
  function run(ctx, f, from, to, o) {
    o = o || {}; var A = f.px(from.x, from.y), B = f.px(to.x, to.y);
    var col = o.color || COL.us, curve = o.curve || 0;
    var ang = Math.atan2(B[1] - A[1], B[0] - A[0]), dist = Math.hypot(B[0] - A[0], B[1] - A[1]);
    var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
    var cx = mx - Math.sin(ang) * curve * dist, cy = my + Math.cos(ang) * curve * dist;
    function at(tt) { var u = 1 - tt; return [u * u * A[0] + 2 * u * tt * cx + tt * tt * B[0], u * u * A[1] + 2 * u * tt * cy + tt * tt * B[1]]; }
    ctx.save();
    ctx.strokeStyle = hexA(col, 0.85); ctx.lineWidth = Math.max(1.6, f.m(0.06)); ctx.setLineDash([2, 7]); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.quadraticCurveTo(cx, cy, B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = col;
    for (var k = 1; k <= 3; k++) {
      var tt = k / 4, p = at(tt), p2 = at(Math.min(1, tt + 0.02)), a2 = Math.atan2(p2[1] - p[1], p2[0] - p[0]), hl = Math.max(5, f.m(0.42));
      ctx.beginPath(); ctx.moveTo(p[0] + Math.cos(a2) * hl, p[1] + Math.sin(a2) * hl);
      ctx.lineTo(p[0] + Math.cos(a2 + 2.4) * hl, p[1] + Math.sin(a2 + 2.4) * hl);
      ctx.lineTo(p[0] + Math.cos(a2 - 2.4) * hl, p[1] + Math.sin(a2 - 2.4) * hl);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore(); return at;
  }

  /* ---- BALL IN THE AIR (detached ground shadow sells the height) ----------*/
  function ballHigh(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1];
    var h = o.height == null ? 0.5 : Math.max(0, Math.min(1, o.height)), r = o.r || f.ballR, lift = r * 4 * h;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,' + (0.34 - 0.14 * h) + ')';
    ctx.beginPath(); ctx.ellipse(x, y, r * (1 + 0.3 * h), r * (0.5 + 0.2 * h), 0, 0, 7); ctx.fill();
    ctx.restore();
    ball(ctx, { px: function () { return [x, y - lift]; }, ballR: f.ballR }, 0, 0, { flight: true, r: r * (1 + 0.15 * h) });
  }

  /* ---- COUNTDOWN (radial decision clock; turns red when low) --------------*/
  function countdown(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1], r = o.r || f.r + 8;
    var p = Math.max(0, Math.min(1, o.progress == null ? 1 : o.progress)), col = o.color || o.accent || '#A78BFA';
    ctx.save();
    ctx.strokeStyle = 'rgba(120,140,166,.3)'; ctx.lineWidth = Math.max(2.4, f.m(0.1));
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke();
    ctx.strokeStyle = p < 0.3 ? '#FF5A6E' : col; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); ctx.stroke();
    ctx.lineCap = 'butt'; ctx.restore();
  }

  /* ---- VERDICT (feedback: correct / wrong / missed) -----------------------*/
  function verdict(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1], kind = o.kind || 'correct', r = o.r || f.r + 6;
    var col = kind === 'correct' ? COL.free : kind === 'wrong' ? '#FF5A6E' : '#FFB020';
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(2.4, f.m(0.1)); ctx.lineCap = 'round';
    if (kind === 'missed') ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    var s = r * 0.5;
    if (kind === 'correct') { ctx.beginPath(); ctx.moveTo(x - s * 0.7, y); ctx.lineTo(x - s * 0.1, y + s * 0.6); ctx.lineTo(x + s * 0.8, y - s * 0.6); ctx.stroke(); }
    else if (kind === 'wrong') { ctx.beginPath(); ctx.moveTo(x - s * 0.6, y - s * 0.6); ctx.lineTo(x + s * 0.6, y + s * 0.6); ctx.moveTo(x + s * 0.6, y - s * 0.6); ctx.lineTo(x - s * 0.6, y + s * 0.6); ctx.stroke(); }
    ctx.lineCap = 'butt'; ctx.restore();
  }

  /* ---- GRID (positional reference: channels / thirds / zone 14) -----------*/
  function grid(ctx, f, o) {
    o = o || {};
    ctx.save(); ctx.beginPath(); ctx.rect(f.ox, f.oy, f.drawW, f.drawH); ctx.clip();
    var seg = function (ax, ay, bx, by, col, dash) { var A = f.px(ax, ay), B = f.px(bx, by); ctx.strokeStyle = col; ctx.lineWidth = 1; if (dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]); };
    if (o.channels) {
      [0.211, 0.368, 0.632, 0.789].forEach(function (yy) { seg(0, yy, 1, yy, 'rgba(120,180,220,.16)', [4, 6]); });
      var A = f.px(0, 0.368), B = f.px(1, 0.632); ctx.fillStyle = 'rgba(120,180,220,.05)'; ctx.fillRect(Math.min(A[0], B[0]), Math.min(A[1], B[1]), Math.abs(B[0] - A[0]), Math.abs(B[1] - A[1]));
    }
    if (o.thirds) { [1 / 3, 2 / 3].forEach(function (xx) { seg(xx, 0, xx, 1, 'rgba(120,180,220,.18)', [4, 6]); }); }
    if (o.zone14) {
      var acc = o.accent || '#A78BFA', a = f.px(0.63, 0.37), b = f.px(0.75, 0.63);
      var rx = Math.min(a[0], b[0]), ry = Math.min(a[1], b[1]), rw = Math.abs(b[0] - a[0]), rh = Math.abs(b[1] - a[1]);
      ctx.fillStyle = hexA(acc, 0.16); ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = hexA(acc, 0.55); ctx.setLineDash([3, 4]); ctx.strokeRect(rx, ry, rw, rh); ctx.setLineDash([]);
    }
    ctx.restore();
  }

  /* ==== GOALKEEPER ========================================================*/
  // Shooting angle: cone from ball to both posts + optimal-position bisector
  function angleCone(ctx, f, ballPt, o) {
    o = o || {}; var end = o.end == null ? 1 : o.end, gw = 7.32 / WD, col = o.color || '#22D3EE';
    var P0 = f.px(end, 0.5 - gw / 2), P1 = f.px(end, 0.5 + gw / 2), B = f.px(ballPt.x, ballPt.y);
    ctx.save();
    ctx.fillStyle = hexA(col, 0.13);
    ctx.beginPath(); ctx.moveTo(B[0], B[1]); ctx.lineTo(P0[0], P0[1]); ctx.lineTo(P1[0], P1[1]); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = hexA(col, 0.4); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(B[0], B[1]); ctx.lineTo(P0[0], P0[1]); ctx.moveTo(B[0], B[1]); ctx.lineTo(P1[0], P1[1]); ctx.stroke();
    if (o.optimal) {
      var mid = [(P0[0] + P1[0]) / 2, (P0[1] + P1[1]) / 2];
      ctx.strokeStyle = hexA(col, 0.65); ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(B[0], B[1]); ctx.lineTo(mid[0], mid[1]); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
  }
  // Dive / reach footprint around the keeper
  function keeperReach(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1], col = o.color || '#22D3EE';
    var rad = f.m((o.reach != null ? o.reach : 0.06) * L);
    ctx.save();
    var g = ctx.createRadialGradient(x, y, rad * 0.3, x, y, rad);
    g.addColorStop(0, hexA(col, 0.22)); g.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    ctx.strokeStyle = hexA(col, 0.5); ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
  }
  // Command / press radius (dashed circle of influence)
  function radius(ctx, f, nx, ny, o) {
    o = o || {}; var P = f.px(nx, ny), x = P[0], y = P[1], col = o.color || o.accent || '#A78BFA';
    var rad = f.m((o.reach != null ? o.reach : 0.09) * L);
    ctx.save(); ctx.fillStyle = hexA(col, 0.08); ctx.strokeStyle = hexA(col, 0.55);
    ctx.lineWidth = Math.max(1.5, f.m(0.05)); ctx.setLineDash([5, 6]);
    ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  }
  // Front-elevation goal with target-zone grid (penalty / shot-stopping views)
  function goalFace(ctx, box, o) {
    o = o || {}; var x = box.x, y = box.y, w = box.w, h = box.h, cols = o.cols || 3, rows = o.rows || 2;
    ctx.save();
    ctx.fillStyle = 'rgba(150,185,215,.05)'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(150,185,215,.13)'; ctx.lineWidth = 1;
    for (var i = 1; i < cols * 3; i++) { var gx = x + w * i / (cols * 3); ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); }
    for (var j = 1; j < rows * 3; j++) { var gy = y + h * j / (rows * 3); ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(120,180,220,.2)'; ctx.setLineDash([4, 5]);
    for (var c = 1; c < cols; c++) { var cx = x + w * c / cols; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx, y + h); ctx.stroke(); }
    for (var rr = 1; rr < rows; rr++) { var cy = y + h * rr / rows; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x + w, cy); ctx.stroke(); }
    ctx.setLineDash([]);
    if (o.zone != null) {
      var zc = o.zone % cols, zr = Math.floor(o.zone / cols), zcol = o.zoneColor || '#FFB020';
      ctx.fillStyle = hexA(zcol, 0.2); ctx.fillRect(x + w * zc / cols, y + h * zr / rows, w / cols, h / rows);
      ctx.strokeStyle = zcol; ctx.setLineDash([3, 4]); ctx.strokeRect(x + w * zc / cols, y + h * zr / rows, w / cols, h / rows); ctx.setLineDash([]);
    }
    ctx.strokeStyle = 'rgba(232,242,252,.9)'; ctx.lineWidth = Math.max(3, h * 0.05); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h); ctx.stroke();
    ctx.lineCap = 'butt'; ctx.restore();
    return box;
  }
  // Keeper figure (front elevation) with dive lean/reach (-1 left .. +1 right)
  function keeperFront(ctx, cx, baseY, gh, o) {
    o = o || {}; var dive = o.dive || 0, h = gh * 0.66, w = h * 0.32, x = cx + dive * gh * 0.85;
    ctx.save();
    var g = ctx.createLinearGradient(x, baseY - h, x, baseY); g.addColorStop(0, '#EAFBFF'); g.addColorStop(1, '#8fd8e6');
    ctx.strokeStyle = 'rgba(6,16,20,.5)'; ctx.lineWidth = 1.5; ctx.fillStyle = g;
    roundRect(ctx, x - w / 2, baseY - h, w, h, w * 0.42); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, baseY - h - w * 0.36, w * 0.34, 0, 7); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = g; ctx.lineWidth = Math.max(3, w * 0.42); ctx.lineCap = 'round';
    var sy = baseY - h * 0.78, reach = w * 0.7 + Math.abs(dive) * gh * 0.55, up = Math.abs(dive) * h * 0.45;
    ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x - reach * (dive <= 0 ? 1.25 : 0.55), sy - (dive < 0 ? up : h * 0.3)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x + reach * (dive >= 0 ? 1.25 : 0.55), sy - (dive > 0 ? up : h * 0.3)); ctx.stroke();
    ctx.lineCap = 'butt'; ctx.restore();
  }

  /* ==== DEFENDING =========================================================*/
  // Connect a unit (back line / midfield line); offside:true = amber dashed
  function line(ctx, f, pts, o) {
    o = o || {}; if (!pts || pts.length < 2) return;
    var col = o.offside ? '#FFB020' : (o.color || COL.us);
    ctx.save(); ctx.strokeStyle = hexA(col, o.offside ? 0.9 : 0.5); ctx.lineWidth = Math.max(1.6, f.m(0.06));
    if (o.offside) ctx.setLineDash([6, 5]);
    ctx.beginPath(); pts.forEach(function (p, i) { var P = f.px(p.x, p.y); i ? ctx.lineTo(P[0], P[1]) : ctx.moveTo(P[0], P[1]); }); ctx.stroke();
    ctx.setLineDash([]); ctx.restore();
  }
  // Marking tether (defender -> attacker)
  function marking(ctx, f, from, to, o) {
    o = o || {}; var A = f.px(from.x, from.y), B = f.px(to.x, to.y), col = o.color || COL.them;
    ctx.save(); ctx.strokeStyle = hexA(col, 0.6); ctx.lineWidth = Math.max(1.4, f.m(0.05)); ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  }
  // Team shape / block / pressing trap (shaded polygon of points)
  function block(ctx, f, pts, o) {
    o = o || {}; if (!pts || pts.length < 3) return; var col = o.color || '#22D3EE';
    ctx.save(); ctx.fillStyle = hexA(col, 0.1); ctx.strokeStyle = hexA(col, 0.4); ctx.lineWidth = 1.5; if (o.dash) ctx.setLineDash([5, 6]);
    ctx.beginPath(); pts.forEach(function (p, i) { var P = f.px(p.x, p.y); i ? ctx.lineTo(P[0], P[1]) : ctx.moveTo(P[0], P[1]); }); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.setLineDash([]); ctx.restore();
  }
  // Gap / distance measure with end-ticks + label
  function gap(ctx, f, from, to, o) {
    o = o || {}; var A = f.px(from.x, from.y), B = f.px(to.x, to.y), col = o.color || '#FFB020';
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.4, f.m(0.05)); ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
    var ang = Math.atan2(B[1] - A[1], B[0] - A[0]) + Math.PI / 2, tk = Math.max(4, f.m(0.4));
    [A, B].forEach(function (P) { ctx.beginPath(); ctx.moveTo(P[0] + Math.cos(ang) * tk, P[1] + Math.sin(ang) * tk); ctx.lineTo(P[0] - Math.cos(ang) * tk, P[1] - Math.sin(ang) * tk); ctx.stroke(); });
    if (o.label) { var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2; ctx.fillStyle = col; ctx.font = "700 " + Math.max(8, f.font * 0.9) + "px 'IBM Plex Mono'"; ctx.textAlign = 'center'; ctx.fillText(o.label, mx + 8, my); }
    ctx.restore();
  }

  // ---- small helpers ----
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function hexA(hex, a) {
    if (hex[0] !== '#') return hex;
    var n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  var API = { fit: fit, pitch: pitch, goal: goal, grid: grid, passLane: passLane, trajectory: trajectory, coverShadow: coverShadow, pressure: pressure, laneBlocked: laneBlocked, run: run, token: token, chevron: chevron, ball: ball, ballHigh: ballHigh, engage: engage, arrow: arrow, zone: zone, badge: badge, gauge: gauge, countdown: countdown, verdict: verdict, angleCone: angleCone, keeperReach: keeperReach, radius: radius, goalFace: goalFace, keeperFront: keeperFront, line: line, marking: marking, block: block, gap: gap, CROPS: CROPS, COL: COL, L: L, WD: WD };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.FAPitch = API;
})(typeof window !== 'undefined' ? window : this);
