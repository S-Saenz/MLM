class Messenger extends Phaser.Scene {
    constructor(){
        super("messengerScene");
    }
    preload() {

        // load audio
        //this.load.audio('select', '././assets/RR_delivery3.wav');

        //buttons
        //this.load.image('audioOff', '././assets/audioOff.png');

    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;

        // =============================== add buttons ===============================
        let buttonConfig = {
          fontFamily: 'Georgia',
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
          fixedWidth: 150
        }
        this.displayName = this.add.text(centerX, 60,"tab", buttonConfig).setOrigin(0.5);
        this.convo = [];
        this.convoWho = [];
        this.convoTabs = [];
        var num = 0;
        game.people.aquired.forEach(aq => {
            if(aq){
                var txt = this.add.text(0,num*50, game.people.names[num],buttonConfig).setOrigin(0);
                this.convoTabs.push(txt);
            }
            num++;
        });
        
        //=============================== set interactive ===========================================

        this.convoTabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
            });
    
            tab.on('pointerover', () => { 
                tab.setStyle({ fill: '#000'});
            });
            tab.on('pointerout', () => { 
                tab.setStyle({ fill: '#FACADE'});
            });
    
        });

        //================================ functionality =================================

        
    }
    
    update() {
        
    }
}