//--------------------------------------------------------------------------------------
//		Evermore_The_Wizard_Guide
//--------------------------------------------------------------------------------------
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'Evermore_The_Wizard_Guide');
//--------------------------------------------------------------------------------------
var livingGame = {
	create: function(){
		initAllGroup();
		startUniversalTimer();

		createWorldBase();
		createPlayer();
		playerActions();
		buildPlatforms();
		buildSpellPool();

		forceSetting();
		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.input.onDown.add(gofull, this);
	},
	update:function(){
		//game.world.bringToTop(foreground);
		runCollision();
		movement();
		updatePlayerFrame();
		aiRuning();
		spellUpdate();
	},
	render:function() {
		//this.game.debug.renderPhysicsBody(player);
		game.debug.body(player);
		game.debug.body(arcane_bombs);
	}
}
//--------------------------------------------------------------------------------------
// Settings
//--------------------------------------------------------------------------------------
function forceSetting(){
		//These Below Fixes The Sprite Lagging when camera moves
		game.renderer.renderSession.roundPixels = true;
		game.camera.roundPx = false;
}

function gofull() {
	if (game.scale.isFullScreen) game.scale.stopFullScreen();
	else game.scale.startFullScreen(false);
}
