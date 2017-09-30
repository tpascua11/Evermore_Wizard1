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

    Main_Center
    Physics
    Physics_Beyond_Control
    Animation
    Advanced_Animation
    Stats
*/
//---------------------------------------------------------
//  Main_Center
//---------------------------------------------------------
function movement(){
  if(checkIfCanJump()) jumpRefresh();
  else jumpContinue();

  switch(1 || true){
    case player.cutscene    : console.log("HERO", player.cutscene); 
                              break;

    case player.casting     :
    case player.charging    :
    case player.barrier     : playerCastingPhysics();
                              playerCastingAnimation();
                              break;
    case player.spellJumping: playerSpellJumpingPhysics();
                              playerSpellJumpingAnimation();
                              break;
    case player.jumping     : playerJumpingPhysics();
                              playerJumpingAnimation();
                              break;
    case player.jump        :
    case player.inAir       : playerAirPhysics();
                              playerAirAnimation();
                              break;
    case player.moving>=0   : playerDragingPhysics();
                              playerDragingMovement();
                              break;
    case playerBreak()      : playerBreakingPhysics();
                              playerBreakingAnimation();
                              break;
    case player.delaying    : break;
    case playerSprintLeft() : playerSprintingLeftPhysics();
                              playerSprintingLeftAnimation();
                              break;
    case playerSprintRight(): playerSprintingRightPhysics();
                              playerSprintingRightAnimation();
                              break;
    case player.moveLeft    : playerMoveLeftPhysics();
                              playerMoveLeftAnimation();
                              break;
    case player.moveRight   : playerMoveRightPhysics();
                              playerMoveRightAnimation();
                              break;
    case player.laying      : playerLayPhysics();
                              playerLayAnimation();
                              break;
    default                 : playerInactivePhysics();
                              playerInactiveAnimation();
                              break;
  }
}

function playerBreak(){
  return player.moveLeft && player.moveRight
}
function playerSprintLeft(){
  return player.moveLeft && player.sprinting
}
function playerSprintRight(){
  return player.moveRight && player.sprinting
}

function jumpRefresh(){
    player.jump = 0;
    player.spellJump = 0;
    player.airCasted = 0;
    player.jumpDirection = 0;
    player.focus = 2;
}
function jumpContinue(){
  player.jump = 1;
}
//----------------------------
//  Physics
//----------------------------
function playerSpellJumpingPhysics(){
    if(player.jumpAtY < player.jumpSpan){
      player.jumpAtY += player.jumpAcl;
      player.body.velocity.y = -player.jumpAcl*55;
    }
    else{
      player.jumping = 0;
      player.jumpAtY = 0;
    }
   playerAirMovement();
}

function playerCastingPhysics(){
}

function playerJumpingPhysics(){
  if(player.jumpAtY < player.jumpSpan){
      player.jumpAtY += player.jumpAcl;
      player.body.velocity.y = -player.jumpAcl*55;
    }
    else{
      player.jumping = 0;
      player.jumpAtY = 0;
    }
   playerAirMovement();

}

function playerAirPhysics(){
   if(player.barrier){}
   else if(player.airCasted == 1) return;
    playerAirMovement();
}

function playerDragingPhysics(){
}
function playerBreakingPhysics(){
  //if(player.body.velocity.x > 2) player.body.velocity.x -= 10;
  //else if(player.body.velocity.x < -2) player.body.velocity.x += 10;
  //else player.body.velocity.x = 0;
}

function playerSprintingLeftPhysics(){

}

function playerSprintingRightPhysics(){
}

function playerMoveLeftPhysics(){
  if(player.body.velocity.x > -player.speed){
    player.body.velocity.x -= player.acl;
  }
}

function playerMoveRightPhysics(){
  if(player.body.velocity.x < player.speed){
    player.body.velocity.x += player.acl;
  }
}

function playerMoveLayPhysics(){
}

function playerInactivePhysics(){

}

//---------------------------------
//  Physics_Beyond_Control
//---------------------------------
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

function playerAirMovement(){
  if(player.moveRight){
    if(player.body.velocity.x > 175) return;
    player.body.velocity.x += 25;
  }
  else if(player.moveLeft){
    if(player.body.velocity.x < -175) return;
    player.body.velocity.x -= 25;
  }
}

