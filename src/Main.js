
let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    backgroundColor: '#FFF',
    scene: [ Messenger ]
}
let game = new Phaser.Game(config);
game.people = {
    names: ['Jonathan','Tyler','Apryl','Sam','Alex'],
    aquired: [true,true,true,true,true]
}
game.mHistory = {
    p0: ['hey','hey'],
    p1: ['hey','hi'],
    p2: ['sup','who are you?'],
    p3: ['hello','hi'],
    p4: ['its nice to hear from you!','oh sorry wrong person']
}
game.mHistoryWho = {
    jonathan: [0,1],
    tyler: [0,1],
    apryl: [1,0],
    sam: [0,1],
    alex: [1,1]
}
