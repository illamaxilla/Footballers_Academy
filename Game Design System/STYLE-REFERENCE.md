# Footballer's Academy — Game Visual Reference

The **north star** for every game's look is `reference-scene-lab.png`
(source: `attacking-midfielder/Scene-Lab.dc.html`). The AM module is the
best-looking one we have; this doc captures what makes it work so every other
module can be brought up to it.

## The "cockpit" layout (from Scene Lab)
- **Field is the hero.** One large pitch panel takes the whole left / centre.
- **Engagement + readout live in a rail to the right** (or below, on narrow
  screens): scene title + tags, toggles / controls, and a numeric readout block.
- Top bar: `‹ Back` · centered wordmark · status chip (e.g. `10 SCENES · VALID`).
- Everything sits on the navy radial-gradient bg with corner brackets + ambient
  scanline. Cards: `background:rgba(10,16,28,.5)`, `border:1px solid rgba(120,140,166,.2)`.

## The pitch itself (minimalist, "chalk on navy")
- Fill: `linear-gradient(#0d1c2e → #091324 → #050c17)` (or the radial pitch var).
- Markings only, drawn thin in faint cyan `rgba(90,150,190,.12)`, ~1.3px:
  halfway line, centre circle, two penalty boxes. Nothing else. No grass stripes,
  no logos, no clutter. `ATTACK →` micro-label in a corner.
- Players are **labelled tokens**, position on the token (GK/CB/DM/AM/LW…):
  - teammate = cyan disc `#3aa8c4` with a soft drop-shadow ellipse + dark label.
  - carrier = accent-filled disc (purple `#A78BFA`), dark label.
  - opponent = **red chevron** `#FF5A6E` pointing at our goal + faint red role label.
  - free man = pulsing green halo `#3BE07A`; best-pass target = accent ring.
- **Ball** (the animation everyone likes): white radial-gradient dot
  (`createRadialGradient` white→grey) with a white glow (`shadowBlur` 10–12) while
  in flight; rests at the carrier's foot otherwise. Flight is interpolated over
  real ms with a small back-lift "bob" before contact (`_ballAt(c)` in The Freeze).

## Type & color (project-wide, non-negotiable)
- Archivo (display/body) + IBM Plex Mono (labels/readouts, letter-spaced caps).
- Accent via `--accent` / `accent` prop. Text `#EAF2FB / #9FB0C5 / #7688a0 / #61748c`.
- Semantic: green `#3BE07A` (free/good), amber `#FFB020` (chance/warn),
  red `#FF5A6E` (danger/opponent).

## The problem to fix (why even AM can be better)
The canvas mapping is `_px(nx,ny)` with **equal padding on all four sides**
(`pad = min(W,H)*0.075`). On a wide panel that leaves big dead bands left/right;
on a tall panel, top/bottom. **The field never fills the available view.**

### The fix: aspect-aware pitch fitting
1. **Orient to the panel.** A real pitch is ~1.55:1. If the panel is landscape,
   draw attack **left→right**; if portrait, **rotate** so attack runs **bottom→top**.
   Always pick the orientation that fills more of the box.
2. **Fit, don't pad-square.** Scale the pitch to the panel's short axis and let the
   long axis fill; keep a small uniform inset only for token overflow (~4–5%).
3. **Crop when only part of the pitch matters.** Support `full`, `attacking-half`,
   `final-third`, `box` crops so the relevant action fills the screen (e.g. a
   shooting decision doesn't need our own GK on screen). Tokens/labels scale to the
   crop, not the whole pitch.

## Screen layout archetypes (see `Layout-Kit.dc.html`)
Every game wears the same shell — top bar (`‹ Back` · wordmark · status/sound) and a
`<main>` that swaps screen states via `sc-if` (intro → play → result/done). Only the
**play screen** changes shape. Seven layouts cover the whole suite; pick one per screen:

1. **Cockpit** — field-hero left + readout rail right. Richest; for *inspect* scenes with
   a lot to read. Rail collapses below on narrow. (Scene Lab, Positioning Master.)
2. **Centered Stack** — prompt → centred field → controls, one ~1000px column, `safe
   center`. The workhorse rapid-call layout. (High Pressure, Reaction, Command, Aerial.)
3. **Split Panels** — two views side by side (watch-view + know-view) + full-width control
   strip; panels flex-wrap and stack. (Eye Spy body+goal, Aerial command.)
4. **Focus** — giant dim ghost numeral behind a tight ~620px column (tag, line, sentence,
   one CTA). For intros, count-ins, transitions, embedded done.
5. **Flow / Wizard** — narrow 520–760px card advanced through ordered steps with a progress
   line; each step its own `sc-if`. (Footwork Perfect upload→analyse→confirm→score.)
6. **Results Dashboard** — headline verdict over a wrapping grid (radial score, you-vs-elite
   bars, stat cells, per-attempt strip), max ~900px. Every result screen.
7. **Field Map** — full-bleed pitch, controls float over it as a backdrop-blur card, tokens
   are the interaction. (Position Select, drag-to-position.)

## Recommended shared renderer
Extract the AM pitch/token/ball drawing into one small module
(`Game Design/fa-pitch.js`) so every game draws identically and well:
`fitPitch(W,H,{orient,crop})`, `drawPitch`, `drawToken`, `drawChevron`,
`drawBall`, `drawPassLane`, `drawFreeHalo`. Games keep their own logic; they just
call the shared renderer. Coordinates stay normalised 0..1, so scenes are untouched.
