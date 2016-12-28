//--------------------------------------------------
// Main Core
//--------------------------------------------------
//var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide');
var gameWidth = 800;
var gameHeight = 600;

var livingGame = {
  create: function(){
            createWorldAlpha();
            createPlayer();   
            playerActions();
            setupSpells();
            createAI();
            testDamage();
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
