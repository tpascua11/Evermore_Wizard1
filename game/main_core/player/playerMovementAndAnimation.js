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
  if(player.body.onFloor() || player.body.touching.down) jumpRefresh();
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
		case player.state.moving: playerMovePhysics();
															playerMoveAnimation();
															break;
    case player.laying      : //playerLayPhysics();
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
    //player.spellJump = 0;
    player.airCasted = 0;
    player.jumpDirection = 0;
    player.focus = 2;
    player.body.drag.x = 1000;
		//console.log("on floor");
}
function jumpContinue(){
  player.jump = 1;
  player.body.drag.x = 100;
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

function playerMovePhysics(){
	//console.log("moving");
	if(player.state.direction == 1){
		if(player.body.velocity.x < player.speed){
			player.body.velocity.x += player.acl;
		}
	} else {
		if(player.body.velocity.x > -player.speed){
			player.body.velocity.x -= player.acl;
		}
	}
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

function playerAirMovement(){
	if(!player.state.moving) return;
	if(player.state.direction == 1){
		if(player.body.velocity.x > 175) return;
		player.body.velocity.x += 25;
	}
	else if(player.state.direction == -1){
		if(player.body.velocity.x < -175) return;
		player.body.velocity.x -= 25;
	}
}

function playerStartDelay(count){
	//console.log("start delay");
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
	player.animations.stop();
	if(player.jump){//While in the Air
		jumpCasting();
	}
	else{ //On The Ground
		if(moveLeft.isDown && moveUp.isDown) player.frame = 12;
		else if(moveRight.isDown && moveUp.isDown) player.frame = 22;
		else if(player.state.direction == 1){
			if(moveUp.isDown) player.frame = 23;
			else player.frame = 21;
		}
		else{
			if(moveUp.isDown) player.frame = 13;
			else player.frame = 11;
		}
	}
}
function playerSpellingJumpingAnimation(){
}
function playerJumpingAnimation(){
	if(player.state.direction == 1) player.frame = 7;
	else player.frame = 3;
	//playerAirMovement();
}
function playerAirAnimation(){
	if(player.barrier){}
	else if(player.airCasted == 1) return;
	if(player.state.direction == 1) player.animations.play('jumpRight');
	else player.animations.play('jumpLeft');
}
function playerDragingAnimation(){
}
function playerBreakingAnimation(){
}
function playerSprintingLeftAnimation(){
	player.animations.play('walkLeft');
}
function playerSprintingRightAnimation(){
	player.animations.play('walkRight');
}
function playerMoveAnimation(){
	if(player.state.direction == 1) player.animations.play('walkRight');
	else player.animations.play('walkLeft');
}
function playerMoveLeftAnimation(){
	player.animations.play('walkLeft');
}
function playerMoveRightAnimation(){
	player.animations.play('walkRight');
}
function playerLayAnimation(){
	//console.log("did it work");
	if(player.state.direction ==  1) player.animations.play('layRight');
	else player.animations.play('layLeft');
}

function playerInactiveAnimation(){
	if(player.state.direction ==  1) player.animations.play('standRight');
	else player.animations.play('leftStand');
}

//----------------------------
//  Advanced_Animation
//----------------------------
function playerFallingMovement(){
	if(player.barrier){}
	else if(player.airCasted == 1) return;
	if(player.state.direction == 1) player.animations.play('jumpRight');
	else player.animations.play('jumpLeft');
}

function jumpCasting(){
	if(!player.casting) return;
	if(player.jumpDirection == 0) player.jumpDirection = player.state.direction;
	player.airCasted = 1;
	player.animations.stop();
	player.animations.stop();
	if(player.jumpDirection == 1) castedRight();
	else castedLeft();
}

function castedRight(){
	if(moveLeft.isDown && moveUp.isDown) player.frame = 65;
	else if(moveLeft.isDown && moveDown.isDown) player.frame = 65;//SouthWest
	else if(moveRight.isDown && moveUp.isDown) player.frame = 63;
	else if(moveRight.isDown && moveDown.isDown) player.frame = 61;
	else if(player.state.direction == 1){
		if(moveUp.isDown) player.frame = 64;
		else if(moveDown.isDown) player.frame = 61;
		else player.frame = 66;
	}
	else{
		if(moveUp.isDown) player.frame = 64;
		else if(moveDown.isDown) player.frame = 61;
		else player.frame = 65;
	}
}
function castedLeft(){
	if(moveLeft.isDown && moveUp.isDown) player.frame = 54;//North West
	else if(moveLeft.isDown && moveDown.isDown) player.frame = 52;//SouthWestk
	else if(moveRight.isDown && moveUp.isDown) player.frame = 55;//NorthEast
	else if(moveRight.isDown && moveDown.isDown) player.frame = 55;//SouthEast
	else if(player.state.direction == 1){
		if(moveUp.isDown) player.frame = 54;//Shooting Up
		else if(moveDown.isDown) player.frame = 55;//Shooting Down
		else player.frame = 55;//Shooting Foward
	}
	else{
		if(moveUp.isDown) player.frame = 53;//Shoot Up
		else if(moveDown.isDown) player.frame = 51;//Shooting se player.frame = 66;//Shooting Foward
		else player.frame = 56;
	}
}
