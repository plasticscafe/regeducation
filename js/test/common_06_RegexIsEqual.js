var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('regex.js', 'utf-8'));

describe('RegexCheck', function() {
  var regex;
  regex = new Regex;
  describe('basic test', function() {
    return it('defined is_equal', function() {
      return regex.is_equal.should.ok;
    });
  });
  describe('item equals', function() {
    it('scalar eql', function() {
      return regex.is_equal('hoge', 'hoge').should["true"];
    });
    return it('scalar not equal', function() {
      return regex.is_equal('hoge', 'hoge1').should["false"];
    });
  });
  return describe('array equals', function() {
    it('1 item eql', function() {
      return regex.is_equal(['hoge'], ['hoge']).should["true"];
    });
    it('1 item not equal', function() {
      return regex.is_equal(['hoge'], ['hoge1']).should["false"];
    });
    it('2 item eql', function() {
      return regex.is_equal(['hoge', 'huga'], ['hoge', 'huga']).should["true"];
    });
    it('2 item not equal', function() {
      return regex.is_equal(['hoge', 'huga'], ['hoge', 'hige']).should["false"];
    });
    it('item length not equal', function() {
      return regex.is_equal(['hoge', 'huga'], ['hoge']).should["false"];
    });
    return it('item length not equal 2', function() {
      return regex.is_equal(['hoge'], ['hoge', 'hige']).should["false"];
    });
  });
});
