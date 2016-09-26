var gameWidth = 800;var gameHeight = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;

function preload() {
  //scaling();
  //scaleFix();
  game.stage.smoothed = false;

  game.load.image('sky', '../assets/sky.png');
  game.load.image('level1back', '../assets/Map/Level1-1back.png');
  game.load.image('level1front', '../assets/Map/Level1-1Front.png');

  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
  game.load.audio('boden', ['../assets/meltdown.mp3']);
  game.load.audio('simple', ['../assets/UncleBibby_The_Simple_Complex.mp3']);
  game.load.audio('coin', '../assets/coin.wav');

  loadPlayerSprite()
  cursors = game.input.keyboard.createCursorKeys();
  preloadBackground();
  game.time.advancedTiming = true; 
  //dependOnTest();
}

function create() {
  bg = game.add.tileSprite(0, 0, 1920, 240, 'level1front');
  bg2 = game.add.tileSprite(0, 0, 1920, 240, 'level1back');
  game.world.setBounds(0, 0, 1920, 240);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);

  simple = game.add.audio('simple');
  simple.play();

  createPlayer();
  game.camera.follow(player);
  playerDefaultMovement();

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');
  continueBlocks();

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 

  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });

  game.stage.smoothed = false;
  makeBlock();
}

function collision(){
}

function update() {
  //console.log(game.time.fps);
  playerFPS.text = game.time.fps;
  playerMana.text = player.rmana.toFixed(2);
  playerMana.reset(player.body.x, player.body.y - 66);
  playerFPS.reset(player.body.x-33, player.body.y - 66);
  movement();
  updatePlayerFrame();
  updateSpells();
  game.world.bringToTop(bg2);
}
