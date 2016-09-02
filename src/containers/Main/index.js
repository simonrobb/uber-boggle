import $ from 'jquery'
import Words from '../../components/Words'
import BoardView from '../../components/BoardView'
import { Board, BoardIndex } from '../../components/Board'

import view from './index.handlebars'
import styles from './style.css'


/**
 * The main boggle view
 */

class Main {
  constructor(container) {
    this.container = container

    // Bind event handler to the context of this class
    this.handleNewGameClick = this.handleNewGameClick.bind(this)
    this.handleSubmitWordClick = this.handleSubmitWordClick.bind(this)

    // Initialize with a new game 
    this.newGame()
    this.render()
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
    this.board = new Board()
  }


  /**
   * Reset the game timer
   */

  resetTimer() {

  }


  /**
   * Render the component and create child components
   */

  render() {
    const merged = {
      controller: this,
      styles
    }

    // Create the view
    const html = view(merged)
    this.container.html(html)

    // Attach events
    $('#new-game', this.container).on('click', this.handleNewGameClick)
    $('#submit-word', this.container).on('click', this.handleSubmitWordClick)

    // Create child components
    this.boardEl = new BoardView(this.board, $('#board', this.container))
  }


  /**
   * Update child components to represent current state
   */

  updateChildren() {
    if (this.boardEl) {
      this.boardEl.setConfig(this.board)
      this.boardEl.render()
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


  /**
   * When the submit word button is clicked
   */

  handleSubmitWordClick() {
    const word = $('#word', this.container).val()
    console.log(this.board.validateWord(word))
    /* Words
      .check(word)
      .then(isValid => {
        console.log(isValid)
      }) */
  }
}

export default Main