import Phaser from 'phaser'
import React from 'react'
import TitleScreen from '../scenes/TitleScreen'
import Table from '../scenes/Table'
import Win from '../scenes/Win'
import Lose from '../scenes/Lose'
import Tie from '../scenes/Tie'
import Music from '../helpers/music'

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO
}

const game = new Phaser.Game(config)
const music = new Music()
game.globals = { music }

game.scene.add('Tie', Tie)
game.scene.add('Lose', Lose)
game.scene.add('Win', Win)
game.scene.add('TitleScreen', TitleScreen)
game.scene.add('Table', Table)

game.scene.start('TitleScreen')

const Home = () => {
    return (
        <h1>BlackJack Time</h1>
    )
}

export default Home