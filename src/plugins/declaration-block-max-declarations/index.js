var stylelint = require('stylelint');
var utils = stylelint.utils;

var ruleName = 'plugin/declaration-block-max-declarations';
var messages = {
  expected: function(actualPropCount, expectedPropCount) {
    return 'Expected no more than ' + expectedPropCount + ' declaration(s). Found ' + actualPropCount + '.';
  }
};

function isNumber(maybeNumber){
  return typeof maybeNumber === 'number' &&
    !isNaN(maybeNumber) &&
    isFinite(maybeNumber);
}

var pluginDefinition = stylelint.createPlugin(ruleName, function(maxDeclarations, options) {
  var maxDeclInt = parseInt(maxDeclarations);

  return function(css, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: maxDeclInt,
      possible: [isNumber]
    });

    function checkMaxDeclarationsInBlock(statement) {
      // ignore any statements like imports or extends, we only want property
      // declarations.
      var statementDecls = statement.nodes.filter(function(node) {
        return node.type === 'decl';
      });
      var blockDeclarations = statementDecls.length;

      if (blockDeclarations > maxDeclInt) {
        utils.report({
          node: statement,
          message: messages.expected(blockDeclarations, maxDeclInt),
          result: result,
          ruleName: ruleName
        });
      }
    }

    if (!validOptions) {
      return;
    }

    css.walkRules(checkMaxDeclarationsInBlock);
  }
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
