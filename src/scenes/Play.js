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
        this.player.setScale(0.5);
        // this.player.body.setSize(0.5);

        // instructions
        document.getElementById("info").innerText = "use SPACE to switch gravity";

        // set up inversion shader
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/postfx-pipeline/
        this.pipelineManager = this.sys.renderer.pipelines;
        this.pipelineManager.addPostPipeline("InvertFX", new InvertFX(this));
        this.cameras.main.postFX.addColorMatrix();

        // debug stuff
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugText = this.add.text(0, h - 64);
    }

    update() {
        this.playerGravFSM.step();
        this.debugText.setText([
            "Pos: " + this.player.body.x + ", " + this.player.body.y,
            "Vel: " + this.player.body.velocity.x + ", " + this.player.body.velocity.y
        ]);
    }
}