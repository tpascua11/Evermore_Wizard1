  /*
          ,     \    /      ,
         / \    )\__/(     / \
        /   \  (_\  /_)   /   \
   ____/_____\__\@  @/___/_____\____
  |             |\../|              |
  |              \VV/               |
  |        ---- Player -----         |
  |_________________________________|
   |    /\ /      \\       \ /\    |
   |  /   V        ))       V   \  |
   |/     `       //        '     \|

    Player_Information
    Player_Building
    Player_Timers
    Player_Updates
    Spell_Building
    Living_Player
    Player_Physics_And_Render
  */
  //---------------------------------------------------------
  // Player_Information
  //---------------------------------------------------------
  var playerStats = {
          health: 5,
       maxHealth: 25,
            mana: 75,
         maxMana: 100,
           rmana: 25,
        maxRmana: 25,
          curSpd: 0,
           speed: 350,
       sprintSpd: 450,
       sprinting: 0,
             acl: 50,
        moveLeft: 0,
       moveRight: 0,
          moving: 0,
            jump: 0,
       spellJump: 0,
       jumpTotal: 100,
         jumpAtY: 0,
         jumpAcl: 5,
        jumpSpan: 50,
         canJump: 0,
           clock: 0,
       direction: 1,
   jumpDirection: 0,
           focus: 2,
          laying: 0,
           delay: 0,
         casting: 0,
        charging: 0,
         barrier: 0,
       airCasted: 0,
         charged: 0,
          energy: 0,
      levitation: 0,
      invincible: 0,
             dot: 0,
  damageModifier: 1,
           magic: 0,
      stepsCount: 25,
    rechargeRate: 1,
     rechargeSec: Phaser.Timer.SECOND * 0.1,
        alliance: 1,
      resistance: "nothing",
            weak: "nothing",
        cutscene: 0
  };

  var player;
  var playerMaterial;
  var magicCG;
  var groundPlayerCM;
  var playerFPS = 0;
  var playerMana = 0;

  var manaHUD;
  var hearts;
  var invc;
  //---------------------------------------------------------
  // Player_Building
  //---------------------------------------------------------
  function createPlayer(){
    playerBody();
    playerInfo();
    playerSounds();
    createPlayerAnimations();
    playerControl();
    continuePlayerTimer();
    //startRegenTimer();
    buildInvicible();
    playerHUD();
    delayTimer = game.time.create(false);
  }

  function playerBody(){
    player = game.add.sprite(0, 400, 'template');
    visual = game.add.sprite(0, 0, 'visualDino'); //Remember: Set Scale Then apply Phyisics

    player.scale.setTo(1,2);
    player.alpha = 1;
    game.physics.p2.enable(player);
    player.body.fixedRotation = true;
    player.body.damping = 0.5;
    playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);
    player.body.data.gravityScale = 1.00;

    visual.scale.setTo(3,3);
    visual.setScaleMinMax(3,3);
    player.addChild(visual);
    visual.alpha = 1;
    visual.x-=30;
    visual.y-=20;
  }

  function playerInfo(){
    for(var attrname in playerStats){player[attrname] = playerStats[attrname]}
    player.body.stats = playerStats;
    player.stats = playerStats;
    player.body.health = player.health;
  }

  function playerSounds(){
    steps = game.add.audio('steps'); steps.volume = 0.5;
    jumpSound = game.add.audio('jumpSound'); jumpSound.volume = 0.5; 
    spellJumpSound = game.add.audio('bounce'); spellJumpSound.volume = 0.5; 
    hurt = game.add.audio('hurt');
    shieldHurt = game.add.audio('shieldHurt'); shieldHurt.volume = 0.5;
  }

  function playerControl(){
    sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
    moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);

    doJump = game.input.keyboard.addKey(Phaser.Keyboard.J);

    magicMissle = game.input.keyboard.addKey(Phaser.Keyboard.K);
    magicBarrier = game.input.keyboard.addKey(Phaser.Keyboard.L);
    magicLevitate = game.input.keyboard.addKey(Phaser.Keyboard.COLON);
  }

  function createPlayerAnimations(){
    visual.animations.add('walkRight', [31, 32, 33, 34], 12, true);
    visual.animations.add('walkLeft', [41, 42, 43, 44], 12, true);

    visual.animations.add('sprintRight', [31, 32, 33, 34, 35, 36, 37], 30, true);
    visual.animations.add('sprintLeft', [41, 42, 43, 44, 45, 46, 47], 30, true);

    visual.animations.add('jumpRight', [7], 5, true);
    visual.animations.add('jumpLeft', [3], 5, true);

    visual.animations.add('standRight', [5], 30, true);
    visual.animations.add('leftStand', [1], 30, true);

    visual.animations.add('layRight', [8], 30, true);
    visual.animations.add('layLeft', [4], 30, true);

    visual.animations.add('castLeft', [11], 30, true);
    visual.animations.add('castLeftSlant', [12], 30, true);
    visual.animations.add('castLeftUp', [13], 30, true);

    visual.animations.add('castRight', [21], 30, true);
    visual.animations.add('castRightSlant', [22], 30, true);
    visual.animations.add('castRightUp', [23], 30, true);

    visual.animations.add('castJumpRightN', [23], 30, true);
    visual.animations.add('castJumpRightNE', [23], 30, true);
    visual.animations.add('castJumpRightE', [23], 30, true);
    visual.animations.add('castJumpRightSE', [23], 30, true);
    visual.animations.add('castJumpRightS', [23], 30, true);
    visual.animations.add('castJumpRightSW', [23], 30, true);
    visual.animations.add('castJumpRightW', [23], 30, true);
    visual.animations.add('castJumpRightNW', [23], 30, true);

    visual.animations.add('castJumpLeftN', [23], 30, true);
    visual.animations.add('castJumpLeftNE', [23], 30, true);
    visual.animations.add('castJumpLeftE', [23], 30, true);
    visual.animations.add('castJumpRightSE', [23], 30, true);
    visual.animations.add('castJumpRightS', [23], 30, true);
    visual.animations.add('castJumpRightSW', [23], 30, true);
    visual.animations.add('castJumpRightW', [23], 30, true);
    visual.animations.add('castJumpRightNW', [23], 30, true);

    visual.animations.add('magicJumpLeft', [1,2,3], 30, false);
    visual.animations.add('magicJumpRight', [5,6,7], 30, false);

    //ill keep these for now
    player.animations.add('right', [28, 29, 30, 31, 32], 25, true);
    player.animations.add('left', [19, 20, 21, 22, 23], 25, true);
    player.animations.add('leftJump', [3], 10, true);
    player.animations.add('rightJump', [7], 10, true);
  }

  function playerHUD(){
    playerFPS = game.add.text(10, 10, game.time.fps, {fontSize: '25px', fill: '#ffff00'});
    playerFPS.fixedToCamera = true;

    var manaWidth = 40;
    var manaHeight = 25;
    var heartWidth = 40;
    var heartHeight = 10;
    manaHUD = game.add.sprite(manaWidth, manaHeight, 'manaballs');
    manaHUD.scale.setTo(1.5,1.5);
    manaHUD.fixedToCamera = true;

    hearts = game.add.sprite(heartWidth, heartHeight, 'healthBalls');
    hearts.scale.setTo(1.5,1.5);
    hearts.frame = 25;
    hearts.fixedToCamera = true;

    game.world.bringToTop(hearts);
    game.world.bringToTop(manaHUD);

    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
  }

  //--------------------------------------------------------
  //  Player_Updates
  //--------------------------------------------------------
  function updateHUD(){
    updateEnergyBalls();
  }

  function updateEnergyBalls(){
    if(player.rmana < 0) manaHUD.frame = 0;
    else if(player.rmana >= 25) manaHUD.frame = 25;
    else manaHUD.frame = player.rmana;
}

