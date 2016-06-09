
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('sky', '../assets/sky.png');
  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);

  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
  //game.load.spritesheet('dino', 'assets/Dino_Test6.png', 16, 16);
  loadPlayerSprite()

  cursors = game.input.keyboard.createCursorKeys();
  game.load.audio('boden', ['../assets/meltdown.mp3']);
  game.load.audio('jump', '../assets/Jump19.wav');
  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('coin', '../assets/coin.wav');
}

var platforms;

var direction = 0;
var jumps = 3;
var jumpExtend = 0;
var extendLimit = 50;

var score = 0;
var scoreText;
var sprint;

var moveLeft;
var moveRight;
var moveOnce = 0;
var doJump;

function create() {
  jump = game.add.audio('jump');
  steps = game.add.audio('steps');
  coin = game.add.audio('coin');

  sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  doJump = game.input.keyboard.addKey(Phaser.Keyboard.W);

//  sprite = game.add.sprite(800, 600, 'phaser');

  game.add.sprite(0, 0, 'star');

   //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);


    //  A simple background for our game
    //
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(3, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 500, 'ground');
    ledge.body.immovable = true;

   // The player and its settings
    createPlayer();
    createPlayerAnimations();


    stars = game.add.group();
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 200;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
  scoreText = game.add.text(300, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  healthText = game.add.text(32, 32, playerStats.health, {fontSize: '32px', fill: '900'}) ;

//Music Test
    music = game.add.audio('boden');

    music.play();
  
  //doJump.onDown.add(playerJump, this);

  game.world.setBounds(0, 0, 2000, 2000);
  makeEntity();
  makeEntity();
  makeEntity();
  console.log(entity);
  playerDefaultMovement();

}

function collectStar (player, star) {
    // Removes the star from the screen
    star.kill();
    coin.play();
    score += 10;
    scoreText.text = 'Score: ' + score;
    playerStats.health += 10;
    healthText.text = 100;
}
stepsMakeSound = 0;

var jumpLimit = 2;
var jumpRefresh = true;


function collision(){
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);
  game.physics.arcade.overlap(player, stars, collectStar, null, this);
}
function update() {
  collision();
  movement();

  //  Reset the players velocity (movement)
/*
    if (player.body.touching.down){
      jumps = 0;
      jumpExtend = 0;
    }
    if (!player.body.touching.down){
        player.animations.stop();
        if(direction == -1) player.frame = 33;
        else player.frame = 37;
        if(direction == 1) player.feame = 37;
    }
    else if(sprint.isDown){

      if(direction == 1){
      player.animations.currentAnim.speed = player.body.velocity.x/25;

        if(player.body.velocity.x < 500){
          player.body.velocity.x += 3;
        }
        else player.body.velocity.x = 500;

        player.animations.play('rightSprint');
        if(stepsMakeSound == 0){
          steps.play();
          steps.play();

          //stepsMakeSound = (player.body.velocity.x)/100;
          stepsMakeSound = 5;
        }
        else{
          stepsMakeSound -= 1;
        }
      }
      if(direction == -1){
      player.animations.currentAnim.speed = -(player.body.velocity.x)/25;
        if(player.body.velocity.x > -500){
          player.body.velocity.x -= 3;
        }
        else player.body.velocity.x = -500;
        player.animations.play('leftSprint');
        if(stepsMakeSound == 0){
          steps.play();
          steps.play();
          stepsMakeSound = 5;
        }
        else{
          stepsMakeSound -= 1;
        }
      }
    }
    else if (cursors.left.isDown || moveLeft.isDown){
      player.animations.currentAnim.speed = 10;
      //  Move to the left
      player.body.velocity.x = -200;
      direction = -1;
      player.animations.play('left');
      if(stepsMakeSound == 0){
        //steps.play();
        stepsMakeSound = 25;
      }
      else{
        stepsMakeSound -= 1;
      }
    }
    else if (cursors.right.isDown || moveRight.isDown){
      player.animations.currentAnim.speed = 10;
      //  Move to the right
      player.body.velocity.x = 200;
      direction = 1;
      player.animations.play('right');
      if(stepsMakeSound == 0){
        //steps.play();
        stepsMakeSound = 25;
      }
      else{
        stepsMakeSound -= 1;
      }
    }
    else{
      //  Stand still
      //player.animations.stop();

      player.body.velocity.x = 0;
      if(direction == 1) player.frame = 7;
      if(direction == -1) player.frame = 1;
      stepsMakeSound = 0;

    }
    //  Allow the player to jump if they are touching the ground.
    if ((cursors.up.isDown || doJump.isDown)){
      if(jumpExtend < extendLimit){
        player.body.velocity.y -= 18;
        jumpExtend += 4;
      }
    }


    if( (player.frame == 26 || player.frame == 41) && moveOnce == 0){
      moveOnce = 1;
      steps.play();
    }
    if( (player.frame == 30 || player.frame == 45) && moveOnce == 1){
      moveOnce = 0;
      steps.play();
    }*/

}
