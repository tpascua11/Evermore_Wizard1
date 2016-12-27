//--------------------------------------------------
// Main Core
//--------------------------------------------------
//var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide');
var gameWidth = 1000;
var gameHeight = 500;

function preload() {
  game.stage.smoothed = false;
  console.log("Loading Sprites");
  loadMapAlpha();     // Preset Default Level
  preloadBackground();// Preset Background Default Level
  loadPlayerResource(); // The Player
  console.log("Loading Sounds");
  loadMusic();        // The Music
  loadBoundaries();   // Physics Existance
  loadAISprite();     // The NPC
  console.log("Done");

  game.time.advancedTiming = true; 
}

var livingGame = {
  create: function(){
            createWorldAlpha();
            createPlayer();   
            playerActions();
            setupSpells();
            createAI();
            setupMouse();
            toolControls();
            //makeBlock();
            dependOnTest();
          },
  update:function(){
           movement();
           updateSpells();
           updateStatusEffect();
           updatePlayerFrame();
           updateHUD();
           aiRuning();
           game.world.bringToTop(bg2);
         }
}

function create() {
}

function update() {
}

//cursors = game.input.keyboard.createCursorKeys();
