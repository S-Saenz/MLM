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
        this.sentConfig = {
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
        }
        this.recievedConfig = {
            fontFamily: 'Georgia',
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
        }
        this.msgStart = game.config.height;
        this.msgX = 300;
        this.displayName = this.add.text(centerX, 60,"tab", buttonConfig).setOrigin(0.5);
        this.convoMsgs = [];
        this.convo = [];
        this.convoWho = [];
        this.convoTabs = [];
        var num = 0;
        game.people.aquired.forEach(aq => {
            if(aq){
                var txt = this.add.text(0,200+(num*50), game.people.names[num],buttonConfig).setOrigin(0);
                this.convoTabs.push(txt);
            }
            num++;
        });
        
        //=============================== set interactive ===========================================

        this.convoTabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.displayName.text = tab.text;
                this.convo = game.fullConvos.p0;
                this.loadConvo(this.convo);
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

    progressConvo(convo, startPoint){


    }

    presentOptions(options){
        options.forEach(option => {
            console.log('option: ' + option.txt);
        });
    }

    loadConvo(convo){
        this.convoMsgs.forEach(msg => {
            msg.destroy();
        });
        var num = convo.messages.length;
        convo.messages.forEach(msg => {
            if(msg.type() == 'recieved'){
                var txt = this.add.text(this.msgX+800,this.msgStart-(num*100), msg.txt,this.sentConfig).setOrigin(1);
            }else if(msg.type() == 'sent'){
                var txt = this.add.text(this.msgX,this.msgStart-(num*100), msg.txt,this.recievedConfig).setOrigin(0);
            }else if(msg.type() == 'sentOpts'){
                this.presentOptions(msg.options);
            }
            this.convoMsgs.push(txt);
            num--;
        });
    }
}