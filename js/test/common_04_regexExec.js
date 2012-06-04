var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('regex.js', 'utf-8'));

describe('exec regex', function() {
  var regex;
  regex = new Regex;
  describe('basic test', function() {
    return it('defined Regex.exec', function() {
      return regex.exec.should.be.ok;
    });
  });
  describe('call regexTest', function() {
    it('no option call regexTest', function() {
      return regex.exec('/abc/', 'abc1ABC2abc').should.be["true"];
    });
    it('i option call regexTest', function() {
      return regex.exec('/abc/i', 'afbc1ABC2avbc').should.be["true"];
    });
    return it('no option call regexTest fail', function() {
      return regex.exec('/abcd/', 'abc1ABC2abc').should.be["false"];
    });
  });
  describe('call regexMatch', function() {
    it('no option call regexMatch', function() {
      return regex.exec('m/abc/', 'abc1ABC2abc').should.eql(['abc']);
    });
    it('g option call regexMatch', function() {
      return regex.exec('m/abc/g', 'abc1ABC2abc').should.eql(['abc', 'abc']);
    });
    it('gi option call regexMatch', function() {
      return regex.exec('m/abc/ig', 'abc1ABC2abc').should.eql(['abc', 'ABC', 'abc']);
    });
    return it('no option call regexMatch fail', function() {
      return should.not.exist(regex.exec('m/abcd/', 'abc1ABC2abc'));
    });
  });
  return describe('call regexReplace', function() {
    it('no option call regexReplace', function() {
      return regex.exec('s/abc/hoge/', 'abc1ABC2abc').should.eql('hoge1ABC2abc');
    });
    it('g option call regexReplace', function() {
      return regex.exec('s/abc/hoge/g', 'abc1ABC2abc').should.eql('hoge1ABC2hoge');
    });
    it('gi option call regexReplace', function() {
      return regex.exec('s/abc/hoge/ig', 'abc1ABC2abc').should.eql('hoge1hoge2hoge');
    });
    return it('no option call regexReplace fail', function() {
      return regex.exec('s/abcd/hoge/', 'abc1ABC2abc').should.eql('abc1ABC2abc');
    });
  });
});
