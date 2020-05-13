
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 650,
    backgroundColor: '#FFF',
    scene: [ MusicPlayer, Messenger ]
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
game.convo0Vars = {
    formal: new ConvoVar('formal'),
    uniqueResponse: new ConvoVar('thats dumb')
}

game.fullConvos = {
    p0: new Convo([new Recieved(['hi']), 
            new SentOpts( [new SentMsg('hello',[game.convo0Vars.formal],['formal'], -1), new SentMsg('sup',[game.convo0Vars.formal],['casual'], 1)] ), 
            new Recieved(['wow youre very ', game.convo0Vars.formal]), 
            new SentMsg('Yes, I’m quite unique',[],[], 0), 
            new Recieved([game.convo0Vars.uniqueResponse])],[game.formal,game.uniqueResponse]),
    p1: new Convo([new Recieved(['hiya']), 
            new SentOpts( [new SentMsg('good evening',[game.formal],['weird'], 1), new SentMsg('hella hi',[game.formal],['dumb'], -1)]), 
            new Recieved(['wow youre very ', game.formal]), 
            new SentMsg('Yes, I’m quite unique',[],[], 0), 
            new Recieved([game.uniqueResponse])],[game.formal,game.uniqueResponse])
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
    names: ['Jonathan','Tyler','Apryl','Sam','Alex'],
    aquired: [true,true,false,false,false],
    mHist: [game.fullConvos.p0,game.fullConvos.p1/*,game.mHistory.p2,game.mHistory.p3,game.mHistory.p4*/]
}

game.playlist = [new Song('Faith and Company','Roadside Worship','Wait, There is More'),
                new Song('Essential Toils','First Stone','Multiple Levels of Love'),
                new Song('Marketing Mindfulness','A Sale on Salvation','Door to Door Deliverance')];

game.currSong;
/*
‘hi’
‘hello’
‘wow you’re very formal’
‘Yes, I’m quite unique’
‘thats dumb’
*/