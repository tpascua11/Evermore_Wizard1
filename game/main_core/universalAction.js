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
    return ai.actionRange <= ai.distance;
}
function setNextActionTime(ai, time){
  ai.doActionAt = time + universalTime;
}

function defaultMovement(ai){
  /*
  if(!ai.stop) ai.body.velocity.x = ai.curSpd * ai.direction;
  else ai.body.velocity.x = 0;
  */
  ai.body.velocity.x = ai.curSpd * ai.direction;
}

function aggroMovement(ai){
  //ai.body.velocity.x = ai.curSpd * ai.direction;
  ai.body.velocity.x = 0;
}

//--------------------------------------------------------------------
//  Status_Events
//--------------------------------------------------------------------
