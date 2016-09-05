import $ from 'jquery'
import Main from './containers/Main'

import styles from './style.css'
import typographyStyles from './components/Typography/style.css'
import formStyles from './components/Form/style.css'

/**
 * Application entry point
 * 
 * Our application only has one top-level view, 
 * load it into the dom.
 * This task should be assigned to a routing library in a 
 * more advanced application.
 */

$(document).ready(() => {
    const main = new Main($('#root'))
    main.render() 
})