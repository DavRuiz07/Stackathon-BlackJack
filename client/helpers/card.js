export default class Card {
    constructor(scene, num) {
        this.render = (x, y, cardNum) => {
            let card = scene.add.image(x, y, `card${cardNum}`).setScale(0.4, 0.4)
            return card
        }
        this.value = num
    }
}