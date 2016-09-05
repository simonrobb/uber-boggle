// Prevent mocha from interpreting non-js @import files
function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.handlebars'] = noop;
require.extensions['.svg'] = noop;