function playerStartDelay(count){
  console.log("start delay");
  delayTimer.stop();
  player.delaying = 1;
  delayTimer.loop(count, playerDelaying, this);
  delayTimer.start();
}
function playerDelaying(){
  player.delaying = 0;
  delayTimer.stop();
  console.log("end delay");
}
function playerAnchor(){
  console.log("ANCHHOR");
  if(player.jump == 0){
    console.log("Doing it");
    player.body.velocity.x *= .30;
  }
}
//----------------------------
//  Animation
//----------------------------
function playerCastingAnimation(){
  visual.animations.stop();
  if(player.jump){//While in the Air
    jumpCasting();
  }
  else{ //On The Ground
    if(moveLeft.isDown && moveUp.isDown) visual.frame = 12;
    else if(moveRight.isDown && moveUp.isDown) visual.frame = 22;
    else if(player.direction == 1){
      if(moveUp.isDown) visual.frame = 23;
      else visual.frame = 21;
    }
    else{
      if(moveUp.isDown) visual.frame = 13;
      else visual.frame = 11;
    }
  }
}
function playerSpellingJumpingAnimation(){
}
function playerJumpingAnimation(){
  if(player.direction == 1) visual.frame = 7;
  else visual.frame = 3;
  //playerAirMovement();
}
function playerAirAnimation(){
   if(player.barrier){}
   else if(player.airCasted == 1) return;
   if(player.direction == 1) visual.animations.play('jumpRight');
   else visual.animations.play('jumpLeft');
}
function playerDragingAnimation(){
}
function playerBreakingAnimation(){
}
function playerSprintingLeftAnimation(){
  visual.animations.play('walkLeft');
}
function playerSprintingRightAnimation(){
  visual.animations.play('walkRight');
}
function playerMoveLeftAnimation(){
  visual.animations.play('walkLeft');
}
function playerMoveRightAnimation(){
  visual.animations.play('walkRight');
}
function playerLayAnimation(){
  if(player.direction ==  1) visual.animations.play('layRight');
  else visual.animations.play('layLeft');
}

function playerInactiveAnimation(){
  if(player.direction ==  1) visual.animations.play('standRight');
  else visual.animations.play('leftStand');
}

//----------------------------
//  Advanced_Animation
//----------------------------
function playerFallingMovement(){
   if(player.barrier){}
   else if(player.airCasted == 1) return;
   if(player.direction == 1) visual.animations.play('jumpRight');
   else visual.animations.play('jumpLeft');
}

function jumpCasting(){
  if(!player.casting) return;
  if(player.jumpDirection == 0) player.jumpDirection = player.direction;
  player.airCasted = 1;
  player.animations.stop();
  visual.animations.stop();
  if(player.jumpDirection == 1) castedRight();
  else castedLeft();
}

function castedRight(){
  if(moveLeft.isDown && moveUp.isDown) visual.frame = 65;
  else if(moveLeft.isDown && moveDown.isDown) visual.frame = 65;//SouthWest
  else if(moveRight.isDown && moveUp.isDown) visual.frame = 63;
  else if(moveRight.isDown && moveDown.isDown) visual.frame = 61;
  else if(player.direction == 1){
    if(moveUp.isDown) visual.frame = 64;
    else if(moveDown.isDown) visual.frame = 61;
    else visual.frame = 66;
  }
  else{
    if(moveUp.isDown) visual.frame = 64;
    else if(moveDown.isDown) visual.frame = 61;
    else visual.frame = 65;
  }
}
function castedLeft(){
  if(moveLeft.isDown && moveUp.isDown) visual.frame = 54;//North West
  else if(moveLeft.isDown && moveDown.isDown) visual.frame = 52;//SouthWestk
  else if(moveRight.isDown && moveUp.isDown) visual.frame = 55;//NorthEast
  else if(moveRight.isDown && moveDown.isDown) visual.frame = 55;//SouthEast
  else if(player.direction == 1){
    if(moveUp.isDown) visual.frame = 54;//Shooting Up
    else if(moveDown.isDown) visual.frame = 55;//Shooting Down
    else visual.frame = 55;//Shooting Foward
  }
  else{
    if(moveUp.isDown) visual.frame = 53;//Shoot Up
    else if(moveDown.isDown) visual.frame = 51;//Shooting se visual.frame = 66;//Shooting Foward
    else visual.frame = 56;
  }
}
