//--------------
// Charging
//-------------


//-----------------
// Charging Magic
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
  if(magicModifier <= magicModifierLimit){
    console.log("Charging", magicModifier);
    circleCasting.animations.currentAnim.speed +=15;
    magicModifier+=1;
  }
}

function chargeMagic2(){
  chargeSound.loop = true;

  chargeSound.play();
  player.charging = 1;
  player.casting = 1;
  circleCasting.play('run', 10, true);
  circleCasting.alpha = 1;
  state = "charging";

  magicChargeTimer = game.time.create(false);
  magicChargeTimer.loop(magicChargeSec, chargeMagicIncrement, this);
  magicChargeTimer.start();


}

function endCharge(){
  magicChargeTimer.stop();
  player.charging = player.casting = 0;
  player.casting = false;
  player.energy = false;

  circleCasting.alpha = 1;
  circleCasting.play('end', 30, false);
  chargeSound.stop();
  state = "normal";
  player.jumping = 0;
  player.jumpAtY = 0;
  player.moving = 2;
  magicModifier = 0;


}
//-------------
// Magic_Bomb
//------------
function shootMagicBomb(){
  if(!player.charging) return;
  player.rmana-=3;
  magicBomb = game.add.sprite(0, 0, 'energyBall');
  shootSound.play();
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

  magicBomb.body.setMaterial(magicMaterial);

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
  if(body1 != null && body1.alliance == 1) return;
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
    //jumpSound.play();
    spellJumpSound.play();
    player.body.velocity.y= -300;
    //player.jump = 0;
  }
}
