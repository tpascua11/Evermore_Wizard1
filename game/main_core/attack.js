//------------------------------------------
//	Attack Collision Objects
//------------------------------------------
var total_attack_collision_box = 1;
var total_attack_collision_circle = 30;

var circle;
function createCollisionField(){
	for(var i = 0; i < total_attack_collision_box; i++){
		makeSquareCollision();
	}
	for(var i = 0; i < total_attack_collision_circle; i++){
		makeCircleCollision();
	}
	console.log("find out", attack_group);
}

function makeSquareCollision(){
	var attackCollision;
	attackCollision = attack_group.create(100,500);
	game.physics.arcade.enable(attackCollision);
	attackCollision.body.setSize(25,25);
	//attackCollision.body.allowGravity = false;
	//attackCollision.body.immovable= true;
	attackCollision.hello = true;
	attack_group.add(attackCollision);
	//attackCollision.kill();
}

function makeCircleCollision(){
	var attackCollision;
	attackCollision= game.add.graphics(100, 500);
	//graphics.beginFill(0xFF0000, 1);
	game.physics.arcade.enable(attackCollision);
	attackCollision.body.setCircle(45);
	attackCollision.body.setCircle(20);
	attackCollision.body.allowGravity = false;
	attackCollision.body.immovable= true;
	attackCollision.hello = true;
	attack_group.add(attackCollision);
	attackCollision.kill();
}

function overlap(){
	console.log("overlap");
}
