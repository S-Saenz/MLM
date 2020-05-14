
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 650,
    backgroundColor: '#FFF',
    scene: [ Messenger, MusicPlayer, End ]
}
let game = new Phaser.Game(config);
game.audio = false;
game.musicPlay = false;

game.formal = new ConvoVar('formal');
game.uniqueResponse = new ConvoVar('thats dumb');

game.convo0Vars = {
    formal: new ConvoVar('formal'),
    uniqueResponse: new ConvoVar('thats dumb')
}
game.convo1Vars = {
    formal: new ConvoVar('formal'),
    uniqueResponse: new ConvoVar('thats dumb')
}

game.fullConvos = {
    p0: new Convo([new Recieved(['hi']), 
            new SentOpts( [new SentMsg('hello',[game.convo0Vars.formal],['formal'], -1), new SentMsg('sup',[game.convo0Vars.formal,game.convo0Vars.uniqueResponse],['casual','thats cool'], 1)] ), 
            new Recieved(['wow youre very ', game.convo0Vars.formal]), 
            new SentMsg('Yes, I’m quite unique',[],[], 0), 
            new Recieved([game.convo0Vars.uniqueResponse])],[game.formal,game.uniqueResponse]),
    p1: new Convo([new Recieved(['hiya']), 
            new SentOpts( [new SentMsg('good evening',[game.convo1Vars.formal,game.convo1Vars.uniqueResponse],['weird','thats interesting I guess'], 1), new SentMsg('hella hi',[game.convo1Vars.formal,game.convo1Vars.uniqueResponse],['dumb','I hate you and your dumb face'], -1)]), 
            new Recieved(['wow youre very ', game.convo1Vars.formal]), 
            new SentMsg('Yes, I’m quite unique',[],[], 0), 
            new Recieved([game.convo1Vars.uniqueResponse])],[game.formal,game.uniqueResponse])
}
game.mHistory = {
    p0: [new SentMsg('hi',[],[]), 
    new SentOpts( [new SentMsg('hello',[game.formal],['formal']), new SentMsg('sup',[game.formal],['casual'])]), 
    new SentMsg('wow youre very '+game.formal ,[],[]), 
    new SentMsg('Yes, I’m quite unique',[],[]), 
    new SentMsg(game.uniqueResponse,[],[])],
    p1: ['hey','hi'],
    p2: ['sup','who are you?'],
    p3: ['hello','hi'],
    p4: ['its nice to hear from you!','oh sorry wrong person']
}

//0 = sent by player
//1 = recieved by player(sent by character)
game.mHistoryWho = {
    p0: [0,1,0,1,0],
    p1: [0,1],
    p2: [1,0],
    p3: [0,1],
    p4: [1,1]
}
game.people = {
    names: ['Brett','Jamie','Betty','Sam','Alex'],
    aquired: [true,true,false,false,false],
    mHist: [game.fullConvos.p0,game.fullConvos.p1/*,game.mHistory.p2,game.mHistory.p3,game.mHistory.p4*/]
}
game.ppl = [new Person('Brett',game.fullConvos.p0, 1), new Person('Jamie',game.fullConvos.p1, 1)];

game.playlist = [new Song('Faith and Company','Roadside Worship','Wait, There is More'),
                new Song('Essential Toils','First Stone','Multiple Levels of Love'),
                new Song('Marketing Mindfulness','A Sale on Salvation','Door to Door Deliverance')];

game.currSong;
//how many people have quit
game.quitters = 0;
/*
‘hi’
‘hello’
‘wow you’re very formal’
‘Yes, I’m quite unique’
‘thats dumb’
*/