//---------------------------------------------------------------------
// Entity
//---------------------------------------------------------------------

//Base Stats
var entity = [];
var worldMaterial;
var boxMaterial;
var blocks;

var entityStats = {
  health   : 100,
  maxHealth: 100,
  resistance: "nothing",
  weak: "nothing"
};

function entityCollision(){
}

function fixedPlaced(blocks){
}

function testBuildingEntity(){
  console.log("TEST AL");
  tox = game.add.sprite(300, 300, 'template');
  tox.scale.setTo(1,2);
  game.physics.arcade.enable(tox);
  tox.reset(100,100);
}

