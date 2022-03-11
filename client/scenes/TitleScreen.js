import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene {
    constructor() {
        super('TitleScreen')
    }

    preload() {
        this.load.image('startButton', 'assets/StartButton.png')
    }
    create() {
        const text = this.add.text(400, 250, "BlackJack")
        text.setOrigin(0.5, 0.5)
        this.add.image(400, 350, 'startButton')
        this.input.on('pointerdown', function () {
            this.scene.start('Table')
        }, this)
    }
}