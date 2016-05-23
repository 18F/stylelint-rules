var stylelint = require('stylelint');
var utils = stylelint.utils;

var ruleName = 'plugin/import-path-leading-underscore';
var messages = utils.ruleMessages(ruleName, {
  expected: 'Expected leading underscore in @import directive',
  rejected: 'Unexpected leading underscore in @import directive'
});

var startsWithUnderscore = new RegExp(/^["']?_/);

function report(node, message, result) {
  utils.report({
    node: node,
    message: message,
    result: result,
    ruleName: ruleName
  });
}

var pluginDefinition = stylelint.createPlugin(ruleName, function(requireUnderscore, options) {
  return function (css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: requireUnderscore,
      possible: [true, false]
    });

    if (!validOptions) {
      return;
    }

    function checkAtRules(atRule) {
      var ruleValue = atRule.params;

      if (!requireUnderscore) {
        // @import starts with an underscore, and shouldn't
        if (startsWithUnderscore.test(ruleValue)) {
          report(atRule, messages.rejected, result);
        }
      } else {
        // @import does not start with an underscore, and should
        if (!startsWithUnderscore.test(ruleValue)) {
          report(atRule, messages.expected, result);
        }
      }
    }

    css.walkAtRules('import', checkAtRules);
  };
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
