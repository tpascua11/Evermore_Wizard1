/*
                  ,     \    /      ,
                 / \    )\__/(     / \
                /   \  (Z\  /0)   /   \
           ____/_____\__\@  @/___/_____\____
          |             |\../|              |
          |              \VV/               |
          |        ---- Action -----        |
          |                                 |
          |_________________________________|
           |    /\ /      \\       \ /\    |
           |  /   V        ))       V   \  |
           |/     `       //        '     \|
           ---------------------------------
           Charging_Magic
*/

//---------------------------------------------------------------------
//  Charge_Magic
//--------------------------------------------------------------------
var chargingMagic;
//chargingMagic.time.create(false);
//chargingMagic.loop(magicChargeSec, chargeMagicIncrement, this);
var magicCharge = 0;
function addMagicCharge(){
}


function chargeMagic(){

}

function cancelChargeMagic(){

}
//-----------------
// Charging_Magic
//-----------------
//Probally Needs to be at default position
var magicChargeTimer;
var magicChargeSec = (Phaser.Timer.SECOND * 0.3);
var magicModifier = 0;
var magicModifierLimit = 2;

function setupMagicChargeTimer(){
  magicChargeTimer = game.time.create(false);
  magicChargeTimer.loop(magicChargeSec, chargeMagicIncrement, this);
}

function chargeMagicIncrement(){
  /*
  if(magicModifier <= magicModifierLimit){
    console.log("Charging", magicModifier);
   // circleCasting.animations.currentAnim.speed +=15;
    magicModifier+=1;
  }
  */
}

function chargeMagic2(){
  //playerAnchor();
  //chargeSound.loop = true;

  //chargeSound.play();
  player.charging = 1;
  player.casting = 1;
  //circleCasting.play('run', 10, true);
  //circleCasting.alpha = 1;
  state = "charging";
/* TH
  magicChargeTimer = game.time.create(false);
  magicChargeTimer.loop(magicChargeSec, chargeMagicIncrement, this);
  magicChargeTimer.start();
  */
}

function endCharge(){
  //magicChargeTimer.stop();
  player.charging = player.casting = 0;
  player.casting = false;
  player.energy = false;

  //circleCasting.alpha = 1;
  //circleCasting.play('end', 30, false);
  //chargeSound.stop();
  state = "normal";
  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;
  magicModifier = 0;
}

function chargeUp(){

}
//-------------
// Magic_Bomb
//------------
function shootMagicBomb(){
  playerStartDelay(250);

  if(!player.charging) return;
  /*
  player.rmana-=3;
  magicBomb = game.add.sprite(0, 0, 'energyBall');
  //shootSound.play();
  magicBomb.scale.setTo(1,1);
  game.physics.p2.enable(magicBomb);
  var size  = 1 + 0.05*magicModifier;
  var speed = 400 + 5*magicModifier;
  var time  = 2 + magicModifier*2;
  magicBomb.scale.setTo(size, size);
  moveFrontOfPlayerWith(magicBomb,speed,speed);
  magicBomb.timeAt = time + pTime + 2;
  magicBomb.damage = 5 + magicModifier*2;

  magicBomb.size = size;
  magicBomb.alliance = 1;
  magicBomb.body.alliance = 1;
  magicBomb.body.enableBody = false;
  magicBomb.force = 100 + speed;
  magicBomb.body.enableBody = false;
  magicBomb.force = pCharge * 50;

  //magicBomb.body.setMaterial(magicMaterial);
  magicBomb.body.setMaterial(bounceBombMaterial);

  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4,5], true);
  magicBomb.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  magicBomb.animations.play('run', 15, true);
  magicBomb.end = false;
  magicBomb.body.ptype = 'blast';

  magicBomb.gravityScale = 0;
  magicBomb.castEnd = "magicBombFinale";
  magicBomb.body.static = false;
  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  magicBomb.body.force = 0;
  magicBomb.pCharge = pCharge;

  magicBomb.end = false;
  magicBomb.body.onBeginContact.add(magicBombFinaleContact, magicBomb);

  placeFrontOfPlayer(magicBomb);
  spells.push(magicBomb);
  */
  endCharge();
}

