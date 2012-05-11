var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

describe('regex test', function() {
  describe('method exists', function() {
    return it('regexTest exists', function() {
      return regexTest.should.ok;
    });
  });
  describe('basic regex', function() {
    it('match', function() {
      return regexTest('/abc/', 'abc1ABCabc').should["true"];
    });
    return it('no match', function() {
      return regexTest('/abc/', 'aaa').should["false"];
    });
  });
  describe('i option', function() {
    it('match', function() {
      return regexTest('/abc/i', '1ABCbca').should["true"];
    });
    return it('no match', function() {
      return regexTest('/abc/', '1ABCbca').should["false"];
    });
  });
  describe('m option', function() {
    it('match', function() {
      return regexTest('/abc$/m', 'ABCDE\nabc\n1234').should["true"];
    });
    return it('no match', function() {
      return regexTest('/abc$/', 'ABCDE\nabc\n1234').should["false"];
    });
  });
  return describe('im option', function() {
    it('match', function() {
      return regexTest('/abc$/im', 'qwer\nABC\n1234').should["true"];
    });
    it('no match without i', function() {
      return regexTest('/abc$/m', 'qwer\nABC\n1234').should["false"];
    });
    return it('no match without m', function() {
      return regexTest('/abc$/i', 'qwer\nABC\n1234').should["false"];
    });
  });
});
