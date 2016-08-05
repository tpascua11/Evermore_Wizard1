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

// 1. Player_Information
// 2. Player_Building
// 3. Player_Timers
// 5. Spell_Building
// 6. Player_Actions
// 7. Player_Physics
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

var playerStats = {
  health   : 100,
  maxHealth: 100,
  mana     : 75 ,
  maxMana  : 100,
  rmana    : 25 ,
  maxRmana : 25 ,
  curSpd   : 0  ,
  speed    : 300,
  sprintSpd: 400,
  sprinting: 0  ,
  acl      : 50 ,
  moveLeft : 0  ,
  moveRight: 0  ,
  moving   : 0  ,
  jump     : 0  ,
  jumpTotal: 100,
  jumpAtY  : 0  ,
  jumpAcl  : 5  ,
  jumpSpan : 50 ,
  canJump  : 0  ,
  clock    : 0  ,
  direction: 1  ,
  casting  : 0  ,
  airCasted: 0  ,
  charged  : 0  ,
  energy   : 0 ,
  barrier  : 0 , 
  levitation: 0 ,
  invincible: 0, 
  damageModifier: 10,
  magic: 0 ,
  stepsCount: 25,
  rechargeRate: 1,
  alliance: 1, 
  resistance: "nothing",
  weak: "nothing"
};

//---------------------------------------------------------
// 2. Player_Building
//---------------------------------------------------------
function loadPlayerSprite(){
  //SpriteSheet
  game.load.spritesheet('dino', '../assets/player/Vark_v42.png', 20, 20);
  game.load.spritesheet('hearts', '../assets/player/hearts.png', 48, 16);
  game.load.spritesheet('emptyball', '../assets/player/emptyBall.png', 16, 16);
  game.load.spritesheet('manaballs', '../assets/player/manaBalls.png', 200, 8);
  game.load.spritesheet('bmissle', '../assets/DarkMagicMisslesB.png', 64, 64);
  game.load.spritesheet('smissle', '../assets/Blue_Magic_Missles.png', 16, 16);
  game.load.spritesheet('energyBall', '../assets/spells/BlueEnergyBall.png', 16, 16);
  game.load.spritesheet('teleport', '../assets/White_Teleport-sheet.png', 16, 16);
  game.load.spritesheet('casting', '../assets/Casting.png', 16, 16);
  game.load.spritesheet('magicBlock', '../assets/spells/MagicBlock.png', 8, 16);
  game.load.spritesheet('magicShield', '../assets/spells/Shield_Up.png', 4, 16);
  game.load.spritesheet('circleBarrier', '../assets/spells/barrierv2.png', 20, 20);
  game.load.spritesheet('magicExpand', '../assets/spells/BlueExpand.png', 16, 16);
  game.load.spritesheet('magicPush', '../assets/spells/barrierPush.png', 6, 16);

  //Sound 
  game.load.audio('blast', '../assets/sound_effect/Blast.wav');
  game.load.audio('charge', '../assets/sound_effect/Charge.wav');
  game.load.audio('shoot', '../assets/sound_effect/Shoot.wav');
  game.load.audio('teleport', '../assets/sound_effect/Teleport.wav');
  game.load.audio('wall', '../assets/sound_effect/Wall.wav');
  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('jumpSound', '../assets/Jump19.wav');
  game.load.audio('hurt', '../assets/sound_effect/hurt.wav');
}

function createPlayer(){
  playerBody();
  playerSounds();
  createPlayerAnimations();
  playerControl();
  createPlayerSpells();
  continuePlayerTimer();
  startRegenTimer();
  buildInvicible();
  //playerMana = game.add.text(player.body.x, player.body.y, game.time.fps, {fontSize: '32px', fill: '#66ffcc'});
  playerFPS = game.add.text(10, 10, game.time.fps, {fontSize: '25px', fill: '#ffff00'});
  playerFPS.fixedToCamera = true;
  setupSpells();
  playerHUD();
}

var manaHUD;
var hearts;
function playerHUD(){
  var manaWidth = 40;
  var manaHeight = 25;
  var heartWidth = 40;
  var heartHeight = 10;
  manaHUD = game.add.sprite(manaWidth, manaHeight, 'manaballs');
  manaHUD.scale.setTo(1.5,1.5);
  manaHUD.fixedToCamera = true;
  manaHUD.fixedToCamera = true;

  hearts = game.add.sprite(heartWidth, heartHeight, 'hearts');
  hearts.frame = 2;
  hearts.fixedToCamera = true;

  game.world.bringToTop(hearts);
  game.world.bringToTop(manaHUD);
}

