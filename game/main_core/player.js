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

//1. Player_Information
//2. Player_Building
//3. Spell_Building
//4. Player_Actions
//5. Player_Physics
*/

//---------------------------------------------------------
// 1. Player_Information
//---------------------------------------------------------
var player;
var playerMaterial;
var magicCG;
var groundPlayerCM;
var playerFPS = 0;
var playerMana = 0;
var playerFPStext;

var playerStats = {
  health   : 100,
  maxHealth: 100,
  mana     : 75 ,
  maxMana  : 100,
  rmana    : 25 ,
  maxRmana : 25 ,
  curSpd   : 0  ,
  speed    : 300,
  sprintSpd: 500,
  sprinting: 0  ,
  acl      : 50 ,
  moveLeft : 0  ,
  moveRight: 0  ,
  moving   : 0  ,
  jump     : 0  ,
  jumpTotal: 100,
  jumpAtY  : 0  ,
  jumpAcl  : 5  ,
  jumpSpan : 75 ,
  direction: 1  ,
  casting  : 0  ,
  charged  : 0  ,
  stepsCount: 25,
  rechargeRate: 5,
  resistance: "nothing",
  weak: "nothing"
};

//---------------------------------------------------------
// 2. Player_Building
//---------------------------------------------------------
function loadPlayerSprite(){
  //SpriteSheet
  game.load.spritesheet('dino', '../assets/player/Vark_v41.png', 20, 20);
  game.load.spritesheet('bmissle', '../assets/DarkMagicMisslesB.png', 64, 64);
  game.load.spritesheet('smissle', '../assets/Blue_Magic_Missles.png', 16, 16);
  game.load.spritesheet('energyBall', '../assets/spells/BlueEnergyBall.png', 16, 16);
  //game.load.spritesheet('teleport', '../assets/White_Teleport-sheet.png', 16, 16);
  game.load.spritesheet('casting', '../assets/Casting.png', 16, 16);
  game.load.spritesheet('magicBlock', '../assets/spells/MagicBlock.png', 8, 16);
  game.load.spritesheet('magicShield', '../assets/spells/Shield_Up.png', 4, 16);
  game.load.spritesheet('magicExpand', '../assets/spells/BlueExpand.png', 16, 16);

  //Sound 
  game.load.audio('blast', '../assets/sound_effect/Blast.wav');
  game.load.audio('charge', '../assets/sound_effect/Charge.wav');
  game.load.audio('shoot', '../assets/sound_effect/Shoot.wav');
  game.load.audio('teleport', '../assets/sound_effect/Teleport.wav');
  game.load.audio('wall', '../assets/sound_effect/Wall.wav');
  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('jumpSound', '../assets/Jump19.wav');
}

function createPlayer(){
  playerBody();
  playerTesting();
  playerSounds();
  createPlayerAnimations();
  playerControl();
  createPlayerSpells();
  continuePlayerTimer();
  startRegenTimer();
  playerMana = game.add.text(player.body.x, player.body.y, game.time.fps, {fontSize: '32px', fill: '#66ffcc'});
  playerFPS = game.add.text(player.body.x, player.body.y, game.time.fps, {fontSize: '32px', fill: '#ffff00'});
  setupSpells();
}

function playerTesting(){
    console.log("Can I drag you");
    player.anchor.set(0.5);
    player.body.static = true;
    //player.body.static = false;
    //player.inputEnabled = true;
    //player.input.enableDrag(true);
}

function playerBody(){
  //Remember: Set Scale Then apply Phyisics
  player = game.add.sprite(300, 100, 'dino');
  player.scale.setTo(3,3);
  game.physics.p2.enable(player);
  player.body.fixedRotation = true;
  player.body.damping = 0.5;
  playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);
  for(var attrname in playerStats){player[attrname] = playerStats[attrname]}
}

function playerSounds(){
  steps = game.add.audio('steps'); steps.volume = 0.5;
  jumpSound = game.add.audio('jumpSound'); jumpSound.volume = 0.5; 
}

