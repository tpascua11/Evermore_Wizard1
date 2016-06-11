// Entity

//Base Stats
var entity = [];
var blocks;
var bb;

var entityStats = {
  health   : 100,
  maxHealth: 100,
  resistance: "nothing",
  weak: "nothing"
};

function makeEntity(x, y, odd){
  entity[entity.length]
}

function preloadBackground(){
  game.load.spritesheet('level1', '../assets/Blocks.png', 16, 16);
}

function makeBlock(){
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

}

var timer;

function loadBackground(){
  timer = game.time.create(false);
  timer.loop(1000, makeBlock, this);
  timer.start();


  //blocks = game.add.group();
  blocks = game.add.physicsGroup(Phaser.Physics.ARCADE);
  blocks.setAll('body.bounce.x', 1);
  blocks.setAll('body.bounce.y', 1);
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
  game.physics.arcade.collide(player, blocks);
  game.physics.arcade.collide(blocks);
  game.physics.arcade.collide(blocks);
  game.physics.arcade.collide(blocks);
  game.physics.arcade.collide(blocks, platforms);

}

function fixedPlaced(blocks){

}


