var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide');
var gameWidth = 250;
var gameHeight = 250;

var GameIntroState = {
  preload: function(){
      this.load.image('logo', '../assets/menu/Book_1.png');
      this.load.image('preLoadBar', '../assets/menu/Stupid_Bar.png');
  },

  create: function() {
      this.game.stage.backgroundColor = '#fff';
      this.state.add('PreLoadState', PreLoadState);
      this.state.start('PreLoadState');
  },

};


game.state.add('GameIntroState', GameIntroState);
game.state.start('GameIntroState');
