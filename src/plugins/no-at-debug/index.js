var stylelint = require('stylelint');
var utils = stylelint.utils;
var ruleName = 'plugin/no-at-debug';
var messages = utils.ruleMessages(ruleName, {
  rejected: 'Remove debug statement'
});


var pluginDefinition = stylelint.createPlugin(ruleName, function(enabled, options) {
  return function(css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [ true, false ],
    }, {
      actual: enabled,
      optional: true
    });

    var warnDebug = function(atRule) {
      utils.report({
        node: atRule,
        message: messages.rejected,
        result: result,
        ruleName: ruleName
      });
    };

    if (!validOptions) {
      console.log('no valid option')
      return;
    }

    css.walkAtRules('debug', warnDebug);
  };
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
