//---------------------------------------------------------------------
// Map
//---------------------------------------------------------------------
// 1_Preload -- Load in Backgrounds
// 2_Bases   -- Functions to Load Levels In
// 3_Test    -- Defaulted Level Sets for testing
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// 2_Bases -
//--------------------------------------------------------------------
var background;
var foreground;

function createWorldBase(){
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1100;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);
  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');
  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });
  game.stage.smoothed = false;

  //game.scale.setGameSize(1000, 450);

}

function createWorldBeta(levelName, destination){
  game.world.setBounds(0, 0, 1920, 500);
  background = game.add.tileSprite(0,0, 1920, 500, 'background');
  foreground = game.add.tileSprite(0,260,1920,500, 'level1back');

  simple = game.add.audio('symbo');
  simple.play();
  simple.loopFull(0.4);
  simple.loop = true;
  simple.volume = 0.4;

}

function dependOnTest(){
  var level;
  $.getJSON("../level/TestLevel3.json", function(json) {
    level = json;
    console.log(level); // this will show the info it in firebug console
  });
}

var clearLevelOnce = false;
function clearLevel(){
  //if(clearLevelOnce) return;
  console.log("AI Total", activeAI.length);
  console.log("Existing Blocks Total", existingBlocks.length);
  console.log("Permanant Specials Total", floSpecials.length);
  console.log("Temporary Specials", tmpSpecials.length);

  for(var i = 0; i < existingBlocks.length; i++) existingBlocks[i].destroy();
  for(var i = 0; i < floSpecials.length; i++) floSpecials[i].destroy();
  for(var i = 0; i < tmpSpecials.length; i++) tmpSpecials[i].destroy();
  for(var i = 0; i < spells.length; i++) spells[i].destroy();
  //for(var i = 0; i < activeAI.length; i++){
  for(var i = 0; i < activeAI.length; i++){
    if(activeAI[i].attack != null) activeAI[i].attack.destroy();
    //if(activeAI[i] == 0) activeAI[i].destroy();
    if(activeAI[i] != 0) activeAI[i].destroy();
    activeAI[i] = 0;
  }
  activeAI.length = 0;
  existingBlocks.length = 0;
  floSpecials.length = 0;
  tmpSpecials.length = 0;
  respawnBack();
  //clearLevelOnce = true;
}

var respawnAtX = 0;
var respawnAtY = 0;
var respawnMoney = 0;

var levelName = "level0";

function respawnBack(){
  player.reset(respawnAtX, respawnAtY);
  player.health = 5;
  player.body.health = 5;
  hearts.frame = player.body.health;
  console.log("player cutscene", player.cutscene);
  player.cutscene = 0;
 // gameModeSetup();
}
//--------------------------------------------------------------------
// 3_Test -
//--------------------------------------------------------------------
function createWorldAlpha(){
  mbg = game.add.tileSprite(0,0, 1920, 500, 'background');
  mbg.scale.setTo(1, 1);
  //mbg.scale.setTo(3, 3);

  game.world.setBounds(0, 0, 1920, 500);

  bg2 = game.add.tileSprite(0, 260, 1920, 240, 'level1back');
  game.world.bringToTop(bg2);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1100;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });

  game.stage.smoothed = false;

  //simple = game.add.audio('symbo');
  //simple.play();
  //simple.loopFull(0.4);
  //simple.loop = true;
  //simple.volume = 0.4;
}


