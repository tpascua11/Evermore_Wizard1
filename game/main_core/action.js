/*
        ,     \    /      ,
       / \    )\__/(     / \
      /   \  (0\  /0)   /   \
 ____/_____\__\@  @/___/_____\____
|             |\../|              |
|              \VV/               |
|        ---- Action -----        |
|_________________________________|
 |    /\ /      \\       \ /\    |
 |  /   V        ))       V   \  |
 |/     `       //        '     \|

Player_Key_Inputs
Player_Actions_List
Player_Physical_Action
Player_Spell_Setup
Magic_Bomb
*/
var state = "normal";
var activeBox;

//-----------------------------------------------------
// Player_Key_Inputs
//-----------------------------------------------------
function playerActions(){
  doJump.onDown.add(input, {action: "jump"});
  doJump.onUp.add(input, {action: "jumpStop"});

  moveLeft.onDown.add(input, {action: "walkL"});
  moveLeft.onUp.add(input, {action: "walkLstop"});

  moveRight.onDown.add(input, {action: "walkR"});
  moveRight.onUp.add(input, {action: "walkRstop"});

  moveUp.onDown.add(input, {action: "scan"});
  moveUp.onUp.add(input, {action: "scanStop"});

  moveDown.onDown.add(input, {action: "duck"});
  moveDown.onUp.add(input, {action: "duckStop"});

  sprint.onDown.add(input, {action: "sprint"});
  sprint.onUp.add(input, {action: "sprintStop"});

  sprint.onDown.add(input, {action: "sprint"});
  sprint.onUp.add(input, {action: "sprintStop"});

  magicBarrier.onDown.add(input, {action: "barrier"});
  magicBarrier.onUp.add(input, {action: "barrierStop"});

  magicMissle.onDown.add(input, {action: "bomb"});
  magicMissle.onUp.add(input, {action: "bombStop"});
}
//----------------------------------------------------
//  Player_Action_List
//----------------------------------------------------
//TODO JUST USE THE ACTION VARIABLES for the CALL FUNCTION
//    or maybe not
function input(){
  if(state == "normal"){
    switch(this.action){
      case "jump"     : window["playerJump"](); break;
      case "jumpStop" : window["playerJumpStop"](); break;
      case "walkL"    : window["playerMoveLeft"]() ; break;
      case "walkLstop": window["playerStopLeft"]() ;break;
      case "walkR"    : window["playerMoveRight"]();break;
      case "walkRstop": window["playerStopRight"]();break;
      case "sprint"   : window["playerSprint"]();break;
      case "sprintStop": window["playerSprintStop"](); break;
      case "duck"     : break;
      case "duckStop" : break;
      case "scan"     : break;
      case "scanStop" : break;
      case "barrier"  : window["playerBarrier"](); break;
      //case "barrierStop": window["playerStopBarrier"](); break;
      case "bomb": window["chargeMagic"](); break;
      case "bombStop": window["magicBlast"](); break;
      //case "bombStop": window["trueMagicBomb"](); break;
      default: break;
    }
  }
  else if(state == "sprinting"){
    //console.log(state, action);
  }
  else if(state == "charging"){
    switch(this.action){
      case "bombStop": window["trueMagicBomb"](); break;
      case "jump": window["magicBlast"](); break;
      case "walkL"    : window["playerMoveLeft"]() ; break;
      case "walkLstop": window["playerStopLeft"]() ;break;
      case "walkR"    : window["playerMoveRight"]();break;
      case "walkRstop": window["playerStopRight"]();break;
      case "sprint"   : window["playerSprint"]();break;
      case "sprintStop": window["playerSprintStop"](); break;
      case "barrier"  : window["playerBarrier"](); break;
      case "duck"     : break;
      case "duckStop" : break;
      case "scan"     : break;
      default: break;
    }
  }
  else if(state == "barrier"){
    switch(this.action){
      case "bombStop": window["trueMagicBomb"](); break;
      case "walkL"    : window["playerMoveLeft"]() ; break;
      case "walkLstop": window["playerStopLeft"]() ;break;
      case "walkR"    : window["playerMoveRight"]();break;
      case "walkRstop": window["playerStopRight"]();break;
      case "sprint"   : window["playerSprint"]();break;
      case "sprintStop": window["playerSprintStop"](); break;
      case "duck"     : break;
      case "duckStop" : break;
      case "scan"     : break;
      case "jump"     : window["teleportWave"](); break;
      //case "barrierTeleport": window["teleportTest"]();break;
      //case "jump": window["teleportTest"]();break;
      case "barrierStop": window["playerStopBarrier"](); break;
      default: break;
    }
  }
  else if(state == "rift"){
    switch(this.action){
      //case "duck"     : window["playerFlyDown"]();  break;
      //case "duckStop" : window["playerStopDown"](); break;
      //case "scan"     : window["playerFlyUp"](); break;
      //case "scanStop" : window["playerStopUp"](); break;
      //case "walkL"    : window["playerMoveLeft"]() ; break;
      case "walkLstop": window["playerStopLeft"]() ;break;
      //case "walkR"    : window["playerMoveRight"]();break;
      case "walkRstop": window["playerStopRight"]();break;
      //case "jumpStop" : window["teleportAt"](); break;
      default: break;
    }
  }
  else{
    //console.log(state, action);
  }
  console.log(state, this.action);
}

