/** @type {import("../typings/phaser")} */


class Recieved{
    constructor(msg,stopped,convoEnd) {
        this.txtArr = msg;
        this.stopPoint=stopped||false;
        this.convoEx=convoEnd||false;
    }

    type(){
        return 'recieved';
    }

    length(){
        var num = 0;
        this.txtArr.forEach(txt => {
            num += txt.length;
        });
        return num;
    }


}