function updateEnergyBalls(){
  if(player.rmana < 0) manaHUD.frame = 0;
  else if(player.rmana >= 25) manaHUD.frame = 25;
  else manaHUD.frame = player.rmana;
}

function playerBody(){
  //Remember: Set Scale Then apply Phyisics
  player = game.add.sprite(300, 100, 'dino');

  player.scale.setTo(3,3);
  game.physics.p2.enable(player);
  player.body.fixedRotation = true;
  player.body.damping = 0.5;
  playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);
  player.body.data.gravityScale = 1.00;
  //Apply playerStats to Player Object
  for(var attrname in playerStats){player[attrname] = playerStats[attrname]}
  player.body.health = player.health;
  console.log("Health", player.health);

  circleBarrier = game.add.sprite(300, 100, 'circleBarrier');
  circleBarrier.scale.setTo(3.2, 3.2);
  circleBarrier.alpha = 0;
  circleBarrier.frame = 0;
  circleBarrier.animations.add('run', [0, 1, 2, 3, 4, 5], true);
  circleBarrier.animations.add('end', [8, 9, 10, 11, 12, 13, 14, 15, 16], false);
  circleBarrier.play('run', 10, true);


}

function playerSounds(){
  steps = game.add.audio('steps'); steps.volume = 0.5;
  jumpSound = game.add.audio('jumpSound'); jumpSound.volume = 0.5; 
  hurt = game.add.audio('hurt');
}

function playerControl(){
  sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

  moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
  moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);

  doJump = game.input.keyboard.addKey(Phaser.Keyboard.W);
  doJump = game.input.keyboard.addKey(Phaser.Keyboard.J);

  magicMissle = game.input.keyboard.addKey(Phaser.Keyboard.K);
  magicBarrier = game.input.keyboard.addKey(Phaser.Keyboard.L);
  //teleport = game.input.keyboard.addKey(Phaser.Keyboard.J);
  magicLevitate = game.input.keyboard.addKey(Phaser.Keyboard.COLON);
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
// 3. Player_Timers
//--------------------------------------------------------
var playerTimer;
var chargeTimer;
var regenTimer;
var pTime = 0;
var pCharge = 0.2;

//_______________
// Main Timer
//_______________
function continuePlayerTimer(){
  playerTimer = game.time.create(false);
  playerTimer.loop(100, incrementPlayerTimer, this);
  playerTimer.start();
}
function incrementPlayerTimer(){
  if(spells.length == 0) pTime = 0;
  else pTime++;

  //Do Other Stuff While Incrementing
  if(player.energy) repositionEnergy();
  if(player.moving >= 0) player.moving--;
}
//__________
// Regain
//__________
function startRegenTimer(){
  regenTimer= game.time.create(false);
  regenTimer.loop(500, regainMana, this);
  regenTimer.start();
}
function regainMana(){
  if(player.levitation) player.rmana -= 2;
  else if (player.maxRmana <= player.rmana || player.casting) return;
  else player.rmana += player.rechargeRate;
}
//__________
// Charging
//__________
function chargingTimer(){
  chargeTimer = game.time.create(false);
  chargeTimer.loop(500, incrementChargeTimer, this);
  chargeTimer.start();
}
function endChargingTimer(){
  chargeTimer.stop();
}
function incrementChargeTimer(){
  if(pCharge <= 4){
    pCharge+= 0.5;
    player.rmana -= 1;
  }
  if(pCharge < 2){
    blaster.tint = 0x00ff00;
  }
  else if(pCharge < 3){
    blaster.tint = 0xffff00;
  }
  else if(pCharge < 4){
    blaster.tint = 0xff0000;
  }
  if(player.casting) chargingBlast();
  chargeSound.play();
}
//______________
// Invincible
//______________
var invc;
function buildInvicible(){
  invc = Phaser.Timer.SECOND;
}

function startInvincible(){
  if(player.invincible) return;
  player.alpha = 0.5;
  player.invincible = true;
  game.time.events.add(invc, stopInvincible, this);
}

function stopInvincible(){
  player.alpha = 1;
  player.invincible = false;
}

//---------------------------------------------------------
// 5. Spell_Building
//---------------------------------------------------------
var spells = [];
var blast = [];
var blastMaterial;

function createPlayerSpells(){
  magicMaterial = game.physics.p2.createMaterial('magicMaterial');
  blastMaterial = game.physics.p2.createMaterial('blastMaterial');
}

function setupSpells(){
  blastSound  = game.add.audio('blast');  blastSound.volume = 0.2;
  chargeSound = game.add.audio('charge'); chargeSound.volume = 0.2;
  shootSound  = game.add.audio('shoot');  shootSound.volume = 0.2;
  teleportSound = game.add.audio('teleport'); teleportSound.volume = 0.2;
  wallSound = game.add.audio('wall'); wallSound.volume = 0.2;
}

