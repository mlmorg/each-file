# each-file

[![build status][build-png]][build]
[![Davis Dependency status][dep-png]][dep]

[![NPM][npm-png]][npm]

Loop over file buffers or streams.

## Example

```js
var eachFile = require("each-file");

eachFile('*.js', function withFile(file, cb) {
  file.path // The file path
  file.base // Base path based on glob
  file.relative // Relative file path from base
  file.contents // The file contents
  cb(null);
}, function onDone() {
  // completed iterating
});
```

## Installation

`npm install each-file`

## Tests

`npm test`

## NPM scripts

 - `npm run cover` This runs the tests with code coverage
 - `npm run lint` This will run the linter on your code
 - `npm test` This will run the tests.
 - `npm run trace` This will run your tests in tracing mode.
 - `npm run travis` This is run by travis.CI to run your tests
 - `npm run view-cover` This will show code coverage in a browser

## Contributors

 - Matt Morgan

## MIT Licenced

  [build-png]: https://secure.travis-ci.org/mlmorg/each-file.png
  [build]: https://travis-ci.org/mlmorg/each-file
  [dep-png]: https://david-dm.org/mlmorg/each-file.png
  [dep]: https://david-dm.org/mlmorg/each-file
  [npm-png]: https://nodei.co/npm/each-file.png?stars&downloads
  [npm]: https://nodei.co/npm/each-file
