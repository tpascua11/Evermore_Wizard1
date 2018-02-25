/*
          ,     \    /      ,
         / \    )\__/(     / \
        /   \  (_\  /_)   /   \
   ____/_____\__\@  @/___/_____\____
   |            |\../|              |
   |             \VV/               |
   |    ---- NPC Stats
   |_________________________________|
   |    /\ /      \\       \ /\    |
   |  /   V        ))       V   \  |
   |/     `       //        '     \|
   Default_AI_Stats
*/
//------------------------------
//  Default_AI_Stats
//------------------------------
var ai;
var activeai = [];
var aitotal = 0;


var npcState = {
  //--  Direction And Distance Between Target --
  direction: 1,
  targetAtX: 0,
  targetAtY: 0,
  distanceBetweenTarget: 0,

  //--  Action State  --
  doingAction: 0,
  doActionAt: 10 + universalTime,
  lastAnimation: 0,

  //--  Behavior State --
  is_aggroed: 0,
  is_incapacitated: 0,
  delayIncapacitatedUntil: 0
};

var npcStats = {
  health   : 100,
  maxhealth: 100,
  currentSpeed: 100,
  acl      : 50,
  maxspeed : 33,
  detectRange: 300,
  aggroSpeed: 100,
  stopRange: 100,
  pushpowerx: 250,
  pushpowery: 250,
  actionRange: 100,
  ranged   : 0,
  melee    : 0,
  alliance: 2
};

var npcBehavior = {
  willAggro: true,
  willFollow: true
};

var aiBasicStats= {
  health   : 100,
  maxhealth: 100,
  acl      : 50,
  maxspeed : 33,
  curspd   : 50,
  aggroSpeed: 100,
  ranged   : 0,
  melee    : 0,
  direction: 1,
  targetatx: 0,
  targetaty: 0,
  stop     : 0,
  willAggro: 0,
  willFollow : 0,
  stoprange: 50,
  detectRange: 100,
  pushpowerx: 500,
  pushpowery: 200,
  actiontime: 0,
  doingaction: 0,
  distance: 1000,
  doActionAt: 10,
  actionRange: 100,
  alliance: 2,
  lastanimation: 0
}

var aidefaultstats = {
  health   : 100,
  maxhealth: 100,
  mana     : 75 ,
  maxmana  : 100,
  rmana    : 25 ,
  maxrmana : 25 ,
  curspd   : 50  ,
  speed    : 200,
  aggroSpeed: 100,
  sprintspd: 500,
  sprinting: 0  ,
  acl      : 50 ,
  moveleft : 0  ,
  moveright: 0  ,
  moving   : 0  ,
  jump     : 0  ,
  jumptotal: 100,
  jumpaty  : 0  ,
  jumpacl  : 7  ,
  jumpspan : 50 ,
  direction: 1  ,
  casting  : 0  ,
  charged  : 0  ,
  stepscount: 25,
  rechargerate: 1,
  resistance: "nothing",
  weak: "nothing",
  actiontime: 0,
  doingaction: 0,
  distance: 1000,
  doActionAt: 10,
  actionRange: 25
};

