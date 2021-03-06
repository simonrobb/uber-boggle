import view from './index.handlebars'
import styles from './style.css'


/**
 * Word list view component
 */

class WordListView {
  constructor(words, container) {
    this.words = words
    this.container = container
  }

  setWords(words) {
    this.words = words
    this.render()
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

export default WordListView