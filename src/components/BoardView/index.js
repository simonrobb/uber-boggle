import view from './index.handlebars'
import styles from './style.css'


/**
 * Board view component
 */

class BoardView {
  constructor(board, container) {
    this.board = board
    this.container = container
    this.render()
  }

  setBoard(board) {
    this.board = board
  }

  render() {
    const data = {
      controller: this,
      styles
    }

    const html = view(data)
    this.container.html(html)
  }
}

export default BoardView