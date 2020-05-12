class MusicPlayer extends Phaser.Scene {
    constructor(){
        super("musicPlayerScene");
    }
    preload() {

        // load audio
        //this.load.audio('select', '././assets/RR_delivery3.wav');

        //buttons
        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('ui_bg', '././assets/musicPlayer.png');
        this.load.image('typeArea', '././assets/typeArea.png');
        this.load.image('typeAreaHover', '././assets/typeAreaHover.png');
        this.load.image('nameHover', '././assets/nameHover.png');

        this.load.image('tabLine', '././assets/tabLine.png');
        this.load.image('tab', '././assets/tab.png');
        this.load.image('tabHover', '././assets/tabHover.png');
        this.load.image('tabSelected', '././assets/tabSelected.png');

    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;
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
        // set up background and tabs
        this.tabLine = this.add.tileSprite(0,0,960,200,'tabLine').setOrigin(0);
        this.messengerTab = this.add.tileSprite(0,0,270,60,'tab').setOrigin(0);
        this.tabSelected = this.add.tileSprite(250,0,270,60,'tabSelected').setOrigin(0);
        this.bg = this.add.tileSprite(0, 50, 960, 600, 'ui_bg').setOrigin(0, 0);
        this.chatTab = this.add.text(270*1.4,10,'Music Player',buttonConfig).setOrigin(0.5,0);
        this.messengerTabTxt = this.add.text(60,10,'Messenger',buttonConfig);

        
        //=============================== set interactive ===========================================


        //set interactive for tab
        this.messengerTab.setInteractive();
        this.messengerTab.on('pointerdown', () => { 
            this.scene.start("messengerScene");
        });

        this.messengerTab.on('pointerover', () => { 
            this.messengerTab.setTexture('tabHover');
        });
        this.messengerTab.on('pointerout', () => { 
            this.messengerTab.setTexture('tab');
        });

        
    }
    
    update() {
    }
    
}