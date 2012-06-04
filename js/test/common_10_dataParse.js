var fs, should;

should = require('should');

fs = require('fs');

eval(fs.readFileSync('common.js', 'utf-8'));

eval(fs.readFileSync('data.js', 'utf-8'));

describe('data parse', function() {
  var regex;
  regex = new Regex;
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
          _results2.push(regex.check(d.pattern, e.text, e.answer).is_success.should["true"]);
        }
        return _results2;
      })());
    }
    return _results;
  });
});
