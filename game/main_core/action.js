//-----------------------------------------------
//  Player_Physical_Action
//-----------------------------------------------
function playerMoveLeft(){
  player.direction = -1;
  player.moveRight = 0;
  player.moveLeft = 1;
}
function playerStopLeft(){
  player.moveLeft = 0;
}
function playerMoveRight(){
  player.direction = 1;
  player.moveLeft= 0;
  player.moveRight = 1;
}
function playerStopRight(){
  player.moveRight = 0;
}
function playerSprint(){
  player.sprinting = 1;
}
function playerSprintStop(){
  player.sprinting = 0;
}

function playerFlyUp(){
  player.body.velocity.y = -250;
}
function playerStopUp(){
  player.body.velocity.y = 0;
}
function playerFlyDown(){
  player.body.velocity.y = 250;
}
function playerStopDown(){
  player.body.velocity.y = 0;
}

function playerJump(){
  if(player.casting) return;
  if(player.jump == 1){
    playerSpellJump();
    return;
  }
  player.jump++;
  player.jumping = 1;
  jumpSound.play();
  console.log("Jumping\n", player.jump);
}

function playerJumpStop(){
  if(player.casting) return;
  player.jumping  = 0;
  player.jumpAtY = 0;
}

//-----------------------------------------------
//  Player_Spell_Setup
//-----------------------------------------------
var spells = [];
var magicBombs = [];
var blast = [];
var blastMaterial;

function createMagicMaterial(){
  magicMaterial = game.physics.p2.createMaterial('magicMaterial');
  bounceBombMaterial = game.physics.p2.createMaterial('magicMaterial');
  blastMaterial = game.physics.p2.createMaterial('blastMaterial');

  var bombBounceContact = game.physics.p2.createContactMaterial(bounceBombMaterial, boxMaterial);
  bombBounceContact.restitution = 1.0;
}

function setupSpells(){
  createMagicMaterial();

  blastSound  = game.add.audio('blast');  blastSound.volume = 0.2;
  blast2Sound  = game.add.audio('blast2');  blast2Sound.volume = 0.2;
  chargeSound = game.add.audio('charge'); chargeSound.volume = 1;
  shootSound  = game.add.audio('shoot');  shootSound.volume = 0.5;
  teleportSound = game.add.audio('teleport'); teleportSound.volume = 0.2;
  wallSound = game.add.audio('wall'); wallSound.volume = 0.2;

  circleBarrier = game.add.sprite(-35, -23, 'circleBarrier');
  circleBarrier.scale.setTo(3.5, 3.5);
  circleBarrier.setScaleMinMax(3.5, 3.5);
  circleBarrier.alpha = 0;
  circleBarrier.frame = 0;
  circleBarrier.animations.add('run', [0, 1, 2, 3, 4, 5], true);
  circleBarrier.animations.add('end', [8, 9, 10, 11, 12, 13, 14, 15, 16], false);
  circleBarrier.play('run', 10, true);
  player.addChild(circleBarrier);

  circleCasting = game.add.sprite(-40, -23, 'chargeCast');
  circleCasting.scale.setTo(3.2, 3.2);
  circleCasting.alpha = 0;
  circleCasting.frame = 0;
  circleCasting.animations.add('run', [0, 1, 2, 3, 4, 5], 5, true);
  circleCasting.animations.add('end', [6, 7, 8, 9, 10, 11],5, true);
  //circleCasting.play('run', true);
  circleCasting.scale.setTo(3,3);
  circleCasting.setScaleMinMax(3,3);
  player.addChild(circleCasting);

  setupMagicChargeTimer();


  magicBounce = game.add.sprite(-30, -2, 'spellJump');
  magicBounce.scale.setTo(4.0, 1.0);
  magicBounce.animations.add('run', [0, 1, 2, 3, 4,5,6,7,8,9], 25,false);
  magicBounce.frame = 9;

  player.addChild(magicBounce);
}


function placeFrontOfPlayer(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y + 40;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + 37*player.direction;
    magicObject.body.y = player.body.y - 40;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + 60;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - 40;
  }
  else{
    magicObject.body.y = player.body.y - 12;
    magicObject.body.x = player.body.x + 35 * player.direction;
  }
}

