/*
        ,     \    /      ,
       / \    )\__/(     / \
      /   \  (_\  /_)   /   \
 ____/_____\__\@  @/___/_____\____
|             |\../|              |
|              \VV/               |
|        ---- AI  -----         |
|_________________________________|
 |    /\ /      \\       \ /\    |
 |  /   V        ))       V   \  |
 |/     `       //        '     \|

//1. AI_Information 
//2. AI_Building
//3. AI_Interaction
//4. AI_Running
//
//5. Attack_Info
//6. Attack_Collision
*/

//---------------------------------------------------------
// 1. AI_Information 
//---------------------------------------------------------
var ai;
var activeAI = [];
var aiTotal = 0;

var aiBasicStats = {
  health   : 100,
  maxHealth: 100,
  acl      : 50,
  maxSpeed : 33,
  curSpd   : 0,
  ranged   : 0,
  melee    : 0,
  direction: 1,
  targetAtX: 0,
  targetAtY: 0,
  stop     : 0,
  stopRange: 50,
  detectRange: 700,
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

function createAI(){
  //NOTES:
  //  Always GIve AI its own ID according to whats avaiable at AIRUNNING
  //  Once That AI dies, save that id and use it for the newest AI addition
  //  if thats not the case add to the end of AI_Running
  //
  var i = 0;
  //console.log("Start AI", activeAI.length);
  for(i = 0; i < 50; i++){
    //goblinMaking(50,50,i);
    //goblinSwordsMan(50,50,i+1);
    //i++;
    //goblinArcher(50+i*50,50,i);
  }
 continueGoblins();

}
//---------------
//  Goblin
//---------------
function goblinSwordsMan(x,y,id){
    goblin = game.add.sprite(x, y, 'templateAI');
    goblin.scale.setTo(1,2);
    game.physics.p2.enable(goblin);
    goblin.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', goblin.body);
    goblin.body.health = 20;
    goblin.damage = 1;
    goblin.doAttack = function(){}
    for(var attrname in aiBasicStats){goblin[attrname] = aiBasicStats[attrname]}
    goblin.aid = id;
    goblinSword();
    //console.log(goblin);
    goblin.visual = game.add.sprite(-24,-15,'goblin');
    goblin.visual.scale.setTo(3,3);
    goblin.visual.setScaleMinMax(3,3);
    goblin.visual.frame = 3;
    goblin.addChild(goblin.visual);
    goblin.stopRange = 100;
    createGoblinSwordsmanAnimations();
    goblin.dead = false;
    goblin.name = "goblinSwordGuy";

    //game.physics.p2.setPostBroadphaseCallback(checkVeg, this);
    activeAI.push(goblin);
}


function goblinStaber(x, y, id){
    goblin = game.add.sprite(x, y, 'templateAI');
    goblin.scale.setTo(1,2);
    game.physics.p2.enable(goblin);
    goblin.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', goblin.body);
    goblin.body.health = 15;
    goblin.damage = 1;
    goblin.doAttack = function(){}
    for(var attrname in aiBasicStats){goblin[attrname] = aiBasicStats[attrname]}
    goblin.aid = id;
    goblin.acl = 10;
    goblin.maxSpeed = 150;
    goblinDagger();
    //console.log(goblin);
    goblin.visual = game.add.sprite(-24,-15,'goblin');
    goblin.visual.scale.setTo(3,3);
    goblin.visual.setScaleMinMax(3,3);
    goblin.visual.frame = 3;
    goblin.addChild(goblin.visual);
    goblin.stopRange = 25;
    createGoblinStaberAnimations();
    goblin.dead = false;
    goblin.name = "goblinDaggerGuy";
    activeAI.push(goblin);
    //console.log("AI total", activeAI.length);
}

function goblinArcher(x,y,id){
    goblin = game.add.sprite(x, y, 'templateAI');
    goblin.scale.setTo(1,2);
    game.physics.p2.enable(goblin);
    goblin.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', goblin.body);
    goblin.body.health = 15;
    goblin.damage = 1;
    goblin.doAttack = function(){}
    for(var attrname in aiBasicStats){goblin[attrname] = aiBasicStats[attrname]}
    goblin.aid = id;
    goblin.acl = 0;
    goblinBow();
    //console.log(goblin);
    goblin.visual = game.add.sprite(-24,-15,'goblin');
    goblin.visual.scale.setTo(3,3);
    goblin.visual.setScaleMinMax(3,3);
    goblin.visual.frame = 3;
    goblin.addChild(goblin.visual);
    goblin.stopRange = 1000;
    goblin.curSpd = 0;
    createGoblinArcherAnimations();
    goblin.dead = false;
    goblin.name = "goblinBowGuy";
    activeAI.push(goblin);
}


function goblinMaking(x, y, id){
    goblin = game.add.sprite(x, y, 'templateAI');
    //goblin.scale.setTo(0.5,1.5);
    goblin.scale.setTo(1,2);
    game.physics.p2.enable(goblin);
    goblin.body.fixedRotation = true;
    aiMaterial = game.physics.p2.createMaterial('aiMaterial', goblin.body);
    goblin.body.health = 10;
    goblin.damage = 1;

    goblin.doAttack = function(){}

    for(var attrname in aiBasicStats){goblin[attrname] = aiBasicStats[attrname]}
    //goblinDagger();
    goblin.aid = id;
    goblinSword();
    //goblin.sprite()
    //console.log(goblin);

    goblin.visual = game.add.sprite(-24,-15,'goblin');
    goblin.visual.scale.setTo(3,3);
    goblin.visual.setScaleMinMax(3,3);
    goblin.visual.frame = 3;
    goblin.addChild(goblin.visual);

    goblin.stopRange = 25;

    //createGoblinStaberAnimations();
    createGoblinSwordsmanAnimations();

    //goblinVisual.alpha = 1;
    goblin.dead = false;
    activeAI.push(goblin);
    //console.log("AI total", activeAI.length);
}

function createGoblinStaberAnimations(){
  goblin.visual.animations.add('move', [33, 34, 35, 36, 37, 38], 25, true);
  goblin.visual.animations.play('move', 10, true);
}

function createGoblinSwordsmanAnimations(){
  goblin.visual.animations.add('move', [41, 42, 43, 44, 45, 46], 25, true);
  goblin.visual.animations.play('move', 10, true);
  goblin.visual.animations.add('attack', [49, 49, 49, 50, 51], 10, true);
}

function createGoblinArcherAnimations(){
  goblin.visual.animations.add('move', [25], 25, true);
  goblin.visual.animations.add('attack', [25, 26, 27, 28, 29, 30], 3, true);
  goblin.visual.animations.play('move', true);
  //goblin.visual.animations.add('attack', [49, 49, 49, 50, 51], 10, true);
}

function goblinDagger(){
  var damage;
  goblin.attack= game.add.sprite(0, 0, 'collision');
  goblin.attack.scale.setTo(1,1);
  game.physics.p2.enable(goblin.attack);
  goblin.attack.body.fixedRotation = true;
  aiMaterial = game.physics.p2.createMaterial('aiMaterial', goblin.attack.body);
  goblin.attack.body.health = 10;
  goblin.attack.damage = 1;
  goblin.attack.alpha = 0;

  goblin.attack.body.onBeginContact.add(harm, goblin.attack);
  //damage.body.onEndContact.add(harm, damage);

  for(var attrname in aiBasicStats){goblin.attack[attrname] = aiBasicStats[attrname]}
  //console.log(damage);
  goblin.attack.body.static = true;
  goblin.attack.body.data.shapes[0].sensor = true;
  goblin.attack.id = activeAI.length;//Change THIS LATer
  //console.log("Goblin ATtack", goblin.attack);
  
  goblin.attack.postUpdate = function(){
    if(activeAI[this.id] == 0 || (this.id > activeAI.length)){ this.destroy; return;}
    this.damage.direction = activeAI[this.id].direction;
    this.reset(activeAI[this.id].body.x+13 * activeAI[this.id].direction, activeAI[this.id].body.y-15);
  }
}

function goblinSword(){
  goblin.doActionAt = 2;
  goblin.whenAction = 0;
  goblin.readyAction = false;
  goblin.finishAction = false;
  goblin.attackLimit = 1;
  goblin.attackTotal = 0

  goblin.doAttack = function(){
    //return;
    //3rd State - The End Of The Animation
    if(this.finishAction){
        this.finishAction = false;
        this.readyAction = false;
        this.attackTotal = 0;
    }
    //1st State - The Start Of An Attack Animation
    else if(!this.readyAction){
      this.lastAnimation = 3;//3 Will Be Attack State For ALL
      this.visual.animations.play('attack', true);
      this.readyAction = true;
    }
    //2nd State - The Placement of An Attack Collison
    else{
      if(this.visual.frame == 50){
        if(this.attackTotal <  this.attackLimit){
          this.body.velocity.y = -300;
          this.body.velocity.x = 20 * this.direction;
          aiHarmWave(this);
          this.attackTotal++;
        }
      }
      if(this.visual.frame == 51){
        this.finishAction = true;
      }
      /*
      else if(this.visual.frame == 51){
        this.finishAction = true;
      }else{
      }*/
    }
  }
}

function goblinBow(){
  goblin.doActionAt = 2;
  goblin.whenAction = 0;
  goblin.readyAction = false;
  goblin.finishAction = false;
  goblin.attackLimit = 1;
  goblin.attackTotal = 0
  goblin.lastDirection = goblin.direction;

  goblin.doAttack = function(){
    if(this.targetAtX == 1){
      if(this.lastDirection == -1) {
        this.direction = this.lastDirection = 1;
        this.visual.setScaleMinMax(3,3);
        this.visual.scale.setTo(3,3);
        this.visual.anchor.setTo(0,0);
      }
    }
    else{
      if(this.lastDirection == 1) {
        this.direction =  this.lastDirection = -1;
        this.visual.setScaleMinMax(-3,3);
        this.visual.scale.setTo(-3,3);
        this.visual.anchor.setTo(1,0);
      }
    }
    //return;
    //3rd State - The End Of The Animation
    if(this.finishAction){
      this.finishAction = false;
      this.readyAction = false;
      this.attackTotal = 0;
    }
    //1st State - The Start Of An Attack Animation
    else if(!this.readyAction){
      this.lastAnimation = 3;//3 Will Be Attack State For ALL
      this.visual.animations.play('attack', true);
      this.readyAction = true;
    }
    //2nd State - The Placement of An Attack Collison
    else{
      if(this.visual.frame == 28){
        if(this.attackTotal <  this.attackLimit){

          aiHarmTowards(this);
          this.attackTotal++;
        }
      }
      if(this.visual.frame == 29){
        this.finishAction = true;
      }
    }
  }
}


function aiHarmWave(goblinD){
  goblinD.damage = game.add.sprite(-500, 100, 'collision');
  goblinD.damage.scale.setTo(1,1);
  game.physics.p2.enable(goblinD.damage);
  goblinD.damage.body.fixedRotation = true;
  //aiMaterial = game.physics.p2.createMaterial('aiMaterial', damage);
  goblinD.damage.body.health = 10;
  goblinD.damage.damage = 1;
  goblinD.damage.id = goblinD.aid;
  //console.log("Goblin ID", goblinD.aid);

  goblinD.damage.body.onBeginContact.add(harm, goblinD.damage);

  goblinD.damage.body.static = true;
  goblinD.damage.body.data.shapes[0].sensor = true;
  goblinD.damage.endAtTime = universalTime + 1;

  goblinD.damage.pushPowerX = 200;
  goblinD.damage.pushPowerY = -100;
  goblinD.damage.direction = goblinD.direction;

  //goblinD.damage.alpha = 0;

  goblinD.damage.postUpdate = function(){
    if((this.endAtTime <= universalTime) || this.dead == true){
      this.destroy();
    }
    if(activeAI[this.id] == 0 || activeAI[this.id] == null) return;//!!!!!!FIX HERE
    this.reset(activeAI[this.id].body.x + 13*activeAI[this.id].direction
        ,activeAI[this.id].body.y);
    this.damage.direction = activeAI[this.id].direction;
  }
}

function aiHarmTowards(goblinD){
  goblinD.damage = game.add.sprite(goblinD.body.x, goblinD.body.y-15, 'goblinArrow');
  goblinD.damage.scale.setTo(4,4);
  goblinD.damage.alpha = 0;
  goblinD.damage.projectile = true;
  goblinD.damage.alliance = 2;

  goblinD.damage.visual = game.add.sprite(goblinD.body.x, goblinD.body.y-20, 'goblinArrow');
  goblinD.damage.visual.scale.setTo(4,4);

  game.physics.p2.enable(goblinD.damage);

  goblinD.damage.body.fixedRotation = true;
  //aiMaterial = game.physics.p2.createMaterial('aiMaterial', damage);
  goblinD.damage.body.health = 1;
  goblinD.damage.damage = 1;
  goblinD.damage.id = goblinD.aid;
  //console.log("Goblin ID", goblinD.aid);

  goblinD.damage.body.onBeginContact.add(harmProjectile, goblinD.damage);

  goblinD.damage.body.static = true;
  goblinD.damage.body.data.shapes[0].sensor = true;
  goblinD.damage.endAtTime = universalTime + 3;

  //console.log("did i happen");

  goblinD.damage.pushPowerX = 200;
  goblinD.damage.pushPowerY = -100;
  goblinD.damage.impact = true;
  goblinD.damage.afterEffect = false;

  //goblinD.damage.body.velocity.x = 400 * goblinD.direction;
  accelerateToObject(goblinD.damage, player, 400);

  if(goblin.direction == -1) {
    goblinD.damage.visual.setScaleMinMax(-3,3);
    goblinD.damage.visual.scale.setTo(-3,3);
    goblinD.damage.visual.anchor.setTo(1,0);
  }

  goblinD.damage.direction = goblinD.direction;

  goblinD.damage.postUpdate = function(){
    if((this.endAtTime <= universalTime)){
      this.visual.destroy();
      this.destroy();
      return;
    }
    this.visual.reset(this.body.x, this.body.y);
  }
}

function accelerateToObject(obj1, obj2, speed) {
  if (typeof speed === 'undefined') { speed = 60; }
  var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
  obj1.body.velocity.x = Math.cos(angle) * speed;    // accelerateToObject 
  obj1.body.velocity.y = Math.sin(angle) * speed;
}


function harm(body1){
  if(body1 == null) return;
  if(body1.indestructible || (this.alliance == body1.sprite.alliance)) return;
  if(body1.sprite.invincible == null) return;
  if(body1.sprite.invincible) return;
  else{
    if(player.barrier){
      shieldHurt.play();
      player.rmana--;
      return;
    }
    harmPlayer(player, 1);
    hurt.play();
    console.log(body1);
    push(this, body1);
    startInvincible();
  }
  //tester = this;
  //tester.direction *= -1;
}

function harmProjectile(body1){
  if(body1 == null) return;
  if(body1.indestructible || (this.alliance == body1.sprite.alliance)) return;
  if(body1.sprite.invincible) return;
  else{
    if(body1.sprite.alliance != 1){//ALLIANCE 1 is player therfore
      body1.health -= this.damage;
      console.log(body1.sprite.attack);
      if(body1.health <= 0){
        tmp = body1.sprite.aid;
        if(body1.sprite.attack != null) body1.sprite.attack.destroy();
        console.log("HERE! ", body1);
        body1.sprite.destroy();
        activeAI[tmp] = 0;
        aiTotal--;
      }
    }else{
      if(body1.sprite.invincible == null) return;
      if(player.barrier) return;
      harmPlayer(player, 1);
      hurt.play();
      console.log(body1);
      push(this, body1);
      startInvincible();
    }
    if(this.impact){
      this.endAtTime = universalTime;
      //this.visual.destroy();
      //this.destroy();
    }
  }
}


function doAttack(){
  attack.body.data.shapes[0].sensor = true;
}

function push(ai, target){
  console.log("What");
  player.body.velocity.x += ai.pushPowerX * ai.direction;
  player.body.velocity.y += ai.pushPowerY;
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
  //ai.body.velocity.x = 0;
}
function patrol(ai){
  //ai.body.velocity.x = ai.curSpd * ai.targetAtX;
}
function follow(ai){
  //ai.body.velocity.x = ai.curSpd * ai.targetAtX;
  if(ai.direction == 1){
    if(ai.body.velocity.x < ai.maxSpeed) ai.body.velocity.x += ai.acl;
  }
  else{
    if(ai.body.velocity.x > -ai.maxSpeed) ai.body.velocity.x -= ai.acl;
  }
  ai.direction = ai.targetAtX;
}

function movementAnimation(ai){
  if(ai.lastAnimation == 3){
    ai.visual.animations.play('move', 10, true);
  }
  if(ai.direction == 1){
    if(1 == ai.lastAnimation) return;
    ai.lastAnimation = 1;
    ai.visual.setScaleMinMax(3,3);
    ai.visual.scale.setTo(3,3);
    ai.visual.anchor.setTo(0,0);
  }
  else{
    if(2 == ai.lastAnimation) return;
    ai.lastAnimation = 2;
    ai.visual.setScaleMinMax(-3,3);
    ai.visual.scale.setTo(-3,3);
    ai.visual.anchor.setTo(1,0);
  }
}
//--------------------------------
// 4. AI_Running
//--------------------------------
function aiRuning(){
  //console.log(activeAI.length);
  for(var i = 0; i < activeAI.length; i++){
    if(activeAI[i] == 0) continue; 
    if(aiCheckDistance(activeAI[i], player)){
      follow(activeAI[i]);
    }
    else{
      move(activeAI[i]);
    }
    if(activeAI[i].stop || activeAI[i].readyAction){
      activeAI[i].doAttack();
      //activeAI[i].body.velocity.x = 0;
    }
    else{
      movementAnimation(activeAI[i]);
    }
  }
}

function aiRuningEditor(){
  //console.log(activeAI.length);
  for(var i = 0; i < activeAI.length; i++){
    if(activeAI[i] == 0) continue; 
    if(aiCheckDistance(activeAI[i], player)){
      follow(activeAI[i]);
    }
    else{
      move(activeAI[i]);
    }
    if(activeAI[i].stop || activeAI[i].readyAction){
      activeAI[i].doAttack();
      //activeAI[i].body.velocity.x = 0;
    }
    else{
      movementAnimation(activeAI[i]);
    }
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
  return;
  var damage;
  damage = game.add.sprite(50, 50, 'collision');
  //activeAI[0].addChild(damage);
  damage.scale.setTo(2.3,2.3);
  game.physics.p2.enable(damage);
  damage.body.fixedRotation = true;
  aiMaterial = game.physics.p2.createMaterial('aiMaterial', damage.body);
  damage.body.health = 10;
  damage.damage = 10;

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

//------------------------------
// 7. AI_Cylcling
//------------------------------
function continueGoblins(){
  timer = game.time.create(false);
  timer.loop(5000, goblinMaking123, this);
  timer.start();

  timer2 = game.time.create(false);
  timer2.loop(10000, goblinRare123, this);
  timer2.start();
}

function goblinMaking123(){
  console.log("NEW GOBLIN AT" ,activeAI.length);
  goblinSwordsMan(600,50,activeAI.length);
  goblinSwordsMan(600,50,activeAI.length);
  goblinStaber(500,50,activeAI.length);
}

function goblinRare123(){
  goblinArcher(800,300,activeAI.length);
}

//--------------
//HELPER
//--------------
function avoidance(){

}
