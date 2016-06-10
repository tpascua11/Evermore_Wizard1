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
  jumpTotal: 2  ,
  jumpAtY  : 0  ,
  jumpAcl  : 7  ,
  jumpSpan : 50 ,
  direction: 0  ,
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
  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('jumpSound', '../assets/Jump19.wav');
}

function createPlayer(){
    player = game.add.sprite(300, game.world.height - 150, 'dino');
    steps = game.add.audio('steps');
    jumpSound = game.add.audio('jumpSound');
    player.scale.setTo(3,3);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 1250;
    player.body.collideWorldBounds = true;
    createPlayerAnimations();

    for(var attrname in playerStats){player[attrname] = playerStats[attrname]}
    console.log(player);
}

function createPlayerAnimations(){
    //player.animations.add('left', [17, 16, 19, 18], 10, true);
    //player.animations.add('right', [20, 21, 22, 23], 10, true)

    //Walking Animation
    player.animations.add('right', [24, 25, 26, 27, 28, 29, 30, 31], 20, true);
    player.animations.add('left', [40, 41, 42, 43, 44, 45, 46, 47], 20, true);

    //Sprinting Animation
    player.animations.add('leftSprint', [8, 9, 10, 11], 10, true);
    player.animations.add('rightSprint', [13, 12, 15, 14], 10, true);
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
}

function playerMoveLeft(){
  direction = -1;
  player.moveRight = 0;
  player.moveLeft = 1;
}
function playerStopLeft(){
  player.moveLeft = 0;
}
function playerMoveRight(){
  direction = 1;
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
  if(player.body.touching.down) player.jump = 0;

  if (player.jumping){
    playerJumpMovement();
  }
  else if (!player.body.touching.down){
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
  if(direction == -1) player.frame = 33;
  else player.frame = 37;

  playerAirMovement();
}

function playerFallingMovement(){
  player.animations.stop();
  if(direction == -1) player.frame = 33;
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
  if(direction ==  1) player.frame = 7;
  if(direction == -1) player.frame = 1;
}
