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
  createWorldAlpha();
  createPlayer();   
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
