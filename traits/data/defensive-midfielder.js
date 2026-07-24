/* DEFENSIVE MIDFIELDER — unique trait vocabulary + archetype pentads.
   The #6: the screen in front of the back four.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['defensive-midfielder'] = {
  key:'defensive-midfielder', label:'DEFENSIVE MID', accent:'#E0413C',
  archLabel:'THE SCREEN',
  attrs:{
    // MOTOR △
    dm_engine:    {cat:'motor', name:'The Motor',     def:'Covers every blade of grass at the base — box to box and back again.', sym:'pistons'},
    dm_recovery:  {cat:'motor', name:'Recovery Sprint',def:'Turns and sprints forty yards to snuff out the counter before it lands.', sym:'speedo'},
    dm_shuttle:   {cat:'motor', name:'The Shuttle',   def:'Shuffles side to side across the screen, always sliding into the danger.', sym:'glide'},
    dm_spring:    {cat:'motor', name:'Coiled Spring', def:'Explodes out of a set stance the instant the ball is loose.', sym:'burst'},
    dm_relentless:{cat:'motor', name:'Still Hunting', def:'Still hunting, still closing, still covering at ninety minutes.', sym:'heartbeat'},
    dm_slide:     {cat:'motor', name:'The Slide',     def:'The recovery tackle, sliding across to cover the space a team-mate left.', sym:'returnloop'},
    // TECHNIQUE ◆
    dm_halfturn:  {cat:'technique', name:'Spin Free',  def:'Receives on the spin and escapes the press already facing forward.', sym:'halfturn'},
    dm_deaden:    {cat:'technique', name:'Deadening Touch', def:'Kills a bouncing ball under pressure and takes it clean out of his feet.', sym:'cushion'},
    dm_shield:    {cat:'technique', name:'Body Shield', def:'Screens the ball with his frame, back to goal, and waits out the challenge.', sym:'beam'},
    dm_bothfeet:  {cat:'technique', name:'Two-Footed',  def:'Plays out of tight spots and switches the angle off either side.', sym:'bothfeet'},
    dm_switch:    {cat:'technique', name:'Cross-Field', def:'The raking crossfield diagonal that flips the point of attack.', sym:'crossarc'},
    dm_pressresist:{cat:'technique',name:'Press-Resistant', def:'Stays calm and secure with a man climbing all over his back.', sym:'boxctrl'},
    // VISION ▪
    dm_read:      {cat:'vision', name:'Counter-Read',  def:'Sees the counter forming and steps across before the ball is played.', sym:'radar'},
    dm_screen:    {cat:'vision', name:'Screening',     def:'Protects the space in front of the back four so the CBs never get exposed.', sym:'crossgrid'},
    dm_cover:     {cat:'vision', name:'The Cover',     def:'Drops in behind the centre-back who steps out to fill the hole.', sym:'focusframe'},
    dm_scan:      {cat:'vision', name:'Full Picture',  def:'Constant shoulder checks map every runner before he even receives.', sym:'eye'},
    dm_trigger:   {cat:'vision', name:'Pressing Trigger', def:'Knows the exact heavy touch to jump — springs the trap on cue.', sym:'stopwatch'},
    dm_position:  {cat:'vision', name:'The Anchor', def:'Holds the right hole and refuses to be dragged out of shape.', sym:'level'},
    // IMPACT ⬡
    dm_intercept: {cat:'impact', name:'The Interception', def:'Steps into the passing lane and takes it before it ever arrives.', sym:'arrowlines'},
    dm_tackle:    {cat:'impact', name:'The Tackle',    def:'The timed, clean, ball-winning tackle that ends the attack for good.', sym:'shieldtick'},
    dm_break:     {cat:'impact', name:'Break Up Play', def:'Snaps the rhythm of an attack and forces it to start all over.', sym:'zigzag'},
    dm_range:     {cat:'impact', name:'Deep Range',    def:'Sprays it sixty yards onto a team-mate\'s boot from the base.', sym:'longarc'},
    dm_launch:    {cat:'impact', name:'The Launch',    def:'Turns the moment he wins it into a fast break the other way.', sym:'launch'},
    dm_linebreak: {cat:'impact', name:'Line-Breaker',  def:'The vertical pass that splits the first line and hits the runner between.', sym:'thread'},
    // SPIRIT ⯃
    dm_general:   {cat:'spirit', name:'The General',   def:'Marshals the shape and organises the whole side from deep.', sym:'armband'},
    dm_dirty:     {cat:'spirit', name:'The Ugly Side', def:'The tactical foul, the dark arts — does what the win quietly needs.', sym:'bolt'},
    dm_bite:      {cat:'spirit', name:'The Bite',      def:'Aggression in the duel — relishes the collision and wins the second ball.', sym:'fist'},
    dm_lock:      {cat:'spirit', name:'Lockdown',      def:'Man-marks their best player clean out of the game.', sym:'padlock'},
    dm_selfless:  {cat:'spirit', name:'Selfless',      def:'Does the unseen, unglamorous work so the flair players can shine.', sym:'heart'},
    dm_metronome: {cat:'spirit', name:'Tempo',         def:'Sets the pulse of the match — speeds it up, slows it down, controls it.', sym:'evenbars'},
  },
  archetypes:[
    {id:'destroyer',name:'The Destroyer',tag:'the ball-winner',       five:{motor:'dm_spring',   technique:'dm_shield',      vision:'dm_trigger', impact:'dm_tackle',    spirit:'dm_bite'}},
    {id:'sentinel', name:'The Sentinel', tag:'the positioning master',five:{motor:'dm_shuttle',  technique:'dm_pressresist', vision:'dm_screen',  impact:'dm_intercept', spirit:'dm_lock'}},
    {id:'architect',name:'The Architect',tag:'the deep-lying playmaker',five:{motor:'dm_engine',  technique:'dm_switch',      vision:'dm_scan',    impact:'dm_range',     spirit:'dm_metronome'}},
    {id:'boxtobox', name:'The Box-to-Box',tag:'does it all, box to box',five:{motor:'dm_recovery', technique:'dm_halfturn',    vision:'dm_cover',   impact:'dm_launch',    spirit:'dm_general'}},
  ],
};
