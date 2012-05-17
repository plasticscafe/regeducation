var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

describe('regex test', function() {
  var regex;
  regex = new Regex;
  describe('method exists', function() {
    return it('Regex.test exists', function() {
      return regex.test.should.ok;
    });
  });
  describe('basic regex', function() {
    it('match', function() {
      return regex.test('/abc/', 'abc1ABCabc').should["true"];
    });
    return it('no match', function() {
      return regex.test('/abc/', 'aaa').should["false"];
    });
  });
  describe('i option', function() {
    it('match', function() {
      return regex.test('/abc/i', '1ABCbca').should["true"];
    });
    return it('no match', function() {
      return regex.test('/abc/', '1ABCbca').should["false"];
    });
  });
  describe('m option', function() {
    it('match', function() {
      return regex.test('/abc$/m', 'ABCDE\nabc\n1234').should["true"];
    });
    return it('no match', function() {
      return regex.test('/abc$/', 'ABCDE\nabc\n1234').should["false"];
    });
  });
  return describe('im option', function() {
    it('match', function() {
      return regex.test('/abc$/im', 'qwer\nABC\n1234').should["true"];
    });
    it('no match without i', function() {
      return regex.test('/abc$/m', 'qwer\nABC\n1234').should["false"];
    });
    return it('no match without m', function() {
      return regex.test('/abc$/i', 'qwer\nABC\n1234').should["false"];
    });
  });
});
