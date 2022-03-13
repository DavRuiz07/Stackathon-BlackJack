import Phaser from 'phaser'

export default class Lose extends Phaser.Scene {
    constructor() {
        super('Tie')
    }

    init(data) {
        this.pScore = data.pScore
        this.hScore = data.hScore
    }
    preload() {
        this.load.image('playagain', 'assets/PlayagainButton.png')
    }
    create() {

        const text = this.add.text(400, 250, "Tie")
        this.add.text(430, 150, 'House Score')
        this.add.text(250, 150, 'Your Score')
        this.add.text(300, 200, `${this.pScore}`)
        this.add.text(480, 200, `${this.hScore}`)
        text.setOrigin(0.5, 0.5)
        this.add.image(400, 350, 'playagain')
        this.input.on('pointerdown', function () {
            this.scene.start('Table')
        }, this)
    }
}