class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // global gravity
        // this.physics.world.gravity.y = 1000;
        
        this.keys = this.input.keyboard.createCursorKeys();

        // parallax!!!
        this.bgFar = this.add.tileSprite(0, 0, w, h, "far-bg").setOrigin(0);
        this.bgShips = this.add.tileSprite(0, 0, w, h, "ships-bg").setOrigin(0);
        this.bgBuildings = this.add.tileSprite(0, 0, w, h, "buildings-bg").setOrigin(0);

        // when we add the player, it will add its FSM to this scene
        this.player = new Player(this, w / 4, h * 0.9, "alien");
        // this.player.setScale(0.5);
        this.player.anims.play("run");
        // this.player.body.setSize(0.5);
        this.gameOver = false;

        // timer
        this.timeElapsed = 0;
        this.timerText = this.add.bitmapText(w - 64, h / 2, "c64-font", "", 14).setOrigin(0.5);

        // set up initial chunk and group for chunks
        this.chunkGroup = this.add.group({
            runChildUpdate: true    // otherwise, call their update in this update
        });
        this.cactiGroup = this.physics.add.group({
            runChildUpdate: true
        });
        this.addChunk();

        // death particles
        this.particlesConfig = {
            scale: {start: 4, end: 0},
            speed: {min: -500, max: 500},
            angle: {min: 0, max: 360},
            tint: {start: 0xFF0000, end: 0x0000FF},
            blendMode: 'SCREEN',
            count: 40,
            frequency: 5,
            lifespan: 1000,
            gravityY: this.player.body.gravity.y / 4,
            duration: 100,
        };

        this.bgm = this.sound.add("bgm").setLoop(true).setVolume(bgmVol);
        this.bgm.play();
        this.bgm.setSeek(bgmTimestamp);

    }

    update(time, delta) {
        if (!this.gameOver) {
            this.playerGravFSM.step();
            this.player.update();
            this.timeElapsed += delta / 1000;
            this.timerText.text = this.timeElapsed.toFixed(1); // seconds to 1 decimal

            this.physics.world.collide(this.player, this.cactiGroup, this.playerDie, null, this);

            //TODO: also figure out a way to remove the floors......
            if (this.cactiGroup.getLength() > 20) {
                // destroy earlier cacti and remove them from scene
                this.cactiGroup.remove(this.cactiGroup.getFirstAlive(), true, true);
            }

            // parallax scroll
            // this.bgFar.tilePositionX += 0.1;
            this.bgShips.tilePositionX -= 0.3;
            this.bgBuildings.tilePositionX += 0.3;

        } else {
            if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
                this.sound.play("ui-sfx");
                bgmTimestamp = this.bgm.seek;
                this.bgm.destroy();
                this.scene.start("menuScene");
            }
        }
    }

    addChunk() {
        let chunk = new TerrainChunk(this, this.player, this.timeElapsed);
        this.chunkGroup.add(chunk);
    }

    playerDie() {
        this.player.anims.play("die");
        this.player.on("animationcomplete", () => {
                    this.player.destroy()
        })

        // play cactus death sfx if not offscreen
        if (this.player.x > 0 && this.player.y > 0 && this.player.y < h) {
            this.sound.play("hit-sfx");
        };
        this.gameOver = true;
        let particles = this.add.particles(
            this.player.x + this.player.width / 2,
            this.player.y + this.player.height / 2,
            "particle-sprite",
            this.particlesConfig
        );
        particles.start();

        let gameOverText = [
            "Zworp enjoyed " + this.timeElapsed.toFixed(1) + " sec. of freedom.\n",
            "Press [SPACE] to return to menu",
        ];

        particles.on("complete", () => {
            particles.destroy;
            this.overTextBg = this.add.rectangle(w / 2, h / 2, w, h / 3, commodoreGreen);
            this.ot2 = this.add.bitmapText(w * 0.36, h * 0.36, "c64-font", "GAME OVER\n", 22).setOrigin(0);
            this.overText = this.add.bitmapText(w / 2, h * 0.55, "c64-font", gameOverText, 14).setOrigin(0.5);
        });
    }
}