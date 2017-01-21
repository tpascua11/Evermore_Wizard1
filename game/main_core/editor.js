////--------------------------------------------------
// Main Core
//--------------------------------------------------
//var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'Evermore: The Wizard Guide');
//var gameWidth = 1000;
//var gameHeight = 480;

var livingGame = {
  create: function(){
            startUniversalTimer(); 
            createWorldAlpha();
            createPlayer();   
            playerActions();
            setupSpells();
            //createAI();
            testDamage();
            //setupMouse();
            //toolControls();
            toolsSetup();
            //makeBlock();
            dependOnTest();
            setupSpecials();
            //-----------------------
            //regen.volume = 0.5; 
            //createManaStone(100,700);
            //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.input.onDown.add(gofull, this);
          },
  update:function(){
           movement();
           updateSpells();
           updateStatusEffect();
           updatePlayerFrame();
           updateHUD();
           aiRuning();
           specialsRunning();
           game.world.bringToTop(bg2);
           //infoAll();
         }
}

function create() {
}

function update() {
}

function infoAll(){
  console.log("PLAYER BODY POSITION");
  console.log(player.body.x);
  console.log(player.body.y);
  console.log("PLAYER Velocity");
  console.log(player.body.velocity.x);
  console.log(player.body.velocity.y);
}

function gofull() {

    if (game.scale.isFullScreen)
    {
            game.scale.stopFullScreen();
        }
    else
    {
            game.scale.startFullScreen(false);
        }

}

//cursors = game.input.keyboard.createCursorKeys();
