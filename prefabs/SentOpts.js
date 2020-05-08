class SentOpts{
    constructor(options) {
        this.options = options;
        this.chosen = false;
        this.choice;

    }

    choose(choice){
        this.chosen = true;
        this.choice = choice;

    }

    type(){
        return 'sentOpts';
    }

}