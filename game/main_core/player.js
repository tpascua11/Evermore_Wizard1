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

  Player_Information
  Player_Preload
  Player_Building
  Player_Timers
  Player_Updates
  Spell_Building
  Player_Actions
  Player_Physics
  Player_Sounds

*/

//---------------------------------------------------------
// Player_Information
//---------------------------------------------------------
var player;
var playerMaterial;
var magicCG;
var groundPlayerCM;
var playerFPS = 0;
var playerMana = 0;

var manaHUD;
var hearts;
var invc;

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
  damageModifier: 1,
  magic: 0 ,
  stepsCount: 25,
  rechargeRate: 1,
  alliance: 1,
  resistance: "nothing",
  weak: "nothing"
};

//---------------------------------------------------------
// Player_Preload
//---------------------------------------------------------
function loadPlayerResource(){
  game.load.spritesheet('dino', '../assets/player/Vark_TemplateGreen.png', 20, 20);
  game.load.spritesheet('visualDino', '../assets/player/Vark_v42.png', 20, 20);

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

  game.load.audio('blast', '../assets/sound_effect/Blast.wav');
  game.load.audio('charge', '../assets/sound_effect/Charge.wav');
  game.load.audio('shoot', '../assets/sound_effect/Shoot.wav');
  game.load.audio('teleport', '../assets/sound_effect/Teleport.wav');
  game.load.audio('wall', '../assets/sound_effect/Wall.wav');
  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('jumpSound', '../assets/Jump19.wav');
  game.load.audio('hurt', '../assets/sound_effect/hurt.wav');
}

//---------------------------------------------------------
// Player_Building
//---------------------------------------------------------
function createPlayer(){
  playerBody();
  playerInfo();
  playerSounds();
  createPlayerAnimations();
  playerControl();
  continuePlayerTimer();
  startRegenTimer();
  buildInvicible();
  playerHUD();
}

function playerBody(){
  //Remember: Set Scale Then apply Phyisics
  player = game.add.sprite(300, 100, 'dino');
  visual = game.add.sprite(300, 100, 'visualDino');
  player.scale.setTo(3,3);
  visual.scale.setTo(3,3);
  game.physics.p2.enable(player);
  player.body.fixedRotation = true;
  player.body.damping = 0.5;
  playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);
  player.body.data.gravityScale = 1.00;
}

function playerInfo(){
  for(var attrname in playerStats){player[attrname] = playerStats[attrname]}
  player.body.health = player.health;
  console.log("Health", player.health);
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

  doJump = game.input.keyboard.addKey(Phaser.Keyboard.J);

  magicMissle = game.input.keyboard.addKey(Phaser.Keyboard.K);
  magicBarrier = game.input.keyboard.addKey(Phaser.Keyboard.L);
  magicLevitate = game.input.keyboard.addKey(Phaser.Keyboard.COLON);
}

function createPlayerAnimations(){
  player.animations.add('right', [28, 29, 30, 31, 32, 33], 25, true);
  player.animations.add('left', [19, 20, 21, 22, 23, 24], 25, true);
  player.animations.add('leftJump', [59, 60, 61, 62], 10, true);
  player.animations.add('rightJump', [68, 69, 70, 71], 10, true);
  player.animations.add('leftSprint', [41, 42, 43, 44], 10, true);
  player.animations.add('rightSprint', [50, 51, 52, 53], 10, true);

  visual.animations.add('standLeft' , [5], 25, true);
  visual.animations.add('standRight', [14], 25, true);

  visual.animations.add('walkRight', [28, 29, 30, 31, 32, 33], 25, true);
  visual.animations.add('walkLeft', [19, 20, 21, 22, 23, 24], 25, true);

  visual.animations.add('jumpRight', [68, 69, 70, 71], 10, true);
  visual.animations.add('jumpLeft', [59, 60, 61, 62], 10, true);

  visual.animations.add('leftSprint', [41, 42, 43, 44], 10, true);
  visual.animations.add('rightSprint', [50, 51, 52, 53], 10, true);
}

function playerHUD(){
  playerFPS = game.add.text(10, 10, game.time.fps, {fontSize: '25px', fill: '#ffff00'});
  playerFPS.fixedToCamera = true;

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

  game.camera.follow(player);
}

//--------------------------------------------------------
//  Player_Updates
//--------------------------------------------------------
function updateHUD(){
  updateEnergyBalls();
  updatePlayerFrame();
}

