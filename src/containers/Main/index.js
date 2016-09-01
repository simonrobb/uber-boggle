import $ from 'jquery'
import Board from '../../components/Board'

import view from './index.handlebars'
import styles from './style.css'


/**
 * The main boggle view
 */

const BOARD_SIZE = 4

class Main {
  constructor() {
    this.newGame()

    // Bind event handler to the context of this class
    this.handleNewGameClick = this.handleNewGameClick.bind(this)
  }


  /**
   * Start a new game
   */

  newGame() {
    this.generateBoard()
    this.resetTimer()
    this.updateChildren()
  }


  /**
   * Generate a new board configuration
   */

  generateBoard() {
    const rows = new Array(BOARD_SIZE).fill('x').map(
      () => new Array(BOARD_SIZE).fill('x').map(
        () => {
          return (Math.round(Math.random()*25) + 10).toString(36)
        }
      )
    )

    this.boardConfig = {
      rows: rows
    }
  }


  /**
   * Reset the game timer
   */

  resetTimer() {

  }


  /**
   * Render the component and create child components
   */

  render(data, container) {
    const merged = {
      controller: this,
      styles
    }

    // Create the view
    const html = view(merged)
    container.html(html)

    // Attach events
    $('#new-game', container).on('click', this.handleNewGameClick)

    // Create child components
    this.board = new Board(this.boardConfig, $('#board', container))
  }


  /**
   * Update child components to represent current state
   */

  updateChildren() {
    if (this.board) {
      this.board.setConfig(this.boardConfig)
      this.board.render()
    }

    if (this.timer) {

    }
  }


  /**
   * When the new game button is clicked
   */

  handleNewGameClick() {
    this.newGame()
  }
}

export default Main