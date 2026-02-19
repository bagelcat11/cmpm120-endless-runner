class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // put all assets in cache
        this.load.path = "./assets/";

        this.load.image("red-cube", "images/square_icon.png");

        this.load.image("tileset-image", "images/space-station-tiles.png");
        this.load.tilemapTiledJSON("map-json", "images/map.json");
    }

    create() {
        //TODO: put up loading graphic

        // create anims

        // enter play once load is done
        this.scene.start("playScene");
    }
}