//-----------------------------------------------
//  Player_Physical_Action
//-----------------------------------------------
function playerMoveLeft(){
  player.direction = -1;
  player.moveRight = 0;
  player.moveLeft = 1;
}
function playerStopLeft(){
  player.moveLeft = 0;
}
function playerMoveRight(){
  player.direction = 1;
  player.moveLeft= 0;
  player.moveRight = 1;
}
function playerStopRight(){
  player.moveRight = 0;
}
function playerSprint(){
  player.sprinting = 1;
}
function playerSprintStop(){
  player.sprinting = 0;
}

function playerFlyUp(){
  player.body.velocity.y = -250;
}
function playerStopUp(){
  player.body.velocity.y = 0;
}
function playerFlyDown(){
  player.body.velocity.y = 250;
}
function playerStopDown(){
  player.body.velocity.y = 0;
}

function playerJump(){
  console.log("before player jump: ", player.jump);
  if(player.jump >= 1 || player.casting) return;
  player.jump++;
  player.jumping = 1;
  jumpSound.play();
  console.log("Jumping\n");
}

function playerJumpStop(){
  if(player.casting) return;
  player.jumping  = 0;
  player.jumpAtY = 0;
}

//-----------------------------------------------
//  Player_Spell_Setup
//-----------------------------------------------
var spells = [];
var magicBombs = [];
var blast = [];
var blastMaterial;

function createMagicMaterial(){
  magicMaterial = game.physics.p2.createMaterial('magicMaterial');
  blastMaterial = game.physics.p2.createMaterial('blastMaterial');
}

function setupSpells(){
  createMagicMaterial();

  blastSound  = game.add.audio('blast');  blastSound.volume = 0.2;
  blast2Sound  = game.add.audio('blast2');  blast2Sound.volume = 0.2;
  chargeSound = game.add.audio('charge'); chargeSound.volume = 1;
  shootSound  = game.add.audio('shoot');  shootSound.volume = 0.5;
  teleportSound = game.add.audio('teleport'); teleportSound.volume = 0.2;
  wallSound = game.add.audio('wall'); wallSound.volume = 0.2;

  circleBarrier = game.add.sprite(-35, -23, 'circleBarrier');
  circleBarrier.scale.setTo(3.5, 3.5);
  circleBarrier.setScaleMinMax(3.5, 3.5);
  circleBarrier.alpha = 0;
  circleBarrier.frame = 0;
  circleBarrier.animations.add('run', [0, 1, 2, 3, 4, 5], true);
  circleBarrier.animations.add('end', [8, 9, 10, 11, 12, 13, 14, 15, 16], false);
  circleBarrier.play('run', 10, true);
  player.addChild(circleBarrier);

  circleCasting = game.add.sprite(-40, -23, 'chargeCast');
  circleCasting.scale.setTo(3.2, 3.2);
  circleCasting.alpha = 0;
  circleCasting.frame = 0;
  circleCasting.animations.add('run', [0, 1, 2, 3, 4, 5], 5, true);
  circleCasting.animations.add('end', [6, 7, 8, 9, 10, 11],5, true);
  //circleCasting.play('run', true);
  circleCasting.scale.setTo(3,3);
  circleCasting.setScaleMinMax(3,3);
  player.addChild(circleCasting);

}

