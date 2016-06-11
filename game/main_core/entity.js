// Entity

//Base Stats
var entity = [];
var worldMaterial;
var boxMaterial;
var blocks;
var bb;

var entityStats = {
  health   : 100,
  maxHealth: 100,
  resistance: "nothing",
  weak: "nothing"
};

function makeEntity(x, y, odd){
}

function preloadBackground(){
  game.load.spritesheet('level1', '../assets/Blocks.png', 16, 16);

}
var amounts = 0;
function makeBlock(){
  amounts += 20;
  console.debug("Blocks: ", amounts);
  for (var i = 0; i < 20; i++){
    var box = game.add.sprite(50 + i*100, 645, 'level1');
    box.scale.setTo(1,1);
    game.physics.p2.enable(box);
    box.body.mass = 6;
    box.body.setMaterial(boxMaterial);
  }
  /*
    bb = game.add.group();
    bb = blocks.create(400, 100, 'level1');
    //bb.scale.setTo(3,3);
    bb.body.gravity.y = 3000;
    //bb.body.bounce.y = 1.0;
    bb.body.bounce.x = 0.5;
    //bb.body.immovable = true;
    console.log("Making Block");
    //box.body.drag.setTo(10000);
    //
    bb = game.add.group();
    bb = blocks.create(500, 100, 'level1');
    //bb.scale.setTo(3,3);
    bb.body.gravity.y = 3000;
    bb.body.bounce.y = 1.0;
    //bb.body.immovable = true;
    //
     bb = game.add.group();
    bb = blocks.create(600, 100, 'level1');
    //bb.scale.setTo(3,3);
    bb.body.gravity.y = 3000;
    bb.body.bounce.y = 1.0;
    */

}

var timer;
function continueBlocks(){
  timer = game.time.create(false);
  timer.loop(3000, makeBlock, this);
  timer.start();
}
function loadBackground(){

  boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  for (var i = 1; i < 4; i++){
        var box = game.add.sprite(300, 645 - (95 * i), 'level1');
        box.scale.setTo(3,3);
        game.physics.p2.enable(box);
        box.body.mass = 6;
        // box.body.static = true;
        box.body.setMaterial(boxMaterial);
  }

  //blocks = game.add.group();
  /*
  blocks = game.add.physicsGroup(Phaser.Physics.ARCADE);
  blocks.setAll('body.bounce.x', 1);
  blocks.setAll('body.bounce.y', 1);
  */
  blocks = game.physics.p2.createMaterial('level1')
  //game.physics.arcade.enable(blocks);
/*
 *
  for(var i = 0; i < 20 ; i++){
    bb = game.add.group();
    bb = blocks.create(400, 500 - i*16, 'level1');
    bb.scale.setTo(3,3);
    bb.body.gravity.y = 5;
    bb.mass = 1000;
  }
  */
 }

function entityCollision(){

}

function fixedPlaced(blocks){

}


