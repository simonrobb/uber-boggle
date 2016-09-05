# Boggle: A Word Game

## Instructions

Clone the repo to your machine and use `npm install` to install dependencies.

To run the app in development mode, use `npm run start` from the root directory and point your browser at `http://localhost:8080` to play. 

To build a distribution version of the app, use `npm run build` from the root directory. The build files can be found in `/build`. Serve this directory up using a static http server such as `http-server` if desired.

To run the test suite, use `npm run test`.


## Technologies
- Bundler/build pipeline: Webpack
- ES6 transpilation: Babel
- CSS preprocessor: PostCSS
- Templating: Handlebars
- DOM selector and manipulation: jQuery
- Test: Mocha + Chai + Sinon

PostCSS modules used include autoprefixer, nested rule interpreter, color manipulation function, and variables. Most of the styles are modular, to prevent rule specificity issues and style bleed.

I considered replacing jQuery with smaller, more focussed selector/manipulation/http libraries. However, after finding that my http library of choice (Axios) didn't provide the required JSONP support, it seemed jQuery was the best option after all.


## Structure

Application files are in the `/src` directory. Within you can find:

  - `/index.js`: The bootstrapper
  - `/components`: reusable components and libraries
  - `/containers`: top-level views

The bootstrapper's job is to render the `Main` view. If there were more than one view, it would delegate this responsibility to a router library, which it would initialize instead.

Each component/container folder represents a module, which may contain a selection of a handlebars template, javascript files, and styles.


## Further work

### Rendering
What could have been done with more time? The weakest part of this implementation is the method used to render data to the view. Providing a mechanism to keep the view in sync with state is the primary job of javascript frameworks, and it's a difficult problem to solve in a lightweight manner without them.

The method I used was to contain all controller logic in the top-level component (the `container`). This container is in charge of assigning state to its child components that state changes. The child components then have a responsibility to re-render themselves.

I made a tradeoff here; there were two mechanisms available pushing updates to the view:
  - Replace the component entirely, by re-templating the Handlebars file
  - Target DOM nodes with jQuery and update their values

I chose the first option because it reduced code complexity; view logic is contained in the template file, not the javascript. It also means that, for a given state at any instant, the DOM will be rendered in a consistent manner. This makes this approach analagous to React best-practice.

The downside of this approach is unncessary DOM manipulation; the entire component will be rebuilt on every state change. React optimizes here by running changes through a diffing algorithm, and I would do the same if I had the time.

### Others

The Wiktionary API doesn't appear to provide a method of filtering results by language, so the dictionary validation passes for a word in any language. It also includes common misspellings (e.g.: fourty). This API should be swapped out for a better one.

There's also a number of UI improvements to be made: highlighting words on the board when entered, indicating the API check is in progress, replacing validation alerts with inline messages, etc. 