function placeFrontOfPlayer(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y + 40;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y - 40;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + 60;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - 40;
  }
  else{
    magicObject.body.y = player.body.y - 12;
    magicObject.body.x = player.body.x + 35 * player.direction;
  }
}

function placeFrontOfPlayerWith(magicObject, x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + x*player.direction;
    magicObject.body.y = player.body.y + y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + x*player.direction;
    magicObject.body.y = player.body.y - y;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + y;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - y;
  }
  else{
    magicObject.body.y = player.body.y - 7;
    magicObject.body.x = player.body.x + x * player.direction;
  }
}

function placeFrontOfPlayerVisualChange(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y + 40;
    if(player.direction == 1){
      magicObject.angle = 45;
    }else{
      magicObject.angle = 135;
    }
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y - 40;
    if(player.direction == -1){
      magicObject.angle = -135;
    }
    else magicObject.angle = -45;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + 60;
    magicObject.angle = 90;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - 40;
    magicObject.angle = -90;
  }
  else{
    magicObject.body.y = player.body.y - 12;
    magicObject.body.x = player.body.x + 35 * player.direction;
    if(player.direction == -1){
      magicObject.angle = 180;
    }
  }
}


function moveFrontOfPlayer(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = 500*player.direction;
    magicObject.body.velocity.y = 350;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = 500*player.direction;
    magicObject.body.velocity.y = -350;
  }
  else if(moveDown.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = 500;
  }
  else if(moveUp.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = -500;
  }
  else{
    magicObject.body.velocity.y = 0;
    magicObject.body.velocity.x = 500*player.direction;
  }
}

function moveFrontOfPlayerWith(magicObject, x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = x*player.direction;
    magicObject.body.velocity.y = y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = x*player.direction;
    magicObject.body.velocity.y = -y;
  }
  else if(moveDown.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = y;
  }
  else if(moveUp.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = -y;
  }
  else{
    magicObject.body.velocity.y = 0;
    magicObject.body.velocity.x = x*player.direction;
  }
}


function movePlayer(x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x = -x*player.direction;
    player.body.velocity.y = -y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x = -x*player.direction;
    player.body.velocity.y = y;
  }
  else if(moveDown.isDown){
    player.body.velocity.x = 0;
    player.body.velocity.y = -y;
  }
  else if(moveUp.isDown){
    player.body.velocity.x = 0;
    player.body.velocity.y = y;
  }
  else{
    player.body.velocity.x = -x*player.direction;
    player.body.velocity.y = 0;
  }
}

//TODO: We might need to make a new section called status effect
function updateStatusEffect(){

}

function updateSpells(){
  updateMagicBombs();
  updateBarrier();
  //if(player.energy) placeFrontOfPlayer(magicBomb);
  //if(player.rmana <= 0) magicBoostEnd();
}

function updateMagicBombs(){
  //console.log("Total Spells", spells.length);
  for(var i = spells.length -1; i >= 0; i--){
    if(spells[i].timeAt < pTime){
      if(!spells[i].end) window[spells[i].castEnd](spells[i]);
      else{
        spells[i].kill();
        spells.splice(i, 1);
      } 
    }
  }
}

function hitBox(body1, body2){
  if(body1 == null) return;
  if(body1.indestructible || (this.alliance == body1.sprite.alliance)) return;
  console.log("Attack Alliance: ", this.alliance);
  console.log("Target Alliance: ", body1.sprite.alliance);
  console.log("I should not happen");
  tester = this;
  body1.health -= tester.damage;
  console.log(body1.sprite.attack);
  if(body1.health <= 0){
    tmp = body1.sprite.aid;
    if(body1.sprite.attack != null) body1.sprite.attack.destroy();
    console.log("HERE! ", body1);
    body1.sprite.destroy();
    activeAI[tmp] = 0;
    aiTotal--;
  }
}

