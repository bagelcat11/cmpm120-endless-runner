class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys();

        //TODO: set background to starting frame of playScene
        //      and change text colors to commodore64
        let titleConfig = {
            fontFamily: "Courier",
            fontSize: "16px",
            backgroundColor: "#AA00BB",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };
        this.add.text(w / 2, h * 0.35, "smth title", titleConfig).setOrigin(0.5);
        let tipConfig = {
            fontFamily: "Courier",
            fontSize: "12px",
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
        let creditsText = [
            "",
            "Programming: Lynn Gen\n",
            "Art: Lynn Gen\n",
            "Palette: Commodore 64",
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