function placeFrontOfPlayer(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = 500 * player.direction;
    magicObject.body.velocity.y = 500;
  }
  else if(moveUp.isDown && (moveLeft.isDown || moveRight.isDown)){
    magicObject.body.velocity.x = 500 * player.direction;
    magicObject.body.velocity.y = -500;
  }
  else if(moveUp.isDown){
    magicObject.body.velocity.y = -500;
  }
  else if(moveDown.isDown){
    magicObject.body.velocity.y = 500;
  }
  else{
    magicObject.body.velocity.x = 500 * player.direction;
  }
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

function shootShield(){
  if(!player.casting || player.rmana <= 0) return;
  console.log("did it work");
  player.rmana-= 5;
  wall = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'magicPush');
  wall.scale.setTo(6,6);
  game.physics.p2.enable(wall);
  wall.body.fixedRotation = true;
  wall.animations.add('run', [0, 1, 2], true);
  wall.animations.play('run', 15, true);
  wall.end = false;

  placeFrontOfPlayer(wall);
  wall.body.setMaterial(magicMaterial);
  wall.timeAt = pTime + 1000;

  spells.push(wall);
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
  if(blaster.end) return;
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
  updateBarrier();
}

function updateBarrier(){
  circleBarrier.x = player.body.x-30;
  circleBarrier.y = player.body.y-30;
}

//---------------------------
// 3. Player_Actions
//---------------------------
function playerDefaultMovement(){
  doJump.onDown.add(playerJump, this);
  doJump.onUp.add(playerJumpStop, this);

  moveLeft.onDown.add(playerMoveLeft, this);
  moveLeft.onUp.add(playerStopLeft, this);

  moveRight.onDown.add(playerMoveRight, this);
  moveRight.onUp.add(playerStopRight, this);

  sprint.onDown.add(playerSprint, this);
  sprint.onUp.add(playerSprintStop, this);

  magicMissle.onDown.add(charging, this);
  magicMissle.onUp.add(playerShoot, this);

  magicBarrier.onDown.add(playerBarrier, this);
  magicBarrier.onUp.add(playerStopBarrier, this);

  magicLevitate.onDown.add(levitationSwitch, this);

  //magicLevitate.onDown.add(grow, this);

  //teleport.onDown.add(playerTeleport, this);
}

function levitationSwitch(){
  player.levitation = !player.levitation;
}

function grow(){
  player.body.setRectangle(60, 60);
}

function playerTeleport(){
  if(player.rmana <= 0) return;
  player.rmana -= 2;
  console.log("IM Teleporting");
  teleportSound.play();
  teleportBefore = game.add.sprite(player.body.x, player.body.y, 'teleport');
  teleportBefore.scale.setTo(3,3);
  teleportBefore.animations.add('end', [0, 1, 2, 3, 4, 5, 6, 7], 50, true);
  teleportBefore.animations.play('end', 25, false, true);
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    console.log("So..");
    player.body.reset(player.body.x + 75*player.direction, player.body.y + 50);
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    console.log("So..");
    player.body.reset(player.body.x + 75*player.direction, player.body.y - 50);
  }
  else if(moveDown.isDown){
    player.body.reset(player.body.x, player.body.y+80);
  }
  else if(moveUp.isDown){
    player.body.reset(player.body.x, player.body.y-80);
  }
  else{
    player.body.reset(player.body.x + 75 * player.direction, player.body.y);
  }

  teleportAfter  = game.add.sprite(player.body.x, player.body.y, 'teleport');
  teleportAfter.scale.setTo(3,3);
  teleportAfter.animations.add('end', [7, 6, 5, 4, 3, 2, 1, 0], 50, true);
  teleportAfter.animations.play('end', 25, false, true);
}

