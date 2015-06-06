'use strict';
var Buffer = require('buffer').Buffer;
var path = require('path');
var setTimeout = require('timers').setTimeout;
var test = require('tape');
var Vinyl = require('vinyl');

var eachFile = require('../index');

test('iterating a file', function t(assert) {
  callEachFile('foo.js', function iterator(file, cb) {
    assert.ok(file instanceof Vinyl,
      'calls back with vinyl objects');

    assert.ok(file.path.match(/foo\.js$/),
      'sets filepath correctly');

    assert.equal(file.base, 'test/fixtures/',
      'sets the base path correctly');

    assert.equal(file.relative, 'foo.js',
      'sets the relative path correctly');

    assert.ok(file.contents instanceof Buffer,
      'file contents are a buffer');

    cb();
  }, completeTest.bind(null, assert));
});

test('globbing two files', function t(assert) {
  var called = 0;
  callEachFile('*.js', function iterator(file, cb) {
    called += 1;
    cb();
  }, function onComplete(err) {
    assert.equal(called, 2,
      'iterates files correctly');
    completeTest(assert, err);
  });
});

test('eachFile without limit', function t(assert) {
  var called = 0;
  var expected = 2;
  callEachFile('*.js', function iterator(file, cb) {
    called += 1;
    setTimeout(function checkCalls() {
      assert.equal(called, expected,
        'does not limit asynchronous iterations');
      cb();
    }, 1);
  }, completeTest.bind(null, assert));
});

test('eachFile with limit', function t(assert) {
  var called = 0;
  var expected = 1;
  var options = {limit: 1};
  callEachFile('*.js', options, function iterator(file, cb) {
    called += 1;
    setTimeout(function checkCalls() {
      assert.equal(called, expected,
        'correctly limits asynchronous iterations');
      expected += 1;
      cb();
    }, 1);
  }, completeTest.bind(null, assert));
});

function callEachFile(glob, options, iterator, cb) {
  var fullGlob = createGlob(glob);
  eachFile(fullGlob, options, iterator, cb);
}

function completeTest(assert, err) {
  assert.ifError(err,
    'does not error');
  assert.end();
}

function createGlob(glob) {
  return path.join('test/fixtures', glob);
}
