var stylelint = require('stylelint');
var utils = stylelint.utils;

var ruleName = 'plugin/name-format';
var messages = {
  rejected: function(convention) {
    return 'Functions, mixins, variables, and placeholders should be declared using ' + convention;
  },
  rejectedUnderscore: 'Function, mixins, and variable names should not be begin with a leading underscore'
};


// If a string doesn't match this regex, it is valid and won't generate a
// linting error
function getFormatRegex(convention) {
  var regex;

  switch (convention) {
    case 'hyphenated-lowercase':
      regex = /[_A-Z][^(]/;
      break;
    default:
      // always opt out of the regex
      regex = {test: function() { return false;}}
  }

  return regex;
}

/**
 * Matches at-rule to list of at-rules this plugin cares about
 * @param  {String} ruleName The at-rule to be tested
 * @return {Boolean}         Returns true if the at-rule is in list of at-rules
 */
function atRuleWhitelistMatch(ruleName) {
  return ['function', 'mixin'].indexOf(ruleName) !== -1;
}

/**
 * Test if a given string is a scss variable
 * @param  {String}  declaration Value of the 'prop' property of a Declaration
 * @return {Boolean}
 */
function isVariable(declaration) {
  return /^\$/.test(declaration);
}

function hasLeadingUnderscore(declaration) {
  var declSansVariable = declaration.split('$').pop();
  return /^_/.test(declSansVariable);
}

function report(statement, message, result, ruleName) {
  utils.report({
    node: statement,
    message: message,
    result: result,
    ruleName: ruleName
  });
}

var pluginDefinition = stylelint.createPlugin(ruleName, function(enabled, options) {
  return function(css, result) {
    var convention;
    var leadingUnderscore;
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: {
        'allow-leading-underscore': [true, false],
        'convention': ['hyphenated-lowercase']
      }
    });

    if (!validOptions) {
      return false;
    }

    // set flags into variables
    convention = enabled.convention;
    leadingUnderscore = enabled['allow-leading-underscore'];

    css.walk(function(statement) {
      var nodeType = statement.type;
      var formattingRegex = getFormatRegex(convention);

      //console.log(statement);
      // Check if the current node is prefixed with an '@' and is in our at-rule
      // whitelist
      if (nodeType === 'atrule' && atRuleWhitelistMatch(statement.name)) {
        if (convention && formattingRegex.test(statement.params)) {
          report(statement, messages.rejected(convention), result, ruleName);
        }

        if (!leadingUnderscore && hasLeadingUnderscore(statement.params)) {
          report(statement, messages.rejectedUnderscore, result, ruleName);
        }
      }

      // Check if the node is a variable
      if (nodeType === 'decl' && (statement.prop && isVariable(statement))) {
        if (convention && formattingRegex.test(statement.prop)) {
          report(statement, messages.rejected(convention), result, ruleName);
        }

        if (!leadingUnderscore && hasLeadingUnderscore(statement.prop)) {
          report(statement, messages.rejectedUnderscore, result, ruleName);
        }
      }
    });
  }
});

module.exports = pluginDefinition;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
