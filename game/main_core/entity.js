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

function makeEntity(x, y, odd){

}


var amounts = 0;
function makeBlock(){
  if(boxAmounts > 150) return;
  for (var i = 0; i < 100; i++){
    var box = game.add.sprite(100 + i*5, 200, 'level1');
    size = 3;

    box.scale.setTo(size,size+1);
    game.physics.p2.enable(box);

    box.body.fixedRotation = true;
    box.body.mass = 6;
    box.body.health = 1;

    box.body.static = false;
    box.body.setMaterial(boxMaterial);
  }

  boxAmounts += 5;
  console.log('BOXES: ', boxAmounts);
}

var timer;
var playerTimer;
var boxAmounts = 0;

function continueBlocks(blast){
  timer = game.time.create(false);
  timer.loop(10000, makeBlock, this);
  timer.start();

  timer2 = game.time.create(false);
  timer2.loop(100000, makeBlock, this);
  timer2.start();
}

function loadBackground(){
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  for (var i = 1; i < 2; i++){
    var box = game.add.sprite(300, 645 - (95 * i), 'level1');
    var size = game.rnd.integerInRange(1, 5) 
      box.scale.setTo(size,3);
    game.physics.p2.enable(box);
    box.body.mass = 6;
    // box.body.static = true;
    box.body.setMaterial(boxMaterial);

  }
}

function entityCollision(){

}

function fixedPlaced(blocks){

}