function forceBox(body1, body2){
  if(body1 == null) return;
  if(body1.indestructible || (this.alliance == body1.sprite.alliance)) return;
  tester = this;
  body1.health -= tester.damage;
  console.log(body1.sprite.attack);
  if(body1.sprite.projectile){
    body1.sprite.alliance = this.alliance;
    moveFrontOfPlayerWith(body1.sprite, 500, 500);
    return;
  }
  moveFrontOfPlayerWith(body1.sprite, 1400, 1400);
  if(body1.health <= 0){
    tmp = body1.sprite.aid;
    if(body1.sprite.attack != null){
      body1.sprite.attack.destroy();
    }
    if(body1.sprite.visual != null) body1.sprite.visual.destroy();
    console.log("HERE! ", body1);
    body1.sprite.destroy();
    activeAI[tmp] = 0;
    aiTotal--;
  }
}
//--------------------------------------
//  Charging_Magic
//--------------------------------------
var chargeTimer;
var chargeSec = (Phaser.Timer.SECOND * 0.4);
function startChargingMagicTimer(){
  chargeTimer = game.time.create(false);
  chargeTimer.loop(chargeSec, chargingMagic, this);
  chargeTimer.start();
}

function endMagicBombTimer(){
  magicBombTimer.stop();
}

function chargingMagic(){
  if(pCharge <= 3){
    pCharge+=1;
    //circleCasting.animations.currentAnim.speed = pCharge*16;
    circleCasting.animations.currentAnim.speed = pCharge*16;
    console.log("PCHARGE!!!", pCharge);
  }else{
    console.log("CHARGE AT LIMIT");
  }
}

function chargeMagic(){
  player.rmana-=1;
  console.log("Starting To Charge Up");
  chargeSound.loop = true;
  chargeSound.play();
  pCharge = 1;
  player.charging = 1;
  player.casting = 1;
  circleCasting.play('run', 15, true);
  circleCasting.alpha = 1;
  startChargingMagicTimer();
  state = "charging";
}

function trueMagicBomb(){
  if(!player.charging) return;
  player.charging = player.casting = 0;

  magicBomb = game.add.sprite(0, 0, 'energyBall');
  magicBomb.scale.setTo(1,1);
  game.physics.p2.enable(magicBomb);
  if(pCharge == 1){
    magicBomb.scale.setTo(1,1);
    magicBomb.damage = 15;
    magicBomb.timeAt = pTime + 1;
  }
  else if(pCharge == 2){
    magicBomb.scale.setTo(1.2,1.2);
    magicBomb.damage = 20;
    magicBomb.timeAt = pTime + 11;
  }
  else{
    magicBomb.scale.setTo(1.4,1.4);
    magicBomb.damage = 30;
    magicBomb.timeAt = pTime + 13;
  }
  magicBomb.alliance = 1;
  magicBomb.body.alliance = 1;
  magicBomb.body.enableBody = false;
  magicBomb.force = pCharge * 50;

  magicBomb.body.setMaterial(magicMaterial);

  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4,5], true);
  magicBomb.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  magicBomb.animations.play('run', 15, true);
  magicBomb.end = false;
  magicBomb.body.ptype = 'blast';

  magicBomb.gravityScale = 0;
  magicBomb.castEnd = "bombFinale";
  magicBomb.body.static = false;
  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  magicBomb.body.force = 0;
  magicBomb.pCharge = pCharge;

  magicBomb.end = false;
  magicBomb.body.onBeginContact.add(bombFinaleContact, magicBomb);

  chargeTimer.stop();
  placeFrontOfPlayer(magicBomb);
  moveFrontOfPlayer(magicBomb);
  player.casting = false;
  player.energy = false;

  shootSound.play();
  chargeSound.stop();
  spells.push(magicBomb);

  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;

  circleCasting.play('end', 30, false);
  //circleCasting.alpha = 0;
  state = "normal";
}

