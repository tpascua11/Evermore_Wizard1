//------------------------------------------------------------------------------
//  Collision And Group
//------------------------------------------------------------------------------
/*
  setup all groups here     initAllGroup()
  setup what collides here  runCollision()
----------------------------------------------------------------------*/
function initAllGroup(){
  console.log("initializing all groups");
  enemy_group = game.add.group();
  layer_group = game.add.group();
  breakable_group = game.add.group();
  platform_group = game.add.group()
  living_group = game.add.group();

  spell_group = game.add.group();
    arcane_bombs = game.add.group();
    spell_group.add(arcane_bombs);

  attack_group = game.add.group();

  createCollisionField();
}

function runCollision(){
  	//game.physics.arcade.collide(arcane_bombs, enemy_group);
		game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(arcane_bombs, layer, null, arcaneBombExplode, this);

		game.physics.arcade.collide(breakable_group, layer);
    game.physics.arcade.collide(arcane_bombs, sprites, null, arcaneBombExplodeDamage, this);

		//game.physics.arcade.overlap(attack_group, living_group, overlapGod);
		//game.physics.arcade.overlap(living_group, attack_group, overlapGod);
		//
		game.physics.arcade.collide(enemy_group, layer);
		game.physics.arcade.collide(enemy_group, player);

		game.physics.arcade.collide(attack_group, layer);
		game.physics.arcade.collide(attack_group, attack_group);

    game.physics.arcade.overlap(arcane_bombs, enemy_group, null, arcaneBombExplodeDamage, this);
		//game.physics.arcade.collide(breakable_group, player);

		//game.physics.arcade.collide(breakable_group, arcane_bombs);
		//game.physics.arcade.overlap(breakable_group, player, overlap);

    //game.physics.arcade.collide(bomb, sprites, collisionCallback, processCallback, this);
    //game.physics.arcade.collide(arcane_bombs, sprites);
		//game.physics.arcade.collide(sprites, player, collisionCallback, processCallback, this);
		//game.physics.arcade.collide(player, sprites);
		//game.physics.arcade.collide(goblin, layer);
		//game.physics.arcade.collide(sprites);
		//
		//
}
var take = 0;
function overlapGod(area, target){
	//IDEA: touch and dont touch boolean
	//			smallTouch
	//			midTouch
	//			hardTouch
	//				base on this all touch ends when invurnatablitt ends.
	console.log("Before");
	console.log("area,", area);
	console.log("---------------------------------------------------------------------");
	console.log("target,", target);
		/*
	if(area.target == target){
		area.target = null;
		console.log("reverese");
		return;
	}
	else{
		target.health-=2; area.target = target;
		console.log('check once', area);
	}
	*/

}
