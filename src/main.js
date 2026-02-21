// GRADING COMMENT

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,
    width: 512, // 16:9
    height: 288,
    pixelArt: true,
    zoom: 2,    // basically scales up canvas
    physics: {
        default: "arcade",
        arcade: {
            // debug: true,
            // gravity: {x: 0, y: 0},
        }
    },
    scene: [ Load, Menu, Play ],
}

const game = new Phaser.Game(config);

// globals
let w = game.config.width, h = game.config.height;
let bgmTimestamp = 0;
let bgmVol = 0.3;
let commodoreGreen = 0x55a049;
let commodorePurple = 0x40318d;