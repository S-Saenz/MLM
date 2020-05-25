
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 650,
    backgroundColor: '#FFF',
    scene: [ MusicPlayer, Messenger,  Pdf, End ]
}
let game = new Phaser.Game(config);
game.audio = false;
game.musicPlay = false;


//Betty's convoVars
game.convo0Vars = {
    likesSpiders: new ConvoVar('Yeah I love the cute little webs she makes in the corner of the house!'),
    spiderResponse: new ConvoVar('Oh thats great!  I know spiders can be a hard pet to take care of, so I think my offer could really help you!'),
    recruitResponse: new ConvoVar('Oh dear, a loan?  Im not sure if Im allowed to yet, since last time I took out a loan my kids got mad at me for buying adorable little shoes for my family members.  But I think after hearing about your product theyll let me!'),
    formal: new ConvoVar('formal'),
    uniqueResponse: new ConvoVar('thats dumb')
}
//brett
game.convo1Vars = {
    formal: new ConvoVar('formal'),
    uniqueResponse: new ConvoVar('thats dumb')
}

game.fullConvos = {
    p0: new Convo([
            new SentMsg(['Hey Betty! How’s it goin hun? I haven’t seen you in soooo long! I love all your cute animal pictures!  I just wanted to reach out to you because I have a business with MLM and was hoping to let you in on it! I know it can be hard to support all those pets, but MLM makes it sooo much easier to make cash quicker than anyone else! You get to sell amazing products from the comfort of your own home! I think you would really rock at this! I love to share some more information with you if you’re interested?'],[],[],0),
            new Recieved(['Oh thanks dear, I just love cute animals!  I just added a new member to the family recently too!  Her name is Mittens and I love her to bits!']),
            new SentOpts( [
                new SentMsg(
                    ['Oh yeah congrats!  Well with that new pet you could really benefit from selling our products! Are you interested?'],
                    [game.convo0Vars.likesSpiders,game.convo0Vars.spiderResponse],
                    ['Yeah I love the cute little webs she makes in the corner of the house!' , 'Oh thats great!  I know spiders can be a hard pet to take care of, so I think my offer could really help you!'],
                    1
                    ), 
                new SentMsg(
                    ['Thats great!  I love cats too!'],
                    [game.convo0Vars.likesSpiders,game.convo0Vars.spiderResponse],
                    ['Cats?  Well, im glad you like them so that they get housing somewhere, but theres certainly no cats in my house.  At least I dearly hope so, because Im deathly allergic.' , 'Oh, Im sorry for assuming what pets you had!  Although I do know that no matter what kind of animal you have they certainly are a hassle to take care of, so I think my offer could really help you!'], 
                    -1
                    )
                ] ), 
            new Recieved([game.convo0Vars.likesSpiders]), 
            new SentMsg([game.convo0Vars.spiderResponse],[],[], 0), 
            new Recieved(['Oh dear, I don’t know.  What is the product?']),
            new SentMsg(['Our company sells many different potions and charms to help keep you and your little friends healthy!  And our beginners kit is only $500!'],[],[], 0), 
            new Recieved(['Oh that sounds great!  Although I don’t know if I have the money for it right now because I’m supposed to send my grandchildren their birthday money.']),
            new SentOpts( [
                new SentMsg(
                    ['Oh I have a great idea!  If you buy our kit instead, you could make not only the money to give your grandchildren, but have so much more to take care of yourself and your pets!  It won’t take too long, I’m sure they can wait!'],
                    [game.convo0Vars.recruitResponse],
                    ['Well they sure should be able to,  I know Abbys really good at waiting!  Shes waiting for me to finish texting so I can give her a belly rub!  Its so cute to see them on their backs waiting for you to pet them!' ],
                    1
                    ), 
                new SentMsg(
                    ['Oh I know!  What if you got them some of our great products instead!  I can guarantee that they’d love it!  And for such a nice gift for their birthday, I’d be willing to give you 40% off!  How’s that sound?'],
                    [game.convo0Vars.recruitResponse],
                    ['Oh dear that sounds wonderful!  I cant turn down an deal like that!  Especially if it finally gets my daughter to stop pestering me about gifts.' ],
                    1
                    ), 
                new SentMsg(
                    ['Oh well I know a great place to take out a loan!  Then you could pay your grandchildren, and start making money with our company!'],
                    [game.convo0Vars.recruitResponse],
                    ['Oh dear, a loan?  Im not sure if Im allowed to yet, since last time I took out a loan my kids got mad at me for buying adorable little shoes for my family members.  But I think after hearing about your product theyll let me!'], 
                    -1
                    )
                ] ),
            new Recieved([game.convo0Vars.recruitResponse]) 

        ]),
    p1: new Convo([new Recieved(['hiya']), 
            new SentOpts( [new SentMsg(['good evening'],[game.convo1Vars.formal,game.convo1Vars.uniqueResponse],['weird','thats interesting I guess'], 1), new SentMsg(['hella hi'],[game.convo1Vars.formal,game.convo1Vars.uniqueResponse],['dumb','I hate you and your dumb face'], -1)]), 
            new Recieved(['wow youre very ', game.convo1Vars.formal]), 
            new SentMsg(['Yes, I’m quite unique'],[],[], 0), 
            new Recieved([game.convo1Vars.uniqueResponse])
    ])
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
game.ppl = [new Person('Brett',game.fullConvos.p0, 1,true), new Person('Jamie',game.fullConvos.p1, 1,true)];

game.playlist = [new Song('Faith and Company','Roadside Worship','Wait, There is More','albumCover1'),
                new Song('Essential Toils','First Stone','Multiple Levels of Love','albumCover2'),
                new Song('Marketing Mindfulness','A Sale on Salvation','Door to Door Deliverance','albumCover3')];

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