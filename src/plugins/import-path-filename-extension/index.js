var stylelint = require('stylelint');
var utils = stylelint.utils;
var path = require('path');

var ruleName = 'plugin/import-path-filename-extension';
var messages = utils.ruleMessages(ruleName, {
  expected: 'Expected extension in @import directive',
  rejected: 'Unexpected extension in @import directive'
});

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
      var extName = path.extname(atRule.params);

      // ignore css imports
      if (extName.indexOf('.css') !== -1) {
        return;
      }

      if (!expected) {
        // @import ends with a file extension, and shouldn't
        if (extName) {
          utils.report({
            node: atRule,
            message: messages.rejected,
            result: result,
            ruleName: ruleName
          });
        }
      } else {
        // @import does not end with a file extension and should
        if (!extName) {
          utils.report({
            node: atRule,
            message: messages.expected,
            result: result,
            ruleName: ruleName
          });
        }
      }
    });
  };
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
