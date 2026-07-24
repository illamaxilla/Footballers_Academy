/* FULL BACK — unique trait vocabulary + archetype pentads.
   The two-way flank role: overlapping engine one way, recovery sprint the other.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['full-back'] = {
  key:'full-back', label:'FULL BACK', accent:'#FF6B1A',
  archLabel:'THE FLANK ENGINE',
  attrs:{
    // MOTOR △ — the up-and-down engine of the flank
    fb_engine:  {cat:'motor', name:'The Engine',      def:'Up and down the whole touchline every phase — first minute to last.', sym:'pistons'},
    fb_recovery:{cat:'motor', name:'Recovery Sprint', def:'The lung-bursting run back to snuff out the break he started.', sym:'returnloop'},
    fb_overlap: {cat:'motor', name:'Overlap Burst',   def:'Explodes outside the winger to stretch the pitch and beat the line.', sym:'burst'},
    fb_flatout: {cat:'motor', name:'Flat-Out',        def:'Raw touchline pace — knocks it past his man and wins the chase.', sym:'speedo'},
    fb_ninety:  {cat:'motor', name:'Full Ninety',     def:'Still making the same marauding runs deep into stoppage time.', sym:'heartbeat'},
    fb_gears:   {cat:'motor', name:'Change of Pace',  def:'Shifts through the gears to slide out of a press and step forward.', sym:'glide'},
    // TECHNIQUE ◆ — delivery and ball-carrying from wide
    fb_whip:      {cat:'technique', name:'The Out-Swinger', def:'The out-swinging cross bent away from the keeper into the corridor.', sym:'wallcurl'},
    fb_firsttime: {cat:'technique', name:'First-Time Cross',def:'Hits the ball early, whipped in before the back line can set.', sym:'bootstrike'},
    fb_carry:     {cat:'technique', name:'The Carry',       def:'Drives the ball forward at pace down the flank, head up.', sym:'dribble'},
    fb_eitherboot:{cat:'technique', name:'Either Boot',     def:'Delivers off both feet — go outside or cut it back inside.', sym:'bothfeet'},
    fb_shield:    {cat:'technique', name:'Touchline Touch', def:'Controls and shields it in the tightest strip by the dead line.', sym:'boxctrl'},
    fb_cutin:     {cat:'technique', name:'Cut Inside',      def:'Jinks off the line onto his stronger foot to open the pitch up.', sym:'zigzag'},
    // VISION ▪ — reading the flank, the overlap and the runner
    fb_timing:    {cat:'vision', name:'Overlap Clock',  def:'Times the run to the exact step — never early, never offside.', sym:'stopwatch'},
    fb_underlap:  {cat:'vision', name:'Inside Seam',    def:'Reads the underlap when the winger pins his marker out wide.', sym:'crossgrid'},
    fb_showline:  {cat:'vision', name:'Show the Line',  def:'Body-shapes the winger away from goal and down the dead end.', sym:'focusframe'},
    fb_cover:     {cat:'vision', name:'Cover Read',     def:'Slides across to cover the centre-half the instant he\'s pulled wide.', sym:'radar'},
    fb_shoulder:  {cat:'vision', name:'Shoulder Check', def:'Scans behind for the runner in the channel before the ball comes.', sym:'eye'},
    fb_presstrig: {cat:'vision', name:'Press Trigger',  def:'Knows the exact loose touch to jump the winger and win it high.', sym:'bulb'},
    // IMPACT ⬡ — the end product at both ends
    fb_cutback:   {cat:'impact', name:'The Cutback',    def:'Reaches the byline and pulls it back on a plate for the runner.', sym:'cutback'},
    fb_backpost:  {cat:'impact', name:'Back-Post Hang', def:'The hung cross to the far stick for the second man arriving.', sym:'crossarc'},
    fb_overload:  {cat:'impact', name:'The Overload',   def:'The extra body arriving wide to make it two-on-one every time.', sym:'arrowlines'},
    fb_lastditch: {cat:'impact', name:'Last-Ditch Block',def:'The sliding block on the line that saves the certain goal.', sym:'shieldtick'},
    fb_switch:    {cat:'impact', name:'The Swing',      def:'The raking diagonal that swings the attack to the far flank.', sym:'longarc'},
    fb_turnover:  {cat:'impact', name:'The Turnover',   def:'The clean tackle that turns defence into attack in one touch.', sym:'progress'},
    // SPIRIT ⯃ — the temperament of the flank grinder
    fb_relentless:{cat:'spirit', name:'Both Ways',     def:'Never stops running both ways, however the game is going.', sym:'flame'},
    fb_duel:      {cat:'spirit', name:'The Duel',       def:'Relishes the one-on-one and simply refuses to be beaten wide.', sym:'padlock'},
    fb_grit:      {cat:'spirit', name:'Streetwise Grit',def:'The nasty, competitive edge — wins the foul, wins the throw.', sym:'fist'},
    fb_discipline:{cat:'spirit', name:'Discipline',    def:'Holds his shape and never wanders when the offside trap is set.', sym:'level'},
    fb_organiser: {cat:'spirit', name:'The Organiser', def:'Talks the whole flank into shape — marshals winger and centre-half.', sym:'armband'},
    fb_bounce:    {cat:'spirit', name:'Bounce-Back',   def:'Beaten once, he demands the ball back and goes again unbowed.', sym:'reload'},
  },
  archetypes:[
    {id:'warrior',  name:'The Warrior',  tag:'complete, both ends',        five:{motor:'fb_engine',   technique:'fb_firsttime', vision:'fb_cover',    impact:'fb_turnover', spirit:'fb_organiser'}},
    {id:'wingback', name:'The Wing-Back',tag:'lives at the byline',        five:{motor:'fb_overlap',  technique:'fb_whip',      vision:'fb_timing',   impact:'fb_cutback',  spirit:'fb_relentless'}},
    {id:'sentinel', name:'The Sentinel', tag:'nobody goes past',           five:{motor:'fb_recovery', technique:'fb_shield',    vision:'fb_showline', impact:'fb_lastditch',spirit:'fb_duel'}},
    {id:'architect',name:'The Architect',tag:'tucks in and dictates',      five:{motor:'fb_gears',    technique:'fb_carry',     vision:'fb_underlap', impact:'fb_switch',   spirit:'fb_discipline'}},
  ],
};
