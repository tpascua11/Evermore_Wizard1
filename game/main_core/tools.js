//---------------------------------------------------------------------
//  1_Tools_Control
//  2_Camera_Control
//  5_Mouse_Control
//  4_Object_Creation
//  3_Pinpoint_Rectangle
//  7_Creation
//---------------------------------------------------------------------
//--------------------------------------
//  1_Tools_Control
//--------------------------------------
function toolsSetup(){
  setupMouse();
  toolControls();
  create6pinPoints();
}

function setupMouse(){
  makeMouseBody();
  game.input.onDown.add(click, this);
  game.input.onUp.add(release, this);
  game.input.addMoveCallback(moveWith, this);
  mouse.body.onBeginContact.add(grabBody, mouse);
}

function toolControls(){
  buttonC = game.input.keyboard.addKey(Phaser.Keyboard.C);
  buttonC.onDown.add(createHere, this);
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
  var i = lastTargetBody.eid;
  //Width 
  existingBlocks[i].scale.x += 2;
  existingBlocks[i].body.setRectangle(existingBlocks[i].width, existingBlocks[i].height);
}

function heightPower(){
  console.log("Height Power");
  var i = lastTargetBody.eid;
  //Width 
  existingBlocks[i].scale.y += 2;
  existingBlocks[i].body.setRectangle(existingBlocks[i].width, existingBlocks[i].height);
}

function makeExist(x,y){
  console.log("EXIST");
  var box = game.add.sprite(x, y, 'exist');
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
  box.body.eid = existingBlocks.length-1;
  box.body.indestructible = true;
  console.log(box.eid);
  console.log(box.body.eid);

  console.log("Existing Blocks", existingBlocks.length);

  game.world.bringToTop(bg2);
}


function makeExist(){
  console.log("EXIST");
  var box = game.add.sprite(mouse.body.x, mouse.body.y, 'exist');
  //var size = game.rnd.integerInRange(1, 5);
  box.hooks = true;
  size = 3;
  box.scale.setTo(size, 0.5);
  game.physics.p2.enable(box);

  box.frame = 0;
  box.body.fixedRotation = true;
  box.body.mass = 6;
  box.body.health = 1;

  box.body.setMaterial(boxMaterial);
  box.body.static = true;
  //existingBlocks = [];

  existingBlocks.push(box);
  box.eid = existingBlocks.length-1;
  box.body.eid = existingBlocks.length-1;
  box.body.indestructible = true;
  console.log(box.eid);
  console.log(box.body.eid);

  console.log("Existing Blocks", existingBlocks.length);

  game.world.bringToTop(foreground);
}

function reviveExist(width, height, xoo, yoo){
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
  existingBlocks.push(box);
  game.world.bringToTop(foreground);
}


function pinEdit(width, height, xoo, yoo){
  var box = existingBlocks[pinTargetID];
  box.width  = width;
  box.height = height;
  box.body.setRectangle(box.width, box.height);
  box.reset(xoo, yoo);
  game.world.bringToTop(foreground);
  console.log("Existing Blocks", box.length);
}


function forceStatic(){
  lastTargetBody.static = true;
  targetBody.static = true;
  bodyPast = true;
  targetBody.velocity.x = 0;
  targetBody.velocity.y = 0;
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
var mouseBody;
var pinPointOn = false;

function makeMouseBody(){
  mouseBody = new p2.Body();
  game.physics.p2.world.addBody(mouseBody);
  mouse = game.add.sprite(300, 100, 'click');
  mouse.scale.setTo(0.5, 0.5);
  game.physics.p2.enable(mouse);
  mouse.body.fixedRotation = true; 
  mouseMaterial = game.physics.p2.createMaterial('mouseMaterial', mouse.body);
  mouse.body.static = true;
  mouse.body.onBeginContact.add(grabBody, mouse);
  mouse.body.data.gravityScale = 0;
}

function click(pointer) {
  mouse.body.x = pointer.x + game.camera.x;
  mouse.body.y = pointer.y + game.camera.y;
  mouse.body.static = false;
  mouseHolding = true;
}

function release() {
  mouse.body.static = true;
  mouse.body.velocity.x = 0;
  mouse.body.velocity.y = 0;
  mouseHolding = false;

  if(targetBody == null) return;
  bodyCheck = false;
  targetBody.static = bodyPast;
  targetBody.velocity.x = 0;
  targetBody.velocity.y = 0;
  targetBody = null;

  if(pinPointOn){
    pinEdit(pinWidth, pinHeight, pinAtX, pinAtY);
  }
  pinPointOn = false;
}

function grabBody(body1, body2){
  if(bodyCheck) return;
  if(body1 == null) return;
  mouse.body.static = true;
  bodyCheck = true;
  bodyPast = body1.static;
  body1.static = true;
  lastTargetBody = body1;
  targetBody = body1;

  pinTactX = mouse.body.x - body1.x;
  pinTactY = mouse.body.y - body1.y;

  if(body1.sprite.hname != null) pinPointOn = true;
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
    hooksBaseOn(targetBody);
  }
}