function playerControl(){
  sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  doJump = game.input.keyboard.addKey(Phaser.Keyboard.W);
  moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);

  magicMissle = game.input.keyboard.addKey(Phaser.Keyboard.K);
  magicBarrier = game.input.keyboard.addKey(Phaser.Keyboard.L);
  teleport = game.input.keyboard.addKey(Phaser.Keyboard.J);
}

function createPlayerAnimations(){
  player.animations.add('right', [28, 29, 30, 31, 32, 33], 25, true);
  player.animations.add('left', [19, 20, 21, 22, 23, 24], 25, true);
  player.animations.add('leftJump', [59, 60, 61, 62], 10, true);
  player.animations.add('rightJump', [68, 69, 70, 71], 10, true);
  player.animations.add('leftSprint', [41, 42, 43, 44], 10, true);
  player.animations.add('rightSprint', [50, 51, 52, 53], 10, true);
}

//--------------------------------------------------------
// Player_Timers
//--------------------------------------------------------
var playerTimer;
var chargeTimer;
var regenTimer;
var regenDo;
var pTime = 0;
var pCharge = 0.2;

//---------------
// Main Timer
//---------------
function continuePlayerTimer(){
  playerTimer = game.time.create(false);
  playerTimer.loop(100, incrementPlayerTimer, this);
  playerTimer.start();
}
function incrementPlayerTimer(){
    if(spells.length == 0 && player.casting == 0) pTime = 0;
    else pTime++;
    //Do Other Stuff While Incrementing
    if(player.casting) repositionEnergy();
}
//---------------
// Regain
//---------------
function startRegenTimer(){
  regenTimer= game.time.create(false);
  regenTimer.loop(1000, regainMana, this);
  regenTimer.start();
}
function regainMana(){
  if (player.maxRmana <= player.rmana || player.casting) return;
  player.rmana += player.rechargeRate;
}

//--------------
// Charging
//--------------
function chargingTimer(){
  chargeTimer = game.time.create(false);
  chargeTimer.loop(500, incrementChargeTimer, this);
  chargeTimer.start();
}
function endChargingTimer(){
  chargeTimer.stop();
}
function incrementChargeTimer(){
    if(pCharge < 4){
      pCharge+= 0.2;
      player.rmana -= 0.2;
    }
    if(pCharge < 1.5){
      blaster.tint = 0x00ff00;
    }
    else if(pCharge < 3){
      blaster.tint = 0xffff00;
    }
    else if(pCharge < 4){
      blaster.tint = 0xff0000;
    }
    if(player.casting) chargingBlast();
}

//---------------------------------------------------------
// 3. Spell_Building
//---------------------------------------------------------
var spells = [];
var blast = [];
var blastMaterial;

function createPlayerSpells(){
  magicMaterial = game.physics.p2.createMaterial('magicMaterial');
  blastMaterial = game.physics.p2.createMaterial('blastMaterial');
  blastMaterial = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'bmissle');
  magicCG = game.physics.p2.createCollisionGroup();
  //blastMaterial = game.physics.p2.enable(blaster);
}

function setupSpells(){
  blastSound  = game.add.audio('blast');  blastSound.volume = 0.2;
  chargeSound = game.add.audio('charge'); chargeSound.volume = 0.2;
  shootSound  = game.add.audio('shoot');  shootSound.volume = 0.2;
  teleportSound = game.add.audio('teleport'); teleportSound.volume = 0.2;
  wallSound = game.add.audio('wall'); wallSound.volume = 0.2;
}

function makeBlast(){
  //blaster = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'bmissle');
  player.rmana-= 1;
  blaster = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'energyBall');
  blaster.scale.setTo(0.3,0.3);

  game.physics.p2.enable(blaster);

  blaster.body.static = true;
  blaster.enableBody = false;

  blaster.scale.setTo(pCharge,pCharge);
  blaster.pCharge = pCharge;
  blaster.gravityScale = 0;
  blaster.body.fixedRotation = true;
  blaster.animations.add('run', [0, 1, 2, 3, 4,5], true);
  blaster.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  blaster.animations.play('run', 15, true);

  blaster.body.x = player.body.x + 100*player.direction;
  blaster.body.y = player.body.y;
  blaster.end = false;
}

