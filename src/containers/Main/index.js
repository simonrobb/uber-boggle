import $ from 'jquery'
import Words from '../../components/Words'
import ScoreView from '../../components/ScoreView'
import BoardView from '../../components/BoardView'
import WordListView from '../../components/WordListView'
import { Board, BoardIndex } from '../../components/Board'

import view from './index.handlebars'
import styles from './style.css'
import logo from './logo.svg'


/**
 * The main boggle view
 */

class Main {
  constructor(container) {
    this.container = container

    // Bind event handler to the context of this class
    this.handleNewGameClick = this.handleNewGameClick.bind(this)
    this.handleInputFormSubmit = this.handleInputFormSubmit.bind(this)

    // Initialize
    this.gameActive = false
    this.score = 0
    this.render()
  }


  /**
   * Start a new game
   */

  newGame() {
    this.gameActive = true
    this.generateBoard()
    this.resetTimer()
    this.resetScore()
    this.resetWords()
    this.updateChildren()
    this.render()
    this.resetWordInput()
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
   * Reset word input
   */

  resetWordInput() {
    $('#word').val('').focus()
  }


  /**
   * Add and score a valid word
   */

  addWord(word) {
    this.words.unshift(word)
    this.score += word.length
  }


  /**
   * Validate word, and add/score if valid
   */

  submitWord(word) {
    const callback = (err, word) => {
      this.resetWordInput()

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
      styles,
      logo
    }

    // Create the view
    const html = view(merged)
    this.container.html(html)

    // Set game state in ui
    if (this.gameActive) {
      this.container.children().eq(0).addClass(styles.gameActive)
    } else {
      this.container.children().eq(0).removeClass(styles.gameActive)
    }

    // Attach events
    $('#new-game', this.container).on('click', this.handleNewGameClick)
    $('#word', this.container).on('propertychange change click keyup input paste', this.handleWordInputChange)
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
    }

    if (this.timerEl) {
      this.timerEl.setTime(this.time)
    }

    if (this.scoreEl) {
      this.scoreEl.setScore(this.score)
    }

    if (this.wordListEl) {
      this.wordListEl.setWords(this.words)
    }
  }


  /**
   * When the new game button is clicked
   */

  handleNewGameClick() {
    this.newGame()
  }


  /**
   * When the value of the word input changes
   */

  handleWordInputChange(event) {
    (!!$(this).val()) 
      ? $('#input-submit').prop('disabled', null)
      : $('#input-submit').prop('disabled', 'disabled')
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