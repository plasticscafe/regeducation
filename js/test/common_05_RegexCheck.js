var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

describe('regexCheck', function() {
  var regex;
  regex = new Regex;
  describe('basic test', function() {
    return it('defined RegexCheck', function() {
      return regex.check.should.be.ok;
    });
  });
  return describe('call RegexExec', function() {
    it('check regex test', function() {
      return regex.check('/abc/', 'abc1ABC2abc', true).should.be["true"];
    });
    it('check regex test fail', function() {
      return regex.check('/abcd/', 'abc1ABC2abc', true).should.be["false"];
    });
    it('check regex replace', function() {
      return regex.check('s/abc/hoge/', 'abc1ABC2abc', 'hoge1ABC2abc').should.be["true"];
    });
    return it('check regex replace fail', function() {
      return regex.check('s/abcd/hoge/', 'abc1ABC2abc', 'hoge1ABC2abc').should.be["false"];
    });
  });
});
