class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys();

        //TODO: set background to starting frame of playScene

        let titleConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#AA00BB",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };
        this.add.text(w / 2, h * 0.35, "Space Cowglorp Escape or smth", titleConfig).setOrigin(0.5);
        let tipConfig = {
            fontFamily: "Courier",
            fontSize: "20px",
            backgroundColor: "#AA00BB",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };
        this.add.text(w / 2, h * 0.5, "Press [SPACE] to change gravity", tipConfig).setOrigin(0.5);
        this.add.text(w / 2, h * 0.65, "Press [↓] for credits", tipConfig).setOrigin(0.5);

        let creditsConfig = {
            fontFamily: "Courier",
            fontSize: "24px",
            backgroundColor: "#116622",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: w
        };
        let creditsText = [
            "",
            "Programming: Lynn Gen\n",
            "Art: Lynn Gen\n",
            "",
            "(Press [↓] to hide)",
            "",
        ];
        this.credits = this.add.text(w / 2, h / 2, creditsText, creditsConfig).setOrigin(0.5);
        this.credits.visible = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
            this.credits.visible = !this.credits.visible;
        }
    }
}