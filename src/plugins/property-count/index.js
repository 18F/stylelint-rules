var stylelint = require('stylelint');
var utils = stylelint.utils;

var ruleName = 'plugin/property-count';
var messages = {
  rejected: function(actualPropCount, expectedPropCount) {
    return actualPropCount + ' properties declared, ' + expectedPropCount + ' expected';
  }
};

function isNumber(maybeNumber){
  return typeof maybeNumber === 'number' && !isNaN(maybeNumber);
}

var pluginDefinition = stylelint.createPlugin(ruleName, function(propertyCount, options) {
  return function(css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: propertyCount,
      possible: [isNumber]
    });

    if (!validOptions) {
      return;
    }

    css.walkRules(function(statement) {
      // ignore any statements like imports or extends, we only want property
      // declarations.
      var statementDecls = statement.nodes.filter(function(node) {
        return node.type === 'decl';
      });

      if (statementDecls.length > propertyCount) {
        utils.report({
          node: statement,
          message: messages.rejected(statementDecls.length, propertyCount),
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
