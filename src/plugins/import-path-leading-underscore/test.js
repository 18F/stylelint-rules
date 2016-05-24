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
    },
    {
      code: '@import "patah/to/_some-file"',
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
    },
    {
      code: '@import "path/to/some-file"',
      message: importPath.messages.expected
    }
  ]
});
