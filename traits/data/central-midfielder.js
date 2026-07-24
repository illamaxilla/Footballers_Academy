/* CENTRAL MIDFIELDER — unique trait vocabulary + archetype pentads.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category.
   The all-round #8 — the engine room: carry through the lines, half-turn, switch, line-break, tackle-and-go. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['central-midfielder'] = {
  key:'central-midfielder', label:'CENTRAL MID', accent:'#22D3EE',
  archLabel:'THE ENGINE ROOM',
  attrs:{
    // MOTOR △
    cm_boxtobox:  {cat:'motor', name:'Box-to-Box',    def:'Up to support the strikers, back to cover the centre-halves — all game.', sym:'pistons'},
    cm_drive:     {cat:'motor', name:'The Drive',     def:'Carries at speed through the lines when the pitch opens in front of him.', sym:'speedo'},
    cm_lungs:     {cat:'motor', name:'Lungs',         def:'The engine that never fades — as sharp in the last ten as the first.', sym:'heartbeat'},
    cm_shuttle:   {cat:'motor', name:'Press & Drop',  def:'Slides up to press, drops back to screen — endless up-and-down.', sym:'returnloop'},
    cm_secondgear:{cat:'motor', name:'Second Gear',   def:'The burst to jump a press or close a passing lane in a flash.', sym:'burst'},
    cm_ride:      {cat:'motor', name:'The Ride',      def:'Rides a shoulder and a heavy touch, stays on his feet in traffic.', sym:'beam'},
    // TECHNIQUE ◆
    cm_halfturn:  {cat:'technique', name:'Face-Up',   def:'Opens up on the first touch and plays through the line.', sym:'halfturn'},
    cm_armour:    {cat:'technique', name:'Armour',    def:'Puts his frame between man and ball and won\'t be shifted.', sym:'boxctrl'},
    cm_receive:   {cat:'technique', name:'Receiving Feet', def:'Takes it on the back foot in a crowd and never gets caught square.', sym:'cushion'},
    cm_bothfeet:  {cat:'technique', name:'Both Sides',def:'Opens the angle and plays cleanly off either foot.', sym:'bothfeet'},
    cm_set:       {cat:'technique', name:'The Set',   def:'First touch that sets the next pass before the pressure arrives.', sym:'fastchev'},
    cm_escape:    {cat:'technique', name:'The Escape', def:'The swivel and drag that spins out of a closing trap.', sym:'swirl'},
    // VISION ▪
    cm_scan:      {cat:'vision', name:'The Scan',     def:'Checks both shoulders twice before the ball even arrives.', sym:'radar'},
    cm_switchread:{cat:'vision', name:'The Weak Side',def:'Sees the far side is free while everyone crowds the ball.', sym:'eye'},
    cm_tempo:     {cat:'vision', name:'Tempo',        def:'Knows exactly when to slow it down and when to spring it.', sym:'level'},
    cm_seam:      {cat:'vision', name:'The Seam',     def:'Reads the line-breaking lane a beat before it opens.', sym:'crossgrid'},
    cm_clock:     {cat:'vision', name:'The Clock',    def:'Times the moment — the release or the challenge — to the exact step.', sym:'stopwatch'},
    cm_balance:   {cat:'vision', name:'The Balance',  def:'Weighs the killer ball against the simple one in a single glance.', sym:'scales'},
    // IMPACT ⬡
    cm_linebreak: {cat:'impact', name:'The Line-Breaker', def:'The vertical pass that splits a set block and beats a whole line.', sym:'thread'},
    cm_switch:    {cat:'impact', name:'The Switch',   def:'The raking diagonal that flips the play to the open flank.', sym:'crossarc'},
    cm_through:   {cat:'impact', name:'The Through-Ball', def:'Releases the runner in behind at the perfect weight and moment.', sym:'arrowlines'},
    cm_screamer:  {cat:'impact', name:'From The Edge',def:'The big strike from outside the box when it drops to him.', sym:'longarc'},
    cm_arrival:   {cat:'impact', name:'The Arrival',  def:'The late third-man run that lands him in the box to finish.', sym:'progress'},
    cm_regain:    {cat:'impact', name:'The Regain',   def:'The interception that turns their attack into ours in one touch.', sym:'shieldtick'},
    // SPIRIT ⯃
    cm_relentless:{cat:'spirit', name:'Every Blade',  def:'Covers every blade of grass and still wants more at ninety.', sym:'reload'},
    cm_metronome: {cat:'spirit', name:'The Pulse',    def:'Sets the beat early and holds it right through the ninety.', sym:'evenbars'},
    cm_baton:     {cat:'spirit', name:'Takes Charge', def:'Takes charge, demands the ball and sets the rhythm of the side.', sym:'armband'},
    cm_bite:      {cat:'spirit', name:'Second Ball',  def:'The competitive edge that wins the second ball and the duel.', sym:'fist'},
    cm_ice:       {cat:'spirit', name:'Ice',          def:'Keeps the ball cool and the head calm when the game stretches.', sym:'padlock'},
    cm_heart:     {cat:'spirit', name:'Heartbeat',    def:'The physical and emotional pulse the whole team plays off.', sym:'heart'},
  },
  archetypes:[
    {id:'conductor',name:'The Conductor',tag:'decides when — tempo',              five:{motor:'cm_shuttle',   technique:'cm_halfturn', vision:'cm_tempo',     impact:'cm_switch',    spirit:'cm_metronome'}},
    {id:'regista',  name:'The Régista',  tag:'decides what — the decisive pass',  five:{motor:'cm_ride',      technique:'cm_receive',  vision:'cm_seam',      impact:'cm_linebreak', spirit:'cm_baton'}},
    {id:'carrier',  name:'The Carrier',  tag:'decides where — drives the line',   five:{motor:'cm_drive',     technique:'cm_escape',   vision:'cm_balance',   impact:'cm_through',   spirit:'cm_ice'}},
    {id:'engine',   name:'The Engine',   tag:'decides how much — volume',         five:{motor:'cm_boxtobox',  technique:'cm_set',      vision:'cm_scan',      impact:'cm_arrival',   spirit:'cm_relentless'}},
    {id:'destroyer',name:'The Destroyer',tag:'decides whether — the stop',        five:{motor:'cm_secondgear',technique:'cm_armour',   vision:'cm_clock',     impact:'cm_regain',    spirit:'cm_bite'}},
  ],
};
