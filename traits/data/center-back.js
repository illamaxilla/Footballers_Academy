/* CENTER BACK — unique trait vocabulary + archetype pentads.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['center-back'] = {
  key:'center-back', label:'CENTER BACK', accent:'#C8102E',
  archLabel:'THE LAST LINE',
  attrs:{
    // MOTOR △
    cb_recovery: {cat:'motor', name:'Recovery Pace', def:'The flat-out sprint back to erase a ball slid in behind.', sym:'speedo'},
    cb_spring:   {cat:'motor', name:'Spring',        def:'The standing leap that wins the header in a packed six-yard box.', sym:'jump'},
    cb_frame:    {cat:'motor', name:'The Frame',     def:'Raw mass to out-muscle a target man and shrug him off the ball.', sym:'barbell'},
    cb_swivel:   {cat:'motor', name:'Swivel',        def:'Turns from a standstill and goes stride-for-stride with the runner.', sym:'spin'},
    cb_stride:   {cat:'motor', name:'Long Stride',   def:'Eats up the ground in behind with a loping recovery gallop.', sym:'glide'},
    cb_engine:   {cat:'motor', name:'The Engine',    def:'Still sprinting and still concentrating deep into stoppage time.', sym:'pistons'},
    // TECHNIQUE ◆
    cb_firstpass:{cat:'technique', name:'First Pass',   def:'Opens the play with a crisp, clean ball out of the back.', sym:'fastchev'},
    cb_diagonal: {cat:'technique', name:'The Diagonal', def:'Switches the point of attack with a raking cross-field ball.', sym:'longarc'},
    cb_bothfeet: {cat:'technique', name:'Two-Footed',   def:'Opens his body and passes cleanly off either boot.', sym:'bothfeet'},
    cb_cushion:  {cat:'technique', name:'Killed Dead',  def:'A first touch that settles a dropping ball under a closing press.', sym:'cushion'},
    cb_carry:    {cat:'technique', name:'The Carry',    def:'Steps out and drives through midfield with the ball at his feet.', sym:'dribble'},
    cb_clearance:{cat:'technique', name:'The Clearance',def:'Meets it flush and thumps it clear — distance, height and safety.', sym:'bootstrike'},
    // VISION ▪
    cb_read:     {cat:'vision', name:'The Read',      def:'Sees the pass before the striker does and steps to snuff it out.', sym:'eye'},
    cb_line:     {cat:'vision', name:'The Line',      def:'Holds and drops the back line as one, springing the offside trap.', sym:'level'},
    cb_anticipate:{cat:'vision', name:'Anticipation', def:'Smells the through-ball early and is moving before it is played.', sym:'bulb'},
    cb_scan:     {cat:'vision', name:'The Scan',      def:'Constant shoulder-checks to track the runner drifting off his blind side.', sym:'radar'},
    cb_cover:    {cat:'vision', name:'Cover Shadow',  def:'Reads where the danger will fall and slides across to shut the gap.', sym:'crossgrid'},
    cb_trigger:  {cat:'vision', name:'The Trigger',   def:'Knows the exact moment to step out and press rather than drop.', sym:'stopwatch'},
    // IMPACT ⬡
    cb_block:    {cat:'impact', name:'The Block',        def:'Throws body and boot into the line of the shot without a flinch.', sym:'shieldtick'},
    cb_lastditch:{cat:'impact', name:'Last Ditch',       def:'The stretching, sliding tackle that erases a certain goal.', svg:'<path d="M3 18c3 0 6-1 9-3"/><path d="M12 15l4-1.5"/><circle cx="19" cy="12" r="2.3"/><path d="M3 18l2 .5M3 18l.5-2"/>'},
    cb_intercept:{cat:'impact', name:'The Interception', def:'Steps across the passing lane and picks it clean out of the air.', sym:'arrowlines'},
    cb_header:   {cat:'impact', name:'Aerial Command',   def:'Dominant in the air, rising to head every high ball out of the box.', sym:'header'},
    cb_setpiece: {cat:'impact', name:'Set-Piece Threat', def:'A genuine goal danger attacking the far post at the other end.', sym:'netgoal'},
    cb_shutout:  {cat:'impact', name:'The Shutout',      def:'Marshals the clean sheet — nothing at all gets past the last line.', sym:'padlock'},
    // SPIRIT ⯃
    cb_frontfoot:{cat:'spirit', name:'Front Foot',   def:'The aggressive edge that makes the striker feel him from minute one.', sym:'fist'},
    cb_general:  {cat:'spirit', name:'The General',   def:'Never stops organising, barking and shaping the line ahead of him.', sym:'armband'},
    cb_ice:      {cat:'spirit', name:'Ice',          def:'Calm under a raining high ball with the whole stadium baying.', sym:'heart'},
    cb_switchedon:{cat:'spirit', name:'Switched On', def:'Ninety-five minutes of unbroken focus — one lapse costs a goal.', sym:'evenbars'},
    cb_brave:    {cat:'spirit', name:'The Brave',    def:'Puts his head in where the boots are flying and never pulls out.', sym:'flame'},
    cb_unbeaten: {cat:'spirit', name:'Never Turned', def:'Refuses to be spun, bullied or beaten; keeps standing them up.', sym:'reload'},
  },
  archetypes:[
    {id:'colossus', name:'The Colossus', tag:'the physical dominator',  five:{motor:'cb_frame',    technique:'cb_clearance', vision:'cb_line',       impact:'cb_header',    spirit:'cb_frontfoot'}},
    {id:'architect',name:'The Architect',tag:'the ball-playing defender',five:{motor:'cb_engine',   technique:'cb_diagonal',  vision:'cb_anticipate', impact:'cb_setpiece',  spirit:'cb_ice'}},
    {id:'sentinel', name:'The Sentinel', tag:'the reading master',      five:{motor:'cb_swivel',   technique:'cb_cushion',   vision:'cb_read',       impact:'cb_intercept', spirit:'cb_switchedon'}},
    {id:'libero',   name:'The Libero',   tag:'the modern sweeper',      five:{motor:'cb_recovery', technique:'cb_carry',     vision:'cb_trigger',    impact:'cb_lastditch', spirit:'cb_general'}},
  ],
};
