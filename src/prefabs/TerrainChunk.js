// make it extend generic gameobject so we can catch its destroy, etc
class TerrainChunk extends Phaser.GameObjects.GameObject {
    // get extra timePassed arg to determine difficulty, and player arg
    constructor(scene, player, timeElapsed) {
        super(scene, "map-json");

        this.scene = scene;
        this.player = player;
        this.timeElapsed = timeElapsed;
        const MIN_FLOOR_H = h - 16;
        const MAX_FLOOR_H = h * 3/4;
        const MIN_CEIL_H = -h / 2 + 32;
        const MAX_CEIL_H = -h / 4;

        const map = scene.add.tilemap("map-json");
        this.mapW = map.widthInPixels;
        this.mapH = map.heightInPixels;
        // add image to map (name FROM TILED IN JSON, key)
        const tileset = map.addTilesetImage("space-station-tiles", "tileset-image");

        // set up floor/ceiling
        const bottomFloorObj = map.findObject("chunk", obj => obj.name === "floor");
        this.bottomFloor = scene.physics.add.sprite(bottomFloorObj.x, bottomFloorObj.y,
            "floor-sprite").setOrigin(0);
        this.bottomFloor.body.setImmovable();
        this.bottomFloor.body.setFrictionX(0);

        const topFloorObj = map.findObject("chunk", obj => obj.name === "floor");
        this.topFloor = scene.physics.add.sprite(topFloorObj.x, topFloorObj.y,
            "floor-sprite").setOrigin(0);
        this.topFloor.setFlipY(true);
        this.topFloor.body.setImmovable();
        this.topFloor.body.setFrictionX(0);

        // special empty chunk for time 0
        if (timeElapsed == 0) {
            this.bottomFloor.y = MIN_FLOOR_H;
            this.topFloor.y = MIN_CEIL_H;
        // otherwise move things around and make cacti
        } else {
            this.bottomFloor.y = Phaser.Math.Between(MIN_FLOOR_H, MAX_FLOOR_H);
            this.bottomFloor.x = w;     // come from offscreen
            this.topFloor.y = Phaser.Math.Between(MIN_CEIL_H, MAX_CEIL_H);
            this.topFloor.x = w;

            // ----- The Great Cacti Spawning Codeblock ----- //
            // pick random cacti out of 9 possible
            // createFromObjs makes an array of sprites
            this.cacti = map.createFromObjects("chunk", {
                name: "cact_big",
                key: "big-cact-sprite"
            });
            // remove random cacti; number of removals inversely proportional to time passed
            Phaser.Math.RND.shuffle(this.cacti);
            //TODO: make cacti equation better
            // I invented all these equations by looking at them in desmos and seeing if
            // I liked how they curved
            let maxToRemove = Math.ceil(-Math.pow(this.scene.timeElapsed, 0.25) + 6);
            for (let i = 0; i < Phaser.Math.Between(maxToRemove - 1, maxToRemove); i++) {
                let c = this.cacti.pop();
                c.destroy();
            }
            // console.log('now ' + this.cacti.length + " cacti")
            // nathan's manual physics thing
            scene.physics.world.enable(this.cacti, Phaser.Physics.Arcade.DYNAMIC_BODY);
            // add to group sooner rather than later, because doing that MAY RESET PROPERTIES
            scene.cactiGroup.addMultiple(this.cacti);
            // loop over them and set properties
            this.cacti.map((c) => {
                c.body.setImmovable(true);
                // randomly split between big and small
                if (Phaser.Math.Between(0, 1) == 0) {
                    c.body.setSize(c.width * 0.6, c.height * 0.7);
                } else {
                    c.setTexture("small-cact-sprite");
                    c.body.setSize(c.width * 0.7, c.height * 0.5);
                }
                // randomly split between floor and ceil
                if (Phaser.Math.Between(0, 1) == 0) {
                    c.setOrigin(1);
                    c.setY(this.bottomFloor.y);
                } else {
                    c.setOrigin(0);
                    c.setFlipY(true);
                    c.setY(this.topFloor.y + this.topFloor.height);
                    // c.setX(c.x + this.topFloor.x);
                }
                c.setX(c.x + this.bottomFloor.x);
            });
        }

        scene.physics.add.collider(player, this.bottomFloor);
        scene.physics.add.collider(player, this.topFloor);
        this.batoned = false;
    }

    update() {
        // make it faster if more time has passed
        // take root so that speedup falls off over time
        // add const since the first call will have timeElapsed be 0
        if (!this.scene.gameOver) {
            //TODO: make speedup better
            // ----- The Great Game Speedup Equation ----- //
            let v = -Math.pow(this.scene.timeElapsed + 380, 0.9)
            this.bottomFloor.setVelocityX(v);
            this.topFloor.setVelocityX(v);
            this.scene.cactiGroup.setVelocityX(v);
        } else {
            this.bottomFloor.setVelocityX(0);
            this.topFloor.setVelocityX(0);
            this.scene.cactiGroup.setVelocityX(0);
        }

        if (this.bottomFloor.x < -this.mapW) {
            //TODO: figure out how to destroy floors i added to scene...
            this.destroy();
        }

        if (this.bottomFloor.x < 0 && !this.batoned) { //&& this.timeElapsed > 0.5) {//-w / 4) {
            // call adder from parent scene
            this.scene.addChunk(this.scene, this.player, this.timeElapsed);
            this.batoned = true;
        }
    }
}