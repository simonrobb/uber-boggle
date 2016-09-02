import { BoardIndex } from '.'
import { BOARD_SIZE } from './constants'

class Board {
  constructor() {
    this.generate()
  }


  /**
   * Generate a random board configuration
   */

  generate() {
    this.rows = new Array(BOARD_SIZE).fill('x').map(
      () => new Array(BOARD_SIZE).fill('x').map(
        () => {
          return (Math.round(Math.random()*25) + 10).toString(36)
        }
      )
    )
  }


  /**
   * Find the positions of a letter
   */

  findIndicesofLetter(letter, availableIndices = null) {
    const indices = []
    this.rows.forEach((row, i) => {
      row.forEach((l, j) => {
        if (l == letter) {
          indices.push(new BoardIndex(i, j))
        }
      })
    })
    return indices
  }


  /**
   * Get the full set of indices for this board
   */

  getAllIndices() {
    const indices = []
    for (let i=0; i<BOARD_SIZE; i++) {
      for (let j=0; j<BOARD_SIZE; j++) {
        indices.push(new BoardIndex(i, j))
      }
    }
    return indices
  }


  /**
   * Get the indices of letters around a given index 
   * that are available to be used
   */

  getAvailableLetterIndices(index) {
    let indices = []

    indices.push(index.add(-1, -1))
    indices.push(index.add(-1, 0))
    indices.push(index.add(-1, 1))
    indices.push(index.add(0, -1))
    indices.push(index.add(0, 1))
    indices.push(index.add(1, -1))
    indices.push(index.add(1, 0))
    indices.push(index.add(1, 1))
    indices = indices.filter(index => !!index)

    return indices
  }

  testMove(letter, currentIndex = null) {
    const availableIndices = currentIndex 
      ? this.getAvailableLetterIndices(currentIndex)
      : this.getAllIndices()
    return availableIndices.filter(index => this.rows[index.row][index.column] === letter)
  }

  recurse(word, currentIndex = null) {
    const indices = this.testMove(word.charAt(0), currentIndex)

    // There is no next move for this index/letter
    if (!indices.length) {
      return false
    }

    // The word is fully matched
    const remaining = word.substring(1)
    if (!remaining.length) {
      return true
    }

    // Iterate through next moves and recurse
    return indices
      .map(index => this.recurse(remaining, index))
      .reduce((prev, curr) => (prev || curr), false)
  }


  /**
   * Validate a word against the board configuration
   */

  validateWord(word) {
    return this.recurse(word)
  }
}

export default Board