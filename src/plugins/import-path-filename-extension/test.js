var testRule = require('stylelint-test-rule-tape');
var importPath = require('./index');

testRule(importPath.rule, {
  ruleName: importPath.ruleName,
  skipBasicChecks: true,
  config: false,
  accept: [{
    code: '@import "valid-file"'
  }],
  reject: [
    {
      code: '@import "invalid-file.scss"',
      message: importPath.messages.rejected
    }
  ],
  description: '@import statement should not contain a file extension'
});

testRule(importPath.rule, {
  ruleName: importPath.ruleName,
  skipBasicChecks: true,
  config: [true],
  accept: [{
    code: '@import "valid-file.css"'
  }],
  reject: [
    {
      code: '@import "invalid-file"',
      message: importPath.messages.expected
    }
  ],
  description: '@import statement should contain a file extension'
});
