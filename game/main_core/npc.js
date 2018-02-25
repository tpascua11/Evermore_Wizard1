/*
   ,     \    /      ,
   / \    )\__/(     / \
   /   \  (_\  /_)   /   \
   ____/_____\__\@  @/___/_____\____
   |             |\../|              |
   |              \VV/               |
   |        ---- AI  -----         |
   |_________________________________|
   |    /\ /      \\       \ /\    |
   |  /   V        ))       V   \  |
   |/     `       //        '     \|
   Run_AI_Process
   */
//--------------------------------
// Build_AI
//--------------------------------
var activeNPC = [];
function betaNPC(){
  for(var i = 0; i < 30; i++){
    //buildSlime(400+(30*i),700,i);
    jumperSlimer(400, 700, i);
  }
}
//--------------------------------
// Run_AI_Process
//--------------------------------
function runNPCAI(){
  activeNPC.forEach(function(npc){
    if(npc.incapciated) incapciatedBehavior(npc);
    else if(npc.doingAction) doingActionBehavior(npc);
    else if(npc.aggro) aggroBehavior(npc);
    else defaultBehavior(npc);
  });
}
//-------------------------------
// Indiviual_AI_PROCESS
//------------------------------
function incapciatedBehavior(npc){
  //if(delayIncapacitatedUntil <= universalTime) npc.incapacitated = false;
}

function doingActionBehavior(npc){
  if(npc.doActionAt <= universalTime){
    npc.doingAction = false;
  }
  //  actionDone can be set ture on the following condition
  //  When Animation Is Done. Animation will target the npc.doingAction to false
  //  this might not be needed but will be here just in case
  //  precise timing on doActionAt has multiple effects
}

function aggroBehavior(npc){
  if(!aiCheckIfPlayerWithinRange(npc, player)){
    npc.aggro = false;
    defaultBehavior(npc);
  }
  else {
    aggroMovement(npc);
    if(withinActionRange(npc)){
      if(npc.doActionAt <= universalTime){
        npc.doAggroAction();
      }
    }
  }
}

function defaultBehavior(npc){
  if(npc.willAggro){
    if(aiCheckIfPlayerWithinRange(npc, player)){
      npc.aggro = true;
      aggroBehavior(npc);
    }
  }
  else if (!npc.doingAction){
    defaultMovement(npc);
    if(npc.doActionAt <= universalTime){
      npc.doDefaultAction();
    }
  }
}
//-----------------------------------
//
//-----------------------------------
function follow(ai){
  //ai.body.velocity.x = ai.curSpd * ai.targetAtX;
  if(ai.direction == 1){
    if(ai.body.velocity.x < ai.maxSpeed) ai.body.velocity.x += ai.acl;
  }
  else{
    if(ai.body.velocity.x > -ai.maxSpeed) ai.body.velocity.x -= ai.acl;
  }
  ai.direction = ai.targetAtX;
}

function aiCheckIfPlayerWithinRange(ai, target){
  //Check Distance
  var dx = ai.body.x - target.body.x;
  var dy = ai.body.y - target.body.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  ai.distance = distance;

  //Check Where Target is At
  if(dx < 0) ai.targetAtX = 1;
  else ai.targetAtX = -1;
  if(dy < 0) ai.targetAtY = 1;
  else ai.targetAtY = -1;

  //If Within Aggro Range
  if(ai.detectRange >= distance){
    return true;
  }
  else return false;
}


function aiCheckDistance(ai, target){
  var dx = ai.body.x - target.body.x;
  var dy = ai.body.y - target.body.y;
  if(dx < 0) ai.targetAtX = 1;
  else ai.targetAtX = -1;
  if(dy < 0) ai.targetAtY = 1;
  else ai.targetAtY = -1;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if(ai.detectRange >= distance){
    if(ai.stopRange >= distance){
      ai.stop = true;
    }
    else ai.stop = false;
    return true;
  }
  else return false;
}
//----------------------------------
//
//----------------------------------
function buildSlime(x, y, id){
    slime = enemy_group.create(x,y,'slime');
    slime.scale.setTo(3,3);
		game.physics.enable(slime, Phaser.Physics.ARCADE);
    slime.doAttack = function(){}
    for(var attrname in aiBasicStats){slime[attrname] = aiBasicStats[attrname]}
    slime.aid = id;

    slime.animations.add('move', [0, 1, 2, 3, 4, 4], 10, true);
    slime.animations.play('move', 10, true);
    slime.stopRange = 100;
    slime.doActionAt = universalTime+10;
    slime.body.gravity.y = 0;
    slime.curSpd = 50;
    slime.aggroSpeed = 50;


    slime.doDefaultAction = function(){
        this.body.velocity.y = -500;
        this.direction *= -1;
        //this.body.velocity.x *= -1;
        setNextActionTime(this, 10);
    }
    activeNPC.push(slime);
}

function jumperSlimer(x,y,id){
   slime = enemy_group.create(x,y,'slime');
    slime.scale.setTo(3,3);
		game.physics.enable(slime, Phaser.Physics.ARCADE);
    slime.doAttack = function(){}
    for(var attrname in aiBasicStats){slime[attrname] = aiBasicStats[attrname]}
    slime.aid = id;
    slime.willAggro = true;
    slime.animations.add('move', [0, 1, 2, 3, 4, 4], 10, true);
    slime.animations.play('move', 10, true);
    slime.stopRange = 100;
    slime.doActionAt = universalTime+10;
    slime.body.gravity.y = 0;
    slime.curSpd = 0;
    slime.aggroSpeed = 100;
    slime.detectRange = 300;
    slime.actionRange = 100;
    slime.willFollow = true;

    slime.doDefaultAction = function(){
        this.body.velocity.y = -100;
        //this.body.velocity.x = this.targetAtX * 200;
        //this.direction *= -1;
        //this.body.velocity.x *= -1;
        setNextActionTime(this, 15);
        this.doingAction = true;
    };
    slime.doAggroAction = function(){
      this.body.velocity.y = -400;
      this.body.velocity.x = this.targetAtX * 200;
      setNextActionTime(this, 5);
      this.doingAction = true;
    }

    activeNPC.push(slime);
}
