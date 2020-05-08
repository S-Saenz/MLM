class Messenger extends Phaser.Scene {
    constructor(){
        super("messengerScene");
    }
    preload() {

        // load audio
        //this.load.audio('select', '././assets/RR_delivery3.wav');

        //buttons
        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('ui_bg', '././assets/ui_bg.png');
        this.load.image('typeArea', '././assets/typeArea.png');
        this.load.image('typeAreaHover', '././assets/typeAreaHover.png');
        this.load.image('nameHover', '././assets/nameHover.png');

    }

    create(){
        this.bg = this.add.tileSprite(0, 0, 960, 600, 'ui_bg').setOrigin(0, 0);
        this.add.tileSprite(0,0,'ui_bg');
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
          fontSize: '30px',
          color: '#000',
          align: 'center',
          padding: {
              right: 10,
              left: 10,
              top: 5,
              bottom: 5,
          },
        }
        this.textArea = this.add.image(game.config.width,game.config.height,'typeArea').setOrigin(1);
        this.tabHover = this.add.image(0,0, 'nameHover').setOrigin(0);
        this.tabHover.alpha = 0;
        this.options = [''];
        this.msgStart = game.config.height-200;
        this.msgX = game.config.width;
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
        this.textArea.setInteractive();
        this.textArea.on('pointerdown', () => { 
        });

        this.textArea.on('pointerover', () => { 
            this.textArea.setTexture('typeAreaHover');
        });
        this.textArea.on('pointerout', () => { 
            this.textArea.setTexture('typeArea');
        });

        this.convoTabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.tabHover.x = tab.x;
                this.tabHover.y = tab.y;
                this.tabHover.alpha = 1;
                this.convo = game.fullConvos.p0;
                if(this.displayName.text != tab.text){
                    this.loadConvo(this.convo);
                }
                this.displayName.text = tab.text;
            });
    
            tab.on('pointerover', () => { 
                this.tabHover.x = tab.x;
                this.tabHover.y = tab.y;
                this.tabHover.alpha = 1;
                tab.setDepth(2);
            });
            tab.on('pointerout', () => { 
                if(this.displayName.text != tab.text){
                    this.tabHover.alpha = 0;
                }
            });
    
        });

        //================================ functionality =================================

        
    }
    
    update() {
    }

    progressConvo(convo, startPoint){


    }

    presentOptions(options){
        console.log(options);
        options.forEach(option => {
            console.log('option: ' + option.txt);
        });
    }

    loadConvo(convo){
        this.convoMsgs.forEach(msg => {
            msg.destroy();
        });
        var reachedSent = false;
        var num;
        for(num = 0; num <= convo.prog-1; num++){
            console.log('num: ' + num);
            var msg = convo.messages[num];
            console.log(msg.txt);
            if(msg.type() == 'recieved'){
                var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-((convo.prog - num)*100), msg.txt,this.recievedConfig).setOrigin(0);
            }else if(msg.type() == 'sent'){
                var txt = this.add.text(this.msgX,this.msgStart-((convo.prog - num)*100), msg.txt,this.sentConfig).setOrigin(1);
            }else if(msg.type() == 'sentOpts'){
                var txt = this.add.text(this.msgX,this.msgStart-((convo.prog - num)*100), msg.choice,this.sentConfig).setOrigin(1);
            }
            this.convoMsgs.push(txt);
        }


        while(!reachedSent){
            convo.prog++;
            console.log('num: ' + num);
            var msg = convo.messages[num];
            console.log(msg.txt);
            if(msg.type() == 'recieved'){
                var txt = this.add.text(this.msgX,this.msgStart-((convo.prog - num)*100), msg.txt,this.recievedConfig).setOrigin(1);
            }else if(msg.type() == 'sent'){
                this.options = [msg.txt];
                reachedSent = true;
            }else if(msg.type() == 'sentOpts'){
                this.options = msg.options;
                reachedSent = true;
            }
            this.convoMsgs.push(txt);
            if(num == convo.messages.length){
                reachedSent = true;
            }
            num++;

        }
    }
}