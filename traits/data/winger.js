/* WINGER — unique trait vocabulary + archetype pentads.
   The wide 1v1 threat: pace, the take-on, the delivery, the run in behind.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['winger'] = {
  key:'winger', label:'WINGER', accent:'#22D3EE',
  archLabel:'THE WIDE THREAT',
  attrs:{
    // MOTOR △
    w_pace:      {cat:'motor', name:'Flying Pace',   def:'Raw top-end speed that eats the touchline and burns a full-back over forty yards.', sym:'speedo'},
    w_knockgo:   {cat:'motor', name:'Knock & Go',    def:'Pushes it past the man and beats him for pure pace on the outside.', sym:'burst'},
    w_stopstart: {cat:'motor', name:'Stop-Start',    def:'Freezes, then explodes — the change of pace that leaves a marker flat-footed.', sym:'pistons'},
    w_lowcog:    {cat:'motor', name:'Low Centre',    def:'Runs low and balanced, so the ball stays glued through every jink.', sym:'lowgravity'},
    w_inbehind:  {cat:'motor', name:'In Behind',     def:'Spins off the shoulder and attacks the space in behind the line.', sym:'dashrun'},
    w_engine:    {cat:'motor', name:'All-Game Legs', def:'Still sprinting at the full-back in the ninetieth as he was in the first.', sym:'returnloop'},
    // TECHNIQUE ◆
    w_stepover:  {cat:'technique', name:'The Stepover', def:'Stepovers and feints that send a defender the wrong way in a phone box.', sym:'swirl'},
    w_chop:      {cat:'technique', name:'The Chop',     def:'Chops the ball back inside off the outside foot to cut across a defender.', sym:'zigzag'},
    w_whip:      {cat:'technique', name:'The Whip',     def:'Bends and whips the cross with the laces so it dips away from the keeper.', sym:'wallcurl'},
    w_glued:     {cat:'technique', name:'Glued',        def:'Close control at full sprint — the ball never gets more than a stride away.', sym:'dribble'},
    w_bothfeet:  {cat:'technique', name:'Either Foot',  def:'Goes outside or inside, delivers and finishes cleanly off both sides.', sym:'bothfeet'},
    w_take:      {cat:'technique', name:'The Take',     def:'First touch on the run that kills a pass dead and sets the sprint at once.', sym:'cushion'},
    // VISION ▪
    w_isolate:   {cat:'vision', name:'The Isolation', def:'Drifts wide to lock the full-back in a one-on-one with no cover.', sym:'focusframe'},
    w_offshoulder:{cat:'vision', name:'Off The Shoulder', def:'Times the run so he is level as the ball is played, never offside.', sym:'stopwatch'},
    w_crosspick: {cat:'vision', name:'The Read',      def:'Lifts his head and picks the exact runner before he swings it in.', sym:'radar'},
    w_overlap:   {cat:'vision', name:'The Overlap',   def:'Feels the full-back bombing on and knows when to hold or release.', sym:'eye'},
    w_when:      {cat:'vision', name:'When To Go',    def:'Reads the moment the defender sets — outside, inside or waiting.', sym:'bulb'},
    w_channel:   {cat:'vision', name:'The Channel',   def:'Finds the seam between full-back and centre-half to run through.', sym:'crossgrid'},
    // IMPACT ⬡
    w_beatman:   {cat:'impact', name:'Beat The Man',  def:'Takes his defender on and gets past — the whole move springs from it.', sym:'progress'},
    w_hang:      {cat:'impact', name:'The Hang',      def:'Hangs the whipped cross to the back post for the arriving header.', sym:'crossarc'},
    w_setback:   {cat:'impact', name:'The Set-Back',  def:'Reaches the byline and pulls the cut-back to the edge of the box.', sym:'cutback'},
    w_tightangle:{cat:'impact', name:'Tight Angle',   def:'Finishes from the acute angle when he beats the last man to the byline.', sym:'target'},
    w_backpost:  {cat:'impact', name:'Back-Post',     def:'Ghosts to the far post and arrives to finish the cross from the other side.', sym:'header'},
    w_onetwo:    {cat:'impact', name:'The One-Two',   def:'Plays the give-and-go off the striker and bursts through the gap.', sym:'thread'},
    // SPIRIT ⯃
    w_flair:     {cat:'spirit', name:'Flair',         def:'The tricks and the audacity — plays to beat you and to entertain.', sym:'sparkle'},
    w_fearless:  {cat:'spirit', name:'Fearless',      def:'Runs straight at the biggest defender all day and never hides from the ball.', sym:'flame'},
    w_duel:      {cat:'spirit', name:'The Duel',      def:'Loves the one-on-one and demands it be his against their best full-back.', sym:'star'},
    w_keepcoming:{cat:'spirit', name:'Keeps Coming',  def:'Beaten once, he is straight back at the man the very next ball.', sym:'reload'},
    w_bigstage:  {cat:'spirit', name:'Big Stage',     def:'Turns it on when the ground is loud and the game is on the line.', sym:'bolt'},
    w_everyweek: {cat:'spirit', name:'Every Week',    def:'The same threat away on a wet Tuesday as at home in the sun.', sym:'evenbars'},
  },
  archetypes:[
    {id:'artist',   name:'The Artist',   tag:'the explosive entertainer', five:{motor:'w_stopstart', technique:'w_stepover', vision:'w_isolate',     impact:'w_beatman',   spirit:'w_flair'}},
    {id:'ghost',    name:'The Ghost',    tag:'the inside forward',        five:{motor:'w_inbehind',  technique:'w_chop',     vision:'w_offshoulder', impact:'w_backpost',  spirit:'w_fearless'}},
    {id:'speedster',name:'The Speedster',tag:'the pace merchant',         five:{motor:'w_pace',      technique:'w_glued',    vision:'w_when',        impact:'w_tightangle',spirit:'w_keepcoming'}},
    {id:'playmaker',name:'The Playmaker',tag:'the wide creator',          five:{motor:'w_engine',    technique:'w_whip',     vision:'w_crosspick',   impact:'w_setback',   spirit:'w_everyweek'}},
    {id:'hybrid',   name:'The Hybrid',   tag:'the complete winger',       five:{motor:'w_knockgo',   technique:'w_bothfeet', vision:'w_overlap',     impact:'w_onetwo',    spirit:'w_bigstage'}},
  ],
};
