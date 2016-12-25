//--------------------------------------------------
// Main Core
//--------------------------------------------------
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
var gameWidth = 1000;
var gameHeight = 500;

function preload() {
  game.stage.smoothed = false;

  loadMapAlpha();     // Preset Default Level
  preloadBackground();// Preset Background Default Level
  loadPlayerResource(); // The Player
  loadMusic();        // The Music
  loadBoundaries();   // Physics Existance
  loadAISprite();     // The NPC

  game.time.advancedTiming = true; 
}

function create() {
  createWorldAlpha();
  createPlayer();   
  playerActions();
  setupSpells();
  
  createAI();

  setupMouse();
  toolControls();

  dependOnTest();
  //makeBlock();
}

function update() {
  movement();
  updateSpells();
  updateStatusEffect();
  updatePlayerFrame();
  updateHUD();
  aiRuning();
  //game.world.bringToTop(bg2);
}

//cursors = game.input.keyboard.createCursorKeys();
