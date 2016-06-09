//------------------
//  Player
//------------------

//---------------------------------------------------------
// Player_Information
//---------------------------------------------------------
var playerStats = {
  health   : 100
}
var player = {
  health   : 100,
  maxHealth: 100,
  mana     : 75 ,
  maxMana  : 100,
  rmana    : 25 ,
  maxRmana : 25 ,
  curSpd   : 0,
  speed    : 200,
  sprint   : 500,
  acl      : 50 ,
  left     : 0  ,
  right    : 0  ,
  casting  : 0  , 
  rechargeRate: 1,
  resistance: "nothing",
  weak: "nothing"
};

var rmove = 0;
var lmove = 0;
var speedLimit = 200;
var sprintLimit = 500;
var currentSpeed = 0;

//---------------------------------------------------------
// Player_Building
//---------------------------------------------------------
function loadPlayerSprite(){
  game.load.spritesheet('dino', '../assets/Dino_Test6.png', 16, 16);
}

function createPlayer(){
    player = game.add.sprite(300, game.world.height - 150, 'dino');
    player.scale.setTo(3,3);

    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
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

function movingLeft(){
  player.right = 0;
  player.left = 1;
  lmove = 1;
}
function stopLeft(){
  player.left = 0;
  lmove = 0;
}
function movingRight(){
  player.left= 0;
  player.right = 1;
  rmove = 1;
}
function stopRight(){
  player.right = 0;
  rmove = 0;
}

function movement(){
  /*
  if(rmove && lmove){
    if(player.body.velocity.x > 2){
      player.body.velocity.x -= 10;
    }
    else if(player.body.velocity.x < -2){
      player.body.velocity.x += 10;
    }
    else 
      player.body.velocity.x = 0;
  }
  else if(rmove){
    player.body.velocity.x = speedLimit;
  }
  else if(lmove){
    player.body.velocity.x = -speedLimit;
  }
  else 
    player.body.velocity.x = 0;
    */
}

//Player Actions
function playerDefaultMovement(){
  //doJump.onUp.add(playerJump, this);
  moveLeft.onDown.add(movingLeft, this);
  moveRight.onDown.add(movingRight, this);
  moveLeft.onUp.add(stopLeft, this);
  moveRight.onUp.add(stopRight, this);
}

function playerActions(){
    movement();
    if (player.body.touching.down){
      playerStanding();
    }
    if (!player.body.touching.down){
      playerFalling();
    }
    else if (!player.velocity.x > 0){
      movingRight();
    }
    else if (!player.velocity.x < 0){
      movingLeft();
    }
}

function playerStanding(){
    if (player.body.touching.down){
      jumps = 0;
      jumpExtend = 0;
    }
}

function playerFalling(){
  if (!player.body.touching.down){
        player.animations.stop();
        if(direction == -1) player.frame = 33;
        else player.frame = 37;
        if(direction == 1) player.feame = 37;
  }
}

function movingLeft(){
      player.animations.currentAnim.speed = 10;
      player.body.velocity.x = -200;
      direction = -1;
      player.animations.play('left');
      if(stepsMakeSound == 0){
        //steps.play();
        stepsMakeSound = 25;
      }
      else{
        stepsMakeSound -= 1;
      }
}

function movingRight(){
      player.animations.currentAnim.speed = 10;
      //  Move to the right
      player.body.velocity.x = 200;
      direction = 1;
      player.animations.play('right');
      if(stepsMakeSound == 0){
        //steps.play();
        stepsMakeSound = 25;
      }
      else{
        stepsMakeSound -= 1;
      }
}