function updateEnergyBalls(){
  if(player.rmana < 0) manaHUD.frame = 0;
  else if(player.rmana >= 25) manaHUD.frame = 25;
  else manaHUD.frame = player.rmana;
}

function updatePlayerFrame(){
  playerFPS.text = game.time.fps;
  playerFPS.reset(player.body.x-33, player.body.y - 66);

  visual.x = player.body.x-30;
  visual.y = player.body.y-30;
}

function updatePlayerFrameAt(x, y){
  visual.x = x;
  visual.y = y;
}
function playerHitBoxResize(height, weight){
  visual.x = x;
  visual.y = y;
}

//--------------------------------------------------------
// Player_Timers
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
function buildInvicible(){
  invc = Phaser.Timer.SECOND;
}

function startInvincible(){
  if(player.invincible) return;
  player.alpha = 0.5;
  visual.alpha = 0.5;
  player.invincible = true;
  game.time.events.add(invc, stopInvincible, this);
}

function stopInvincible(){
  player.alpha = 1;
  visual.alpha = 1;
  player.invincible = false;
}

//---------------------------
// Player_Actions
//---------------------------

function barrierPower(){
  console.log("Barrier Power");
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
  if(player.direction == 1){
    player.frame = 14;
    visual.frane = 14;
  }
  else{
    player.frame = 5;
    visual.frane = 5;
  }

  playerAirMovement();
}

function playerFallingMovement(){
  if(player.barrier){}
  else if(player.airCasted == 1) return;
  visual.animations.currentAnim.speed = 7;
  if(player.direction == 1){
    visual.animations.play('jumpRight');
  }
  else{
    visual.animations.play('jumpLeft');
  }
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
  player.animations.currentAnim.speed = 15;
  player.body.velocity.x = player.sprintSpd;

  visual.animations.play('rightSprint');
  visual.animations.currentAnim.speed = 15;

  playSteps(8);
}

function playerSprintingLeftMovement(){
  player.animations.currentAnim.speed = 15;
  player.body.velocity.x = -player.sprintSpd;

  visual.animations.play('leftSprint');
  visual.animations.currentAnim.speed = 15;
 
  playSteps(8);
}

function playerMoveRightMovement(){
  player.body.velocity.x = player.speed;
  visual.animations.currentAnim.speed = 10;
  visual.animations.play('walkRight');

  playSteps(17);
}

function playerMoveLeftMovement(){
  player.body.velocity.x = -player.speed;
  visual.animations.currentAnim.speed = 10;
  visual.animations.play('walkLeft');

  playSteps(17);
}

function playSteps(count){
  if(player.stepsCount <= 0){
    steps.play();
    player.stepsCount= count;
  }
  else{
    player.stepsCount -= 1;
  }
}

function casting(){
  player.body.velocity.y -= 5;
  player.animations.stop();
  visual.animations.stop();
  if(player.jump){ 
    jumpCasting();
    return;
  }
  if(moveLeft.isDown && moveUp.isDown) visual.frame = 4;
  else if(moveRight.isDown && moveUp.isDown) visual.frame = 13;
  else if(player.direction == 1){
    if(moveUp.isDown) visual.frame = 11;
    else visual.frame = 12;
  }
  else{
    if(moveUp.isDown) visual.frame = 2;
    else visual.frame = 3;
  }
}

function jumpCasting(){
  if(!player.casting) return;
  player.airCasted = 1;
  player.body.velocity.x -= player.direction*1;
  player.animations.stop();
  visual.animations.stop();
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
  jumpCastingVisual();
}

function jumpCastingVisual(){
  if(moveLeft.isDown && moveUp.isDown) visual.frame = 74;
  else if(moveRight.isDown && moveUp.isDown) visual.frame = 83;
  else if(moveRight.isDown && moveDown.isDown) visual.frame = 84;
  else if(moveLeft.isDown && moveDown.isDown) visual.frame = 75;
  else if(player.direction == 1){
    if(moveUp.isDown) visual.frame = 67;
    else if(moveDown.isDown) visual.frame = 66;
    else visual.frame = 64;
  }
  else{
    if(moveUp.isDown) visual.frame = 58;
    else if(moveDown.isDown) visual.frame = 56;
    else visual.frame = 55;
  }
}

function playerInactive(){
  player.body.velocity.x = 0;
  player.animations.stop();
  if(player.direction ==  1){
    player.frame = 10;
    visual.frame = 10;
  }
  else{
    player.frame = 1;
    visual.frame = 1;
  }
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
