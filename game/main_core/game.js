//--------------------------------------------------------------------------------------
//		Evermore_The_Wizard_Guide
//--------------------------------------------------------------------------------------
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'Evermore_The_Wizard_Guide');
var fps = 0;
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
		betaNPC();
		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.input.onDown.add(gofull, this);
	},
	update:function(){
		//game.world.bringToTop(foreground);
		runNPCProcess();
		runCollision();
		movement();
		updatePlayerFrame();
		spellUpdate();
		fps = game.time.fps;
		updateEnergyBalls();
	},
	render:function() {
		//this.game.debug.renderPhysicsBody(player);
		game.debug.body(player);
		game.debug.body(arcane_bombs);
		//game.debug.physicsGroup(attack_group);
		attack_group.forEach( game.debug.body, game.debug, true, 'rgba(255,0,0,0.4)', true);

    game.debug.text(fps, 0, 30, 'yellow', 'Segoe UI');



		//game.debug.body(graphics, 'rgba(255,0,0,0.3');
		//game.debug.body(attackCollision,'rgba(255,255,0,0.4');
		//game.debug.geom( graphics, 'rgba(255,0,0,1)' ) ;
		//game.debug.body(graphics, 'rgba(255,0,0,1)');
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
