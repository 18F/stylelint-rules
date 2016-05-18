var stylelint = require('stylelint');
var utils = stylelint.utils;

var ruleName = 'plugin/import-path-leading-underscore';
var messages = utils.ruleMessages(ruleName, {
  expected: 'Expected leading underscore in @import directive',
  rejected: 'Unexpected leading underscore in @import directive'
});

var startsWithUnderscore = new RegExp(/^["']?_/);

var pluginDefinition = stylelint.createPlugin(ruleName, function(expected, options) {
  return function (css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: expected,
      possible: [true, false]
    });

    if (!validOptions) {
      return;
    }

    css.walkAtRules('import', function(atRule) {
      if (!expected) {
        // @import stars with an underscore, and shouldn't
        if (startsWithUnderscore.test(atRule.params)) {
          utils.report({
            node: atRule,
            message: messages.rejected,
            result: result,
            ruleName: ruleName
          });
        }
      } else {
        // @import does not start with an underscore, and should
        if (!startsWithUnderscore.test(atRule.params)) {
          utils.report({
            node: atRule,
            message: messages.expected,
            result: result,
            ruleName: ruleName
          });
        }
      }
      // } else if (/\.scss(?=['|"])?/.test(atRule.params)) {
      //   utils.report({
      //     node: atRule,
      //     message: messages.rejectedFilenameExtension,
      //     result: result,
      //     ruleName: ruleName
      //   });
      // }
    });
  };
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
