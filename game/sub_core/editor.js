
var gameWidth = 800;var gameHeight = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;

function preload() {
  game.stage.smoothed = false;
  game.load.image('sky', '../assets/sky.png');
  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
  game.load.audio('boden', ['../assets/meltdown.mp3']);
  game.load.audio('simple', ['../assets/UncleBibby_The_Simple_Complex.mp3']);
  game.load.audio('coin', '../assets/coin.wav');

  loadPlayerSprite();
  loadBoundaries();
  cursors = game.input.keyboard.createCursorKeys();
  preloadBackground();
  game.time.advancedTiming = true; 
}

function create() {
  bg = game.add.tileSprite(0, 0, 1920, 1920, 'sky');
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);
  game.world.setBounds(0, 0, 1920, 1920);

  createPlayer();
  setupMouse();
  game.camera.follow(player);
  playerDefaultMovement();
  toolControls();

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');
  continueBlocks();

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });

  game.stage.smoothed = false;
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
  updateSpells();
}
