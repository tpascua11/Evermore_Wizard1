var PreLoadState= {
  preload: function (){
    this.stage.smoothed = false;

    this.preLoadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'load_ball');
    this.preLoadBar.anchor.setTo(0.5);
    this.preLoadBar.scale.setTo(3,3);

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY+100, 'wordLoading');
    this.logo.anchor.setTo(0.5);

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

    this.load.setPreloadSprite(this.preLoadBar);
  },
  create: function(){
      this.state.add('livingGame', livingGame);
      this.state.start('livingGame');
  }
 };
var loadingBallsAmount = 0;
function loadingBalls(){
  

}
