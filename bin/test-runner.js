var glob = require('glob');
var path = require('path');
var exec = require('child_process').exec;

function makeTest(file) {
  exec('node ' + file + ' | node_modules/.bin/tap-dot', function(err, stdout, stderr) {
    console.log(stdout);
  });
}

glob(path.join(__dirname, '../', 'src/plugins/**/test.js'), function(err, matches) {
  if (err) {
    console.log('Error encountered: ', err, '\n\n\n\n');
  }

  matches.forEach(makeTest);
});