function magicBombFinale(blast){
  console.log("testing 1233");

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
  blast.scale.setTo(3+blast.size,3+blast.size);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
}

function magicBombFinaleContact(body1, body2){
  if(this.end == true) return;
  //if(body1 != null && body1.alliance == 1) return;
  if(body1!= null && body1.sprite.alliance != 2) return;
  blastSound.play();
  blast = this;
  blast.body.static = true;
  blast.end = true;
  blast.loadTexture('magicExpand', 0, false);
  blast.animations.play('end', 30, false, true);
  blast.body.velocity.x = 0;
  blast.body.velocity.y = 0;
  blast.body.damping = 1;
  blast.body.mass= 1.1;
  blast.timeAt = pTime+10;
  //blast.scale.setTo(3 + blast.pCharge, 3 + blast.pCharge);
  blast.scale.setTo(3+blast.size,3+blast.size);
  blast.body.setRectangle(blast.height, blast.width);
  blast.body.onBeginContact.add(hitBox, blast);
  blast.body.data.shapes[0].sensor = true;
}
//----------------
// Magic Force
//----------------
function magicForce(){
  if(!player.charging) return;
  if(player.focus <= 0 || player.rmana < 15) return;
  player.focus-=2;
  player.rmana-=10;
  player.charging = player.casting = 0;

  magicBomb = game.add.sprite(0, 0, 'magicBlast');
  magicBomb.scale.setTo(2 + magicModifier,2);
  game.physics.p2.enable(magicBomb);
  magicBomb.body.alliance = 1;
  magicBomb.body.enableBody = false;
  magicBomb.force = pCharge * 50;

  magicBomb.damage = 3 + pCharge*5;

  magicBomb.body.setMaterial(magicMaterial);

  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], true);
  magicBomb.animations.play('run', 25, false, true);
  magicBomb.end = true;
  magicBomb.body.ptype = 'blast';

  magicBomb.gravityScale = 0;
  magicBomb.castEnd = "bombFinale";
  //magicBomb.body.static = true;
  magicBomb.body.data.shapes[0].sensor = true;

  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  //magicBomb.body.force = 3000;
  magicBomb.body.direction = player.direction;
  magicBomb.pCharge = pCharge;

  magicBomb.timeAt = pTime + 12;
  magicBomb.alliance = 1;
  magicBomb.body.onBeginContact.add(forceBox, magicBomb);

  placeFrontOfPlayerVisualChange(magicBomb);

  //if(player.jump == 0) movePlayer(200+magicModifier*20,300+magicModifier*25);
  //else movePlayer(300+magicModifier*25,300+magicModifier*25);

  //shootSound.play();
  blast2Sound.play();
  //spells.push(magicBomb);
  endCharge();
}

//-----------------------------
//  Magic Barrier
//-----------------------------
function updateBarrier(){
  //circleBarrier.x = player.body.x-30;
  //circleBarrier.y = player.body.y-30;
}
/*
   function playerStopBarrier(){
   if(!player.barrier) return;
   pCharge = 1;
   circleBarrier.play('end', 20, false);

   player.casting = false;
   player.barrier = false;
   player.jumping = 0;
   player.jumpAtY = 0;
   }*/

function playerStopBarrier(){
  if(!player.barrier) return;
  pCharge = 1;

  circleBarrier.play('end', 20, false);

  player.casting = false;
  player.barrier = false;
  player.jumping = 0;
  player.jumpAtY = 0;

  state = "normal";
}

function playerBarrier(){
  if(player.rmana <= 0) return;
  player.rmana -= 5;
  circleBarrier.play('run', 10, true);
  //circleBarrier.tint = 0xFF0000;
  circleBarrier.alpha = 0.7;
  player.barrier = true;
  player.casting = 1;

  wallSound.play();
  state = "barrier";
}

