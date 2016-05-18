var testRule = require('stylelint-test-rule-tape');
var noAtDebug = require('./index');

testRule(noAtDebug.rule, {
  ruleName: noAtDebug.ruleName,
  skipBasicChecks: true,
  config: [true],
  accept: [
    // i.e. any code withough a debug statement
    { code: '.foo { font-family: sans-serif; }' }
  ],
  reject: [
    {
      code: '@debug $some-variable;',
      message: noAtDebug.ruleMessage
    },
    {
      code: '.foo { @debug $some-variable; }',
      message: noAtDebug.ruleMessage
    },
    {
      code: '@function sum($num1, $num2){@debug $num1; @return $num1 + $num2;}',
      message: noAtDebug.ruleMessage
    },
    {
      code: '@mixin asLink($link){@debug $link; a {color: $link;}}',
      message: noAtDebug.ruleMessage
    }
  ]
});
