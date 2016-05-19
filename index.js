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

  return function() {
    return gulp
      .src(files)
      .pipe(gulpStylelint({
        config: require('./src/stylelint-config'),
        configBasedir: path.join(__dirname, './src'),
        syntax: options.syntax || 'scss',
        reporters: [
          {formatter: 'verbose', console: true}
        ]
      }));
  }
};
