/** @type {import("../../typings/phaser")} */

class Messenger extends Phaser.Scene {
    constructor(){
        super("messengerScene");
    }
    preload() {

        //load music Scene
        this.load.sceneFile('musicPlayerScene', './MusicPlayer.js');
        //load PDF Scene
        this.load.sceneFile('pdfScene','./Pdf.js');
        // load sfx
        this.load.audio('recievedSFX', '././assets/sfx/recieved.wav');
        this.load.audio('sentSFX', '././assets/sfx/sent.wav');
        //hover sounds
        this.load.audio('hover1SFX', '././assets/sfx/hover1.wav');
        this.load.audio('hover2SFX', '././assets/sfx/hover2.wav');
        this.load.audio('hover3SFX', '././assets/sfx/hover3.wav');
        this.load.audio('hover4SFX', '././assets/sfx/hover4.wav');
        //click sounds
        this.load.audio('click1SFX', '././assets/sfx/click1.wav');
        this.load.audio('click2SFX', '././assets/sfx/click2.wav');
        this.load.audio('click3SFX', '././assets/sfx/click3.wav');

        //buttons
        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('ui_bg', '././assets/ui_bg.png');
        this.load.image('typeArea', '././assets/typeArea2.png');
        this.load.image('typeAreaHover', '././assets/typeAreaHover2.png');
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

        //launch MusicPlayer Scene
        this.scene.launch('musicPlayerScene');
        this.scene.sendToBack('musicPlayerScene');
        //launch PDF Scene
        this.scene.launch('pdfScene');
        this.scene.sendToBack('pdfScene');
        //this.scene.bringToTop('messengerScene');

        this.replied = false;
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
            wordWrap: { width: 700, useAdvancedWrap: true }
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
            wordWrap: { width: 700, useAdvancedWrap: true }
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

        //pdf tab
        this.pdfTab = this.add.tileSprite(500,0,270,60,'tab').setOrigin(0);
        this.pdfTabTxt = this.add.text(450*1.4,10,'pdf',buttonConfig).setOrigin(0.5,0);

        this.tabs = [this.pdfTab,this.musicPlayerTab];
        this.tabsTxt = [this.pdfTabTxt,this.musicPlayerTabTxt];
        this.tabLinks = ['pdfScene','musicPlayerScene'];


        this.tabSelected = this.add.tileSprite(0,0,270,60,'tabSelected').setOrigin(0);
        this.bg = this.add.tileSprite(0, 50, 960, 600, 'ui_bg').setOrigin(0, 0);
        this.chatTab = this.add.text(60,10,'Messenger',buttonConfig);

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
            this.sound.play('click2SFX');
            //console.log('hello2');
            this.presentOptions(this.options);
        });

        this.textArea.on('pointerover', () => { 
            this.textArea.setTexture('typeAreaHover');
        });
        this.textArea.on('pointerout', () => { 
            this.textArea.setTexture('typeArea');
        });

        //set interactive for tabs
        this.tabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.sound.play('click3SFX');
                this.scene.bringToTop(this.tabLinks[this.tabs.indexOf(tab)]);
                
            });
    
            tab.on('pointerover', () => { 
                this.sound.play('hover4SFX');
                tab.setTexture('tabHover');
            });
            tab.on('pointerout', () => { 
                tab.setTexture('tab');
            });
            
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
                this.sound.play('hover3SFX');
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

        //================================ timers =================================
        

        this.msgTimer = this.time.addEvent({
            delay: 1000,
            callback: this.progressConvo,
            callbackScope: this,
            loop: true
        });

        
    }
    
    update() {
    }

    progressConvo(){
        if(!this.replied){
            this.sound.play('recievedSFX');
        }
        this.replied = true;

    }

    chooseOption(optionIndex){
        //this.currSentOpts.choose(option);
        this.replied = false;
        this.sound.play('sentSFX');
        if(this.options.length > 1){
            //let tall=this.getHeight(this.extractMsg(game.people.mHist[this.convoIndex].messages[this.currOptionsIndex].options[optionIndex])).length;
            game.people.mHist[this.convoIndex].messages[this.currOptionsIndex].choose(game.people.mHist[this.convoIndex].messages[this.currOptionsIndex].options[optionIndex]);
            //increase conversation height
            //game.people.mHist[this.convoIndex].longer(tall*30);
            //console.log(game.people.mHist[this.convoIndex].height);
        }

        game.ppl[this.convoIndex].trust += this.options[optionIndex].effect;
        if(game.ppl[this.convoIndex].trust == 0){
            game.quitters++;
            game.ppl[this.convoIndex].trust--;
        }
        game.people.mHist[this.convoIndex].prog++;
        this.loadConvo(this.convoIndex)

    }

    initializeOptionButtons(){
        
        var num = 0;
        this.optionsBoxes.forEach(optionBox => {
            optionBox.setInteractive();
            optionBox.on('pointerdown', () => { 
                this.sound.play('click2SFX');
                this.chooseOption(this.optionsBoxes.indexOf(optionBox));
                //console.log('hello1');
            });
    
            optionBox.on('pointerover', () => { 
                this.sound.play('hover1SFX');
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
        //console.log(options);
        let optsTxt=[];
        for(var o=0; o<options.length;o++){
            optsTxt.push(this.extractMsg(options[o]));
        }
        console.log(optsTxt);
        let optsTower=this.convoHeight(optsTxt)*34;
        let ceiling=optsTower;
        /*for(var option=0;option<options.length;option++){
            this.optionsBoxes.push(
                this.add.image(this.textArea.x,this.textArea.y+this.getHeight(this.extractMsg(options[option])*30),'typeArea').setOrigin(1)
            );
            this.optionsTxt.push(
                this.add.text(this.textArea.x,this.textArea.y+this.getHeight(this.extractMsg(options[option])*30),this.extractMsg(options[option]),this.sentConfig).setOrigin(1)
            );
            ceiling-=(this.getHeight(this.extractMsg(options[option])*30));

        }*/
        options.forEach(option => {
            let decisions=this.getHeight(this.extractMsg(option));
            this.optionsBoxes.push(
                this.add.image(this.textArea.x,this.textArea.y-(20*options.length+ceiling-34*decisions),'typeArea').setOrigin(1).setDisplaySize(700,decisions*34)
            );
            this.optionsTxt.push(
                this.add.text(this.textArea.x,this.textArea.y-(20*options.length+ceiling-34*decisions),this.extractMsg(option),this.sentConfig).setOrigin(1)
            );
            ceiling-=(decisions*34+20);
            //console.log(this.sen);
            num++;
        });

        this.initializeOptionButtons();
    }

    extractMsg(msg){
        var message = '';
        msg.txtArr.forEach(txt => {
            if(typeof txt == "string"){
                message += txt;
            }else{
                //if its not a string then its a convoVar
                message += txt.txt;
            }
        });
        return message;
    }

    loadConvo(convoIndex){
        //manipulatable conversation height
        //this.manipConvoH=game.people.mHist[convoIndex].height;
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
        var msgs=[];
        for(var e = 0; e <= game.people.mHist[convoIndex].prog-1; e++){
            var msg2=game.people.mHist[convoIndex].messages[e];
            var texts;
            if(msg2.type()=='sentOpts'){
                texts=this.extractMsg(msg2.choice);
            }else{
                texts=this.extractMsg(msg2);
            }
            msgs.push(texts);
            //console.log('msgs',msgs);
            
        }
        let height=this.convoHeight(msgs);
        game.people.mHist[convoIndex].setHeight(height*34+e*20);
        var roof=game.people.mHist[convoIndex].heightChecker();
        for(num = 0; num <= game.people.mHist[convoIndex].prog-1; num++){
            var prog = game.people.mHist[convoIndex].prog;
            var msg = game.people.mHist[convoIndex].messages[num];
            //console.log('roof',roof);
            
            //console.log(msg);
            if(msg.type() == 'recieved'){
                var message = this.extractMsg(msg);
                //var lineRec=this.getHeight(message);
                
                var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-(roof+10/**this.getHeight(message) - (this.getHeight(message)*34)*/)/**this.getHeight(message)*/, message,this.recievedConfig).setOrigin(0);
                roof-=(20+this.getHeight(message)*34);
                //console.log('roofRec',roof);
                /*for(var i1=0;i1<lineRec.length;i1++){
                    
                    var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-(((prog+20*i1) - (num+20*i1))*100)-20*i1, lineRec[i1],this.recievedConfig).setOrigin(0);
                }*///this.getHeight(message);
                //console.log(message);
                //console.log(txt.getWrappedText(this.extractMsg(msg)).length);
            }else if(msg.type() == 'sent'){
                //var lineSent=this.getHeight(this.extractMsg(msg));
                var txt = this.add.text(this.msgX,this.msgStart-((roof/**this.getHeight(this.extractMsg(msg))*/ - (10+this.getHeight(this.extractMsg(msg))*34)/**this.getHeight(this.extractMsg(msg))*/)),this.extractMsg(msg),this.sentConfig).setOrigin(1);
                roof-=(20+this.getHeight(this.extractMsg(msg))*34);
                //console.log('roofSent',roof);
                /*for(var i2=0;i2<lineSent.length;i2++){
                    var txt = this.add.text(this.msgX,this.msgStart-(((prog+20*i2) - (num+20*i2))*100)-20*i2,lineSent[i2],this.sentConfig).setOrigin(1);
                }*///this.getHeight(this.extractMsg(msg));
                //console.log(this.extractMsg(msg));
                //console.log(txt.getWrappedText(this.extractMsg(msg)).length);
                
            }else if(msg.type() == 'sentOpts'){
                //var lineSO=this.getHeight(this.extractMsg(msg.choice));
                var txt = this.add.text(this.msgX,this.msgStart-(roof - (this.getHeight(this.extractMsg(msg.choice))*34)-10), this.extractMsg(msg.choice),this.sentConfig).setOrigin(1);
                roof-=((20+this.getHeight(this.extractMsg(msg.choice))*34));
                //console.log('roofOpts',roof);
                /*for(var i3=0;i3<lineSO.length;i3++){
                    var txt = this.add.text(this.msgX,this.msgStart-(((prog+20*i3) - (num+20*i3))*100)+20*i3, lineSO[i3],this.sentConfig).setOrigin(1);
                }*/
                //console.log(this.extractMsg(msg.choice));
                //console.log(txt.getWrappedText(this.extractMsg(msg.choice)).length);
                
            }
            this.convoMsgs.push(txt);
        }
        this.lastMsgWasRecieved = false;
        //console.log('roofEnd',roof);
        

        if(num == 0){
            this.replied = true;
            this.lastMsgWasRecieved = true;
        }
        
        while(!reachedSent){
            if(num >= game.people.mHist[this.convoIndex].messages.length){
                this.options = [];
                reachedSent = true;
                break;
            }
            var msg = game.people.mHist[this.convoIndex].messages[num];
            if(msg.type() == 'recieved' /*&& this.replied*/){
                game.people.mHist[this.convoIndex].prog++;
                var message = this.extractMsg(msg);
                //var lineRep=this.getHeight(message);
                game.people.mHist[this.convoIndex].longer(20+this.getHeight(message)*34);
                //console.log('roofPreRep',roof);
                roof+=(20+this.getHeight(message)*34);
                var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-((/*game.people.mHist[this.convoIndex].prog*/roof-(5+this.getHeight(message)*34)/*num*/)/**100*/), message,this.recievedConfig).setOrigin(0);
                roof-=(this.getHeight(message)*34);
                //console.log('roofPostRep',roof);
                /*for(var i4=0;i4<lineRep.length;i4++){
                    var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-(((game.people.mHist[this.convoIndex].prog+20*i4) - (num+20*i4))*100)+20*i4, lineRep[i4],this.recievedConfig).setOrigin(0);
                }*///get out of loop and wait
                this.replied = false;
                this.lastMsgWasRecieved = true;
                this.convoMsgs.push(txt);
            }else if(msg.type() == 'sent' && this.lastMsgWasRecieved){
                if(game.quitters >= 1){
                    this.timer = this.time.delayedCall(5000, () => {
                        this.scene.remove("musicPlayerScene");
                        this.scene.remove("pdfScene");
                        this.scene.start("endScene");
                    }, null, this);
                }
                this.options = [msg];
                reachedSent = true;
            }else if(msg.type() == 'sentOpts' && this.lastMsgWasRecieved){
                if(game.quitters >= 2){
                    this.timer = this.time.delayedCall(500, () => {
                        this.scene.remove("musicPlayerScene");
                        this.scene.remove("pdfScene");
                        this.scene.start("endScene");
                    }, null, this);
                }
                this.currOptionsIndex = num;
                this.options = msg.options;
                this.currSentOpts = msg;
                reachedSent = true;
            }
            if(num == game.people.mHist[this.convoIndex].messages.length){
                reachedSent = true;
            }
            num++;

        }
        
        if(this.options.length == 0){
            this.textArea.alpha = 0;
        }
    }
    convoHeight(textArray){
        let convoHeight=0;
        for(var a=0;a<textArray.length;a++){
            convoHeight += this.getHeight(textArray[a]);
        }
        //console.log(convoHeight);
        return convoHeight;


    }
    getHeight(text){
        let word=this.add.text(0,0, text, this.recievedConfig).setVisible(0).updateText();
        let lines=word.getWrappedText().length;
        /*let big=word.getWrappedText().length;
        //console.log('big=', big);
        //this.tall.destroy(false);
        for(let i=0;i<big;i++){
            //console.log(lines[i]);
        }*/
        
        return lines;


    }
}