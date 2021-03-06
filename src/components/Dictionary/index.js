import $ from 'jquery'

class Dictionary {

  /**
   * Generate the api check url for a given word query
   */

  static getWordCheckUrl(word) {
    return `https://en.wiktionary.org/w/api.php?action=query&titles=${word}&format=json`
  }
  

  /**
   * Check a word
   */

  static check(word) {
    const url = Dictionary.getWordCheckUrl(word)

    const p = new Promise((resolve, reject) => {
      $.ajax({
        url,
        jsonp: 'callback',
        dataType: 'jsonp',
        success: (response) => resolve(response),
        error: (err) => reject(err)
      })
    })

    return p.then(Dictionary.onCheckWordSuccess)
  }


  /**
   * When the word check returns successfully
   */

  static onCheckWordSuccess(response) {
    const result = Dictionary.getResultFromApiResponse(response)
    return result
  }


  /**
   * When the word check results in a error
   */

  static onCheckWordError(response) {
    
  }


  /**
   * Identify if a word exists from the api response
   */

  static getResultFromApiResponse(response) {
    const pages = response.query.pages
    return pages[-1] === undefined
  }
}

export default Dictionary