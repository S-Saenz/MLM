class Recieved{
    constructor(msg) {
        this.txtArr = msg;
    }

    type(){
        return 'recieved';
    }

    length(){
        var num = 0;
        this.txtArr.forEach(txt => {
            num += txt.length;
        });
        return num/500;
    }


}