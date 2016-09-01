import view from './index.handlebars'
import styles from './style.css'


/**
 * Board component
 */

class Board {
  constructor(config, container) {
    this.config = config
    this.container = container
    this.render()
  }

  setConfig(config) {
    this.config = config
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

export default Board