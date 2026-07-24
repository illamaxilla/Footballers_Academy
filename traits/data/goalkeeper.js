/* GOALKEEPER — unique trait vocabulary + archetype pentads.
   The five shapes are read through a keeper's lens:
   MOTOR = the athlete in the frame · TECHNIQUE = handling + distribution ·
   VISION = the read · IMPACT = what he denies and what he starts · SPIRIT = the character in the box.
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['goalkeeper'] = {
  key:'goalkeeper', label:'GOALKEEPER', accent:'#22D3EE',
  archLabel:'THE LAST WORD',
  attrs:{
    // MOTOR △ — the athlete in the frame
    gk_reflex:   {cat:'motor', name:'Reflex Spring', def:'The involuntary coil that flings him at a shot struck from six yards.', sym:'burst'},
    gk_dive:     {cat:'motor', name:'Dive Reach',    def:'Full-stretch to claw a ball out of the top corner and land clean.', svg:'<circle cx="17.5" cy="6" r="2.2"/><path d="M15.6 7.4 7.5 15.5"/><path d="M11.5 11.4 6 9.5"/><path d="M9.6 13 5 17.5"/><circle cx="4" cy="18.8" r="1.5"/>'},
    gk_quickset: {cat:'motor', name:'Quick Set',     def:'Tiny, rapid steps — set and still the instant the striker shoots.', sym:'pistons'},
    gk_highspring:{cat:'motor', name:'Highest Point',def:'Rises off both feet to take the ball at its very highest point.', sym:'jump'},
    gk_offline:  {cat:'motor', name:'Off The Line',  def:'The explosive first stride that eats the ground between him and a striker.', sym:'speedo'},
    gk_recover:  {cat:'motor', name:'Scramble Back', def:'Beaten once, he twists and scrambles to get a second body in the way.', sym:'returnloop'},
    // TECHNIQUE ◆ — handling + distribution
    gk_hands:    {cat:'technique', name:'Safe Hands', def:'Catches everything cleanly and makes it stick — no rebounds, no second chances.', sym:'gloves'},
    gk_parry:    {cat:'technique', name:'Parry',      def:'Cannot hold it, so he steers the spill wide — never back into danger.', svg:'<path d="M5 20v-5.5a1.6 1.6 0 0 1 3.2 0V13a1.6 1.6 0 0 1 3.2 0v.4a1.6 1.6 0 0 1 3.2 0V19a2 2 0 0 1-2 2z"/><circle cx="18.5" cy="6.5" r="1.9"/><path d="M15 11c2.2-1 3.4-2.4 4-4.2" stroke-dasharray="1.4 1.7"/>'},
    gk_feet:     {cat:'technique', name:'Sweeper Feet',def:'Comfortable as an outfielder — takes a touch under pressure and plays out.', sym:'boxctrl'},
    gk_bothfeet: {cat:'technique', name:'Either Boot', def:'Strikes it just as cleanly off the weaker side, so the press never traps him.', sym:'bothfeet'},
    gk_throw:    {cat:'technique', name:'The Release', def:'The bowled throw that finds a full-back before the shape resets.', sym:'launch'},
    gk_longkick: {cat:'technique', name:'Driven Kick', def:'A flat, driven goal-kick that clears the halfway line and hits a chest.', sym:'bootstrike'},
    // VISION ▪ — the read
    gk_anticip:  {cat:'vision', name:'Anticipation', def:'Reads the striker\'s hips and starts to move a beat before the ball is hit.', sym:'radar'},
    gk_angles:   {cat:'vision', name:'Narrow The Angle', def:'Steps to the exact spot that leaves the shooter almost no goal to aim at.', svg:'<path d="M6 5v3M18 5v3"/><path d="M6 6h12"/><path d="M7.5 8 12 19l4.5-11"/><circle cx="12" cy="9.2" r="1.3" fill="currentColor" stroke="none"/>'},
    gk_throughball:{cat:'vision', name:'Read The Line', def:'Sees the through-ball forming and decides early — hold, or come and claim.', sym:'eye'},
    gk_wall:     {cat:'vision', name:'Marshal The Wall', def:'Sets the wall and his own position for the free-kick in one calm shout.', svg:'<path d="M5 20v-6a2 2 0 0 1 4 0v6M10 20v-6a2 2 0 0 1 4 0v6M15 20v-6a2 2 0 0 1 4 0v6"/><circle cx="7" cy="9" r="1.3"/><circle cx="12" cy="9" r="1.3"/><circle cx="17" cy="9" r="1.3"/><path d="M3 20h18"/>'},
    gk_focus:    {cat:'vision', name:'Ninety-Minute Focus', def:'Untouched for an hour, then makes the save as if he\'d been busy all game.', sym:'focusframe'},
    gk_position: {cat:'vision', name:'Positioning',  def:'Right place, off his line — half his saves are made before the shot.', sym:'crossgrid'},
    // IMPACT ⬡ — what he denies, what he starts
    gk_shotstop: {cat:'impact', name:'Shot-Stopping', def:'The point-blank, out-of-nothing save that has no business being made.', sym:'handball'},
    gk_smother:  {cat:'impact', name:'The Smother',  def:'Spreads big and swallows the ball at the striker\'s feet in the one-on-one.', svg:'<circle cx="12" cy="5.4" r="2.1"/><path d="M12 7.5v6"/><path d="M12 10 5 14M12 10l7 4"/><path d="M12 13.5 8 20M12 13.5 16 20"/>'},
    gk_claim:    {cat:'impact', name:'Claim The Cross', def:'Comes through a crowd, takes the cross at its peak and kills the danger.', sym:'claim'},
    gk_sweep:    {cat:'impact', name:'Sweeper Cover', def:'Patrols behind the high line and mops up before the runner arrives.', sym:'shieldtick'},
    gk_break:    {cat:'impact', name:'Launch The Break', def:'Turns a save into a chance — the first pass that catches them stretched.', sym:'longarc'},
    gk_tipover:  {cat:'impact', name:'Tip-Over',     def:'The last-second fingertip that lifts a dipping shot onto the bar and away.', svg:'<path d="M4 7h16"/><path d="M4 7v2.5M20 7v2.5"/><path d="M6 20c0-7 3.6-11 6-11s6 4 6 11" stroke-dasharray="1.4 1.6"/><circle cx="12" cy="4.4" r="1.8"/>'},
    // SPIRIT ⯃ — the character in the box
    gk_command:  {cat:'spirit', name:'Command Of The Area', def:'His shout owns the eighteen yards — defenders move to his voice, not their own.', sym:'armband'},
    gk_brave:    {cat:'spirit', name:'Bravery At Feet', def:'Dives in at boots and studs without a flinch to smother the loose ball.', sym:'heart'},
    gk_composure:{cat:'spirit', name:'Composure',    def:'Calm under the swirling cross and the hurried back-pass with a man closing.', sym:'level'},
    gk_consist:  {cat:'spirit', name:'Consistency',  def:'No horror shows, no cheap goals — a dependable eight out of ten every week.', sym:'evenbars'},
    gk_clutch:   {cat:'spirit', name:'Big-Save Clutch', def:'The bigger the moment, the bigger the save — thrives when it is 1-0 and late.', sym:'flame'},
    gk_dominate: {cat:'spirit', name:'Rules His Box', def:'Strikers know the ball is his — they stop attacking the crosses he owns.', sym:'padlock'},
  },
  archetypes:[
    {id:'oracle',   name:'The Oracle',   tag:'reads it a beat early',        five:{motor:'gk_offline',   technique:'gk_feet',     vision:'gk_anticip',    impact:'gk_sweep',    spirit:'gk_composure'}},
    {id:'sentinel', name:'The Sentinel', tag:'commands and organises',       five:{motor:'gk_quickset',  technique:'gk_bothfeet', vision:'gk_wall',       impact:'gk_claim',    spirit:'gk_command'}},
    {id:'catalyst', name:'The Catalyst', tag:'starts the attack from the back', five:{motor:'gk_recover', technique:'gk_longkick', vision:'gk_throughball',impact:'gk_break',    spirit:'gk_consist'}},
    {id:'bastion',  name:'The Bastion',  tag:'lightning shot-stopping',      five:{motor:'gk_reflex',    technique:'gk_parry',    vision:'gk_angles',     impact:'gk_shotstop', spirit:'gk_clutch'}},
    {id:'wall',     name:'The Wall',     tag:'fills the goal, rules the air',five:{motor:'gk_highspring',technique:'gk_hands',    vision:'gk_position',   impact:'gk_tipover',  spirit:'gk_dominate'}},
  ],
};
