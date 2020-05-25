/** @type {import("../../typings/phaser")} */

class MusicPlayer extends Phaser.Scene {
    constructor(){
        super("musicPlayerScene");
    }
    preload() {

        // load audio
        this.load.audio(game.playlist[0].songName, '././assets/music/MLM_song1.wav');
        this.load.audio(game.playlist[1].songName, '././assets/music/MLM_song2.wav');
        this.load.audio(game.playlist[2].songName, '././assets/music/synthySong.wav');

        
        //hover sounds
        this.load.audio('hover1SFX', '././assets/sfx/hover1.wav');
        this.load.audio('hover2SFX', '././assets/sfx/hover2.wav');
        this.load.audio('hover3SFX', '././assets/sfx/hover3.wav');
        this.load.audio('hover4SFX', '././assets/sfx/hover4.wav');
        //click sounds
        this.load.audio('click1SFX', '././assets/sfx/click1.wav');
        this.load.audio('click2SFX', '././assets/sfx/click2.wav');
        this.load.audio('click3SFX', '././assets/sfx/click3.wav');
        

        //buttons
        //this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('mp_bg', '././assets/musicPlayer_bg.png');

        this.load.image('smallPlay', '././assets/smallPlay.png');
        this.load.image('smallPause', '././assets/smallPause.png');

        this.load.image('smallPlayHover', '././assets/smallPlayHover.png');
        this.load.image('smallPauseHover', '././assets/smallPauseHover.png');

        //audio stuff
        this.load.image('audioOn', '././assets/audioOn.png');
        this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('audioOnHover', '././assets/audioOnHover.png');
        this.load.image('audioOffHover', '././assets/audioOffHover.png');

        //playlist song stuff
        this.load.image('songPlay', '././assets/songPlay.png');
        this.load.image('songNote', '././assets/songNote.png');
        this.load.image('songAreaHover', '././assets/songHover.png');
        this.load.image('songArea', '././assets/songArea.png');

        //album covers
        this.load.image(game.playlist[0].albumCover, '././assets/songImage1.png');
        this.load.image(game.playlist[1].albumCover, '././assets/songImage2.png');
        this.load.image(game.playlist[2].albumCover, '././assets/songImage3.png');

        //tab stuff
        this.load.image('tabLine', '././assets/tabLine.png');
        this.load.image('tab', '././assets/tab.png');
        this.load.image('tabHover', '././assets/tabHover.png');
        this.load.image('tabSelected', '././assets/tabSelected.png');

    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;

        //music config
        this.musicConfig = {
            mute: true,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 1
        }
        this.song0 = this.sound.add(game.playlist[0].songName);
        this.song1 = this.sound.add(game.playlist[1].songName);
        this.song2 = this.sound.add(game.playlist[2].songName);
        this.songs = [this.song0, this.song1,this.song2];
        game.currSong = this.song0;

        game.currSong.stop();
        game.currSong.play(this.musicConfig);

        let songNameConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '15px',
            color: '#FFF',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }

