class SentOpts{
    constructor(options) {
        this.options = options;
        this.chosen = false;
        this.choice;

    }

    choose(choice){
        if(!this.chosen){
            choice.onSelect();
            this.choice = choice;
            this.chosen = true;
            console.log('choose ' + choice.txt);
        }

    }

    type(){
        return 'sentOpts';
    }

}