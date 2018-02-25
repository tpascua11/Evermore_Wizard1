//Before Everything

var GameIntroState = {
  preload: function(){
      this.load.image('logo', 'game/assets/menu/Book_1.png');
      this.load.image('preLoadBar', 'game/assets/menu/Stupid_Bar.png');
      this.load.image('load_ball', 'game/assets/menu/Load_Ball.png');
      this.load.image('wordLoading', 'game/assets/menu/loading.png');
  },

  create: function() {
      this.game.stage.backgroundColor = '#fff';
      this.state.add('PreLoadState', PreLoadState);
      this.state.start('PreLoadState');
  },
  update: function(){
  }
};

game.state.add('GameIntroState', GameIntroState);
game.state.start('GameIntroState');
