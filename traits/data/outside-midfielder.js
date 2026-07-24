/* OUTSIDE MIDFIELDER — unique trait vocabulary + archetype pentads.
   The two-way wide man: defends the flank as much as he attacks it. Where a winger
   only goes forward, the outside mid runs the WHOLE flank — overlaps and cut-backs one
   way, track-backs and last-ditch blocks the other. The duty is up AND back, for 90.
   attrs: one family per shape (motor/technique/vision/impact/spirit).
   Each attr: { cat, name, def, sym }  (sym = id in window.SYM, or add `svg:'...'` for bespoke).
   archetypes[].five picks one attr id per category. */
window.POS_TRAITS = window.POS_TRAITS || {};
window.POS_TRAITS['outside-midfielder'] = {
  key:'outside-midfielder', label:'OUTSIDE MID', accent:'#22D3EE',
  archLabel:'THE FLANK',
  attrs:{
    // MOTOR △ — the engine that runs the whole flank, both ways
    om_engine:    {cat:'motor', name:'Up & Down',       def:'The tireless shuttle that runs his channel end to end, attack to box, all game.', sym:'pistons'},
    om_trackback: {cat:'motor', name:'Track-Back',      def:'The recovery sprint that gets him goalside to cover his full-back before the cross comes.', sym:'returnloop'},
    om_overlap:   {cat:'motor', name:'The Overlap',     def:'Bursts outside and beyond to stretch the flank and give the winger a runner.', sym:'burst'},
    om_recover:   {cat:'motor', name:'Recovery Pace',   def:'Raw speed to make up thirty yards and get back in the picture after a turnover.', sym:'speedo'},
    om_doubleshift:{cat:'motor', name:'Double Shift',   def:'The lungs to do two jobs — no drop in output at ninety when others are gone.', sym:'heartbeat'},
    om_pivot:     {cat:'motor', name:'The Pivot',       def:'Stops, turns and drives back up the line the instant the ball is won.', sym:'spin'},
    // TECHNIQUE ◆ — touch and delivery from the touchline
    om_whip:      {cat:'technique', name:'The Whip',    def:'The driven, whipped delivery that bends away from the keeper across the six-yard box.', sym:'wallcurl'},
    om_channel:   {cat:'technique', name:'Channel Control', def:'First touch tidy in the tight strip by the line, back to goal with a man on him.', sym:'boxctrl'},
    om_bothfeet:  {cat:'technique', name:'Both Flanks', def:'Comfortable off either foot — can play and deliver from the left or the right.', sym:'bothfeet'},
    om_quickfeet: {cat:'technique', name:'Quick Feet',  def:'Sharp feet to wriggle out of the channel when he is trapped on the touchline.', sym:'dribble'},
    om_earlyball: {cat:'technique', name:'The Early Ball', def:'Clips it in early, before the back line can set and screen the runner.', sym:'cushion'},
    om_standup:   {cat:'technique', name:'Stand It Up', def:'Hangs the cross to the back post for the late arriving runner to attack.', sym:'swirl'},
    // VISION ▪ — reading both phases of the wide game
    om_underlap:  {cat:'vision', name:'The Underlap',   def:'Reads the seam and runs inside into the half-space when the winger holds width.', sym:'crossgrid'},
    om_transition:{cat:'vision', name:'The Turnover',   def:'Senses the moment of transition — knows when to break and when to sit.', sym:'radar'},
    om_tuckin:    {cat:'vision', name:'Tuck In',        def:'Recognises the overload and slides inside to make a temporary back four.', sym:'focusframe'},
    om_scan:      {cat:'vision', name:'Shoulder Check', def:'Constantly scans the line — knows the runner behind and the man inside before he gets it.', sym:'eye'},
    om_timing:    {cat:'vision', name:'Pick The Moment',def:'Times the overlap so the flank is never left open behind him.', sym:'stopwatch'},
    om_cover:     {cat:'vision', name:'Cover The Space',def:'Weighs staying wide against pinching in to protect the space his full-back vacates.', sym:'scales'},
    // IMPACT ⬡ — end product at both ends of the pitch
    om_onrun:     {cat:'impact', name:'Cross On The Run',def:'Delivers at full pace without breaking stride, whipped in from the byline.', sym:'crossarc'},
    om_cutback:   {cat:'impact', name:'The Cut-Back',   def:'Pulls it back from the byline to the penalty spot for the arriving runner.', sym:'cutback'},
    om_lastditch: {cat:'impact', name:'Last-Ditch',     def:'The recovery tackle or the block on the line that saves the flank.', sym:'shieldtick'},
    om_assist:    {cat:'impact', name:'The Final Ball', def:'The decisive wide pass that turns hard yards into a chance.', sym:'thread'},
    om_backpost:  {cat:'impact', name:'Back-Post Arrival',def:'Ghosts in at the far post to finish the move he started on the other flank.', sym:'header'},
    om_beatman:   {cat:'impact', name:'Beat The Man',   def:'Wins the wide one-v-one to get the cross away when the game is stuck.', sym:'progress'},
    // SPIRIT ⯃ — the character of a tireless two-way flank man
    om_workrate:  {cat:'spirit', name:'Work-Rate',      def:'Runs for the shirt and does the ugly, unseen side of the wide job for ninety.', sym:'flame'},
    om_discipline:{cat:'spirit', name:'Discipline',     def:'Holds the line and the shape — never caught upfield when the team needs him back.', sym:'padlock'},
    om_selfless:  {cat:'spirit', name:'Selfless',       def:'Puts in the covering shift so his full-back and winger can gamble forward.', sym:'heart'},
    om_relentless:{cat:'spirit', name:'Relentless',     def:'Sprints back to press the instant he loses it — never sulks, never switches off.', sym:'reload'},
    om_tempo:     {cat:'spirit', name:'Set The Tempo',  def:'Dictates when the flank goes and when it settles — the beat of the wide channel.', sym:'armband'},
    om_grit:      {cat:'spirit', name:'Touchline Grit', def:'The nasty, competitive edge that wins the duel and the ball in the corner.', sym:'fist'},
  },
  archetypes:[
    {id:'engine',   name:'The Engine',    tag:'the flank workhorse',    five:{motor:'om_engine',    technique:'om_bothfeet', vision:'om_transition', impact:'om_cutback',   spirit:'om_workrate'}},
    {id:'deliverer',name:'The Deliverer', tag:'the touchline craftsman',five:{motor:'om_overlap',   technique:'om_whip',     vision:'om_timing',     impact:'om_onrun',     spirit:'om_tempo'}},
    {id:'sentinel', name:'The Sentinel',  tag:'the flank guardian',     five:{motor:'om_trackback', technique:'om_channel',  vision:'om_tuckin',     impact:'om_lastditch', spirit:'om_discipline'}},
    {id:'weaver',   name:'The Weaver',    tag:'the half-space connector',five:{motor:'om_pivot',    technique:'om_earlyball',vision:'om_underlap',   impact:'om_assist',    spirit:'om_relentless'}},
    {id:'renegade', name:'The Renegade',  tag:'the caged flair player', five:{motor:'om_recover',   technique:'om_quickfeet',vision:'om_scan',       impact:'om_beatman',   spirit:'om_grit'}},
  ],
};
