class SentMsg{
    constructor(msg,changeVars,changeVarsTo,effect) {
        this.effect = effect;
        this.txtArr = msg;
        this.changeVars = changeVars;
        this.changeVarsTo = changeVarsTo;
        this.chosen = false;

    }

    onSelect(){
        var num = 0;
        this.changeVars.forEach(varr => {
            varr.set(this.changeVarsTo[num])
            num++;
        });
    }

    type(){
        return 'sent';
    }
    
    length(){
        var num = 0;
        this.txtArr.forEach(txt => {
            num += txt.length;
        });
        return num/500;
    }


}