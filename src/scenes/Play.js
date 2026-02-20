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
        this.gameOver = false;

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
        this.chunkGroup = this.physics.add.group({
            runChildUpdate: true    // otherwise, call their update in this update
        });
        this.cactiGroup = this.physics.add.group({
            runChildUpdate: true
        });
        this.addChunk();

        // debug stuff
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugText = this.add.text(0, h - 64).setDepth(101);
    }

    update(time, delta) {
        if (!this.gameOver) {
            this.playerGravFSM.step();
            this.timeElapsed += delta / 1000;
            this.timerText.text = this.timeElapsed.toFixed(1); // seconds to 1 decimal
            // this.debugText.setText([
            //     "Pos: " + this.player.body.x + ", " + this.player.body.y,
            //     "Vel: " + this.player.body.velocity.x + ", " + this.player.body.velocity.y
            // ]);

            this.physics.world.collide(this.player, this.cactiGroup, this.playerDie, null, this);

            //TODO: also figure out a way to remove the floors......
            if (this.cactiGroup.getLength() > 20) {
                // destroy earlier cacti and remove them from scene
                this.cactiGroup.remove(this.cactiGroup.getFirstAlive(), true, true);
            }
            if (this.chunkGroup.getLength() > 5) {
                this.chunkGroup.remove(this.chunkGroup.getFirstAlive(), true, true);
            }

        } else {
            if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
                this.scene.start("menuScene");
            }
        }
    }

    addChunk() {
        let chunk = new TerrainChunk(this, this.player, this.timeElapsed);
        this.chunkGroup.add(chunk, {});
    }

    playerDie() {
        this.player.destroy();
        this.gameOver = true;
        let score = this.timeElapsed;
        console.log("final score: " + score.toFixed(1));

        let gameOverConfig = {
            fontFamily: "Courier",
            fontSize: "12px",
            backgroundColor: "#116622",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: w
        };
        let gameOverText = [
            "",
            "GAME OVER",
            "",
            "You survived for " + score.toFixed(1) + " sec.",
            "Press [↓] to return to menu",
            ""
        ];
        this.overText = this.add.text(w / 2, h / 2, gameOverText, gameOverConfig).setOrigin(0.5);
    }
}