var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

describe('regex match', function() {
  var regex;
  regex = new Regex;
  describe('basic test', function() {
    return it('defined Regex.match', function() {
      return regex.match.should.be.ok;
    });
  });
  describe('basic regex', function() {
    it('without option', function() {
      return regex.match('/abc/', 'abc1ABCabc').should.eql(['abc']);
    });
    return it('no match', function() {
      return should.not.exist(regex.match('/abc/', 'aaa'));
    });
  });
  describe('single option', function() {
    it('with g option', function() {
      return regex.match('/abc/g', 'abc1ABCabc').should.eql(['abc', 'abc']);
    });
    it('with g option mutched 1 item', function() {
      return regex.match('/abc/g', 'abc1ABC').should.eql(['abc']);
    });
    it('with i option', function() {
      return regex.match('/abc/i', 'abc1ABCabc').should.eql(['abc']);
    });
    it('with m option', function() {
      return regex.match('/abc$/m', 'abc\n1ABC').should.eql(['abc']);
    });
    return it('without m option multi line no match', function() {
      return should.not.exist(regex.match('/abc$/', 'abc\n1ABC'));
    });
  });
  return describe('multi option', function() {
    it('with gi option', function() {
      return regex.match('/abc/gi', 'abc1ABCabc').should.eql(['abc', 'ABC', 'abc']);
    });
    it('with gm option', function() {
      return regex.match('/abc$/mg', 'abc\n1ABCabc').should.eql(['abc', 'abc']);
    });
    return it('with im option', function() {
      return regex.match('/abc/im', 'abc\n1abcABC').should.eql(['abc']);
    });
  });
});
