var testRule = require('stylelint-test-rule-tape');
var urlFormat = require('./index');

var badUrlProtocol = 'http://cdn.com/path/to/my/image';
var badUrlDomain = 'cdn.com/path/to/my/image';

testRule(urlFormat.rule, {
  ruleName: urlFormat.ruleName,
  config: [true],
  accept: [{
    code: '.foo { background: url("path/to/image")}'
  }, {
    code: '.foo { background: url("//path/to/image")}',
  }],
  reject: [{
    code: '.foo { background: url(' + badUrlProtocol + '); }',
    message: urlFormat.messages.rejected('url(' + badUrlProtocol + ')')
  }]
});
