class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // put all assets in cache
        this.load.path = "./assets/";
        this.load.image("red-cube", "sprites/square_icon.png");
    }

    create() {
        //TODO: put up loading graphic

        // create anims

        // enter play once load is done
        this.scene.start("playScene");
    }
}