function placeFrontOfPlayerWith(magicObject, x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + x*player.direction;
    magicObject.body.y = player.body.y + y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.x = player.body.x + x*player.direction;
    magicObject.body.y = player.body.y - y;
  }
  else if(moveDown.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y + y;
  }
  else if(moveUp.isDown){
    magicObject.body.x = player.body.x;
    magicObject.body.y = player.body.y - y;
  }
  else{
    magicObject.body.y = player.body.y - 7;
    magicObject.body.x = player.body.x + x * player.direction;
  }
}

function moveFrontOfPlayer(magicObject){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = 500*player.direction;
    magicObject.body.velocity.y = 350;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = 500*player.direction;
    magicObject.body.velocity.y = -350;
  }
  else if(moveDown.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = 500;
  }
  else if(moveUp.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = -500;
  }
  else{
    magicObject.body.velocity.y = 0;
    magicObject.body.velocity.x = 500*player.direction;
  }
}

function moveFrontOfPlayerWith(magicObject, x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = x*player.direction;
    magicObject.body.velocity.y = y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    magicObject.body.velocity.x = x*player.direction;
    magicObject.body.velocity.y = -y;
  }
  else if(moveDown.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = y;
  }
  else if(moveUp.isDown){
    magicObject.body.velocity.x = 0;
    magicObject.body.velocity.y = -y;
  }
  else{
    magicObject.body.velocity.y = 0;
    magicObject.body.velocity.x = x*player.direction;
  }
}

function movePlayer(x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x = -x*player.direction;
    player.body.velocity.y = -y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x = -x*player.direction;
    player.body.velocity.y = y;
  }
  else if(moveDown.isDown){
    player.body.velocity.x = 0;
    player.body.velocity.y = -y;
  }
  else if(moveUp.isDown){
    player.body.velocity.x = 0;
    player.body.velocity.y = y;
  }
  else{
    player.body.velocity.x = -x*player.direction;
    player.body.velocity.y = 0;
  }
}

function addVelocityToPlayer(x, y){
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x += -x*player.direction;
    player.body.velocity.y += -y;
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    player.body.velocity.x += -x*player.direction;
    player.body.velocity.y += y;
  }
  else if(moveDown.isDown){
    player.body.velocity.x += 0;
    player.body.velocity.y += -y;
  }
  else if(moveUp.isDown){
    player.body.velocity.x += 0;
    player.body.velocity.y += y;
  }
  else{
    player.body.velocity.x += -x*player.direction;
    player.body.velocity.y += 0;
  }
}



//TODO: We might need to make a new section called status effect
function updateStatusEffect(){

}

function updateSpells(){
  updateMagicBombs();
  updateBarrier();
  //if(player.energy) placeFrontOfPlayer(magicBomb);
  //if(player.rmana <= 0) magicBoostEnd();
}

function updateMagicBombs(){
  //console.log("Total Spells", spells.length);
  for(var i = spells.length -1; i >= 0; i--){
    if(spells[i].timeAt < pTime){
      if(!spells[i].end) window[spells[i].castEnd](spells[i]);
      else{
        spells[i].kill();
        spells.splice(i, 1);
      }
    }
  }
}

function hitBox(affectedBody, body2){
  var attack = this;
  if(checkBodyHit(affectedBody, attack)) return;
  affectedBody.health -= attack.damage;
  console.log("Affected Body Health", affectedBody.health);
  if(affectedBody.health <= 0) entityDestroy(affectedBody);
}

function forceBox(affectedBody, body2){
  var attack = this;
  if(checkBodyHit(affectedBody, attack)) return;
  if(reflectProjectile(affectedBody)) return;
  affectedBody.health -= attack.damage;
  velocityFrontOfPlayer(affectedBody.sprite, 500, 500);
  if(affectedBody.health <= 0) entityDestroy(affectedBody);
}

function reflectProjectile(body){
  if(body.sprite.projectile){
    body.sprite.alliance = this.alliance;
    moveFrontOfPlayerWith(body.sprite, 500, 500);
    return true;
  }
  else return false
}

function checkBodyHit(body1, body2){
  if(!body1 || 
      body1.indestructible ||
      body1.sprite.alliance == body2.alliance)
  {
    return true;
  } else {
    return false;
  }
}

function entityDestroy(body){
  if(body.health <= 0){
    tmp = body.sprite.aid;
    if(body.sprite.attack != null){
      body.sprite.attack.destroy();
    }
    if(body.sprite.visual != null){ 
      body.sprite.visual.destroy();
    }
    body.sprite.destroy();
    activeAI[tmp] = 0;
  }
}
