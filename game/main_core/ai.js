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

var aiBasicStats = {
  health   : 100,
  maxHealth: 100,
  mana     : 75 ,
  maxMana  : 100,
  curSpd   : 0  ,
  curSpd   : 0
}

var aiDefaultStats = {
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
// 2. AI_Building
//---------------------------------------------------------
function loadAISprite(){
  game.load.spritesheet('slime', '../assets/monster/Slime.png', 16, 16);
}
//var slimey;

function createAI(){
  var i = 0;
  //for(i = 0; i < 100; i++){
    slimey = game.add.sprite(500 + i*10, 100, 'slime');
    slimey.scale.setTo(3,3);
    game.physics.p2.enable(slimey);
    slimey.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', slimey.body);
    slimey.body.health = 10;
    slimey.damage = 10;
    createAIAnimations();
  //}
    slimey.body.onBeginContact.add(harm, slimey);
}

function createAIAnimations(){
  slimey.animations.add('move', [0, 1, 2, 3, 4], 25, true);
  slimey.animations.play('move', 10, true);
}

function harm(body1){
  if(body1 == null) return;
  if(body1.indestructible) return;
  tester = this;
  body1.health -= tester.damage;
  console.log("health", body1.health);
  if(body1.health <= 0){
    console.log("cool your dead");
  }
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
function aiMovement(){

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
