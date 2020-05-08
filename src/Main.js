
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    backgroundColor: '#FFF',
    scene: [ Messenger ]
}
let game = new Phaser.Game(config);

game.formal = 'formal';
game.uniqueResponse = 'thats dumb';

game.fullConvos = {
    p0: new Convo([new Recieved('hi'), 
            new SentOpts( [new SentMsg('hello',[game.formal],['formal']), new SentMsg('sup',[game.formal],['casual'])] ), 
            new Recieved('wow youre very '+game.formal), 
            new SentMsg('Yes, I’m quite unique',[],[]), 
            new Recieved(game.uniqueResponse)],[]),
    p1: new Convo([new Recieved('hiya'), 
            new SentOpts( [new SentMsg('hello',[game.formal],['formal']), new SentMsg('sup',[game.formal],['casual'])] ), 
            new Recieved('wow youre very '+game.formal), 
            new SentMsg('Yes, I’m quite unique',[],[]), 
            new Recieved(game.uniqueResponse)],[])
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


/*
‘hi’
‘hello’
‘wow you’re very formal’
‘Yes, I’m quite unique’
‘thats dumb’
*/