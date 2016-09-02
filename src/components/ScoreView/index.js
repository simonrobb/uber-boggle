import view from './index.handlebars'
import styles from './style.css'


/**
 * Score view component
 */

class ScoreView {
  constructor(score, container) {
    this.score = score
    this.container = container
    this.render()
  }

  setScore(score) {
    this.score = score
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

export default ScoreView