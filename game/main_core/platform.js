function buildPlatforms(){
  console.log("BUILDING TEMPLATE BLCOKS");
  sprites = game.add.group();

	for (var i = 0; i < 10; i++){
		var s = sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 500), 'level1');
		game.physics.enable(s, Phaser.Physics.ARCADE);
	//	s.body.velocity.x = game.rnd.integerInRange(-200, 200);
	//	s.body.velocity.y = game.rnd.integerInRange(-200, 200);
		s.body.immovable = true;
		s.body.allowGravity = false;

    s.scale.setTo(3,2);


	}

	//var groupB = game.make.group();
	//groupB.create(16, 16, 'phaser');
	//sprites.add(groupB);

	sprites.setAll('body.collideWorldBounds', true);
	//sprites.setAll('body.bounce.x', 1);
	//sprites.setAll('body.bounce.y', 1);
	//sprites.setAll('body.minBounceVelocity', 0);
}

function processCallback (obj1, obj2) {
	console.log("Process Call buck");
}

function collisionCallback (obj1, obj2) {
	console.log("Collision Callbuck");

}

