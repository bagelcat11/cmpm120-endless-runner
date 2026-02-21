/*
    Name: Lynn Gen
    Game: Zworp's Space Escape
    Approx. hrs: 30
    Creative tilt:
        - On the technical side, my game's increasing difficulty comes from
            a procedural generation-like routine I made in the TerrainChunk
            class. It parses a Tiled map to get possible locations for cacti,
            and then places a random subset of them (which is more likely to
            be large as time goes on). I'm happy that I was able to get so much
            procedural variation out of a single class, while still having the
            obstacles' difficulty scale fairly.
        - On the artistic side, I'm proud of the fact that I made the music
            myself, as I was originally not planning on doing so. I also chose
            a limited color palette (the Commodore 64's) for all of the art,
            which was fun to work within, and I feel that the combination of
            a retro palette with modern graphical effects like parallax and
            higher-res sprites gives my game a unique look.  

*/

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