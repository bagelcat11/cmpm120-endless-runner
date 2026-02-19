class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // put all assets in cache
        this.load.path = "./assets/";

        // this.load.image("red-cube", "images/square_icon.png")
        this.load.spritesheet("alien", "images/alien-sheet.png", {
            frameWidth: 48, frameHeight: 64, startFrame: 0, endFrame: 3
        });

        this.load.image("tileset-image", "images/space-station-tiles.png");
        this.load.tilemapTiledJSON("map-json", "images/map.json");
    }

    create() {
        //TODO: put up loading graphic

        // create anims
        if (!this.anims.exists("run")) {
            this.anims.create({
                key: "run",
                frames: this.anims.generateFrameNumbers("alien", {
                    start: 0, end: 3, first: 0
                }),
                frameRate: 15,
                repeat: -1
            });
        }

        // enter play once load is done
        this.scene.start("playScene");
    }
}