//-----------------------------------------------------------------------------
// Game_Source
//-----------------------------------------------------------------------------
function loadAll(){
  console.log("Load All");

  //Sprite
  loadMapAlpha();
  preloadBackground();
  loadPlayerResource();
  loadBoundaries();
  loadAISprite();
  loadSpecialsSprite();
  loadTileSet();

  //setupSpells();

  //Sounds
  loadSoundEffects();
  loadMusic();
}

function loadTileSet(){
  console.log("Roar!");
  game.load.tilemap('tileTest5000', 'game/assets/Map/Level/DragonsGround5.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tileImage', 'game/assets/Map/CollisionBlock/Block.png');
  game.load.image('tiles', 'game/assets/Map/CollisionBlock/Block.png');

	game.load.tilemap('testingGround', 'game/assets/Map/Level/TestingGround.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('testingGround', 'game/assets/tile_set/basic.png');
}

function loadPlayerResource(){
  game.load.spritesheet('dino', 'game/assets/player/Vark_TemplateGreen.png', 20, 20);
  game.load.spritesheet('visualDino', 'game/assets/player/Vark_v58.png', 20, 20); game.load.spritesheet('redBoundary', 'game/assets/player/Vark_TemplateRedSingle.png', 20, 20);
  game.load.spritesheet('template', 'game/assets/player/Player_Template.png', 20, 20);

  game.load.spritesheet('woodHUD', 'game/assets/player/woodHud.png', 216, 32);
  game.load.spritesheet('hearts', 'game/assets/player/hearts.png', 48, 16);
  game.load.spritesheet('healthBalls', 'game/assets/player/healthBalls.png', 200, 8);
  game.load.spritesheet('emptyball', 'game/assets/player/emptyBall.png', 16, 16);
  game.load.spritesheet('manaballs', 'game/assets/player/manaBalls.png', 200, 8);
  game.load.spritesheet('bmissle', 'game/assets/DarkMagicMisslesB.png', 64, 64);
  game.load.spritesheet('smissle', 'game/assets/Blue_Magic_Missles.png', 16, 16);
  game.load.spritesheet('energyBall', 'game/assets/spells/BlueEnergyBall.png', 16, 16);
  game.load.spritesheet('teleport', 'game/assets/spells/whiteTeleport.png', 16, 16);
  game.load.spritesheet('teleport301', 'game/assets/spells/whiteTeleport.png', 16, 16);
  game.load.spritesheet('casting', 'game/assets/Casting.png', 16, 16);
  game.load.spritesheet('magicBlock', 'game/assets/spells/MagicBlock.png', 8, 16);
  game.load.spritesheet('magicShield', 'game/assets/spells/Shield_Up.png', 4, 16);
  game.load.spritesheet('circleBarrier', 'game/assets/spells/barrierv2.png', 20, 20);
  game.load.spritesheet('spellJump', 'game/assets/spells/bounce.png', 20, 20);
  game.load.spritesheet('magicExpand', 'game/assets/spells/BlueExpand.png', 16, 16);
  game.load.spritesheet('magicPush', 'game/assets/spells/barrierPush.png', 6, 16);
  game.load.spritesheet('magicBlast', 'game/assets/spells/MagicBlast.png', 30, 20);

  game.load.spritesheet('chargeCast', 'game/assets/spells/Casting2.png', 26, 26);
}

function loadSoundEffects(){
  game.load.audio('blast', 'game/assets/sound_effect/Blast.wav');
  game.load.audio('blast2', 'game/assets/sound_effect/blast_simple.wav');
  game.load.audio('charge', 'game/assets/sound_effect/sootheCharge2.wav');
  game.load.audio('shoot', 'game/assets/sound_effect/bigShot.wav');
  game.load.audio('teleport', 'game/assets/sound_effect/Teleport.wav');
  game.load.audio('wall', 'game/assets/sound_effect/Wall.wav');
  game.load.audio('steps', 'game/assets/step.wav');
  game.load.audio('jumpSound', 'game/assets/Jump19.wav');
  game.load.audio('hurt', 'game/assets/sound_effect/hurt.wav');
  game.load.audio('shieldHurt', 'game/assets/sound_effect/tmp_shield_hurt.wav');
  game.load.audio('bounce', 'game/assets/sound_effect/bounce.wav');
}


function loadAISprite(){
  game.load.spritesheet('templateAI', 'game/assets/monster/templateAI.png', 20, 20);
  game.load.spritesheet('slime', 'game/assets/monster/Slime.png', 16, 16);
  game.load.spritesheet('goblin', 'game/assets/monster/Goblin.png', 16, 16);
  game.load.spritesheet('goblinArrow', 'game/assets/monster/attack_animation/goblin_arrow.png', 7, 3);
  game.load.spritesheet('collision', 'game/assets/monster/attack_animation/red_collision.png', 20, 20);
}

function preloadBackground(){
  game.load.spritesheet('level1', 'game/assets/Blocks.png', 16, 16);
}

function loadMapAlpha(){
  game.load.image('level1back', 'game/assets/Map/Level1-1back.png');
  game.load.image('level1front', 'game/assets/Map/Level1-1Front.png');
  game.load.image('background', 'game/assets/Map/Level0-Back.png');
}

function loadMusic(){
  //game.load.audio('symbo', ['../assets/meltdown.mp3']);
  //game.load.audio('symbo', ['game/assets/music/Visager_Windy_Bluffs_Loop.mp3']);
  game.load.audio('symbo', ['game/assets/music/Visager_-_22_-_Battle_Loop.mp3']);
  //game.load.audio('simple', ['../assets/UncleBibby_The_Simple_Complex.mp3']);
  //game.load.audio('symbo', ['../assets/music/Ketsa_04_Symbiosis.mp3']);
  // game.load.audio('symbo',['../assets/music/FMA_Small_Colin_Free_Tone_Textures.mp3']);
  game.load.audio('coin', 'game/assets/coin.wav');
}

function loadSpecialsSprite(){
  game.load.spritesheet('LoadStone', 'game/assets/Object/LoadStone.png', 20, 20);
  game.load.spritesheet('ManaStone', 'game/assets/Object/ManaStone.png', 16, 16);
  game.load.spritesheet('Mana', 'game/assets/Object/Energy.png', 10, 10);
  game.load.audio('regen', 'game/assets/sound_effect/regen.wav');
}

function loadBoundaries(){
  game.load.spritesheet('exist', 'game/assets/basic/Exist.png', 16, 16);
  game.load.spritesheet('click', 'game/assets/basic/Click.png', 16, 16);
  game.load.spritesheet('checkpoint', 'game/assets/basic/Checkpoint.png', 16, 16);
}
