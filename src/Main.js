/** @type {import("../typings/phaser")} */

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 650,
    backgroundColor: '#FFF',
    scene: [ Start, Messenger, Chat, Options, MusicPlayer, Pdf, End ]
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

game.convo2Vars = {
    amountResp: new ConvoVar("Bro, that's like hella cash, but that's not enough.  I need to show my followers that I could purchase their lives.  They may think life is priceless, but I've got enough money to pay for even that, bro!  my watch is probably worth more than your house"),
    soRichResp1: new ConvoVar("Well, you could buy multiple beginners kits!  Then not only are you showing your wealth but also show off our products even more!  It's a win-win for both of us!"),
    imIn: new ConvoVar("Woahhh dude, that’s like, expensive expensive.  That’s like, if-I-buy-it-I’ll-look-even-richer expensive.  I’m in dude.  I can show my facebook fans how awesomely rich and handsome I am, and you guys will get like, hella exposure.  Two birds with one stone, or whatever"),
}

game.fullConvos = {
    p0: new Convo([
            new Recieved(["Hey Ctharen!  I’ve heard from Joe that you’ve been showing interest in climbing the ranks of our little company here!"]),
            new SentMsg(["That’s right, but who’s Joe?"],[],[],0),
            new Recieved(["Unimportant.  Anyways, that’s great!  I’ve always prided myself in being the first being to climb from the bottom of this company all the way to the top, much like my brethren swimming upstream to fulfill their life’s goals."]),
            new Recieved(["And just like my brethren, now that I have reached the top, I will inevitably die in the next few weeks and thus I’m looking for a worthy successor."]),
            new SentMsg(["I’m honored you would consider me!"]),
            new Recieved(["of course, I can’t just blindly hand over the company to someone I just met, so you must prove to me you’re able to handle being in a position of authority."]),
            new Recieved(["As such, I am placing you in charge of our company in the (area in the game) area.  Those people there are well known for being a… unique bunch, so make sure you choose your words carefully when getting and keeping them on our side. "]),
            new Recieved(["They love using (Facebook replacement) over there, so why not contact them using that?  I’m sure they’ll respond to you pretty quickly."]),
            new Recieved(["Oh and make sure you don’t end up having no allies in that area, you don’t wanna end up like the last guy that was in your position."]),
            new SentMsg(["What happened to them?"]),
            new Recieved(["Well had I known that I wouldn’t have hired a private investigator.  Anyways, good luck!  If you end up with enough people working under you, I think you’d make a fine CEO!"]),

        ]),


    p1: new Convo([
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


    p2: new Convo([
            new SentMsg(["Hey Brett! How’s it goin man? I haven’t seen you in soooo long! You look like you’ve been partying a lot recently!  That sounds like so much fun!  I just wanted to reach out to you because I work with MLM and was hoping to let you in on it! I know it can be hard to pay for all those parties, but MLM makes it sooo much easier to make cash quick than anyone else! You get to sell amazing products from the comfort of your own home! I think you would really rock at this! I’d love to share some more information with you if you’re interested?"]),
            new Recieved(["How much?"]), 
            new SentOpts( 
                [new SentMsg(
                    ["for what?"],
                    [],
                    [], 1
                    ), 
                new SentMsg(
                    ["excuse me?"],
                    [],
                    [], -1
                    )]
                ), 
            new Recieved(["for the products, bro!  How much do I have to pay for them?"]), 
            new SentOpts( 
                [new SentMsg(
                    ["Oh it’s not much, especially when compared to the money you’ll make selling them! :P"],
                    [game.convo2Vars.amountResp, game.convo2Vars.soRichResp1],
                    ["Dude, have you seen my Facebook?  I’m rich AF bro.  My watch is probably worth more than your entire career", "Well, our beginner’s kit is around $500"], 1
                    ), 
                new SentMsg(
                    ["Well, our beginner’s kit is around $500"],
                    [],
                    [], -1
                    )]
                ),  
            new Recieved([game.convo2Vars.amountResp]),
            new SentMsg(["That's nice"],[],[],0),
            new Recieved(["The guy who sold it to me said that it was the only one in existence.  He said he was gonna give me a discount just cause I look like a good guy, but since I’m such a good (and rich) dude I made him sell it to me for the full price"]),
            new Recieved(["Anyways what I’m trying to say is that I’m so totally rich I could probably purchase your entire family, so I need to spend more than what most people could even dream of paying"]), 
            new SentOpts( 
                [new SentMsg(
                    [game.convo2Vars.soRichResp1],
                    [],
                    [], 1
                    ), 
                new SentMsg(
                    ["Well if you're so focused on the price I can give you a massive discount on it, how's 40% off of $500 sound?"],
                    [game.imIn],
                    ["Bro.  Did you just offer me a discount?"], -1
                    )]
                ),  
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
    names: ['Boss','Betty','Brett','Jamie','Sam','Alex'],
    aquired: [true,true,false,false,false],
    mHist: [game.fullConvos.p0,game.fullConvos.p1,game.fullConvos.p2,/*game.mHistory.p3,game.mHistory.p4*/]
}
game.ppl = [new Person('Boss',game.fullConvos.p0, 1,true), new Person('Betty',game.fullConvos.p1, 1,true), new Person('Brett',game.fullConvos.p2, 1,true)];

game.playlist = [new Song('Faith and Company','Roadside Worship','Wait, There is More','albumCover1'),
                new Song('Essential Toils','First Stone','Multiple Levels of Love','albumCover2'),
                new Song('Marketing Mindfulness','A Sale on Salvation','Door to Door Deliverance','albumCover3')];

game.currSong;
//how many people have quit
game.quitters = 0;