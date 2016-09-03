import $ from 'jquery'
import Dictionary from '../../components/Dictionary'
import TimerView from '../../components/TimerView'
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

const GAME_LENGTH = 60

class Main {
  constructor(container) {
    this.container = container

    // Bind event handler to the context of this class
    this.handleTimer = this.handleTimer.bind(this)
    this.handleNewGameClick = this.handleNewGameClick.bind(this)
    this.handleInputFormSubmit = this.handleInputFormSubmit.bind(this)

    // Initialize
    this.dirty = false
    this.gameActive = false
    this.time = 0
    this.score = 0
    this.render()
  }


  /**
   * Start a new game
   */

  newGame() {
    this.dirty = true
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
   * Ends a game
   */

  endGame() {
    this.gameActive = false
    this.render()
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
    this.time = GAME_LENGTH
    this.timer = setInterval(this.handleTimer, 1000)
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
   * Handle the game timer firing
   */

  handleTimer() {
    // Reduce the time on the clock
    this.time--;

    // Update the timer element
    if (this.timerEl) {
      this.timerEl.setTime(this.time)        
    }

    // End the game if time reaches zero
    if (this.time === 0) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      
      this.endGame()
    }
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

    // Normalise word
    word = word.toLowerCase()

    // Check if the word has already been found
    if (this.words.indexOf(word) !== -1) {
      return callback(`"${word}" has already been found`)
    }

    // Check the word exists on the board
    if (!this.board.validateWord(word)) {
      return callback(`Board does not contain "${word}"`)
    }

    // Check against the dictionary API
    Dictionary
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
    this.timerEl = new TimerView(this.time, $('#time', this.container))
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