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
        this.msgStart = game.config.height-200;
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
                this.convo = game.people.mHist[game.people.names.indexOf(tab.text)];
                this.convoWho = game.people.mHistWho[game.people.names.indexOf(tab.text)];
                this.loadConvo(this.convo,this.convoWho);
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

    loadConvo(convo,convoWho){
        this.convoMsgs.forEach(msg => {
            msg.destroy();
        });
        var num = convo.length;
        convo.forEach(msg => {
            console.log(msg);
            if(convoWho[convo.length-num] == 0){
                var txt = this.add.text(this.msgX+800,this.msgStart-(num*100), msg,this.sentConfig).setOrigin(1);
            }else{
                var txt = this.add.text(this.msgX,this.msgStart-(num*100), msg,this.recievedConfig).setOrigin(0);
            }
            this.convoMsgs.push(txt);
            num--;
        });
    }
}