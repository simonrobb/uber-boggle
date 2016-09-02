import $ from 'jquery'
import Words from '../../components/Words'
import ScoreView from '../../components/ScoreView'
import BoardView from '../../components/BoardView'
import WordListView from '../../components/WordListView'
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
    this.handleInputFormSubmit = this.handleInputFormSubmit.bind(this)

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
    this.resetScore()
    this.resetWords()
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
    this.time = 0
  }


  /**
   * Reset the game score
   */

  resetScore() {
    this.score = 0
  }


  /**
   * Reset the word list
   */

  resetWords() {
    this.words = []
  }


  /**
   * 
   */

  addWord(word) {
    this.words.push(word)
    this.score += word.length
  }


  /**
   * 
   */

  submitWord(word) {
    const callback = (err, word) => {
      $('#word').val('').focus()

      if (err) {
        return alert(err)
      }

      this.addWord(word)
      this.updateChildren()
    }

    if (!this.board.validateWord(word)) {
      return callback(`Board does not contain "${word}"`)
    }

    Words
      .check(word)
      .then(valid => {
        if (!valid) {
          return callback(`"${word}" is not a word`)
        }

        callback(null, word)
      })
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
    $('#input-form', this.container).on('submit', this.handleInputFormSubmit)

    // Create child components
    this.boardEl = new BoardView(this.board, $('#board', this.container))
    this.scoreEl = new ScoreView(this.score, $('#score', this.container))
    this.wordListEl = new WordListView(this.words, $('#word-list', this.container))
  }


  /**
   * Update child components to represent current state
   */

  updateChildren() {
    if (this.boardEl) {
      this.boardEl.setBoard(this.board)
      this.boardEl.render()
    }

    if (this.timerEl) {
      this.timerEl.render()
    }

    if (this.scoreEl) {
      this.scoreEl.setScore(this.score)
      this.scoreEl.render()
    }

    if (this.wordListEl) {
      this.wordListEl.setWords(this.words)
      this.wordListEl.render()
    }
  }


  /**
   * When the new game button is clicked
   */

  handleNewGameClick() {
    this.newGame()
  }


  /**
   * When the input form is submitted
   */

  handleInputFormSubmit(event) {
    event.preventDefault()
    const word = $('#word', this.container).val() 
    this.submitWord(word)
  }
}

export default Main