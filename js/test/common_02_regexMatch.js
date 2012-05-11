var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

describe('regex match', function() {
  describe('basic regex', function() {
    it('without option', function() {
      return regexMatch('/abc/', 'abc1ABCabc').should.eql(['abc']);
    });
    return it('no match', function() {
      return should.not.exist(regexMatch('/abc/', 'aaa'));
    });
  });
  describe('single option', function() {
    it('with g option', function() {
      return regexMatch('/abc/g', 'abc1ABCabc').should.eql(['abc', 'abc']);
    });
    it('with g option mutched 1 item', function() {
      return regexMatch('/abc/g', 'abc1ABC').should.eql(['abc']);
    });
    it('with i option', function() {
      return regexMatch('/abc/i', 'abc1ABCabc').should.eql(['abc']);
    });
    it('with m option', function() {
      return regexMatch('/abc$/m', 'abc\n1ABC').should.eql(['abc']);
    });
    return it('without m option multi line no match', function() {
      return should.not.exist(regexMatch('/abc$/', 'abc\n1ABC'));
    });
  });
  return describe('multi option', function() {
    it('with gi option', function() {
      return regexMatch('/abc/gi', 'abc1ABCabc').should.eql(['abc', 'ABC', 'abc']);
    });
    it('with gm option', function() {
      return regexMatch('/abc$/mg', 'abc\n1ABCabc').should.eql(['abc', 'abc']);
    });
    return it('with im option', function() {
      return regexMatch('/abc/im', 'abc\n1abcABC').should.eql(['abc']);
    });
  });
});
