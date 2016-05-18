var testRule = require('stylelint-test-rule-tape');
var elsePlacement = require('./index.js');

/** Test if @else at-rule is on the same line as the ending '}' of
 * an @if statement. Rejects based on the presence of a newline character,
 * which should be sufficient.
 *
 * Accepted example:
 * @if {
 *   ...
 * } else {
 *   ...
 * }
*/
testRule(elsePlacement.rule, {
  ruleName: elsePlacement.ruleName,
  config: ['same-line'],
  accept: [{
    code: '@if {} @else {}'
  },
  {
    code: '@if {} \t @else {}'
  }],

  reject: [{
    code: '@if {  } \n @else { }',
    message: elsePlacement.messages.rejectedSameLine
  }, {
    code: '@if {  } \r @else { }',
    message: elsePlacement.messages.rejectedSameLine
  }],
});

// Again check for the presence of a newline character, rejecting
// if the newline isn't present, i.e.:
// @if {
//   ...
// } else {
//   ...
// }
testRule(elsePlacement.rule, {
  ruleName: elsePlacement.ruleName,
  skipBasicChecks: true,
  config: ['next-line'],
  accept: [{
    code: '@if {} \n @else {}'
  }],

  reject: [{
    code: '@if {  } @else { }',
    message: elsePlacement.messages.rejectedNextLine
  }]
});
