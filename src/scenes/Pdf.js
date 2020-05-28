/** @type {import("../../typings/phaser")} */

class Pdf extends Phaser.Scene {
    constructor(){
        super("pdfScene");
    }
    preload() {

        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('pdf_bg', '././assets/productGuide.png');

        
        this.load.image('upButton', '././assets/upButton.png');
        this.load.image('downButton', '././assets/downButton.png');
        
        this.load.image('upButtonHover', '././assets/upButtonHover.png');
        this.load.image('downButtonHover', '././assets/downButtonHover.png');

        //tab stuff
        this.load.image('tabLine', '././assets/tabLine.png');
        this.load.image('tab', '././assets/tab.png');
        this.load.image('tabHover', '././assets/tabHover.png');
        this.load.image('tabSelected', '././assets/tabSelected.png');

    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;

        //music config
        this.sentConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '30px',
            color: '#FACADE',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }
        this.recievedConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '30px',
            color: '#FAA',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }


        


        // =============================== add buttons ===============================
        let buttonConfig = {
          fontFamily: 'Helvetica',
          fontStyle: 'bold',
          fontSize: '20px',
          color: '#000',
          align: 'center',
          padding: {
              right: 10,
              left: 10,
              top: 5,
              bottom: 5,
          },
        }
        
        //up down buttons
        this.upButton = this.add.image(game.config.width-100,game.config.height-150, 'upButton').setScale(0.5).setDepth(4);
        this.downButton = this.add.image(game.config.width-100,game.config.height-50, 'downButton').setScale(0.5).setDepth(4);


        // set up background and tabs
        this.tabLine = this.add.tileSprite(0,0,960,50,'tabLine').setOrigin(0).setDepth(3);
        //music tab
        this.musicPlayerTab = this.add.tileSprite(250,0,270,60,'tab').setOrigin(0).setDepth(3);
        this.musicPlayerTabTxt = this.add.text(270*1.4,10,'Music Player',buttonConfig).setOrigin(0.5,0).setDepth(4);

        //pdf tab
        this.tabSelected = this.add.tileSprite(500,0,270,60,'tabSelected').setOrigin(0).setDepth(4);
        this.pdfTabTxt = this.add.text(450*1.4,10,'pdf',buttonConfig).setOrigin(0.5,0).setDepth(4);
        
        this.chatTab = this.add.tileSprite(0,0,270,60,'tab').setOrigin(0).setDepth(3);
        this.chatTabTxt = this.add.text(60,10,'Messenger',buttonConfig).setDepth(4);

        this.tabs = [this.chatTab,this.musicPlayerTab];
        this.tabsTxt = [this.chatTabTxt,this.musicPlayerTabTxt];
        this.tabLinks = ['messengerScene','musicPlayerScene'];


        this.bg = this.add.tileSprite(0, 50, 960, 2200, 'pdf_bg').setOrigin(0, 0);
        this.chatTab = this.add.text(60,10,'Messenger',buttonConfig);

        
        //=============================== button functionality ===========================================

        //set interactive for tabs
        this.tabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.sound.play('click3SFX');
                this.scene.bringToTop(this.tabLinks[this.tabs.indexOf(tab)]);
                this.scene.moveAbove('messengerScene','chatScene');
                this.scene.moveAbove('chatScene','optionScene');
            });
    
            tab.on('pointerover', () => { 
                this.sound.play('hover4SFX');
                tab.setTexture('tabHover').setDepth(4);
            });
            tab.on('pointerout', () => { 
                tab.setTexture('tab').setDepth(3);
            });
            
        });
        

        
        this.upButton.setInteractive();
        this.upButton.on('pointerdown', () => { 
            if(this.bg.y<=0){
                this.bg.height+=100;
                this.bg.y+=100;
                if(this.bg.y >=20){
                    this.bg.y = 50;
                }
            }
        });

        this.upButton.on('pointerover', () => { 
            this.sound.play('hover4SFX');
            this.upButton.setTexture('upButtonHover');
        });
        this.upButton.on('pointerout', () => { 
            this.upButton.setTexture('upButton');
        });



        this.downButton.setInteractive();
        this.downButton.on('pointerdown', () => { 
            if(this.bg.y>=-1480){
                this.bg.height+=100;
                this.bg.y-=100;

            }
            console.log(this.bg.y);
        });

        this.downButton.on('pointerover', () => { 
            this.sound.play('hover4SFX');
            this.downButton.setTexture('downButtonHover');
        });
        this.downButton.on('pointerout', () => { 
            this.downButton.setTexture('downButton');
        });

        
    }
    
    update() {
    }

    
}