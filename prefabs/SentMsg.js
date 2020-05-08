class SentMsg{
    constructor(msg,changeVars,changeVarsTo) {
        this.txt = msg;
        this.changeVars = changeVars;
        this.changeVarsTo = changeVarsTo;

    }

    onSelect(){
        var num = 0;
        changeVars.forEach(varr => {
            varr.set(this.changeVarsTo[num])
            num++;
        });
    }

    type(){
        return 'sent';
    }


}