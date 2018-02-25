//----------------------------------
// 2_Specials_Loading
//----------------------------------
function setupSpecials(){
    regen = game.add.audio('regen');
}
//---------------------------------
// 3_Specials_List
//---------------------------------
var tmpSpecials = [];
var floSpecials = [];
var regen;

function specialsRunning(){
  for(var i = 0; i < tmpSpecials.length; i++){
    tmpSpecials[i].doAction();
  }
  for(var i = 0; i < floSpecials.length; i++){
    floSpecials[i].doAction();
  }
}

//------------------------
//  Mana Balls
//------------------------
function createManaBalls(x,y,floID){
  var manaBalls;
  manaBalls= game.add.sprite(x, y, 'Mana');
  manaBalls.scale.setTo(2,2);
  game.physics.p2.enable(manaBalls);
  manaBalls.body.fixedRotation = true;
  //aiMaterial = game.physics.p2.createMaterial('aiMaterial', manaBalls.body);
  manaBalls.body.onBeginContact.add(regainMana, manaBalls);
  manaBalls.body.health = 200;
  manaBalls.damage = 1;
  manaBalls.special = 2;

  manaBalls.animations.add('run', [0, 1, 2], true);
  manaBalls.animations.play('run', 20, true);

  manaBalls.body.static = true;
  manaBalls.gravityScale = 0;
  manaBalls.body.data.shapes[0].sensor = true;
  manaBalls.body.velocity.y = -25;
  manaBalls.floID = floID;
  manaBalls.body.floID = floID;
  manaBalls.name = "manaStone";
  manaBalls.end = true;
  manaBalls.timeAt = pTime + 40;
  manaBalls.alliance = 1;
  manaBalls.body.alliance = 1;
  manaBalls.body.indestructible = true;
  spells.push(manaBalls);
}

function regainMana(body1){
  if(body1 == null) return;
  if(body1.sprite.alliance != 1) return;
  console.log("Did this happen");
  if(player.rmana < 25) player.rmana+= this.special;
  console.log("FLO POWER", floSpecials[this.floID]);
  floSpecials[this.floID].body.currentMana--;
  regen.play()
  this.destroy();
}

//---------------------------------
//  Mana_Stone
//---------------------------------
function createManaStone(x,y){
  console.log("Creating Manastone");
  var manaStone;
  manaStone = game.add.sprite(x, y, 'ManaStone');
  manaStone.scale.setTo(5,5);
  game.physics.p2.enable(manaStone);
  manaStone.body.fixedRotation = true;
  aiMaterial = game.physics.p2.createMaterial('aiMaterial', manaStone.body);
  manaStone.body.health = 200;
  manaStone.damage = 1;
  manaStone.special = 5;
  manaStone.pTime = universalTime + 12;

  manaStone.alliance = 1;
  manaStone.body.alliance = 1;

  manaStone.body.currentMana = 0;
  manaStone.body.maxMana = 5;
  manaStone.sid = floSpecials.length;
  manaStone.doAction = function (){
    if(this.pTime <= universalTime){
      console.log("Timer On");
      this.pTime = universalTime + 12;
      if(this.body.currentMana <= this.body.maxMana){
        console.log("Generating Mana");
        createManaBalls(this.body.x-25, this.body.y+15, this.sid);
        createManaBalls(this.body.x, this.body.y, this.sid);
        createManaBalls(this.body.x+25, this.body.y+15, this.sid);
      }
    }
  }
  manaStone.body.data.shapes[0].sensor = true;
  manaStone.body.static = true;

  manaStone.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7,8 ], true);
  manaStone.animations.play('run', 20, true);

  manaStone.name = "manaStone";

  floSpecials.push(manaStone);
}
//----------------------------
//  CheckPoint Stone
//----------------------------
var checkPointX;
var checkPointY;

function checkPointStone(x,y){
  console.log("Creating Checkpoint");
  var manaStone;
  manaStone = game.add.sprite(x, y, 'LoadStone');
  manaStone.scale.setTo(5,5);
  game.physics.p2.enable(manaStone);
  manaStone.body.fixedRotation = true;
  aiMaterial = game.physics.p2.createMaterial('aiMaterial', manaStone.body);
  manaStone.body.health = 200;
  manaStone.damage = 1;

  manaStone.alliance = 1;
  manaStone.body.alliance = 1;

  manaStone.body.currentMana = 0;
  manaStone.body.maxMana = 5;
  manaStone.sid = floSpecials.length;
  manaStone.doAction = function (){}

  manaStone.body.data.shapes[0].sensor = true;
  manaStone.body.static = true;

  manaStone.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7,8 ], true);
  manaStone.animations.play('run', 20, true);

  manaStone.name = "LoadStone";
  manaStone.body.onBeginContact.add(checkpointed, manaStone);
}

function checkpointed(body1){
  if(alliance != 1) return;
  if(body1.sprite.name != "Player") return;
  checkPointX = this.x;
  checkPointY = this.x;
}

//----------------------------
//  Transition
//----------------------------
function transitionPoint(x,y){
  console.log("Creating Checkpoint");
  var manaStone;
  manaStone = game.add.sprite(x, y, 'LoadStone');
  manaStone.scale.setTo(5,5);
  game.physics.p2.enable(manaStone);
  manaStone.body.fixedRotation = true;
  aiMaterial = game.physics.p2.createMaterial('aiMaterial', manaStone.body);
  manaStone.body.health = 200;
  manaStone.damage = 1;

  manaStone.alliance = 1;
  manaStone.body.alliance = 1;

  manaStone.body.currentMana = 0;
  manaStone.body.maxMana = 5;
  manaStone.sid = floSpecials.length;
  manaStone.doAction = function (){}

  manaStone.body.static = true;
  manaStone.body.data.shapes[0].sensor = true;

  //manaStone.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7,8 ], true);
  //manaStone.animations.play('run', 20, true);

  manaStone.name = "transitionPoint";
  manaStone.body.onBeginContact.add(doTransition, manaStone);

  manaStone.wayPointAt = "rightend";

  floSpecials.push(manaStone);
}

function doTransition(body1){
  //if(body1.alliance != 1) return;
  //player.cutscene = true;
  if(body1.alliance == 1 || body1.sprite.alliance == 1){
    if(player.moveRight){
      console.log("AHHHHH!!!");
      cutscene(2);
      game.camera.fade('#000000', Phaser.Timer.SECOND * 2);
      game.camera.onFadeComplete.add(resetFade, this);
    }
  }

  //if(body1.sprite.name != "Player") return;
  //checkPointX = this.x;
  //checkPointY = this.x;
}

function resetFade() {
    game.camera.flash(0x000000, Phaser.Timer.SECOND * 2);
  clearLevel();
  gameModeSetup();
  respawnBack();
   // game.camera.resetFX();
}

function cutscene(time){
  player.cutscene = true;
  game.time.events.add(Phaser.Timer.SECOND * time, cutsceneEnd, this);
  console.log("I should only happen ONCEEE");
}

function cutsceneEnd(){
  player.cutscene = false;
}




