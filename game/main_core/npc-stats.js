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

var aiBasicStats= {
  health   : 100,
  maxhealth: 100,
  acl      : 50,
  maxspeed : 33,
  curspd   : 50,
  ranged   : 0,
  melee    : 0,
  direction: 1,
  targetatx: 0,
  targetaty: 0,
  stop     : 0,
  willAggro: 0,
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
