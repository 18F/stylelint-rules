var stylelint = require('stylelint');
var utils = stylelint.utils;
var url = require('url');

var ruleName = 'plugin/url-format';
var messages = utils.ruleMessages(ruleName, {
  rejected: function(path) {
    return  'path should not contain a protocol or host';
  }
});

function startsWithUrl(value) {
  return /^url\(/.test(value);
}

var pluginDefinition = stylelint.createPlugin(ruleName, function(enabled, options) {
  return function(css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    });

    if (!validOptions) {
      return false;
    }

    css.walkDecls(function(decl) {
      var value = decl.value;

      if (value && startsWithUrl(value)) {
        var maybeUrl = url.parse(value.replace(/url\(/, ''));

        if (maybeUrl.host || maybeUrl.protocol) {
          utils.report({
            node: decl,
            message:messages.rejected(value),
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
