class TerrainChunk extends Phaser.Tilemaps.Tilemap {
    // get extra timePassed arg to determine difficulty, and player arg
    constructor(scene, player, timePassed) {
        super(scene, "map-json");

        this.scene = scene;
        this.player = player;
        this.timePassed = timePassed;

        const map = scene.add.tilemap("map-json");
        // add image to map (name FROM TILED IN JSON, key)
        const tileset = map.addTilesetImage("space-station-tiles", "tileset-image");
        this.bottomTerrainLayer = map.createLayer("bottom_terrain", tileset);
        this.bottomTerrainLayer.setCollisionByProperty({collides: true});

        // add.existing gives it body and also makes sure update() is called!!
        // scene.add.existing(this);
        // scene.add.existing(bottomTerrainLayer);
        scene.physics.add.collider(player, this.bottomTerrainLayer);
        // this.bottomTerrainLayer.x += 100;
    }

    update() {
        this.bottomTerrainLayer.x -= 1;
        // console.log(this.map.getLayer("bottom_terrain").x);
        // this.map.getLayer("bottom_terrain").x -= 10;
    }
}