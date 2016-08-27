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
*/
var state = "normal";
var activeBox;

//-----------------------------------------------------
// Player Key Inputs
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
//  Player Action List
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
//  Player Physical Action
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
//  Player Magic  Action
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


function updateSpells(){
  updateMagicBombs();
  updateBarrier();
  if(player.energy) placeFrontOfPlayer(magicBomb);
}

function updateMagicBombs(){
  console.log("Total Spells", spells.length);
  for(var i = spells.length -1; i >= 0; i--){
    if(spells[i].timeAt < pTime){
      if(!spells[i].end) bombFinale(spells[i]);
      else{
        spells[i].kill();
        spells.splice(i, 1);
      } 
    }
  }
}
//--------------------------------------
//  MagicBomb
//--------------------------------------
var magicBombTimer;
//var magicBomb;

function startMagicBombTimer(){
  magicBombTimer = game.time.create(false);
  magicBombTimer.loop(500, chargeMagicBomb, this);
  magicBombTimer.start();
}

function endMagicBombTimer(){
  magicBombTimer.stop();
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

  game.world.bringToTop(bg2);
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

function shootMagicBomb(){
  if(!player.casting || player.energy <= 0) return;

  if(pCharge > 1.2) magicBomb.damage = 0.5 + pCharge*10;
  else magicBomb.damage = 1;
  //console.log('Blaster damage', blaster.damage);
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
  game.world.bringToTop(bg2);

  player.casting = false;
  player.energy = false;
}

function bombFinale(blast){
  blastSound.play(); 
  //blast = this;
  blast.body.static = true;

  blast.end = true;
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  blast.body.velocity.x = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+15;
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onEndContact.add(hitBox, blast);
  //blast.body.onBeginContact.add(missleFinale, blast);
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
  //spells.splice(blast.spellID-1, 1);
}

//______________________________
//  Magic Blast
//______________________________
function makeBlast(){
  chargeSound.play();
  pCharge = 1;
  player.rmana-= 1;
  blaster = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'energyBall');
  blaster.scale.setTo(0.3,0.3);
  game.physics.p2.enable(blaster);
  blaster.body.alliance = 0;
  blaster.body.static = true;
  blaster.body.enableBody = false;
  blaster.pCharge = pCharge;
  blaster.scale.setTo(pCharge,pCharge);
  blaster.gravityScale = 0;
  blaster.body.fixedRotation = true;
  blaster.animations.add('run', [0, 1, 2, 3, 4,5], true);
  blaster.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  blaster.animations.play('run', 15, true);
  blaster.body.x = player.body.x + 100*player.direction;
  blaster.body.y = player.body.y;
  blaster.end = false;
  blaster.body.ptype = 'blast';
  game.world.bringToTop(bg2);
  repositionEnergy();
}

function chargingBlast(){
  blaster.pCharge = pCharge;
  blaster.scale.setTo(pCharge, pCharge);
}

function repositionEnergy(){
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

function playerShoot(){
  if(!player.casting || player.energy <= 0) return;
  shootBlaster();
  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;
  endChargingTimer();
  game.world.bringToTop(bg2);

  player.casting = false;
  player.energy = false;
}

function charging(){
  player.casting = 1;
  //player.charged = pTime;
  chargingTimer();
  makeBlast();
  player.energy = true;
}

function shootBlaster(){
  if(pCharge > 1.2) blaster.damage = 0.5 + pCharge*10;
  else blaster.damage = 1;
  //console.log('Blaster damage', blaster.damage);
  blaster.body.static = false;
  blaster.body.fixedRotation = true;
  blaster.body.data.gravityScale = 0;
  blaster.body.damping = 0;
  blaster.body.velocity.y = 0;
  blaster.body.force = 3000;
  placeFrontOfPlayer(blaster);

  blaster.body.setMaterial(magicMaterial);
  blaster.timeAt = pTime + 10;
  //blaster.body.onBeginContact.add(hitBox, blaster);
  blaster.body.onBeginContact.add(missleFinale, blaster);
  spells.push(blaster);
  player.casting = 0;
  shootSound.play();
}


function hitBox(body1, body2){
  if(body1 == null) return;
  if(body1.indestructible) return;
  tester = this;
  body1.health -= tester.damage;
  if(body1.health <= 0) body1.sprite.kill();
}

function missleFinale(body1, body2){
  blast = this;
  //console.log(body1);
  if(body1 != null && (blast.end || blast.body.ptype == body1.ptype)) return;
  //console.log(body1);
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
  //spells.splice(blast.spellID-1, 1);
}

function missleFinaleD(blast){
  //if(blaster.end) return;
  blastSound.play();
  //blast = this;
  blast.body.static = true;
  //console.log(pCharge);
  //console.log("You Shoot A Blast", blast.height, blast.width);
  blast.end = true;
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  blast.body.velocity.x = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+15;
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onEndContact.add(hitBox, blast);
  //blast.body.onBeginContact.add(missleFinale, blast);
}


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

function playerLevitate(){
  if(player.rmana <= 0){
    player.levitation = false;
    return;
  }
  player.body.velocity.y = 0;

}

function playerBarrier(){
  if(player.rmana <= 0) return;
  if(player.energy){
    console.log("Barrier Push");
    barrierPower(); 
    //playerShoot();
    blaster.kill();
    player.casting = 0;
    endChargingTimer();
    //playerTower();
    return;
  }
  circleBarrier.play('run', 10, true);
  circleBarrier.alpha = 0.8;
  player.barrier = true;
  player.casting = 1;
  player.rmana -= 3;

  wallSound.play();
  //wall();
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
