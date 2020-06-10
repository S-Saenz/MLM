/** @type {import("../typings/phaser")} */

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 650,
    backgroundColor: '#FFF',
    scene: [ Start, Messenger, Chat, Scroll, Options, MusicPlayer, Pdf, End ]
}
let game = new Phaser.Game(config);
game.audio = false;
game.musicPlay = false;


//Betty's convoVars
game.convo0Vars = {
    likesSpiders: new ConvoVar('Yeah I love the cute little webs she makes in the corner of the house!'),
    spiderResponse: new ConvoVar('Oh thats great!  I know spiders can be a hard pet to take care of, so I think my offer could really help you!'),
    recruitResponse: new ConvoVar('Oh dear, a loan?  Im not sure if Im allowed to yet, since last time I took out a loan my kids got mad at me for buying adorable little shoes for my family members.  But I think after hearing about your product theyll let me!'),
    deadAubrey: new ConvoVar('I’m sorry dear I want to believe you, but i’m not so sure anymore…'),
    deadAubreyFix: new ConvoVar('Trust me, I can promise that it won’t happen again,  I’ll even give you 40% off to try and make it up to you!'),
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
    richPositive1: new ConvoVar("Wooaahhh duuuude!  I didn't even THINK of that before bro!  You've convinced me man"),
    richPositive2: new ConvoVar("I'm goona spend so much money, people are gonna hate me so much they're gonna want to KILL me"),
    richPositive3: new ConvoVar("Which they obviously can't do because I'm already dead")
}

//Jamie
game.convo3Vars = {
    moneyTroubles: new ConvoVar("Well I'm not sure how much I like the idea of a loan... but I'll put my trust in you and see if this works out"),
    businessTroubles: new ConvoVar("I'm sorry, I just don't think I have that kind of money to spend right now, and I've already got enough debts to pay all while trying to take care of my baby... Sorry again, but I just don't think I'm able to do this anymore, I'm gonna have to stop working for MLM...")
}

//Boss
game.convo4Vars = {
    end1: new ConvoVar("It seems you weren’t able to keep the residents of the (area in game) area on our side."),
    end1Resp: new ConvoVar("Wait, how do you know that?  That just happened a second ago"),
    end2: new ConvoVar("HOW I know that is unimportant.  What is important is that I DO know."),
    end3: new ConvoVar("It seems I overestimated you.  And now that I’ve taken so much time in trusting you that my surprisingly short life is at its end.  I was going to hand over the company to you in my will, but since that didn’t work out now I have to give it to my jackass son in law Richard."),
    end4: new ConvoVar("Richard is an idiot."),
    end5: new ConvoVar("Anyways, I’m putting someone else in charge of the Kessuk area now, and as for you…"),
    end6: new ConvoVar("Do whatever, I don’t care."),
    end7: new ConvoVar("Actually, stay in MLM.  With your skills maybe you could end up bankrupting the company and screwing over Richard.")


}

