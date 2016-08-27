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




