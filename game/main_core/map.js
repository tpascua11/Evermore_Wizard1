//---------------------------------------------------------------------
// Map
//---------------------------------------------------------------------
// 1_Preload -- Load in Backgrounds
// 2_Bases   -- Functions to Load Levels In
// 3_Test    -- Defaulted Level Sets for testing
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// 2_Bases -
//--------------------------------------------------------------------
var background;
var foreground;
var objects = [];

function createWorldBase(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1500;
    game.stage.smoothed = false;
    createWorldBeta();
/*
  simple = game.add.audio('symbo');
  simple.play();
  simple.loopFull(0.4);
  simple.loop = true;
  simple.volume = 0.4;
*/
}

function createWorldBeta(levelName, destination){
  game.stage.backgroundColor = "#7ec0ee";
  //game.stage.backgroundColor = '#2d2d2d';

  //map = game.add.tilemap('tileTest5000');
  //map.addTilesetImage('Block', 'tileImage');

  map = game.add.tilemap('testingGround');
  map.addTilesetImage('basic', 'testingGround');
	console.log("MAP", map);
	console.log("check map", map.objects["Object Layer 1"]);
	objects = map.objects["Object Layer 1"];

/*
	map.objects.Enemy.forEach(function(enemy){
  	goblinSwordsMan(enemy.x, enemy.y, activeAI.length);
	});
	*/
	layer = map.createLayer('Tile Layer 1');
	map.setCollisionBetween(1, 12);
	map.setCollision(40);
	layer.resizeWorld();

  //game.world.setBounds(0, 0, 1920, 500);
  //map = game.add.tilemap('tileTest5000');

  //game.add.tilemap('tileTest5000');
  //console.log("no");
  //map.addTilesetImage('tiles');
  //console.log("see");

  //     addTilesetImage
  //game.addTilesetImage('tileImage', 'tileImage');

  //layer = map.createLayer('World1');

  //background = game.add.tileSprite(0,0, 1920, 500, '');
  //foreground = game.add.tileSprite(0,260,1920,500, '');
  /* simple = game.add.audio('symbo');
     simple.play();
     simple.loopFull(0.4);
     simple.loop = true;
     simple.volume = 0.4;
     */
}
