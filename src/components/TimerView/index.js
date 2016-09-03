import $ from 'jquery'
import view from './index.handlebars'
import styles from './style.css'


/**
 * Timer view component
 */

class TimerView {
  constructor(time, container) {
    this.time = time
    this.container = container
    this.render()
  }

  setTime(time) {
    this.time = time
    this.render()
  }

  padMinute(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  render() {
    const data = {
      controller: this,
      styles,
      minutes: Math.floor(this.time / 60),
      seconds: this.padMinute(this.time % 60)
    }

    const html = view(data)
    this.container.html(html)

    if (this.time <= 5 && this.time > 0) {
      $(`.${styles.time}`).addClass(styles.red)
    } else {
      $(`.${styles.time}`).removeClass(styles.red)
    }
  }
}

export default TimerView