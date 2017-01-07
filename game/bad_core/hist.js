function playerTeleport(){
  if(player.rmana <= 0) return;
  player.rmana -= 2;
  console.log("IM Teleporting");
  teleportSound.play();
  teleportBefore = game.add.sprite(player.body.x, player.body.y, 'teleport');
  teleportBefore.scale.setTo(3,3);
  teleportBefore.animations.add('end', [0, 1, 2, 3, 4, 5, 6, 7], 50, true);
  teleportBefore.animations.play('end', 25, false, true);
  if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
    console.log("So..");
    player.body.reset(player.body.x + 75*player.direction, player.body.y + 50);
  }
  else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
    console.log("So..");
    player.body.reset(player.body.x + 75*player.direction, player.body.y - 50);
  }
  else if(moveDown.isDown){
    player.body.reset(player.body.x, player.body.y+80);
  }
  else if(moveUp.isDown){
    player.body.reset(player.body.x, player.body.y-80);
  }
  else{
    player.body.reset(player.body.x + 75 * player.direction, player.body.y);
  }

  teleportAfter  = game.add.sprite(player.body.x, player.body.y, 'teleport');
  teleportAfter.scale.setTo(3,3);
  teleportAfter.animations.add('end', [7, 6, 5, 4, 3, 2, 1, 0], 50, true);
  teleportAfter.animations.play('end', 25, false, true);
}

function playerTower(){
  console.log("IM Defending");
  var direct = 0;
  var box = game.add.sprite(player.body.x, player.body.y - 10, 'magicBlock');
  //var size = game.rnd.integerInRange(1, 5);
  size = 3;

  box.scale.setTo(size,size+1);
  game.physics.p2.enable(box);

  box.animations.add('auto',
      [0, 1, 2, 3], 25, true);
  box.animations.play('auto', 15, true);

  box.body.fixedRotation = true;
  box.body.mass = 6;
  box.body.health = 40;
  //box.body.velocity.y = -500;

  box.body.static = true;
  box.body.setMaterial(boxMaterial);


  player.reset(box.body.x, box.body.y-50);
  player.body.velocity.y = -700;

  box.timeAt = pTime + 25;
  spells.push(box);

  wallSound.play();
}

function repositionPlayerBarrier(){
  if(activeBox == null){
    console.log("DEATH");
    return;
  }
    if(moveDown.isDown && (moveRight.isDown || moveLeft.isDown)){
      activeBox.body.angle = 45*player.direction;
      activeBox.body.x = player.body.x + 45*player.direction;
      activeBox.body.y = player.body.y + 45;
    }
    else if(moveUp.isDown && (moveRight.isDown || moveLeft.isDown)){
      activeBox.body.angle = 135* player.direction;
      activeBox.body.x = player.body.x + 45*player.direction;
      activeBox.body.y = player.body.y - 45;
    }
    else if(moveDown.isDown){
      activeBox.body.angle = 90;
      activeBox.body.x = player.body.x;
      activeBox.body.y = player.body.y + 55;

    }
    else if(moveUp.isDown){
      activeBox.body.angle = 90;
      activeBox.body.x = player.body.x;
      activeBox.body.y = player.body.y - 60;

      //constraint = game.physics.p2.createLockConstraint
      //  (activeBox.body, player.body, [0, -80], 90);
    }
    else{
      activeBox.body.angle = 0;
      activeBox.body.y = player.body.y;
      activeBox.body.x = player.body.x + 60 * player.direction;
      //constraint = game.physics.p2.createLockConstraint
      //  (activeBox.body, player.body, [60*player.direction, 0], 0);
    }
}


function wall(){
  player.barrier= true;
  player.casting = true;
  player.rmana -= 3;
  console.log("IM Defending");
  var box = game.add.sprite(player.body.x + 50*player.direction, player.body.y-5, 'magicBlock');
  wHeight = 3;
  wWidth = 2;
  box.scale.setTo(wWidth,wHeight);
  game.physics.p2.enable(box);
  box.animations.add('auto',
      [0, 1, 2, 3], 25, true);
  box.animations.play('auto', 15, true);
  box.body.fixedRotation = false;
  box.body.mass = 6;
  box.body.health = 40;

  box.body.static = false;
  box.body.data.gravityScale = 0.0;

  box.body.setMaterial(boxMaterial);
  activeBox = box;
  repositionPlayerBarrier();

  //constraint = game.physics.p2.createRevoluteConstraint(activeBox.body, [0,0], player.body, [0,0], 10000);
  //constraint = game.physics.p2.createLockConstraint(sprite2, player, [0, 50], 80);

}

function shootShield(){
  if(!player.casting || player.rmana <= 0) return;
  console.log("did it work");
  player.rmana-= 5;
  wall = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'magicPush');
  wall.scale.setTo(6,6);
  game.physics.p2.enable(wall);
  wall.body.fixedRotation = true;
  wall.animations.add('run', [0, 1, 2], true);
  wall.animations.play('run', 15, true);
  wall.end = false;

  placeFrontOfPlayer(wall);
  wall.body.setMaterial(magicMaterial);
  wall.timeAt = pTime + 1000;

  spells.push(wall);
  player.casting = 0;
  shootSound.play();
}


