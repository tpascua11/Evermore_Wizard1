var editorHandX = 0;
var editorHandY = 0;

var mouseMaterial;
var mouse;
var mouseHolding = false;

function loadBoundaries(){
  game.load.spritesheet('exist', '../assets/basic/Exist.png', 16, 16);
  game.load.spritesheet('click', '../assets/basic/Click.png', 16, 16);
  game.load.spritesheet('checkpoint', '../assets/basic/Checkpoint.png', 16, 16);
}

function setupMouse(){
    player.body.static = false;
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

    mouse.body.onBeginContact.add(detectBody, mouse);
}

function editorHold(){

}

var copycopy;
var copyCheck = false;
function click(pointer) {
  console.log("before XY", pointer.x, pointer.y);
  console.log("after XY", pointer.x, pointer.y);
  mouse.body.x = pointer.x + game.camera.x;
  mouse.body.y = pointer.y + game.camera.y;
  mouseHolding = true;

  //makeBlast(pointer.x + game.camera.x, pointer.y + game.camera.y);
  //shootBlasterX(pointer.x + game.camera.x, pointer.y + game.camera.y);
}

function clickTarget(){


}

function release() {
  if(targetBody == null) return;
  mouseHolding = false;
  bodyCheck = false;
  targetBody.static = false;
  targetBody.velocity.x = 0;
  targetBody.velocity.y = 0;
  console.log("mouse hold off");
  targetBody = null;
}

var targetBody;
var bodyCheck = false;

function detectBody(body1, body2){
  if(bodyCheck) return;
  console.log(body1);
  if(body1 == null) return;
  body1.static = true;
  targetBody = body1;
  bodyCheck = true;
}

function placeBody(atX, atY){
  targetBody.x = atX;
  targetBody.y = atY;
  bodyCheck = true;
}

function moveM(pointer) {
  if(mouseHolding && (targetBody!= null)){
    //targetBody.x = mouse.body.x;
    //targetBody.y = mouse.body.y;
    //bodyCheck = true;
    mouse.body.x = pointer.x + game.camera.x;
    mouse.body.y = pointer.y + game.camera.y;
    targetBody.x = mouse.body.x;
    targetBody.y = mouse.body.y;
    targetBody.velocity.x = 0;
    targetBody.velocity.y = 0;
  }

}







