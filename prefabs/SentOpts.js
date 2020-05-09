class SentOpts{
    constructor(options) {
        this.options = options;
        this.chosen = false;
        this.choice;

    }

    choose(choice){
        this.chosen = true;
        this.choice = choice;
        choice.onSelect();
        console.log('choose ' + choice.txt);

    }

    type(){
        return 'sentOpts';
    }

}