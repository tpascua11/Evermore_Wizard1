//-----------------------------------------------------------------------------
// Image_Source
//-----------------------------------------------------------------------------
function loadPlayerResource(){
  game.load.spritesheet('dino', '../assets/player/Vark_TemplateGreen.png', 20, 20);
  game.load.spritesheet('visualDino', '../assets/player/Vark_v57caper.png', 20, 20);
  game.load.spritesheet('redBoundary', '../assets/player/Vark_TemplateRedSingle.png', 20, 20);
  game.load.spritesheet('template', '../assets/player/Player_Template.png', 20, 20);

  game.load.spritesheet('woodHUD', '../assets/player/woodHud.png', 216, 32);
  game.load.spritesheet('hearts', '../assets/player/hearts.png', 48, 16);
  game.load.spritesheet('healthBalls', '../assets/player/healthBalls.png', 200, 8);
  game.load.spritesheet('emptyball', '../assets/player/emptyBall.png', 16, 16);
  game.load.spritesheet('manaballs', '../assets/player/manaBalls.png', 200, 8);
  game.load.spritesheet('bmissle', '../assets/DarkMagicMisslesB.png', 64, 64);
  game.load.spritesheet('smissle', '../assets/Blue_Magic_Missles.png', 16, 16);
  game.load.spritesheet('energyBall', '../assets/spells/BlueEnergyBall.png', 16, 16);
  game.load.spritesheet('teleport', '../assets/spells/whiteTeleport.png', 16, 16);
  game.load.spritesheet('teleport301', '../assets/spells/whiteTeleport.png', 16, 16);
  game.load.spritesheet('casting', '../assets/Casting.png', 16, 16);
  game.load.spritesheet('magicBlock', '../assets/spells/MagicBlock.png', 8, 16);
  game.load.spritesheet('magicShield', '../assets/spells/Shield_Up.png', 4, 16);
  game.load.spritesheet('circleBarrier', '../assets/spells/barrierv2.png', 20, 20);
  game.load.spritesheet('spellJump', '../assets/spells/bounce.png', 20, 20);
  game.load.spritesheet('magicExpand', '../assets/spells/BlueExpand.png', 16, 16);
  game.load.spritesheet('magicPush', '../assets/spells/barrierPush.png', 6, 16);
  game.load.spritesheet('magicBlast', '../assets/spells/MagicBlast.png', 30, 20);

  game.load.spritesheet('chargeCast', '../assets/spells/Casting2.png', 26, 26);

  game.load.audio('blast', '../assets/sound_effect/Blast.wav');
  game.load.audio('blast2', '../assets/sound_effect/blast_simple.wav');
  game.load.audio('charge', '../assets/sound_effect/sootheCharge2.wav');
  game.load.audio('shoot', '../assets/sound_effect/bigShot.wav');
  game.load.audio('teleport', '../assets/sound_effect/Teleport.wav');
  game.load.audio('wall', '../assets/sound_effect/Wall.wav');
  game.load.audio('steps', '../assets/step.wav');
  game.load.audio('jumpSound', '../assets/Jump19.wav');
  game.load.audio('hurt', '../assets/sound_effect/hurt.wav');
  game.load.audio('shieldHurt', '../assets/sound_effect/tmp_shield_hurt.wav');
  game.load.audio('bounce', '../assets/sound_effect/bounce.wav');
}


function loadAISprite(){
  game.load.spritesheet('templateAI', '../assets/monster/templateAI.png', 20, 20);
  game.load.spritesheet('slime', '../assets/monster/Slime.png', 16, 16);
  game.load.spritesheet('goblin', '../assets/monster/Goblin.png', 16, 16);
  game.load.spritesheet('goblinArrow', '../assets/monster/attack_animation/goblin_arrow.png', 7, 3);
  game.load.spritesheet('collision', '../assets/monster/attack_animation/red_collision.png', 20, 20);
}

function preloadBackground(){
  game.load.spritesheet('level1', '../assets/Blocks.png', 16, 16);
}

function loadMapAlpha(){
  game.load.image('level1back', '../assets/Map/Level1-1back.png');
  game.load.image('level1front', '../assets/Map/Level1-1Front.png');
  game.load.image('background', '../assets/Map/Level0-Back.png');
}

function loadMusic(){
  //game.load.audio('symbo', ['../assets/meltdown.mp3']);
  game.load.audio('symbo', ['../assets/music/Visager_Windy_Bluffs_Loop.mp3']);
  //game.load.audio('symbo', ['../assets/music/Visager_-_22_-_Battle_Loop.mp3']);
  //game.load.audio('simple', ['../assets/UncleBibby_The_Simple_Complex.mp3']);
  //game.load.audio('symbo', ['../assets/music/Ketsa_04_Symbiosis.mp3']);
  //game.load.audio('symbo',['../assets/music/FMA_Small_Colin_Free_Tone_Textures.mp3']);
  game.load.audio('coin', '../assets/coin.wav');
}

function loadSpecialsSprite(){
  game.load.spritesheet('LoadStone', '../assets/Object/LoadStone.png', 20, 20);
  game.load.spritesheet('ManaStone', '../assets/Object/ManaStone.png', 16, 16);
  game.load.spritesheet('Mana', '../assets/Object/Energy.png', 10, 10);
  game.load.audio('regen', '../assets/sound_effect/regen.wav');
}

function loadBoundaries(){
  game.load.spritesheet('exist', '../assets/basic/Exist.png', 16, 16);
  game.load.spritesheet('click', '../assets/basic/Click.png', 16, 16);
  game.load.spritesheet('checkpoint', '../assets/basic/Checkpoint.png', 16, 16);
}




