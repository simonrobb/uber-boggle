import $ from 'jquery'
import view from './index.handlebars'
import styles from './style.css'


/**
 * Score view component
 */

class ScoreView {
  constructor(score, container) {
    this.score = score
    this.container = container
  }

  setScore(score) {
    const oldScore = this.score
    this.score = score
    this.render()
    this.animateIfUpdated(oldScore, score)
  }

  animateIfUpdated(oldScore, newScore) {
    if (oldScore !== newScore) {
      const icon = $('i', this.container)
      icon.addClass(styles.tada)
      setTimeout(() => icon.removeClass(styles.tada), 1000)
    }
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