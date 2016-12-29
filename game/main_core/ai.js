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
//2. AI_Building
//3. AI_Interaction
//4. AI_Physics
//
//5. Attack_Info
//6. Attack_Collision
*/

//---------------------------------------------------------
// 1. AI_Information 
//---------------------------------------------------------
var ai;
var activeAI = [];

var aiBasicStats = {
  health   : 100,
  maxHealth: 100,
  mana     : 75 ,
  maxMana  : 100,
  curSpd   : 100,
  ranged   : 0,
  melee    : 0,
  direction: 1,
  targetAtX: 0,
  targetAtY: 0,
  stop     : 0,
  stopRange: 50,
  detectRange: 400,
  pushPowerX: 500,
  pushPowerY: 200,
  actionTime: 0,
  doingAction: 0,
  alliance: 2,
  lastAnimation: 0, 
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
  game.load.spritesheet('goblin', '../assets/monster/Goblin.png', 16, 16);

  game.load.spritesheet('collision', '../assets/monster/attack_animation/red_collision.png', 20, 20);
}

//var slimey;

function createAI(){
  var i = 0;
  for(i = 0; i < 30; i++){
    slimey = game.add.sprite(i*25, 25, 'slime');
    slimey.scale.setTo(3,3);
    game.physics.p2.enable(slimey);
    slimey.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', slimey.body);
    slimey.body.health = 10;
    slimey.damage = 10;
    createAIAnimations();

    //slimey.body.onBeginContact.add(harm, slimey);

    for(var attrname in aiBasicStats){slimey[attrname] = aiBasicStats[attrname]}
    console.log(slimey);
    activeAI.push(slimey);
  }
  for(i = 0; i < 30; i++){
    goblin= game.add.sprite((i*50)+500, 25, 'goblin');
    goblin.scale.setTo(3,3);
    game.physics.p2.enable(goblin);
    goblin.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', goblin.body);
    goblin.body.health = 10;
    goblin.damage = 10;
    createGoblinStaberAnimations();

    //slimey.body.onBeginContact.add(harm, slimey);

    for(var attrname in aiBasicStats){goblin[attrname] = aiBasicStats[attrname]}
    console.log(goblin);
    activeAI.push(goblin);
  }

}

function createAIAnimations(){
  slimey.animations.add('right', [0, 1, 2, 3, 4], 25, true);
  slimey.animations.add('left', [0, 1, 2, 3, 4], 25, true);
  slimey.animations.add('move', [0, 1, 2, 3, 4], 25, true);
  slimey.animations.play('move', 10, true);
}

function createGoblinStaberAnimations(){
  goblin.animations.add('left', [25, 26, 27, 28, 29, 30], 25, true);
  goblin.animations.add('right', [33, 34, 35, 36, 37, 38], 25, true);
  goblin.animations.add('move', [25, 26, 27, 28, 29, 30], 25, true);
  goblin.animations.play('move', 10, true);
  //goblin.animations.add('right', [0, 1, 2, 3, 4], 25, true);
  //slimey.animations.play('move', 10, true);
}

function harm(body1){
  if(body1 == null) return;
  if(body1.indestructible || (this.alliance == body1.sprite.alliance)) return;
  if(body1.sprite.invincible){
    console.log("you have invincible");
    return;
  }
  else{
    console.log("you dont have invincible");
    if(body1.sprite.invincible == null) return;
    if(player.barrier) return;
    harmPlayer(player, 10);
    hurt.play();
    push(this, body1);
    startInvincible();
  }
  tester = this;
  tester.direction *= -1;
}

function doAttack(){
  attack.body.data.shapes[0].sensor = true;
}

function push(ai, target){
  console.log("What");
  player.body.velocity.x = ai.pushPowerX * ai.direction;
  player.body.velocity.y = ai.pushPowerY * -1;
}

function aiCheckDistance(ai, target){
  var dx = ai.body.x - target.body.x;
  var dy = ai.body.y - target.body.y;
  if(dx < 0) ai.targetAtX = 1;
  else ai.targetAtX = -1;
  if(dy < 0) ai.targetAtY = 1;
  else ai.targetAtY = -1;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if(ai.detectRange >= distance){
    if(ai.stopRange >= distance){
      ai.stop = true;
    }
    else ai.stop = false;
    return true;
  }
  else return false;
}

//---------------------------
// 3. AI_Interaction
//---------------------------
function detectEnemy(){
  return true;
}
function move(ai){
  //ai.body.velocity.x = ai.curSpd * ai.direction;
  ai.body.velocity.x = 0;
}
function patrol(ai){
  ai.body.velocity.x = ai.curSpd * ai.targetAtX;
}
function follow(ai){
  //if(ai.stop) ai.body.velocity.x = 0;
  ai.body.velocity.x = ai.curSpd * ai.targetAtX;
  ai.direction = ai.targetAtX;
}

function movementAnimation(ai){
  if(ai.direction == 1){
    if(1 == ai.lastAnimation) return;
    ai.lastAnimation = 1;
    ai.animations.play('right', 10, true);
    console.log("right");
  }
  else{
    if(2 == ai.lastAnimation) return;
    ai.lastAnimation = 2;
    ai.animations.play('left', 10, true);
    console.log("left");
  }
}
//--------------------------------
// 4. AI_Physics
//--------------------------------
function aiRuning(){
  //console.log(activeAI.length);
  for(var i = 0; i < activeAI.length; i++){
    if(aiCheckDistance(activeAI[i], player)){
      follow(activeAI[i]);
    }
    else{
      move(activeAI[i]);
    }
    movementAnimation(activeAI[i]);
  }
}
//-------------------------------
// 5. Attack_Info
//-------------------------------
var attack = {
  force: 0,
  doingAction: 0,
  owner: 0,
  constant: 0, 
  ownerLink: "owner",
  alliance: 2
}

//-------------------------------
// 6. Attack_Collision
//-------------------------------
function testDamage(){
  var damage;
  damage = game.add.sprite(50, 50, 'collision');
  //activeAI[0].addChild(damage);
  damage.scale.setTo(2.3,2.3);
  game.physics.p2.enable(damage);
  damage.body.fixedRotation = true;
  aiMaterial = game.physics.p2.createMaterial('aiMaterial', damage.body);
  damage.body.health = 10;
  damage.damage = 10;
  //createAIAnimations();

  damage.body.onBeginContact.add(harm, damage);
  //damage.body.onEndContact.add(harm, damage);

  for(var attrname in aiBasicStats){damage[attrname] = aiBasicStats[attrname]}
  console.log(damage);
  //activeAI.push(slimey);
  damage.body.static = true;
  damage.body.data.shapes[0].sensor = true;
  damage.postUpdate = function(){
    damage.reset(activeAI[0].body.x + 20, activeAI[0].body.y);
  }

}

//--------------
//HELPER
//--------------
var yAxis = p2.vec2.fromValues(0, 1);
function checkIfCanJump(entity) {
  var result = false;
  for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++){
    var c = game.physics.p2.world.narrowphase.contactEquations[i];
    if (c.bodyA === player.body.data || c.bodyB === player.body.data){
      var d = p2.vec2.dot(c.normalA, yAxis);
      if (c.bodyA === player.body.data){
        d *= -1;
      }
      if (d > 0.5){
        result = true;
      }
    }
  }
  return result;
}
