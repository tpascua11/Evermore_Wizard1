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
//3. Player_Actions
//4. Player_Physics
*/

//---------------------------------------------------------
// 1. Player_Information
//---------------------------------------------------------
var player;
var playerMaterial;
var groundPlayerCM;

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
  stepsCount: 25,
  rechargeRate: 1,
  resistance: "nothing",
  weak: "nothing"
};

//---------------------------------------------------------
// 2. Player_Building
//---------------------------------------------------------
function loadPlayerSprite(){
  game.load.spritesheet('dino', '../assets/Dino_Test6.png', 16, 16);
  game.load.spritesheet('bmissle', '../assets/DarkMagicMissles.png', 16, 16);
  //game.load.spritesheet('bmissleR', '../assets/Blue_Magic_Missles_Big.png', 16, 16);
  game.load.spritesheet('smissle', '../assets/Blue_Magic_Missles.png', 16, 16);
  game.load.spritesheet('teleport', '../assets/White_Teleport-sheet.png', 16, 16);
  game.load.spritesheet('casting', '../assets/Casting.png', 16, 16);


  game.load.audio('blast', '../assets/sound_effect/Blast.wav');
  game.load.audio('charge', '../assets/sound_effect/Charge.wav');
  game.load.audio('shoot', '../assets/sound_effect/Shoot.wav');
  game.load.audio('teleport', '../assets/sound_effect/Teleport.wav');
  game.load.audio('wall', '../assets/sound_effect/Wall.wav');

  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('jumpSound', '../assets/Jump19.wav');
}

function createPlayerSpells(){
  magicMaterial = game.physics.p2.createMaterial('magicMaterial');
}

var playerTimer;
var pTime = 0;
var playerObjects = 0;

function continuePlayerTimer(){
  playerTimer = game.time.create(false);
  playerTimer.loop(100, incrementPlayerTimer, this);
  playerTimer.start();
}

function incrementPlayerTimer(){
    if(spells.length == 0) pTime = 0;
    else pTime++;
    console.log("TIME", pTime);
}


function createPlayer(){
  //Remember: Set Scale Then apply Phyisics
  playerControl();
  player = game.add.sprite(300, game.world.height - 150, 'dino');
  player.scale.setTo(3,3);
  game.physics.p2.enable(player);
  player.body.fixedRotation = true;
  player.body.damping = 0.5;
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

function playerControl(){
  sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  doJump = game.input.keyboard.addKey(Phaser.Keyboard.W);
  magicMissle = game.input.keyboard.addKey(Phaser.Keyboard.K);
  magicBarrier = game.input.keyboard.addKey(Phaser.Keyboard.L);
  teleport = game.input.keyboard.addKey(Phaser.Keyboard.J);
}

function createPlayerAnimations(){
  //Walking Animation
  player.animations.add('right', [24, 25, 26, 27, 28, 29, 30, 31], 20, true);
  player.animations.add('left', [40, 41, 42, 43, 44, 45, 46, 47], 20, true);

  //Sprinting Animation
  player.animations.add('leftSprint', [8, 9, 10, 11], 10, true);
  player.animations.add('rightSprint', [13, 12, 15, 14], 10, true);
}
//---------------------------------------------------------
// . Spell_Building
//---------------------------------------------------------
var spells = [];
var blast = [];
var blastN = 0;

function setupSpells(){
  //game.load.audio('boden', ['../assets/meltdown.mp3']);

  blastSound  = game.add.audio('blast');
  chargeSound = game.add.audio('charge');
  shootSound  = game.add.audio('shoot');
  teleportSound = game.add.audio('teleport');
  wallSound = game.add.audio('wall');
  //explosions = game.add.group();
  //explosions.createMultiple(30, 'bmissle');
  //explosions.forEach(setupInvader, this);
}

function createSpell(){
  blaster = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'bmissle');
  //blaster.anchor.setTo(0.5);
  blaster.scale.setTo(4,4);
  if(player.direction == 1){
    blaster.animations.add('run', [3, 4, 5], 30, true);
    blaster.animations.add('end', [11, 10, 9], 30, true);
  }
  else{
    blaster.animations.add('run', [0, 1, 2], 30, true);
    blaster.animations.add('end', [6, 7, 8], 30, true);
  }
  game.physics.p2.enable(blaster);
  //blast.body.mass = 0;
  blaster.body.fixedRotation = true;
  blaster.body.data.gravityScale = 0;
  blaster.body.damping = 0;
  blaster.body.velocity.y = 0;
  if(player.direction == 1){
   blaster.body.velocity.x = 500;
  }
  if(player.direction == -1){
   blaster.body.velocity.x = -500;
  }
  blaster.animations.play('run', 15, true);

  blaster.body.setMaterial(magicMaterial);
  blaster.timeAt = pTime + 10;
  blaster.body.onBeginContact.add(missleFinale, this);
  spells.push(blaster);
  //spells[spells.length-1].body.onBeginContact.add(missleFinale, this);
}

