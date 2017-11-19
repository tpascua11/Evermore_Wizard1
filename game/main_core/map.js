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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1000;
    game.stage.smoothed = false;
    createWorldBeta();
}

function createWorldBeta(levelName, destination){
  game.stage.backgroundColor = "#7ec0ee";
  game.world.setBounds(0, 0, 1920, 500);
  background = game.add.tileSprite(0,0, 1920, 500, '');
  foreground = game.add.tileSprite(0,260,1920,500, '');
/* simple = game.add.audio('symbo');
  simple.play();
  simple.loopFull(0.4);
  simple.loop = true;
  simple.volume = 0.4;
*/

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
}

