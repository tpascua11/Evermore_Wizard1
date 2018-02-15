function buildPlatforms(){
	sprites = game.add.group();
	for (var i = 0; i < 10; i++){
		var s = sprites.create(game.rnd.integerInRange(100, 200), game.rnd.integerInRange(500, 600), 'level1');
		game.physics.enable(s, Phaser.Physics.ARCADE);
		//	s.body.velocity.x = game.rnd.integerInRange(-200, 200);
		//	s.body.velocity.y = game.rnd.integerInRange(-200, 200);
		s.body.immovable = true;
		s.body.allowGravity = false;
		s.anchor.x = 0.5;
		s.anchor.y = 0.8;

		s.scale.setTo(3,2);
	}
	/*
	objects.forEach(function(object){
		var s = sprites.create(object.x, object.y, 'level1');
		game.physics.enable(s, Phaser.Physics.ARCADE);
		s.body.immovable = true;
		s.body.allowGravity = false;
		s.anchor.x = 0.5;
		s.anchor.y = 0.8;
	});
	*/

	//sprites.setAll('body.collideWorldBounds', true);
}

		//game.physics.arcade.collide(sprites, player, collisionCallback, processCallback, this);
function processCallback (obj1, obj2) {
	console.log("Process Call buck");
}

function collisionCallback (obj1, obj2) {
	console.log("Collision Callbuck");

}

