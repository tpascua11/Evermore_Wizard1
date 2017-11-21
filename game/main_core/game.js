var game = new Phaser.Game(800, 480, Phaser.AUTO, 'Evermore_The_Wizard_Guide');

var livingGame = {
	create: function(){
		//startUniversalTimer(); 
		createWorldBase();
		//createWorldBeta(1,2);
		//These Below Fixes The Sprite Lagging when camera moves
		game.renderer.renderSession.roundPixels = true;
		game.camera.roundPx = false;
		createPlayer();
		playerActions();
		//testBuildingEntity();
		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.input.onDown.add(gofull, this);
		buildPlatforms();
	},
	update:function(){
		//game.world.bringToTop(foreground);
		//game.physics.arcade.collide(player, sprites);
		game.physics.arcade.collide(sprites, player, collisionCallback, processCallback, this);
		movement();
		updatePlayerFrame();
		//game.physics.arcade.collide(sprites);
	},
	render:function() {
		//this.game.debug.renderPhysicsBody(player);
		game.debug.body(player);
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
