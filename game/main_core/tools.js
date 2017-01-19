//---------------------------------------------------------------------
//  1_Tools_Control
//  2_Camera_Control
//  3_Pinpoint_Rectangle
//  4_Object_Creation
//  5_Mouse_Control
//  6_Adding_Collisions
//  7_Creation
//---------------------------------------------------------------------
function loadBoundaries(){
  game.load.spritesheet('exist', '../assets/basic/Exist.png', 16, 16);
  game.load.spritesheet('click', '../assets/basic/Click.png', 16, 16);
  game.load.spritesheet('checkpoint', '../assets/basic/Checkpoint.png', 16, 16);
}

function editorCamera(){

}
//--------------------------------------
//  1_Tools_Control
//--------------------------------------
function toolControls(){
  buttonC = game.input.keyboard.addKey(Phaser.Keyboard.C);
  buttonC.onDown.add(makeExist, this);
  buttonF = game.input.keyboard.addKey(Phaser.Keyboard.F);
  buttonF.onDown.add(forceStatic, this);

  buttonT = game.input.keyboard.addKey(Phaser.Keyboard.T);
  buttonT.onDown.add(heightPower, this);
  buttonY = game.input.keyboard.addKey(Phaser.Keyboard.Y);
  buttonY.onDown.add(widthPower, this);

  moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
  moveUp.onDown.add(cameraMoveUp, this);

  moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  moveLeft.onDown.add(cameraMoveLeft, this);

  moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  moveRight.onDown.add(cameraMoveRight, this);

  moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
  moveDown.onDown.add(cameraMoveDown, this);
}

function toolsSetup(){
  create6pinPoints();
}
//---------------------------------------
// 2_Camera_Control
//---------------------------------------
function cameraMoveRight(){
  game.camera.x += 300;
}

function cameraMoveLeft(){
  game.camera.x -= 300;
}

function cameraMoveDown(){
  game.camera.y += 300;
}

function cameraMoveUp(){
  game.camera.y -= 300;
}
//--------------------------------------
//  3_Pinpoint_Rectangle
//--------------------------------------
var pinTargetID = 0;
var pinPointOn = false;
var pinHeight = 0;
var pinWidth = 0;
var pinAtX = 0;
var pinAtY = 0;

function create6pinPoints(){
  pinTR = game.add.sprite(-1000, -500, 'click');//Top Left
  pinTM = game.add.sprite(-1000, -500, 'click');//Top Middle
  pinTL = game.add.sprite(-1000, -500, 'click');//Top Middle

  pinBR = game.add.sprite(-1000, -500, 'click');//Top Left
  pinBM = game.add.sprite(-1000, -500, 'click');//Top Middle
  pinBL = game.add.sprite(-1000, -500, 'click');//Top Middle

  game.physics.p2.enable(pinTR);
  game.physics.p2.enable(pinTM);
  game.physics.p2.enable(pinTL);
  game.physics.p2.enable(pinBR);
  game.physics.p2.enable(pinBM);
  game.physics.p2.enable(pinBL);

  pinTL.body.static = true;
  pinTL.hname = 'TL';

  pinTR.body.static = true;
  pinTR.hname = 'TR';

  pinBL.body.static = true;
  pinBL.hname = 'BL';

  pinBR.body.static = true;
  pinBR.hname = 'BR';

  pinTM.body.static = true;
  pinBM.body.static = true;
}

function surrondPinpoint(body){
  if(body.sprite.hooks == null) return;
  console.log("SURROUNDING!!");
  pinTargetID = body.eid;
  console.log("The ID is", pinTargetID);
  pinBR.body.x = body.x + body.sprite.width/2;
  pinBR.body.y = body.y + body.sprite.height/2;// +  body.height/2;

  pinBL.body.x = body.x - body.sprite.width/2;
  pinBL.body.y = body.y + body.sprite.height/2;// +  body.height/2;

  pinTR.body.x = body.x + body.sprite.width/2;
  pinTR.body.y = body.y - body.sprite.height/2;// +  body.height/2;

  pinTL.body.x = body.x - body.sprite.width/2;
  pinTL.body.y = body.y - body.sprite.height/2;// +  body.height/2;
}

function hooksBaseOn(body){
  if(body.sprite.hname == null) surrondPinpoint(targetBody);
  else if(body.sprite.hname == 'TR') moveWithTR();
  else if(body.sprite.hname == 'TL') moveWithTL();
  else if(body.sprite.hname == 'BR') moveWithBR();
  else if(body.sprite.hname == 'BL') moveWithBL();
  else{
    console.log("DISATER");
  }
  resizeOn(body);
}

function resizeOn(body){
  console.log("nothing");
  pinHeight = pinBR.body.y - pinTR.body.y;
  pinAtY = pinTL.body.y + pinHeight/2;


  pinWidth = pinTR.body.x - pinTL.body.x;
  pinAtX = pinTL.body.x + pinWidth/2;

  //console.log("AXIS ", pinAtX, pinAtY);
  //console.log("Width ", pinWidth);
  //console.log("Height ", pinHeight);
}

