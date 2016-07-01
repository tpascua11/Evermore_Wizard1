var editorHandX = 0;
var editorHandY = 0;

var mouseMaterial;
var mouse;

function loadBoundaries(){
  game.load.spritesheet('exist', '../assets/basic/Exist.png', 16, 16);
  game.load.spritesheet('click', '../assets/basic/Click.png', 16, 16);
  game.load.spritesheet('checkpoint', '../assets/basic/Checkpoint.png', 16, 16);
}

function setupMouse(){
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);

    mouse = game.add.sprite(300, 100, 'click');
    mouse.scale.setTo(0.5, 0.5);
    game.physics.p2.enable(mouse);
    mouse.body.fixedRotation = true; 
    player.body.daming = 0.5;
    mouseMaterial = game.physics.p2.createMaterial('mouseMaterial', mouse.body);
    mouse.body.static = true;

    // attach pointer events
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(moveM, this);
}

function editorHold(){

}

var copycopy;
var copyCheck = false;
function click(pointer) {
  console.log("before XY", pointer.x, pointer.y);
  //var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
  //var trueX = game.physics.p2.pxmi(pointer.position.x);
  //var trueY = game.physics.p2.pxmi(pointer.position.y);
  console.log("after XY", pointer.x, pointer.y);
  //makeBlast(pointer.x, pointer.y);
  //shootBlasterX(pointer.x, pointer.y);
  mouse.body.x = pointer.x + game.camera.x;
  mouse.body.y = pointer.y + game.camera.y;

  //makeBlast(pointer.x + game.camera.x, pointer.y + game.camera.y);
  //shootBlasterX(pointer.x + game.camera.x, pointer.y + game.camera.y);

}

function makeBlast(){



}


function makeBlast(atX, atY){
  player.rmana-= 1;
  blaster = game.add.sprite(atX, atY, 'energyBall');
  blaster.scale.setTo(0.3,0.3);

  game.physics.p2.enable(blaster);

  blaster.body.static = true;
  blaster.enableBody = false;

  blaster.scale.setTo(5,5);
  blaster.pCharge = pCharge;
  blaster.gravityScale = 0;
  blaster.body.fixedRotation = true;
  blaster.animations.add('run', [0, 1, 2, 3, 4,5], true);
  blaster.animations.add('end', [0, 1, 2, 3, 4, 5, 6], 30, true);
  blaster.animations.play('run', 15, true);

  blaster.end = false;

  if(bodyCheck) placeBody(atX, atY);
}
function shootBlasterX(atX, atY){
  if(pCharge > 1.2) blaster.damage = 0.5 + pCharge*10;
  else blaster.damage = 1;
  //console.log('Blaster damage', blaster.damage);

  blaster.body.static = false;
  blaster.body.fixedRotation = true;
  blaster.body.data.gravityScale = 0;
  blaster.body.damping = 0;
  blaster.body.velocity.y = 0;
  blaster.body.velocity.x = 0;
  blaster.body.force = 3000;

  blaster.body.setMaterial(magicMaterial);
  blaster.timeAt = pTime + 10;
  //blaster.body.onEndContact.add(missleFinale, blaster);
  blaster.body.onBeginContact.add(hitBox, blaster);
  //blaster.body.onEndContact.add(missleFinale, blaster);
  //spells[spells.length-1].body.onBeginContact.add(missleFinale, this);
  //console.log("Spells Length", spells.length);

  if(!bodyCheck)blaster.body.onBeginContact.add(detectBody, blaster);
  else 
  spells.push(blaster);
  player.casting = 0;
  shootSound.play();

  if(player.rmana < 0){
    console.log("This should work");
    missleFinaleFail(blaster);
  }
}





function release() {
}
var targetBody;
var bodyCheck = false;

function detectBody(body1, body2){
  console.log(body1);
  if(body1 == null) return;
  targetBody = body1;
  bodyCheck = true;
}

function placeBody(atX, atY){
  targetBody.x = atX;
  targetBody.y = atY;
  bodyCheck = true;
}

function moveM(pointer) {

}







