class MusicPlayer extends Phaser.Scene {
    constructor(){
        super("musicPlayerScene");
    }
    preload() {

    }

    create(){
        this.displayName = this.add.text(centerX, 60,"music player", buttonConfig).setOrigin(0.5);
    }
    
    update() { 
        
    }
}