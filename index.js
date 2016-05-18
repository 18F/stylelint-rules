var program = require('commander');
var path = require('path');
var stylelint = require('stylelint');
var formatters = require('stylelint/dist/formatters');
var lintConfig = require('./src/stylelint-config');

var gulpStylelint = require('gulp-stylelint');
var path = require('path');

module.exports = function(files, syntax, ignore) {
  if (!files) {
    throw new Error('File to lint must be supplied').
  }

  var lintConfig = require('./src/stylelint-config');

  if (ignore) {
    lintConfig['ignoreFiles'] = ignore;
  }

  return gulp
    .src(files)
    .pipe(gulpStylelint({
      config: require('./src/stylelint-config'),
      configBasedir: path.join(__dirname, './src'),
      syntax: syntax || 'scss',
      reporters: [
        {formatter: 'verbose', console: true}
      ]
    }));
};