function playerShoot(){
  if(!player.casting || player.energy <= 0) return;
  shootBlaster();
  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;
  endChargingTimer();
  game.world.bringToTop(bg2);

  player.casting = false;
  player.energy = false;
}

function charging(){
  player.casting = 1;
  //player.charged = pTime;
  chargingTimer();
  makeBlast();
  player.energy = true;
}

function shootBlaster(){
  if(pCharge > 1.2) blaster.damage = 0.5 + pCharge*10;
  else blaster.damage = 1;
  //console.log('Blaster damage', blaster.damage);
  blaster.body.static = false;
  blaster.body.fixedRotation = true;
  blaster.body.data.gravityScale = 0;
  blaster.body.damping = 0;
  blaster.body.velocity.y = 0;
  blaster.body.force = 3000;
  placeFrontOfPlayer(blaster);

  blaster.body.setMaterial(magicMaterial);
  blaster.timeAt = pTime + 10;
  //blaster.body.onBeginContact.add(hitBox, blaster);
  blaster.body.onBeginContact.add(missleFinale, blaster);
  spells.push(blaster);
  player.casting = 0;
  shootSound.play();
}

function missleFinale(body1, body2){
  blast = this;
  //console.log(body1);
  if(body1 != null && (blast.end || blast.body.ptype == body1.ptype)) return;
  //console.log(body1);
  blast.body.static = true;
  blastSound.play();
  blast.end = true;
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  blast.body.velocity.x = 0;
  blast.body.velocity.y = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+10;
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
  //spells.splice(blast.spellID-1, 1);
}

function missleFinaleD(blast){
  //if(blaster.end) return;
  blastSound.play();
  //blast = this;
  blast.body.static = true;
  //console.log(pCharge);
  //console.log("You Shoot A Blast", blast.height, blast.width);
  blast.end = true;
  blast.scale.setTo(3 * blast.pCharge, 3 * blast.pCharge);
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 25, false, true);
  blast.body.velocity.x = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+15;
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onEndContact.add(hitBox, blast);
  //blast.body.onBeginContact.add(missleFinale, blast);
}

//______________________________
//  Magic Blast
//______________________________
function makeBlast(){
  chargeSound.play();
  pCharge = 1;
  player.rmana-= 1;
  blaster = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'energyBall');
  blaster.scale.setTo(0.3,0.3);
  game.physics.p2.enable(blaster);
  blaster.body.alliance = 0;
  blaster.body.static = true;
  blaster.body.enableBody = false;
  blaster.pCharge = pCharge;
  blaster.scale.setTo(pCharge,pCharge);
  blaster.gravityScale = 0;
  blaster.body.fixedRotation = true;
  blaster.animations.add('run', [0, 1, 2, 3, 4,5], true);
  blaster.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  blaster.animations.play('run', 15, true);
  blaster.body.x = player.body.x + 100*player.direction;
  blaster.body.y = player.body.y;
  blaster.end = false;
  blaster.body.ptype = 'blast';
  game.world.bringToTop(bg2);
  repositionEnergy();
}

function chargingBlast(){
  blaster.pCharge = pCharge;
  blaster.scale.setTo(pCharge, pCharge);
}

function makeMagicBomb(){
  player.casting = 1;
  startMagicBombTimer();

  chargeSound.loop = true;
  chargeSound.play();
  pCharge = 1;
  player.rmana-= 1;
  magicBomb = game.add.sprite(player.body.x + 100*player.direction, player.body.y, 'energyBall');
  magicBomb.scale.setTo(0.3,0.3);
  game.physics.p2.enable(magicBomb);
  magicBomb.body.alliance = 0;
  magicBomb.body.static = true;
  magicBomb.body.enableBody = false;
  magicBomb.pCharge = pCharge;
  magicBomb.scale.setTo(pCharge,pCharge);
  magicBomb.gravityScale = 0;
  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4,5], true);
  magicBomb.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  magicBomb.animations.play('run', 15, true);
  magicBomb.body.x = player.body.x + 100*player.direction;
  magicBomb.body.y = player.body.y;
  magicBomb.end = false;
  magicBomb.body.ptype = 'blast';

  placeFrontOfPlayer(magicBomb);
  player.energy = true;

  //game.world.bringToTop(bg2);
}


