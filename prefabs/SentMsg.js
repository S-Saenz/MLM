class SentMsg{
    constructor(msg,changeVars,changeVarsTo) {
        this.msg = msg;
        this.changeVars = changeVars;
        this.changeVarsTo = changeVarsTo;
        var num = 0;
        changeVars.forEach(varr => {
            varr.set(this.changeVarsTo[num])
            num++;
        });

    }



}