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
  for(var i = 0; i < 5; i++){
    jumperSlimer(400+(100*i), 700);
  }
}
//--------------------------------
// Run_AI_Process
//--------------------------------
function runNPCAI(){
  activeNPC.forEach(function(npc){
    if(npc.state.incapciated) incapciatedBehavior(npc);
    else if(npc.state.doingAction) doingActionBehavior(npc);
    else if(npc.state.is_aggroed) aggroBehavior(npc);
    else defaultBehavior(npc);
  });
}
//-------------------------------
// Indiviual_AI_PROCESS
//------------------------------
function incapciatedBehavior(npc){
  if(npc.state.delayIncapacitatedUntil <= universalTime) npc.state.incapacitated = false;
}

function doingActionBehavior(npc){
  //  actionDone can be set ture on the following condition
  //  When Animation Is Done. Animation will target the npc.doingAction to false
  //  this might not be needed but will be here just in case
  //  precise timing on doActionAt has multiple effects
  if(npc.state.doActionAt <= universalTime){
    npc.state.doingAction = false;
  }
}

function aggroBehavior(npc){
  if(!aiCheckIfPlayerWithinRange(npc, player)){
    npc.state.is_aggroed = false;
    defaultBehavior(npc);
  }
  else {
    aggroMovement(npc);
    if(withinActionRange(npc)){
      if(npc.state.doActionAt <= universalTime){
        npc.doAggroAction();
      }
    }
  }
}

function defaultBehavior(npc){
  if(npc.behavior.willAggro){
    if(aiCheckIfPlayerWithinRange(npc, player)){
    npc.state.is_aggroed = true;
      aggroBehavior(npc);
    }
    else{
      defaultMovement(npc);
      if(npc.state.doActionAt <= universalTime){
        npc.doDefaultAction();
      }
    }
  }
  else{
    //if (!npc.state.doingAction){
    defaultMovement(npc);
    if(npc.state.doActionAt <= universalTime){
      npc.doDefaultAction();
    }
  }
}

function aiCheckIfPlayerWithinRange(ai, target){
  //Check Distance
  var dx = ai.body.x - target.body.x;
  var dy = ai.body.y - target.body.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  ai.state.distance = distance;

  //Check Where Target is At
  if(dx < 0) ai.state.targetAtX = 1;
  else ai.state.targetAtX = -1;
  if(dy < 0) ai.state.targetAtY = 1;
  else ai.state.targetAtY = -1;

  //If Within Aggro Range
  if(ai.stats.detectRange >= distance){
    return true;
  }
  else return false;
}

function buildSlime(x, y){
    slime = enemy_group.create(x,y,'slime');
    slime.scale.setTo(3,3);
		game.physics.enable(slime, Phaser.Physics.ARCADE);
    slime.doAttack = function(){}

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

function jumperSlimer(x,y){
    slime = enemy_group.create(x,y,'slime');
    slime.scale.setTo(3,3);
		game.physics.enable(slime, Phaser.Physics.ARCADE);
    slime.doAttack = function(){}

    slime.animations.add('move', [0, 1, 2, 3, 4, 4], 10, true);
    slime.animations.play('move', 10, true);
    slime.stats = Object.assign({}, npcStats);
    slime.state = Object.assign({}, npcState);
    slime.behavior = Object.assign({}, npcBehavior);

    slime.doDefaultAction = function(){
        this.body.velocity.y = -100;
        setNextActionTime(this, 15);
        this.doingAction = true;
    };
    slime.doAggroAction = function(){
      this.body.velocity.y = -400;
      this.body.velocity.x = this.targetAtX * 200;
      //callSquareCollision(this.body.x, this.body.y);
      this.addChild(callSquareCollision(0, 0));
      setNextActionTime(this, 10);
      this.doingAction = true;
      console.log("this", this);
      console.log("check collision grouyp size", attack_group.children.length);
    }

    //slime.body.gravity.y = 0;
    activeNPC.push(slime);
}
