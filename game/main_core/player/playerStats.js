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
           speed: 335,
       sprintSpd: 300,
       sprinting: 0,
             acl: 50,
        moveLeft: 0,
       moveRight: 0,
          moving: 0,
            jump: 0,
       spellJump: 0,
       jumpTotal: 5,
         jumpAtY: 0,
         jumpAcl: 5,
        jumpSpan: 60,
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
        cutscene: 0,
	 ghostJumpSpan: Phaser.Timer.SECOND * 2
};

var templateStarAim ={
  bottomRightX  : 20,
  bottomRightY  : 20,
  topRightX     : 20,
  topRightY     : 20,
  bottomX       : 20,
  bottomY       : 20,
  topX          : 5,
  topY          :20,
  sideY         : 0,
  sideX         : 30
};

var defaultState = {
		moving: 0,
		direction: 1
};
