// make it extend generic gameobject so we can catch its destroy, etc
class TerrainChunk extends Phaser.GameObjects.GameObject {
    // get extra timePassed arg to determine difficulty, and player arg
    constructor(scene, player, timeElapsed) {
        // console.log("made chunk at time " + timeElapsed);
        super(scene, "map-json");

        this.scene = scene;
        this.player = player;
        this.timeElapsed = timeElapsed;
        const MIN_FLOOR_H = h - 16;
        const MAX_FLOOR_H = h * 3/4;

        const map = scene.add.tilemap("map-json");
        this.mapW = map.widthInPixels;
        this.mapH = map.heightInPixels;
        // add image to map (name FROM TILED IN JSON, key)
        const tileset = map.addTilesetImage("space-station-tiles", "tileset-image");

        // get floor from map
        const bottomFloorObj = map.findObject("chunk", obj => obj.name === "floor");
        this.bottomFloor = scene.physics.add.sprite(bottomFloorObj.x, bottomFloorObj.y,
            "floor-sprite").setOrigin(0);
        this.bottomFloor.body.setImmovable();
        this.bottomFloor.body.setFrictionX(0);

        // special empty chunk for time 0
        if (timeElapsed < 1) {
            this.bottomFloor.y = MIN_FLOOR_H;
            this.bottomFloor.x -= 16;   // already there
        // otherwise move things around and make cacti
        } else {
            this.bottomFloor.y = Phaser.Math.Between(MIN_FLOOR_H, MAX_FLOOR_H);
            this.bottomFloor.x = w;     // come from offscreen

            // pick random cacti out of 9 possible
            // createFromObjs makes an array of sprites
            this.cacti = map.createFromObjects("chunk", {
                name: "cact_big",
                key: "big-cact-sprite"
            });
            // remove random cacti; number of removals inversely proportional to time passed
            Phaser.Math.RND.shuffle(this.cacti);
            let maxToRemove = Math.ceil(-Math.pow(this.scene.timeElapsed, 0.5) + 8);
            // console.log("removing " + maxToRemove);
            for (let i = 0; i < Phaser.Math.Between(maxToRemove - 2, maxToRemove); i++) {
                let c = this.cacti.pop();
                c.destroy();
            }
            // nathan's manual physics thing
            scene.physics.world.enable(this.cacti, Phaser.Physics.Arcade.DYNAMIC_BODY);
            // add to group sooner rather than later, because doing that MAY RESET PROPERTIES
            scene.cactiGroup.addMultiple(this.cacti);
            // loop over them and set properties
            this.cacti.map((c) => {
                c.body.setImmovable(true);
                c.setOrigin(1);
                c.setY(this.bottomFloor.y);
                c.setX(c.x + this.bottomFloor.x);
            });
        }

        // supergroups
        // objs, config
        // this.bottomHalf = scene.physics.add.group(
        //     [ this.bottomFloor ],
        //     { runChildUpdate: true });

        

        // console.log(this.cacti);
        // // this.cactiGroup = scene.add.group();//[], {runChildUpdate: true});
        // for (let i = 1; i <= numBottomCacti; i++) {
        //     let cactNum = Phaser.Math.Between(1, 9);
        //     // console.log("cn " + cactNum);
        //     let cObj = map.findObject("chunk", obj =>
        //         obj.name === "cact_" + cactNum + "_small");
        //     // console.log("found " + cObj.name);
        //     let c = scene.physics.add.sprite(cObj.x, cObj.y, "small-cact-sprite");
        //     c.body.setImmovable();
        //     // this.cactiGroup.add(c);
        // }
        // console.log(this.cactiGroup);
        
    
        // scene.cactiGroup.setY(this.bottomFloor.y);
        // scene.cactiGroup.setX(this.bottomFloor.x);

        scene.physics.add.collider(player, this.bottomFloor);
        // scene.physics.add.collider(player, this.cactiGroup, (player, cact) => {
        //     scene.playerDie();
        // });
        this.batoned = false;
    }

    update() {
        // make it faster if more time has passed
        // take root so that speedup falls off over time
        // add const since the first call will have timeElapsed be 0
        if (!this.scene.gameOver) {
            let v = -Math.pow(this.scene.timeElapsed + 1000, 0.75)
            this.bottomFloor.setVelocityX(v);
            this.scene.cactiGroup.setVelocityX(v);
        } else {
            this.bottomFloor.setVelocityX(0);
            this.scene.cactiGroup.setVelocityX(0);
        }

        if (this.bottomFloor.x < -this.mapW) {
            // console.log("DEAD!");
            // destroyChildren
            //TODO: do i need to destroy the things i added to the scene???
            // this.cactiGroup.destroy(true);
            // this.bottomFloor.destroy();
            this.destroy();
        }

        //TODO: increase distance for batoned over time?
        if (!this.batoned && this.bottomFloor.x < -w / 4) {
            // call adder from parent scene
            this.scene.addChunk(this.scene, this.player, this.timePassed);
            this.batoned = true;
        }
    }
}