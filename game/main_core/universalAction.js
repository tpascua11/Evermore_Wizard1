//---------------------------------------------------------------------
//  Collision_Events
//---------------------------------------------------------------------
function damage(target, damageAmount){
}

function push(target, pushAmount, xDirection, yDirection){
}

function pull(target, pushAmount, xDirection, yDirection){
}
//--------------------------------------------------------------------
// NPC_Movments
//--------------------------------------------------------------------
function withinActionRange(ai){
  return ai.actionRange >= ai.distance;
}
function setNextActionTime(ai, time){
  ai.doActionAt = time + universalTime;
}

function defaultMovement(ai){
  ai.body.velocity.x = ai.curSpd * ai.direction;
}

function aggroMovement(ai){
  if(ai.willFollow){
    ai.body.velocity.x = ai.aggroSpeed * ai.targetAtX;
  } else {
    ai.body.velocity.x = ai.aggroSpeed;
  }
}
//--------------------------------------------------------------------
//  Status_Events
//--------------------------------------------------------------------