function bombFinale(blast){
  blast.body.static = true;
  blastSound.play();
  blast.end = true;
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  blast.body.velocity.x = 0;
  blast.body.velocity.y = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+10;
  blast.scale.setTo(3 + blast.pCharge, 3 + blast.pCharge);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
}

function bombFinaleContact(body1, body2){
  if(this.end == true) return;
  if(body1 != null && body1.alliance == 1) return;
  blastSound.play();
  blast = this;
  blast.body.static = true;
  blast.end = true;
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 30, false, true);
  if(blast.pCharge == 1){
    blast.body.velocity.x /= 2;
    blast.body.velocity.y /= 2;
  }
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+10;
  blast.scale.setTo(3 + blast.pCharge, 3 + blast.pCharge);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
}
//-----------------------------
//  Magic BLast
//---------------------------
function magicBlast(){
  if(!player.charging) return;
  if(player.focus <= 0) return;
  player.focus-=2;
  //if(player.focus <= 50) return;
  player.charging = player.casting = 0;
  //player.focus-=33;

  magicBomb = game.add.sprite(0, 0, 'magicBlast');
  //magicBomb.scale.setTo(1,1);
  magicBomb.scale.setTo(pCharge*3,2);
  game.physics.p2.enable(magicBomb);
  magicBomb.body.alliance = 1;
  magicBomb.body.enableBody = false;
  magicBomb.force = pCharge * 50;

  magicBomb.damage = 3 + pCharge*5;

  magicBomb.body.setMaterial(magicMaterial);

  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], true);
  magicBomb.animations.play('run', 40, false);
  magicBomb.end = true;
  magicBomb.body.ptype = 'blast';

  magicBomb.gravityScale = 0;
  magicBomb.castEnd = "bombFinale";
  //magicBomb.body.static = true;
  magicBomb.body.data.shapes[0].sensor = true;

  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  //magicBomb.body.force = 3000;
  magicBomb.body.direction = player.direction;
  magicBomb.pCharge = pCharge;

  magicBomb.timeAt = pTime + 2;
  magicBomb.alliance = 1;
  magicBomb.body.onBeginContact.add(forceBox, magicBomb);

  chargeTimer.stop();
  placeFrontOfPlayerVisualChange(magicBomb);
  //moveFrontOfPlayerWith(magicBomb, 500*pCharge, 500);
  movePlayer(400+pCharge*60,400+pCharge*60);
  player.casting = false;
  player.energy = false;

  //shootSound.play();
  blast2Sound.play();
  chargeSound.stop();
  spells.push(magicBomb);

  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;

  circleCasting.play('end', 30, false);
  //circleCasting.alpha = 0;
  state = "normal";
}

//-----------------------------
//  Magic Barrier
//-----------------------------
function updateBarrier(){
  //circleBarrier.x = player.body.x-30;
  //circleBarrier.y = player.body.y-30;
}
/*
   function playerStopBarrier(){
   if(!player.barrier) return;
   pCharge = 1;
   circleBarrier.play('end', 20, false);

   player.casting = false;
   player.barrier = false;
   player.jumping = 0;
   player.jumpAtY = 0;
   }*/

function playerStopBarrier(){
  if(!player.barrier) return;
  pCharge = 1;

  circleBarrier.play('end', 20, false);

  player.casting = false;
  player.barrier = false;
  player.jumping = 0;
  player.jumpAtY = 0;

  state = "normal";
}

function playerBarrier(){
  if(player.rmana <= 0) return;
  player.rmana -= 1;
  circleBarrier.play('run', 10, true);
  //circleBarrier.tint = 0xFF0000;
  circleBarrier.alpha = 0.7;
  player.barrier = true;
  player.casting = 1;

  wallSound.play();
  state = "barrier";
}

