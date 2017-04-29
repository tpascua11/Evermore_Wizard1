var game = new Phaser.Game(800, 480, Phaser.AUTO, 
    'Evermore_The_Wizard_Guide');

var livingGame = {
  create: function(){
            startUniversalTimer(); 
            createWorldBase();
            createWorldBeta(1,2);

            //These Below Fixes The Sprite Lagging when camera moves
            game.renderer.renderSession.roundPixels = true;
            game.camera.roundPx = false;
            createPlayer();
            playerActions();

            //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.input.onDown.add(gofull, this);
          },
  update:function(){
           game.world.bringToTop(foreground);
           movement();
         }
}

function create() {
}

function update() {
}

function gofull() {
  if (game.scale.isFullScreen) game.scale.stopFullScreen();
  else game.scale.startFullScreen(false);
}
