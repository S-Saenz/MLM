class SentOpts{
    constructor(options) {
        this.options = options;
        this.chosen = false;
        this.choice = 'none';

    }

    choose(choice){
        this.chosen = true;
        this.choice = choice;

    }

    type(){
        return 'sentOpts';
    }

}