class Recieved{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        this.changeVars = [];
        this.changeVarsTo = [];

    }

    update(){
        
        
    }

}