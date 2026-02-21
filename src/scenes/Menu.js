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
            align: "left",
            padding: {
                top: 5,
                bottom: 5,
                left: w / 4
            },
            fixedWidth: w
        };
        let creditsText = [
            "",
            "PROGRAMMING: Lynn Gen (using Phaser.js)\n",
            "ART: Lynn Gen (using Aseprite)\n",
            "SFX: Lynn Gen (using Audacity and jfxr)\n",
            "MUSIC: Lynn Gen (using BeepBox)\n",
            "",
            "(Press [↓] to hide)",
            "",
        ];
        this.credits = this.add.text(w / 2, h / 2, creditsText, creditsConfig).setOrigin(0.5);
        this.credits.visible = false;

        this.bgm = this.sound.add("bgm").setLoop(true).setVolume(bgmVol);
        this.bgm.play();
        this.bgm.setSeek(bgmTimestamp);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            bgmTimestamp = this.bgm.seek;
            this.bgm.destroy();
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
            this.sound.play("ui-sfx");
            this.credits.visible = !this.credits.visible;
        }
    }
}