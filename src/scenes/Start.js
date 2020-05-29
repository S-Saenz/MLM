/** @type {import("../../typings/phaser")} */

class Start extends Phaser.Scene {
    constructor(){
        super("startScene");
    }
    preload() {

        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('start_bg', '././assets/coverImageFull.png');
        this.load.image('login_bg', '././assets/login_bg.png');

        
        this.load.image('loginButton', '././assets/loginButton.png');
        this.load.image('loginButtonHover', '././assets/loginButtonHover.png');

        
        //hover sounds
        this.load.audio('hover1SFX', '././assets/sfx/hover1.wav');
        this.load.audio('hover2SFX', '././assets/sfx/hover2.wav');
        this.load.audio('hover3SFX', '././assets/sfx/hover3.wav');
        this.load.audio('hover4SFX', '././assets/sfx/hover4.wav');
        //click sounds
        this.load.audio('click1SFX', '././assets/sfx/click1.wav');
        this.load.audio('click2SFX', '././assets/sfx/click2.wav');
        this.load.audio('click3SFX', '././assets/sfx/click3.wav');

    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;

        
        //up down buttons
        this.loginButton = this.add.image(centerX,centerY+120, 'loginButton').setScale(0.5).setDepth(1);


        
        this.timer = this.time.delayedCall(2000, () => {
            this.fadeOut();
        }, null, this);


        this.coverImg = this.add.tileSprite(0, 0, 960, 650, 'start_bg').setOrigin(0, 0).setDepth(3);
        this.bg = this.add.tileSprite(0, 0, 960, 650, 'login_bg').setOrigin(0, 0);


        this.loginButton.setInteractive();
        this.loginButton.on('pointerdown', () => { 
            this.scene.start("messengerScene");
        });

        this.loginButton.on('pointerover', () => { 
            this.sound.play('hover4SFX');
            this.loginButton.setTexture('loginButtonHover');
        });
        this.loginButton.on('pointerout', () => { 
            this.loginButton.setTexture('loginButton');
        });

        
    }
    
    update() {
    }

    fadeOut(){
        if(this.coverImg.alpha > 0){
            this.timer = this.time.delayedCall(50, () => {
                this.coverImg.alpha -= 0.1;
                this.fadeOut();
            }, null, this);
        }
    }
    
}