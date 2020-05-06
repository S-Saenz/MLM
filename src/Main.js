
let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    backgroundColor: '#FFF',
    scene: [ Messenger ]
}
let game = new Phaser.Game(config);
game.mHistory = {
    p0: ['hey','hey'],
    p1: ['hey','hi'],
    p2: ['sup','who are you?'],
    p3: ['hello','hi'],
    p4: ['its nice to hear from you!','oh sorry wrong person']
}
game.mHistoryWho = {
    p0: [0,1],
    p1: [0,1],
    p2: [1,0],
    p3: [0,1],
    p4: [1,1]
}
game.people = {
    names: ['Jonathan','Tyler','Apryl','Sam','Alex'],
    aquired: [true,true,true,true,true],
    mHist: [game.mHistory.p0,game.mHistory.p1,game.mHistory.p2,game.mHistory.p3,game.mHistory.p4],
    mHistWho: [game.mHistoryWho.p0,game.mHistoryWho.p1,game.mHistoryWho.p2,game.mHistoryWho.p3,game.mHistoryWho.p4]
}
