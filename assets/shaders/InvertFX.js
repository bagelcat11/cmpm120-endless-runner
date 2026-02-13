// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/postfx-pipeline/

// make it module "export" so we can import(??)
class InvertFX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(scene) {
        super({
            game: scene,
            renderTarget: true,
            fragShader: '...',  // GLSL
            uniforms: []
        });
    }
    
    onPreRender() {
        // this.colorMatrix.negative();
        this.colorMatrix.grayscale(true);
    }

    onDraw(renderTarget) {
        // this.colorMatrix.negative();
        this.colorMatrix.grayscale(true);
        this.drawFrame(renderTarget, this.fullFrame1);
        this.bindAndDraw(this.fullFrame1);
    }
}