function shootMagicBomb(){
  if(!player.casting || player.energy <= 0) return;

  if(pCharge > 1.2) magicBomb.damage = 0.5 + pCharge*10;
  else magicBomb.damage = 1;
  //console.log('Blaster damage', blaster.damage);
  magicBomb.castEnd = "bombFinale";
  magicBomb.body.static = false;
  magicBomb.body.fixedRotation = true;
  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  magicBomb.body.force = 3000;
  placeFrontOfPlayer(magicBomb);

  magicBomb.body.setMaterial(magicMaterial);
  magicBomb.timeAt = pTime + 10;
  magicBomb.body.onBeginContact.add(bombFinaleContact, magicBomb);
  spells.push(magicBomb);
  player.casting = 0;
  shootSound.play();

  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;
  
  endMagicBombTimer();

  moveFrontOfPlayer(magicBomb);
  //game.world.bringToTop(bg2);

  player.casting = false;
  player.energy = false;
  if(pCharge >= 4) movePlayer(-600, -600);

  //chargeSound.loop = false;
  chargeSound.stop();
}

var magicBombTimer;

function startMagicBombTimer(){
  magicBombTimer = game.time.create(false);
  magicBombTimer.loop(500, chargeMagicBomb, this);
  magicBombTimer.start();
}

function endMagicBombTimer(){
  //magicBombTimer.stop();
  chargeTimer.stop();

}

function chargeMagicBomb(){
 if(pCharge <= 4){
    pCharge+= 0.3;
    player.rmana -= 1;
 }
 if(player.casting){
  magicBomb.pCharge = pCharge;
  magicBomb.scale.setTo(pCharge, pCharge);
 }

 //chargeSound.play();
}

//----------------------------
//  Teleport Wave
//----------------------------
var teleportStart;
var teleportEnd;
var teleportTimer;
var teleportEndTimer;
var teleportGo = false;
var connection = 0;
var teleportStack = 0;
var teleportZone;

function startTeleportTimer(){
  teleportTimer = game.time.create(false);
  teleportTimer.loop(5000, teleportAt, this);
  teleportTimer.start();
}

function startGoTeleport(){
  teleportEndTimer = game.time.create(false);
  teleportEndTimer.loop(5000, doTeleport, this);
  teleportEndTimer.start();
}

function teleportTest(){
  console.log("TEST");
  teleportStart = game.add.sprite(player.body.x, player.body.y, 'teleport');
  teleportStart.scale.setTo(3.3,3.3);
  teleportSound.play();
  game.physics.p2.enable(teleportStart);
  teleportStart.body.setMaterial(magicMaterial);
  playerStopBarrier();

  teleportStart.body.static = true;
  //teleportStart.body.data.shapes[0].sensor = true;
  placeFrontOfPlayerWith(teleportStart, 120, 120);
  teleportStart.body.velocity.x = 2;

  connection = 0;
  teleportStart.body.onBeginContact.add(teleportConnect, teleportStart);
  teleportStart.body.onEndContact.add(teleportDisconnect, teleportStart);
  startGoTeleport();
}

function doTeleport(){
  if(connection == 0){
    player.reset(teleportStart.body.x, teleportStart.body.y-2);
  }
  connection = 0;
  teleportStart.destroy();
  teleportEndTimer.stop();
}

function teleportWave(){
  teleportGo = false;
  teleportStart = game.add.sprite(player.body.x, player.body.y, 'teleport');
  teleportStart.scale.setTo(3.3,3.3);
  teleportSound.play();
  game.physics.p2.enable(teleportStart);
  teleportStart.body.setMaterial(magicMaterial);
  playerStopBarrier();
  startTeleportTimer();
  state = "normal";

  teleportStart.body.static = true;
  teleportStart.body.data.shapes[0].sensor = false;

  player.body.static = true;
  player.body.data.shapes[0].sensor = false;

  player.body.velocity.y = 0;
  state = "rift";
  teleportStart.body.onBeginContact.add(comeBackPoint, teleportStart);

  player.reset(player.body.x, player.body.y-20);
  moveFrontOfPlayerWith(player);
}

function teleportAt(){
    teleportGo = true;
    teleportTimer.stop();

      player.body.static = true;
      player.body.data.shapes[0].sensor = false;

      waveFollow(player, teleportStart, 1000); 
      return;
    if(connection == 0){
      player.reset(teleportEnd.body.x, teleportEnd.body.y);
      player.body.static = false;
      player.body.data.shapes[0].sensor = false;
      state = "normal";

      teleportStart.destroy();
      teleportEnd.destroy();
    }
    else{
      waveFollow(player, teleportStart, 1000);
    }
}

function teleportDisconnect(body1, body2){
  console.log("Connection", connection);
  connection--;
}

function teleportConnect(body1, body2){
  console.log("Connection", connection);
  connection++;
}

function comeBackPoint(){
  console.log('DID I HAPPEN!');
  console.log('DID I HAPPEN!');
  console.log('DID I HAPPEN!');
  if(!teleportGo) return;
  console.log('DID I HAPPEN!');
  console.log('DID I HAPPEN!');
  player.reset(teleportStart.body.x, teleportStart.body.y);
  teleportStart.destroy();
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  player.body.static = false;
  player.body.data.shapes[0].sensor = false;
  state = "normal";

  //teleportEnd.destroy();
    //teleportStart = 0;
}




