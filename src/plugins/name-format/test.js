var testRule = require('stylelint-test-rule-tape');
var nameFormat = require('./index');

var conventionHL = 'hyphenated-lowercase';

testRule(nameFormat.rule, {
  ruleName: nameFormat.ruleName,
  config: [{
    'convention': conventionHL
  }],
  accept: [{
    code: '@function test-fn($n1, $n2) { @return $n1 + $n2;};'
  }, {
    code: '$time-zone: #333;'
  }, {
    code: '@mixin my-mixin'
  }, {
    code: '.foo_bar {}'
  }, {
    code: '.item__list-selected {}'
  }, {
    code: '#_another-sanityCheck {}'
  }],
  reject: [{
    code: '@function testFn($n1, $n2) { @return $n1 + $n2;};',
    message: nameFormat.messages.rejected(conventionHL)
  },
  {
    code: '$myVariable: #333',
    message: nameFormat.messages.rejected(conventionHL)
  }]
});

testRule(nameFormat.rule, {
  ruleName: nameFormat.ruleName,
  config: [{
    'allow-leading-underscore': true
  }],
  accept: [{
    code: '@function _private-fn() {}'
  }, {
    code: '$_my-private-var: #333'
  }]
});

testRule(nameFormat.rule, {
  ruleName: nameFormat.ruleName,
  config: [{
    'allow-leading-underscore': false
  }],
  reject: [{
    code: '@function _private-fn() {}'
  }, {
    code: '$_my-private-var: #333'
  }]
});