function missleFinale(){
  spells[spells.length-1].animations.play('end', 10, true);
  blaster.body.velocity.x = 0;
  blaster.body.damping = 1;
  blaster.body.mass= 1.1;
  blaster.timeAt = pTime+2;
  blastSound.play();
}

function updateSpells(){
  console.log("Total Spells", spells.length);
  for(var i = spells.length -1; i >= 0; i--){
    if(spells[i].timeAt < pTime){
      spells[i].kill();
      spells.splice(i, 1);
    }
  }
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

  magicMissle.onUp.add(playerShoot, this);
  magicBarrier.onDown.add(playerShield, this);
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

function playerShoot(){
  console.log("IM Shooting");
  //createBlast();
  createSpell();
  shootSound.play();
}

function playerShield(){
  console.log("IM Defending");
  var direct = 0;
  if(player.moveLeft) direct = -100;
  else direct = 100;
  var box = game.add.sprite(player.body.x + direct, player.body.y, 'level1');
  var size = game.rnd.integerInRange(1, 5);
  box.scale.setTo(size,size);
  game.physics.p2.enable(box);
  box.body.fixedRotation = true;
  box.body.mass = 6;
  box.body.velocity.x = direct*100;
  box.body.setMaterial(boxMaterial);
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
  if(player.jump >= player.jumpTotal) return;
  player.jump++;
  player.jumping = 1;
  jumpSound.play();
  console.log("Jumping\n");
}

function playerJumpStop(){
  player.jumping  = 0;
  player.jumpAtY = 0;
}

//--------------------------------
// Player_Physics
//--------------------------------
function movement(){
  if(checkIfCanJump()) player.jump = 0;

  if (player.jumping){
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
  if(player.jumpAtY >= player.jumpSpan){
    player.jumping = 0;
    player.jumpAtY = 0;
    console.log("Stop Jumping\n");
  }
  else{
    player.jumpAtY += player.jumpAcl;
    player.body.velocity.y = -player.jumpAcl*55;
  }
  player.animations.stop();
  if(player.direction == -1) player.frame = 33;
  else player.frame = 37;

  playerAirMovement();
}

function playerFallingMovement(){
  player.animations.stop();
  if(player.direction == -1) player.frame = 33;
  else player.frame = 37;
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

  player.animations.currentAnim.speed = player.body.velocity.x/25;
  if(player.body.velocity.x < 500){
    player.body.velocity.x += 3;
  }
  else player.body.velocity.x = 500;

  if(player.stepsCount <= 0){
    steps.play();
    player.stepsCount = 5;
  }
  else{
    player.stepsCount -= 1;
  }
}

function playerSprintingLeftMovement(){
  player.animations.play('leftSprint');
  player.animations.currentAnim.speed = player.body.velocity.x/25;
  if(player.body.velocity.x > -500){
    player.body.velocity.x -= 3;
  }
  else player.body.velocity.x = -500;
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
  player.animations.currentAnim.speed = player.body.velocity.x/25;
  if(player.body.velocity.x < 500){
    player.body.velocity.x = player.speed;
    player.animations.play('right');
    if(player.stepsCount <= 0){
      console.log("Step");
      steps.play();
      player.stepsCount = 25;
    }
    else{
      player.stepsCount -= 1;
    }
  }
}
function playerMoveLeftMovement(){
  player.animations.currentAnim.speed = 10;
  player.body.velocity.x = -player.speed;
  player.animations.play('left');
  if(player.stepsCount <= 0){
    console.log("Step");
    steps.play();
    player.stepsCount= 25;
  }
  else{
    player.stepsCount -= 1;
  }
}
function playerInactive(){
  player.jump = 0;
  player.body.velocity.x = 0;
  player.animations.stop();
  if(player.direction ==  1) player.frame = 7;
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
