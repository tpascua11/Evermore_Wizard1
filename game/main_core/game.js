
var gameWidth = 800;var gameHeight = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;



function preload() {
  //scaling();
  //scaleFix();
  game.stage.smoothed = false;

  game.load.image('sky', '../assets/sky.png');
  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
  game.load.audio('boden', ['../assets/meltdown.mp3']);
  game.load.audio('simple', ['../assets/UncleBibby_The_Simple_Complex.mp3']);
  game.load.audio('coin', '../assets/coin.wav');

  loadPlayerSprite()
  cursors = game.input.keyboard.createCursorKeys();
  preloadBackground();
  game.time.advancedTiming = true; 
}
function create() {
  bg = game.add.tileSprite(0, 0, 800, 600, 'sky');
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.world.defaultContactMaterial.friction = 0.3;
  game.physics.p2.world.setGlobalStiffness(1e5);
  game.physics.p2.setImpactEvents(true);

  simple = game.add.audio('simple');
  //simple.play();

  createPlayer();
  playerDefaultMovement();

  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
  boxMaterial = game.physics.p2.createMaterial('worldMaterial');
  continueBlocks();

  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true); 
/*
  for (var i = 1; i < 4; i++){
    var box = game.add.sprite(300, 645 - (95 * i), 'level1');
    box.scale.setTo(3,3);
    game.physics.p2.enable(box);
    box.body.mass = 6;
    box.body.setMaterial(boxMaterial);
  }*/
  var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.7 , restitution: 0.0 });

  game.stage.smoothed = false;
}

function collision(){
}

function update() {
  //console.log(game.time.fps);
  playerFPS.text = game.time.fps;
  playerMana.text = player.rmana.toFixed(2);
  playerMana.reset(player.body.x, player.body.y - 66);
  playerFPS.reset(player.body.x-33, player.body.y - 66);
  movement();
  updateSpells();
}

function scaling(){
  if (this.game.device.desktop){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = gameWidth/2;
    this.scale.minHeight = gameHeight/2;
    this.scale.maxWidth = gameWidth;
    this.scale.maxHeight = gameHeight;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
  }
  else{
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = gameWidth/2;
    this.scale.minHeight = gameHeight/2;
    this.scale.maxWidth = 2048;
    //You can change this to gameWidth*2.5 if needed
    this.scale.maxHeight = 1228; 
    ////Make sure these values are proportional to the gameWidth and gameHeight
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true, false);
    this.scale.hasResized.add(this.gameResized, this);
    this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
    this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    this.scale.setScreenSize(true);
  }
}

function scaleFix(){
  var ow = parseInt(this.game.canvas.style.width,10);
  var oh = parseInt(this.game.canvas.style.height,10);
  var r = Math.max(window.innerWidth/ow,window.innerHeight/oh);
  var nw = ow*r;var nh = oh*r;
  this.game.canvas.style.width = nw+"px";this.game.canvas.style.height= nh+"px";
  this.game.canvas.style.marginLeft = (window.innerWidth/2 - nw/2)+"px"; 
  this.game.canvas.style.marginTop = (window.innerHeight/2 - nh/2)+"px";
  document.getElementById("game").style.width = window.innerWidth+"px";
  document.getElementById("game").style.height = window.innerHeight-1+"px";
  //The css for body includes 1px top margin, 
  //I believe this is the cause for this 
  //-1document.getElementById("game").style.overflow = "hidden";
}


