// GRADING COMMENT

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    // zoom: 2,    // basically scales up canvas
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            // gravity: {x: 0, y: 0},
        }
    },
    scene: [ Load, Menu, Play ],
    // pipeline: { InvertFX }
}

const game = new Phaser.Game(config)

// globals
let w = game.config.width, h = game.config.height;