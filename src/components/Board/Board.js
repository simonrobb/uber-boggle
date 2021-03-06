import { BoardIndex } from '.'
import { BOARD_SIZE } from './constants'

class Board {
  constructor() {
    this.generate()
  }


  /**
   * Generate a random board configuration
   * 
   * @return null
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
   * Get the full set of indices for this board
   * 
   * @return Array
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
   * 
   * @return Array
   */

  getAvailableIndices(index, usedIndices = []) {
    let indices = []

    indices.push(index.add(-1, -1))
    indices.push(index.add(-1, 0))
    indices.push(index.add(-1, 1))
    indices.push(index.add(0, -1))
    indices.push(index.add(0, 1))
    indices.push(index.add(1, -1))
    indices.push(index.add(1, 0))
    indices.push(index.add(1, 1))
    
    // Filter out indices which are off the board (null)
    // and have been used
    indices = indices
      .filter(index => !!index)
      .filter(index => !usedIndices.find(i => 
        (i.row == index.row) &&
        (i.column == index.column)
      ))

    return indices
  }


  /**
   * Test if the provided letter can be found in the available 
   * indices surrounding the provided current board index
   * All the board is considered available if no currentIndex
   * param is provided
   * 
   * @return Array The successfully matched indices
   */

  testMove(letter, usedIndices = [], currentIndex = null) {
    const availableIndices = currentIndex 
      ? this.getAvailableIndices(currentIndex, usedIndices)
      : this.getAllIndices()
    return availableIndices.filter(index => this.rows[index.row][index.column] === letter)
  }


  /**
   * Recurses through the letters of the provided word,
   * testing if each can be found on the board within
   * the confines of the game rules
   * 
   * @return boolean
   */

  recurse(word, usedIndices = [], currentIndex = null) {
    // Test if the next letter of the word can be found
    // in the tiles surrounding the provided current board index
    const indices = this.testMove(word.charAt(0), usedIndices, currentIndex)

    // The letter couldn't be found in the available board indices
    // This search tree is a failure
    if (!indices.length) {
      return false
    }

    // The word is fully matched
    // This search tree is a success
    const remaining = word.substring(1)
    if (!remaining.length) {
      return true
    }

    // Iterate through next search branches and test the next letter
    // We add this index to the list of used indices, but also make
    // a copy in order to make sure it doesn't affect other search
    // branches.
    return indices
      .map(index => {
        const used = [...usedIndices, index]
        return this.recurse(remaining, used, index)
      })
      .reduce((prev, curr) => (prev || curr), false)
  }


  /**
   * Validate a word against the board configuration
   * 
   * @return boolean
   */

  validateWord(word) {
    return this.recurse(word)
  }
}

export default Board