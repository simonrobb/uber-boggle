import view from './index.handlebars'
import styles from './style.css'


/**
 * Word list view component
 */

class WordListView {
  constructor(words, container) {
    this.words = words
    this.container = container
    this.render()
  }

  setWords(words) {
    this.words = words
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