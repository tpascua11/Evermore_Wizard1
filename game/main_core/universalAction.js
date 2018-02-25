//---------------------------------------------------------------------
//  Collision_Events
//---------------------------------------------------------------------
function damage(target, damageAmount){
  if(!target.stats){ //Debug Damage Calculation
    console.log("target: ", target, "does not have stats");
    return;
  }
  target.stats.health -= damageAmount;
  console.log("target: ", target, "target took", damageAmount);

  if(target.stats.health <= 0){
    target.kill();
  }
}

function push(target, pushAmount, xDirection, yDirection){
}

function pull(target, pushAmount, xDirection, yDirection){
}
//--------------------------------------------------------------------
// NPC_Movments
//--------------------------------------------------------------------
function withinActionRange(ai){
  return ai.stats.actionRange >= ai.state.distance;
}
function setNextActionTime(ai, time){
  ai.state.doActionAt = time + universalTime;
}

function defaultMovement(ai){
  ai.body.velocity.x = ai.stats.currentSpeed * ai.state.direction;
}

function aggroMovement(ai){
  if(ai.behavior.willFollow){
    ai.state.direction = ai.state.targetAtX;
    ai.body.velocity.x = ai.stats.aggroSpeed * ai.state.targetAtX;
  } else {
    ai.body.velocity.x = ai.stats.aggroSpeed;
  }
}
//---------------------------------------------------------------------
//  Aim_Guide
//---------------------------------------------------------------------
function lineUp(back , front, starAim){
  //TODO: starAim - this will a template 
  //      for all entity to use ablities that aim
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    front.body.x = back.body.x + starAim.bottomX * back.state.direction;
    front.body.y = back.body.y + starAim.bottomY;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    front.body.x = back.body.x + starAim.bottomX * back.state.direction;
    front.body.y = back.body.y - starAim.bottomY;
  }
  else if(moveDown.isDown){
    front.body.x = back.body.x + starAim.bottomX * back.state.direction;
    front.body.y = back.body.y + starAim.bottomY;
  }
  else if(moveUp.isDown){
    front.body.x = back.body.x - starAim.topX * back.state.direction;
    front.body.y = back.body.y - starAim.topY;
  }
  else{
    front.body.y = back.body.y + starAim.sideY;
    front.body.x = back.body.x + starAim.sideX * back.state.direction;
  }
  front.reset(front.body.x, front.body.y);
}

function addVelocityTo(entity, x, y, caster){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    entity.body.velocity.x += x*caster.state.direction;
    entity.body.velocity.y += y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    entity.body.velocity.x += x*caster.state.direction;
    entity.body.velocity.y -= y;
  }
  else if(moveDown.isDown){
    entity.body.velocity.x += 0;
    entity.body.velocity.y += y;
  }
  else if(moveUp.isDown){
    entity.body.velocity.x += 0;
    entity.body.velocity.y -= y;
  }
  else{
    entity.body.velocity.x += x*caster.state.direction;
    entity.body.velocity.y += 0;
  }
}
//--------------------------------------------------------------------
//  Status_Events
//--------------------------------------------------------------------
