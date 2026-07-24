/* Footballer's Academy — Trait Symbol Library
   Line-icon vocabulary (24x24 viewBox, stroke=currentColor, no fill unless noted).
   Positions author their OWN traits (unique names + defs) and pick a symbol id from
   here, OR embed a bespoke `svg` string. Shape (category) is set separately; any symbol
   can sit in any shape. Keep icons simple, geometric, football-meaningful — never clip-art. */
window.SYM = {
  // ---- MOTION / athletic ----
  burst:      '<path d="M3 12h4M5 7.5h5M6 16.5h5"/><path d="M11 5l7 7-7 7"/>',
  speedo:     '<path d="M4 19a9 9 0 0 1 16 0"/><path d="M12 19l5-6"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/>',
  zigzag:     '<path d="M5 5l4 5-5 4 5 4"/><path d="M15 4h5v5"/><path d="M20 4l-6 6"/>',
  spin:       '<path d="M18 8a6.5 6.5 0 1 0 1.5 5"/><path d="M18 3.5V8h-4.5"/>',
  jump:       '<path d="M12 3v8"/><path d="M8 7l4-4 4 4"/><path d="M5 21h14"/><path d="M8 21a4 4 0 0 1 8 0"/>',
  barbell:    '<path d="M4 9v6M20 9v6M7.5 7v10M16.5 7v10M7.5 12h9"/>',
  heartbeat:  '<path d="M2 13h3l2-6 3 12 2.5-9 2 5 1.5-2H21"/>',
  beam:       '<path d="M4 19h16"/><path d="M12 5v10"/><circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><path d="M7 19l5-3 5 3"/>',
  returnloop: '<path d="M20 13A8 8 0 1 0 12 21"/><path d="M12 21l-3-3M12 21l3-3"/>',
  glide:      '<path d="M3 9c5-3 8 3 13 0"/><path d="M3 15c5-3 8 3 13 0"/><path d="M14 6l4 3-4 3"/>',
  pistons:    '<path d="M6 4v16M12 4v16M18 4v16"/><path d="M4 9l2-2 2 2M10 15l2 2 2-2M16 9l2-2 2 2"/>',
  lowgravity: '<path d="M12 4v6"/><path d="M8 8l4-4 4 4"/><path d="M4 20a8 4 0 0 1 16 0" stroke-dasharray="1 2"/><circle cx="12" cy="14" r="2"/>',
  // ---- TOUCH / technical ----
  cushion:    '<circle cx="8" cy="7.5" r="3"/><path d="M10.5 9.5c4 2 7.5 5.5 8.5 10"/><path d="M20 19.5l-.8-4-4 1"/>',
  dribble:    '<circle cx="16.5" cy="16.5" r="3"/><path d="M4 4c0 7 4.5 10.5 10 12.5" stroke-dasharray="1.6 2.4"/>',
  swirl:      '<path d="M5 8c5-3 8 3 13 0"/><path d="M6 16c5-3 8 3 13 0"/><path d="M16 5l3 3-3 3"/>',
  bothfeet:   '<circle cx="12" cy="12" r="2.2"/><path d="M8 8a5.5 5.5 0 0 0 0 8"/><path d="M16 8a5.5 5.5 0 0 1 0 8"/>',
  bootstrike: '<circle cx="15.5" cy="8.5" r="3"/><path d="M4 20l7.5-7.5"/><path d="M8.5 6l3 3"/><path d="M18 5l1 1M17 3l1 1"/>',
  boxctrl:    '<rect x="6" y="6" width="12" height="12" rx="1.5"/><circle cx="12" cy="12" r="2"/><path d="M9 9L7 7M15 9l2-2M9 15l-2 2M15 15l2 2"/>',
  wallcurl:   '<circle cx="6" cy="18" r="2"/><path d="M12 8v9M15 8v9M18 8v9"/><path d="M8 17c2-3 4-4 6-4" stroke-dasharray="1.5 1.5"/>',
  fastchev:   '<circle cx="6" cy="12" r="2.5"/><path d="M10 12h5"/><path d="M13 9l3 3-3 3"/><path d="M18 8l2 4-2 4"/>',
  halfturn:   '<circle cx="12" cy="12" r="2"/><path d="M12 5a7 7 0 0 1 6 3.5"/><path d="M18 5v3.5h-3.5"/><path d="M12 19a7 7 0 0 1-6-3.5"/>',
  mask:       '<path d="M3 8c3-1 6-1 9 0 3-1 6-1 9 0v3c0 3-2 5-4.5 5-1.5 0-2.5-1-4.5-1s-3 1-4.5 1C5 16 3 14 3 11z"/><path d="M7 11h.01M17 11h.01"/>',
  // ---- MIND / vision ----
  eye:        '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.4"/>',
  bulb:       '<path d="M12 3a6 6 0 0 0-3.2 11.1V17h6.4v-2.9A6 6 0 0 0 12 3z"/><path d="M10 20h4"/>',
  level:      '<rect x="3" y="9.5" width="18" height="5" rx="2.5"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><path d="M9 12h.01M15 12h.01"/>',
  crossgrid:  '<circle cx="12" cy="12" r="7.5"/><path d="M12 4v16M4 12h16" stroke-dasharray="1.4 2.2"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  stopwatch:  '<circle cx="12" cy="13.5" r="7"/><path d="M12 13.5V9M10 3.5h4M18.5 7l1.5-1.5"/>',
  dashrun:    '<path d="M3 18h5" stroke-dasharray="1.6 2.2"/><path d="M8 18l6.5-9.5"/><path d="M12.5 6h4.5v4.5"/>',
  scales:     '<path d="M12 4v3"/><path d="M5 8h14"/><path d="M5 8l-2.4 4.6a2.4 2.4 0 0 0 4.8 0z"/><path d="M19 8l-2.4 4.6a2.4 2.4 0 0 0 4.8 0z"/><path d="M9 19h6"/><path d="M12 7v12"/>',
  focusframe: '<path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"/><circle cx="12" cy="12" r="2.4"/>',
  radar:      '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12l6-4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
  // ---- OUTPUT / impact ----
  target:     '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
  thread:     '<circle cx="6.5" cy="6.5" r="1.7"/><circle cx="6.5" cy="17.5" r="1.7"/><path d="M5 12h9"/><path d="M13 8l4 4-4 4"/>',
  shieldtick: '<path d="M12 3l7 3v5.5c0 5-4 8-7 9.5-3-1.5-7-4.5-7-9.5V6z"/><path d="M9 12l2 2 4-4.5"/>',
  crossarc:   '<path d="M4 19C7 8 14 5 20 5"/><path d="M16 4.5h4.5V9"/><circle cx="4" cy="19" r="1.4" fill="currentColor" stroke="none"/>',
  header:     '<circle cx="12" cy="5.5" r="2.6"/><path d="M12 8.2v3.3"/><path d="M6.5 20a5.5 5.5 0 0 1 11 0"/>',
  arrowlines: '<path d="M4 8h16M4 16h16"/><path d="M7 12h8"/><path d="M13 8.5l4 3.5-4 3.5"/>',
  progress:   '<path d="M12 20V6"/><path d="M7 11l5-5 5 5"/><path d="M8 20h8" stroke-dasharray="1.4 2"/>',
  longarc:    '<path d="M3 18c6-1.5 10.5-6 12.5-12.5"/><circle cx="17.5" cy="5.5" r="2.4"/><path d="M3 18l.6-3M3 18l3-.6"/>',
  cutback:    '<path d="M20 6c-6 0-10 4-11 9"/><path d="M9 15l-3-1M9 15l1-3"/><circle cx="20" cy="6" r="1.4" fill="currentColor" stroke="none"/>',
  netgoal:    '<path d="M4 5h16v9H4z" stroke-dasharray="2 2"/><path d="M4 14l8 5 8-5"/><circle cx="12" cy="9" r="2.2"/>',
  // ---- SPIRIT / character ----
  reload:     '<path d="M20 6v6h-6"/><path d="M20 12A8 8 0 1 0 18 17"/>',
  heart:      '<path d="M12 20.5S4.5 16 4.5 9.8A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7.5 1.8C19.5 16 12 20.5 12 20.5z"/>',
  star:       '<path d="M12 3l2.4 5.6L20 9l-4 4 1 6-5-3.2L7 19l1-6-4-4 5.6-.4z"/>',
  evenbars:   '<path d="M4 17V13M8.7 17V8M13.3 17V10.5M18 17V6"/><path d="M3 20h18"/>',
  flame:      '<path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3.2 1-3.2s1.8 1.8 3 .8c1.5-1.4-1-4 1-6.6z"/>',
  bolt:       '<path d="M13 3L5 13h5l-1 8 9-11h-6z"/>',
  padlock:    '<rect x="5" y="10.5" width="14" height="8.5" rx="1.4"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  sparkle:    '<path d="M12 4v4M12 16v4M4 12h4M16 12h4"/><path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2"/><circle cx="12" cy="12" r="1.8"/>',
  armband:    '<path d="M7 6v12M17 6v12"/><path d="M7 9c3 2 7 2 10 0M7 13c3 2 7 2 10 0"/>',
  fist:       '<rect x="6" y="9" width="12" height="8" rx="2"/><path d="M8 9V7.5a1.6 1.6 0 0 1 3.2 0V9M11.2 9V6.5a1.6 1.6 0 0 1 3.2 0V9M14.4 9V7.5a1.6 1.6 0 0 1 3.2 0V9"/>',
  // ---- GK-specific ----
  gloves:     '<rect x="5" y="10" width="6" height="9" rx="1.5"/><path d="M6.5 10V6.5a1.5 1.5 0 0 1 3 0V10"/><rect x="13" y="10" width="6" height="9" rx="1.5"/><path d="M14.5 10V6.5a1.5 1.5 0 0 1 3 0V10"/>',
  handball:   '<path d="M5 21v-6.5a1.7 1.7 0 0 1 3.4 0V13a1.7 1.7 0 0 1 3.4 0v.4a1.7 1.7 0 0 1 3.4 0V19a2 2 0 0 1-2 2z"/><circle cx="17" cy="7" r="2.3"/>',
  claim:      '<circle cx="12" cy="6.5" r="2.8"/><path d="M6 20c0-3.5 2.5-5 3-5M18 20c0-3.5-2.5-5-3-5M9 15l3 1.5 3-1.5"/>',
  launch:     '<circle cx="6" cy="8" r="2.2"/><path d="M8 9c4 0 8 3 11 9"/><path d="M15 18h4v-4"/>',
};
