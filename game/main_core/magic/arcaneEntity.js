//---------------------
// Arcane_Components
//----------------------
function buildSpellPool(){
  buildArcaneBombs();
  spell_group.setAll('body.collideWorldBounds', true);
  spell_group.setAll('map', true);
}

function conjureSpellBomb(){
  var bomb = arcane_bombs.getFirstExists(false);
  if(bomb){
    bomb.revive();
    //bomb.reset(player.body.x, player.body.y, templateStarAim);
    lineUp(player, bomb, templateStarAim);
    addVelocityTo(bomb, 500, 500, player);
    bomb.animations.play('run', 10, true);
  }
}

function spellUpdate(){

}
//----------------------
// 1. Arane_Bomb
//----------------------
function buildArcaneBombs(){
  for(var i = 0; i < 20; i++){
    var arcaneBomb = arcane_bombs.create(0,0,'energyBall');
    game.physics.enable(arcaneBomb, Phaser.Physics.ARCADE);
    //arcaneBomb.scale.setTo(1,1);
    arcaneBomb.body.allowGravity = false;
    arcaneBomb.animations.add('run');
    arcaneBomb.body.onCollide = new Phaser.Signal();
    arcaneBomb.body.onCollide.add(arcaneBombExplode, this);
    arcaneBomb.kill();
  }
  arcane_bomb_explosions = game.add.group();
  spell_group.add(arcane_bomb_explosions);
  for(var i = 0; i < 20; i++){
    var arcaneExplosion = arcane_bomb_explosions.create(0,0,'magicExpand');
    game.physics.enable(arcaneExplosion, Phaser.Physics.ARCADE);
    arcaneExplosion.scale.setTo(3.5,3.5);
    arcaneExplosion.anchor.x = 0.5;
    arcaneExplosion.anchor.y = 0.5;
    arcaneExplosion.body.allowGravity = false;
    arcaneExplosion.animations.add('run');
    arcaneExplosion.body.onCollide = new Phaser.Signal();
    arcaneExplosion.body.onCollide.add(arcaneBombExplode, this);
    arcaneExplosion.kill();
  }
}

function arcaneBombExplode(bomb, impactTarget){
  if(impactTarget.index == -1) return;
  console.log("bomb", bomb);
  console.log("Testing ", impactTarget);
  var explode = arcane_bomb_explosions.getFirstExists(false);
  if(explode){
    bomb.kill();
    explode.revive();
    explode.reset(bomb.body.center.x, bomb.body.center.y);
    explode.animations.play('run', 20, false, true);
  }
}

function arcaneBombExplodeDamage(bomb, impactTarget){
  if(impactTarget.index == -1) return;
  console.log("bomb", bomb);
  console.log("Testing ", impactTarget);
  impactTarget.damage(10);
  var explode = arcane_bomb_explosions.getFirstExists(false);
  if(explode){
    bomb.kill();
    explode.revive();
    explode.reset(bomb.body.center.x, bomb.body.center.y);
    explode.animations.play('run', 20, false, true);
  }
}


function rush(){
  player.body.velocity.x = player.state.direction * player.stats.speed*2;
}


var arcane_bomb_index = 0;

var templateStarAim ={
  bottomRightX: 20,
  bottomRightY: 20,
  topRightX: 20,
  topRightY: 20,
  bottomX: 20,
  bottomY: 20,
  topX: 5,
  topY:20,
  sideY: 0,
  sideX: 30
};