function chargingBlast(){
  //blaster.body.x = player.body.x + 40*player.direction;
  //blaster.body.y = player.body.y;
  blaster.scale.setTo(pCharge, pCharge);
  blaster.pCharge = pCharge;
  console.log("You Shoot A Blast", blaster.height, blaster.width);
  //blaster.animations.currentAnim.speed = 100;
}

function repositionEnergy(){
  if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    blaster.body.x = player.body.x + 75*player.direction;
    blaster.body.y = player.body.y - 50;
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

function shootBlast(){
  if(player.casting == false) return;
  shootBlaster();

  player.jumping = 0;
  player.jumpAtY = 0;

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
  if(moveUp.isDown && (moveLeft.isDown || moveRight.isDown)){
    blaster.body.velocity.x = 500 * player.direction;
    blaster.body.velocity.y = -500;
  }
  else if(moveUp.isDown){
    blaster.body.velocity.y = -500;
  }
  else if(moveLeft.isDown || moveRight.isDown){
    blaster.body.velocity.x = 500 * player.direction;
  }
  else{
    blaster.body.velocity.x = 500 * player.direction;
  }

  blaster.body.setMaterial(magicMaterial);
  blaster.timeAt = pTime + 10;
  //blaster.body.onEndContact.add(missleFinale, blaster);
  blaster.body.onBeginContact.add(hitBox, blaster);
  //blaster.body.onEndContact.add(missleFinale, blaster);
  //spells[spells.length-1].body.onBeginContact.add(missleFinale, this);
  //console.log("Spells Length", spells.length);
  blaster.body.onBeginContact.add(missleFinale, blaster);
  spells.push(blaster);
  player.casting = 0;
  shootSound.play();

  if(player.rmana < 0){
    console.log("This should work");
    missleFinaleFail(blaster);
  }
}
function shootWall(){

}

function hitBox(body1, body2){
  tester = this;
  if(body1 == null) return;
  body1.sprite.alpha -= 0.1;
  //console.log('HP', body1.health);
  body1.health -= tester.damage;
  //if(body1.health < 0) console.log("cool");
  //console.log(tester.body.velocity.x);
  if(body1.health <= 0) body1.sprite.kill();
}

function missleFinaleFail(blaster){
  blaster.body.static = false;
  console.log("This should work");
  blastSound.play();
  //blaster = this;
  blaster.animations.play('end', 10, true);
  blaster.body.velocity.x = 0;
  blaster.body.damping = 1;
  blaster.body.mass= 1.1;
  blaster.timeAt = pTime+5;
}

function missleFinale(body1, body2){
  blast = this;
  if(blast.end) return;

  blast.body.static = true;
  blastSound.play();
  blast.end = true;
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  //blast.animations.play('end', 9, true);
  blast.body.velocity.x = 0;
  blast.body.velocity.y = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+10;

  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  //spells.splice(blast.spellID-1, 1);
}

function missleFinaleD(blast){
  if(blaster.end) return;
  blastSound.play();
  //blast = this;
  blast.body.static = true;
  console.log(pCharge);
  console.log("You Shoot A Blast", blast.height, blast.width);
  blast.end = true;
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  //blast.animations.play('end', 9, true);
  blast.body.velocity.x = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+15;
  blast.body.setRectangle(blast.height, blast.width);
  //blast.setRectangleFromSprite(blast);
  blast.body.onEndContact.add(hitBox, blast);
  //blast.body.onBeginContact.add(missleFinale, blast);
}

function updateSpells(){
  //console.log("Total Spells", spells.length);
  for(var i = spells.length -1; i >= 0; i--){
    if(spells[i].timeAt < pTime){
      if(!spells[i].end) missleFinaleD(spells[i]);
      else{
        spells[i].kill();
        spells.splice(i, 1);
      } 
    }
  }
  updateDeath();
}
function updateDeath(){
  if(player.health == 0){
    console.log("YOU ARE Busted");
  }
}

//---------------------------
// 3. Player_Actions
//---------------------------
function playerDefaultMovement(){
  doJump.onDown.add(playerJump, this);
  doJump.onUp.add(playerJumpStop, this);

  //moveUp.onDown.add(player, this)

  moveLeft.onDown.add(playerMoveLeft, this);
  moveLeft.onUp.add(playerStopLeft, this);

  moveRight.onDown.add(playerMoveRight, this);
  moveRight.onUp.add(playerStopRight, this);

  sprint.onDown.add(playerSprint, this);
  sprint.onUp.add(playerSprintStop, this);

  magicMissle.onUp.add(playerShoot, this);
  magicMissle.onDown.add(charging, this);

  magicBarrier.onDown.add(playerTower, this);
  teleport.onDown.add(playerTeleport, this);
}

function playerTeleport(){
  teleportSound.play();
  console.log("IM Teleporting");
  if(player.moveRight){
    player.reset(player.body.x+100,player.body.y);
  }
  else if(player.moveLeft){
    player.reset(player.body.x-100,player.body.y);
  }
  else 
    player.reset(player.body.x,player.body.y-100);
}

function charging(){
  player.casting = 1;
  player.charged = pTime;
  chargingTimer();
  makeBlast();
}

function playerShoot(){
  console.log("IM Shooting");
  shootBlast();
  pCharge = 1;
  endChargingTimer();
}

function playerTower(){
  if(player.casting){

    var direct = 0;
    var box = game.add.sprite(player.body.x + (50 * player.direction), player.body.y - 20, 'magicShield');
    //var size = game.rnd.integerInRange(1, 5);
    //size = 2;

    box.scale.setTo(4,4);
    game.physics.p2.enable(box);

    box.animations.add('auto',
        [0, 1, 2, 3], 25, true);
    box.animations.play('auto', 15, true);

    box.body.damping= 0;
    box.body.mass = 0;

    box.body.fixedRotation = true;
    box.body.mass = 10;
    box.body.health = 20;
    box.body.velocity.x = 500 * player.direction;

    box.body.static = true;
    box.body.setMaterial(boxMaterial);


    //shootBlast();

    return;
  }

  console.log("IM Defending");
  var direct = 0;
  var box = game.add.sprite(player.body.x, player.body.y - 10, 'magicBlock');
  //var size = game.rnd.integerInRange(1, 5);
  size = 3;

  box.scale.setTo(size,size+1);
  game.physics.p2.enable(box);

  box.animations.add('auto',
      [0, 1, 2, 3], 25, true);
  box.animations.play('auto', 15, true);

  box.body.fixedRotation = true;
  box.body.mass = 6;
  box.body.health = 40;
  //box.body.velocity.y = -500;

  box.body.static = false;
  box.body.setMaterial(boxMaterial);


  player.reset(box.body.x, box.body.y-50);
  player.body.velocity.y = -700;

  box.timeAt = pTime + 25;
  spells.push(box);

  wallSound.play();
}

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
  if(player.jump >= player.jumpTotal || player.casting) return;
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
//--------------------------------
// Player_Physics
//--------------------------------
function movement(){
  if(checkIfCanJump()){
    player.jump = 0;
  }

  if(player.casting){
    casting();
  }
  else if (player.jumping){
    playerJumpMovement();
  }
  else if (!checkIfCanJump()){
    playerFallingMovement();
  }
  else if(player.moveRight && player.moveLeft){
    playerBreakingMovement();
  }
  else if(player.sprinting && player.moveRight){
    playerSprintingRightMovement();
  }
  else if(player.sprinting && player.moveLeft){
    playerSprintingLeftMovement();
  }
  else if(player.moveRight){
    playerMoveRightMovement();
  }
  else if(player.moveLeft){
    playerMoveLeftMovement();
  }
  else{
    playerInactive();
  }
}

function playerAirMovement(){
  if(player.moveRight){
    if(player.body.velocity.x > 200) return;
    player.body.velocity.x += 25;
  }
  else if(player.moveLeft){
    if(player.body.velocity.x < -200) return;
    player.body.velocity.x -= 25;
  }
}

function playerJumpMovement(){
  /*
  if(player.jumpAtY >= player.jumpSpan){
    player.jumping = 0;
    player.jumpAtY = 0;
    console.log("Stop Jumping\n");
  }
  else{
    player.jumpAtY += player.jumpAcl;
    player.body.velocity.y = -player.jumpAcl*55;
  }*/
  if(player.jumpAtY < player.jumpSpan){
    player.jumpAtY += player.jumpAcl;
    player.body.velocity.y = -player.jumpAcl*55;
  }
  else{
    player.jumping = 0;
    player.jumpAtY = 0;
    console.log("Stop Jumping\n");
  }

  player.animations.stop();
  if(player.direction == 1) player.frame = 14;
  else player.frame = 5;


  playerAirMovement();
}

function playerFallingMovement(){
  //player.animations.stop();
  player.animations.currentAnim.speed = 7;
  if(player.direction == 1) player.animations.play('rightJump');
  else player.animations.play('leftJump');

  //if(player.direction == 1) player.frame = 16;
  //else player.frame = 7;
  playerAirMovement();
}

function playerBreakingMovement(){
  if(player.body.velocity.x > 2){
    player.body.velocity.x -= 10;
  }
  else if(player.body.velocity.x < -2){
    player.body.velocity.x += 10;
  }
  else 
    player.body.velocity.x = 0;
}
function playerSprintingRightMovement(){
  player.animations.play('rightSprint');
  player.animations.currentAnim.speed = 15;
  player.body.velocity.x = 500;

  if(player.stepsCount <= 0){
    steps.play();
    player.stepsCount = 10;
  }
  else{
    player.stepsCount -= 1;
  }
}

function playerSprintingLeftMovement(){
  player.animations.play('leftSprint');

  player.animations.currentAnim.speed = 15;
  player.body.velocity.x = -500;
  if(player.stepsCount <= 0){
    steps.play();
    player.stepsCount = 5;
  }
  else{
    player.stepsCount -= 1;
  }
}

function playerMoveRightMovement(){
  player.animations.currentAnim.speed = 10;
  player.body.velocity.x = player.speed;
  player.animations.play('right');
  if(player.stepsCount <= 0){
    steps.play();
    player.stepsCount = 17;
  }
  else{
    player.stepsCount -= 1;
  }
}
function playerMoveLeftMovement(){
  player.animations.currentAnim.speed = 10;
  player.body.velocity.x = -player.speed;
  player.animations.play('left');
  if(player.stepsCount <= 0){
    steps.play();
    player.stepsCount= 17;
  }
  else{
    player.stepsCount -= 1;
  }
}
function casting(){
  player.body.velocity.y -= 5;
  player.animations.stop();
  if(!checkIfCanJump()){ 
    jumpCasting();
    return;
  }
  //if(moveRight.isDown && moveUp.isDown) player.frame = 13;
  if(moveLeft.isDown && moveUp.isDown) player.frame = 4;
  else if(moveRight.isDown && moveUp.isDown) player.frame = 13;
  else if(player.direction == 1){
    if(moveUp.isDown) player.frame = 11;
    else player.frame = 12;
  }
  else{
    if(moveUp.isDown) player.frame = 2;
    else player.frame = 3;
  }


  //else if(moveUp.isDown) player.frame = 4;
  //else player.frame = 3;

  if(player.stepsCount <= 0){
    chargeSound.play();
    player.stepsCount= 30;
  }
  else{
    player.stepsCount -= 1;
  }

}

function jumpCasting(){
  if(!player.casting) return;
  player.body.velocity.x -= player.direction*1;
  player.animations.stop();
  //if(moveRight.isDown && moveUp.isDown) player.frame = 13;
  if(moveLeft.isDown && moveUp.isDown) player.frame = 74;
  else if(moveRight.isDown && moveUp.isDown) player.frame = 83;
  else if(player.direction == 1){
    if(moveUp.isDown) player.frame = 67;
    else player.frame = 64;
  }
  else{
    if(moveUp.isDown) player.frame = 58;
    else player.frame = 55;
  }

  if(player.stepsCount <= 0){
    chargeSound.play();
    player.stepsCount= 30;
  }
  else{
    player.stepsCount -= 1;
  }
}


function playerInactive(){
  player.jump = 0;
  player.body.velocity.x = 0;
  player.animations.stop();
  if(player.direction ==  1) player.frame = 10;
  else player.frame = 1;

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
