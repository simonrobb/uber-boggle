import { BOARD_SIZE } from './constants'

class BoardIndex {
  constructor(row, column) {
    this.row = row
    this.column = column
  }

  add(rows, columns) {
    const row = this.row+rows
    const column = this.column+columns

    if (
      row < 0 || 
      row >= BOARD_SIZE || 
      column < 0 || 
      column >= BOARD_SIZE
    ) {
      return null
    }

    return new BoardIndex(row, column)
  }
}

export default BoardIndex