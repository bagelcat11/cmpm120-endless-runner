class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);   // add Player to scene
        scene.physics.add.existing(this);   // add Player body to scene

        this.scene = scene;
        this.body.setCollideWorldBounds(false);
        this.body.setSize(this.width / 2, this.height).setOffset(this.width / 4, 0);
        
        this.setDepth(99);

        // make new properties
        this.gravScale = 2000;

        // create FSM (initial state, state list, state args)
        scene.playerGravFSM = new StateMachine("up", {
            down: new DownState(),
            up: new UpState(),
        }, [scene, this]);
    }

    update() {
        if (this.x < -this.width / 2 ||
                this.y > h + this.height / 2 ||
                this.y < -this.height / 2) {
            this.scene.playerDie();
            console.log("ouw")
        }
    }
}

// player state classes
class DownState extends State {
    enter(scene, player) {
        player.setGravityY(player.gravScale);
        player.resetFlip();
    }

    execute(scene, player) {
        const {left, right, up, down, space, shift } = scene.keys;

        if (Phaser.Input.Keyboard.JustDown(space) &&
                player.body.blocked.down) {
            this.stateMachine.transition("up");
            return;
        }
    }
}

class UpState extends State {
    enter(scene, player) {
        player.setGravityY(-player.gravScale);
        player.setFlipY(true);
    }

    execute(scene, player) {
        const {left, right, up, down, space, shift } = scene.keys;

        if (Phaser.Input.Keyboard.JustDown(space) &&
                player.body.blocked.up) {
            this.stateMachine.transition("down");
            return;
        }
    }
}