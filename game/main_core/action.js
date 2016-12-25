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
      case "bomb": window["makeMagicBomb"](); break;
      case "bombStop": window["shootMagicBomb"](); break;
      case "barrier": window["playerBarrier"](); break;
      case "barrierStop": window["playerStopBarrier"](); break;
      default: break;
    }
  }
  else if(state == "sprinting"){
    console.log(state, action);
  }
  else if(state == "bomb"){
    switch(action){
      case "bombBlast": break;
      case "bombShoot": break;
    }
  }
  else if(state == "barrier"){
    switch(action){
      case "barrierTeleport": break;
      case "barrier": break;
    }
  }
  else{
    console.log(state, action);
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

function playerJump(){
  console.log("before player jump: ", player.jump);
  if(player.jump >= 1 || player.casting) return;
  console.log("im with top");
  player.jump++;
  console.log("after player jump: ", player.jump);
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
  chargeSound = game.add.audio('charge'); chargeSound.volume = 0.2;
  shootSound  = game.add.audio('shoot');  shootSound.volume = 0.2;
  teleportSound = game.add.audio('teleport'); teleportSound.volume = 0.2;
  wallSound = game.add.audio('wall'); wallSound.volume = 0.2;

  circleBarrier = game.add.sprite(300, 100, 'circleBarrier');
  circleBarrier.scale.setTo(3.2, 3.2);
  circleBarrier.alpha = 0;
  circleBarrier.frame = 0;
  circleBarrier.animations.add('run', [0, 1, 2, 3, 4, 5], true);
  circleBarrier.animations.add('end', [8, 9, 10, 11, 12, 13, 14, 15, 16], false);
  circleBarrier.play('run', 10, true);
}

function placeFrontOfPlayer(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 75*player.direction;
    magicObject.body.y = player.body.y + 50;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 75*player.direction;
    magicObject.body.y = player.body.y - 50;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + 60;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - 60;
  }
  else{
    magicObject.body.y = player.body.y;
    magicObject.body.x = player.body.x + 75 * player.direction;
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

function movePlayer(x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x = x*player.direction;
    player.body.velocity.y = y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x = x*player.direction;
    player.body.velocity.y = -y;
  }
  else if(moveDown.isDown){
    player.body.velocity.x = 0;
    player.body.velocity.y = y;
  }
  else if(moveUp.isDown){
    player.body.velocity.x = 0;
    player.body.velocity.y = -y;
  }
  else{
    player.body.velocity.x = x*player.direction;
    player.body.velocity.y = 0;
  }
}

//TODO: We might need to make a new section called status effect
function updateStatusEffect(){

}

function updateSpells(){
  updateMagicBombs();
  updateBarrier();
  if(player.energy) placeFrontOfPlayer(magicBomb);
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
  if(body1.indestructible) return;
  tester = this;
  body1.health -= tester.damage;
  if(body1.health <= 0) body1.sprite.kill();
}
//--------------------------------------
//  Magic_Bomb
//--------------------------------------
var magicBombTimer;

function startMagicBombTimer(){
  magicBombTimer = game.time.create(false);
  magicBombTimer.loop(500, chargeMagicBomb, this);
  magicBombTimer.start();
}

function endMagicBombTimer(){
  magicBombTimer.stop();
}

function chargeMagicBomb(){
 if(pCharge <= 4){
    pCharge+= 0.3;
    player.rmana -= 1;
 }
 if(player.casting){
  magicBomb.pCharge = pCharge;
  magicBomb.scale.setTo(pCharge, pCharge);
 }

 chargeSound.play();
}

function makeMagicBomb(){
  player.casting = 1;
  startMagicBombTimer();

  chargeSound.play();
  pCharge = 1;
  player.rmana-= 1;
  magicBomb = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'energyBall');
  magicBomb.scale.setTo(0.3,0.3);
  game.physics.p2.enable(magicBomb);
  magicBomb.body.alliance = 0;
  magicBomb.body.static = true;
  magicBomb.body.enableBody = false;
  magicBomb.pCharge = pCharge;
  magicBomb.scale.setTo(pCharge,pCharge);
  magicBomb.gravityScale = 0;
  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4,5], true);
  magicBomb.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  magicBomb.animations.play('run', 15, true);
  magicBomb.body.x = player.body.x + 100*player.direction;
  magicBomb.body.y = player.body.y;
  magicBomb.end = false;
  magicBomb.body.ptype = 'blast';

  placeFrontOfPlayer(magicBomb);
  player.energy = true;

  //game.world.bringToTop(bg2);
}


function shootMagicBomb(){
  if(!player.casting || player.energy <= 0) return;

  if(pCharge > 1.2) magicBomb.damage = 0.5 + pCharge*10;
  else magicBomb.damage = 1;
  //console.log('Blaster damage', blaster.damage);
  magicBomb.castEnd = "bombFinale";
  magicBomb.body.static = false;
  magicBomb.body.fixedRotation = true;
  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  magicBomb.body.force = 3000;
  placeFrontOfPlayer(magicBomb);

  magicBomb.body.setMaterial(magicMaterial);
  magicBomb.timeAt = pTime + 10;
  magicBomb.body.onBeginContact.add(bombFinaleContact, magicBomb);
  spells.push(magicBomb);
  player.casting = 0;
  shootSound.play();

  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;
  
  endMagicBombTimer();

  moveFrontOfPlayer(magicBomb);
  //game.world.bringToTop(bg2);

  player.casting = false;
  player.energy = false;
  if(pCharge >= 4) movePlayer(-600, -600);
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
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
}

function bombFinaleContact(body1, body2){
  blast = this;
  if(body1 != null && (blast.end || blast.body.ptype == body1.ptype)) return;
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
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
}

//-----------------------------
//  Magic Barrier
//-----------------------------
function updateBarrier(){
  circleBarrier.x = player.body.x-30;
  circleBarrier.y = player.body.y-30;
}

function playerStopBarrier(){
  if(!player.barrier) return;
  pCharge = 1;
  circleBarrier.play('end', 20, false);

  player.casting = false;
  player.barrier = false;
  player.jumping = 0;
  player.jumpAtY = 0;
}

function playerBarrier(){
  if(player.rmana <= 0) return;
  circleBarrier.play('run', 10, true);
  circleBarrier.alpha = 0.8;
  player.barrier = true;
  player.casting = 1;
  player.rmana -= 3;

  wallSound.play();
}

//-----------------------------
// Magic Boost
//-----------------------------
var saveSpeed;
var saveSprint;
var saveDamageMod;
var magicBoostOn = false;

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

//-----------------------------
//  Magic Levitation
//-----------------------------
function playerLevitate(){
  if(player.rmana <= 0){
    player.levitation = false;
    return;
  }
  console.log("testing");
  player.body.velocity.y = 0;

}

function levitationSwitch(){
  player.levitation = !player.levitation;
}

function repositionEnergyTemplate(){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    blaster.body.x = player.body.x + 75*player.direction;
    blaster.body.y = player.body.y + 50;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    blaster.body.x = player.body.x + 75*player.direction;
    blaster.body.y = player.body.y - 50;
  }
  else if(moveDown.isDown){
    blaster.body.x = player.body.x;
    blaster.body.y = player.body.y + 60;
  }
  else if(moveUp.isDown){
    blaster.body.x = player.body.x;
    blaster.body.y = player.body.y - 60;
  }
  else{
    blaster.body.y = player.body.y;
    blaster.body.x = player.body.x + 75 * player.direction;
  }
}
