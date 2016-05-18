var testRule = require('stylelint-test-rule-tape');
var importPath = require('./index');

testRule(importPath.rule, {
  ruleName: importPath.ruleName,
  skipBasicChecks: true,
  config: [false],
  reject: [
    {
      code: '@import "_some-file"',
      message: importPath.messages.rejected
    }
  ]
});

testRule(importPath.rule, {
  ruleName: importPath.ruleName,
  skipBasicChecks: true,
  config: [true],
  reject: [
    {
      code: '@import "some-file"',
      message: importPath.messages.expected
    }
  ]
});
