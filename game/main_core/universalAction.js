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
//--------------------------------------------------------------------
//  Status_Events
//--------------------------------------------------------------------