//--------------------------
//  7_Creation
//--------------------------
var creation = "existance";

var creationList = [
{
  name: "goblinSwordGuy",
  description: "has a sword"
},
{
  name: "goblinDaggerGuy",
  description: "has a dagger"
},
{
  name: "goblinBowGuy",
  description: "has a bow"
},
{
  name: "manaStone",
  description: "gives out mana when up close"
},
{
  name: "absorbFlower",
  description: "drains mana"
},
{
  name: "transitionPoint",
  description: "Foward"
},
{
  name: "existance",
  description: "adds collision fields"
}
];

var chx = 0;
var chy = 0;
function createHere(){
  chx = mouse.body.x;
  chy = mouse.body.y;
  switch(creation){
    case "existance"      : makeExist(chx, chy); break;
    case "goblinSwordGuy" : goblinSwordsMan(chx, chy, activeAI.length); break;
    case "goblinDaggerGuy": goblinStaber(chx, chy, activeAI.length); break;
    case "goblinBowGuy"   : goblinArcher(chx, chy, activeAI.length); break;
    case "manaStone"      : createManaStone(chx, chy); break;
    case "transitionPoint": transitionPoint(chx, chy); break;
    case "mushroom"       : makeExist(chx, chy); break;
    case "absorbFlower"   : makeExist(chx, chy); break;
    default: break;
  }
  console.log("creation", creation);
}

function createHere2(x,y,width,height){
  chx = x;
  chy = y;
  switch(creation){
    case "existance"      : 
      reviveExist(width, height, chx, chy); break;
    case "goblinSwordGuy" : goblinSwordsMan(chx, chy, activeAI.length); break;
    case "goblinDaggerGuy": goblinStaber(chx, chy, activeAI.length); break;
    case "goblinBowGuy"   : goblinArcher(chx, chy, activeAI.length); break;
    case "manaStone"      : createManaStone(chx, chy); break;
    case "transitionPoint": transitionPoint(chx, chy); break;
    case "mushroom"       : makeExist(chx, chy); break;
    case "absorbFlower"   : makeExist(chx, chy); break;
    default: break;
  }
  console.log("creation", creation);
}

//-------------------------
//  Load_And_Save_Map
//--------------------------
function loadStorage(){
  //var levelAiPlacement = JSON.parse(localStorage.getItem("levelAiPlacement"));
  //var levelBlockPlacement = JSON.parse(localStorage.getItem("levelBlockPlacement"));
  //var levelStmp = JSON.parse(localStorage.getItem("levelStmp"));
  //var levelSflo = JSON.parse(localStorage.getItem("levelSflo"));
}

function gameModeSetup(){
  var sameOld = JSON.parse(localStorage.getItem("sameOld"));
  //sameOld = "none";
  if(sameOld == version){
    console.log("I MADE IT THROUGH");
    var levelAiPlacement = JSON.parse(localStorage.getItem("levelAiPlacement"));
    var levelBlockPlacement = JSON.parse(localStorage.getItem("levelBlockPlacement"));
    var levelStmp = JSON.parse(localStorage.getItem("levelStmp"));
    var levelSflo = JSON.parse(localStorage.getItem("levelSflo"));
  }

  if(levelAiPlacement == null) return;
  if(levelBlockPlacement == null) return;
  console.log("AI LOADED", levelAiPlacement.length);
  console.log("Block Loaded", levelBlockPlacement);
  for(var i = 0; i < levelBlockPlacement.length; i++){
    console.log("block", i);
    creation = "existance";
    createHere2(levelBlockPlacement[i].x, levelBlockPlacement[i].y, 
        levelBlockPlacement[i].width, levelBlockPlacement[i].height);
  }

  for(var i = 0; i < levelAiPlacement.length; i++){
    console.log("ai", i);
    creation = levelAiPlacement[i].name;
    createHere2(levelAiPlacement[i].x, levelAiPlacement[i].y, 0, 0);
  }

  for(var i = 0; i < levelStmp.length; i++){
    creation = levelStmp[i].name;
    createHere2(levelStmp[i].x, levelStmp[i].y, 0, 0);
  }

  for(var i = 0; i < levelSflo.length; i++){
    creation = levelSflo[i].name;
    createHere2(levelSflo[i].x, levelSflo[i].y, 0, 0);
  }
  console.log(levelSflo, "FLO");
}

function editorCamera(){
}


