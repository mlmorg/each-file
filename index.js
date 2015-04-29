'use strict';
var eachLimit = require('each-limit');
var extend = require('xtend');
var fs = require('fs');
var vinylGlobby = require('vinyl-globby');
var waterfall = require('run-waterfall');

module.exports = eachFile;

function eachFile(glob, options, iterator, cb) {
  if (typeof options === 'function') {
    cb = iterator;
    iterator = options;
    options = null;
  }

  options = extend({
    limit: Infinity
  }, options);

  waterfall([
    globFiles,
    iterateFilepaths
  ], cb);

  function globFiles(_cb) {
    vinylGlobby(glob, _cb);
  }

  function iterateFilepaths(files, _cb) {
    eachLimit(files, options.limit, readAndIterateFile, _cb);
  }

  function readAndIterateFile(file, _cb) {
    waterfall([
      readFile,
      callIterator
    ], _cb);

    function readFile(__cb) {
      fs.readFile(file.path, __cb);
    }

    function callIterator(contents, __cb) {
      file.contents = contents;
      iterator(file, __cb);
    }
  }
}
