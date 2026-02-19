class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // global gravity
        // this.physics.world.gravity.y = 1000;
        
        this.keys = this.input.keyboard.createCursorKeys();

        // when we add the player, it will add its FSM to this scene
        this.player = new Player(this, w / 2, h / 2, "red-cube");
        this.player.setScale(0.25);
        // this.player.body.setSize(0.5);

        // instructions
        document.getElementById("info").innerText = "use SPACE to switch gravity";

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

        // set up initial chunk and group for chunks
        this.chunkGroup = this.add.group({
            runChildUpdate: true
        });
        this.addChunk();

        // debug stuff
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugText = this.add.text(0, h - 64);
    }

    update() {
        this.playerGravFSM.step();
        if (this.chunk) {
            this.chunk.update();    // HAVE TO CALL FROM ACTIVE SCENE
        }
        this.debugText.setText([
            "Pos: " + this.player.body.x + ", " + this.player.body.y,
            "Vel: " + this.player.body.velocity.x + ", " + this.player.body.velocity.y
        ]);
    }

    addChunk() {
        let chunk = new TerrainChunk(this, this.player, 0);
        this.chunkGroup.add(chunk);
    }
}