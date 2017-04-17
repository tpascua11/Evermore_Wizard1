var game = new Phaser.Game(800, 480, Phaser.AUTO, 
    'Evermore_The_Wizard_Guide');

//var gameWidth = 1000;
//var gameHeight = 480;

var livingGame = {
  create: function(){
            startUniversalTimer(); 
            //createWorldAlpha();
            createWorldBase();
            createWorldBeta(1,2);
            createPlayer();   
            playerActions();
            setupSpells();
            //createAI();
            testDamage();
            //setupMouse();
            //toolControls();
            toolsSetup();
            //getSomething();
            gameModeSetup();
            //makeBlock();
            dependOnTest();
            setupSpecials();
            startRegenTimer();
            //-----------------------
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.input.onDown.add(gofull, this);

            //These Below Fixes The Sprite Lagging when camera moves
            game.renderer.renderSession.roundPixels = true;
            game.camera.roundPx = false;
          },
  update:function(){
           movement();
           updateSpells();
           updateStatusEffect();
           updatePlayerFrame();
           updateHUD();
           aiRuning();
           specialsRunning();
           game.world.bringToTop(foreground);
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