function playerSuperBarrier(){
  if(player.rmana <= 0) return;
  player.rmana -= 1;
  circleBarrier.play('run', 10, true);
  circleBarrier.alpha = 0.9;
  player.barrier = true;
  player.casting = 1;

  wallSound.play();
  state = "barrier";
}


//-----------------------------
// Magic Boost
//-----------------------------
var saveSpeed;
var saveSprint;
var saveDamageMod;
var magicBoostOn = false;
var teleportPastx;
var teleportPasty;

function magicBoost(){
  if(player.rmana <= 0) return;
  saveSpeed = saveSprint = 0;
  saveSpeed = player.speed;
  saveDamageMod = player.damageModifier;
  saveSprint = player.sprintSpd;
  player.speed = 350;
  player.sprintSpd = 700;
  player.damageModifier = 2;
}

function magicBoostEnd(){
  player.speed = 1000;
  player.sprintSpd = 1000;
}

var connection;
var teleport;

function teleportWave(){
  if(player.rmana <= 0) return;
  player.rmana -= 1;
  if(player.focus <= 0) return;
  if(teleport != null) teleport.destroy();
  player.focus-=2;
  var teleportVisualEnd;
  teleportVisualEnd = game.add.sprite(player.body.x-35, player.body.y-23, 'teleport301');

  teleportVisualEnd.animations.add('run', [0, 1, 2, 3, 4, 5], true);
  teleportVisualEnd.animations.play('run', 25, false, true);
  teleportVisualEnd.scale.setTo(5,5);

  teleportSound.play();

  teleport = game.add.sprite(0, 0, 'teleport301');
  teleport.scale.setTo(3,3);
  game.physics.p2.enable(teleport);

  teleport.body.static = false;
  teleport.body.data.gravityScale = 0;
  teleport.body.damping = 0;
  teleport.body.force = 0;
  teleport.alpha = 1;
  teleport.invincible = true;

  placeFrontOfPlayerWith(teleport,100,100);

  startTeleportTimer();


  teleport.indestructible = true;
  teleport.alliance = 1;

  teleportPastx = player.body.x;
  teleportPasty = player.body.y;

  moveFrontOfPlayerWith(player, 450, 450);

  teleportVisual = game.add.sprite(teleport.body.x-23, teleport.body.y-23, 'teleport301');
  teleportVisual.scale.setTo(3,3);

  teleportVisual.animations.add('run', [5, 4, 3, 2, 1, 0], true);
  teleportVisual.animations.play('run', 25, false, true);

  player.body.data.shapes[0].sensor = true;
  //player.body.static = true;
  player.alpha = 0;

  teleport.body.onBeginContact.add(teleportConnection, blast);
  teleport.body.onEndContact.add(teleportDisconnection, blast);
}

function teleportConnection(body1, body2){
  connection++;
  teleportGo();
}

function teleportDisconnection(body1, body2){
  //connection--;
}

var teleportTimer;
function startTeleportTimer(){
  teleportTimer= game.time.create(false);
  teleportTimer.loop(400, teleportGo, this);
  teleportTimer.start();
}
function teleportGo(){
  teleport.allaince = 1;
  teleport.body.x = -500;
  teleport.body.static = true;
  teleport.timeAt = pTime;
  teleport.end = true;
  spells.push(teleport);
  if(connection == 0){
    //placeFrontOfPlayerWith(player,100,100);
    //player.reset(teleportPastx, teleportPasty);
  }
  teleportTimer.stop();
  connection = 0;

  player.body.data.shapes[0].sensor = false;
  player.body.static = false;
  player.alpha = 1;
}
//-----------------------------
//  Magic Levitation
//-----------------------------
function playerLevitate(){
  if(player.rmana <= 0){
    player.levitation = false;
    return;
  }
  player.body.velocity.y = 0;
}

function waveFollow(obj1, obj2, speed){
  if (typeof speed === 'undefined') { speed = 60; }
  var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
  obj1.body.velocity.x = Math.cos(angle) * speed;    // accelerateToObject 
  obj1.body.velocity.y = Math.sin(angle) * speed;
}


function levitationSwitch(){
  player.levitation = !player.levitation;
}



