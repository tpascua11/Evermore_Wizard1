var currentLevel = {
  width: 700,
  height: 700,
  size: 1, 
  tileFrom: "nothing.json",
  row: 0,
  column: 0,
  weekdays: [0, 1, 0]
}

function loadMapAlpha(){
  game.load.image('sky', '../assets/sky.png');
  game.load.image('level1back', '../assets/Map/Level1-1back.png');
  game.load.image('level1front', '../assets/Map/Level1-1Front.png');

  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
}

function createWorldAlpha(){
  bg = game.add.tileSprite(0, 0, 1920, 240, 'level1front');
  game.world.setBounds(0, 0, 1920, 240);

  bg2 = game.add.tileSprite(0, 0, 1920, 240, 'level1back');
  game.world.bringToTop(bg2);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });

  game.stage.smoothed = false;

  simple = game.add.audio('symbo');
  simple.play();
}

function dependOnTest(){
  var level;
  $.getJSON("../level/TestLevel3.json", function(json) {
    level = json;
    console.log(level); // this will show the info it in firebug console
  });
}
