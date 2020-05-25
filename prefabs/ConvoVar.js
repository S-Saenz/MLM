/** @type {import("../typings/phaser")} */

class ConvoVar{
    constructor(str) {
        this.txt = str;
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