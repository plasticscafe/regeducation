var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

describe('replace', function() {
  describe('basic test', function() {
    return it('defined regexReplace', function() {
      return regexReplace.should.be.ok;
    });
  });
  describe('basic replace', function() {
    it('without option', function() {
      return regexReplace('/abc/hoge/', 'abc1ABCabc').should.eql('hoge1ABCabc');
    });
    return it('no match', function() {
      return regexReplace('/cba/hoge/', 'abc1ABCabc').should.eql('abc1ABCabc');
    });
  });
  describe('use valiable', function() {
    it('use $1', function() {
      return regexReplace('/(abc)/a$1s/', 'abc1ABCabc').should.eql('aabcs1ABCabc');
    });
    it('use $1 $2', function() {
      return regexReplace('/(abc)1AB(C)/a$1s$2/', 'abc1ABCabc').should.eql('aabcsCabc');
    });
    return it('use $1 $2 $3', function() {
      return regexReplace('/(abc)1AB(C)ab(c)/a$1s$2d$3/', 'abc1ABCabc').should.eql('aabcsCdc');
    });
  });
  describe('single option', function() {
    it('with g option', function() {
      return regexReplace('/abc/hoge/g', 'abc1ABCabc').should.eql('hoge1ABChoge');
    });
    it('with i option', function() {
      return regexReplace('/1abc/hoge/i', 'abc1ABCabc').should.eql('abchogeabc');
    });
    it('with m option', function() {
      return regexReplace('/abc$/hoge/m', 'abc\n1ABC').should.eql('hoge\n1ABC');
    });
    return it('without m option multi line no match', function() {
      return regexReplace('/abc$/hoge/', 'abc\n1ABC').should.not.eql('hoge\nABC');
    });
  });
  return describe('multi option', function() {
    it('with gi option', function() {
      return regexReplace('/abc/hoge/gi', 'abc1ABCabc').should.eql('hoge1hogehoge');
    });
    it('with gm option', function() {
      return regexReplace('/abc$/hoge/mg', 'abc\n1ABCabc').should.eql('hoge\n1ABChoge');
    });
    it('with im option', function() {
      return regexReplace('/abc$/hoge/im', 'abcABC\n1abcABC').should.eql('abchoge\n1abcABC');
    });
    return it('with img option', function() {
      return regexReplace('/abc$/hoge/img', 'abc\n1abcABC').should.eql('hoge\n1abchoge');
    });
  });
});
