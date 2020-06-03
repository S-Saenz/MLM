/** @type {import("../../typings/phaser")} */

class Messenger extends Phaser.Scene {
    constructor(){
        super("messengerScene");
    }
    
    preload() {

        //load music Scene
        this.load.sceneFile('musicPlayerScene', './MusicPlayer.js');
        //load PDF Scene
        //this.load.sceneFile('pdfScene','./Pdf.js');

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
        //launch PDF Scene
        /* this.scene.launch('pdfScene');
        this.scene.bringToTop('pdfScene'); */
        this.pdf=this.scene.get('pdfScene');
        //launch MusicPlayer Scene
        this.scene.launch('musicPlayerScene');
        this.scene.sendToBack('musicPlayerScene');
        this.music=this.scene.get('musicPlayerScene');
        //launch Scroller Scene
        this.scene.launch('scrollerScene');
        this.scene.moveAbove('messengerScene','scrollerScene');
        //scroller scene variable
        this.scroller=this.scene.get('scrollerScene');
        //launch Chat Scene
        this.scene.launch('chatScene');
        this.scene.moveAbove('scrollerScene','chatScene');
        //Chat Scene Variable
        this.chat=this.scene.get('chatScene');
        //launch Options Scene
        this.scene.launch('optionScene');
        this.scene.moveAbove('chatScene','optionScene');
        //Options Scene Variable
        this.optionScene=this.scene.get('optionScene');

        this.replied = false;
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;
        this.sentConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '25px',
            color: '#D5558B',
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
            fontSize: '25px',
            color: '#AA3939',
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

        //flag to prevent game from continuing without player interaction
        this.playerTalk=true;
        
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
        //this.music.lockInteractives();

        //=============================== set interactive ===========================================

        //text area is the part where you type your message at the bottom of messenger
        this.textArea.setInteractive();
        this.textArea.on('pointerdown', () => { 
            this.sound.play('click2SFX');
            //this.playerTalk=true;
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
                this.lockInteractives;
                if(this.tabLinks[this.tabs.indexOf(tab)]=='musicPlayerScene'){
                    this.music.unlockInteractives();
                }else if(this.tabLinks[this.tabs.indexOf(tab)]=='pdfScene'){
                    this.pdf.unlockInteractives();
                }
                
            });
    
            tab.on('pointerover', () => { 
                this.sound.play('hover4SFX');
                tab.setTexture('tabHover');
                //console.log(this.scene.getIndex('messengerScene'));
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
                    this.scene.moveAbove('scrollerScene','chatScene');

                    this.loadConvo(this.convoIndex);
                    //this.postMessages(this.convoIndex);
                    this.textArea.setInteractive();
                }
                this.displayName.text = tab.text;
                this.displayIcon.setTexture(tab.text);
                this.textArea.alpha = 1;
                this.playerTalk=false;
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
        this.scrollBarLoaded=false;
        this.lockInteractives();
    }
    
    update() {
    }

    lockInteractives(){
        this.textArea.disableInteractive();
        this.optionsBoxes.forEach(optionBox => {
            optionBox.disableInteractive();
        });
        this.convoTabs.forEach(tab =>{
            tab.disableInteractive();
        });
        if(this.scrollBarLoaded){
            this.scroller.scrollBarDisable();
            scrollBarLoaded=true;
        }
    }
    unlockInteractives(){
        this.textArea.setInteractive();
        this.optionsBoxes.forEach(optionBox => {
            optionBox.setInteractive();
        });
        this.convoTabs.forEach(tab =>{
            tab.setInteractive();
        });
        //this.scroller.scrollBarEnable();

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
            console.log('we innest');
            game.people.mHist[this.convoIndex].messages[this.currOptionsIndex].choose(game.people.mHist[this.convoIndex].messages[this.currOptionsIndex].options[optionIndex]);
            //increase conversation height
            //game.people.mHist[this.convoIndex].longer(tall*30);
            //console.log(game.people.mHist[this.convoIndex].height);
        }
        console.log('we out');
        game.ppl[this.convoIndex].trust += this.options[optionIndex].effect;
        if(game.ppl[this.convoIndex].trust == 0){
            game.quitters++;
            game.ppl[this.convoIndex].trust--;
        }

        if(this.playerTalk){
            game.people.mHist[this.convoIndex].prog++;
        }
    
        this.textArea.setInteractive();
        this.loadConvo(this.convoIndex);

    }

