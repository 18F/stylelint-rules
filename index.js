var path = require('path');
var gulp = require('gulp');
var gulpStylelint = require('gulp-stylelint');
var stylelint = require('stylelint');
var lintConfig = require('./src/stylelint-config');

module.exports = function(files, options) {
  options = (typeof options === 'object' && options) || {};

  if (!files || typeof files !== 'string') {
    throw new Error('File to lint must be supplied');
  }

  var lintConfig = require('./src/stylelint-config');

  if (options.ignore) {
    lintConfig['ignoreFiles'] = options.ignore;
  }

  if (typeof options.config === 'string' && options.config) {
    lintConfig = require(path.resolve(__dirname, options.config));
  }

  return function() {
    return gulp
      .src(files)
      .pipe(gulpStylelint({
        config: lintConfig,
        configBasedir: path.join(__dirname, './src'),
        syntax: options.syntax || 'scss',
        reporters: [
          {formatter: 'verbose', console: true}
        ]
      }));
  }
};
