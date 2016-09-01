import view from './index.handlebars'
import styles from './style.css'


/**
 * The main boggle view
 */

const BOARD_SIZE = 6

class Main {
  constructor() {
    this.newGame()
  }

  newGame() {
    this.generateBoard()
  }

  generateBoard() {
    const rows = new Array(BOARD_SIZE).fill('x').map(
      () => new Array(BOARD_SIZE).fill('x').map(
        () => {
          return (Math.round(Math.random()*25) + 10).toString(36)
        }
      )
    )

    this.board = {
      rows: rows
    }
  }

  render() {
    console.log(styles);
    return view({
      board: this.board,
      styles
    })
  }
}

export default Main