////--------------------------------------------------
// Main Core
//--------------------------------------------------
//var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'Evermore: The Wizard Guide', { preload: preload, create: create, update: update } );
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'Evermore: The Wizard Guide');
//var gameWidth = 1000;
//var gameHeight = 480;

var livingGame = {
  create: function(){
            startUniversalTimer(); 
            createWorldAlpha();
            createPlayer();   
            playerActions();
            setupSpells();
            createAI();
            testDamage();
            //setupMouse();
            //toolControls();
            //makeBlock();
            dependOnTest();
          },
  update:function(){
           movement();
           updateSpells();
           updateStatusEffect();
           updatePlayerFrame();
           updateHUD();
           aiRuning();
           game.world.bringToTop(bg2);
           //infoAll();
         }
}

function create() {
}

function update() {
}

function infoAll(){
  console.log("PLAYER BODY POSITION");
  console.log(player.body.x);
  console.log(player.body.y);
  console.log("PLAYER Velocity");
  console.log(player.body.velocity.x);
  console.log(player.body.velocity.y);
}

//cursors = game.input.keyboard.createCursorKeys();