function playerSuperBarrier(){
  if(player.rmana <= 0) return;
  player.rmana -= 1;
  circleBarrier.play('run', 10, true);
  circleBarrier.alpha = 0.9;
  player.barrier = true;
  player.casting = 1;

  wallSound.play();
  state = "barrier";
}




//--------------
//Warp
//--------------
var portal1;
var portal2;
var portalConnection = false;
function arcaneSetup(){

}

function connectionTimer(){
  chargeTimer = game.time.create(false);
  chargeTimer.loop(chargeSec, chargingMagic, this);
  chargeTimer.start();
}

function portal1(){
  portal1 = game.add.sprite(0, 0, 'teleport301');
  portal1.scale.setTo(3,3);
  game.physics.p2.enable(portal1);
  //placeFrontOfPlayerWith(portal1,100,100);

  portal1.body.data.shapes[0].sensor = false;
}

function portal2(){
}

function traverse(){
  if(portalConnection){
  
  }
}
//-------------
// Spell Jump
//-------------
var startSpellJump = false;
function playerSpellJump(){
  console.log("Spell Jumping");
  if(player.rmana >= 10){

   magicBounce.animations.stop();
    if(player.direction == 1){
      console.log("Magic Jump Right");
      visual.animations.play('magicJumpRight', 15, false);
      magicBounce.animations.play('run')
    }
    else{
      visual.animations.play('magicJumpLeft', 15, false);
      magicBounce.animations.play('run')
    }
    player.body.velocity.x*=0.5;
    player.spellJump = 1;
    player.casting = 0;
    player.rmana -=10;
    spellJumpSound.play();
    player.body.velocity.y= -300;
  }
}
//-----------------
// Player Levitate
//-----------------
function playerLevitate(){
  if(player.rmana <= 0){
    player.levitation = false;
    return;
  }
  player.body.velocity.y = 0;
}

function waveFollow(obj1, obj2, speed){
  if (typeof speed === 'undefined') { speed = 60; }
  var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
  obj1.body.velocity.x = Math.cos(angle) * speed;    // accelerateToObject 
  obj1.body.velocity.y = Math.sin(angle) * speed;
}


function levitationSwitch(){
  player.levitation = !player.levitation;
}

//-----------------------------
// Magic Boost
//-----------------------------
var saveSpeed;
var saveSprint;
var saveDamageMod;
var magicBoostOn = false;
var teleportPastx;
var teleportPasty;

function magicBoost(){
  if(player.rmana <= 0) return;
  saveSpeed = saveSprint = 0;
  saveSpeed = player.speed;
  saveDamageMod = player.damageModifier;
  saveSprint = player.sprintSpd;
  player.speed = 350;
  player.sprintSpd = 700;
  player.damageModifier = 2;
}

function magicBoostEnd(){
  player.speed = 1000;
  player.sprintSpd = 1000;
}

//-------------------------
//  Teleport
//-------------------------
var connection;
var teleport;

