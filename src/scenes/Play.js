class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // global gravity
        // this.physics.world.gravity.y = 1000;
        
        this.keys = this.input.keyboard.createCursorKeys();

        // when we add the player, it will add its FSM to this scene
        this.player = new Player(this, w / 4, h * 0.9, "alien");
        // this.player.setScale(0.5);
        this.player.anims.play("run");
        // this.player.body.setSize(0.5);

        // set up inversion shader
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/postfx-pipeline/
        // this.pipelineManager = this.sys.renderer.pipelines;
        // this.pipelineManager.addPostPipeline("InvertFX", new InvertFX(this));
        // this.cameras.main.postFX.addColorMatrix();

        // create tilemap
        // const map = this.add.tilemap("map-json");
        // // add image to map (name FROM TILED IN JSON, key)
        // const tileset = map.addTilesetImage("space-station-tiles", "tileset-image");
        // const terrainLayer = map.createLayer("terrain", tileset);
        // terrainLayer.setCollisionByProperty({collides: true});
        // this.physics.add.collider(this.player, terrainLayer);

        // timer
        this.timeElapsed = 0;
        this.timerText = this.add.text(0, h - 64);

        // set up initial chunk and group for chunks
        this.chunkGroup = this.add.group({
            runChildUpdate: true    // otherwise, call their update in this update
        });
        this.addChunk();

        // debug stuff
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugText = this.add.text(0, h - 64);
    }

    update(time, delta) {
        this.playerGravFSM.step();
        this.timeElapsed += delta / 1000;
        this.timerText.text = this.timeElapsed.toFixed(1); // seconds to 1 decimal
        // this.debugText.setText([
        //     "Pos: " + this.player.body.x + ", " + this.player.body.y,
        //     "Vel: " + this.player.body.velocity.x + ", " + this.player.body.velocity.y
        // ]);
    }

    addChunk() {
        let chunk = new TerrainChunk(this, this.player, this.timeElapsed);
        this.chunkGroup.add(chunk);
    }
}