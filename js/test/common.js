var content, fs, should;

should = require('should');

fs = require('fs');

content = fs.readFileSync('common.js', 'utf-8');

eval(content);

describe('regex exec', function() {
  describe('basic regex', function() {
    it('without option', function() {
      return regexExec('/abc/', 'abc1ABCabc').should.eql('abc');
    });
    return it('no match', function() {
      return should.not.exist(regexExec('/abc/', 'aaa'));
    });
  });
  describe('single option', function() {
    it('with g option', function() {
      return regexExec('/abc/g', 'abc1ABCabc').should.eql(['abc', 'abc']);
    });
    it('with g option mutched 1 item', function() {
      return regexExec('/abc/g', 'abc1ABC').should.eql(['abc']);
    });
    it('with i option', function() {
      return regexExec('/abc/i', 'abc1ABCabc').should.eql('abc');
    });
    it('with m option', function() {
      return regexExec('/abc$/m', 'abc\n1ABC').should.eql('abc');
    });
    return it('without m option multi line no match', function() {
      return should.not.exist(regexExec('/abc$/', 'abc\n1ABC'));
    });
  });
  return describe('multi option', function() {
    it('with gi option', function() {
      return regexExec('/abc/gi', 'abc1ABCabc').should.eql(['abc', 'ABC', 'abc']);
    });
    it('with gm option', function() {
      return regexExec('/abc$/mg', 'abc\n1ABCabc').should.eql(['abc', 'abc']);
    });
    return it('with im option', function() {
      return regexExec('/abc/im', 'abc\n1abcABC').should.eql('abc');
    });
  });
});

content = fs.readFileSync('data.js', 'utf-8');

eval(content);

describe('data parse', function() {
  return it('loop execute', function() {
    var d, e, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push((function() {
        var _j, _len2, _ref, _results2;
        _ref = d.example;
        _results2 = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          e = _ref[_j];
          _results2.push(regexCheck(d.pattern, e).should.eql({
            result: true,
            res: e.answer
          }));
        }
        return _results2;
      })());
    }
    return _results;
  });
});