function charging(){
  if(player.barrier){
    console.log("Barrier Blast");
    shootShield();
    playerStopBarrier();
    return;
  }
  player.casting = 1;
  player.charged = pTime;
  chargingTimer();
  makeBlast();

  player.energy = true;
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

function playerTower(){
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

  box.body.static = true;
  box.body.setMaterial(boxMaterial);


  player.reset(box.body.x, box.body.y-50);
  player.body.velocity.y = -700;

  box.timeAt = pTime + 25;
  spells.push(box);

  wallSound.play();
}

var activeBox;
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

function wall(){
  player.barrier= true;
  player.casting = true;
  player.rmana -= 3;
  console.log("IM Defending");
  var box = game.add.sprite(player.body.x + 50*player.direction, player.body.y-5, 'magicBlock');
  wHeight = 3;
  wWidth = 2;
  box.scale.setTo(wWidth,wHeight);
  game.physics.p2.enable(box);
  box.animations.add('auto',
      [0, 1, 2, 3], 25, true);
  box.animations.play('auto', 15, true);
  box.body.fixedRotation = false;
  box.body.mass = 6;
  box.body.health = 40;

  box.body.static = false;
  box.body.data.gravityScale = 0.0;

  box.body.setMaterial(boxMaterial);
  activeBox = box;
  repositionPlayerBarrier();

  //constraint = game.physics.p2.createRevoluteConstraint(activeBox.body, [0,0], player.body, [0,0], 10000);
  //constraint = game.physics.p2.createLockConstraint(sprite2, player, [0, 50], 80);

}
function barrierPower(){
  console.log("Barrier Power");
}
function repositionPlayerBarrier(){
  if(activeBox == null){
    console.log("DEATH");
    return;
  }
    if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
      activeBox.body.angle = 45*player.direction;
      activeBox.body.x = player.body.x + 45*player.direction;
      activeBox.body.y = player.body.y + 45;
    }
    else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
      activeBox.body.angle = 135* player.direction;
      activeBox.body.x = player.body.x + 45*player.direction;
      activeBox.body.y = player.body.y - 45;
    }
    else if(moveDown.isDown){
      activeBox.body.angle = 90;
      activeBox.body.x = player.body.x;
      activeBox.body.y = player.body.y + 55;

    }
    else if(moveUp.isDown){
      activeBox.body.angle = 90;
      activeBox.body.x = player.body.x;
      activeBox.body.y = player.body.y - 60;

      //constraint = game.physics.p2.createLockConstraint
      //  (activeBox.body, player.body, [0, -80], 90);
    }
    else{
      activeBox.body.angle = 0;
      activeBox.body.y = player.body.y;
      activeBox.body.x = player.body.x + 60 * player.direction;
      //constraint = game.physics.p2.createLockConstraint
      //  (activeBox.body, player.body, [60*player.direction, 0], 0);
    }
}
function playerStopBarrier(){
  if(!player.barrier) return;
  pCharge = 1;
  //endChargingTimer();
  //game.physics.p2.removeConstraint(constraint);
  //constraint = null;

  //activeBox.kill();
  //activeBox = null;kk
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

//--------------------------------
// Player_Physics
//--------------------------------
function movement(){
 if(checkIfCanJump()){
    console.log("Refresh");
    player.jump = 0;
    player.airCasted = 0;
  }
  else player.jump = 1;

  if(player.levitation){
    playerLevitate();
  }

  if(player.invincible){
    console.log("HURTED");
  }
  else if(player.casting){
    casting();
  }
  else if (player.jumping){
    playerJumpMovement();
  }
  else if (player.jump){
    playerFallingMovement();
  }
  else if(player.moving >= 0){
    casting();
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
  if(player.barrier){
  }
  else if(player.airCasted == 1) return;
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
  if(player.jump){ 
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
    player.stepsCount= 30;
  }
  else{
    player.stepsCount -= 1;
  }

}

function jumpCasting(){
  if(!player.casting) return;
  player.airCasted = 1;
  player.body.velocity.x -= player.direction*1;
  player.animations.stop();
  //if(moveRight.isDown && moveUp.isDown) player.frame = 13;
  if(moveLeft.isDown && moveUp.isDown) player.frame = 74;
  else if(moveRight.isDown && moveUp.isDown) player.frame = 83;
  else if(moveRight.isDown && moveDown.isDown) player.frame = 84;
  else if(moveLeft.isDown && moveDown.isDown) player.frame = 75;
  else if(player.direction == 1){
    if(moveUp.isDown) player.frame = 67;
    else if(moveDown.isDown) playerFrame = 66;
    else player.frame = 64;
  }
  else{
    if(moveUp.isDown) player.frame = 58;
    else if(moveDown.isDown) playerFrame = 56;
    else player.frame = 55;
  }
  if(player.stepsCount <= 0){
    player.stepsCount= 30;
  }
  else{
    player.stepsCount -= 1;
  }
  //repositionPlayerBarrier();
}

function playerInactive(){
  player.body.velocity.x = 0;
  player.animations.stop();
  if(player.direction ==  1) player.frame = 10;
  else player.frame = 1;
}

function harmPlayer(body, damage){
  body.health -= damage;
  console.log("Health", body.health);
}

//--------------
//HELPER
//--------------
var yAxis = p2.vec2.fromValues(0, 1);
function checkIfCanJump() {
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
