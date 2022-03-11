import Phaser from "phaser";

export default class Table extends Phaser.Scene {
    constructor() {
        super('Table')
    }
    preload() {
        this.load.image('card', 'assets/CardBase.png')
        this.load.image('passButton', 'assets/PassButton.png')
        this.load.image('hitButton', 'assets/HitButton.png')
    }
    create() {
        let self = this

        this.hit = this.add.image(150, 450, 'hitButton').setInteractive()
        this.pass = this.add.image(590, 450, 'passButton').setInteractive()
        this.hit.on('pointerdown', function () {
            self.dealPlayerCard()
        })
        this.pass.on('pointerdown', function () {
            self.dealHouseCard()
        })
    }
}