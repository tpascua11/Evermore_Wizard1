var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;

function preload() {
  game.load.image('sky', '../assets/sky.png');
  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
  game.load.audio('boden', ['../assets/meltdown.mp3']);
  game.load.audio('coin', '../assets/coin.wav');

  loadPlayerSprite()
  cursors = game.input.keyboard.createCursorKeys();
  preloadBackground();
  game.time.advancedTiming = true; 
}
var fps = 0;
function create() {
  //We're going to be using physics, so enable the Arcade Physics system
  //game.physics.startSystem(Phaser.Physics.ARCADE);
  bg = game.add.tileSprite(0, 0, 800, 600, 'sky');
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);

  createPlayer();
  playerDefaultMovement();

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');
  continueBlocks();

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 

  for (var i = 1; i < 4; i++){
    var box = game.add.sprite(300, 645 - (95 * i), 'level1');
    box.scale.setTo(3,3);
    game.physics.p2.enable(box);
    box.body.mass = 6;
    box.body.setMaterial(boxMaterial);
  }
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 1.0 });
}

function collision(){
}

function update() {
  //console.log(game.time.fps);
  movement();
  updateSpells();
}
