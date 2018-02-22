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
  console.log("beta npc testing fire");
  for(var i = 0; i < 25; i++){
    buildSlime(400+(10*i),700,i);
  }
}
//--------------------------------
// Run_AI_Process
//--------------------------------
function runNPCProcess(){
  for(var i = 0; i < activeNPC.length; i++){
    //if(activeNPC[i] == 0) continue;
    //console.log("Frame At", activeNPC[i].frame);
    if(aiCheckDistance(activeNPC[i], player)){
      //console.log("am i close?");
      follow(activeNPC[i]);
    }
    else{
      move(activeNPC[i]);
    }
/*
    if(activeNPC[i].stop || activeNPC[i].readyAction){
      activeNPC[i].doAttack();
    }
    else{
      movementAnimation(activeNPC[i]);
    }
*/
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

function move(ai){
  //console.log("what is ai", ai);
  //ai.body.velocity.x = ai.curSpd * ai.direction;
  ai.body.velocity.x = 15;
  //console.log("ai velocity", ai.body.velocity.x);
  //ai.body.velocity.x = 0;
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
    slime.scale.setTo(1,2);
    //game.physics.arcade.enable(slime);
		game.physics.enable(slime, Phaser.Physics.ARCADE);
    slime.doAttack = function(){}
    for(var attrname in aiBasicStats){slime[attrname] = aiBasicStats[attrname]}
    slime.aid = id;
    /*
    slime.visual = game.add.sprite(-10,-4,'slime');
    slime.visual.scale.setTo(3,3);
    slime.visual.setScaleMinMax(3,3);
    slime.visual.frame = 3;
    slime.addChild(slime.visual);
    slime.dead = false;
    slime.name = "slime";
    */
    slime.animations.add('move', [0, 1, 2, 3, 4, 4], 50, true);
    slime.animations.play('move', 50, true);
    slime.stopRange = 100;
    activeNPC.push(slime);
}

