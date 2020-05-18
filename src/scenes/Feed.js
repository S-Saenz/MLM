class Feed extends Phaser.Scene {
    constructor(){
        super("feedScene");
    }
    preload() {

        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('feed_bg', '././assets/feed_ui.png');

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
        
        // set up background and tabs
        this.tabLine = this.add.tileSprite(0,0,960,200,'tabLine').setOrigin(0);
        //music tab
        this.musicPlayerTab = this.add.tileSprite(250,0,270,60,'tab').setOrigin(0);
        this.musicPlayerTabTxt = this.add.text(270*1.4,10,'Music Player',buttonConfig).setOrigin(0.5,0);

        //feed tab
        this.feedTab = this.add.tileSprite(500,0,270,60,'tab').setOrigin(0);
        this.feedTabTxt = this.add.text(450*1.4,10,'Feed',buttonConfig).setOrigin(0.5,0);

        this.tabs = [this.feedTab,this.musicPlayerTab];
        this.tabsTxt = [this.feedTabTxt,this.musicPlayerTabTxt];
        this.tabLinks = ['feedScene','musicPlayerScene'];


        this.tabSelected = this.add.tileSprite(0,0,270,60,'tabSelected').setOrigin(0);
        this.bg = this.add.tileSprite(0, 50, 960, 600, 'ui_bg').setOrigin(0, 0);
        this.chatTab = this.add.text(60,10,'Messenger',buttonConfig);

        
        //=============================== button functionality ===========================================

        //set interactive for tabs
        this.tabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.sound.play('click3SFX');
                this.scene.start(this.tabLinks[this.tabs.indexOf(tab)]);
            });
    
            tab.on('pointerover', () => { 
                this.sound.play('hover4SFX');
                tab.setTexture('tabHover');
            });
            tab.on('pointerout', () => { 
                tab.setTexture('tab');
            });
            
        });

        
    }
    
    update() {
    }

    
}