function teleportWave(){
  if(player.rmana < 10) return;
  if(player.focus <= 0) return;
  if(teleport != null) teleport.destroy();
  player.rmana -= 10;
  player.focus-=2;
  var teleportVisualEnd;
  teleportVisualEnd = game.add.sprite(player.body.x-35, player.body.y-23, 'teleport301');

  teleportVisualEnd.animations.add('run', [0, 1, 2, 3, 4, 5], true);
  teleportVisualEnd.animations.play('run', 25, false, true);
  teleportVisualEnd.scale.setTo(5,5);

  teleportSound.play();

  teleport = game.add.sprite(0, 0, 'teleport301');
  teleport.scale.setTo(3,3);
  game.physics.p2.enable(teleport);

  teleport.body.static = false;
  teleport.body.data.gravityScale = 0;
  teleport.body.damping = 0;
  teleport.body.force = 0;
  teleport.alpha = 1;
  teleport.invincible = true;

  placeFrontOfPlayerWith(teleport,100,100);

  startTeleportTimer();


  teleport.indestructible = true;
  teleport.alliance = 1;

  teleportPastx = player.body.x;
  teleportPasty = player.body.y;

  moveFrontOfPlayerWith(player, 450, 450);

  teleportVisual = game.add.sprite(teleport.body.x-23, teleport.body.y-23, 'teleport301');
  teleportVisual.scale.setTo(3,3);

  teleportVisual.animations.add('run', [5, 4, 3, 2, 1, 0], true);
  teleportVisual.animations.play('run', 25, false, true);

  player.body.data.shapes[0].sensor = true;
  //player.body.static = true;
  player.alpha = 0;

  teleport.body.onBeginContact.add(teleportConnection, blast);
  teleport.body.onEndContact.add(teleportDisconnection, blast);

}

function teleportConnection(body1, body2){
  connection++;
  teleportGo();
}

function teleportDisconnection(body1, body2){
  //connection--;
}

var teleportTimer;
function startTeleportTimer(){
  teleportTimer= game.time.create(false);
  teleportTimer.loop(400, teleportGo, this);
  teleportTimer.start();
}
function teleportGo(){
  teleport.allaince = 1;
  teleport.body.x = -500;
  teleport.body.static = true;
  teleport.timeAt = pTime;
  teleport.end = true;
  spells.push(teleport);
  if(connection == 0){
    //placeFrontOfPlayerWith(player,100,100);
    //player.reset(teleportPastx, teleportPasty);
  }
  teleportTimer.stop();
  connection = 0;

  player.body.data.shapes[0].sensor = false;
  player.body.static = false;
  player.alpha = 1;
}

//-----------------------------
//  Magic BLast
//---------------------------
function magicBlast(){
  if(!player.charging) return;
  if(player.focus <= 0 || player.rmana <= 0) return;
  player.focus-=2;
  player.rmana-=1;
  //if(player.focus <= 50) return;
  player.charging = player.casting = 0;
  //player.focus-=33;

  magicBomb = game.add.sprite(0, 0, 'magicBlast');
  //magicBomb.scale.setTo(1,1);
  magicBomb.scale.setTo(pCharge*3,2);
  game.physics.p2.enable(magicBomb);
  magicBomb.body.alliance = 1;
  magicBomb.body.enableBody = false;
  magicBomb.force = pCharge * 50;

  magicBomb.damage = 3 + pCharge*5;

  magicBomb.body.setMaterial(magicMaterial);

  magicBomb.body.fixedRotation = true;
  magicBomb.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], true);
  magicBomb.animations.play('run', 10, false);
  magicBomb.end = true;
  magicBomb.body.ptype = 'blast';

  magicBomb.gravityScale = 0;
  magicBomb.castEnd = "bombFinale";
  //magicBomb.body.static = true;
  magicBomb.body.data.shapes[0].sensor = true;

  magicBomb.body.data.gravityScale = 0;
  magicBomb.body.damping = 0;
  //magicBomb.body.force = 3000;
  magicBomb.body.direction = player.direction;
  magicBomb.pCharge = pCharge;

  magicBomb.timeAt = pTime + 2;
  magicBomb.alliance = 1;
  magicBomb.body.onBeginContact.add(forceBox, magicBomb);

  chargeTimer.stop();
  placeFrontOfPlayerVisualChange(magicBomb);
  //moveFrontOfPlayerWith(magicBomb, 500*pCharge, 500);
  movePlayer(400+pCharge*60,400+pCharge*60);
  player.casting = false;
  player.energy = false;

  //shootSound.play();
  blast2Sound.play();
  chargeSound.stop();
  spells.push(magicBomb);

  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;

  //circleCasting.play('end', 30, false);
  //circleCasting.alpha = 0;
  state = "normal";
}
