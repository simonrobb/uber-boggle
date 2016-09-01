import $ from 'jquery'
import Main from './containers/Main'

/**
 * Application entry point
 * 
 * Our application only has one top-level view, 
 * load it into the dom.
 * This task should be assigned to a routing library in a 
 * more advanced application.
 */

$(document).ready(() => {
    const main = new Main() 
    main.render({ title: 'Boggle' }, $('#root'))
})