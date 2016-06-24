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
  //console.debug("Blocks: ", amounts);
  for (var i = 0; i < 1; i++){
    var box = game.add.sprite(50 + i*100, 645, 'level1');
    var size = game.rnd.integerInRange(1, 5);
    box.scale.setTo(size,size);
    game.physics.p2.enable(box);
    box.body.fixedRotation = true;
    box.body.mass = 6;
    box.body.setMaterial(boxMaterial);
  }
}

var timer;
var playerTimer;

function continueBlocks(blast){
  timer = game.time.create(false);
  timer.loop(2000, makeBlock, this);
  timer.start();

  timer2 = game.time.create(false);
  timer2.loop(8000, makeBlock, this);
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


