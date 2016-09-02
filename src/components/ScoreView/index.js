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
    this.render()
  }

  setScore(score) {
    const oldScore = this.score
    this.score = score
    this.render()

    // Animate
    if (oldScore !== score) {
      const icon = $('i', this.container)
      icon.addClass(styles.tada)
      console.log('adding class', styles.tada, icon)
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