import Phaser from "phaser";
import Card from "../helpers/card";
import Music from "../helpers/music"


export default class Table extends Phaser.Scene {
    constructor() {
        super('Table')
    }

    preload() {
        this.load.image('playerTag', 'assets/playerTag.png')
        this.load.image('dealerTag', 'assets/DealerTag.png')
        this.load.image('cardBack', 'assets/CardBase.png')
        this.load.image('passButton', 'assets/PassButton.png')
        this.load.image('hitButton', 'assets/HitButton.png')
        this.load.image('card1', 'assets/CardBase1.png')
        this.load.image('card2', 'assets/CardBase2.png')
        this.load.image('card3', 'assets/CardBase3.png')
        this.load.image('card4', 'assets/CardBase4.png')
        this.load.image('card5', 'assets/CardBase5.png')
        this.load.image('card6', 'assets/CardBase6.png')
        this.load.image('card7', 'assets/CardBase7.png')
        this.load.image('card8', 'assets/CardBase8.png')
        this.load.image('card9', 'assets/CardBase9.png')
        this.load.image('card10', 'assets/CardBase10.png')
        this.load.image('background', 'assets/tabletop.png')
        this.load.audio('bgm', 'assets/bgm.mp3')
        this.load.bitmapFont('count', 'assets/numbs.png', 'assets/numbs.xml')
    }
    create() {
        let b = this.add.image(400, 250, 'background').setScale(1.4, 1.3)
        b.setOrigin(0.5, 0.5)

        this.Music = this.sys.game.globals.music
        if (this.Music.musicOn === true && this.Music.bgMusicPlaying === false) {
            this.bgm = this.sound.add('bgm')
            this.bgm.play({
                loop: true
            })
            this.Music.bgMusicPlaying = true;
        }

        this.cameras.main.setBackgroundColor('#421278')

        this.pKeeper = this.add.bitmapText(700, 275, 'count', 0, 64)
        this.hKeeper = this.add.bitmapText(700, 75, 'count', 0, 64)

        this.add.image(100, 300, 'playerTag').setScale(0.8, 0.8)
        this.add.image(100, 100, 'dealerTag').setScale(0.8, 0.8)

        let self = this
        this.pTurn = false
        this.hTurn = true

        this.playerScore = 0
        this.houseScore = 0

        this.playerCards = []
        this.houseCards = []

        for (let i = 0; i < 2; i++) {
            this.time.delayedCall(1000, () => {
                let rand = Phaser.Math.Between(1, 10)
                let card = new Card(this, rand)
                card.render(250 + (65 * i), 300 + Phaser.Math.Between(-10, 10), rand)
                this.playerCards.push(card)
                this.pTurn = true
                self.scoreUpdater()
            })
        }

        this.time.delayedCall(1000, () => {
            let rand = Phaser.Math.Between(1, 10)
            let dealerCard = new Card(this, rand)
            dealerCard.render(250, 100 + Phaser.Math.Between(-10, 10), rand)
            this.houseCards.push(dealerCard)
            self.scoreUpdater()
        })

        this.whoWon = () => {
            if (this.houseScore <= 21) {
                if (this.houseScore > this.playerScore) {
                    this.time.delayedCall(1000, () => {
                        this.cameras.main.fadeOut(1000, 0, 0, 0)
                        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                            this.time.delayedCall(1000, () => {
                                this.scene.start('Lose', { pScore: this.playerScore, hScore: this.houseScore })
                            })
                        })
                    })
                } else if (this.playerScore > this.houseScore) {
                    this.time.delayedCall(1000, () => {
                        this.cameras.main.fadeOut(1000, 0, 0, 0)
                        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                            this.time.delayedCall(1000, () => {
                                this.scene.start('Win', { pScore: this.playerScore, hScore: this.houseScore })
                            })
                        })
                    })
                }
                if (this.playerScore === this.houseScore) {
                    this.scene.start('Tie', { pScore: this.playerScore, hScore: this.houseScore })
                }
            }
        }

        this.scoreUpdater = () => {
            let pAcc = 0
            let hAcc = 0
            this.playerCards.forEach(current => {
                pAcc += current.value
            })
            this.houseCards.forEach(current => {
                hAcc += current.value
            })
            this.playerScore = pAcc
            this.houseScore = hAcc
        }

        this.hasPlayerWentOver = () => {
            let accum = 0
            this.playerCards.forEach(current => {
                accum += current.value
            })
            if (accum > 21) {
                this.pTurn = false
                this.hTurn = false
                this.time.delayedCall(1000, () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0)
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start('Lose', { pScore: this.playerScore, hScore: this.houseScore })
                        })
                    })
                })
            } else if (accum === 21) {
                this.pTurn = false
                this.hTurn = false
                this.time.delayedCall(1000, () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0)
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start('Win', { pScore: this.playerScore, hScore: this.houseScore })
                        })
                    })
                })
            }
        }

        this.hasHouseWentOver = () => {
            let accum = 0
            this.houseCards.forEach(current => {
                accum += current.value
            })
            if (accum > 21) {
                this.time.delayedCall(1000, () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0)
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start('Win', { pScore: this.playerScore, hScore: this.houseScore })
                        })
                    })
                })
            }
        }

        this.houseRule = () => {
            if (this.houseScore >= 17) {
                return false
            } else return true
        }

        this.dealPlayerCard = () => {
            let count = 2
            return function deal() {
                let rand = 0
                rand = Phaser.Math.Between(1, 10)
                let playerCard = new Card(this, rand)
                playerCard.render(250 + (65 * count), 300 + Phaser.Math.Between(-10, 10), rand)
                count += 1
                return playerCard
            }
        }
        this.dealHouseCard = () => {
            let count = 1
            return function deal() {
                self.pTurn = false
                self.hTurn = false
                while (self.houseScore <= 16) {
                    const rand = Phaser.Math.Between(1, 10)
                    let houseCard = new Card(this, rand)
                    houseCard.render(250 + (65 * count), 100 + Phaser.Math.Between(-10, 10), rand)
                    count += 1
                    self.houseCards.push(houseCard)
                    self.scoreUpdater()
                }
            }
        }

        this.houseDeal = this.dealHouseCard()
        this.playerDeal = this.dealPlayerCard()

        this.hit = this.add.image(150, 450, 'hitButton').setInteractive()
        this.pass = this.add.image(590, 450, 'passButton').setInteractive()

        this.hit.on('pointerdown', function () {
            if (self.pTurn) {
                self.playerCards.push(self.playerDeal())
                self.scoreUpdater()
                self.hasPlayerWentOver()
            }
        })
        this.pass.on('pointerdown', function () {
            if (self.hTurn) {
                self.houseDeal()
                self.hasHouseWentOver()
                self.whoWon()
            }
        })
    }

    update() {
        this.pKeeper.setText(`${this.playerScore}`)
        this.hKeeper.setText(`${this.houseScore}`)
    }
}