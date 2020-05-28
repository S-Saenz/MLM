/** @type {import("../../typings/phaser")} */

class Start extends Phaser.Scene {
    constructor(){
        super("startScene");
    }
    preload() {

        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('start_bg', '././assets/login_bg.png');

        
        this.load.image('loginButton', '././assets/loginButton.png');
        this.load.image('loginButtonHover', '././assets/loginButtonHover.png');


    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;

        
        //up down buttons
        this.loginButton = this.add.image(game.config.width-100,game.config.height-50, 'loginButton').setScale(0.5).setDepth(4);




        this.bg = this.add.tileSprite(0, 0, 960, 650, 'start_bg').setOrigin(0, 0);


        this.loginButton.setInteractive();
        this.loginButton.on('pointerdown', () => { 
            if(this.bg.y>=-1480){
                this.bg.height+=100;
                this.bg.y-=100;

            }
            console.log(this.bg.y);
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

    
}