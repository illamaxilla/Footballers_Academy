/* ATTACKING MIDFIELDER — unique trait vocabulary + archetype pentads.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['attacking-midfielder'] = {
  key:'attacking-midfielder', label:'ATTACKING MID', accent:'#22D3EE',
  archLabel:'THE NUMBER 10',
  attrs:{
    // MOTOR △
    am_firstyard:{cat:'motor', name:'First Yard',    def:'The explosive half-step that springs him out of a tight pocket.', sym:'burst'},
    am_glide:    {cat:'motor', name:'Glide',         def:'Changes gears so smoothly a defender misjudges when to commit.', sym:'glide'},
    am_twist:    {cat:'motor', name:'Twist-Out',     def:'Hips and feet to spin away from a challenge on the turn.', sym:'spin'},
    am_lateburst:{cat:'motor', name:'Late Burst',    def:'The surge that arrives in the box a beat after everyone else.', sym:'speedo'},
    am_ride:     {cat:'motor', name:'Ride',          def:'Rides a shove or a heavy touch and keeps the move alive.', sym:'beam'},
    am_repeat:   {cat:'motor', name:'Repeat Runs',   def:'Makes the same run again and again — still sharp at ninety.', sym:'pistons'},
    // TECHNIQUE ◆
    am_halfturn: {cat:'technique', name:'Half-Turn', def:'Receives on the spin, already facing their goal.', sym:'halfturn'},
    am_silk:     {cat:'technique', name:'Silk',      def:'Control in a phone box; the ball never leaves his laces.', sym:'boxctrl'},
    am_disguise: {cat:'technique', name:'Disguise',  def:'Feints, no-looks and shoulder-drops that freeze a marker.', sym:'mask'},
    am_eitherfoot:{cat:'technique', name:'Either Foot', def:'Opens up and finishes cleanly off both sides.', sym:'bothfeet'},
    am_clip:     {cat:'technique', name:'The Clip',  def:'The cushioned, weighted pass that releases a runner in stride.', sym:'cushion'},
    am_curl:     {cat:'technique', name:'Curl',      def:'Bends it round the wall or into the far corner.', sym:'wallcurl'},
    // VISION ▪
    am_picture:  {cat:'vision', name:'The Picture',  def:'Sees the whole board a frame before he receives.', sym:'eye'},
    am_halfsec:  {cat:'vision', name:'Half-Second',  def:'Plays the pass a beat before anyone else spots it.', sym:'bulb'},
    am_coldblood:{cat:'vision', name:'Cold Blood',   def:'Slows the game down in the chaos of the box.', sym:'level'},
    am_pocket:   {cat:'vision', name:'The Pocket',   def:'Always finds the seam between the lines.', sym:'crossgrid'},
    am_trigger:  {cat:'vision', name:'The Trigger',  def:'Times the killer ball to the exact step of the run.', sym:'stopwatch'},
    am_ghost:    {cat:'vision', name:'Ghosting',     def:'Drifts into the space the marker forgets to guard.', sym:'dashrun'},
    // IMPACT ⬡
    am_key:      {cat:'impact', name:'The Key',      def:'The pass that unlocks a set, compact defence.', sym:'thread'},
    am_dagger:   {cat:'impact', name:'The Dagger',   def:'Cold, clean finish when it drops to him in the box.', sym:'target'},
    am_split:    {cat:'impact', name:'The Split',    def:'Threads it through the eye of the needle.', sym:'arrowlines'},
    am_spark:    {cat:'impact', name:'The Spark',    def:'Beats his man and makes something from nothing.', sym:'progress'},
    am_table:    {cat:'impact', name:'Set The Table',def:'The weighted cut-back to the arriving runner.', sym:'cutback'},
    am_range:    {cat:'impact', name:'From Range',   def:'Hurts you from outside the box, foot or pass.', sym:'longarc'},
    // SPIRIT ⯃
    am_nerve:    {cat:'spirit', name:'Nerve',        def:'Wants the ball when it is tight and the game is on the line.', sym:'flame'},
    am_gambler:  {cat:'spirit', name:'The Gambler',  def:'Backs himself to try the pass and the trick others will not.', sym:'sparkle'},
    am_neverhide:{cat:'spirit', name:'Never Hides',  def:'Keeps demanding it even straight after giving it away.', sym:'reload'},
    am_metronome:{cat:'spirit', name:'Metronome',    def:'Same influence every week — not a flat-track bully.', sym:'evenbars'},
    am_baton:    {cat:'spirit', name:'The Baton',    def:'Demands the ball and conducts the tempo of the whole side.', sym:'armband'},
    am_street:   {cat:'spirit', name:'Streetwise',   def:'The clever, nasty edge — draws the foul, wins the free-kick.', sym:'bolt'},
  },
  archetypes:[
    {id:'maestro',  name:'The Maestro',  tag:'sees it first',       five:{motor:'am_glide',    technique:'am_halfturn', vision:'am_picture',  impact:'am_key',   spirit:'am_metronome'}},
    {id:'maverick', name:'The Maverick', tag:'chaos, with purpose', five:{motor:'am_twist',    technique:'am_disguise', vision:'am_halfsec',  impact:'am_spark', spirit:'am_gambler'}},
    {id:'phantom',  name:'The Phantom',  tag:'arrives from nowhere',five:{motor:'am_lateburst',technique:'am_clip',     vision:'am_ghost',    impact:'am_dagger',spirit:'am_nerve'}},
    {id:'architect',name:'The Architect',tag:'builds from the half-space', five:{motor:'am_ride', technique:'am_curl',  vision:'am_pocket',   impact:'am_split', spirit:'am_baton'}},
    {id:'dynamo',   name:'The Dynamo',   tag:'influences every phase', five:{motor:'am_repeat', technique:'am_silk',   vision:'am_trigger',  impact:'am_table', spirit:'am_neverhide'}},
  ],
};
