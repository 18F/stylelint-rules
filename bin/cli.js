#!/usr/bin/env node
var program = require('commander');
var path = require('path');
var stylelint = require('stylelint');
var formatters = require('stylelint/dist/formatters');
var lintConfig = require('../src/stylelint-config');

program
  .version('0.0.0')
  .usage('[options] <fileString>')
  .option('-s, --syntax <scss|css|less>', 'Linter syntax. Defaults to scss.')
  .option('-i, --ignore-files <string>', 'Glob of directories or files to ignore')
  .option('-f, --formatter <verbose|json|string>', 'Output formatter. Defaults to verbose.')
  .option('-c, --config <rules>', 'Path to a js file that exports an object describing additional rules.')
  .parse(process.argv);

var files = program.args.pop();

if (!files) {
  console.log('You must supply the path of files to lint.');
  process.exit();
}

var formatter = program.formatter || 'verbose';
var ignoredFiles = program['ignore-files'];

if (ignoredFiles) {
  lintConfig['ignoreFiles'] = ignoredFiles;
}

stylelint.lint({
  files: files,
  config: program.config || lintConfig,
  configBasedir: path.join(__dirname, '../', './src'),
  syntax: program.syntax || 'scss',
  formatter: formatter
}).then(function(output) {
  var outputFormatter = formatters[formatter];
  console.log(outputFormatter && outputFormatter(output.results));
}).catch(function(err) {
  console.log(err);
});
