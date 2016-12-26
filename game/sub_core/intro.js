console.log("...");

var PreLoadState= {
  preload: function (){
    this.stage.smoothed = false;
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preLoadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+100, 'preLoadBar');
    this.preLoadBar.anchor.setTo(0.5);
    this.preLoadBar.scale.setTo(5,3);


    //game.stage.smoothed = false;
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
  }
};
