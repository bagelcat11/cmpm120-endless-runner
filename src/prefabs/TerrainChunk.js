// make it extend generic gameobject so we can catch its destroy, etc
class TerrainChunk extends Phaser.GameObjects.GameObject {
    // get extra timePassed arg to determine difficulty, and player arg
    constructor(scene, player, timeElapsed) {
        console.log("made chunk at time " + timeElapsed);
        super(scene, "map-json");

        this.scene = scene;
        this.player = player;
        this.timeElapsed = timeElapsed;

        const map = scene.add.tilemap("map-json");
        this.mapW = map.widthInPixels;
        this.mapH = map.heightInPixels;
        // add image to map (name FROM TILED IN JSON, key)
        const tileset = map.addTilesetImage("space-station-tiles", "tileset-image");
        this.bottomTerrainLayer = map.createLayer("bottom_terrain", tileset);
        this.bottomTerrainLayer.x += w + 200 ;
        this.bottomTerrainLayer.setCollisionByProperty({collides: true});
        // this.bottomTerrainLayer.setImmoveable(true);

        // add.existing gives it body and also makes sure update() is called!!
        // scene.add.existing(this);
        // scene.add.existing(bottomTerrainLayer);
        scene.physics.add.collider(player, this.bottomTerrainLayer);
        this.batoned = false;
    }

    update() {
        // make it faster if more time has passed
        // take root so that speedup falls off over time
        // add const since the first call will have timeElapsed be 0
        this.bottomTerrainLayer.x -= Math.pow(this.scene.timeElapsed + 10, 0.5);

        if (this.bottomTerrainLayer.x < -this.mapW) {
            // console.log("DEAD!");
            this.destroy();
        }

        //TODO: increase distance for batoned over time?
        if (!this.batoned && this.bottomTerrainLayer.x < - w / 4) {
            // call adder from parent scene
            this.scene.addChunk(this.scene, this.player, this.timePassed);
            this.batoned = true;
        }
    }
}