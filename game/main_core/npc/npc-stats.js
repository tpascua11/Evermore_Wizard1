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
   Default_NPC_Stats
*/
/*
  Use These As Templates for Building NPC
*/
//------------------------------
//  Default_NPC_Stats
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
  health   : 50,
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