        let songInfoConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '15px',
            color: '#9E9E9E',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            wordWrap: { width: 250, useAdvancedWrap: true }
        }
        

        let numbersConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '10px',
            color: '#9E9E9E',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }
        
        this.playlistSongAreas = [];
        this.playlistNotes = [];
        var playlistNum = 0;
        var songListStartY = 250;
        var songListStartX = 460;
        game.playlist.forEach(song => {
            this.add.text(songListStartX,songListStartY+5+playlistNum*40,song.songName,songNameConfig).setDepth(4);
            this.playlistSongAreas.push(
                this.add.image(songListStartX-30,songListStartY+20+playlistNum*40, 'songArea').setScale(1.4).setDepth(3).setOrigin(0,0.5)
            );
            this.add.text(songListStartX-20,songListStartY+20+playlistNum*40, playlistNum+1, numbersConfig).setDepth(4).setOrigin(0,0.5)
            this.playlistNotes.push(
                this.add.image(songListStartX-15,songListStartY+20+playlistNum*40, 'songPlay').setScale(0.3).setDepth(4).setOrigin(0,0.5).setAlpha(0)
            );
            playlistNum++;
        });

        this.albumCoverImg = this.add.image(170,200,game.playlist[0].albumCover).setOrigin(0);

        // =============================== add buttons ===============================
        let buttonConfig = {
          fontFamily: 'Helvetica',
          fontStyle: 'bold',
          fontSize: '20px',
          color: '#000',
          align: 'center',
          padding: {
              right: 10,
              left: 10,
              top: 5,
              bottom: 5,
          },
        }
        
        // set up background and tabs
        this.tabLine = this.add.tileSprite(0,0,960,200,'tabLine').setOrigin(0);
        //music tab
        this.tabSelected = this.add.tileSprite(250,0,270,60,'tabSelected').setOrigin(0).setDepth(1);
        this.musicPlayerTabTxt = this.add.text(270*1.4,10,'Music Player',buttonConfig).setOrigin(0.5,0).setDepth(1);

        //pdf tab
        this.pdfTab = this.add.tileSprite(500,0,270,60,'tab').setOrigin(0);
        this.pdfTabTxt = this.add.text(450*1.4,10,'pdf',buttonConfig).setOrigin(0.5,0);
        

        this.chatTab = this.add.tileSprite(0,0,270,60,'tab').setOrigin(0);
        this.chatTabTxt = this.add.text(60,10,'Messenger',buttonConfig);

        
        this.mp_bg = this.add.tileSprite(0, 50, 960, 600, 'mp_bg').setOrigin(0, 0).setDepth(2);

        this.tabs = [this.chatTab,this.pdfTab];
        this.tabLinks = ['messengerScene','pdfScene'];

        //music player ui buttons
        
        this.currSongInfo = this.add.text(game.config.width-80,game.config.height-70,'INFO',songInfoConfig).setOrigin(1,0.5).setDepth(4);

        this.smallPlay = this.add.image(300,480,'smallPlay').setScale(0.5).setDepth(2).setDepth(2);

        this.audio = this.add.image(game.config.width-150,220,'audioOn').setScale(0.5).setDepth(2);

        if(!game.audio){
            this.audio.setTexture('audioOff');
        }

        
        //=============================== button functionality ===========================================

        //song buttons
        playlistNum = 0;
        this.playlistSongAreas.forEach(area => {
            area.setInteractive();
            var song = game.playlist[this.playlistSongAreas.indexOf(area)];
                
            area.on('pointerdown', () => { 
                this.albumCoverImg.setTexture(song.albumCover);
                this.currSongInfo.text = song.artist + ' · ' + song.album;
                //if you click on a song
                //set all buttons to original look
                this.playlistSongAreas.forEach(ar => {
                    ar.setTexture('songArea');
                    this.playlistNotes[this.playlistSongAreas.indexOf(ar)].alpha = 0;
                });
                //play the song
                this.playSong(this.songs[this.playlistSongAreas.indexOf(area)]);
                //set this song area to clicked look
                area.setTexture('songAreaHover');
                this.playlistNotes[this.playlistSongAreas.indexOf(area)].alpha = 1;
                //set audio on
                this.audio.setTexture('audioOn');
                game.audio = true;
                game.currSong.setMute(false);
                this.musicConfig.mute = false;
                //set play buttons to pause
                this.smallPlay.setTexture('smallPause');
            });

            area.on('pointerover', () => { 
                this.playlistNotes[this.playlistSongAreas.indexOf(area)].alpha = 1;
                area.setTexture('songAreaHover');
                this.playlistNotes[this.playlistSongAreas.indexOf(area)].setTexture('songPlay');
            });
            area.on('pointerout', () => { 
                if(game.currSong != this.songs[this.playlistSongAreas.indexOf(area)] || !game.audio){
                    this.playlistNotes[this.playlistSongAreas.indexOf(area)].alpha = 0;
                    area.setTexture('songArea');
                    this.playlistNotes[this.playlistSongAreas.indexOf(area)].setTexture('songNote');
                }
            });

            playlistNum++;
        });

        //set interactive for tabs
        this.tabs.forEach(tab => {
            tab.setInteractive();
            tab.on('pointerdown', () => { 
                this.sound.play('click3SFX');
                this.scene.bringToTop(this.tabLinks[this.tabs.indexOf(tab)]);
            });
    
            tab.on('pointerover', () => { 
                this.sound.play('hover4SFX');
                tab.setTexture('tabHover');
            });
            tab.on('pointerout', () => { 
                tab.setTexture('tab');
            });
            
        });

        //audio button
        
        this.audio.setInteractive();
        this.audio.on('pointerdown', () => { 
            if(game.audio){
                this.audio.setTexture('audioOff');
            }else{
                this.audio.setTexture('audioOn');
            }
            game.audio = !game.audio;
            if(game.musicPlay){
                game.currSong.setMute(!this.musicConfig.mute);
            }
            console.log(game.currSong);
            this.musicConfig.mute = !this.musicConfig.mute;
        });

        this.audio.on('pointerover', () => { 
            if(game.audio){
                this.audio.setTexture('audioOnHover');
            }else{
                this.audio.setTexture('audioOffHover');
            }
        });
        this.audio.on('pointerout', () => { 
            if(game.audio){
                this.audio.setTexture('audioOn');
            }else{
                this.audio.setTexture('audioOff');
            }
        });


        //==================== play buttons ========================
        
        
        this.smallPlay.setInteractive();
        this.smallPlay.on('pointerdown', () => { 
            if(game.musicPlay){
                this.smallPlay.setTexture('smallPlay');
                game.currSong.setMute(true);
                this.musicConfig.mute = true;
            }else{
                this.smallPlay.setTexture('smallPause');
                if(game.audio){
                    game.currSong.setMute(false);
                    this.musicConfig.mute = false;
                }
            }
            game.musicPlay = !game.musicPlay;
        });

        this.smallPlay.on('pointerover', () => { 
            if(!game.musicPlay){
                this.smallPlay.setTexture('smallPlayHover');
            }else{
                this.smallPlay.setTexture('smallPauseHover');
            }
        });
        this.smallPlay.on('pointerout', () => { 
            
            if(!game.musicPlay){
                this.smallPlay.setTexture('smallPlay');
            }else{
                this.smallPlay.setTexture('smallPause');
            }
        });
        
    }
    
    update() {
    }

    playSong(song){
        game.currSong.stop();
        game.currSong = song;
        game.currSong.play(this.musicConfig);
    }
    
}