var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('regex.js', 'utf-8'));

describe('RegexClass', function() {
  return describe('basic test', function() {
    return it('defined Regex', function() {
      return Regex.should.be.ok;
    });
  });
});
