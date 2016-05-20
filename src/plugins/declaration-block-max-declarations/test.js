var testRule = require('stylelint-test-rule-tape');
var propertyCount = require('./index');

testRule(propertyCount.rule, {
  ruleName: propertyCount.ruleName,
  config: [10],
  skipBasicChecks: true,
  accept: [{
    code: '.foo { color: blue; border: 1px solid white; height: 10px; weight: 10px;}'
  }, {
    code: '.foo { @mixin my-mixin(10); background: black; color: white; display: inline-block; float: left; font-family: sans-serif; font-weight: 12px; height: 10px; line-height: 36px; vertical-align: middle; width: 10px;}'
  }, {
   code: '.foo { @mixin my-mixin(10); &.bar { color: pink; } color: white; display: inline-block; float: left; font-family: sans-serif; font-weight: 12px; height: 10px; line-height: 36px; vertical-align: middle; width: 10px;}'  
  }],

  reject: [{
    code: '.foo { background: black; color: white; display: inline-block; float: left; font-family: sans-serif; font-weight: 12px; height: 10px; line-height: 36px; vertical-align: middle; width: 10px; z-index: 1;}',
    message: propertyCount.messages.expected(11, 10)
  }]
});
