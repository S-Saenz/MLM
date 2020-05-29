/** @type {import("../typings/phaser")} */

class Convo{
    constructor(messages) {
        this.messages = messages;
        this.prog = 0;
        //Conversation total height
        this.height=0;
    }

    //sets conversation's total height
    setHeight(convoHeight){
        
        this.height=convoHeight;
        console.log(this.heightChecker());
        //console.log(height);
    }
    //adds to conversation's total height
    longer(messageHeight){
        this.height+=messageHeight;
    }
    //gets height of convo
    heightChecker(){
        //console.log('heightChecker',this.height);
        return this.height;
    }

}