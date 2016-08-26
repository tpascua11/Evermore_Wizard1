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
  playerActions();
  setupSpells();

  setupMouse();
  toolControls();

  createAI();

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
