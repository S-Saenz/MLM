class End extends Phaser.Scene {
    constructor(){
        super("endScene");
    }
    preload() {
        this.load.image('endBg', '././assets/endScreenFeed.png');
    }

    create(){
        var centerX = game.config.width/2;
        var centerY = game.config.height/2;
        this.endBg = this.add.tileSprite(0, -60, 960,600, 'endBg').setOrigin(0, 0);
        this.endBg.alpha = 0.5;
        let creditsConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '30px',
            color: '#000',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            wordWrap: { width: 350, useAdvancedWrap: true }
        }
        let creditsInfoConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '20px',
            color: '#9E9E9E',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            wordWrap: { width: 400, useAdvancedWrap: true }
        }

        
        let overConfig = {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '60px',
            color: '#000',
            align: 'right',
            padding: {
                right: 10,
                left: 10,
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }

        
        overConfig.stroke = '#FACADE';
        overConfig.strokeThickness = 6;
        this.add.text(0, centerY-250,"GAME OVER", overConfig);
     
        this.add.text(0, centerY-160,"Ryan Timothy Marcus", creditsConfig).setOrigin(0);
        this.add.text(0, centerY-130,"Writing, Sound & Design", creditsInfoConfig).setOrigin(0);
        this.charle = this.add.text(0, centerY-80,"Charlie Chavez", creditsConfig).setOrigin(0);
        this.charle = this.add.text(0, centerY-50,"Bird Owner", creditsInfoConfig).setOrigin(0);
        this.add.text(0, centerY,"Joann Long", creditsConfig).setOrigin(0);
        this.add.text(0, centerY+30,"Lead Artist & Producer", creditsInfoConfig).setOrigin(0);
        this.king = this.add.text(0, centerY+80,"Saenz", creditsConfig).setOrigin(0);
        this.king = this.add.text(0, centerY+110,"Programmer, Voice Actor & King", creditsInfoConfig).setOrigin(0);


        
    }
    
    update() {
        this.endBg.tilePositionY += 1;
        
    }
}