    initializeOptionButtons(){
        
        var num = 0;
        this.optionsBoxes.forEach(optionBox => {
            optionBox.setInteractive();
            //if over optionBox
            console.log('we inner');
            optionBox.on('pointerdown', () => { 
                this.sound.play('click2SFX');
                console.log('we innerer');
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
        this.scene.bringToTop('optionScene');
        var num = 0;
        //console.log(options);
        let optsTxt=[];
        this.textArea.disableInteractive();
        for(var o=0; o<options.length;o++){
            optsTxt.push(this.extractMsg(options[o]));
        }
        //console.log(optsTxt);
        let optsTower=this.convoHeight(optsTxt)*34;
        let ceiling=optsTower;

        options.forEach(option => {
            let decisions=this.getHeight(this.extractMsg(option));
            this.optionsBoxes.push(
                this.optionScene.displayOptionsBox(this.textArea.x,this.textArea.y-(20*options.length+ceiling+50-34*decisions),'typeArea', 1, 1, 700, decisions*34)
            );
            this.optionsTxt.push(
                this.optionScene.displayOptionsText(this.textArea.x,this.textArea.y-(20*options.length+ceiling+50-34*decisions),this.extractMsg(option),this.sentConfig, 1, 1)
            );
            ceiling-=(decisions*34+20);
            //console.log(this.sen);
            num++;
        });
        console.log('we in');
        this.playerTalk=true;
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
        //places current messages into an array
        num=this.postMessages(num,convoIndex);

        //convo draw function end
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
                console.log('convoProg');
                if(this.playerTalk){
                    game.people.mHist[this.convoIndex].prog++;
                }
                var message = this.extractMsg(msg);
                //var lineRep=this.getHeight(message);
                //game.people.mHist[this.convoIndex].longer(/*20+*/this.getHeight(message)*34);
                //console.log('roofPreRep',roof);
                //roof+=(/*20+*/this.getHeight(message)*34);//reset roof
                //insert convo draw function here
                this.convoMsgs.forEach(msg => {
                    msg.destroy();
                });
                var trash=this.postMessages(num,convoIndex);
                trash=0;
                //var txt = this.chat.chatDisplay(this.msgX-(game.config.width/1.3),this.msgStart-((roof-(this.getHeight(message)*34))), message,this.recievedConfig,0,0);
                //roof-=(this.getHeight(message)*34);
                //console.log('roofPostRep',roof);
                /*for(var i4=0;i4<lineRep.length;i4++){
                    var txt = this.add.text(this.msgX-(game.config.width/1.3),this.msgStart-(((game.people.mHist[this.convoIndex].prog+20*i4) - (num+20*i4))*100)+20*i4, lineRep[i4],this.recievedConfig).setOrigin(0);
                }*///get out of loop and wait
                this.replied = false;
                this.lastMsgWasRecieved = true;
                //this.convoMsgs.push(txt);
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

    postMessages(num,convoIndex){
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
        //gets height of all the messages in the array based on message style config
        let height=this.convoHeight(msgs);
        //sets height of the convo the messages are from
        game.people.mHist[convoIndex].setHeight(height*34);
        //temp/manipulatable varible for convo height
        var roof=game.people.mHist[convoIndex].heightChecker();
        //convo draw function begin
        for(num = 0; num <= game.people.mHist[convoIndex].prog-1; num++){
            var prog = game.people.mHist[convoIndex].prog;
            var msg = game.people.mHist[convoIndex].messages[num];

            if(msg.type() == 'recieved'){
                var message = this.extractMsg(msg);
                
                var txt = this.chat.chatDisplay(this.msgX-(game.config.width/1.3),this.msgStart-(roof - (this.getHeight(message)*34)), message,this.recievedConfig,0,1);
                roof-=(/*20+*/this.getHeight(message)*34);

            }else if(msg.type() == 'sent'){
                var txt = this.chat.chatDisplay(this.msgX,this.msgStart-(roof - (this.getHeight(this.extractMsg(msg))*34)),this.extractMsg(msg),this.sentConfig, 1,1);
                roof-=(/*20+*/this.getHeight(this.extractMsg(msg))*34);
                
            }else if(msg.type() == 'sentOpts'){
                var txt = this.chat.chatDisplay(this.msgX,this.msgStart-(roof - (this.getHeight(this.extractMsg(msg.choice))*34)/*-10*/), this.extractMsg(msg.choice),this.sentConfig,1,1);
                roof-=((/*20+*/this.getHeight(this.extractMsg(msg.choice))*34));
                
            }
            this.convoMsgs.push(txt);//return txt
        }

        return num;

    }
}


class Chat extends Phaser.Scene {
    constructor(){
        super("chatScene");
        
    }
    create(){
        this.camera=this.cameras.main.setViewport(223,153,737,449);
        this.messenger=this.scene.get("messengerScene");
        this.scroller=this.scene.get("scrollerScene");
        this.mover=this.scroller.scrollBarHeight;
        this.cHeight;
    }
    
    
    
    scrollHistory(scrollerheight){
        

        this.camera.scrollY=(-(this.cHeight*((602-scrollerheight))/602));
        //this.scrollBar.setScrollFactor(1);
        //console.log('scrollbar x,y ',this.scrollBar.x,this.scrollBar.y);

    }
    update(){
        //console.log(this.cHeight);
        /* if(this.cHeight>449){
            this.camera.setScroll(this.camera.originX,(this.cHeight*(this.mover/449)));
        } */
        
        //this.cHeight=game.people.mHist[this.messenger.convoIndex].heightChecker();
        if(this.cHeight>449){
            //console.log('scrollbar x,y ',this.scrollBar.x,this.scrollBar.y);
            
            
        }


    }

 
    chatDisplay(xPos, yPos, post, style, originX, originY){

        this.text=this.add.text(xPos-223, yPos, post, style).setOrigin(originX,originY);
        this.cHeight=game.people.mHist[this.messenger.convoIndex].heightChecker();
        this.text.setScrollFactor(1);
        if(this.cHeight<449){
            this.scroller.scrollBarSpawn()
        }
        if(this.cHeight>=449){
            this.scroller.scrollBarScale(this.cHeight);
        }
        
        //console.log('called');
        return this.text;
        
    }
    
}

class Options extends Phaser.Scene {
    constructor(){
        super("optionScene");       
    }

    displayOptionsBox(xPos, yPos, pic, xOrigin, yOrigin, width, height){
       this.boxes=this.add.image(xPos, yPos, pic).setOrigin(xOrigin,yOrigin).setDisplaySize(width,height);
       return this.boxes
    }
    displayOptionsText(xPos, yPos, text, style, xOrigin, yOrigin){
       this.options=this.add.text(xPos, yPos, text, style).setOrigin(xOrigin, yOrigin);
       return this.options
    }
}

class Scroll extends Phaser.Scene {
    constructor(){
        super("scrollerScene")
    }
    preload(){
        this.load.image('scrollBar','././assets/scrollBar.png');
    }
    create(){
        //this.camera=this.cameras.main.setViewport(223,153,737,449);
        
        var scrollBar=this.add.image(954,602,'scrollBar').setScale(1, 449/244).setOrigin(0.5,1).setVisible(0);
        scrollBar.setInteractive();
        this.input.setDraggable(scrollBar);
        this.input.on('drag', function(pointer,gameObject,dragX,dragY){
            dragY=Phaser.Math.Clamp(dragY, 153+(gameObject.y-gameObject.getTopCenter().y),602);
            gameObject.setPosition(954,dragY);
        });
        this.scrollBar=scrollBar;
        this.scrollHigh;
        this.chat=this.scene.get('chatScene');
        
        //this.input.on('pointerdown',this.startDrag,this);


        //this.scene.sendToBack("chatScene");
        //this.messenger=this.scene.get("messengerScene");
        
        //this.cHeight=game.people.mHist[this.messenger.convoIndex].heightChecker();
        
        //console.log('topCenter',this.scrollBar.getTopCenter());



       
       this.scrollBarDisable(); 
    }
    scrollBarScale(cHeight){

        this.scrollBar.setVisible(true);
        this.scrollBar.setInteractive();
        this.scrollBar.setScale(1,449/cHeight);

     
    }
    scrollBarSpawn(){
        this.scrollBar.setVisible(false);
        this.scrollBar.setPosition(954,602);
    }
    scrollBarDisable(){
        this.scrollBar.disableInteractive();
    }
    scrollBarEnable(){
        this.scrollBar.setInteractive();
    }
    update(){

        this.scrollHigh=this.scrollBar.y/*+this.scrollBar.displayHeight*/;
        this.try=this.chat.scrollHistory(this.scrollHigh);
    }


}