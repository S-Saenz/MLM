class SentMsg{
    constructor(msg,changeVars,changeVarsTo) {
        this.msg = msg;
        this.changeVars = changeVars;
        this.changeVarsTo = changeVarsTo;
        var num = 0;
        this.changeVars.forEach(varr => {
            varr = this.changeVarsTo[num]
            num++;
        });

    }



}