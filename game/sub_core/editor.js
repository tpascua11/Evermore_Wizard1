//--------------------------------------------------
// Main Core
//--------------------------------------------------
//
var gameWidth = 800;var gameHeight = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;

function preload() {
  game.stage.smoothed = false;

  loadMapAlpha();     // Preset Default Level
  preloadBackground();// Preset Background Default Level
  loadPlayerSprite(); // The Player
  loadMusic();        // The Music
  loadBoundaries();   // Physics Existance
  loadAISprite();     // The NPC

  game.time.advancedTiming = true; 
}

function create() {
  bg = game.add.tileSprite(0, 0, 1920, 240, 'level1front');
  game.world.setBounds(0, 0, 1920, 240);

  bg2 = game.add.tileSprite(0, 0, 1920, 240, 'level1back');
  game.world.bringToTop(bg2);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);

  createPlayer();
  createPlayerSpells();
  setupSpells();

  setupMouse();
  game.camera.follow(player);
  playerDefaultMovement();
  toolControls();

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');
  //continueBlocks();

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });

  game.stage.smoothed = false;

  simple = game.add.audio('boden');
  simple.play();

  createAI();

  playerActions();
}

function update() {
  playerFPS.text = game.time.fps;
  playerFPS.reset(player.body.x-33, player.body.y - 66);
  movement();
  updateSpells();
  updateEnergyBalls();
  updatePlayerFrame();
  game.world.bringToTop(bg2);
  aiRuning();
}


//cursors = game.input.keyboard.createCursorKeys();
