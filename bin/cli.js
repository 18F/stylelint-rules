var program = require('commander');
var path = require('path');
var stylelint = require('stylelint');
var formatters = require('stylelint/dist/formatters');
var lintConfig = require('../src/stylelint-config');

program
  .version('0.0.0')
  .usage('[options]')
  .option('-f, --files <string>', 'Glob of files to lint.')
  .option('-s, --syntax <scss|css|less>', 'Linter syntax. Defaults to scss.')
  .option('-i, --ignore-files <string>', 'Glob of directories or files to ignore')
  .option('-r, --formatter <verbose|json|string>', 'Output formatter. Defaults to verbose.')
  .option('-c, --config <rules>', 'Path to a js file that exports an object describing additional rules.')
  .parse(process.argv);

if (!program.files) {
  console.log('You must supply the path of files to lint.');
  process.exit();
}

var formatter = program.formatter || 'verbose';
var ignoredFiles = program['ignore-files'];

if (ignoredFiles) {
  lintConfig['ignoredFiles'] = ignoredFiles;
}

stylelint.lint({
  files: program.files,
  config: lintConfig,
  configBasedir: path.join(__dirname, '../', './src'),
  syntax: program.syntax || 'scss',
  formatter: formatter
}).then(function(output) {
  var outputFormatter = formatters[formatter];
  console.log(outputFormatter && outputFormatter(output.results));
}).catch(function(err) {
  console.log(err);
});
