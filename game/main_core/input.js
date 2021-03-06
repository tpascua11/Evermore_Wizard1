/*
        ,     \    /      ,
       / \    )\__/(     / \
      /   \  (0\  /0)   /   \
 ____/_____\__\@  @/___/_____\____
|             |\../|              |
|              \VV/               |
|        ---- Action -----        |
|_________________________________|
 |    /\ /      \\       \ /\    |
 |  /   V        ))       V   \  |
 |/     `       //        '     \|

 Player_Key_Inputs
 Player_Actions_List

*/
var state = "normal";
var activeBox;

//-----------------------------------------------------
// Player_Key_Inputs
//-----------------------------------------------------
function playerActions(){
  doJump.onDown.add(input, {action: "jump"});
  doJump.onUp.add(input, {action: "jumpStop"});

  moveLeft.onDown.add(input, {action: "walkL"});
  moveLeft.onUp.add(input, {action: "walkLstop"});

  moveRight.onDown.add(input, {action: "walkR"});
  moveRight.onUp.add(input, {action: "walkRstop"});

  moveUp.onDown.add(input, {action: "scan"});
  moveUp.onUp.add(input, {action: "scanStop"});

  moveDown.onDown.add(input, {action: "duck"});
  moveDown.onUp.add(input, {action: "duckStop"});

  sprint.onDown.add(input, {action: "sprint"});
  sprint.onUp.add(input, {action: "sprintStop"});

  sprint.onDown.add(input, {action: "sprint"});
  sprint.onUp.add(input, {action: "sprintStop"});

  magicBarrier.onDown.add(input, {action: "barrier"});
  magicBarrier.onUp.add(input, {action: "barrierStop"});

  magicMissle.onDown.add(input, {action: "bomb"});
  magicMissle.onUp.add(input, {action: "bombStop"});
}
//----------------------------------------------------
//  Player_Action_List
//----------------------------------------------------
function input(){
  switch(state){
    case "normal"   : normalAction(this.action) ; break;
    case "sprinting": sprintAction(this.action) ; break;
    case "charging" : chargeAction(this.action) ; break; 
    case "barrier"  : barrierAction(this.action); break;
    case "rift"     : riftAction(this.action)   ; break;
    default: break;
  }
  console.log(state, this.action);
}

function normalAction(action){
  switch(action){
    case "jump"      : playerJump()    ;   break;
    case "jumpStop"  : playerJumpStop();   break;
    case "walkL"     : playerMoveLeft();   break;
    case "walkLstop" : playerStopLeft();   break;
    case "walkR"     : playerMoveRight();  break;
    case "walkRstop" : playerStopRight();  break;
    case "sprint"    : playerSprint();     break;
    case "sprintStop": playerSprintStop(); break;
    case "duck"      : break;
    case "duckStop"  : break;
    case "scan"      : break;
    case "scanStop"  : break;
    case "barrier"   : playerBarrier();    break;
    case "bomb"      : chargeMagic2();     break;
    case "bombStop"  : magicBlast;         break;
    default: break;
  }
}

function chargeAction(action){
  switch(action){
    case "bombStop"  : shootMagicBomb();   break;
    case "jump"      : magicForce()    ;   break;
    case "walkL"     : playerMoveLeft();   break;
    case "walkLstop" : playerStopLeft();   break;
    case "walkR"     : playerMoveRight();  break;
    case "walkRstop" : playerStopRight();  break;
    case "sprint"    : playerSprint();     break;
    case "sprintStop": playerSprintStop(); break;
    case "barrier"   : playerBarrier();    break;
    case "duck"      : break;
    case "duckStop"  : break;
    case "scan"      : break;
    default: break;
  }
}

function barrierAction(action){
  switch(action){
    case "bombStop" : trueMagicBomb();     break;
    case "walkL"    : playerMoveLeft();    break;
    case "walkLstop": playerStopLeft();    break;
    case "walkR"    : playerMoveRight();   break;
    case "walkRstop": playerStopRight();   break;
    case "sprint"   : playerSprint();      break;
    case "sprintStop":playerSprintStop();  break;
    case "duck"     : break;
    case "duckStop" : break;
    case "scan"     : break;
    case "jump"     : teleportWave();      break;
    case "barrierStop": playerStopBarrier(); break;
    default: break;
  }
}

function sprintAction(action){
  switch(action){
    case "duck"      : break;
    case "duckStop"  : break;
    case "scan"      : break;
    default: break;
  }
}

function riftAction(action){
  switch(action){
    case "walkLstop": break;
    case "walkRstop": break;
    default: break;
  }
}
