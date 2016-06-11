var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('sky', '../assets/sky.png');
  game.load.image('ground', '../assets/platform.png');
  game.load.image('star', '../assets/star.png');
  game.load.spritesheet('dude', '../assets/dude.png', 32, 48);

  game.load.spritesheet('teleport', '../assets/White-Teleport-Sheet.png', 16, 16);
  game.load.spritesheet('shock', '../assets/Shock.png', 16, 16);
  loadPlayerSprite()

  cursors = game.input.keyboard.createCursorKeys();
  game.load.audio('boden', ['../assets/meltdown.mp3']);
  game.load.audio('coin', '../assets/coin.wav');

  preloadBackground();
}

var platforms;

function create() {
  coin = game.add.audio('coin');

  sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  doJump = game.input.keyboard.addKey(Phaser.Keyboard.W);

  game.add.sprite(0, 0, 'star');
  //  We're going to be using physics, so enable the Arcade Physics system
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

    //HERE ! ! !
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);


    //HERE ! ! !
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height, 'ground');
    ground.scale.setTo(3, 10);
    ground.body.immovable = true;

    ground = platforms.create(-10, game.world.height-320, 'ground');
    ground.body.immovable = true;
    ground.scale.setTo(0.5, 10);

    ground = platforms.create(900, game.world.height-320, 'ground');
    ground.body.immovable = true;
    ground.scale.setTo(0.5, 10);

    createPlayer();
    game.camera.follow(player);
  //var groundPlayerCM = game.physics.p2.createContactMaterial(playerMaterial, worldMaterial, { friction: 0.0 });

    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 12; i++){
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 2200;
    }
  //scoreText = game.add.text(300, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  //healthText = game.add.text(32, 32, playerInfo.health, {fontSize: '32px', fill: '900'}) ;

  music = game.add.audio('boden');
  //music.play();
  
  game.world.setBounds(0, 0, 2000, 2000);
  makeEntity();
  makeEntity();
  makeEntity();
  console.log(entity);
  playerDefaultMovement();
  loadBackground();
}

function collectStar (player, star) {
    // Removes the star from the screen
    star.kill();

    coin.play();
    //score += 10;
    //scoreText.text = 'Score: ' + score;
    //playerInfo.health += 10;
   // healthText.text = 100;
}

function collision(){
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);
  game.physics.arcade.overlap(player, stars, collectStar, null, this);
}

function update() {
  entityCollision();
  collision();
  movement();
}
