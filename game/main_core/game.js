var GameIntroState = {
  preload: function(){
      this.load.image('logo', '../assets/menu/Book_1.png');
      this.load.image('preLoadBar', '../assets/menu/Stupid_Bar.png');

      this.load.image('load_ball', '../assets/menu/Load_Ball.png');
      this.load.image('wordLoading', '../assets/menu/loading.png');
  },

  create: function() {
      this.game.stage.backgroundColor = '#fff';
      console.log("here?");
      this.state.add('PreLoadState', PreLoadState);
      this.state.start('PreLoadState');
  },
  update: function(){
  }
};

game.state.add('GameIntroState', GameIntroState);
game.state.start('GameIntroState');
