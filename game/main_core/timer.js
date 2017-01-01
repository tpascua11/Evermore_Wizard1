var universalTime = 0;

function startUniversalTimer(){
  playerTimer = game.time.create(false);
  playerTimer.loop(500, incrementUniversalTimer, this);
  playerTimer.start();
}

function incrementUniversalTimer(){
  universalTime++;
  console.log("Universal Timer", universalTime);
}