function updatePlayerFrame(){
  playerFPS.text = game.time.fps;
  playerFPS.reset(player.body.x-33, player.body.y - 66);
  //visual.x = player.body.x-30;
  //visual.y = player.body.y-30;
}

function updatePlayerFrameAt(x, y){
  visual.x = x;
  visual.y = y;
}
function playerHitBoxResize(height, weight){
  visual.x = x;
  visual.y = y;
}

//--------------------------------------------------------
// Player_Timers
//--------------------------------------------------------
var playerTimer;
var chargeTimer;
var regenTimer;
var pTime = 0;
var pCharge = 0.2;

//_______________
// Main Timer
//_______________
function continuePlayerTimer(){
  playerTimer = game.time.create(false);
  playerTimer.loop(100, incrementPlayerTimer, this);
  playerTimer.start();
}
function incrementPlayerTimer(){
  if(spells.length == 0) pTime = 0;
  else pTime++;
  if(player.moving >= 0) player.moving--;
}
//__________
// Regain
//__________
function startRegenTimer(){
  console.log("did this happen");
  regenTimer= game.time.create(false);
  regenTimer.loop(player.rechargeSec, regainMana2, this);
  regenTimer.start();
}

function regainMana2(){
  if (player.maxRmana <= player.rmana || player.barrier || player.casting) return;
  else if(player.rmana < 0) player.rmana = 0;
  else if(player.laying) player.rmana += player.rechargeRate;
  else player.rmana += player.rechargeRate;
}

function spendMana(cost){
  cost = cost - player.rmana;
  player.rmana-= cost;
  if(cost < 0) cost = 0;
  if(player.rmana < 0) player.rmana = 0;
  player.mana -= cost;
}

function gainMana(amount){
  player.mana += amount;
  leftovers = player.mana - player.maxMana;
  if(leftovers < 0) leftovers = 0;
  player.rmana += leftovers;
}
//______________
// Invincible
//______________
invc = Phaser.Timer.SECOND*1;
function buildInvicible(){
  invc = Phaser.Timer.SECOND*1;
}

function startInvincible(){
  if(player.invincible) return;
  player.alpha = 0.5;
  visual.alpha = 0.5;
  player.invincible = true;
  game.time.events.add(invc, stopInvincible, this);
}

function stopInvincible(){
  console.log("did I happen");
  player.alpha = 1;
  visual.alpha = 1;
  player.invincible = false;
}

function startDamageOverTime(){
}
function damageOverTime(){
}
//--------------------------------
// Player_Physics_And_Render
//--------------------------------
function harmPlayer(body, damage){
  if(player.invincible) return;
  //console.log("Player Hurt By: ", damage );
  body.health -= damage;
  if(body.health <= 0) hearts.frame = 0;
  else hearts.frame = body.health;
  //console.log("Health", body.health);
  if(body.health <= 0) missionFailed();
}

function missionFailed(){
  console.log("RESTART OR CRACTY");
  player.body.health = 25;

  clearLevel();
  gameModeSetup();
}

