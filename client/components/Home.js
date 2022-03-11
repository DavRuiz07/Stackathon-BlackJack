import Phaser from 'phaser'
import React from 'react'
import TitleScreen from '../scenes/TitleScreen'
import Table from '../scenes/Table'

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO
}

const game = new Phaser.Game(config)

game.scene.add('TitleScreen', TitleScreen)
game.scene.add('Table', Table)

game.scene.start('TitleScreen')

const Home = () => {
    return (
        <h1>BlackJack Time</h1>
    )
}

export default Home