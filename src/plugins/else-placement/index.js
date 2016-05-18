var stylelint = require('stylelint');
var utils = stylelint.utils;

var ruleName = 'plugin/else-placement';
var messages = utils.ruleMessages(ruleName, {
  rejectedSameLine: '@else should be on the same line as the preceding \}',
  rejectedNextLine: '@else should be on a new line after the preceding \}'
});

function hasNewLine(string) {
  return /[\r\n]/.test(string);
}

var pluginDefinition = stylelint.createPlugin(ruleName, function(enabled, options) {
  return function(css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: ['same-line', 'next-line']
    });

    if (!validOptions) {
      return;
    }

    css.walkAtRules(function(statement) {
      var raw = statement.raws;

      // ignore everything but an else statement
      if (statement.name !== 'else') {
        return;
      }

      if (enabled === 'same-line' && hasNewLine(raw.before)) {
        utils.report({
          node: statement,
          message: messages.rejectedSameLine,
          result: result,
          ruleName: ruleName
        });
      }

      if (enabled === 'next-line' && !hasNewLine(raw.before)) {
        utils.report({
          node: statement,
          message: messages.rejectedNextLine,
          result: result,
          ruleName: ruleName
        });
      }
    });
  }
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
