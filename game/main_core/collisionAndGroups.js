//---------------------------------------------------------------------
//  Collision And Group
//---------------------------------------------------------------------
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
}

function runCollision(){
  	game.physics.arcade.collide(arcane_bombs, enemy_group);
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(enemy_group, layer);
    game.physics.arcade.collide(arcane_bombs, layer, arcaneBombExplode);

  //game.physics.arcade.collide(bomb, sprites, collisionCallback, processCallback, this);
    //game.physics.arcade.collide(arcane_bombs, sprites);
		//game.physics.arcade.collide(sprites, player, collisionCallback, processCallback, this);
		//game.physics.arcade.collide(player, sprites);
		//game.physics.arcade.collide(goblin, layer);
		//game.physics.arcade.collide(sprites);
}
