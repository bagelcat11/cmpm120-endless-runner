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
        this.load.spritesheet("alien-die", "images/alien-die-sheet.png", {
            frameWidth: 48, frameHeight: 64, startFrame: 0, endFrame: 2
        });

        this.load.image("tileset-image", "images/space-station-tiles.png");
        this.load.tilemapTiledJSON("map-json", "images/map.json");

        this.load.image("floor-sprite", "images/floor.png");
        this.load.image("big-cact-sprite", "images/big_cact.png");
        this.load.image("small-cact-sprite", "images/small_cact.png");

        this.load.image("far-bg", "images/bg-far.png");
        this.load.image("buildings-bg", "images/bg-buildings.png");
        this.load.image("ships-bg", "images/bg-ships.png");

        this.load.image("particle-sprite", "images/particle.png");

        this.load.audio("jump-sfx", "sounds/zworp.wav");
        this.load.audio("fall-sfx", "sounds/uwaaaaa.wav");
        this.load.audio("hit-sfx", "sounds/owch.wav");
        this.load.audio("ui-sfx", "sounds/ui.wav");
        this.load.audio("walk-sfx", "sounds/walk.wav");
        this.load.audio("bgm", "sounds/zworp-theme.wav");
    }

    create() {
        //TODO: put up loading graphic
        this.add.text(w / 2, h / 2, "Loading . . .");

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
        if (!this.anims.exists("die")) {
            this.anims.create({
                key: "die",
                frames: this.anims.generateFrameNumbers("alien-die", {
                    start: 0, end: 2, first: 0
                }),
                frameRate: 15,
                repeat: 0
            });
        }

        // enter menu once load is done
        this.scene.start("menuScene");
    }
}