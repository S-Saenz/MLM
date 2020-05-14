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

        //icons
        this.load.image('Betty', '././assets/BettyIcon.png');
        this.load.image('Brett', '././assets/BrettIcon.png');
        this.load.image('Jamie', '././assets/JamieIcon.png');

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
        this.musicPlayerTab = this.add.tileSprite(250,0,270,60,'tab').setOrigin(0);
        this.tabSelected = this.add.tileSprite(0,0,270,60,'tabSelected').setOrigin(0);
        this.bg = this.add.tileSprite(0, 50, 960, 600, 'ui_bg').setOrigin(0, 0);
        this.chatTab = this.add.text(60,10,'Messenger',buttonConfig);
        this.musicPlayerTabTxt = this.add.text(270*1.4,10,'Music Player',buttonConfig).setOrigin(0.5,0);

        //
        this.currSentOpts;
        this.textArea = this.add.image(game.config.width,game.config.height,'typeArea').setOrigin(1);
        this.textArea.alpha = 0;
        this.chatTabHover = this.add.image(0,0, 'nameHover').setOrigin(0,0.15).setScale(1,2);
        this.chatTabHover.alpha = 0;
        this.currOptionsIndex;
        this.options = [''];
        this.optionsTxt = [];
        this.optionsBoxes = [];

        //message placement:
        this.msgStart = game.config.height-200;
        this.msgX = game.config.width;

        this.displayName = this.add.text(centerX-165, 115,"", buttonConfig).setOrigin(0.5);
        this.displayIcon = this.add.image(centerX-225, 125, 'Betty').setScale(0.25);

        
        this.convoIndex = 0;
        this.convoMsgs = [];
        this.convo;
        this.convoWho = [];
        this.convoTabs = [];
        var num = 0;
        game.ppl.forEach(person => {
            if(person.aquired){
                var txt = this.add.text(100,170+(num*100), person.name,buttonConfig).setOrigin(0).setDepth(2);
                var icon = this.add.image(10,200+(num*100), person.name).setScale(0.4).setOrigin(0,0.5).setDepth(2);
                this.convoTabs.push(txt);
            }
            num++;
        });
        
        //=============================== set interactive ===========================================

        //text area is the part where you type your message at the bottom of messenger
        this.textArea.setInteractive();
        this.textArea.on('pointerdown', () => { 
            this.presentOptions(this.options);
        });

        this.textArea.on('pointerover', () => { 
            this.textArea.setTexture('typeAreaHover');
        });
        this.textArea.on('pointerout', () => { 
            this.textArea.setTexture('typeArea');
        });

        //set interactive for tab
        this.musicPlayerTab.setInteractive();
        this.musicPlayerTab.on('pointerdown', () => { 
            this.scene.start("musicPlayerScene");
        });

        this.musicPlayerTab.on('pointerover', () => { 
            this.musicPlayerTab.setTexture('tabHover');
        });
        this.musicPlayerTab.on('pointerout', () => { 
            this.musicPlayerTab.setTexture('tab');
        });

        //chat tabs
        this.convoTabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.chatTabHover.x = tab.x-100;
                this.chatTabHover.y = tab.y-15;
                this.chatTabHover.alpha = 1;
                this.convoIndex = game.people.names.indexOf(tab.text);
                this.convo = game.people.mHist[game.people.names.indexOf(tab.text)];
                if(this.displayName.text != tab.text){
                    this.loadConvo(this.convoIndex);
                }
                this.displayName.text = tab.text;
                this.displayIcon.setTexture(tab.text);
                this.textArea.alpha = 1;
            });
    
            tab.on('pointerover', () => { 
                this.chatTabHover.x = tab.x-100;
                this.chatTabHover.y = tab.y-15;
                this.chatTabHover.alpha = 1;
                tab.setDepth(2);
            });
            tab.on('pointerout', () => { 
                if(this.displayName.text != tab.text){
                    this.chatTabHover.alpha = 0;
                }
            });
    
        });

        //================================ functionality =================================

        
    }
    
    update() {
    }

    progressConvo(convo, startPoint){


    }

    chooseOption(optionIndex){
        //this.currSentOpts.choose(option);
        game.people.mHist[this.convoIndex].messages[this.currOptionsIndex].choose(this.options[optionIndex]);
        game.ppl[this.convoIndex].trust += this.options[optionIndex].effect;
        console.log('trust level: ' + game.ppl[this.convoIndex].trust);
        if(game.ppl[this.convoIndex].trust <= 0){
            game.quitters++;
        }
        game.people.mHist[this.convoIndex].prog++;
        this.loadConvo(this.convoIndex)

    }

    initializeOptionButtons(){
        var num = 0;
        this.optionsBoxes.forEach(optionBox => {
            optionBox.setInteractive();
            optionBox.on('pointerdown', () => { 
                this.chooseOption(this.optionsBoxes.indexOf(optionBox));
            });
    
            optionBox.on('pointerover', () => { 
                optionBox.setTexture('typeAreaHover');
            });
            optionBox.on('pointerout', () => { 
                optionBox.setTexture('typeArea');
            });
            num++;
        });

    }

    presentOptions(options){
        var num = 0;
        options.forEach(option => {
            this.optionsBoxes.push(
                this.add.image(this.textArea.x,this.textArea.y-(50*(num+1)),'typeArea').setOrigin(1)
            );
            this.optionsTxt.push(
                this.add.text(this.textArea.x,this.textArea.y-(50*(num+1)),option.txt,this.sentConfig).setOrigin(1)
            );
            num++
        });
        this.initializeOptionButtons();
    }

    loadConvo(convoIndex){
        var optNum = 0;
        this.optionsTxt.forEach(opt => {
            opt.destroy();
            this.optionsBoxes[optNum].destroy();
            optNum++;
            
        });
        this.optionsTxt = [];
        this.optionsBoxes = [];
        this.convoMsgs.forEach(msg => {
            msg.destroy();
        });
        var reachedSent = false;
        var num;
        for(num = 0; num <= game.people.mHist[convoIndex].prog-1; num++){
            var prog = game.people.mHist[convoIndex].prog;
            var msg = game.people.mHist[convoIndex].messages[num];
            if(msg.type() == 'recieved'){
                var message = '';
                msg.txtArr.forEach(txt => {
                    if(typeof txt == "string"){
                        message += txt;
                    }else{
                        message += txt.txt;
                    }
                });
                var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-((prog - num)*100), message,this.recievedConfig).setOrigin(0);
            }else if(msg.type() == 'sent'){
                var txt = this.add.text(this.msgX,this.msgStart-((prog - num)*100), msg.txt,this.sentConfig).setOrigin(1);
            }else if(msg.type() == 'sentOpts'){
                var txt = this.add.text(this.msgX,this.msgStart-((prog - num)*100), msg.choice.txt,this.sentConfig).setOrigin(1);
            }
            this.convoMsgs.push(txt);
        }


        while(!reachedSent){
            var msg = game.people.mHist[this.convoIndex].messages[num];
            if(msg.type() == 'recieved'){
                game.people.mHist[this.convoIndex].prog++;
                var message = '';
                msg.txtArr.forEach(txt => {
                    if(typeof txt == "string"){
                        message += txt;
                    }else{
                        message += txt.txt;
                    }
                });
                var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-((game.people.mHist[this.convoIndex].prog - num)*100), message,this.recievedConfig).setOrigin(0);
            }else if(msg.type() == 'sent'){
                if(game.quitters >= 2){
                    this.timer = this.time.delayedCall(500, () => {
                        this.scene.start("endScene");
                    }, null, this);
                }
                this.options = [msg];
                reachedSent = true;
            }else if(msg.type() == 'sentOpts'){
                if(game.quitters >= 2){
                    this.timer = this.time.delayedCall(500, () => {
                        this.scene.start("endScene");
                    }, null, this);
                }
                this.currOptionsIndex = num;
                this.options = msg.options;
                this.currSentOpts = msg;
                reachedSent = true;
            }
            this.convoMsgs.push(txt);
            if(num == game.people.mHist[this.convoIndex].messages.length){
                reachedSent = true;
            }
            num++;

        }
    }
}