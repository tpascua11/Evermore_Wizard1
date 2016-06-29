/*
        ,     \    /      ,
       / \    )\__/(     / \
      /   \  (_\  /_)   /   \
 ____/_____\__\@  @/___/_____\____
|             |\../|              |
|              \VV/               |
|        ---- Player -----         |
|_________________________________|
 |    /\ /      \\       \ /\    |
 |  /   V        ))       V   \  |
 |/     `       //        '     \|

//1. AI_Information 
//2. Player_Building
//3. Spell_Building
//4. Player_Actions
//5. Player_Physics
*/

//---------------------------------------------------------
// 1. AI_Information 
//---------------------------------------------------------
var ai;

var playerStats = {
  health   : 100,
  maxHealth: 100,
  mana     : 75 ,
  maxMana  : 100,
  rmana    : 25 ,
  maxRmana : 25 ,
  curSpd   : 0  ,
  speed    : 200,
  sprintSpd: 500,
  sprinting: 0  ,
  acl      : 50 ,
  moveLeft : 0  ,
  moveRight: 0  ,
  moving   : 0  ,
  jump     : 0  ,
  jumpTotal: 100,
  jumpAtY  : 0  ,
  jumpAcl  : 7  ,
  jumpSpan : 50 ,
  direction: 1  ,
  casting  : 0  ,
  charged  : 0  ,
  stepsCount: 25,
  rechargeRate: 1,
  resistance: "nothing",
  weak: "nothing"
};

//---------------------------------------------------------
// 2. Player_Building
//---------------------------------------------------------
function loadAISprite(){
 //game.load.spritesheet('dino', '../assets/player/Vark_v1.png', 16, 16);
 //game.load.audio('jumpSound', '../assets/Jump19.wav');
}

function createAI(){
  //Remember: Set Scale Then apply Phyisics
  playerControl();
  player = game.add.sprite(300, game.world.height - 150, 'dino');
  player.scale.setTo(3,3);
  game.physics.p2.enable(player);
  player.body.fixedRotation = true;
  player.body.damping = 0.5;
  playerFPS = game.add.text(player.body.x, player.body.y, game.time.fps, {fontSize: '32px', fill: '#ffff00'});
  createPlayerAnimations();

  createPlayerSpells();

  playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);

  for(var attrname in playerStats){player[attrname] = playerStats[attrname]}
  console.log(player);

  steps = game.add.audio('steps');
  jumpSound = game.add.audio('jumpSound');

  continuePlayerTimer();
  setupSpells();
}

function createPlayerAnimations(){
  //Walking Animation
  player.animations.add('right',
      [16, 17, 18, 19, 20, 21, 22], 25, true);
  player.animations.add('left',
      [8, 9, 10, 11, 12, 13, 14], 25, true);

  //Sprinting Animation
  player.animations.add('leftSprint', [24, 25, 26, 27], 10, true);
  player.animations.add('rightSprint', [28, 29, 30, 31], 10, true);
}

//---------------------------
// 3. AI_Interaction
//---------------------------
function think(){

}
function detect(){

}
//--------------------------------
// 4. AI_Physics
//--------------------------------
function movement(){

}


//--------------
//HELPER
//--------------
var yAxis = p2.vec2.fromValues(0, 1);
function checkIfCanJump() {
  var result = false;
  for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
  {
    var c = game.physics.p2.world.narrowphase.contactEquations[i];

    if (c.bodyA === player.body.data || c.bodyB === player.body.data)
    {
      var d = p2.vec2.dot(c.normalA, yAxis);

      if (c.bodyA === player.body.data)
      {
        d *= -1;
      }

      if (d > 0.5)
      {
        result = true;
      }
    }
  }
  return result;
}
