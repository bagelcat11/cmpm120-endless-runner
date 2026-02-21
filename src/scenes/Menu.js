class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys();
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.menuBg = this.add.image(0, 0, "menu-bg").setOrigin(0);

        this.add.bitmapText(w / 2, h * 0.33, "c64-font", "Zworp's Space Escape", 20).setOrigin(0.5);
        this.add.bitmapText(w / 2, h * 0.5, "c64-font", "Press [SPACE] to change gravity", 12).setOrigin(0.5);
        this.add.bitmapText(w / 2, h * 0.65, "c64-font", "Press [C] for credits", 12).setOrigin(0.5);

        let creditsText = [
            "PROGRAMMING: Lynn Gen (using Phaser.js)\n",
            "ART: Lynn Gen (using Aseprite)\n",
            "SFX: Lynn Gen (using Audacity and jfxr)\n",
            "MUSIC: Lynn Gen (using BeepBox)\n",
            "FONT: Commodore 64 Pixelized\n",
            "(Press [C] to hide)",
        ];
        this.creditsBg = this.add.rectangle(w/ 2, h / 2, w, h * 2 / 3, commodorePurple);
        this.credits = this.add.bitmapText(w / 2, h / 2, "c64-font", creditsText, 14).setOrigin(0.5);
        this.credits.visible = false;
        this.creditsBg.visible = false;

        this.bgm = this.sound.add("bgm").setLoop(true).setVolume(bgmVol);
        if (bgmTimestamp != 0) {
            this.bgm.play();
            this.bgm.setSeek(bgmTimestamp);
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            bgmTimestamp = this.bgm.seek;
            this.bgm.destroy();
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.sound.play("ui-sfx");
            this.credits.visible = !this.credits.visible;
            this.creditsBg.visible = !this.creditsBg.visible;
        }
    }
}