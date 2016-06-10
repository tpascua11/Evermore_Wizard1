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
function loadBackground(){
  blocks = game.add.group();

  game.physics.arcade.enable(blocks);
  blocks.enableBody = true;
  blocks.moves = true;
  blocks.customSeparateX = true;
  blocks.customSeparateY = true;
  //blocks.body.gravity.y = 1250;

  for(var i = 0; i < 20 ; i++){
    bb = game.add.group();
    bb = blocks.create(400, 300 - i*50, 'level1');
    bb.scale.setTo(3,3);
    bb.body.gravity.y = 1000;
  }
 }

function entityCollision(){
  game.physics.arcade.collide(player, blocks);
  game.physics.arcade.collide(blocks, blocks);
  game.physics.arcade.collide(blocks, platforms);
}
