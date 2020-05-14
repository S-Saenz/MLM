class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload() {
        this.load.image('endBg', '././assets/endScreenFeed.png');
    }

    create(){
        this.endBg = this.add.tileSprite(0, -60, 960,600, 'endBg').setScale(0.5,0.5).setOrigin(0, 0);
        
        
    }
    
    update() {
        this.endBg.tilePositionY += 3;
        
    }
}