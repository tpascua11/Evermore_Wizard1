//------------------------------------------
//	Attack Collision Objects
//------------------------------------------
var total_attack_collision_box = 30;
var total_attack_collision_circle = 30;

var circle;
function createCollisionField(){
	for(var i = 0; i < total_attack_collision_box; i++){
		makeSquareCollision();
	}
	for(var i = 0; i < total_attack_collision_circle; i++){
		//makeCircleCollision();
	}
	console.log("find out", attack_group);
}

function makeSquareCollision(){
	var attackCollision;
	attackCollision = attack_group.create(100,500, 'collision');
	game.physics.arcade.enable(attackCollision);
	attackCollision.body.setSize(25,25);
	//attackCollision.body.allowGravity = false;
	//attackCollision.body.immovable= true;
	attackCollision.body.allowGravity = false;
	attackCollision.body.immovable = true;
	attackCollision.body.moves= false;
	attack_group.add(attackCollision);
	attackCollision.kill();
	attackCollision.events.onKilled.add(goBackToAttackGroup, this);
}

function goBackToAttackGroup(attack){
	attack_group.add(attack);
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


function callSquareCollision(x,y){
  var collision = attack_group.getFirstExists(false);
	if(!collision) return;
  collision.revive();
	collision.reset(x,y);
	collision.body.allowGravity = false;
	collision.body.immovable = true;
	collision.body.moves= false;
  collision.lifespan = 300;
	return collision;
}

function overlap(){
	console.log("overlap");
}
