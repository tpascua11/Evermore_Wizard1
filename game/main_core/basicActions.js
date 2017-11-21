//-------------------------------
// Change Status
//-------------------------------
function characterMoveLeft(character){
  character.state.direction = -1;
  character.state.moving = 1;
}

function characterMoveRight(character){
  character.state.direction = 1;
  character.state.moving = 1;
}

function characterStopLeft(character){
  if(character.state.direction == -1 && character.state.moving){
    character.state.moving = 0;
    if(character.body.onFloor()) character.body.velocity.x = 0;
  }
}

function characterStopRight(character){
  if(character.state.direction == 1 && character.state.moving){
    character.state.moving = 0;
    if(character.body.onFloor()) character.body.velocity.x = 0;
  }
}
function characterSprint(){
}

function characterSprintStop(){
}

function characterJump(){

}
//-----------------------------
// Positon and Velocity Setup
//-----------------------------
function lineUp(back , front, starAim){
  //TODO: starAim - this will a template 
  //      for all entity to use ablities that aim
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    front.body.x = back.body.x + starAim.bottomRightX * back.direction;
    front.body.y = starAim.bottomRightY;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    front.body.x = back.body.x + starAim.topRightX * back.direction;
    front.body.y = back.body.y - starAim.topRightY;
  }
  else if(moveDown.isDown){
    front.body.x = back.body.x;
    front.body.x = back.body.x + starAim.BottomX;
    front.body.y = back.body.y + starAim.BottomY;
  }
  else if(moveUp.isDown){
    front.body.x = back.body.x + starAim.topX;
    front.body.y = back.body.y + starAim.topY;
  }
  else{
    front.body.y = back.body.y + starAim.sideY;
    front.body.x = back.body.x + starAim.sideX * back.direction;
  }
}

function placeFrontOfPlayerVisualChange(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y + 40;
    if(player.direction == 1){
      magicObject.angle = 45;
    }else{
      magicObject.angle = 135;
    }
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y - 40;
    if(player.direction == -1){
      magicObject.angle = -135;
    }
    else magicObject.angle = -45;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + 60;
    magicObject.angle = 90;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - 40;
    magicObject.angle = -90;
  }
  else{
    magicObject.body.y = player.body.y - 12;
    magicObject.body.x = player.body.x + 35 * player.direction;
    if(player.direction == -1){
      magicObject.angle = 180;
    }
  }
}

function addVelocityTo(entity, x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    entity.body.velocity.x += -x*entity.direction;
    entity.body.velocity.y += -y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    entity.body.velocity.x += -x*entity.direction;
    entity.body.velocity.y += y;
  }
  else if(moveDown.isDown){
    entity.body.velocity.x += 0;
    entity.body.velocity.y += -y;
  }
  else if(moveUp.isDown){
    entity.body.velocity.x += 0;
    entity.body.velocity.y += y;
  }
  else{
    entity.body.velocity.x += -x*entity.direction;
    entity.body.velocity.y += 0;
  }
}

function velocityFrontOfPlayer(magicObject, x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x += x*player.direction;
    magicObject.body.velocity.y += y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x += x*player.direction;
    magicObject.body.velocity.y += -y;
  }
  else if(moveDown.isDown){
    magicObject.body.velocity.x += 0;
    magicObject.body.velocity.y += y;
  }
  else if(moveUp.isDown){
    magicObject.body.velocity.x += 0;
    magicObject.body.velocity.y += -y;
  }
  else{
    magicObject.body.velocity.y += 0;
    magicObject.body.velocity.x += x*player.direction;
  }
}
