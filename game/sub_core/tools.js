
function loadBoundaries(){
  game.load.spritesheet('exist', '../assets/basic/Exist.png', 16, 16);
  game.load.spritesheet('click', '../assets/basic/Click.png', 16, 16);
  game.load.spritesheet('checkpoint', '../assets/basic/Checkpoint.png', 16, 16);
}
//--------------------------------------
//  Object Creation
//--------------------------------------
var lastTargetBody;
var existingBlocks = [];

function toolControls(){
  console.log("WHAT?");
  buttonC = game.input.keyboard.addKey(Phaser.Keyboard.C);
  buttonC.onDown.add(makeExist, this);
  buttonF = game.input.keyboard.addKey(Phaser.Keyboard.F);
  buttonF.onDown.add(forceStatic, this);

  buttonT = game.input.keyboard.addKey(Phaser.Keyboard.T);
  buttonT.onDown.add(heightPower, this);
  buttonY = game.input.keyboard.addKey(Phaser.Keyboard.Y);
  buttonY.onDown.add(widthPower, this);
}

function toolsSetup(){

}

function widthPower(){
  console.log("Width Power");
  console.log("lastbody", lastTargetBody.eid);
  var i = lastTargetBody.eid-1;
  //Width 
  existingBlocks[i].scale.x += 2;
  existingBlocks[i].body.setRectangle(existingBlocks[i].width, existingBlocks[i].height);
}

function heightPower(){
  console.log("Height Power");
  var i = lastTargetBody.eid-1;
  //Width 
  existingBlocks[i].scale.y += 2;
  existingBlocks[i].body.setRectangle(existingBlocks[i].width, existingBlocks[i].height);
}
function makeExist(){
  console.log("EXIST");
  var box = game.add.sprite(mouse.body.x, mouse.body.y, 'exist');
  //var size = game.rnd.integerInRange(1, 5);
  size = 3;
  box.scale.setTo(size, 0.5);
  game.physics.p2.enable(box);

  //box.animations.add('auto',
  //    [0, 1, 2, 3, 4, 5, 6], 25, true);
  //box.animations.play('auto', 15, true);
  box.frame = 0;

  box.body.fixedRotation = true;
  box.body.mass = 6;
  box.body.health = 1;

  box.body.setMaterial(boxMaterial);
  box.body.static = true;
  //existingBlocks = [];
  existingBlocks.push(box);
  console.log("Existing Blocks", existingBlocks.length);
  box.eid = existingBlocks.length;
  box.body.eid = existingBlocks.length;
  box.body.indestructible = true;
  console.log(box.eid);
  console.log(box.body.eid);
  //existsBlocks.push(box);
  game.world.bringToTop(bg2);
}

function forceStatic(){
  lastTargetBody.static = true;
  targetBody.static = true;
  bodyPast = true;
  targetBody.velocity.x = 0;
  targetBody.velocity.y = 0;
  //lastTargetBody.data.shapes[0].sensor = false;
  //mouse.body.static = false;
}


//---------------------------------------
//  Mouse Control
//---------------------------------------
var mouseMaterial;
var mouse;
var mouseAlt;
var mouseHolding = false;
var targetBody;
var bodyCheck = false;
var bodyPast = false;

function setupMouse(){
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);

    mouse = game.add.sprite(300, 100, 'click');
    mouse.scale.setTo(0.5, 0.5);
    game.physics.p2.enable(mouse);
    mouse.body.fixedRotation = true; 
    mouseMaterial = game.physics.p2.createMaterial('mouseMaterial', mouse.body);
    mouse.body.static = true;

    // attach pointer events
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(moveWith, this);

    mouse.body.onBeginContact.add(grabBody, mouse);
}

function setupMouseAlt(){
    mouseAlt = game.add.sprite(300, 100, 'click');
    mouseAlt.scale.setTo(0.5, 0.5);
    game.physics.p2.enable(mouseAlt);
    mouseAlt.body.fixedRotation = true; 
    mouseMaterial = game.physics.p2.createMaterial('mouseMaterial', mouseAlt.body);
    mouseAlt.body.static = false;
    // attach pointer events
    //mouseAlt.body.onBeginContact.add(grabBody, mouseAlt);
}

function click(pointer) {
  mouse.body.onBeginContact.add(grabBody, mouse);
  console.log("before XY", pointer.x, pointer.y);
  console.log("after XY", pointer.x, pointer.y);
  mouse.body.x = pointer.x + game.camera.x;
  mouse.body.y = pointer.y + game.camera.y;

  mouse.body.static = false;
  mouse.body.velocity.x = 0;
  mouse.body.velocity.y = 0;

  //mouseAlt.body.x = pointer.x + game.camera.x;
  //mouseAlt.body.y = pointer.y + game.camera.y;

  mouseHolding = true;
}

function release() {
  mouse.body.static = true;
  mouse.body.velocity.x = 0;
  mouse.body.velocity.y = 0;

  if(targetBody == null) return;
  mouseHolding = false;
  bodyCheck = false;
  targetBody.static = bodyPast;
  targetBody.velocity.x = 0;
  targetBody.velocity.y = 0;
  mouse.body.x = -50;
  mouse.body.y = -50;

  targetBody = null;
  console.log("mouse hold off");
}

function grabBody(body1, body2){
  console.log(body1);
  if(bodyCheck) return;
  if(body1 == null) return;
  mouse.body.static = true;
  bodyCheck = true;
  console.log("Am I touching something");
  bodyPast = body1.static;
  body1.static = true;
  lastTargetBody = body1;
  targetBody = body1;
}

function moveWith(pointer) {
  if(mouseHolding && (targetBody!= null)){
    mouse.body.x = pointer.x + game.camera.x;
    mouse.body.y = pointer.y + game.camera.y;
    targetBody.x = mouse.body.x;
    targetBody.y = mouse.body.y;
    targetBody.velocity.x = 0;
    targetBody.velocity.y = 0;
  }
}