function moveWithTR(){
  pinBR.body.x = pinTR.body.x;
  pinTL.body.y = pinTR.body.y;
}

function moveWithTL(){
  pinBL.body.x = pinTL.body.x;
  pinTR.body.y = pinTL.body.y;
}

function moveWithBR(){
  pinTR.body.x = pinBR.body.x;
  pinBL.body.y = pinBR.body.y;
}

function moveWithBL(){
  pinTL.body.x = pinBL.body.x;
  pinBR.body.y = pinBL.body.y;
}
//--------------------------------------
//  4_Object_Creation
//--------------------------------------
var lastTargetBody;
var existingBlocks = [];

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
  box.hooks = true;
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
  box.eid = existingBlocks.length;
  box.body.eid = existingBlocks.length;
  box.body.indestructible = true;
  console.log(box.eid);
  console.log(box.body.eid);

  console.log("Existing Blocks", existingBlocks.length);

  game.world.bringToTop(bg2);
}

function existance(width, height, xoo, yoo){
  existingBlocks[pinTargetID-1].destroy();
  var nid = pinTargetID;
  var box = game.add.sprite(0,0, 'exist');
  box.width = width;
  box.height= height;
  box.x = xoo;
  box.y = yoo;
  game.physics.p2.enable(box);
  box.frame = 0;
  box.body.fixedRotation = true;

  box.body.setMaterial(boxMaterial);
  box.body.static = true;
  box.hooks = true;

  console.log("Existing Blocks", existingBlocks.length);
  box.eid = nid;
  box.body.eid = nid;

  box.body.indestructible = true;
  console.log(box.eid);
  console.log(box.body.eid);
  game.world.bringToTop(bg2);

  existingBlocks[pinTargetID-1] = box;
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
//  5_Mouse_Control
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
    mouseAlt = game.add.sprite(-1000, 100, 'click');
    mouseAlt.scale.setTo(0.5, 0.5);
    game.physics.p2.enable(mouseAlt);
    mouseAlt.body.fixedRotation = true; 
    mouseMaterial = game.physics.p2.createMaterial('mouseMaterial', mouseAlt.body);
    mouseAlt.body.static = false;
    // attach pointer events
    //mouseAlt.body.onBeginContact.add(grabBody, mouseAlt);
}

function click(pointer) {
  addPoint(pointer);
  mouse.body.onBeginContact.add(grabBody, mouse);
  console.log("before XY", pointer.x, pointer.y);
  console.log("after XY", pointer.x, pointer.y);
  mouse.body.x = pointer.x + game.camera.x;
  mouse.body.y = pointer.y + game.camera.y;

  mouse.body.static = false;
  mouse.body.data.gravityScale = 0;

  mouse.body.velocity.x = 0;
  mouse.body.velocity.y = 0;

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
  if(pinPointOn){
    console.log(" did it work");
    console.log("PIN AXIS: ", pinAtX, pinAtY);
    existance(pinWidth, pinHeight, pinAtX, pinAtY);
  }
  pinPointOn = false;
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
  
  pinTactX = mouse.body.x - body1.x;
  pinTactY = mouse.body.y - body1.y;

  if(body1.sprite.hname != null) pinPointOn = true;
  //surrondPinpoint(body1);
}

function releaseBody(body1, body2){
  surrondPinpoint(body1);
}

var pinTactX;
var pinTactY;

function moveWith(pointer) {
  if(mouseHolding && (targetBody!= null)){
    mouse.body.x = pointer.x + game.camera.x;
    mouse.body.y = pointer.y + game.camera.y;

    targetBody.x = mouse.body.x;
    targetBody.y = mouse.body.y;

    targetBody.x = mouse.body.x - pinTactX
    targetBody.y = mouse.body.y - pinTactY;

    targetBody.velocity.x = 0;
    targetBody.velocity.y = 0;
    //surrondPinpoint(targetBody);
    hooksBaseOn(targetBody);
  }
}

//---------------------------
// 6_Adding_Collisions
//--------------------------
var squarePoint = [];
var topLeft;
var topRight;
var bottomLeft;
var bottomRight;

function addPoint(pointer){
  var pointway = [];
  pointway.x = pointer.x + game.camera.x;
  pointway.y = pointer.y + game.camera.y;
  squarePoint.push(pointway);
  console.log("ADD IN", squarePoint);
}

function squareTruth(point1, point2){
  if(point1.x >= point2.x){
    if(point1.y >= point2.y){
      bottomRight = point1;
    }
    else{
      topRight= point1;
    }
  }
  else{
   if(point1.y >= point2.y){
      bottomLeft = point1;
    }
    else{
      topLeft= point1;
    }
  }
}
//--------------------------
//  7_Creation
//--------------------------
var creation;

function createHere(){
  switch(creation){
    case "existance": break;
    default: break;
  }
}
