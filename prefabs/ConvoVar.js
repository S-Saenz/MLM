/** @type {import("../typings/phaser")} */

class ConvoVar{
    constructor(str,stopped) {
        this.txt = str;
        this.stopPoint=stopped||false;
    }

    set(str){
        this.txt = str;
    }

    print(){
        console.log()
    }
    type(){
        return 'convoVar';
    }



}