game.fullConvos = {
    p0: new Convo([
            new Recieved(["Hey Ctharen!  I’ve heard from Joe that you’ve been showing interest in climbing the ranks of our little company here!"]),
            new SentMsg(["That’s right, but who’s Joe?"],[],[],0),
            new Recieved(["Unimportant.  Anyways, that’s great!  I’ve always prided myself in being the first being to climb from the bottom of this company all the way to the top, much like my brethren swimming upstream to fulfill their life’s goals."]),
            new Recieved(["And just like my brethren, now that I have reached the top, I will inevitably die in the next few weeks and thus I’m looking for a worthy successor."]),
            new SentMsg(["I’m honored you would consider me!"]),
            new Recieved(["of course, I can’t just blindly hand over the company to someone I just met, so you must prove to me you’re able to handle being in a position of authority."]),
            new Recieved(["As such, I am placing you in charge of our company in the Kessuk area.  Those people there are well known for being a… unique bunch, so make sure you choose your words carefully when getting and keeping them on our side. "]),
            new Recieved(["They love using Flutter over there, so why not contact them using that?  I’m sure they’ll respond to you pretty quickly."]),
            new Recieved(["Oh and make sure you don’t end up having no allies in that area, you don’t wanna end up like the last guy that was in your position."]),
            new SentMsg(["What happened to them?"]),
            new Recieved(["Well had I known that I wouldn’t have hired a private investigator.  Anyways, good luck!  If you end up with enough people working under you, I think you’d make a fine CEO!"],true,false),
            new Recieved([game.convo4Vars.end1]),
            new SentMsg([game.convo4Vars.end1Resp]),
            new Recieved([game.convo4Vars.end2]),
            new Recieved([game.convo4Vars.end3]),
            new Recieved([game.convo4Vars.end4]),
            new Recieved([game.convo4Vars.end5]),
            new Recieved([game.convo4Vars.end6]),
            new Recieved([game.convo4Vars.end7],true,true),

        ]),


    p1: new Convo([
            new SentMsg(['Hey Betty! How’s it goin hun? I haven’t seen you in soooo long! I love all your cute animal pictures!  I just wanted to reach out to you because I have a business with truMonster and was hoping to let you in on it! I know it can be hard to support all those pets, but truMonster makes it sooo much easier to make cash quicker than anyone else! You get to sell amazing products from the comfort of your own home! I think you would really rock at this! I love to share some more information with you if you’re interested?'],[],[],0),
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
                ]), 
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
                    0
                    ),
                new SentMsg(['Oh hey, how about this?  How about you go to an expo and sell some of your adorable animals?  I\'m sure they\'d love them, and after you make a lot of money with truMonster, then you can buy as many pets as you want!'],
                    [game.convo0Vars.recruitResponse],
                    ['I would NEVER sell my family members to those people!  I don\'t trust anyone else to care for my family members after what happened with my grandchildren!  One day I left them with my darling little Mr. Huggy, and the next moment they were tugging at his cute little tail and poking him all over the place!  It\'s not my fault they got sent to the hospital for a lack of oxygen!  Those kids just don\'t know how to treat my family members, just like YOU don\'t seem to understand!  It\'s clear your company doesn\'t love animals as much as I do!  Leave me and my family alone!'],
                    -100
                    )
                ]),
            new Recieved([game.convo0Vars.recruitResponse],true),
            new Recieved(['Hey dear,  I bought one of those enchantments you sell that keep animals healthy but even though I did everything the directions told me to do, Aubrey still got eaten by a snake!  Sure the snake was mine, but my precious Wiggles wouldn\'t hurt a fly!  She only eats mammals!']),
            new Recieved(['I’m starting to worry that your products aren’t as good as you say they are!']),
            new SentOpts( [
                new SentMsg(
                    ['Oh my god I’m so sorry Betty!  I can assure you there must’ve been a defect on our side!'],
                    [game.convo0Vars.deadAubrey],
                    ['I’m sorry dear I want to believe you, but i’m not so sure anymore…'],
                    0
                    ), 
                new SentMsg(
                    ['Betty, I’m sorry but the reason she died wasn’t our fault if they were eaten by another animal'],
                    [game.convo0Vars.deadAubrey],
                    ['Excuse me dear?  I IS your fault, I did the enchantment exactly correct, I got all the correct ingrediens and did all the incantations but even with the enchantment on her Wiggles still ate Aubrey!  Who knows what happens when you try to digest Aubrey, I didn\'t even know what she was!  But now that Wiggles ate her, you better be willling to pay for any medical bills from this!'], 
                    -100
                    ),
                new SentMsg(
                    ['I\'m so sorry to hear that, What can I do to help?'],
                    [game.convo0Vars.deadAubrey],
                    ['You could help by proving I haven\'t been wasting my money...' ], 
                    1
                    )
            ]),
            new Recieved([game.convo0Vars.deadAubrey]),
            new SentOpts([
                new SentMsg(
                    ['Trust me, I can promise that it won’t happen again,  I’ll even give you 40% off to try and make it up to you!'],
                    [game.convo0Vars.deadAubreyFix],
                    ['Oh that\'s wonderful news!  Well,  if it works that well, then I\'d be dumb to NOT continue buying your products!  I\'m sorry for doubting you!'],
                    1
                ),
                new SentMsg(
                    ['You can trust me, our products are effective.  I know from personal experience!  My cat Skittles was sick just this past week, but once I gave her the health enchantment, she immediately started to walk again!'],
                    [game.convo0Vars.deadAubreyFix],
                    ['Well, If you say so dear, but I don\'t want any more of my family members to die again at least until I know what they were.'],
                    0
                    )
            ]),
            new Recieved([game.convo0Vars.deadAubreyFix],true,true)
        ]),


    p2: new Convo([
            new SentMsg(["Hey Brett! How’s it goin man? I haven’t seen you in soooo long! You look like you’ve been partying a lot recently!  That sounds like so much fun!  I just wanted to reach out to you because I work with truMonster and was hoping to let you in on it! I know it can be hard to pay for all those parties, but truMonster makes it sooo much easier to make cash quick than anyone else! You get to sell amazing products from the comfort of your own home! I think you would really rock at this! I’d love to share some more information with you if you’re interested?"], [], [], 0),
            new Recieved(["How much?"]), 
            new SentOpts( 
                [new SentMsg(
                    ["for what?"],
                    [],
                    [],
                    1
                    ), 
                new SentMsg(
                    ["excuse me?"],
                    [],
                    [],
                    -1
                    )]
                ), 
            new Recieved(["for the products, bro!  How much do I have to pay for them?"]), 
            new SentOpts( 
                [new SentMsg(
                    ["Oh it’s not much, especially when compared to the money you’ll make selling them! :P"],
                    [game.convo2Vars.amountResp, game.convo2Vars.soRichResp1],
                    ["Dude, have you seen my Facebook?  I’m rich AF bro.  My watch is probably worth more than your entire career", "Well, our beginner’s kit is around $500"],
                    1
                    ), 
                new SentMsg(
                    ["Well, our beginner’s kit is around $500"],
                    [],
                    [],
                    -1
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
                    [],
                    1
                    ), 
                new SentMsg(
                    ["Well if you're so focused on the price I can give you a massive discount on it, how's 40% off of $500 sound?"],
                    [game.convo2Vars.imIn],
                    ["Bro.  Did you just offer me a discount?"],
                    -100
                    )]
            ),
            new Recieved([game.convo2Vars.imIn],true, false),
            new Recieved(['Yo dude, there’s been hella haters on my feed lately saying that your company’s a scam, bro!']),
            new SentMsg(
                ['I can assure you that truMonster is most assuredly not a scam.'],
                [],
                [],
                0
            ),
            new Recieved(['Bro, lemme level with you for a sec']),
            new Recieved(['I seriously don\'t care about that bro.']),
            new Recieved(['All I care about is that this doesn’t make me look richer than I am, so I don’t really care about truMonster anymore bro!']),
            new SentMsg(
                ['Buying our products definitely makes you look rich, no doubt about it.'],
                [],
                [],
                0
            ),
            new Recieved(['How, bro?  All I see is people saying it’s a waste of money!']),
            new SentOpts([
                new SentMsg(
                    ['Those people are just haters!  They’re just jealous of you because you have the money to spend on this!  If anything, our product doesn’t just make you look normal rich, but infuriatingly rich!  That’s like Jeff Bezos levels of rich!'],
                    [],
                    [],
                    1
                ),
                new SentMsg(
                    ['They just don’t understand our products.  If you sold it to them, they’d totally understand the value of our products and therefore, the value of Brett.  I’ll even throw in a discount to make it easier for you, how’s 40% off sound?'],
                    [game.convo2Vars.richPositive1,game.convo2Vars.richPositive2,game.convo2Vars.richPositive3],
                    ['Bro','Do you think that I\'m such a PEASANT that I\'d not only SELL things to people to make money, but that I\'d accept a fucking DISCOUNT?  DO I need to remind you who I fucking am?  If everyone in the entire city took all their money, put it in a pile, burned it, and did donuts around it with their fucking peasant-mobiles, they wouldn\'t even TOUCH the amount of money I have','The fire didn\'t mean anything, I just love seeing peasants burn their money'],
                    -100
                ),
                new SentMsg(
                    ['What if I told you there’s an even more expensive package you could buy?  Those people were probably just questioning your wealth because you weren’t buying our premium package!'],
                    [game.convo2Vars.richPositive1],
                    ['BRO. have you just been giving me the cheap-ass peasant package?  What the hell man, I thought we were bros!  You better have a package so expensive that seeing the price tag will make people feel inferior'],
                    0
                )
            ]),
            new Recieved([game.convo2Vars.richPositive1]),
            new Recieved([game.convo2Vars.richPositive2]),
            new Recieved([game.convo2Vars.richPositive3],true,true)
        ]),
    p3: new Convo([
            new SentMsg(
                ['Hey Jamie! How’s it goin hun? I haven’t seen you in soooo long! I see you have a beautiful baby boy now, I know how hard that can be! I just wanted to reach out to you because I have a business with MLM and was hoping to let you in on it! I know it can be hard to be a single mom and a career woman, but MLM makes it sooo much easier to make cash quick than anyone else! You get to sell amazing products from the comfort of your own home! I think you would really rock at this! I love to share some more information with you if you’re interested?'],
                [],
                [],
                0
            ),
            new Recieved(['Oh! Ctharen its so nice to hear from you! Honestly its been really tough recently… Its been really hard to find a job that works around my schedule and I’ve been crazy stressed recently']),
            new SentMsg(
                ['Oh, sweetie thats a shame to hear! Well if you really want to start making your own money and being independent financially then there are a few steps you gotta take to get there'],
                [],
                [],
                0
            ),
            new Recieved(['Like what?']),
            new SentMsg(
                ['Well you start by buying our beginner\'s kit. It’s only $500 and it’ll contain everything you need to start your own business right from home!'],
                [],
                [],
                0
                ),
            new Recieved(['I don’t know if I can afford something like that right now…']),
            new SentOpts([
                new SentMsg(
                    ['Of course you can! If you don’t have the money right now just take out a loan, trust me it’s totally worth it and you’ll make your money back in no time!'],
                    [],
                    [],
                    0
                ),
                new SentMsg(
                    ['Don’t even worry about it hun! Just because its you I can ask for some favors. How does 40% off sound?'],
                    [game.convo3Vars.moneyTroubles],
                    ['Oh well I can\'t pass up a deal like that!  I\'ll see if I can\'t round up enough money to try this out! :)'],
                    1
                ),
                new SentMsg(
                    ['I know it can be hard at first, but you gotta spend money to make money! Trust me it is soo worth it!'],
                    [game.convo3Vars.moneyTroubles],
                    ['Well, I\'ll try it... I don\'t have enough now but I would if I took some out of the college fund I just started for my son, If this works out then I won\'t even have to worry about college admission!'],
                    0
                )
            ]),
            new Recieved([game.convo3Vars.moneyTroubles],true),
            new Recieved(['Hey, so I\'ve been trying this out for a while and I haven\'t seen any profit yet...']),
            new Recieved(['Is this really a legitimate business...?']),
            new SentMsg(
                ['Of course it is, I wouldn\'t lie to you!'],
                [],
                [],
                0
            ),
            new Recieved(['I want to believe you, I really do... but I\'m just not sure if I can afford this much longer...']),
            new SentMsg(
                ['Do you need a bit of help?  I\'ve been in the business for a while now so I could give you a few tips and tricks to really start profiting! ;P'],
                [],
                [],
                0
            ),
            new Recieved(['Well, I suppose it couldn\'t hurt...  What\'s your suggestion?']),
            new SentOpts([
                new SentMsg(
                    ['Well, you know how the saying goes, "you gotta spend money to make money?" Well that\'s what I did when I first started out!  If you take out a loan and buy a large amount of product to sell, you\'ll be able to pay back the loan in full within a month!'],
                    [],
                    [],
                    -100
                ),
                new SentMsg(
                    ['You gotta make sure you act like yourself when talking to the customer!  If your nervous or not invested, then they\'ll feel that too!  Just be confident in yourself and the money will start rolling in!'],
                    [game.convo3Vars.businessTroubles],
                    ['Oh I see, that might be the issue, I\'ve been lacking confidence ever since the breakup...  But thanks for the words of encouragement, I\'ll try my best to live up to your expectatians! :)\n\nexpectations* whoops'],
                    0
                ),
                new SentMsg(
                    ['These things take time, when I was in your position it took a while for me to see profit too.  But I was patient, and when I started to make a profit, it all became worth it!'],
                    [game.convo3Vars.businessTroubles],
                    ['Ok... I trust you, I\'ll wait for a bit longer to see if it works out...'],
                    0
                ),
            ]),
            new Recieved([game.convo3Vars.businessTroubles],true,true),


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
    names: ['Boss','Betty','Brett','Jamie'],
    aquired: [true,true,true,true],
    mHist: [game.fullConvos.p0,game.fullConvos.p1,game.fullConvos.p2,game.fullConvos.p3]
}
game.ppl = [new Person('Boss',game.fullConvos.p0, 1,true), new Person('Betty',game.fullConvos.p1, 1,true), new Person('Brett',game.fullConvos.p2,1,true),new Person('Jamie',game.fullConvos.p3,1,true)];

game.playlist = [new Song('Faith and Company','Roadside Worship','Wait, There is More','albumCover1'),
                new Song('Essential Toils','First Stone','Multiple Levels of Love','albumCover2'),
                new Song('Marketing Mindfulness','A Sale on Salvation','Door to Door Deliverance','albumCover3')];

game.currSong;
//how many people have quit
game.quitters = 0;

//how many people completely trust the player
game.allies = 0;