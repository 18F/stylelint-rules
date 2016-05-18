var program = require('commander');
var path = require('path');
var stylelint = require('stylelint');

// program
//   .version('0.0.0')
//   .usage('[options]')
//   .options('-i, --ignore-files <file>', 'String containing directories or files to ignore');

stylelint.lint({
  files: './src/css/**/*.scss',
  config: require('./src/stylelint-config'),
  configBasedir: path.join(__dirname, './src'),
  syntax: 'scss',
  formatter: 'string'
}).then(function(output) {
  console.log(output.results);
}).catch(function(err) {
  console.log(err);
});
